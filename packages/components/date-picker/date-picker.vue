<template>
	<div class="mvi-date-picker">
		<Picker :options="pickerOptions" :show-toolbar="showToolbar" :title="title" :confirm-text="confirmText" :cancel-text="cancelText" :loading="loading" :visible-counts="visibleCounts" :select-height="selectHeight" @change="dateChange" @confirm="doConfirm" @cancel="doCancel"></Picker>
	</div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, getCurrentInstance } from 'vue'
import { Picker, PickerActiveType, PickerOptionsItemType } from '@/components/picker'
import { DatePickerProps } from './props'

defineOptions({
	name: 'm-date-picker'
})

//实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(DatePickerProps)

//事件
const emits = defineEmits(['update:modelValue', 'confirm', 'cancel', 'change'])

//已选择的日期
const selectedDate = computed<Date>({
	set(value) {
		if (value instanceof Date) {
			const unit = getUnit()
			if (dayjs(value).isBefore(dayjs(props.startDate), unit)) {
				value = props.startDate
			}
			if (dayjs(value).isAfter(dayjs(props.endDate), unit)) {
				value = props.endDate
			}
		}
		emits('update:modelValue', value)
		emits('change', value)
	},
	get() {
		if (props.modelValue instanceof Date) {
			const unit = getUnit()
			if (dayjs(props.modelValue).isBefore(dayjs(props.startDate), unit)) {
				return props.startDate
			}
			if (dayjs(props.modelValue).isAfter(dayjs(props.endDate), unit)) {
				return props.endDate
			}
			return props.modelValue
		}
		return new Date()
	}
})
//年份数组
const years = computed<number[]>(() => {
	let arr: number[] = []
	let currentYear = props.startDate.getFullYear()
	while (currentYear <= props.endDate.getFullYear()) {
		arr.push(currentYear)
		currentYear++
	}
	return arr
})
//月份数组
const months = computed<number[]>(() => {
	const format = dayjs(selectedDate.value).format('YYYY')
	let arr = []
	for (let i = 1; i <= 12; i++) {
		if (dayjs(`${format}-${i < 10 ? '0' + i : i}`).isBefore(dayjs(props.startDate), 'month')) {
			continue
		}
		if (dayjs(`${format}-${i < 10 ? '0' + i : i}`).isAfter(dayjs(props.endDate), 'month')) {
			continue
		}
		arr.push(i)
	}
	return arr
})
//日期数组
const days = computed<number[]>(() => {
	const format = dayjs(selectedDate.value).format('YYYY-MM')
	let arr = []
	//总天数
	const total = dayjs(selectedDate.value).daysInMonth()
	for (let i = 1; i <= total; i++) {
		if (dayjs(`${format}-${i < 10 ? '0' + i : i}`).isBefore(dayjs(props.startDate), 'date')) {
			continue
		}
		if (dayjs(`${format}-${i < 10 ? '0' + i : i}`).isAfter(dayjs(props.endDate), 'date')) {
			continue
		}
		arr.push(i)
	}
	return arr
})
//时数组
const hours = computed<number[]>(() => {
	const format = dayjs(selectedDate.value).format('YYYY-MM-DD')
	let arr = []
	for (let i = 0; i < 24; i++) {
		if (dayjs(`${format} ${i < 10 ? '0' + i : i}`).isBefore(dayjs(props.startDate), 'hour')) {
			continue
		}
		if (dayjs(`${format} ${i < 10 ? '0' + i : i}`).isAfter(dayjs(props.endDate), 'hour')) {
			continue
		}
		arr.push(i)
	}
	return arr
})
//分数组
const minutes = computed<number[]>(() => {
	const format = dayjs(selectedDate.value).format('YYYY-MM-DD HH')
	let arr = []
	for (let i = 0; i < 60; i++) {
		if (dayjs(`${format}:${i < 10 ? '0' + i : i}`).isBefore(dayjs(props.startDate), 'minute')) {
			continue
		}
		if (dayjs(`${format}:${i < 10 ? '0' + i : i}`).isAfter(dayjs(props.endDate), 'minute')) {
			continue
		}
		arr.push(i)
	}
	return arr
})
//选择器数据配置
const pickerOptions = computed<PickerOptionsItemType | PickerOptionsItemType[]>(() => {
	const yearColumn: PickerOptionsItemType = {
		defaultIndex: years.value.findIndex(item => {
			return item == selectedDate.value.getFullYear()
		}),
		values: years.value.map(item => {
			if (typeof props.formatter == 'function') {
				return props.formatter.apply(instance.proxy, ['year', item])
			}
			return `${item}年`
		})
	}
	const monthColumn: PickerOptionsItemType = {
		defaultIndex: months.value.findIndex(item => {
			return item == selectedDate.value.getMonth() + 1
		}),
		values: months.value.map(item => {
			if (typeof props.formatter == 'function') {
				return props.formatter.apply(instance.proxy, ['month', item])
			}
			return `${item}月`
		})
	}
	const dateColumn: PickerOptionsItemType = {
		defaultIndex: days.value.findIndex(item => {
			return item == selectedDate.value.getDate()
		}),
		values: days.value.map(item => {
			if (typeof props.formatter == 'function') {
				return props.formatter.apply(instance.proxy, ['date', item])
			}
			return `${item}日`
		})
	}
	const hourColumn: PickerOptionsItemType = {
		defaultIndex: hours.value.findIndex(item => {
			return item == selectedDate.value.getHours()
		}),
		values: hours.value.map(item => {
			if (typeof props.formatter == 'function') {
				return props.formatter.apply(instance.proxy, ['hour', item])
			}
			return `${item}时`
		})
	}
	const minuteColumn: PickerOptionsItemType = {
		defaultIndex: minutes.value.findIndex(item => {
			return item == selectedDate.value.getMinutes()
		}),
		values: minutes.value.map(item => {
			if (typeof props.formatter == 'function') {
				return props.formatter.apply(instance.proxy, ['minute', item])
			}
			return `${item}分`
		})
	}
	if (props.mode == 'year') {
		return yearColumn
	}
	if (props.mode == 'month') {
		return [yearColumn, monthColumn]
	}
	if (props.mode == 'date') {
		return [yearColumn, monthColumn, dateColumn]
	}
	if (props.mode == 'datetime') {
		return [yearColumn, monthColumn, dateColumn, hourColumn, minuteColumn]
	}
	if (props.mode == 'time') {
		return [hourColumn, minuteColumn]
	}
	return []
})

