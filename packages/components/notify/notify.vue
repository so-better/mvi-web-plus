<script setup name="m-notify" lang="ts">
import Dap from 'dap-util'
import { Icon } from '../icon'
import NotifyProps from './props'
import { computed, getCurrentInstance, onMounted, ref } from 'vue';

//实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(NotifyProps)

//计时器
const timer = ref<any>(null)
//是否显示
const show = ref<boolean>(false)

//类型
const cmpType = computed<string>(() => {
    let arr = ['success', 'info', 'primary', 'error', 'warn']
    if (arr.includes(props.type)) {
        return props.type
    }
    return 'success'
})
//消息文本
const cmpMessage = computed<string>(() => {
    if (typeof props.message == 'string') {
        return props.message
    }
    if (Dap.common.isObject(props.message)) {
        return JSON.stringify(props.message)
    }
    return String(props.message)
})
//自定义文字颜色
const cmpColor = computed<string | null>(() => {
    if (typeof props.color == 'string') {
        return props.color
    }
    return null
})
//自定义背景色
const cmpBackground = computed<string | null>(() => {
    if (typeof props.background == 'string') {
        return props.background
    }
    return null
})
//自定义zIndex         
const cmpZIndex = computed<number>(() => {
    if (Dap.number.isNumber(props.zIndex)) {
        return props.zIndex
    }
    return 1100
})
//自动关闭时间
const cmpTimeout = computed<number>(() => {
    if (Dap.number.isNumber(props.timeout)) {
        return props.timeout
    }
    return 1500
})
//转换图标
const parseIcon = computed<any>(() => {
    return (params: any) => {
        let icon: any = {
            spin: false,
            type: null,
            url: null,
            color: null,
            size: null
        }
        if (Dap.common.isObject(params)) {
            if (typeof params.spin == 'boolean') {
                icon.spin = params.spin
            }
            if (typeof params.type == 'string') {
                icon.type = params.type
            }
            if (typeof params.url == 'string') {
                icon.url = params.url
            }
            if (typeof params.color == 'string') {
                icon.color = params.color
            }
            if (typeof params.size == 'string') {
                icon.size = params.size
            }
        } else if (typeof params == 'string') {
            icon.type = params
        }
        return icon
    }
})
//通知样式
const notifyStyle = computed<any>(() => {
    let style: any = {
        zIndex: cmpZIndex.value
    }
    if (cmpBackground.value) {
        style.backgroundColor = cmpBackground.value
    }
    if (cmpColor.value) {
        style.color = cmpColor.value
    }
    return style
})

//清除计时器
const clearTimer = () => {
    if (timer.value) {
        clearTimeout(timer.value)
        timer.value = null
    }
}
//完全显示后
const afterEnter = () => {
    if (cmpTimeout.value > 0) {
        timer.value = setTimeout(() => {
            show.value = false
        }, cmpTimeout.value)
    }
}
//完全隐藏后
const afterLeave = () => {
    clearTimer()
    props.__remove()
}

onMounted(() => {
    show.value = true
    props.__init(instance)
})


defineExpose({
    show
})

</script>

<template>
    <teleport to="body">
        <transition name="mvi-notify" @after-leave="afterLeave" @after-enter="afterEnter">
            <div v-show="show" class="mvi-notify" :class="[cmpType]" :style="notifyStyle">
                <div class="mvi-notify-content">
                    <Icon v-if="parseIcon(icon).type || parseIcon(icon).url" :type="parseIcon(icon).type"
                        :url="parseIcon(icon).url" :spin="parseIcon(icon).spin" :size="parseIcon(icon).size"
                        :color="parseIcon(icon).color" />
                    <span v-text="cmpMessage"></span>
                </div>
            </div>
        </transition>
    </teleport>
</template>

<style scoped src="./notify.less"></style>
