<template>
	<Overlay ref="overlayRef" v-model="show" @show="overlayShow" @hide="overlayHide" :use-padding="usePadding" :z-index="zIndex" :color="overlayColor" :timeout="timeout" :mount-el="mountEl" :closable="closable">
		<transition :name="'mvi-slide-' + placement" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
			<!-- 弹出层 -->
			<div v-if="firstShow" v-show="popupShow" class="mvi-popup" :class="popupClass" :style="popupStyle" v-bind="$attrs">
				<!-- 关闭图标 -->
				<div v-if="showTimes" :class="['mvi-popup-times', timesPlacement]">
					<Icon @click="show = false" type="times" />
				</div>
				<!-- 正文内容 -->
				<div class="mvi-popup-content" :style="{ padding: __contentPadding ? '' : 0 }">
					<slot></slot>
				</div>
			</div>
		</transition>
	</Overlay>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { Overlay } from '../overlay'
import { Icon } from '../icon'
import { PopupProps } from './props'
import { computed, getCurrentInstance, ref } from 'vue'

defineOptions({
	inheritAttrs: false,
	name: 'm-popup'
})

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(PopupProps)

//事件
const emits = defineEmits(['update:modelValue', 'show', 'showing', 'shown', 'hide', 'hidding', 'hidden'])

//popup弹窗是否显示
const popupShow = ref<boolean>(false)
//popup弹窗是否渲染
const firstShow = ref<boolean>(false)
//遮罩层组件
const overlayRef = ref<InstanceType<typeof Overlay> | null>(null)
//遮罩层元素
const $$el = computed<HTMLElement | null>(() => {
	return overlayRef.value ? overlayRef.value.$$el : null
})
//是否显示
const show = computed<boolean>({
	get() {
		return props.modelValue
	},
	set(value: any) {
		emits('update:modelValue', value)
	}
})
//弹出层类
const popupClass = computed<string[]>(() => {
	let cls: string[] = [props.placement]
	if (props.round) {
		cls.push('round')
	}
	if (props.showTimes) {
		if (props.timesPlacement == 'top-right' || props.timesPlacement == 'top-left') {
			cls.push('padding-top')
		} else if (props.timesPlacement == 'bottom-right' || props.timesPlacement == 'bottom-left') {
			cls.push('padding-bottom')
		}
	}
	return cls
})
//弹出层样式
const popupStyle = computed<any>(() => {
	let style: any = {}
	if (props.placement == 'left' || props.placement == 'right') {
		if (props.width) {
			style.width = props.width
		}
	} else if (props.placement == 'top' || props.placement == 'bottom') {
		if (props.width) {
			style.height = props.width
		}
	}
	if (Dap.number.isNumber(props.zIndex)) {
		style.zIndex = props.zIndex + 10
	}
	style.transition = 'all ' + props.timeout + 'ms'
	return style
})

//遮罩层显示前
const overlayShow = () => {
	if (!firstShow.value) {
		firstShow.value = true
	}
	popupShow.value = true
}
//遮罩层隐藏之前
const overlayHide = () => {
	popupShow.value = false
}
//弹出层显示前
const beforeEnter = (el: Element) => {
	//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
	if (Dap.data.get(el, 'mvi-popup-beforeEnter-trigger')) {
		return
	}
	Dap.data.set(el, 'mvi-popup-beforeEnter-trigger', true)

	emits('show', el)
	if (typeof instance.appContext.config.globalProperties.popupComponentWatch == 'function') {
		instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ['show', el])
	}
}
//弹出层显示时
const enter = (el: Element) => {
	//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
	if (Dap.data.get(el, 'mvi-popup-enter-trigger')) {
		return
	}
	Dap.data.set(el, 'mvi-popup-enter-trigger', true)

	emits('showing', el)
	if (typeof instance.appContext.config.globalProperties.popupComponentWatch == 'function') {
		instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ['showing', el])
	}
}
//弹出层显示后
const afterEnter = (el: Element) => {
	emits('shown', el)
	if (typeof instance.appContext.config.globalProperties.popupComponentWatch == 'function') {
		instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ['shown', el])
	}
}
//弹出层隐藏前
const beforeLeave = (el: Element) => {
	//清除标记
	Dap.data.remove(el, 'mvi-popup-beforeEnter-trigger')
	Dap.data.remove(el, 'mvi-popup-enter-trigger')
	emits('hide', el)
	if (typeof instance.appContext.config.globalProperties.popupComponentWatch == 'function') {
		instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ['hide', el])
	}
}
//弹出层隐藏时
const leave = (el: Element) => {
	emits('hidding', el)
	if (typeof instance.appContext.config.globalProperties.popupComponentWatch == 'function') {
		instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ['hidding', el])
	}
}
//弹出层隐藏后
const afterLeave = (el: Element) => {
	emits('hidden', el)
	if (typeof instance.appContext.config.globalProperties.popupComponentWatch == 'function') {
		instance.appContext.config.globalProperties.popupComponentWatch.apply(instance.proxy, ['hidden', el])
	}
}

defineExpose({
	$$el
})
</script>
<style scoped src="./popup.less"></style>
