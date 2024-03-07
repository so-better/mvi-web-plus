import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '../icon/props'

export type ImageFillType = 'fill' | 'cover' | 'contain' | 'response' | 'none'

export const ImageProps = {
	//图片链接
	src: {
		type: String,
		default: ''
	},
	//填充类型
	fit: {
		type: String as PropType<ImageFillType>,
		default: 'fill',
		validator(value: any) {
			return ['fill', 'cover', 'contain', 'response', 'none'].includes(value)
		}
	},
	//原生alt属性
	alt: {
		type: String,
		default: ''
	},
	//是否显示图片加载失败提示
	showError: {
		type: Boolean,
		default: true
	},
	//是否显示图片加载中提示
	showLoading: {
		type: Boolean,
		default: true
	},
	//是否启用延迟加载
	lazyLoad: {
		type: Boolean,
		default: false
	},
	//延时加载时指定的滚动容器选择器
	root: {
		type: String,
		default: null
	},
	//加载图标
	loadIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: 'image-alt'
	},
	//失败图标
	errorIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: 'image-error'
	},
	//是否圆形图片
	round: {
		type: Boolean,
		default: false
	},
	//图片宽度
	width: {
		type: String,
		default: null
	},
	//图片高度
	height: {
		type: String,
		default: null
	}
}

export type ImagePropsType = ExtractPublicPropTypes<typeof ImageProps>
