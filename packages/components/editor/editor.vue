<template>
	<div class="mvi-editor">
		<!-- 代码视图 -->
		<textarea v-if="codeViewShow" ref="code" readonly class="mvi-editor-code" :value="cmpValue" />
		<!-- 编辑器视图 -->
		<div ref="content" :data-placeholder="placeholder" :class="['mvi-editor-content', border ? 'border' : '', isEmpty ? 'empty' : '']" :style="contentStyle" @compositionstart="compositionFlag = true" @compositionend="compositionFlag = false" @click="clickEditor"></div>
		<!-- 图片调整器 -->
		<m-layer ref="imgLayer" v-model="imgLayerProps.show" fixed :target="imgLayerProps.target" placement="bottom-start" animation="mvi-editor-layer-animation" :timeout="50" closable>
			<div class="mvi-editor-layer">
				<div @click="setImageWidth('20%')" class="mvi-editor-layer-item">20%</div>
				<div @click="setImageWidth('50%')" class="mvi-editor-layer-item">50%</div>
				<div @click="setImageWidth('100%')" class="mvi-editor-layer-item">100%</div>
				<div @click="deleteImage" class="mvi-editor-layer-item"><Icon type="trash-alt"></Icon></div>
			</div>
		</m-layer>
		<m-layer ref="linkLayer" v-model="linkLayerProps.show" fixed :target="linkLayerProps.target" placement="bottom-start" animation="mvi-editor-layer-animation" :timeout="50" closable> 3333 </m-layer>
	</div>
</template>
<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { AlexElement, AlexEditor } from 'alex-editor'
import elementUtil from '../editor-menu/elementUtil'
import { Icon } from '../icon'
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
			//菜单栏是否可以使用
			canUseMenus: false,
			//链接调整器参数
			linkLayerProps: {
				show: false,
				target: ''
			},
			//图片调整器参数
			imgLayerProps: {
				show: false,
				target: ''
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
		Icon
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
			renderRules: [this.orderListHandle, this.mediaHandle],
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
		//监听编辑器range更新
		this.editor.on('rangeUpdate', this.handleRangeUpdate)
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
		//获取光标是否在指定标签元素下，如果是返回元素，否则返回null
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
			if (elements.length == 1 && elements[0].parsedom == parsedom) {
				return elements[0]
			}
			return null
		},
		//监听滚动隐藏编辑器内的浮层
		onScroll() {
			const setScroll = el => {
				Dap.event.on(el, `scroll.mvi-editor-${this.uid}`, e => {
					this.linkLayerProps.show = false
					this.imgLayerProps.show = false
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
				Dap.event.off(el, `scroll.mvi-editor-${this.uid}`)
				if (el.parentNode) {
					removeScroll(el.parentNode)
				}
			}
			removeScroll(this.$refs.content)
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
		},
		//元素格式化时处理媒体元素
		mediaHandle(element) {
			//图片增加marks和styles
			if (element.parsedom == 'img') {
				const marks = {
					'mvi-editor-element-key': element.key
				}
				Object.assign(element.marks, marks)
			}
			//视频增加marks和styles
			if (element.parsedom == 'video') {
				const marks = {
					controls: true,
					autoplay: true,
					muted: true,
					'mvi-editor-element-key': element.key
				}
				Object.assign(element.marks, marks)
			}
			//链接增加marks和styles
			if (element.parsedom == 'a') {
				const marks = {
					'mvi-editor-element-key': element.key
				}
				Object.assign(element.marks, marks)
			}
		},
		//点击编辑器
		clickEditor(e) {
			const node = e.target
			//点击的是图片或者视频
			if (node.nodeName.toLocaleLowerCase() == 'img' || node.nodeName.toLocaleLowerCase() == 'video') {
				const key = node.getAttribute('mvi-editor-element-key')
				const element = this.editor.getElementByKey(key)
				this.editor.range.anchor.moveToStart(element)
				this.editor.range.focus.moveToEnd(element)
				this.editor.rangeRender()
			}
		},
		//编辑器内部修改值的方法
		internalModify(val) {
			this.isModelChange = true
			this.cmpValue = val
			this.$nextTick(() => {
				this.isModelChange = false
			})
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
		//编辑器换行
		handleInsertParagraph(element) {
			if (element.isBlock() || element.isInblock()) {
				//以下根级块元素或者内部块元素在换行时转为段落元素
				if (['blockquote'].includes(element.parsedom)) {
					elementUtil.toParagraph(element)
				}
			}
		},
		//编辑器range更新
		handleRangeUpdate(range) {
			const img = this.getCurrentParsedomElement('img')
			const link = this.getCurrentParsedomElement('a')
			setTimeout(() => {
				if (img) {
					this.imgLayerProps.target = `[mvi-editor-element-key='${img.key}']`
					this.imgLayerProps.show = true
				}
				if (link) {
					this.linkLayerProps.target = `[mvi-editor-element-key='${link.key}']`
					this.linkLayerProps.show = true
				}
			}, 100)
		},
		//设置图片宽度
		setImageWidth(value) {
			const dom = this.$el.querySelector(this.imgLayerProps.target)
			const key = dom.getAttribute('mvi-editor-element-key')
			const element = this.editor.getElementByKey(key)
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
			this.imgLayerProps.show = false
		},
		//删除图片
		deleteImage() {
			const dom = this.$el.querySelector(this.imgLayerProps.target)
			const key = dom.getAttribute('mvi-editor-element-key')
			const element = this.editor.getElementByKey(key)
			this.editor.range.anchor.moveToEnd(element)
			this.editor.range.focus.moveToEnd(element)
			element.toEmpty()
			this.editor.formatElementStack()
			this.editor.domRender()
			this.editor.rangeRender()
			this.imgLayerProps.show = false
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
		//api：光标设置到文档底部
		collapseToEnd() {
			if (this.disabled) {
				return
			}
			this.editor.collapseToEnd()
			this.editor.rangeRender()
		},
		//api：光标设置到文档头部
		collapseToStart() {
			if (this.disabled) {
				return
			}
			this.editor.collapseToStart()
			this.editor.rangeRender()
		}
	},
	beforeUnmount() {
		this.removeScroll()
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
	}
}

.mvi-editor-layer {
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding: @mp-xs @mp-sm;
	background-color: #fff;
	border-radius: inherit;
	border: 1px solid #ddd;

	.mvi-editor-layer-item {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: @font-size-default;
		color: @font-color-default;
		opacity: 0.8;
		height: @mini-height;
		padding: 0 @mp-sm;
		border-radius: @radius-default;
		line-height: 1;

		&:hover {
			cursor: pointer;
			opacity: 1;
			background-color: @bg-color-default;
		}

		&:active {
			background-color: @bg-color-dark;
		}
	}
}

:deep(.mvi-editor-layer-animation-enter-from),
:deep(.mvi-editor-layer-animation-leave-to) {
	opacity: 0;
}
</style>
