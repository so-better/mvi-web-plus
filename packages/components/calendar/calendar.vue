<template>
	<div class="mvi-calendar">
		<template v-if="view == 'year'">
			<div class="mvi-calendar-years" v-for="(item, index) in new Array(3)">
				<div class="mvi-calendar-year" v-for="el in years.slice(index * 4, index * 4 + 4)">
					<div :class="yearClass(el)" :disabled="yearDisabled(el) || null" @click="yearClick(el)">
						{{ el.getFullYear() }}
					</div>
				</div>
			</div>
		</template>
		<template v-else-if="view == 'month'">
			<div class="mvi-calendar-months" v-for="(item, index) in new Array(3)">
				<div class="mvi-calendar-month" v-for="el in months.slice(index * 4, index * 4 + 4)">
					<div :class="monthClass(el)" :disabled="monthDisabled(el) || null" @click="monthClick(el)">
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
				<div v-for="(item, index) in new Array(6)" class="mvi-calendar-date-row">
					<div class="mvi-calendar-date-column" v-for="(el, i) in days.slice(index * 7, index * 7 + 7)">
						<div :class="dateClass(el)" :disabled="dateDisabled(el) || null" @click="dateClick(el)">
							{{ el.date.getDate() }}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import dayjs from 'dayjs'
