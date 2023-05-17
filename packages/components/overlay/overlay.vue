<template>
	<teleport :disabled="!mountEl" :to="mountEl">
		<transition name="mvi-overlay-fade" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
			<div @click.self="closeOverlay" ref="overlay" class="mvi-overlay" v-show="overlayShow" :style="overlayStyle" v-bind="$attrs">
				<slot></slot>
			</div>
		</transition>
	</teleport>
</template>

<script>
import { Dap } from '../dap'
export default {
	name: 'm-overlay',
	data() {
		return {
			//是否显示遮罩层
			overlayShow: false,
			//父级元素垂直滚动条距离
			scrollTop: 0,
			//父级元素水平滚动条距离
			scrollLeft: 0,
			//父级元素overflow-x
			overflowX: '',
			//父级元素overflow-y
			overflowY: '',
			//父级元素右侧内边距
			paddingRight: 0,
			//父级元素底部内边距
			paddingBottom: 0,
			//是否含有水平滚动条
			hasHorizontalScroll: false,
			//是否含有垂直滚动条
			hasVerticalScroll: false,
			//组件的定位父元素
			offsetParent: null
		}
	},
	emits: ['update:modelValue', 'show', 'showing', 'shown', 'hide', 'hidding', 'hidden'],
	inheritAttrs: false,
	props: {
		//挂载元素
		mountEl: {
			type: String,
			default: null
		},
		//遮罩层z-index
		zIndex: {
			type: Number,
			default: 800
		},
		//遮罩层颜色
		color: {
			type: String,
			default: null
		},
		//是否显示遮罩层
		modelValue: {
			type: Boolean,
			default: false
		},
		//是否渐变
		fade: {
			type: Boolean,
			default: true
		},
		//动画时间
		timeout: {
			type: Number,
			default: 200,
			validator(value) {
				return value >= 0
			}
		},
		//是否点击可关闭
		closable: {
			type: Boolean,
			default: false
		},
		//是否考虑PC滚动条
		usePadding: {
			type: Boolean,
			default: false
		}
	},
	watch: {
		modelValue(newValue) {
			this.overlayShow = newValue
		}
	},
	computed: {
		//遮罩层样式
		overlayStyle() {
			let style = {}
			if (Dap.number.isNumber(this.zIndex)) {
				style.zIndex = this.zIndex
			}
			if (this.color) {
				style.background = this.color
			}
			return style
		},
		//遮罩层根元素
		$$el() {
			return this.$refs.overlay
		}
	},
	mounted() {
		//初始化时是否显示遮罩层
		this.overlayShow = this.modelValue
	},
	methods: {
		//transition钩子函数：组件显示之前
		beforeEnter(el) {
			if (this.fade) {
				el.style.transition = 'opacity ' + this.timeout + 'ms'
				el.style.webkitTransition = 'opacity ' + this.timeout + 'ms'
			}
			this.$emit('show', el)
			if (typeof this.overlayComponentWatch == 'function') {
				this.overlayComponentWatch.apply(this, ['show', el])
			}
		},
		//transition钩子函数：组件显示
		enter(el) {
			//父级定位元素存在
			if (this.$$el.offsetParent) {
				this.offsetParent = this.$$el.offsetParent
				//元素含垂直滚动条(文档高度大于可视高度)
				if (Dap.element.getScrollHeight(this.offsetParent) > this.offsetParent.clientHeight) {
					if (this.usePadding) {
						//获取滚动条宽度
						let scrollWidth = this.offsetParent.offsetWidth - this.offsetParent.clientWidth - parseFloat(Dap.element.getCssStyle(this.offsetParent, 'border-right-width')) - parseFloat(Dap.element.getCssStyle(this.offsetParent, 'border-left-width'))
						//记录原先右侧内边距的值
						this.paddingRight = parseFloat(Dap.element.getCssStyle(this.offsetParent, 'padding-right'))
						//设置右侧内边距值
						this.offsetParent.style.setProperty('padding-right', this.paddingRight + scrollWidth + 'px', 'important')
					}
					//记录滚动条距离
					this.scrollTop = Dap.element.getScrollTop(this.offsetParent)
					//记录overflow-y值
					this.overflowY = Dap.element.getCssStyle(this.offsetParent, 'overflow-y')
					//设置overflow-y为hidden
					this.offsetParent.style.setProperty('overflow-y', 'hidden', 'important')
					//设置遮罩层距离顶部的距离
					this.$$el.style.top = this.scrollTop + 'px'
					//记录含有垂直滚动条
					this.hasVerticalScroll = true
				}
				//元素含水平滚动条(文档宽度大于可视宽度)
				if (Dap.element.getScrollWidth(this.offsetParent) > this.offsetParent.clientWidth) {
					if (this.usePadding) {
						//获取滚动条高度
						let scrollHeight = this.offsetParent.offsetHeight - this.offsetParent.clientHeight - parseFloat(Dap.element.getCssStyle(this.offsetParent, 'border-bottom-width')) - parseFloat(Dap.element.getCssStyle(this.offsetParent, 'border-top-width'))
						//记录原先底部侧内边距的值
						this.paddingBottom = parseFloat(Dap.element.getCssStyle(this.offsetParent, 'padding-bottom'))
						//设置底部内边距值
						this.offsetParent.style.setProperty('padding-bottom', this.paddingBottom + scrollHeight + 'px', 'important')
					}
					//记录滚动条距离
					this.scrollLeft = Dap.element.getScrollLeft(this.offsetParent)
					//记录overflow-x值
					this.overflowX = Dap.element.getCssStyle(this.offsetParent, 'overflow-x')
					//设置overflow-x为hidden
					this.offsetParent.style.setProperty('overflow-x', 'hidden', 'important')
					//设置遮罩层距离左侧的距离
					this.$$el.style.left = this.scrollLeft + 'px'
					//记录含有水平滚动条
					this.hasHorizontalScroll = true
				}
			}
			this.$emit('showing', el)
			if (typeof this.overlayComponentWatch == 'function') {
				this.overlayComponentWatch.apply(this, ['showing', el])
			}
		},
		//组件显示之后
		afterEnter(el) {
			if (this.fade) {
				el.style.transition = ''
				el.style.webkitTransition = ''
			}
			this.$emit('shown', el)
			if (typeof this.overlayComponentWatch == 'function') {
				this.overlayComponentWatch.apply(this, ['shown', el])
			}
		},
		//组件隐藏之前
		beforeLeave(el) {
			if (this.fade) {
				el.style.transition = 'opacity ' + this.timeout + 'ms'
				el.style.webkitTransition = 'opacity ' + this.timeout + 'ms'
			}
			this.$emit('hide', el)
			if (typeof this.overlayComponentWatch == 'function') {
				this.overlayComponentWatch.apply(this, ['hide', el])
			}
		},
		//组件隐藏时
		leave(el) {
			this.$emit('hidding', el)
			if (typeof this.overlayComponentWatch == 'function') {
				this.overlayComponentWatch.apply(this, ['hidding', el])
			}
		},
		//组件隐藏之后
		afterLeave(el) {
			if (this.offsetParent) {
				//含有垂直滚动条
				if (this.hasVerticalScroll) {
					if (this.usePadding) {
						this.offsetParent.style.setProperty('padding-right', this.paddingRight + 'px', 'important')
					}
					this.offsetParent.style.setProperty('overflow-y', this.overflowY, 'important')
					this.hasVerticalScroll = false
				}
				//含有水平滚动条
				if (this.hasHorizontalScroll) {
					if (this.usePadding) {
						this.offsetParent.style.setProperty('padding-bottom', this.paddingBottom + 'px', 'important')
					}
					this.offsetParent.style.setProperty('overflow-x', this.overflowX, 'important')
					this.hasHorizontalScroll = false
				}
			}
			if (this.fade) {
				el.style.transition = ''
				el.style.webkitTransition = ''
			}
			this.$emit('hidden', el)
			if (typeof this.overlayComponentWatch == 'function') {
				this.overlayComponentWatch.apply(this, ['hidden', el])
			}
		},
		//点击遮罩关闭此遮罩
		closeOverlay() {
			if (this.closable) {
				this.$emit('update:modelValue', false)
			}
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-overlay {
	display: block;
	background-color: @overlay;
	overflow: hidden;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	border-radius: inherit;
}

.mvi-overlay-fade-enter-from,
.mvi-overlay-fade-leave-to {
	opacity: 0;
}

.mvi-overlay-fade-enter-to,
.mvi-overlay-fade-leave-from {
	opacity: 1;
}
</style>
