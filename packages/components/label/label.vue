<template>
	<transition v-if="closable" name="mvi-label">
		<div v-if="show" :class="labelClass">
			<slot></slot>
			<span class="mvi-label-closable" @click="closeLabel">
				<Icon type="times" />
			</span>
		</div>
	</transition>
	<div v-else :class="labelClass">
		<slot></slot>
	</div>
</template>

<script>
import { Icon } from '../icon'
export default {
	name: 'm-label',
	data() {
		return {
			show: true
		}
	},
	props: {
		//标签样式
		type: {
			type: String,
			default: 'default',
			validator(value) {
				return ['default', 'error', 'info', 'primary', 'success', 'warn'].includes(value)
			}
		},
		//标签大小
		size: {
			type: String,
			default: 'medium',
			validator(value) {
				return ['medium', 'large'].includes(value)
			}
		},
		//是否为朴素样式
		plain: {
			type: Boolean,
			default: false
		},
		//是否为圆角样式
		round: {
			type: Boolean,
			default: false
		},
		//是否为标记样式
		mark: {
			type: Boolean,
			default: false
		},
		//是否可关闭
		closable: {
			type: Boolean,
			default: false
		},
		//标记样式时是否反向
		reverse: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		labelClass() {
			let cls = ['mvi-label']
			if (this.size) {
				cls.push(this.size)
			}
			if (this.type) {
				cls.push(this.type)
			}
			if (this.plain) {
				cls.push('plain')
			}
			if (this.round) {
				cls.push('round')
			}
			if (this.mark) {
				cls.push('mark')
				if (this.reverse) {
					cls.push('reverse')
				}
			}
			return cls
		}
	},
	components: {
		Icon
	},
	methods: {
		closeLabel() {
			this.show = false
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-label {
	display: inline-flex;
	display: -webkit-inline-flex;
	justify-content: flex-start;
	align-items: center;
	border-radius: @radius-default / 2;
	border: 1px solid transparent;
	margin: 0;

	&.medium {
		padding: @mp-xs @mp-sm;
		font-size: @font-size-small;
		line-height: 1;
	}

	&.large {
		padding: @mp-sm @mp-md;
		font-size: @font-size-default;
		line-height: 1;
	}

	&.default {
		background-color: rgba(@border-color, 0.05);
		border-color: @border-color;
		color: @font-color-sub;
	}

	&.success {
		background-color: @success-normal;
		border-color: @success-normal;
		color: #fff;

		&.plain {
			border-color: @success-normal;
			color: @success-normal;
			background-color: rgba(@success-normal, 0.05);
		}
	}

	&.warn {
		background-color: @warn-normal;
		border-color: @warn-normal;
		color: #fff;

		&.plain {
			background-color: rgba(@warn-normal, 0.05);
			border-color: @warn-normal;
			color: @warn-normal;
		}
	}

	&.error {
		background-color: @error-normal;
		border-color: @error-normal;
		color: #fff;

		&.plain {
			background-color: rgba(@error-normal, 0.05);
			border-color: @error-normal;
			color: @error-normal;
		}
	}

	&.info {
		background-color: @info-normal;
		border-color: @info-normal;
		color: #fff;

		&.plain {
			background-color: rgba(@info-normal, 0.05);
			border-color: @info-normal;
			color: @info-normal;
		}
	}

	&.primary {
		background-color: @primary-normal;
		border-color: @primary-normal;
		color: #fff;

		&.plain {
			background-color: rgba(@primary-normal, 0.05);
			border-color: @primary-normal;
			color: @primary-normal;
		}
	}

	&.round {
		border-radius: @radius-round;
	}

	&.mark {
		border-radius: 0 @radius-round @radius-round 0;

		&.reverse {
			border-radius: @radius-round 0 0 @radius-round;
		}
	}

	&.plain {
		background-color: #fff;
	}

	.mvi-label-closable {
		display: inline-block;
		margin-left: @mp-sm;
		font-size: 0.8em;
		opacity: 0.8;

		&:hover {
			cursor: pointer;
			opacity: 1;
		}
	}
}

.mvi-label-enter-active,
.mvi-label-leave-active {
	transition: opacity 300ms;
	-webkit-transition: opacity 300ms;
}

.mvi-label-enter-from,
.mvi-label-leave-to {
	opacity: 0;
}
</style>
