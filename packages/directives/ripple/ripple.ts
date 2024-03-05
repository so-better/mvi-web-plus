import Dap from 'dap-util'
/**
 * 水波纹效果
 */

interface Opts {
	color?: string
	duration?: number
	finalOpacity?: number
	initialOpacity?: number
	delay?: number
	disabled?: boolean
}

class Ripple {
	//指定的元素
	private $el: HTMLElement
	//水波纹颜色
	private color?: string
	//水波持续时间，单位ms
	private duration?: number
	//结束交互效果透明度大小
	private finalOpacity?: number
	//初始交互效果透明度大小
	private initialOpacity?: number
	//延迟时间
	private delay?: number
	//是否禁用
	private disabled?: boolean

	//是否初始化了
	private hasInit: boolean = false
	//生成唯一值
	private guid: number = this.createGuid()
	//水波纹容器数组
	private rippleContainers: Array<HTMLElement> = []

	//install函数
	static install: (...args: any) => void

	constructor(element: HTMLElement, options: Opts) {
		options = Dap.common.isObject(options) ? options : {}
		this.$el = element
		this.color = options.color
		this.duration = options.duration
		this.finalOpacity = options.finalOpacity
		this.initialOpacity = options.initialOpacity
		this.delay = options.delay
		this.disabled = options.disabled
	}

	//动画完成处理
	private endDeal(rippleContainer: HTMLElement) {
		const rippleUp = Dap.data.get(rippleContainer, 'ripple-up')
		const rippleAnimationEnd = Dap.data.get(rippleContainer, 'ripple-animation-end')
		if (rippleUp && rippleAnimationEnd) {
			//透明度消失时间
			const destroyDuration = 100
			//水波纹元素
			const rippleEls = Dap.element.children(rippleContainer)
			const rippleEl = rippleEls[0]
			//重新设置动画
			rippleEl.style.transition = `opacity ${destroyDuration}ms ease-in-out`
			//促使浏览器重绘
			rippleEl.offsetWidth
			rippleEl.style.opacity = 0
			setTimeout(() => {
				//重置容器数组
				this.rippleContainers = this.rippleContainers.filter(el => {
					return el != rippleContainer
				})
				//移除容器元素
				rippleContainer.remove()
			}, destroyDuration)
		}
	}

	//创建ripple元素
	private createRippleElement(pageX: number, pageY: number) {
		//获取元素位置信息
		const rect = Dap.element.getElementBounding(this.$el)
		//获取水波圆形的半径
		const { x1, y1, r } = this.getRadius(pageX, pageY, rect)
		//创建元素
		const el = Dap.element.string2dom('<div></div>')
		el.style.width = r * 2 + 'px'
		el.style.height = r * 2 + 'px'
		el.style.position = 'absolute'
		el.style.background = this.color
		el.style.top = y1 - r + 'px'
		el.style.left = x1 - r + 'px'
		el.style.zIndex = 1
		el.style.borderRadius = '50%'
		//设置初始状态样式
		el.style.transform = 'scale(0)'
		el.style.opacity = this.initialOpacity
		el.style.transition = `transform ${this.duration}ms cubic-bezier(0, 0.5, 0.25, 1), opacity ${this.duration}ms cubic-bezier(0.0, 0, 0.2, 1)`
		return el
	}

	//创建ripple父容器
	private createRippleContainer() {
		const el = Dap.element.string2dom('<div></div>')
		el.style.position = 'absolute'
		el.style.left = '0px'
		el.style.top = '0px'
		el.style.width = Dap.element.getCssStyle(this.$el, 'width')
		el.style.height = Dap.element.getCssStyle(this.$el, 'height')
		el.style.background = 'transparent'
		el.style.borderRadius = Dap.element.getCssStyle(this.$el, 'border-radius')
		el.style.overflow = 'hidden'
		el.style.pointerEvents = 'none'
		//解决移动端子元素存在transform动画时border-radius失效的问题
		el.style.transform = 'rotate(0deg)'
		return el
	}

