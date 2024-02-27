<template>
	<div class="mvi-list">
		<slot></slot>
		<div v-if="finished" class="mvi-list-finished">
			<slot name="finished" v-if="$slots.finished"></slot>
			<span v-else>{{ finishedText }}</span>
		</div>
		<div v-else-if="loading" class="mvi-list-loading">
			<slot name="loading" v-if="$slots.loading"></slot>
			<span v-else>{{ loadingText }}</span>
		</div>
		<div v-else-if="error" @click="doLoad" class="mvi-list-error">
			<slot name="error" v-if="$slots.error"></slot>
			<span v-else>{{ errorText }}</span>
		</div>
		<div v-else-if="content || $slots.content" @click="doLoad" class="mvi-list-content">
			<slot name="content" v-if="$slots.content"></slot>
			<span v-else>{{ content }}</span>
		</div>
	</div>
</template>

<script>
import { Scroll } from '../scroll'
export default {
	name: 'm-list',
	emits: ['load', 'update:loading', 'update:error'],
	data() {
		return {
			//监听滚动的对象
			scrollObj: null
		}
	},
	props: {
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
	},
	mounted() {
		this.initScroll()
		if (this.immediateLoad) {
			this.doLoad()
		}
	},
	methods: {
		//监听滚动元素到底部
		initScroll() {
			const el = document.body.querySelector(this.scrollEl)
			if (!el) {
				return
			}
			if (this.scrollObj) {
				return
			}
			this.scrollObj = new Scroll(el, {
				bottom: () => {
					if (this.finished || this.loading || this.error) {
						return
					}
					this.doLoad()
				}
			})
			this.scrollObj.init()
		},
		//执行加载函数
		doLoad() {
			if (this.finished) {
				return
			}
			this.$emit('update:loading', true)
			this.$emit('update:error', false)
			this.$emit('load')
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-list {
	display: block;
	width: 100%;

	.mvi-list-loading,
	.mvi-list-finished,
	.mvi-list-error,
	.mvi-list-content {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		padding: @mp-md;
		font-size: @font-size-default;
		color: @font-color-mute;
	}
}
</style>
