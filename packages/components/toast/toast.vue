<template>
	<Overlay ref="overlayRef" :color="cmpOverlayColor" @hidden="toastHidden" v-model="show" :use-padding="cmpUsePadding" :zIndex="cmpZIndex" fade :mount-el="cmpMountEl" @shown="toastShown">
		<div class="mvi-toast" :class="{ iconless: cmpMessage, shadow: cmpShadow }" :style="toastStyle" v-bind="$attrs">
			<div class="mvi-toast-icon">
				<Loading :color="cmpColor" v-if="cmpType == 'loading' && !cmpIcon.type && !cmpIcon.url" :size="cmpIcon.size" />
				<Icon v-else :type="cmpIcon.type" :url="cmpIcon.url" :spin="cmpIcon.spin" :size="cmpIcon.size" :color="cmpIcon.color" />
			</div>
			<div v-if="cmpMessage" class="mvi-toast-message" v-html="cmpMessage"></div>
		</div>
	</Overlay>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { Overlay } from '../overlay'
import { Loading } from '../loading'
import { Icon } from '../icon'
import { ToastProps } from './props'
import { DefineComponent, computed, getCurrentInstance, onMounted, ref } from 'vue'
import { IconPropsType } from '../icon/props'

//不继承属性
defineOptions({
	inheritAttrs: false,
	name: 'm-toast'
})

//实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(ToastProps)

const show = ref<boolean>(true)
const timer = ref<any>(null)
const overlayRef = ref<DefineComponent | null>(null)

const $$el = computed<HTMLElement>(() => {
	return overlayRef.value!.$$el
})
const cmpUsePadding = computed<boolean>(() => {
	if (typeof props.usePadding == 'boolean') {
		return props.usePadding
	}
	return false
})
const cmpType = computed<'success' | 'error' | 'loading' | 'info'>(() => {
	if (['success', 'error', 'loading', 'info'].includes(props.type)) {
		return props.type
	}
	return 'info'
})
const defaultIconType = computed<string>(() => {
	if (cmpType.value == 'success') {
		return 'success'
	}
	if (cmpType.value == 'error') {
		return 'error-o'
	}
	if (cmpType.value == 'info') {
		return 'info-o'
	}
	return ''
})
const cmpIcon = computed<IconPropsType>(() => {
	//默认图标
	let icon: IconPropsType = {
		type: defaultIconType.value,
		url: '',
		spin: false,
		size: '0.72rem',
		color: ''
	}
	if (typeof props.icon == 'string' && props.icon) {
		icon.type = props.icon
	} else if (Dap.common.isObject(props.icon)) {
		if (typeof (<IconPropsType>props.icon).type == 'string' && (<IconPropsType>props.icon).type) {
			icon.type = (<IconPropsType>props.icon).type
		}
		if (typeof (<IconPropsType>props.icon).url == 'string' && (<IconPropsType>props.icon).url) {
			icon.url = (<IconPropsType>props.icon).url
		}
		if (typeof (<IconPropsType>props.icon).spin == 'boolean') {
			icon.spin = (<IconPropsType>props.icon).spin
		}
		if (typeof (<IconPropsType>props.icon).size == 'string' && (<IconPropsType>props.icon).size) {
			icon.size = (<IconPropsType>props.icon).size
		}
		if (typeof (<IconPropsType>props.icon).color == 'string' && (<IconPropsType>props.icon).color) {
			icon.color = (<IconPropsType>props.icon).color
		}
	}
	return icon
})
const cmpMessage = computed<string>(() => {
	if (typeof props.message == 'string' && props.message) {
		return props.message
	}
	if (Dap.common.isObject(props.message)) {
		return JSON.stringify(props.message)
	}
	if (props.message == undefined || props.message == null) {
		return ''
	}
	return String(props.message)
})
const cmpTimeout = computed<number>(() => {
	if (Dap.number.isNumber(props.timeout) && props.timeout > 0) {
		return props.timeout
	}
	return 0
})
const cmpZIndex = computed<number>(() => {
	if (Dap.number.isNumber(props.zIndex)) {
		return props.zIndex
	}
	return 1100
})
const cmpOverlayColor = computed<string>(() => {
	if (typeof props.overlayColor == 'string' && props.overlayColor) {
		return props.overlayColor
	}
	return 'rgba(0, 10, 20, .05)'
})
const cmpBackground = computed<string>(() => {
	if (typeof props.background == 'string' && props.background) {
		return props.background
	}
	return ''
})
const cmpColor = computed<string>(() => {
	if (typeof props.color == 'string' && props.color) {
		return props.color
	}
	return '#fff'
})
const cmpMountEl = computed<string>(() => {
	if (typeof props.mountEl == 'string' && props.mountEl) {
		return props.mountEl
	}
	return 'body'
})
const cmpShadow = computed<boolean>(() => {
	if (typeof props.shadow == 'boolean') {
		return props.shadow
	}
	return true
})
const toastStyle = computed<any>(() => {
	let style: any = {
		zIndex: cmpZIndex.value
	}
	if (cmpBackground.value) {
		style.backgroundColor = cmpBackground.value
	}
	if (cmpColor.value) {
		style.color = cmpColor.value
	}
	return style
})

//清除计时器
const clearTimer = () => {
	if (timer.value) {
		clearTimeout(timer.value)
		timer.value = null
	}
}
//弹窗完全显示后
const toastShown = () => {
	if (cmpTimeout.value > 0) {
		timer.value = setTimeout(() => {
			show.value = false
		}, cmpTimeout.value)
	}
}
//弹窗完全关闭后
const toastHidden = () => {
	clearTimer()
	props.__remove()
}

onMounted(() => {
	props.__init(instance)
})

defineExpose({
	$$el,
	show
})
</script>
<style scoped src="./toast.less"></style>
