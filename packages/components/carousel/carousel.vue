<template>
	<div class="mvi-carousel">
		<div v-if="fade" class="mvi-carousel-fades">
			<slot></slot>
		</div>
		<div v-else class="mvi-carousel-slides" ref="slidesRef" :style="slidesStyle">
			<LastCarouselItem ref="lastCarouselRef" v-if="props.loop" />
			<slot></slot>
			<FirstCarouselItem ref="firstCarouselRef" v-if="props.loop" />
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
import { CarouselItem } from '../carousel-item'

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
const lastCarouselRef = ref<InstanceType<typeof CarouselItem> | null>(null)
const firstCarouselRef = ref<InstanceType<typeof CarouselItem> | null>(null)
//滑动偏移值
const slideValue = ref<number>(0)

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
	return {
		width: `calc(100% * ${children.value.length})`,
		transform: `translateX(${slideValue.value}px)`
	}
})
//实际展示的轮播实例数组
const publicChildren = computed(() => {
	if (!props.fade && props.loop) {
		return children.value.filter((_child, index) => {
			return index > 0 && index < children.value.length - 1
		})
	}
	return children.value
})

//克隆第一个轮播
const FirstCarouselItem = defineComponent(() => {
	return () => {
		const vnodes = instance.slots.default!()
		return cloneVNode(vnodes[0])
	}
})
//克隆最后一个轮播
const LastCarouselItem = defineComponent(() => {
	return () => {
		const vnodes = instance.slots.default!()
		return cloneVNode(vnodes[vnodes.length - 1])
	}
})

//设定当前轮播的序列，reset是true则会重新autoplay
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
			//判断是否到最后一张
			const isLast = props.modelValue == publicChildren.value.length - 1
			//如果是最后一个则清除计时器
			if (isLast) {
				clearInterval(autoplayTimer.value)
				autoplayTimer.value = null
				return
			}
			setIndex(props.modelValue + 1)
		}
	}, props.interval)
}
//跳到上一张
const setPrev = () => {
	//循环模式下
	if (props.loop) {
		setIndex(props.modelValue == 0 ? publicChildren.value.length - 1 : props.modelValue - 1, true)
	}
	//非循环模式下
	else {
		//如果在第一张
		if (props.modelValue == 0) {
			return
		}
		setIndex(props.modelValue - 1, true)
	}
}
//跳到下一张
const setNext = () => {
	//循环模式下
	if (props.loop) {
		setIndex(props.modelValue == publicChildren.value.length - 1 ? 0 : props.modelValue + 1, true)
	}
	//非循环模式下
	else {
		//如果在最后一张
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
//根据当前轮播序列设定偏移值
const setSlideValue = (animation: boolean = false) => {
	return new Promise<void>(resolve => {
		if (animation) {
			addSlideAnimation()
		}
		if (slidesRef.value) {
			//单张宽度
			const width = slidesRef.value.offsetWidth / children.value.length
			//设置偏移值
			slideValue.value = -(props.loop ? props.modelValue + 1 : props.modelValue) * width
			if (animation) {
				setTimeout(() => {
					removeSlideAnimation()
					resolve()
				}, props.speed)
			} else {
				resolve()
			}
		}
	})
}

watch(
	() => props.modelValue,
	newValue => {
		//滑动模式下
		if (!props.fade) {
			setSlideValue(true)
		}
	}
)

onMounted(() => {
	nextTick(() => {
		//如果是滑动效果则需要设置初始的偏移值
		if (!props.fade) {
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
