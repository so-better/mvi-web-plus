import { ExtractPublicPropTypes, PropType } from 'vue'

export const RollProps = {
	//滚动一个周期需要的时间
	interval: {
		type: Number,
		default: 5000
	},
	//滚动方向
	direction: {
		type: String as PropType<'left' | 'right' | 'up' | 'down'>,
		default: 'left',
		validator(value: any) {
			return ['left', 'right', 'up', 'down'].includes(value)
		}
	},
	//是否自动滚动
	autoplay: {
		type: Boolean,
		default: false
	},
	//是否循环滚动
	loop: {
		type: Boolean,
		default: false
	},
	//动画效果
	animation: {
		type: String as PropType<'linear' | 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out'>,
		default: 'linear',
		validator(value: any) {
			return ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'].includes(value)
		}
	},
	//是否点击暂停
	clickStop: {
		type: Boolean,
		default: false
	},
	//是否悬浮暂停
	hoverStop: {
		type: Boolean,
		default: false
	},
	//垂直方向滚动时内容是否居中
	center: {
		type: Boolean,
		default: false
	}
}

export type RollPropsType = ExtractPublicPropTypes<typeof RollProps>
