import $dap from 'dap-util'
/**
 * 拖拽改变元素大小
 */
class Resize {
    constructor(element, options) {
        //拖拽元素
        this.$el = element
        if (!$dap.common.isObject(options)) {
            options = {}
        }
        //水平方向是否可拖拽
        this.draggableX = options.draggableX
        //垂直方向是否可拖拽
        this.draggableY = options.draggableY
        //拖拽模式
        this.mode = options.mode
        //元素大小改变之前触发
        this.beforeResize = options.beforeResize
        //元素大小改变时触发
        this.resize = options.resize
        //按下触发时触发
        this.trigger = options.trigger
        //大小改变之后
        this.end = options.end
        //初始化完成回调
        this.ready = options.ready
        //可拖动的范围直径
        this.range = options.range
        //是否可拖动的标识
        this.draggable = false
        //左侧可拖动范围
        this.leftRange = {}
        //右侧可拖动范围
        this.rightRange = {}
        //顶部可拖动范围
        this.topRange = {}
        //底部可拖动范围
        this.bottomRange = {}
        //左上可拖动范围
        this.leftTopRange = {}
        //右上可拖动范围
        this.rightTopRange = {}
        //左下可拖动范围
        this.leftBottomRange = {}
        //右下可拖动范围
        this.rightBottomRange = {}
        //水平开始的位置
        this.startX = 0
        //垂直开始的位置
        this.satrtY = 0
        //元素宽度
        this._width = 0
        //元素高度
        this._height = 0
        //元素left
        this._left = 0
        //元素right
        this._right = 0
        //是否初始化
        this.hasInit = false
        //记录原先的鼠标样式
        this.cursor = ''
        //生成唯一标识符
        this.guid = this._createGuid()
    }

    //初始化
    init() {
        if (this.hasInit) {
            return
        }
        this.hasInit = true
        if (typeof this.draggableX != 'boolean') {
            this.draggableX = true
        }
        if (typeof this.draggableY != 'boolean') {
            this.draggableY = true
        }
        if (!$dap.common.isObject(this.mode)) {
            this.mode = {
                left: Resize.MODE.LEFT,
                top: Resize.MODE.TOP,
                bottom: Resize.MODE.BOTTOM,
                right: Resize.MODE.RIGHT
            }
        } else {
            if (typeof this.mode.left != 'boolean') {
                this.mode.left = Resize.MODE.LEFT
            }
            if (typeof this.mode.top != 'boolean') {
                this.mode.top = Resize.MODE.TOP
            }
            if (typeof this.mode.bottom != 'boolean') {
                this.mode.bottom = Resize.MODE.BOTTOM
            }
            if (typeof this.mode.right != 'boolean') {
                this.mode.right = Resize.MODE.RIGHT
            }
        }
        if (typeof this.beforeResize != 'function') {
            this.beforeResize = function() {}
        }
        if (typeof this.resize != 'function') {
            this.resize = function() {}
        }
        if (typeof this.trigger != 'function') {
            this.trigger = function() {}
        }
        if (typeof this.end != 'function') {
            this.end = function() {}
        }
        if (typeof this.ready != 'function') {
            this.ready = function() {}
        }
        if (!$dap.number.isNumber(this.range)) {
            this.range = 0.4
        }

        //设置可拖动的范围
        this.setRange()

        //设置拖动事件
        this._setOn()

        //初始化完成回调
        this.ready.apply(this, [this])
    }

    //设置可拖动的范围
    setRange() {
        let range = this.$el.getBoundingClientRect()
        if (this.draggableX && this.draggableY) {
            this.leftRange = {
                x: [range.left, range.left + $dap.element.rem2px(this.range)],
                y: [
                    range.top + $dap.element.rem2px(this.range),
                    range.bottom - $dap.element.rem2px(this.range)
                ]
            }
            this.rightRange = {
                x: [range.right - $dap.element.rem2px(this.range), range.right],
                y: [
                    range.top + $dap.element.rem2px(this.range),
                    range.bottom - $dap.element.rem2px(this.range)
                ]
            }
            this.topRange = {
                x: [
                    range.left + $dap.element.rem2px(this.range),
                    range.right - $dap.element.rem2px(this.range)
                ],
                y: [range.top, range.top + $dap.element.rem2px(this.range)]
            }
            this.bottomRange = {
                x: [
                    range.left + $dap.element.rem2px(this.range),
                    range.right - $dap.element.rem2px(this.range)
                ],
                y: [
                    range.bottom - $dap.element.rem2px(this.range),
                    range.bottom
                ]
            }
            this.leftTopRange = {
                x: [range.left, range.left + $dap.element.rem2px(this.range)],
                y: [range.top, range.top + $dap.element.rem2px(this.range)]
            }
            this.leftBottomRange = {
                x: [range.left, range.left + $dap.element.rem2px(this.range)],
                y: [
                    range.bottom - $dap.element.rem2px(this.range),
                    range.bottom
                ]
            }
            this.rightTopRange = {
                x: [range.right - $dap.element.rem2px(this.range), range.right],
                y: [range.top, range.top + $dap.element.rem2px(this.range)]
            }
            this.rightBottomRange = {
                x: [range.right - $dap.element.rem2px(this.range), range.right],
                y: [
                    range.bottom - $dap.element.rem2px(this.range),
                    range.bottom
                ]
            }
        } else if (this.draggableX) {
            this.leftRange = {
                x: [range.left, range.left + $dap.element.rem2px(this.range)],
                y: [range.top, range.bottom]
            }
            this.rightRange = {
                x: [range.right - $dap.element.rem2px(this.range), range.right],
                y: [range.top, range.bottom]
            }
        } else if (this.draggableY) {
            this.topRange = {
                x: [range.left, range.right],
                y: [range.top, range.top + $dap.element.rem2px(this.range)]
            }
            this.bottomRange = {
                x: [range.left, range.right],
                y: [
                    range.bottom - $dap.element.rem2px(this.range),
                    range.bottom
                ]
            }
        }
    }

