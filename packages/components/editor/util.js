import { Dap } from '../dap'

/**
 * 获取唯一id
 * @returns number
 */
export const getGuid = () => {
	//获取唯一id
	let id = Dap.data.get(document.body, 'mvi-editor-element-id') || 0
	id += 1
	Dap.data.set(document.body, 'mvi-editor-element-id', id)
	return id
}

/**
 * 设置元素特殊属性
 * @param { Element } el
 * @param { Number } id
 */
export const setEditorElementId = (el, id) => {
	el.setAttribute('mvi-editor-element', id)
}

/**
 * 判断文件后缀是否符合
 * @param { String } fileName
 * @param { Array } allowedFileType
 * @returns boolean
 */
export const judgeFileSuffix = (fileName, allowedFileType) => {
	//获取文件后缀
	let suffix = fileName.substr(fileName.lastIndexOf('.') + 1)
	if (allowedFileType.length == 0) {
		return true
	}
	//转为小写
	suffix = suffix.toLocaleLowerCase()
	for (let i = 0; i < allowedFileType.length; i++) {
		allowedFileType[i] = allowedFileType[i].toLocaleLowerCase()
	}
	return allowedFileType.includes(suffix)
}

/**
 * 初始化对象参数方法
 * @param { Object } defaultObj
 * @param { Object } propObj
 * @returns object
 */
export const initOption = (defaultObj, propObj) => {
	let obj = {}
	Object.assign(obj, defaultObj)
	Object.assign(obj, propObj)
	return obj
}

/**
 * 获取经过处理的modelValue值
 * @param { * } modelValue
 * @returns string
 */
export const getValue = modelValue => {
	if (modelValue == '' || modelValue == '<br>' || modelValue == '<p></p>') {
		return '<p><br></p>'
	} else {
		return String(modelValue)
	}
}

/**
 * 获取元素节点，如果自身不是则向上访问
 * @param { Element } ele
 * @returns element
 */
export const getNodeByElement = ele => {
	if (Dap.element.isElement(ele)) {
		return ele
	}
	return getNodeByElement(ele.parentElement)
}

/**
 * 在指定节点后插入节点
 * @param { Element } newNode
 * @param { Element } targetNode
 */
export const insertNodeAfter = (newNode, targetNode) => {
	let parent = targetNode.parentNode
	let children = Dap.element.children(parent)
	if (children[children.length - 1] == targetNode) {
		parent.appendChild(newNode)
	} else {
		parent.insertBefore(newNode, targetNode.nextElementSibling)
	}
}

/**
 * 初始化创建表格单元格数组
 * @returns array
 */
export const initTableGroups = () => {
	const arr = new Array()
	for (let i = 0; i < 10; i++) {
		let o = new Array()
		for (let j = 0; j < 10; j++) {
			o.push({
				x: j + 1,
				y: i + 1,
				inside: false //是否被选中
			})
		}
		arr.push(o)
	}
	return arr
}

/**
 * 判断html内容是否元素节点
 * @param { * } dom
 * @returns boolean
 */
export const isNotHtml = dom => {
	if (Dap.element.isElement(dom)) {
		return false
	}
	if (dom instanceof HTMLCollection && dom.length > 0) {
		return false
	}
	return true
}

/**
 * 创建表头拖拽器
 * @returns element
 */
export const createTableColBtn = () => {
	const btn = Dap.element.string2dom('<span contenteditable="false" class="mvi-editor-colbtn"></span>')
	return btn
}

/**
 * 复制表格行进行增加
 * @param { Element } row
 * @returns element
 */
export const copyTableRowAppend = row => {
	let newRow = row.cloneNode(true)
	newRow.querySelectorAll('td').forEach(td => {
		td.innerHTML = '<br>'
	})
	insertNodeAfter(newRow, row)
	return newRow
}

/**
 * 复制表格列进行增加
 * @param { Element } column
 */
