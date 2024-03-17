import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '../icon/props'

export const SearchProps = {
	//输入框的值
	modelValue: {
		type: [String, Number],
		default: ''
	},
	//输入框类型
	type: {
		type: String,
		default: 'text'
	},
	//输入框占位符
	placeholder: {
		type: String,
		default: ''
	},
	//搜索框左侧文本
	label: {
		type: String,
		default: null
	},
	//搜索框是否圆形
	round: {
		type: Boolean,
		default: false
	},
	//输入的最大长度
	maxlength: {
		type: Number,
		default: -1
	},
	//是否自动聚焦
	autofocus: {
		type: Boolean,
		default: false
	},
	//是否在输入框右侧显示取消按钮
	showCancel: {
		type: Boolean,
		default: false
	},
	//取消按钮文字
	cancelText: {
		type: String,
		default: '取消'
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
	//输入框内容对齐方式
	align: {
		type: String as PropType<'left' | 'center' | 'right'>,
		default: 'left',
		validator(value: any) {
			return ['left', 'center', 'right'].includes(value)
		}
	},
	//左侧图标
	leftIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//右侧图标
	rightIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//使用清除图标
	clearable: {
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
	}
}

export type SearchPropsType = ExtractPublicPropTypes<typeof SearchProps>