    ///判断点击的点是否在指定区域范围内
    _getIsInRange(x, y, range) {
        let conditions1 = x >= range.x[0] && x <= range.x[1]
        let conditions2 = y >= range.y[0] && y <= range.y[1]
        if (conditions1 && conditions2) {
            return true
        } else {
            return false
        }
    }

    //移动端触摸按下或者PC端鼠标按下
    _down(e) {
        this._width = this.$el.offsetWidth
        this._height = this.$el.offsetHeight
        this._left = this.$el.offsetLeft
        this._top = this.$el.offsetTop
        this.cursor = $dap.element.getCssStyle(this.$el, 'cursor')
        //宽高都可以改
        if (this.draggableX && this.draggableY) {
            //左上区域内
            if (
                this._getIsInRange(this.startX, this.startY, this.leftTopRange)
            ) {
                if (this.mode.left || this.mode.top) {
                    this.draggable = true
                    this.$el.style.cursor = 'nw-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.LEFTTOP
                        }
                    ])
                }
            }
            //左下区域内
            else if (
                this._getIsInRange(
                    this.startX,
                    this.startY,
                    this.leftBottomRange
                )
            ) {
                if (this.mode.left || this.mode.bottom) {
                    this.draggable = true
                    this.$el.style.cursor = 'sw-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.LEFTBOTTOM
                        }
                    ])
                }
            }
            //右上区域内
            else if (
                this._getIsInRange(this.startX, this.startY, this.rightTopRange)
            ) {
                if (this.mode.right || this.mode.top) {
                    this.draggable = true
                    this.$el.style.cursor = 'ne-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.RIGHTTOP
                        }
                    ])
                }
            }
            //右下区域内
            else if (
                this._getIsInRange(
                    this.startX,
                    this.startY,
                    this.rightBottomRange
                )
            ) {
                if (this.mode.right || this.mode.bottom) {
                    this.draggable = true
                    this.$el.style.cursor = 'se-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.RIGHTBOTTOM
                        }
                    ])
                }
            }
            //左侧区域内
            else if (
                this._getIsInRange(this.startX, this.startY, this.leftRange)
            ) {
                if (this.mode.left) {
                    this.draggable = true
                    this.$el.style.cursor = 'w-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.LEFT
                        }
                    ])
                }
            }
            //右侧区域内
            else if (
                this._getIsInRange(this.startX, this.startY, this.rightRange)
            ) {
                if (this.mode.right) {
                    this.draggable = true
                    this.$el.style.cursor = 'e-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.RIGHT
                        }
                    ])
                }
            }
            //顶部区域内
            else if (
                this._getIsInRange(this.startX, this.startY, this.topRange)
            ) {
                if (this.mode.top) {
                    this.draggable = true
                    this.$el.style.cursor = 'n-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.TOP
                        }
                    ])
                }
            }
            //底部区域内
            else if (
                this._getIsInRange(this.startX, this.startY, this.bottomRange)
            ) {
                if (this.mode.bottom) {
                    this.draggable = true
                    this.$el.style.cursor = 's-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.BOTTOM
                        }
                    ])
                }
            }
        }
        //只可以改变元素宽度
        else if (this.draggableX) {
            //左侧区域内
            if (this._getIsInRange(this.startX, this.startY, this.leftRange)) {
                if (this.mode.left) {
                    this.draggable = true
                    this.$el.style.cursor = 'w-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.LEFT
                        }
                    ])
                }
            }
            //右侧区域内
            else if (
                this._getIsInRange(this.startX, this.startY, this.rightRange)
            ) {
                if (this.mode.right) {
                    this.draggable = true
                    this.$el.style.cursor = 'e-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.RIGHT
                        }
                    ])
                }
            }
        }
        //只可以改变元素高度
        else if (this.draggableY) {
            //顶部区域内
            if (this._getIsInRange(this.startX, this.startY, this.topRange)) {
                if (this.mode.top) {
                    this.draggable = true
                    this.$el.style.cursor = 'n-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.TOP
                        }
                    ])
                }
            }
            //底部区域内
            else if (
                this._getIsInRange(this.startX, this.startY, this.bottomRange)
            ) {
                if (this.mode.bottom) {
                    this.draggable = true
                    this.$el.style.cursor = 's-resize'
                    this.trigger.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.BOTTOM
                        }
                    ])
                }
            }
        }
    }

    //移动端触摸滑动或者PC端鼠标拖动
    _move(e, endX, endY) {
        if (this.draggable) {
            let moveX = endX - this.startX
            let moveY = endY - this.startY
            //宽高都可以改
            if (this.draggableX && this.draggableY) {
                //左上区域内
                if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.leftTopRange
                    )
                ) {
                    if (this.mode.left || this.mode.top) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    event: e,
                                    area: Resize.AREA.LEFTTOP,
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
                    if (this.mode.left) {
                        this.$el.style.width = this._width - moveX + 'px'
                        this.$el.style.left = this._left + moveX + 'px'
                    }
                    if (this.mode.top) {
                        this.$el.style.height = this._height - moveY + 'px'
                        this.$el.style.top = this._top + moveY + 'px'
                    }
                    if (this.mode.left || this.mode.top) {
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.LEFTTOP,
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
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.leftBottomRange
                    )
                ) {
                    if (this.mode.left || this.mode.bottom) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    area: Resize.AREA.LEFTBOTTOM,
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
                    if (this.mode.left) {
                        this.$el.style.width = this._width - moveX + 'px'
                        this.$el.style.left = this._left + moveX + 'px'
                    }
                    if (this.mode.bottom) {
                        this.$el.style.height = this._height + moveY + 'px'
                    }
                    if (this.mode.left || this.mode.bottom) {
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.LEFTBOTTOM,
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
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.rightTopRange
                    )
                ) {
                    if (this.mode.right || this.mode.top) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    area: Resize.AREA.RIGHTTOP,
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
                    if (this.mode.right) {
                        this.$el.style.width = this._width + moveX + 'px'
                    }
                    if (this.mode.top) {
                        this.$el.style.height = this._height - moveY + 'px'
                        this.$el.style.top = this._top + moveY + 'px'
                    }
                    if (this.mode.top || this.mode.right) {
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.RIGHTTOP,
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
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.rightBottomRange
                    )
                ) {
                    if (this.mode.right || this.mode.bottom) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    area: Resize.AREA.RIGHTBOTTOM,
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
                    if (this.mode.right) {
                        this.$el.style.width = this._width + moveX + 'px'
                    }
                    if (this.mode.bottom) {
                        this.$el.style.height = this._height + moveY + 'px'
                    }
                    if (this.mode.right || this.mode.bottom) {
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.RIGHTBOTTOM,
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
                else if (
                    this._getIsInRange(this.startX, this.startY, this.leftRange)
                ) {
                    if (this.mode.left) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    area: Resize.AREA.LEFT,
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
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.LEFT,
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
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.rightRange
                    )
                ) {
                    if (this.mode.right) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    area: Resize.AREA.RIGHT,
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
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.RIGHT,
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
                else if (
                    this._getIsInRange(this.startX, this.startY, this.topRange)
                ) {
                    if (this.mode.top) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    area: Resize.AREA.TOP,
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
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.TOP,
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
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.bottomRange
                    )
                ) {
                    if (this.mode.bottom) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    area: Resize.AREA.BOTTOM,
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
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.BOTTOM,
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
                if (
                    this._getIsInRange(this.startX, this.startY, this.leftRange)
                ) {
                    if (this.mode.left) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    area: Resize.AREA.LEFT,
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
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.LEFT,
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
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.rightRange
                    )
                ) {
                    if (this.mode.right) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    area: Resize.AREA.RIGHT,
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
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.RIGHT,
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
                if (
                    this._getIsInRange(this.startX, this.startY, this.topRange)
                ) {
                    if (this.mode.top) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    area: Resize.AREA.TOP,
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
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.TOP,
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
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.bottomRange
                    )
                ) {
                    if (this.mode.bottom) {
                        if (
                            this.beforeResize.apply(this, [
                                {
                                    area: Resize.AREA.BOTTOM,
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
                        this.resize.apply(this, [
                            {
                                area: Resize.AREA.BOTTOM,
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
    _leave(e) {
        if (this.draggable) {
            this.$el.style.cursor = this.cursor
            this.draggable = false
            //宽高都可以改
            if (this.draggableX && this.draggableY) {
                //左上区域
                if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.leftTopRange
                    )
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.LEFTTOP
                        }
                    ])
                }
                //左下区域
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.leftBottomRange
                    )
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.LEFTBOTTOM
                        }
                    ])
                }
                //右上区域
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.rightTopRange
                    )
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.RIGHTTOP
                        }
                    ])
                }
                //右下区域
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.rightBottomRange
                    )
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.RIGHTBOTTOM
                        }
                    ])
                }
                //左侧区域
                else if (
                    this._getIsInRange(this.startX, this.startY, this.leftRange)
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.LEFT
                        }
                    ])
                }
                //右侧区域
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.rightRange
                    )
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.RIGHT
                        }
                    ])
                }
                //上侧区域
                else if (
                    this._getIsInRange(this.startX, this.startY, this.topRange)
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.TOP
                        }
                    ])
                }
                //下侧区域
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.bottomRange
                    )
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.BOTTOM
                        }
                    ])
                }
            }
            //可以改变宽度
            else if (this.draggableX) {
                //左侧区域
                if (
                    this._getIsInRange(this.startX, this.startY, this.leftRange)
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.LEFT
                        }
                    ])
                }
                //右侧区域
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.rightRange
                    )
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.RIGHT
                        }
                    ])
                }
            }
            //可以改变元素高度
            else if (this.draggableY) {
                //上侧区域
                if (
                    this._getIsInRange(this.startX, this.startY, this.topRange)
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.TOP
                        }
                    ])
                }
                //下侧区域
                else if (
                    this._getIsInRange(
                        this.startX,
                        this.startY,
                        this.bottomRange
                    )
                ) {
                    this.end.apply(this, [
                        {
                            event: e,
                            area: Resize.AREA.BOTTOM
                        }
                    ])
                }
            }
            this.setRange()
        }
    }

    //设置拖动事件
    _setOn() {
        $dap.event.on(this.$el, 'touchstart.resize', e => {
            this.startX = e.targetTouches[0].pageX
            this.startY = e.targetTouches[0].pageY
            this._down(e)
        })
        $dap.event.on(this.$el, 'touchmove.resize', e => {
            if (e.cancelable) {
                e.preventDefault()
            }
            let endX = e.targetTouches[0].pageX
            let endY = e.targetTouches[0].pageY
            this._move(e, endX, endY)
        })
        $dap.event.on(this.$el, 'touchend.resize', e => {
            this._leave(e)
        })
        $dap.event.on(this.$el, 'mousedown.resize', e => {
            this.startX = e.pageX
            this.startY = e.pageY
            this._down(e)
        })
        $dap.event.on(
            document.documentElement,
            `mousemove.resize_${this.guid}`,
            e => {
                let endX = e.pageX
                let endY = e.pageY
                this._move(e, endX, endY)
            }
        )
        $dap.event.on(
            document.documentElement,
            `mouseup.resize_${this.guid} mouseleave.resize_${this.guid}`,
            e => {
                this._leave(e)
            }
        )
    }

    //移除documentElement上的拖动事件
    _setOff() {
        $dap.event.off(
            document.documentElement,
            `mousemove.resize_${this.guid} mouseup.resize_${this.guid} mouseleave.resize_${this.guid}`
        )
    }

    //生成唯一值
    _createGuid() {
        //获取当前guid，不存在则从0开始
        let guid =
            $dap.data.get(document.body, 'mvi-directives-resize-guid') || 0
        guid++
        $dap.data.set(document.body, 'mvi-directives-resize-guid', guid)
        return guid
    }

    //设置水平方向不可拖拽改变大小
    disabledDragX() {
        this.draggableX = false
        this.setRange()
    }

    //设置垂直方向不可拖拽改变大小
    disabledDragY() {
        this.draggableY = false
        this.setRange()
    }

    //设置水平方向可拖拽改变大小
    enabledDragX() {
        this.draggableX = true
        this.setRange()
    }

    //设置垂直方向可拖拽改变大小
    enabledDragY() {
        this.draggableY = true
        this.setRange()
    }
}

//拖动的区域范围
Resize.AREA = {
    LEFT: 0,
    TOP: 1,
    RIGHT: 2,
    BOTTOM: 3,
    LEFTTOP: 4,
    LEFTBOTTOM: 5,
    RIGHTTOP: 6,
    RIGHTBOTTOM: 7
}

//模式默认值
Resize.MODE = {
    LEFT: true,
    TOP: true,
    BOTTOM: true,
    RIGHT: true
}

export default Resize
