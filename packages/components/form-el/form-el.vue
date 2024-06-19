<template>
	<div class="mvi-form-el" :class="{ block: form!.props.block }" :style="formElStyle">
		<div v-if="label" class="mvi-form-label" :class="{ block: form!.props.labelBlock && form!.props.block }" v-text="label" :style="labelStyle"></div>
		<div v-if="$slots.default" class="mvi-form-container">
			<slot></slot>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ComponentInternalInstance, computed, inject, ref } from 'vue'
import { parentIsMatch } from '@/utils'
import { FormElProps } from './props'

defineOptions({
	name: 'm-form-el'
})

//Form组件实例
const form = inject<ComponentInternalInstance | null>('form', null)
//判断父组件是否符合规定
parentIsMatch(ref([]), form, 'm-form', ['Form', 'FormEl'])

const props = defineProps(FormElProps)

const labelStyle = computed<any>(() => {
	let style: any = {}
	if (!form!.props.labelBlock) {
		if (props.labelWidth) {
			style.width = props.labelWidth
		} else if (form!.props.labelWidth) {
			style.width = form!.props.labelWidth
		}
	}
	if (props.labelOffset) {
		if (form!.props.labelBlock) {
			style.marginBottom = props.labelOffset
		} else {
			style.marginRight = props.labelOffset
		}
	} else if (form!.props.labelOffset) {
		if (form!.props.labelBlock) {
			style.marginBottom = form!.props.labelOffset
		} else {
			style.marginRight = form!.props.labelOffset
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
	} else if (form!.props.align) {
		style.alignItems = form!.props.align
	}
	return style
})
</script>
<style scoped src="./form-el.less"></style>
