<template>
	<div :data-id="`mvi-editor-${uid}`" class="mvi-editor" @dragstart="preventDefault" @drop="preventDefault" @dragover="preventDefault">
		<div v-if="codeViewShow" ref="codeView" v-text="initalHtml" key="code" :contenteditable="!disabled || null" :style="codeViewStyle" :class="codeViewClass" @blur="codeViewBlur" @focus="codeViewFocus" @input="codeViewInput" @paste="codeViewPaste"></div>
		<div v-else ref="content" v-html="initalHtml" key="content" :contenteditable="!disabled || null" :style="contentStyle" :class="contentClass" :data-placeholder="placeholder" @blur="contentBlur" @focus="contentFocus" @input="contentInput" @paste="contentPaste" @keyup="changeActive" @click="changeActive" @keydown="contentKeydown"></div>
	</div>
</template>
<script>
import { judgeFileSuffix, initOption, getValue, getNodeByElement, insertNodeAfter } from './util'
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import editorFormatter from './editorFormatter'
import defaultUploadImageProps from './defaultUploadImageProps'
import defaultUploadVideoProps from './defaultUploadVideoProps'
import { Msgbox } from '../msgbox'
import { Observe } from '../observe'
export default {
	name: 'm-editor',
	props: {
		//值
		modelValue: {
			type: [String, Number],
			default: ''
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
			default: null
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
		//纯文本粘贴
		pasteText: {
			type: Boolean,
			default: false
		},
		//激活颜色设定
		activeColor: {
			type: String,
			default: '#0b73de',
			validator(value) {
				return Dap.common.matchingText(value, 'hex')
			}
		},
		//本地上传文件是否使用base64
		useBase64: {
			type: Boolean,
			default: true
		},
		//自定义上传图片配置
		uploadImageProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//自定义上传视频配置
		uploadVideoProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//自定义上传图片出错回调
		uploadImageError: {
			type: Function
		},
		//自定义上传视频出错回调
		uploadVideoError: {
			type: Function
		}
	},
	emits: ['update:modelValue', 'blur', 'focus', 'input', 'file-paste', 'upload-image', 'upload-video', 'save'],
	data() {
		return {
			//是否使用菜单栏
			useMenus: false,
			//选区
			range: null,
			//源码是否显示
			codeViewShow: false,
			//初始值
			initalHtml: '',
			//html内容
			html: '',
			//text内容
			text: '',
			//是否双向绑定改变值
			isModelChange: false,
			//激活菜单项的具体判定函数
			changeActiveJudgeFn: null
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	computed: {
		//是否空内容
		isEmpty() {
			return this.modelValue == '<p><br></p>' || this.modelValue == '' || this.modelValue == '<br>' || this.modelValue == '<p></p>'
		},
		//编辑区域样式类
		contentClass() {
			let cls = ['mvi-editor-content']
			if (this.autoHeight) {
				cls.push('mvi-editor-content-auto')
			}
			if (this.isEmpty) {
				cls.push('mvi-editor-content-empty')
			}
			return cls
		},
		//源码视图样式类
		codeViewClass() {
			let cls = ['mvi-editor-codeview']
			if (this.autoHeight) {
				cls.push('mvi-editor-codeview-auto')
			}
			return cls
		},
		//编辑区域样式
		contentStyle() {
			let style = {}
			if (this.autoHeight) {
				if (this.height) {
					style.minHeight = this.height
				}
			} else {
				if (this.height) {
					style.height = this.height
				}
			}
			if (!this.border) {
				style.border = 'none'
			}
			return style
		},
		//源码视图样式
		codeViewStyle() {
			let style = {}
			if (this.autoHeight) {
				if (this.height) {
					style.minHeight = this.height
				}
			} else {
				if (this.height) {
					style.height = this.height
				}
			}
			return style
		},
		//上传图片配置
		combinedUploadImageProps() {
			return initOption(defaultUploadImageProps, this.uploadImageProps)
		},
		//上传视频配置
		combinedUploadVideoProps() {
			return initOption(defaultUploadVideoProps, this.uploadVideoProps)
		}
	},
	watch: {
		//监听modelValue
		modelValue(newVal) {
			//如果是组件外部赋值导致的更新
			if (!this.isModelChange) {
				if (this.$refs.content) {
					this.$refs.content.innerHTML = getValue(newVal)
				} else if (this.$refs.codeView) {
					this.$refs.codeView.innerText = getValue(newVal)
				}
				this.updateHtmlText()
			}
		},
		//监听代码视图切换标识
		codeViewShow(newValue) {
			this.$nextTick(() => {
				if (newValue) {
					this.$refs.codeView.innerText = this.html
					this.collapseToEnd()
				} else {
					this.contentDomMonitor()
					if (this.html) {
						this.$refs.content.innerHTML = this.html
					} else {
						this.$refs.content.innerHTML = getValue('')
						this.updateHtmlText()
						this.updateValue()
					}
					this.collapseToEnd()
					this.changeActive()
				}
			})
		}
	},
	mounted() {
		this.init()
	},
	methods: {
		//初始化
		init() {
			//定义段落分隔符
			document.execCommand('defaultParagraphSeparator', false, 'p')
			//使用css
			document.execCommand('styleWithCSS', false, true)
			//设置dom监听
			this.contentDomMonitor()
			//初始化赋值
			this.initalHtml = getValue(this.modelValue)
			//更新html和text
			this.$nextTick(() => {
				this.updateHtmlText()
				if (this.autofocus) {
					this.collapseToEnd()
				}
			})
		},
		//编辑区域键盘按下
		contentKeydown(e) {
			const { Mac } = Dap.platform.os()
			//代码块内重新定义换行操作
			if (e.keyCode == 13 && this.dialogOptions.type == 'code') {
				e.preventDefault()
				this.insertHtml('\n&nbsp;')
			}
			//tab键按下插入空格
			else if (e.keyCode == 9) {
				e.preventDefault()
				if (this.dialogOptions.type == 'code') {
					this.insertHtml('&nbsp;&nbsp;')
				} else {
					this.insertHtml('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;')
				}
			}
			//按下ctrl+s
			if (e.keyCode == 83 && (Mac ? e.metaKey : e.ctrlKey)) {
				e.preventDefault()
				this.$emit('save', {
					html: this.html,
					text: this.text
				})
			}
		},
		//编辑区域获取焦点
		contentFocus() {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			if (this.border && this.activeColor) {
				this.$refs.content.style.borderColor = this.activeColor
				const rgb = Dap.color.hex2rgb(this.activeColor)
				this.$refs.content.style.boxShadow = `0 0 0.16rem rgba(${rgb[0]},${rgb[1]},${rgb[2]},0.5)`
			}
			setTimeout(() => {
				this.changeActive()
				this.$nextTick(() => {
					this.$emit('focus', {
						html: this.html,
						text: this.text
					})
				})
			}, 0)
		},
		//编辑区域失去焦点
		contentBlur() {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			if (this.border && this.activeColor) {
				this.$refs.content.style.borderColor = ''
				this.$refs.content.style.boxShadow = ''
			}
			this.changeActive()
			this.$nextTick(() => {
				this.$emit('blur', {
					html: this.html,
					text: this.text
				})
			})
		},
		//编辑区域输入
		contentInput() {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			this.changeActive()
			this.updateHtmlText()
			this.updateValue()
			this.$nextTick(() => {
				this.$emit('input', {
					html: this.html,
					text: this.text
				})
			})
		},
		//编辑器粘贴事件
		contentPaste(event) {
			let clip = (event.originalEvent || event).clipboardData
			let text = clip.getData('text/plain') || ''
			if (this.pasteText) {
				event.preventDefault()
				if (text !== '') {
					document.execCommand('insertText', false, text)
				}
			} else {
				if (clip.files.length > 0) {
					event.preventDefault()
					for (let file of clip.files) {
						const isImage = judgeFileSuffix(file.name, this.combinedUploadImageProps.allowedFileType)
						const isVideo = judgeFileSuffix(file.name, this.combinedUploadVideoProps.allowedFileType)
						//是图片或者视频
						if (isImage || isVideo) {
							const minSize = isImage ? this.combinedUploadImageProps.minSize : this.combinedUploadVideoProps.minSize
							const maxSize = isImage ? this.combinedUploadImageProps.maxSize : this.combinedUploadVideoProps.maxSize
							//判断文件大小
							if (file.size / 1024 > maxSize && maxSize > 0) {
								if (typeof this.uploadImageError == 'function') {
									this.uploadImageError(102, '文件' + file.name + '超出文件最大值限定', file)
								} else {
									Msgbox.msgbox({
										message: '文件' + file.name + '超出文件最大值限定',
										animation: 'scale'
									})
								}
								return
							}
							if (file.size / 1024 < minSize && minSize > 0) {
								if (typeof this.uploadImageError == 'function') {
									this.uploadImageError(103, '文件' + file.name + '没有达到文件最小值限定', file)
								} else {
									Msgbox.msgbox({
										message: '文件' + file.name + '没有达到文件最小值限定',
										animation: 'scale'
									})
								}
								return
							}
							//使用base64
							if (this.useBase64) {
								Dap.file.dataFileToBase64(file).then(url => {
									if (isImage) {
										this.insertImage(url)
									} else if (isVideo) {
										this.insertVideo(url)
									}
								})
							}
							//自定义上传
							else {
								if (isImage) {
									this.$emit('upload-image', [file])
								} else if (isVideo) {
									this.$emit('upload-video', [file])
								}
							}
						}
						//其他文件
						else {
							this.$emit('file-paste', file)
						}
					}
				}
			}
		},
		//源码视图获取焦点
		codeViewFocus() {
			if (this.disabled) {
				return
			}
			if (!this.$refs.codeView) {
				return
			}
			this.$emit('focus', {
				html: this.html,
				text: this.text
			})
		},
		//源码视图失去焦点
		codeViewBlur() {
			if (this.disabled) {
				return
			}
			if (!this.$refs.codeView) {
				return
			}
			this.$emit('blur', {
				html: this.html,
				text: this.text
			})
		},
		//源码视图输入
		codeViewInput() {
			if (this.disabled) {
				return
			}
			if (!this.$refs.codeView) {
				return
			}
			this.updateHtmlText()
			this.updateValue()
			this.$emit('input', {
				html: this.html,
				text: this.text
			})
		},
		//源码视图粘贴
		codeViewPaste(event) {
			event.preventDefault()
			let clip = (event.originalEvent || event).clipboardData
			let text = clip.getData('text/plain') || ''
			if (text !== '') {
				document.execCommand('insertText', false, text)
			}
		},
		//监听富文本编辑器中的dom
		contentDomMonitor() {
			if (!this.$refs.content) {
				return
			}
			const observe = new Observe(this.$refs.content, {
				attributes: false,
				childList: true,
				subtree: true,
				childNodesChange: (addNode, removeNode) => {
					editorFormatter(addNode, removeNode, this)
				}
			})
			observe.init()
		},
		//禁用默认事件
		preventDefault(e) {
			e.preventDefault()
			return false
		},

		//api：改变菜单项激活状态
		changeActive() {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			this.saveRange()
			if (typeof this.changeActiveJudgeFn == 'function') {
				this.changeActiveJudgeFn()
			}
		},
		//api：清除内容
		empty() {
			if (this.disabled) {
				return
			}
			if (this.$refs.content) {
				this.$refs.content.innerHTML = getValue('')
			} else if (this.$refs.codeView) {
				this.$refs.codeView.innerText = getValue('')
			}
			this.updateHtmlText()
			this.updateValue()
			this.collapseToEnd()
		},
		//api：保存选区
		saveRange() {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			let selection = window.getSelection()
			if (selection.getRangeAt && selection.rangeCount) {
				this.range = selection.getRangeAt(0)
			}
		},
		//api：恢复选区
		restoreRange() {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			let selection = window.getSelection()
			selection.removeAllRanges()
			if (this.range) {
				selection.addRange(this.range)
			}
		},
		//api：将编辑区域光标移至指定节点最后
		collapseToEnd(node) {
			if (this.disabled) {
				return
			}
			let el = null
			if (node) {
				el = node
			} else {
				if (this.$refs.content) {
					el = this.$refs.content
				} else if (this.$refs.codeView) {
					el = this.$refs.codeView
				}
			}
			let selection = window.getSelection()
			selection.selectAllChildren(el)
			selection.collapseToEnd()
		},
		//api：将编辑区域光标移至指定节点最前
		collapseToStart(node) {
			if (this.disabled) {
				return
			}
			let el = null
			if (node) {
				el = node
			} else {
				if (this.$refs.content) {
					el = this.$refs.content
				} else if (this.$refs.codeView) {
					el = this.$refs.codeView
				}
			}
			let selection = window.getSelection()
			selection.selectAllChildren(el)
			selection.collapseToStart()
		},
		//api：根据选区获取节点
		getSelectNode() {
			if (this.disabled) {
				return null
			}
			if (!this.range) {
				return null
			}
			if (!this.$refs.content) {
				return null
			}
			return getNodeByElement(this.range.commonAncestorContainer)
		},
		//api：判断某个节点是否在指定标签下
		compareTag(el, tagName) {
			if (!Dap.element.isElement(el)) {
				return false
			}
			if (!this.$refs.content) {
				return false
			}
			if (Dap.element.isContains(this.$refs.content, el)) {
				if (el.tagName.toLocaleUpperCase() == tagName.toLocaleUpperCase()) {
					return true
				}
				return this.compareTag(el.parentNode, tagName)
			}
			return false
		},
		//api：判断某个节点是否在指定样式下
		compareCss(el, cssName, cssValue, thinkParent = true) {
			if (!Dap.element.isElement(el)) {
				return false
			}
			if (!this.$refs.content) {
				return false
			}
			if (Dap.element.isContains(this.$refs.content, el)) {
				if (Dap.element.getCssStyle(el, cssName) == cssValue) {
					return true
				}
				//如果考虑父元素
				if (thinkParent) {
					return this.compareCss(el.parentNode, cssName, cssValue, thinkParent)
				}
			}
			return false
		},
		//api：判断某个节点是否在指定属性下
		compareAttribute(el, attrName, attrVal) {
			if (!Dap.element.isElement(el)) {
				return false
			}
			if (!this.$refs.content) {
				return false
			}
			if (Dap.element.isContains(this.$refs.content, el)) {
				if (el.hasAttribute(attrName)) {
					if (attrVal) {
						if (el.getAttribute(attrName) === attrVal) {
							return true
						}
						return false
					}
					return true
				}
				return this.compareAttribute(el.parentNode, attrName, attrVal)
			}
			return false
		},
		//api：从当前节点起向上查找指定标签的节点
		getCompareTag(el, tagName) {
			if (!Dap.element.isElement(el)) {
				return null
			}
			if (!this.$refs.content) {
				return null
			}
			if (Dap.element.isContains(this.$refs.content, el)) {
				if (el.tagName.toLocaleUpperCase() == tagName.toLocaleUpperCase()) {
					return el
				} else {
					return this.getCompareTag(el.parentNode, tagName)
				}
			} else {
				return null
			}
		},
		//api：从当前节点起向上查找拥有某个css样式的节点
		getCompareTagForCss(el, cssName, cssValue) {
			if (!Dap.element.isElement(el)) {
				return null
			}
			if (!this.$refs.content) {
				return null
			}
			if (Dap.element.isContains(this.$refs.content, el)) {
				if (Dap.element.getCssStyle(el, cssName) == cssValue) {
					return el
				}
				return this.getCompareTagForCss(el.parentNode, cssName, cssValue)
			}
			return null
		},
		//api：从当前节点起向上查找拥有某个属性或者属性值的节点
		getCompareTagForAttribute(el, attrName, attrVal) {
			if (!Dap.element.isElement(el)) {
				return null
			}
			if (!this.$refs.content) {
				return null
			}
			if (Dap.element.isContains(this.$refs.content, el)) {
				if (el.hasAttribute(attrName)) {
					if (attrVal) {
						if (el.getAttribute(attrName) === attrVal) {
							return el
						}
						return null
					}
					return el
				}
				return this.getCompareTagForAttribute(el.parentNode, attrName, attrVal)
			} else {
				return null
			}
		},
		//api：根据html值更新modelValue值
		updateValue() {
			this.isModelChange = true
			this.$emit('update:modelValue', this.html)
			this.$nextTick(() => {
				this.isModelChange = false
			})
		},
		//api：根据编辑器的值更新html和text值
		updateHtmlText() {
			if (this.$refs.content) {
				if (!this.$refs.content.innerHTML) {
					this.$refs.content.innerHTML = getValue('')
				}
				this.html = this.$refs.content.innerHTML
				this.text = this.$refs.content.innerText
			} else if (this.$refs.codeView) {
				this.html = this.$refs.codeView.innerText
				let el = Dap.element.string2dom(`<div>${this.$refs.codeView.innerText}</div>`)
				this.text = el.innerText
			}
		},
		//api：插入HTML片段，会删除选中部分
		insertHtml(html, wrap, focus) {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			if (!html) {
				return
			}
			//将需要插入的html转为DOM，用作后续的判断
			let dom = Dap.element.string2dom(html)
			//如果在插入html后需要换行
			if (wrap) {
				html = `${html}${getValue('')}`
			}
			//插入html
			document.execCommand('insertHtml', false, html)
			//设置光标位置在插入的HTML里
			if (wrap && focus && Dap.element.isElement(dom)) {
				const selectNode = this.getSelectNode()
				if (selectNode) {
					this.collapseToEnd(selectNode.previousElementSibling)
				}
			}
		},
		//api：插入文本，会删除选中部分
		insertText(text) {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			if (!text) {
				return
			}
			document.execCommand('insertText', false, text)
		},
		//api：插入图片，会删除选中部分
		insertImage(url) {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			const imgHtml = `<img src="${url}" />`
			this.insertHtml(imgHtml)
		},
		//api：插入视频，会删除选中部分
		insertVideo(url) {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			const videoHtml = `<video src="${url}"></video>`
			this.insertHtml(videoHtml, true)
		},
		//api：更换当前选择的行的块元素，如果已经存在块元素则会替换
		insertBlock(blockTag, wrap, focus) {
			document.execCommand('formatBlock', false, blockTag)
			//在插入后换行
			if (wrap) {
				//解决插入代码块错乱问题
				setTimeout(() => {
					const selectNode = this.getSelectNode()
					if (selectNode) {
						const blockEl = this.getCompareTag(selectNode, blockTag)
						const pEl = Dap.element.string2dom(getValue(''))
						insertNodeAfter(pEl, blockEl)
						this.updateHtmlText()
						this.updateValue()
						if (focus) {
							this.collapseToEnd(blockEl)
						} else {
							this.collapseToEnd(pEl)
						}
					}
				}, 0)
			}
		},
		//api：注册菜单栏实例
		use(instance) {
			if (this.useMenus) {
				throw new Error('The editor has already used a menu bar and cannot be used repeatedly')
			}
			//把编辑器实例传给菜单栏组件
			instance.editorInstance = this
			//菜单栏启用dom监听
			instance.editorContentDomMonitor()
			//菜单栏设置菜单项的激活状态函数
			this.changeActiveJudgeFn = instance.changeActiveJudgeFn
			//更新useMenus标识
			this.useMenus = true
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
}

.mvi-editor-codeview {
	display: block;
	position: relative;
	width: 100%;
	border: 1px solid #000;
	height: 8rem;
	background-color: #000;
	border-radius: @radius-default;
	margin: 0;
	padding: @mp-sm;
	overflow-x: hidden;
	overflow-y: auto;
	font-size: @font-size-default;
	color: #fff;
	font-family: Consolas;

	&.mvi-editor-codeview-auto {
		height: auto;
		min-height: 8rem;
		overflow: hidden;
	}
}

.mvi-editor-content {
	display: block;
	position: relative;
	width: 100%;
	border: 1px solid @border-color;
	height: 8rem;
	background-color: #fff;
	border-radius: @radius-default;
	margin: 0;
	padding: @mp-sm;
	overflow-x: hidden;
	overflow-y: auto;
	font-size: @font-size-default;
	color: @font-color-default;
	transition: border-color 600ms, box-shadow 600ms;
	-webkit-transition: border-color 600ms, box-shadow 600ms;
	box-shadow: none;

	&.mvi-editor-content-auto {
		height: auto;
		min-height: 8rem;
		overflow: hidden;
	}

	&.mvi-editor-content-empty::before {
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

//图片样式
:deep(img[mvi-editor-element]) {
	display: inline-block;
	width: auto;
	height: auto;
	max-width: 100%;
}

//视频样式
:deep(video[mvi-editor-element]) {
	display: block;
	width: auto;
	height: auto;
	max-width: 100%;
}

//表格demo样式
:deep(table[mvi-editor-element]) {
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

				span.mvi-editor-colbtn {
					position: absolute;
					right: -@mp-xs / 2;
					top: 0;
					width: @mp-xs;
					height: 100%;
					background-color: @border-color;
					border-radius: 0;

					&:hover {
						cursor: col-resize;
					}
				}
			}
		}
	}
}

//引用样式
:deep(blockquote[mvi-editor-element]) {
	display: block;
	border-left: 0.1rem solid @light-default;
	padding: @mp-xs @mp-sm @mp-xs @mp-md;
	margin: 0 0 @mp-sm 0;
	line-height: 1.5;
	font-size: @font-size-default;
	color: @font-color-sub;
	border-radius: 0;
}

//hr样式
:deep(hr[mvi-editor-element]) {
	display: block;
	width: 100%;
	margin: 0;
	padding: 0;
	margin: @mp-sm 0;
	height: 0.02rem;
	background-color: @bg-color-dark;
	border: none;
}

//代码块样式
:deep(pre[mvi-editor-element]) {
	display: block;
	padding: @mp-sm;
	margin: 0 0 @mp-sm;
	font-size: @font-size-default;
	font-family: Consolas !important;
	line-height: 1.5;
	color: @font-color-default;
	background-color: #fafafa;
	border: 1px solid @light-default;
	border-radius: @radius-default;
	overflow: auto;
	position: relative;
}

// 跟随式弹窗显示动画
:deep(.mvi-editor-dialog-enter-from),
:deep(.mvi-editor-dialog-leave-to) {
	opacity: 0;
}
</style>
