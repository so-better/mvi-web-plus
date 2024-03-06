import Dap from 'dap-util'
import dayjs from 'dayjs'
import { ExtractPublicPropTypes, PropType } from 'vue'

export type CalendarDayType = {
	date?: Date
	nonCurrent?: boolean
}

export const CalendarProps = {
	//指定显示的日期
	modelValue: {
		type: Date,
		default: function () {
			return new Date()
		}
	},
	//视图类型
	view: {
		type: String as PropType<'year' | 'month' | 'date'>,
		default: 'date',
		validator(value: any) {
			return ['year', 'month', 'date'].includes(value)
		}
	},
	//月份面板显示的月份数组文字
	monthText: {
		type: Array,
		default: function () {
			return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
		},
		validator(value: any) {
			if (value.length != 12) {
				return false
			}
			return value.every((item: any) => {
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
		validator(value: any) {
			if (value.length != 7) {
				return false
			}
			return value.every((item: any) => {
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
		type: String as PropType<'info' | 'primary' | 'error' | 'warn' | 'success'>,
		default: 'info',
		validator(value: any) {
			return ['info', 'primary', 'error', 'warn', 'success'].includes(value)
		}
	}
}

export type CalendarPropsType = ExtractPublicPropTypes<typeof CalendarProps>
