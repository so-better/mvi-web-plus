import { ExtractPublicPropTypes, PropType } from 'vue'

export const LabelProps = {
	//标签样式
	type: {
		type: String as PropType<'default' | 'error' | 'info' | 'primary' | 'success' | 'warn'>,
		default: 'default',
		validator(value: any) {
			return ['default', 'error', 'info', 'primary', 'success', 'warn'].includes(value)
		}
	},
	//标签大小
	size: {
		type: String as PropType<'medium' | 'large'>,
		default: 'medium',
		validator(value: any) {
			return ['medium', 'large'].includes(value)
		}
	},
	//是否为朴素样式
	plain: {
		type: Boolean,
		default: false
	},
	//是否为圆角样式
	round: {
		type: Boolean,
		default: false
	},
	//是否为标记样式
	mark: {
		type: Boolean,
		default: false
	},
	//是否可关闭
	closable: {
		type: Boolean,
		default: false
	},
	//标记样式时是否反向
	reverse: {
		type: Boolean,
		default: false
	}
}

export type LabelPropsType = ExtractPublicPropTypes<typeof LabelProps>
