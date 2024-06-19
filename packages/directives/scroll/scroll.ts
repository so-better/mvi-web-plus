import Dap from 'dap-util'
/**
 * 监听元素滚动条到达顶部或者底部
 */

export type ScrollOptionsType = {
	top?: (...args: any) => void
	bottom?: (...args: any) => void
}

class Scroll {
	//滚动元素
	private $el: HTMLElement | Window
	//到达顶部触发函数
	private top?: (...args: any) => void
	//到达底部触发函数
	private bottom?: (...args: any) => void
	//是否已经初始化
	private hasInit: boolean = false

	constructor(element: HTMLElement, options: ScrollOptionsType) {
		options = Dap.common.isObject(options) ? options : {}
		this.$el = element
		this.top = options.top
		this.bottom = options.bottom
	}

	//api：初始化
	init() {
		if (this.hasInit) {
			return
		}
		this.hasInit = true
		if (!Dap.element.isElement(this.$el)) {
			this.$el = window
		}
		if (typeof this.top != 'function') {
			this.top = function () {}
		}
		if (typeof this.bottom != 'function') {
			this.bottom = function () {}
		}
		Dap.element.scrollTopBottomTrigger(this.$el, (res: any) => {
			if (res.state == 'top') {
				this.top!.apply(this, [res.target])
			} else {
				this.bottom!.apply(this, [res.target])
			}
		})
	}
}

export default Scroll
