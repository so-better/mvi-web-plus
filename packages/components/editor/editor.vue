<template>
	<div class="mvi-editor">
		<!-- 代码视图 -->
		<textarea v-if="codeViewShow" ref="code" readonly class="mvi-editor-code" :value="cmpValue" />
		<!-- 编辑器视图 -->
		<div ref="content" :data-placeholder="placeholder" :class="['mvi-editor-content', border ? 'border' : '', isEmpty ? 'empty' : '']" :style="contentStyle" @compositionstart="compositionFlag = true" @compositionend="compositionFlag = false" @click="clickEditor" :disabled="disabled || null" @keydown="contentKeyDown"></div>
		<!-- 链接调整器 -->
		<m-layer v-model="linkAdjusterProps.show" fixed :target="linkAdjusterProps.target" placement="bottom-start" animation="mvi-editor-layer-animation" :timeout="50" border background="#fff" border-color="#eee" offset="0.05rem" closable ref="linkLayer" @showing="autoLayerOffset('linkLayer')">
			<div class="mvi-editor-layer-link">
				<input @change="updateLink" ref="linkUrl" @focus="inputFocus" @blur="inputBlur" v-model.trim="linkAdjusterProps.url" :placeholder="linkAdjusterProps.props.placeholder" type="text" />
				<div class="mvi-editor-layer-link-footer">
					<Checkbox @change="updateLink" :label="linkAdjusterProps.props.targetText" placement="right" size="0.24rem" :color="activeColor" v-model="linkAdjusterProps.newWindow"> </Checkbox>
					<span class="mvi-editor-layer-link-delete" @click="deleteLink">{{ linkAdjusterProps.props.removeText }}</span>
				</div>
			</div>
		</m-layer>
		<!-- 图片调整器 -->
		<m-layer v-model="mediaAdjusterProps.show" fixed :target="mediaAdjusterProps.target" placement="bottom-start" animation="mvi-editor-layer-animation" :timeout="50" border background="#fff" border-color="#eee" offset="0.05rem" closable ref="mediaLayer" @showing="autoLayerOffset('mediaLayer')">
			<div class="mvi-editor-layer">
				<div @click="setMediaWidth('20%')" class="mvi-editor-layer-item">20%</div>
				<div @click="setMediaWidth('50%')" class="mvi-editor-layer-item">50%</div>
				<div @click="setMediaWidth('100%')" class="mvi-editor-layer-item">100%</div>
				<div @click="deleteMedia" class="mvi-editor-layer-item"><Icon type="trash-alt" /></div>
			</div>
		</m-layer>
		<!-- 表格调整器 -->
		<m-layer v-model="tableAdjusterProps.show" fixed :target="tableAdjusterProps.target" placement="bottom-start" animation="mvi-editor-layer-animation" :timeout="50" border background="#fff" border-color="#eee" offset="0.05rem" closable ref="tableLayer" @showing="autoLayerOffset('tableLayer')">
			<div class="mvi-editor-layer">
				<div @click="insertParagraphToTable('up')" class="mvi-editor-layer-item"><Icon style="transform: rotate(180deg)" type="turn-arrow-text" /></div>
				<div @click="insertParagraphToTable('down')" class="mvi-editor-layer-item"><Icon type="turn-arrow-text" /></div>
				<div @click="addTableRow" :style="{ color: activeColor }" class="mvi-editor-layer-item">{{ tableAdjusterProps.props.insertRowText }}</div>
				<div @click="removeTableRow" class="mvi-editor-layer-item">{{ tableAdjusterProps.props.removeRowText }}</div>
				<div @click="addTableColumn" :style="{ color: activeColor }" class="mvi-editor-layer-item">{{ tableAdjusterProps.props.insertColumnText }}</div>
				<div @click="removeTableColumn" class="mvi-editor-layer-item">{{ tableAdjusterProps.props.removeColumnText }}</div>
				<div @click="deleteTable" class="mvi-editor-layer-item"><Icon type="trash-alt" /></div></div
		></m-layer>
		<!-- 代码块调整器 -->
		<m-layer v-model="preAdjusterProps.show" fixed :target="preAdjusterProps.target" placement="bottom-start" animation="mvi-editor-layer-animation" :timeout="50" border background="#fff" border-color="#eee" offset="0.05rem" closable ref="preLayer" @showing="autoLayerOffset('preLayer')">
			<div class="mvi-editor-layer">
				<div @click="insertParagraphToPre('up')" class="mvi-editor-layer-item"><Icon style="transform: rotate(180deg)" type="turn-arrow-text" /></div>
				<div @click="insertParagraphToPre('down')" class="mvi-editor-layer-item"><Icon type="turn-arrow-text" /></div>
				<div class="mvi-editor-layer-item" v-if="highlight">
					<m-select :active-color="activeColor" v-model="preAdjusterProps.language" :options="preAdjusterProps.languages" height="4rem" :layer-props="{ width: '2.4rem' }" icon="angle-down" @change="selectLanguage"></m-select>
				</div>
			</div>
		</m-layer>
	</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { AlexElement, AlexEditor } from 'alex-editor'
