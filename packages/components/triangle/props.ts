import { ExtractPublicPropTypes, PropType } from 'vue'

export const TriangleProps = {
	//背景色
	background: {
		type: String,
		default: null
	},
	//边框颜色
	borderColor: {
		type: String,
		default: null
	},
	//大小
	size: {
		type: String,
		default: '0.14rem'
	},
	//位置
	placement: {
		type: String as PropType<'top' | 'left' | 'right' | 'bottom'>,
		default: 'top',
		validator(value: any) {
			return ['top', 'left', 'right', 'bottom'].includes(value)
		}
	}
}

export type TrianglePropsType = ExtractPublicPropTypes<typeof TriangleProps>
