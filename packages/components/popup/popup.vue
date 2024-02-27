<template>
	<Overlay ref="overlay" v-model="show" @show="overlayShow" @hide="overlayHide" :use-padding="usePadding" :z-index="zIndex" :color="overlayColor" :timeout="timeout" :mount-el="mountEl" :closable="closable">
		<transition :name="'mvi-slide-' + placement" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
			<!-- 弹出层 -->
			<div v-if="firstShow" v-show="popupShow" :class="popupClass" :style="popupStyle" v-bind="$attrs">
				<!-- 关闭图标 -->
				<div v-if="showTimes" :class="['mvi-popup-times', timesPlacement]">
					<Icon @click="show = false" type="times" />
				</div>
				<!-- 正文内容 -->
				<div class="mvi-popup-content" :style="{ padding: __contentPadding ? '' : 0 }">
					<slot></slot>
				</div>
			</div>
		</transition>
	</Overlay>
</template>

<script>
import Dap from 'dap-util'
import { Overlay } from '../overlay'
import { Icon } from '../icon'
export default {
	name: 'm-popup',
	data() {
		return {
			//popup弹窗是否显示
			popupShow: false,
			//popup弹窗是否渲染
			firstShow: false
		}
	},
	emits: ['update:modelValue', 'show', 'showing', 'shown', 'hide', 'hidding', 'hidden'],
	inheritAttrs: false,
	props: {
		//显示与否
		modelValue: {
			type: Boolean,
			default: false
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
		//动画时长
		timeout: {
			type: Number,
			default: 200
		},
		//弹窗的位置
		placement: {
			type: String,
			default: 'bottom',
			validator(value) {
				return ['left', 'top', 'bottom', 'right'].includes(value)
			}
		},
		//弹窗是否显示圆角
		round: {
			type: Boolean,
			default: false
		},
		//弹窗显示的宽度或者高度
		width: {
			type: String,
			default: null
		},
		//是否显示关闭图标
		showTimes: {
			type: Boolean,
			default: false
		},
		//关闭图标位置
		timesPlacement: {
			type: String,
			default: 'top-right',
			validator(value) {
				return ['top-right', 'top-left', 'bottom-right', 'bottom-left'].includes(value)
			}
		},
		//挂载元素
		mountEl: {
			type: String,
			default: null
		},
		//是否考虑滚动条影响
		usePadding: {
			type: Boolean,
			default: false
		},
		//是否设置内容的padding
		__contentPadding: {
			type: Boolean,
			default: true
		}
	},
	computed: {
		$$el() {
			return this.$refs.overlay.$$el
		},
		show: {
			get() {
				return this.modelValue
			},
			set(value) {
				this.$emit('update:modelValue', value)
			}
		},
		//弹出层类
		popupClass() {
			let cls = ['mvi-popup', this.placement]
			if (this.round) {
				cls.push('round')
			}
			if (this.showTimes) {
				if (this.timesPlacement == 'top-right' || this.timesPlacement == 'top-left') {
					cls.push('padding-top')
				} else if (this.timesPlacement == 'bottom-right' || this.timesPlacement == 'bottom-left') {
					cls.push('padding-bottom')
				}
			}
			return cls
		},
		//弹出层样式
		popupStyle() {
			let style = {}
			if (this.placement == 'left' || this.placement == 'right') {
				if (this.width) {
					style.width = this.width
				}
			} else if (this.placement == 'top' || this.placement == 'bottom') {
				if (this.width) {
					style.height = this.width
				}
			}
			if (Dap.number.isNumber(this.zIndex)) {
				style.zIndex = this.zIndex + 10
			}
			style.transition = 'all ' + this.timeout + 'ms'
			return style
		}
	},
	components: {
		Icon,
		Overlay
	},
	methods: {
		//遮罩层显示前
		overlayShow() {
			if (!this.firstShow) {
				this.firstShow = true
			}
			this.popupShow = true
		},
		//遮罩层隐藏之前
		overlayHide() {
			this.popupShow = false
		},
		//弹出层显示前
		beforeEnter(el) {
			//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
			if (Dap.data.get(el, 'mvi-popup-beforeEnter-trigger')) {
				return
			}
			Dap.data.set(el, 'mvi-popup-beforeEnter-trigger', true)

			this.$emit('show', el)
			if (typeof this.popupComponentWatch == 'function') {
				this.popupComponentWatch.apply(this, ['show', el])
			}
		},
		//弹出层显示时
		enter(el) {
			//解决v-if和v-show作用在同一元素上时触发两次钩子函数的bug
			if (Dap.data.get(el, 'mvi-popup-enter-trigger')) {
				return
			}
			Dap.data.set(el, 'mvi-popup-enter-trigger', true)

			this.$emit('showing', el)
			if (typeof this.popupComponentWatch == 'function') {
				this.popupComponentWatch.apply(this, ['showing', el])
			}
		},
		//弹出层显示后
		afterEnter(el) {
			this.$emit('shown', el)
			if (typeof this.popupComponentWatch == 'function') {
				this.popupComponentWatch.apply(this, ['shown', el])
			}
		},
		//弹出层隐藏前
		beforeLeave(el) {
			//清除标记
			Dap.data.remove(el, 'mvi-popup-beforeEnter-trigger')
			Dap.data.remove(el, 'mvi-popup-enter-trigger')

			this.$emit('hide', el)
			if (typeof this.popupComponentWatch == 'function') {
				this.popupComponentWatch.apply(this, ['hide', el])
			}
		},
		//弹出层隐藏时
		leave(el) {
			this.$emit('hidding', el)
			if (typeof this.popupComponentWatch == 'function') {
				this.popupComponentWatch.apply(this, ['hidding', el])
			}
		},
		//弹出层隐藏后
		afterLeave(el) {
			this.$emit('hidden', el)
			if (typeof this.popupComponentWatch == 'function') {
				this.popupComponentWatch.apply(this, ['hidden', el])
			}
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-popup {
	display: block;
	position: absolute;
	background-color: #fff;
	transition-timing-function: linear;
	overflow: hidden;
	color: @font-color-default;
	font-size: @font-size-default;

	&.padding-top {
		padding: @small-height 0 0 0;
	}

	&.padding-bottom {
		padding: 0 0 @small-height 0;
	}

	&.left {
		left: 0;
		right: auto;
		top: 0;
		bottom: auto;
		height: 100%;
		max-width: 100%;

		&.round {
			border-top-right-radius: 0.4rem;
			border-bottom-right-radius: 0.4rem;
		}
	}

	&.right {
		left: auto;
		right: 0;
		top: 0;
		bottom: auto;
		height: 100%;
		max-width: 100%;

		&.round {
			border-top-left-radius: 0.4rem;
			border-bottom-left-radius: 0.4rem;
		}
	}

	&.top {
		left: 0;
		right: auto;
		top: 0;
		bottom: auto;
		width: 100%;
		max-height: 100%;

		&.round {
			border-bottom-left-radius: 0.4rem;
			border-bottom-right-radius: 0.4rem;
		}
	}

	&.bottom {
		left: 0;
		right: auto;
		top: auto;
		bottom: 0;
		width: 100%;
		max-height: 100%;

		&.round {
			border-top-left-radius: 0.4rem;
			border-top-right-radius: 0.4rem;
		}
	}

	.mvi-popup-times {
		display: flex;
		justify-content: center;
		align-items: center;
		position: absolute;
		height: @small-height;
		padding: 0 @mp-sm;
		cursor: pointer;
		font-size: @font-size-default;
		color: @font-color-mute;
		line-height: 1;
		opacity: 0.8;

		&:hover {
			opacity: 1;
		}

		&.top-left {
			left: 0;
			top: 0;
		}
		&.top-right {
			right: 0;
			top: 0;
		}
		&.bottom-left {
			left: 0;
			bottom: 0;
		}
		&.bottom-right {
			right: 0;
			bottom: 0;
		}
	}

	.mvi-popup-content {
		width: 100%;
		height: 100%;
		overflow: auto;
		padding: 0;
	}
}

.mvi-slide-left-enter-from,
.mvi-slide-left-leave-to {
	transform: translateX(-100%);
}

.mvi-slide-right-enter-from,
.mvi-slide-right-leave-to {
	transform: translateX(100%);
}

.mvi-slide-top-enter-from,
.mvi-slide-top-leave-to {
	transform: translateY(-100%);
}

.mvi-slide-bottom-enter-from,
.mvi-slide-bottom-leave-to {
	transform: translateY(100%);
}
</style>
