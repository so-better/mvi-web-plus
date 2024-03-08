<template>
	<div class="mvi-triangle" :style="triangleStyle" :data-placement="placement">
		<div class="mvi-triangle-el" :style="triangleElStyle" :data-placement="placement"></div>
	</div>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import { TriangleProps } from './props'

defineOptions({
	name: 'm-triangle'
})

const props = defineProps(TriangleProps)

const triangleStyle = computed<any>(() => {
	let style: any = {}
	style.borderWidth = props.size
	if (props.placement == 'top') {
		style.borderBottomColor = props.borderColor || ''
	} else if (props.placement == 'bottom') {
		style.borderTopColor = props.borderColor || ''
	} else if (props.placement == 'left') {
		style.borderRightColor = props.borderColor || ''
	} else if (props.placement == 'right') {
		style.borderLeftColor = props.borderColor || ''
	}
	return style
})

const triangleElStyle = computed<any>(() => {
	let style: any = {}
	style.borderWidth = `calc(${props.size} - 1px)`
	if (props.placement == 'top') {
		style.borderBottomColor = props.background || ''
		style.marginLeft = `-${props.size}`
	} else if (props.placement == 'bottom') {
		style.borderTopColor = props.background || ''
		style.marginLeft = `-${props.size}`
	} else if (props.placement == 'left') {
		style.borderRightColor = props.background || ''
		style.marginTop = `-${props.size}`
	} else if (props.placement == 'right') {
		style.borderLeftColor = props.background || ''
		style.marginTop = `-${props.size}`
	}
	return style
})
</script>

<style scoped src="./triangle.less"></style>
