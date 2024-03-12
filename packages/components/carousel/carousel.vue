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
				<div v-for="(_item, index) in publicChildren.length" class="mvi-carousel-indicator" :class="{ current: props.modelValue == index }" :style="{ background: props.modelValue == index ? cmpIndicators.active : cmpIndicators.inactive }" @click="setIndex(index, true)"></div>
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
import { Animator, Clip } from 'animator-clip'

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

//自动播放计时器
const autoplayTimer = ref<any>(null)
//滑动元素
const slidesRef = ref<HTMLElement | null>(null)
//滑动动画实例
const slideAnimation = ref<Animator | null>(null)
//当前的偏移值
const currentSlideValue = ref<number>(0)
//第一次滑动的触摸点位置
const initTouchPoint = ref<number>(0)
//每一次滑动的触摸点位置
const everyTouchPoint = ref<number>(0)
//触摸滑动的总滑动距离
const touchTotal = ref<number>(0)
//滑动模式下更改modelValue是否标记为懒更新
const lazyUpdate = ref<boolean>(false)
//每帧间隔时间
const clipInterval = ref<number>(1000 / 60)

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
	} else {
		style.width = `calc(100% * ${children.value.length})`
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
		if (props.loop && publicChildren.value.length) {
			return cloneVNode(publicChildren.value[0].vnode)
		}
		return null
	}
})
//滑动循环模式下克隆最后一个CarouselItem
const LastCarouselItem = defineComponent(() => {
	return () => {
		if (props.loop && publicChildren.value.length) {
			return cloneVNode(publicChildren.value[publicChildren.value.length - 1].vnode)
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
	}, props.interval + props.speed)
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
//设定偏移值，如果参数value不设置则表示根据modelValue设定偏移值
const setSlideValue = (animation: boolean = false, value: number | undefined = undefined): Promise<void> => {
	return new Promise<void>(resolve => {
		if (!slidesRef.value) {
			return resolve()
		}
		if (!slideAnimation.value) {
			return resolve()
		}
		let slideValue = 0
		//设置偏移值
		if (value === undefined) {
			slideValue = -(props.loop ? props.modelValue + 1 : props.modelValue) * carouselItemSize.value
		} else {
			slideValue = value
		}

		//根据帧率计算出速度
		const speed = Math.abs(currentSlideValue.value - slideValue) / (props.speed / clipInterval.value)

		const clip = new Clip({
			style: 'left',
			value: slideValue + 'px',
			speed: animation ? (currentSlideValue.value > slideValue ? -speed : speed) : slideValue - currentSlideValue.value
		})

		clip.on('update', (_el: HTMLElement, _style: string, value: number) => {
			currentSlideValue.value = value
		})

		clip.on('complete', () => {
			resolve()
		})
		clip.on('stop', () => {
			resolve()
		})

		slideAnimation.value.stop()
		slideAnimation.value.addClip(clip)
		clip.start()
	})
}
//手势触摸按下
const handleTouchstart = (e: TouchEvent) => {
	if (props.touchable) {
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
		if (e.cancelable) {
			e.preventDefault()
		}
		//移动到的点
		const point = props.vertical ? e.targetTouches[0].pageY : e.targetTouches[0].pageX
		//设置总滑动距离
		const moveTotal = point - initTouchPoint.value
		//如果总滑动距离大于单张尺寸，则不可继续滑动
		if (Math.abs(moveTotal) >= carouselItemSize.value) {
			return
		}
		//记录总滑动距离
		touchTotal.value = moveTotal
		//记录当前偏移值
		currentSlideValue.value += point - everyTouchPoint.value
		//更新样式
		slidesRef.value!.style.left = currentSlideValue.value + 'px'
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
	if (!slidesRef.value || props.mode != 'slide') {
		return
	}
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
			//滑动到了最后一个CarouselItem的克隆体上
			if (props.modelValue + num == -1) {
				//先完成动画
				setSlideValue(true, 0).then(() => {
					//设置懒更新
					lazyUpdate.value = true
					//设置modeValue为最后一个CarouselItem的序列
					setIndex(publicChildren.value.length - 1, true)
					//不使用动画设置偏移值到最后一个CarouselItem
					setSlideValue(false, -(children.value.length - 2) * carouselItemSize.value).then(() => {
						//重置懒更新标识
						lazyUpdate.value = false
					})
				})
			}
			//滑动到了第一个CarouselItem的克隆体上
			else if (props.modelValue + num == publicChildren.value.length) {
				//先完成动画
				setSlideValue(true, -(children.value.length - 1) * carouselItemSize.value).then(() => {
					//设置懒更新
					lazyUpdate.value = true
					//设置modeValue为第一个CarouselItem的序列
					setIndex(0, true)
					//不使用动画设置偏移值到第一个CarouselItem
					setSlideValue(false, -carouselItemSize.value).then(() => {
						//重置懒更新标识
						lazyUpdate.value = false
					})
				})
			}
			//正常滑动
			else {
				setIndex(props.modelValue + num, true)
			}
		}
	}
	//非循环模式下
	else {
		//拉到最左侧恢复到第一个
		if (currentSlideValue.value > 0) {
			setSlideValue(true, 0)
		}
		//拉倒最右侧恢复到最后一个
		else if (currentSlideValue.value < -((children.value.length - 1) * carouselItemSize.value)) {
			setSlideValue(true, -((children.value.length - 1) * carouselItemSize.value))
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
//获取每帧执行的时间间隔
const updateClipInterval = () => {
	//支持requestAnimationFrame获取真实帧数
	if (!!window.requestAnimationFrame) {
		let now = window.performance.now()
		const render = () => {
			const nextFrame = window.performance.now()
			clipInterval.value = nextFrame - now
			now = nextFrame
			window.requestAnimationFrame(render)
		}
		render()
	}
}

//监听modelValue变化更新轮播视图
watch(
	() => props.modelValue,
	(newVal, oldVal) => {
		//滑动模式下且不是懒更新状态
		if (props.mode == 'slide' && !lazyUpdate.value) {
			//循环模式下，如果是从最后一个CarouselItem跳到第一个
			if (props.loop && oldVal == publicChildren.value.length - 1 && newVal == 0) {
				//偏移值设定到其克隆体上
				setSlideValue(false, 0).then(() => {
					setSlideValue(true)
				})
			}
			//循环模式下，如果是从第一个CarouseItem跳到最后一个
			else if (props.loop && oldVal == 0 && newVal == publicChildren.value.length - 1) {
				//偏移值设定到其克隆体上
				setSlideValue(false, -(children.value.length - 1) * carouselItemSize.value).then(() => {
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

//监听slidesRef创建动画实例和设置初始偏移值
watch(
	() => slidesRef.value,
	newVal => {
		if (newVal) {
			nextTick(() => {
				//记录初始的偏移值
				currentSlideValue.value = -(props.loop ? props.modelValue + 1 : props.modelValue) * carouselItemSize.value
				//设置初始的元素偏移样式
				slidesRef.value!.style.left = currentSlideValue.value + 'px'
				if (slideAnimation.value) {
					slideAnimation.value.removeAllClips()
				} else {
					slideAnimation.value = new Animator(newVal, {})
				}
			})
		}
	}
)

//监听自动播放
watch(
	() => props.autoplay,
	newVal => {
		if (newVal) {
			setAutoplay()
		} else {
			if (autoplayTimer.value) {
				clearInterval(autoplayTimer.value)
				autoplayTimer.value = null
			}
		}
	}
)

//更新每一帧的间隔时间数
updateClipInterval()

onMounted(() => {
	nextTick(() => {
		//如果是循环
		if (props.autoplay) {
			setAutoplay()
		}
	})
})

defineExpose({
	setPrev,
	setNext
})
</script>
<style scoped src="./carousel.less"></style>
