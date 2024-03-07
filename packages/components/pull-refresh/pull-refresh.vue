<script setup name="m-pull-refresh" lang="ts">
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref, watch, nextTick } from 'vue'
import Dap from 'dap-util'
import { Icon } from '../icon'
import { PullRefreshProps, PullRefreshStatusType } from './props'
import { IconPropsType } from '../icon/props'

//实例
const instance = getCurrentInstance()!

//uid
const uid = instance.uid

//属性
const props = defineProps(PullRefreshProps)

//事件
const emits = defineEmits(['update:modelValue', 'refresh'])

//刷新元素高度
const elHeight = ref<number>(0)
//组件高度
const rootHeight = ref<number>(0)
//计数点
const amount = ref<number>(0)
//计数点最大值
const amountMax = ref<number>(4)
//垂直起点
const startY = ref<number>(0)
//第一次垂直起点
const firstStartY = ref<number>(0)
//0表示还没触发下拉，1表示触发下拉了但是还没松手，2表示已经松手正在刷新
const status = ref<PullRefreshStatusType>(0)
//垂直偏移距离
const translateY = ref<number>(0)
//是否触摸行为导致下拉刷新
const hasTouch = ref<boolean>(false)
//是否按下鼠标了
const mouseDown = ref<boolean>(false)
//是否禁用滚动条
const disableScroll = ref<boolean>(false)

const containerRef = ref<HTMLElement | null>(null)
const elRef = ref<HTMLElement | null>(null)
const refreshRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)

const containerStyle = computed<any>(() => {
	let style: any = {
		height: `calc(100% + ${elHeight.value}px)`,
		transform: `translateY(${translateY.value}px)`
	}
	return style
})
const wrapperStyle = computed<any>(() => {
	let style: any = {
		height: rootHeight.value + 'px'
	}
	if (disableScroll.value) {
		style.overflowY = 'hidden'
	}
	return style
})
const parseIcon = computed<(params: string | IconPropsType) => IconPropsType>(() => {
	return (params: string | IconPropsType) => {
		let icon: IconPropsType = {
			spin: false,
			type: '',
			url: '',
			color: '',
			size: ''
		}
		if (Dap.common.isObject(params)) {
			if (typeof (<IconPropsType>params).spin == 'boolean') {
				icon.spin = (<IconPropsType>params).spin
			}
			if (typeof (<IconPropsType>params).type == 'string') {
				icon.type = (<IconPropsType>params).type
			}
			if (typeof (<IconPropsType>params).url == 'string') {
				icon.url = (<IconPropsType>params).url
			}
			if (typeof (<IconPropsType>params).color == 'string') {
				icon.color = (<IconPropsType>params).color
			}
			if (typeof (<IconPropsType>params).size == 'string') {
				icon.size = (<IconPropsType>params).size
			}
		} else if (typeof params == 'string') {
			icon.type = params
		}
		return icon
	}
})
const icon = computed<IconPropsType>(() => {
	if (status.value == 0) {
		return parseIcon.value(props.pullingIcon)
	}
	if (status.value == 1) {
		return parseIcon.value(props.loosingIcon)
	}
	return parseIcon.value(props.loadingIcon)
})
const message = computed<string>(() => {
	if (status.value == 0) {
		return props.pullingText
	}
	if (status.value == 1) {
		return props.loosingText
	}
	return props.loadingText
})

