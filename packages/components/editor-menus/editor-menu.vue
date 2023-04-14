<template>
	<div class="mvi-editor-menu" :data-id="`mvi-editor-menu-${uid}-${options.key}`" @mouseenter="editorMenuHover('enter')" @mouseleave="editorMenuHover('leave')">
		<Tooltip :disabled="disabledToolTip" :title="options.name" trigger="hover" :placement="$parent.combinedTooltipProps.placement" :timeout="$parent.combinedTooltipProps.timeout" :color="$parent.combinedTooltipProps.color" :text-color="$parent.combinedTooltipProps.textColor" :border-color="$parent.combinedTooltipProps.borderColor" :offset="$parent.combinedTooltipProps.offset" :z-index="$parent.combinedTooltipProps.zIndex" :fixed="$parent.combinedTooltipProps.fixed" :fixed-auto="$parent.combinedTooltipProps.fixedAuto" :width="$parent.combinedTooltipProps.width" :animation="$parent.combinedTooltipProps.animation" :show-triangle="$parent.combinedTooltipProps.showTriangle">
			<div class="mvi-editor-menu-target" @click="targetTrigger" :disabled="disabledMenu || null" :data-id="`mvi-editor-menu-target-${uid}-${options.key}`" @mouseenter="targetHover('enter', $event)" @mouseleave="targetHover('leave', $event)" :style="editorTargetStyle">
				<span class="mvi-editor-menu-value" v-if="isValueMenu">{{ selectVal?.label }}</span>
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
			:width="$parent.combinedLayerProps.width"
			:closable="$parent.trigger == 'click'"
			:target="`[data-id='mvi-editor-menu-target-${uid}-${options.key}']`"
			:root="`[data-id='mvi-editor-menu-${uid}-${options.key}']`"
			@showing="layerShowing">
			<div class="mvi-editor-menu-layer">
				<!-- 字体颜色、背景色 -->
				<div v-if="options.key == 'foreColor' || options.key == 'backColor'" class="mvi-editor-menu-colors">
					<div :style="menuColorStyle(item)" class="mvi-editor-menu-color" v-for="(item, index) in options.data">
						<Tooltip :disabled="disabledColorToolTip(item)" trigger="hover" :title="item.label" :placement="$parent.combinedTooltipProps.placement" :timeout="$parent.combinedTooltipProps.timeout" :color="$parent.combinedTooltipProps.color" :text-color="$parent.combinedTooltipProps.textColor" :border-color="$parent.combinedTooltipProps.borderColor" :offset="$parent.combinedTooltipProps.offset" :z-index="$parent.combinedTooltipProps.zIndex" :fixed="$parent.combinedTooltipProps.fixed" :fixed-auto="$parent.combinedTooltipProps.fixedAuto" :width="$parent.combinedTooltipProps.width" :animation="$parent.combinedTooltipProps.animation" :show-triangle="$parent.combinedTooltipProps.showTriangle" block>
							<div :style="{ backgroundColor: item.value }" @click="selectLayerItem(item, index)" class="mvi-editor-menu-color-el"></div>
						</Tooltip>
					</div>
				</div>
				<!-- 表格 -->
				<div class="mvi-editor-menu-table" v-else-if="options.key == 'table'">
					<template v-if="active">
						<div class="mvi-editor-menu-table-operations">
							<div @click="addTableRow" :style="activeColorStyle" class="mvi-editor-menu-table-operation">{{ operationText(0) }}</div>
							<div @click="removeTableRow" class="mvi-editor-menu-table-operation">{{ operationText(1) }}</div>
							<div @click="addTableColumn" :style="activeColorStyle" class="mvi-editor-menu-table-operation">{{ operationText(2) }}</div>
							<div @click="removeTableColumn" class="mvi-editor-menu-table-operation">{{ operationText(3) }}</div>
						</div>
						<div class="mvi-editor-menu-table-footer">
							<span @click="deleteTable">{{ options.deleteText ? options.deleteText : '删除表格' }}</span>
						</div>
					</template>
					<template v-else>
						<div class="mvi-editor-menu-table-groups" v-for="item in tableParams.groups">
							<div @click="confirmTableSize(el)" @mouseenter="changeTableSize(el)" :class="['mvi-editor-menu-table-group', el.inside ? 'active' : '']" v-for="el in item"></div>
						</div>
						<div v-if="tableParams.size.length" class="mvi-editor-menu-table-size">{{ tableParams.size[0] }} × {{ tableParams.size[1] }}</div>
					</template>
				</div>
				<!-- 链接 -->
				<div class="mvi-editor-menu-link" v-else-if="options.key == 'link'">
					<input ref="linkText" @focus="inputFocus" @blur="inputBlur" v-model.trim="linkParams.text" :placeholder="linkPlaceholder[0]" type="text" />
					<input ref="linkUrl" @focus="inputFocus" @blur="inputBlur" v-model.trim="linkParams.url" :placeholder="linkPlaceholder[1]" type="text" />
					<div class="mvi-editor-menu-link-footer">
						<Checkbox :label="options.newWindowText ? options.newWindowText : '新窗口打开'" label-placement="right" :icon="{ size: '0.24rem' }" label-size="0.28rem" label-color="#808080" :fill-color="$parent.editorInstance.activeColor" v-model="linkParams.target"> </Checkbox>
						<div class="mvi-editor-menu-link-operation">
							<span class="mvi-editor-menu-link-delete" v-if="active" @click="deleteLink">{{ options.deleteText ? options.deleteText : '删除链接' }}</span>
							<span class="mvi-editor-menu-link-insert" :style="activeColorStyle" @click="insertLink">{{ options.insertText ? options.insertText : '插入' }}</span>
						</div>
					</div>
				</div>
				<!-- 图片或者视频 -->
				<div class="mvi-editor-menu-media" v-else-if="options.key == 'image' || options.key == 'video'">
					<Tabs @change="tabChange" v-model="mediaParams.tabIndex" flex="flex-start" offset="0.4rem" :active-color="$parent.editorInstance.activeColor" inactive-color="#808080">
						<Tab :disabled="item.disabled" v-for="item in options.data" :title="item.label" :icon="item.icon?.value">
							<div :disabled="item.disabled || null" class="mvi-editor-menu-media-upload" v-if="item.value == 'upload'">
								<Icon type="upload-square" />
							</div>
							<div v-else-if="item.value == 'remote'" class="mvi-editor-menu-media-remote">
								<input :disabled="item.disabled || null" @focus="inputFocus" @blur="inputBlur" v-model.trim="mediaParams.remoteUrl" :placeholder="mediaPlaceholder" type="text" />
								<div :disabled="item.disabled || null" class="mvi-editor-menu-media-remote-insert" :style="activeColorStyle" @click="insertRemote">{{ options.insertText ? options.insertText : '插入' }}</div>
							</div>
						</Tab>
					</Tabs>
				</div>
				<!-- 自定义弹出层内容 -->
				<slot name="layer" v-else-if="$slots.layer"></slot>
				<!-- 普通弹出层 -->
				<div class="mvi-editor-menu-default" v-else>
					<editorTag :tag="layerElTag(item)" :style="layerElStyle(item)" :disabled="item.disabled || null" :class="['mvi-editor-menu-layer-el', layerActiveClass(item)]" v-for="(item, index) in options.data" @click="selectLayerItem(item, index)" @mouseenter="layerItemHover('enter', item, $event)" @mouseleave="layerItemHover('leave', item, $event)">
						<template v-if="item.icon">
							<i class="mvi-editor-menu-layer-icon" v-if="item.icon.custom" :class="item.icon.value"></i>
							<Icon v-else class="mvi-editor-menu-layer-icon" :type="item.icon.value" />
						</template>
						<span v-text="item.label"></span>
						<Icon class="mvi-editor-menu-layer-active-icon" v-if="active && item.value == selectVal.value" type="success"></Icon>
					</editorTag>
				</div>
			</div>
		</Layer>
	</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { insertNodeAfter, initTableGroups, copyTableRowAppend, copyTableColumnAppend, removeTableColumn, isTableHeader, setTableNewHeader, createTableColBtn, setEditorElementId, getGuid, resetResizeRange } from '../editor/util'
