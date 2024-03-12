<template>
	<div class="mvi-rich-image" ref="elRef" @mousewheel="scaleByWheel" @touchstart="scaleByTouch" @touchmove="scaleByTouch" @touchend="scaleByTouch" @mousedown="handleMouseOpt" @mouseup="handleMouseOpt" @click="handleClick">
		<Image ref="imgRef" fit="response" @mousedown="handleImageMouse" :style="imgStyle" width="100%" height="100%" :src="src" :load-icon="loadIcon" :error-icon="errorIcon"></Image>
	</div>
</template>

<script setup lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'
import Dap from 'dap-util'
import { Image } from '../image'
import { RichImageCoverType, RichImageDoubleTouchType, RichImagePointType, RichImageProps } from './props'

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
//鼠标或者手指在图片上每次移动时的坐标数据
const imageMovePoint = ref<RichImagePointType | null>(null)
//图片是否可以移动
const imageCanMove = ref<boolean>(false)
//鼠标在组件按下时的坐标点数据
const downPoint = ref<RichImagePointType | null>(null)
//鼠标在组件上松开时的坐标点数据
const upPoint = ref<RichImagePointType | null>(null)
//图片scale变更时的位置隐藏在容器中的数值
const imageCoverRect = ref<RichImageCoverType>({
	left: 0,
	top: 0,
	right: 0,
	bottom: 0
})
//触摸松开时是否触发了双指操作
const isTriggerDouble = ref<boolean>(false)

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
	imageCoverRect.value = getImageCoverData()
	rotate.value -= 90
}
//api：右旋转图片
const rightRotate = () => {
	translateX.value = 0
	translateY.value = 0
	scale.value = 1
	imageCoverRect.value = getImageCoverData()
	rotate.value += 90
}
//api：放大图片
const scaleUp = () => {
	if (scale.value < props.maxScale) {
		translateX.value = 0
		translateY.value = 0
		scale.value = Dap.number.add(scale.value, 0.1)
		imageCoverRect.value = getImageCoverData()
	}
}
//api：缩小图片
const scaleDown = () => {
	if (scale.value > props.minScale) {
		translateX.value = 0
		translateY.value = 0
		scale.value = Dap.number.subtract(scale.value, 0.1)
		imageCoverRect.value = getImageCoverData()
	}
}
//api：重置
const reset = () => {
	scale.value = 1
	imageCoverRect.value = getImageCoverData()
	translateX.value = 0
	translateY.value = 0
	rotate.value = 0
	emits('reset')
}
//获取两点间距离
const getPointSpacing = (pointA: TouchInit, pointB: TouchInit) => {
	let x = pointB.pageX! - pointA.pageX!
	let y = pointB.pageY! - pointA.pageY!
	return Math.sqrt(x * x + y * y)
}
//给图片元素增加动画效果，并且在300ms后移除动画效果
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
//获取图片元素被组件遮挡部分的数据，会在每次scal值更新时调用更新
const getImageCoverData = (): RichImageCoverType => {
	const imgRect = Dap.element.getElementBounding(imgRef.value!.$el)
	const elRect = Dap.element.getElementBounding(elRef.value)
	return {
		left: elRect.left - imgRect.left,
		top: elRect.top - imgRect.top,
		right: elRect.right - imgRect.right,
		bottom: elRect.bottom - imgRect.bottom
	}
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
//触摸移动或者鼠标按下移动的图片位置偏移处理
const setImageTranslate = (endX: number, endY: number) => {
	//这里乘以0.5的系数是为了防止移动过快
	const moveX = (endX - imageMovePoint.value!.x) * 0.5
	const moveY = (endY - imageMovePoint.value!.y) * 0.5

	const imgRect = imgRef.value!.$el.getBoundingClientRect()
	const elRect = elRef.value!.getBoundingClientRect()
	//向下移动
	if (moveY > 0 && imgRect.top >= elRect.bottom - elRect.height / 10) {
		return
	}
	//向上移动
	if (moveY < 0 && imgRect.bottom <= elRect.top + elRect.height / 10) {
		return
	}
	//向右移动
	if (moveX > 0 && imgRect.left >= elRect.right - elRect.height / 10) {
		return
	}
	//向左移动
	if (moveX < 0 && imgRect.right <= elRect.left + elRect.height / 10) {
		return
	}

	translateX.value += moveX
	translateY.value += moveY
	imageMovePoint.value = {
		x: endX,
		y: endY
	}
}
//触摸松开或者鼠标松开后的图片位置确认处理
const handleTranslateEnd = (event: MouseEvent | TouchEvent) => {
	setImageAnimation(() => {
		const elRect = elRef.value!.getBoundingClientRect()
		//图片达到底部边缘值
		if (translateY.value * scale.value >= elRect.height - elRect.height / 10 + imageCoverRect.value.top) {
			translateY.value = (elRect.height - elRect.height / 10 + imageCoverRect.value.top) / scale.value
		}
		//图片达到顶部边缘值
		if (translateY.value * scale.value <= -(elRect.height - elRect.height / 10 + imageCoverRect.value.bottom)) {
			translateY.value = -(elRect.height - elRect.height / 10 + imageCoverRect.value.bottom) / scale.value
		}
		//图片到达右侧边缘值
		if (translateX.value * scale.value >= elRect.width - elRect.width / 10 + imageCoverRect.value.left) {
			translateX.value = (elRect.width - elRect.width / 10 + imageCoverRect.value.left) / scale.value
		}
		//图片达到左侧边缘值
		if (translateX.value * scale.value <= -(elRect.width - elRect.width / 10 + imageCoverRect.value.right)) {
			translateX.value = -(elRect.width - elRect.width / 10 + imageCoverRect.value.right) / scale.value
		}
	})
	imageCanMove.value = false
	event.type == 'mouseup' ? emits('translate-mouseup') : emits('translate-touchend')
}
//监听触摸操作，进行平移和缩放
const scaleByTouch = (event: TouchEvent) => {
	//手指按下
	if (event.type == 'touchstart') {
		isTriggerDouble.value = false
		//双指触摸
		if (event.touches.length == 2) {
			emits('double-touchstart', event)
			//标识为双指触摸
			doubleTouch.value.is = true
			//此时不可移动图片
			imageCanMove.value = false
			//获取双指距离
			doubleTouch.value.spacing = getPointSpacing(event.touches[0], event.touches[1])
		}
		//单指触摸
		else {
			doubleTouch.value.is = false
			//大于1可以平移
			if (scale.value > 1) {
				emits('translate-touchstart', event)
				//记录坐标
				imageMovePoint.value = {
					x: event.targetTouches[0].pageX,
					y: event.targetTouches[0].pageY
				}
				//此时可以移动图片
				imageCanMove.value = true
			}
		}
	}
	//手指触摸移动
	else if (event.type == 'touchmove') {
		//双指触摸移动
		if (event.touches.length == 2 && doubleTouch.value.is) {
			if (event.cancelable) {
				event.preventDefault()
			}
			let spacing = getPointSpacing(event.touches[0], event.touches[1])
			//缩小
			if (spacing < doubleTouch.value.spacing!) {
				if (scale.value > props.minScale) {
					//平移重置
					translateX.value = 0
					translateY.value = 0
					//缩小
					scale.value = Dap.number.add(scale.value, Dap.number.divide(Dap.number.subtract(spacing, doubleTouch.value.spacing), elRef.value!.offsetWidth))
					imageCoverRect.value = getImageCoverData()
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
					imageCoverRect.value = getImageCoverData()
				}
			}
			doubleTouch.value.spacing = spacing
		}
		//单指触摸移动
		else {
			if (event.cancelable) {
				event.preventDefault()
			}
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
					imageCoverRect.value = getImageCoverData()
				})
			}
			isTriggerDouble.value = true
			doubleTouch.value.is = false
			emits('double-touchend', event)
		}
		//单指松开
		else {
			if (imageCanMove.value && !isTriggerDouble.value) {
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
//鼠标按下平移图片处理
const handleImageMouse = (event: MouseEvent) => {
	//鼠标按下
	if (event.type == 'mousedown') {
		if (scale.value <= 1) {
			return
		}
		emits('translate-mousedown', event)
		//记录坐标
		imageMovePoint.value = {
			x: event.pageX,
			y: event.pageY
		}
		//此时可以移动图片
		imageCanMove.value = true
	}
	//鼠标移动
	else if (event.type == 'mousemove') {
		if (event.cancelable) {
			event.preventDefault()
		}
		if (imageCanMove.value) {
			setImageTranslate(event.pageX, event.pageY)
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