//初始高度和偏移值设置
const initHeight = () => {
	//设置元素高度
	elHeight.value = refreshRef.value!.offsetHeight
	//设置组件高度
	rootHeight.value = elRef.value!.offsetHeight
	//设置初始的偏移值
	translateY.value = -elHeight.value
}
//获取触摸元素最近的滚动容器
const getScrollEl = (el: HTMLElement): HTMLElement => {
	if (el.isEqualNode(wrapperRef.value) || !Dap.element.isContains(wrapperRef.value, el)) {
		return wrapperRef.value!
	}
	if (Dap.element.getScrollHeight(el) > el.clientHeight) {
		return el
	}
	return getScrollEl(<HTMLElement>el.parentNode)
}
//根据modelValue的值改变状态
const changeStatus = () => {
	if (props.disabled) {
		return
	}
	//值为true时状态变为加载状态
	if (props.modelValue) {
		status.value = 2
		disableScroll.value = true
		emits('refresh')
		//非触摸下拉的
		if (!hasTouch.value) {
			containerRef.value!.style.transition = 'transform 300ms'
			//触发浏览器重绘刷新
			containerRef.value!.offsetWidth
			translateY.value = Dap.element.rem2px(props.distance) - elHeight.value
			setTimeout(() => {
				if (containerRef.value) {
					containerRef.value.style.transition = ''
				}
			}, 300)
		}
	}
	//值为false时状态变为下拉前状态，数据恢复初始化
	else {
		amount.value = 0
		hasTouch.value = false
		containerRef.value!.style.transition = 'transform 300ms'
		//触发浏览器重绘刷新
		containerRef.value!.offsetWidth
		translateY.value = -elHeight.value
		setTimeout(() => {
			if (containerRef.value) {
				containerRef.value.style.transition = ''
			}
			status.value = 0
			disableScroll.value = false
		}, 300)
	}
}
//开始下拉(移动端)
const startPull = (event: TouchEvent) => {
	if (props.disabled) {
		return
	}
	if (status.value == 0) {
		startY.value = event.targetTouches[0].pageY //元素按下时的位置
		firstStartY.value = startY.value //元素按下的位置，此数值不会变更
	}
}
//开始下拉(PC端)
const startPull2 = (event: MouseEvent) => {
	if (props.disabled) {
		return
	}
	if (status.value == 0) {
		mouseDown.value = true
		startY.value = event.pageY //元素按下时的位置
		firstStartY.value = startY.value //元素按下的位置，此数值不会变更
	}
}
//下拉过程(移动端)
const onPull = (event: TouchEvent) => {
	if (props.disabled) {
		return
	}
	//加载状态下禁用
	if (status.value == 2) {
		return
	}
	let endY = event.targetTouches[0].pageY
	let move = endY - startY.value //每一次移动的偏移量
	let totalMove = endY - firstStartY.value //距离第一次触摸时的偏移量
	startY.value = endY
	//总偏移量小于0为手指向上滑动，元素向下滚动，不执行刷新
	if (totalMove <= 0) {
		firstStartY.value = startY.value
		return
	}
	//滚动条不在顶部时不执行刷新
	if (Dap.element.getScrollTop(wrapperRef.value) > 0) {
		firstStartY.value = startY.value
		return
	}
	//内部含有滚动条元素且滚动条不在顶部时阻塞
	let el = getScrollEl(<HTMLElement>event.target)
	if (!el.isEqualNode(wrapperRef.value) && Dap.element.getScrollTop(el) > 0) {
		firstStartY.value = startY.value
		return
	}

	hasTouch.value = true

	if (event.cancelable) {
		event.preventDefault()
	}
	//当计数小于最大计数量时，每次移动计数+1
	if (amount.value < amountMax.value) {
		amount.value++
	}
	//元素偏移值
	let y = translateY.value + move / amount.value
	//如果移动距离大于distance指定的距离，则变为可释放状态
	if (y > Dap.element.rem2px(props) - elHeight.value) {
		status.value = 1
	} else {
		status.value = 0
	}
	//改变元素位置
	translateY.value = y
}
//下拉过程(PC端)
const onPull2 = (event: MouseEvent) => {
	if (!mouseDown.value || props.disabled) {
		return
	}
	//加载状态下禁用
	if (status.value == 2) {
		return
	}
	let endY = event.pageY
	let move = endY - startY.value //每一次移动的偏移量
	let totalMove = endY - firstStartY.value //距离第一次触摸时的偏移量
	startY.value = endY
	//总偏移量小于0为向上滑动，元素向下滚动，不执行刷新
	if (totalMove <= 0) {
		firstStartY.value = startY.value
		return
	}
	//滚动条不在顶部时不执行刷新
	if (Dap.element.getScrollTop(wrapperRef.value) > 0) {
		firstStartY.value = startY.value
		return
	}
	//内部含有滚动条元素且滚动条不在顶部时阻塞
	let el = getScrollEl(<HTMLElement>event.target)
	if (!el.isEqualNode(wrapperRef.value) && Dap.element.getScrollTop(el) > 0) {
		firstStartY.value = startY.value
		return
	}
	hasTouch.value = true

	if (event.cancelable) {
		event.preventDefault()
	}

	//当计数小于最大计数量时，每次移动计数+1
	if (amount.value < amountMax.value) {
		amount.value++
	}
	//元素移动距离
	let y = translateY.value + move / amount.value

	//如果移动距离大于distance指定的距离，则变为可释放状态
	if (y > Dap.element.rem2px(props.distance) - elHeight.value) {
		status.value = 1
	} else {
		status.value = 0
	}
	//改变元素位置
	translateY.value = y
}
//下拉结束释放(移动端)
const pulled = () => {
	if (props.disabled) {
		return
	}
	//当下拉结束时，判断状态是否为释放可加载状态
	if (status.value == 1 && props.modelValue == false) {
		emits('update:modelValue', true)
	} else if (status.value == 0) {
		changeStatus()
	}
}
//下拉结束释放(PC端)
const pulled2 = () => {
	if (!mouseDown.value || props.disabled) {
		return
	}
	mouseDown.value = false
	//当下拉结束时，判断状态是否为释放可加载状态
	if (status.value == 1 && props.modelValue === false) {
		emits('update:modelValue', true)
	} else if (status.value == 0) {
		changeStatus()
	}
}

watch(
	() => props.modelValue,
	() => {
		changeStatus()
	}
)

onMounted(() => {
	nextTick(() => {
		//初始高度和偏移值设置
		initHeight()
		//事件设置
		Dap.event.on(document.documentElement, `mousemove.pullRefresh_${uid}`, onPull2)
		Dap.event.on(document.documentElement, `mouseup.pullRefresh_${uid}`, pulled2)
	})
})

onBeforeUnmount(() => {
	Dap.event.off(document.documentElement, `mousemove.pullRefresh_${uid} mouseup.pullRefresh_${uid}`)
})
</script>

<template>
	<div class="mvi-pull-refresh" ref="elRef">
		<div ref="containerRef" class="mvi-pull-refresh-container" :style="containerStyle">
			<div ref="refreshRef" class="mvi-pull-refresh-el">
				<slot name="el" v-if="$slots.el" :status="status"></slot>
				<template v-else>
					<Icon :type="icon.type" :spin="icon.spin" :url="icon.url" :size="icon.size" :color="icon.color" />
					<span class="mvi-pull-refresh-text" v-text="message"></span>
				</template>
			</div>
			<div ref="wrapperRef" class="mvi-pull-refresh-wrapper" @touchstart="startPull" @touchmove="onPull" @touchend="pulled" @mousedown="startPull2" :style="wrapperStyle">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<style scoped src="./pull-refresh.less"></style>
