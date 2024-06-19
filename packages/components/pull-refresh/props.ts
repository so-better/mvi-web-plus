import { ExtractPublicPropTypes, PropType } from 'vue'
import { IconPropsType } from '@/components/icon'

export type PullRefreshStatusType = 0 | 1 | 2

export const PullRefreshProps = {
	//下拉文案
	pullingText: {
		type: String,
		default: '下拉刷新'
	},
	//释放文案
	loosingText: {
		type: String,
		default: '释放刷新'
	},
	//刷新时显示的文本
	loadingText: {
		type: String,
		default: '正在刷新'
	},
	//是否刷新
	modelValue: {
		type: Boolean,
		default: false
	},
	//下拉图标
	pullingIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: 'arrow-down'
	},
	//释放图标
	loosingIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: 'arrow-up'
	},
	//刷新图标
	loadingIcon: {
		type: [String, Object] as PropType<string | IconPropsType>,
		default: function () {
			return {
				type: 'load-e',
				spin: true
			}
		}
	},
	//是否禁用
	disabled: {
		type: Boolean,
		default: false
	},
	//下拉触发刷新的距离值
	distance: {
		type: Number,
		default: 1.4
	}
}

export type PullRefreshPropsType = ExtractPublicPropTypes<typeof PullRefreshProps>
