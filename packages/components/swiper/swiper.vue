<script setup name="m-swiper" lang="ts">
import { ComponentInternalInstance, computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, provide, ref, watch } from 'vue'
import Dap from 'dap-util'
import { Icon } from '../icon'
import { SwiperProps } from './props'

//实例
const instance = getCurrentInstance()!

//提供给SwiperSlide使用
provide('swiper', instance)

//属性
const props = defineProps(SwiperProps)

//事件
const emits = defineEmits(['before-change', 'change'])

//组件元素
const elRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
//强制更新slideSize的参数
const sizeCounts = ref<number>(0)
//slide子元素数组
const children = ref<ComponentInternalInstance[]>([])
//每次更新的触摸点坐标
const start = ref<number>(0)
//初始的触摸点坐标
const initStart = ref<number>(0)
//平移值
const transform = ref<number>(0)
//计时器
const timer = ref<any>(null)
//每次触摸的总位移量
const totalMove = ref<number>(0)
//非fade模式下记录被被激活的序列
const oldIndex = ref<number>(-1)
//滑动系数
const amounts = ref<number>(0)
//是否鼠标按下
const mouseDown = ref<boolean>(false)
//fade模式下被激活的序列
const fadeActiveIndex = ref<number>(props.fade ? props.initialSlide : 0)
//fade模式下是否使用动画渐变
const useOpacity = ref<boolean>(true)
//非fade模式下，是否正在使用api来改变轮播
const apiDoSlide = ref<boolean>(false)

//slide宽度或者高度(非fade)
const slideSize = computed<number>(() => {
	//单纯的为了刷新slideSize更新
	sizeCounts.value
	let width = 0
	if (props.vertical) {
		//垂直
		if (props.height) {
			//设置了height变量
			if (props.height.includes('rem')) {
				width = Dap.element.rem2px(parseFloat(props.height))
			} else if (props.height.includes('px')) {
				width = parseFloat(props.height)
			} else if (elRef.value) {
				width = parseFloat(Dap.element.getCssStyle(elRef.value, 'height'))
			}
		} else if (elRef.value) {
			width = parseFloat(Dap.element.getCssStyle(elRef.value, 'height'))
		}
	} else {
		//水平
		if (props.width) {
			//设置了width变量
			if (props.width.includes('rem')) {
				width = Dap.element.rem2px(parseFloat(props.width))
			} else if (props.width.includes('px')) {
				width = parseFloat(props.width)
			} else if (elRef.value) {
				width = parseFloat(Dap.element.getCssStyle(elRef.value, 'width'))
			}
		} else if (elRef.value) {
			width = parseFloat(Dap.element.getCssStyle(elRef.value, 'width'))
		}
	}
	return Number(width.toFixed(2))
})
//激活的轮播序列(非fade，数值从0开始，循环模式下包含复制的)
const activeIndex = computed<number>(() => {
	let index = 0
	if (totalMove.value <= 0) {
		index = mathNext(Math.abs(Dap.number.divide(transform.value, slideSize.value)))
	} else {
		index = mathPrev(Math.abs(Dap.number.divide(transform.value, slideSize.value)))
	}
	if (index > children.value.length - 1) {
		index = children.value.length - 1
	} else if (index < 0) {
		index = 0
	}
	return index
})
//激活的分页器索引(区分slide和fade，数值是从0开始)
const indicatorsIndex = computed<number>(() => {
	let index = 0
	if (props.fade) {
		index = fadeActiveIndex.value
	} else {
		if (props.loop) {
			if (activeIndex.value == children.value.length - 1) {
				index = 0
			} else if (activeIndex.value == 0) {
				index = children.value.length - 3
			} else {
				index = activeIndex.value - 1
			}
		} else {
			index = activeIndex.value
		}
	}
	return index
})
//判断分页器是否激活
const isIndicatorActive = computed<(index: number) => boolean>(() => {
	return (index: number) => {
		if (props.fade) {
			return indicatorsIndex.value == index
		}
		if (props.loop) {
			return indicatorsIndex.value + 1 == index
		}
		return indicatorsIndex.value == index
	}
})
//指示器样式
const indicatorStyle = computed<(index: number) => any>(() => {
	return (index: number) => {
		let style: any = {}
		if (isIndicatorActive.value(index)) {
			if (props.activeColor) {
				style.backgroundColor = props.activeColor
			}
		} else {
			if (props.inactiveColor) {
				style.backgroundColor = props.inactiveColor
			}
		}
		return style
	}
})
//slide父容器层(非fade)
const wrapperStyle = computed<any>(() => {
	let style: any = {}
	if (props.vertical) {
		style.height = 'calc(100% * ' + children.value.length + ')'
		style.transform = 'translateY(' + transform.value + 'px)'
		style.webkitTransform = 'translateY(' + transform.value + 'px)'
	} else {
		style.width = 'calc(100% * ' + children.value.length + ')'
		style.transform = 'translateX(' + transform.value + 'px)'
		style.webkitTransform = 'translateX(' + transform.value + 'px)'
	}
	return style
})
//初始化默认索引(非fade)
const cmpInitalSlide = computed<number>(() => {
	if (props.loop) {
		if (props.initialSlide < children.value.length - 2) {
			return props.initialSlide + 1
		}
		return 1
	}
	return props.initialSlide
})
//控制器样式
const controlStyle = computed<(index: number) => any>(() => {
	return (index: number) => {
		let style: any = {}
		//上一张
		if (index == 0) {
			style.left = '0'
			style.right = 'auto'
		}
		//下一张
		else {
			style.left = 'auto'
			style.right = '0'
		}
		return style
	}
})
//是否显示具体的每个指示器(区分slide和fade)
const indicatorShow = computed<(index: number) => boolean>(() => {
	return (index: number) => {
		if (props.fade) {
			return true
		}
		return props.loop ? index != 0 && index != children.value.length - 1 : true
	}
})
//分页器总数
const indicatorsTotal = computed<number>(() => {
	if (props.loop) {
		return children.value.length - 2 > 0 ? children.value.length - 2 : 0
	}
	return children.value.length
})