	//获取圆半径
	private getRadius(pageX: number, pageY: number, rect: any) {
		//点击位置距离元素左侧的距离
		const x1 = pageX - rect.left
		//点击位置距离元素顶部的距离
		const y1 = pageY - rect.top
		//点击位置距离元素右侧的距离
		const x2 = this.$el.offsetWidth - x1
		//点击位置距离元素底部的距离
		const y2 = this.$el.offsetHeight - y1
		//使用勾股定理获取点击位置到各个顶点的距离
		const topLeft = Math.sqrt(x1 * x1 + y1 * y1)
		const topRight = Math.sqrt(x2 * x2 + y1 * y1)
		const bottomLeft = Math.sqrt(x1 * x1 + y2 * y2)
		const bottomRight = Math.sqrt(x2 * x2 + y2 * y2)
		return {
			r: Math.round(Math.max(topLeft, topRight, bottomLeft, bottomRight)),
			x1,
			x2,
			y1,
			y2
		}
	}

	//生成唯一值
	private createGuid() {
		//获取当前guid，不存在则从0开始
		let guid = Dap.data.get(document.documentElement, 'mvi-directives-ripple-guid') || 0
		guid++
		Dap.data.set(document.documentElement, 'mvi-directives-ripple-guid', guid)
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
		if (typeof this.color != 'string') {
			this.color = '#9f9f9f'
		}
		if (!Dap.number.isNumber(this.duration)) {
			this.duration = 600
		}
		if (!Dap.number.isNumber(this.finalOpacity)) {
			this.finalOpacity = 0.1
		}
		if (!Dap.number.isNumber(this.initialOpacity)) {
			this.initialOpacity = 0.1
		}
		if (!Dap.number.isNumber(this.delay)) {
			this.delay = 80
		}
		if (typeof this.disabled != 'boolean') {
			this.disabled = false
		}
		if (Dap.element.getCssStyle(this.$el, 'position') != 'relative' && Dap.element.getCssStyle(this.$el, 'position') != 'absolute' && Dap.element.getCssStyle(this.$el, 'position') != 'fixed') {
			this.$el.style.position = 'relative'
		}

		//鼠标按下或者手指按下函数
		const downFn = (pageX: number, pageY: number) => {
			//禁用
			if (this.disabled) {
				return
			}
			//创建水波纹父元素
			const rippleContainer = this.createRippleContainer()
			//创建水波纹元素
			const rippleEl = this.createRippleElement(pageX, pageY)
			//添加到指定的元素
			this.$el.appendChild(rippleContainer)
			rippleContainer.appendChild(rippleEl)
			//存到数组
			this.rippleContainers.push(rippleContainer)
			//延时执行动画
			setTimeout(() => {
				//执行动画
				rippleEl.style.transform = 'scale(1)'
				rippleEl.style.opacity = this.finalOpacity
				//动画结束
				setTimeout(() => {
					//设置动画完成标识
					Dap.data.set(rippleContainer, 'ripple-animation-end', true)
					this.endDeal(rippleContainer)
				}, this.duration)
			}, this.delay)
		}

		//鼠标松开或者移出页面或者手指松开函数
		const upFn = () => {
			if (this.rippleContainers.length) {
				this.rippleContainers.forEach(rippleContainer => {
					Dap.data.set(rippleContainer, 'ripple-up', true)
					this.endDeal(rippleContainer)
				})
			}
		}

		//鼠标按下
		Dap.event.on(this.$el, 'mousedown.ripple', (e: MouseEvent) => {
			downFn(e.pageX, e.pageY)
		})

		//手指触摸
		Dap.event.on(this.$el, 'touchstart.ripple', (e: TouchEvent) => {
			downFn(e.targetTouches[0].pageX, e.targetTouches[0].pageY)
		})

		//鼠标松开或者移出页面
		Dap.event.on(document.documentElement, `mouseup.ripple_${this.guid}`, upFn)

		//手指松开
		Dap.event.on(this.$el, `touchend.ripple`, upFn)
	}

	//api：移除documentElement上的拖动事件
	destroy() {
		Dap.event.off(document.documentElement, `mouseup.ripple_${this.guid}`)
	}
}

export default Ripple
