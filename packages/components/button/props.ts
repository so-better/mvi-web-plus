import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '@/components/icon'

export const ButtonProps = {
	//主题类型
	type: {
		type: String as PropType<'default' | 'info' | 'success' | 'error' | 'warn' | 'primary'>,
		default: 'default',
		validator(value: any) {
			return ['default', 'info', 'success', 'error', 'warn', 'primary'].includes(value)
		}
	},
	//尺寸
	size: {
		type: String as PropType<'mini' | 'small' | 'medium' | 'large'>,
		default: 'medium',
		validator(value: any) {
			return ['mini', 'small', 'medium', 'large'].includes(value)
		}
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//原生按钮type
	nativeType: {
		type: String as PropType<HTMLButtonElement['type']>,
		default: 'button'
	},
	//是否独占一行
	block: {
		type: Boolean,
		default: false
	},
	//渲染标签
	tag: {
		type: String,
		default: 'button'
	},
	//是否朴素按钮
	plain: {
		type: Boolean,
		default: false
	},
	//圆形按钮
	round: {
		type: Boolean,
		default: false
	},
	//方形按钮
	square: {
		type: Boolean,
		default: false
	},
	//是否显示点击态
	active: {
		type: Boolean,
		default: true
	},
	//是否显示加载状态
	loading: {
		type: Boolean,
		default: false
	},
	//加载文字
	loadText: {
		type: String,
		default: 'loading...'
	},
	//加载图标
	loadIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: function () {
			return {
				type: 'load-e',
				spin: true
			}
		}
	}
}

//对外的按钮属性增加一个text用作按钮文本内容
const publicButtonProps = {
	...ButtonProps,
	text: {
		type: String,
		default: ''
	}
}
export type ButtonPropsType = ExtractPublicPropTypes<typeof publicButtonProps>
