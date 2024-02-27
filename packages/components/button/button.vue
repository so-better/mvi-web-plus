<template>
	<Button :disabled="disabled || null" :class="btnClass">
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
		color: @font-color-default;
		border-color: @border-color;
		background: #fff;
	}

	&.warn {
		background: @warn-normal;
		border-color: @warn-normal;
		color: #fff;

		&.plain {
			color: @warn-normal;
			border-color: @warn-normal;
			background: #fff;

			&.active:active::before {
				.mvi-active(@warn-normal);
			}
		}
	}

	&.error {
		background: @error-normal;
		border-color: @error-normal;
		color: #fff;

		&.plain {
			color: @error-normal;
			border-color: @error-normal;
			background: #fff;

			&.active:active::before {
				.mvi-active(@error-normal);
			}
		}
	}

	&.success {
		background: @success-normal;
		border-color: @success-normal;
		color: #fff;

		&.plain {
			color: @success-normal;
			border-color: @success-normal;
			background: #fff;

			&.active:active::before {
				.mvi-active(@success-normal);
			}
		}
	}

	&.info {
		background: @info-normal;
		border-color: @info-normal;
		color: #fff;

		&.plain {
			color: @info-normal;
			border-color: @info-normal;
			background: #fff;

			&.active:active::before {
				.mvi-active(@info-normal);
			}
		}
	}

	&.primary {
		background: @primary-normal;
		border-color: @primary-normal;
		color: #fff;

		&.plain {
			color: @primary-normal;
			border-color: @primary-normal;
			background: #fff;
			&.active:active::before {
				.mvi-active(@primary-normal);
			}
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
