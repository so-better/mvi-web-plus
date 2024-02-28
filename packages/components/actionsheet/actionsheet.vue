<template>
	<Popup ref="popup" v-model="show" :overlay-color="overlayColor" :z-index="zIndex" :timeout="timeout" placement="bottom" :round="round" :use-padding="usePadding" :mount-el="mountEl" :closable="closable">
		<div class="mvi-actionsheet">
			<div class="mvi-actionsheet-title" :class="[size]" v-if="title" v-text="title"></div>
			<div class="mvi-actionsheet-list">
				<div class="mvi-actionsheet-item" :class="itemClass(item)" v-for="(item, index) in options" :disabled="itemDisabled(item) || null" @click="doSelect(item, index)">
					<Loading :size="size == 'large' ? '0.5rem' : '0.4rem'" color="#bbb" v-if="item.loading || false"></Loading>
					<div class="mvi-actionsheet-content" v-else-if="item.label || parseIcon(item.icon).type || parseIcon(item.icon).url">
						<Icon data-placement="left" v-if="(parseIcon(item.icon).type || parseIcon(item.icon).url) && item.placement != 'right'" :type="parseIcon(item.icon).type" :url="parseIcon(item.icon).url" :spin="parseIcon(item.icon).spin" :size="parseIcon(item.icon).size" :color="parseIcon(item.icon).color" />
						<span v-if="item.label" class="mvi-actionsheet-item-label" v-text="item.label"></span>
						<Icon data-placement="right" v-if="(parseIcon(item.icon).type || parseIcon(item.icon).url) && item.placement == 'right'" :type="parseIcon(item.icon).type" :url="parseIcon(item.icon).url" :spin="parseIcon(item.icon).spin" :size="parseIcon(item.icon).size" :color="parseIcon(item.icon).color" />
					</div>
				</div>
			</div>
			<div class="mvi-actionsheet-divider"></div>
			<div class="mvi-actionsheet-button" :class="[size, { active: active }]" v-if="showCancel" v-text="cancelText" @click="show = false"></div>
		</div>
	</Popup>
</template>

<script>
import Dap from 'dap-util'
import { Popup } from '../popup'
import { Loading } from '../loading'
import { Icon } from '../icon'
export default {
	name: 'm-actionsheet',
	emits: ['update:modelValue', 'select'],
	props: {
		//是否显示
		modelValue: {
			type: Boolean,
			default: false
		},
		//遮罩层颜色
		overlayColor: {
			type: String,
			default: null
		},
		//层级
		zIndex: {
			type: Number,
			default: 900
		},
		//动画时间
		timeout: {
			type: Number,
			default: 200
		},
		//是否显示圆角
		round: {
			type: Boolean,
			default: false
		},
		//标题
		title: {
			type: String,
			default: null
		},
		//点击遮罩是否可关闭
		closable: {
			type: Boolean,
			default: false
		},
		//配置项，每个配置项包含label、loading、icon、placement、disabled
		options: {
			type: Array,
			default: function () {
				return []
			}
		},
		//是否显示取消按钮
		showCancel: {
			type: Boolean,
			default: true
		},
		//取消按钮文字
		cancelText: {
			type: String,
			default: '取消'
		},
		//列表和取消按钮是否显示点击态
		active: {
			type: Boolean,
			default: true
		},
		//挂载元素
		mountEl: {
			type: String,
			default: null
		},
		//选择完是否自动关闭
		selectClose: {
			type: Boolean,
			default: true
		},
		//局部显示时是否考虑滚动条影响
		usePadding: {
			type: Boolean,
			default: false
		},
		//尺寸
		size: {
			type: String,
			default: 'medium',
			validator(value) {
				return ['medium', 'large'].includes(value)
			}
		}
	},
	computed: {
		$$el() {
			return this.$refs.popup.$$el
		},
		show: {
			get() {
				return this.modelValue
			},
			set(value) {
				this.$emit('update:modelValue', value)
			}
		},
		//转换图标字段
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
		itemClass() {
			return item => {
				let cls = [this.size]
				if (this.active && !item.loading && !item.disabled) {
					cls.push('active')
				}
				return cls
			}
		},
		itemDisabled() {
			return item => {
				if (typeof item.disabled == 'boolean') {
					return item.disabled
				}
				return false
			}
		}
	},
	components: {
		Icon,
		Loading,
		Popup
	},
	methods: {
		//点击选项
		doSelect(item, index) {
			if (item.disabled || item.loading) {
				return
			}
			if (this.selectClose) {
				this.show = false
			}
			this.$emit('select', { ...item }, index)
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

//菜单
.mvi-actionsheet {
	display: block;
	width: 100%;
	position: relative;

	.mvi-actionsheet-title {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		height: @medium-height;
		border-bottom: 1px solid @border-color;
		color: @font-color-sub;
		padding: 0 @mp-md;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;

		&.medium {
			font-size: @font-size-small;
		}

		&.large {
			font-size: @font-size-default;
		}
	}

	.mvi-actionsheet-list {
		display: block;
		width: 100%;

		.mvi-actionsheet-item {
			display: flex;
			display: -webkit-flex;
			position: relative;
			justify-content: center;
			align-items: center;
			border-bottom: 1px solid @border-color;
			color: @font-color-default;
			padding: 0 @mp-md;
			cursor: pointer;

			&.medium {
				height: @medium-height;
				font-size: @font-size-default;
			}

			&.large {
				height: @large-height;
				font-size: @font-size-h6;
			}

			&.active:active::before {
				.mvi-active();
			}

			&[disabled] {
				color: @font-color-mute;
			}

			&:last-child {
				border-bottom: none;
			}

			.mvi-actionsheet-content {
				display: flex;
				display: -webkit-flex;
				justify-content: center;
				align-items: center;
				width: 100%;

				.mvi-icon {
					font-size: inherit;
					margin-right: @mp-xs;
					margin-left: 0;
				}

				.mvi-icon[data-placement='right'] {
					margin-left: @mp-xs;
					margin-right: 0;
				}
			}

			.mvi-actionsheet-item-label {
				display: inline-block;
				max-width: 80%;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
		}
	}

	.mvi-actionsheet-divider {
		display: block;
		width: 100%;
		height: 0.3rem;
		background-color: @bg-color-default;
	}

	.mvi-actionsheet-button {
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		position: relative;
		color: @font-color-default;

		&.medium {
			font-size: @font-size-h6;
			height: @medium-height;
		}

		&.large {
			font-size: @font-size-h5;
			height: @large-height;
		}

		&.active:active::before {
			.mvi-active();
		}
	}
}
</style>
