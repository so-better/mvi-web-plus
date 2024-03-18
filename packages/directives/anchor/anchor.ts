import Dap from 'dap-util'

type AnchorOptionsType = {
	target?: HTMLElement | string
	root?: HTMLElement | string
	time?: number
	distance?: number
	callback?: (top: number) => void
}

/**
 * 锚点定位
 */
class Anchor {
	//点击的元素
	private $el: HTMLElement
	//锚点到的元素
	private $target?: HTMLElement | string
	//相对的父祖元素
	private $root?: HTMLElement | string
	//回调函数
	private callback?: (top: number) => void
	//间隔效果
	private time?: number
	//距离
	private distance?: number
	//是否初始化了
	private hasInit: boolean = false

	//install函数
	static install: (...args: any) => void

	constructor(element: HTMLElement, options: AnchorOptionsType) {
		options = Dap.common.isObject(options) ? options : {}
		this.$el = element
		this.$target = options.target
		this.$root = options.root
		this.callback = options.callback
		this.time = options.time
		this.distance = options.distance
	}

	//api：初始化
	init() {
		if (this.hasInit) {
			return
		}
		this.hasInit = true
		//根据root的值查找元素
		if (typeof this.$root == 'string' && this.$root) {
			this.$root = <HTMLElement>document.documentElement.querySelector(this.$root)
		}
		//根据target的值查找元素
		if (typeof this.$target == 'string' && this.$target) {
			this.$target = <HTMLElement>document.documentElement.querySelector(this.$target)
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
			Dap.event.on(this.$el, 'click.anchor', () => {
				let scrollTop = Dap.element.getElementPoint(<HTMLElement>this.$target, <HTMLElement>this.$root).top
				Dap.element
					.setScrollTop({
						el: this.$root,
						number: scrollTop - Dap.element.rem2px(this.distance!),
						time: this.time
					})
					.then(() => {
						let top = scrollTop - Dap.element.rem2px(this.distance!) <= 0 ? 0 : scrollTop - Dap.element.rem2px(this.distance!)
						this.callback!(top)
					})
			})
		} else {
			Dap.event.on(this.$el, 'click.anchor', () => {
				//获取目标元素到浏览器顶部的距离
				let scrollTop = Dap.element.getElementPoint(<HTMLElement>this.$target).top
				Dap.element
					.setScrollTop({
						number: scrollTop - Dap.element.rem2px(this.distance!),
						time: this.time
					})
					.then(() => {
						let top = scrollTop - Dap.element.rem2px(this.distance!) <= 0 ? 0 : scrollTop - Dap.element.rem2px(this.distance!)
						this.callback!(top)
					})
			})
		}
	}
}

export default Anchor
