import { ExtractPublicPropTypes } from 'vue'

export const ColorPickerProps = {
	//颜色值
	modelValue: {
		type: String,
		default: '#ff0000'
	},
	//是否显示透明度滑动条
	showAlpha: {
		type: Boolean,
		default: true
	}
}

export type ColorPickerPropsType = ExtractPublicPropTypes<typeof ColorPickerProps>
