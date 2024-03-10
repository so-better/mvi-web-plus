<template>
	<div class="mvi-carousel">
		<div v-if="mode == 'fade'" class="mvi-carousel-fades">
			<slot></slot>
		</div>
		<div v-else-if="mode == 'slide'" class="mvi-carousel-slides" ref="slidesRef" :style="slidesStyle" :class="{ vertical: vertical }" @touchstart="handleTouchstart" @touchmove="handleTouchmove" @touchend="handleTouchEnd">
			<LastCarouselItem />
			<slot></slot>
			<FirstCarouselItem />
		</div>
		<template v-if="cmpIndicators.show">
			<slot name="indicators" v-if="$slots.indicators" :total="publicChildren.length"></slot>
			<div v-else class="mvi-carousel-indicators">
				<div v-for="(_item, index) in publicChildren.length" class="mvi-carousel-indicator" :class="{ current: props.modelValue == index }" :style="{ color: props.modelValue == index ? cmpIndicators.active : cmpIndicators.inactive }" @click="setIndex(index, true)"></div>
			</div>
		</template>
		<template v-if="controls">
			<slot name="controls" v-if="$slots.controls" :total="publicChildren.length"></slot>
			<template v-else>
				<div @click="setPrev" class="mvi-carousel-controls controls-back">
					<Icon type="angle-left" />
				</div>
				<div @click="setNext" class="mvi-carousel-controls controls-forward">
					<Icon type="angle-right" />
				</div>
			</template>
		</template>
	</div>
</template>
<script setup lang="ts">
import { ComponentInternalInstance, cloneVNode, computed, defineComponent, getCurrentInstance, nextTick, onMounted, provide, ref, watch } from 'vue'
import Dap from 'dap-util'
import { Icon } from '../icon'
import { CarouselIndicatorsType, CarouselProps } from './props'
import { componentIsMatch } from '../../utils'

defineOptions({
	name: 'm-carousel'
})

//获取实例
const instance = getCurrentInstance()!

//插槽内容是否匹配判定
componentIsMatch(instance, 'm-carousel-item', ['Carousel', 'CarouselItem'])

//属性
const props = defineProps(CarouselProps)

//事件
const emits = defineEmits(['update:modelValue', 'change'])

//存放CarouselItem组件的数组，当循环滑动时复制的两个item也会包括在内
const children = ref<ComponentInternalInstance[]>([])

provide('carousel', instance)
provide('carouselItemChildren', children)

const autoplayTimer = ref<any>(null)
const slidesRef = ref<HTMLElement | null>(null)
//滑动偏移值
const slideValue = ref<number>(0)
//第一次滑动的触摸点位置
const initTouchPoint = ref<number>(0)
//每一次滑动的触摸点位置
const everyTouchPoint = ref<number>(0)
//触摸滑动的总滑动距离
const touchTotal = ref<number>(0)

//分页器配置
const cmpIndicators = computed<CarouselIndicatorsType>(() => {
	let indicators: CarouselIndicatorsType = {
		show: false,
		active: '',
		inactive: ''
	}
	if (typeof props.indicators == 'boolean') {
		indicators.show = props.indicators
	} else if (Dap.common.isObject(props.indicators)) {
		if (typeof props.indicators.show == 'boolean') {
			indicators.show = props.indicators.show
		}
		if (typeof props.indicators.active == 'string' && props.indicators.active) {
			indicators.active = props.indicators.active
		}
		if (typeof props.indicators.inactive == 'string' && props.indicators.inactive) {
			indicators.inactive = props.indicators.inactive
		}
	}
	return indicators
})
//滑动容器样式
const slidesStyle = computed<any>(() => {
	let style: any = {}
	if (props.vertical) {
		style.height = `calc(100% * ${children.value.length})`
		style.transform = `translateY(${slideValue.value}px)`
	} else {
		style.width = `calc(100% * ${children.value.length})`
		style.transform = `translateX(${slideValue.value}px)`
	}
	return style
})
//滑动循环模式下实际展示的CarouselItem实例数组
const publicChildren = computed(() => {
	if (props.mode == 'slide' && props.loop) {
		return children.value.filter((_child, index) => {
			return index > 0 && index < children.value.length - 1
		})
	}
	return children.value
})
//单张CarouselItem的尺寸
const carouselItemSize = computed<number>(() => {
	if (!slidesRef.value) {
		return 0
	}
	return (props.vertical ? slidesRef.value.offsetHeight : slidesRef.value.offsetWidth) / children.value.length
})

//滑动循环模式下克隆第一个CarouselItem
const FirstCarouselItem = defineComponent(() => {
	return () => {
		if (props.loop) {
			const vnodes = instance.slots.default!()
			return cloneVNode(vnodes[0])
		}
		return null
	}
})
//滑动循环模式下克隆最后一个CarouselItem
const LastCarouselItem = defineComponent(() => {
	return () => {
		if (props.loop) {
			const vnodes = instance.slots.default!()
			return cloneVNode(vnodes[vnodes.length - 1])
		}
		return null
	}
})

