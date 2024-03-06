import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '../icon/props'
import { PopupPropsType } from '../popup/props'

export type DropdownOptionsItemType = {
	label?: string
	value?: string
	disabled?: boolean
	icon?: string | IconPropsType
}

export const DropdownProps = {
	//默认选中的选项
	modelValue: {
		type: [Object, Number, String, Array],
		default: null
	},
	//菜单列表选中的颜色
	activeColor: {
		type: String,
		default: null
	},
	//列表参数,含label,value,disabled,icon
	options: {
		type: Array as PropType<DropdownOptionsItemType[]>,
		default: function () {
			return []
		}
	},
	//选择完毕后是否关闭
	selectedClose: {
		type: Boolean,
		default: true
	},
	//自定义右侧选中的图标
	selectedIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: 'success'
	},
	//是否显示
	show: {
		type: Boolean,
		default: false
	},
	//遮罩层颜色
	overlayColor: {
		type: String,
		default: null
	},
	//层级
	zIndex: {
		type: Number,
		default: 900
	},
	//动画时间
	timeout: {
		type: Number,
		default: 200
	},
	//是否圆角
	round: {
		type: Boolean,
		default: false
	},
	//位置
	placement: {
		type: String as PropType<PopupPropsType['placement']>,
		default: 'top'
	},
	//点击遮罩是否可关闭
	closable: {
		type: Boolean,
		default: true
	},
	//挂载元素
	mountEl: {
		type: String,
		default: null
	},
	//是否显示点击态
	active: {
		type: Boolean,
		default: true
	},
	//局部显示时是否考虑滚动条影响
	usePadding: {
		type: Boolean,
		default: false
	}
}

export type DropdownPropsType = ExtractPublicPropTypes<typeof DropdownProps>
