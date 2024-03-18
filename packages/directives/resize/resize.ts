import Dap from 'dap-util'

type ResizeModeType = {
	left: boolean
	top: boolean
	right: boolean
	bottom: boolean
}

type ResizeOptionsType = {
	draggableX?: boolean
	draggableY?: boolean
	mode?: ResizeModeType
	beforeResize?: (...args: any) => boolean
	resize?: (...args: any) => void
	trigger?: (...args: any) => void
	end?: (...args: any) => void
	ready?: (...args: any) => void
	range?: number
}

type ResizeRangeType = {
	x?: number[]
	y?: number[]
}

//拖动的区域范围
enum ResizeAreaValue {
	LEFT = 'left',
	TOP = 'top',
	RIGHT = 'right',
	BOTTOM = 'bottom',
	LEFTTOP = 'left-top',
	LEFTBOTTOM = 'left-bottom',
	RIGHTTOP = 'right-top',
	RIGHTBOTTOM = 'right-bottom'
}

//模式默认值
const ResizeModeValue = {
	LEFT: true,
	TOP: true,
	BOTTOM: true,
	RIGHT: true
}

/**
 * 拖拽改变元素大小
 */
class Resize {
	//拖拽元素
	private $el: HTMLElement
	//水平方向是否可拖拽
	private draggableX?: boolean
	//垂直方向是否可拖拽
	private draggableY?: boolean
	//拖拽模式
	private mode?: ResizeModeType
	//元素大小改变之前触发
	private beforeResize?: (...args: any) => boolean
	//元素大小改变时触发
	private resize?: (...args: any) => void
	//按下触发时触发
	private trigger?: (...args: any) => void
	//大小改变之后
	private end?: (...args: any) => void
	//初始化完成回调
	private ready?: (...args: any) => void
	//可拖动的范围直径
	private range?: number

	//是否可拖动的标识
	private draggable: boolean = false
	//左侧可拖动范围
	private leftRange: ResizeRangeType = {}
	//右侧可拖动范围
	private rightRange: ResizeRangeType = {}
	//顶部可拖动范围
	private topRange: ResizeRangeType = {}
	//底部可拖动范围
	private bottomRange: ResizeRangeType = {}
	//左上可拖动范围
	private leftTopRange: ResizeRangeType = {}
	//右上可拖动范围
	private rightTopRange: ResizeRangeType = {}
	//左下可拖动范围
	private leftBottomRange: ResizeRangeType = {}
	//右下可拖动范围
	private rightBottomRange: ResizeRangeType = {}
	//水平开始的位置
	private startX: number = 0
	//垂直开始的位置
	private startY: number = 0
	//元素宽度
	private _width: number = 0
	//元素高度
	private _height: number = 0
	//元素left
	private _left: number = 0
	//元素top
	private _top: number = 0
	//是否初始化
	private hasInit: boolean = false
	//记录原先的鼠标样式
	private cursor: string = ''
	//生成唯一标识符
	private guid: number = this.createGuid()

	//install函数
	static install: (...args: any) => void

	constructor(element: HTMLElement, options: ResizeOptionsType) {
		options = Dap.common.isObject(options) ? options : {}
		this.$el = element
		this.draggableX = options.draggableX
		this.draggableY = options.draggableY
		this.mode = options.mode
		this.beforeResize = options.beforeResize
		this.resize = options.resize
		this.trigger = options.trigger
		this.end = options.end
		this.ready = options.ready
		this.range = options.range
	}

	///判断点击的点是否在指定区域范围内
	private getIsInRange(x: number, y: number, range: ResizeRangeType) {
		let conditions1 = x >= range.x![0] && x <= range.x![1]
		let conditions2 = y >= range.y![0] && y <= range.y![1]
		if (conditions1 && conditions2) {
			return true
		}
		return false
	}

