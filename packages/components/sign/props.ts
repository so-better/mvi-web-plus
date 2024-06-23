import { ExtractPublicPropTypes } from 'vue'

export const SignProps = {
	//签名颜色
	color: {
		type: String,
		default: null // '#505050'
	},
	//背景色
	background: {
		type: String,
		default: null // '#fff'
	},
	//字体粗细 px值
	width: {
		type: Number,
		default: 0.05
	}
}

export type SignPropsType = ExtractPublicPropTypes<typeof SignProps>
