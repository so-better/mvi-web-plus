import { ExtractPublicPropTypes, PropType } from 'vue'

export type CarouselIndicatorsType = {
	//是否显示
	show?: boolean
	//激活颜色
	active?: string
	//未激活颜色
	inactive?: string
}

export const CarouselProps = {
	//当前轮播序列
	modelValue: {
		type: Number,
		default: 0
	},
	//是否自动轮播
	autoplay: {
		type: Boolean,
		default: false
	},
	//是否循环轮播
	loop: {
		type: Boolean,
		default: false
	},
	//自动轮播的切换速度
	speed: {
		type: Number,
		default: 500
	},
	//自定轮播的间隔
	interval: {
		type: Number,
		default: 3000
	},
	//是否渐变
	fade: {
		type: Boolean,
		default: false
	},
	//分页指示器配置
	indicators: {
		type: [Boolean, Object] as PropType<boolean | CarouselIndicatorsType>,
		default: false
	},
	//是否纵向轮播
	vertical: {
		type: Boolean,
		default: false
	},
	//是否可以通过手势触摸滑动
	touchable: {
		type: Boolean,
		default: true
	},
	//前后控制器是否显示
	controls: {
		type: Boolean,
		default: false
	}
}

export type CarouselPropsType = ExtractPublicPropTypes<typeof CarouselProps>
