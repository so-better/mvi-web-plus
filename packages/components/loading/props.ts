import { ExtractPublicPropTypes, PropType } from 'vue'

export const LoadingProps = {
	//类型
	type: {
		type: String as PropType<'default' | 'circle' | 'dots' | 'spin' | 'transfer'>,
		default: 'default',
		validator(value: any) {
			return ['default', 'circle', 'dots', 'spin', 'transfer'].includes(value)
		}
	},
	//颜色
	color: {
		type: String,
		default: '#bbb'
	},
	//尺寸
	size: {
		type: String,
		default: '0.6rem'
	}
}

export type LoadingPropsType = ExtractPublicPropTypes<typeof LoadingProps>
