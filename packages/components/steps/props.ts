import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '@/components/icon'

export const StepsProps = {
	//当前步骤
	active: {
		type: Number,
		default: 0
	},
	//是否垂直
	vertical: {
		type: Boolean,
		default: false
	},
	//激活状态的颜色
	activeColor: {
		type: String,
		default: null
	},
	//未激活状态的颜色
	inactiveColor: {
		type: String,
		default: null
	},
	//激活状态的图标
	activeIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: 'success-o'
	},
	//未激活状态的图标
	inactiveIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: null
	}
}

export type StepsPropsType = ExtractPublicPropTypes<typeof StepsProps>
