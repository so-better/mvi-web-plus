<template>
	<Overlay ref="overlay" :color="cmpOverlayColor" @hidden="toastHidden" v-model="show" :use-padding="cmpUsePadding" :zIndex="cmpZIndex" fade :mount-el="cmpMountEl" @shown="toastShown">
		<div :class="['mvi-toast', cmpMessage ? '' : 'iconless', cmpShadow ? 'shadow' : '']" :style="toastStyle" v-bind="$attrs">
			<div class="mvi-toast-icon">
				<Loading :color="cmpColor" v-if="cmpType == 'loading' && !cmpIcon.type && !cmpIcon.url" :size="cmpIcon.size" />
				<Icon v-else :type="cmpIcon.type" :url="cmpIcon.url" :spin="cmpIcon.spin" :size="cmpIcon.size" :color="cmpIcon.color" />
			</div>
			<div v-if="cmpMessage" class="mvi-toast-message" v-html="cmpMessage"></div>
		</div>
	</Overlay>
</template>

<script>
import { Dap } from '../dap'
import { Overlay } from '../overlay'
import { Loading } from '../loading'
import { Icon } from '../icon'
export default {
	name: 'm-toast',
	data() {
		return {
			show: true,
			timer: null
		}
	},
	inheritAttrs: false,
	props: {
		//弹窗类型，取值为success/error/loading/info
		type: {
			type: String,
			default: null
		},
		//显示文本
		message: {
			default: null
		},
		//弹窗自动关闭的时间，默认不自动关闭
		timeout: {
			type: Number,
			default: null
		},
		//遮罩层背景色
		overlayColor: {
			type: String,
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
		//遮罩层z-index
		zIndex: {
			type: Number,
			default: null
		},
		//是否考虑滚动条
		usePadding: {
			type: Boolean,
			default: null
		},
		//自定义显示的图标
		icon: {
			type: [String, Object],
			default: null
		},
		//挂载元素
		mountEl: {
			type: String,
			default: null
		},
		//是否显示阴影
		shadow: {
			type: Boolean,
			default: null
		},
		//弹窗移除方法
		__remove: {
			type: Function,
			default: function () {
				return function () {}
			}
		},
		//弹窗初始化方法
		__init: {
			type: Function,
			default: function () {
				return function () {}
			}
		}
	},
	computed: {
		$$el() {
			return this.$refs.overlay.$$el
		},
		cmpUsePadding() {
			if (typeof this.usePadding == 'boolean') {
				return this.usePadding
			}
			return false
		},
		cmpType() {
			if (['success', 'error', 'loading', 'info'].includes(this.type)) {
				return this.type
			}
			return 'info'
		},
		defaultIconType() {
			if (this.cmpType == 'success') {
				return 'success'
			}
			if (this.cmpType == 'error') {
				return 'error-o'
			}
			if (this.cmpType == 'info') {
				return 'info-o'
			}
			if (this.cmpType == 'loading') {
				return null
			}
		},
		cmpIcon() {
			//默认图标
			let icon = {
				type: this.defaultIconType,
				url: null,
				spin: false,
				size: '0.72rem',
				color: null
			}
			if (typeof this.icon == 'string' && this.icon) {
				icon.type = this.icon
			} else if (Dap.common.isObject(this.icon)) {
				if (typeof this.icon.type == 'string' && this.icon.type) {
					icon.type = this.icon.type
				}
				if (typeof this.icon.url == 'string' && this.icon.url) {
					icon.url = this.icon.url
				}
				if (typeof this.icon.spin == 'boolean') {
					icon.spin = this.icon.spin
				}
				if (typeof this.icon.size == 'string' && this.icon.size) {
					icon.size = this.icon.size
				}
				if (typeof this.icon.color == 'string' && this.icon.color) {
					icon.color = this.icon.color
				}
			}
			return icon
		},
		cmpMessage() {
			if (typeof this.message == 'string' && this.message) {
				return this.message
			}
			if (Dap.common.isObject(this.message)) {
				return JSON.stringify(this.message)
			}
			if (this.message == undefined || this.message == null) {
				return ''
			}
			return String(this.message)
		},
		cmpTimeout() {
			if (Dap.number.isNumber(this.timeout) && this.timeout > 0) {
				return this.timeout
			}
			return 0
		},
		cmpZIndex() {
			if (Dap.number.isNumber(this.zIndex)) {
				return this.zIndex
			}
			return 1100
		},
		cmpOverlayColor() {
			if (typeof this.overlayColor == 'string' && this.overlayColor) {
				return this.overlayColor
			}
			return 'rgba(0, 10, 20, .05)'
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
			return '#fff'
		},
		cmpMountEl() {
			if (typeof this.mountEl == 'string' && this.mountEl) {
				return this.mountEl
			}
			return 'body'
		},
		cmpShadow() {
			if (typeof this.shadow == 'boolean') {
				return this.shadow
			}
			return true
		},
		toastStyle() {
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
	components: {
		Icon,
		Loading,
		Overlay
	},
	mounted() {
		this.__init(this)
	},
	methods: {
		//弹窗完全显示后
		toastShown() {
			if (this.cmpTimeout > 0) {
				this.timer = setTimeout(() => {
					this.show = false
				}, this.cmpTimeout)
			}
		},
		//弹窗完全关闭后
		toastHidden() {
			this.clearTimer()
			this.__remove()
		},
		//清除计时器
		clearTimer() {
			if (this.timer) {
				clearTimeout(this.timer)
				this.timer = null
			}
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-toast {
	display: flex;
	display: -webkit-flex;
	justify-content: flex-start;
	flex-direction: column;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	min-width: 3rem;
	max-width: 5rem;
	margin: 0;
	padding: @mp-md;
	border-radius: @radius-default;
	background-color: rgba(0, 0, 0, 0.85);
	color: #fff;

	&.iconless {
		justify-content: center;
		align-items: center;
		padding: 0;
		width: 2.4rem;
		height: 1.8rem;
	}

	&.shadow {
		box-shadow: @boxshadow;
	}

	.mvi-toast-icon {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	.mvi-toast-message {
		display: block;
		width: 100%;
		text-align: center;
		font-size: @font-size-default;
		margin-top: @mp-sm;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
	}
}
</style>