import elementUtil from '../editor-menu/elementUtil'
import { Icon } from '../icon'
import { Checkbox } from '../checkbox'
import { getHljsHtml, languages } from './hljs'
export default {
	name: 'm-editor',
	emits: ['update:modelValue', 'focus', 'blur', 'change', 'paste-image', 'paste-video', 'range-update', 'after-render', 'keydown'],
	props: {
		//编辑器内容
		modelValue: {
			type: String,
			default: '<p><br></p>'
		},
		//是否自动获取焦点
		autofocus: {
			type: Boolean,
			default: false
		},
		//占位符
		placeholder: {
			type: String,
			default: ''
		},
		//高度
		height: {
			type: String,
			default: '8rem'
		},
		//编辑区域高度是否自动变化
		autoheight: {
			type: Boolean,
			default: false
		},
		//是否禁用
		disabled: {
			type: Boolean,
			default: false
		},
		//编辑区域边框是否显示
		border: {
			type: Boolean,
			default: false
		},
		//主题色
		activeColor: {
			type: String,
			default: '#0b73de',
			validator(value) {
				return Dap.common.matchingText(value, 'hex')
			}
		},
		//粘贴文本时是否粘贴html
		htmlPaste: {
			type: Boolean,
			default: false
		},
		//是否自定义图片粘贴
		customImagePaste: {
			type: Boolean,
			default: false
		},
		//自定义视频粘贴
		customVideoPaste: {
			type: Boolean,
			default: false
		},
		//自定义渲染规则
		renderRules: {
			type: Array,
			default: function () {
				return []
			}
		},
		//是否使用代码高亮处理
		highlight: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {
			//是否显示代码视图，代码视图下不可编辑
			codeViewShow: false,
			//光标是否在表格内
			isTable: false,
			//光标是否在代码块内
			isPre: false,
			//光标是否在链接内
			isLink: false,
			//编辑器实例
			editor: null,
			//是否在输入中文
			compositionFlag: false,
			//是否内部修改了modelValue的值
			isModelChange: false,
			//是否已经注册了菜单栏
			useMenus: false,
			//菜单栏是否可以使用
			canUseMenus: false,
			//链接调整器参数
			linkAdjusterProps: {
				show: false,
				target: '',
				newWindow: false,
				url: '',
				element: null,
				props: {
					placeholder: '输入地址',
					targetText: '新窗口打开',
					removeText: '移除链接',
					insertText: '插入'
				}
			},
			//媒体调整器参数
			mediaAdjusterProps: {
				show: false,
				target: '',
				element: null
			},
			//表格调整器参数
			tableAdjusterProps: {
				show: false,
				target: '',
				element: null,
				props: {
					insertRowText: '插入行',
					removeRowText: '删除行',
					insertColumnText: '插入列',
					removeColumnText: '删除列'
				}
			},
			//代码块调整器参数
			preAdjusterProps: {
				show: false,
				target: '',
				element: null,
				languages: [
					{
						label: '自动识别',
						value: ''
					},
					...languages
				],
				language: ''
			},
			//表格列宽拖拽记录数据
			tableColumnResizeParams: {
				element: null, //被拖拽的td
				start: 0 //水平方向起点位置
			}
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	components: {
		Icon,
		Checkbox
	},
	computed: {
		//编辑器的值
		cmpValue: {
			set(val) {
				this.$emit('update:modelValue', val)
			},
			get() {
				return this.modelValue || '<p><br></p>'
			}
		},
		//编辑器区域样式设置
		contentStyle() {
			let style = {}
			if (this.autoheight) {
				style.minHeight = this.height
			} else {
				style.height = this.height
			}
			return style
		},
		//编辑器是否为空
		isEmpty() {
			return this.cmpValue == '<p><br></p>' && !this.compositionFlag
		}
	},
	watch: {
		//监听禁用与否
		disabled(newVal) {
			if (newVal) {
				this.editor.setDisabled()
			} else {
				this.editor.setEnabled()
			}
		},
		//监听编辑的值变更
		cmpValue(newVal) {
			//源码视图不处理
			if (this.codeViewShow) {
				return
			}
			//内部修改不处理
			if (this.isModelChange) {
				return
			}
			//如果是外部修改，需要重新渲染编辑器
			this.editor.stack = this.editor.parseHtml(newVal)
			this.editor.formatElementStack()
			this.editor.range.anchor.moveToStart(this.editor.stack[0])
			this.editor.range.focus.moveToStart(this.editor.stack[0])
			this.editor.domRender()
			this.editor.rangeRender()
		}
	},
	mounted() {
		//创建编辑器
		this.editor = new AlexEditor(this.$refs.content, {
			disabled: this.disabled,
			value: this.cmpValue,
			renderRules: [this.orderListHandle, this.codeHandle, this.mediaHandle, this.tableHandle, this.preHandle, ...this.renderRules],
			htmlPaste: this.htmlPaste
		})
		//编辑器渲染后会有一个渲染过程，会改变内容，因此重新获取内容的值来设置modelValue
		this.internalModify(this.editor.value)
		//监听编辑器内容变更
		this.editor.on('change', this.handleContentChange)
		//监听编辑器聚焦
		this.editor.on('focus', this.handleContentFocus)
		//监听编辑器失去焦点
		this.editor.on('blur', this.handleContentBlur)
		//监听编辑器换行
		this.editor.on('insertParagraph', this.handleInsertParagraph)
		//监听编辑器删除事件
		this.editor.on('deleteInStart', this.handleDelete)
		//监听编辑器range更新
		this.editor.on('rangeUpdate', this.handleRangeUpdate)
		//监听编辑器dom渲染
		this.editor.on('afterRender', this.handleAfterRender)
		//监听编辑器粘贴html
		this.editor.on('pasteHtml', this.handlePasteHtml)
		//监听编辑器粘贴图片
		if (this.customImagePaste) {
			this.editor.on('pasteImage', url => {
				this.$emit('paste-image', url)
			})
		}
		//监听编辑器粘贴视频
		if (this.customVideoPaste) {
			this.editor.on('pasteVideo', url => {
				this.$emit('paste-video', url)
			})
		}
		//监听滚动
		this.onScroll()
		//格式化
		this.editor.formatElementStack()
		//渲染dom
		this.editor.domRender()
		//设置自动获取焦点
		if (this.autofocus && !this.codeViewShow && !this.disabled) {
			this.collapseToEnd()
		}
		//鼠标按下监听
		Dap.event.on(document.documentElement, `mousedown.editor_${this.uid}`, this.documentMouseDown)
		//鼠标移动监听
		Dap.event.on(document.documentElement, `mousemove.editor_${this.uid}`, this.documentMouseMove)
		//鼠标松开监听
		Dap.event.on(document.documentElement, `mouseup.editor_${this.uid}`, this.documentMouseUp)
	},
	methods: {
		//鼠标在页面按下
		documentMouseDown(e) {
			if (this.disabled) {
				return
			}
			const elm = e.target
			const key = Dap.data.get(elm, 'data-alex-editor-key')
			if (key) {
				const element = this.editor.getElementByKey(key)
				if (element.parsedom == 'td') {
					const length = element.parent.children.length
					//最后一个td不设置
					if (element.parent.children[length - 1].isEqual(element)) {
						return
					}
					const rect = Dap.element.getElementBounding(elm)
					//在可拖拽范围内
					if (Math.abs(rect.left + elm.offsetWidth - e.pageX) < Dap.element.rem2px(0.2)) {
						this.tableColumnResizeParams.element = element
						this.tableColumnResizeParams.start = e.pageX
					}
				}
			}
		},
		//鼠标在页面移动
		documentMouseMove(e) {
			if (this.disabled) {
				return
			}
			if (!this.tableColumnResizeParams.element) {
				return
			}
			const table = this.getCurrentParsedomElement('table')
			if (!table) {
				return
			}
			const colgroup = table.children.find(item => {
				return item.parsedom == 'colgroup'
			})
			const index = this.tableColumnResizeParams.element.parent.children.findIndex(el => {
				return el.isEqual(this.tableColumnResizeParams.element)
			})
			const width = `${this.tableColumnResizeParams.element._elm.offsetWidth + e.pageX - this.tableColumnResizeParams.start}`
			colgroup.children[index].marks['width'] = width
			colgroup.children[index]._elm.setAttribute('width', width)
			this.tableColumnResizeParams.start = e.pageX
		},
		//鼠标在页面松开
		documentMouseUp(e) {
			if (this.disabled) {
				return
			}
			if (!this.tableColumnResizeParams.element) {
				return
			}
			const table = this.getCurrentParsedomElement('table')
			if (!table) {
				return
			}
			const colgroup = table.children.find(item => {
				return item.parsedom == 'colgroup'
			})
			const index = this.tableColumnResizeParams.element.parent.children.findIndex(el => {
				return el.isEqual(this.tableColumnResizeParams.element)
			})
			const width = Number(colgroup.children[index].marks['width'])
			if (!isNaN(width)) {
				colgroup.children[index].marks['width'] = `${Number(((width / this.tableColumnResizeParams.element.parent._elm.offsetWidth) * 100).toFixed(2))}%`
				this.editor.formatElementStack()
				this.editor.domRender()
				this.editor.rangeRender()
			}
			this.tableColumnResizeParams.element = null
			this.tableColumnResizeParams.start = 0
		},
		//编辑区域键盘按下
		contentKeyDown(e) {
			if (this.disabled) {
				return
			}
			//增加缩进
			if (e.keyCode == 9 && !e.metaKey && !e.shiftKey && !e.ctrlKey && !e.altKey) {
				e.preventDefault()
				this.setIndent()
			}
			//减少缩进
			else if (e.keyCode == 9 && !e.metaKey && e.shiftKey && !e.ctrlKey && !e.altKey) {
				e.preventDefault()
				this.setOutdent()
			}
			//自定义键盘按下操作
			else {
				this.$emit('keydown', e)
			}
		},
		//输入框获取焦点
		inputFocus(event) {
			if (this.disabled) {
				return
			}
			event.currentTarget.style.borderColor = this.activeColor
		},
		//输入框失去焦点
		inputBlur(event) {
			if (this.disabled) {
				return
			}
			event.currentTarget.style.borderColor = ''
		},
		//自动矫正调整器的位置
		autoLayerOffset(refName) {
			let b1 = Dap.element.getElementBounding(this.$el)
			let b2 = Dap.element.getElementBounding(this.$refs[refName].$el)
			if (b1.top >= b2.top || b1.bottom >= b2.bottom) {
				this.$refs[refName].$el.style.bottom = b1.bottom + 'px'
				this.$refs[refName].$el.style.top = 'auto'
			} else {
				this.$refs[refName].reset()
			}
			b1 = Dap.element.getElementBounding(this.$el)
			b2 = Dap.element.getElementBounding(this.$refs[refName].$el)
			if (b1.top >= b2.top || b1.bottom >= b2.bottom) {
				this.$refs[refName].$el.style.bottom = b1.bottom + 'px'
				this.$refs[refName].$el.style.top = 'auto'
			}
		},
		//监听滚动隐藏编辑器内的浮层
		onScroll() {
			const setScroll = el => {
				Dap.event.on(el, `scroll.editor_${this.uid}`, e => {
					this.linkAdjusterProps.show = false
					this.mediaAdjusterProps.show = false
					this.tableAdjusterProps.show = false
					this.preAdjusterProps.show = false
				})
				if (el.parentNode) {
					setScroll(el.parentNode)
				}
			}
			setScroll(this.$refs.content)
		},
		//移除上述滚动事件的监听
		removeScroll() {
			const removeScroll = el => {
				Dap.event.off(el, `scroll.editor_${this.uid}`)
				if (el.parentNode) {
					removeScroll(el.parentNode)
				}
			}
			removeScroll(this.$refs.content)
		},
		//编辑器内部修改值的方法
		internalModify(val) {
			this.isModelChange = true
			this.cmpValue = val
			this.$nextTick(() => {
				this.isModelChange = false
			})
		},
		//元素格式化时转换ol和ul标签
		orderListHandle(element) {
			//ol标签和ul标签转为div
			if (element.parsedom == 'ol' || element.parsedom == 'ul') {
				if (element.hasChildren()) {
					element.children.forEach((el, index) => {
						const newEl = el.clone()
						newEl.parsedom = 'div'
						newEl.type = 'block'
						if (!newEl.hasMarks()) {
							newEl.marks = {}
						}
						newEl.marks['data-list'] = element.parsedom
						if (element.parsedom == 'ol') {
							newEl.marks['data-value'] = index + 1
						}
						//插入到该元素之后
						this.editor.addElementAfter(newEl, element)
					})
				}
				element.toEmpty()
			}
			//有序列表的序号处理
			if (element.type == 'block' && element.hasMarks() && element.marks['data-list'] == 'ol') {
				//获取前一个元素
				const previousElement = this.editor.getPreviousElement(element)
				//如果前一个元素存在并且也是有序列表
				if (previousElement && previousElement.hasMarks() && previousElement.marks['data-list'] == 'ol') {
					const previousValue = Number(previousElement.marks['data-value'])
					element.marks['data-value'] = previousValue + 1
				}
				//前一个元素不是有序列表，则从0开始
				else {
					element.marks['data-value'] = 1
				}
			}
		},
		//元素格式化时处理媒体元素和链接
		mediaHandle(element) {
			//图片增加marks
			if (element.parsedom == 'img') {
				const marks = {
					'mvi-editor-element-key': element.key
				}
				if (element.hasMarks()) {
					Object.assign(element.marks, marks)
				} else {
					element.marks = marks
				}
			}
			//视频增加marks
			if (element.parsedom == 'video') {
				const marks = {
					controls: true,
					autoplay: true,
					muted: true,
					'mvi-editor-element-key': element.key
				}
				if (element.hasMarks()) {
					Object.assign(element.marks, marks)
				} else {
					element.marks = marks
				}
			}
			//链接增加marks
			if (element.parsedom == 'a') {
				const marks = {
					'mvi-editor-element-key': element.key
				}
				if (element.hasMarks()) {
					Object.assign(element.marks, marks)
				} else {
					element.marks = marks
				}
			}
		},
		//元素格式化时转换code标签
		codeHandle(element) {
			if (element.parsedom == 'code') {
				element.parsedom = 'span'
				const marks = {
					'data-code-style': true
				}
				if (element.hasMarks()) {
					Object.assign(element.marks, marks)
				} else {
					element.marks = marks
				}
			}
		},
		//元素格式化时处理表格
		tableHandle(element) {
			if (element.parsedom == 'table') {
				const marks = {
					'mvi-editor-element-key': element.key
				}
				if (element.hasMarks()) {
					Object.assign(element.marks, marks)
				} else {
					element.marks = marks
				}
				const elements = AlexElement.flatElements(element.children)
				const rows = elements.filter(el => {
					return el.parsedom == 'tr'
				})
				let colgroup = elements.find(el => {
					return el.parsedom == 'colgroup'
				})
				if (colgroup) {
					colgroup.children.forEach(col => {
						if (!col.hasMarks()) {
							col.marks = {
								width: 'auto'
							}
						} else if (!col.marks['width']) {
							col.marks['width'] = 'auto'
						}
					})
				} else {
					colgroup = new AlexElement('inblock', 'colgroup', null, null, null)
					for (let i = rows[0].children.length - 1; i >= 0; i--) {
						const col = new AlexElement(
							'closed',
							'col',
							{
								width: 'auto'
							},
							null,
							null
						)
						this.editor.addElementTo(col, colgroup)
					}
				}
				element.children = []
				const tbody = new AlexElement('inblock', 'tbody', null, null, null)
				rows.reverse().forEach(row => {
					this.editor.addElementTo(row, tbody)
				})
				this.editor.addElementTo(tbody, element)
				this.editor.addElementTo(colgroup, element)
			} else if (element.parsedom == 'th') {
				element.parsedom = 'td'
			}
		},
		//元素格式化时处理pre，将pre的内容根据语言进行样式处理
		preHandle(element) {
			//如果是代码块进行处理
			if ((element.isBlock() || element.isInblock()) && element.isPreStyle()) {
				const marks = {
					'mvi-editor-element-key': element.key
				}
				if (element.hasMarks()) {
					Object.assign(element.marks, marks)
				} else {
					element.marks = marks
				}
				//高亮处理
				if (this.highlight && element.hasChildren()) {
					//获取语言类型
					let language = element.marks['mvi-hljs-language'] || ''
					if (language && !this.preAdjusterProps.languages.includes(language)) {
						language = ''
					}
					//获取pre标签下所有的文本元素
					const originalTextElements = AlexElement.flatElements(element.children).filter(el => el.isText() && !el.isEmpty())
					//获取pre下的代码文本值
					const textContent = originalTextElements.reduce((val, item) => {
						return val + item.textContent
					}, '')
					//将文本元素的内容转为经过hljs处理的内容
					const html = getHljsHtml(textContent, language)
					if (html) {
						//将经过hljs处理的内容转为元素数组
						const newElements = this.editor.parseHtml(html)
						//处理光标位置
						this.updateRangeInPre(element, originalTextElements, newElements)
						//将新文本元素全部加入到pre子元素数组中
						element.children = newElements
						newElements.forEach(newEl => {
							newEl.parent = element
						})
					}
				}
			}
		},
		//点击编辑器
		clickEditor(e) {
			if (this.disabled) {
				return
			}
			const node = e.target
			e.preventDefault()
			//点击的是图片或者视频
			if (node.nodeName.toLocaleLowerCase() == 'img' || node.nodeName.toLocaleLowerCase() == 'video') {
				const key = node.getAttribute('mvi-editor-element-key')
				const element = this.editor.getElementByKey(key)
				this.editor.range.anchor.moveToStart(element)
				this.editor.range.focus.moveToEnd(element)
				this.editor.rangeRender()
			}
		},
		//编辑器内容变更
		handleContentChange(newVal, oldVal) {
			if (this.disabled) {
				return
			}
			//内部修改
			this.internalModify(newVal)
			//触发change事件
			this.$emit('change', newVal, oldVal)
		},
		//编辑器获取焦点
		handleContentFocus(val) {
			if (this.disabled) {
				return
			}
			if (this.border && this.activeColor && this.$refs.content) {
				this.$refs.content.style.borderColor = this.activeColor
				const rgb = Dap.color.hex2rgb(this.activeColor)
				this.$refs.content.style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
			}
			//获取焦点时可以使用菜单栏
			setTimeout(() => {
				this.canUseMenus = true
			}, 0)
			this.$emit('focus', val)
		},
		//编辑器失去焦点
		handleContentBlur(val) {
			if (this.disabled) {
				return
			}
			if (this.border && this.activeColor && this.$refs.content) {
				this.$refs.content.style.borderColor = ''
				this.$refs.content.style.boxShadow = ''
			}
			this.$emit('blur', val)
		},
		//编辑器换行：实现当前所在块如果只包含换行符，则转为段落
		handleInsertParagraph(element, previousElement) {
			if (previousElement.isOnlyHasBreak() && element.isOnlyHasBreak()) {
				if (!previousElement.isBlock()) {
					previousElement.convertToBlock()
				}
				if (previousElement.parsedom != AlexElement.BLOCK_NODE) {
					elementUtil.toParagraph(previousElement)
					this.editor.range.anchor.moveToStart(previousElement)
					this.editor.range.focus.moveToStart(previousElement)
					element.toEmpty()
				}
			}
		},
		//编辑器部分删除情景
		handleDelete(element) {
			if (element.isBlock()) {
				elementUtil.toParagraph(element)
			}
		},
		//编辑器range更新
		handleRangeUpdate(range) {
			if (this.disabled) {
				return
			}
			this.$emit('range-update', range)
			const img = this.getCurrentParsedomElement('img')
			const link = this.getCurrentParsedomElement('a')
			const video = this.getCurrentParsedomElement('video')
			const table = this.getCurrentParsedomElement('table')
			const pre = this.getCurrentParsedomElement('pre')
			this.isTable = !!table
			this.isPre = !!pre
			this.isLink = !!link
			setTimeout(() => {
				if (img || video) {
					const el = img || video
					this.mediaAdjusterProps.target = `[mvi-editor-element-key='${el.key}']`
					this.mediaAdjusterProps.element = el
					this.mediaAdjusterProps.show = true
					this.linkAdjusterProps.show = false
					this.tableAdjusterProps.show = false
					this.preAdjusterProps.show = false
				} else if (link) {
					this.linkAdjusterProps.target = `[mvi-editor-element-key='${link.key}']`
					this.linkAdjusterProps.url = link.marks['href']
					this.linkAdjusterProps.newWindow = link.marks['target'] == '_blank'
					this.linkAdjusterProps.element = link
					this.linkAdjusterProps.show = true
					this.mediaAdjusterProps.show = false
					this.tableAdjusterProps.show = false
					this.preAdjusterProps.show = false
				} else if (table) {
					this.tableAdjusterProps.target = `[mvi-editor-element-key='${table.key}']`
					this.tableAdjusterProps.element = table
					this.tableAdjusterProps.show = true
					this.mediaAdjusterProps.show = false
					this.linkAdjusterProps.show = false
					this.preAdjusterProps.show = false
				} else if (pre) {
					this.preAdjusterProps.target = `[mvi-editor-element-key='${pre.key}']`
					this.preAdjusterProps.language = pre.marks['mvi-hljs-language'] || ''
					this.preAdjusterProps.element = pre
					this.preAdjusterProps.show = true
					this.mediaAdjusterProps.show = false
					this.linkAdjusterProps.show = false
					this.tableAdjusterProps.show = false
				} else {
					this.tableAdjusterProps.show = false
					this.mediaAdjusterProps.show = false
					this.linkAdjusterProps.show = false
					this.preAdjusterProps.show = false
				}
			}, 100)
		},
		//编辑器dom渲染
		handleAfterRender() {
			//解决代码块内输入内容导致代码块高度变化而浮层不更新位置的bug
			if (this.preAdjusterProps.show) {
				this.autoLayerOffset('preLayer')
			}
			this.$emit('after-render')
		},
		//粘贴html时过滤部分元素的样式和属性
		handlePasteHtml(data, elements) {
			AlexElement.flatElements(elements).forEach(el => {
				//粘贴时以下元素应当改为内部定义的样式，因此需要移除原来的属性和样式
				if (['table', 'tr', 'th', 'td', 'tbody', 'br', 'blockquote', 'ol', 'ul', 'li', 'pre', 'code', 'label', 'hr', 'colgroup'].includes(el.parsedom)) {
					el.marks = null
					//根级块元素和内部块元素
					if (el.isBlock() || el.isInblock()) {
						if (el.hasStyles()) {
							let styles = {}
							for (let key in el.styles) {
								if (['text-indent', 'text-align'].includes(key)) {
									styles[key] = el.styles[key]
								}
							}
							el.styles = styles
						}
					}
					//其他元素
					else {
						el.styles = null
					}
				}
			})
		},
		//删除当前链接
		deleteLink() {
			if (this.disabled) {
				return
			}
			const element = this.linkAdjusterProps.element
			element.parsedom = AlexElement.TEXT_NODE
			delete element.marks.target
			delete element.marks.href
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
			this.linkAdjusterProps.show = false
		},
		//修改当前链接
		updateLink() {
			if (this.disabled) {
				return
			}
			if (!this.linkAdjusterProps.url) {
				return
			}
			const element = this.linkAdjusterProps.element
			element.marks.href = this.linkAdjusterProps.url
			if (this.linkAdjusterProps.newWindow) {
				element.marks.target = '_blank'
			} else {
				delete element.marks.target
			}
			this.editor.formatElementStack()
			this.editor.domRender()
		},
		//设置媒体宽度
		setMediaWidth(value) {
			if (this.disabled) {
				return
			}
			const element = this.mediaAdjusterProps.element
			const styles = {
				width: value
			}
			if (element.hasStyles()) {
				Object.assign(element.styles, styles)
			} else {
				element.styles = styles
			}
			this.editor.range.anchor.moveToEnd(element)
			this.editor.range.focus.moveToEnd(element)
			this.editor.domRender()
			this.editor.rangeRender()
			this.mediaAdjusterProps.show = false
		},
		//删除媒体
		deleteMedia() {
			if (this.disabled) {
				return
			}
			this.editor.delete()
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
			this.mediaAdjusterProps.show = false
		},
		//在表格前或者后换行
		insertParagraphToTable(type) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				this.editor.range.anchor.element = this.editor.range.focus.element
				this.editor.range.anchor.offset = this.editor.range.focus.offset
			}
			const table = this.tableAdjusterProps.element
			const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
			const breakEl = new AlexElement('closed', 'br', null, null, null)
			this.editor.addElementTo(breakEl, paragraph)
			if (type == 'up') {
				this.editor.addElementBefore(paragraph, table)
			} else {
				this.editor.addElementAfter(paragraph, table)
			}
			this.editor.range.anchor.moveToEnd(paragraph)
			this.editor.range.focus.moveToEnd(paragraph)
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//插入表格行
		addTableRow() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				this.editor.range.anchor.element = this.editor.range.focus.element
				this.editor.range.anchor.offset = this.editor.range.focus.offset
			}
			const row = this.getCurrentParsedomElement('tr')
			if (row) {
				const newRow = row.clone()
				newRow.children.forEach(column => {
					column.children = []
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					this.editor.addElementTo(breakEl, column)
				})
				this.editor.addElementAfter(newRow, row)
				this.editor.formatElementStack()
				this.editor.range.anchor.moveToStart(newRow)
				this.editor.range.focus.moveToStart(newRow)
				this.editor.domRender()
				this.editor.rangeRender()
				this.autoLayerOffset('tableLayer')
			}
		},
		//删除表格行
		removeTableRow() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				this.editor.range.anchor.element = this.editor.range.focus.element
				this.editor.range.anchor.offset = this.editor.range.focus.offset
			}
			const row = this.getCurrentParsedomElement('tr')
			if (row) {
				const parent = row.parent
				if (parent.children.length == 1) {
					this.deleteTable()
					return
				}
				const previousRow = this.editor.getPreviousElement(row)
				const nextRow = this.editor.getNextElement(row)
				row.toEmpty()
				this.editor.formatElementStack()
				if (previousRow) {
					this.editor.range.anchor.moveToEnd(previousRow.children[0])
					this.editor.range.focus.moveToEnd(previousRow.children[0])
				} else {
					this.editor.range.anchor.moveToEnd(nextRow.children[0])
					this.editor.range.focus.moveToEnd(nextRow.children[0])
				}
				this.editor.domRender()
				this.editor.rangeRender()
				this.autoLayerOffset('tableLayer')
			}
		},
		//插入表格列
		addTableColumn() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				this.editor.range.anchor.element = this.editor.range.focus.element
				this.editor.range.anchor.offset = this.editor.range.focus.offset
			}
			const column = this.getCurrentParsedomElement('td')
			const tbody = this.getCurrentParsedomElement('tbody')
			const table = this.getCurrentParsedomElement('table')
			if (column && table && tbody) {
				const rows = tbody.children
				const index = column.parent.children.findIndex(item => {
					return item.isEqual(column)
				})
				//插入列
				rows.forEach(row => {
					const newColumn = column.clone(false)
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					this.editor.addElementTo(breakEl, newColumn)
					this.editor.addElementTo(newColumn, row, index + 1)
				})
				//插入col
				const colgroup = table.children.find(item => {
					return item.parsedom == 'colgroup'
				})
				const col = new AlexElement('closed', 'col', null, null, null)
				this.editor.addElementTo(col, colgroup, index + 1)
				//渲染
				this.editor.formatElementStack()
				const nextColumn = this.editor.getNextElement(column)
				this.editor.range.anchor.moveToStart(nextColumn)
				this.editor.range.focus.moveToStart(nextColumn)
				this.editor.domRender()
				this.editor.rangeRender()
			}
		},
		//删除表格列
		removeTableColumn() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				this.editor.range.anchor.element = this.editor.range.focus.element
				this.editor.range.anchor.offset = this.editor.range.focus.offset
			}
			const column = this.getCurrentParsedomElement('td')
			const tbody = this.getCurrentParsedomElement('tbody')
			const table = this.getCurrentParsedomElement('table')
			if (column && table && tbody) {
				const rows = tbody.children
				const parent = column.parent
				if (parent.children.length == 1) {
					this.deleteTable()
					return
				}
				const previousColumn = this.editor.getPreviousElement(column)
				const nextColumn = this.editor.getNextElement(column)
				const index = column.parent.children.findIndex(item => {
					return item.isEqual(column)
				})
				//删除列
				rows.forEach(row => {
					row.children[index].toEmpty()
				})
				//删除col
				const colgroup = table.children.find(item => {
					return item.parsedom == 'colgroup'
				})
				colgroup.children[index].toEmpty()
				//渲染
				this.editor.formatElementStack()
				if (previousColumn) {
					this.editor.range.anchor.moveToEnd(previousColumn)
					this.editor.range.focus.moveToEnd(previousColumn)
				} else {
					this.editor.range.anchor.moveToEnd(nextColumn)
					this.editor.range.focus.moveToEnd(nextColumn)
				}
				this.editor.domRender()
				this.editor.rangeRender()
			}
		},
		//删除表格
		deleteTable() {
			if (this.disabled) {
				return
			}
			if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				this.editor.range.anchor.element = this.editor.range.focus.element
				this.editor.range.anchor.offset = this.editor.range.focus.offset
			}
			const table = this.tableAdjusterProps.element
			table.toEmpty()
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//在代码块前或者后换行
		insertParagraphToPre(type) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				this.editor.range.anchor.element = this.editor.range.focus.element
				this.editor.range.anchor.offset = this.editor.range.focus.offset
			}
			const pre = this.preAdjusterProps.element
			const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
			const breakEl = new AlexElement('closed', 'br', null, null, null)
			this.editor.addElementTo(breakEl, paragraph)
			if (type == 'up') {
				this.editor.addElementBefore(paragraph, pre)
			} else {
				this.editor.addElementAfter(paragraph, pre)
			}
			this.editor.range.anchor.moveToEnd(paragraph)
			this.editor.range.focus.moveToEnd(paragraph)
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//选择代码块语言
		selectLanguage(data) {
			if (this.disabled) {
				return
			}
			const element = this.preAdjusterProps.element
			Object.assign(element.marks, {
				'mvi-hljs-language': data.value
			})
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//更新代码块内的光标位置
		updateRangeInPre(element, originalTextElements, newElements) {
			//如果虚拟光标的起点在代码块内对虚拟光标的起点进行重新定位
			if (this.editor.range.anchor.element.getBlock().isEqual(element)) {
				//获取起点所在文本元素的在所有文本元素中的序列
				const elIndex = originalTextElements.findIndex(el => this.editor.range.anchor.element.isEqual(el))
				//起点在整个代码内容中的位置
				const offset = originalTextElements.filter((el, i) => i < elIndex).reduce((total, item, i) => total + item.textContent.length, 0) + this.editor.range.anchor.offset
				//获取pre下新的子孙元素中全部的文本元素
				const newTextElements = AlexElement.flatElements(newElements).filter(el => el.isText() && !el.isEmpty())
				let i = 0
				let index = 0
				//遍历
				while (i < newTextElements.length) {
					let newIndex = index + newTextElements[i].textContent.length
					if (offset >= index && offset <= newIndex) {
						this.editor.range.anchor.element = newTextElements[i]
						this.editor.range.anchor.offset = offset - index
						break
					}
					i++
					index = newIndex
				}
			}
			//如果虚拟光标的终点在代码块内需要对虚拟光标的终点进行重新定位
			if (this.editor.range.focus.element.getBlock().isEqual(element)) {
				//获取终点所在文本元素的在所有文本元素中的序列
				const elIndex = originalTextElements.findIndex(el => this.editor.range.focus.element.isEqual(el))
				//终点在整个代码内容中的位置
				const offset = originalTextElements.filter((el, i) => i < elIndex).reduce((total, item, i) => total + item.textContent.length, 0) + this.editor.range.focus.offset
				//获取全部的新文本元素
				const newTextElements = AlexElement.flatElements(newElements).filter(el => el.isText() && !el.isEmpty())
				let i = 0
				let index = 0
				//遍历
				while (i < newTextElements.length) {
					let newIndex = index + newTextElements[i].textContent.length
					if (offset >= index && offset <= newIndex) {
						this.editor.range.focus.element = newTextElements[i]
						this.editor.range.focus.offset = offset - index
						break
					}
					i++
					index = newIndex
				}
			}
		},

		//api：注册菜单栏实例
		use(menus) {
			if (this.useMenus) {
				throw new Error('The editor has already used a menu bar and cannot be used repeatedly')
			}
			//把编辑器实例传给菜单栏组件
			menus.instance = this
			//更新useMenus标识
			this.useMenus = true
		},
		//api：获取光标是否在指定标签元素下，如果是返回元素，否则返回null
		getCurrentParsedomElement(parsedom) {
			if (this.disabled) {
				return null
			}
			const fn = element => {
				if (element.isBlock()) {
					return element.parsedom == parsedom ? element : null
				}
				if (!element.isText() && element.parsedom == parsedom) {
					return element
				}
				return fn(element.parent)
			}
			if (this.editor.range.anchor.element.isEqual(this.editor.range.focus.element)) {
				return fn(this.editor.range.anchor.element)
			}
			const arr = this.editor.getElementsByRange(true, false).map(item => {
				return fn(item.element)
			})
			let hasNull = arr.some(el => {
				return el == null
			})
			//如果存在null，则表示有的选区元素不在指定标签下，返回null
			if (hasNull) {
				return null
			}
			//如果只有一个元素，则返回该元素
			if (arr.length == 1) {
				return arr[0]
			}
			//默认数组中的元素都相等
			let flag = true
			for (let i = 1; i < arr.length; i++) {
				if (!arr[i].isEqual(arr[0])) {
					flag = false
					break
				}
			}
			//如果相等，则返回该元素
			if (flag) {
				return arr[0]
			}
			return null
		},
		//api：光标设置到文档底部
		collapseToEnd() {
			if (this.disabled) {
				return
			}
			this.editor.collapseToEnd()
			this.editor.rangeRender()
			Dap.element.setScrollTop({
				el: this.$refs.content,
				number: 1000000,
				time: 0
			})
		},
		//api：光标设置到文档头部
		collapseToStart() {
			if (this.disabled) {
				return
			}
			this.editor.collapseToStart()
			this.editor.rangeRender()
			this.$nextTick(() => {
				Dap.element.setScrollTop({
					el: this.$refs.content,
					number: 0,
					time: 0
				})
			})
		},
		//api：插入图片
		insertImage(url) {
			if (this.disabled) {
				return
			}
			const image = new AlexElement(
				'closed',
				'img',
				{
					src: url
				},
				null,
				null
			)
			this.editor.insertElement(image)
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入视频
		insertVideo(url) {
			if (this.disabled) {
				return
			}
			const video = new AlexElement(
				'closed',
				'video',
				{
					src: url
				},
				null,
				null
			)
			this.editor.insertElement(video)
			const leftSpace = AlexElement.getSpaceElement()
			const rightSpace = AlexElement.getSpaceElement()
			this.editor.addElementAfter(rightSpace, video)
			this.editor.addElementBefore(leftSpace, video)
			this.editor.range.anchor.moveToEnd(rightSpace)
			this.editor.range.focus.moveToEnd(rightSpace)
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入html
		insertHtml(html) {
			if (this.disabled) {
				return
			}
			if (!html) {
				return
			}
			const elements = this.editor.parseHtml(html)
			elements.reverse().forEach((el, index) => {
				if (index == 0) {
					this.editor.insertElement(el)
				} else {
					this.editor.addElementBefore(el, elements[0])
				}
			})
			this.editor.range.anchor.moveToEnd(elements[elements.length - 1])
			this.editor.range.focus.moveToEnd(elements[elements.length - 1])
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入文本
		insertText(text) {
			if (this.disabled) {
				return
			}
			if (!text) {
				return
			}
			this.editor.insertText(text)
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：撤销
		undo() {
			if (this.disabled) {
				return
			}
			const historyRecord = this.editor.history.get(-1)
			if (historyRecord) {
				this.editor.stack = historyRecord.stack
				this.editor.range = historyRecord.range
				this.editor.formatElementStack()
				this.editor.domRender(true)
				this.editor.rangeRender()
			}
		},
		//api：重做
		redo() {
			if (this.disabled) {
				return
			}
			const historyRecord = this.editor.history.get(1)
			if (historyRecord) {
				this.editor.stack = historyRecord.stack
				this.editor.range = historyRecord.range
				this.editor.formatElementStack()
				this.editor.domRender(true)
				this.editor.rangeRender()
			}
		},
		//api：清除格式
		removeFormat() {
			if (this.disabled) {
				return
			}
			this.editor.removeTextStyle()
			this.editor.removeTextMark()
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：增加缩进
		setIndent() {
			if (this.disabled) {
				return
			}
			const fn = element => {
				if (element.hasStyles()) {
					if (element.styles.hasOwnProperty('text-indent')) {
						let val = element.styles['text-indent']
						if (val.endsWith('em')) {
							val = parseFloat(val)
						} else {
							val = 0
						}
						element.styles['text-indent'] = `${val + 2}em`
					} else {
						element.styles['text-indent'] = '2em'
					}
				} else {
					element.styles = {
						'text-indent': '2em'
					}
				}
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const inblock = this.editor.range.anchor.element.getInblock()
				if (inblock) {
					if (inblock.isPreStyle()) {
						this.editor.insertText('    ')
					} else if (inblock.behavior == 'block') {
						fn(inblock)
					}
				} else {
					if (block.isPreStyle()) {
						this.editor.insertText('    ')
					} else {
						fn(block)
					}
				}
			} else {
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(item => {
					const block = item.element.getBlock()
					const inblock = item.element.getInblock()
					if (inblock && inblock.behavior == 'block') {
						fn(inblock)
					} else {
						fn(block)
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：减少缩进
		setOutdent() {
			if (this.disabled) {
				return
			}
			const fn = element => {
				if (element.hasStyles() && element.styles.hasOwnProperty('text-indent')) {
					let val = element.styles['text-indent']
					if (val.endsWith('em')) {
						val = parseFloat(val)
					} else {
						val = 0
					}
					element.styles['text-indent'] = `${val - 2 >= 0 ? val - 2 : 0}em`
				}
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const inblock = this.editor.range.anchor.element.getInblock()
				if (inblock && inblock.behavior == 'block' && !inblock.isPreStyle()) {
					fn(inblock)
				} else if (!block.isPreStyle()) {
					fn(block)
				}
			} else {
				const result = this.getElementsByRange(true, false)
				result.forEach(item => {
					const block = item.element.getBlock()
					const inblock = item.element.getInblock()
					if (inblock && inblock.behavior == 'block') {
						fn(inblock)
					} else {
						fn(block)
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入分隔线
		insertDivider() {
			if (this.disabled) {
				return
			}
			//创建段落
			const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
			//创建分隔线
			const divider = new AlexElement('closed', 'hr', null, null, null)
			//插入分割线
			this.editor.addElementTo(divider, paragraph)
			this.editor.insertElement(paragraph)
			const nextParagraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
			const breakEl = new AlexElement('closed', 'br', null, null, null)
			this.editor.addElementTo(breakEl, nextParagraph)
			this.editor.addElementAfter(nextParagraph, paragraph)
			//重新设置虚拟光标位置
			this.editor.range.anchor.moveToEnd(nextParagraph)
			this.editor.range.focus.moveToEnd(nextParagraph)
			//重新渲染
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：设置/清除代码样式
		setCodeStyle() {
			if (this.disabled) {
				return
			}
			const active = this.editor.queryTextMark('data-code-style')
			if (active) {
				this.editor.removeTextMark(['data-code-style'])
			} else {
				this.editor.setTextMark({
					'data-code-style': 'mvi-editor-code'
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：加粗
		setBold() {
			if (this.disabled) {
				return
			}
			const active = this.editor.queryTextStyle('font-weight', 'bold')
			if (active) {
				this.editor.removeTextStyle(['font-weight'])
			} else {
				this.editor.setTextStyle({
					'font-weight': 'bold'
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：斜体
		setItalic() {
			if (this.disabled) {
				return
			}
			const active = this.editor.queryTextStyle('font-style', 'italic')
			if (active) {
				this.editor.removeTextStyle(['font-style'])
			} else {
				this.editor.setTextStyle({
					'font-style': 'italic'
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：下划线
		setUnderline() {
			if (this.disabled) {
				return
			}
			const active = this.editor.queryTextStyle('text-decoration-line', 'underline') || this.editor.queryTextStyle('text-decoration', 'underline')
			if (active) {
				this.editor.removeTextStyle(['text-decoration-line', 'text-decoration'])
			} else {
				this.editor.setTextStyle({
					'text-decoration-line': 'underline'
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：删除线
		setStrikeThrough() {
			if (this.disabled) {
				return
			}
			const active = this.editor.queryTextStyle('text-decoration-line', 'line-through') || this.editor.queryTextStyle('text-decoration', 'line-through')
			if (active) {
				this.editor.removeTextStyle(['text-decoration-line', 'text-decoration'])
			} else {
				this.editor.setTextStyle({
					'text-decoration-line': 'line-through'
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：下标
		setSub() {
			if (this.disabled) {
				return
			}
			const active = this.editor.queryTextStyle('vertical-align', 'sub')
			if (active) {
				this.editor.removeTextStyle(['vertical-align'])
			} else {
				this.editor.setTextStyle({
					'vertical-align': 'sub'
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：上标
		setSuper() {
			if (this.disabled) {
				return
			}
			const active = this.editor.queryTextStyle('vertical-align', 'super')
			if (active) {
				this.editor.removeTextStyle(['vertical-align'])
			} else {
				this.editor.setTextStyle({
					'vertical-align': 'super'
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//设置标题
		setTitle(value) {
			if (this.disabled) {
				return
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				//先转为段落
				elementUtil.toParagraph(block)
				//设置标题
				block.parsedom = value
			} else {
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(el => {
					if (el.element.isBlock()) {
						elementUtil.toParagraph(el.element)
						el.element.parsedom = value
					} else {
						const block = el.element.getBlock()
						elementUtil.toParagraph(block)
						block.parsedom = value
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：设置字体
		setFontFamily(value) {
			if (this.disabled) {
				return
			}
			this.editor.setTextStyle({
				'font-family': value
			})
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：设置字号
		setFontSize(value) {
			if (this.disabled) {
				return
			}
			this.editor.setTextStyle({
				'font-size': value
			})
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：设置字体颜色
		setForeColor(value) {
			if (this.disabled) {
				return
			}
			this.editor.setTextStyle({
				color: value
			})
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：设置背景颜色
		setBackColor(value) {
			if (this.disabled) {
				return
			}
			this.editor.setTextStyle({
				'background-color': value
			})
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入有序列表 ordered为true表示有序列表
		setList(ordered) {
			if (this.disabled) {
				return
			}
			//起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const isList = elementUtil.isList(block, ordered)
				elementUtil.toParagraph(block)
				if (!isList) {
					elementUtil.toList(block, ordered)
				}
			}
			//起点和终点不在一起
			else {
				let blocks = []
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(item => {
					const block = item.element.getBlock()
					const exist = blocks.some(el => block.isEqual(el))
					if (!exist) {
						blocks.push(block)
					}
				})
				blocks.forEach(block => {
					const isList = elementUtil.isList(block, ordered)
					elementUtil.toParagraph(block)
					if (!isList) {
						elementUtil.toList(block, ordered)
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：设置对齐方式,参数取值justify/left/right/center
		setJustify(value) {
			if (this.disabled) {
				return
			}
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const inblock = this.editor.range.anchor.element.getInblock()
				if (inblock) {
					if (inblock.hasStyles()) {
						inblock.styles['text-align'] = value
					} else {
						inblock.styles = {
							'text-align': value
						}
					}
				} else {
					if (block.hasStyles()) {
						block.styles['text-align'] = value
					} else {
						block.styles = {
							'text-align': value
						}
					}
				}
			} else {
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(el => {
					if (el.element.isBlock() || el.element.isInblock()) {
						if (el.element.hasStyles()) {
							el.element.styles['text-align'] = value
						} else {
							el.element.styles = {
								'text-align': value
							}
						}
					} else {
						const block = el.element.getBlock()
						const inblock = el.element.getInblock()
						if (inblock) {
							if (inblock.hasStyles()) {
								inblock.styles['text-align'] = value
							} else {
								inblock.styles = {
									'text-align': value
								}
							}
						} else {
							if (block.hasStyles()) {
								block.styles['text-align'] = value
							} else {
								block.styles = {
									'text-align': value
								}
							}
						}
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入引用
		setQuote() {
			if (this.disabled) {
				return
			}
			//起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				const block = this.editor.range.anchor.element.getBlock()
				const oldParsedom = block.parsedom
				elementUtil.toParagraph(block)
				if (oldParsedom != 'blockquote') {
					block.parsedom = 'blockquote'
				}
			}
			//起点和终点不在一起
			else {
				let blocks = []
				const result = this.editor.getElementsByRange(true, false)
				result.forEach(item => {
					const block = item.element.getBlock()
					const exist = blocks.some(el => block.isEqual(el))
					if (!exist) {
						blocks.push(block)
					}
				})
				blocks.forEach(block => {
					const oldParsedom = block.parsedom
					elementUtil.toParagraph(block)
					if (oldParsedom != 'blockquote') {
						block.parsedom = 'blockquote'
					}
				})
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//api：插入代码块
		setCodeBlock() {
			if (this.disabled) {
				return
			}
			const pre = this.getCurrentParsedomElement('pre')
			if (pre) {
				elementUtil.toParagraph(pre)
			} else {
				//起点和终点在一起
				if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
					const block = this.editor.range.anchor.element.getBlock()
					elementUtil.toParagraph(block)
					block.parsedom = 'pre'
					const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					this.editor.addElementTo(breakEl, paragraph)
					this.editor.addElementAfter(paragraph, block)
				}
				//起点和终点不在一起
				else {
					let result = this.editor.getElementsByRange(true, false)
					this.editor.range.anchor.moveToStart(result[0].element.getBlock())
					this.editor.range.focus.moveToEnd(result[result.length - 1].element.getBlock())
					const res = this.editor.getElementsByRange(true, true).filter(el => el.element.isText())
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
								this.editor.addElementTo(text, pre, pre.children.length)
							} else {
								this.editor.addElementTo(text, pre)
							}
						}
						obj[key].forEach(el => {
							if (pre.hasChildren()) {
								this.editor.addElementTo(el, pre, pre.children.length)
							} else {
								this.editor.addElementTo(el, pre)
							}
						})
					})
					this.editor.delete()
					this.editor.insertElement(pre)
					const paragraph = new AlexElement('block', AlexElement.BLOCK_NODE, null, null, null)
					const breakEl = new AlexElement('closed', 'br', null, null, null)
					this.editor.addElementTo(breakEl, paragraph)
					this.editor.addElementAfter(paragraph, pre)
				}
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		}
	},
	beforeUnmount() {
		//卸载滚动监听事件
		this.removeScroll()
		//卸载绑定在document.documentElement上的事件
		Dap.event.off(document.documentElement, `mousedown.editor_${this.uid} mousemove.editor_${this.uid} mouseup.editor_${this.uid}`)
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-editor {
	display: block;
	position: relative;
	width: 100%;

	.mvi-editor-code {
		display: block;
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		z-index: 10;
		background-color: #000;
		border-radius: @radius-default;
		margin: 0;
		padding: @mp-sm;
		overflow-x: hidden;
		overflow-y: auto;
		font-size: @font-size-default;
		color: #fff;
		font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
		resize: none;
		border: none;
	}

	.mvi-editor-content {
		display: block;
		width: 100%;
		height: auto;
		position: relative;
		z-index: 1;
		display: block;
		background-color: #fff;
		border-radius: @radius-default;
		margin: 0;
		padding: @mp-sm;
		overflow-x: hidden;
		overflow-y: auto;
		font-size: @font-size-default;
		color: @font-color-default;

		&.border {
			border: 1px solid @border-color;
			transition: border-color 600ms, box-shadow 600ms;
			-webkit-transition: border-color 600ms, box-shadow 600ms;
		}

		&.empty::before {
			position: absolute;
			top: @mp-sm;
			left: @mp-sm;
			content: attr(data-placeholder);
			font-size: inherit;
			color: inherit;
			opacity: 0.5;
			line-height: inherit;
			vertical-align: middle;
			cursor: text;
		}

		//分隔线样式
		:deep(hr) {
			display: block;
			width: 100%;
			margin: 0;
			padding: 0;
			height: 0.02rem;
			background-color: @bg-color-dark;
			border: none;
			font-size: 0;
		}
		//有序列表样式
		:deep(div[data-list='ol']) {
			margin-bottom: @mp-sm;

			&::before {
				content: attr(data-value) '.';
				margin-right: @mp-xs;
			}
		}
		//无序列表样式
		:deep(div[data-list='ul']) {
			margin-bottom: @mp-sm;

			&::before {
				content: '\2022';
				margin-right: @mp-xs;
			}
		}
		//引用样式
		:deep(blockquote) {
			display: block;
			border-left: @mp-xs solid @bg-color-dark;
			padding: @mp-xs @mp-sm @mp-xs @mp-md;
			margin: 0 0 @mp-sm;
			line-height: 1.5;
			font-size: @font-size-default;
			color: @font-color-sub;
			border-radius: 0;
		}
		//视频样式
		:deep(video),
		:deep(img) {
			position: relative;
			display: inline-block;
			width: 20%;
			border-radius: 0.04rem;
		}
		//代码样式
		:deep([data-code-style]) {
			display: inline-block;
			padding: @mp-xs / 2;
			margin: 0 @mp-xs / 2;
			color: @font-color-default;
			border-radius: @radius-default;
			font-size: @font-size-default;
			line-height: 1;
			background-color: @bg-color-default;
			font-family: Consolas, monospace, Monaco, Andale Mono, Ubuntu Mono;
			border: 1px solid @bg-color-dark;
			text-indent: initial;
		}
		//表格样式
		:deep(table) {
			width: 100%;
			border: 1px solid @border-color;
			margin: 0;
			padding: 0;
			font-size: @font-size-default;
			color: @font-color-default;
			border-collapse: collapse;
			margin-bottom: @mp-sm;

			tbody {
				margin: 0;
				padding: 0;

				tr {
					margin: 0;
					padding: 0;

					&:first-child {
						background-color: @bg-color-dark;

						td {
							font-weight: bold;
							position: relative;
						}
					}

					td {
						font-size: @font-size-default;
						color: @font-color-default;
						margin: 0;
						border-bottom: 1px solid @border-color;
						border-right: 1px solid @border-color;
						padding: @mp-sm;
						position: relative;

						&:last-child {
							border-right: none;
						}

						&:not(:last-child)::after {
							position: absolute;
							right: -@mp-lg / 2;
							top: 0;
							width: @mp-lg;
							height: 100%;
							content: '';
							z-index: 1;
							cursor: col-resize;
							user-select: none;
						}
					}
				}
			}
		}
		//代码块样式
		:deep(pre) {
			display: block;
			padding: @mp-sm;
			margin: 0 0 @mp-sm;
			font-size: @font-size-default;
			font-family: Consolas, monospace, Monaco, Andale Mono, Ubuntu Mono;
			line-height: 1.5;
			color: @font-color-default;
			background-color: @bg-color-default;
			border: 1px solid @bg-color-dark;
			border-radius: @radius-default;
			overflow: auto;
			position: relative;
		}

		&[disabled] {
			cursor: auto !important;
			&.empty::before {
				cursor: auto;
			}
			:deep(table) tr td:not(:last-child)::after {
				cursor: auto !important;
			}
		}
	}
}

.mvi-editor-layer-link {
	display: block;
	width: 6rem;
	padding: @mp-sm @mp-md;
	border-radius: inherit;
	font-size: @font-size-default;
	color: @font-color-default;

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
	.mvi-editor-layer-link-footer {
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;

		.mvi-editor-layer-link-delete {
			opacity: 0.8;

			&:hover {
				opacity: 1;
				cursor: pointer;
			}
		}
	}
}

.mvi-editor-layer {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: @mp-xs @mp-sm;
	border-radius: inherit;
	font-size: @font-size-default;
	color: @font-color-default;
}

.mvi-editor-layer-item {
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: @font-size-default;
	color: @font-color-default;
	opacity: 0.8;
	height: @small-height;
	padding: 0 @mp-sm;
	border-radius: @radius-default;
	line-height: 1;
	white-space: nowrap;

	&:hover {
		cursor: pointer;
		opacity: 1;
	}

	:deep(.mvi-select) {
		.mvi-select-target {
			height: @mini-height;
			font-size: @font-size-small;
			padding: 0 @mp-md * 2 0 @mp-sm;
		}

		.mvi-select-icon {
			font-size: @font-size-small;
			right: @mp-sm;
			transform: scale(0.8);

			&.active {
				transform: scale(0.8) rotate(180deg);
			}
		}

		.mvi-select-menu .mvi-select-option {
			font-size: @font-size-small;
			padding: @mp-sm;
		}
	}
}

:deep(.mvi-editor-layer-animation-enter-from),
:deep(.mvi-editor-layer-animation-leave-to) {
	opacity: 0;
}
</style>
