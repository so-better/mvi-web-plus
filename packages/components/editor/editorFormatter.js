import { Dap } from '../dap'
import { initSpecsCode, getGuid, setEditorElementId, setTableResize } from './util'

/**
 * 富文本内容节点格式化处理
 */
export default function (addNode, removeNode, instance) {
	if (addNode) {
		//移除事件
		for (let attribute of addNode.attributes) {
			if (attribute.nodeName.startsWith('on')) {
				addNode.removeAttribute(attribute.nodeName)
			}
		}
		//统一引用样式
		if (addNode.nodeName.toLocaleLowerCase() == 'blockquote') {
			const id = getGuid()
			setEditorElementId(addNode, id)
		}
		//统一分隔线样式
		else if (addNode.nodeName.toLocaleLowerCase() == 'hr') {
			const id = getGuid()
			setEditorElementId(addNode, id)
		}
		//统一图片样式
		else if (addNode.nodeName.toLocaleLowerCase() == 'img') {
			const id = getGuid()
			setEditorElementId(addNode, id)
			addNode.style.fontSize = ''
		}
		//统一所有视频样式
		else if (addNode.nodeName.toLocaleLowerCase() == 'video') {
			const id = getGuid()
			setEditorElementId(addNode, id)
			addNode.setAttribute('muted', 'muted')
			addNode.setAttribute('autoplay', 'autoplay')
			addNode.style.fontSize = ''
		}
		//统一代码块样式和格式化
		else if (addNode.nodeName.toLocaleLowerCase() == 'pre') {
			initSpecsCode(addNode)
		}
		//监听编辑器插入表格操作
		else if (addNode.nodeName.toLocaleLowerCase() == 'table' && addNode.hasAttribute('mvi-editor-element')) {
			setTableResize(addNode, instance)
		}
		//监听编辑器新增列操作
		else if (addNode.nodeName.toLocaleLowerCase() == 'td' && addNode.hasAttribute('mvi-editor-element')) {
			const id = addNode.getAttribute('mvi-editor-element')
			const table = instance.$refs.content.querySelector(`table[mvi-editor-element="${id}"]`)
			setTableResize(table, instance)
		}
	} else if (removeNode) {
		//监听编辑器删除表格行操作
		if (removeNode.nodeName.toLocaleLowerCase() == 'tr' && removeNode.hasAttribute('mvi-editor-element')) {
			const columns = Dap.element.children(removeNode, 'td')
			const isHead = columns.every((column, index) => {
				if (index < columns.length - 1) {
					return !!column.querySelector('span.mvi-editor-colbtn')
				}
				return true
			})
			//删除的是表头
			if (isHead) {
				let id = removeNode.getAttribute('mvi-editor-element')
				const table = instance.$refs.content.querySelector(`table[mvi-editor-element="${id}"]`)
				setTableResize(table, instance)
			}
		}
	}

	instance.updateHtmlText()
	instance.updateValue()
}
