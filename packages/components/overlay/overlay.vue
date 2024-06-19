<template>
	<teleport :disabled="!mountEl" :to="mountEl">
		<transition name="mvi-overlay-fade" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
			<div @click.self="closeOverlay" ref="overlayRef" class="mvi-overlay" v-show="overlayShow" :style="overlayStyle" v-bind="$attrs">
				<slot></slot>
			</div>
		</transition>
	</teleport>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { ref, watch, computed, onMounted, getCurrentInstance } from 'vue'
import { OverlayProps } from './props'

//属性不继承
defineOptions({
	inheritAttrs: false,
	name: 'm-overlay'
})

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(OverlayProps)

//事件
const emits = defineEmits(['update:modelValue', 'show', 'showing', 'shown', 'hide', 'hidding', 'hidden'])

//是否显示遮罩层
const overlayShow = ref<boolean>(false)
//父级元素垂直滚动条距离
const scrollTop = ref<number>(0)
//父级元素水平滚动条距离
const scrollLeft = ref<number>(0)
//父级元素overflow-x
const overflowX = ref<string>('')
//父级元素overflow-y
const overflowY = ref<string>('')
//父级元素右侧内边距
const paddingRight = ref<number>(0)
//父级元素底部内边距
const paddingBottom = ref<number>(0)
//是否含有水平滚动条
const hasHorizontalScroll = ref<boolean>(false)
//是否含有垂直滚动条
const hasVerticalScroll = ref<boolean>(false)
//组件的定位父元素
const offsetParent = ref<HTMLElement | null>(null)
//遮罩层元素
const overlayRef = ref<HTMLElement | null>(null)

//遮罩层样式
const overlayStyle = computed<any>(() => {
	let style: any = {}
	if (Dap.number.isNumber(props.zIndex)) {
		style.zIndex = props.zIndex
	}
	if (props.color) {
		style.background = props.color
	}
	return style
})
//遮罩层根元素
const $$el = computed<HTMLElement | null>(() => {
	return overlayRef.value
})

//transition钩子函数：组件显示之前
const beforeEnter = (el: Element) => {
	if (props.fade) {
		;(<HTMLElement>el).style.transition = 'opacity ' + props.timeout + 'ms'
	}
	emits('show', el)
	if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == 'function') {
		instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ['show', el])
	}
}
//transition钩子函数：组件显示
const enter = (el: Element) => {
	//父级定位元素存在
	if (overlayRef.value!.offsetParent) {
		offsetParent.value = <HTMLElement>overlayRef.value!.offsetParent
		//元素含垂直滚动条(文档高度大于可视高度)
		if (Dap.element.getScrollHeight(offsetParent.value) > offsetParent.value.clientHeight) {
			if (props.usePadding) {
				//获取滚动条宽度
				let scrollWidth = offsetParent.value.offsetWidth - offsetParent.value.clientWidth - parseFloat(Dap.element.getCssStyle(offsetParent.value, 'border-right-width')) - parseFloat(Dap.element.getCssStyle(offsetParent.value, 'border-left-width'))
				//记录原先右侧内边距的值
				paddingRight.value = parseFloat(Dap.element.getCssStyle(offsetParent.value, 'padding-right'))
				//设置右侧内边距值
				offsetParent.value.style.setProperty('padding-right', paddingRight.value + scrollWidth + 'px', 'important')
			}
			//记录滚动条距离
			scrollTop.value = Dap.element.getScrollTop(offsetParent.value)
			//记录overflow-y值
			overflowY.value = Dap.element.getCssStyle(offsetParent.value, 'overflow-y')
			//设置overflow-y为hidden
			offsetParent.value.style.setProperty('overflow-y', 'hidden', 'important')
			//设置遮罩层距离顶部的距离
			overlayRef.value!.style.top = scrollTop.value + 'px'
			//记录含有垂直滚动条
			hasVerticalScroll.value = true
		}
		//元素含水平滚动条(文档宽度大于可视宽度)
		if (Dap.element.getScrollWidth(offsetParent.value) > offsetParent.value.clientWidth) {
			if (props.usePadding) {
				//获取滚动条高度
				let scrollHeight = offsetParent.value.offsetHeight - offsetParent.value.clientHeight - parseFloat(Dap.element.getCssStyle(offsetParent.value, 'border-bottom-width')) - parseFloat(Dap.element.getCssStyle(offsetParent.value, 'border-top-width'))
				//记录原先底部侧内边距的值
				paddingBottom.value = parseFloat(Dap.element.getCssStyle(offsetParent.value, 'padding-bottom'))
				//设置底部内边距值
				offsetParent.value.style.setProperty('padding-bottom', paddingBottom.value + scrollHeight + 'px', 'important')
			}
			//记录滚动条距离
			scrollLeft.value = Dap.element.getScrollLeft(offsetParent.value)
			//记录overflow-x值
			overflowX.value = Dap.element.getCssStyle(offsetParent.value, 'overflow-x')
			//设置overflow-x为hidden
			offsetParent.value.style.setProperty('overflow-x', 'hidden', 'important')
			//设置遮罩层距离左侧的距离
			overlayRef.value!.style.left = scrollLeft.value + 'px'
			//记录含有水平滚动条
			hasHorizontalScroll.value = true
		}
	}
	emits('showing', el)
	if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == 'function') {
		instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ['showing', el])
	}
}
//组件显示之后
const afterEnter = (el: Element) => {
	if (props.fade) {
		;(<HTMLElement>el).style.transition = ''
	}
	emits('shown', el)
	if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == 'function') {
		instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ['shown', el])
	}
}
//组件隐藏之前
const beforeLeave = (el: Element) => {
	if (props.fade) {
		;(<HTMLElement>el).style.transition = 'opacity ' + props.timeout + 'ms'
	}
	emits('hide', el)
	if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == 'function') {
		instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ['hide', el])
	}
}
//组件隐藏时
const leave = (el: Element) => {
	emits('hidding', el)
	if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == 'function') {
		instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ['hidding', el])
	}
}
//组件隐藏之后
const afterLeave = (el: Element) => {
	if (offsetParent.value) {
		//含有垂直滚动条
		if (hasVerticalScroll.value) {
			if (props.usePadding) {
				offsetParent.value.style.setProperty('padding-right', paddingRight.value + 'px', 'important')
			}
			offsetParent.value.style.setProperty('overflow-y', overflowY.value, 'important')
			hasVerticalScroll.value = false
		}
		//含有水平滚动条
		if (hasHorizontalScroll.value) {
			if (props.usePadding) {
				offsetParent.value.style.setProperty('padding-bottom', paddingBottom.value + 'px', 'important')
			}
			offsetParent.value.style.setProperty('overflow-x', overflowX.value, 'important')
			hasHorizontalScroll.value = false
		}
	}
	if (props.fade) {
		;(<HTMLElement>el).style.transition = ''
	}
	emits('hidden', el)
	if (typeof instance.appContext.config.globalProperties.overlayComponentWatch == 'function') {
		instance.appContext.config.globalProperties.overlayComponentWatch.apply(instance.proxy, ['hidden', el])
	}
}
//点击遮罩关闭此遮罩
const closeOverlay = () => {
	if (props.closable) {
		emits('update:modelValue', false)
	}
}

//监听modelValue
watch(
	() => props.modelValue,
	newValue => {
		overlayShow.value = newValue
	}
)

onMounted(() => {
	//初始化时是否显示遮罩层
	overlayShow.value = props.modelValue
})

defineExpose({
	$$el
})
</script>
<style scoped src="./overlay.less"></style>
