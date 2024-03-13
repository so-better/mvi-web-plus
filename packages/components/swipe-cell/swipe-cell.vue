<template>
	<div class="mvi-swipe-cell">
		<div class="mvi-swipe-cell-wrapper" ref="wrapperRef" :style="wrapperStyle">
			<div v-if="$slots.left" ref="leftRef" class="mvi-swipe-cell-left">
				<slot name="left"></slot>
			</div>
			<div class="mvi-swipe-cell-center" @mousedown="handleMouseOpt" @touchstart="handleTouchOpt" @touchmove="handleTouchOpt" @touchend="handleTouchOpt">
				<slot></slot>
			</div>
			<div v-if="$slots.right" ref="rightRef" class="mvi-swipe-cell-right">
				<slot name="right"></slot>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Dap from 'dap-util'
import { SwipeCellProps } from './props'

defineOptions({
	name: 'm-swipe-cell'
})

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(SwipeCellProps)

//事件
const emits = defineEmits(['open', 'close'])

//左侧元素
const leftRef = ref<HTMLElement | null>(null)
//右侧元素
const rightRef = ref<HTMLElement | null>(null)
//wrapper元素
const wrapperRef = ref<HTMLElement | null>(null)
//水平移动值
const translateX = ref<number>(0)
//鼠标是否按下
const isDown = ref<boolean>(false)
//初始时横坐标
const startX = ref<number>(0)
//每一次移动的横坐标
const movingX = ref<number>(0)
//是否打开
const openStatus = ref<'left' | 'right' | ''>('') //'left'表示左侧打开，'right'表示右侧打开，''表示未打开
//动画延时器
const animationTimer = ref<any>(null)

//平移样式
const wrapperStyle = computed<any>(() => {
	return {
		transform: `translate3d(${translateX.value}px, 0px, 0px)`
	}
})

