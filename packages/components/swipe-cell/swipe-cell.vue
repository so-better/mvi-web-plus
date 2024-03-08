<template>
	<div class="mvi-swipe-cell">
		<div class="mvi-swipe-cell-wrap" ref="wrapRef" @touchstart="cellTouchStart" @touchmove="cellTouchMove" @touchend="cellTouchEnd" :style="cellStyle" :disabled="disabled || null" @mousedown="cellMouseDown">
			<div v-show="leftShow" ref="leftRef" class="mvi-swipe-cell-left">
				<slot name="left"></slot>
			</div>
			<div class="mvi-swipe-cell-center" @click="clickCenter">
				<slot></slot>
			</div>
			<div v-show="rightShow" ref="rightRef" class="mvi-swipe-cell-right">
				<slot name="right"></slot>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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

const startX = ref<number>(0)
const startX2 = ref<number>(0)
//transform偏移值
const transformX = ref<number>(0)
//左侧是否显示
const leftShow = ref<boolean>(false)
//右侧是否显示
const rightShow = ref<boolean>(false)
const amounts = ref<number>(0)
//是否按下鼠标
const mouseDown = ref<boolean>(false)
//是否拖动
const isDrag = ref<boolean>(false)

const leftRef = ref<HTMLElement | null>(null)
const rightRef = ref<HTMLElement | null>(null)
const wrapRef = ref<HTMLElement | null>(null)

const cellStyle = computed<any>(() => {
	return {
		transform: `translateX(${transformX.value}px)`
	}
})

