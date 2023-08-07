<template>
	<Overlay ref="overlay" :model-value="modelValue" @show="overlayShow" @hide="overlayHide" :use-padding="usePadding" :z-index="zIndex" @click.self="hide" :color="overlayColor" :timeout="timeout" :mount-el="mountEl">
		<div ref="modal" class="mvi-modal" :style="{ zIndex: zIndex + 10 }">
			<transition :name="'mvi-modal-' + animation" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
				<!-- 弹出层 -->
				<div v-if="firstShow" v-show="modalShow" class="mvi-modal-wrapper" ref="wrapper" :style="wrapperStyle" v-bind="$attrs">
					<div class="mvi-modal-times" @click="hideModal" v-if="showTimes">
						<Icon type="times" />
					</div>
					<div ref="header" :class="['mvi-modal-title', ellipsis ? 'ellipsis' : '', center ? 'center' : '']" v-if="$slots.title || title" :style="headerStyle">
						<slot name="title" v-if="$slots.title"></slot>
						<span v-html="title" v-else-if="title"></span>
					</div>
					<div ref="content" class="mvi-modal-content" v-if="$slots.default || content">
						<slot v-if="$slots.default"></slot>
						<span v-html="content" v-else-if="content"></span>
					</div>
					<div ref="footer" class="mvi-modal-footer" :style="{ padding: __ignorePadding ? 0 : '' }" v-if="$slots.footer || footer">
						<slot name="footer" v-if="$slots.footer"></slot>
						<span v-text="footer" v-else-if="footer"></span>
					</div>
				</div>
			</transition>
		</div>
	</Overlay>
</template>

