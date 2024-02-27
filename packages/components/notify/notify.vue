<template>
	<teleport to="body">
		<transition name="mvi-notify" @after-leave="afterLeave" @after-enter="afterEnter">
			<div v-show="show" class="mvi-notify" :class="[cmpType]" :style="notifyStyle">
				<div class="mvi-notify-content">
					<Icon v-if="parseIcon(icon).type || parseIcon(icon).url" :type="parseIcon(icon).type" :url="parseIcon(icon).url" :spin="parseIcon(icon).spin" :size="parseIcon(icon).size" :color="parseIcon(icon).color" />
					<span v-text="cmpMessage"></span>
				</div>
			</div>
		</transition>
	</teleport>
</template>

<script>
import Dap from 'dap-util'
import { Icon } from '../icon'
export default {
	name: 'm-notify',
	data() {
		return {
			//计时器
			timer: null,
			//是否显示
			show: false
		}
	},
	props: {
		//提示类型
		type: {
			type: String,
			default: null
		},
		//展示文字
		message: {
			type: String,
			default: null
		},
		//字体颜色
		color: {
			type: String,
			default: null
		},
		//背景色
		background: {
			type: String,
			default: null
		},
		//层级
		zIndex: {
			type: Number,
			default: null
		},
		//自动关闭间隔
		timeout: {
			type: Number,
			default: null
		},
		//图标
		icon: {
			type: [String, Object],
			default: null
		},
		//移除方法
		__remove: {
			type: Function,
			default: function () {
				return function () {}
			}
		},
		//初始化方法
		__init: {
			type: Function,
			default: function () {
				return function () {}
			}
		}
	},
	computed: {
		//类型
		cmpType() {
			let arr = ['success', 'info', 'primary', 'error', 'warn']
			if (arr.includes(this.type)) {
				return this.type
			}
			return 'success'
		},
		//消息文本
		cmpMessage() {
			if (typeof this.message == 'string') {
				return this.message
			}
			if (Dap.common.isObject(this.message)) {
				return JSON.stringify(this.message)
			}
			return String(this.message)
		},
		//自定义文字颜色
		cmpColor() {
			if (typeof this.color == 'string') {
				return this.color
			}
			return null
		},
		//自定义背景色
		cmpBackground() {
			if (typeof this.background == 'string') {
				return this.background
			}
			return null
		},
		//自定义zIndex
		cmpZIndex() {
			if (Dap.number.isNumber(this.zIndex)) {
				return this.zIndex
			}
			return 1100
		},
		//自动关闭时间
		cmpTimeout() {
			if (Dap.number.isNumber(this.timeout)) {
				return this.timeout
			}
			return 1500
		},
		//转换图标
		parseIcon() {
			return params => {
				let icon = {
					spin: false,
					type: null,
					url: null,
					color: null,
					size: null
				}
				if (Dap.common.isObject(params)) {
					if (typeof params.spin == 'boolean') {
						icon.spin = params.spin
					}
					if (typeof params.type == 'string') {
						icon.type = params.type
					}
					if (typeof params.url == 'string') {
						icon.url = params.url
					}
					if (typeof params.color == 'string') {
						icon.color = params.color
					}
					if (typeof params.size == 'string') {
						icon.size = params.size
					}
				} else if (typeof params == 'string') {
					icon.type = params
				}
				return icon
			}
		},
		//通知样式
		notifyStyle() {
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
		Icon
	},
	mounted() {
		this.show = true
		this.__init(this)
	},
	methods: {
		//完全显示后
		afterEnter() {
			if (this.cmpTimeout > 0) {
				this.timer = setTimeout(() => {
					this.show = false
				}, this.cmpTimeout)
			}
		},
		//完全隐藏后
		afterLeave() {
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

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-notify {
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: @small-height;
	position: fixed;
	top: 0;
	left: 0;
	margin: 0;
	padding: 0 @mp-sm;

	&.success {
		background-color: @success-normal;
		color: #fff;
	}

	&.info {
		background-color: @info-normal;
		color: #fff;
	}

	&.primary {
		background-color: @primary-normal;
		color: #fff;
	}

	&.error {
		background-color: @error-normal;
		color: #fff;
	}

	&.warn {
		background-color: @warn-normal;
		color: #fff;
	}

	.mvi-notify-content {
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;

		& > .mvi-icon {
			margin-right: @mp-sm;
		}

		& > span {
			vertical-align: middle;
		}
	}
}

.mvi-notify-enter-active,
.mvi-notify-leave-active {
	transition: all 300ms;
	-webkit-transition: all 300ms;
	-moz-transition: all 300ms;
	-ms-transition: all 300ms;
}

.mvi-notify-enter-from,
.mvi-notify-leave-to {
	opacity: 0;
	transform: translateY(-100%);
	-webkit-transform: translateY(-100%);
	-moz-transform: translateY(-100%);
	-ms-transform: translateY(-100%);
}
</style>
