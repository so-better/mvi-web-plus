<template>
	<teleport to="body">
		<transition :name="'mvi-msgbox-' + cmpAnimation" @after-enter="afterEnter" @after-leave="afterLeave">
			<div v-show="show" v-bind="$attrs" class="mvi-msgbox" :class="{ 'mvi-msgbox-translate': cmpAnimation == 'translate' }" v-text="cpmMessage" :style="msgboxStyle"></div>
		</transition>
	</teleport>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { computed, onMounted, ref } from 'vue'
import { MsgboxProps } from './props'

//属性不继承
defineOptions({
	inheritAttrs: false,
	name: 'm-msgbox'
})
//属性
const props = defineProps(MsgboxProps)

//是否显示
const show = ref<boolean>(false)

const cpmMessage = computed<string>(() => {
	if (typeof props.message == 'string') {
		return props.message
	}
	if (Dap.common.isObject(props.message)) {
		return JSON.stringify(props.message)
	}
	return String(props.message)
})
const cmpAnimation = computed<string>(() => {
	if (typeof props.animation == 'string' && props.animation) {
		return props.animation
	}
	return 'fade'
})
const cmpTimeout = computed<number>(() => {
	if (Dap.number.isNumber(props.timeout)) {
		return props.timeout
	}
	return 1500
})
const cmpZIndex = computed<number>(() => {
	if (Dap.number.isNumber(props.zIndex)) {
		return props.zIndex
	}
	return 1100
})
const cmpBackground = computed<string | null>(() => {
	if (typeof props.background == 'string' && props.background) {
		return props.background
	}
	return null
})
const cmpColor = computed<string | null>(() => {
	if (typeof props.color == 'string' && props.color) {
		return props.color
	}
	return null
})
const msgboxStyle = computed<any>(() => {
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

//完全显示后
const afterEnter = () => {
	if (cmpTimeout.value > 0) {
		setTimeout(() => {
			show.value = false
		}, cmpTimeout.value)
	}
}
//完全隐藏后
const afterLeave = () => {
	props.__remove()
}

onMounted(() => {
	show.value = true
})
</script>
<style scoped src="./msgbox.less"></style>
