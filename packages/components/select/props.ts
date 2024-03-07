import { ExtractPublicPropTypes, PropType } from 'vue'
import Dap from 'dap-util'
import { IconPropsType } from '../icon/props'
import { LayerPropsType } from '../layer/props'

export type SelectOptionsItemType = {
	label?: string
	value?: any
	disabled?: boolean
}

export type SelectOptionsItemPropsType = {
	label: string
	value: string
}

export const SelectProps = {
	//选择的值
	modelValue: {
		type: [Object, Number, String, Array] as PropType<any>,
		default: null
	},
	//选项
	options: {
		type: Array as PropType<any[]>,
		default: []
	},
	//占位符
	placeholder: {
		type: String,
		default: ''
	},
	//尺寸
	size: {
		type: String as PropType<'small' | 'medium' | 'large'>,
		default: 'medium',
		validator(value: any) {
			return ['small', 'medium', 'large'].includes(value)
		}
	},
	//layer组件参数
	layerProps: {
		type: Object as PropType<LayerPropsType>,
		default: function () {
			return {}
		}
	},
	//下拉框最大高度
	height: {
		type: String,
		default: null
	},
	//输入框激活样式
	activeType: {
		type: String as PropType<'info' | 'success' | 'warn' | 'primary' | 'error'>,
		default: 'info',
		validator(value: any) {
			return ['info', 'success', 'warn', 'primary', 'error'].includes(value)
		}
	},
	//输入框激活颜色
	activeColor: {
		type: String,
		default: null,
		validator(value: any) {
			return Dap.common.matchingText(value, 'hex')
		}
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//下拉图标
	icon: {
		type: String,
		default: 'caret-down'
	},
	//原生name属性
	name: {
		type: String,
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
	//是否多选
	multiple: {
		type: Boolean,
		default: false
	},
	//选择时显示内容的过滤方法
	filterMethod: {
		type: Function as PropType<(label: string[] | string) => string>,
		default: null
	},
	//是否展示已选择标识
	showSelected: {
		type: Boolean,
		default: true
	},
	//已选择标识的icon
	selectedIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: 'success'
	},
	//显示清除图标
	clearable: {
		type: Boolean,
		default: false
	},
	//选项字段配置
	props: {
		type: Object as PropType<SelectOptionsItemPropsType>,
		default: function () {
			return {
				label: 'label',
				value: 'value'
			}
		}
	},
	//无选项提示文字
	emptyText: {
		type: String,
		default: '暂无数据'
	}
}

export type SelectPropsType = ExtractPublicPropTypes<typeof SelectProps>
