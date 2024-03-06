import { ExtractPublicPropTypes } from 'vue'

export const SliderProps = {
	//当前值
	modelValue: {
		type: Number,
		default: 0
	},
	//最小值
	min: {
		type: Number,
		default: 0
	},
	//最大值
	max: {
		type: Number,
		default: 100
	},
	//进度粗细
	strokeWidth: {
		type: String,
		default: '0.2rem'
	},
	//激活的进度颜色
	color: {
		type: String,
		default: null
	},
	//滑轨颜色
	trackColor: {
		type: String,
		default: null
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//是否垂直
	vertical: {
		type: Boolean,
		default: false
	},
	//滑动条是否显示圆形的圆角弧度
	round: {
		type: Boolean,
		default: false
	},
	//滑动条是否不显示圆角弧度
	square: {
		type: Boolean,
		default: false
	}
}

export type SliderPropsType = ExtractPublicPropTypes<typeof SliderProps>
