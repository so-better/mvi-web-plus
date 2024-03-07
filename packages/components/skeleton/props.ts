import { ExtractPublicPropTypes, PropType } from 'vue'

export const SkeletonProps = {
	//是否加载状态
	loading: {
		type: Boolean,
		default: true
	},
	//行数
	rows: {
		type: Number,
		default: 1,
		validator(value: number) {
			return value > 0
		}
	},
	//每行宽度
	rowWidth: {
		type: [String, Array] as PropType<string | string[]>,
		default: null
	},
	//是否显示头像占位
	avatar: {
		type: Boolean,
		default: false
	},
	//是否显示标题占位
	title: {
		type: Boolean,
		default: false
	},
	//标题占位宽度
	titleWidth: {
		type: String,
		default: null
	},
	//是否显示动画效果
	animation: {
		type: Boolean,
		default: false
	},
	//标题段落是否展示圆角
	round: {
		type: Boolean,
		default: false
	},
	//头像占位大小
	avatarSize: {
		type: String,
		default: null
	},
	//头像占位是否展示圆角
	avatarRound: {
		type: Boolean,
		default: false
	}
}

export type SkeletonPropsType = ExtractPublicPropTypes<typeof SkeletonProps>
