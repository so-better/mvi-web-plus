<template>
	<!-- 进度条 -->
	<div :class="progressClass" :style="progressStyle">
		<!-- 进度条进度 -->
		<div class="mvi-progress-bar" :style="progressBarStyle">
			<div v-if="showTip" class="mvi-progress-tooltip" :style="tipStyle">
				<slot name="tip" v-if="$slots.tip" :value="value"></slot>
				<span v-else v-text="cmpText"></span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'm-progress',
	props: {
		//当前进度值
		value: {
			type: Number,
			default: 0
		},
		//最大值
		max: {
			type: Number,
			default: 100
		},
		//最小值
		min: {
			type: Number,
			default: 0
		},
		//进度条粗细
		strokeWidth: {
			type: String,
			default: null
		},
		//是否显示进度文字
		showTip: {
			type: Boolean,
			default: false
		},
		//进度条颜色
		color: {
			type: String,
			default: null
		},
		//进度文字颜色
		tipColor: {
			type: String,
			default: null
		},
		//轨道颜色
		trackColor: {
			type: String,
			default: null
		},
		//进度显示的文字，默认为百分比
		tipText: {
			type: [String, Number],
			default: null
		},
		//显示圆角
		round: {
			type: Boolean,
			default: false
		},
		//无角度
		square: {
			type: Boolean,
			default: false
		},
		//是否开启动画效果
		animation: {
			type: Boolean,
			default: false
		},
		//动画效果时长
		timeout: {
			type: Number,
			default: 400
		}
	},
	computed: {
		progressStyle() {
			let style = {}
			if (this.strokeWidth) {
				style.height = this.strokeWidth
			}
			if (this.trackColor) {
				style.backgroundColor = this.trackColor
			}
			return style
		},
		progressBarStyle() {
			let style = {}
			if (this.animation) {
				style.transition = 'width ' + this.timeout + 'ms,border-radius ' + this.timeout + 'ms'
				style.webkitTransition = 'width ' + this.timeout + 'ms,border-radius ' + this.timeout + 'ms'
			}
			if (this.color) {
				style.backgroundColor = this.color
			}
			if (this.value == this.max) {
				style.borderRadius = 'inherit'
			}
			style.width = `calc(${(this.value - this.min < 0 ? 0 : this.value - this.min) / (this.max - this.min)} * 100%)`

			return style
		},
		cmpText() {
			if (this.tipText) {
				return this.tipText
			} else {
				return Math.round(((this.value - this.min < 0 ? 0 : this.value - this.min) / (this.max - this.min)) * 100) + '%'
			}
		},
		tipStyle() {
			let style = {}
			if (this.tipColor) {
				style.color = this.tipColor
			}
			return style
		},
		progressClass() {
			let cls = ['mvi-progress']
			if (this.round) {
				cls.push('round')
			} else if (this.square) {
				cls.push('square')
			}
			return cls
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-progress {
	position: relative;
	display: block;
	width: 100%;
	height: 0.2rem;
	background-color: @bg-color-dark;
	border-radius: @radius-default;

	&.square {
		border-radius: 0;
	}

	&.round {
		border-radius: @radius-round;
	}

	.mvi-progress-bar {
		display: block;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: @info-normal;
		border-radius: inherit;
		border-top-right-radius: 0;
		border-bottom-right-radius: 0;
	}

	.mvi-progress-tooltip {
		position: absolute;
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		right: 0;
		top: 50%;
		transform: translateY(-50%);
		-webkit-transform: translateY(-50%);
		width: auto;
		min-height: 100%;
		font-size: @font-size-small;
		color: #fff;
		padding-right: @mp-xs;
	}
}
</style>
