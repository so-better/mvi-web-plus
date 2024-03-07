import dayjs from 'dayjs'
import { ExtractPublicPropTypes, PropType } from 'vue'

//视图类型
export type DatePickerModeType = 'date' | 'datetime' | 'time' | 'month' | 'year'

//列类型
export type DatePickerTimeType = 'year' | 'month' | 'date' | 'hour' | 'minute'

export const DatePickerProps = {
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
		type: String as PropType<DatePickerModeType>,
		default: 'date',
		validator(value: any) {
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
		type: Function as PropType<(type: DatePickerTimeType, val: number) => string>,
		default: null
	}
}

export type DatePickerPropsType = ExtractPublicPropTypes<typeof DatePickerProps>
