import { ExtractPublicPropTypes } from 'vue'

export const DividerProps = {
	//是否使用虚线
	dashed: {
		type: Boolean,
		default: false
	},
	//线颜色
	color: {
		type: String,
		default: null
	}
}

export type DividerPropsType = ExtractPublicPropTypes<typeof DividerProps>
