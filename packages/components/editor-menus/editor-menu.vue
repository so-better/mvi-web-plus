<template>
	<div class="mvi-editor-menu" :data-id="`mvi-editor-menu-${uid}-${options.key}`">
		<Tooltip
			:disabled="disabledToolTip || null"
			:title="options.name"
			trigger="hover"
			:placement="editorMenusInstance.combinedTooltipProps.placement"
			:timeout="editorMenusInstance.combinedTooltipProps.timeout"
			:color="editorMenusInstance.combinedTooltipProps.color"
			:text-color="editorMenusInstance.combinedTooltipProps.textColor"
			:border-color="editorMenusInstance.combinedTooltipProps.borderColor"
			:offset="editorMenusInstance.combinedTooltipProps.offset"
			:z-index="editorMenusInstance.combinedTooltipProps.zIndex"
			:fixed="editorMenusInstance.combinedTooltipProps.fixed"
			:fixed-auto="editorMenusInstance.combinedTooltipProps.fixedAuto"
			:width="editorMenusInstance.combinedTooltipProps.width"
			:animation="editorMenusInstance.combinedTooltipProps.animation"
			:show-triangle="editorMenusInstance.combinedTooltipProps.showTriangle">
			<div class="mvi-editor-menu-target" @click="targetTrigger" :disabled="disabledMenu || null" :data-id="`mvi-editor-menu-target-${uid}-${options.key}`" @mouseenter="showLayer(true)" @mouseleave="hideLayer(true)" :style="editorTargetStyle">
				<span class="mvi-editor-menu-value" v-if="isValueMenu">{{ selectVal.label }}</span>
				<template v-else-if="options.icon">
					<i v-if="options.icon.custom" :class="options.icon.value"></i>
					<Icon v-else :type="options.icon.value" />
				</template>
				<Icon v-if="isLayerMenu" class="mvi-editor-menu-caret" type="caret-down"></Icon>
			</div>
		</Tooltip>
		<Layer
			v-if="isLayerMenu"
			v-model="layerShow"
			ref="layer"
			:placement="editorMenusInstance.combinedLayerProps.placement"
			:z-index="editorMenusInstance.combinedLayerProps.zIndex"
			:fixed="editorMenusInstance.combinedLayerProps.fixed"
			:fixed-auto="editorMenusInstance.combinedLayerProps.fixedAuto"
			:offset="editorMenusInstance.combinedLayerProps.offset"
			:wrapper-class="editorMenusInstance.combinedLayerProps.wrapperClass"
			:timeout="editorMenusInstance.combinedLayerProps.timeout"
			:show-triangle="editorMenusInstance.combinedLayerProps.showTriangle"
			:animation="editorMenusInstance.combinedLayerProps.animation"
			:shadow="editorMenusInstance.combinedLayerProps.shadow"
			:border="editorMenusInstance.combinedLayerProps.border"
			:border-color="editorMenusInstance.combinedLayerProps.borderColor"
			:background="editorMenusInstance.combinedLayerProps.background"
			:width="editorMenusInstance.combinedLayerProps.width"
			:closable="editorMenusInstance.trigger == 'click'"
			:target="`[data-id='mvi-editor-menu-target-${uid}-${options.key}']`"
			:root="`[data-id='mvi-editor-menu-${uid}-${options.key}']`">
			<div class="mvi-editor-menu-layer">
				<editorTag :tag="layerElTag(item)" :disabled="item.disabled || null" class="mvi-editor-menu-layer-el" v-for="item in options.data">
					<template v-if="item.icon">
						<i class="mvi-editor-menu-icon" v-if="item.icon.custom" :class="item.icon.value"></i>
						<Icon v-else class="mvi-editor-menu-icon" :type="item.icon.value" />
					</template>
					<span v-text="item.label"></span>
				</editorTag>
			</div>
		</Layer>
	</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import Bus from '../../js/Bus'
