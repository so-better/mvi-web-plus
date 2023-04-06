import { Dap } from '../dap'
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
	}
}
