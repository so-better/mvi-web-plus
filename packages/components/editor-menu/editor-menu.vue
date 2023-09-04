<template>
	<div class="mvi-editor-menu" :data-id="`mvi-editor-menu-${uid}`" @mouseenter="menuHover('enter')" @mouseleave="menuHover('leave')">
		<Tooltip :disabled="!menus.useTooltip || !title || cmpDisabled" :title="title" trigger="hover" :placement="menus.combinedTooltipProps.placement" :timeout="menus.combinedTooltipProps.timeout" :color="menus.combinedTooltipProps.color" :text-color="menus.combinedTooltipProps.textColor" :border-color="menus.combinedTooltipProps.borderColor" :offset="menus.combinedTooltipProps.offset" :z-index="menus.combinedTooltipProps.zIndex" :fixed="menus.combinedTooltipProps.fixed" :fixed-auto="menus.combinedTooltipProps.fixedAuto" :width="menus.combinedTooltipProps.width" :animation="menus.combinedTooltipProps.animation" :show-triangle="menus.combinedTooltipProps.showTriangle" block>
			<div :disabled="cmpDisabled || null" class="mvi-editor-menu-el" :data-id="`mvi-editor-menu-el-${uid}`" @click="menuClick" :style="activeColorStyle">
				<!-- 显示下拉选的值 -->
				<span v-if="type == 'display'" class="mvi-editor-menu-text">{{ selectedVal.label }}</span>
				<!-- 菜单项图标 -->
				<Icon v-else-if="parseIcon(icon).type || parseIcon(icon).url" :type="parseIcon(icon).type" :url="parseIcon(icon).url" :size="parseIcon(icon).size" :color="parseIcon(icon).color" :spin="parseIcon(icon).spin"></Icon>
				<!-- 下拉选倒三角图标 -->
				<Icon v-if="type == 'select' || type == 'display'" type="caret-down" class="mvi-editor-menu-caret"></Icon>
			</div>
		</Tooltip>
		<Layer v-if="type == 'select' || type == 'display'" v-model="layerShow" ref="layer" :placement="menus.combinedLayerProps.placement" :z-index="menus.combinedLayerProps.zIndex" :fixed="menus.combinedLayerProps.fixed" :fixed-auto="menus.combinedLayerProps.fixedAuto" :offset="menus.combinedLayerProps.offset" :timeout="menus.combinedLayerProps.timeout" :show-triangle="menus.combinedLayerProps.showTriangle" :animation="menus.combinedLayerProps.animation" :shadow="menus.combinedLayerProps.shadow" :border="menus.combinedLayerProps.border" :width="menus.combinedLayerProps.width" :closable="menus.trigger == 'click'" :target="`[data-id='mvi-editor-menu-el-${uid}']`" :root="`[data-id='mvi-editor-menu-${uid}']`" @showing="beforeLayerShow">
			<!-- 自定义浮层内容 -->
			<slot name="layer" v-if="$slots.layer"></slot>
			<template v-else>
				<!-- 字体颜色、背景色 -->
				<div v-if="name == 'forecolor' || name == 'backcolor'" class="mvi-editor-menu-colors">
					<div class="mvi-editor-menu-color" :style="menuColorStyle(item)" v-for="item in parseList">
						<Tooltip :disabled="!menus.useTooltip || !item.label || cmpDisabled" trigger="hover" :title="item.label" :placement="menus.combinedTooltipProps.placement" :timeout="menus.combinedTooltipProps.timeout" :color="menus.combinedTooltipProps.color" :text-color="menus.combinedTooltipProps.textColor" :border-color="menus.combinedTooltipProps.borderColor" :offset="menus.combinedTooltipProps.offset" :z-index="menus.combinedTooltipProps.zIndex" :fixed="menus.combinedTooltipProps.fixed" :fixed-auto="menus.combinedTooltipProps.fixedAuto" :width="menus.combinedTooltipProps.width" :animation="menus.combinedTooltipProps.animation" :show-triangle="menus.combinedTooltipProps.showTriangle" block>
							<div :style="{ backgroundColor: item.value }" @click="layerClick(item)" class="mvi-editor-menu-color-el"></div>
						</Tooltip>
					</div>
				</div>
				<!-- 表格 -->
				<div v-else-if="name == 'table'" class="mvi-editor-menu-table">
					<template v-if="active">
						<div class="mvi-editor-menu-table-operations">
							<div @click="addTableRow" :style="{ color: activeColor }" class="mvi-editor-menu-table-operation">{{ props.insertRowText }}</div>
							<div @click="removeTableRow" class="mvi-editor-menu-table-operation">{{ props.removeRowText }}</div>
							<div @click="addTableColumn" :style="{ color: activeColor }" class="mvi-editor-menu-table-operation">{{ props.insertColumnText }}</div>
							<div @click="removeTableColumn" class="mvi-editor-menu-table-operation">{{ props.removeColumnText }}</div>
						</div>
						<div class="mvi-editor-menu-table-footer">
							<span @click="deleteTable">{{ props.deleteText }}</span>
						</div>
					</template>
					<template v-else>
						<div class="mvi-editor-menu-table-grids" v-for="item in tableParams.grids">
							<div @click="confirmTableSize" @mouseenter="changeTableSize(el)" :class="['mvi-editor-menu-table-grid', el.inside ? 'active' : '']" v-for="el in item"></div>
						</div>
						<div v-if="tableParams.size.length" class="mvi-editor-menu-table-size">{{ tableParams.size[0] }} × {{ tableParams.size[1] }}</div>
					</template>
				</div>
				<!-- 链接 -->
				<div v-else-if="name == 'link'" class="mvi-editor-menu-link">
					<input :disabled="!linkParams.showText || null" ref="linkText" @focus="inputFocus" @blur="inputBlur" v-model.trim="linkParams.text" :placeholder="props.placeholder[0]" type="text" />
					<input ref="linkUrl" @focus="inputFocus" @blur="inputBlur" v-model.trim="linkParams.url" :placeholder="props.placeholder[1]" type="text" />
					<div class="mvi-editor-menu-link-footer">
						<Checkbox :label="props.targetText" placement="right" size="0.24rem" :color="activeColor" v-model="linkParams.target"> </Checkbox>
						<div class="mvi-editor-menu-link-operation">
							<span class="mvi-editor-menu-link-delete" v-if="!linkParams.showText" @click="deleteLink">{{ props.removeText }}</span>
							<span class="mvi-editor-menu-link-insert" :style="{ color: activeColor }" @click="insertLink">{{ props.insertText }}</span>
						</div>
					</div>
				</div>
				<!-- 图片或者视频 -->
				<div v-else-if="name == 'image' || name == 'video'" class="mvi-editor-menu-media">
					<Tabs @change="tabChange" v-model="mediaParams.tabIndex" flex="flex-start" offset="0.4rem" :active-color="activeColor">
						<Tab v-for="item in parseList" :title="item.label">
							<div class="mvi-editor-menu-media-upload" v-if="item.value == 'upload'">
								<Icon type="upload-square" />
							</div>
							<div v-else-if="item.value == 'remote'" class="mvi-editor-menu-media-remote">
								<input @focus="inputFocus" @blur="inputBlur" v-model.trim="mediaParams.remoteUrl" :placeholder="props.placeholder" type="text" />
								<div class="mvi-editor-menu-media-insert" :style="{ color: activeColor }" @click="insertRemote">{{ props.insertText }}</div>
							</div>
						</Tab>
					</Tabs>
				</div>
				<!-- 正常的下拉选 -->
				<div v-else class="mvi-editor-menu-default">
					<EditorTag :tag="layerElTag(item)" v-for="item in parseList" :class="['mvi-editor-menu-layer-el', selectedVal.value == item.value ? 'active' : '']" @click="layerClick(item)">
						<Icon v-if="item.icon.type || item.icon.url" class="mvi-editor-menu-layer-icon" :type="item.icon.type" :url="item.icon.url" :spin="item.icon.spin" :size="item.icon.size" :color="item.icon.color" />
						<span v-text="item.label"></span>
					</EditorTag>
				</div>
			</template>
		</Layer>
	</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Icon } from '../icon'
