<template>
	<input ref="elRef" @blur="selectDateForIOS" @change="selectDateForAndroid" class="mvi-date-native-picker" :type="dateType" :value="defaultDate" />
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import Dap from 'dap-util'
import { DateNativePickerProps } from './props'
import { computed, ref } from 'vue'

defineOptions({
	name: 'm-date-native-picker'
})

//属性
const props = defineProps(DateNativePickerProps)

//事件
const emits = defineEmits(['update:modelValue', 'error', 'change'])

const elRef = ref<HTMLInputElement | null>(null)

const dateType = computed<'date' | 'month' | 'time' | 'datetime-local'>(() => {
	if (props.type == 'datetime') {
		return 'datetime-local'
	} else {
		return props.type
	}
})
const defaultDate = computed<string>(() => {
	if (props.modelValue) {
		if (props.type == 'date') {
			return dayjs(props.modelValue).format('YYYY-MM-DD')
		}
		if (props.type == 'datetime') {
			return dayjs(props.modelValue).format('YYYY-MM-DD HH:mm')
		}
		if (props.type == 'month') {
			return dayjs(props.modelValue).format('YYYY-MM')
		}
		if (props.type == 'time') {
			return dayjs(props.modelValue).format('HH:mm')
		}
	}
	return ''
})

//选择时间
const selectDate = () => {
	if (elRef.value!.value) {
		let val = props.type == 'time' ? `${dayjs(props.modelValue).format('YYYY-MM-DD')} ${elRef.value!.value}` : elRef.value!.value
		const date = dayjs(val)
		if (props.min && date.isBefore(dayjs(props.min))) {
			emits('error', 0, 'The date is less than min')
			return
		}
		if (props.max && dayjs(props.max).isBefore(date)) {
			emits('error', 1, 'The date is greater than max')
			return
		}
		emits('update:modelValue', date.toDate())
		emits('change', date.toDate())
	} else {
		emits('update:modelValue', null)
		emits('change', null)
	}
}
//ios系统下选择日期（排除ipad）
const selectDateForIOS = () => {
	const ios = Dap.platform.os().ios
	const iPad = Dap.platform.device().iPad
	if (ios && !iPad) {
		selectDate()
	}
}
//安卓系统下选择日期（加上ipad）
const selectDateForAndroid = () => {
	const ios = Dap.platform.os().ios
	const iPad = Dap.platform.device().iPad
	if (!ios || iPad) {
		selectDate()
	}
}

//api：触发日期选择弹窗
const trigger = () => {
	const ios = Dap.platform.os().ios
	const iPad = Dap.platform.device().iPad
	if (ios && !iPad) {
		elRef.value!.focus()
	} else {
		elRef.value!.click()
	}
}

defineExpose({
	trigger
})
</script>
<style scoped src="./date-native-picker.less"></style>
