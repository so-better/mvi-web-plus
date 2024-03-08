import { ExtractPublicPropTypes } from 'vue'

export const SwipeCellProps = {
	//是否禁用滑动
	disabled: {
		type: Boolean,
		default: false
	},
	//默认点击center部分关闭展开的左右内容
	centerClose: {
		type: Boolean,
		default: true
	}
}

export type SwipeCellPropsType = ExtractPublicPropTypes<typeof SwipeCellProps>
