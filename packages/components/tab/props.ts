import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '@/components/icon'

export const TabProps = {
	//标题
	title: {
		type: String,
		default: ''
	},
	//标题侧边显示的图标
	icon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	},
	//是否禁用选项卡
	disabled: {
		type: Boolean,
		default: false
	},
	//图标位置
	placement: {
		type: String as PropType<'left' | 'right'>,
		default: 'left',
		validator(value: any) {
			return ['left', 'right'].includes(value)
		}
	}
}

export type TabPropsType = ExtractPublicPropTypes<typeof TabProps>
