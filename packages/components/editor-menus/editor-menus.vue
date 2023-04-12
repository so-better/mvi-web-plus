<template>
	<div class="mvi-editor-menus" :style="{ border: border ? '' : 'none' }">
		<template v-for="(item, index) in menus">
			<editorMenu v-if="showMenu(item)" :options="item" :ref="el => (menuRefs[index] = el)">
				<template #layer v-if="isLayerMenu(item) && item.customLayer && $slots.layer">
					<slot name="layer" :options="item"></slot>
				</template>
			</editorMenu>
		</template>
		<!-- 跟随式浮层 -->
		<Layer v-if="editorInstance" v-model="editorInstance.dialogOptions.show" :target="editorInstance.dialogOptions.target" :root="`[data-id='mvi-editor-${uid}']`" placement="bottom-start" offset="0.1rem" :z-index="40" :timeout="100" shadow border :show-triangle="false" animation="mvi-editor-dialog" @hidden="dialogHidden">
			<div class="mvi-editor-dialog">
				<div v-if="editorInstance.dialogOptions.type == 'code'" class="mvi-editor-dialog-el">
					<div class="mvi-editor-dialog-target" @mouseenter="dialogBtnHover('enter', $event)" @mouseleave="dialogBtnHover('leave', $event)" @click="removeCode">删除代码</div>
				</div>
				<div v-if="editorInstance.dialogOptions.type == 'code'" :data-id="`mvi-editor-code-${uid}`" class="mvi-editor-dialog-el" @mouseenter="dialogElHover('enter')" @mouseleave="dialogElHover('leave')">
					<div class="mvi-editor-dialog-target" :data-id="`mvi-editor-code-target-${uid}`" @click="editorInstance.codeParams.show = true" @mouseenter="dialogBtnHover('enter', $event)" @mouseleave="dialogBtnHover('leave', $event)">
						<span>{{ languageLabelText }}</span>
						<Icon type="caret-down"></Icon>
					</div>
					<!-- 语言选择浮层 -->
					<Layer v-model="editorInstance.codeParams.show" :target="`[data-id='mvi-editor-code-target-${uid}']`" :root="`[data-id='mvi-editor-code-${uid}']`" placement="bottom-start" offset="0.2rem" :z-index="41" closable :timeout="100" shadow border :show-triangle="false" animation="mvi-editor-dialog">
						<div class="mvi-editor-dialog-layer">
							<div class="mvi-editor-dialog-layer-el" v-for="item in codeLanguageList" @click="selectLanguage(item)" @mouseenter="dialogLayerHover('enter', $event)" @mouseleave="dialogLayerHover('leave', $event)">{{ item.label }}</div>
						</div>
					</Layer>
				</div>
			</div>
		</Layer>
	</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import unactiveMenus from './unactiveMenus'
import { initOption, formatCode } from '../editor/util'
import defaultConfig from './defaultConfig'
import defaultLayerProps from './defaultLayerProps'
import defaultTooltipProps from './defaultTooltipProps'
import editorMenu from './editor-menu.vue'
import { Observe } from '../observe'
import { Icon } from '../icon'
import { Layer } from '../layer'

