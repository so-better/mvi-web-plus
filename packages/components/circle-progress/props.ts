import { ExtractPublicPropTypes } from 'vue'

export const CircleProgressProps = {
	//进度值
	value: {
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
	//直径
	size: {
		type: Number,
		default: 2
	},
	//进度颜色
	color: {
		type: String,
		default: null
	},
	//轨道颜色
	trackColor: {
		type: String,
		default: null
	},
	//填充色
	fill: {
		type: String,
		default: null
	},
	//是否显示动画效果
	animation: {
		type: Boolean,
		default: true
	},
	//动画效果的时长
	timeout: {
		type: Number,
		default: 400
	},
	//是否显示文字
	showTip: {
		type: Boolean,
		default: false
	},
	//中间显示的文本
	tipText: {
		type: String,
		default: null
	},
	//进度条厚度
	strokeWidth: {
		type: Number,
		default: 0.2
	},
	//进度条端点是否有圆角
	round: {
		type: Boolean,
		default: false
	},
	//是否顺时针增加
	clockWise: {
		type: Boolean,
		default: true
	}
}

export type CircleProgressPropsType = ExtractPublicPropTypes<typeof CircleProgressProps>
