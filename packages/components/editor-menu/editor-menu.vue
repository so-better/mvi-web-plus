<template>
	<div class="mvi-editor-menu" :data-id="`mvi-editor-menu-${uid}`" @mouseenter="menuHover('enter')" @mouseleave="menuHover('leave')">
		<Tooltip :disabled="!menus.useTooltip || !title || cmpDisabled" :title="title" trigger="hover" :placement="menus.combinedTooltipProps.placement" :timeout="menus.combinedTooltipProps.timeout" :color="menus.combinedTooltipProps.color" :text-color="menus.combinedTooltipProps.textColor" :border-color="menus.combinedTooltipProps.borderColor" :offset="menus.combinedTooltipProps.offset" :z-index="menus.combinedTooltipProps.zIndex" :fixed="menus.combinedTooltipProps.fixed" :fixed-auto="menus.combinedTooltipProps.fixedAuto" :width="menus.combinedTooltipProps.width" :animation="menus.combinedTooltipProps.animation" :show-triangle="menus.combinedTooltipProps.showTriangle" block>
			<div :disabled="cmpDisabled || null" class="mvi-editor-menu-el" :data-id="`mvi-editor-menu-el-${uid}`" @click="menuClick" :style="editorMenuElStyle">
				<!-- 显示下拉选的值 -->
				<span v-if="type == 'display'" class="mvi-editor-menu-text">{{ selectedVal.label }}</span>
				<!-- 菜单项图标 -->
				<Icon v-else-if="parseIcon(icon).type || parseIcon(icon).url" :type="parseIcon(icon).type" :url="parseIcon(icon).url" :size="parseIcon(icon).size" :color="parseIcon(icon).color" :spin="parseIcon(icon).spin"></Icon>
				<!-- 下拉选倒三角图标 -->
				<Icon v-if="type == 'select' || type == 'display'" type="caret-down" class="mvi-editor-menu-caret"></Icon>
			</div>
		</Tooltip>
		<Layer v-if="type == 'select' || type == 'display'" v-model="layerShow" ref="layer" :placement="menus.combinedLayerProps.placement" :z-index="menus.combinedLayerProps.zIndex" :fixed="menus.combinedLayerProps.fixed" :fixed-auto="menus.combinedLayerProps.fixedAuto" :offset="menus.combinedLayerProps.offset" :wrapper-class="menus.combinedLayerProps.wrapperClass" :timeout="menus.combinedLayerProps.timeout" :show-triangle="menus.combinedLayerProps.showTriangle" :animation="menus.combinedLayerProps.animation" :shadow="menus.combinedLayerProps.shadow" :border="menus.combinedLayerProps.border" :width="menus.combinedLayerProps.width" :closable="menus.trigger == 'click'" :target="`[data-id='mvi-editor-menu-el-${uid}']`" :root="`[data-id='mvi-editor-menu-${uid}']`">
			<!-- 字体颜色、背景色 -->
			<div v-if="name == 'foreColor' || name == 'backColor'" class="mvi-editor-menu-colors">
				<div class="mvi-editor-menu-color" :style="menuColorStyle(item)" v-for="item in parseList">
					<Tooltip :disabled="!menus.useTooltip || !item.label || cmpDisabled" trigger="hover" :title="item.label" :placement="menus.combinedTooltipProps.placement" :timeout="menus.combinedTooltipProps.timeout" :color="menus.combinedTooltipProps.color" :text-color="menus.combinedTooltipProps.textColor" :border-color="menus.combinedTooltipProps.borderColor" :offset="menus.combinedTooltipProps.offset" :z-index="menus.combinedTooltipProps.zIndex" :fixed="menus.combinedTooltipProps.fixed" :fixed-auto="menus.combinedTooltipProps.fixedAuto" :width="menus.combinedTooltipProps.width" :animation="menus.combinedTooltipProps.animation" :show-triangle="menus.combinedTooltipProps.showTriangle" block>
						<div :style="{ backgroundColor: item.value }" @click="layerClick(item)" class="mvi-editor-menu-color-el"></div>
					</Tooltip>
				</div>
			</div>
			<!-- 表格 -->
			<div v-else-if="name == 'table'"></div>
			<!-- 链接 -->
			<div v-else-if="name == 'link'"></div>
			<!-- 图片或者视频 -->
			<div v-else-if="name == 'image' || name == 'video'"></div>
			<!-- 正常的下拉选 -->
			<div v-else class="mvi-editor-menu-default">
				<EditorTag :tag="layerElTag(item)" v-for="item in parseList" :class="['mvi-editor-menu-layer-el', selectedVal.value == item.value ? 'active' : '']" @click="layerClick(item)">
					<Icon v-if="item.icon.type || item.icon.url" class="mvi-editor-menu-layer-icon" :type="item.icon.type" :url="item.icon.url" :spin="item.icon.spin" :size="item.icon.size" :color="item.icon.color" />
					<span v-text="item.label"></span>
				</EditorTag>
			</div>
			<!-- 自定义浮层内容 -->
			<slot name="layer" v-if="$slots.layer"></slot>
		</Layer>
	</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Icon } from '../icon'
