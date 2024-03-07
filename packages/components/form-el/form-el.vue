<script setup name="m-form-el" lang="ts">
import { computed, getCurrentInstance } from 'vue'
import { FormElProps } from './props'

//实例
const instance = getCurrentInstance()!

if (!instance.parent || instance.parent.type.name != 'm-form') {
	throw new Error(`The component 'FormEl' must be used as a subcomponent of the component 'Form'`)
}

const props = defineProps(FormElProps)

const labelStyle = computed<any>(() => {
	let style: any = {}
	if (!instance.parent!.props.labelBlock) {
		if (props.labelWidth) {
			style.width = props.labelWidth
		} else if (instance.parent!.props.labelWidth) {
			style.width = instance.parent!.props.labelWidth
		}
	}
	if (props.labelOffset) {
		if (instance.parent!.props.labelBlock) {
			style.marginBottom = props.labelOffset
		} else {
			style.marginRight = props.labelOffset
		}
	} else if (instance.parent!.props.labelOffset) {
		if (instance.parent!.props.labelBlock) {
			style.marginBottom = instance.parent!.props.labelOffset
		} else {
			style.marginRight = instance.parent!.props.labelOffset
		}
	}
	return style
})
const formElStyle = computed<any>(() => {
	let style: any = {}
	if (props.width) {
		style.width = props.width
	}
	if (props.align) {
		style.alignItems = props.align
	} else if (instance.parent!.props.align) {
		style.alignItems = instance.parent!.props.align
	}
	return style
})
</script>

<template>
	<div class="mvi-form-el" :class="{ block: instance.parent!.props.block }" :style="formElStyle">
		<div v-if="label" class="mvi-form-label" :class="{ block: instance.parent!.props.labelBlock && instance.parent!.props.block }" v-text="label" :style="labelStyle"></div>
		<div v-if="$slots.default" class="mvi-form-container">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped src="./form-el.less"></style>
