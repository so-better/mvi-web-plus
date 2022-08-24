<template>
    <teleport to="body">
        <div class="mvi-loading-bar" ref="bar" :style="barStyle"></div>
    </teleport>
</template>

<script>
import $dap from 'dap-util'
export default {
    name: 'm-loading-bar',
    data() {
        return {
            //透明度变化时间
            opacityTime: 300,
            //进场时宽度变化时间
            widthEnterTime: 4000,
            //离开时宽度变化时间
            widthLeaveTime: 2000,
            //离开计时器
            timer: null,
            //是否已经触发离开
            hasTriggerLeave: false
        }
    },
    props: {
        //进度条颜色
        color: {
            type: String,
            default: null
        },
        //进度条层级
        zIndex: {
            type: Number,
            default: null
        },
        //进度条移除方法
        remove: {
            type: Function,
            default: function () {
                return function () {}
            }
        },
        //进度条初始化方法
        init: {
            type: Function,
            default: function () {
                return function () {}
            }
        }
    },
    computed: {
        computedColor() {
            if (typeof this.color == 'string' && this.color) {
                return this.color
            } else {
                return null
            }
        },
        computedZIndex() {
            if ($dap.number.isNumber(this.zIndex)) {
                return this.zIndex
            } else {
                return null
            }
        },
        barStyle() {
            let style = {}
            if (this.computedColor) {
                style.background = this.computedColor
            }
            if (this.computedZIndex) {
                style.zIndex = this.computedZIndex
            }
            return style
        }
    },
    mounted() {
        this.init(this)
        this.enter()
    },
    methods: {
        //进入
        enter() {
            this.removeTransition()
            this.$refs.bar.style.width = 0
            const width = this.$refs.bar.offsetWidth
            this.addTransition('enter')
            this.$refs.bar.style.width = window.innerWidth * 0.9 + 'px'
            this.$refs.bar.style.opacity = 1
        },
        leave() {
            if (this.hasTriggerLeave) {
                return
            }
            this.hasTriggerLeave = true
            this.addTransition('leave')
            this.$refs.bar.style.width = window.innerWidth + 'px'
            this.$refs.bar.style.opacity = 0
            this.timer = setTimeout(() => {
                //执行移除方法
                this.remove()
            }, this.widthLeaveTime + this.opacityTime)
        },
        //添加动画
        addTransition(type) {
            //进入动画
            if (type == 'enter') {
                this.$refs.bar.style.transition = `opacity ${this.opacityTime}ms linear, width ${this.widthEnterTime}ms ease-out`
                this.$refs.bar.style.webkitTransition = `opacity ${this.opacityTime}ms linear, width ${this.widthEnterTime}ms ease-out`
            } else if (type == 'leave') {
                this.$refs.bar.style.transition = `opacity ${this.opacityTime}ms ${this.widthLeaveTime}ms linear, width ${this.widthLeaveTime}ms ease`
                this.$refs.bar.style.webkitTransition = `opacity ${this.opacityTime}ms ${this.widthLeaveTime}ms linear, width ${this.widthLeaveTime}ms ease`
            }
            //单纯触发浏览器重绘
            const width = this.$refs.bar.offsetWidth
        },
        //移除动画
        removeTransition() {
            this.$refs.bar.style.transition = ''
            this.$refs.bar.style.webkitTransition = ''
            //单纯触发浏览器重绘
            const width = this.$refs.bar.offsetWidth
        }
    },
    beforeUnmount() {
        if (this.timer) {
            clearTimeout(this.timer)
            this.timer = null
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-loading-bar {
    position: fixed;
    left: 0;
    top: 0;
    width: 0;
    opacity: 0;
    height: 0.04rem;
    background-color: @success-normal;
    z-index: 3000;
}
</style>
