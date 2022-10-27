<template>
    <canvas class="mvi-sign" @mousedown="canvasMouseDown" @mousemove="canvasMouseMove" @mouseup="canvasMouseUp" @touchstart="canvasTouchStart" @touchmove="canvasTouchMove" @touchend="canvasTouchEnd" />
</template>

<script>
import $dap from 'dap-util'
export default {
    name: 'm-sign',
    props: {
        //签名颜色
        color: {
            type: String,
            default: '#505050'
        },
        //背景色
        background: {
            type: String,
            default: '#fff'
        },
        //字体粗细 px值
        width: {
            type: Number,
            default: 6
        }
    },
    data() {
        return {
            //是否正在签名
            drawing: false
        }
    },
    mounted() {
        this.init()
    },
    watch: {
        //背景色改变，则清除一次画布
        background() {
            this.clear()
        }
    },
    methods: {
        //初始化
        init() {
            this.$el.setAttribute(
                'width',
                $dap.element.getCssStyle(this.$el, 'width')
            )
            this.$el.setAttribute(
                'height',
                $dap.element.getCssStyle(this.$el, 'height')
            )
            this.clear()
        },
        //鼠标按下
        canvasMouseDown(e) {
            this.drawing = true
            const ctx = this.$el.getContext('2d')
            const rect = $dap.element.getElementBounding(this.$el)
            ctx.beginPath()
            ctx.moveTo(e.pageX - rect.left, e.pageY - rect.top)
        },
        //鼠标移动
        canvasMouseMove(e) {
            if (this.drawing) {
                const ctx = this.$el.getContext('2d')
                const rect = $dap.element.getElementBounding(this.$el)
                ctx.lineTo(e.pageX - rect.left, e.pageY - rect.top)
                ctx.strokeStyle = this.color
                ctx.lineWidth = this.width
                ctx.stroke()
            }
        },
        //鼠标松开
        canvasMouseUp(e) {
            this.drawing = false
            const ctx = this.$el.getContext('2d')
            ctx.closePath()
        },
        //触摸按下
        canvasTouchStart(e) {
            const ctx = this.$el.getContext('2d')
            const rect = $dap.element.getElementBounding(this.$el)
            ctx.beginPath()
            ctx.moveTo(
                e.targetTouches[0].pageX - rect.left,
                e.targetTouches[0].pageY - rect.top
            )
        },
        //触摸移动
        canvasTouchMove(e) {
            const ctx = this.$el.getContext('2d')
            const rect = $dap.element.getElementBounding(this.$el)
            ctx.lineTo(
                e.targetTouches[0].pageX - rect.left,
                e.targetTouches[0].pageY - rect.top
            )
            ctx.strokeStyle = this.color
            ctx.lineWidth = this.width
            ctx.stroke()
        },
        //触摸结束
        canvasTouchEnd(e) {
            const ctx = this.$el.getContext('2d')
            ctx.closePath()
        },
        //对外提供：清除画布
        clear() {
            const ctx = this.$el.getContext('2d')
            ctx.beginPath()
            ctx.clearRect(0, 0, this.$el.width, this.$el.height)
            ctx.rect(0, 0, this.$el.width, this.$el.height)
            ctx.fillStyle = this.background
            ctx.fill()
            ctx.closePath()
        },
        //对外提供：获取图片文件
        getImage() {
            const ctx = this.$el.getContext('2d')
            const url = this.$el.toDataURL('image/png')
            return url
        }
    }
}
</script>

<style lang="less" scoped>
.mvi-sign {
    display: block;
    width: 100%;
    height: 100%;
    user-select: none;
    -webkit-user-select: none;
}
</style>