//更新当前modelValue，reset是true则会重新autoplay
const setIndex = (val: number, reset: boolean = false) => {
	emits('update:modelValue', val)
	emits('change', val)
	if (reset && props.autoplay) {
		setAutoplay()
	}
}
//设置自动播放
const setAutoplay = () => {
	if (!props.autoplay) {
		return
	}
	if (autoplayTimer.value) {
		clearInterval(autoplayTimer.value)
		autoplayTimer.value = null
	}
	autoplayTimer.value = setInterval(() => {
		//如果是循环
		if (props.loop) {
			setIndex(props.modelValue == publicChildren.value.length - 1 ? 0 : props.modelValue + 1)
		}
		//非循环
		else {
			//判断是否到最后一个CarouselItem
			const isLast = props.modelValue == publicChildren.value.length - 1
			//如果是最后一个CarouselItem则清除计时器
			if (isLast) {
				clearInterval(autoplayTimer.value)
				autoplayTimer.value = null
				return
			}
			setIndex(props.modelValue + 1)
		}
	}, props.interval)
}
//跳到上一个CarouselItem
const setPrev = () => {
	//循环模式下
	if (props.loop) {
		setIndex(props.modelValue == 0 ? publicChildren.value.length - 1 : props.modelValue - 1, true)
	}
	//非循环模式下
	else {
		//如果在第一个CarouselItem
		if (props.modelValue == 0) {
			return
		}
		setIndex(props.modelValue - 1, true)
	}
}
//跳到下一个CarouselItem
const setNext = () => {
	//循环模式下
	if (props.loop) {
		setIndex(props.modelValue == publicChildren.value.length - 1 ? 0 : props.modelValue + 1, true)
	}
	//非循环模式下
	else {
		//如果在最后一个CarouselItem
		if (props.modelValue == publicChildren.value.length - 1) {
			return
		}
		setIndex(props.modelValue + 1, true)
	}
}
//添加滑动动画
const addSlideAnimation = () => {
	slidesRef.value!.style.transition = `transform ${props.speed}ms linear`
	//重绘
	slidesRef.value!.offsetWidth
}
//移除滑动动画
const removeSlideAnimation = () => {
	slidesRef.value!.style.transition = ''
	//重绘
	slidesRef.value!.offsetWidth
}
//设定偏移值，如果参数value不设置则表示根据modelValue设定偏移值
const setSlideValue = (animation: boolean = false, value: number | undefined = undefined): Promise<void> => {
	return new Promise<void>(resolve => {
		if (!slidesRef.value) {
			return resolve()
		}
		if (animation) {
			addSlideAnimation()
		} else {
			removeSlideAnimation()
		}
		//纵向轮播
		if (props.vertical) {
			//单张高度
			const height = slidesRef.value.offsetHeight / children.value.length
			//设置偏移值
			if (value === undefined) {
				slideValue.value = -(props.loop ? props.modelValue + 1 : props.modelValue) * height
			} else {
				slideValue.value = value
			}
		}
		//横向轮播
		else {
			//单张宽度
			const width = slidesRef.value.offsetWidth / children.value.length
			//设置偏移值
			if (value === undefined) {
				slideValue.value = -(props.loop ? props.modelValue + 1 : props.modelValue) * width
			} else {
				slideValue.value = value
			}
		}

		nextTick(() => {
			setTimeout(() => {
				if (animation) {
					setTimeout(() => {
						removeSlideAnimation()
						resolve()
					}, props.speed)
				} else {
					resolve()
				}
			}, 0)
		})
	})
}
//设定偏移值到第一个CarouselItem的克隆体
const slideToFirstCarouselItem = (): Promise<void> => {
	return new Promise<void>(resolve => {
		if (!props.loop || !slidesRef.value) {
			return resolve()
		}
		if (props.vertical) {
			//单张高度
			const height = slidesRef.value.offsetHeight / children.value.length
			//设置偏移值
			setSlideValue(false, -(children.value.length - 1) * height).then(() => {
				resolve()
			})
		}
		//横向轮播
		else {
			//单张宽度
			const width = slidesRef.value.offsetWidth / children.value.length
			//设置偏移值
			setSlideValue(false, -(children.value.length - 1) * width).then(() => {
				resolve()
			})
		}
	})
}
//设定偏移值到最后一个CarouselItem的克隆体
const slideToLastCarouselItem = (): Promise<void> => {
	return new Promise<void>(resolve => {
		if (!props.loop || !slidesRef.value) {
			return resolve()
		}
		//设置偏移值
		setSlideValue(false, 0).then(() => {
			resolve()
		})
	})
}
//手势触摸按下
const handleTouchstart = (e: TouchEvent) => {
	//event.targetTouches[0].pageY
	//event.changedTouches[0].pageY
	if (props.touchable) {
		removeSlideAnimation()
		//记录按下时的点位置
		initTouchPoint.value = props.vertical ? e.targetTouches[0].pageY : e.targetTouches[0].pageX
		everyTouchPoint.value = initTouchPoint.value
		//重置滑动总距离
		touchTotal.value = 0
	}
}
//手势触摸滑动
const handleTouchmove = (e: TouchEvent) => {
	if (props.touchable) {
		e.preventDefault()
		//移动到的点
		const point = props.vertical ? e.targetTouches[0].pageY : e.targetTouches[0].pageX
		//设置总滑动距离
		const moveTotal = point - initTouchPoint.value
		//如果总滑动距离大于单张尺寸，则不可继续滑动
		if (Math.abs(moveTotal) >= carouselItemSize.value) {
			return
		}
		touchTotal.value = moveTotal
		//设定偏移值
		slideValue.value = slideValue.value + (point - everyTouchPoint.value)
		//更新每次的触摸点
		everyTouchPoint.value = point
	}
}
//手势触摸松开
const handleTouchEnd = () => {
	if (props.touchable) {
		//滑动后处理
		slideDone()
	}
}
//滑动后处理
const slideDone = () => {
	return new Promise<void>(resolve => {
		if (!slidesRef.value || props.mode != 'slide') {
			return resolve()
		}
		//纵向轮播
		if (props.vertical) {
		}
		//横向轮播
		else {
			//循环模式下
			if (props.loop) {
				let num = 0
				//滑动距离除以单张宽度的余数大于单张宽度的三分之一
				if (Math.abs(touchTotal.value) > carouselItemSize.value / 3) {
					//如果touchTotal小于0表示从右往左滑动，反之表示从左往右滑动
					num = touchTotal.value < 0 ? num + 1 : num - 1
				}
				//表示展示的CarouselItem没有变
				if (num == 0) {
					setSlideValue(true, -(props.modelValue + 1) * carouselItemSize.value)
				}
				//展示的CarouselItem变了后先进行动画，然后更新modelValue
				else {
					// //滑动到了最后一个CarouselItem的克隆体上
					// if (props.modelValue + num == -1) {
					// 	setSlideValue(false, ).then(() => {
					// 		setSlideValue(false)
					// 		resolve()
					// 	})
					// 	setIndex(publicChildren.value.length - 1, true)
					// }
					// //滑动到了第一个CarouselItem的克隆体上
					// else if (props.modelValue + num == publicChildren.value.length) {
					// 	// setSlideValue(true, -(children.value.length - 1) * carouselItemSize.value).then(() => {
					// 	// 	resolve()
					// 	// })
					// 	setIndex(props.modelValue + num, true)
					// } else {
					// 	setIndex(props.modelValue + num, true)
					// }
				}
			}
			//非循环模式下
			else {
				//拉到最左侧恢复到第一个
				if (slideValue.value > 0) {
					setSlideValue(true, 0).then(() => {
						resolve()
					})
				}
				//拉倒最右侧恢复到最后一个
				else if (slideValue.value < -((children.value.length - 1) * carouselItemSize.value)) {
					setSlideValue(true, -((children.value.length - 1) * carouselItemSize.value)).then(() => {
						resolve()
					})
				}
				//正常情况
				else {
					let num = 0
					//滑动距离除以单张宽度的余数大于单张宽度的三分之一
					if (Math.abs(touchTotal.value) > carouselItemSize.value / 3) {
						//如果touchTotal小于0表示从右往左滑动，反之表示从左往右滑动
						num = touchTotal.value < 0 ? num + 1 : num - 1
					}
					//表示展示的CarouselItem没有变
					if (num == 0) {
						setSlideValue(true, -props.modelValue * carouselItemSize.value)
					}
					//更新modelValue
					else {
						setIndex(props.modelValue + num, true)
					}
				}
			}
		}
	})
}

//监听modelValue变化更新轮播视图
watch(
	() => props.modelValue,
	(newVal, oldVal) => {
		//滑动模式下
		if (props.mode == 'slide') {
			//循环模式下，如果是从最后一个CarouselItem跳到第一个
			if (props.loop && oldVal == publicChildren.value.length - 1 && newVal == 0) {
				//偏移值设定到其克隆体上
				slideToLastCarouselItem().then(() => {
					setSlideValue(true)
				})
			}
			//循环模式下，如果是从第一个CarouseItem跳到最后一个
			else if (props.loop && oldVal == 0 && newVal == publicChildren.value.length - 1) {
				//偏移值设定到其克隆体上
				slideToFirstCarouselItem().then(() => {
					setSlideValue(true)
				})
			}
			//其他
			else {
				setSlideValue(true)
			}
		}
	}
)

onMounted(() => {
	nextTick(() => {
		//如果是滑动效果则需要设置初始的偏移值
		if (props.mode == 'slide') {
			setSlideValue()
		}
		//如果是循环
		if (props.autoplay) {
			setAutoplay()
		}
	})
})
</script>
<style scoped src="./carousel.less"></style>
