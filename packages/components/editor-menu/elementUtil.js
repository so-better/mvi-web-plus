export default {
	//元素是否为列表
	isList(element, ordered = false) {
		return element.type == 'block' && element.parsedom == 'div' && element.hasMarks() && element.marks['data-list'] == (ordered ? 'ol' : 'ul')
	},
	//列表转为其他块元素
	listToBlock(element, parsedom) {
		element.parsedom = parsedom || AlexElement.PARAGRAPH_NODE
		let marks = {}
		for (let key in element.marks) {
			if (key != 'data-list' && key != 'data-value') {
				marks[key] = element.marks[key]
			}
		}
		element.marks = marks
	},
	//块元素转为列表
	blockToList(element, ordered = false) {
		element.parsedom = 'div'
		if (!element.hasMarks()) {
			element.marks = {}
		}
		element.marks['data-list'] = ordered ? 'ol' : 'ul'
	}
}
