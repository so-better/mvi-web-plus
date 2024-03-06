import { ExtractPublicPropTypes, PropType } from 'vue'

export const PopupProps = {
	//显示与否
	modelValue: {
		type: Boolean,
		default: false
	},
	//点击背景遮罩是否关闭
	closable: {
		type: Boolean,
		default: false
	},
	//遮罩层颜色
	overlayColor: {
		type: String,
		default: null
	},
	//遮罩层z-index
	zIndex: {
		type: Number,
		default: 900
	},
	//动画时长
	timeout: {
		type: Number,
		default: 200
	},
	//弹窗的位置
	placement: {
		type: String as PropType<'left' | 'top' | 'bottom' | 'right'>,
		default: 'bottom',
		validator(value: any) {
			return ['left', 'top', 'bottom', 'right'].includes(value)
		}
	},
	//弹窗是否显示圆角
	round: {
		type: Boolean,
		default: false
	},
	//弹窗显示的宽度或者高度
	width: {
		type: String,
		default: null
	},
	//是否显示关闭图标
	showTimes: {
		type: Boolean,
		default: false
	},
	//关闭图标位置
	timesPlacement: {
		type: String as PropType<'top-right' | 'top-left' | 'bottom-right' | 'bottom-left'>,
		default: 'top-right',
		validator(value: any) {
			return ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value)
		}
	},
	//挂载元素
	mountEl: {
		type: String,
		default: null
	},
	//是否考虑滚动条影响
	usePadding: {
		type: Boolean,
		default: false
	},
	//是否设置内容的padding
	__contentPadding: {
		type: Boolean,
		default: true
	}
}

export type PopupPropsType = ExtractPublicPropTypes<typeof PopupProps>
