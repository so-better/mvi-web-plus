import { Dap } from '../../dap'
class JavaScript {
	constructor(el) {
		if (!Dap.element.isElement(el)) {
			throw new TypeError('Constructor parameter is not an element')
		}
		this.$el = el
	}

	static KEYWORDS = {
		color: '#0b73de',
		value: ['const', 'let', 'var', 'export', 'default', 'delete', 'import', 'from', 'if', 'else', 'continue', 'break', 'case', 'catch', 'do', 'finally', 'for', 'function', 'in', 'instanceof', 'new', 'return', 'switch', 'this', 'throw', 'try', 'typeof', 'void', 'while', 'with']
	}

	static PUNCTUATION = {
		color: '#999',
		value: ['(', ')', ';', ',', '=', '==', '!=', '>', '<', '>=', '<=', '!', '!!', '!!!']
	}

	//初始化更改代码风格
	init() {
		this.matchKeyWords()
	}

	//匹配关键字
	matchKeyWords() {
		let html = this.$el.innerHTML
		const match1 = new RegExp(`(\\s+)(${JavaScript.KEYWORDS.value.join('|')})(\\s+)`, 'g')
		const match2 = new RegExp(`^(${JavaScript.KEYWORDS.value.join('|')})(\\s+)`, 'g')
		const match3 = new RegExp(`(\\s+)(${JavaScript.KEYWORDS.value.join('|')})$`, 'g')
		console.log(`"${html}"`, html.match(match1))
		this.$el.innerHTML = html.replace(match1, val => {
			console.log(val)
			return `<span style="color:${JavaScript.KEYWORDS.color}">${val}</span>`
		})
	}
}

export default JavaScript
