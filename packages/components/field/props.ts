import Dap from 'dap-util'
import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '@/components/icon'

export type FieldAutosizeType = {
	maxRows?: number
	minRows?: number
}

export const FieldProps = {
	//输入框的值
	modelValue: {
		type: [String, Number],
		default: ''
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//是否只读
	readonly: {
		type: Boolean,
		default: false
	},
	//输入框的占位符
	placeholder: {
		type: String,
		default: ''
	},
	//输入框类型
	type: {
		type: String as PropType<'text' | 'password' | 'number' | 'tel' | 'textarea'>,
		default: 'text',
		validator(value: any) {
			return ['text', 'password', 'number', 'tel', 'textarea'].includes(value)
		}
	},
	//输入框大小
	size: {
		type: String as PropType<'small' | 'medium' | 'large'>,
		default: 'medium',
		validator(value: any) {
			return ['small', 'medium', 'large'].includes(value)
		}
	},
	//输入框最大字符长度
	maxlength: {
		type: Number,
		default: -1
	},
	//输入框是否圆角
	round: {
		type: Boolean,
		default: false
	},
	//输入框是否方形
	square: {
		type: Boolean,
		default: false
	},
	//前缀
	prefix: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//后缀
	suffix: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//前置
	prepend: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//后置
	append: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//点击样式
	activeType: {
		type: String as PropType<'info' | 'success' | 'warn' | 'primary' | 'error'>,
		default: 'info',
		validator(value: any) {
			return ['info', 'success', 'warn', 'primary', 'error'].includes(value)
		}
	},
	//点击颜色
	activeColor: {
		type: String,
		default: null,
		validator(value: any) {
			return Dap.common.matchingText(value, 'hex')
		}
	},
	//是否使用清除图标
	clearable: {
		type: Boolean,
		default: false
	},
	//输入框内容对齐方式
	align: {
		type: String as PropType<'left' | 'center' | 'right'>,
		default: 'left',
		validator(value: any) {
			return ['left', 'center', 'right'].includes(value)
		}
	},
	//原生name
	name: {
		type: String,
		default: null
	},
	//是否自动获取焦点
	autofocus: {
		type: Boolean,
		default: false
	},
	//输入框调起移动端键盘类型
	inputMode: {
		type: String as PropType<'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'>,
		default: 'text',
		validator(value: any) {
			return ['none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'].includes(value)
		}
	},
	//文本域行数
	rows: {
		type: Number,
		default: 1
	},
	//文本域高度自适应
	autosize: {
		type: [Boolean, Object] as PropType<boolean | FieldAutosizeType>,
		default: false,
		validator(value: any) {
			if (Dap.common.isObject(value)) {
				if (Dap.number.isNumber(value.minRows) && Dap.number.isNumber(value.maxRows)) {
					if (value.minRows > value.maxRows) {
						return false
					}
				}
			}
			return true
		}
	}
}

export type FieldPropsType = ExtractPublicPropTypes<typeof FieldProps>
