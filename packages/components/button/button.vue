<template>
	<Button :disabled="disabled || null" :class="btnClass" :style="btnStyle">
		<slot name="loading" v-if="loading && $slots.loading"></slot>
		<template v-else-if="loading">
			<Icon :type="parseIcon(loadIcon).type" :color="parseIcon(loadIcon).color" :url="parseIcon(loadIcon).url" :spin="parseIcon(loadIcon).spin" :size="parseIcon(loadIcon).size" />
			<span class="mvi-button-load-text" v-if="loadText">{{ loadText }}</span>
		</template>
		<slot v-else></slot>
	</Button>
</template>

<script>
import { h } from 'vue'
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-button',
	props: {
		//主题类型
		type: {
			type: String,
			default: 'default',
			validator(value) {
				return ['default', 'info', 'success', 'error', 'warn', 'primary'].includes(value)
			}
		},
		//尺寸
		size: {
			type: String,
			default: 'medium',
			validator(value) {
				return ['mini', 'small', 'medium', 'large'].includes(value)
			}
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//原生按钮type
		nativeType: {
			type: String,
			default: 'button'
		},
		//是否显示加载状态
		loading: {
			type: Boolean,
			default: false
		},
		//加载文字
		loadText: {
			type: String,
			default: 'loading...'
		},
		//是否独占一行
		block: {
			type: Boolean,
			default: false
		},
		//渲染标签
		tag: {
			type: String,
			default: 'button'
		},
		//是否朴素按钮
		plain: {
			type: Boolean,
			default: false
		},
		//自定义按钮颜色
		color: {
			type: String,
			default: null
		},
		//自定义文字颜色
		subColor: {
			type: String,
			default: null
		},
		//圆形按钮
		round: {
			type: Boolean,
			default: false
		},
		//方形按钮
		square: {
			type: Boolean,
			default: false
		},
		//是否显示点击态
		active: {
			type: Boolean,
			default: true
		},
		//加载图标
		loadIcon: {
			type: [String, Object],
			default: function () {
				return {
					type: 'load-e',
					spin: true
				}
			}
		}
	},
	computed: {
		parseIcon() {
			return param => {
				let icon = {
					spin: false,
					type: null,
					url: null,
					color: null,
					size: null
				}
				if (Dap.common.isObject(param)) {
					if (typeof param.spin == 'boolean') {
						icon.spin = param.spin
					}
					if (typeof param.type == 'string') {
						icon.type = param.type
					}
					if (typeof param.url == 'string') {
						icon.url = param.url
					}
					if (typeof param.color == 'string') {
						icon.color = param.color
					}
					if (typeof param.size == 'string') {
						icon.size = param.size
					}
				} else if (typeof param == 'string') {
					icon.type = param
				}
				return icon
			}
		},
		btnStyle() {
			let obj = {}
			//单色
			if (this.plain) {
				if (this.color) {
					obj.color = this.color
					obj.borderColor = this.color
					obj.background = this.subColor || '#fff'
				}
			} else {
				if (this.color) {
					obj.background = this.color
					obj.borderColor = this.color
					obj.color = this.subColor || '#fff'
				}
			}
			return obj
		},
		btnClass() {
			let cls = ['mvi-button']
			if (this.type) {
				cls.push(this.type)
			}
			if (this.size) {
				cls.push(this.size)
			}
			if (this.round) {
				cls.push('round')
			} else if (this.square) {
				cls.push('square')
			}
			if (this.block) {
				cls.push('block')
			}
			if (this.plain) {
				cls.push('plain')
			}
			if (this.active && !this.disabled) {
				cls.push('active')
			}
			if (this.loading) {
				cls.push('loading')
			}
			return cls
		}
	},
	components: {
		Button: {
			render() {
				let attrs = {}
				if (this.$parent.tag.toLocaleUpperCase() == 'BUTTON') {
					attrs.type = this.$parent.nativeType
				}
				return h(this.$parent.tag, attrs, {
					default: this.$slots.default
				})
			}
		},
		Icon
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-button {
	position: relative;
	display: inline-flex;
	display: -webkit-inline-flex;
	justify-content: center;
	align-items: center;
	vertical-align: middle;
	text-align: center;
	white-space: nowrap;
	border: 1px solid transparent;
	background: none;
	outline: 0;
	touch-action: manipulation;
	appearance: none;
	-webkit-appearance: none;
	-webkit-user-select: none;
	-moz-user-select: none;
	user-select: none;
	margin: 0;
	padding: 0;
	border-radius: @radius-default;
	cursor: pointer;

	&.default {
		background: #fff;
		border-color: @border-color;
		color: @font-color-default;
	}

	&.warn {
		background: @warn-normal;
		border-color: @warn-normal;
		color: #fff;

		&.plain {
			border-color: @warn-normal;
			background: #fff;
			color: @warn-normal;
		}
	}

	&.error {
		background: @error-normal;
		color: #fff;
		border-color: @error-normal;

		&.plain {
			border-color: @error-normal;
			background: #fff;
			color: @error-normal;
		}
	}

	&.success {
		background: @success-normal;
		border-color: @success-normal;
		color: #fff;

		&.plain {
			border-color: @success-normal;
			background: #fff;
			color: @success-normal;
		}
	}

	&.info {
		background: @info-normal;
		color: #fff;
		border-color: @info-normal;

		&.plain {
			border-color: @info-normal;
			color: @info-normal;
			background: #fff;
		}
	}

	&.primary {
		background: @primary-normal;
		color: #fff;
		border-color: @primary-normal;

		&.plain {
			background: #fff;
			color: @primary-normal;
			border-color: @primary-normal;
		}
	}

	&.mini {
		height: @mini-height;
		padding: 0 @mp-xs;
		font-size: @font-size-small;
	}

	&.small {
		font-size: @font-size-default;
		height: @small-height;
		padding: 0 @mp-sm;
	}

	&.medium {
		font-size: @font-size-h6;
		height: @medium-height;
		padding: 0 @mp-md;
	}

	&.large {
		font-size: @font-size-h5;
		height: @large-height;
		padding: 0 @mp-lg;
	}

	&.round {
		border-radius: @radius-round;
	}

	&.square {
		border-radius: 0;
	}

	&.active:active::before {
		.mvi-active();
	}

	&[disabled] {
		opacity: 0.6;
		touch-action: none;
	}

	&.block {
		display: flex;
		display: -webkit-flex;
		width: 100%;
	}

	&.loading {
		pointer-events: none;
		touch-action: none;
		opacity: 0.8;
	}

	.mvi-button-load-text {
		margin-left: @mp-sm;
	}
}
</style>
