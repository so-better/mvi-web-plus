<template>
	<Overlay ref="overlayRef" v-model="show" @show="overlayShow" @hide="overlayHide" :use-padding="usePadding" :z-index="zIndex" :closable="closable" :color="overlayColor" :timeout="timeout" :mount-el="mountEl">
		<div ref="modalRef" class="mvi-modal" :style="{ zIndex: zIndex + 10 }">
			<transition :name="'mvi-modal-' + animation" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
				<!-- 弹出层 -->
				<div v-if="firstShow" v-show="modalShow" class="mvi-modal-wrapper" ref="wrapperRef" :style="wrapperStyle" v-bind="$attrs">
					<div class="mvi-modal-times" @click="show = false" v-if="showTimes">
						<Icon type="times" />
					</div>
					<div ref="headerRef" class="mvi-modal-title" :class="{ ellipsis: ellipsis, center: center }" v-if="$slots.title || title" :style="headerStyle">
						<slot name="title" v-if="$slots.title"></slot>
						<span v-html="title" v-else-if="title"></span>
					</div>
					<div ref="contentRef" class="mvi-modal-content" v-if="$slots.default || content">
						<slot v-if="$slots.default"></slot>
						<span v-html="content" v-else-if="content"></span>
					</div>
					<div ref="footerRef" class="mvi-modal-footer" :style="{ padding: __ignorePadding ? 0 : '' }" v-if="$slots.footer || footer">
						<slot name="footer" v-if="$slots.footer"></slot>
						<span v-text="footer" v-else-if="footer"></span>
					</div>
				</div>
			</transition>
		</div>
	</Overlay>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { computed, getCurrentInstance, ref, useSlots, watch } from 'vue'
import { Overlay } from '@/components/overlay'
import { Icon } from '@/components/icon'
import { ModalProps } from './props'

//属性不继承
defineOptions({
	inheritAttrs: false,
	name: 'm-modal'
})

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(ModalProps)

//事件
const emits = defineEmits(['update:modelValue', 'show', 'showing', 'shown', 'hide', 'hidding', 'hidden'])

//模态框是否显示
const modalShow = ref<boolean>(false)
//模态框是否渲染
const firstShow = ref<boolean>(false)

const overlayRef = ref<InstanceType<typeof Overlay> | null>(null)
const modalRef = ref<HTMLElement | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const headerRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const footerRef = ref<HTMLElement | null>(null)

const $$el = computed<HTMLElement | null>(() => {
	return overlayRef.value ? overlayRef.value.$$el : null
})
const show = computed<boolean>({
	get() {
		return props.modelValue
	},
	set(value) {
		emits('update:modelValue', value)
	}
})
const wrapperStyle = computed<any>(() => {
	let style: any = {}
	if (props.radius) {
		style.borderRadius = props.radius
	}
	style.transition = 'all ' + props.timeout + 'ms'
	return style
})
const headerStyle = computed<any>(() => {
	let style: any = {}
	//主体存在
	if (useSlots().default || props.content) {
		style.paddingBottom = '0'
	}
	return style
})

//模态框宽高设置
const modalSize = () => {
	//如果是全屏显示
	if (props.fullScreen) {
		modalRef.value!.style.width = (<HTMLElement>$$el.value!.offsetParent).offsetWidth + 'px'
		wrapperRef.value!.style.height = (<HTMLElement>$$el.value!.offsetParent).offsetHeight + 'px'
		wrapperRef.value!.style.maxHeight = ''
	} else {
		if (props.width) {
			modalRef.value!.style.width = props.width
		} else {
			modalRef.value!.style.width = ''
		}
		wrapperRef.value!.style.maxHeight = (<HTMLElement>$$el.value!.offsetParent).offsetHeight * 0.96 + 'px'
		wrapperRef.value!.style.height = ''
	}
}
//遮罩层显示前
const overlayShow = () => {
	if (!firstShow.value) {
		firstShow.value = true
	}
	modalShow.value = true
}
//遮罩层隐藏之前
const overlayHide = () => {
	modalShow.value = false
}
//弹出层显示前
const beforeEnter = (el: Element) => {
	//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
	if (Dap.data.get(<HTMLElement>el, 'mvi-modal-beforeEnter-trigger')) {
		return
	}
	Dap.data.set(<HTMLElement>el, 'mvi-modal-beforeEnter-trigger', true)
	emits('show', el)
	if (typeof instance.appContext.config.globalProperties.modalComponentWatch == 'function') {
		instance.appContext.config.globalProperties.modalComponentWatch.apply(instance.proxy, ['show', el])
	}
}
//弹出层显示时
const enter = (el: Element) => {
	//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
	if (Dap.data.get(<HTMLElement>el, 'mvi-modal-enter-trigger')) {
		return
	}
	Dap.data.set(<HTMLElement>el, 'mvi-modal-enter-trigger', true)
	modalSize()
	emits('showing', el)
	if (typeof instance.appContext.config.globalProperties.modalComponentWatch == 'function') {
		instance.appContext.config.globalProperties.modalComponentWatch.apply(instance.proxy, ['showing', el])
	}
}
//弹出层显示后
const afterEnter = (el: Element) => {
	emits('shown', el)
	if (typeof instance.appContext.config.globalProperties.modalComponentWatch == 'function') {
		instance.appContext.config.globalProperties.modalComponentWatch.apply(instance.proxy, ['shown', el])
	}
}
//弹出层隐藏前
const beforeLeave = (el: Element) => {
	//清除标记
	Dap.data.remove(<HTMLElement>el, 'mvi-modal-beforeEnter-trigger')
	Dap.data.remove(<HTMLElement>el, 'mvi-modal-enter-trigger')

	emits('hide', el)
	if (typeof instance.appContext.config.globalProperties.modalComponentWatch == 'function') {
		instance.appContext.config.globalProperties.modalComponentWatch.apply(instance.proxy, ['hide', el])
	}
}
//弹出层隐藏时
const leave = (el: Element) => {
	emits('hidding', el)
	if (typeof instance.appContext.config.globalProperties.modalComponentWatch == 'function') {
		instance.appContext.config.globalProperties.modalComponentWatch.apply(instance.proxy, ['hidding', el])
	}
}
//弹出层隐藏后
const afterLeave = (el: Element) => {
	emits('hidden', el)
	if (typeof instance.appContext.config.globalProperties.modalComponentWatch == 'function') {
		instance.appContext.config.globalProperties.modalComponentWatch.apply(instance.proxy, ['hidden', el])
	}
}

watch(
	() => props.fullScreen,
	() => {
		modalSize()
	}
)

defineExpose({
	$$el
})
</script>
<style scoped src="./modal.less"></style>
