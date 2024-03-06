import { ExtractPublicPropTypes, PropType } from 'vue'

export const CheckboxProps = {
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//是否选中
	modelValue: {
		type: [Boolean, Array],
		default: false
	},
	//label文字
	label: {
		type: String,
		default: null
	},
	//值
	value: {
		type: [Object, Number, String, Array],
		default: ''
	},
	//是否圆形
	round: {
		type: Boolean,
		default: false
	},
	//原生name属性
	name: {
		type: String,
		default: null
	},
	//文字位置
	placement: {
		type: String as PropType<'left' | 'right'>,
		default: 'right',
		validator(value: any) {
			return ['left', 'right'].includes(value)
		}
	},
	//大小
	size: {
		type: String,
		default: null
	},
	//主题颜色
	color: {
		type: String,
		default: null
	}
}

export type CheckboxPropsType = ExtractPublicPropTypes<typeof CheckboxProps>
