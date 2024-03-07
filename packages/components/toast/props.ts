import { ComponentInternalInstance, ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '../icon/props'

export const ToastProps = {
	//弹窗类型，取值为success/error/loading/info
	type: {
		type: String as PropType<'success' | 'error' | 'loading' | 'info'>,
		default: null
	},
	//显示文本
	message: {
		type: String,
		default: null
	},
	//弹窗自动关闭的时间，默认不自动关闭
	timeout: {
		type: Number,
		default: null
	},
	//遮罩层背景色
	overlayColor: {
		type: String,
		default: null
	},
	//弹窗背景色
	background: {
		type: String,
		default: null
	},
	//弹窗字体颜色
	color: {
		type: String,
		default: null
	},
	//遮罩层z-index
	zIndex: {
		type: Number,
		default: null
	},
	//是否考虑滚动条
	usePadding: {
		type: Boolean,
		default: null
	},
	//自定义显示的图标
	icon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//挂载元素
	mountEl: {
		type: String,
		default: null
	},
	//是否显示阴影
	shadow: {
		type: Boolean,
		default: null
	},
	//弹窗移除方法
	__remove: {
		type: Function as PropType<() => void>,
		default: function () {
			return function () {}
		}
	},
	//弹窗初始化方法
	__init: {
		type: Function as PropType<(vm: ComponentInternalInstance) => void>,
		default: function () {
			return function () {}
		}
	}
}

export type ToastPropsType = ExtractPublicPropTypes<typeof ToastProps>
