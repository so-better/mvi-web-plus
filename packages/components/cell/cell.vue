<script setup name="m-cell" lang="ts">
import Dap from 'dap-util'
import { Icon } from '../icon'
import CellProps from './props'
import { computed, getCurrentInstance } from 'vue'

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(CellProps)

const parseIcon = computed<(params: any) => any>(() => {
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
const cmpActive = computed<boolean>(() => {
    if (typeof props.active == 'boolean') {
        return props.active
    }
    if (instance.parent!.type.name == 'm-cell-group' && typeof (<any>instance.parent!.proxy).active == 'boolean') {
        return (<any>instance.parent!.proxy).active
    }
    return true
})
const cmpBorder = computed<boolean>(() => {
    if (typeof props.border == 'boolean') {
        return props.border
    }
    if (instance.parent!.type.name == 'm-cell-group' && typeof (<any>instance.parent!.proxy).border == 'boolean') {
        return (<any>instance.parent!.proxy).border
    }
    return false
})
const labelTextStyle = computed(() => {
    let style: any = {}
    //如果ellipsis不是false
    if (props.ellipsis) {
        style.display = '-webkit-box'
        style.textOverflow = 'ellipsis'
        style.webkitBoxOrient = 'vertical'
        style.overflow = 'hidden'
        if (typeof props.ellipsis == 'boolean') {
            style.webkitLineClamp = 3
        } else {
            style.webkitLineClamp = props.ellipsis
        }
    }
    return style
})
</script>

<template>
    <div class="mvi-cell" :class="{ border: cmpBorder, active: cmpActive }">
        <div class="mvi-cell-item">
            <Icon class="mvi-cell-icon" v-if="parseIcon(icon).type || parseIcon(icon).url" :type="parseIcon(icon).type"
                :url="parseIcon(icon).url" :spin="parseIcon(icon).spin" :size="parseIcon(icon).size"
                :color="parseIcon(icon).color" />
            <div class="mvi-cell-title" :class="{ nowrap: noWrap }">
                <slot name="title" v-if="$slots.title"></slot>
                <span v-else v-text="title"></span>
            </div>
            <div class="mvi-cell-content" :class="{ nowrap: noWrap }" v-if="$slots.content || content">
                <slot name="content" v-if="$slots.content"></slot>
                <span v-else-if="content" v-text="content"></span>
            </div>
            <Icon class="mvi-cell-arrow" v-if="parseIcon(arrow).type || parseIcon(arrow).url"
                :type="parseIcon(arrow).type" :url="parseIcon(arrow).url" :spin="parseIcon(arrow).spin"
                :size="parseIcon(arrow).size" :color="parseIcon(arrow).color" />
        </div>
        <div class="mvi-cell-label" v-if="label || $slots.label" :style="labelTextStyle">
            <slot name="label" v-if="$slots.label"></slot>
            <span v-text="label" v-else-if="label"></span>
        </div>
    </div>
</template>

<style scoped src="./cell.less"></style>
