<template>
	<div class="mvi-rich-image" ref="elRef" @mousewheel="scaleByWheel" @touchstart="scaleByTouch" @touchmove="scaleByTouch" @touchend="scaleByTouch" @mousedown="handleMouseOpt" @mouseup="handleMouseOpt" @click="handleClick">
		<Image ref="imgRef" fit="fill" @mousedown="handleImageMouse" :style="imgStyle" width="100%" height="100%" :src="src" :load-icon="loadIcon" :error-icon="errorIcon"></Image>
	</div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'
import Dap from 'dap-util'
import { Image } from '../image'
import { RichImageDoubleTouchType, RichImagePointType, RichImageProps } from './props'

defineOptions({
	name: 'm-rich-image'
})

//实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(RichImageProps)

//事件
const emits = defineEmits(['double-touchstart', 'double-touchend', 'translate-touchstart', 'translate-touchend', 'translate-mousedown', 'translate-mouseup', 'reset', 'only-click'])

//双指数据
const doubleTouch = ref<RichImageDoubleTouchType>({
	is: false,
	spacing: 0
})
//图片缩放比例
const scale = ref<number>(1)
//图片水平偏移值
const translateX = ref<number>(0)
//图片垂直偏移值
const translateY = ref<number>(0)
//图片旋转值
const rotate = ref<number>(0)
//鼠标或者手指在图片上按下时的坐标数据
const imageDownPoint = ref<RichImagePointType | null>(null)
//鼠标或者手指在图片上每次移动时的坐标数据
const imageMovePoint = ref<RichImagePointType | null>(null)
//图片是否可以移动
const imageCanMove = ref<boolean>(false)
//鼠标在组件按下时的坐标点数据
const downPoint = ref<RichImagePointType | null>(null)
//鼠标在组件上松开时的坐标点数据
const upPoint = ref<RichImagePointType | null>(null)

const elRef = ref<HTMLElement | null>(null)
const imgRef = ref<InstanceType<typeof Image> | null>(null)

//图片样式
const imgStyle = computed<any>(() => {
	return {
		transform: `scale(${scale.value}) translate(${translateX.value}px,${translateY.value}px) rotate(${rotate.value}deg)`
	}
})

