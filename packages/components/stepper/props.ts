import { ExtractPublicPropTypes, PropType } from 'vue'

export const StepperProps = {
	//输入框的值
	modelValue: {
		type: Number,
		default: 0
	},
	//步进
	step: {
		type: Number,
		default: 1
	},
	//尺寸
	size: {
		type: String as PropType<'small' | 'medium' | 'large'>,
		default: 'medium',
		validator(value: any) {
			return ['small', 'medium', 'large'].includes(value)
		}
	},
	//最小值
	min: {
		type: Number,
		default: null
	},
	//最大值
	max: {
		type: Number,
		default: null
	},
	//显示小数位数
	digit: {
		type: Number,
		default: 0
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//是否禁用加号
	disabledPlus: {
		type: Boolean,
		default: false
	},
	//是否禁用减号
	disabledMinus: {
		type: Boolean,
		default: false
	},
	//是否禁用输入框
	disabledInput: {
		type: Boolean,
		default: false
	},
	//是否显示加号
	showPlus: {
		type: Boolean,
		default: true
	},
	//是否显示减号
	showMinus: {
		type: Boolean,
		default: true
	},
	//是否显示输入框
	showInput: {
		type: Boolean,
		default: true
	},
	//输入框宽度
	inputWidth: {
		type: String,
		default: null
	},
	//是否显示点击态
	active: {
		type: Boolean,
		default: true
	},
	//输入框数字对齐方式
	inputAlign: {
		type: String as PropType<'left' | 'center' | 'right'>,
		default: 'center',
		validator(value: any) {
			return ['left', 'center', 'right'].includes(value)
		}
	},
	//是否显示边框
	border: {
		type: Boolean,
		default: false
	}
}

export type StepperPropsType = ExtractPublicPropTypes<typeof StepperProps>
