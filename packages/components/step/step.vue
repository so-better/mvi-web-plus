<template>
	<div class="mvi-step-vertical" v-if="steps.vertical">
		<div class="mvi-step-vertical-label" :class="{ finish: stepIndex == steps.active }" :style="labelStyle">
			<slot></slot>
		</div>
		<div class="mvi-step-vertical-container">
			<div class="mvi-step-vertical-icon">
				<Icon class="mvi-step-icon-active-el" v-if="steps.active == stepIndex && (parseIcon(steps.activeIcon).type || parseIcon(steps.activeIcon).url)" :type="parseIcon(steps.activeIcon).type" :url="parseIcon(steps.activeIcon).url" :spin="parseIcon(steps.activeIcon).spin" :size="parseIcon(steps.activeIcon).size" :color="parseIcon(steps.activeIcon).color" :style="activeIconStyle" />
				<div class="mvi-step-circle-active" v-else-if="steps.active == stepIndex" :style="activeCircleStyle"></div>
				<Icon :class="['mvi-step-icon-inactive-el', stepIndex <= steps.active ? 'finish' : '']" v-else-if="parseIcon(steps.inactiveIcon).type || parseIcon(steps.inactiveIcon).url" :type="parseIcon(steps.inactiveIcon).type" :url="parseIcon(steps.inactiveIcon).url" :spin="parseIcon(steps.inactiveIcon).spin" :size="parseIcon(steps.inactiveIcon).size" :color="parseIcon(steps.inactiveIcon).color" :style="inactiveIconStyle" />
				<div class="mvi-step-circle" :class="{ finish: stepIndex <= steps.active }" v-else :style="circleStyle"></div>
			</div>
			<div class="mvi-step-vertical-line" :class="{ last: stepIndex == steps.children.length - 1, finish: stepIndex < steps.active }" :style="lineStyle"></div>
		</div>
	</div>
	<div v-else class="mvi-step" :class="{ last: stepIndex == steps.children.length - 1 }">
		<div class="mvi-step-label" :class="{ last: stepIndex == steps.children.length - 1, first: stepIndex == 0, finish: stepIndex == steps.active }" :style="labelStyle">
			<div>
				<slot></slot>
			</div>
		</div>
		<div class="mvi-step-container">
			<div class="mvi-step-icon" :class="{ last: stepIndex == steps.children.length - 1 }" :style="stepIconStyle">
				<Icon class="mvi-step-icon-active-el" v-if="steps.active == stepIndex && (parseIcon(steps.activeIcon).type || parseIcon(steps.activeIcon).url)" :type="parseIcon(steps.activeIcon).type" :url="parseIcon(steps.activeIcon).url" :spin="parseIcon(steps.activeIcon).spin" :size="parseIcon(steps.activeIcon).size" :color="parseIcon(steps.activeIcon).color" :style="activeIconStyle" />
				<div class="mvi-step-circle-active" v-else-if="steps.active == stepIndex" :style="activeCircleStyle"></div>
				<Icon class="mvi-step-icon-inactive-el" :class="{ finish: stepIndex <= steps.active }" v-else-if="parseIcon(steps.inactiveIcon).type || parseIcon(steps.inactiveIcon).url" :type="parseIcon(steps.inactiveIcon).type" :url="parseIcon(steps.inactiveIcon).url" :spin="parseIcon(steps.inactiveIcon).spin" :size="parseIcon(steps.inactiveIcon).size" :color="parseIcon(steps.inactiveIcon).color" :style="inactiveIconStyle" />
				<div class="mvi-step-circle" :class="{ finish: stepIndex <= steps.active }" v-else :style="circleStyle"></div>
			</div>
			<div class="mvi-step-line" :class="{ last: stepIndex == steps.children.length - 1, finish: stepIndex < steps.active }" :style="lineStyle"></div>
		</div>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-step',
	data() {
		return {
			elm: null
		}
	},
	setup() {
		const uid = getCurrentInstance().uid
		return {
			uid
		}
	},
	inject: ['steps'],
	created() {
		this.steps.children.push(this)
	},
	mounted() {
		this.elm = this.$el
	},
	computed: {
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
		//step在steps中的序列值
		stepIndex() {
			return this.steps.children.findIndex(vm => {
				return Dap.common.equal(vm.uid, this.uid)
			})
		},
		//label
		labelStyle() {
			let style = {}
			if (this.steps.activeColor) {
				if (this.steps.active == this.stepIndex) {
					style.color = this.steps.activeColor
				}
			}
			if (this.steps.inactiveColor) {
				if (this.steps.active != this.stepIndex) {
					style.color = this.steps.inactiveColor
				}
			}
			return style
		},
		activeIconStyle() {
			let style = {}
			if (this.steps.activeColor) {
				if (this.steps.active == this.stepIndex) {
					style.color = this.steps.activeColor
				}
			}
			return style
		},
		inactiveIconStyle() {
			let style = {}
			if (this.steps.inactiveColor) {
				if (this.stepIndex > this.steps.active) {
					style.color = this.steps.inactiveColor
				}
			}
			if (this.steps.activeColor) {
				if (this.stepIndex <= this.steps.active) {
					style.color = this.steps.activeColor
				}
			}
			return style
		},
		circleStyle() {
			let style = {}
			if (this.stepIndex <= this.steps.active) {
				if (this.steps.activeColor) {
					style.backgroundColor = this.steps.activeColor
				}
			} else {
				if (this.steps.inactiveColor) {
					style.backgroundColor = this.steps.inactiveColor
				}
			}
			return style
		},
		activeCircleStyle() {
			let style = {}
			if (this.steps.activeColor) {
				if (this.steps.active == this.stepIndex) {
					style.backgroundColor = this.steps.activeColor
				}
			}
			return style
		},
		lineStyle() {
			let style = {}
			if (this.steps.activeColor) {
				if (this.stepIndex < this.steps.active) {
					if (this.steps.vertical) {
						style.borderRightColor = this.steps.activeColor
					} else {
						style.borderTopColor = this.steps.activeColor
					}
				}
			}
			if (this.steps.inactiveColor) {
				if (this.stepIndex >= this.steps.active) {
					if (this.steps.vertical) {
						style.borderRightColor = this.steps.inactiveColor
					} else {
						style.borderTopColor = this.steps.inactiveColor
					}
				}
			}
			return style
		},
		stepIconStyle() {
			let style = {}
			if (this.elm) {
				style.backgroundColor = Dap.element.getCssStyle(this.steps.$el, 'background-color')
			}
			return style
		}
	},
	components: {
		Icon
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-step-vertical {
	display: block;
	width: 100%;
	padding: @mp-sm 0 @mp-sm @mini-height;
	position: relative;

	.mvi-step-vertical-label {
		display: block;
		width: 100%;
		font-size: @font-size-small;
		color: @font-color-mute;
		position: relative;
		padding-left: @mp-sm;

		&.finish {
			color: @success-normal;
		}
	}

	.mvi-step-vertical-container {
		position: absolute;
		left: 0;
		top: 0.25rem;
		width: @mini-height;
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-direction: column;
		align-items: center;
		height: 100%;

		.mvi-step-vertical-icon {
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
		}

		.mvi-step-vertical-line {
			display: block;
			flex: 1;
			width: 0;
			border-right: 2px solid @font-color-mute;

			&.finish {
				border-right-color: @success-normal;
			}

			&.last {
				display: none;
			}
		}
	}
}

//以下为水平方向的步骤条样式
.mvi-step {
	display: flex;
	display: -webkit-flex;
	position: relative;
	flex: 1;
	padding-bottom: @mini-height;

	&.last {
		position: absolute;
		right: @mp-sm;
		width: auto;
	}

	.mvi-step-label {
		display: block;
		font-size: @font-size-small;
		color: @font-color-mute;
		transform: translateX(-50%);
		-webkit-transform: translateX(-50%);
		margin-left: 0.15rem;

		&.finish {
			color: @success-normal;
		}

		&.first,
		&.last {
			transform: none;
			margin-left: 0;
		}
	}

	.mvi-step-container {
		position: absolute;
		left: 0;
		bottom: 0;
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		height: @mini-height;
		width: 100%;

		.mvi-step-icon {
			display: block;
			background-color: #fff;

			&.last {
				position: absolute;
				right: 0;
			}
		}

		.mvi-step-line {
			display: block;
			flex: 1;
			height: 0;
			border-top: 2px solid @font-color-mute;

			&.finish {
				border-top-color: @success-normal;
			}

			&.last {
				display: none;
			}
		}
	}
}

.mvi-step-icon-active-el {
	color: @success-normal;
}

.mvi-step-icon-inactive-el {
	color: @font-color-mute;

	&.finish {
		color: @success-normal;
	}
}

.mvi-step-circle {
	display: block;
	width: 0.18rem;
	height: 0.18rem;
	background-color: @font-color-mute;
	border: none;
	border-radius: @radius-circle;

	&.finish {
		background-color: @success-normal;
	}
}

.mvi-step-circle-active {
	display: block;
	width: 0.3rem;
	height: 0.3rem;
	background-color: @success-normal;
	border: none;
	border-radius: @radius-circle;
}
</style>
