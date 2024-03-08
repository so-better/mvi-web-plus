import { ExtractPublicPropTypes, PropType } from 'vue'
export type TabsFlexType = 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'

export const TabsProps = {
	//tabs类型
	type: {
		type: String as PropType<'default' | 'card'>,
		default: 'default',
		validator(value: any) {
			return ['default', 'card'].includes(value)
		}
	},
	//激活的tab序列
	modelValue: {
		type: Number,
		default: 0
	},
	//tab切换动画
	animation: {
		type: String as PropType<'none' | 'slide' | 'fade'>,
		default: 'none',
		validator(value: any) {
			return ['none', 'slide', 'fade'].includes(value)
		}
	},
	//当animation为slide或者fade时的动画时长
	timeout: {
		type: Number,
		default: 500
	},
	//当标题过长时是否省略，标题栏最大长度只有1/n，n表示标题栏个数
	ellipsis: {
		type: Boolean,
		default: true
	},
	//type="default"下是否显示选项卡头部下边框
	border: {
		type: Boolean,
		default: false
	},
	//type="default"下布局方式
	flex: {
		type: String as PropType<TabsFlexType>,
		default: 'space-between'
	},
	//type="default"下每个选项卡头部距离左侧的距离
	offset: {
		type: String,
		default: '0'
	},
	//激活颜色
	activeColor: {
		type: String,
		default: null
	}
}

export type TabsPropsType = ExtractPublicPropTypes<typeof TabsProps>
