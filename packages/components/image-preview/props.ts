import { ExtractPublicPropTypes, PropType } from 'vue'
import { CarouselPropsType } from '@/components/carousel'
import { IconPropsType } from '@/components/icon'

export const ImagePreviewProps = {
	//是否显示
	modelValue: {
		type: Boolean,
		default: false
	},
	//图片数组
	images: {
		type: Array as PropType<string[]>,
		default: function () {
			return []
		}
	},
	//图片描述
	descriptions: {
		type: Array as PropType<string[]>,
		default: function () {
			return []
		}
	},
	//默认显示的图片序列
	active: {
		type: Number,
		default: 0
	},
	//挂载元素
	mountEl: {
		type: String,
		default: null
	},
	//z-index值
	zIndex: {
		type: Number,
		default: 5000
	},
	//轮播模式
	mode: {
		type: String as PropType<CarouselPropsType['mode']>,
		default: 'slide'
	},
	//是否显示控制器
	controls: {
		type: Boolean,
		default: false
	},
	//图片是否可以循环
	loop: {
		type: Boolean,
		default: false
	},
	//是否显示页码
	showPage: {
		type: Boolean,
		default: true
	},
	//局部显示是否考虑滚动条影响
	usePadding: {
		type: Boolean,
		default: false
	},
	//是否使用图片工具栏
	useTools: {
		type: Boolean,
		default: false
	},
	//图片加载失败提示设置
	errorIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: {
			size: '1rem',
			type: 'image-error'
		}
	},
	//图片加载中提示设置
	loadIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: function () {
			return {
				size: '1rem',
				type: 'image-alt'
			}
		}
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

export type ImagePreviewPropsType = ExtractPublicPropTypes<typeof ImagePreviewProps>
