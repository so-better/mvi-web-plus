<template>
	<div :class="cellClass">
		<div class="mvi-cell-item">
			<Icon class="mvi-cell-icon" v-if="parseIcon(icon).type || parseIcon(icon).url" :type="parseIcon(icon).type" :url="parseIcon(icon).url" :spin="parseIcon(icon).spin" :size="parseIcon(icon).size" :color="parseIcon(icon).color" />
			<div :class="['mvi-cell-title', noWrap ? 'nowrap' : '']">
				<slot name="title" v-if="$slots.title"></slot>
				<span v-else v-text="title"></span>
			</div>
			<div :class="['mvi-cell-content', noWrap ? 'nowrap' : '']" v-if="$slots.content || content">
				<slot name="content" v-if="$slots.content"></slot>
				<span v-else-if="content" v-text="content"></span>
			</div>
			<Icon class="mvi-cell-arrow" v-if="parseIcon(arrow).type || parseIcon(arrow).url" :type="parseIcon(arrow).type" :url="parseIcon(arrow).url" :spin="parseIcon(arrow).spin" :size="parseIcon(arrow).size" :color="parseIcon(arrow).color" />
		</div>
		<div class="mvi-cell-label" v-if="label || $slots.label" :style="labelTextStyle">
			<slot name="label" v-if="$slots.label"></slot>
			<span v-text="label" v-else-if="label"></span>
		</div>
	</div>
</template>

<script>
import { Dap } from '../dap'
import { Icon } from '../icon'
export default {
	name: 'm-cell',
	props: {
		//左侧图标
		icon: {
			type: [String, Object],
			default: null
		},
		//标题
		title: {
			type: String,
			default: null
		},
		//内容
		content: {
			type: String,
			default: null
		},
		//描述文本
		label: {
			type: String,
			default: null
		},
		//是否显示下边框
		border: {
			type: Boolean,
			default: null
		},
		//右侧图标
		arrow: {
			type: [String, Object],
			default: null
		},
		//是否显示点击态
		active: {
			type: Boolean,
			default: null
		},
		//是否对描述文本内容进行行数限制
		ellipsis: {
			type: [Boolean, Number],
			default: null
		},
		//标题和内容超出一行是否省略
		noWrap: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		//转换图标字段
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
		cmpActive() {
			if (typeof this.active == 'boolean') {
				return this.active
			}
			if (this.$parent.$options.name == 'm-cell-group' && typeof this.$parent.active == 'boolean') {
				return this.$parent.active
			}
			return true
		},
		cmpBorder() {
			if (typeof this.border == 'boolean') {
				return this.border
			}
			if (typeof this.$parent.border == 'boolean') {
				return this.$parent.border
			}
			return false
		},
		labelTextStyle() {
			let style = {}
			//如果ellipsis不是false
			if (this.ellipsis) {
				style.display = '-webkit-box'
				style.textOverflow = 'ellipsis'
				style.webkitBoxOrient = 'vertical'
				style.overflow = 'hidden'
				if (typeof this.ellipsis == 'boolean') {
					style.webkitLineClamp = 3
				} else {
					style.webkitLineClamp = this.ellipsis
				}
			}
			return style
		},
		cellClass() {
			let cls = ['mvi-cell']
			if (this.cmpBorder) {
				cls.push('border')
			}
			if (this.cmpActive) {
				cls.push('active')
			}
			return cls
		}
	},
	components: {
		Icon
	}
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-cell {
	display: block;
	width: 100%;
	background-color: #fff;
	color: @font-color-default;
	padding: @mp-sm;
	position: relative;

	&.active:active::before {
		.mvi-active();
	}

	&.border::after {
		display: block;
		position: absolute;
		left: @mp-sm;
		bottom: 0;
		content: '';
		height: 0;
		border-bottom: 1px solid @border-color;
		width: calc(100% - @mp-sm);
		box-sizing: content-box;
	}

	.mvi-cell-item {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		width: 100%;
		padding: 0;
		position: relative;
		overflow: hidden;

		.mvi-cell-icon {
			margin-right: @mp-xs;
		}

		.mvi-cell-title {
			display: block;
			width: 100%;
			font-size: @font-size-default;
			word-wrap: break-word;

			&.nowrap {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}

		.mvi-cell-content {
			display: block;
			position: relative;
			width: 100%;
			text-align: right;
			overflow: hidden;
			word-wrap: break-word;
			color: @font-color-sub;

			&.nowrap {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}

		.mvi-cell-title + .mvi-cell-content {
			margin-left: @mp-sm;
		}

		.mvi-cell-arrow {
			margin-left: @mp-xs;
			color: @font-color-sub;
		}
	}

	.mvi-cell-label {
		width: 100%;
		margin-top: @mp-sm;
		font-size: @font-size-small;
		color: @font-color-mute;
		word-wrap: break-word;
	}
}
</style>
