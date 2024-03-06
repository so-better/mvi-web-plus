import { ExtractPublicPropTypes, PropType } from 'vue'

export const DateNativePickerProps = {
	//选择的类型
	type: {
		type: String as PropType<'date' | 'datetime' | 'month' | 'time'>,
		default: 'date',
		validator(value: any) {
			return ['date', 'datetime', 'month', 'time'].includes(value)
		}
	},
	//日期
	modelValue: {
		type: Date,
		default: null
	},
	//最大日期
	max: {
		type: Date,
		default: null
	},
	//最小日期
	min: {
		type: Date,
		default: null
	}
}

export type DateNativePickerPropsType = ExtractPublicPropTypes<typeof DateNativePickerProps>
