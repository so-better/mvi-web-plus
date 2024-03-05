import Dap from 'dap-util'
/**
 * 实现监听元素的属性变更
 */

interface Opts {
	attributes?: boolean
	childList?: boolean
	subtree?: boolean
	attributeNames?: Array<string>
	attributesChange?: (...args: any) => void
	childNodesChange?: (...args: any) => void
}

class Observe {
	//监听的元素
	private $el: HTMLElement
	//是否监听元素属性变更
	private attributes?: boolean
	//是否监听子节点变更
	private childList?: boolean
	//监听子节点变动时是否监听其子孙后代节点变更
	private subtree?: boolean
	//监听元素属性变更时定义监听的属性名称数组
	private attributeNames?: Array<string>
	//属性变化触发的方法
	private attributesChange?: (...args: any) => void
	//子孙节点变化触发的方法
	private childNodesChange?: (...args: any) => void
	//是否已经初始化
	private hasInit: boolean = false

	//install函数
	static install: (...args: any) => void

	constructor(el: HTMLElement, options: Opts) {
		this.$el = el
		options = Dap.common.isObject(options) ? options : {}
		this.attributes = options.attributes
		this.childList = options.childList
		this.subtree = options.subtree
		this.attributeNames = options.attributeNames
		this.attributesChange = options.attributesChange
		this.childNodesChange = options.childNodesChange
	}

	//api：初始化方法
	init() {
		if (this.hasInit) {
			return
		}
		this.hasInit = true

		if (!Dap.element.isElement(this.$el)) {
			throw new TypeError('The element that needs to be observed is not a node element')
		}

		try {
			if (typeof this.attributes != 'boolean') {
				this.attributes = false
			}
			if (typeof this.childList != 'boolean') {
				this.childList = false
			}
			if (typeof this.subtree != 'boolean') {
				this.subtree = false
			}
			if (!(this.attributeNames instanceof Array)) {
				this.attributeNames = []
			}
			if (typeof this.attributesChange != 'function') {
				this.attributesChange = function () {}
			}
			if (typeof this.childNodesChange != 'function') {
				this.childNodesChange = function () {}
			}

			let MutationObserver = window.MutationObserver
			let observer = new MutationObserver(mutationList => {
				let length = mutationList.length
				for (let i = 0; i < length; i++) {
					//监听属性
					if (mutationList[i].type == 'attributes' && this.attributes) {
						this.attributesChange!.apply(this, [mutationList[i].attributeName, this.$el.getAttribute(mutationList[i].attributeName!), mutationList[i].oldValue])
					}
					//监听子节点变动
					else if (mutationList[i].type == 'childList' && this.childList) {
						for (let node of mutationList[i].addedNodes) {
							if (Dap.element.isElement(node)) {
								this.childNodesChange!.apply(this, [node, null])
							}
						}
						for (let node of mutationList[i].removedNodes) {
							if (Dap.element.isElement(node)) {
								this.childNodesChange!.apply(this, [null, node])
							}
						}
					}
				}
			})
			if (this.attributes) {
				if (this.attributeNames.length > 0) {
					observer.observe(this.$el, {
						attributes: this.attributes,
						attributeFilter: this.attributeNames,
						attributeOldValue: true,
						childList: this.childList,
						subtree: this.subtree
					})
				} else {
					observer.observe(this.$el, {
						attributes: this.attributes,
						attributeOldValue: true,
						childList: this.childList,
						subtree: this.subtree
					})
				}
			} else {
				observer.observe(this.$el, {
					attributes: this.attributes,
					childList: this.childList,
					subtree: this.subtree
				})
			}
		} catch (e) {
			throw new Error('Listening failed. Your browser may not support it, or childList and attributes are false, meaning there are no objects to listen on')
		}
	}
}

export default Observe
