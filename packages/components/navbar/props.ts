import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '@/components/icon'

export const NavbarProps = {
	//标题
	title: {
		type: String,
		default: null
	},
	//左侧文本
	leftText: {
		type: String,
		default: null
	},
	//右侧文本
	rightText: {
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
	//是否固定顶部
	fixed: {
		type: Boolean,
		default: false
	},
	//是否显示下边框
	border: {
		type: Boolean,
		default: false
	},
	//层级
	zIndex: {
		type: Number,
		default: 400
	}
}

export type NavbarPropsType = ExtractPublicPropTypes<typeof NavbarProps>
