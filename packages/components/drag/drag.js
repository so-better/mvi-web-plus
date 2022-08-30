import $dap from 'dap-util'
/**
 * Drag拖拽插件
 */
class Drag {
    constructor(element, options) {
        //被拖拽的元素
        this.$el = element
        if (!$dap.common.isObject(options)) {
            options = {}
        }
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
        this.beforedrag = options.beforedrag
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
        this.guid = this._createGuid()
    }

    //初始化
    init() {
        if (this.hasInit) {
            return
        }
        this.hasInit = true

        if (!$dap.element.isElement(this.$el)) {
            throw new TypeError(
                'The element that needs to be dragged is not a node element'
            )
        }
        if (typeof this.$container == 'string' && this.$container) {
            this.$container = document.body.querySelector(this.$container)
        }
        if (!$dap.element.isElement(this.$container)) {
            this.$container = document.body
        }
        if (!$dap.element.isContains(this.$container, this.$el)) {
            throw new Error(
                'Elements that need to be dragged are not descendants of container elements'
            )
        }
        if (
            $dap.element.getCssStyle(this.$container, 'position') == 'static' &&
            this.$container != document.body
        ) {
            throw new Error(
                'The container element cannot be static positioning'
            )
        }
        if (
            $dap.element.getCssStyle(this.$el, 'position') == 'static' ||
            $dap.element.getCssStyle(this.$el, 'position') == 'relative'
        ) {
            throw new Error(
                'The element that need to be dragged cannot be static and relative positioning'
            )
        }
        if (typeof this.draggableY != 'boolean') {
            this.draggableY = true
        }
        if (typeof this.draggableX != 'boolean') {
            this.draggableX = true
        }
        if (
            this.mode != 'on' &&
            this.mode != 'in' &&
            this.mode != 'over' &&
            this.mode != 'out'
        ) {
            this.mode = '' //默认对拖拽范围不做限定
        }
        if (typeof this.cursor != 'boolean') {
            this.cursor = true
        }
        if (typeof this.drag != 'function') {
            this.drag = function () {}
        }
        if (typeof this.beforedrag != 'function') {
            this.beforedrag = function () {}
        }
        if (typeof this.dragged != 'function') {
            this.dragged = function () {}
        }
        if (typeof this.ready != 'function') {
            this.ready = function () {}
        }
        //设置拖拽事件
        this._setOn()
        //初始化回调
        this.ready.apply(this, [this])
    }

