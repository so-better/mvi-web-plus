import { Dap } from '../../dap'
class JavaScript {
	constructor(el) {
		if (!Dap.element.isElement(el)) {
			throw new TypeError('Constructor parameter is not an element')
		}
		this.$el = el
		this.init()
	}

	//初始化更改代码风格
	init() {}
}

export default JavaScript
