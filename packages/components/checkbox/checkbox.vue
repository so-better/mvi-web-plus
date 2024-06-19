<template>
	<label class="mvi-checkbox" :disabled="disabled || null">
		<span v-if="placement == 'left' && label" class="mvi-checkbox-label" :data-placement="placement" v-text="label"></span>
		<input @change="change" :value="value" :disabled="disabled" :checked="check" type="checkbox" :name="name" />
		<span class="mvi-checkbox-item" :class="{ check: check, round: round }" :style="itemStyle">
			<Icon type="success" :style="{ opacity: check ? '' : 0 }" />
		</span>
		<span v-if="placement == 'right' && label" class="mvi-checkbox-label" :data-placement="placement" v-text="label"></span>
	</label>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { computed } from 'vue'
import { Icon } from '@/components/icon'
import { CheckboxProps } from './props'

defineOptions({
	name: 'm-checkbox'
})

//属性
const props = defineProps(CheckboxProps)
//事件
const emits = defineEmits(['update:modelValue', 'change'])

//是否勾选
const check = computed<boolean>(() => {
	if (typeof props.modelValue == 'boolean') {
		return props.modelValue
	}
	if (Array.isArray(props.modelValue)) {
		//数组中是否已包含此复选框的值
		return props.modelValue.some(item => {
			return Dap.common.equal(item, props.value)
		})
	}
	return false
})
//样式
const itemStyle = computed<any>(() => {
	let style: any = {}
	if (props.color && check.value && !props.disabled) {
		style.backgroundColor = props.color
		style.borderColor = props.color
	}
	if (props.size) {
		style.fontSize = props.size
	}
	return style
})

const change = (event: Event) => {
	if (Array.isArray(props.modelValue)) {
		let arr = [...props.modelValue]
		//勾选且不包含
		if ((<HTMLInputElement>event.target).checked && !check.value) {
			arr.push(props.value)
		}
		//取消且包含
		else if (check.value) {
			arr = arr.filter(item => {
				return !Dap.common.equal(item, props.value)
			})
		}
		emits('update:modelValue', arr)
		emits('change', arr)
	} else if (typeof props.modelValue == 'boolean') {
		emits('update:modelValue', (<HTMLInputElement>event.target).checked)
		emits('change', (<HTMLInputElement>event.target).checked)
	}
}
</script>
<style scoped src="./checkbox.less"></style>
