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
				<!-- 字体颜色、背景色 -->
				<div v-if="options.key == 'foreColor' || options.key == 'backColor'" class="mvi-editor-menu-colors">
					<div :style="menuColorStyle(item)" class="mvi-editor-menu-color" v-for="item in options.data">
						<Tooltip :disabled="disabledColorToolTip(item)" trigger="hover" :title="item.label" :placement="$parent.combinedTooltipProps.placement" :timeout="$parent.combinedTooltipProps.timeout" :color="$parent.combinedTooltipProps.color" :text-color="$parent.combinedTooltipProps.textColor" :border-color="$parent.combinedTooltipProps.borderColor" :offset="$parent.combinedTooltipProps.offset" :z-index="$parent.combinedTooltipProps.zIndex" :fixed="$parent.combinedTooltipProps.fixed" :fixed-auto="$parent.combinedTooltipProps.fixedAuto" :width="$parent.combinedTooltipProps.width" :animation="$parent.combinedTooltipProps.animation" :show-triangle="$parent.combinedTooltipProps.showTriangle" block>
							<div :style="{ backgroundColor: item.value }" class="mvi-editor-menu-color-el"></div>
						</Tooltip>
					</div>
				</div>
				<!-- 表格 -->
				<div class="mvi-editor-menu-table" v-else-if="options.key == 'table'">
					<div class="mvi-editor-menu-table-groups" v-for="item in tableParams.groups">
						<div @click="confirmTableSize(el)" @mouseenter="changeTableSize(el)" :class="['mvi-editor-menu-table-group', el.inside ? 'active' : '']" v-for="el in item"></div>
					</div>
					<div v-if="tableParams.size.length" class="mvi-editor-menu-table-size">{{ tableParams.size[0] }} × {{ tableParams.size[1] }}</div>
				</div>
				<!-- 自定义弹出层内容 -->
				<slot name="layer" v-else-if="$slots.layer"></slot>
				<!-- 普通弹出层 -->
				<template v-else>
					<editorTag :tag="layerElTag(item)" :style="layerElStyle(item)" :disabled="item.disabled || null" class="mvi-editor-menu-layer-el" v-for="(item, index) in options.data" @click="selectLayerItem(item, index)">
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
import editorTag from './editor-tag.vue'
import { Dap } from '../dap'
import { Upload } from '../upload'
import { Tooltip } from '../tooltip'
import { Icon } from '../icon'
import { Layer } from '../layer'
import { Checkbox } from '../checkbox'
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
			//已选值
			selectVal: {},
			//浮层是否打开
			layerShow: false,
			//菜单项是否激活状态
			active: false,
			//表格相关初始化参数
			tableParams: {
				//表格大小，如[5,5]
				size: [],
				//表格创建规格
				groups: this.initTableGroups()
			}
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	computed: {
		//是否禁用颜色面板的工具提示
		disabledColorToolTip() {
			return item => {
				//label没有值
				if (!item.label) {
					return true
				}
				if (this.disabledMenu) {
					return true
				}
				return false
			}
		},
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
			if (!this.$parent.editorInstance) {
				return true
			}
			if (this.$parent.editorInstance.disabled) {
				return true
			}
			if (!this.$parent.editorInstance.range) {
				return true
			}
			if (this.options.disabled) {
				return true
			}
			//显示源码的情况下除源码菜单项其他菜单项都禁用
			if (this.options.key != 'codeView' && this.$parent.editorInstance.codeViewShow) {
				return true
			}
			return false
		},
		//是否为显示已选值的菜单
		isValueMenu() {
			return this.options.hasOwnProperty('value') && this.isLayerMenu
		},
		//是否为弹出式菜单
		isLayerMenu() {
			return Array.isArray(this.options.data)
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
			if (this.$parent.editorInstance && this.active) {
				style.opacity = 1
				if (this.$parent.editorInstance.activeColor) {
					style.color = this.$parent.editorInstance.activeColor
				}
			}

			return style
		},
		//颜色选取板每个颜色块的样式
		menuColorStyle() {
			return item => {
				let style = {}
				if (this.$parent.editorInstance && this.active && this.selectVal.value == item.value && this.$parent.editorInstance.activeColor) {
					style.borderColor = this.$parent.editorInstance.activeColor
				}
				return style
			}
		}
	},
	components: {
		Tooltip,
		Icon,
		Layer,
		Checkbox,
		editorTag
	},
	watch: {
		isValueMenu: {
			immediate: true,
			handler: function (newVal) {
				if (newVal) {
					//如果是显示已选值的菜单项，需要初始化设置已选值
					this.selectVal =
						this.options.data.find(item => {
							return item.value == this.options.value
						}) || {}
				}
			}
		}
	},
	methods: {
		//点击浮层选项
		selectLayerItem(dataItem, index) {
			if (this.disabledMenu) {
				return
			}
			//恢复选区
			this.$parent.editorInstance.restoreRange()
			//执行
			this.handler(dataItem, index)
			//隐藏浮层
			this.hideLayer()
		},
		//执行富文本操作
		handler(dataItem, index) {
			// 撤回/恢复/清除格式/全选/加粗/斜体/下划线/删除线/下标/上标
			if (['undo', 'redo', 'removeFormat', 'selectAll', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'].includes(this.options.key)) {
				document.execCommand(this.options.key)
			}
			//插入分隔线
			else if (this.options.key == 'divider') {
				document.execCommand('insertHtml', false, '<hr><p><br></p>')
			}
			//设置字体
			else if (this.options.key == 'fontFamily') {
				document.execCommand('fontName', false, dataItem.value)
			}
			//设置字号
			else if (this.options.key == 'fontSize') {
				document.execCommand('fontSize', false, index + 1)
			}
			//设置文字颜色
			else if (this.options.key == 'foreColor') {
			}
			//设置背景颜色
			else if (this.options.key == 'backColor') {
			}
			//插入有序列表
			else if (this.options.key == 'ol') {
				document.execCommand('insertOrderedList')
			}
			//插入无序列表
			else if (this.options.key == 'ul') {
				document.execCommand('insertUnorderedList')
			}
			//对齐方式
			else if (this.options.key == 'justify') {
			}
			//引用
			else if (this.options.key == 'quote') {
				if (this.active) {
					this.removeBlock()
				} else {
					document.execCommand('formatBlock', false, 'blockquote')
				}
			}
			//插入链接
			else if (this.options.key == 'link') {
			}
			//插入图片
			else if (this.options.key == 'image') {
			}
			//插入视频
			else if (this.options.key == 'video') {
			}
			//插入表格
			else if (this.options.key == 'table') {
			}
			//插入代码
			else if (this.options.key == 'code') {
				if (this.active) {
					this.removeCode()
				} else {
					document.execCommand('formatBlock', false, 'pre')
				}
			}
			//设置源码显示
			else if (this.options.key == 'codeView') {
				this.$parent.editorInstance.codeViewShow = !this.$parent.editorInstance.codeViewShow
			}
			//弹出式菜单自定义菜单操作
			else if (dataItem) {
				this.$parent.$emit('custom', {
					options: { ...this.options },
					item: { ...dataItem },
					index: index
				})
			}
			//普通菜单下触发自定义操作
			else {
				this.$parent.$emit('custom', { ...this.options })
			}

			if (this.isValueMenu && dataItem) {
				this.selectVal = { ...dataItem }
			}
		},
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
				//恢复选区
				this.$parent.editorInstance.restoreRange()
				//执行操作
				this.handler()
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
		},
		//初始化创建表格单元格数组
		initTableGroups() {
			const arr = new Array()
			for (let i = 0; i < 10; i++) {
				let o = new Array()
				for (let j = 0; j < 10; j++) {
					o.push({
						x: j + 1,
						y: i + 1,
						inside: false //是否被选中
					})
				}
				arr.push(o)
			}
			return arr
		},
		//改变表格大小
		changeTableSize(data) {
			this.tableParams.size = [data.x, data.y]
			for (let i in this.tableParams.groups) {
				const group = this.tableParams.groups[i]
				for (let j in group) {
					if (group[j].x <= data.x && group[j].y <= data.y) {
						this.tableParams.groups[i][j].inside = true
					} else {
						this.tableParams.groups[i][j].inside = false
					}
				}
			}
		},
		//确认表格大小
		confirmTableSize(data) {
			//创建表格
			//...

			this.tableParams.size = []
			this.tableParams.groups = this.initTableGroups()
			this.hideLayer()
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
	height: @mini-height;
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

	.mvi-editor-menu-colors {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: calc(@small-height * 4 + @mp-xs * 10 + 16px);
		padding: 0 @mp-xs;

		.mvi-editor-menu-color {
			display: block;
			padding: @mp-xs / 2;
			border: 1px solid transparent;
			border-radius: @radius-default / 2;

			.mvi-editor-menu-color-el {
				display: block;
				width: @small-height / 2;
				height: @small-height / 2;
				border: 1px solid @border-color;
				border-radius: @radius-default / 2;
				position: relative;
				transition: transform 200ms;
				-webkit-transition: transform 200ms;
				-moz-transition: transform 200ms;

				&:hover {
					cursor: pointer;
					transform: translate3d(0, 0, 0) scale(1.2);
					z-index: 2;
				}
			}
		}
	}

	.mvi-editor-menu-table {
		display: block;
		padding: @mp-xs 0;

		.mvi-editor-menu-table-groups {
			display: flex;
			display: -webkit-flex;
			justify-content: flex-start;
			align-items: center;
			padding: 0 @mp-sm;

			&:first-of-type > .mvi-editor-menu-table-group {
				border-top: 1px solid @border-color;
			}

			.mvi-editor-menu-table-group {
				display: block;
				width: @mini-height / 2;
				height: @mini-height / 2;
				border-right: 1px solid @border-color;
				border-bottom: 1px solid @border-color;

				&:first-child {
					border-left: 1px solid @border-color;
				}

				&:hover {
					cursor: pointer;
				}

				&.active {
					background-color: @bg-color-dark;
				}
			}
		}

		.mvi-editor-menu-table-size {
			display: block;
			width: 100%;
			text-align: center;
			font-size: @font-size-small;
			color: @font-color-sub;
			margin-top: @mp-sm;
			line-height: 1;
		}
	}
}
</style>
