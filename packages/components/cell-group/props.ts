import { ExtractPublicPropTypes } from 'vue'

export const CellGroupProps = {
	//单元格组标题
	title: {
		type: String,
		default: null
	},
	//下边框
	border: {
		type: Boolean,
		default: true
	},
	//是否显示点击态
	active: {
		type: Boolean,
		default: true
	}
}

export type CellGroupPropsType = ExtractPublicPropTypes<typeof CellGroupProps>
