<template>
	<Popup ref="popup" v-model="cmpShow" :overlay-color="overlayColor" :z-index="zIndex" :timeout="timeout" :placement="placement" :round="round" :use-padding="usePadding" :mount-el="mountEl" :closable="closable" :__contentPadding="false">
		<div class="mvi-dropdown">
			<div :disabled="itemDisabled(item) || null" class="mvi-dropdown-item" :class="dropdownItemClass(item, index)" v-for="(item, index) in options" @click="doSelect(item, index)" :style="dropdownItemStyle(item, index)">
				<div class="mvi-dropdown-label">
					<Icon v-if="item.icon" :type="parseIcon(item.icon).type" :url="parseIcon(item.icon).url" :spin="parseIcon(item.icon).spin" class="mvi-dropdown-label-icon" :size="parseIcon(item.icon).size" :color="parseIcon(item.icon).color" />
					<span class="mvi-dropdown-label-text" v-text="item.label || ''"></span>
				</div>
				<div class="mvi-dropdown-icon" :class="{ checked: equalValue(item, index) }" :data-placement="placement">
					<Icon :type="parseIcon(selectedIcon).type" :url="parseIcon(selectedIcon).url" :spin="parseIcon(selectedIcon).spin" :size="parseIcon(selectedIcon).size" :color="parseIcon(selectedIcon).color" />
				</div>
			</div>
		</div>
	</Popup>
</template>

<script>
import Dap from 'dap-util'
import { Icon } from '../icon'
import { Popup } from '../popup'
export default {
	name: 'm-dropdown',
	emits: ['update:modelValue', 'update:show', 'select'],
	props: {
		//默认选中的选项
		modelValue: {
			type: [Object, Number, String, Array],
			default: null
		},
		//菜单列表选中的颜色
		activeColor: {
			type: String,
			default: null
		},
		//列表参数,含label,value,disabled,icon
		options: {
			type: Array,
			default: function () {
				return []
			}
		},
		//选择完毕后是否关闭
		selectedClose: {
			type: Boolean,
			default: true
		},
		//自定义右侧选中的图标
		selectedIcon: {
			type: [String, Object],
			default: 'success'
		},
		//是否显示
		show: {
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
		//是否圆角
		round: {
			type: Boolean,
			default: false
		},
		//位置
		placement: {
			type: String,
			default: 'top'
		},
		//点击遮罩是否可关闭
		closable: {
			type: Boolean,
			default: true
		},
		//挂载元素
		mountEl: {
			type: String,
			default: null
		},
		//是否显示点击态
		active: {
			type: Boolean,
			default: true
		},
		//局部显示时是否考虑滚动条影响
		usePadding: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		$$el() {
			return this.$refs.popup.$$el
		},
		cmpShow: {
			set(value) {
				this.$emit('update:show', value)
			},
			get() {
				return this.show
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
		//判断是否选中项
		equalValue() {
			return (item, index) => {
				if (item.value === undefined || item.value === null) {
					return this.modelValue === index
				}
				return Dap.common.equal(this.modelValue, item.value)
			}
		},
		//选项是否禁用
		itemDisabled() {
			return item => {
				if (typeof item.disabled == 'boolean') {
					return item.disabled
				}
				return false
			}
		},
		//选项样式
		dropdownItemStyle() {
			return (item, index) => {
				let style = {}
				if (!this.itemDisabled(item) && this.equalValue(item, index) && this.activeColor) {
					style.color = this.activeColor
				}
				return style
			}
		},
		//选项class
		dropdownItemClass() {
			return (item, index) => {
				let cls = []
				if (this.equalValue(item, index) && !item.disabled) {
					cls.push('checked')
				}
				if (this.active && !item.disabled) {
					cls.push('active')
				}
				return cls
			}
		}
	},
	components: {
		Icon,
		Popup
	},
	methods: {
		//选择
		doSelect(item, index) {
			if (item.disabled) {
				return
			}
			this.$emit('select', JSON.parse(JSON.stringify(item)), index)
			if (!Dap.common.equal(item.value, this.modelValue)) {
				this.$emit('update:modelValue', item.value)
			}
			if (this.selectedClose) {
				this.cmpShow = false
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-dropdown {
	display: block;
	width: 100%;
	position: relative;

	.mvi-dropdown-item {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		align-items: center;
		position: relative;
		width: 100%;
		height: @medium-height;
		border-bottom: 1px solid @border-color;
		padding: 0 @mp-sm;
		font-size: @font-size-default;
		color: @font-color-default;
		cursor: pointer;
		user-select: none;

		&.active:active::before {
			.mvi-active();
		}

		&.checked {
			color: @info-normal;
		}

		&[disabled] {
			color: @font-color-mute;
		}

		&:last-child {
			border-bottom: none;
		}

		.mvi-dropdown-label {
			display: flex;
			justify-content: flex-start;
			align-items: center;
			height: 100%;
			flex: 1;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			vertical-align: middle;
			transition: color 200ms;
			-webkit-transition: color 200ms;
			-ms-transition: color 200ms;
			-moz-transition: color 200ms;

			.mvi-dropdown-label-icon {
				margin-right: @mp-xs;
			}

			.mvi-dropdown-label-text {
				overflow: hidden;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}

		.mvi-dropdown-icon {
			display: flex;
			display: -webkit-flex;
			justify-content: center;
			align-items: center;
			padding-left: @mp-sm;
			height: 100%;
			opacity: 0;
			transition: opacity 200ms, color 200ms;

			&[data-placement='left'],
			&[data-placement='right'] {
				margin-left: @mp-lg*5;
			}

			&.checked {
				opacity: 1;
			}
		}
	}
}
</style>
