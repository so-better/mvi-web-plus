import { AlexElement } from 'alex-editor'
export default {
	//元素是否为列表
	isList(element, ordered = false) {
		return element.type == 'block' && element.parsedom == 'div' && element.hasMarks() && element.marks['data-list'] == (ordered ? 'ol' : 'ul')
	},
	//其他块元素转为段落
	toParagraph(element) {
		//如果是有序列表或者无序列表
		if (this.isList(element, true) || this.isList(element, false)) {
			let marks = {}
			for (let key in element.marks) {
				if (key != 'data-list' && key != 'data-value') {
					marks[key] = element.marks[key]
				}
			}
			element.marks = marks
		}
		element.parsedom = AlexElement.PARAGRAPH_NODE
	},
	//其他元素转为列表
	toList(element, ordered = false) {
		element.parsedom = 'div'
		if (!element.hasMarks()) {
			element.marks = {}
		}
		element.marks['data-list'] = ordered ? 'ol' : 'ul'
	}
}
