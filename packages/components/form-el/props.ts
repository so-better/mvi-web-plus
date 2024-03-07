import { ExtractPublicPropTypes } from 'vue'

export const FormElProps = {
	//垂直对齐方式
	align: {
		type: String,
		default: null
	},
	//宽度
	width: {
		type: String,
		default: null
	},
	//标签内容
	label: {
		type: String,
		default: ''
	},
	//标签宽度
	labelWidth: {
		type: String,
		default: null
	},
	//标签距离右侧距离
	labelOffset: {
		type: String,
		default: null
	}
}

export type FormElPropsType = ExtractPublicPropTypes<typeof FormElProps>
