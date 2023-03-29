<template>
	<div class="m-editor">
		<div v-if="codeViewShow" ref="codeView" v-text="initalHtml" key="code" :contenteditable="!disabled || null" :style="codeViewStyle" :class="codeViewClass" @blur="codeViewBlur" @focus="codeViewFocus" @input="codeViewInput" @paste="codeViewPaste"></div>
		<div v-else ref="content" v-html="initalHtml" key="content" :contenteditable="!disabled || null" :style="contentStyle" :class="contentClass" :data-placeholder="placeholder" @blur="contentBlur" @focus="contentFocus" @click="changeActive" @input="contentInput" @paste="contentPaste"></div>
	</div>
</template>
<script>
import { Dap } from '../dap'
import Bus from '../../js/Bus'
import defaultVideoShowProps from './defaultVideoShowProps'
import defaultUploadImageProps from './defaultUploadImageProps'
import defaultUploadVideoProps from './defaultUploadVideoProps'
import { Msgbox } from '../msgbox'
import { Observe } from '../observe'
export default {
	name: 'm-editor',
	props: {
		//名字
		name: {
			type: String,
			default: 'editor'
		},
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
		//自定义视频显示设置
		videoShowProps: {
			type: Object,
			default: function () {
				return {}
			}
		},
		//纯文本粘贴
		pasteText: {
			type: Boolean,
			default: false
		},
		//上传图片显示样式
		imageClass: {
			type: String,
			default: null
		},
		//上传视频显示样式
		videoClass: {
			type: String,
			default: null
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
	emits: ['update:modelValue', 'blur', 'focus', 'input', 'file-paste', 'upload-image', 'upload-video'],
	data() {
		return {
			//菜单栏实例
			editorMenusInstance: null,
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
			isModelChange: false
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
		//视频显示设置
		combinedVideoShowProps() {
			return this.initOption(defaultVideoShowProps, this.videoShowProps)
		},
		//上传图片配置
		combinedUploadImageProps() {
			return this.initOption(defaultUploadImageProps, this.uploadImageProps)
		},
		//上传视频配置
		combinedUploadVideoProps() {
			return this.initOption(defaultUploadVideoProps, this.uploadVideoProps)
		}
	},
	watch: {
		//监听modelValue
		modelValue() {
			//如果是外界赋值导致的更新
			if (!this.isModelChange) {
				if (this.$refs.content) {
					this.$refs.content.innerHTML = this.getValue()
				} else if (this.$refs.codeView) {
					this.$refs.codeView.innerText = this.getValue()
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
					this.$refs.content.innerHTML = this.html
					this.collapseToEnd()
					this.changeActive()
				}
			})
		}
	},
	created() {
		Bus.emit(`mvi-editor-${this.name}`, this)
	},
	mounted() {
		this.init()
		this.domListener()
	},
	methods: {
		//初始化
		init() {
			//定义段落分隔符
			document.execCommand('defaultParagraphSeparator', false, 'p')
			//使用css
			document.execCommand('styleWithCSS', false, true)
			//初始化赋值
			this.initalHtml = this.getValue()
			//更新html和text
			this.$nextTick(() => {
				this.updateHtmlText()
			})
			if (this.autofocus) {
				this.collapseToEnd()
			}
		},
		//初始化对象参数方法
		initOption(defaultObj, propObj) {
			let obj = {}
			Object.assign(obj, defaultObj)
			Object.assign(obj, propObj)
			return obj
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
			this.changeActive()
			this.$nextTick(() => {
				this.$emit('focus', {
					html: this.html,
					text: this.text
				})
			})
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
			this.updateHtmlText()
			this.updateValue()
			this.changeActive()
			this.$nextTick(() => {
				this.$emit('input', {
					html: this.html,
					text: this.text
				})
			})
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
		//获取经过处理的modelValue值
		getValue() {
			if (this.modelValue == '' || this.modelValue == '<br>' || this.modelValue == '<p></p>') {
				return '<p><br></p>'
			} else {
				return String(this.modelValue)
			}
		},
		//代码视图粘贴事件
		codeViewPaste(event) {
			event.preventDefault()
			let clip = (event.originalEvent || event).clipboardData
			let text = clip.getData('text/plain') || ''
			if (text !== '') {
				document.execCommand('insertText', false, text)
			}
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
						const isImage = this.judgePasteFileSuffix(file.name, this.combinedUploadImageProps.allowedFileType)
						const isVideo = this.judgePasteFileSuffix(file.name, this.combinedUploadVideoProps.allowedFileType)
						//是图片或者视频
						if (isImage || isVideo) {
							const minSize = isImage ? this.combinedUploadImageProps.minSize : this.combinedUploadVideoProps.minSize
							const maxSize = isImage ? this.combinedUploadVideoProps.maxSize : this.combinedUploadVideoProps.maxSize
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
		//判断粘贴文件后缀是否符合
		judgePasteFileSuffix(fileName, allowedFileType) {
			//获取文件后缀
			let suffix = fileName.substr(fileName.lastIndexOf('.') + 1)
			if (allowedFileType.length == 0) {
				return true
			} else {
				//转为小写
				suffix = suffix.toLocaleLowerCase()
				for (let i = 0; i < allowedFileType.length; i++) {
					allowedFileType[i] = allowedFileType[i].toLocaleLowerCase()
				}
				return allowedFileType.includes(suffix)
			}
		},
		//监听dom设置字体
		domListener() {
			if (!this.$refs.content) {
				return
			}
			if (!this.editorMenusInstance) {
				return
			}
			const observe = new Observe(this.$refs.content, {
				attributes: false,
				childList: true,
				subtree: true,
				childNodesChange: addNode => {
					if (addNode) {
						const fontSizeMenu = this.editorMenusInstance.menus.find(menu => {
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
						}
					}
				}
			})
			observe.init()
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
		},
		//api：清除内容
		empty() {
			if (this.disabled) {
				return
			}
			if (this.$refs.content) {
				this.$refs.content.innerHTML = '<p><br></p>'
			} else if (this.$refs.codeView) {
				this.$refs.codeView.innerText = '<p><br></p>'
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
			let node = this.range.commonAncestorContainer
			if (Dap.element.isElement(node)) {
				return node
			} else {
				return node.parentNode
			}
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
		//api：根据标签名获取某个节点
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
		//api：根据css获取某个节点
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
		//api：根据属性或者属性值获取某个节点
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
				this.html = this.$refs.content.innerHTML
				this.text = this.$refs.content.innerText
			} else if (this.$refs.codeView) {
				this.html = this.$refs.codeView.innerText
				let el = Dap.element.string2dom(`<div>${this.$refs.codeView.innerText}</div>`)
				this.text = el.innerText
			}
		},
		//api：插入HTML片段
		insertHtml(html) {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			if (!html) {
				return
			}
			document.execCommand('insertHtml', false, html)
		},
		//api：插入文本
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
		//api：插入图片
		insertImage(url) {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			const style = ['mvi-editor-image']
			if (this.imageClass) {
				style.push(this.imageClass)
			}
			const imgHtml = `<img src="${url}" class="${style.join(' ')}" />`
			document.execCommand('insertHtml', false, imgHtml)
		},
		//api：插入视频
		insertVideo(url) {
			if (this.disabled) {
				return
			}
			if (!this.$refs.content) {
				return
			}
			const style = ['mvi-editor-video']
			if (this.videoClass) {
				style.push(this.videoClass)
			}
			let video = Dap.element.string2dom(`<video src="${url}" class="${style.join(' ')}"></video>`)
			if (this.combinedVideoProps.muted) {
				video.setAttribute('muted', 'muted')
			}
			if (this.combinedVideoProps.loop) {
				video.setAttribute('loop', 'loop')
			}
			if (this.combinedVideoProps.controls) {
				video.setAttribute('controls', 'controls')
			}
			if (this.combinedVideoProps.autoplay) {
				video.setAttribute('autoplay', 'autoplay')
			}
			document.execCommand('insertHtml', false, video.outerHTML)
		},
		//api：清除内容
		empty() {
			if (this.disabled) {
				return
			}
			if (this.$refs.content) {
				this.$refs.content.innerHTML = '<p><br></p>'
			} else if (this.$refs.codeView) {
				this.$refs.codeView.innerText = '<p><br></p>'
			}
			this.updateHtmlText()
			this.updateValue()
			this.collapseToEnd()
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

:deep(.mvi-editor-image) {
	display: inline-block;
	width: auto;
	height: auto;
	max-width: 100%;
}

:deep(.mvi-editor-video) {
	display: inline-block;
	width: auto;
	height: auto;
	max-width: 100%;
}

/* 表格demo样式 */
:deep(.mvi-editor-table-demo) {
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

				&:last-child {
					border-right: none;
				}
			}
		}
	}
}
</style>