export default {
	name: 'm-editor-menus',
	emits: ['custom'],
	props: {
		//弹出式菜单浮层选项激活效果
		layerActiveClass: {
			type: String,
			default: null
		},
		//弹出式菜单浮层选项悬浮效果
		layerHoverClass: {
			type: String,
			default: null
		},
		//菜单项悬浮效果
		hoverClass: {
			type: String,
			default: null
		},
		//是否显示边框
		border: {
			type: Boolean,
			default: false
		},
		//菜单配置
		config: {
			type: Array,
			default: function () {
				return []
			}
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
		//自定义菜单的激活判定
		customActive: {
			type: Function,
			default: function () {
				return false
			}
		},
		//代码块语言配置
		codeLanguages: {
			type: Array,
			default: function () {
				return [
					{
						label: 'JavaScript',
						value: 'javascript'
					}
				]
			}
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	data() {
		return {
			//编辑器实例
			editorInstance: null,
			//菜单项数组
			menuRefs: []
		}
	},
	components: {
		editorMenu,
		Layer,
		Icon
	},
	computed: {
		//菜单列表
		menus() {
			let menus = defaultConfig.filter(item => {
				return !this.config.some(el => {
					return el.key == item.key
				})
			})
			menus = [...menus, ...this.config]
			menus = menus.map(item => {
				let obj = { ...item }
				//初始化菜单data
				obj.data = this.initMenuData(obj.data)
				//初始化菜单图标
				obj.icon = this.initMenuIcon(obj.icon)
				//初始化菜单是否禁用
				obj.disabled = Boolean(obj.disabled)
				//初始化菜单序列
				if (!Dap.number.isNumber(obj.index)) {
					obj.index = 0
				}
				return obj
			})
			return menus.sort((a, b) => {
				return a.index - b.index
			})
		},
		//是否显示菜单
		showMenu() {
			return item => {
				if (typeof item.data == 'boolean') {
					return item.data
				}
				if (Array.isArray(item.data)) {
					return true
				}
				return false
			}
		},
		//浮层组件配置
		combinedLayerProps() {
			if (!this.editorInstance) {
				return defaultLayerProps
			}
			return initOption(defaultLayerProps, this.layerProps)
		},
		//工具提示组件配置
		combinedTooltipProps() {
			if (!this.editorInstance) {
				return defaultTooltipProps
			}
			return initOption(defaultTooltipProps, this.tooltipProps)
		},
		//是否弹出式菜单
		isLayerMenu() {
			return item => {
				return Array.isArray(item.data)
			}
		},
		//是否为显示已选值的菜单
		isValueMenu() {
			return item => {
				return item.hasOwnProperty('value') && this.isLayerMenu(item)
			}
		},
		//显示代码语言类型
		languageLabelText() {
			const o = this.codeLanguageList.find(item => {
				return item.value == this.editorInstance.codeParams.currentLanguage
			})
			if (o) {
				return o.label
			}
			return ''
		},
		//可选择的代码语言类型
		codeLanguageList() {
			if (Array.isArray(this.codeLanguages)) {
				return [
					{
						label: 'Plain Text',
						value: 'plaintext'
					},
					...this.codeLanguages
				]
			}
			return [
				{
					label: 'Plain Text',
					value: 'plaintext'
				}
			]
		}
	},
	mounted() {
		Dap.event.on(window, `click.editor_${this.uid}`, this.judgeCloseDialog)
		Dap.event.on(document.documentElement, `mousedown.editor_${this.uid}`, this.judgeClearRange)
	},
	methods: {
		//初始化菜单图标
		initMenuIcon(icon) {
			//icon属性初始化
			if (Dap.common.isObject(icon)) {
				return {
					custom: icon.custom || false,
					value: icon.value || ''
				}
			}
			if (typeof icon == 'string' && icon) {
				return {
					custom: false,
					value: icon
				}
			}
			return null
		},
		//初始化菜单data
		initMenuData(data) {
			//data是数组
			if (Array.isArray(data)) {
				let newData = []
				data.forEach(item => {
					if (Dap.common.isObject(item)) {
						let o = { ...item }
						o.icon = this.initMenuIcon(item.icon)
						o.disabled = Boolean(item.disabled)
						newData.push(o)
					} else if (item) {
						newData.push({
							label: item,
							value: item
						})
					}
				})
				return newData
			}
			if (typeof data == 'boolean') {
				return data
			}
			return false
		},
		//监听编辑区域富文本内容中的dom：更新字号大小
		editorContentDomMonitor() {
			if (!this.editorInstance) {
				return
			}
			if (!this.editorInstance.$refs.content) {
				return
			}
			const observe = new Observe(this.editorInstance.$refs.content, {
				attributes: false,
				childList: true,
				subtree: true,
				childNodesChange: addNode => {
					if (addNode) {
						const fontSizeMenu = this.menus.find(menu => {
							return menu.key == 'fontSize'
						})
						if (fontSizeMenu && fontSizeMenu.data && fontSizeMenu.data.length) {
							const fontSize = addNode.style.fontSize
							switch (fontSize) {
								case 'x-small':
									addNode.style.fontSize = fontSizeMenu.data[0]?.value
									break
								case 'small':
									addNode.style.fontSize = fontSizeMenu.data[1]?.value
									break
								case 'medium':
									addNode.style.fontSize = fontSizeMenu.data[2]?.value
									break
								case 'large':
									addNode.style.fontSize = fontSizeMenu.data[3]?.value
									break
								case 'x-large':
									addNode.style.fontSize = fontSizeMenu.data[4]?.value
									break
								case 'xx-large':
									addNode.style.fontSize = fontSizeMenu.data[5]?.value
									break
								case 'xxx-large':
									addNode.style.fontSize = fontSizeMenu.data[6]?.value
									break
								default:
									break
							}
							this.editorInstance.changeActive()
						}
					}
				}
			})
			observe.init()
		},
		//设置菜单项的激活状态函数
		changeActiveJudgeFn() {
			let node = this.editorInstance.getSelectNode()
			if (!node) {
				return
			}
			for (let menu of this.menuRefs) {
				//弹出式菜单
				if (this.isLayerMenu(menu.options)) {
					//显示已选值的弹出式菜单
					if (this.isValueMenu(menu.options)) {
						menu.active = false
						menu.initSelectVal()
						//设置标题激活状态
						if (menu.options.key == 'title') {
							for (let dataItem of menu.options.data) {
								if (document.queryCommandValue('formatBlock').toLocaleLowerCase() == dataItem.value.toLocaleLowerCase()) {
									menu.active = true
									menu.selectVal = { ...dataItem }
									break
								}
							}
						}
						//设置字体激活状态
						else if (menu.options.key == 'fontFamily') {
							for (let dataItem of menu.options.data) {
								if (document.queryCommandValue('fontName') == dataItem.value) {
									menu.active = true
									menu.selectVal = { ...dataItem }
									break
								}
							}
						}
						//设置字号激活状态
						else if (menu.options.key == 'fontSize') {
							for (let dataItem of menu.options.data) {
								let value = dataItem.value
								if (value.endsWith('rem')) {
									const number = Number.parseFloat(value)
									if (Dap.number.isNumber(number)) {
										value = Dap.element.rem2px(number) + 'px'
									}
								}
								if (this.editorInstance.compareCss(node, 'font-size', value, false)) {
									menu.active = true
									menu.selectVal = { ...dataItem }
									break
								}
							}
						}
						//自定义菜单
						else if (!unactiveMenus.includes(menu.options.key)) {
							if (typeof this.customActive == 'function') {
								const obj = this.customActive(menu.options.key, menu.options.data, node)
								menu.active = obj.active || false
								menu.selectVal =
									menu.options.data.find(item => {
										return item.value == obj.value
									}) || {}
							}
						}
					}
					//普通的弹出式菜单
					else {
						menu.active = false
						menu.selectVal = {}
						//设置字体颜色激活状态
						if (menu.options.key == 'foreColor') {
							for (let dataItem of menu.options.data) {
								let value = dataItem.value
								//如果是十六进制颜色
								if (Dap.common.matchingText(value, 'hex')) {
									let rgbVal = Dap.color.hex2rgb(value)
									value = `rgb(${rgbVal[0]}, ${rgbVal[1]}, ${rgbVal[2]})`
								}
								if (document.queryCommandValue('foreColor') == value) {
									menu.active = true
									menu.selectVal = { ...dataItem }
									break
								}
							}
						}
						//设置背景色激活状态
						else if (menu.options.key == 'backColor') {
							for (let dataItem of menu.options.data) {
								let value = dataItem.value
								//如果是十六进制颜色
								if (Dap.common.matchingText(value, 'hex')) {
									let rgbVal = Dap.color.hex2rgb(value)
									value = `rgb(${rgbVal[0]}, ${rgbVal[1]}, ${rgbVal[2]})`
								}
								if (document.queryCommandValue('backColor') == value) {
									menu.active = true
									menu.selectVal = { ...dataItem }
									break
								}
							}
						}
						//设置对齐方式激活状态
						else if (menu.options.key == 'justify') {
							for (let dataItem of menu.options.data) {
								if (document.queryCommandState(dataItem.value)) {
									menu.active = true
									menu.selectVal = { ...dataItem }
									break
								}
							}
						}
						//设置链接激活状态
						else if (menu.options.key == 'link') {
							if (this.editorInstance.compareTag(node, 'a')) {
								menu.active = true
							}
						}
						//设置表格激活状态
						else if (menu.options.key == 'table') {
							if (this.editorInstance.compareTag(node, 'table')) {
								menu.active = true
							}
						}
						//自定义菜单
						else if (!unactiveMenus.includes(menu.options.key)) {
							if (typeof this.customActive == 'function') {
								const obj = this.customActive(menu.options.key, menu.options.data, node)
								menu.active = obj.active || false
								menu.selectVal =
									menu.options.data.find(item => {
										return item.value == obj.value
									}) || {}
							}
						}
					}
				}
				//普通菜单
				else {
					menu.active = false
					//设置加粗激活状态
					if (menu.options.key == 'bold') {
						if (document.queryCommandState('bold')) {
							menu.active = true
						}
					}
					//设置斜体激活状态
					else if (menu.options.key == 'italic') {
						if (document.queryCommandState('italic')) {
							menu.active = true
						}
					}
					//设置下划线激活状态
					else if (menu.options.key == 'underline') {
						if (document.queryCommandState('underline')) {
							menu.active = true
						}
					}
					//设置删除线激活状态
					else if (menu.options.key == 'strikeThrough') {
						if (document.queryCommandState('strikeThrough')) {
							menu.active = true
						}
					}
					//设置下标激活状态
					else if (menu.options.key == 'subscript') {
						if (document.queryCommandState('subscript')) {
							menu.active = true
						}
					}
					//设置上标激活状态
					else if (menu.options.key == 'superscript') {
						if (document.queryCommandState('superscript')) {
							menu.active = true
						}
					}
					//设置有序列表激活状态
					else if (menu.options.key == 'ol') {
						if (document.queryCommandState('insertOrderedList')) {
							menu.active = true
						}
					}
					//设置无序列表激活状态
					else if (menu.options.key == 'ul') {
						if (document.queryCommandState('insertUnorderedList')) {
							menu.active = true
						}
					}
					//设置引用激活状态
					else if (menu.options.key == 'quote') {
						if (document.queryCommandValue('formatBlock').toLocaleLowerCase() == 'blockquote') {
							menu.active = true
						}
					}
					//设置代码激活状态
					else if (menu.options.key == 'code') {
						this.editorInstance.dialogOptions.show = false
						this.$nextTick(() => {
							if (document.queryCommandValue('formatBlock').toLocaleLowerCase() == 'pre') {
								//设为激活状态
								menu.active = true
								//获取代码块元素
								const preEl = this.editorInstance.getCompareTag(node, 'pre')
								//跟随式浮层参数配置
								this.editorInstance.dialogOptions.type = menu.options.key
								this.editorInstance.dialogOptions.target = `[mvi-editor-element="${preEl.getAttribute('mvi-editor-element')}"]`
								this.editorInstance.dialogOptions.menuInstance = menu
								this.editorInstance.codeParams.currentLanguage = preEl.getAttribute('mvi-editor-code-language') || this.codeLanguageList[0]?.value
								//显示跟随式浮层
								this.editorInstance.dialogOptions.show = true
							}
						})
					}
					//设置源码视图激活状态
					else if (menu.options.key == 'codeView') {
						if (this.editorInstance.codeViewShow) {
							menu.active = true
						}
					}
					//自定义菜单
					else if (!unactiveMenus.includes(menu.options.key)) {
						if (typeof this.customActive == 'function') {
							const obj = this.customActive(menu.options.key, node)
							menu.active = obj.active || false
						}
					}
				}
			}
		},
		//判断是否清除range
		judgeClearRange(e) {
			if (!this.editorInstance) {
				return
			}
			//如果是在编辑器内或者菜单栏内不清除
			if (Dap.element.isContains(this.$el, e.target) || Dap.element.isContains(this.editorInstance.$el, e.target)) {
				return
			}
			this.editorInstance.range = null
		},
		//判断是否关闭跟随式弹窗
		judgeCloseDialog(e) {
			if (!this.editorInstance) {
				return
			}
			//如果是在编辑器内或者菜单栏内不关闭
			if (Dap.element.isContains(this.$el, e.target) || Dap.element.isContains(this.editorInstance.$el, e.target)) {
				return
			}
			this.editorInstance.dialogOptions.show = false
		},
		//选择代码语言
		selectLanguage(item) {
			//恢复选区
			this.editorInstance.restoreRange()
			//查找代码块元素
			const preEl = document.body.querySelector(this.editorInstance.dialogOptions.target)
			//设置当前显示的语言类型
			this.editorInstance.codeParams.currentLanguage = item.value
			//记录语言类型
			if (preEl) {
				preEl.setAttribute('mvi-editor-code-language', item.value)
			}
			//进行格式化
			formatCode(preEl)
			//关闭语言类型选择浮层
			this.editorInstance.codeParams.show = false
		},
		//跟随式浮层关闭
		dialogHidden() {
			this.editorInstance.dialogOptions.target = ''
			this.editorInstance.dialogOptions.type = ''
			this.editorInstance.dialogOptions.menuInstance = null
			this.editorInstance.codeParams.show = false
			this.editorInstance.codeParams.target = ''
			this.editorInstance.codeParams.currentLanguage = ''
		},
		//跟随式浮层按钮根元素悬浮
		dialogElHover(type) {
			if (this.trigger != 'hover') {
				return
			}
			if (type == 'enter') {
				if (this.editorInstance.dialogOptions.type == 'code' && this.trigger == 'hover') {
					this.editorInstance.codeParams.show = true
				}
			} else if (type == 'leave') {
				if (this.editorInstance.dialogOptions.type == 'code' && this.trigger == 'hover') {
					this.editorInstance.codeParams.show = false
				}
			}
		},
		//跟随式浮层中的按钮悬浮效果
		dialogBtnHover(type, event) {
			if (!this.editorInstance) {
				return
			}
			if (this.editorInstance.disabled) {
				return
			}
			if (type == 'enter') {
				if (this.hoverClass) {
					Dap.element.addClass(event.currentTarget, this.hoverClass)
				}
			} else if (type == 'leave') {
				if (this.hoverClass) {
					Dap.element.removeClass(event.currentTarget, this.hoverClass)
				}
			}
		},
		//跟随式浮层上的浮层选项悬浮效果设置
		dialogLayerHover(type, event) {
			if (!this.editorInstance) {
				return
			}
			if (this.editorInstance.disabled) {
				return
			}
			if (type == 'enter') {
				if (this.layerHoverClass) {
					Dap.element.addClass(event.currentTarget, this.layerHoverClass)
				}
			} else if (type == 'leave') {
				if (this.layerHoverClass) {
					Dap.element.removeClass(event.currentTarget, this.layerHoverClass)
				}
			}
		},
		//删除代码块
		removeCode() {
			if (this.editorInstance.dialogOptions.menuInstance) {
				this.editorInstance.restoreRange()
				this.editorInstance.dialogOptions.menuInstance.removeCode()
			}
		}
	},
	beforeUnmount() {
		Dap.event.off(window, `click.editor_${this.uid}`)
		Dap.event.off(document.documentElement, `mousedown.editor_${this.uid}`)
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-editor-menus {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-wrap: wrap;
	width: 100%;
	background-color: #fff;
	color: @font-color-default;
	margin-bottom: @mp-sm;
	border: 1px solid @border-color;
	border-radius: @radius-default;
	padding: @mp-xs @mp-sm;
	font-size: @font-size-default;
}

.mvi-editor-dialog {
	position: relative;
	padding: @mp-sm;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background-color: #fff;
	color: @font-color-default;
	font-size: @font-size-default;

	.mvi-editor-dialog-el {
		position: relative;
		display: block;

		.mvi-editor-dialog-target {
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

			.mvi-icon {
				transform: scale(0.5);
			}
		}
	}
}

.mvi-editor-dialog-layer {
	display: block;
	padding: @mp-xs 0;
	max-height: 5rem;
	width: 2.2rem;
	overflow-x: hidden;
	overflow-y: auto;
	background-color: #fff;
	color: @font-color-default;
	font-size: @font-size-default;

	.mvi-editor-dialog-layer-el {
		display: block;
		padding: @mp-xs @mp-sm;
		margin: 0;
		white-space: nowrap;
		text-overflow: ellipsis;
		overflow: hidden;
		text-align: center;
		opacity: 0.8;
		width: 100%;

		&:hover {
			opacity: 1;
			cursor: pointer;
			background-color: @bg-color-default;
		}
	}
}

:deep(.mvi-editor-dialog-code-select.mvi-select.mvi-select-small .mvi-select-target) {
	height: @mini-height;
}
</style>
