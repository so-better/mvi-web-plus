<template>
	<teleport to="body">
		<transition :name="boxAnimation" @after-enter="afterEnter" @after-leave="afterLeave">
			<div v-show="show" v-bind="$attrs" :class="msgBoxClass" v-html="computedMessage" :style="msgBoxStyle"></div>
		</transition>
	</teleport>
</template>

<script>
import { Dap } from '../dap'
export default {
	name: 'm-msgbox',
	data() {
		return {
			show: false
		}
	},
	inheritAttrs: false,
	props: {
		//提示文本
		message: {
			default: null
		},
		//动画效果
		animation: {
			type: String,
			default: null
		},
		//自动关闭的时间
		timeout: {
			type: Number,
			default: null
		},
		//弹窗z-index
		zIndex: {
			type: Number,
			default: null
		},
		//弹窗背景色
		background: {
			type: String,
			default: null
		},
		//弹窗字体颜色
		color: {
			type: String,
			default: null
		},
		//移除方法
		remove: {
			type: Function,
			default: function () {
				return function () {}
			}
		}
	},
	computed: {
		computedMessage() {
			if (typeof this.message == 'string') {
				return this.message
			} else if (Dap.common.isObject(this.message)) {
				return JSON.stringify(this.message)
			} else {
				return String(this.message)
			}
		},
		computedAnimation() {
			if (typeof this.animation == 'string' && this.animation) {
				return this.animation
			} else {
				return 'fade'
			}
		},
		computedTimeout() {
			if (Dap.number.isNumber(this.timeout) && this.timeout > 0) {
				return this.timeout
			} else {
				return 1500
			}
		},
		computedZIndex() {
			if (Dap.number.isNumber(this.zIndex)) {
				return this.zIndex
			} else {
				return 1100
			}
		},
		computedBackground() {
			if (typeof this.background == 'string' && this.background) {
				return this.background
			} else {
				return null
			}
		},
		computedColor() {
			if (typeof this.color == 'string' && this.color) {
				return this.color
			} else {
				return null
			}
		},
		boxAnimation() {
			return 'mvi-msgbox-' + this.computedAnimation
		},
		msgBoxStyle() {
			let style = {}
			style.zIndex = this.computedZIndex
			if (this.computedBackground) {
				style.backgroundColor = this.computedBackground
			}
			if (this.computedColor) {
				style.color = this.computedColor
			}
			return style
		},
		msgBoxClass() {
			let cls = ['mvi-msgbox']
			if (this.computedAnimation == 'translate') {
				cls.push('mvi-msgbox-translate')
			}
			return cls
		}
	},
	mounted() {
		this.show = true
	},
	methods: {
		//完全显示后
		afterEnter(el) {
			if (this.computedTimeout > 0) {
				setTimeout(() => {
					this.show = false
				}, this.computedTimeout)
			}
		},
		//完全隐藏后
		afterLeave(el) {
			this.remove()
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-msgbox {
	position: fixed;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	display: block;
	width: auto;
	height: auto;
	max-width: 90%;
	word-wrap: break-word;
	border-radius: @radius-default;
	overflow: hidden;
	border: none;
	text-align: center;
	font-size: @font-size-default;
	line-height: 1.5;
	padding: @mp-sm @mp-lg;
	background-color: rgba(0, 0, 0, 0.7);
	color: #fff;
	box-shadow: @boxshadow;
	-webkit-box-shadow: @boxshadow;

	&.mvi-msgbox-translate {
		top: auto;
		bottom: 0;
		transform: translate(-50%, calc(-50% - 3rem));
	}
}

//渐入效果
.mvi-msgbox-fade-enter-from,
.mvi-msgbox-fade-leave-to {
	opacity: 0;
}

.mvi-msgbox-fade-enter-active,
.mvi-msgbox-fade-leave-active {
	transition: opacity 300ms;
	-ms-transition: opacity 300ms;
	-moz-transition: opacity 300ms;
	-webkit-transition: opacity 300ms;
}

//缩放效果
.mvi-msgbox-scale-enter-from {
	opacity: 0;
	transform: translate3d(-50%, -50%, 0) scale(0.5);
}

.mvi-msgbox-scale-leave-to {
	opacity: 0;
}

.mvi-msgbox-scale-enter-active,
.mvi-msgbox-scale-leave-active {
	transition: transform 300ms, opacity 300ms;
	-ms-transition: transform 300ms, opacity 300ms;
	-moz-transition: transform 300ms, opacity 300ms;
	-webkit-transition: transform 300ms, opacity 300ms;
}

//平移效果
.mvi-msgbox-translate-enter-from {
	opacity: 0;
	transform: translate(-50%, -50%) !important;
}

.mvi-msgbox-translate-enter-active {
	transition: transform 300ms, opacity 300ms;
	-ms-transition: transform 300ms, opacity 300ms;
	-moz-transition: transform 300ms, opacity 300ms;
	-webkit-transition: transform 300ms, opacity 300ms;
}

.mvi-msgbox-translate-leave-to {
	opacity: 0;
}

.mvi-msgbox-translate-leave-active {
	transition: opacity 300ms;
	-ms-transition: opacity 300ms;
	-moz-transition: opacity 300ms;
	-webkit-transition: opacity 300ms;
}
</style>