import { Dap } from '../dap'
export default {
	name: 'm-calendar',
	emits: ['update:modelValue', 'date-click', 'month-click', 'year-click'],
	props: {
		//指定显示的日期
		modelValue: {
			type: Date,
			default: function () {
				return new Date()
			}
		},
		//视图类型
		view: {
			type: String,
			default: 'date',
			validator(value) {
				return ['year', 'month', 'date'].includes(value)
			}
		},
		//月份面板显示的月份数组文字
		monthText: {
			type: Array,
			default: function () {
				return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
			},
			validator(value) {
				if (value.length != 12) {
					return false
				}
				return value.every(item => {
					return Dap.number.isNumber(item) || (typeof item == 'string' && item)
				})
			}
		},
		//头部显示的星期数组
		weekText: {
			type: Array,
			default: function () {
				return ['日', '一', '二', '三', '四', '五', '六']
			},
			validator(value) {
				if (value.length != 7) {
					return false
				}
				return value.every(item => {
					return Dap.number.isNumber(item) || (typeof item == 'string' && item)
				})
			}
		},
		//开始日期
		startDate: {
			type: Date,
			default: function () {
				return dayjs('1970-01-01').toDate()
			}
		},
		//截止日期
		endDate: {
			type: Date,
			default: function () {
				return dayjs('2099-01-01').toDate()
			}
		},
		//非本月日期是否可以点击
		nonCurrentClick: {
			type: Boolean,
			default: false
		},
		//点击态
		active: {
			type: Boolean,
			default: true
		},
		//主题样式
		type: {
			type: String,
			default: 'info',
			validator(value) {
				return ['info', 'primary', 'error', 'warn', 'success'].includes(value)
			}
		}
	},
	computed: {
		//显示在年份面板上的年数组
		years() {
			let arr = []
			//获取指定的年份
			const year = this.modelValue.getFullYear()
			const startYear = this.startDate.getFullYear()
			//指定日期所在年份所在数组的序列,12个值为一个数组
			let index = Math.floor((year - startYear) / 12)
			for (let i = startYear + index * 12; i < startYear + index * 12 + 12; i++) {
				arr.push(dayjs(this.modelValue).year(i).toDate())
			}
			return arr
		},
		//显示在月份面板上的月数组
		months() {
			let arr = []
			for (let i = 0; i < 12; i++) {
				arr.push(dayjs(this.modelValue).month(i).toDate())
			}
			return arr
		},
		//显示在日期面板上的日期数组
		days() {
			//获取指定日期的总天数
			let total = dayjs(this.modelValue).daysInMonth()
			let arr = []
			for (let i = 1; i <= total; i++) {
				arr.push({
					date: dayjs(`${dayjs(this.modelValue).format('YYYY-MM')}-${i < 10 ? '0' + i : i}`).toDate(),
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
		},
		//指定年份值是否禁用
		yearDisabled() {
			return date => {
				return dayjs(date).isBefore(dayjs(this.startDate), 'year') || dayjs(date).isAfter(dayjs(this.endDate), 'year')
			}
		},
		//指定月份值是否禁用
		monthDisabled() {
			return date => {
				return dayjs(date).isBefore(dayjs(this.startDate), 'month') || dayjs(date).isAfter(dayjs(this.endDate), 'month')
			}
		},
		//指定日期值是否禁用
		dateDisabled() {
			return item => {
				return dayjs(item.date).isBefore(dayjs(this.startDate), 'date') || dayjs(item.date).isAfter(dayjs(this.endDate), 'date')
			}
		},
		//年视图下每个年数值的样式
		yearClass() {
			return date => {
				let arr = ['mvi-calendar-year-item', this.type]
				if (this.yearDisabled(date)) {
					return arr
				}
				if (this.active) {
					arr.push('active')
				}
				if (dayjs().isSame(dayjs(date), 'year')) {
					arr.push('now')
				}
				if (dayjs(this.modelValue).isSame(dayjs(date), 'year')) {
					arr.push('current')
				}
				return arr
			}
		},
		//月视图下每个月数值的样式
		monthClass() {
			return date => {
				let arr = ['mvi-calendar-month-item', this.type]
				if (this.monthDisabled(date)) {
					return arr
				}
				if (this.active) {
					arr.push('active')
				}
				if (dayjs().isSame(dayjs(date), 'month')) {
					arr.push('now')
				}
				if (dayjs(this.modelValue).isSame(dayjs(date), 'month')) {
					arr.push('current')
				}
				return arr
			}
		},
		//日期视图下每个日期数值的样式
		dateClass() {
			return item => {
				let arr = ['mvi-calendar-date-item', this.type]
				//在日期范围之外直接返回
				if (this.dateDisabled(item)) {
					return arr
				}
				//本月之外的日期
				if (item.nonCurrent) {
					//设置固定样式
					arr.push('none-current')
					//如果本月之外的日期允许点击
					if (this.nonCurrentClick) {
						//鼠标设为可点击样式
						arr.push('allowed')
						//如果显示点击态，设置点击态样式
						if (this.active) {
							arr.push('active')
						}
					}
				}
				//本月内的日期
				else {
					//如果显示点击态设置点击态样式
					if (this.active) {
						arr.push('active')
					}
					//如果是今天显示今天样式
					if (dayjs().isSame(dayjs(item.date), 'date')) {
						arr.push('now')
					}
					//如果是当前日期值，显示当前值样式
					if (dayjs(this.modelValue).isSame(dayjs(item.date), 'date')) {
						arr.push('current')
					}
				}

				return arr
			}
		}
	},
	methods: {
		//年份点击
		yearClick(date) {
			if (this.yearDisabled(date)) {
				return
			}
			this.$emit('update:modelValue', date)
			this.$emit('year-click', date)
		},
		//月份点击
		monthClick(date) {
			if (this.monthDisabled(date)) {
				return
			}
			this.$emit('update:modelValue', date)
			this.$emit('month-click', date)
		},
		//日期点击
		dateClick(item) {
			//超出日期范围
			if (this.dateDisabled(item)) {
				return
			}
			//不是本月并且不能点击本月之外的日期
			if (item.nonCurrent && !this.nonCurrentClick) {
				return
			}
			this.$emit('update:modelValue', item.date)
			this.$emit('date-click', item.date)
		}
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-calendar {
	display: block;
	width: 100%;
	padding: @mp-xs;
	background-color: #fff;
	border-radius: @radius-default;
	color: @font-color-default;

	.mvi-calendar-years {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;

		.mvi-calendar-year {
			width: 25%;
			display: block;
			text-align: center;
			padding: @mp-xs;
			user-select: none;

			.mvi-calendar-year-item {
				display: inline-block;
				position: relative;
				padding: @mp-xs @mp-sm;
				font-size: @font-size-default;
				border-radius: @radius-default / 2;
				cursor: pointer;

				&[disabled] {
					opacity: 0.6;
				}

				&.active:active::before {
					.mvi-active();
				}

				&.now {
					&.info {
						color: @info-normal;
					}
					&.success {
						color: @success-normal;
					}
					&.primary {
						color: @primary-normal;
					}
					&.warn {
						color: @warn-normal;
					}
					&.error {
						color: @error-normal;
					}
				}

				&.current {
					font-weight: bold;

					&.info {
						background-color: @light-info;
						color: @info-normal;
					}
					&.success {
						background-color: @light-success;
						color: @success-normal;
					}
					&.primary {
						background-color: @light-primary;
						color: #fff;
					}
					&.warn {
						background-color: @light-warn;
						color: @warn-normal;
					}
					&.error {
						background-color: @light-error;
						color: @error-normal;
					}
				}
			}
		}
	}

	.mvi-calendar-months {
		display: flex;
		width: 100%;
		justify-content: space-between;
		align-items: center;

		.mvi-calendar-month {
			width: 25%;
			display: block;
			text-align: center;
			padding: @mp-xs;
			user-select: none;

			.mvi-calendar-month-item {
				display: inline-block;
				position: relative;
				padding: @mp-xs @mp-sm;
				font-size: @font-size-default;
				border-radius: @radius-default / 2;
				cursor: pointer;

				&[disabled] {
					opacity: 0.6;
				}

				&.active:active::before {
					.mvi-active();
				}

				&.now {
					&.info {
						color: @info-normal;
					}
					&.success {
						color: @success-normal;
					}
					&.primary {
						color: @primary-normal;
					}
					&.warn {
						color: @warn-normal;
					}
					&.error {
						color: @error-normal;
					}
				}

				&.current {
					font-weight: bold;

					&.info {
						background-color: @light-info;
						color: @info-normal;
					}
					&.success {
						background-color: @light-success;
						color: @success-normal;
					}
					&.primary {
						background-color: @light-primary;
						color: #fff;
					}
					&.warn {
						background-color: @light-warn;
						color: @warn-normal;
					}
					&.error {
						background-color: @light-error;
						color: @error-normal;
					}
				}
			}
		}
	}

	.mvi-calendar-date {
		display: table;
		border-collapse: collapse;
		width: 100%;
		vertical-align: middle;

		.mvi-calendar-date-header {
			margin: 0;
			padding: 0;
			width: 100%;
			display: table-header-group;
			font-weight: bold;
			vertical-align: middle;

			.mvi-calendar-date-header-item {
				display: table-cell;
				padding: @mp-xs;
				text-align: center;
				line-height: 1.5;
				font-size: @font-size-default;
			}
		}

		.mvi-calendar-date-body {
			display: table-row-group;
			width: 100%;
			vertical-align: middle;
			padding: @mp-sm 0;

			.mvi-calendar-date-row {
				display: table-row;
				margin: 0;
				padding: 0;
				width: 100%;
				position: relative;
				vertical-align: middle;
				.mvi-calendar-date-column {
					display: table-cell;
					position: relative;
					text-align: center;
					line-height: 1.5;
					vertical-align: middle;
					user-select: none;

					.mvi-calendar-date-item {
						position: relative;
						display: inline-flex;
						justify-content: center;
						align-items: center;
						width: @medium-height;
						height: @medium-height;
						border-radius: @radius-circle;
						font-size: @font-size-default;
						cursor: pointer;

						&[disabled] {
							opacity: 0.6;
						}

						&.none-current {
							opacity: 0.6;
							cursor: auto;

							&.allowed {
								cursor: pointer;
							}
						}

						&.active:active::before {
							.mvi-active();
						}

						&.now {
							&.info {
								color: @info-normal;
							}
							&.success {
								color: @success-normal;
							}
							&.primary {
								color: @primary-normal;
							}
							&.warn {
								color: @warn-normal;
							}
							&.error {
								color: @error-normal;
							}
						}

						&.current {
							font-weight: bold;

							&.info {
								background-color: @light-info;
								color: @info-normal;
							}
							&.success {
								background-color: @light-success;
								color: @success-normal;
							}
							&.primary {
								background-color: @light-primary;
								color: #fff;
							}
							&.warn {
								background-color: @light-warn;
								color: @warn-normal;
							}
							&.error {
								background-color: @light-error;
								color: @error-normal;
							}
						}
					}
				}
			}
		}
	}
}
</style>
