import { ExtractPublicPropTypes } from 'vue'

export const SwiperProps = {
	//是否自动轮播
	autoplay: {
		type: Boolean,
		default: false
	},
	//切换速度
	speed: {
		type: Number,
		default: 500
	},
	//自动轮播的时间间隔
	interval: {
		type: Number,
		default: 5000
	},
	//初始轮播索引
	initialSlide: {
		type: Number,
		default: 0
	},
	//轮播宽度
	width: {
		type: String,
		default: null
	},
	//轮播高度
	height: {
		type: String,
		default: null
	},
	//是否循环
	loop: {
		type: Boolean,
		default: false
	},
	//是否显示指示器
	showIndicators: {
		type: Boolean,
		default: false
	},
	//指示器激活时的颜色
	activeColor: {
		type: String,
		default: null
	},
	//指示器未激活的颜色
	inactiveColor: {
		type: String,
		default: null
	},
	//是否为纵向轮播
	vertical: {
		type: Boolean,
		default: false
	},
	//是否可以通过手势滑动
	touchable: {
		type: Boolean,
		default: true
	},
	//是否显示上一张下一张控制器
	showControl: {
		type: Boolean,
		default: false
	},
	//是否使用渐变效果
	fade: {
		type: Boolean,
		default: false
	}
}

export type SwiperPropsType = ExtractPublicPropTypes<typeof SwiperProps>
