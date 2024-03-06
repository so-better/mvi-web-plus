import { ExtractPublicPropTypes } from 'vue'

export const ProgressProps = {
	//当前进度值
	value: {
		type: Number,
		default: 0
	},
	//最大值
	max: {
		type: Number,
		default: 100
	},
	//最小值
	min: {
		type: Number,
		default: 0
	},
	//进度条粗细
	strokeWidth: {
		type: String,
		default: null
	},
	//是否显示进度文字
	showTip: {
		type: Boolean,
		default: false
	},
	//进度条颜色
	color: {
		type: String,
		default: null
	},
	//进度文字颜色
	tipColor: {
		type: String,
		default: null
	},
	//轨道颜色
	trackColor: {
		type: String,
		default: null
	},
	//进度显示的文字，默认为百分比
	tipText: {
		type: String,
		default: null
	},
	//显示圆角
	round: {
		type: Boolean,
		default: false
	},
	//无角度
	square: {
		type: Boolean,
		default: false
	},
	//是否开启动画效果
	animation: {
		type: Boolean,
		default: false
	},
	//动画效果时长
	timeout: {
		type: Number,
		default: 400
	}
}

export type ProgressPropsType = ExtractPublicPropTypes<typeof ProgressProps>
