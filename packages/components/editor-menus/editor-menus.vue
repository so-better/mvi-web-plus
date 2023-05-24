<template>
	<div :class="['mvi-editor-menus', border ? 'border' : '']" @mousedown.prevent>
		<slot></slot>
	</div>
</template>
<script>
import defaultTooltipProps from './defaultTooltipProps'
import defaultLayerProps from './defaultLayerProps'
export default {
	name: 'm-editor-menus',
	data() {
		return {
			//编辑器组件实例
			instance: null
		}
	},
	provide() {
		return {
			menus: this
		}
	},
	props: {
		//菜单项是否使用工具提示
		useTooltip: {
			type: Boolean,
			default: false
		},
		//菜单项浮层参数
		layerProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//触发悬浮层显现的方式
		trigger: {
			type: String,
			default: 'click',
			validator(value) {
				return ['hover', 'click'].includes(value)
			}
		},
		//提示组件参数配置
		tooltipProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//是否显示菜单栏边框
		border: {
			type: Boolean,
			default: false
		},
		//是否禁用整个菜单项
		disabled: {
			type: Boolean,
			default: false
		}
	},
	computed: {
		//工具提示组件配置
		combinedTooltipProps() {
			return this._initOption(defaultTooltipProps, this.tooltipProps)
		},
		//浮层组件配置
		combinedLayerProps() {
			return this._initOption(defaultLayerProps, this.layerProps)
		}
	},
	methods: {
		_initOption(defaultObj, propObj) {
			let obj = {}
			Object.assign(obj, defaultObj)
			Object.assign(obj, propObj)
			return obj
		}
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-editor-menus {
	display: flex;
	justify-content: flex-start;
	flex-wrap: wrap;
	width: 100%;
	padding: @mp-xs;
	margin: 0;
	background-color: #fff;
	position: relative;
	border-radius: @radius-default;
	color: @font-color-default;
	font-size: @font-size-default;

	&.border {
		border: 1px solid @border-color;
	}
}
</style>
