<script setup name="m-progress" lang="ts">
import { computed } from 'vue'
import { ProgressProps } from './props'

//属性
const props = defineProps(ProgressProps)

const progressStyle = computed<any>(() => {
	let style: any = {}
	if (props.strokeWidth) {
		style.height = props.strokeWidth
	}
	if (props.trackColor) {
		style.backgroundColor = props.trackColor
	}
	return style
})
const progressBarStyle = computed<any>(() => {
	let style: any = {}
	if (props.animation) {
		style.transition = 'width ' + props.timeout + 'ms,border-radius ' + props.timeout + 'ms'
	}
	if (props.color) {
		style.backgroundColor = props.color
	}
	if (props.value == props.max) {
		style.borderRadius = 'inherit'
	}
	style.width = `calc(${(props.value - props.min < 0 ? 0 : props.value - props.min) / (props.max - props.min)} * 100%)`

	return style
})
const cmpText = computed<string>(() => {
	if (props.tipText) {
		return props.tipText
	}
	return Math.round(((props.value - props.min < 0 ? 0 : props.value - props.min) / (props.max - props.min)) * 100) + '%'
})
</script>

<template>
	<!-- 进度条 -->
	<div class="mvi-progress" :class="{ round: round, square: !round && square }" :style="progressStyle">
		<!-- 进度条进度 -->
		<div class="mvi-progress-bar" :style="progressBarStyle">
			<div v-if="showTip" class="mvi-progress-tooltip" :style="{ color: tipColor || '' }">
				<slot name="tip" v-if="$slots.tip" :value="value"></slot>
				<span v-else v-text="cmpText"></span>
			</div>
		</div>
	</div>
</template>

<style scoped src="./progress.less"></style>
