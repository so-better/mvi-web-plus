<script setup name="m-circle-progress" lang="ts">
import Dap from 'dap-util'
import { CircleProgressProps } from './props'
import { computed, ref } from 'vue';

//属性
const props = defineProps(CircleProgressProps)

const pathSize = ref<number>(1000)

const progressStyle = computed<any>(() => {
    let style: any = {}
    if (props.size) {
        style.width = props.size + 'rem'
        style.height = props.size + 'rem'
    }
    return style
})
const viewBox = computed<string>(() => {
    let width = Dap.element.rem2px(props.strokeWidth)
    return `0 0 ${pathSize.value + 2 * width} ${pathSize.value + 2 * width}`
})
const pathD = computed<string>(() => {
    let width = Dap.element.rem2px(props.strokeWidth)
    return `M ${pathSize.value / 2 + width} ${pathSize.value / 2 + width} m 0, -${pathSize.value / 2} a ${pathSize.value / 2}, ${pathSize.value / 2} 0 1, ${props.clockWise ? 1 : 0} 0, ${pathSize.value} a ${pathSize.value / 2}, ${pathSize.value / 2} 0 1, ${props.clockWise ? 1 : 0} 0, -${pathSize.value}`
})
const cmpValue = computed<string>(() => {
    if (props.tipText) {
        return props.tipText
    } else {
        let value = props.value > props.max ? props.max : props.value < props.min ? props.min : props.value
        return Math.round(((value - props.min) / (props.max - props.min)) * 100) + '%'
    }
})
const barStyle = computed<any>(() => {
    let style: any = {}
    if (props.fill) {
        style.fill = props.fill
    }
    if (props.color) {
        style.stroke = props.color
    }
    if (Dap.number.isNumber(props.strokeWidth)) {
        style.strokeWidth = props.strokeWidth + 'rem'
    }
    if (props.round) {
        style.strokeLinecap = 'round'
    }
    if (props.animation) {
        style.transition = 'stroke-dasharray ' + props.timeout + 'ms'
    }
    //计算进度
    let circleLength = Number((pathSize.value * Math.PI).toFixed(2)) //圆周长
    let value = props.value > props.max ? props.max : props.value < props.min ? props.min : props.value
    let valueLength = Number((((value - props.min) / (props.max - props.min)) * circleLength).toFixed(2)) //进度长度
    style.strokeDasharray = valueLength + ',' + (circleLength - valueLength)
    return style
})
const trackStyle = computed<any>(() => {
    let style: any = {}
    if (props.fill) {
        style.fill = props.fill
    }
    if (props.trackColor) {
        style.stroke = props.trackColor
    }
    if (Dap.number.isNumber(props.strokeWidth)) {
        style.strokeWidth = props.strokeWidth + 'rem'
    }
    return style
})
</script>

<template>
    <div class="mvi-circle-progress" :style="progressStyle">
        <svg :viewBox="viewBox">
            <path :d="pathD" :style="trackStyle" class="mvi-circle-progress-track"></path>
            <path :d="pathD" :style="barStyle" class="mvi-circle-progress-bar"></path>
        </svg>
        <div v-if="showTip" class="mvi-circle-progress-tip">
            <slot v-if="$slots.tip" name="tip" :value="value"></slot>
            <span v-else v-text="cmpValue"></span>
        </div>
    </div>
</template>

<style scoped src="./circle-progress.less"></style>
