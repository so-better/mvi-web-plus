import dayjs from 'dayjs'
import { ExtractPublicPropTypes, PropType } from 'vue'
import { LayerPropsType } from '@/components/layer'
import { CalendarViewType } from '@/components/calendar'

export const DateChooserProps = {
	//当前日期
	modelValue: {
		type: Date,
		default: function () {
			return new Date()
		}
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//layer组件参数
	layerProps: {
		type: Object as PropType<LayerPropsType>,
		default: function () {
			return {}
		}
	},
	//点击其他地方是否关闭日历
	closable: {
		type: Boolean,
		default: true
	},
	//触发方法
	trigger: {
		type: String as PropType<'hover' | 'click' | 'custom'>,
		default: 'click',
		validator(value: any) {
			return ['hover', 'click', 'custom'].includes(value)
		}
	},
	//模式
	mode: {
		type: String as PropType<CalendarViewType>,
		default: 'date',
		validator(value: any) {
			return ['year', 'month', 'date'].includes(value)
		}
	},
	//月份面板显示的月份数组文字
	monthText: {
		type: Array as PropType<string[]>,
		default: function () {
			return ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
		}
	},
	//头部显示的星期数组
	weekText: {
		type: Array as PropType<string[]>,
		default: function () {
			return ['日', '一', '二', '三', '四', '五', '六']
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
	//日历面板点击态
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
	},
	//是否块级
	block: {
		type: Boolean,
		default: false
	},
	//头部年月显示格式化
	headerFormatter: {
		type: Function as PropType<(type: CalendarViewType, val: number) => string>,
		default: null
	}
}

export type DateChooserPropsType = ExtractPublicPropTypes<typeof DateChooserProps>