import { Tooltip } from '../tooltip'
import { Layer } from '../layer'
import EditorTag from './editor-tag.vue'
import definedMenus from './definedMenus'
import { AlexElement } from 'alex-editor'
import elementUtil from './elementUtil'
//根据名称获取指定菜单项配置
const getMenu = name => {
	if (name == 'custom') {
		return null
	}
	return definedMenus.find(item => {
		return name == item.name
	})
}
export default {
	name: 'm-editor-menu',
	emits: ['custom'],
	props: {
		//菜单项名称，唯一标识
		name: {
			type: String,
			default: '',
			validator(value) {
				const names = definedMenus.map(item => {
					return item.name
				})
				return [...names, 'custom'].includes(value)
			}
		},
		//菜单项类型
		type: {
			type: String,
			default: function (props) {
				const menu = getMenu(props.name)
				return menu ? menu.type : 'default'
			},
			validator(value) {
				//default表示一般的菜单项，显示图标
				//select表示下拉选形式的菜单选项，显示图标
				//display表示显示值的下拉选菜单项，不显示图标
				return ['default', 'select', 'display'].includes(value)
			}
		},
		//菜单项使用的图标
		icon: {
			type: [String, Object],
			default: function (props) {
				const menu = getMenu(props.name)
				return menu ? menu.icon : null
			}
		},
		//下拉选菜单项的列表配置
		list: {
			type: Array,
			default: function (props) {
				const menu = getMenu(props.name)
				//包含label/value/icon三个属性
				return menu ? menu.list : []
			}
		},
		//工具提示内容
		title: {
			type: String,
			default: function (props) {
				const menu = getMenu(props.name)
				return menu ? menu.title : ''
			}
		},
		//下拉选菜单的默认值
		value: {
			type: [String, Number],
			default: function (props) {
				const menu = getMenu(props.name)
				return menu ? menu.value : null
			}
		},
		//是否禁用菜单项
		disabled: {
			type: Boolean,
			default: false
		},
		//自定义菜单项的激活判定
		customActive: {
			type: Function,
			default: null
		}
	},
	inject: ['menus'],
	data() {
		return {
			//下拉选菜单项的默认值
			defaultVal: {},
			//下拉选菜单项的已选值
			selectedVal: {},
			//浮层是否显示
			layerShow: false,
			//是否激活此菜单项，一般下拉选式菜单项不使用此属性
			active: false
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
		//转换列表字段
		parseList() {
			if (Array.isArray(this.list)) {
				return this.list.map(item => {
					let obj = {}
					if (Dap.common.isObject(item)) {
						obj.label = item.label
						obj.value = item.value
						obj.icon = this.parseIcon(item.icon)
					} else if (typeof item == 'string') {
						obj.label = item
						obj.value = item
						obj.icon = this.parseIcon(null)
					}
					return obj
				})
			}
			return []
		},
		//菜单项是否禁用
		cmpDisabled() {
			//菜单项直接禁用
			if (this.disabled) {
				return true
			}
			//菜单栏整体禁用
			if (this.menus.disabled) {
				return true
			}
			//如果编辑器还没有获取则禁用
			if (!this.menus.instance) {
				return true
			}
			//编辑器被禁用
			if (this.menus.instance.disabled) {
				return true
			}
			//如果是代码视图，则禁用除"codeView"菜单项以外的所有菜单
			if (this.menus.instance.codeViewShow && this.name != 'codeView') {
				return true
			}
			//如果编辑器没有获取焦点
			if (!this.menus.instance.focus) {
				return true
			}
			return false
		},
		//下拉选选项的渲染元素
		layerElTag() {
			return item => {
				if (this.name == 'title') {
					return item.value
				}
				return 'div'
			}
		},
		//菜单项激活样式设置
		editorMenuElStyle() {
			let style = {}
			if (this.cmpDisabled) {
				return style
			}
			if (this.active) {
				style.opacity = 1
				if (this.menus.instance.activeColor) {
					style.color = this.menus.instance.activeColor
				}
			}
			return style
		},
		//判断是否编辑器内部配置的菜单项
		isDefinedMenu() {
			const menu = getMenu(this.name)
			return !!menu
		},
		//颜色选取板每个颜色块的样式
		menuColorStyle() {
			return item => {
				let style = {}
				if (this.cmpDisabled) {
					return style
				}
				if (this.selectedVal.value == item.value && this.menus.instance.activeColor) {
					style.borderColor = this.menus.instance.activeColor
				}
				return style
			}
		}
	},
	components: {
		Icon,
		Tooltip,
		Layer,
		EditorTag
	},
	setup() {
		return {
			uid: getCurrentInstance().uid
		}
	},
	watch: {
		//监听list变化设置初始值为list第一个选项
		list: {
			handler: function (newVal) {
				if (newVal && this.type == 'display') {
					if (this.value === null || this.value === undefined) {
						this.selectedVal = { ...this.parseList[0] }
						this.defaultVal = { ...this.parseList[0] }
					} else {
						this.selectedVal = this.parseList.find(item => {
							return item.value == this.value
						}) || { ...this.parseList[0] }
						this.defaultVal = this.parseList.find(item => {
							return item.value == this.value
						}) || { ...this.parseList[0] }
					}
				}
			},
			immediate: true
		}
	},
	mounted() {
		//对editor组件实例进行监听，如果存在了，则对alexEditor插件的rangeUpdate事件进行监听
		const unwatch = this.$watch('menus.instance', instance => {
			instance.editor.on('rangeUpdate', this.handleRangeUpdate)
			unwatch()
		})
	},
	methods: {
		//菜单项悬浮
		menuHover(type) {
			if (this.cmpDisabled) {
				return
			}
			if (this.menus.trigger != 'hover') {
				return
			}
			if (type == 'enter') {
				this.showLayer()
			} else if (type == 'leave') {
				this.hideLayer()
			}
		},
		//浮层点击
		layerClick(item) {
			if (this.cmpDisabled) {
				return
			}
			//如果是内部已配置菜单
			if (this.isDefinedMenu) {
				this.handleOpt(item)
			}
			//自定义菜单项
			else {
				this.$emit('custom', { ...item })
			}
			//隐藏浮层
			this.hideLayer()
		},
		//菜单项点击
		menuClick() {
			if (this.cmpDisabled) {
				return
			}
			//如果是下拉选形式的菜单
			if (this.type == 'select' || this.type == 'display') {
				if (this.menus.trigger == 'click') {
					if (this.layerShow) {
						this.hideLayer()
					} else {
						this.showLayer()
					}
				}
			}
			//如果是普通菜单则直接作用
			else {
				//如果是内部已配置菜单
				if (this.isDefinedMenu) {
					this.handleOpt()
				} else {
					//触发自定义操作
					this.$emit('custom')
				}
			}
		},
		//显示浮层
		showLayer() {
			if (this.cmpDisabled) {
				return
			}
			if (this.type == 'select' || this.type == 'display') {
				this.layerShow = true
			}
		},
		//隐藏浮层
		hideLayer() {
			if (this.type == 'select' || this.type == 'display') {
				this.layerShow = false
			}
		},
		//执行富文本操作
		handleOpt(item) {
			if (this.cmpDisabled) {
				return
			}
			const editor = this.menus.instance.editor
			//撤销
			if (this.name == 'undo') {
				const historyRecord = editor.history.get(-1)
				if (historyRecord) {
					editor.stack = historyRecord.stack
					editor.range = historyRecord.range
					editor.formatElementStack()
					editor.domRender(true)
					editor.rangeRender()
				}
			}
			//重做
			else if (this.name == 'redo') {
				const historyRecord = editor.history.get(1)
				if (historyRecord) {
					editor.stack = historyRecord.stack
					editor.range = historyRecord.range
					editor.formatElementStack()
					editor.domRender(true)
					editor.rangeRender()
				}
			}
			//清除格式
			else if (this.name == 'removeFormat') {
				editor.removeTextStyle()
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//分隔线
			else if (this.name == 'divider') {
				const marks = {
					class: 'mvi-editor-divider'
				}
				//创建分隔线
				const divider = editor.formatElement(new AlexElement('closed', 'hr', marks, null, null))
				//插入分割线
				editor.insertElement(divider)
				//换行
				editor.insertParagraph()
				//重新渲染
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//加粗
			else if (this.name == 'bold') {
				if (this.active) {
					editor.removeTextStyle(['font-weight'])
				} else {
					editor.setTextStyle({
						'font-weight': 'bold'
					})
				}
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//斜体
			else if (this.name == 'italic') {
				if (this.active) {
					editor.removeTextStyle(['font-style'])
				} else {
					editor.setTextStyle({
						'font-style': 'italic'
					})
				}
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//下划线
			else if (this.name == 'underline') {
				if (this.active) {
					editor.removeTextStyle(['text-decoration-line', 'text-decoration'])
				} else {
					editor.setTextStyle({
						'text-decoration-line': 'underline'
					})
				}
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//删除线
			else if (this.name == 'strikeThrough') {
				if (this.active) {
					editor.removeTextStyle(['text-decoration-line', 'text-decoration'])
				} else {
					editor.setTextStyle({
						'text-decoration-line': 'line-through'
					})
				}
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//下标
			else if (this.name == 'subscript') {
				if (this.active) {
					editor.removeTextStyle(['vertical-align'])
				} else {
					editor.setTextStyle({
						'vertical-align': 'sub'
					})
				}
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//上标
			else if (this.name == 'superscript') {
				if (this.active) {
					editor.removeTextStyle(['vertical-align'])
				} else {
					editor.setTextStyle({
						'vertical-align': 'super'
					})
				}
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//标题
			else if (this.name == 'title') {
				if (editor.range.anchor.isEqual(editor.range.focus)) {
					const block = editor.range.anchor.element.getBlock()
					//先转为段落
					elementUtil.toParagraph(block)
					//设置标题
					block.parsedom = item.value
				} else {
					const elements = editor.getElementsByRange(true, false)
					elements.forEach(el => {
						if (el.isBlock()) {
							elementUtil.toParagraph(el)
							el.parsedom = item.value
						} else {
							const block = el.getBlock()
							elementUtil.toParagraph(block)
							block.parsedom = item.value
						}
					})
				}
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//字体
			else if (this.name == 'fontFamily') {
				editor.setTextStyle({
					'font-family': item.value
				})
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//字号
			else if (this.name == 'fontSize') {
				editor.setTextStyle({
					'font-size': item.value
				})
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//字体颜色
			else if (this.name == 'foreColor') {
				editor.setTextStyle({
					color: item.value
				})
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//背景颜色
			else if (this.name == 'backColor') {
				editor.setTextStyle({
					'background-color': item.value
				})
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//有序列表和无序列表
			else if (this.name == 'ol' || this.name == 'ul') {
				this.insertList(this.name == 'ol')
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//对齐方式
			else if (this.name == 'justify') {
				if (editor.range.anchor.isEqual(editor.range.focus)) {
					const block = editor.range.anchor.element.getBlock()
					if (block.hasStyles()) {
						block.styles['text-align'] = item.value
					} else {
						block.styles = {
							'text-align': item.value
						}
					}
				} else {
					const elements = editor.getElementsByRange(true, false)
					elements.forEach(el => {
						if (el.isBlock()) {
							if (el.hasStyles()) {
								el.styles['text-align'] = item.value
							} else {
								el.styles = {
									'text-align': item.value
								}
							}
						} else {
							const block = el.getBlock()
							if (block.hasStyles()) {
								block.styles['text-align'] = item.value
							} else {
								block.styles = {
									'text-align': item.value
								}
							}
						}
					})
				}
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//引用
			else if (this.name == 'quote') {
				//起点和终点在一起
				if (editor.range.anchor.isEqual(editor.range.focus)) {
					const block = editor.range.anchor.element.getBlock()
					elementUtil.toParagraph(block)
					if (!this.active) {
						block.parsedom = 'blockquote'
					}
				}
				//起点和终点不在一起
				else {
					const elements = editor.getElementsByRange(true, false)
					elements.forEach(el => {
						if (el.isBlock()) {
							elementUtil.toParagraph(el)
							if (!this.active) {
								el.parsedom = 'blockquote'
							}
						} else {
							const block = el.getBlock()
							elementUtil.toParagraph(block)
							if (!this.active) {
								block.parsedom = 'blockquote'
							}
						}
					})
				}
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//源码视图
			else if (this.name == 'codeView') {
				this.menus.instance.codeViewShow = !this.menus.instance.codeViewShow
			}
		},
		//监听range更新
		handleRangeUpdate() {
			if (this.cmpDisabled) {
				return
			}
			const editor = this.menus.instance.editor
			//加粗判定
			if (this.name == 'bold') {
				this.active = editor.queryTextStyle('font-weight', 'bold')
			}
			//斜体判定
			else if (this.name == 'italic') {
				this.active = editor.queryTextStyle('font-style', 'italic')
			}
			//下划线判定
			else if (this.name == 'underline') {
				this.active = editor.queryTextStyle('text-decoration-line', 'underline') || editor.queryTextStyle('text-decoration', 'underline')
			}
			//删除线判定
			else if (this.name == 'strikeThrough') {
				this.active = editor.queryTextStyle('text-decoration-line', 'line-through') || editor.queryTextStyle('text-decoration', 'line-through')
			}
			//下标判定
			else if (this.name == 'subscript') {
				this.active = editor.queryTextStyle('vertical-align', 'sub')
			}
			//上标判定
			else if (this.name == 'superscript') {
				this.active = editor.queryTextStyle('vertical-align', 'super')
			}
			//标题判定
			else if (this.name == 'title') {
				if (editor.range.anchor.isEqual(editor.range.focus)) {
					this.selectedVal = this.parseList.find(item => {
						return item.value == editor.range.anchor.element.getBlock().parsedom
					}) || { ...this.defaultVal }
				} else {
					const elements = editor.getElementsByRange(true, false)
					this.selectedVal = this.parseList.find(item => {
						return elements.every(el => {
							if (el.isBlock()) {
								return el.parsedom == item.value
							}
							const block = el.getBlock()
							return block.parsedom == item.value
						})
					}) || { ...this.defaultVal }
					editor.formatElementStack()
				}
			}
			//字体判定
			else if (this.name == 'fontFamily') {
				this.selectedVal = this.parseList.find(item => {
					return editor.queryTextStyle('font-family', item.value)
				}) || { ...this.defaultVal }
			}
			//字号判定
			else if (this.name == 'fontSize') {
				this.selectedVal = this.parseList.find(item => {
					return editor.queryTextStyle('font-size', item.value)
				}) || { ...this.defaultVal }
			}
			//字体颜色判定
			else if (this.name == 'foreColor') {
				this.selectedVal =
					this.parseList.find(item => {
						return editor.queryTextStyle('color', item.value)
					}) || {}
			}
			//背景颜色判定
			else if (this.name == 'backColor') {
				this.selectedVal =
					this.parseList.find(item => {
						return editor.queryTextStyle('background-color', item.value)
					}) || {}
			}
			//有序列表和无序列表判定
			else if (this.name == 'ol' || this.name == 'ul') {
				//起点和终点在一起
				if (editor.range.anchor.isEqual(editor.range.focus)) {
					const block = editor.range.anchor.element.getBlock()
					this.active = elementUtil.isList(block, this.name == 'ol')
				}
				//起点和终点不在一起
				else {
					const elements = editor.getElementsByRange(true, false)
					this.active = elements.every(el => {
						if (el.isBlock()) {
							return elementUtil.isList(el, this.name == 'ol')
						} else {
							const block = el.getBlock()
							return elementUtil.isList(block, this.name == 'ol')
						}
					})
					editor.formatElementStack()
				}
			}
			//对齐方式判定
			else if (this.name == 'justify') {
				//起点和终点在一起
				if (editor.range.anchor.isEqual(editor.range.focus)) {
					const block = editor.range.anchor.element.getBlock()
					this.selectedVal =
						this.parseList.find(item => {
							return block.hasStyles() && block.styles['text-align'] == item.value
						}) || {}
				} else {
					const elements = editor.getElementsByRange(true, false)
					this.selectedVal =
						this.parseList.find(item => {
							return elements.every(el => {
								if (el.isBlock()) {
									return el.hasStyles() && el.styles['text-align'] == item.value
								}
								const block = el.getBlock()
								return block.hasStyles() && block.styles['text-align'] == item.value
							})
						}) || {}
					editor.formatElementStack()
				}
			}
			//引用判定
			else if (this.name == 'quote') {
				if (editor.range.anchor.isEqual(editor.range.focus)) {
					const block = editor.range.anchor.element.getBlock()
					this.active = block.parsedom == 'blockquote'
				} else {
					const elements = editor.getElementsByRange(true, false)
					this.active = elements.every(el => {
						if (el.isBlock()) {
							return el.parsedom == 'blockquote'
						} else {
							const block = el.getBlock()
							return block.parsedom == 'blockquote'
						}
					})
					editor.formatElementStack()
				}
			}
			//自定义菜单项的激活判定
			else if (!this.isDefinedMenu) {
				if (typeof this.customActive == 'function') {
					const obj = this.customActive.apply(this)
					if (this.type == 'default') {
						this.active = obj
					} else {
						this.selectedVal = this.parseList.find(item => {
							return item.value == obj
						}) || { ...this.defaultVal }
					}
				}
			}
		},
		//插入有序列表或者无序列表
		insertList(ordered = false) {
			const editor = this.menus.instance.editor
			//起点和终点在一起
			if (editor.range.anchor.isEqual(editor.range.focus)) {
				const block = editor.range.anchor.element.getBlock()
				elementUtil.toParagraph(block)
				if (!this.active) {
					elementUtil.toList(block, ordered)
				}
			}
			//起点和终点不在一起
			else {
				const elements = this.menus.instance.editor.getElementsByRange(true, false)
				elements.forEach(el => {
					if (el.isBlock()) {
						elementUtil.toParagraph(el)
						if (!this.active) {
							elementUtil.toList(el, ordered)
						}
					} else {
						const block = el.getBlock()
						elementUtil.toParagraph(block)
						if (!this.active) {
							elementUtil.toList(block, ordered)
						}
					}
				})
			}
		}
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-editor-menu {
	display: block;
	padding: @mp-xs;

	.mvi-editor-menu-el {
		display: flex;
		justify-content: flex-start;
		align-items: center;
		white-space: nowrap;
		padding: @mp-sm;
		border-radius: @radius-default;
		opacity: 0.8;
		line-height: 1;

		&:hover {
			opacity: 1;
			cursor: pointer;
			background-color: @bg-color-default;
		}

		&:active {
			background-color: @bg-color-dark;
		}

		&[disabled] {
			opacity: 0.6;
			background-color: transparent;
		}

		.mvi-editor-menu-text {
			max-width: 2.8rem;
			text-overflow: ellipsis;
			overflow: hidden;
			white-space: nowrap;
		}

		.mvi-editor-menu-caret {
			transform: scale(0.5);
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
					transform: translate3d(0, 0, 0) scale(1.5);
					z-index: 2;
				}
			}
		}
	}

	.mvi-editor-menu-default {
		display: block;
		padding: @mp-xs 0;
		max-height: 8rem;
		overflow-x: hidden;
		overflow-y: auto;

		.mvi-editor-menu-layer-el {
			display: flex;
			justify-content: center;
			align-items: center;
			padding: @mp-sm @mp-lg;
			margin: 0;
			text-align: center;
			opacity: 0.8;

			&:hover {
				opacity: 1;
				cursor: pointer;
				background-color: @bg-color-default;
			}

			&:active {
				background-color: @bg-color-dark;
			}

			&.active {
				background-color: @bg-color-dark;
			}

			.mvi-editor-menu-layer-icon {
				margin-right: @mp-xs;
			}

			span {
				max-width: 2.8rem;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
			}
		}
	}
}
</style>
