import { Dap } from '../dap'
/**
 * Drag拖拽插件
 */
class Drag {
	constructor(element, options) {
		//被拖拽的元素
		this.$el = element
		options = Dap.common.isObject(options) ? options : {}
		//可拖拽的区域
		this.$container = options.container
		//x轴方向是否可拖动
		this.draggableX = options.draggableX
		//Y轴方向是否可拖动
		this.draggableY = options.draggableY
		//值为on时元素的中心可以在容器边界上，值为in时元素全部只能在容器内，值为out时元素可以在容器外部边缘
		this.mode = options.mode
		//是否改变鼠标形状
		this.cursor = options.cursor
		//元素被拖动时触发
		this.drag = options.drag
		//元素开始拖动时触发
		this.beforeDrag = options.beforeDrag
		//元素拖拽结束触发
		this.dragged = options.dragged
		//初始化完毕的回调
		this.ready = options.ready
		//是否可拖动
		this.draggable = false
		//是否已经初始化
		this.hasInit = false
		//X坐标
		this.pageX = 0
		//Y坐标
		this.pageY = 0
		//生成唯一值
		this.guid = this.createGuid()
	}

	//设置拖拽事件
	setOn() {
		//触摸开始
		Dap.event.on(this.$el, 'touchstart.drag', e => {
			if (!this.draggableX && !this.draggableY) {
				return
			}
			this.pageX = e.targetTouches[0].pageX - Dap.element.getElementPoint(this.$el, this.$container).left
			this.pageY = e.targetTouches[0].pageY - Dap.element.getElementPoint(this.$el, this.$container).top
			this.draggable = true
			if (this.cursor) {
				this.$el.style.cursor = 'move'
			}
			//监听事件，监听刚开始拖动触发
			this.beforeDrag.apply(this, [this.$el, this.$container, Dap.element.getElementPoint(this.$el, this.$container), e])
		})
		//触摸移动
		Dap.event.on(this.$el, 'touchmove.drag', e => {
			if (this.draggable) {
				if (!this.draggableX && !this.draggableY) {
					return
				}
				if (e.cancelable) {
					e.preventDefault()
				}
				let left = e.targetTouches[0].pageX - this.pageX
				let top = e.targetTouches[0].pageY - this.pageY
				if (this.draggableX) {
					this.$el.style.left = left + 'px'
					this.$el.style.right = 'auto'
				}
				if (this.draggableY) {
					this.$el.style.top = top + 'px'
					this.$el.style.bottom = 'auto'
				}
				this.resize()
				if (this.draggableX || this.draggableY) {
					//监听事件
					this.drag.apply(this, [this.$el, this.$container, Dap.element.getElementPoint(this.$el, this.$container), e])
				}
			}
		})
		//触摸松开后，拖拽状态更改为false，触发监听事件
		Dap.event.on(this.$el, 'touchend.drag', e => {
			if (this.draggable) {
				if (!this.draggableX && !this.draggableY) {
					return
				}
				this.draggable = false
				if (this.cursor) {
					this.$el.style.cursor = ''
				}
				//监听事件
				this.dragged.apply(this, [this.$el, this.$container, Dap.element.getElementPoint(this.$el, this.$container), e])
			}
		})
		//鼠标按下
		Dap.event.on(this.$el, 'mousedown.drag', e => {
			if (!this.draggableX && !this.draggableY) {
				return
			}
			this.pageX = e.pageX - Dap.element.getElementPoint(this.$el, this.$container).left
			this.pageY = e.pageY - Dap.element.getElementPoint(this.$el, this.$container).top
			this.draggable = true
			if (this.cursor) {
				this.$el.style.cursor = 'move'
			}
			//监听事件，监听刚开始拖动触发
			this.beforeDrag.apply(this, [this.$el, this.$container, Dap.element.getElementPoint(this.$el, this.$container), e])
		})
		//鼠标移动
		Dap.event.on(document.documentElement, `mousemove.drag_${this.guid}`, e => {
			if (this.draggable) {
				if (!this.draggableX && !this.draggableY) {
					return
				}
				let left = e.pageX - this.pageX
				let top = e.pageY - this.pageY
				if (this.draggableX) {
					this.$el.style.left = left + 'px'
					this.$el.style.right = 'auto'
				}
				if (this.draggableY) {
					this.$el.style.top = top + 'px'
					this.$el.style.bottom = 'auto'
				}
				this.resize()
				if (this.draggableX || this.draggableY) {
					//监听事件
					this.drag.apply(this, [this.$el, this.$container, Dap.element.getElementPoint(this.$el, this.$container), e])
				}
			}
		})
		//鼠标松开后，拖拽状态更改为false，触发监听事件
		Dap.event.on(document.documentElement, `mouseup.drag_${this.guid}`, e => {
			if (this.draggable) {
				if (!this.draggableX && !this.draggableY) {
					return
				}
				this.draggable = false
				if (this.cursor) {
					this.$el.style.cursor = ''
				}
				//监听事件
				this.dragged.apply(this, [this.$el, this.$container, Dap.element.getElementPoint(this.$el, this.$container), e])
			}
		})
	}

