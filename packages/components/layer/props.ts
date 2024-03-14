import { ExtractPublicPropTypes, PropType } from 'vue'

export const LayerProps = {
	//是否显示悬浮层
	modelValue: {
		type: Boolean,
		default: false
	},
	//悬浮层关联元素
	relate: {
		type: String,
		default: null
	},
	//悬浮层相对于关联元素的位置
	placement: {
		type: String as PropType<'top' | 'left' | 'right' | 'bottom' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end'>,
		default: 'bottom',
		validator(value: any) {
			return ['top', 'left', 'right', 'bottom', 'top-start', 'top-end', 'left-start', 'left-end', 'right-start', 'right-end', 'bottom-start', 'bottom-end'].includes(value)
		}
	},
	//悬浮层主体距离关联元素的距离
	offset: {
		type: String,
		default: '0.2rem'
	},
	//悬浮层的z-index
	zIndex: {
		type: Number,
		default: null
	},
	//悬浮层的宽度
	width: {
		type: String,
		default: null
	},
	//悬浮层显示与隐藏动画时长
	timeout: {
		type: Number,
		default: 200
	},
	//点击关联元素和悬浮层以外的元素是否关闭悬浮层
	closable: {
		type: Boolean,
		default: false
	},
	//是否显示三角
	showTriangle: {
		type: Boolean,
		default: false
	},
	//自定义动画
	animation: {
		type: String,
		default: null
	},
	//是否显示阴影
	shadow: {
		type: Boolean,
		default: true
	},
	//是否显示边框
	border: {
		type: Boolean,
		default: false
	},
	//边框颜色
	borderColor: {
		type: String,
		default: '#eee'
	},
	//背景色
	background: {
		type: String,
		default: '#fff'
	}
}

export type LayerPropsType = ExtractPublicPropTypes<typeof LayerProps>
