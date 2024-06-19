<template>
	<label class="mvi-radio" :disabled="disabled || null">
		<span v-if="placement == 'left' && label" class="mvi-radio-label" :data-placement="placement" v-text="label"></span>
		<input @change="change" :value="value" :disabled="disabled" :checked="check" type="radio" :name="name" />
		<span class="mvi-radio-item" :class="{ check: check, round: round }" :style="itemStyle">
			<Icon type="success" :style="{ opacity: check ? '' : 0 }" />
		</span>
		<span v-if="placement == 'right' && label" class="mvi-radio-label" :data-placement="placement" v-text="label"></span>
	</label>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { computed } from 'vue'
import { Icon } from '@/components/icon'
import { RadioProps } from './props'

defineOptions({
	name: 'm-radio'
})

//属性
const props = defineProps(RadioProps)
//事件
const emits = defineEmits(['update:modelValue', 'change'])

const check = computed<boolean>(() => {
	if (typeof props.modelValue == 'boolean') {
		return props.modelValue
	}
	return Dap.common.equal(props.modelValue, props.value)
})
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
	if (typeof props.modelValue == 'boolean') {
		emits('update:modelValue', (<HTMLInputElement>event.target).checked)
		emits('change', (<HTMLInputElement>event.target).checked)
	} else {
		//勾选
		if ((<HTMLInputElement>event.target).checked) {
			emits('update:modelValue', props.value)
			emits('change', props.value)
		}
	}
}
</script>
<style scoped src="./radio.less"></style>
