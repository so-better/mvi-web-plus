import { ComponentInternalInstance, ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '@/components/icon'

export const NotifyProps = {
	//提示类型
	type: {
		type: String as PropType<'success' | 'info' | 'primary' | 'error' | 'warn'>,
		default: null
	},
	//展示文字
	message: {
		type: String,
		default: null
	},
	//字体颜色
	color: {
		type: String,
		default: null
	},
	//背景色
	background: {
		type: String,
		default: null
	},
	//层级
	zIndex: {
		type: Number,
		default: null
	},
	//自动关闭间隔
	timeout: {
		type: Number,
		default: null
	},
	//图标
	icon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//移除方法
	__remove: {
		type: Function as PropType<() => void>,
		default: function () {
			return function () {}
		}
	},
	//初始化方法
	__init: {
		type: Function as PropType<(vm: ComponentInternalInstance) => void>,
		default: function () {
			return function () {}
		}
	}
}

export type NotifyPropsType = ExtractPublicPropTypes<typeof NotifyProps>
