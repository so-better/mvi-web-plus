<template>
    <div class="mvi-circle-progress" :style="{width:size || '',height:size || ''}">
        <svg :viewBox="viewBox">
            <path :d="pathD" :style="trackStyle" class="mvi-circle-progress-track"></path>
            <path :d="pathD" :style="barStyle" class="mvi-circle-progress-bar"></path>
        </svg>
        <div v-if="showTip" class="mvi-circle-progress-tip">
            <slot v-if="$slots.tip" name="tip" :value="value"></slot>
            <span v-else :class="tipClass || ''" v-text="computedValue"></span>
        </div>
    </div>
</template>

<script>
import $dap from 'dap-util'
export default {
    name: 'm-circle-progress',
    data() {
        return {
            ele: null,
            pathSize: 1000
        }
    },
    props: {
        //进度值
        value: {
            type: Number,
            default: 0
        },
        //最小值
        min: {
            type: Number,
            default: 0
        },
        //最大值
        max: {
            type: Number,
            default: 100
        },
        //直径
        size: {
            type: String,
            default: null
        },
        //进度颜色
        color: {
            type: String,
            default: null
        },
        //轨道颜色
        trackColor: {
            type: String,
            default: null
        },
        //填充色
        fill: {
            type: String,
            default: null
        },
        //是否显示动画效果
        animation: {
            type: Boolean,
            default: true
        },
        //动画效果的时长
        timeout: {
            type: Number,
            default: 400
        },
        //是否显示文字
        showTip: {
            type: Boolean,
            default: false
        },
        //中间显示的文本
        tipText: {
            type: String,
            default: null
        },
        //进度条厚度
        strokeWidth: {
            type: String,
            default: null
        },
        //进度条端点是否有圆角
        round: {
            type: Boolean,
            default: false
        },
        //是否顺时针增加
        clockWise: {
            type: Boolean,
            default: true
        },
        //文字内容添加额外的样式类
        tipClass: {
            type: String,
            default: null
        }
    },
    computed: {
        viewBox() {
            let width = $dap.element.rem2px(0.2)
            if ($dap.element.isElement(this.ele)) {
                width = $dap.element.getCssStyle(
                    this.ele.querySelector('path'),
                    'stroke-width'
                )
                width = parseFloat(width)
            }
            return `0 0 ${this.pathSize + 2 * width} ${
                this.pathSize + 2 * width
            }`
        },
        pathD() {
            let width = $dap.element.rem2px(0.2)
            if ($dap.element.isElement(this.ele)) {
                width = $dap.element.getCssStyle(
                    this.ele.querySelector('path'),
                    'stroke-width'
                )
                width = parseFloat(width)
            }
            return `M ${this.pathSize / 2 + width} ${
                this.pathSize / 2 + width
            } m 0, -${this.pathSize / 2} a ${this.pathSize / 2}, ${
                this.pathSize / 2
            } 0 1, ${this.clockWise ? 1 : 0} 0, ${this.pathSize} a ${
                this.pathSize / 2
            }, ${this.pathSize / 2} 0 1, ${this.clockWise ? 1 : 0} 0, -${
                this.pathSize
            }`
        },
        computedValue() {
            if (this.tipText) {
                return this.tipText
            } else {
                let value =
                    this.value > this.max
                        ? this.max
                        : this.value < this.min
                        ? this.min
                        : this.value
                return (
                    Math.round(
                        ((value - this.min) / (this.max - this.min)) * 100
                    ) + '%'
                )
            }
        },
        barStyle() {
            let style = {}
            if (this.fill) {
                style.fill = this.fill
            }
            if (this.color) {
                style.stroke = this.color
            }
            if (this.strokeWidth) {
                style.strokeWidth = this.strokeWidth
            }

            if (this.round) {
                style.strokeLinecap = 'round'
            }
            if (this.animation) {
                style.transition = 'stroke-dasharray ' + this.timeout + 'ms'
                style.webkitTransition =
                    'stroke-dasharray ' + this.timeout + 'ms'
            }
            //计算进度
            let circleLength = Number((this.pathSize * Math.PI).toFixed(2)) //圆周长
            let value =
                this.value > this.max
                    ? this.max
                    : this.value < this.min
                    ? this.min
                    : this.value
            let valueLength = Number(
                (
                    ((value - this.min) / (this.max - this.min)) *
                    circleLength
                ).toFixed(2)
            ) //进度长度
            style.strokeDasharray =
                valueLength + ',' + (circleLength - valueLength)
            return style
        },
        trackStyle() {
            let style = {}
            if (this.fill) {
                style.fill = this.fill
            }
            if (this.trackColor) {
                style.stroke = this.trackColor
            }
            if (this.strokeWidth) {
                style.strokeWidth = this.strokeWidth
            }
            return style
        }
    },
    mounted() {
        this.ele = this.$el
    }
}
</script>

<style scoped lang="less">
@import '../../css/mvi-basic.less';

.mvi-circle-progress {
    display: inline-block;
    position: relative;
    width: 2rem;
    height: 2rem;
    margin: 0;
    padding: 0;
}

.mvi-circle-progress > svg {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.mvi-circle-progress-track {
    fill: none;
    stroke: @bg-color-dark;
    stroke-width: 0.2rem;
    margin: 0;
    padding: 0;
}

.mvi-circle-progress-bar {
    fill: none;
    stroke: @info-normal;
    stroke-width: 0.2rem;
    margin: 0;
    padding: 0;
    stroke-linecap: square;
}

.mvi-circle-progress-tip {
    display: inline-block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
    width: 100%;
    font-size: @font-size-default;
    color: @font-color-sub;
    line-height: 1.5;
    text-align: center;
    z-index: 10;
}
</style>
