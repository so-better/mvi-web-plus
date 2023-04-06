import { Dap } from '../dap'
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
 * 复制表格行进行增加
 * @param { Element } row
 */
export const copyTableRowAppend = row => {
	let newRow = row.cloneNode(true)
	newRow.querySelectorAll('td').forEach(td => {
		td.innerHTML = '<br>'
	})
	insertNodeAfter(newRow, row)
}

/**
 * 复制表格列进行增加
 * @param { Element } column
 */
export const copyTableColumnAppend = column => {
	//该列在父元素中的序列
	let index = [].indexOf.call(Dap.element.children(column.parentNode, column.tagName), column)
	column.parentNode.parentNode.querySelectorAll('tr').forEach(tr => {
		let td = Dap.element.children(tr, 'td')[index]
		let newColumn = td.cloneNode(true)
		newColumn.innerHTML = '<br>'
		insertNodeAfter(newColumn, td)
	})
	const colgroup = column.parentNode.parentNode.parentNode.querySelector('colgroup')
	const cols = Dap.element.children(colgroup, 'col')
	const col = document.createElement('col')
	insertNodeAfter(col, cols[index])
}

/**
 * 根据表格列删除指定的一列
 * @param { Element } column
 */
export const removeTableColumn = column => {
	//该列在父元素中的序列
	let index = [].indexOf.call(Dap.element.children(column.parentNode, column.tagName), column)
	const colgroup = column.parentNode.parentNode.parentNode.querySelector('colgroup')
	const cols = Dap.element.children(colgroup, 'col')
	const col = cols[index]
	col.remove()
	column.parentNode.parentNode.querySelectorAll('tr').forEach(tr => {
		let td = Dap.element.children(tr, 'td')[index]
		td.remove()
	})
}
