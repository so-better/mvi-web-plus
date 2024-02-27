<template>
	<div class="mvi-collapse-item" :class="{ border: collapse.outBorder }" :disabled="cmpDisabled || null">
		<Cell class="mvi-collapse-cell" :class="{ expand: expand }" :icon="icon" :content="label" :title="title" :border="collapse.inBorder" arrow="angle-right" @click="changeCollapse" :active="cmpActive" :no-wrap="collapse.noWrap"></Cell>
		<TransitionSlide :expand="expand" :timeout="200" @before-slide-up="beforeSlideUp" @slide-up="slideUp" @before-slide-down="beforeSlideDown" @slide-down="slideDown">
			<div class="mvi-collapse-content">
				<slot v-if="$slots.default"></slot>
				<span v-else v-text="content"></span>
			</div>
		</TransitionSlide>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Cell } from '../cell'
import { TransitionSlide } from '../transition-slide'
export default {
	name: 'm-collapse-item',
	inject: ['collapse'],
	props: {
		//标题栏左侧图标
		icon: {
			type: [String, Object],
			default: null
		},
		//标题
		title: {
			type: String,
			default: null
		},
		//标题栏内容
		label: {
			type: String,
			default: null
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//展开的内容
		content: {
			type: String,
			default: ''
		}
	},
	components: {
		Cell,
		TransitionSlide
	},
	setup() {
		const uid = getCurrentInstance().uid
		return {
			uid
		}
	},
	computed: {
		//面板的序列
		index() {
			return this.collapse.children.findIndex(vm => {
				return Dap.common.equal(vm.uid, this.uid)
			})
		},
		//点击态
		cmpActive() {
			if (this.cmpDisabled) {
				return false
			}
			return this.collapse.active
		},
		//是否展开
		expand() {
			let flag = false
			//手风琴模式
			if (this.collapse.accordion) {
				if (this.collapse.modelValue === this.index) {
					flag = true
				}
			}
			//非手风琴模式
			else {
				//值为数字
				if (Dap.number.isNumber(this.collapse.modelValue)) {
					if (this.collapse.modelValue === this.index) {
						flag = true
					}
				}
				//值为数组
				else if (Array.isArray(this.collapse.modelValue)) {
					if (this.collapse.modelValue.includes(this.index)) {
						flag = true
					}
				}
			}
			return flag
		},
		//是否禁用
		cmpDisabled() {
			return this.collapse.disabled || this.disabled
		},
		//是否最后一个面板
		isLast() {
			return this.collapse.children.length == this.index + 1
		}
	},
	created() {
		this.collapse.children.push(this)
	},
	methods: {
		//面板展开前触发
		beforeSlideDown() {
			this.collapse.$emit('before-slide-down', this.index)
		},
		//面板展开后触发
		slideDown() {
			this.collapse.$emit('slide-down', this.index)
		},
		//面板收起前触发
		beforeSlideUp() {
			this.collapse.$emit('before-slide-up', this.index)
		},
		//面板收起后触发
		slideUp() {
			this.collapse.$emit('slide-up', this.index)
		},
		//点击collapse-item
		changeCollapse() {
			if (this.cmpDisabled) {
				return false
			}
			//手风琴模式
			if (this.collapse.accordion) {
				//关闭当前面板
				if (this.collapse.modelValue == this.index) {
					this.collapse.$emit('update:modelValue', null)
				}
				//打开面板
				else {
					this.collapse.$emit('update:modelValue', this.index)
				}
			}
			//非手风琴模式
			else {
				//值为数字
				if (Dap.number.isNumber(this.collapse.modelValue)) {
					//关闭当前展开的面板
					if (this.collapse.modelValue == this.index) {
						this.collapse.$emit('update:modelValue', [])
					}
					//打开面板
					else {
						this.collapse.$emit('update:modelValue', [this.collapse.modelValue, this.index])
					}
				}
				//值为数组
				else if (Array.isArray(this.collapse.modelValue)) {
					let arr = [...this.collapse.modelValue]
					//关闭当前面板
					if (arr.includes(this.index)) {
						arr = arr.filter(item => {
							return item != this.index
						})
						this.collapse.$emit('update:modelValue', arr)
					}
					//打开面板
					else {
						arr.push(this.index)
						this.collapse.$emit('update:modelValue', arr)
					}
				} else {
					let arr = []
					arr.push(this.index)
					this.collapse.$emit('update:modelValue', arr)
				}
			}
		}
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-collapse-item {
	display: block;
	width: 100%;
	overflow: hidden;
	background-color: inherit;
	position: relative;

	&[disabled] {
		opacity: 0.6;
	}

	&.border::after {
		display: block;
		position: absolute;
		left: 0;
		bottom: 0;
		content: '';
		height: 0;
		border-bottom: 1px solid @border-color;
		width: 100%;
		box-sizing: content-box;
	}

	.mvi-collapse-cell {
		background-color: inherit;
		color: inherit;
		cursor: pointer;

		:deep(.mvi-cell-arrow) {
			transition: transform 200ms linear;
		}

		&.expand :deep(.mvi-cell-arrow) {
			transform: rotate(90deg);
		}
	}

	.mvi-collapse-content {
		display: block;
		width: 100%;
		padding: @mp-sm;
		font-size: @font-size-default;
		color: inherit;
		line-height: 1.5;
	}
}
</style>
