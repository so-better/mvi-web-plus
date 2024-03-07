import { ExtractPublicPropTypes } from 'vue'

export const ListProps = {
	//是否加载状态
	loading: {
		type: Boolean,
		default: false
	},
	//是否错误状态
	error: {
		type: Boolean,
		default: false
	},
	//是否完成状态
	finished: {
		type: Boolean,
		default: false
	},
	//加载文案
	loadingText: {
		type: String,
		default: '正在加载'
	},
	//错误文案
	errorText: {
		type: String,
		default: '数据加载失败'
	},
	//完成文案
	finishedText: {
		type: String,
		default: '没有更多了'
	},
	//初始化是否触发一次load
	immediateLoad: {
		type: Boolean,
		default: false
	},
	//content内容
	content: {
		type: String,
		default: '点我加载更多'
	},
	//滚动元素
	scrollEl: {
		type: String,
		default: null
	}
}

export type ListPropsType = ExtractPublicPropTypes<typeof ListProps>
