import Dap from 'dap-util'
/**
 * 高度比例系数
 */
class Prop {
	//元素
	private $el: HTMLElement
	//比率
	private ratio: number
	//元素宽度
	private width: number = 0
	//元素高度
	private height: number = 0
	//是否已经初始化
	private hasInit: boolean = false
	//生成唯一标识符
	private guid: number = this.createGuid()

	constructor(element: HTMLElement, ratio: number) {
		this.$el = element
		this.ratio = ratio
	}

	//生成唯一值
	private createGuid() {
		//获取当前guid，不存在则从0开始
		let guid = Dap.data.get(document.body, 'mvi-directives-prop-guid') || 0
		guid++
		Dap.data.set(document.body, 'mvi-directives-prop-guid', guid)
		return guid
	}

	//api：设置高度的方法
	set(number?: number) {
		if (typeof number == 'number' && !isNaN(number) && number >= 0) {
			this.ratio = number
		}
		//宽度
		this.width = Number(parseFloat(Dap.element.getCssStyle(this.$el, 'width')).toFixed(2))
		//比例系数乘以宽度获得高度
		this.height = this.width * this.ratio
		this.$el.style.height = this.height + 'px'
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
		if (typeof this.ratio != 'number' || isNaN(this.ratio)) {
			this.ratio = 0
		}
		this.set()
		Dap.event.on(window, `resize.prop_${this.guid}`, () => {
			this.set()
		})
	}

	//api：移除绑定在window的事件
	destroy() {
		Dap.event.off(window, `resize.prop_${this.guid}`)
	}
}

export default Prop