//+1取整(非fade)
const mathNext = (number: number) => {
	const num = Math.floor(number) //取整
	const floor = Dap.number.subtract(number, num) //取小数部分
	if (floor >= 0.25) {
		return num + 1
	}
	return num
}
//-1取整(非fade)
const mathPrev = (number: number) => {
	const num = Math.floor(number) //取整
	const floor = Dap.number.subtract(number, num) //取小数
	if (floor <= 0.75) {
		return num
	}
	return num + 1
}
//添加动画效果(非fade)
const addTransition = () => {
	return new Promise<void>(resolve => {
		if (wrapperRef.value) {
			wrapperRef.value.style.transition = 'transform ' + props.speed + 'ms'
		}
		setTimeout(() => {
			resolve()
		}, 10)
	})
}
//移除动画效果(非fade)
const removeTransition = () => {
	return new Promise<void>(resolve => {
		if (wrapperRef.value) {
			wrapperRef.value.style.transition = ''
		}
		setTimeout(() => {
			resolve()
		}, 10)
	})
}
//设置默认索引(非fade)
const setDefaultSlide = () => {
	if (children.value.length == 0) {
		return
	}
	if (!props.fade) {
		if (!wrapperRef.value) {
			return
		}
		removeTransition().then(() => {
			transform.value = -Dap.number.mutiply(cmpInitalSlide.value, slideSize.value)
			nextTick(() => {
				setTimeout(() => {
					if (!wrapperRef.value) {
						return
					}
					addTransition().then(() => {
						oldIndex.value = props.initialSlide
						setAutoplay()
					})
				}, 50)
			})
		})
	}
}
//滑动后处理(非fade)
const slideDone = () => {
	return new Promise<void>(resolve => {
		if (props.loop) {
			//循环模式下如果滑动到最后一张，则跳到第二张
			if (transform.value == -Dap.number.mutiply(children.value.length - 1, slideSize.value)) {
				removeTransition().then(() => {
					transform.value = -slideSize.value
					nextTick(() => {
						setTimeout(() => {
							addTransition().then(() => {
								if (indicatorsIndex.value != oldIndex.value) {
									oldIndex.value = indicatorsIndex.value
									emits('change', indicatorsIndex.value)
								}
								setAutoplay()
								resolve()
							})
						}, 50)
					})
				})
			}
			//循环模式下如果滑动到第一张，则跳到倒数第二张
			else if (transform.value == 0) {
				removeTransition().then(() => {
					transform.value = -Dap.number.mutiply(children.value.length - 2, slideSize.value)
					nextTick(() => {
						setTimeout(() => {
							addTransition().then(() => {
								if (indicatorsIndex.value != oldIndex.value) {
									oldIndex.value = indicatorsIndex.value
									emits('change', indicatorsIndex.value)
								}
								setAutoplay()
								resolve()
							})
						}, 50)
					})
				})
			} else {
				if (indicatorsIndex.value != oldIndex.value) {
					oldIndex.value = indicatorsIndex.value
					emits('change', indicatorsIndex.value)
				}
				setAutoplay()
				resolve()
			}
		} else {
			if (indicatorsIndex.value != oldIndex.value) {
				oldIndex.value = indicatorsIndex.value
				emits('change', indicatorsIndex.value)
			}
			setAutoplay()
			resolve()
		}
	})
}
//api：跳转指定的slide(区分slide和fade)
const slideTo = (index: number) => {
	return new Promise<void>(resolve => {
		if (children.value.length == 0) {
			resolve()
			return
		}
		if (props.fade) {
			if (index > children.value.length - 1) {
				index = children.value.length - 1
			} else if (index < 0) {
				index = 0
			}
			if (fadeActiveIndex.value != index) {
				emits('before-change', fadeActiveIndex.value)
				fadeActiveIndex.value = index
				if (timer.value) {
					clearInterval(timer.value)
					timer.value = null
				}
				setTimeout(() => {
					emits('change', fadeActiveIndex.value)
					setAutoplay()
					resolve()
				}, props.speed)
			} else {
				resolve()
			}
		} else {
			//上N张
			if (oldIndex.value > index) {
				if (transform.value >= 0) {
					resolve()
					return
				}
				apiDoSlide.value = true
				emits('before-change', oldIndex.value)
				if (timer.value) {
					clearInterval(timer.value)
					timer.value = null
				}
				addTransition().then(() => {
					transform.value = Dap.number.add(transform.value, Dap.number.mutiply(oldIndex.value - index, slideSize.value))
					setTimeout(() => {
						slideDone().then(() => {
							apiDoSlide.value = false
							resolve()
						})
					}, props.speed)
				})
			} else {
				//下N张
				if (transform.value <= -Dap.number.mutiply(children.value.length - 1, slideSize.value)) {
					resolve()
					return
				}
				apiDoSlide.value = true
				emits('before-change', oldIndex.value)
				if (timer.value) {
					clearInterval(timer.value)
					timer.value = null
				}
				addTransition().then(() => {
					transform.value = Dap.number.subtract(transform.value, Dap.number.mutiply(index - oldIndex.value, slideSize.value))
					setTimeout(() => {
						slideDone().then(() => {
							apiDoSlide.value = false
							resolve()
						})
					}, props.speed)
				})
			}
		}
	})
}
//api：跳转到下一个轮播(区分slide和fade)
const slideNext = () => {
	return new Promise<void>(resolve => {
		if (children.value.length == 0) {
			resolve()
			return
		}
		if (props.fade) {
			if (props.loop) {
				emits('before-change', fadeActiveIndex.value)
				//最后一个
				if (fadeActiveIndex.value == children.value.length - 1) {
					fadeActiveIndex.value = 0 //变为第一个
				} else {
					fadeActiveIndex.value++
				}
				if (timer.value) {
					clearInterval(timer.value)
					timer.value = null
				}
				setTimeout(() => {
					emits('change', fadeActiveIndex.value)
					setAutoplay()
					resolve()
				}, props.speed)
			} else {
				//不是最后一个
				if (fadeActiveIndex.value != children.value.length - 1) {
					emits('before-change', fadeActiveIndex.value)
					fadeActiveIndex.value++
					if (timer.value) {
						clearInterval(timer.value)
						timer.value = null
					}
					setTimeout(() => {
						emits('change', fadeActiveIndex.value)
						setAutoplay()
						resolve()
					}, props.speed)
				} else {
					resolve()
				}
			}
		} else {
			if (transform.value <= -Dap.number.mutiply(children.value.length - 1, slideSize.value)) {
				resolve()
				return
			}
			apiDoSlide.value = true
			emits('before-change', oldIndex.value)
			if (timer.value) {
				clearInterval(timer.value)
				timer.value = null
			}
			addTransition().then(() => {
				transform.value = Dap.number.subtract(transform.value, slideSize.value)
				setTimeout(() => {
					slideDone().then(() => {
						apiDoSlide.value = false
						resolve()
					})
				}, props.speed)
			})
		}
	})
}
//api：跳转到上一个轮播(区分slide和fade)
const slidePrev = () => {
	return new Promise<void>(resolve => {
		if (children.value.length == 0) {
			resolve()
			return
		}
		if (props.fade) {
			if (props.loop) {
				emits('before-change', fadeActiveIndex.value)
				//第一个
				if (fadeActiveIndex.value == 0) {
					fadeActiveIndex.value = children.value.length - 1 //变为最后一个
				} else {
					fadeActiveIndex.value--
				}
				if (timer.value) {
					clearInterval(timer.value)
					timer.value = null
				}
				setTimeout(() => {
					emits('change', fadeActiveIndex.value)
					setAutoplay()
					resolve()
				}, props.speed)
			} else {
				//不是第一个
				if (fadeActiveIndex.value != 0) {
					emits('before-change', fadeActiveIndex.value)
					fadeActiveIndex.value--
					if (timer.value) {
						clearInterval(timer.value)
						timer.value = null
					}
					setTimeout(() => {
						emits('change', fadeActiveIndex.value)
						setAutoplay()
						resolve()
					}, props.speed)
				} else {
					resolve()
				}
			}
		} else {
			if (transform.value >= 0) {
				resolve()
				return
			}
			apiDoSlide.value = true
			emits('before-change', oldIndex.value)
			if (timer.value) {
				clearInterval(timer.value)
				timer.value = null
			}
			addTransition().then(() => {
				transform.value = Dap.number.add(transform.value, slideSize.value)
				setTimeout(() => {
					slideDone().then(() => {
						apiDoSlide.value = false
						resolve()
					})
				}, props.speed)
			})
		}
	})
}
//窗口大小变化时更新swiper
const resizeChange = () => {
	sizeCounts.value++
	transform.value = -Dap.number.mutiply(activeIndex.value, slideSize.value)
}
//设置计时器自动播放
const setAutoplay = () => {
	if (children.value.length == 0) {
		return
	}
	if (props.autoplay && !timer.value && props.interval > props.speed) {
		timer.value = setInterval(() => {
			slideNext()
		}, props.interval)
	} else {
		if (timer.value) {
			clearInterval(timer.value)
			timer.value = null
		}
	}
}
//触摸开始(非fade)
const swiperTouchStart = (event: TouchEvent) => {
	if (children.value.length == 0) {
		return
	}
	if (!props.touchable) {
		return
	}
	if (apiDoSlide.value) {
		return
	}
	if (timer.value) {
		clearInterval(timer.value)
		timer.value = null
	}
	amounts.value = 0
	totalMove.value = 0
	if (props.vertical) {
		start.value = event.targetTouches[0].pageY
	} else {
		start.value = event.targetTouches[0].pageX
	}
	initStart.value = start.value
	removeTransition()
}
//触摸移动(非fade)
const swiperTouchMove = (event: TouchEvent) => {
	if (children.value.length == 0) {
		return
	}
	if (!props.touchable) {
		return
	}
	if (event.cancelable) {
		event.preventDefault()
	}
	let end = 0
	if (props.vertical) {
		end = event.targetTouches[0].pageY
	} else {
		end = event.targetTouches[0].pageX
	}
	let move = end - start.value
	//此次触摸总偏移值
	totalMove.value = end - initStart.value
	//向右滑动或者向下滑动
	if (totalMove.value > 0) {
		if (transform.value >= 0) {
			amounts.value++
			transform.value = Dap.number.add(transform.value, Dap.number.divide(move, amounts.value))
			start.value = end
			return
		}
	}
	//向左滑动或者向上滑动
	else {
		if (transform.value <= -Dap.number.mutiply(children.value.length - 1, slideSize.value)) {
			amounts.value++
			transform.value = Dap.number.add(transform.value, Dap.number.divide(move, amounts.value))
			start.value = end
			return
		}
	}
	start.value = end
	transform.value = Dap.number.add(transform.value, move)
}
//触摸结束(非fade)
const swiperTouchEnd = () => {
	if (children.value.length == 0) {
		return
	}
	if (!props.touchable) {
		return
	}
	addTransition().then(() => {
		transform.value = -Dap.number.mutiply(activeIndex.value, slideSize.value)
		setTimeout(() => {
			slideDone()
		}, props.speed)
	})
}
//鼠标按下(非fade)
const swiperMouseDown = (event: MouseEvent) => {
	if (children.value.length == 0) {
		return
	}
	if (!props.touchable) {
		return
	}
	if (apiDoSlide.value) {
		return
	}
	if (timer.value) {
		clearInterval(timer.value)
		timer.value = null
	}
	mouseDown.value = true
	amounts.value = 0
	totalMove.value = 0
	if (props.vertical) {
		start.value = event.pageY
	} else {
		start.value = event.pageX
	}
	initStart.value = start.value
	removeTransition()
}
//鼠标移动(非fade)
const swiperMouseMove = (event: MouseEvent) => {
	if (children.value.length == 0) {
		return
	}
	if (!props.touchable) {
		return
	}
	if (!mouseDown.value) {
		return
	}
	if (event.cancelable) {
		event.preventDefault()
	}
	let end = 0
	if (props.vertical) {
		end = event.pageY
	} else {
		end = event.pageX
	}
	let move = end - start.value
	//此次触摸总偏移值
	totalMove.value = end - initStart.value
	//向右滑动或者向下滑动
	if (totalMove.value > 0) {
		if (transform.value >= 0) {
			amounts.value++
			transform.value = Dap.number.add(transform.value, Dap.number.divide(move, amounts.value))
			start.value = end
			return
		}
	}
	//向左滑动或者向上滑动
	else {
		if (transform.value <= -Dap.number.mutiply(children.value.length - 1, slideSize.value)) {
			amounts.value++
			transform.value = Dap.number.add(transform.value, Dap.number.divide(move, amounts.value))
			start.value = end
			return
		}
	}
	start.value = end
	transform.value = Dap.number.add(transform.value, move)
}
//鼠标松开(非fade)
const swiperMouseUp = () => {
	if (children.value.length == 0) {
		return
	}
	if (!props.touchable) {
		return
	}
	if (!mouseDown.value) {
		return
	}
	mouseDown.value = false
	addTransition().then(() => {
		transform.value = -Dap.number.mutiply(activeIndex.value, slideSize.value)
		setTimeout(() => {
			slideDone()
		}, props.speed)
	})
}

