<template>
	<div :class="['mvi-collapse-item', computedOutBorder ? 'mvi-collapse-item-border' : '']">
		<Cell class="mvi-collapse-cell" :icon="icon" :content="label" :title="title" :border="cellBorder" :arrow="arrow" :title-class="titleClass" :content-class="labelClass" @click="changeCollapse" :active="computedActive" :no-wrap="computedNoWrap"></Cell>
		<TransitionSlide :expand="open" :timeout="computedTimeout" @before-slide-up="beforeSlideUp" @slide-up="slideUp" @before-slide-down="beforeSlideDown" @slide-down="slideDown">
			<div :class="['mvi-collapse-item-content', contentClass || '']">
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
	data() {
		return {
			open: true,
			cellBorder: false
		}
	},
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
		//是否显示外下边框
		outBorder: {
			type: Boolean,
			default: null
		},
		//是否显示内下边框
		inBorder: {
			type: Boolean,
			default: null
		},
		//标题栏标题额外样式
		titleClass: {
			type: String,
			default: null
		},
		//标题栏内容额外样式
		labelClass: {
			type: String,
			default: null
		},
		//标题栏是否显示点击态
		active: {
			type: Boolean,
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
		},
		//展开的内容的额外样式类
		contentClass: {
			type: String,
			default: null
		},
		//是否对标题栏的标题和内容使用单行限制
		noWrap: {
			type: Boolean,
			default: null
		},
		//打开时右侧图标
		openArrow: {
			type: [String, Object],
			default: null
		},
		//关闭时右侧图标
		closeArrow: {
			type: [String, Object],
			default: null
		},
		//折叠或者展开的动画时长,单位ms
		timeout: {
			type: Number,
			default: null
		}
	},
	components: {
		Cell,
		TransitionSlide
	},
	created() {
		this.collapse.children.push(this)
		this.cellBorder = this.computedInBorder
		this.isNeedHideSelf()
	},
	setup() {
		const uid = getCurrentInstance().uid
		return {
			uid
		}
	},
	watch: {
		'collapse.modelValue': function (newValue, oldValue) {
			this.isNeedHideSelf()
		}
	},
	computed: {
		computedOutBorder() {
			if (typeof this.outBorder == 'boolean') {
				return this.outBorder
			} else {
				return this.collapse.outBorder
			}
		},
		computedInBorder() {
			if (typeof this.inBorder == 'boolean') {
				return this.inBorder
			} else {
				return this.collapse.inBorder
			}
		},
		computedNoWrap() {
			if (typeof this.noWrap == 'boolean') {
				return this.noWrap
			} else {
				return this.collapse.noWrap
			}
		},
		//item在collapse中的序列值
		itemIndex() {
			return this.collapse.children.findIndex(vm => {
				return Dap.common.equal(vm.uid, this.uid)
			})
		},
		//打开时右侧图标
		computedOpenArrow() {
			let arrow = {
				type: 'angle-up',
				color: null,
				size: null,
				url: null,
				spin: false
			}
			if (typeof this.openArrow == 'string' && this.openArrow) {
				arrow.type = this.openArrow
			} else if (Dap.common.isObject(this.openArrow)) {
				if (typeof this.openArrow.type == 'string' && this.openArrow.type) {
					arrow.type = this.openArrow.type
				}
				if (typeof this.openArrow.color == 'string' && this.openArrow.color) {
					arrow.color = this.openArrow.color
				}
				if (typeof this.openArrow.size == 'string' && this.openArrow.size) {
					arrow.size = this.openArrow.size
				}
				if (typeof this.openArrow.url == 'string' && this.openArrow.url) {
					arrow.url = this.openArrow.url
				}
				if (typeof this.openArrow.spin == 'boolean') {
					arrow.spin = this.openArrow.spin
				}
			} else if (typeof this.collapse.openArrow == 'string' && this.collapse.openArrow) {
				arrow.type = this.collapse.openArrow
			} else if (Dap.common.isObject(this.collapse.openArrow)) {
				if (typeof this.collapse.openArrow.type == 'string' && this.collapse.openArrow.type) {
					arrow.type = this.collapse.openArrow.type
				}
				if (typeof this.collapse.openArrow.color == 'string' && this.collapse.openArrow.color) {
					arrow.color = this.collapse.openArrow.color
				}
				if (typeof this.collapse.openArrow.size == 'string' && this.collapse.openArrow.size) {
					arrow.size = this.collapse.openArrow.size
				}
				if (typeof this.collapse.openArrow.url == 'string' && this.collapse.openArrow.url) {
					arrow.url = this.collapse.openArrow.url
				}
				if (typeof this.collapse.openArrow.spin == 'boolean') {
					arrow.spin = this.collapse.openArrow.spin
				}
			}
			return arrow
		},
		//关闭时右侧图标
		computedCloseArrow() {
			let arrow = {
				type: 'angle-down',
				color: null,
				size: null,
				url: null
			}
			if (typeof this.closeArrow == 'string' && this.closeArrow) {
				arrow.type = this.closeArrow
			} else if (Dap.common.isObject(this.closeArrow)) {
				if (typeof this.closeArrow.type == 'string' && this.closeArrow.type) {
					arrow.type = this.closeArrow.type
				}
				if (typeof this.closeArrow.color == 'string' && this.closeArrow.color) {
					arrow.color = this.closeArrow.color
				}
				if (typeof this.closeArrow.size == 'string' && this.closeArrow.size) {
					arrow.size = this.closeArrow.size
				}
				if (typeof this.closeArrow.url == 'string' && this.closeArrow.url) {
					arrow.url = this.closeArrow.url
				}
				if (typeof this.closeArrow.spin == 'boolean') {
					arrow.spin = this.closeArrow.spin
				}
			} else if (typeof this.collapse.closeArrow == 'string' && this.collapse.closeArrow) {
				arrow.type = this.collapse.closeArrow
			} else if (Dap.common.isObject(this.collapse.closeArrow)) {
				if (typeof this.collapse.closeArrow.type == 'string' && this.collapse.closeArrow.type) {
					arrow.type = this.collapse.closeArrow.type
				}
				if (typeof this.collapse.closeArrow.color == 'string' && this.collapse.closeArrow.color) {
					arrow.color = this.collapse.closeArrow.color
				}
				if (typeof this.collapse.closeArrow.size == 'string' && this.collapse.closeArrow.size) {
					arrow.size = this.collapse.closeArrow.size
				}
				if (typeof this.collapse.closeArrow.url == 'string' && this.collapse.closeArrow.url) {
					arrow.url = this.collapse.closeArrow.url
				}
				if (typeof this.collapse.closeArrow.spin == 'boolean') {
					arrow.spin = this.collapse.closeArrow.spin
				}
			}
			return arrow
		},
		//右侧图标
		arrow() {
			return this.open ? this.computedOpenArrow : this.computedCloseArrow
		},
		//点击态
		computedActive() {
			if (this.disabled || this.collapse.disabled) {
				return false
			}
			if (typeof this.active == 'boolean') {
				return this.active
			} else {
				return this.collapse.active
			}
		},
		//折叠面板显示隐藏动画时长
		computedTimeout() {
			if (typeof this.timeout == 'number') {
				return this.timeout
			} else {
				return this.collapse.timeout
			}
		}
	},
	methods: {
		//面板展开前触发
		beforeSlideDown() {
			this.collapse.$emit('before-slide-down', this.itemIndex)
			if (this.computedInBorder) {
				this.cellBorder = true
			}
		},
		//面板展开后触发
		slideDown() {
			this.collapse.$emit('slide-down', this.itemIndex)
		},
		//面板收起前触发
		beforeSlideUp() {
			this.collapse.$emit('before-slide-up', this.itemIndex)
		},
		//面板收起后触发
		slideUp() {
			if (this.computedInBorder) {
				this.cellBorder = false
			}
			this.collapse.$emit('slide-up', this.itemIndex)
		},
		//判断是否需要隐藏此折叠面板
		isNeedHideSelf() {
			//手风琴模式
			if (this.collapse.accordion) {
				if (this.collapse.modelValue === this.itemIndex) {
					this.open = true
				} else {
					this.open = false
				}
			}
			//非手风琴模式
			else {
				//值为数字
				if (Dap.number.isNumber(this.collapse.modelValue)) {
					if (this.collapse.modelValue === this.itemIndex) {
						this.open = true
					} else {
						this.open = false
					}
				}
				//值为数组
				else if (Array.isArray(this.collapse.modelValue)) {
					if (this.collapse.modelValue.includes(this.itemIndex)) {
						this.open = true
					} else {
						this.open = false
					}
				} else {
					this.open = false
				}
			}
		},
		//点击collapse-item
		changeCollapse() {
			if (this.disabled || this.collapse.disabled) {
				return false
			}
			//手风琴模式
			if (this.collapse.accordion) {
				//关闭当前面板
				if (this.collapse.modelValue == this.itemIndex) {
					this.collapse.$emit('update:modelValue', null)
				}
				//打开面板
				else {
					this.collapse.$emit('update:modelValue', this.itemIndex)
				}
			}
			//非手风琴模式
			else {
				//值为数字
				if (Dap.number.isNumber(this.collapse.modelValue)) {
					//关闭当前展开的面板
					if (this.collapse.modelValue == this.itemIndex) {
						this.collapse.$emit('update:modelValue', [])
					}
					//打开面板
					else {
						this.collapse.$emit('update:modelValue', [this.collapse.modelValue, this.itemIndex])
					}
				}
				//值为数组
				else if (Array.isArray(this.collapse.modelValue)) {
					let arr = [...this.collapse.modelValue]
					//关闭当前面板
					if (arr.includes(this.itemIndex)) {
						arr = arr.filter(item => {
							return item != this.itemIndex
						})
						this.collapse.$emit('update:modelValue', arr)
					}
					//打开面板
					else {
						arr.push(this.itemIndex)
						this.collapse.$emit('update:modelValue', arr)
					}
				} else {
					let arr = []
					arr.push(this.itemIndex)
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
}

.mvi-collapse-item.mvi-collapse-item-border {
	border-bottom: 1px solid @border-color;
}

.mvi-collapse-cell {
	background-color: inherit;
	color: inherit;
	cursor: pointer;
}

.mvi-collapse-item-content {
	display: block;
	width: 100%;
	padding: @mp-sm;
	font-size: @font-size-default;
	color: inherit;
	line-height: 1.5;
}
</style>
