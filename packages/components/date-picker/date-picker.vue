<template>
	<div class="mvi-date-picker">
		<Picker :options="pickerOptions" :show-toolbar="showToolbar" :title="title" :confirm-text="confirmText" :cancel-text="cancelText" :loading="loading" :visible-counts="visibleCounts" :select-height="selectHeight" @change="dateChange" @confirm="doConfirm" @cancel="doCancel"></Picker>
	</div>
</template>

<script>
import dayjs from 'dayjs'
import { Picker } from '../picker'
export default {
	name: 'm-date-picker',
	emits: ['update:modelValue', 'confirm', 'cancel', 'change'],
	props: {
		//日期值
		modelValue: {
			type: Date,
			default: function () {
				return new Date()
			}
		},
		//默认开始时间1970年1月1日00:00
		startDate: {
			type: Date,
			default: function () {
				return dayjs('1970-01-01 00:00:00').toDate()
			}
		},
		//默认结束时间2099年12月31日23:59
		endDate: {
			type: Date,
			default: function () {
				return dayjs('2099-12-31 23:59:59').toDate()
			}
		},
		//模式
		mode: {
			type: String,
			default: 'date',
			validator(value) {
				return ['date', 'datetime', 'time', 'month', 'year'].includes(value)
			}
		},
		//是否显示顶部标题栏
		showToolbar: {
			type: Boolean,
			default: true
		},
		//标题
		title: {
			type: String,
			default: null
		},
		//确认文字
		confirmText: {
			type: String,
			default: '确定'
		},
		//取消文字
		cancelText: {
			type: String,
			default: '取消'
		},
		//是否显示加载状态
		loading: {
			type: Boolean,
			default: false
		},
		//可见选项个数
		visibleCounts: {
			type: Number,
			default: 5
		},
		//选择框高度
		selectHeight: {
			type: String,
			default: '0.88rem'
		},
		//格式化函数
		formatter: {
			type: Function
		}
	},
	computed: {
		//已选择的日期
		selectedDate: {
			set(value) {
				if (value instanceof Date) {
					const unit = this.getUnit()
					if (dayjs(value).isBefore(dayjs(this.startDate), unit)) {
						value = this.startDate
					}
					if (dayjs(value).isAfter(dayjs(this.endDate), unit)) {
						value = this.endDate
					}
				}
				this.$emit('update:modelValue', value)
				this.$emit('change', value)
			},
			get() {
				if (this.modelValue instanceof Date) {
					const unit = this.getUnit()
					if (dayjs(this.modelValue).isBefore(dayjs(this.startDate), unit)) {
						return this.startDate
					}
					if (dayjs(this.modelValue).isAfter(dayjs(this.endDate), unit)) {
						return this.endDate
					}
					return this.modelValue
				}
				return new Date()
			}
		},
		//年份数组
		years() {
			let arr = []
			let currentYear = this.startDate.getFullYear()
			while (currentYear <= this.endDate.getFullYear()) {
				arr.push(currentYear)
				currentYear++
			}
			return arr
		},
		//月份数组
		months() {
			const format = dayjs(this.selectedDate).format('YYYY')
			let arr = []
			for (let i = 1; i <= 12; i++) {
				if (dayjs(`${format}-${i < 10 ? '0' + i : i}`).isBefore(dayjs(this.startDate), 'month')) {
					continue
				}
				if (dayjs(`${format}-${i < 10 ? '0' + i : i}`).isAfter(dayjs(this.endDate), 'month')) {
					continue
				}
				arr.push(i)
			}
			return arr
		},
		//日期数组
		days() {
			const format = dayjs(this.selectedDate).format('YYYY-MM')
			let arr = []
			//总天数
			const total = dayjs(this.selectedDate).daysInMonth()
			for (let i = 1; i <= total; i++) {
				if (dayjs(`${format}-${i < 10 ? '0' + i : i}`).isBefore(dayjs(this.startDate), 'date')) {
					continue
				}
				if (dayjs(`${format}-${i < 10 ? '0' + i : i}`).isAfter(dayjs(this.endDate), 'date')) {
					continue
				}
				arr.push(i)
			}
			return arr
		},
		//时数组
		hours() {
			const format = dayjs(this.selectedDate).format('YYYY-MM-DD')
			let arr = []
			for (let i = 0; i < 24; i++) {
				if (dayjs(`${format} ${i < 10 ? '0' + i : i}`).isBefore(dayjs(this.startDate), 'hour')) {
					continue
				}
				if (dayjs(`${format} ${i < 10 ? '0' + i : i}`).isAfter(dayjs(this.endDate), 'hour')) {
					continue
				}
				arr.push(i)
			}
			return arr
		},
		//分数组
		minutes() {
			const format = dayjs(this.selectedDate).format('YYYY-MM-DD HH')
			let arr = []
			for (let i = 0; i < 60; i++) {
				if (dayjs(`${format}:${i < 10 ? '0' + i : i}`).isBefore(dayjs(this.startDate), 'minute')) {
					continue
				}
				if (dayjs(`${format}:${i < 10 ? '0' + i : i}`).isAfter(dayjs(this.endDate), 'minute')) {
					continue
				}
				arr.push(i)
			}
			return arr
		},
		//选择器数据配置
		pickerOptions() {
			const yearColumn = {
				defaultIndex: this.years.findIndex(item => {
					return item == this.selectedDate.getFullYear()
				}),
				values: this.years.map(item => {
					if (typeof this.formatter == 'function') {
						return this.formatter.apply(this, ['year', item])
					}
					return `${item}年`
				})
			}
			const monthColumn = {
				defaultIndex: this.months.findIndex(item => {
					return item == this.selectedDate.getMonth() + 1
				}),
				values: this.months.map(item => {
					if (typeof this.formatter == 'function') {
						return this.formatter.apply(this, ['month', item])
					}
					return `${item}月`
				})
			}
			const dateColumn = {
				defaultIndex: this.days.findIndex(item => {
					return item == this.selectedDate.getDate()
				}),
				values: this.days.map(item => {
					if (typeof this.formatter == 'function') {
						return this.formatter.apply(this, ['date', item])
					}
					return `${item}日`
				})
			}
			const hourColumn = {
				defaultIndex: this.hours.findIndex(item => {
					return item == this.selectedDate.getHours()
				}),
				values: this.hours.map(item => {
					if (typeof this.formatter == 'function') {
						return this.formatter.apply(this, ['hour', item])
					}
					return `${item}时`
				})
			}
			const minuteColumn = {
				defaultIndex: this.minutes.findIndex(item => {
					return item == this.selectedDate.getMinutes()
				}),
				values: this.minutes.map(item => {
					if (typeof this.formatter == 'function') {
						return this.formatter.apply(this, ['minute', item])
					}
					return `${item}分`
				})
			}
			if (this.mode == 'year') {
				return yearColumn
			}
			if (this.mode == 'month') {
				return [yearColumn, monthColumn]
			}
			if (this.mode == 'date') {
				return [yearColumn, monthColumn, dateColumn]
			}
			if (this.mode == 'datetime') {
				return [yearColumn, monthColumn, dateColumn, hourColumn, minuteColumn]
			}
			if (this.mode == 'time') {
				return [hourColumn, minuteColumn]
			}
		}
	},
	components: {
		Picker
	},
	methods: {
		//日期变更
		dateChange(column, item) {
			//只选择年
			if (this.mode == 'year') {
				this.updateYear(this.years[item.index])
			}
			//选择年月
			else if (this.mode == 'month') {
				if (column == 0) {
					this.updateYear(this.years[item[column].index])
				} else {
					this.updateMonth(this.months[item[column].index])
				}
			}
			//选择年月日
			else if (this.mode == 'date') {
				if (column == 0) {
					this.updateYear(this.years[item[column].index])
				} else if (column == 1) {
					this.updateMonth(this.months[item[column].index])
				} else {
					this.updateDay(this.days[item[column].index])
				}
			}
			//选择时分
			else if (this.mode == 'time') {
				if (column == 0) {
					this.updateHour(this.hours[item[column].index])
				} else {
					this.updateMinute(this.minutes[item[column].index])
				}
			}
			//选择年月日时分
			else if (this.mode == 'datetime') {
				if (column == 0) {
					this.updateYear(this.years[item[column].index])
				} else if (column == 1) {
					this.updateMonth(this.months[item[column].index])
				} else if (column == 2) {
					this.updateDay(this.days[item[column].index])
				} else if (column == 3) {
					this.updateHour(this.hours[item[column].index])
				} else {
					this.updateMinute(this.minutes[item[column].index])
				}
			}
		},
		//点击确定
		doConfirm() {
			this.$emit('confirm', this.selectedDate)
		},
		//点击取消
		doCancel() {
			this.$emit('cancel', this.selectedDate)
		},
		//修改年
		updateYear(year) {
			this.selectedDate = dayjs(this.selectedDate).year(year).toDate()
		},
		//修改月
		updateMonth(month) {
			this.selectedDate = dayjs(this.selectedDate)
				.month(month - 1)
				.toDate()
		},
		//修改日
		updateDay(day) {
			this.selectedDate = dayjs(this.selectedDate).date(day).toDate()
		},
		//修改时
		updateHour(hour) {
			this.selectedDate = dayjs(this.selectedDate).hour(hour).toDate()
		},
		//修改分
		updateMinute(minute) {
			this.selectedDate = dayjs(this.selectedDate).minute(minute).toDate()
		},
		//获取dayjs比较维度单位
		getUnit() {
			if (this.mode == 'year') {
				return 'year'
			}
			if (this.mode == 'month') {
				return 'month'
			}
			if (this.mode == 'date') {
				return 'date'
			}
			if (this.mode == 'time' || this.mode == 'datetime') {
				return 'minute'
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-date-picker {
	display: block;
	width: 100%;
	position: relative;
}
</style>
