<template>
	<teleport to="body">
		<transition :name="'mvi-msgbox-' + cmpAnimation" @after-enter="afterEnter" @after-leave="afterLeave">
			<div v-show="show" v-bind="$attrs" class="mvi-msgbox" :class="{ 'mvi-msgbox-translate': cmpAnimation == 'translate' }" v-text="cpmMessage" :style="msgboxStyle"></div>
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
		__remove: {
			type: Function,
			default: function () {
				return function () {}
			}
		}
	},
	computed: {
		cpmMessage() {
			if (typeof this.message == 'string') {
				return this.message
			}
			if (Dap.common.isObject(this.message)) {
				return JSON.stringify(this.message)
			}
			return String(this.message)
		},
		cmpAnimation() {
			if (typeof this.animation == 'string' && this.animation) {
				return this.animation
			}
			return 'fade'
		},
		cmpTimeout() {
			if (Dap.number.isNumber(this.timeout)) {
				return this.timeout
			}
			return 1500
		},
		cmpZIndex() {
			if (Dap.number.isNumber(this.zIndex)) {
				return this.zIndex
			}
			return 1100
		},
		cmpBackground() {
			if (typeof this.background == 'string' && this.background) {
				return this.background
			}
			return null
		},
		cmpColor() {
			if (typeof this.color == 'string' && this.color) {
				return this.color
			}
			return null
		},
		msgboxStyle() {
			let style = {
				zIndex: this.cmpZIndex
			}
			if (this.cmpBackground) {
				style.backgroundColor = this.cmpBackground
			}
			if (this.cmpColor) {
				style.color = this.cmpColor
			}
			return style
		}
	},
	mounted() {
		this.show = true
	},
	methods: {
		//完全显示后
		afterEnter() {
			if (this.cmpTimeout > 0) {
				setTimeout(() => {
					this.show = false
				}, this.cmpTimeout)
			}
		},
		//完全隐藏后
		afterLeave() {
			this.__remove()
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