import unactiveMenus from './unactiveMenus'
import editorTag from './editor-tag.vue'
import { Dap } from '../dap'
import { Upload } from '../upload'
import { Tooltip } from '../tooltip'
import { Icon } from '../icon'
import { Layer } from '../layer'
import { Checkbox } from '../checkbox'
import { Tab } from '../tab'
import { Tabs } from '../tabs'
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
				groups: initTableGroups()
			},
			//链接相关参数
			linkParams: {
				//插入的链接
				url: '',
				//链接内容
				text: '',
				//链接是否在新窗口打开
				target: false
			},
			//图片或者视频参数
			mediaParams: {
				//选项卡值
				tabIndex: 0,
				//远程地址
				remoteUrl: ''
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
			//在代码块内只允许部分菜单可以使用
			if (this.$parent.editorInstance.cursorArea == 'code') {
				return ['divider', 'title', 'fontFamily', 'fontSize', 'ol', 'ul', 'justify', 'quote', 'link', 'image', 'video', 'table'].includes(this.options.key)
			}
			//在引用内只允许部分菜单可以使用
			if (this.$parent.editorInstance.cursorArea == 'quote') {
				return ['divider', 'title', 'fontFamily', 'fontSize', 'ol', 'ul', 'justify', 'code', 'link', 'image', 'video', 'table'].includes(this.options.key)
			}
			//在引用内只允许部分菜单可以使用
			if (this.$parent.editorInstance.cursorArea == 'table') {
				return ['divider', 'title', 'ol', 'ul', 'link', 'image', 'video', 'quote', 'code'].includes(this.options.key)
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
				if (this.options.key == 'title') {
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
			if (this.disabledMenu) {
				return style
			}
			if (this.active && !unactiveMenus.includes(this.options.key)) {
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
				if (this.disabledMenu) {
					return style
				}
				if (this.active && this.selectVal.value == item.value && this.$parent.editorInstance.activeColor) {
					style.borderColor = this.$parent.editorInstance.activeColor
				}
				return style
			}
		},
		//浮层选项激活样式类
		layerActiveClass() {
			return dataItem => {
				if (this.active && dataItem.value == this.selectVal.value) {
					return this.options.layerActiveClass || this.$parent.layerActiveClass || 'active'
				}
				return ''
			}
		},
		//激活颜色设置
		activeColorStyle() {
			let style = {}
			if (this.disabledMenu) {
				return style
			}
			if (this.$parent.editorInstance.activeColor) {
				style.color = this.$parent.editorInstance.activeColor
			}
			return style
		},
		//上传文件配置
		uploadOptions() {
			let options = {}
			if (!this.$parent.editorInstance) {
				return options
			}
			if (this.options.key == 'image') {
				options = this.$parent.editorInstance.combinedUploadImageProps
			} else if (this.options.key == 'video') {
				options = this.$parent.editorInstance.combinedUploadVideoProps
			}
			return {
				...options,
				select: files => {
					this.$parent.editorInstance.restoreRange()
					//使用base64
					if (this.$parent.editorInstance.useBase64) {
						files.forEach(file => {
							Dap.file.dataFileToBase64(file).then(base64 => {
								if (this.options.key == 'image') {
									this.$parent.editorInstance.insertImage(base64)
								} else if (this.options.key == 'video') {
									this.$parent.editorInstance.insertVideo(base64)
								}
							})
						})
					} else {
						//自定义一个事件，让开发者自定义上传
						if (this.options.key == 'image') {
							this.$parent.editorInstance.$emit('upload-image', files)
						} else if (this.options.key == 'video') {
							this.$parent.editorInstance.$emit('upload-video', files)
						}
					}
					this.hideLayer()
				},
				error: (state, message, file) => {
					if (this.options.key == 'image') {
						if (typeof this.$parent.editorInstance.uploadImageError == 'function') {
							this.$parent.editorInstance.uploadImageError(state, message, file)
						} else {
							Msgbox.msgbox({
								message: message,
								animation: 'scale'
							})
						}
					} else if (this.options.key == 'video') {
						if (typeof this.$parent.editorInstance.uploadVideoError == 'function') {
							this.$parent.editorInstance.uploadVideoError(state, message, file)
						} else {
							Msgbox.msgbox({
								message: message,
								animation: 'scale'
							})
						}
					}
					this.hideLayer()
				}
			}
		},
		//插入链接的两个输入框的placeholder值
		linkPlaceholder() {
			if (this.options.key == 'link') {
				const placeholder = this.options.placeholder
				if (Array.isArray(placeholder)) {
					return [placeholder[0] || '链接文本', placeholder[1] || '链接地址']
				}
			}
			return ['链接文本', '链接地址']
		},
		//插入视频和图片时输入框的placeholder值
		mediaPlaceholder() {
			if (this.options.key == 'image' || this.options.key == 'video') {
				if (typeof this.options.placeholder == 'string' && this.options.placeholder) {
					return this.options.placeholder
				}
				if (this.options.key == 'image') {
					return '图片链接'
				}
				if (this.options.key == 'video') {
					return '视频链接'
				}
			}
		},
		//表格操作按钮文字内容
		operationText() {
			return index => {
				let defaultArray = ['插入行', '删除行', '插入列', '删除列']
				if (Array.isArray(this.options.operationText)) {
					return this.options.operationText[index] ? this.options.operationText[index] : defaultArray[index]
				}
				return defaultArray[index]
			}
		}
	},
	components: {
		Tooltip,
		Icon,
		Layer,
		Checkbox,
		Tabs,
		Tab,
		editorTag
	},
	watch: {
		isValueMenu: {
			immediate: true,
			handler: function (newVal) {
				if (newVal) {
					//如果是显示已选值的菜单项，需要初始化设置已选值
					this.initSelectVal()
				}
			}
		}
	},
	methods: {
		//tab切换时
		tabChange() {
			this.$nextTick(() => {
				//是否禁用上传
				let disabled = this.options.data.some(item => {
					return item.disabled && item.value == 'upload'
				})
				const elements = this.$el.querySelectorAll('.mvi-editor-menu-media-upload')
				if (elements.length) {
					for (let i = 0; i < elements.length; i++) {
						let upload = new Upload(elements[i], { ...this.uploadOptions, disabled: disabled })
						upload.init()
					}
				}
			})
		},
		//浮层显示时
		layerShowing() {
			if (this.options.key == 'link') {
				this.initLinkParams()
			} else if (this.options.key == 'image' || this.options.key == 'video') {
				this.initUploadParams()
			} else if (this.options.key == 'table') {
				this.initTableParams()
			}
		},
		//上传初始化设置
		initUploadParams() {
			this.mediaParams.tabIndex = 0
			this.mediaParams.remoteUrl = ''
			//是否禁用上传
			let disabled = this.options.data.some(item => {
				return item.disabled && item.value == 'upload'
			})
			const elements = this.$el.querySelectorAll('.mvi-editor-menu-media-upload')
			if (elements.length) {
				for (let i = 0; i < elements.length; i++) {
					let upload = new Upload(elements[i], { ...this.uploadOptions, disabled: disabled })
					upload.init()
				}
			}
		},
		//链接初始化设置值
		initLinkParams() {
			//激活状态
			if (this.active) {
				let node = this.$parent.editorInstance.getSelectNode()
				let a = this.$parent.editorInstance.getCompareTag(node, 'a')
				//初始化赋值
				this.linkParams.url = a.getAttribute('href')
				//初始化赋值
				this.linkParams.text = a.innerText
				//初始化赋值
				this.linkParams.target = a.hasAttribute('target')
				this.$nextTick(() => {
					this.$refs.linkText.focus()
				})
			} else {
				this.linkParams.url = ''
				this.linkParams.target = false
				let text = this.$parent.editorInstance.range.toString()
				if (text) {
					this.linkParams.text = text
					this.$refs.linkUrl.focus()
				} else {
					this.linkParams.text = ''
					this.$refs.linkText.focus()
				}
			}
		},
		//表格初始化设置
		initTableParams() {
			if (!this.active) {
				this.tableParams.size = []
				this.tableParams.groups = initTableGroups()
			}
		},
		//输入框获取焦点
		inputFocus(event) {
			if (this.$parent.editorInstance.activeColor) {
				event.currentTarget.style.borderColor = this.$parent.editorInstance.activeColor
			}
		},
		//输入框失去焦点
		inputBlur(event) {
			if (this.$parent.editorInstance.activeColor) {
				event.currentTarget.style.borderColor = ''
			}
		},
		//点击浮层选项
		selectLayerItem(dataItem, index) {
			if (this.disabledMenu) {
				return
			}
			if (dataItem.disabled) {
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
			// 撤回/恢复/清除格式/加粗/斜体/下划线/删除线/下标/上标
			if (['undo', 'redo', 'removeFormat', 'bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript'].includes(this.options.key)) {
				document.execCommand(this.options.key)
			}
			//插入标题
			else if (this.options.key == 'title') {
				this.$parent.editorInstance.insertBlock(dataItem.value)
			}
			//插入分隔线
			else if (this.options.key == 'divider') {
				this.$parent.editorInstance.insertHtml('<hr>', true)
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
				document.execCommand('foreColor', false, dataItem.value)
			}
			//设置背景颜色
			else if (this.options.key == 'backColor') {
				document.execCommand('backColor', false, dataItem.value)
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
				document.execCommand(dataItem.value)
			}
			//引用
			else if (this.options.key == 'quote') {
				if (this.active) {
					this.removeBlockQuote()
				} else {
					this.$parent.editorInstance.insertBlock('blockquote', true, true)
				}
			}
			//插入代码
			else if (this.options.key == 'code') {
				if (this.active) {
					this.removeCode()
				} else {
					this.$parent.editorInstance.insertBlock('pre', true, true)
				}
			}
			//设置源码显示
			else if (this.options.key == 'codeView') {
				this.$parent.editorInstance.codeViewShow = !this.$parent.editorInstance.codeViewShow
			}
			//弹出式菜单触发自定义操作
			else if (dataItem) {
				this.$parent.$emit('custom', {
					options: { ...this.options },
					item: { ...dataItem },
					index: index
				})
			}
			//普通菜单触发自定义操作
			else {
				this.$parent.$emit('custom', { ...this.options })
			}
			//重新调整图片和视频的点位
			this.$nextTick(() => {
				if (this.$parent.editorInstance.$refs.content) {
					resetResizeRange(this.$parent.editorInstance)
				}
			})
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
		//菜单项悬浮
		targetHover(type, event) {
			if (this.disabledMenu) {
				return
			}
			if (type == 'enter') {
				if (this.options.hoverClass) {
					Dap.element.addClass(event.currentTarget, this.options.hoverClass)
				} else if (this.$parent.hoverClass) {
					Dap.element.addClass(event.currentTarget, this.$parent.hoverClass)
				}
			} else if (type == 'leave') {
				if (this.options.hoverClass) {
					Dap.element.removeClass(event.currentTarget, this.options.hoverClass)
				} else if (this.$parent.hoverClass) {
					Dap.element.removeClass(event.currentTarget, this.$parent.hoverClass)
				}
			}
		},
		//菜单项根元素悬浮
		editorMenuHover(type) {
			if (this.$parent.trigger != 'hover') {
				return
			}
			if (type == 'enter') {
				this.showLayer()
			} else if (type == 'leave') {
				this.hideLayer()
			}
		},
		//浮层选项悬浮效果设置
		layerItemHover(type, dataItem, event) {
			if (this.disabledMenu) {
				return
			}
			if (dataItem.disabled) {
				return
			}
			if (type == 'enter') {
				if (this.options.layerHoverClass) {
					Dap.element.addClass(event.currentTarget, this.options.layerHoverClass)
				} else if (this.$parent.layerHoverClass) {
					Dap.element.addClass(event.currentTarget, this.$parent.layerHoverClass)
				}
			} else if (type == 'leave') {
				if (this.options.layerHoverClass) {
					Dap.element.removeClass(event.currentTarget, this.options.layerHoverClass)
				} else if (this.$parent.layerHoverClass) {
					Dap.element.removeClass(event.currentTarget, this.$parent.layerHoverClass)
				}
			}
		},
		//显示浮层
		showLayer() {
			if (this.disabledMenu) {
				return
			}
			if (this.isLayerMenu) {
				this.layerShow = true
			}
		},
		//隐藏浮层
		hideLayer() {
			if (this.isLayerMenu) {
				this.layerShow = false
			}
		},
		//初始化seletVal和active
		initSelectVal() {
			this.selectVal = this.options.data.find(item => {
				return item.value == this.options.value
			})
			if (this.selectVal) {
				this.active = true
			}
		},
		//删除引用
		removeBlockQuote() {
			if (this.disabledMenu) {
				return
			}
			let node = this.$parent.editorInstance.getSelectNode()
			if (!node) {
				return
			}
			const blockquote = this.$parent.editorInstance.getCompareTag(node, 'blockquote')
			let pEl = Dap.element.string2dom('<p>' + blockquote.innerHTML + '</p>')
			if (pEl instanceof HTMLCollection) {
				pEl = Dap.element.string2dom('<div>' + blockquote.innerHTML + '</div>')
			}
			insertNodeAfter(pEl, blockquote)
			blockquote.remove()
			this.$parent.editorInstance.collapseToEnd(pEl)
			this.active = false
			this.$parent.editorInstance.updateHtmlText()
			this.$parent.editorInstance.updateValue()
		},
		//插入链接
		insertLink() {
			if (this.disabledMenu) {
				return
			}
			if (!this.linkParams.url) {
				this.hideLayer()
				return
			}
			if (!this.linkParams.text) {
				this.linkParams.text = this.linkParams.url
			}
			let link = Dap.element.string2dom(`<a href="${this.linkParams.url}">${this.linkParams.text}</a>`)
			if (this.linkParams.target) {
				link.setAttribute('target', '_blank')
			}
			//恢复选区
			this.$parent.editorInstance.restoreRange()
			if (this.active) {
				let node = this.$parent.editorInstance.getSelectNode()
				if (node && this.$parent.editorInstance.compareTag(node, 'a')) {
					let a = this.$parent.editorInstance.getCompareTag(node, 'a')
					a.remove()
				}
			}
			this.$parent.editorInstance.insertHtml(link.outerHTML)
			this.hideLayer()
		},
		//删除链接
		deleteLink() {
			if (this.disabledMenu) {
				return
			}
			this.$parent.editorInstance.restoreRange()
			let node = this.$parent.editorInstance.getSelectNode()
			if (this.$parent.editorInstance.compareTag(node, 'a')) {
				let a = this.$parent.editorInstance.getCompareTag(node, 'a')
				if (a) {
					let innerHTML = a.innerHTML
					a.remove()
					this.active = false
					this.$parent.editorInstance.insertHtml(innerHTML)
				}
			}
			this.$parent.editorInstance.updateHtmlText()
			this.$parent.editorInstance.updateValue()
			this.hideLayer()
		},
		//插入远程图片或者视频
		insertRemote() {
			if (this.disabledMenu) {
				return
			}
			//是否禁用
			let disabled = this.options.data.some(item => {
				return item.disabled && item.value == 'remote'
			})
			if (disabled) {
				return
			}
			if (!this.mediaParams.remoteUrl) {
				this.hideLayer()
				return
			}
			this.$parent.editorInstance.restoreRange()
			if (this.options.key == 'image') {
				this.$parent.editorInstance.insertImage(this.mediaParams.remoteUrl)
			} else if (this.options.key == 'video') {
				this.$parent.editorInstance.insertVideo(this.mediaParams.remoteUrl)
			}
			this.hideLayer()
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
		//插入表格
		confirmTableSize() {
			if (this.disabledMenu) {
				return
			}
			//获取唯一id
			let id = getGuid()
			//创建表格
			const table = document.createElement('table')
			//设置表格属性
			setEditorElementId(table, id)
			table.setAttribute('cellpadding', '0')
			table.setAttribute('cellspacing', '0')
			//创建列分组元素
			const colGroup = document.createElement('colgroup')
			//创建表格主体
			const tbody = document.createElement('tbody')
			setEditorElementId(tbody, id)
			//循环遍历生成表格行和列
			for (let i = 0; i < this.tableParams.size[1]; i++) {
				const tr = document.createElement('tr')
				setEditorElementId(tr, id)
				for (let j = 0; j < this.tableParams.size[0]; j++) {
					const td = document.createElement('td')
					td.innerHTML = '<br>'
					setEditorElementId(td, id)
					tr.appendChild(td)
					//第一行设置可拖拽器
					if (i == 0 && j < this.tableParams.size[0] - 1) {
						const btn = createTableColBtn()
						td.appendChild(btn)
					}
				}
				tbody.appendChild(tr)
			}
			//创建表格列分组元素
			for (let j = 0; j < this.tableParams.size[0]; j++) {
				const col = document.createElement('col')
				col.setAttribute('width', 'auto')
				colGroup.appendChild(col)
			}
			//添加到表格
			table.appendChild(colGroup)
			table.appendChild(tbody)
			//恢复选区
			this.$parent.editorInstance.restoreRange()
			//插入编辑器
			this.$parent.editorInstance.insertHtml(table.outerHTML, true)
			//重新定位光标
			this.setTableCollapse('insertTable', { id })
			//隐藏浮层
			this.hideLayer()
		},
		//表格增加行
		addTableRow() {
			let node = this.$parent.editorInstance.getSelectNode()
			//td
			if (this.$parent.editorInstance.compareTag(node, 'td')) {
				let column = this.$parent.editorInstance.getCompareTag(node, 'td')
				let row = column.parentNode
				let index = [].indexOf.call(Dap.element.children(row, column.tagName), column)
				let newRow = copyTableRowAppend(row)
				this.setTableCollapse('addRow', { newRow, index })
			}
			//tr
			else if (this.$parent.editorInstance.compareTag(node, 'tr')) {
				let row = this.$parent.editorInstance.getCompareTag(node, 'tr')
				let newRow = copyTableRowAppend(row)
				this.setTableCollapse('addRow', { newRow })
			}
			//tbody
			else if (this.$parent.editorInstance.compareTag(node, 'tbody')) {
				let tbody = this.$parent.editorInstance.getCompareTag(node, 'tbody')
				let rows = Dap.element.children(tbody, 'tr')
				let row = rows[rows.length - 1]
				let newRow = copyTableRowAppend(row)
				this.setTableCollapse('addRow', { newRow })
			}
			//table
			else if (this.$parent.editorInstance.compareTag(node, 'table')) {
				let table = this.$parent.editorInstance.getCompareTag(node, 'table')
				let rows = Dap.element.children(table, 'tr')
				let row = rows[rows.length - 1]
				let newRow = copyTableRowAppend(row)
				this.setTableCollapse('addRow', { newRow })
			}
			this.$parent.editorInstance.updateHtmlText()
			this.$parent.editorInstance.updateValue()
			this.hideLayer()
		},
		//表格删除行
		removeTableRow() {
			let node = this.$parent.editorInstance.getSelectNode()
			//td
			if (this.$parent.editorInstance.compareTag(node, 'td')) {
				let column = this.$parent.editorInstance.getCompareTag(node, 'td')
				let row = column.parentNode
				let isHead = isTableHeader(row)
				let index = [].indexOf.call(Dap.element.children(row, column.tagName), column)
				let tbody = row.parentNode
				let previousRow = row.previousElementSibling
				let nextRow = row.nextElementSibling
				if (isHead) {
					setTableNewHeader(nextRow)
				}
				row.remove()
				this.setTableCollapse('removeRow', { index, tbody, previousRow })
			}
			//tr
			else if (this.$parent.editorInstance.compareTag(node, 'tr')) {
				let row = this.$parent.editorInstance.getCompareTag(node, 'tr')
				let isHead = isTableHeader(row)
				let tbody = row.parentNode
				let previousRow = row.previousElementSibling
				let nextRow = row.nextElementSibling
				if (isHead) {
					setTableNewHeader(nextRow)
				}
				row.remove()
				this.setTableCollapse('removeRow', { tbody, previousRow })
			}
			//tbody
			else if (this.$parent.editorInstance.compareTag(node, 'tbody')) {
				let tbody = this.$parent.editorInstance.getCompareTag(node, 'tbody')
				let rows = Dap.element.children(tbody, 'tr')
				let row = rows[rows.length - 1]
				let isHead = isTableHeader(row)
				let previousRow = row.previousElementSibling
				let nextRow = row.nextElementSibling
				if (isHead) {
					setTableNewHeader(nextRow)
				}
				row.remove()
				this.setTableCollapse('removeRow', { tbody, previousRow })
			}
			//table
			else if (this.$parent.editorInstance.compareTag(node, 'table')) {
				let table = this.$parent.editorInstance.getCompareTag(node, 'table')
				let tbody = table.querySelector('tbody')
				let rows = Dap.element.children(tbody, 'tr')
				let row = rows[rows.length - 1]
				let isHead = isTableHeader(row)
				let previousRow = row.previousElementSibling
				let nextRow = row.nextElementSibling
				if (isHead) {
					setTableNewHeader(nextRow)
				}
				row.remove()
				this.setTableCollapse('removeRow', { tbody, previousRow })
			}
			this.$parent.editorInstance.updateHtmlText()
			this.$parent.editorInstance.updateValue()
			this.hideLayer()
		},
		//表格增加列
		addTableColumn() {
			let node = this.$parent.editorInstance.getSelectNode()
			if (this.$parent.editorInstance.compareTag(node, 'td')) {
				let column = this.$parent.editorInstance.getCompareTag(node, 'td')
				copyTableColumnAppend(column)
				let nextColumn = column.nextElementSibling
				this.setTableCollapse('addColumn', { nextColumn })
			} else if (this.$parent.editorInstance.compareTag(node, 'tr')) {
				let row = this.$parent.editorInstance.getCompareTag(node, 'tr')
				let columns = Dap.element.children(row, 'td')
				let column = columns[columns.length - 1]
				copyTableColumnAppend(column)
				let nextColumn = column.nextElementSibling
				this.setTableCollapse('addColumn', { nextColumn })
			} else if (this.$parent.editorInstance.compareTag(node, 'tbody')) {
				let tbody = this.$parent.editorInstance.getCompareTag(node, 'tbody')
				let row = Dap.element.children(tbody, 'tr')[0]
				let columns = Dap.element.children(row, 'td')
				let column = columns[columns.length - 1]
				copyTableColumnAppend(column)
				let nextColumn = column.nextElementSibling
				this.setTableCollapse('addColumn', { nextColumn })
			} else if (this.$parent.editorInstance.compareTag(node, 'table')) {
				let table = this.$parent.editorInstance.getCompareTag(node, 'table')
				let tbody = Dap.element.children(table, 'tbody')[0]
				let row = Dap.element.children(tbody, 'tr')[0]
				let columns = Dap.element.children(row, 'td')
				let column = columns[columns.length - 1]
				copyTableColumnAppend(column)
				let nextColumn = column.nextElementSibling
				this.setTableCollapse('addColumn', { nextColumn })
			}
			this.$parent.editorInstance.updateHtmlText()
			this.$parent.editorInstance.updateValue()
			this.hideLayer()
		},
		//表格删除列
		removeTableColumn() {
			let node = this.$parent.editorInstance.getSelectNode()
			if (this.$parent.editorInstance.compareTag(node, 'td')) {
				let column = this.$parent.editorInstance.getCompareTag(node, 'td')
				let row = column.parentNode
				let previousEl = column.previousElementSibling
				removeTableColumn(column)
				this.setTableCollapse('removeColumn', { row, previousEl })
			} else if (this.$parent.editorInstance.compareTag(node, 'tr')) {
				let row = this.$parent.editorInstance.getCompareTag(node, 'tr')
				let columns = Dap.element.children(row, 'td')
				let column = columns[columns.length - 1]
				let previousEl = column.previousElementSibling
				removeTableColumn(column)
				this.setTableCollapse('removeColumn', { row, previousEl })
			} else if (this.$parent.editorInstance.compareTag(node, 'tbody')) {
				let tbody = this.$parent.editorInstance.getCompareTag(node, 'tbody')
				let row = tbody.querySelector('tr')
				let columns = Dap.element.children(row, 'td')
				let column = columns[columns.length - 1]
				let previousEl = column.previousElementSibling
				removeTableColumn(column)
				this.setTableCollapse('removeColumn', { row, previousEl })
			} else if (this.$parent.editorInstance.compareTag(node, 'table')) {
				let table = this.$parent.editorInstance.getCompareTag(node, 'table')
				let row = table.querySelector('tr')
				let columns = Dap.element.children(row, 'td')
				let column = columns[columns.length - 1]
				let previousEl = column.previousElementSibling
				removeTableColumn(column)
				this.setTableCollapse('removeColumn', { row, previousEl })
			}
			this.$parent.editorInstance.updateHtmlText()
			this.$parent.editorInstance.updateValue()
			this.hideLayer()
		},
		//删除表格
		deleteTable() {
			this.$parent.editorInstance.restoreRange()
			let node = this.$parent.editorInstance.getSelectNode()
			let table = this.$parent.editorInstance.getCompareTag(node, 'table')
			if (table) {
				table.remove()
				this.active = false
			}
			this.$parent.editorInstance.updateHtmlText()
			this.$parent.editorInstance.updateValue()
			this.hideLayer()
		},
		//设置表格光标
		setTableCollapse(command, opt) {
			//插入表格时
			if (command == 'insertTable') {
				let id = opt.id
				const table = this.$parent.editorInstance.$refs.content.querySelector(`table[mvi-editor-element="${id}"]`)
				const column = table.querySelector('td')
				this.$parent.editorInstance.collapseToEnd(column)
			}
			//增加行
			else if (command == 'addRow') {
				let newRow = opt.newRow
				let index = opt.index || 0
				const column = Dap.element.children(newRow, 'td')[index]
				this.$parent.editorInstance.collapseToEnd(column)
			}
			//删除行
			else if (command == 'removeRow') {
				let index = opt.index || 0
				let tbody = opt.tbody
				let previousRow = opt.previousRow
				if (previousRow) {
					const column = Dap.element.children(previousRow, 'td')[index]
					this.$parent.editorInstance.collapseToEnd(column)
				} else {
					let row = Dap.element.children(tbody, 'tr')[0]
					if (row) {
						const column = Dap.element.children(row, 'td')[index]
						this.$parent.editorInstance.collapseToEnd(column)
					}
				}
			}
			//增加列
			else if (command == 'addColumn') {
				let nextColumn = opt.nextColumn
				this.$parent.editorInstance.collapseToEnd(nextColumn)
			}
			//删除列
			else if (command == 'removeColumn') {
				let row = opt.row
				let previousEl = opt.previousEl
				if (previousEl) {
					this.$parent.editorInstance.collapseToEnd(previousEl)
				} else {
					let column = Dap.element.children(row, 'td')[0]
					if (column) {
						this.$parent.editorInstance.collapseToEnd(column)
					}
				}
			}
		},
		//删除代码块
		removeCode() {
			if (this.disabledMenu) {
				return
			}
			let node = this.$parent.editorInstance.getSelectNode()
			if (!node) {
				return
			}
			const pre = this.$parent.editorInstance.getCompareTag(node, 'pre')
			pre.innerHTML = pre.innerHTML.replace(/\n/g, '<br>')
			let pEl = Dap.element.string2dom('<p>' + pre.innerHTML + '</p>')
			if (pEl instanceof HTMLCollection) {
				pEl = Dap.element.string2dom('<div>' + pre.innerHTML + '</div>')
			}
			insertNodeAfter(pEl, pre)
			pre.remove()
			this.active = false
			this.$parent.editorInstance.collapseToEnd(pEl)
			this.$parent.editorInstance.updateHtmlText()
			this.$parent.editorInstance.updateValue()
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
		background-color: transparent;
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
	background-color: #fff;
	color: @font-color-default;
	font-size: @font-size-default;

	.mvi-editor-menu-default {
		display: block;
		padding: @mp-xs 0;
		.mvi-editor-menu-layer-el {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: @mp-sm @mp-lg;
			margin: 0;
			white-space: nowrap;
			text-align: center;
			opacity: 0.8;

			&:hover {
				opacity: 1;
				cursor: pointer;
				background-color: @bg-color-default;
			}
			.mvi-editor-menu-layer-icon {
				margin-right: @mp-xs;
			}

			&[disabled] {
				opacity: 0.6;
				background-color: transparent;
			}
			&.active {
				opacity: 1;
				background-color: @bg-color-default;
			}

			.mvi-editor-menu-layer-active-icon {
				margin-left: @mp-xs;
				font-weight: normal;
				opacity: 0.8;
			}
		}
	}

	.mvi-editor-menu-colors {
		display: flex;
		display: -webkit-flex;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: calc(@small-height * 4 + @mp-xs * 10 + 16px);
		padding: @mp-xs;

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
		padding: @mp-sm;

		.mvi-editor-menu-table-groups {
			display: flex;
			display: -webkit-flex;
			justify-content: flex-start;
			align-items: center;

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

		.mvi-editor-menu-table-operations {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: @mp-sm 0;
			margin-bottom: @mp-sm;

			.mvi-editor-menu-table-operation {
				display: block;
				opacity: 0.8;
				padding: 0 @mp-sm;
				white-space: nowrap;

				&:hover {
					opacity: 1;
					cursor: pointer;
				}
			}
		}

		.mvi-editor-menu-table-footer {
			display: flex;
			justify-content: flex-end;
			align-items: center;

			span {
				display: block;
				opacity: 0.8;
				padding: 0 @mp-sm;
				&:hover {
					opacity: 1;
					cursor: pointer;
				}
			}
		}
	}

	.mvi-editor-menu-link {
		display: block;
		padding: @mp-sm;
		width: 6rem;

		input {
			appearance: none;
			-webkit-appearance: none;
			-moz-appearance: none;
			display: block;
			width: 100%;
			margin: 0;
			padding: @mp-xs;
			border: none;
			border-bottom: 1px solid @border-color;
			font-size: @font-size-default;
			color: @font-color-default;
			line-height: 1.5;
			margin-bottom: @mp-sm;
			transition: border-color 400ms;
			-moz-transition: border-color 400ms;
			-webkit-transition: border-color 400ms;

			&::-webkit-input-placeholder,
			&::placeholder {
				color: inherit;
				font-family: inherit;
				font-size: inherit;
				opacity: 0.5;
				vertical-align: middle;
			}
		}

		.mvi-editor-menu-link-footer {
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			padding-top: @mp-xs 0;

			.mvi-editor-menu-link-operation {
				display: flex;
				justify-content: flex-start;
				align-items: center;

				.mvi-editor-menu-link-delete {
					opacity: 0.8;
					margin-right: @mp-md;

					&:hover {
						opacity: 1;
						cursor: pointer;
					}
				}

				.mvi-editor-menu-link-insert {
					&:hover {
						cursor: pointer;
					}
				}
			}
		}
	}

	.mvi-editor-menu-media {
		display: block;
		width: 5rem;
		padding: @mp-xs 0;

		.mvi-editor-menu-media-upload {
			display: block;
			width: 100%;
			padding: @mp-sm 0;
			font-size: 0.72rem;
			opacity: 0.8;
			text-align: center;

			&:not([disabled]):hover {
				cursor: pointer;
				opacity: 1;
			}

			&[disabled] {
				opacity: 0.5;
			}
		}

		.mvi-editor-menu-media-remote {
			display: block;
			width: 100%;
			padding: @mp-sm @mp-sm @mp-xs @mp-sm;

			input {
				appearance: none;
				-webkit-appearance: none;
				-moz-appearance: none;
				display: block;
				width: 100%;
				margin: 0;
				padding: @mp-xs;
				border: none;
				border-bottom: 1px solid @border-color;
				font-size: @font-size-default;
				color: @font-color-default;
				line-height: 1.5;
				margin-bottom: @mp-sm;
				transition: border-color 400ms;
				-moz-transition: border-color 400ms;
				-webkit-transition: border-color 400ms;

				&::-webkit-input-placeholder,
				&::placeholder {
					color: inherit;
					font-family: inherit;
					font-size: inherit;
					opacity: 0.5;
					vertical-align: middle;
				}

				&[disabled] {
					background-color: transparent;
					opacity: 0.8;
				}
			}

			.mvi-editor-menu-media-remote-insert {
				display: block;
				width: 100%;
				padding-top: @mp-sm;
				text-align: right;

				&:hover {
					cursor: pointer;
				}

				&[disabled] {
					opacity: 0.5;
				}
			}
		}
	}
}
</style>
