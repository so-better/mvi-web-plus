<template>
	<div :class="['mvi-badge', block ? 'block' : '']">
		<slot></slot>
		<span v-if="dot && show" class="mvi-badge-el mvi-badge-dot" :data-placement="placement" :style="badgeStyle"></span>
		<span v-else-if="badgeShow" class="mvi-badge-el" :data-placement="placement" :style="badgeStyle">{{ content }}</span>
	</div>
</template>

<script>
import { Dap } from '../dap'
export default {
	name: 'm-badge',
	props: {
		//徽标内容
		content: {
			type: [String, Number],
			default: null
		},
		//徽标位置
		placement: {
			type: String,
			default: 'top-right',
			validator(value) {
				return ['top-right', 'top-left', 'bottom-left', 'bottom-right'].includes(value)
			}
		},
		//是否圆点
		dot: {
			type: Boolean,
			default: false
		},
		//徽标是否显示
		show: {
			type: Boolean,
			default: true
		},
		//徽标偏移值
		offset: {
			type: Array,
			default: function () {
				return null
			}
		},
		//背景色
		background: {
			type: String,
			default: null
		},
		//字体颜色
		color: {
			type: String,
			default: null
		},
		//是否块级
		block: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		badgeStyle() {
			let style = {}
			if (this.background) {
				style.background = this.background
			}
			if (this.color) {
				style.color = this.color
			}
			if (this.offset) {
				if (this.offset[0]) {
					if (this.placement == 'top-right' || this.placement == 'bottom-right') {
						style.marginRight = this.offset[0]
					} else if (this.placement == 'top-left' || this.placement == 'bottom-left') {
						style.marginLeft = this.offset[0]
					}
				}
				if (this.offset[1]) {
					if (this.placement == 'top-right' || this.placement == 'top-left') {
						style.marginTop = this.offset[1]
					} else if (this.placement == 'bottom-right' || this.placement == 'bottom-left') {
						style.marginBottom = this.offset[1]
					}
				}
			}
			return style
		},
		badgeShow() {
			const badgeExist = Dap.number.isNumber(this.content) || this.content
			if (badgeExist && this.show) {
				return true
			}
			return false
		}
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-badge {
	position: relative;
	display: inline-block;

	&.block {
		display: block;
		width: 100%;
	}

	.mvi-badge-el {
		position: absolute;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		background: @error-normal;
		color: #fff;
		padding: 0 @mp-xs;
		border-radius: 999rem;
		font-size: @font-size-small;
		line-height: 1;
		min-width: 0.34rem;
		height: 0.34rem;
		z-index: 40;

		&[data-placement='top-right'] {
			left: auto;
			bottom: auto;
			right: 0;
			top: 0;
			transform: translate(50%, -50%);
		}

		&[data-placement='top-left'] {
			left: 0;
			top: 0;
			right: auto;
			bottom: auto;
			transform: translate(-50%, -50%);
		}

		&[data-placement='bottom-right'] {
			right: 0;
			bottom: 0;
			left: auto;
			top: auto;
			transform: translate(50%, 50%);
		}

		&[data-placement='bottom-left'] {
			left: 0;
			bottom: 0;
			right: auto;
			top: auto;
			transform: translate(-50%, 50%);
		}

		&.mvi-badge-dot {
			padding: 0;
			border-radius: 50%;
			min-width: 0;
			width: 0.18rem;
			height: 0.18rem;
		}
	}
}
</style>
