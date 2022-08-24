import $dap from 'dap-util'
/**
 * 1px适配实现
 */
class Px {
    constructor(element, options) {
        //指定的元素
        this.$el = element
        if (!$dap.common.isObject(options)) {
            options = {}
        }
        //适配的样式名称
        this.attrName = options.attrName
        //是否after伪类
        this.isAfter = options.after
        //是否before伪类
        this.isBefore = options.before
        //是否已经初始化了
        this.hasInit = false
    }

    //初始化方法
    init() {
        if (this.hasInit) {
            return
        }
        this.hasInit = true

        if (!$dap.element.isElement(this.$el)) {
            throw new TypeError('The bound element is not a node element')
        }

        if (typeof this.attrName != 'string' || !this.attrName) {
            throw new Error('The attribute name is not set')
        }

        if (typeof this.isAfter != 'boolean') {
            this.isAfter = false
        }

        if (typeof this.isBefore != 'boolean') {
            this.isBefore = false
        }

        this._do()
    }

    //执行适配
    _do() {
        //获取设备dpr
        let dpr = Math.round(window.devicePixelRatio || 1)
        //1px值
        let value = Number((1 / dpr).toFixed(2))
        //针对伪类
        if (this.isBefore || this.isAfter) {
            let guid = this._createGuid()
            //生成class名称
            let className = `mvi-directives-px_${guid}`
            //添加该class到元素上
            $dap.element.addClass(this.$el, className)
            //生成style标签
            let style = document.createElement('style')
            style.type = 'text/css'
            if (this.isBefore) {
                style.innerHTML = `.${className}::before {${this.attrName}:${value}px !important;}`
            }
            if (this.isAfter) {
                style.innerHTML = `.${className}::after {${this.attrName}:${value}px !important;}`
            }
            document.querySelector('head').appendChild(style)
        } else {
            this.$el.style.setProperty(this.attrName, value + 'px', 'important')
        }
    }

    //生成唯一值
    _createGuid() {
        //获取当前guid，不存在则从0开始
        let guid = $dap.data.get(document.body, 'mvi-directives-px-guid') || 0
        guid++
        $dap.data.set(document.body, 'mvi-directives-px-guid', guid)
        return guid
    }
}

export default Px
