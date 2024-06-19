import { ExtractPublicPropTypes, PropType } from 'vue'
import { LayerPropsType } from '@/components/layer'

export const TooltipProps = {
	//提示内容
	title: {
		type: String,
		default: ''
	},
	//显示位置
	placement: {
		type: String as PropType<LayerPropsType['placement']>,
		default: 'bottom'
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//动画时间
	timeout: {
		type: Number,
		default: 200
	},
	//边框颜色
	borderColor: {
		type: String,
		default: '#333'
	},
	//背景色
	color: {
		type: String,
		default: '#333'
	},
	//字体颜色
	textColor: {
		type: String,
		default: '#fff'
	},
	//触发方式
	trigger: {
		type: String as PropType<'hover' | 'click' | 'custom'>,
		default: 'click',
		validator(value: any) {
			return ['hover', 'click', 'custom'].includes(value)
		}
	},
	//提示内容距离触发元素的距离
	offset: {
		type: String,
		default: '0.1rem'
	},
	//层级
	zIndex: {
		type: Number,
		default: 20
	},
	//宽度
	width: {
		type: String,
		default: null
	},
	//显示动画
	animation: {
		type: String,
		default: null
	},
	//是否显示三角图标
	showTriangle: {
		type: Boolean,
		default: true
	},
	//是否以块级展示
	block: {
		type: Boolean,
		default: false
	}
}

export type TooltipPropsType = ExtractPublicPropTypes<typeof TooltipProps>
