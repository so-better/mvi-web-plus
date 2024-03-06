import { ExtractPublicPropTypes } from 'vue'

export const TransitionSlideProps = {
	//是否展开
	expand: {
		type: Boolean,
		default: true
	},
	//动画时间
	timeout: {
		type: Number,
		default: 200
	}
}

export type TransitionSlidePropsType = ExtractPublicPropTypes<typeof TransitionSlideProps>
