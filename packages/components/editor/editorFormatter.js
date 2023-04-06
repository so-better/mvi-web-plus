import { Dap } from '../dap'

//插入表格列宽拖拽器
const insertTableResizeSpan = el => {
	const firstTr = el.querySelector('tr')
	const tdArray = firstTr.querySelectorAll('td')
	tdArray.forEach(td => {
		let btn = td.querySelector('.mvi-editor-colbtn')
		if (!btn) {
			let btn = Dap.element.string2dom('<span class="mvi-editor-colbtn"></span>')
			td.appendChild(btn)
		}
	})
}

//设置表格列宽拖拽
const setTableResize = (el, instance) => {
	const colgroup = el.querySelector('colgroup')
	const cols = colgroup.querySelectorAll('col')
	const firstTr = el.querySelector('tr')
	const tdArray = firstTr.querySelectorAll('td')
	tdArray.forEach((td, index) => {
		const btn = td.querySelector('.mvi-editor-colbtn')
		if (btn) {
			if (instance.disabled) {
				btn.remove()
			} else {
				//鼠标按下
				btn.onmousedown = e => {
					Dap.data.set(btn, 'pageX', e.pageX)
					Dap.data.set(btn, 'resizable', true)
					Dap.data.set(btn, 'colWidth', cols[index].offsetWidth)
				}
			}
		}
	})
	if (!instance.disabled) {
		//鼠标移动
		Dap.event.on(document.documentElement, `mousemove.editor_colbtn_${instance.uid}`, e => {
			tdArray.forEach((td, index) => {
				const btn = td.querySelector('.mvi-editor-colbtn')
				if (btn) {
					const resizable = Dap.data.get(btn, 'resizable')
					let pageX = Dap.data.get(btn, 'pageX')
					if (resizable) {
						let moveX = e.pageX - pageX
						const colWidth = Dap.data.get(btn, 'colWidth')
						cols[index].setAttribute('width', colWidth + moveX)
					}
				}
			})
		})
		//鼠标松开
		Dap.event.on(document.documentElement, `mouseup.editor_colbtn_${instance.uid}`, e => {
			tdArray.forEach(td => {
				const btn = td.querySelector('.mvi-editor-colbtn')
				if (btn) {
					Dap.data.set(btn, 'pageX', 0)
					Dap.data.set(btn, 'resizable', false)
				}
			})
		})
	}
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
		//插入引用
		if (addNode.nodeName.toLocaleLowerCase() == 'blockquote') {
			Dap.element.addClass(addNode, 'mvi-editor-blockquote')
		}
		//插入分隔线
		else if (addNode.nodeName.toLocaleLowerCase() == 'hr') {
			Dap.element.addClass(addNode, 'mvi-editor-hr')
		}
		//插入图片
		else if (addNode.nodeName.toLocaleLowerCase() == 'img') {
			Dap.element.addClass(addNode, 'mvi-editor-image')
			addNode.style.fontSize = ''
		}
		//插入视频
		else if (addNode.nodeName.toLocaleLowerCase() == 'video') {
			Dap.element.addClass(addNode, 'mvi-editor-video')
			addNode.setAttribute('muted', 'muted')
			addNode.setAttribute('autoplay', 'autoplay')
			addNode.style.fontSize = ''
		}
		//插入表格
		else if (addNode.nodeName.toLocaleLowerCase() == 'table') {
			Dap.element.addClass(addNode, 'mvi-editor-table')
			addNode.setAttribute('cellpadding', '0')
			addNode.setAttribute('cellspacing', '0')
			//编辑器插入的表格设置列宽拖拽修改
			if (addNode.hasAttribute('mvi-editor-table-id')) {
				//增加拖拽器
				insertTableResizeSpan(addNode)
				//设置拖拽调节列宽
				setTableResize(addNode, instance)
			}
		}
		//插入表格列
		else if (addNode.nodeName.toLocaleLowerCase() == 'td') {
			//增加拖拽器
			insertTableResizeSpan(addNode.parentNode.parentNode.parentNode)
			//设置拖拽调节列宽
			setTableResize(addNode.parentNode.parentNode.parentNode, instance)
		}
	} else if (removeNode) {
		//删除表格行
		if (removeNode.nodeName.toLocaleLowerCase() == 'tr') {
			let id = removeNode.getAttribute('mvi-editor-table-id')
			if (id) {
				id = Number(id)
				let flag = Dap.element.children(removeNode, 'td').every(td => {
					return !!td.querySelector('.mvi-editor-colbtn')
				})
				//删除的是表头
				if (flag) {
					let table = instance.$el.querySelector(`table[mvi-editor-table-id="${id}"]`)
					//增加拖拽器
					insertTableResizeSpan(table)
					//设置拖拽调节列宽
					setTableResize(table, instance)
				}
			}
		}
	}
}
