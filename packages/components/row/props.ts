import { ExtractPublicPropTypes, PropType } from 'vue'

export const RowProps = {
	//排列方式
	justify: {
		type: String as PropType<'flex-start' | 'flex-end' | 'space-around' | 'space-between'>,
		default: 'flex-start',
		validator(value: any) {
			return ['flex-start', 'flex-end', 'space-around', 'space-between'].includes(value)
		}
	},
	//垂直对齐方式
	align: {
		type: String as PropType<'flex-start' | 'flex-end' | 'center'>,
		default: 'flex-start',
		validator(value: any) {
			return ['flex-start', 'flex-end', 'center'].includes(value)
		}
	},
	//渲染标签
	tag: {
		type: String,
		default: 'div'
	}
}

export type RowPropsType = ExtractPublicPropTypes<typeof RowProps>
