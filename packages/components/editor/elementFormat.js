import { Dap } from '../dap'
/**
 * 富文本内容节点格式化处理
 */
export default function (el) {
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
	}
}
