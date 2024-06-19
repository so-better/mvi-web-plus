import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '@/components/icon'

export const CellProps = {
	//左侧图标
	icon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//标题
	title: {
		type: String,
		default: null
	},
	//内容
	content: {
		type: String,
		default: null
	},
	//描述文本
	label: {
		type: String,
		default: null
	},
	//是否显示下边框
	border: {
		type: Boolean,
		default: null
	},
	//右侧图标
	arrow: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//是否显示点击态
	active: {
		type: Boolean,
		default: null
	},
	//是否对描述文本内容进行行数限制
	ellipsis: {
		type: [Boolean, Number],
		default: null
	},
	//标题和内容超出一行是否省略
	noWrap: {
		type: Boolean,
		default: false
	}
}

export type CellPropsType = ExtractPublicPropTypes<typeof CellProps>
