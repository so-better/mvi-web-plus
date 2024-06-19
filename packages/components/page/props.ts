import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '@/components/icon'

export const PageProps = {
	//当前页
	modelValue: {
		type: Number,
		default: 1
	},
	//总页数
	total: {
		type: Number,
		default: 1
	},
	//显示的页码数
	overNumber: {
		type: Number,
		default: 3,
		validator(value: any) {
			return value % 2 != 0
		}
	},
	//上一页显示文字
	prevText: {
		type: String,
		default: null
	},
	//下一页显示文字
	nextText: {
		type: String,
		default: null
	},
	//上一页显示的图标
	prevIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: 'angle-left'
	},
	//下一页显示的图标
	nextIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: 'angle-right'
	},
	//简单模式
	simple: {
		type: Boolean,
		default: false
	},
	//首页显示的文字
	firstText: {
		type: String,
		default: null
	},
	//尾页显示的文字
	lastText: {
		type: String,
		default: null
	},
	//首页显示的图标
	firstIcon: {
		type: [Object, String] as PropType<string | IconPropsType>,
		default: 'angle-double-left'
	},
	//尾页显示的图标
	lastIcon: {
		type: [Object, String] as PropType<string | IconPropsType>,
		default: 'angle-double-right'
	},
	//自定义字体颜色及选中的背景色
	color: {
		type: String,
		default: null
	},
	//是否显示点击态
	active: {
		type: Boolean,
		default: true
	}
}

export type PagePropsType = ExtractPublicPropTypes<typeof PageProps>
