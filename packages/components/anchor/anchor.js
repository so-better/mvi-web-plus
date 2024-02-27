import Dap from 'dap-util'
/**
 * 锚点定位
 */
class Anchor {
	constructor(element, options) {
		//点击的元素
		this.$el = element
		//参数配置
		options = Dap.common.isObject(options) ? options : {}
		//锚点到的元素
		this.$target = options.target
		//相对的父祖元素
		this.$root = options.root
		//回调函数
		this.callback = options.callback
		//间隔效果
		this.time = options.time
		//距离
		this.distance = options.distance
		//是否初始化了
		this.hasInit = false
	}

	//api：初始化
	init() {
		if (this.hasInit) {
			return
		}
		this.hasInit = true
		//根据root的值查找元素
		if (typeof this.$root == 'string' && this.$root) {
			this.$root = document.documentElement.querySelector(this.$root)
		}
		//根据target的值查找元素
		if (typeof this.$target == 'string' && this.$target) {
			this.$target = document.documentElement.querySelector(this.$target)
		}

		if (!Dap.element.isElement(this.$el)) {
			throw new TypeError('The element you click on is not a node element')
		}
		if (!Dap.element.isElement(this.$target)) {
			throw new TypeError('Anchor element is not a node element')
		}
		if (!Dap.number.isNumber(this.time)) {
			this.time = 0
		}
		if (typeof this.callback != 'function') {
			this.callback = function () {}
		}
		if (!Dap.number.isNumber(this.distance)) {
			this.distance = 0.1
		}

		if (Dap.element.isElement(this.$root)) {
			Dap.event.on(this.$el, 'click.anchor', e => {
				let scrollTop = Dap.element.getElementPoint(this.$target, this.$root).top
				Dap.element
					.setScrollTop({
						el: this.$root,
						number: scrollTop - Dap.element.rem2px(this.distance),
						time: this.time
					})
					.then(() => {
						let top = scrollTop - Dap.element.rem2px(this.distance) <= 0 ? 0 : scrollTop - Dap.element.rem2px(this.distance)
						this.callback(top)
					})
			})
		} else {
			Dap.event.on(this.$el, 'click.anchor', e => {
				//获取目标元素到浏览器顶部的距离
				let scrollTop = Dap.element.getElementPoint(this.$target).top
				Dap.element
					.setScrollTop({
						number: scrollTop - Dap.element.rem2px(this.distance),
						time: this.time
					})
					.then(() => {
						let top = scrollTop - Dap.element.rem2px(this.distance) <= 0 ? 0 : scrollTop - Dap.element.rem2px(this.distance)
						this.callback(top)
					})
			})
		}
	}
}

export default Anchor
