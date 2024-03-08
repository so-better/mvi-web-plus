<script setup name="m-form-el" lang="ts">
import { ComponentInternalInstance, computed, inject } from 'vue'
import { FormElProps } from './props'

//Form组件实例
const form = inject<ComponentInternalInstance | null>('form', null)

if (!form || form.type.name != 'm-form') {
	throw new Error(`The component 'FormEl' must be used as a subcomponent of the component 'Form'`)
}

const props = defineProps(FormElProps)

const labelStyle = computed<any>(() => {
	let style: any = {}
	if (!form.props.labelBlock) {
		if (props.labelWidth) {
			style.width = props.labelWidth
		} else if (form.props.labelWidth) {
			style.width = form.props.labelWidth
		}
	}
	if (props.labelOffset) {
		if (form.props.labelBlock) {
			style.marginBottom = props.labelOffset
		} else {
			style.marginRight = props.labelOffset
		}
	} else if (form.props.labelOffset) {
		if (form.props.labelBlock) {
			style.marginBottom = form.props.labelOffset
		} else {
			style.marginRight = form.props.labelOffset
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
	} else if (form.props.align) {
		style.alignItems = form.props.align
	}
	return style
})
</script>

<template>
	<div class="mvi-form-el" :class="{ block: form.props.block }" :style="formElStyle">
		<div v-if="label" class="mvi-form-label" :class="{ block: form.props.labelBlock && form.props.block }" v-text="label" :style="labelStyle"></div>
		<div v-if="$slots.default" class="mvi-form-container">
			<slot></slot>
		</div>
	</div>
</template>

<style scoped src="./form-el.less"></style>
