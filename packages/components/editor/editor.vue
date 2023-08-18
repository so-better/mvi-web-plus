<template>
	<div class="mvi-editor">
		<!-- 代码视图 -->
		<textarea v-if="codeViewShow" ref="code" readonly class="mvi-editor-code" :value="cmpValue" />
		<!-- 编辑器视图 -->
		<div ref="content" :data-placeholder="placeholder" :class="['mvi-editor-content', border ? 'border' : '', isEmpty ? 'empty' : '']" :style="contentStyle" @compositionstart="compositionFlag = true" @compositionend="compositionFlag = false" @click="clickEditor" :disabled="disabled || null"></div>
		<!-- 链接调整器 -->
		<m-layer v-model="linkAdjusterProps.show" fixed :target="linkAdjusterProps.target" placement="bottom-start" animation="mvi-editor-layer-animation" :timeout="50" border background="#fff" border-color="#eee" offset="0.05rem" closable ref="linkLayer" @showing="autoLayerOffset('linkLayer')">
			<div class="mvi-editor-layer-link">
				<input @change="updateLink" ref="linkUrl" @focus="inputFocus" @blur="inputBlur" v-model.trim="linkAdjusterProps.url" :placeholder="linkAdjusterProps.props.placeholder" type="text" />
				<div class="mvi-editor-layer-link-footer">
					<Checkbox @change="updateLink" :label="linkAdjusterProps.props.targetText" label-placement="right" :icon="{ size: '0.24rem' }" label-size="0.28rem" label-color="#505050" :fill-color="activeColor" v-model="linkAdjusterProps.newWindow"> </Checkbox>
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
				<div @click="insertParagraph('up')" class="mvi-editor-layer-item"><Icon style="transform: rotate(180deg)" type="turn-arrow-text" /></div>
				<div @click="insertParagraph('down')" class="mvi-editor-layer-item"><Icon type="turn-arrow-text" /></div>
				<div @click="addTableRow" :style="{ color: activeColor }" class="mvi-editor-layer-item">{{ tableAdjusterProps.props.insertRowText }}</div>
				<div @click="removeTableRow" class="mvi-editor-layer-item">{{ tableAdjusterProps.props.removeRowText }}</div>
				<div @click="addTableColumn" :style="{ color: activeColor }" class="mvi-editor-layer-item">{{ tableAdjusterProps.props.insertColumnText }}</div>
				<div @click="removeTableColumn" class="mvi-editor-layer-item">{{ tableAdjusterProps.props.removeColumnText }}</div>
				<div @click="deleteTable" class="mvi-editor-layer-item"><Icon type="trash-alt" /></div></div
		></m-layer>
	</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { AlexElement, AlexEditor } from 'alex-editor'