<script>
import { Dap } from '../dap'
import { Overlay } from '../overlay'
import { Icon } from '../icon'
export default {
	name: 'm-modal',
	data() {
		return {
			//模态框是否显示
			modalShow: false,
			//模态框是否渲染
			firstShow: false
		}
	},
	emits: ['update:modelValue', 'show', 'showing', 'shown', 'hide', 'hidding', 'hidden'],
	inheritAttrs: false,
	props: {
		//是否显示
		modelValue: {
			type: Boolean,
			default: false
		},
		//挂载元素
		mountEl: {
			type: String,
			default: null
		},
		//模态框标题
		title: {
			type: String,
			default: ''
		},
		//标题是否居中
		center: {
			type: Boolean,
			default: false
		},
		//标题是否只一行，超出省略
		ellipsis: {
			type: Boolean,
			default: false
		},
		//模态框内容
		content: {
			type: String,
			default: ''
		},
		//尾注信息
		footer: {
			type: String,
			default: null
		},
		//是否显示关闭图标
		showTimes: {
			type: Boolean,
			default: false
		},
		//动画时间
		timeout: {
			type: Number,
			default: 200
		},
		//点击背景遮罩是否关闭
		closable: {
			type: Boolean,
			default: false
		},
		//遮罩层颜色
		overlayColor: {
			type: String,
			default: null
		},
		//遮罩层z-index
		zIndex: {
			type: Number,
			default: 900
		},
		//弹窗显示的宽度
		width: {
			type: String,
			default: null
		},
		//模态框圆角
		radius: {
			type: String,
			default: null
		},
		//动画
		animation: {
			type: String,
			//'narrow','scale','translate-top','translate-bottom','translate-left','translate-right'
			default: 'scale'
		},
		//局部显示是否考虑PC端滚动条影响
		usePadding: {
			type: Boolean,
			default: false
		},
		//是否全屏
		fullScreen: {
			type: Boolean,
			default: false
		},
		//模态框作为dialog时的属性，不设置footer的内边距，仅供内部使用
		__ignorePadding: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		$$el() {
			return this.$refs.overlay.$$el
		},
		wrapperStyle() {
			let style = {}
			if (this.radius) {
				style.borderRadius = this.radius
			}
			style.transition = 'all ' + this.timeout + 'ms'
			return style
		},
		headerStyle() {
			let style = {}
			//主体存在
			if (this.$slots.default || this.content) {
				style.paddingBottom = '0'
			}
			return style
		}
	},
	components: {
		Icon,
		Overlay
	},
	watch: {
		fullScreen() {
			this.modalSize()
		}
	},
	methods: {
		//模态框宽高设置
		modalSize() {
			//如果是全屏显示
			if (this.fullScreen) {
				this.$refs.modal.style.width = this.$$el.offsetParent.offsetWidth + 'px'
				this.$refs.wrapper.style.height = this.$$el.offsetParent.offsetHeight + 'px'
				this.$refs.wrapper.style.maxHeight = ''
			} else {
				if (this.width) {
					this.$refs.modal.style.width = this.width
				} else {
					this.$refs.modal.style.width = ''
				}
				this.$refs.wrapper.style.maxHeight = this.$$el.offsetParent.offsetHeight * 0.96 + 'px'
				this.$refs.wrapper.style.height = ''
			}
		},
		//遮罩层显示前
		overlayShow() {
			if (!this.firstShow) {
				this.firstShow = true
			}
			this.modalShow = true
		},
		//遮罩层隐藏之前
		overlayHide() {
			this.modalShow = false
		},
		//点击遮罩层关闭
		hide() {
			if (this.closable) {
				this.hideModal()
			}
		},
		//点击关闭按钮
		hideModal() {
			this.$emit('update:modelValue', false)
		},
		//弹出层显示前
		beforeEnter(el) {
			//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
			if (Dap.data.get(el, 'mvi-modal-beforeEnter-trigger')) {
				return
			}
			Dap.data.set(el, 'mvi-modal-beforeEnter-trigger', true)
			this.$emit('show', el)
			if (typeof this.modalComponentWatch == 'function') {
				this.modalComponentWatch.apply(this, ['show', el])
			}
		},
		//弹出层显示时
		enter(el) {
			//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
			if (Dap.data.get(el, 'mvi-modal-enter-trigger')) {
				return
			}
			Dap.data.set(el, 'mvi-modal-enter-trigger', true)
			this.modalSize()
			this.$emit('showing', el)
			if (typeof this.modalComponentWatch == 'function') {
				this.modalComponentWatch.apply(this, ['showing', el])
			}
		},
		//弹出层显示后
		afterEnter(el) {
			this.$emit('shown', el)
			if (typeof this.modalComponentWatch == 'function') {
				this.modalComponentWatch.apply(this, ['shown', el])
			}
		},
		//弹出层隐藏前
		beforeLeave(el) {
			//清除标记
			Dap.data.remove(el, 'mvi-modal-beforeEnter-trigger')
			Dap.data.remove(el, 'mvi-modal-enter-trigger')

			this.$emit('hide', el)
			if (typeof this.modalComponentWatch == 'function') {
				this.modalComponentWatch.apply(this, ['hide', el])
			}
		},
		//弹出层隐藏时
		leave(el) {
			this.$emit('hidding', el)
			if (typeof this.modalComponentWatch == 'function') {
				this.modalComponentWatch.apply(this, ['hidding', el])
			}
		},
		//弹出层隐藏后
		afterLeave(el) {
			this.$emit('hidden', el)
			if (typeof this.modalComponentWatch == 'function') {
				this.modalComponentWatch.apply(this, ['hidden', el])
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-modal {
	display: block;
	position: absolute;
	left: 50%;
	top: 50%;
	margin: 0;
	padding: 0;
	width: 6rem;
	transform: translate(-50%, -50%);
	-webkit-transform: translate(-50%, -50%);
	background: transparent;

	.mvi-modal-wrapper {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: column;
		-ms-flex-direction: column;
		-webkit-flex-direction: column;
		width: 100%;
		background: #fff;
		border-radius: @radius-default;
		box-shadow: @boxshadow;
		position: relative;
	}

	.mvi-modal-title {
		display: block;
		width: 100%;
		font-weight: bold;
		font-size: @font-size-h6;
		color: @font-color-default;
		padding: @mp-md;

		&.ellipsis {
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
		}

		&.center {
			text-align: center;
		}
	}

	.mvi-modal-times {
		position: absolute;
		right: @mp-sm;
		top: @mp-sm;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		color: @font-color-mute;
		font-size: @font-size-small;
		opacity: 0.8;

		&:hover {
			cursor: pointer;
			opacity: 1;
		}
	}

	.mvi-modal-content {
		display: block;
		padding: @mp-md;
		flex: 1;
		overflow-x: hidden;
		overflow-y: auto;
		border-radius: inherit;
		font-size: @font-size-default;
		color: @font-color-default;
	}

	.mvi-modal-footer {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-end;
		align-items: center;
		border-top: 1px solid @border-color;
		padding: @mp-sm @mp-md;
		text-align: right;
		font-size: @font-size-default;
		color: @font-color-sub;
	}
}

.mvi-modal-narrow-enter-from {
	transform: translate3d(0, 0, 0) scale(1.4);
	opacity: 0;
}

.mvi-modal-scale-enter-from,
.mvi-modal-scale-leave-to,
.mvi-modal-narrow-leave-to {
	transform: translate3d(0, 0, 0) scale(0.6);
	opacity: 0;
}

.mvi-modal-translate-bottom-enter-from,
.mvi-modal-translate-bottom-leave-to {
	transform: translateY(1rem);
	opacity: 0;
}

.mvi-modal-translate-top-enter-from,
.mvi-modal-translate-top-leave-to {
	transform: translateY(-1rem);
}

.mvi-modal-translate-left-enter-from,
.mvi-modal-translate-left-leave-to {
	transform: translateX(-1rem);
}

.mvi-modal-translate-right-enter-from,
.mvi-modal-translate-right-leave-to {
	transform: translateX(1rem);
}
</style>