    //设置拖拽事件
    _setOn() {
        //触摸开始
        $dap.event.on(this.$el, 'touchstart.drag', e => {
            if (!this.draggableX && !this.draggableY) {
                return
            }
            this.pageX =
                e.targetTouches[0].pageX -
                $dap.element.getElementPoint(this.$el, this.$container).left
            this.pageY =
                e.targetTouches[0].pageY -
                $dap.element.getElementPoint(this.$el, this.$container).top
            this.draggable = true
            if (this.cursor) {
                this.$el.style.cursor = 'move'
            }
            //监听事件，监听刚开始拖动触发
            this.beforedrag.apply(this, [
                {
                    event: e,
                    target: this.$el,
                    container: this.$container,
                    placement: $dap.element.getElementPoint(
                        this.$el,
                        this.$container
                    )
                }
            ])
        })
        //触摸移动
        $dap.event.on(this.$el, 'touchmove.drag', e => {
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
                }
                if (this.draggableY) {
                    this.$el.style.top = top + 'px'
                }
                this._resize()
                if (this.draggableX || this.draggableY) {
                    //监听事件
                    this.drag.apply(this, [
                        {
                            event: e,
                            target: this.$el,
                            container: this.$container,
                            placement: $dap.element.getElementPoint(
                                this.$el,
                                this.$container
                            )
                        }
                    ])
                }
            }
        })
        //触摸松开后，拖拽状态更改为false，触发监听事件
        $dap.event.on(this.$el, 'touchend.drag', e => {
            if (this.draggable) {
                if (!this.draggableX && !this.draggableY) {
                    return
                }
                this.draggable = false
                if (this.cursor) {
                    this.$el.style.cursor = ''
                }
                //监听事件
                this.dragged.apply(this, [
                    {
                        event: e,
                        target: this.$el,
                        container: this.$container,
                        placement: $dap.element.getElementPoint(
                            this.$el,
                            this.$container
                        )
                    }
                ])
            }
        })
        //鼠标按下
        $dap.event.on(this.$el, 'mousedown.drag', e => {
            if (!this.draggableX && !this.draggableY) {
                return
            }
            this.pageX =
                e.pageX -
                $dap.element.getElementPoint(this.$el, this.$container).left
            this.pageY =
                e.pageY -
                $dap.element.getElementPoint(this.$el, this.$container).top
            this.draggable = true
            if (this.cursor) {
                this.$el.style.cursor = 'move'
            }
            //监听事件，监听刚开始拖动触发
            this.beforedrag.apply(this, [
                {
                    event: e,
                    target: this.$el,
                    container: this.$container,
                    placement: $dap.element.getElementPoint(
                        this.$el,
                        this.$container
                    )
                }
            ])
        })
        //鼠标移动
        $dap.event.on(document.body, `mousemove.drag_${this.guid}`, e => {
            if (this.draggable) {
                if (!this.draggableX && !this.draggableY) {
                    return
                }
                let left = e.pageX - this.pageX
                let top = e.pageY - this.pageY
                if (this.draggableX) {
                    this.$el.style.left = left + 'px'
                }
                if (this.draggableY) {
                    this.$el.style.top = top + 'px'
                }
                this._resize()
                if (this.draggableX || this.draggableY) {
                    //监听事件
                    this.drag.apply(this, [
                        {
                            event: e,
                            target: this.$el,
                            container: this.$container,
                            placement: $dap.element.getElementPoint(
                                this.$el,
                                this.$container
                            )
                        }
                    ])
                }
            }
        })
        //鼠标松开后，拖拽状态更改为false，触发监听事件
        $dap.event.on(
            document.body,
            `mouseup.drag_${this.guid} mouseleave.drag_${this.guid}`,
            e => {
                if (this.draggable) {
                    if (!this.draggableX && !this.draggableY) {
                        return
                    }
                    this.draggable = false
                    if (this.cursor) {
                        this.$el.style.cursor = ''
                    }
                    //监听事件
                    this.dragged.apply(this, [
                        {
                            event: e,
                            target: this.$el,
                            container: this.$container,
                            placement: $dap.element.getElementPoint(
                                this.$el,
                                this.$container
                            )
                        }
                    ])
                }
            }
        )
    }

    //移除该指令绑定在body上的事件
    _setOff() {
        $dap.event.off(
            document.body,
            `mousemove.drag_${this.guid} mouseup.drag_${this.guid} mouseleave.drag_${this.guid}`
        )
    }

    //元素超出容器范围设置
    _resize() {
        if (this.mode == 'in') {
            if (this.draggableX) {
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .left <= 0
                ) {
                    this.$el.style.left = 0
                }
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .left >=
                    this.$container.offsetWidth - this.$el.offsetWidth
                ) {
                    this.$el.style.left =
                        this.$container.offsetWidth -
                        this.$el.offsetWidth +
                        'px'
                }
            }
            if (this.draggableY) {
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .top <= 0
                ) {
                    this.$el.style.top = 0
                }
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .top >=
                    this.$container.offsetHeight - this.$el.offsetHeight
                ) {
                    this.$el.style.top =
                        this.$container.offsetHeight -
                        this.$el.offsetHeight +
                        'px'
                }
            }
        } else if (this.mode == 'on') {
            if (this.draggableX) {
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .left <=
                    -this.$el.offsetWidth / 2
                ) {
                    this.$el.style.left = -this.$el.offsetWidth / 2 + 'px'
                }
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .left >=
                    this.$container.offsetWidth - this.$el.offsetWidth / 2
                ) {
                    this.$el.style.left =
                        this.$container.offsetWidth -
                        this.$el.offsetWidth / 2 +
                        'px'
                }
            }
            if (this.draggableY) {
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .top <=
                    -this.$el.offsetHeight / 2
                ) {
                    this.$el.style.top = -this.$el.offsetHeight / 2 + 'px'
                }
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .top >=
                    this.$container.offsetHeight - this.$el.offsetHeight / 2
                ) {
                    this.$el.style.top =
                        this.$container.offsetHeight -
                        this.$el.offsetHeight / 2 +
                        'px'
                }
            }
        } else if (this.mode == 'out') {
            if (this.draggableX) {
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .left <= -this.$el.offsetWidth
                ) {
                    this.$el.style.left = -this.$el.offsetWidth + 'px'
                }
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .left >= this.$container.offsetWidth
                ) {
                    this.$el.style.left = this.$container.offsetWidth + 'px'
                }
            }
            if (this.draggableY) {
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .top <= -this.$el.offsetHeight
                ) {
                    this.$el.style.top = -this.$el.offsetHeight + 'px'
                }
                if (
                    $dap.element.getElementPoint(this.$el, this.$container)
                        .top >= this.$container.offsetHeight
                ) {
                    this.$el.style.top = this.$container.offsetHeight + 'px'
                }
            }
        }
    }

    //生成唯一值
    _createGuid() {
        //获取当前guid，不存在则从0开始
        let guid = $dap.data.get(document.body, 'mvi-directives-drag-guid') || 0
        guid++
        $dap.data.set(document.body, 'mvi-directives-drag-guid', guid)
        return guid
    }

    //移动元素到指定位置
    dragTo(left, top) {
        return new Promise((resolve, reject) => {
            this.beforedrag.apply(this, [
                {
                    target: this.$el,
                    container: this.$container,
                    placement: $dap.element.getElementPoint(
                        this.$el,
                        this.$container
                    )
                }
            ])
            if (this.draggableX) {
                this.$el.style.left = left + 'px'
            }
            if (this.draggableY) {
                this.$el.style.top = top + 'px'
            }
            this._resize()
            let options = {
                target: this.$el,
                container: this.$container,
                placement: $dap.element.getElementPoint(
                    this.$el,
                    this.$container
                )
            }
            this.dragged.apply(this, [options])
            resolve(options)
        })
    }
}

export default Drag
