<script setup name="m-loading-bar" lang="ts">
import Dap from 'dap-util'
import { computed, getCurrentInstance, onBeforeUnmount, onMounted, ref } from 'vue'
import { LoadingBarProps } from './props'

//获取实例
const instance = getCurrentInstance()!
//属性
const props = defineProps(LoadingBarProps)

//透明度变化时间
const opacityTime = ref<number>(300)
//进场时宽度变化时间
const widthEnterTime = ref<number>(4000)
//离开时宽度变化时间
const widthLeaveTime = ref<number>(2000)
//离开计时器
const timer = ref<any>(null)
//是否已经触发离开
const hasTriggerLeave = ref<boolean>(false)
//bar元素
const barRef = ref<HTMLElement | null>(null)

const cmpColor = computed<string | null>(() => {
    if (typeof props.color == 'string' && props.color) {
        return props.color
    }
    return null
})
const cmpZIndex = computed<number | null>(() => {
    if (Dap.number.isNumber(props.zIndex)) {
        return props.zIndex
    }
    return null
})
const barStyle = computed<any>(() => {
    let style: any = {}
    if (cmpColor) {
        style.background = cmpColor.value
    }
    if (cmpZIndex) {
        style.zIndex = cmpZIndex.value
    }
    return style
})

//添加动画
const addTransition = (type: string) => {
    //进入动画
    if (type == 'enter') {
        barRef.value!.style.transition = `opacity ${opacityTime.value}ms linear, width ${widthEnterTime.value}ms ease-out`
    } else if (type == 'leave') {
        barRef.value!.style.transition = `opacity ${opacityTime.value}ms ${widthLeaveTime.value}ms linear, width ${widthLeaveTime.value}ms ease`
    }
    //单纯触发浏览器重绘
    barRef.value!.offsetWidth
}

//移除动画
const removeTransition = () => {
    barRef.value!.style.transition = ''
    //单纯触发浏览器重绘
    barRef.value!.offsetWidth
}

//进入
const enter = () => {
    removeTransition()
    barRef.value!.style.width = '0'
    addTransition('enter')
    barRef.value!.style.width = window.innerWidth * 0.9 + 'px'
    barRef.value!.style.opacity = '1'
}

//离开
const leave = () => {
    if (hasTriggerLeave.value) {
        return
    }
    hasTriggerLeave.value = true
    addTransition('leave')
    barRef.value!.style.width = window.innerWidth + 'px'
    barRef.value!.style.opacity = '0'
    timer.value = setTimeout(() => {
        //执行移除方法
        props.__remove()
    }, widthLeaveTime.value + opacityTime.value)
}

onMounted(() => {
    props.__init(instance)
    enter()
})

onBeforeUnmount(() => {
    if (timer.value) {
        clearTimeout(timer.value)
        timer.value = null
    }
})

defineExpose({
    leave
})
</script>

<template>
    <teleport to="body">
        <div class="mvi-loading-bar" ref="barRef" :style="barStyle"></div>
    </teleport>
</template>

<style scoped src="./loading-bar.less"></style>
