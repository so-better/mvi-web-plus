import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '../icon/props'
import { BadgePropsType } from '../badge/props'

export type TabbarRouteType = {
	path?: string
	name?: string
	query?: object
	params?: object
	replace?: boolean
}

export const TabbarItemProps = {
	//路由参数配置
	route: {
		type: [String, Object] as PropType<string | TabbarRouteType>,
		default: null
	},
	//图标
	icon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//名称
	name: {
		type: String,
		default: null
	},
	//值
	value: {
		type: [Object, Number, String, Array],
		default: null
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//徽章角标
	badge: {
		type: Object as PropType<BadgePropsType>,
		default: null
	}
}

export type TabbarItemPropsType = ExtractPublicPropTypes<typeof TabbarItemProps>

export const TabbarProps = {
	//激活标签的value值
	modelValue: {
		type: [Object, Number, String, Array],
		default: null
	},
	//标签栏的标签配置
	tabs: {
		type: Array as PropType<TabbarItemPropsType[]>,
		default: function () {
			return []
		}
	},
	//是否固定底部
	fixed: {
		type: Boolean,
		default: false
	},
	//是否显示上边框
	border: {
		type: Boolean,
		default: false
	},
	//层级
	zIndex: {
		type: Number,
		default: 400
	},
	//激活颜色
	activeColor: {
		type: String,
		default: null
	},
	//未激活颜色
	inactiveColor: {
		type: String,
		default: null
	},
	//是否显示点击态
	active: {
		type: Boolean,
		default: true
	},
	//标签排列方式
	flex: {
		type: String,
		default: null
	},
	//设置每个标签左外边距
	offset: {
		type: String,
		default: null
	}
}

export type TabbarPropsType = ExtractPublicPropTypes<typeof TabbarProps>
