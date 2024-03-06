import { PropType } from 'vue'
import { ActionsheetOptionsItemType } from '../../types/ActionsheetOptionsItem'

export default {
	//是否显示
	modelValue: {
		type: Boolean,
		default: false
	},
	//遮罩层颜色
	overlayColor: {
		type: String,
		default: null
	},
	//层级
	zIndex: {
		type: Number,
		default: 900
	},
	//动画时间
	timeout: {
		type: Number,
		default: 200
	},
	//是否显示圆角
	round: {
		type: Boolean,
		default: false
	},
	//标题
	title: {
		type: String,
		default: null
	},
	//点击遮罩是否可关闭
	closable: {
		type: Boolean,
		default: false
	},
	//配置项，每个配置项包含label、loading、icon、placement、disabled
	options: {
		type: Array as PropType<ActionsheetOptionsItemType[]>,
		default: function () {
			return []
		}
	},
	//是否显示取消按钮
	showCancel: {
		type: Boolean,
		default: true
	},
	//取消按钮文字
	cancelText: {
		type: String,
		default: '取消'
	},
	//列表和取消按钮是否显示点击态
	active: {
		type: Boolean,
		default: true
	},
	//挂载元素
	mountEl: {
		type: String,
		default: null
	},
	//选择完是否自动关闭
	selectClose: {
		type: Boolean,
		default: true
	},
	//局部显示时是否考虑滚动条影响
	usePadding: {
		type: Boolean,
		default: false
	},
	//尺寸
	size: {
		type: String as PropType<'medium' | 'large'>,
		default: 'medium',
		validator(value: any) {
			return ['medium', 'large'].includes(value)
		}
	}
}