import { Tooltip } from '../tooltip'
import { Layer } from '../layer'
import { Checkbox } from '../checkbox'
import { Tab } from '../tab'
import { Tabs } from '../tabs'
import { Upload } from '../upload'
import { Msgbox } from '../msgbox'
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
//获取表格网格
const getTableGrids = function () {
	const grids = []
	for (let i = 0; i < 10; i++) {
		let row = []
		for (let j = 0; j < 10; j++) {
			row.push({
				x: j + 1,
				y: i + 1,
				inside: false //是否被选中
			})
		}
		grids.push(row)
	}
	return grids
}
export default {
	name: 'm-editor-menu',
	emits: ['custom'],
	props: {
		//菜单项名称，唯一标识
		name: {
			type: String,
			default: null
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
				return menu ? menu.list || [] : []
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
		//菜单项的额外配置参数
		props: {
			type: Object,
			default: function (props) {
				const menu = getMenu(props.name)
				return menu ? menu.props || {} : {}
			}
		},
		//是否禁用菜单项
		disabled: {
			type: Boolean,
			default: false
		},
		//自定义菜单项的激活判定
		customActive: {
			type: Function
		}
	},
	inject: ['menus'],
	data() {
		return {
			//range更新计时器
			rangeUpdateTimer: null,
			//下拉选菜单项的默认值
			defaultVal: {},
			//下拉选菜单项的已选值
			selectedVal: {},
			//浮层是否显示
			layerShow: false,
			//是否激活此菜单项，一般情况下下拉选式菜单项不使用此属性
			active: false,
			//链接相关参数
			linkParams: {
				//插入的链接
				url: '',
				//链接内容
				text: '',
				//链接是否在新窗口打开
				target: false,
				//是否显示内容参数
				showText: true
			},
			//图片或者视频参数
			mediaParams: {
				//选项卡值
				tabIndex: 0,
				//远程地址
				remoteUrl: ''
			},
			//表格相关参数
			tableParams: {
				//表格大小，如[5,5]
				size: [],
				//表格创建规格
				grids: getTableGrids()
			}
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
			//如果菜单栏不可使用
			if (!this.menus.instance.canUseMenus) {
				return true
			}
			//如果是代码视图，则禁用除"codeview"菜单项以外的所有菜单
			if (this.menus.instance.codeViewShow && this.name != 'codeview') {
				return true
			}
			//如果是代码块内，则禁用部分菜单
			if (this.menus.instance.isPre && !['codeblock', 'undo', 'redo'].includes(this.name)) {
				return true
			}
			//如果是在表格内，则禁用部分菜单
			if (this.menus.instance.isTable && ['indent', 'divider', 'title', 'ol', 'ul', 'codeblock'].includes(this.name)) {
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
		//激活样式设置
		activeColorStyle() {
			let style = {}
			if (this.cmpDisabled) {
				return style
			}
			if (this.active) {
				style.opacity = 1
				style.color = this.activeColor
			}
			return style
		},
		//激活颜色
		activeColor() {
			if (this.cmpDisabled) {
				return ''
			}
			if (this.menus.instance.activeColor) {
				return this.menus.instance.activeColor
			}
			return ''
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
				if (this.selectedVal.value == item.value) {
					style.borderColor = this.activeColor
				}
				return style
			}
		},
		//上传文件配置
		uploadOptions() {
			let options = {}
			if (this.cmpDisabled) {
				return options
			}
			if (this.name == 'image') {
				options = this.menus.combinedUploadImageProps
			} else if (this.name == 'video') {
				options = this.menus.combinedUploadVideoProps
			}
			return {
				...options,
				select: files => {
					//使用base64
					if (this.menus.useBase64) {
						files.forEach(file => {
							Dap.file.dataFileToBase64(file).then(base64 => {
								if (this.name == 'image') {
									this.menus.instance.insertImage(base64)
								} else if (this.name == 'video') {
									this.menus.instance.insertVideo(base64)
								}
							})
						})
					} else {
						//自定义一个事件，让开发者自定义上传
						if (this.name == 'image') {
							this.menus.$emit('upload-image', files)
						} else if (this.name == 'video') {
							this.menus.$emit('upload-video', files)
						}
					}
					this.hideLayer()
				},
				error: (errorType, file) => {
					if (this.name == 'image') {
						if (typeof this.menus.uploadImageError == 'function') {
							this.menus.uploadImageError(state, file)
						} else {
							let msg = ''
							if (errorType == 'suffixError') {
								msg = '文件后缀不符合'
							} else if (errorType == 'maxSizeError') {
								msg = '超出最大文件尺寸限制'
							} else if (errorType == 'minSizeError') {
								msg = '文件尺寸没有达到要求的最小值'
							} else if (errorType == 'maxLengthError') {
								msg = '文件数量超出限制'
							} else if (errorType == 'minLengthError') {
								msg = '文件数量没有达到最小值'
							}
							Msgbox.msgbox({
								message: msg,
								animation: 'scale'
							})
						}
					} else if (this.name == 'video') {
						if (typeof this.menus.uploadVideoError == 'function') {
							this.menus.uploadVideoError(state, message, file)
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
		}
	},
	components: {
		Icon,
		Tooltip,
		Layer,
		Checkbox,
		Tabs,
		Tab,
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
		//浮层显示时
		beforeLayerShow() {
			//链接浮层打开时的初始化设置
			if (this.name == 'link') {
				this.linkParams = {
					url: '',
					text: '',
					target: false,
					showText: true
				}
				//修改链接时预设值
				if (this.active) {
					this.linkParams.showText = false
					const element = this.menus.instance.linkAdjusterProps.element
					if (element) {
						if (element.hasChildren()) {
							const elements = AlexElement.flatElements(element.children)
							let text = ''
							elements.forEach(el => {
								if (el.isText()) {
									text += el.textContent || ''
								}
							})
							this.linkParams.text = text
						}
						if (element.hasMarks()) {
							this.linkParams.url = element.marks['href'] || ''
							this.linkParams.target = element.marks['target'] == '_blank'
						}
					}
				}
				//插入链接时预设值
				else {
					//如果起点和终点不在一起，表示选区
					if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
						let text = ''
						const result = this.menus.instance.editor.getElementsByRange(true, true)
						result.forEach(item => {
							if (el.isText()) {
								if (item.offset) {
									tetx += el.textContent.substring(item.offset[0], item.offset[1])
								} else {
									text += el.textContent || ''
								}
							}
						})
						this.linkParams.text = text
					}
				}
			}
			//上传视频或者图片的浮层打开时的初始化设置
			else if (this.name == 'image' || this.name == 'video') {
				this.mediaParams.tabIndex = 0
				this.mediaParams.remoteUrl = ''
				const elements = this.$el.querySelectorAll('.mvi-editor-menu-media-upload')
				if (elements.length) {
					for (let i = 0; i < elements.length; i++) {
						let upload = new Upload(elements[i], { ...this.uploadOptions })
						upload.init()
					}
				}
			}
		},
		//tab切换时
		tabChange() {
			this.$nextTick(() => {
				const elements = this.$el.querySelectorAll('.mvi-editor-menu-media-upload')
				if (elements.length) {
					for (let i = 0; i < elements.length; i++) {
						let upload = new Upload(elements[i], { ...this.uploadOptions })
						upload.init()
					}
				}
			})
		},
		//输入框获取焦点
		inputFocus(event) {
			event.currentTarget.style.borderColor = this.activeColor
		},
		//输入框失去焦点
		inputBlur(event) {
			event.currentTarget.style.borderColor = ''
		},
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
			else if (this.name == 'removeformat') {
				editor.removeTextStyle()
				editor.removeTextMark()
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//缩进
			else if (this.name == 'indent') {
				//增加缩进
				if (item.value == 'indent-right') {
					editor.setIndent()
				}
				//减少缩进
				else {
					editor.setOutdent()
				}
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//分隔线
			else if (this.name == 'divider') {
				//创建段落
				const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
				//创建分隔线
				const divider = new AlexElement('closed', 'hr', null, null, null)
				//插入分割线
				editor.addElementTo(divider, paragraph)
				editor.insertElement(paragraph)
				const nextParagraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
				const breakEl = new AlexElement('closed', 'br', null, null, null)
				editor.addElementTo(breakEl, nextParagraph)
				editor.addElementAfter(nextParagraph, paragraph)
				//重新设置虚拟光标位置
				editor.range.anchor.moveToEnd(nextParagraph)
				editor.range.focus.moveToEnd(nextParagraph)
				//重新渲染
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//代码
			else if (this.name == 'code') {
				if (this.active) {
					editor.removeTextMark(['data-code-style'])
				} else {
					editor.setTextMark({
						'data-code-style': 'mvi-editor-code'
					})
				}
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
			else if (this.name == 'strikethrough') {
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
					const result = editor.getElementsByRange(true, false)
					result.forEach(el => {
						if (el.element.isBlock()) {
							elementUtil.toParagraph(el.element)
							el.element.parsedom = item.value
						} else {
							const block = el.element.getBlock()
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
			else if (this.name == 'fontfamily') {
				editor.setTextStyle({
					'font-family': item.value
				})
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//字号
			else if (this.name == 'fontsize') {
				editor.setTextStyle({
					'font-size': item.value
				})
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//字体颜色
			else if (this.name == 'forecolor') {
				editor.setTextStyle({
					color: item.value
				})
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//背景颜色
			else if (this.name == 'backcolor') {
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
					const inblock = editor.range.anchor.element.getInblock()
					if (inblock) {
						if (inblock.hasStyles()) {
							inblock.styles['text-align'] = item.value
						} else {
							inblock.styles = {
								'text-align': item.value
							}
						}
					} else {
						if (block.hasStyles()) {
							block.styles['text-align'] = item.value
						} else {
							block.styles = {
								'text-align': item.value
							}
						}
					}
				} else {
					const result = editor.getElementsByRange(true, false)
					result.forEach(el => {
						if (el.element.isBlock() || el.element.isInblock()) {
							if (el.element.hasStyles()) {
								el.element.styles['text-align'] = item.value
							} else {
								el.element.styles = {
									'text-align': item.value
								}
							}
						} else {
							const block = el.element.getBlock()
							const inblock = el.element.getInblock()
							if (inblock) {
								if (inblock.hasStyles()) {
									inblock.styles['text-align'] = item.value
								} else {
									inblock.styles = {
										'text-align': item.value
									}
								}
							} else {
								if (block.hasStyles()) {
									block.styles['text-align'] = item.value
								} else {
									block.styles = {
										'text-align': item.value
									}
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
					const result = editor.getElementsByRange(true, false)
					result.forEach(el => {
						if (el.element.isBlock()) {
							elementUtil.toParagraph(el.element)
							if (!this.active) {
								el.element.parsedom = 'blockquote'
							}
						} else {
							const block = el.element.getBlock()
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
			//代码块
			else if (this.name == 'codeblock') {
				if (this.active) {
					const pre = this.menus.instance.preAdjusterProps.element
					elementUtil.toParagraph(pre)
				} else {
					//起点和终点在一起
					if (editor.range.anchor.isEqual(editor.range.focus)) {
						const block = editor.range.anchor.element.getBlock()
						elementUtil.toParagraph(block)
						block.parsedom = 'pre'
						const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
						const breakEl = new AlexElement('closed', 'br', null, null, null)
						editor.addElementTo(breakEl, paragraph)
						editor.addElementAfter(paragraph, block)
					}
					//起点和终点不在一起
					else {
						let result = editor.getElementsByRange(true, false)
						editor.range.anchor.moveToStart(result[0].element.getBlock())
						editor.range.focus.moveToEnd(result[result.length - 1].element.getBlock())
						const res = editor.getElementsByRange(true, true).filter(el => el.element.isText())
						const obj = {}
						res.forEach(el => {
							if (obj[el.element.getBlock().key]) {
								obj[el.element.getBlock().key].push(el.element.clone())
							} else {
								obj[el.element.getBlock().key] = [el.element.clone()]
							}
						})
						const pre = new AlexElement('block', 'pre', null, null, null)
						Object.keys(obj).forEach((key, index) => {
							if (index > 0) {
								const text = new AlexElement('text', null, null, null, '\n')
								if (pre.hasChildren()) {
									editor.addElementTo(text, pre, pre.children.length)
								} else {
									editor.addElementTo(text, pre)
								}
							}
							obj[key].forEach(el => {
								if (pre.hasChildren()) {
									editor.addElementTo(el, pre, pre.children.length)
								} else {
									editor.addElementTo(el, pre)
								}
							})
						})
						editor.delete()
						editor.insertElement(pre)
						const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
						const breakEl = new AlexElement('closed', 'br', null, null, null)
						editor.addElementTo(breakEl, paragraph)
						editor.addElementAfter(paragraph, pre)
					}
				}

				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//清空
			else if (this.name == 'empty') {
				const paragraph = new AlexElement('block', 'p', null, null, null)
				const breakEl = new AlexElement('closed', 'br', null, null, null)
				editor.addElementTo(breakEl, paragraph)
				editor.stack = [paragraph]
				editor.range.anchor.moveToStart(breakEl)
				editor.range.focus.moveToStart(breakEl)
				editor.formatElementStack()
				editor.domRender()
				editor.rangeRender()
			}
			//源码视图
			else if (this.name == 'codeview') {
				this.menus.instance.codeViewShow = !this.menus.instance.codeViewShow
			}
		},
		//监听range更新
		handleRangeUpdate(range) {
			if (this.rangeUpdateTimer) {
				clearTimeout(this.rangeUpdateTimer)
				this.rangeUpdateTimer = null
			}
			this.rangeUpdateTimer = setTimeout(() => {
				const editor = this.menus.instance.editor
				//代码判定
				if (this.name == 'code') {
					this.active = editor.queryTextMark('data-code-style')
				}
				//加粗判定
				else if (this.name == 'bold') {
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
				else if (this.name == 'strikethrough') {
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
						const result = editor.getElementsByRange(true, false)
						this.selectedVal = this.parseList.find(item => {
							return result.every(el => {
								if (el.element.isBlock()) {
									return el.element.parsedom == item.value
								}
								return el.element.getBlock().parsedom == item.value
							})
						}) || { ...this.defaultVal }
					}
				}
				//字体判定
				else if (this.name == 'fontfamily') {
					this.selectedVal = this.parseList.find(item => {
						return editor.queryTextStyle('font-family', item.value)
					}) || { ...this.defaultVal }
				}
				//字号判定
				else if (this.name == 'fontsize') {
					this.selectedVal = this.parseList.find(item => {
						return editor.queryTextStyle('font-size', item.value)
					}) || { ...this.defaultVal }
				}
				//字体颜色判定
				else if (this.name == 'forecolor') {
					this.selectedVal =
						this.parseList.find(item => {
							return editor.queryTextStyle('color', item.value)
						}) || {}
				}
				//背景颜色判定
				else if (this.name == 'backcolor') {
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
						const result = editor.getElementsByRange(true, false)
						this.active = result.every(item => {
							if (item.element.isBlock()) {
								return elementUtil.isList(item.element, this.name == 'ol')
							} else {
								const block = item.element.getBlock()
								return elementUtil.isList(block, this.name == 'ol')
							}
						})
					}
				}
				//对齐方式判定
				else if (this.name == 'justify') {
					//起点和终点在一起
					if (editor.range.anchor.isEqual(editor.range.focus)) {
						const block = editor.range.anchor.element.getBlock()
						const inblock = editor.range.anchor.element.getInblock()
						if (inblock) {
							this.selectedVal =
								this.parseList.find(item => {
									return inblock.hasStyles() && inblock.styles['text-align'] == item.value
								}) || {}
						} else {
							this.selectedVal =
								this.parseList.find(item => {
									return block.hasStyles() && block.styles['text-align'] == item.value
								}) || {}
						}
					} else {
						const result = editor.getElementsByRange(true, false)
						this.selectedVal =
							this.parseList.find(item => {
								return result.every(el => {
									if (el.element.isBlock() || el.element.isInblock()) {
										return el.element.hasStyles() && el.element.styles['text-align'] == item.value
									}
									const block = el.element.getBlock()
									const inblock = el.element.getInblock()
									if (inblock) {
										return inblock.hasStyles() && inblock.styles['text-align'] == item.value
									}
									return block.hasStyles() && block.styles['text-align'] == item.value
								})
							}) || {}
					}
				}
				//引用判定
				else if (this.name == 'quote') {
					if (editor.range.anchor.isEqual(editor.range.focus)) {
						const block = editor.range.anchor.element.getBlock()
						this.active = block.parsedom == 'blockquote'
					} else {
						const result = editor.getElementsByRange(true, false)
						this.active = result.every(item => {
							if (item.element.isBlock()) {
								return item.element.parsedom == 'blockquote'
							} else {
								const block = item.element.getBlock()
								return block.parsedom == 'blockquote'
							}
						})
					}
				}
				//链接判定
				else if (this.name == 'link') {
					this.active = this.menus.instance.isLink
				}
				//表格判定
				else if (this.name == 'table') {
					this.active = this.menus.instance.isTable
				}
				//代码块判定
				else if (this.name == 'codeblock') {
					this.active = this.menus.instance.isPre
				}
				//自定义菜单项的激活判定
				else if (!this.isDefinedMenu && typeof this.customActive == 'function') {
					const obj = this.customActive.apply(this, [this.name])
					//普通菜单项
					if (this.type == 'default') {
						this.active = obj
					}
					//下拉选菜单项
					else if (this.type == 'select') {
						if (typeof obj == 'boolean') {
							this.active = obj
						} else {
							this.selectedVal =
								this.parseList.find(item => {
									return item.value == obj
								}) || {}
						}
					}
					//显示已选值的菜单项
					else {
						if (typeof obj == 'boolean') {
							this.active = obj
						} else {
							this.selectedVal = this.parseList.find(item => {
								return item.value == obj
							}) || { ...this.defaultVal }
						}
					}
				}
			}, 100)
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
				const result = this.menus.instance.editor.getElementsByRange(true, false)
				result.forEach(item => {
					if (item.element.isBlock()) {
						elementUtil.toParagraph(item.element)
						if (!this.active) {
							elementUtil.toList(item.element, ordered)
						}
					} else {
						const block = item.element.getBlock()
						elementUtil.toParagraph(block)
						if (!this.active) {
							elementUtil.toList(block, ordered)
						}
					}
				})
			}
		},
		//插入链接
		insertLink() {
			if (this.cmpDisabled) {
				return
			}
			if (!this.linkParams.url) {
				this.hideLayer()
				return
			}
			//修改链接
			if (this.active) {
				const element = this.menus.instance.linkAdjusterProps.element
				element.marks.href = this.linkParams.url
				if (this.linkParams.target) {
					element.marks.target = '_blank'
				} else {
					delete element.marks.target
				}
			}
			//新插入链接
			else {
				if (!this.linkParams.text) {
					this.linkParams.text = this.linkParams.url
				}
				const marks = {
					href: this.linkParams.url
				}
				if (this.linkParams.target) {
					marks.target = '_blank'
				}
				const link = new AlexElement('inline', 'a', marks, null, null)
				const text = new AlexElement('text', null, null, null, this.linkParams.text)
				this.menus.instance.editor.addElementTo(text, link)
				this.menus.instance.editor.insertElement(link)
			}
			this.menus.instance.editor.formatElementStack()
			this.menus.instance.editor.domRender()
			this.menus.instance.editor.rangeRender()
			this.hideLayer()
		},
		//删除链接
		deleteLink() {
			if (this.cmpDisabled) {
				return
			}
			const element = this.menus.instance.linkAdjusterProps.element
			element.parsedom = AlexElement.TEXT_NODE
			delete element.marks.target
			delete element.marks.href
			this.menus.instance.editor.formatElementStack()
			this.menus.instance.editor.domRender()
			this.menus.instance.editor.rangeRender()
			this.hideLayer()
		},
		//插入远程图片或者视频
		insertRemote() {
			if (this.cmpDisabled) {
				return
			}
			if (!this.mediaParams.remoteUrl) {
				this.hideLayer()
				return
			}
			if (this.name == 'video') {
				this.menus.instance.insertVideo(this.mediaParams.remoteUrl)
			} else {
				this.menus.instance.insertImage(this.mediaParams.remoteUrl)
			}
			this.menus.instance.editor.formatElementStack()
			this.menus.instance.editor.domRender()
			this.menus.instance.editor.rangeRender()
			this.hideLayer()
		},
		//确认表格规格创建表格
		confirmTableSize() {
			if (this.cmpDisabled) {
				return
			}
			const rowLength = this.tableParams.size[1]
			const colLength = this.tableParams.size[0]
			const table = new AlexElement('block', 'table', null, null, null)
			const tbody = new AlexElement('inblock', 'tbody', null, null, null)
			this.menus.instance.editor.addElementTo(tbody, table)
			for (let i = 0; i < rowLength; i++) {
				const row = new AlexElement('inblock', 'tr', null, null, null)
				for (let j = 0; j < colLength; j++) {
					const column = new AlexElement('inblock', 'td', null, null, null)
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					this.menus.instance.editor.addElementTo(breakEl, column)
					this.menus.instance.editor.addElementTo(column, row)
				}
				this.menus.instance.editor.addElementTo(row, tbody)
			}
			this.menus.instance.editor.insertElement(table)
			//在表格后创建一个段落
			const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
			const breakEl = new AlexElement('closed', 'br', null, null, null)
			this.menus.instance.editor.addElementTo(breakEl, paragraph)
			this.menus.instance.editor.addElementAfter(paragraph, table)
			this.menus.instance.editor.formatElementStack()
			this.menus.instance.editor.range.anchor.moveToStart(tbody)
			this.menus.instance.editor.range.focus.moveToStart(tbody)
			this.menus.instance.editor.domRender()
			this.menus.instance.editor.rangeRender()
			//隐藏浮层
			this.hideLayer()
		},
		//改变表格大小
		changeTableSize(data) {
			if (this.cmpDisabled) {
				return
			}
			this.tableParams.size = [data.x, data.y]
			for (let i in this.tableParams.grids) {
				const grid = this.tableParams.grids[i]
				for (let j in grid) {
					if (grid[j].x <= data.x && grid[j].y <= data.y) {
						this.tableParams.grids[i][j].inside = true
					} else {
						this.tableParams.grids[i][j].inside = false
					}
				}
			}
		},
		//插入表格行
		addTableRow() {
			if (this.cmpDisabled) {
				return
			}
			if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
				this.menus.instance.editor.range.anchor.element = this.menus.instance.editor.range.focus.element
				this.menus.instance.editor.range.anchor.offset = this.menus.instance.editor.range.focus.offset
			}
			const row = this.menus.instance.getCurrentParsedomElement('tr')
			const newRow = row.clone()
			newRow.children.forEach(column => {
				column.children = []
				const breakEl = new AlexElement('closed', 'br', null, null, null)
				this.menus.instance.editor.addElementTo(breakEl, column)
			})
			this.menus.instance.editor.addElementAfter(newRow, row)
			this.menus.instance.editor.formatElementStack()
			this.menus.instance.editor.range.anchor.moveToStart(newRow)
			this.menus.instance.editor.range.focus.moveToStart(newRow)
			this.menus.instance.editor.domRender()
			this.menus.instance.editor.rangeRender()
			this.hideLayer()
		},
		//删除表格行
		removeTableRow() {
			if (this.cmpDisabled) {
				return
			}
			if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
				this.menus.instance.editor.range.anchor.element = this.menus.instance.editor.range.focus.element
				this.menus.instance.editor.range.anchor.offset = this.menus.instance.editor.range.focus.offset
			}
			const row = this.menus.instance.getCurrentParsedomElement('tr')
			const parent = row.parent
			if (parent.children.length == 1) {
				this.deleteTable()
				return
			}
			const previousRow = this.menus.instance.editor.getPreviousElement(row)
			const nextRow = this.menus.instance.editor.getNextElement(row)
			row.toEmpty()
			this.menus.instance.editor.formatElementStack()
			if (previousRow) {
				this.menus.instance.editor.range.anchor.moveToEnd(previousRow.children[0])
				this.menus.instance.editor.range.focus.moveToEnd(previousRow.children[0])
			} else {
				this.menus.instance.editor.range.anchor.moveToEnd(nextRow.children[0])
				this.menus.instance.editor.range.focus.moveToEnd(nextRow.children[0])
			}
			this.menus.instance.editor.domRender()
			this.menus.instance.editor.rangeRender()
			this.hideLayer()
		},
		//插入表格列
		addTableColumn() {
			if (this.cmpDisabled) {
				return
			}
			if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
				this.menus.instance.editor.range.anchor.element = this.menus.instance.editor.range.focus.element
				this.menus.instance.editor.range.anchor.offset = this.menus.instance.editor.range.focus.offset
			}
			const column = this.menus.instance.getCurrentParsedomElement('td')
			const tbody = this.menus.instance.getCurrentParsedomElement('tbody')
			const rows = tbody.children
			const index = column.parent.children.findIndex(item => {
				return item.isEqual(column)
			})
			rows.forEach(row => {
				const newColumn = column.clone(false)
				const breakEl = new AlexElement('closed', 'br', null, null, null)
				this.menus.instance.editor.addElementTo(breakEl, newColumn)
				this.menus.instance.editor.addElementTo(newColumn, row, index + 1)
			})
			this.menus.instance.editor.formatElementStack()
			const nextColumn = this.menus.instance.editor.getNextElement(column)
			this.menus.instance.editor.range.anchor.moveToStart(nextColumn)
			this.menus.instance.editor.range.focus.moveToStart(nextColumn)
			this.menus.instance.editor.domRender()
			this.menus.instance.editor.rangeRender()
			this.hideLayer()
		},
		//删除表格列
		removeTableColumn() {
			if (this.cmpDisabled) {
				return
			}
			if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
				this.menus.instance.editor.range.anchor.element = this.menus.instance.editor.range.focus.element
				this.menus.instance.editor.range.anchor.offset = this.menus.instance.editor.range.focus.offset
			}
			const column = this.menus.instance.getCurrentParsedomElement('td')
			const tbody = this.menus.instance.getCurrentParsedomElement('tbody')
			const rows = tbody.children
			const parent = column.parent
			if (parent.children.length == 1) {
				this.deleteTable()
				return
			}
			const previousColumn = this.menus.instance.editor.getPreviousElement(column)
			const nextColumn = this.menus.instance.editor.getNextElement(column)
			const index = column.parent.children.findIndex(item => {
				return item.isEqual(column)
			})
			rows.forEach(row => {
				row.children[index].toEmpty()
			})
			this.menus.instance.editor.formatElementStack()
			if (previousColumn) {
				this.menus.instance.editor.range.anchor.moveToEnd(previousColumn)
				this.menus.instance.editor.range.focus.moveToEnd(previousColumn)
			} else {
				this.menus.instance.editor.range.anchor.moveToEnd(nextColumn)
				this.menus.instance.editor.range.focus.moveToEnd(nextColumn)
			}
			this.menus.instance.editor.domRender()
			this.menus.instance.editor.rangeRender()
			this.hideLayer()
		},
		//删除表格
		deleteTable() {
			if (this.cmpDisabled) {
				return
			}
			if (!this.menus.instance.editor.range.anchor.isEqual(this.menus.instance.editor.range.focus)) {
				this.menus.instance.editor.range.anchor.element = this.menus.instance.editor.range.focus.element
				this.menus.instance.editor.range.anchor.offset = this.menus.instance.editor.range.focus.offset
			}
			const table = this.menus.instance.tableAdjusterProps.element
			table.toEmpty()
			this.menus.instance.editor.formatElementStack()
			this.menus.instance.editor.domRender()
			this.menus.instance.editor.rangeRender()
			this.hideLayer()
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
		width: calc(@small-height * 4 + @mp-xs * 8 + 16px + @mp-sm * 2);
		padding: @mp-xs @mp-sm;

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

	.mvi-editor-menu-table {
		display: block;
		padding: @mp-sm;

		.mvi-editor-menu-table-grids {
			display: flex;
			display: -webkit-flex;
			justify-content: flex-start;
			align-items: center;

			&:first-of-type > .mvi-editor-menu-table-grid {
				border-top: 1px solid @border-color;
			}

			.mvi-editor-menu-table-grid {
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
		width: 6rem;
		padding: @mp-sm @mp-md;

		input {
			appearance: none;
			-webkit-appearance: none;
			-moz-appearance: none;
			display: block;
			width: 100%;
			margin: 0;
			border: none;
			border-bottom: 1px solid @border-color;
			font-size: @font-size-default;
			color: @font-color-default;
			margin-bottom: @mp-sm;
			padding: @mp-xs 0;
			line-height: 1.5;
			transition: border-color 400ms;
			-moz-transition: border-color 400ms;
			-webkit-transition: border-color 400ms;
			background-color: transparent;

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
				opacity: 0.6;
			}
		}
		.mvi-editor-menu-link-footer {
			display: flex;
			display: -webkit-flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;

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
		padding: @mp-xs;

		.mvi-editor-menu-media-upload {
			display: block;
			width: 100%;
			padding: @mp-sm 0;
			font-size: 0.72rem;
			opacity: 0.8;
			text-align: center;

			&:hover {
				cursor: pointer;
				opacity: 1;
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
				border: none;
				border-bottom: 1px solid @border-color;
				font-size: @font-size-default;
				color: @font-color-default;
				margin-bottom: @mp-sm;
				padding: @mp-xs 0;
				line-height: 1.5;
				transition: border-color 400ms;
				-moz-transition: border-color 400ms;
				-webkit-transition: border-color 400ms;
				background-color: transparent;

				&::-webkit-input-placeholder,
				&::placeholder {
					color: inherit;
					font-family: inherit;
					font-size: inherit;
					opacity: 0.5;
					vertical-align: middle;
				}
			}

			.mvi-editor-menu-media-insert {
				display: block;
				width: 100%;
				text-align: right;

				&:hover {
					cursor: pointer;
				}
			}
		}
	}
}
</style>
