<template>
	<div class="mvi-navbar" :class="{ fixed: fixed, border: border }" :style="{ 'z-index': fixed ? zIndex : '' }">
		<div @click="emits('left-click')" class="mvi-navbar-left" :style="leftStyle" v-if="showLeft">
			<slot name="left" v-if="$slots.left"></slot>
			<Icon :class="{ 'mvi-navbar-left-icon': !!leftText }" v-if="(parseIcon(leftIcon).type || parseIcon(leftIcon).url) && !$slots.left" :type="parseIcon(leftIcon).type" :url="parseIcon(leftIcon).url" :spin="parseIcon(leftIcon).spin" :size="parseIcon(leftIcon).size" :color="parseIcon(leftIcon).color" />
			<span class="mvi-navbar-left-text" v-if="leftText && !$slots.left" v-text="leftText"></span>
		</div>
		<div @click="emits('title-click')" class="mvi-navbar-center" :style="centerStyle" v-if="$slots.title || title">
			<div class="mvi-navbar-title">
				<slot name="title" v-if="$slots.title"></slot>
				<span v-else-if="title" v-text="title"></span>
			</div>
		</div>
		<div @click="emits('right-click')" class="mvi-navbar-right" :style="rightStyle" v-if="showRight">
			<slot name="right" v-if="$slots.right"></slot>
			<span class="mvi-navbar-right-text" v-if="rightText && !$slots.right" v-text="rightText"></span>
			<Icon :class="{ 'mvi-navbar-right-icon': !!rightText }" v-if="(parseIcon(rightIcon).type || parseIcon(rightIcon).url) && !$slots.right" :type="parseIcon(rightIcon).type" :url="parseIcon(rightIcon).url" :spin="parseIcon(rightIcon).spin" :size="parseIcon(rightIcon).size" :color="parseIcon(rightIcon).color" />
		</div>
	</div>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { Icon } from '../icon'
import { NavbarProps } from './props'
import { computed, useSlots } from 'vue'
import { IconPropsType } from '../icon/props'

defineOptions({
	name: 'm-navbar'
})

//属性
const props = defineProps(NavbarProps)

//事件
const emits = defineEmits(['left-click', 'right-click', 'title-click'])

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
const showLeft = computed<boolean>(() => {
	return !!(parseIcon.value(props.leftIcon).type || parseIcon.value(props.leftIcon).url || useSlots().left || props.leftText)
})
const showRight = computed<boolean>(() => {
	return !!(parseIcon.value(props.rightIcon).type || parseIcon.value(props.rightIcon).url || useSlots().right || props.rightText)
})
const leftStyle = computed<any>(() => {
	let style: any = {}
	if (props.title || useSlots().title) {
		style.width = '20%'
	} else if (showRight.value) {
		style.width = '50%'
	} else {
		style.width = '100%'
	}
	return style
})
const rightStyle = computed<any>(() => {
	let style: any = {}
	if (props.title || useSlots().title) {
		style.width = '20%'
	} else if (showLeft.value) {
		style.width = '50%'
	} else {
		style.width = '100%'
	}
	return style
})
const centerStyle = computed<any>(() => {
	let style: any = {}
	if (showLeft.value || showRight.value) {
		style.width = '60%'
	} else {
		style.width = '100%'
	}
	return style
})
</script>
<style scoped src="./navbar.less"></style>
