import Dap from 'dap-util'

export type SpyOptionsType = {
	el?: HTMLElement | string
	beforeEnter?: (...args: any) => void
	enter?: (...args: any) => void
	beforeLeave?: (...args: any) => void
	leave?: (...args: any) => void
}

/**
 * 滚动侦听
 */
class Spy {
	//绑定的元素
	private $el: HTMLElement
	//滚动容器
	private $root?: HTMLElement | string
	//元素进入容器视图之前
	private beforeEnter?: (...args: any) => void
	//元素完全进入容器视图时
	private enter?: (...args: any) => void
	//元素离开容器视图之前
	private beforeLeave?: (...args: any) => void
	//元素完全离开容器视图时
	private leave?: (...args: any) => void
	//是否已经初始化
	private hasInit: boolean = false
	//是否触发的标记
	private triggerTag: any = {
		before: false,
		after: false
	}
	//生成唯一标识符
	private guid: number = this.createGuid()

	constructor(element: HTMLElement, options: SpyOptionsType) {
		options = Dap.common.isObject(options) ? options : {}
		this.$el = element
		this.$root = options.el
		this.beforeEnter = options.beforeEnter
		this.enter = options.enter
		this.beforeLeave = options.beforeLeave
		this.leave = options.leave
	}

	//侦听处理
	private scrollHandle() {
		const elRect = this.$el.getBoundingClientRect()
		const rootRect = (<HTMLElement>this.$root).getBoundingClientRect()
		if (elRect.right >= rootRect.left && elRect.left <= rootRect.right && elRect.bottom >= rootRect.top && elRect.top <= rootRect.bottom) {
			//元素开始进入
			if (!this.triggerTag.before) {
				this.beforeEnter!.apply(this, [this.$el])
				this.triggerTag.before = true
			}
		} else {
			//元素完全离开
			if (this.triggerTag.before) {
				this.leave!.apply(this, [this.$el])
				this.triggerTag.before = false
			}
		}
		if (elRect.left >= rootRect.left && elRect.right <= rootRect.right && elRect.top >= rootRect.top && elRect.bottom <= rootRect.bottom) {
			//元素完全进入
			if (!this.triggerTag.after) {
				this.enter!.apply(this, [this.$el])
				this.triggerTag.after = true
			}
		} else {
			//元素开始离开
			if (this.triggerTag.after) {
				this.beforeLeave!.apply(this, [this.$el])
				this.triggerTag.after = false
			}
		}
	}

	//生成唯一值
	private createGuid() {
		//获取当前guid，不存在则从0开始
		let guid = Dap.data.get(document.body, 'mvi-directives-spy-guid') || 0
		guid++
		Dap.data.set(document.body, 'mvi-directives-spy-guid', guid)
		return guid
	}

	//api：初始化
	init() {
		if (this.hasInit) {
			return
		}
		this.hasInit = true

		if (!Dap.element.isElement(this.$el)) {
			throw new TypeError('The bound element is not a node element')
		}
		//初始化参数
		if (typeof this.$root == 'string' && this.$root) {
			this.$root = <HTMLElement>document.documentElement.querySelector(this.$root)
		}
		if (!Dap.element.isElement(this.$root)) {
			this.$root = document.body
		}
		if (typeof this.beforeEnter != 'function') {
			this.beforeEnter = function () {}
		}
		if (typeof this.enter != 'function') {
			this.enter = function () {}
		}
		if (typeof this.beforeLeave != 'function') {
			this.beforeLeave = function () {}
		}
		if (typeof this.leave != 'function') {
			this.leave = function () {}
		}
		//给滚动容器添加监听事件
		this.scrollHandle()
		Dap.event.on(<HTMLElement>this.$root, `scroll.spy_${this.guid}`, () => {
			this.scrollHandle()
		})
	}

	//api：移除滚动容器监听事件
	destroy() {
		Dap.event.off(<HTMLElement>this.$root, `scroll.spy_${this.guid}`)
	}
}

export default Spy
