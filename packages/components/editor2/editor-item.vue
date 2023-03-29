<template>
	<div class="mvi-eitor-item" :data-id="`mvi-editor-root-${uid}-${value}`">
		<Tooltip :disabled="!editor.useTooltip || !editor.defaultTooltips[value] || editor.disabled || (value != 'codeView' && editor.codeViewShow)" :title="editor.defaultTooltips[value]" trigger="hover" :placement="editor.defaultTooltipProps.placement" :timeout="editor.defaultTooltipProps.timeout" :color="editor.defaultTooltipProps.color" :text-color="editor.defaultTooltipProps.textColor" :border-color="editor.defaultTooltipProps.borderColor" :offset="editor.defaultTooltipProps.offset" :z-index="editor.defaultTooltipProps.zIndex" :fixed="editor.defaultTooltipProps.fixed" :fixed-auto="editor.defaultTooltipProps.fixedAuto" :width="editor.defaultTooltipProps.width" :animation="editor.defaultTooltipProps.animation" :show-triangle="editor.defaultTooltipProps.showTriangle">
			<div class="mvi-editor-target" @click="targetTrigger" :disabled="editor.disabled || (value != 'codeView' && editor.codeViewShow) || null" :data-id="`mvi-editor-target-${uid}-${value}`" :style="editorTargetStyle">
				<i v-if="editor.computedMenuIcons[value].custom" :class="editor.computedMenuIcons[value].value"></i>
				<Icon v-else :type="editor.computedMenuIcons[value].value" />
			</div>
		</Tooltip>
		<Layer v-model="layerShow" ref="layer" :placement="editor.defaultLayerProps.placement" :z-index="editor.defaultLayerProps.zIndex" :fixed="editor.defaultLayerProps.fixed" :fixed-auto="editor.defaultLayerProps.fixedAuto" :offset="editor.defaultLayerProps.offset" :wrapper-class="editor.defaultLayerProps.wrapperClass" :timeout="editor.defaultLayerProps.timeout" :show-triangle="editor.defaultLayerProps.showTriangle" :animation="editor.defaultLayerProps.animation" :shadow="editor.defaultLayerProps.shadow" :border="editor.defaultLayerProps.border" :border-color="editor.defaultLayerProps.borderColor" background="#fff" :closable="editor.trigger == 'click'" :target="`[data-id='mvi-editor-target-${uid}-${value}']`" :root="`[data-id='mvi-editor-root-${uid}-${value}']`">
			<div class="mvi-editor-layer">
				<!-- 插入图片或者视频 -->
				<div class="mvi-editor-medias" v-if="value == 'image' || value == 'video'">
					<Tabs v-model="tabIndex" flex="flex-start" offset="0.4rem" :active-color="editor.activeColor" inactive-color="#808080">
						<Tab v-for="(item, index) in menu" :title="item.label" :key="'mvi-editor-media-tab-' + index">
							<div :ref="el => (uploadElArray[index] = el)" class="mvi-editor-upload" v-if="item.value == 'upload'">
								<Icon type="upload-square" />
							</div>
							<div v-if="item.value == 'remote'" class="mvi-editor-remote">
								<input class="mvi-editor-remote-input" @focus="inputFocus" @blur="inputBlur" v-model.trim="remoteUrl" :placeholder="value == 'image' ? '图片链接' : '视频链接'" type="text" />
								<div class="mvi-editor-remote-insert" :style="activeColorStyle" @click="insertRemote">插入</div>
							</div>
						</Tab>
					</Tabs>
				</div>
				<!-- 插入链接 -->
				<div v-else-if="value == 'link'" class="mvi-editor-links">
					<Tabs flex="flex-start" offset="0.4rem" :active-color="editor.activeColor" inactive-color="#808080">
						<Tab :title="menu[0].label">
							<div v-if="menu[0].value == 'link'" class="mvi-editor-link">
								<input ref="linkText" class="mvi-editor-link-input" @focus="inputFocus" @blur="inputBlur" v-model.trim="linkText" placeholder="链接文字" type="text" />
								<input ref="linkUrl" class="mvi-editor-link-input" @focus="inputFocus" @blur="inputBlur" v-model.trim="linkUrl" placeholder="链接地址" type="text" />
								<div class="mvi-editor-link-footer">
									<Checkbox label="新窗口打开" label-placement="right" icon-size="0.24rem" label-size="0.24rem" label-color="#808080" :fill-color="editor.activeColor" v-model="linkTarget"> </Checkbox>
									<div class="mvi-editor-link-operation">
										<span class="mvi-editor-link-delete" v-if="menuActive" @click="deleteLink">删除链接</span>
										<span class="mvi-editor-link-insert" :style="activeColorStyle" @click="insertLink">插入</span>
									</div>
								</div>
							</div>
						</Tab>
					</Tabs>
				</div>
				<!-- 设置颜色 -->
				<div class="mvi-editor-colors" v-else-if="value == 'foreColor' || value == 'backColor'">
					<Tooltip :disabled="!(item.label && editor.useTooltip)" trigger="hover" :title="item.label" v-for="(item, index) in menu" :key="'mvi-editor-color-' + index" :placement="editor.defaultTooltipProps.placement" :timeout="editor.defaultTooltipProps.timeout" :color="editor.defaultTooltipProps.color" :text-color="editor.defaultTooltipProps.textColor" :border-color="editor.defaultTooltipProps.borderColor" :offset="editor.defaultTooltipProps.offset" :z-index="editor.defaultTooltipProps.zIndex" :fixed="editor.defaultTooltipProps.fixed" :width="editor.defaultTooltipProps.width" :wrapper-class="editor.defaultTooltipProps.wrapperClass" :animation="editor.defaultTooltipProps.animation" class="mvi-editor-color">
						<span @click="doSelect(item)" class="mvi-editor-color-el" :style="{ backgroundColor: item.value }"></span>
					</Tooltip>
				</div>
				<!-- 插入表格 -->
				<div v-else-if="value == 'table'" class="mvi-editor-tables">
					<Tabs flex="flex-start" offset="0.4rem" :active-color="editor.activeColor" inactive-color="#808080">
						<Tab :title="menuActive ? '编辑表格' : menu[0].label">
							<div v-if="menu[0].value == 'table'" class="mvi-editor-table">
								<div class="mvi-editor-table-edit" v-if="menuActive">
									<span @click="addTableRow" class="mvi-editor-table-add" :style="activeColorStyle">增加行</span>
									<span @click="removeTableRow" class="mvi-editor-table-delete">删除行</span>
									<span @click="addTableColumn" class="mvi-editor-table-add" :style="activeColorStyle">增加列</span>
									<span @click="removeTableColumn" class="mvi-editor-table-delete">删除列</span>
								</div>
								<div class="mvi-editor-table-create" v-else>创建<input ref="rowsInput" class="mvi-editor-table-input" @focus="inputFocus" @blur="inputBlur" v-model.trim.number="tableRows" /> 行<input ref="columnsInput" class="mvi-editor-table-input" @focus="inputFocus" @blur="inputBlur" v-model.trim.number="tableColumns" />列的表格</div>
								<div class="mvi-editor-table-footer">
									<span class="mvi-editor-table-delete" v-if="menuActive" @click="deleteTable">删除表格</span>
									<span class="mvi-editor-table-insert" :style="activeColorStyle" v-else @click="insertTable">插入</span>
								</div>
							</div>
						</Tab>
					</Tabs>
				</div>
				<!-- 其他 -->
				<div v-else>
					<div class="mvi-editor-el" v-for="(item, index) in menu" @click="doSelect(item, index)" :key="'mvi-editor-el-' + index">
						<template v-if="item.icon">
							<i class="mvi-editor-el-icon" v-if="item.icon.custom" :class="item.icon.value"></i>
							<Icon v-else class="mvi-editor-el-icon" :type="item.icon.value" />
						</template>
						<span v-text="item.label"></span>
					</div>
				</div>
			</div>
		</Layer>
		<!-- table模板 -->
		<table v-if="value == 'table'" style="display: none" ref="table" class="mvi-editor-table-demo" cellpadding="0" cellspacing="0" mvi-editor-insert-table>
			<tbody mvi-editor-insert-table>
				<tr v-for="item in tableRows" mvi-editor-insert-table :key="'tr-' + item">
					<td v-for="el in tableColumns" :key="'td-' + el" mvi-editor-insert-table><br /></td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
