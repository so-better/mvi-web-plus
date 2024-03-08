<template>
	<div class="mvi-calendar">
		<template v-if="view == 'year'">
			<div class="mvi-calendar-years" v-for="item in [0, 1, 2]">
				<div class="mvi-calendar-year" v-for="el in years.slice(item * 4, item * 4 + 4)">
					<div class="mvi-calendar-year-item" :class="yearClass(el)" :disabled="yearDisabled(el) || null" @click="yearClick(el)">
						{{ el.getFullYear() }}
					</div>
				</div>
			</div>
		</template>

		<template v-else-if="view == 'month'">
			<div class="mvi-calendar-months" v-for="item in [0, 1, 2]">
				<div class="mvi-calendar-month" v-for="el in months.slice(item * 4, item * 4 + 4)">
					<div class="mvi-calendar-month-item" :class="monthClass(el)" :disabled="monthDisabled(el) || null" @click="monthClick(el)">
						{{ monthText[el.getMonth()] }}
					</div>
				</div>
			</div>
		</template>
		<div v-else-if="view == 'date'" class="mvi-calendar-date">
			<div class="mvi-calendar-date-header">
				<div class="mvi-calendar-date-header-item" v-for="item in weekText">{{ item }}</div>
			</div>
			<div class="mvi-calendar-date-body">
				<div v-for="item in [0, 1, 2, 3, 4, 5]" class="mvi-calendar-date-row">
					<div class="mvi-calendar-date-column" v-for="el in days.slice(item * 7, item * 7 + 7)">
						<div class="mvi-calendar-date-item" :class="dateClass(el)" :disabled="dateDisabled(el) || null" @click="dateClick(el)">
							{{ el.date!.getDate() }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
import dayjs from 'dayjs'
import { CalendarDayType, CalendarProps } from './props'
import { computed } from 'vue'

defineOptions({
	name: 'm-calendar'
})

//属性
const props = defineProps(CalendarProps)

//事件
const emits = defineEmits(['update:modelValue', 'date-click', 'month-click', 'year-click'])

//显示在年份面板上的年数组
const years = computed<Date[]>(() => {
	let arr = []
	//获取指定的年份
	const year = props.modelValue.getFullYear()
	const startYear = props.startDate.getFullYear()
	//指定日期所在年份所在数组的序列,12个值为一个数组
	let index = Math.floor((year - startYear) / 12)
	for (let i = startYear + index * 12; i < startYear + index * 12 + 12; i++) {
		arr.push(dayjs(props.modelValue).year(i).toDate())
	}
	return arr
})
//显示在月份面板上的月数组
const months = computed<Date[]>(() => {
	let arr = []
	for (let i = 0; i < 12; i++) {
		arr.push(dayjs(props.modelValue).month(i).toDate())
	}
	return arr
})
//显示在日期面板上的日期数组
const days = computed<CalendarDayType[]>(() => {
	//获取指定日期的总天数
	let total = dayjs(props.modelValue).daysInMonth()
	let arr = []
	for (let i = 1; i <= total; i++) {
		arr.push({
			date: dayjs(`${dayjs(props.modelValue).format('YYYY-MM')}-${i < 10 ? '0' + i : i}`).toDate(),
			nonCurrent: false
		})
	}
	//在数组中添加上个月末的几天
	const firstDate = arr[0].date
	let firstWeek = firstDate.getDay() //获取1号是周几
	for (let i = 0; i < firstWeek; i++) {
		let prevDate = dayjs(firstDate)
			.subtract(i + 1, 'day')
			.toDate()
		arr.unshift({
			date: prevDate,
			nonCurrent: true
		})
	}
	//在数组中添加下个月初的几天
	const lastDate = arr[arr.length - 1].date
	let lastWeek = lastDate.getDay() //获取月末是周几
	for (let i = 0; i < 6 - lastWeek; i++) {
		let nextDate = dayjs(lastDate)
			.add(i + 1, 'day')
			.toDate()
		arr.push({
			date: nextDate,
			nonCurrent: true
		})
	}
	return arr
})
//指定年份值是否禁用
const yearDisabled = computed<(date: Date) => boolean>(() => {
	return (date: Date) => {
		return dayjs(date).isBefore(dayjs(props.startDate), 'year') || dayjs(date).isAfter(dayjs(props.endDate), 'year')
	}
})
//指定月份值是否禁用
const monthDisabled = computed<(date: Date) => boolean>(() => {
	return (date: Date) => {
		return dayjs(date).isBefore(dayjs(props.startDate), 'month') || dayjs(date).isAfter(dayjs(props.endDate), 'month')
	}
})
//指定日期值是否禁用
const dateDisabled = computed<(item: CalendarDayType) => boolean>(() => {
	return (item: CalendarDayType) => {
		return dayjs(item.date).isBefore(dayjs(props.startDate), 'date') || dayjs(item.date).isAfter(dayjs(props.endDate), 'date')
	}
})
//年视图下每个年数值的样式
const yearClass = computed<(date: Date) => string[]>(() => {
	return (date: Date) => {
		let arr: string[] = [props.type]
		if (yearDisabled.value(date)) {
			return arr
		}
		if (props.active) {
			arr.push('active')
		}
		if (dayjs().isSame(dayjs(date), 'year')) {
			arr.push('now')
		}
		if (dayjs(props.modelValue).isSame(dayjs(date), 'year')) {
			arr.push('current')
		}
		return arr
	}
})
//月视图下每个月数值的样式
const monthClass = computed<(date: Date) => string[]>(() => {
	return (date: Date) => {
		let arr: string[] = [props.type]
		if (monthDisabled.value(date)) {
			return arr
		}
		if (props.active) {
			arr.push('active')
		}
		if (dayjs().isSame(dayjs(date), 'month')) {
			arr.push('now')
		}
		if (dayjs(props.modelValue).isSame(dayjs(date), 'month')) {
			arr.push('current')
		}
		return arr
	}
})
//日期视图下每个日期数值的样式
const dateClass = computed<(item: CalendarDayType) => string[]>(() => {
	return (item: CalendarDayType) => {
		let arr: string[] = [props.type]
		//在日期范围之外直接返回
		if (dateDisabled.value(item)) {
			return arr
		}
		//本月之外的日期
		if (item.nonCurrent) {
			//设置固定样式
			arr.push('none-current')
			//如果本月之外的日期允许点击
			if (props.nonCurrentClick) {
				//鼠标设为可点击样式
				arr.push('allowed')
				//如果显示点击态，设置点击态样式
				if (props.active) {
					arr.push('active')
				}
			}
		}
		//本月内的日期
		else {
			//如果显示点击态设置点击态样式
			if (props.active) {
				arr.push('active')
			}
			//如果是今天显示今天样式
			if (dayjs().isSame(dayjs(item.date), 'date')) {
				arr.push('now')
			}
			//如果是当前日期值，显示当前值样式
			if (dayjs(props.modelValue).isSame(dayjs(item.date), 'date')) {
				arr.push('current')
			}
		}

		return arr
	}
})

//年份点击
const yearClick = (date: Date) => {
	if (yearDisabled.value(date)) {
		return
	}
	emits('update:modelValue', date)
	emits('year-click', date)
}
//月份点击
const monthClick = (date: Date) => {
	if (monthDisabled.value(date)) {
		return
	}
	emits('update:modelValue', date)
	emits('month-click', date)
}
//日期点击
const dateClick = (item: CalendarDayType) => {
	//超出日期范围
	if (dateDisabled.value(item)) {
		return
	}
	//不是本月并且不能点击本月之外的日期
	if (item.nonCurrent && !props.nonCurrentClick) {
		return
	}
	emits('update:modelValue', item.date)
	emits('date-click', item.date)
}
</script>
<style scoped src="./calendar.less"></style>
