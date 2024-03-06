import { ComponentInternalInstance, ExtractPublicPropTypes, PropType } from 'vue'

export const LoadingBarProps = {
	//进度条颜色
	color: {
		type: String,
		default: null
	},
	//进度条层级
	zIndex: {
		type: Number,
		default: null
	},
	//进度条移除方法
	__remove: {
		type: Function as PropType<() => void>,
		default: function () {
			return function () {}
		}
	},
	//进度条初始化方法
	__init: {
		type: Function as PropType<(vm: ComponentInternalInstance) => void>,
		default: function () {
			return function () {}
		}
	}
}

export type LoadingBarPropsType = ExtractPublicPropTypes<typeof LoadingBarProps>