import { getCurrentInstance } from 'vue'
import { Dap } from '../dap'
import { Upload } from '../upload'
import { Tooltip } from '../tooltip'
import { Icon } from '../icon'
import { Layer } from '../layer'
import { Tabs } from '../tabs'
import { Tab } from '../tab'
import { Checkbox } from '../checkbox'
import { Msgbox } from '../msgbox'
export default {
	name: 'm-editor-item',
	props: {
		//key值
		value: {
			type: String,
			default: null
		},
		//菜单项值
		menu: {
			type: [Array, Boolean],
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
			//插入的网络图片或者视频地址
			remoteUrl: '',
			//插入的链接
			linkUrl: '',
			//链接内容
			linkText: '',
			//链接是否在新窗口打开
			linkTarget: false,
			//上传元素数组
			uploadElArray: []
		}
	},
	computed: {
		//上传文件配置
		uploadOptions() {
			return {
				allowedFileType: this.value == 'image' ? this.editor.defaultUploadImageProps.allowedFileType : this.editor.defaultUploadVideoProps.allowedFileType,
				multiple: this.value == 'image' ? this.editor.defaultUploadImageProps.multiple : this.editor.defaultUploadVideoProps.multiple,
				accept: this.value == 'image' ? this.editor.defaultUploadImageProps.accept : this.editor.defaultUploadVideoProps.accept,
				minSize: this.value == 'image' ? this.editor.defaultUploadImageProps.minSize : this.editor.defaultUploadVideoProps.minSize,
				maxSize: this.value == 'image' ? this.editor.defaultUploadImageProps.maxSize : this.editor.defaultUploadVideoProps.maxSize,
				minLength: this.value == 'image' ? this.editor.defaultUploadImageProps.minLength : this.editor.defaultUploadVideoProps.minLength,
				maxLength: this.value == 'image' ? this.editor.defaultUploadImageProps.maxLength : this.editor.defaultUploadVideoProps.maxLength,
				select: files => {
					this.editor.restoreRange()
					//使用base64
					if (this.editor.useBase64) {
						files.forEach(file => {
							Dap.file.dataFileToBase64(file).then(base64 => {
								if (this.value == 'image') {
									this.editor.insertImage(base64)
								} else {
									this.editor.insertVideo(base64)
								}
							})
						})
					} else {
						//自定义一个事件，让开发者自定义上传
						if (this.value == 'image') {
							this.editor.$emit('upload-image', files)
						} else if (this.value == 'video') {
							this.editor.$emit('upload-video', files)
						}
					}
					this.hideLayer()
				},
				error: (state, message, file) => {
					if (this.value == 'image') {
						if (typeof this.editor.uploadImageError == 'function') {
							this.editor.uploadImageError(state, message, file)
						} else {
							Msgbox.msgbox({
								message: message,
								animation: 'scale'
							})
						}
					} else {
						if (typeof this.editor.uploadVideoError == 'function') {
							this.editor.uploadVideoError(state, message, file)
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
	methods: {
		//输入框获取焦点
		inputFocus(event) {
			if (this.editor.activeColor) {
				event.currentTarget.style.borderColor = this.editor.activeColor
			}
		},
		//输入框失去焦点
		inputBlur(event) {
			if (this.editor.activeColor) {
				event.currentTarget.style.borderColor = ''
			}
		},
		//菜单项下拉选择
		doSelect(item, index) {
			if (this.editor.disabled) {
				return
			}
			this.editor.restoreRange()
			switch (this.value) {
				//设置dom标签
				case 'tag':
					document.execCommand('formatBlock', false, item.value)
					break
				//设置字体
				case 'fontFamily':
					document.execCommand('fontName', false, item.value)
					break
				//对齐方式
				case 'justify':
					if (item.value == 'left') {
						document.execCommand('justifyLeft')
					} else if (item.value == 'center') {
						document.execCommand('justifyCenter')
					} else if (item.value == 'right') {
						document.execCommand('justifyRight')
					} else if (item.value == 'justify') {
						document.execCommand('justifyFull')
					}
					break
				//字体颜色
				case 'foreColor':
					document.execCommand('foreColor', false, item.value)
					break
				//背景色
				case 'backColor':
					document.execCommand('hiliteColor', false, item.value)
					break
				//设置字体大小
				case 'fontSize':
					document.execCommand('fontSize', false, index + 1)
					break
				//自定义操作
				default:
					this.editor.$emit('custom', {
						key: this.value,
						itemKey: item.value
					})
			}
			this.hideLayer()
		},
		//插入远程图片或者视频
		insertRemote() {
			if (this.editor.disabled) {
				return
			}
			if (!this.remoteUrl) {
				this.hideLayer()
				return
			}
			this.editor.restoreRange()
			if (this.value == 'image') {
				this.editor.insertImage(this.remoteUrl)
			} else {
				this.editor.insertVideo(this.remoteUrl)
			}
			this.remoteUrl = ''
			this.tabIndex = 0
			this.hideLayer()
		},
		//上传设置
		uploadSet() {
			if (this.uploadElArray.length > 0) {
				for (let i = 0; i < this.uploadElArray.length; i++) {
					let upload = new Upload(this.uploadElArray[i], this.uploadOptions)
					upload.init()
				}
			}
		},
		//插入链接
		insertLink() {
			if (this.editor.disabled) {
				return
			}
			if (!this.linkUrl) {
				this.hideLayer()
				return
			}
			if (!this.linkText) {
				this.linkText = this.linkUrl
			}
			let link = Dap.element.string2dom(`<a href="${this.linkUrl}">${this.linkText}</a>`)
			if (this.linkTarget) {
				link.setAttribute('target', '_blank')
			}
			this.editor.restoreRange()
			if (this.menuActive) {
				let node = this.editor.getSelectNode()
				if (this.editor.compareTag(node, 'a')) {
					let a = this.editor.getCompareTag(node, 'a')
					a.remove()
				}
			}
			document.execCommand('insertHtml', false, link.outerHTML)
			this.hideLayer()
		},
		//链接插入设置
		linkInsertSet() {
			//激活状态
			if (this.menuActive) {
				let node = this.editor.getSelectNode()
				let a = this.editor.getCompareTag(node, 'a')
				//初始化赋值
				this.linkUrl = a.getAttribute('href')
				//初始化赋值
				this.linkText = a.innerText
				//初始化赋值
				this.linkTarget = a.hasAttribute('target')
				this.$nextTick(() => {
					this.$refs.linkText.focus()
				})
			} else {
				this.linkUrl = ''
				this.linkTarget = false
				let text = this.editor.range.toString()
				if (text) {
					this.linkText = text
					this.$refs.linkUrl.focus()
				} else {
					this.linkText = ''
					this.$refs.linkText.focus()
				}
			}
		},
		//删除链接
		deleteLink() {
			if (this.editor.disabled) {
				return
			}
			this.editor.restoreRange()
			let node = this.editor.getSelectNode()
			if (this.editor.compareTag(node, 'a')) {
				let a = this.editor.getCompareTag(node, 'a')
				if (a) {
					a.remove()
					this.menuActive = false
				}
			}
			this.editor.updateHtmlText()
			this.editor.updateValue()
			this.hideLayer()
		},
		//表格插入设置
		tableInsertSet() {
			if (this.$refs.rowsInput) {
				this.$refs.rowsInput.focus()
			}
		},
		//插入表格
		insertTable() {
			if (!this.tableRows || !this.tableColumns) {
				this.hideLayer()
				return
			}
			if (!Dap.common.matchingText(this.tableRows.toString(), 'number') || !Dap.common.matchingText(this.tableColumns.toString(), 'number')) {
				this.hideLayer()
				return
			}
			let table = this.$refs.table.cloneNode(true)
			table.style.display = ''
			this.editor.restoreRange()
			document.execCommand('insertHtml', false, table.outerHTML)
			this.hideLayer()
		},
		//增加行
		addTableRow() {
			let node = this.editor.getSelectNode()
			//tr
			if (this.editor.compareTag(node, 'tr')) {
				let tr = this.editor.getCompareTag(node, 'tr')
				this.copyRowAppend(tr)
				//光标设置到增加的那一行上
				this.editor.collapseToEnd(Dap.element.children(tr.nextSibling, 'td')[0])
			}
			//tbody
			else if (this.editor.compareTag(node, 'tbody')) {
				let tbody = this.editor.getCompareTag(node, 'tbody')
				let children = Dap.element.children(tbody, 'tr')
				let tr = children[children.length - 1]
				this.copyRowAppend(tr)
				//光标设置到增加的那一行上
				this.editor.collapseToEnd(Dap.element.children(tr.nextSibling, 'td')[0])
			}
			//table
			else if (this.editor.compareTag(node, 'table')) {
				let table = this.editor.getCompareTag(node, 'table')
				let tbody = Dap.element.children(table, 'tbody')[0]
				let children = Dap.element.children(tbody, 'tr')
				let tr = children[children.length - 1]
				this.copyRowAppend(tr)
				//光标设置到增加的那一行上
				this.editor.collapseToEnd(Dap.element.children(tr.nextSibling, 'td')[0])
			}
			this.editor.updateHtmlText()
			this.editor.updateValue()
			this.hideLayer()
		},
		//删除行
		removeTableRow() {
			let node = this.editor.getSelectNode()
			//tr
			if (this.editor.compareTag(node, 'tr')) {
				let tr = this.editor.getCompareTag(node, 'tr')
				//光标设置到删除的那一行之前
				let parentNode = tr.parentNode
				let previousSibling = tr.previousSibling
				tr.remove()
				if (previousSibling) {
					this.editor.collapseToEnd(Dap.element.children(previousSibling, 'td')[0])
				} else {
					let firstTr = Dap.element.children(parentNode, 'tr')[0]
					if (firstTr) {
						this.editor.collapseToEnd(Dap.element.children(firstTr, 'td')[0])
					}
				}
			}
			//tbody
			else if (this.editor.compareTag(node, 'tbody')) {
				let tbody = this.editor.getCompareTag(node, 'tbody')
				let children = Dap.element.children(tbody, 'tr')
				//光标设置到删除的那一行之前
				let parentNode = tr.parentNode
				let previousSibling = tr.previousSibling
				tr.remove()
				if (previousSibling) {
					this.editor.collapseToEnd(Dap.element.children(previousSibling, 'td')[0])
				} else {
					let firstTr = Dap.element.children(parentNode, 'tr')[0]
					if (firstTr) {
						this.editor.collapseToEnd(Dap.element.children(firstTr, 'td')[0])
					}
				}
			}
			//table
			else if (this.editor.compareTag(node, 'table')) {
				let table = this.editor.getCompareTag(node, 'table')
				let tbody = Dap.element.children(table, 'tbody')[0]
				let children = Dap.element.children(tbody, 'tr')
				let tr = children[children.length - 1]
				//光标设置到删除的那一行之前
				let parentNode = tr.parentNode
				let previousSibling = tr.previousSibling
				tr.remove()
				if (previousSibling) {
					this.editor.collapseToEnd(Dap.element.children(previousSibling, 'td')[0])
				} else {
					let firstTr = Dap.element.children(parentNode, 'tr')[0]
					if (firstTr) {
						this.editor.collapseToEnd(Dap.element.children(firstTr, 'td')[0])
					}
				}
			}
			this.editor.updateHtmlText()
			this.editor.updateValue()
			this.hideLayer()
		},
		//增加列
		addTableColumn() {
			let node = this.editor.getSelectNode()
			if (this.editor.compareTag(node, 'td')) {
				let td = this.editor.getCompareTag(node, 'td')
				this.copyColumnAppend(td)
				//光标设置到增加的那一列上
				this.editor.collapseToEnd(td.nextSibling)
			} else if (this.editor.compareTag(node, 'tr')) {
				let tr = this.editor.getCompareTag(node, 'tr')
				let children = Dap.element.children(tr, 'td')
				let td = children[children.length - 1]
				this.copyColumnAppend(td)
				//光标设置到增加的那一列上
				this.editor.collapseToEnd(td.nextSibling)
			} else if (this.editor.compareTag(node, 'tbody')) {
				let tbody = this.editor.getCompareTag(node, 'tbody')
				let tr = Dap.element.children(tbody, 'tr')[0]
				let childrenTd = Dap.element.children(tr, 'td')
				let td = childrenTd[childrenTd.length - 1]
				this.copyColumnAppend(td)
				//光标设置到增加的那一列上
				this.editor.collapseToEnd(td.nextSibling)
			} else if (this.editor.compareTag(node, 'table')) {
				let table = this.editor.getCompareTag(node, 'table')
				let tbody = Dap.element.children(table, 'tbody')[0]
				let tr = Dap.element.children(tbody, 'tr')[0]
				let childrenTd = Dap.element.children(tr, 'td')
				let td = childrenTd[childrenTd.length - 1]
				this.copyColumnAppend(td)
				//光标设置到增加的那一列上
				this.editor.collapseToEnd(td.nextSibling)
			}
			this.editor.updateHtmlText()
			this.editor.updateValue()
			this.hideLayer()
		},
		//删除列
		removeTableColumn() {
			let node = this.editor.getSelectNode()
			if (this.editor.compareTag(node, 'td')) {
				let td = this.editor.getCompareTag(node, 'td')
				//光标设置到删除的那一列之前
				let parentNode = td.parentNode
				let previousSibling = td.previousSibling
				this.removeColumn(td)
				if (previousSibling) {
					this.editor.collapseToEnd(previousSibling)
				} else {
					let firstTd = Dap.element.children(parentNode, 'td')[0]
					if (firstTd) {
						this.editor.collapseToEnd(firstTd)
					}
				}
			} else if (this.editor.compareTag(node, 'tr')) {
				let tr = this.editor.getCompareTag(node, 'tr')
				let children = Dap.element.children(tr, 'td')
				let td = children[children.length - 1]
				//光标设置到删除的那一列之前
				let previousSibling = td.previousSibling
				this.removeColumn(td)
				if (previousSibling) {
					this.editor.collapseToEnd(previousSibling)
				} else {
					let firstTd = Dap.element.children(tr, 'td')[0]
					if (firstTd) {
						this.editor.collapseToEnd(firstTd)
					}
				}
			} else if (this.editor.compareTag(node, 'tbody')) {
				let tbody = this.editor.getCompareTag(node, 'tbody')
				let tr = Dap.element.children(tbody, 'tr')[0]
				let childrenTd = Dap.element.children(tr, 'td')
				let td = childrenTd[childrenTd.length - 1]
				//光标设置到删除的那一列之前
				let previousSibling = td.previousSibling
				this.removeColumn(td)
				if (previousSibling) {
					this.editor.collapseToEnd(previousSibling)
				} else {
					let firstTd = Dap.element.children(tr, 'td')[0]
					if (firstTd) {
						this.editor.collapseToEnd(firstTd)
					}
				}
			} else if (this.editor.compareTag(node, 'table')) {
				let table = this.editor.getCompareTag(node, 'table')
				let tbody = Dap.element.children(table, 'tbody')[0]
				let tr = Dap.element.children(tbody, 'tr')[0]
				let childrenTd = Dap.element.children(tr, 'td')
				let td = childrenTd[childrenTd.length - 1]
				//光标设置到删除的那一列之前
				let previousSibling = td.previousSibling
				this.removeColumn(td)
				if (previousSibling) {
					this.editor.collapseToEnd(previousSibling)
				} else {
					let firstTd = Dap.element.children(tr, 'td')[0]
					if (firstTd) {
						this.editor.collapseToEnd(firstTd)
					}
				}
			}
			this.editor.updateHtmlText()
			this.editor.updateValue()
			this.hideLayer()
		},
		//删除表格
		deleteTable() {
			this.editor.restoreRange()
			let node = this.editor.getSelectNode()
			let table = this.editor.getCompareTag(node, 'table')
			if (table) {
				table.remove()
				this.menuActive = false
			}
			this.editor.updateHtmlText()
			this.editor.updateValue()
			this.hideLayer()
		},
		//在指定节点后插入节点
		insertNodeAfter(newNode, targetNode) {
			let parent = targetNode.parentNode
			let children = Dap.element.children(parent)
			if (children[children.length - 1] == targetNode) {
				parent.appendChild(newNode)
			} else {
				parent.insertBefore(newNode, targetNode.nextSibling)
			}
		},
		//复制表格行进行增加
		copyRowAppend(row) {
			let newRow = row.cloneNode(true)
			newRow.querySelectorAll('td').forEach(td => {
				td.innerHTML = '<br>'
			})
			this.insertNodeAfter(newRow, row)
		},
		//复制表格列进行增加
		copyColumnAppend(column) {
			//该列在父元素中的序列
			let index = [].indexOf.call(Dap.element.children(column.parentNode, column.tagName), column)
			column.parentNode.parentNode.querySelectorAll('tr').forEach(tr => {
				let td = Dap.element.children(tr, 'td')[index]
				let newColumn = td.cloneNode(true)
				newColumn.innerHTML = '<br>'
				this.insertNodeAfter(newColumn, td)
			})
		},
		//根据表格列删除指定的一列
		removeColumn(column) {
			//该列在父元素中的序列
			let index = [].indexOf.call(Dap.element.children(column.parentNode, column.tagName), column)
			column.parentNode.parentNode.querySelectorAll('tr').forEach(tr => {
				let td = Dap.element.children(tr, 'td')[index]
				td.remove()
			})
		},
		//删除代码块
		removeCode() {
			let node = this.editor.getSelectNode()
			let pres = this.editor.$refs.content.querySelectorAll('pre')
			let pre = null
			let innerHTML = ''
			for (let i = 0; i < pres.length; i++) {
				if (Dap.element.isContains(pres[i], node)) {
					pre = pres[i]
					innerHTML = pre.innerHTML
					break
				}
			}
			let pEl = Dap.element.string2dom('<p>' + innerHTML + '</p>')
			if (pEl instanceof HTMLCollection) {
				pEl = Dap.element.string2dom('<div>' + innerHTML + '</div>')
			}
			this.insertNodeAfter(pEl, pre)
			pre.remove()
			if (this.editor.range) {
				this.editor.range.setStartAfter(pEl)
				this.menuActive = false
			}
			this.editor.updateHtmlText()
			this.editor.updateValue()
		},
		//删除引用
		removeBlock() {
			let node = this.editor.getSelectNode()
			let blockquotes = this.editor.$refs.content.querySelectorAll('blockquote')
			let blockquote = null
			let innerHTML = ''
			for (let i = 0; i < blockquotes.length; i++) {
				if (Dap.element.isContains(blockquotes[i], node)) {
					blockquote = blockquotes[i]
					innerHTML = blockquote.innerHTML
					break
				}
			}
			let pEl = Dap.element.string2dom('<p>' + innerHTML + '</p>')
			if (pEl instanceof HTMLCollection) {
				pEl = Dap.element.string2dom('<div>' + innerHTML + '</div>')
			}
			this.insertNodeAfter(pEl, blockquote)
			blockquote.remove()
			if (this.editor.range) {
				this.editor.range.setStartAfter(pEl)
				this.menuActive = false
			}
			this.editor.updateHtmlText()
			this.editor.updateValue()
		}
	}
}
</script>