//api：左旋转图片
const leftRotate = () => {
	translateX.value = 0
	translateY.value = 0
	scale.value = 1
	rotate.value -= 90
}
//api：右旋转图片
const rightRotate = () => {
	translateX.value = 0
	translateY.value = 0
	scale.value = 1
	rotate.value += 90
}
//api：放大图片
const scaleUp = () => {
	if (scale.value < props.maxScale) {
		translateX.value = 0
		translateY.value = 0
		scale.value = Dap.number.add(scale.value, 0.1)
	}
}
//api：缩小图片
const scaleDown = () => {
	if (scale.value > props.minScale) {
		translateX.value = 0
		translateY.value = 0
		scale.value = Dap.number.subtract(scale.value, 0.1)
	}
}
//api：重置
const reset = () => {
	scale.value = 1
	translateX.value = 0
	translateY.value = 0
	rotate.value = 0
	emits('reset')
}
//滚轮缩放图片
const scaleByWheel = (event: WheelEvent) => {
	if (event.cancelable) {
		event.preventDefault()
	}
	//正值放大，负值缩小
	let deltaY = (<any>event).wheelDeltaY || -(<WheelEvent>event).deltaY
	//放大图片
	if (deltaY > 0) {
		scaleUp()
	}
	//缩小图片
	else {
		scaleDown()
	}
}
//获取两点间距离
const getPointSpacing = (pointA: TouchInit, pointB: TouchInit) => {
	let x = pointB.pageX! - pointA.pageX!
	let y = pointB.pageY! - pointA.pageY!
	return Math.sqrt(x * x + y * y)
}
//图片的动画效果设置
const setImageAnimation = (callback: () => void) => {
	return new Promise<void>(resolve => {
		imgRef.value!.$el.style.transition = 'transform 300ms'
		//重绘
		imgRef.value!.$el.offsetWidth
		callback()
		setTimeout(() => {
			imgRef.value!.$el.style.transition = ''
			imgRef.value!.$el.style.webkitTransition = ''
			//重绘
			imgRef.value!.$el.offsetWidth
			resolve()
		}, 300)
	})
}
//图片移动设置
const setImageTranslate = (endX: number, endY: number) => {
	const totalX = endX - imageDownPoint.value!.x
	const totalY = endY - imageDownPoint.value!.y
	const imgRect = imgRef.value!.$el.getBoundingClientRect()
	const elRect = elRef.value!.getBoundingClientRect()

	if (totalY > 0 && imgRect.top >= elRect.bottom - elRect.height / 10) {
		return
	}
	if (totalY < 0 && imgRect.bottom <= elRect.top + elRect.height / 10) {
		return
	}
	if (totalX > 0 && imgRect.left >= elRect.right - elRect.height / 10) {
		return
	}
	if (totalX < 0 && imgRect.right <= elRect.left + elRect.height / 10) {
		return
	}

	translateX.value += endX - imageMovePoint.value!.x
	translateY.value += endY - imageMovePoint.value!.y
	imageMovePoint.value = {
		x: endX,
		y: endY
	}
}
//图片移动后处理
const handleTranslateEnd = (event: MouseEvent | TouchEvent) => {
	const totalX = imageMovePoint.value!.x - imageDownPoint.value!.x
	const totalY = imageMovePoint.value!.y - imageDownPoint.value!.y
	const imgRect = imgRef.value!.$el.getBoundingClientRect()
	const elRect = elRef.value!.getBoundingClientRect()
	setImageAnimation(() => {
		// if (totalY > 0 && imgRect.top >= elRect.bottom - elRect.height / 10) {
		// 	translateY.value = elRect.height - elRect.height / 10
		// }
		// if (totalY < 0 && imgRect.bottom <= elRect.top + elRect.height / 10) {
		// 	translateY.value = -elRect.height + elRect.height / 10
		// }
		// if (totalX > 0 && imgRect.left >= elRect.right - elRect.height / 10) {
		// 	translateX.value = elRect.width - elRect.height / 10
		// }
		// if (totalX < 0 && imgRect.right <= elRect.left + elRect.height / 10) {
		// 	translateX.value = -elRect.width + elRect.height / 10
		// }
	})
	imageCanMove.value = false
	event.type == 'mouseup' ? emits('translate-mouseup') : emits('translate-touchend')
}
//双指缩放图片和平移
const scaleByTouch = (event: TouchEvent) => {
	if (event.cancelable) {
		event.preventDefault()
	}
	//手指按下
	if (event.type == 'touchstart') {
		//双指触摸
		if (event.touches.length == 2) {
			//标识为双指触摸
			doubleTouch.value.is = true
			//此时不可移动图片
			imageCanMove.value = false
			//获取双指距离
			doubleTouch.value.spacing = getPointSpacing(event.touches[0], event.touches[1])

			emits('double-touchstart', event)
		}
		//单指触摸
		else {
			doubleTouch.value.is = false
			//大于1可以平移
			if (scale.value > 1) {
				//记录按下的坐标
				imageDownPoint.value = {
					x: event.targetTouches[0].pageX,
					y: event.targetTouches[0].pageY
				}
				imageMovePoint.value = imageDownPoint.value
				//此时可以移动图片
				imageCanMove.value = true

				emits('translate-touchstart', event)
			}
		}
	}
	//手指触摸移动
	else if (event.type == 'touchmove') {
		//双指触摸移动
		if (event.touches.length == 2 && doubleTouch.value.is) {
			let spacing = getPointSpacing(event.touches[0], event.touches[1])
			//缩小
			if (spacing < doubleTouch.value.spacing!) {
				if (scale.value > props.minScale) {
					//平移重置
					translateX.value = 0
					translateY.value = 0
					//缩小
					scale.value = Dap.number.add(scale.value, Dap.number.divide(Dap.number.subtract(spacing, doubleTouch.value.spacing), elRef.value!.offsetWidth))
				}
			}
			//放大
			else {
				if (scale.value < props.maxScale) {
					//平移重置
					translateX.value = 0
					translateY.value = 0
					//放大
					scale.value = Dap.number.add(scale.value, Dap.number.divide(Dap.number.subtract(spacing, doubleTouch.value.spacing), elRef.value!.offsetWidth))
				}
			}
			doubleTouch.value.spacing = spacing
		}
		//单指触摸移动
		else {
			if (imageCanMove.value) {
				//设置图片移动
				setImageTranslate(event.targetTouches[0].pageX, event.targetTouches[0].pageY)
			}
		}
	}
	//手指触摸松开
	else if (event.type == 'touchend') {
		//双指松开
		if (doubleTouch.value.is) {
			//如果是缩小了，那么恢复正常大小
			if (scale.value < 1) {
				setImageAnimation(() => {
					scale.value = 1
				})
			}
			doubleTouch.value.is = false
			emits('double-touchend', event)
		}
		//单指松开
		else {
			if (imageCanMove.value) {
				handleTranslateEnd(event)
			}
		}
	}
}
//鼠标按下和松开记录坐标点
const handleMouseOpt = (event: MouseEvent) => {
	if (event.type == 'mousedown') {
		downPoint.value = {
			x: event.pageX,
			y: event.pageY
		}
	} else if (event.type == 'mouseup') {
		upPoint.value = {
			x: event.pageX,
			y: event.pageY
		}
	}
}
//点击事件，判断是否纯粹点击
const handleClick = () => {
	//关闭
	if (downPoint.value && upPoint.value && downPoint.value.x == upPoint.value.x && downPoint.value.y == upPoint.value.y) {
		emits('only-click')
	}
}
//图片上鼠标按下和移动以及松开处理
const handleImageMouse = (event: MouseEvent) => {
	if (event.cancelable) {
		event.preventDefault()
	}
	//鼠标按下
	if (event.type == 'mousedown') {
		if (scale.value <= 1) {
			return
		}
		//记录按下的坐标
		imageDownPoint.value = {
			x: event.pageX,
			y: event.pageY
		}
		imageMovePoint.value = imageDownPoint.value
		//此时可以移动图片
		imageCanMove.value = true

		emits('translate-mousedown', event)
	}
	//鼠标移动
	else if (event.type == 'mousemove') {
		if (imageCanMove.value) {
			let endX = event.pageX
			let endY = event.pageY
			setImageTranslate(endX, endY)
		}
	}
	//鼠标松开
	else if (event.type == 'mouseup') {
		if (imageCanMove.value) {
			handleTranslateEnd(event)
		}
	}
}

onMounted(() => {
	Dap.event.on(document.documentElement, `mousemove.richImage_${instance.uid}`, handleImageMouse)
	Dap.event.on(document.documentElement, `mouseup.richImage_${instance.uid}`, handleImageMouse)
})

onBeforeUnmount(() => {
	Dap.event.off(document.documentElement, `mousemove.richImage_${instance.uid} mouseup.richImage_${instance.uid}`)
})

defineExpose({
	leftRotate,
	rightRotate,
	scaleUp,
	scaleDown,
	reset
})
</script>

<style scoped src="./rich-image.less"></style>
