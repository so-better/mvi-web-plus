import $dap from 'dap-util'
/**
 * 监听元素滚动条到达顶部或者底部
 */
class Scroll {
    constructor(element, options) {
        this.$el = element
        if (!$dap.common.isObject(options)) {
            options = {}
        }
        this.top = options.top
        this.bottom = options.bottom
        //是否已经初始化
        this.hasInit = false
    }

    init() {
        if (this.hasInit) {
            return
        }
        this.hasInit = true
        if (!$dap.element.isElement(this.$el)) {
            this.$el = window
        }
        if (typeof this.top != 'function') {
            this.top = function() {}
        }
        if (typeof this.bottom != 'function') {
            this.bottom = function() {}
        }
        $dap.element.scrollTopBottomTrigger(this.$el, res => {
            if (res.state == 'top') {
                this.top.apply(this, [res.target])
            } else {
                this.bottom.apply(this, [res.target])
            }
        })
    }
}

export default Scroll