watch(
	() => props.autoplay,
	() => {
		setAutoplay()
	}
)
watch(
	() => props.initialSlide,
	newValue => {
		if (props.fade) {
			useOpacity.value = false
			fadeActiveIndex.value = newValue
		} else {
			setDefaultSlide()
		}
	}
)

onMounted(() => {
	if (children.value.length == 0) {
		return
	}
	if (props.fade) {
		setAutoplay()
	} else {
		//处理循环
		if (props.loop && children.value.length > 0) {
			let copy_first = children.value[0].proxy!.$el.cloneNode(true)
			let copy_last = children.value[children.value.length - 1].proxy!.$el.cloneNode(true)
			wrapperRef.value!.append(copy_first)
			wrapperRef.value!.prepend(copy_last)
			// children.value.unshift({
			// 	$el: copy_last
			// })
			// children.value.push({
			// 	$el: copy_first
			// })
		}
		setDefaultSlide()
		Dap.event.on(document.documentElement, `mousemove.swiper_${instance.uid}`, swiperMouseMove)
		Dap.event.on(document.documentElement, `mouseup.swiper_${instance.uid}`, swiperMouseUp)
	}
	Dap.event.on(window, `resize.swiper_${instance.uid}`, resizeChange)
})

onBeforeUnmount(() => {
	if (timer.value) {
		clearInterval(timer.value)
		timer.value = null
	}
	//非fade模式下
	if (!props.fade) {
		Dap.event.off(document.documentElement, `mousemove.swiper_${instance.uid} mouseup.swiper_${instance.uid}`)
	}
	Dap.event.off(window, `resize.swiper_${instance.uid}`)
})