//设置tranform的方法
const setTransform = (val: number) => {
	return new Promise<void>(resolve => {
		wrapRef.value!.style.transition = 'transform 300ms'
		setTimeout(() => {
			transformX.value = val
			setTimeout(() => {
				wrapRef.value!.style.transition = ''
				resolve()
			}, 300)
		}, 0)
	})
}
//api：打开方法
const open = (placement: 'left' | 'right') => {
	if (props.disabled) {
		return
	}
	if (placement == 'left') {
		if (!leftShow.value) {
			leftShow.value = true
		}
		nextTick(() => {
			setTransform(leftRef.value!.offsetWidth).then(() => {
				emits('open', placement)
			})
		})
	} else if (placement == 'right') {
		if (!rightShow.value) {
			rightShow.value = true
		}
		nextTick(() => {
			setTransform(-rightRef.value!.offsetWidth).then(() => {
				emits('open', placement)
			})
		})
	}
}
//api：关闭方法（flag为true的时候不管是否disabled都会执行）
const close = (flag: boolean = false) => {
	if (!flag && props.disabled) {
		return
	}
	let placement = 'left'
	if (transformX.value == 0) {
		return
	}
	if (transformX.value >= 0) {
		placement = 'left'
	} else {
		placement = 'right'
	}
	setTransform(0).then(() => {
		leftShow.value = false
		rightShow.value = false
		emits('close', placement)
	})
}
//触摸开始
const cellTouchStart = (event: TouchEvent) => {
	if (props.disabled) {
		return
	}
	startX.value = event.touches[0].pageX
	startX2.value = startX.value
	amounts.value = 0
}
//触摸移动
const cellTouchMove = (event: TouchEvent) => {
	if (props.disabled) {
		return
	}
	let endX = event.touches[0].pageX
	//每次移动的偏移值
	let moveX = endX - startX.value
	//总偏移值
	let moveX2 = endX - startX2.value
	startX.value = endX
	if (Math.abs(moveX2) <= Dap.element.rem2px(1)) {
		return
	}
	if (event.cancelable) {
		event.preventDefault()
	}
	//右滑，展示左侧内容
	if (moveX2 > 0) {
		if (leftShow.value && transformX.value == leftRef.value!.offsetWidth) {
			return
		}
		leftShow.value = true
		nextTick(() => {
			if (transformX.value >= leftRef.value!.offsetWidth) {
				amounts.value += 8
				transformX.value += moveX / amounts.value
			} else {
				transformX.value += moveX
			}
		})
	}
	//左滑，展示右侧内容
	else if (moveX2 < 0) {
		if (rightShow.value && transformX.value == -rightRef.value!.offsetWidth) {
			return
		}
		rightShow.value = true
		nextTick(() => {
			if (transformX.value <= -rightRef.value!.offsetWidth) {
				amounts.value += 8
				transformX.value += moveX / amounts.value
			} else {
				transformX.value += moveX
			}
		})
	}
}
//触摸结束
const cellTouchEnd = (event: TouchEvent) => {
	if (props.disabled) {
		return
	}
	let moveX = event.changedTouches[0].pageX - startX2.value
	if (moveX == 0) {
		return
	}
	//右滑，展示左侧内容
	if (moveX > 0) {
		if (transformX.value > 0) {
			open('left')
		} else {
			close()
		}
	}
	//左滑，展示右侧内容
	else {
		if (transformX.value < 0) {
			open('right')
		} else {
			close()
		}
	}
}
//鼠标按下
const cellMouseDown = (event: MouseEvent) => {
	if (props.disabled) {
		return
	}
	startX.value = event.pageX
	startX2.value = startX.value
	amounts.value = 0
	mouseDown.value = true
}
//鼠标移动
const cellMouseMove = (event: MouseEvent) => {
	if (props.disabled) {
		return
	}
	if (!mouseDown.value) {
		return
	}
	isDrag.value = true
	let endX = event.pageX
	//每次移动的偏移值
	let moveX = endX - startX.value
	//总偏移值
	let moveX2 = endX - startX2.value
	startX.value = endX
	if (Math.abs(moveX2) <= Dap.element.rem2px(1)) {
		return
	}
	if (event.cancelable) {
		event.preventDefault()
	}
	//右滑，展示左侧内容
	if (moveX2 > 0) {
		if (leftShow.value && transformX.value == leftRef.value!.offsetWidth) {
			return
		}
		leftShow.value = true
		nextTick(() => {
			if (transformX.value >= leftRef.value!.offsetWidth) {
				amounts.value += 3
				transformX.value += moveX / amounts.value
			} else {
				transformX.value += moveX
			}
		})
	}
	//左滑，展示右侧内容
	else if (moveX2 < 0) {
		if (rightShow.value && transformX.value == -rightRef.value!.offsetWidth) {
			return
		}
		rightShow.value = true
		nextTick(() => {
			if (transformX.value <= -rightRef.value!.offsetWidth) {
				amounts.value += 3
				transformX.value += moveX / amounts.value
			} else {
				transformX.value += moveX
			}
		})
	}
}
//鼠标松开
const cellMouseUp = (event: MouseEvent) => {
	if (props.disabled) {
		return
	}
	if (!mouseDown.value) {
		return
	}
	mouseDown.value = false
	let moveX = event.pageX - startX2.value
	if (moveX == 0) {
		return
	}
	//右滑，展示左侧内容
	if (moveX > 0) {
		if (transformX.value > 0) {
			open('left')
		} else {
			close()
		}
	}
	//左滑，展示右侧内容
	else {
		if (transformX.value < 0) {
			open('right')
		} else {
			close()
		}
	}
	setTimeout(() => {
		isDrag.value = false
	}, 10)
}
//点击center部分
const clickCenter = () => {
	if (props.disabled) {
		return
	}
	if (isDrag.value) {
		return
	}
	if (props.centerClose) {
		close()
	}
}

watch(
	() => props.disabled,
	() => {
		close(true)
	}
)

onMounted(() => {
	Dap.event.on(document.documentElement, `mousemove.swipeCell_${instance.uid}`, cellMouseMove)
	Dap.event.on(document.documentElement, `mouseup.swipeCell_${instance.uid}`, cellMouseUp)
})
onBeforeUnmount(() => {
	Dap.event.off(document.documentElement, `mousemove.swipeCell_${instance.uid} mouseup.swipeCell_${instance.uid}`)
})

defineExpose({
	open,
	close
})
</script>
<style scoped src="./swipe-cell.less"></style>
