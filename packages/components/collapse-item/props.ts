import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '../icon/props'

export const CollapseItemProps = {
	//标题栏左侧图标
	icon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//标题
	title: {
		type: String,
		default: null
	},
	//标题栏内容
	label: {
		type: String,
		default: null
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//展开的内容
	content: {
		type: String,
		default: ''
	}
}

export type CollapseItemPropsType = ExtractPublicPropTypes<typeof CollapseItemProps>