	//移动端触摸按下或者PC端鼠标按下
	private down(e: Event) {
		this._width = this.$el.offsetWidth
		this._height = this.$el.offsetHeight
		this._left = this.$el.offsetLeft
		this._top = this.$el.offsetTop
		this.cursor = Dap.element.getCssStyle(this.$el, 'cursor')
		//宽高都可以改
		if (this.draggableX && this.draggableY) {
			//左上区域内
			if (this.getIsInRange(this.startX, this.startY, this.leftTopRange)) {
				if (this.mode!.left || this.mode!.top) {
					this.draggable = true
					this.$el.style.cursor = 'nw-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.LEFTTOP
						}
					])
				}
			}
			//左下区域内
			else if (this.getIsInRange(this.startX, this.startY, this.leftBottomRange)) {
				if (this.mode!.left || this.mode!.bottom) {
					this.draggable = true
					this.$el.style.cursor = 'sw-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.LEFTBOTTOM
						}
					])
				}
			}
			//右上区域内
			else if (this.getIsInRange(this.startX, this.startY, this.rightTopRange)) {
				if (this.mode!.right || this.mode!.top) {
					this.draggable = true
					this.$el.style.cursor = 'ne-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.RIGHTTOP
						}
					])
				}
			}
			//右下区域内
			else if (this.getIsInRange(this.startX, this.startY, this.rightBottomRange)) {
				if (this.mode!.right || this.mode!.bottom) {
					this.draggable = true
					this.$el.style.cursor = 'se-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.RIGHTBOTTOM
						}
					])
				}
			}
			//左侧区域内
			else if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
				if (this.mode!.left) {
					this.draggable = true
					this.$el.style.cursor = 'w-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.LEFT
						}
					])
				}
			}
			//右侧区域内
			else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
				if (this.mode!.right) {
					this.draggable = true
					this.$el.style.cursor = 'e-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.RIGHT
						}
					])
				}
			}
			//顶部区域内
			else if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
				if (this.mode!.top) {
					this.draggable = true
					this.$el.style.cursor = 'n-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.TOP
						}
					])
				}
			}
			//底部区域内
			else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
				if (this.mode!.bottom) {
					this.draggable = true
					this.$el.style.cursor = 's-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.BOTTOM
						}
					])
				}
			}
		}
		//只可以改变元素宽度
		else if (this.draggableX) {
			//左侧区域内
			if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
				if (this.mode!.left) {
					this.draggable = true
					this.$el.style.cursor = 'w-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.LEFT
						}
					])
				}
			}
			//右侧区域内
			else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
				if (this.mode!.right) {
					this.draggable = true
					this.$el.style.cursor = 'e-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.RIGHT
						}
					])
				}
			}
		}
		//只可以改变元素高度
		else if (this.draggableY) {
			//顶部区域内
			if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
				if (this.mode!.top) {
					this.draggable = true
					this.$el.style.cursor = 'n-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.TOP
						}
					])
				}
			}
			//底部区域内
			else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
				if (this.mode!.bottom) {
					this.draggable = true
					this.$el.style.cursor = 's-resize'
					this.trigger!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.BOTTOM
						}
					])
				}
			}
		}
	}

	//移动端触摸滑动或者PC端鼠标拖动
	private move(e: Event, endX: number, endY: number) {
		if (this.draggable) {
			let moveX = endX - this.startX
			let moveY = endY - this.startY
			//宽高都可以改
			if (this.draggableX && this.draggableY) {
				//左上区域内
				if (this.getIsInRange(this.startX, this.startY, this.leftTopRange)) {
					if (this.mode!.left || this.mode!.top) {
						if (
							this.beforeResize!.apply(this, [
								{
									event: e,
									area: ResizeAreaValue.LEFTTOP,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
					}
					if (this.mode!.left) {
						this.$el.style.width = this._width - moveX + 'px'
						this.$el.style.left = this._left + moveX + 'px'
					}
					if (this.mode!.top) {
						this.$el.style.height = this._height - moveY + 'px'
						this.$el.style.top = this._top + moveY + 'px'
					}
					if (this.mode!.left || this.mode!.top) {
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.LEFTTOP,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
				//左下区域内
				else if (this.getIsInRange(this.startX, this.startY, this.leftBottomRange)) {
					if (this.mode!.left || this.mode!.bottom) {
						if (
							this.beforeResize!.apply(this, [
								{
									area: ResizeAreaValue.LEFTBOTTOM,
									event: e,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
					}
					if (this.mode!.left) {
						this.$el.style.width = this._width - moveX + 'px'
						this.$el.style.left = this._left + moveX + 'px'
					}
					if (this.mode!.bottom) {
						this.$el.style.height = this._height + moveY + 'px'
					}
					if (this.mode!.left || this.mode!.bottom) {
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.LEFTBOTTOM,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
				//右上区域内
				else if (this.getIsInRange(this.startX, this.startY, this.rightTopRange)) {
					if (this.mode!.right || this.mode!.top) {
						if (
							this.beforeResize!.apply(this, [
								{
									area: ResizeAreaValue.RIGHTTOP,
									event: e,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
					}
					if (this.mode!.right) {
						this.$el.style.width = this._width + moveX + 'px'
					}
					if (this.mode!.top) {
						this.$el.style.height = this._height - moveY + 'px'
						this.$el.style.top = this._top + moveY + 'px'
					}
					if (this.mode!.top || this.mode!.right) {
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.RIGHTTOP,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
				//右下区域内
				else if (this.getIsInRange(this.startX, this.startY, this.rightBottomRange)) {
					if (this.mode!.right || this.mode!.bottom) {
						if (
							this.beforeResize!.apply(this, [
								{
									area: ResizeAreaValue.RIGHTBOTTOM,
									event: e,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
					}
					if (this.mode!.right) {
						this.$el.style.width = this._width + moveX + 'px'
					}
					if (this.mode!.bottom) {
						this.$el.style.height = this._height + moveY + 'px'
					}
					if (this.mode!.right || this.mode!.bottom) {
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.RIGHTBOTTOM,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
				//左侧区域内
				else if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
					if (this.mode!.left) {
						if (
							this.beforeResize!.apply(this, [
								{
									area: ResizeAreaValue.LEFT,
									event: e,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
						this.$el.style.width = this._width - moveX + 'px'
						this.$el.style.left = this._left + moveX + 'px'
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.LEFT,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
				//右侧区域内
				else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
					if (this.mode!.right) {
						if (
							this.beforeResize!.apply(this, [
								{
									area: ResizeAreaValue.RIGHT,
									event: e,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
						this.$el.style.width = this._width + moveX + 'px'
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.RIGHT,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
				//顶部区域内
				else if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
					if (this.mode!.top) {
						if (
							this.beforeResize!.apply(this, [
								{
									area: ResizeAreaValue.TOP,
									event: e,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
						this.$el.style.height = this._height - moveY + 'px'
						this.$el.style.top = this._top + moveY + 'px'
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.TOP,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
				//底部区域内
				else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
					if (this.mode!.bottom) {
						if (
							this.beforeResize!.apply(this, [
								{
									area: ResizeAreaValue.BOTTOM,
									event: e,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
						this.$el.style.height = this._height + moveY + 'px'
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.BOTTOM,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
			}
			//可以改变宽度
			else if (this.draggableX) {
				//左侧区域内
				if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
					if (this.mode!.left) {
						if (
							this.beforeResize!.apply(this, [
								{
									area: ResizeAreaValue.LEFT,
									event: e,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
						this.$el.style.width = this._width - moveX + 'px'
						this.$el.style.left = this._left + moveX + 'px'
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.LEFT,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
				//右侧区域内
				else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
					if (this.mode!.right) {
						if (
							this.beforeResize!.apply(this, [
								{
									area: ResizeAreaValue.RIGHT,
									event: e,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
						this.$el.style.width = this._width + moveX + 'px'
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.RIGHT,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
			}
			//可以改变元素高度
			else if (this.draggableY) {
				//顶部区域内
				if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
					if (this.mode!.top) {
						if (
							this.beforeResize!.apply(this, [
								{
									area: ResizeAreaValue.TOP,
									event: e,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
						this.$el.style.height = this._height - moveY + 'px'
						this.$el.style.top = this._top + moveY + 'px'
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.TOP,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
				//底部区域内
				else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
					if (this.mode!.bottom) {
						if (
							this.beforeResize!.apply(this, [
								{
									area: ResizeAreaValue.BOTTOM,
									event: e,
									width: this.$el.offsetWidth,
									height: this.$el.offsetHeight,
									moveX: moveX,
									moveY: moveY
								}
							]) === false
						) {
							return
						}
						this.$el.style.height = this._height + moveY + 'px'
						this.resize!.apply(this, [
							{
								area: ResizeAreaValue.BOTTOM,
								event: e,
								width: this.$el.offsetWidth,
								height: this.$el.offsetHeight,
								moveX: moveX,
								moveY: moveY
							}
						])
					}
				}
			}
		}
	}

	//移动端触摸松开或者PC端鼠标松开
	private leave(e: Event) {
		if (this.draggable) {
			this.$el.style.cursor = this.cursor
			this.draggable = false
			//宽高都可以改
			if (this.draggableX && this.draggableY) {
				//左上区域
				if (this.getIsInRange(this.startX, this.startY, this.leftTopRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.LEFTTOP
						}
					])
				}
				//左下区域
				else if (this.getIsInRange(this.startX, this.startY, this.leftBottomRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.LEFTBOTTOM
						}
					])
				}
				//右上区域
				else if (this.getIsInRange(this.startX, this.startY, this.rightTopRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.RIGHTTOP
						}
					])
				}
				//右下区域
				else if (this.getIsInRange(this.startX, this.startY, this.rightBottomRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.RIGHTBOTTOM
						}
					])
				}
				//左侧区域
				else if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.LEFT
						}
					])
				}
				//右侧区域
				else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.RIGHT
						}
					])
				}
				//上侧区域
				else if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.TOP
						}
					])
				}
				//下侧区域
				else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.BOTTOM
						}
					])
				}
			}
			//可以改变宽度
			else if (this.draggableX) {
				//左侧区域
				if (this.getIsInRange(this.startX, this.startY, this.leftRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.LEFT
						}
					])
				}
				//右侧区域
				else if (this.getIsInRange(this.startX, this.startY, this.rightRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.RIGHT
						}
					])
				}
			}
			//可以改变元素高度
			else if (this.draggableY) {
				//上侧区域
				if (this.getIsInRange(this.startX, this.startY, this.topRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.TOP
						}
					])
				}
				//下侧区域
				else if (this.getIsInRange(this.startX, this.startY, this.bottomRange)) {
					this.end!.apply(this, [
						{
							event: e,
							area: ResizeAreaValue.BOTTOM
						}
					])
				}
			}
			this.setRange()
		}
	}

	//设置拖动事件
	private setOn() {
		Dap.event.on(this.$el, 'touchstart.resize', (e: Event) => {
			this.startX = (<TouchEvent>e).targetTouches[0].pageX
			this.startY = (<TouchEvent>e).targetTouches[0].pageY
			this.down(e)
		})
		Dap.event.on(this.$el, 'touchmove.resize', (e: Event) => {
			if (e.cancelable) {
				e.preventDefault()
			}
			let endX = (<TouchEvent>e).targetTouches[0].pageX
			let endY = (<TouchEvent>e).targetTouches[0].pageY
			this.move(e, endX, endY)
		})
		Dap.event.on(this.$el, 'touchend.resize', (e: Event) => {
			this.leave(e)
		})
		Dap.event.on(this.$el, 'mousedown.resize', (e: Event) => {
			this.startX = (<MouseEvent>e).pageX
			this.startY = (<MouseEvent>e).pageY
			this.down(e)
		})
		Dap.event.on(document.documentElement, `mousemove.resize_${this.guid}`, (e: Event) => {
			let endX = (<MouseEvent>e).pageX
			let endY = (<MouseEvent>e).pageY
			this.move(e, endX, endY)
		})
		Dap.event.on(document.documentElement, `mouseup.resize_${this.guid}`, (e: Event) => {
			this.leave(e)
		})
	}

	//生成唯一值
	private createGuid() {
		//获取当前guid，不存在则从0开始
		let guid = Dap.data.get(document.body, 'mvi-directives-resize-guid') || 0
		guid++
		Dap.data.set(document.body, 'mvi-directives-resize-guid', guid)
		return guid
	}

	//api：初始化
	init() {
		if (this.hasInit) {
			return
		}
		this.hasInit = true

		if (!Dap.element.isElement(this.$el)) {
			throw new TypeError('The element that needs to be resized is not a node element')
		}
		if (typeof this.draggableX != 'boolean') {
			this.draggableX = true
		}
		if (typeof this.draggableY != 'boolean') {
			this.draggableY = true
		}
		if (!Dap.common.isObject(this.mode)) {
			this.mode = {
				left: ResizeModeValue.LEFT,
				top: ResizeModeValue.TOP,
				bottom: ResizeModeValue.BOTTOM,
				right: ResizeModeValue.RIGHT
			}
		} else {
			if (typeof this.mode!.left != 'boolean') {
				this.mode!.left = ResizeModeValue.LEFT
			}
			if (typeof this.mode!.top != 'boolean') {
				this.mode!.top = ResizeModeValue.TOP
			}
			if (typeof this.mode!.bottom != 'boolean') {
				this.mode!.bottom = ResizeModeValue.BOTTOM
			}
			if (typeof this.mode!.right != 'boolean') {
				this.mode!.right = ResizeModeValue.RIGHT
			}
		}
		if (typeof this.beforeResize != 'function') {
			this.beforeResize = () => {
				return true
			}
		}
		if (typeof this.resize != 'function') {
			this.resize = function () {}
		}
		if (typeof this.trigger != 'function') {
			this.trigger = function () {}
		}
		if (typeof this.end != 'function') {
			this.end = function () {}
		}
		if (typeof this.ready != 'function') {
			this.ready = function () {}
		}
		if (!Dap.number.isNumber(this.range)) {
			this.range = 0.4
		}

		//设置可拖动的范围
		this.setRange()

		//设置拖动事件
		this.setOn()

		//初始化完成回调
		this.ready.apply(this, [this])
	}

	//api：设置可拖动的范围
	setRange() {
		let range = this.$el.getBoundingClientRect()
		if (this.draggableX && this.draggableY) {
			this.leftRange = {
				x: [range.left, range.left + Dap.element.rem2px(this.range!)],
				y: [range.top + Dap.element.rem2px(this.range!), range.bottom - Dap.element.rem2px(this.range!)]
			}
			this.rightRange = {
				x: [range.right - Dap.element.rem2px(this.range!), range.right],
				y: [range.top + Dap.element.rem2px(this.range!), range.bottom - Dap.element.rem2px(this.range!)]
			}
			this.topRange = {
				x: [range.left + Dap.element.rem2px(this.range!), range.right - Dap.element.rem2px(this.range!)],
				y: [range.top, range.top + Dap.element.rem2px(this.range!)]
			}
			this.bottomRange = {
				x: [range.left + Dap.element.rem2px(this.range!), range.right - Dap.element.rem2px(this.range!)],
				y: [range.bottom - Dap.element.rem2px(this.range!), range.bottom]
			}
			this.leftTopRange = {
				x: [range.left, range.left + Dap.element.rem2px(this.range!)],
				y: [range.top, range.top + Dap.element.rem2px(this.range!)]
			}
			this.leftBottomRange = {
				x: [range.left, range.left + Dap.element.rem2px(this.range!)],
				y: [range.bottom - Dap.element.rem2px(this.range!), range.bottom]
			}
			this.rightTopRange = {
				x: [range.right - Dap.element.rem2px(this.range!), range.right],
				y: [range.top, range.top + Dap.element.rem2px(this.range!)]
			}
			this.rightBottomRange = {
				x: [range.right - Dap.element.rem2px(this.range!), range.right],
				y: [range.bottom - Dap.element.rem2px(this.range!), range.bottom]
			}
		} else if (this.draggableX) {
			this.leftRange = {
				x: [range.left, range.left + Dap.element.rem2px(this.range!)],
				y: [range.top, range.bottom]
			}
			this.rightRange = {
				x: [range.right - Dap.element.rem2px(this.range!), range.right],
				y: [range.top, range.bottom]
			}
		} else if (this.draggableY) {
			this.topRange = {
				x: [range.left, range.right],
				y: [range.top, range.top + Dap.element.rem2px(this.range!)]
			}
			this.bottomRange = {
				x: [range.left, range.right],
				y: [range.bottom - Dap.element.rem2px(this.range!), range.bottom]
			}
		}
	}

	//api：移除documentElement上的拖动事件
	destroy() {
		Dap.event.off(document.documentElement, `mousemove.resize_${this.guid} mouseup.resize_${this.guid}`)
	}

	//api：设置水平方向不可拖拽改变大小
	disabledDragX() {
		this.draggableX = false
		this.setRange()
	}

	//api：设置垂直方向不可拖拽改变大小
	disabledDragY() {
		this.draggableY = false
		this.setRange()
	}

	//api：设置水平方向可拖拽改变大小
	enabledDragX() {
		this.draggableX = true
		this.setRange()
	}

	//api：设置垂直方向可拖拽改变大小
	enabledDragY() {
		this.draggableY = true
		this.setRange()
	}
}

export default Resize
