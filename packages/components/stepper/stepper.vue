<template>
	<div class="mvi-stepper" :class="[size]">
		<div :disabled="disabledMinus || arrivalMin || disabled || null" class="mvi-stepper-minus" :class="minusClass" v-if="showMinus" @click="doMinus">
			<Icon type="minus" />
		</div>
		<div :disabled="disabled || disabledInput || null" class="mvi-stepper-input" :class="{ border: border }" :style="{ width: inputWidth || '' }" v-if="showInput">
			<input ref="inputRef" v-model="realValue" :disabled="disabled || disabledInput" type="text" @blur="changeValue" @keyup.enter="changeValue" :style="{ textAlign: inputAlign }" inputmode="numeric" />
		</div>
		<div :disabled="disabledPlus || arrivalMax || disabled || null" class="mvi-stepper-plus" :class="plusClass" v-if="showPlus" @click="doPlus">
			<Icon type="plus" />
		</div>
	</div>
</template>
<script setup lang="ts">
import Dap from 'dap-util'
import { Icon } from '../icon'
import { StepperProps } from './props'
import { computed, ref } from 'vue'

defineOptions({
	name: 'm-stepper'
})

//事件
const props = defineProps(StepperProps)

//事件
const emits = defineEmits(['update:modelValue', 'change'])

const inputRef = ref<HTMLInputElement | null>(null)

const realValue = computed<number>({
	set(value) {
		let val: number = updateValue(value)
		if (props.modelValue !== val) {
			emits('update:modelValue', val)
			emits('change', val)
		}
	},
	get() {
		return props.modelValue
	}
})
const arrivalMin = computed<boolean>(() => {
	if (props.min != null) {
		return realValue.value <= props.min
	}
	return false
})
const arrivalMax = computed<boolean>(() => {
	if (props.max != null) {
		return realValue.value >= props.max
	}
	return false
})
const minusClass = computed<string[]>(() => {
	let cls: string[] = []
	if (!(props.disabledMinus || arrivalMin.value || props.disabled) && props.active) {
		cls.push('active')
	}
	if (props.border) {
		cls.push('border')
	}
	return cls
})
const plusClass = computed<string[]>(() => {
	let cls: string[] = []
	if (!(props.disabledPlus || arrivalMax.value || props.disabled) && props.active) {
		cls.push('active')
	}
	if (props.border) {
		cls.push('border')
	}
	return cls
})

//校验更新value值
const updateValue = (value: any) => {
	let val = parseFloat(value)
	if (isNaN(val)) {
		val = 0
	}
	val = Number(val.toFixed(props.digit))
	if (val <= props.min && props.min != null) {
		val = props.min
	}
	if (val >= props.max && props.max != null) {
		val = props.max
	}
	return val
}
//减法
const doMinus = () => {
	if (props.disabled) {
		return
	}
	if (props.disabledMinus) {
		return
	}
	if (arrivalMin.value) {
		return
	}
	realValue.value = Dap.number.subtract(realValue.value, props.step)
}
//加法
const doPlus = () => {
	if (props.disabled) {
		return
	}
	if (props.disabledPlus) {
		return
	}
	if (arrivalMax.value) {
		return
	}
	realValue.value = Dap.number.add(realValue.value, props.step)
}
//输入框修改值
const changeValue = () => {
	if (props.disabled) {
		return
	}
	if (props.disabledInput) {
		return
	}
	inputRef.value!.value = '' + realValue.value
}
</script>
<style scoped src="./stepper.less"></style>
