import { ExtractPublicPropTypes } from 'vue'

export const OverlayProps = {
	//挂载元素
	mountEl: {
		type: String,
		default: null
	},
	//遮罩层z-index
	zIndex: {
		type: Number,
		default: 800
	},
	//遮罩层颜色
	color: {
		type: String,
		default: null
	},
	//是否显示遮罩层
	modelValue: {
		type: Boolean,
		default: false
	},
	//是否渐变
	fade: {
		type: Boolean,
		default: true
	},
	//动画时间
	timeout: {
		type: Number,
		default: 200,
		validator(value: any) {
			return value >= 0
		}
	},
	//是否点击可关闭
	closable: {
		type: Boolean,
		default: false
	},
	//是否考虑PC滚动条（设置padding距离占位）
	usePadding: {
		type: Boolean,
		default: false
	}
}

export type OverlayPropsType = ExtractPublicPropTypes<typeof OverlayProps>
