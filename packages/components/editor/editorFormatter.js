import { Dap } from '../dap'

//设置表格列宽拖拽
const setTableResize = (el, instance) => {
	const id = el.getAttribute('mvi-editor-table-id')
	const cols = Array.from(el.querySelectorAll('col'))
	const firstRow = el.querySelector('tr')
	const btns = Array.from(firstRow.querySelectorAll('span.mvi-editor-colbtn'))
	btns.forEach(btn => {
		//鼠标按下
		btn.onmousedown = e => {
			if (instance.disabled) {
				return
			}
			Dap.data.set(btn, 'pageX', e.pageX)
			Dap.data.set(btn, 'resizable', true)
		}
	})
	//鼠标移动
	Dap.event.on(document.documentElement, `mousemove.editor_table_${id}`, e => {
		if (instance.disabled) {
			return
		}
		const index = btns.findIndex(el => {
			return Dap.data.get(el, 'resizable')
		})
		if (index < 0) {
			return
		}
		const btn = btns[index]
		let pageX = Dap.data.get(btn, 'pageX')
		let moveX = e.pageX - pageX
		cols[index].setAttribute('width', cols[index].offsetWidth + moveX)
		Dap.data.set(btn, 'pageX', e.pageX)
	})
	//鼠标松开
	Dap.event.on(document.documentElement, `mouseup.editor_table_${id}`, e => {
		if (instance.disabled) {
			return
		}
		const btn = btns.find(el => {
			return Dap.data.get(el, 'resizable')
		})
		if (!btn) {
			return
		}
		Dap.data.set(btn, 'pageX', 0)
		Dap.data.set(btn, 'resizable', false)
	})
}

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
			Dap.element.addClass(addNode, 'mvi-editor-blockquote')
		}
		//统一分隔线样式
		else if (addNode.nodeName.toLocaleLowerCase() == 'hr') {
			Dap.element.addClass(addNode, 'mvi-editor-hr')
		}
		//统一图片样式
		else if (addNode.nodeName.toLocaleLowerCase() == 'img') {
			Dap.element.addClass(addNode, 'mvi-editor-image')
			addNode.style.fontSize = ''
		}
		//统一所有视频样式
		else if (addNode.nodeName.toLocaleLowerCase() == 'video') {
			Dap.element.addClass(addNode, 'mvi-editor-video')
			addNode.setAttribute('muted', 'muted')
			addNode.setAttribute('autoplay', 'autoplay')
			addNode.style.fontSize = ''
		}
		//编辑器插入表格操作
		else if (addNode.nodeName.toLocaleLowerCase() == 'table' && addNode.hasAttribute('mvi-editor-table-id')) {
			setTableResize(addNode, instance)
		}
		//编辑器新增列操作
		else if (addNode.nodeName.toLocaleLowerCase() == 'td' && addNode.hasAttribute('mvi-editor-table-id')) {
			const id = addNode.getAttribute('mvi-editor-table-id')
			const table = instance.$refs.content.querySelector(`table[mvi-editor-table-id="${id}"]`)
			setTableResize(table, instance)
		}
	} else if (removeNode) {
		//编辑器删除表格行操作
		if (removeNode.nodeName.toLocaleLowerCase() == 'tr' && removeNode.hasAttribute('mvi-editor-table-id')) {
			let id = removeNode.getAttribute('mvi-editor-table-id')
			id = Number(id)
			const flag = Dap.element.children(removeNode, 'td').every(column => {
				return !!column.querySelector('.mvi-editor-colbtn')
			})
			//删除的是表头
			if (flag) {
				const table = instance.$refs.content.querySelector(`table[mvi-editor-table-id="${id}"]`)
				setTableResize(table, instance)
			}
		}
	}
}
