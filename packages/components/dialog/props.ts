import { ExtractPublicPropTypes, PropType } from 'vue'
import { ButtonPropsType } from '../button/props'

export type DialogInputType = {
	placeholder?: string
	type?: string
	value?: string
	autofocus?: boolean
	maxlength?: number
	clearable?: boolean
	align?: 'left' | 'center' | 'right'
	mode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'
}

export type DialogPcBtnsType = {
	ok: ButtonPropsType
	cancel: ButtonPropsType
}

export const DialogProps = {
	//弹窗类型
	type: {
		type: String as PropType<'alert' | 'confirm' | 'prompt'>,
		default: null
	},
	//标题
	title: {
		type: String,
		default: null
	},
	//描述
	message: {
		default: ''
	},
	//宽度
	width: {
		type: String,
		default: null
	},
	//遮罩z-index
	zIndex: {
		type: Number,
		default: null
	},
	//动画
	animation: {
		type: String,
		default: null
	},
	//圆角
	radius: {
		type: String,
		default: null
	},
	//遮罩层颜色
	overlayColor: {
		type: String,
		default: null
	},
	//是否点击遮罩可关闭
	closable: {
		type: Boolean,
		default: null
	},
	//输入框配置
	input: {
		type: Object as PropType<DialogInputType>,
		default: null
	},
	//滚动条考虑
	usePadding: {
		type: Boolean,
		default: null
	},
	//按钮文本
	btnText: {
		type: [String, Array],
		default: null
	},
	//按钮颜色
	btnColor: {
		type: [String, Array],
		default: null
	},
	//是否ios风格
	ios: {
		type: Boolean,
		default: null
	},
	//挂载元素
	mountEl: {
		type: String,
		default: null
	},
	//动画时长
	timeout: {
		type: Number,
		default: null
	},
	//弹窗移除方法
	__remove: {
		type: Function,
		default: function () {
			return function () {}
		}
	}
}

export const DialogPcProps = {
	//弹窗类型
	type: {
		type: String as PropType<'Alert' | 'Confirm' | 'Prompt'>,
		default: null
	},
	//标题
	title: {
		type: String,
		default: null
	},
	//描述
	message: {
		default: ''
	},
	//宽度
	width: {
		type: String,
		default: null
	},
	//遮罩层z-index
	zIndex: {
		type: Number,
		default: null
	},
	//动画
	animation: {
		type: String,
		default: null
	},
	//圆角
	radius: {
		type: String,
		default: null
	},
	//遮罩层颜色
	overlayColor: {
		type: String,
		default: null
	},
	//是否点击遮罩可关闭
	closable: {
		type: Boolean,
		default: null
	},
	//输入框配置
	input: {
		type: Object as PropType<DialogInputType>,
		default: null
	},
	//是否居中
	center: {
		type: Boolean,
		default: false
	},
	//滚动条考虑
	usePadding: {
		type: Boolean,
		default: null
	},
	//按钮配置
	btns: {
		type: Object as PropType<DialogPcBtnsType>,
		default: null
	},
	//关闭按钮是否显示
	showTimes: {
		type: Boolean,
		default: null
	},
	//挂载元素
	mountEl: {
		type: String,
		default: null
	},
	//动画时长
	timeout: {
		type: Number,
		default: null
	},
	//弹窗移除方法
	__remove: {
		type: Function,
		default: function () {
			return function () {}
		}
	}
}

export type DialogPropsType = ExtractPublicPropTypes<typeof DialogProps>

export type DialogPcPropsType = ExtractPublicPropTypes<typeof DialogPcProps>
