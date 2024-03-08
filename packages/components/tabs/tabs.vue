<script setup name="m-tabs" lang="ts">
import { ComponentInternalInstance, computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch, provide } from 'vue'
import Dap from 'dap-util'
import { Icon } from '../icon'
import { TabsProps } from './props'
import { IconPropsType } from '../icon/props'

//实例
const instance = getCurrentInstance()!
//提供实例给tab组件
provide('tabs', instance)

//属性
const props = defineProps(TabsProps)

//事件
const emits = defineEmits(['update:modelValue', 'change'])

//子tab实例数组
const children = ref<ComponentInternalInstance[]>([])
//滑动条距离左边的距离
const slideLeft = ref<number>(0)
//滑动条宽度
const slideWidth = ref<number>(0)
//当前指向的tab序列
const current = ref<number>(props.modelValue)

const headersRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)

const sliderStyle = computed<any>(() => {
	let style: any = {}
	if (props.animation == 'slide' || props.animation == 'fade') {
		style.transition = 'left ' + props.timeout + 'ms,width ' + props.timeout + 'ms'
	}
	if (props.activeColor) {
		style.background = props.activeColor
	}
	style.width = slideWidth.value + 'px'
	style.left = slideLeft.value + 'px'
	return style
})
const headersStyle = computed<any>(() => {
	let style: any = {}
	if (props.flex && props.type == 'default') {
		style.justifyContent = props.flex
	}
	if (props.type == 'card' && props.activeColor) {
		style.borderColor = props.activeColor
	}
	return style
})
const headerStyle = computed<(index: number) => any>(() => {
	return (index: number) => {
		let style: any = {}
		if (props.offset && index != 0 && props.type == 'default') {
			style.marginLeft = props.offset
		}
		if (props.activeColor) {
			style.borderColor = props.activeColor
			if (props.modelValue == index) {
				if (props.type == 'default') {
					style.color = props.activeColor
				} else {
					style.background = props.activeColor
				}
			}
		}

		style.maxWidth = `calc(100% / ${children.value.length})`
		return style
	}
})
const parseIcon = computed(() => {
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

//api：设置面板高度
const setHeight = () => {
	if (children.value[current.value] && contentRef.value) {
		contentRef.value.style.height = children.value[current.value].proxy!.$el.offsetHeight + 'px'
	}
}
//api：设置滑动条
const setSlider = () => {
	if (props.type == 'card') {
		return
	}
	if (!headersRef.value) {
		return
	}
	slideWidth.value = parseFloat(Dap.element.getCssStyle(headersRef.value.querySelector('.mvi-tab-header.active'), 'width'))
	slideLeft.value = Dap.element.getElementPoint(headersRef.value.querySelector('.mvi-tab-header.active'), headersRef.value).left
}
//点击头部的标题
const clickHeader = (item: ComponentInternalInstance, index: number) => {
	if (item.props.disabled) {
		return
	}
	if (props.modelValue == index) {
		return
	}
	emits('update:modelValue', index)
	emits('change', index)
}
//激活指定的tab
const to = (newValue: number, oldValue: number) => {
	for (let i = 0; i < children.value.length; i++) {
		children.value[i].exposed!.show = false
		if (newValue < oldValue) {
			children.value[i].exposed!.back = true
		} else {
			children.value[i].exposed!.back = false
		}
	}
	children.value[newValue].exposed!.show = true
	if (!children.value[newValue].exposed!.firstShow) {
		children.value[newValue].exposed!.firstShow = true
	}
	nextTick(() => {
		current.value = newValue
		setHeight()
		setSlider()
	})
}

watch(
	() => props.modelValue,
	(newValue, oldValue) => {
		to(newValue, oldValue)
	}
)

onMounted(() => {
	nextTick(() => {
		setSlider()
	})
	setHeight()
	Dap.event.on(window, `resize.tabs_${instance.uid}`, setHeight)
})

onBeforeUnmount(() => {
	Dap.event.off(window, `resize.tabs_${instance.uid}`)
})

defineExpose({
	children,
	setHeight,
	setSlider
})
</script>

<template>
	<div class="mvi-tabs">
		<!-- 选项卡头部 -->
		<div ref="headersRef" class="mvi-tabs-header" :class="{ card: type == 'card', border: type == 'default' && border }" :style="headersStyle">
			<!-- 选项卡滑动条 -->
			<div v-if="type == 'default'" class="mvi-tabs-slider" :style="sliderStyle"></div>
			<!-- 选项卡头部卡片 -->
			<div class="mvi-tab-header" :class="{ active: modelValue == index, ellipsis: ellipsis }" v-for="(item, index) in children" @click="clickHeader(<ComponentInternalInstance>item, index)" :style="headerStyle(index)" :disabled="item.props.disabled || null">
				<Icon v-if="item.props.placement == 'left' && (parseIcon(<string | IconPropsType>item.props.icon).type || parseIcon(<string | IconPropsType>item.props.icon).url)" class="mvi-tab-icon" :class="{ left: !!item.props.title }" :type="parseIcon(<string | IconPropsType>item.props.icon).type" :url="parseIcon(<string | IconPropsType>item.props.icon).url" :spin="parseIcon(<string | IconPropsType>item.props.icon).spin" :size="parseIcon(<string | IconPropsType>item.props.icon).size" :color="parseIcon(<string | IconPropsType>item.props.icon).color" />
				<span class="mvi-tab-header-text" v-html="item.props.title" v-if="item.props.title"></span>
				<Icon v-if="item.props.placement == 'right' && (parseIcon(<string | IconPropsType>item.props.icon).type || parseIcon(<string | IconPropsType>item.props.icon).url)" class="mvi-tab-icon" :class="{ right: !!item.props.title }" :type="parseIcon(<string | IconPropsType>item.props.icon).type" :url="parseIcon(<string | IconPropsType>item.props.icon).url" :spin="parseIcon(<string | IconPropsType>item.props.icon).spin" :size="parseIcon(<string | IconPropsType>item.props.icon).size" :color="parseIcon(<string | IconPropsType>item.props.icon).color" />
			</div>
		</div>
		<div class="mvi-tabs-content" ref="contentRef">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped src="./tabs.less"></style>