import editorTag from './editor-tag.vue'
import { Dap } from '../dap'
import { Upload } from '../upload'
import { Tooltip } from '../tooltip'
import { Icon } from '../icon'
import { Layer } from '../layer'
import { Tabs } from '../tabs'
import { Tab } from '../tab'
import { Checkbox } from '../checkbox'
import { Msgbox } from '../msgbox'
export default {
	name: 'm-editor-menu',
	props: {
		//菜单项参数
		options: {
			type: Object,
			default: function () {
				return {}
			}
		}
	},
	data() {
		return {
			//编辑器实例
			editorInstance: null,
			//已选值
			selectVal: null,
			//浮层是否打开
			layerShow: false,
			//菜单项是否激活状态
			active: false
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	inject: ['editorMenusInstance'],
	computed: {
		//是否禁用工具提示
		disabledToolTip() {
			//没有name属性
			if (!this.options.name) {
				return true
			}
			if (this.disabledMenu) {
				return true
			}
			return false
		},
		//是否禁用菜单项
		disabledMenu() {
			if (this.editorMenusInstance.disabled) {
				return true
			}
			if (this.options.disabled) {
				return true
			}
			//显示源码的情况下
			if (this.options.key != 'codeView' && this.editorInstance && this.editorInstance.codeViewShow) {
				return true
			}
			return false
		},
		//是否是显示已选值的菜单
		isValueMenu() {
			return this.options.hasOwnProperty('value') && this.isLayerMenu
		},
		//是否弹出式菜单
		isLayerMenu() {
			return Array.isArray(this.options.data) && this.options.data.length
		},
		//浮层项的标签
		layerElTag() {
			return item => {
				if (this.options.key == 'tag') {
					return item.value
				}
				return 'div'
			}
		},
		//菜单项样式
		editorTargetStyle() {
			let style = {}
			if (this.editorInstance && this.active) {
				style.opacity = 1
				if (this.editorInstance.activeColor) {
					style.color = this.editorInstance.activeColor
				}
			}

			return style
		}
	},
	components: {
		Tooltip,
		Icon,
		Layer,
		Tabs,
		Tab,
		Checkbox,
		editorTag
	},
	watch: {
		isValueMenu: {
			immediate: true,
			handler: function (newVal) {
				if (newVal) {
					this.selectVal = this.options.data.find(item => {
						return item.value == this.options.value
					})
				}
			}
		}
	},
	created() {
		Bus.on(`mvi-editor-${this.editorMenusInstance.name}`, data => {
			this.editorInstance = data
		})
	},
	methods: {
		//菜单项点击
		targetTrigger() {
			if (this.disabledMenu) {
				return
			}
			//如果是弹出式菜单
			if (this.isLayerMenu) {
				if (this.editorMenusInstance.trigger == 'click') {
					if (this.layerShow) {
						this.hideLayer()
					} else {
						this.showLayer()
					}
				}
			}
			//如果是普通菜单则直接作用
			else {
			}
		},
		//显示浮层
		showLayer(judgeHover) {
			if (this.disabledMenu) {
				return
			}
			if (judgeHover && this.editorMenusInstance.trigger != 'hover') {
				return
			}
			if (this.isLayerMenu) {
				this.layerShow = true
				this.$nextTick(() => {})
			}
		},
		//隐藏浮层
		hideLayer(judgeHover) {
			if (this.disabledMenu) {
				return
			}
			if (judgeHover && this.editorMenusInstance.trigger != 'hover') {
				return
			}
			if (this.isLayerMenu) {
				this.layerShow = false
			}
		}
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-editor-menu {
	display: block;
	position: relative;
}
.mvi-editor-menu-target {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	height: @small-height;
	color: @font-color-default;
	font-size: @font-size-default;
	margin: 0;
	padding: 0 @mp-sm;
	transition: color 200ms;
	-webkit-transition: color 200ms;
	opacity: 0.8;
	border-radius: @radius-default;

	&:hover {
		cursor: pointer;
		opacity: 1;
		background-color: @bg-color-default;
	}

	&[disabled] {
		opacity: 0.6;
	}

	.mvi-editor-menu-value {
		white-space: nowrap;
	}

	.mvi-editor-menu-caret {
		transform: scale(0.5);
	}
}

.mvi-editor-menu-layer {
	display: block;
	padding: @mp-xs 0;
	font-size: @font-size-default;

	.mvi-editor-menu-layer-el {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: @mp-sm @mp-lg;
		margin: 0;
		white-space: nowrap;
		color: @font-color-default;
		background-color: #fff;
		text-align: center;
		opacity: 0.8;

		&:hover {
			opacity: 1;
			cursor: pointer;
			background-color: @bg-color-default;
		}
		.mvi-editor-menu-icon {
			margin-right: @mp-xs;
		}

		&[disabled] {
			opacity: 0.6;
			background-color: #fff;
		}
	}
}
</style>
