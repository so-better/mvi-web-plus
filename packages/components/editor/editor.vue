<template>
	<div class="mvi-editor">
		<!-- 代码视图 -->
		<textarea v-if="codeViewShow" ref="code" readonly class="mvi-editor-code" :value="cmpValue" />
		<!-- 编辑器视图 -->
		<div ref="content" :data-placeholder="placeholder" :class="['mvi-editor-content', border ? 'border' : '', isEmpty ? 'empty' : '']" :style="contentStyle" @compositionstart="compositionFlag = true" @compositionend="compositionFlag = false"></div>
	</div>
</template>
<script>
import { Dap } from '../dap'
import { AlexElement, AlexEditor } from 'alex-editor'
export default {
	name: 'm-editor',
	emits: ['update:modelValue', 'focus', 'blur', 'change', 'paste-file'],
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
		//初始高度
		height: {
			type: String,
			default: '8rem'
		},
		//编辑区域高度是否自动变化
		autoHeight: {
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
		//是否自定义粘贴文件
		customPasteFile: {
			type: Boolean,
			default: false
		},
		//粘贴文本时是否粘贴html
		htmlPaste: {
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
			//是否获取焦点
			focus: false
		}
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
			if (this.autoHeight) {
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
			renderRules: this._renderRules,
			htmlPaste: this.htmlPaste
		})
		//编辑器渲染后会有一个渲染过程，会改变内容，因此重新获取内容的值来设置modelValue
		this._internalModify(this.editor.value)
		//监听编辑器内容变更
		this.editor.on('change', this._handleContentChange)
		//监听编辑器聚焦
		this.editor.on('focus', this._handleContentFocus)
		//监听编辑器失去焦点
		this.editor.on('blur', this._handleContentBlur)
		//如果自定义粘贴文件则监听编辑器粘贴文件
		if (this.customPasteFile) {
			this.editor.on('pasteFile', this._handleContentPasteFile)
		}
		//设置自动获取焦点
		if (this.autofocus && !this.codeViewShow && !this.disabled) {
			this.collapseToEnd()
		}
	},
	methods: {
		//编辑器自定义渲染规则
		_renderRules(element) {
			//块元素不设置styles
			if (element.isBlock()) {
				element.styles = null
			}
			return element
		},
		//编辑器内部修改值的方法
		_internalModify(val) {
			this.isModelChange = true
			this.cmpValue = val
			this.$nextTick(() => {
				this.isModelChange = false
			})
		},
		//编辑器内容变更
		_handleContentChange(newVal, oldVal) {
			if (this.disabled) {
				return
			}
			//内部修改
			this._internalModify(newVal)
			//触发change事件
			this.$emit('change', newVal, oldVal)
		},
		//编辑器获取焦点
		_handleContentFocus(val) {
			if (this.disabled) {
				return
			}
			if (this.border && this.activeColor) {
				this.$refs.content.style.borderColor = this.activeColor
				const rgb = Dap.color.hex2rgb(this.activeColor)
				this.$refs.content.style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
			}
			this.focus = true
			this.$emit('focus', val)
		},
		//编辑器失去焦点
		_handleContentBlur(val) {
			if (this.disabled) {
				return
			}
			if (this.border && this.activeColor) {
				this.$refs.content.style.borderColor = ''
				this.$refs.content.style.boxShadow = ''
			}
			this.focus = false
			this.$emit('blur', val)
		},
		//编辑器粘贴文件
		_handleContentPasteFile(files) {
			if (this.disabled) {
				return
			}
			this.$emit('paste-file', files)
		},
		//获取元素的指定样式
		_getElementStyle(element, style) {
			//如果元素拥有此样式
			if (element.hasStyles() && element.styles.hasOwnProperty(style) && element.styles[style] != '') {
				return element.styles[style]
			}
			//如果元素没有该样式，则向上查找
			//根元素无法向上查找，返回null
			if (element.isRoot()) {
				return null
			}
			return this._getElementStyle(element.parent, style)
		},
		//注册菜单栏实例
		use(menus) {
			if (this.useMenus) {
				throw new Error('The editor has already used a menu bar and cannot be used repeatedly')
			}
			//把编辑器实例传给菜单栏组件
			menus.instance = this
			//更新useMenus标识
			this.useMenus = true
		},
		//光标设置到文档底部
		collapseToEnd() {
			if (this.disabled) {
				return
			}
			this.editor.collapseToEnd()
		},
		//光标设置到文档头部
		collapseToStart() {
			if (this.disabled) {
				return
			}
			this.editor.collapseToStart()
		},
		//撤销
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
		//重做
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
		//清除样式
		removeAllStyles() {
			if (this.disabled) {
				return
			}
			const anchorBlock = this.editor.range.anchor.element.getBlock()
			//起点和终点在同一个块元素内
			if (anchorBlock.hasContains(this.editor.range.focus.element)) {
				//清除选区元素中行内元素和自闭合元素的样式
				this.editor.getElementsByRange(true).forEach(el => {
					if (el.isText() || el.isClosed()) {
						el.styles = null
					}
				})
				//克隆选区元素
				let cloneElements = []
				this.editor.getElementsByRange(true, false).forEach(el => {
					cloneElements.push(el.clone(true))
				})
				const newBlock = anchorBlock.clone(true)
				this.editor.addElementAfter(newBlock, anchorBlock)
				//记录终点在块中的序列
				const index = AlexElement.flatElements(anchorBlock.children).findIndex(item => {
					return item.isEqual(this.editor.range.focus.element)
				})
				//记录终点的偏移值
				const offset = this.editor.range.focus.offset
				//删除块元素中在起点后面的部分
				this.editor.range.focus.moveToEnd(anchorBlock)
				if (!this.editor.range.focus.isEqual(this.editor.range.anchor)) {
					this.editor.delete()
				}
				//将光标移到新块上，并删除终点前面的部分
				this.editor.range.anchor.moveToStart(newBlock)
				this.editor.range.focus.element = AlexElement.flatElements(newBlock.children)[index]
				this.editor.range.focus.offset = offset
				if (!this.editor.range.focus.isEqual(this.editor.range.anchor)) {
					this.editor.delete()
				}
				//存在选区
				if (cloneElements.length) {
					cloneElements.forEach((el, index) => {
						if (el.isText() || el.isClosed()) {
							let spanEl = new AlexElement('inline', 'span', null, null, null)
							this.editor.addElementTo(el, spanEl)
							this.editor.addElementTo(spanEl, newBlock, index)
						} else {
							this.editor.addElementTo(el, newBlock, index)
						}
					})
					this.editor.range.anchor.moveToStart(cloneElements[0])
					this.editor.range.focus.moveToEnd(cloneElements[cloneElements.length - 1])
				}
				//起点和终点在一起即没有选区
				else {
					let spanEl = new AlexElement('inline', 'span', null, null, null)
					let spaceEl = AlexElement.getSpaceElement()
					this.editor.addElementTo(spaceEl, spanEl)
					this.editor.addElementTo(spanEl, newBlock)
					this.editor.range.anchor.moveToEnd(spanEl)
					this.editor.range.focus.moveToEnd(spanEl)
				}
				//新块与旧块进行合并
				this.editor.mergeBlockElement(newBlock)
			}
			//起点和终点不在同一个块内
			else {
				//记录终点的元素和偏移值
				let focusElement = this.editor.range.focus.element
				let focusOffset = this.editor.range.focus.offset
				//记录起点的元素和偏移值
				let anchorElement = this.editor.range.anchor.element
				let anchorOffset = this.editor.range.anchor.offset
				//起点所在块元素
				const focusBlock = this.editor.range.focus.element.getBlock()
				//重新设置虚拟光标
				this.editor.range.anchor.moveToEnd(anchorBlock)
				this.editor.range.focus.moveToStart(focusBlock)
				//清除起点和终点两个所在块的选区元素样式
				this.editor.getElementsByRange(true).forEach(el => {
					if (el.isText() || el.isClosed()) {
						el.styles = null
					}
				})
				//将起点设置为原来的
				this.editor.range.anchor.element = anchorElement
				this.editor.range.anchor.offset = anchorOffset
				//将终点设置到起点所在块的结尾
				this.editor.range.focus.moveToEnd(anchorBlock)
				this.removeAllStyles()
				//更新一下起点的位置记录
				anchorElement = this.editor.range.anchor.element
				anchorOffset = this.editor.range.anchor.offset
				//将终点设置为原来的
				this.editor.range.focus.element = focusElement
				this.editor.range.focus.offset = focusOffset
				//将起点设置到终点所在块的开头
				this.editor.range.anchor.moveToStart(focusBlock)
				this.removeAllStyles()
				//恢复起点位置
				this.editor.range.anchor.element = anchorElement
				this.editor.range.anchor.offset = anchorOffset
			}
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//插入分隔线
		insertDivider() {
			if (this.disabled) {
				return
			}
			const marks = {
				class: 'mvi-editor-divider'
			}
			//创建分隔线
			const divider = this.editor.formatElement(new AlexElement('closed', 'hr', marks, null, null))
			//插入分割符
			this.editor.insertElement(divider)
			//换行
			this.editor.insertParagraph()
			//重新渲染
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//给选区元素设置样式
		setStyle(styles) {
			if (this.disabled) {
				return
			}
			this.editor.applyRange({
				styles
			})
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
		},
		//判断光标所在元素是否在指定样式下，是否能够继承父元素需要自行判断
		queryRangeStyle(styleName, styleValue) {
			//起点和终点在一起
			if (this.editor.range.anchor.isEqual(this.editor.range.focus)) {
				return this._getElementStyle(this.editor.range.anchor.element, styleName) == styleValue
			}
			//起点和终点不在一起
			const elements = this.editor.getElementsByRange(true).filter(item => {
				return !item.isBlock()
			})
			let flag = elements.every(item => {
				return this._getElementStyle(item, styleName) == styleValue
			})
			//queryRangeStyle函数会导致元素变更，此时需要重新格式化一下
			this.editor.formatElementStack()
			return flag
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
	}
}

:deep(hr.mvi-editor-divider) {
	display: block;
	width: 100%;
	margin: @mp-sm 0;
	padding: 0;
	height: 0.02rem;
	background-color: @bg-color-dark;
	border: none;
	font-size: 0;
}
</style>