export const copyTableColumnAppend = column => {
	//该列所在行的所有列数组
	const columns = Dap.element.children(column.parentNode, column.tagName)
	//该列在父元素中的序列
	const index = [].indexOf.call(columns, column)
	//是否复制的最后一列进行增加
	const isLastColumn = columns.length - 1 == index
	//获取tbody
	const tbody = column.parentNode.parentNode
	//遍历所有的行
	tbody.querySelectorAll('tr').forEach((tr, i) => {
		let td = Dap.element.children(tr, 'td')[index]
		let newColumn = td.cloneNode(true)
		newColumn.innerHTML = '<br>'
		//如果是表头需要创建拖拽器
		if (i == 0) {
			const btn = createTableColBtn()
			//如果是复制最后一列进行增加，则原来的最后一列增加拖拽器
			if (isLastColumn) {
				td.appendChild(btn)
			}
			//否则新加的列增加拖拽器
			else {
				newColumn.appendChild(btn)
			}
		}
		insertNodeAfter(newColumn, td)
	})
	const colgroup = column.parentNode.parentNode.parentNode.querySelector('colgroup')
	const cols = Dap.element.children(colgroup, 'col')
	const col = document.createElement('col')
	col.setAttribute('width', 'auto')
	insertNodeAfter(col, cols[index])
}

/**
 * 根据表格列删除指定的一列
 * @param { Element } column
 */
export const removeTableColumn = column => {
	//该列的父元素的子节点数组
	const columns = Dap.element.children(column.parentNode, column.tagName)
	//该列在父元素中的序列
	const index = [].indexOf.call(columns, column)
	//是否删除最后一列
	const isLastColumn = columns.length - 1 == index
	//删除col
	const colgroup = column.parentNode.parentNode.parentNode.querySelector('colgroup')
	const cols = Dap.element.children(colgroup, 'col')
	//删除的是最后一列的话，前一列的col改为auto
	if (isLastColumn) {
		cols[index - 1].setAttribute('width', 'auto')
	}
	const col = cols[index]
	col.remove()
	column.parentNode.parentNode.querySelectorAll('tr').forEach((tr, i) => {
		let td = Dap.element.children(tr, 'td')[index]
		//如果是表头且删除的是最后一列
		if (i == 0 && isLastColumn) {
			//前一列变成了最后一列此时移除拖拽器
			let previous = td.previousElementSibling
			const btn = previous.querySelector('.mvi-editor-colbtn')
			if (btn) {
				btn.remove()
			}
		}
		td.remove()
	})
}

/**
 * 判断tr是否表头
 * @param { Element } row
 * @returns boolean
 */
export const isTableHeader = row => {
	let index = [].indexOf.call(Dap.element.children(row.parentNode, row.tagName), row)
	return index == 0
}

/**
 * 设置新的表头
 * @param { Element } row
 */
export const setTableNewHeader = row => {
	const columns = Dap.element.children(row, 'td')
	columns.forEach((column, index) => {
		if (index < columns.length - 1) {
			const btn = createTableColBtn()
			column.appendChild(btn)
		}
	})
}

/**
 * 格式化代码块内容
 * @param { Element} el
 */
export const formatCode = el => {
	//清除代码标签的所有属性
	const attributes = Array.from(el.attributes)
	for (let attribute of attributes) {
		el.removeAttribute(attribute.nodeName)
	}
	const id = getGuid()
	setEditorElementId(el, id)
	Dap.element.children(el).forEach(childNode => {
		let text = null
		//更换换行符
		if (childNode.nodeName.toLocaleLowerCase() == 'br') {
			text = document.createTextNode('\n&nbsp;')
		} else {
			text = document.createTextNode(childNode.innerText)
		}
		el.insertBefore(text, childNode)
		childNode.remove()
	})
	if (el.innerHTML) {
		el.innerHTML = el.innerHTML
			.split('\n')
			.map(item => {
				if (!item.startsWith('&nbsp;')) {
					return `&nbsp;${item}`
				}
				return item
			})
			.join('\n')
	} else {
		el.innerHTML = '\n&nbsp;'
	}

	//设置代码块代码样式
}
