<template>
	<div class="mvi-badge" :class="{ block: block }">
		<slot></slot>
		<span v-if="dot && show" class="mvi-badge-el mvi-badge-dot" :data-placement="placement" :style="badgeStyle"></span>
		<span v-else-if="badgeShow" class="mvi-badge-el" :data-placement="placement" :style="badgeStyle">{{ content }}</span>
	</div>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { computed } from 'vue'
import { BadgeProps } from './props'

defineOptions({
	name: 'm-badge'
})

const props = defineProps(BadgeProps)

const badgeStyle = computed<any>(() => {
	let style: any = {}
	if (props.background) {
		style.background = props.background
	}
	if (props.color) {
		style.color = props.color
	}
	if (props.offset) {
		if (props.offset[0]) {
			if (props.placement == 'top-right' || props.placement == 'bottom-right') {
				style.marginRight = props.offset[0]
			} else if (props.placement == 'top-left' || props.placement == 'bottom-left') {
				style.marginLeft = props.offset[0]
			}
		}
		if (props.offset[1]) {
			if (props.placement == 'top-right' || props.placement == 'top-left') {
				style.marginTop = props.offset[1]
			} else if (props.placement == 'bottom-right' || props.placement == 'bottom-left') {
				style.marginBottom = props.offset[1]
			}
		}
	}
	return style
})
const badgeShow = computed<boolean>(() => {
	const badgeExist = Dap.number.isNumber(props.content) || props.content
	if (badgeExist && props.show) {
		return true
	}
	return false
})
</script>
<style scoped src="./badge.less"></style>
