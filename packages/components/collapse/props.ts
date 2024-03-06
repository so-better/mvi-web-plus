import { ExtractPublicPropTypes } from 'vue'

export const CollapseProps = {
	//默认展开的面板索引
	modelValue: {
		type: [Number, Array],
		default: null
	},
	//是否手风琴模式
	accordion: {
		type: Boolean,
		default: false
	},
	//是否显示每个面板的内下边框
	inBorder: {
		type: Boolean,
		default: true
	},
	//是否展示每个面板的外下边框
	outBorder: {
		type: Boolean,
		default: true
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//点击标题栏是否显示点击态
	active: {
		type: Boolean,
		default: true
	},
	//是否对标题栏的标题和内容使用单行限制
	noWrap: {
		type: Boolean,
		default: false
	}
}

export type CollapsePropsType = ExtractPublicPropTypes<typeof CollapseProps>
