<template>
	<div class="mvi-editor-menus" :style="{ border: border ? '' : 'none' }">
		<template v-for="(item, index) in menus">
			<editorMenu v-if="showMenu(item)" :options="item" :ref="el => (menuRefs[index] = el)">
				<template #layer v-if="isLayerMenu(item) && item.customLayer && $slots.layer">
					<slot name="layer" :options="item"></slot>
				</template>
			</editorMenu>
		</template>
	</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import defaultConfig from './defaultConfig'
import defaultLayerProps from './defaultLayerProps'
import defaultTooltipProps from './defaultTooltipProps'
import editorMenu from './editor-menu.vue'
import { Observe } from '../observe'
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
		editorMenu
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
			return this.editorInstance.initOption(defaultLayerProps, this.layerProps)
		},
		//工具提示组件配置
		combinedTooltipProps() {
			if (!this.editorInstance) {
				return defaultTooltipProps
			}
			return this.editorInstance.initOption(defaultTooltipProps, this.tooltipProps)
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
		}
	},
	mounted() {
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
					if (typeof item == 'string' && item) {
						newData.push({
							label: item,
							value: item,
							icon: null,
							disabled: false,
							hoverClass: null,
							activeClass: null
						})
					} else if (Dap.common.isObject(item)) {
						newData.push({
							label: item.label,
							value: item.value,
							icon: this.initMenuIcon(item.icon),
							disabled: Boolean(item.disabled),
							hoverClass: item.hoverClass,
							activeClass: item.activeClass
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
		//监听编辑区域富文本内容中的dom
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
			let nodes = this.editorInstance.getSelectNodes()
			if (!nodes.length) {
				return
			}
			for (let menu of this.menuRefs) {
				//弹出式菜单
				if (this.isLayerMenu(menu.options)) {
					//显示已选值的弹出式菜单
					if (this.isValueMenu(menu.options)) {
						//设置标题激活状态
						if (menu.options.key == 'title') {
							for (let dataItem of menu.options.data) {
								if (document.queryCommandValue('formatBlock').toLocaleLowerCase() == dataItem.value.toLocaleLowerCase()) {
									menu.active = true
									menu.selectVal = { ...dataItem }
									break
								}
								menu.initSelectVal()
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
								menu.initSelectVal()
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
								let flag = nodes.every(node => {
									return this.editorInstance.compareCss(node, 'font-size', value, false)
								})
								if (flag) {
									menu.active = true
									menu.selectVal = { ...dataItem }
									break
								}
								menu.initSelectVal()
							}
						}
					}
					//普通的弹出式菜单
					else {
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
								menu.active = false
								menu.selectVal = {}
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
								menu.active = false
								menu.selectVal = {}
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
								menu.active = false
								menu.selectVal = {}
							}
						}
					}
				}
				//普通菜单
				else {
					//设置加粗激活状态
					if (menu.options.key == 'bold') {
						if (document.queryCommandState('bold')) {
							menu.active = true
						} else {
							menu.active = false
						}
					}
					//设置斜体激活状态
					else if (menu.options.key == 'italic') {
						if (document.queryCommandState('italic')) {
							menu.active = true
						} else {
							menu.active = false
						}
					}
					//设置下划线激活状态
					else if (menu.options.key == 'underline') {
						if (document.queryCommandState('underline')) {
							menu.active = true
						} else {
							menu.active = false
						}
					}
					//设置删除线激活状态
					else if (menu.options.key == 'strikeThrough') {
						if (document.queryCommandState('strikeThrough')) {
							menu.active = true
						} else {
							menu.active = false
						}
					}
					//设置下标激活状态
					else if (menu.options.key == 'subscript') {
						if (document.queryCommandState('subscript')) {
							menu.active = true
						} else {
							menu.active = false
						}
					}
					//设置上标激活状态
					else if (menu.options.key == 'superscript') {
						if (document.queryCommandState('superscript')) {
							menu.active = true
						} else {
							menu.active = false
						}
					}
					//设置有序列表激活状态
					else if (menu.options.key == 'ol') {
						if (document.queryCommandState('insertOrderedList')) {
							menu.active = true
						} else {
							menu.active = false
						}
					}
					//设置无序列表激活状态
					else if (menu.options.key == 'ul') {
						if (document.queryCommandState('insertUnorderedList')) {
							menu.active = true
						} else {
							menu.active = false
						}
					}
					//设置引用激活状态
					else if (menu.options.key == 'quote') {
						if (document.queryCommandValue('formatBlock').toLocaleLowerCase() == 'blockquote') {
							menu.active = true
						} else {
							menu.active = false
						}
					}
					//设置代码视图激活状态
					else if (menu.options.key == 'codeView') {
						if (this.editorInstance.codeViewShow) {
							menu.active = true
						} else {
							menu.active = false
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
		}
	},
	beforeUnmount() {
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
</style>
