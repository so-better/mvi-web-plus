import $dap from 'dap-util'
/**
 * 锚点定位
 */
class Anchor {
    constructor(element, options) {
        //点击的元素
        this.$el = element
        if (!$dap.common.isObject(options)) {
            options = {}
        }
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

    init() {
        if (this.hasInit) {
            return
        }
        this.hasInit = true
        //根据root的值查找元素
        if (typeof this.$root == 'string' && this.$root) {
            this.$root = document.body.querySelector(this.$root)
        }
        //根据target的值查找元素
        if (typeof this.$target == 'string' && this.$target) {
            this.$target = document.body.querySelector(this.$target)
        }

        if (!$dap.element.isElement(this.$el)) {
            throw new TypeError(
                'The element you click on is not a node element'
            )
        }
        if (!$dap.element.isElement(this.$target)) {
            throw new TypeError('Anchor element is not a node element')
        }
        if (!$dap.number.isNumber(this.time)) {
            this.time = 0
        }
        if (typeof this.callback != 'function') {
            this.callback = function () {}
        }
        if (!$dap.number.isNumber(this.distance)) {
            this.distance = 0.1
        }

        if ($dap.element.isElement(this.$root)) {
            $dap.event.on(this.$el, 'click', e => {
                let scrollTop = $dap.element.getElementPoint(
                    this.$target,
                    this.$root
                ).top
                $dap.element
                    .setScrollTop({
                        el: this.$root,
                        number: scrollTop - $dap.element.rem2px(this.distance),
                        time: this.time
                    })
                    .then(() => {
                        let top =
                            scrollTop - $dap.element.rem2px(this.distance) <= 0
                                ? 0
                                : scrollTop - $dap.element.rem2px(this.distance)
                        this.callback(top)
                    })
            })
        } else {
            $dap.event.on(this.$el, 'click', e => {
                //获取目标元素到浏览器顶部的距离
                let scrollTop = $dap.element.getElementPoint(this.$target).top
                $dap.element
                    .setScrollTop({
                        number: scrollTop - $dap.element.rem2px(this.distance),
                        time: this.time
                    })
                    .then(() => {
                        let top =
                            scrollTop - $dap.element.rem2px(this.distance) <= 0
                                ? 0
                                : scrollTop - $dap.element.rem2px(this.distance)
                        this.callback(top)
                    })
            })
        }
    }
}

export default Anchor
