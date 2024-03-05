import Dap from 'dap-util'

export default {
	//输入框的值
	modelValue: {
		type: [String, Number],
		default: ''
	},
	//占位符
	placeholder: {
		type: String,
		default: ''
	},
	//输入框左侧文本
	label: {
		type: String,
		default: null
	},
	//左侧文本宽度
	labelWidth: {
		type: String,
		default: null
	},
	//左侧文本对齐方式
	labelAlign: {
		type: String,
		default: 'left',
		validator(value: any) {
			return ['left', 'center', 'right'].includes(value)
		}
	},
	//文本与输入框的间距
	labelOffset: {
		type: String,
		default: null
	},
	//输入框类型
	type: {
		type: String,
		default: 'text',
		validator(value: any) {
			return ['text', 'password', 'number', 'tel', 'textarea'].includes(value)
		}
	},
	//原生name属性
	name: {
		type: String,
		default: null
	},
	//最大字数限制
	maxlength: {
		type: Number,
		default: -1
	},
	//输入框尺寸
	size: {
		type: String,
		default: 'medium',
		validator(value: any) {
			return ['medium', 'large'].includes(value)
		}
	},
	//是否显示下边框
	border: {
		type: Boolean,
		default: false
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
	//是否显示表单必填星号
	required: {
		type: Boolean,
		default: false
	},
	//是否启用清除图标
	clearable: {
		type: Boolean,
		default: false
	},
	//是否自动聚焦
	autofocus: {
		type: Boolean,
		default: false
	},
	//是否显示字数统计，需要设置maxlength属性
	showWordLimit: {
		type: Boolean,
		default: false
	},
	//文本左侧图标
	left: {
		type: [String, Object],
		default: null
	},
	//右侧图标
	right: {
		type: [String, Object],
		default: null
	},
	//type=textarea时的行数
	rows: {
		type: Number,
		default: 1
	},
	//自动调整高度
	autosize: {
		type: [Boolean, Object],
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
	},
	//文本对齐方式
	align: {
		type: String,
		default: 'left',
		validator(value: any) {
			return ['left', 'center', 'right'].includes(value)
		}
	},
	//输入框调起移动端键盘类型
	inputMode: {
		type: [String, Boolean],
		default: false,
		validator(value: any) {
			return [false, 'none', 'text', 'decimal', 'numeric', 'tel', 'search', 'email', 'url'].includes(value)
		}
	}
}
