import { ExtractPublicPropTypes } from 'vue'

export const FormProps = {
	//竖排显示时整个表单宽度
	width: {
		type: String,
		default: null
	},
	//是否竖排显示
	block: {
		type: Boolean,
		default: false
	},
	//同form-el的align
	align: {
		type: String,
		default: 'center'
	},
	//竖排显示时标签是否独立一行
	labelBlock: {
		type: Boolean,
		default: false
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

export type FormPropsType = ExtractPublicPropTypes<typeof FormProps>