//获取dayjs比较维度单位
const getUnit = () => {
	if (props.mode == 'year') {
		return 'year'
	}
	if (props.mode == 'month') {
		return 'month'
	}
	if (props.mode == 'date') {
		return 'date'
	}
	if (props.mode == 'time' || props.mode == 'datetime') {
		return 'minute'
	}
}
//修改年
const updateYear = (year: number) => {
	selectedDate.value = dayjs(selectedDate.value).year(year).toDate()
}
//修改月
const updateMonth = (month: number) => {
	selectedDate.value = dayjs(selectedDate.value)
		.month(month - 1)
		.toDate()
}
//修改日
const updateDay = (day: number) => {
	selectedDate.value = dayjs(selectedDate.value).date(day).toDate()
}
//修改时
const updateHour = (hour: number) => {
	selectedDate.value = dayjs(selectedDate.value).hour(hour).toDate()
}
//修改分
const updateMinute = (minute: number) => {
	selectedDate.value = dayjs(selectedDate.value).minute(minute).toDate()
}
//日期变更
const dateChange = (column: number, item: PickerActiveType | PickerActiveType[]) => {
	//只选择年
	if (props.mode == 'year') {
		updateYear(years.value[(<PickerActiveType>item).index])
	}
	//选择年月
	else if (props.mode == 'month') {
		if (column == 0) {
			updateYear(years.value[(<PickerActiveType[]>item)[column].index])
		} else {
			updateMonth(months.value[(<PickerActiveType[]>item)[column].index])
		}
	}
	//选择年月日
	else if (props.mode == 'date') {
		if (column == 0) {
			updateYear(years.value[(<PickerActiveType[]>item)[column].index])
		} else if (column == 1) {
			updateMonth(months.value[(<PickerActiveType[]>item)[column].index])
		} else {
			updateDay(days.value[(<PickerActiveType[]>item)[column].index])
		}
	}
	//选择时分
	else if (props.mode == 'time') {
		if (column == 0) {
			updateHour(hours.value[(<PickerActiveType[]>item)[column].index])
		} else {
			updateMinute(minutes.value[(<PickerActiveType[]>item)[column].index])
		}
	}
	//选择年月日时分
	else if (props.mode == 'datetime') {
		if (column == 0) {
			updateYear(years.value[(<PickerActiveType[]>item)[column].index])
		} else if (column == 1) {
			updateMonth(months.value[(<PickerActiveType[]>item)[column].index])
		} else if (column == 2) {
			updateDay(days.value[(<PickerActiveType[]>item)[column].index])
		} else if (column == 3) {
			updateHour(hours.value[(<PickerActiveType[]>item)[column].index])
		} else {
			updateMinute(minutes.value[(<PickerActiveType[]>item)[column].index])
		}
	}
}
//点击确定
const doConfirm = () => {
	emits('confirm', selectedDate.value)
}
//点击取消
const doCancel = () => {
	emits('cancel', selectedDate.value)
}
</script>

<style scoped src="./date-picker.less"></style>
