<template>
	<div class="mvi-editor-menu" :data-id="`mvi-editor-menu-${uid}-${options.key}`">
		<Tooltip :disabled="disabledToolTip || null" :title="options.name" trigger="hover" :placement="$parent.combinedTooltipProps.placement" :timeout="$parent.combinedTooltipProps.timeout" :color="$parent.combinedTooltipProps.color" :text-color="$parent.combinedTooltipProps.textColor" :border-color="$parent.combinedTooltipProps.borderColor" :offset="$parent.combinedTooltipProps.offset" :z-index="$parent.combinedTooltipProps.zIndex" :fixed="$parent.combinedTooltipProps.fixed" :fixed-auto="$parent.combinedTooltipProps.fixedAuto" :width="$parent.combinedTooltipProps.width" :animation="$parent.combinedTooltipProps.animation" :show-triangle="$parent.combinedTooltipProps.showTriangle">
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
			:placement="$parent.combinedLayerProps.placement"
			:z-index="$parent.combinedLayerProps.zIndex"
			:fixed="$parent.combinedLayerProps.fixed"
			:fixed-auto="$parent.combinedLayerProps.fixedAuto"
			:offset="$parent.combinedLayerProps.offset"
			:wrapper-class="$parent.combinedLayerProps.wrapperClass"
			:timeout="$parent.combinedLayerProps.timeout"
			:show-triangle="$parent.combinedLayerProps.showTriangle"
			:animation="$parent.combinedLayerProps.animation"
			:shadow="$parent.combinedLayerProps.shadow"
			:border="$parent.combinedLayerProps.border"
			:border-color="$parent.combinedLayerProps.borderColor"
			:background="$parent.combinedLayerProps.background"
			:width="$parent.combinedLayerProps.width"
			:closable="$parent.trigger == 'click'"
			:target="`[data-id='mvi-editor-menu-target-${uid}-${options.key}']`"
			:root="`[data-id='mvi-editor-menu-${uid}-${options.key}']`">
			<div class="mvi-editor-menu-layer">
				<!-- 字体颜色 -->
				<template v-if="options.key == 'foreColor'"></template>
				<!-- 背景色 -->
				<template v-else-if="options.key == 'backColor'"></template>
				<!-- 自定义弹出层内容 -->
				<slot name="layer" v-else-if="$slots.layer"></slot>
				<!-- 普通弹出层 -->
				<template v-else>
					<editorTag :tag="layerElTag(item)" :style="layerElStyle(item)" :disabled="item.disabled || null" class="mvi-editor-menu-layer-el" v-for="item in options.data">
						<template v-if="item.icon">
							<i class="mvi-editor-menu-icon" v-if="item.icon.custom" :class="item.icon.value"></i>
							<Icon v-else class="mvi-editor-menu-icon" :type="item.icon.value" />
						</template>
						<span v-text="item.label"></span>
					</editorTag>
				</template>
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
			if (this.$parent.disabled) {
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
		//浮层项的样式
		layerElStyle() {
			return item => {
				let style = {}
				if (this.options.key == 'fontFamily') {
					style.fontFamily = item.value
				}
				return style
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
		Bus.on(`mvi-editor-${this.$parent.name}`, data => {
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
				if (this.$parent.trigger == 'click') {
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
			if (judgeHover && this.$parent.trigger != 'hover') {
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
			if (judgeHover && this.$parent.trigger != 'hover') {
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
