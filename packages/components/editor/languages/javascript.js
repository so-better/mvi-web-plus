import { Dap } from '../../dap'
class JavaScript {
	constructor(el) {
		if (!Dap.element.isElement(el)) {
			throw new TypeError('Constructor parameter is not an element')
		}
		this.$el = el
	}

	init() {}
}

export default JavaScript