import elementUtil from '../editor-menu/elementUtil'
import { Icon } from '../icon'
import { Field } from '../field'
import { Checkbox } from '../checkbox'
export default {
	name: 'm-editor',
	emits: ['update:modelValue', 'focus', 'blur', 'change', 'paste-image', 'paste-video', 'range-update'],
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
		}
	},
	data() {
		return {
			//是否显示代码视图，代码视图下不可编辑
			codeViewShow: false,
			//编辑器实例
			editor: null,
			//中文输入
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
				target: ''
			},
			//表格调整器参数
			tableAdjusterProps: {
				show: false,
				target: '',
				props: {
					insertRowText: '插入行',
					removeRowText: '删除行',
					insertColumnText: '插入列',
					removeColumnText: '删除列'
				}
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
		Field,
		Checkbox
	},
	computed: {
		//编辑器的值
		cmpValue: {
			set(val) {
				this.$emit('update:modelValue', val)
			},
			get() {
				return this.modelValue
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
			const elements = AlexElement.flatElements(this.editor.stack)
			this.editor.range.anchor.moveToEnd(elements[elements.length - 1])
			this.editor.range.focus.moveToEnd(elements[elements.length - 1])
			this.editor.domRender()
			this.editor.rangeRender()
		}
	},
	mounted() {
		//创建编辑器
		this.editor = new AlexEditor(this.$refs.content, {
			disabled: this.disabled,
			value: this.cmpValue,
			renderRules: [this.orderListHandle, this.codeHandle, this.mediaHandle, this.thParseTdHandle, this.tableHandle],
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
	},
	methods: {
		//元素格式化时转换ol和ul标签
		orderListHandle(element) {
			if (!element.isEmpty()) {
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
							//插入到该元素之前
							this.editor.addElementBefore(newEl, element)
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
			}
		},
		//元素格式化时处理媒体元素和链接
		mediaHandle(element) {
			if (!element.isEmpty()) {
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
			}
		},
		//元素格式化时转换code标签
		codeHandle(element) {
			if (!element.isEmpty() && element.parsedom == 'code') {
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
		//元素格式化时表格th转td
		thParseTdHandle(element) {
			if (element.parsedom == 'th') {
				element.parsedom = 'td'
			}
		},
		//元素格式化时处理表格
		tableHandle(element) {
			if (element.parsedom == 'table' && !element.isEmpty()) {
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
			}
		},
		//输入框获取焦点
		inputFocus(event) {
			event.currentTarget.style.borderColor = this.activeColor
		},
		//输入框失去焦点
		inputBlur(event) {
			event.currentTarget.style.borderColor = ''
		},
		//自动矫正调整器的位置
		autoLayerOffset(refName) {
			const b1 = Dap.element.getElementBounding(this.$el)
			const b2 = Dap.element.getElementBounding(this.$refs[refName].$el)
			if (b1.top >= b2.top || b1.bottom >= b2.bottom) {
				this.$refs[refName].$el.style.bottom = b1.bottom + 'px'
				this.$refs[refName].$el.style.top = 'auto'
			} else {
				this.$refs[refName].reset()
			}
		},
		//监听滚动隐藏编辑器内的浮层
		onScroll() {
			const setScroll = el => {
				Dap.event.on(el, `scroll.editor_${this.uid}`, e => {
					if (this.linkAdjusterProps.show) {
						this.linkAdjusterProps.show = false
					}
					if (this.mediaAdjusterProps.show) {
						this.mediaAdjusterProps.show = false
					}
					if (this.tableAdjusterProps.show) {
						this.tableAdjusterProps.show = false
					}
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
			if (this.border && this.activeColor) {
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
			if (this.border && this.activeColor) {
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
			elementUtil.toParagraph(element)
			if (element.isInblock()) {
				element.convertToBlock()
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
			setTimeout(() => {
				if (img || video) {
					const el = img || video
					this.mediaAdjusterProps.target = `[mvi-editor-element-key='${el.key}']`
					this.mediaAdjusterProps.show = true
					this.linkAdjusterProps.show = false
					this.tableAdjusterProps.show = false
				} else if (link) {
					this.linkAdjusterProps.target = `[mvi-editor-element-key='${link.key}']`
					this.linkAdjusterProps.show = true
					this.linkAdjusterProps.url = link.marks['href']
					this.linkAdjusterProps.newWindow = link.marks['target'] == '_blank'
					this.mediaAdjusterProps.show = false
					this.tableAdjusterProps.show = false
				} else if (table) {
					this.tableAdjusterProps.target = `[mvi-editor-element-key='${table.key}']`
					this.tableAdjusterProps.show = true
					this.mediaAdjusterProps.show = false
					this.linkAdjusterProps.show = false
				} else {
					this.tableAdjusterProps.show = false
					this.mediaAdjusterProps.show = false
					this.linkAdjusterProps.show = false
				}
			}, 100)
		},
		//编辑器dom渲染
		handleAfterRender() {
			const elements = AlexElement.flatElements(this.editor.stack)
			const tables = elements.filter(el => {
				return el.parsedom == 'table'
			})
			tables.forEach(table => {
				const firstRow = AlexElement.flatElements(table.children).filter(el => {
					return el.parsedom == 'tr'
				})[0]
				firstRow.children.forEach((column, i) => {
					this.setTabelColumnResize(table, firstRow, column, i)
				})
			})
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
		//设置表格列宽拖拽
		setTabelColumnResize(table, firstRow, column, i) {
			if (this.disabled) {
				return
			}
			//最后一个列不设置拖拽
			if (i == firstRow.children.length - 1) {
				return
			}
			//列在行中的序列
			const index = column.parent.children.findIndex(item => {
				return item.isEqual(column)
			})
			//colgroup
			const colgroup = table.children.find(item => {
				return item.parsedom == 'colgroup'
			})
			//先移除事件
			Dap.event.off(column._elm, 'mousedown')
			Dap.event.off(document.documentElement, `mousemove.editor_table_${table.key}_${index}_${this.uid} mouseup.editor_table_${table.key}_${index}_${this.uid}`)
			//是否可以拖拽
			let canResize = false
			//按下时的位置
			let start = 0
			//鼠标按下
			Dap.event.on(column._elm, 'mousedown', e => {
				if (this.disabled) {
					return
				}
				const rect = Dap.element.getElementBounding(column._elm)
				//在可拖拽范围内
				if (Math.abs(rect.left + column._elm.offsetWidth - e.pageX) < Dap.element.rem2px(0.2)) {
					canResize = true
					start = e.pageX
				} else {
					canResize = false
				}
			})
			//鼠标移动
			Dap.event.on(document.documentElement, `mousemove.editor_table_${table.key}_${index}_${this.uid}`, e => {
				if (this.disabled) {
					return
				}
				if (canResize) {
					colgroup.children[index].marks['width'] = `${column._elm.offsetWidth + e.pageX - start}`
					colgroup.children[index]._elm.setAttribute('width', `${column._elm.offsetWidth + e.pageX - start}`)
					start = e.pageX
				}
			})
			//鼠标松开
			Dap.event.on(document.documentElement, `mouseup.editor_table_${table.key}_${index}_${this.uid}`, e => {
				if (this.disabled) {
					return
				}
				if (canResize) {
					const width = Number(colgroup.children[index].marks['width'])
					if (!isNaN(width)) {
						colgroup.children[index].marks['width'] = `${Number(((width / firstRow._elm.offsetWidth) * 100).toFixed(2))}%`
						this.editor.formatElementStack()
						this.editor.domRender()
						this.editor.rangeRender()
					}
					canResize = false
					start = 0
				}
			})
		},
		//删除当前链接
		deleteLink() {
			if (this.disabled) {
				return
			}
			const element = this.getCurrentParsedomElement('a')
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
			const element = this.getCurrentParsedomElement('a')
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
			const element = this.getCurrentParsedomElement('img') || this.getCurrentParsedomElement('video')
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
			this.editor.delete()
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
			this.mediaAdjusterProps.show = false
		},
		//在表格前或者后换行
		insertParagraph(type) {
			if (this.disabled) {
				return
			}
			if (!this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				this.editor.range.anchor.element = this.editor.range.focus.element
				this.editor.range.anchor.offset = this.editor.range.focus.offset
			}
			const table = this.getCurrentParsedomElement('table')
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
			this.$refs.tableLayer.reset()
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
			const rows = tbody.children
			const index = column.parent.children.findIndex(item => {
				return item.isEqual(column)
			})
			rows.forEach(row => {
				const newColumn = column.clone(false)
				const breakEl = new AlexElement('closed', 'br', null, null, null)
				this.editor.addElementTo(breakEl, newColumn)
				this.editor.addElementTo(newColumn, row, index + 1)
			})
			this.editor.formatElementStack()
			const nextColumn = this.editor.getNextElement(column)
			this.editor.range.anchor.moveToStart(nextColumn)
			this.editor.range.focus.moveToStart(nextColumn)
			this.editor.domRender()
			this.editor.rangeRender()
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
			rows.forEach(row => {
				row.children[index].toEmpty()
			})
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
			const table = this.getCurrentParsedomElement('table')
			table.toEmpty()
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
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
			const elements = this.editor.getElementsByRange(true, false)
			this.editor.formatElementStack()
			const arr = []
			elements.forEach(el => {
				arr.push(fn(el))
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
			if (!text) {
				return
			}
			this.editor.insertText(text)
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		}
	},
	beforeUnmount() {
		//卸载滚动监听事件
		this.removeScroll()
		//卸载绑定在document.documentElement上的事件
		const data = Dap.event.get(document.documentElement)
		for (let key in data) {
			if (key.startsWith('mousemove.editor_') || key.startsWith('mouseup.editor_')) {
				Dap.event.off(document.documentElement, key)
			}
		}
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
			margin: @mp-sm 0;
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
			padding: @mp-xs;
			margin: 0 @mp-xs / 2;
			color: @font-color-default;
			border-radius: @radius-default;
			font-size: @font-size-default;
			line-height: 1;
			background-color: @bg-color-default;
			font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
			border: 1px solid @bg-color-dark;
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
			font-family: Consolas, Monaco, Andale Mono, Ubuntu Mono, monospace;
			line-height: 1.5;
			color: @font-color-default;
			background-color: @bg-color-default;
			border: 1px solid @bg-color-dark;
			border-radius: @radius-default;
			overflow: auto;
			position: relative;
		}

		&[disabled] {
			&.empty::before {
				cursor: not-allowed;
			}
			:deep(table) tr:first-child td:not(:last-child)::after {
				cursor: not-allowed !important;
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
}

:deep(.mvi-editor-layer-animation-enter-from),
:deep(.mvi-editor-layer-animation-leave-to) {
	opacity: 0;
}
</style>
