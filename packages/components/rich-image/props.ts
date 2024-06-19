import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '@/components/icon'

//双指触摸类型
export type RichImageDoubleTouchType = {
	//是否双指
	is: boolean
	//双指间距
	spacing?: number
}

//鼠标在图片上按下的坐标类型
export type RichImagePointType = {
	//横坐标
	x: number
	//纵坐标
	y: number
}

//图片被容器遮挡的部分数据类型
export type RichImageCoverType = {
	left: number
	right: number
	top: number
	bottom: number
}

export const RichImageProps = {
	//图片地址
	src: {
		type: String,
		default: ''
	},
	//加载图标
	loadIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//失败图标
	errorIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//最大缩放值
	maxScale: {
		type: Number,
		default: 3
	},
	//最小缩放值
	minScale: {
		type: Number,
		default: 0.3
	}
}

export type RichImagePropsType = ExtractPublicPropTypes<typeof RichImageProps>