defineExpose({
	children,
	slideNext,
	slidePrev,
	slideTo
})
</script>

<template>
	<div ref="elRef" class="mvi-swiper-container" :class="{ vertical: vertical }" :style="{ width: width, height: height }">
		<div v-if="fade" class="mvi-swiper-fade">
			<slot></slot>
		</div>
		<div v-else class="mvi-swiper-wrapper" ref="wrapperRef" :style="wrapperStyle" @touchstart="swiperTouchStart" @touchmove="swiperTouchMove" @touchend="swiperTouchEnd" @mousedown="swiperMouseDown">
			<slot></slot>
		</div>
		<slot name="indicators" :active="indicatorsIndex" :total="indicatorsTotal" v-if="$slots.indicators"></slot>
		<div v-else-if="showIndicators" class="mvi-swiper-indicators">
			<template v-for="(_item, index) in children">
				<div class="mvi-swiper-indicator" :class="{ active: isIndicatorActive(index) }" :style="indicatorStyle(index)" v-if="indicatorShow(index)" @click="slideTo(fade ? index : loop ? index - 1 : index)"></div>
			</template>
		</div>
		<div class="mvi-swiper-control" v-if="showControl" :style="controlStyle(0)" @click="slidePrev">
			<Icon type="angle-left" />
		</div>
		<div class="mvi-swiper-control" v-if="showControl" :style="controlStyle(1)" @click="slideNext">
			<Icon type="angle-right" />
		</div>
	</div>
</template>

<style scoped src="./swiper.less"></style>
