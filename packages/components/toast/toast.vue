<template>
	<Overlay ref="overlay" :color="computedOverlayColor" @hidden="toastHidden" :model-value="show" :use-padding="computedUsePadding" :zIndex="computedZIndex" fade :mount-el="computedMountEl" @shown="toastShown">
		<div :class="['mvi-toast', computedMessage ? '' : 'mvi-toast-iconless']" :style="toastStyle" v-bind="$attrs">
			<div class="mvi-toast-icon">
				<Loading :color="computedColor || '#fff'" v-if="computedType == 'loading' && !computedIcon.type && !computedIcon.url" :type="0" :size="computedIcon.size" />
				<Icon v-else :type="computedIcon.type" :url="computedIcon.url" :spin="computedIcon.spin" :size="computedIcon.size" :color="computedIcon.color" />
			</div>
			<div v-if="computedMessage" class="mvi-toast-message" v-html="computedMessage"></div>
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
			//计时器
			timer: null,
			typeArray: ['success', 'error', 'loading', 'info']
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
		//弹窗移除方法
		remove: {
			type: Function,
			default: function () {
				return function () {}
			}
		},
		//弹窗初始化方法
		init: {
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
		computedUsePadding() {
			if (typeof this.usePadding == 'boolean') {
				return this.usePadding
			} else {
				return false
			}
		},
		computedType() {
			if (this.typeArray.includes(this.type)) {
				return this.type
			} else {
				return 'info'
			}
		},
		computedIcon() {
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
		computedMessage() {
			if (typeof this.message == 'string') {
				return this.message
			} else if (Dap.common.isObject(this.message)) {
				return JSON.stringify(this.message)
			} else {
				return String(this.message)
			}
		},
		computedTimeout() {
			if (Dap.number.isNumber(this.timeout) && this.timeout > 0) {
				return this.timeout
			} else {
				return -1
			}
		},
		computedZIndex() {
			if (Dap.number.isNumber(this.zIndex)) {
				return this.zIndex
			} else {
				return 1100
			}
		},
		computedOverlayColor() {
			if (typeof this.overlayColor == 'string' && this.overlayColor) {
				return this.overlayColor
			} else {
				return 'rgba(0, 10, 20, .05)'
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
		computedMountEl() {
			if (typeof this.mountEl == 'string' && this.mountEl) {
				return this.mountEl
			} else {
				return 'body'
			}
		},
		toastStyle() {
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
		defaultIconType() {
			if (this.computedType == 'success') {
				return 'success'
			} else if (this.computedType == 'error') {
				return 'error-o'
			} else if (this.computedType == 'info') {
				return 'info-o'
			} else if (this.computedType == 'loading') {
				return null
			}
		}
	},
	components: {
		Icon,
		Loading,
		Overlay
	},
	mounted() {
		this.init(this)
	},
	methods: {
		//弹窗完全显示后
		toastShown() {
			if (this.computedTimeout > 0) {
				this.timer = setTimeout(() => {
					this.show = false
				}, this.computedTimeout)
			}
		},
		//弹窗完全关闭后
		toastHidden() {
			this.clearTimer()
			this.remove()
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
	-ms-flex-direction: column;
	-webkit-flex-direction: column;
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	-webkit-transform: translate(-50%, -50%);
	width: 3rem;
	margin: 0;
	padding: @mp-md;
	border-radius: @radius-default;
	box-shadow: @boxshadow;
	-webkit-box-shadow: @boxshadow;
	background-color: rgba(0, 0, 0, 0.85);
	color: #fff;

	&.mvi-toast-iconless {
		justify-content: center;
		align-items: center;
		padding: 0;
		width: 2.4rem;
		height: 1.8rem;
	}
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
</style>
