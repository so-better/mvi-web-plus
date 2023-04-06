import { Dap } from '../dap'

//设置表格列宽拖拽
const setTableResize = function (el, instance) {
	//不是编辑器自己插入的表格
	if (!el.hasAttribute('mvi-editor-insert')) {
		return
	}
	//colgroup不存在
	const colgroup = el.querySelector('colgroup')
	if (!colgroup) {
		return
	}
	//col不存在
	const cols = colgroup.querySelectorAll('col')
	if (!cols.length) {
		return
	}
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
export default function (el, instance) {
	//移除事件
	for (let attribute of el.attributes) {
		if (attribute.nodeName.startsWith('on')) {
			el.removeAttribute(attribute.nodeName)
		}
	}
	if (el.nodeName.toLocaleLowerCase() == 'blockquote') {
		Dap.element.addClass(el, 'mvi-editor-blockquote')
	} else if (el.nodeName.toLocaleLowerCase() == 'hr') {
		Dap.element.addClass(el, 'mvi-editor-hr')
	} else if (el.nodeName.toLocaleLowerCase() == 'img') {
		Dap.element.addClass(el, 'mvi-editor-image')
		el.style.fontSize = ''
	} else if (el.nodeName.toLocaleLowerCase() == 'video') {
		Dap.element.addClass(el, 'mvi-editor-video')
		el.setAttribute('muted', 'muted')
		el.setAttribute('autoplay', 'autoplay')
		el.style.fontSize = ''
	} else if (el.nodeName.toLocaleLowerCase() == 'table') {
		Dap.element.addClass(el, 'mvi-editor-table')
		el.setAttribute('cellpadding', '0')
		el.setAttribute('cellspacing', '0')
		//设置列宽拖拽
		setTableResize(el, instance)
	}
}
