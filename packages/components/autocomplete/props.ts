import Dap from 'dap-util'
import { ExtractPublicPropTypes, PropType } from 'vue'
import { LayerPropsType } from '../layer/props'
import { IconPropsType } from '../icon/props'

export const AutocompleteProps = {
	//输入框的值
	modelValue: {
		type: String,
		default: ''
	},
	//占位符
	placeholder: {
		type: String,
		default: ''
	},
	//组件大小
	size: {
		type: String as PropType<'small' | 'medium' | 'large'>,
		default: 'medium',
		validator(value: any) {
			return ['small', 'medium', 'large'].includes(value)
		}
	},
	//可选值数组
	list: {
		type: Array as PropType<string[]>,
		default: function () {
			return []
		}
	},
	//激活样式
	activeType: {
		type: String as PropType<'info' | 'success' | 'warn' | 'error' | 'primary'>,
		default: 'info',
		validator(value: any) {
			return ['info', 'success', 'warn', 'error', 'primary'].includes(value)
		}
	},
	//激活颜色
	activeColor: {
		type: String,
		default: null,
		validator(value: any) {
			return Dap.common.matchingText(value, 'hex')
		}
	},
	//过滤方法
	filterMethod: {
		type: [Function, Boolean] as PropType<((value: string, list: string[]) => string[]) | boolean>,
		default: false
	},
	//是否启用清除图标
	clearable: {
		type: Boolean,
		default: false
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//layer组件参数
	layerProps: {
		type: Object as PropType<LayerPropsType>,
		default: function () {
			return {}
		}
	},
	//提示框最大高度
	height: {
		type: String,
		default: null
	},
	//原生name
	name: {
		type: String,
		default: null
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
	//是否圆角
	round: {
		type: Boolean,
		default: false
	},
	//是否方形
	square: {
		type: Boolean,
		default: false
	},
	//对齐方式
	align: {
		type: String as PropType<'left' | 'right' | 'center'>,
		default: 'left',
		validator(value: any) {
			return ['left', 'right', 'center'].includes(value)
		}
	}
}

export type AutocompletePropsType = ExtractPublicPropTypes<typeof AutocompleteProps>
