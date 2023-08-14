<template>
	<div :class="navbarClass" :style="'z-index:' + (fixed ? zIndex : '')">
		<div @click="leftClick" class="mvi-navbar-left" :style="leftStyle" v-if="showLeft">
			<slot name="left" v-if="$slots.left"></slot>
			<Icon :class="[leftText ? 'mvi-navbar-left-icon' : '']" v-if="(parseIcon(leftIcon).type || parseIcon(leftIcon).url) && !$slots.left" :type="parseIcon(leftIcon).type" :url="parseIcon(leftIcon).url" :spin="parseIcon(leftIcon).spin" :size="parseIcon(leftIcon).size" :color="parseIcon(leftIcon).color" />
			<span class="mvi-navbar-left-text" v-if="leftText && !$slots.left" v-text="leftText"></span>
		</div>
		<div @click="titleClick" class="mvi-navbar-center" :style="centerStyle" v-if="$slots.title || title">
			<div class="mvi-navbar-title">
				<slot name="title" v-if="$slots.title"></slot>
				<span v-else-if="title" v-text="title"></span>
			</div>
		</div>
		<div @click="rightClick" class="mvi-navbar-right" :style="rightStyle" v-if="showRight">
			<slot name="right" v-if="$slots.right"></slot>
			<span class="mvi-navbar-right-text" v-if="rightText && !$slots.right" v-text="rightText"></span>
			<Icon :class="[rightText ? 'mvi-navbar-right-icon' : '']" v-if="(parseIcon(rightIcon).type || parseIcon(rightIcon).url) && !$slots.right" :type="parseIcon(rightIcon).type" :url="parseIcon(rightIcon).url" :spin="parseIcon(rightIcon).spin" :size="parseIcon(rightIcon).size" :color="parseIcon(rightIcon).color" />
		</div>
	</div>
</template>

<script>
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-navbar',
	props: {
		//标题
		title: {
			type: String,
			default: null
		},
		//左侧文本
		leftText: {
			type: String,
			default: null
		},
		//右侧文本
		rightText: {
			type: String,
			default: null
		},
		//左侧图标
		leftIcon: {
			type: [String, Object],
			default: null
		},
		//右侧图标
		rightIcon: {
			type: [String, Object],
			default: null
		},
		//是否固定顶部
		fixed: {
			type: Boolean,
			default: false
		},
		//是否显示下边框
		border: {
			type: Boolean,
			default: false
		},
		//层级
		zIndex: {
			type: Number,
			default: 400
		}
	},
	emits: ['left-click', 'right-click', 'title-click'],
	computed: {
		showLeft() {
			return this.parseIcon(this.leftIcon).type || this.parseIcon(this.leftIcon).url || this.$slots.left || this.leftText
		},
		showRight() {
			return this.parseIcon(this.rightIcon).type || this.parseIcon(this.rightIcon).url || this.$slots.right || this.rightText
		},
		leftStyle() {
			let style = {}
			if (this.title || this.$slots.title) {
				style.width = '20%'
			} else if (this.showRight) {
				style.width = '50%'
			} else {
				style.width = '100%'
			}
			return style
		},
		rightStyle() {
			let style = {}
			if (this.title || this.$slots.title) {
				style.width = '20%'
			} else if (this.showLeft) {
				style.width = '50%'
			} else {
				style.width = '100%'
			}
			return style
		},
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
		navbarClass() {
			let cls = ['mvi-navbar']
			if (this.fixed) {
				cls.push('fixed')
			}
			if (this.border) {
				cls.push('border')
			}
			return cls
		},
		centerStyle() {
			let style = {}
			if (this.showLeft || this.showRight) {
				style.width = '60%'
			} else {
				style.width = '100%'
			}
			return style
		}
	},
	components: {
		Icon
	},
	methods: {
		leftClick() {
			this.$emit('left-click')
		},
		rightClick() {
			this.$emit('right-click')
		},
		titleClick() {
			this.$emit('title-click')
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-navbar {
	display: flex;
	display: -webkit-flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: @medium-height;
	background-color: #fff;
	padding: 0 @mp-sm;
	position: relative;
	color: @font-color-default;
	font-size: @font-size-h6;

	&.border {
		border-bottom: 1px solid @border-color;
	}

	&.fixed {
		position: fixed;
		top: 0;
		left: 0;
	}

	.mvi-navbar-left {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		position: absolute;
		left: 0;
		top: 0;
		height: 100%;
		vertical-align: middle;
		padding-left: @mp-sm;
		cursor: pointer;
		user-select: none;

		.mvi-navbar-left-icon {
			margin-right: @mp-xs;
		}

		.mvi-navbar-left-text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}

	.mvi-navbar-center {
		display: flex;
		display: -webkit-flex;
		align-items: center;
		height: 100%;

		.mvi-navbar-title {
			display: block;
			text-align: center;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			width: 100%;
		}
	}

	.mvi-navbar-right {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-end;
		align-items: center;
		position: absolute;
		right: 0;
		top: 0;
		height: 100%;
		padding-right: @mp-sm;
		vertical-align: middle;
		user-select: none;

		.mvi-navbar-right-icon {
			margin-left: @mp-xs;
		}

		.mvi-navbar-right-text {
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
		}
	}
}
</style>
