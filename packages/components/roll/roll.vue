<template>
    <div @click="clickStopFun" @mouseenter="hoverIn" @mouseleave="hoverOut" class="mvi-roll-container" :style="containerStyle">
        <div :class="['mvi-roll',(direction=='left'|| direction=='right')?'mvi-roll-horizontal':'mvi-roll-vertical']" :style="rollStyle" ref="roll">
            <slot></slot>
        </div>
    </div>
</template>

<script>
import $dap from 'dap-util'
export default {
    name: 'm-roll',
    data() {
        return {
            rollEl: null,
            timer: null,
            //0表示正在滚动，1表示暂停，2表示停止
            status: -1
        }
    },
    emits: ['play', 'stop', 'pause'],
    props: {
        //滚动一个周期需要的时间
        interval: {
            type: Number,
            default: 5000
        },
        //滚动方向
        direction: {
            type: String,
            default: 'left',
            validator(value) {
                return ['left', 'right', 'top', 'bottom'].includes(value)
            }
        },
        //是否自动滚动
        autoplay: {
            type: Boolean,
            default: false
        },
        //是否循环滚动
        loop: {
            type: Boolean,
            default: false
        },
        //动画效果
        animation: {
            type: String,
            default: 'linear',
            validator(value) {
                return [
                    'linear',
                    'ease',
                    'ease-in',
                    'ease-out',
                    'ease-in-out'
                ].includes(value)
            }
        },
        //是否点击暂停
        clickStop: {
            type: Boolean,
            default: false
        },
        //是否悬浮暂停
        hoverStop: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.rollEl = this.$refs.roll
        if (this.autoplay) {
            this.play()
        }
    },
    computed: {
        //滚动元素style
        rollStyle() {
            let obj = {}
            if (this.direction == 'left') {
                obj.left = '100%'
                obj.right = 'auto'
            } else if (this.direction == 'right') {
                obj.right = '100%'
                obj.left = 'auto'
            } else if (this.direction == 'top') {
                obj.top = '100%'
                obj.bottom = 'auto'
            } else if (this.direction == 'bottom') {
                obj.bottom = '100%'
                obj.top = 'auto'
            }
            return obj
        },
        //容器style
        containerStyle() {
            let style = {}
            if (this.rollEl) {
                style.height = $dap.element.getCssStyle(this.rollEl, 'height')
            }
            return style
        }
    },
    methods: {
        //鼠标进入
        hoverIn() {
            if (this.hoverStop) {
                //滚动中可暂停
                if (this.status == 0) {
                    this.pause()
                }
            }
        },
        //鼠标移出
        hoverOut() {
            if (this.hoverStop) {
                //暂停时可开始
                if (this.status == 1) {
                    this.play()
                }
            }
        },
        //播放
        play() {
            if (!this.$refs.roll) {
                return
            }
            if (this.status == 0) {
                return
            }
            this.status = 0
            let placement = $dap.element.getElementPoint(
                this.$refs.roll,
                this.$el
            )
            let interval = 0
            if (this.direction == 'left') {
                interval = Math.round(
                    ((placement.left + this.$refs.roll.offsetWidth) /
                        (this.$el.offsetWidth + this.$refs.roll.offsetWidth)) *
                        this.interval
                )
            } else if (this.direction == 'right') {
                interval = Math.round(
                    ((placement.right + this.$refs.roll.offsetWidth) /
                        (this.$el.offsetWidth + this.$refs.roll.offsetWidth)) *
                        this.interval
                )
            } else if (this.direction == 'top') {
                interval = Math.round(
                    ((placement.top + this.$refs.roll.offsetHeight) /
                        (this.$el.offsetHeight +
                            this.$refs.roll.offsetHeight)) *
                        this.interval
                )
            } else if (this.direction == 'bottom') {
                interval = Math.round(
                    ((placement.bottom + this.$refs.roll.offsetHeight) /
                        (this.$el.offsetHeight +
                            this.$refs.roll.offsetHeight)) *
                        this.interval
                )
            }
            //设置动画和速度
            this.$refs.roll.style.transition =
                'all ' + interval + 'ms ' + this.animation
            this.$refs.roll.style.webkitTransition =
                'all ' + interval + 'ms ' + this.animation
            //执行
            setTimeout(() => {
                if (!this.$refs.roll) {
                    return
                }
                if (this.direction == 'left') {
                    this.$refs.roll.style.left =
                        -this.$refs.roll.offsetWidth + 'px'
                    this.$refs.roll.style.right = 'auto'
                } else if (this.direction == 'right') {
                    this.$refs.roll.style.right =
                        -this.$refs.roll.offsetWidth + 'px'
                    this.$refs.roll.style.left = 'auto'
                } else if (this.direction == 'top') {
                    this.$refs.roll.style.top =
                        -this.$refs.roll.offsetHeight + 'px'
                    this.$refs.roll.style.bottom = 'auto'
                } else if (this.direction == 'bottom') {
                    this.$refs.roll.style.bottom =
                        -this.$refs.roll.offsetHeight + 'px'
                    this.$refs.roll.style.top = 'auto'
                }
                this.$emit('play')
                this.timer = setTimeout(() => {
                    this.stop()
                    if (this.loop) {
                        this.play() //重新开始
                    }
                }, interval)
            }, 10)
        },
        //停止
        stop() {
            if (this.status == 2) {
                return
            }
            this.status = 2
            //去除动画
            this.$refs.roll.style.transition = ''
            this.$refs.roll.style.webkitTransition = ''
            if (this.direction == 'left') {
                this.$refs.roll.style.left = '100%'
                this.$refs.roll.style.right = 'auto'
            } else if (this.direction == 'right') {
                this.$refs.roll.style.right = '100%'
                this.$refs.roll.style.left = 'auto'
            } else if (this.direction == 'top') {
                this.$refs.roll.style.top = '100%'
                this.$refs.roll.style.bottom = 'auto'
            } else if (this.direction == 'bottom') {
                this.$refs.roll.style.bottom = '100%'
                this.$refs.roll.style.top = 'auto'
            }
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
            this.$emit('stop')
        },
        //暂停
        pause() {
            //只有滚动状态下才能暂停
            if (this.status != 0) {
                return
            }
            this.status = 1
            let placement = $dap.element.getElementPoint(
                this.$refs.roll,
                this.$el
            )
            //去除动画
            this.$refs.roll.style.transition = ''
            this.$refs.roll.style.webkitTransition = ''
            //去除计时器
            if (this.timer) {
                clearTimeout(this.timer)
                this.timer = null
            }
            if (this.direction == 'left') {
                this.$refs.roll.style.left = placement.left + 'px'
                this.$refs.roll.style.right = 'auto'
            } else if (this.direction == 'right') {
                this.$refs.roll.style.right = placement.right + 'px'
                this.$refs.roll.style.left = 'auto'
            } else if (this.direction == 'top') {
                this.$refs.roll.style.top = placement.top + 'px'
                this.$refs.roll.style.bottom = 'auto'
            } else if (this.direction == 'bottom') {
                this.$refs.roll.style.bottom = placement.bottom + 'px'
                this.$refs.roll.style.top = 'auto'
            }
            this.$emit('pause')
        },
        //点击暂停
        clickStopFun() {
            if (this.clickStop) {
                //滚动中可暂停
                if (this.status == 0) {
                    this.pause()
                }
                //暂停时可开始
                else if (this.status == 1) {
                    this.play()
                }
            }
        }
    },
    beforeUnmount() {
        this.stop()
    }
}
</script>

<style lang="less" scoped>
@import '../../css/mvi-basic.less';

.mvi-roll-container {
    display: block;
    width: 100%;
    position: relative;
    overflow: hidden;
    cursor: pointer;
}

.mvi-roll {
    position: absolute;
    left: 100%;
    top: 100%;
    white-space: nowrap;
}

.mvi-roll-vertical {
    left: 0;
}

.mvi-roll-horizontal {
    top: 0;
}
</style>