//设置动画
const setAnimation = (callback: () => void, timeout = 600) => {
	return new Promise<void>(resolve => {
		if (wrapperRef.value) {
			wrapperRef.value.style.transition = `transform ${timeout}ms cubic-bezier(.18,.89,.32,1)`
			//重绘
			wrapperRef.value.offsetWidth
			if (typeof callback == 'function') {
				callback()
			}
			if (animationTimer.value) {
				clearTimeout(animationTimer.value)
			}
			animationTimer.value = setTimeout(() => {
				if (wrapperRef.value) {
					wrapperRef.value.style.transition = ''
					//重绘
					wrapperRef.value.offsetWidth
				}
				resolve()
			}, timeout)
		}
	})
}
//api：打开
const open = (placement: 'left' | 'right' = 'left') => {
	//已禁用
	if (props.disabled) {
		return
	}
	//打开左侧
	if (placement == 'left') {
		//左侧元素不存在
		if (!leftRef.value) {
			return
		}
		//左侧已打开(这里不用openStatuc来作判断是因为有时候关闭到一半的情况下可能需要重新打开，必须通过偏移值来判断，此时openStatus还是打开状态)
		if (translateX.value == leftRef.value.offsetWidth) {
			return
		}
		//执行打开动画
		setAnimation(() => {
			if (leftRef.value) {
				translateX.value = leftRef.value.offsetWidth
			}
		}).then(() => {
			if (openStatus.value == placement) {
				return
			}
			openStatus.value = placement
			emits('open', placement)
		})
	}
	//打开右侧
	else {
		//右侧元素不存在
		if (!rightRef.value) {
			return
		}
		//右侧已打开
		if (translateX.value == -rightRef.value.offsetWidth) {
			return
		}
		//执行右侧打开动画
		setAnimation(() => {
			if (rightRef.value) {
				translateX.value = -rightRef.value.offsetWidth
			}
		}).then(() => {
			if (openStatus.value == placement) {
				return
			}
			openStatus.value = placement
			emits('open', placement)
		})
	}
}
//api：关闭
const close = () => {
	//已禁用
	if (props.disabled) {
		return
	}
	//当前已经是关闭状态
	if (translateX.value == 0) {
		return
	}
	//执行关闭动画
	setAnimation(() => {
		translateX.value = 0
	}).then(() => {
		if (openStatus.value) {
			emits('close', openStatus.value)
			openStatus.value = ''
		}
	})
}
//鼠标事件处理
const handleMouseOpt = (event: MouseEvent) => {
	//已禁用
	if (props.disabled) {
		return
	}
	//鼠标按下
	if (event.type == 'mousedown') {
		//修改标识
		isDown.value = true
		//记录初始位置
		startX.value = event.pageX
		movingX.value = event.pageX
	}
	//鼠标移动
	else if (event.type == 'mousemove') {
		//在鼠标按下的前提下
		if (isDown.value) {
			if (event.cancelable) {
				event.preventDefault()
			}
			//此次移动的距离
			const moveX = event.pageX - movingX.value

			//往右滑如果偏移值超出最大值则阻止
			if (moveX > 0) {
				const width = leftRef.value ? leftRef.value.offsetWidth : Dap.element.rem2px(0.1)
				if (translateX.value >= width) {
					return
				}
			}
			//往左滑如果偏移值超出最大值则阻止
			if (moveX < 0) {
				const width = rightRef.value ? rightRef.value.offsetWidth : Dap.element.rem2px(0.1)
				if (translateX.value <= -width) {
					return
				}
			}
			//更新偏移值
			translateX.value += moveX
			//记录移动时的坐标点
			movingX.value = event.pageX
		}
	}
	//鼠标松开
	else if (event.type == 'mouseup') {
		//在鼠标按下的前提下
		if (isDown.value) {
			//更新标识
			isDown.value = false
			//松开位置和初始位置一致表示单击事件
			if (event.pageX == startX.value) {
				//如果centerClose为true，则关闭
				if (props.centerClose) {
					close()
				}
				return
			}

			//往右滑
			if (translateX.value > 0) {
				//左侧内容存在
				if (leftRef.value) {
					//左侧内容宽度
					const width = leftRef.value.offsetWidth
					//超出左侧内容宽度的一半
					if (translateX.value > width / 2) {
						//执行打开动画
						setAnimation(() => {
							translateX.value = width
						}).then(() => {
							if (openStatus.value == 'left') {
								return
							}
							//更新状态
							openStatus.value = 'left'
							emits('open', openStatus.value)
						})
					}
					//没有超出左侧内容的一半
					else {
						//执行关闭动画
						setAnimation(() => {
							translateX.value = 0
						}).then(() => {
							//更新状态
							if (openStatus.value) {
								emits('close', openStatus.value)
								openStatus.value = ''
							}
						})
					}
				}
				//左侧内容不存在
				else {
					//执行关闭动画
					setAnimation(() => {
						translateX.value = 0
					}).then(() => {
						//更新状态
						if (openStatus.value) {
							emits('close', openStatus.value)
							openStatus.value = ''
						}
					})
				}
			}
			//往左滑
			if (translateX.value < 0) {
				//右侧内容存在
				if (rightRef.value) {
					//右侧内容宽度
					const width = rightRef.value.offsetWidth
					//超出右侧内容宽度的一半
					if (translateX.value < -width / 2) {
						//执行打开动画
						setAnimation(() => {
							translateX.value = -width
						}).then(() => {
							if (openStatus.value == 'right') {
								return
							}
							//更新状态
							openStatus.value = 'right'
							emits('open', openStatus.value)
						})
					}
					//没有右侧左侧内容的一半
					else {
						//执行关闭动画
						setAnimation(() => {
							translateX.value = 0
						}).then(() => {
							//更新状态
							if (openStatus.value) {
								emits('close', openStatus.value)
								openStatus.value = ''
							}
						})
					}
				}
				//右侧内容不存在
				else {
					//执行关闭动画
					setAnimation(() => {
						translateX.value = 0
					}).then(() => {
						//更新状态
						if (openStatus.value) {
							emits('close', openStatus.value)
							openStatus.value = ''
						}
					})
				}
			}
		}
	}
}
//触摸事件处理
const handleTouchOpt = (event: TouchEvent) => {
	//已禁用
	if (props.disabled) {
		return
	}
	//开始触摸
	if (event.type == 'touchstart') {
		//记录初始位置
		startX.value = event.targetTouches[0].pageX
		movingX.value = event.targetTouches[0].pageX
	}
	//触摸移动
	else if (event.type == 'touchmove') {
		if (event.cancelable) {
			event.preventDefault()
		}
		//此次移动的距离
		const moveX = event.targetTouches[0].pageX - movingX.value

		//往右滑如果偏移值超出最大值则阻止
		if (moveX > 0) {
			const width = leftRef.value ? leftRef.value.offsetWidth : Dap.element.rem2px(0.1)
			if (translateX.value >= width) {
				return
			}
		}
		//往左滑如果偏移值超出最大值则阻止
		if (moveX < 0) {
			const width = rightRef.value ? rightRef.value.offsetWidth : Dap.element.rem2px(0.1)
			if (translateX.value <= -width) {
				return
			}
		}

		//更新偏移值
		translateX.value += moveX
		//记录移动时的坐标点
		movingX.value = event.targetTouches[0].pageX
	}
	//触摸松开
	else if (event.type == 'touchend') {
		//松开位置和初始位置一致表示单击事件
		if (event.changedTouches[0].pageX == startX.value) {
			//如果centerClose为true，则关闭
			if (props.centerClose) {
				close()
			}
			return
		}

		//往右滑
		if (translateX.value > 0) {
			//左侧内容存在
			if (leftRef.value) {
				//左侧内容宽度
				const width = leftRef.value.offsetWidth
				//超出左侧内容宽度的一半
				if (translateX.value > width / 2) {
					//执行打开动画
					setAnimation(() => {
						translateX.value = width
					}).then(() => {
						if (openStatus.value == 'left') {
							return
						}
						//更新状态
						openStatus.value = 'left'
						emits('open', openStatus.value)
					})
				}
				//没有超出左侧内容的一半
				else {
					//执行关闭动画
					setAnimation(() => {
						translateX.value = 0
					}).then(() => {
						//更新状态
						if (openStatus.value) {
							emits('close', openStatus.value)
							openStatus.value = ''
						}
					})
				}
			}
			//左侧内容不存在
			else {
				//执行关闭动画
				setAnimation(() => {
					translateX.value = 0
				}).then(() => {
					//更新状态
					if (openStatus.value) {
						emits('close', openStatus.value)
						openStatus.value = ''
					}
				})
			}
		}
		//往左滑
		if (translateX.value < 0) {
			//右侧内容存在
			if (rightRef.value) {
				//右侧内容宽度
				const width = rightRef.value.offsetWidth
				//超出右侧内容宽度的一半
				if (translateX.value < -width / 2) {
					//执行打开动画
					setAnimation(() => {
						translateX.value = -width
					}).then(() => {
						if (openStatus.value == 'right') {
							return
						}
						//更新状态
						openStatus.value = 'right'
						emits('open', openStatus.value)
					})
				}
				//没有右侧左侧内容的一半
				else {
					//执行关闭动画
					setAnimation(() => {
						translateX.value = 0
					}).then(() => {
						//更新状态
						if (openStatus.value) {
							emits('close', openStatus.value)
							openStatus.value = ''
						}
					})
				}
			}
			//右侧内容不存在
			else {
				//执行关闭动画
				setAnimation(() => {
					translateX.value = 0
				}).then(() => {
					//更新状态
					if (openStatus.value) {
						emits('close', openStatus.value)
						openStatus.value = ''
					}
				})
			}
		}
	}
}

watch(
	() => props.disabled,
	newVal => {
		//已禁用并且是打开的情况下
		if (newVal && translateX.value) {
			setAnimation(() => {
				translateX.value = 0
			}).then(() => {
				if (openStatus.value) {
					emits('close', openStatus.value)
					openStatus.value = ''
				}
			})
		}
	}
)

onMounted(() => {
	Dap.event.on(document.documentElement, `mousemove.swipeCell_${instance.uid} mouseup.swipeCell_${instance.uid}`, handleMouseOpt)
})
onBeforeUnmount(() => {
	if (animationTimer.value) {
		clearTimeout(animationTimer.value)
		animationTimer.value = null
	}
	Dap.event.off(document.documentElement, `mousemove.swipeCell_${instance.uid} mouseup.swipeCell_${instance.uid}`)
})

defineExpose({
	open,
	close
})
</script>
<style scoped src="./swipe-cell.less"></style>