	//元素超出容器范围设置
	resize() {
		if (this.mode == 'in') {
			if (this.draggableX) {
				if (Dap.element.getElementPoint(this.$el, this.$container).left <= 0) {
					this.$el.style.left = 0
				}
				if (Dap.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth - this.$el.offsetWidth) {
					this.$el.style.left = this.$container.offsetWidth - this.$el.offsetWidth + 'px'
				}
			}
			if (this.draggableY) {
				if (Dap.element.getElementPoint(this.$el, this.$container).top <= 0) {
					this.$el.style.top = 0
				}
				if (Dap.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight - this.$el.offsetHeight) {
					this.$el.style.top = this.$container.offsetHeight - this.$el.offsetHeight + 'px'
				}
			}
		} else if (this.mode == 'on') {
			if (this.draggableX) {
				if (Dap.element.getElementPoint(this.$el, this.$container).left <= -this.$el.offsetWidth / 2) {
					this.$el.style.left = -this.$el.offsetWidth / 2 + 'px'
				}
				if (Dap.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth - this.$el.offsetWidth / 2) {
					this.$el.style.left = this.$container.offsetWidth - this.$el.offsetWidth / 2 + 'px'
				}
			}
			if (this.draggableY) {
				if (Dap.element.getElementPoint(this.$el, this.$container).top <= -this.$el.offsetHeight / 2) {
					this.$el.style.top = -this.$el.offsetHeight / 2 + 'px'
				}
				if (Dap.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight - this.$el.offsetHeight / 2) {
					this.$el.style.top = this.$container.offsetHeight - this.$el.offsetHeight / 2 + 'px'
				}
			}
		} else if (this.mode == 'out') {
			if (this.draggableX) {
				if (Dap.element.getElementPoint(this.$el, this.$container).left <= -this.$el.offsetWidth) {
					this.$el.style.left = -this.$el.offsetWidth + 'px'
				}
				if (Dap.element.getElementPoint(this.$el, this.$container).left >= this.$container.offsetWidth) {
					this.$el.style.left = this.$container.offsetWidth + 'px'
				}
			}
			if (this.draggableY) {
				if (Dap.element.getElementPoint(this.$el, this.$container).top <= -this.$el.offsetHeight) {
					this.$el.style.top = -this.$el.offsetHeight + 'px'
				}
				if (Dap.element.getElementPoint(this.$el, this.$container).top >= this.$container.offsetHeight) {
					this.$el.style.top = this.$container.offsetHeight + 'px'
				}
			}
		}
	}

	//生成唯一值
	createGuid() {
		//获取当前guid，不存在则从0开始
		let guid = Dap.data.get(document.body, 'mvi-directives-drag-guid') || 0
		guid++
		Dap.data.set(document.body, 'mvi-directives-drag-guid', guid)
		return guid
	}

	//api：初始化
	init() {
		if (this.hasInit) {
			return
		}
		this.hasInit = true

		if (!Dap.element.isElement(this.$el)) {
			throw new TypeError('The element that needs to be dragged is not a node element')
		}
		if (typeof this.$container == 'string' && this.$container) {
			this.$container = document.body.querySelector(this.$container)
		}
		if (!Dap.element.isElement(this.$container)) {
			this.$container = document.body
		}
		if (!Dap.element.isContains(this.$container, this.$el)) {
			throw new Error('Elements that need to be dragged are not descendants of container elements')
		}
		if (Dap.element.getCssStyle(this.$container, 'position') == 'static' && this.$container != document.body) {
			throw new Error('The container element cannot be static positioning')
		}
		if (Dap.element.getCssStyle(this.$el, 'position') == 'static' || Dap.element.getCssStyle(this.$el, 'position') == 'relative') {
			throw new Error('The element that need to be dragged cannot be static and relative positioning')
		}
		if (typeof this.draggableY != 'boolean') {
			this.draggableY = true
		}
		if (typeof this.draggableX != 'boolean') {
			this.draggableX = true
		}
		if (this.mode != 'on' && this.mode != 'in' && this.mode != 'over' && this.mode != 'out') {
			this.mode = '' //默认对拖拽范围不做限定
		}
		if (typeof this.cursor != 'boolean') {
			this.cursor = true
		}
		if (typeof this.drag != 'function') {
			this.drag = function () {}
		}
		if (typeof this.beforeDrag != 'function') {
			this.beforeDrag = function () {}
		}
		if (typeof this.dragged != 'function') {
			this.dragged = function () {}
		}
		if (typeof this.ready != 'function') {
			this.ready = function () {}
		}
		//设置拖拽事件
		this.setOn()
		//初始化回调
		this.ready.apply(this, [this])
	}

	//api：移除该指令绑定在documentElement上的事件
	destroy() {
		Dap.event.off(document.documentElement, `mousemove.drag_${this.guid} mouseup.drag_${this.guid}`)
	}
}

export default Drag
