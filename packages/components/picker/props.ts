import { ExtractPublicPropTypes, PropType } from 'vue'

export type PickerOptionsItemType = {
	values: string[]
	defaultIndex: number
}

export type PickerActiveType = {
	value: string
	index: number
}

export type PickerCrisisType = {
	max: number
	min: number
}

export const PickerProps = {
	//选择器配置
	options: {
		type: [Array, Object] as PropType<PickerOptionsItemType[] | PickerOptionsItemType>,
		default: function () {
			return {
				values: [],
				defaultIndex: 0
			}
		}
	},
	//是否显示标题栏
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
	}
}

export type PickerPropsType = ExtractPublicPropTypes<typeof PickerProps>
