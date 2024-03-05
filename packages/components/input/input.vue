<script setup name="m-input" lang="ts">
import Dap from 'dap-util'
import { Icon } from '../icon'
import InputProps from './prop'
import { computed, nextTick, onMounted, ref, useSlots, watch } from 'vue'

//属性
const props = defineProps(InputProps)
//事件
const emits = defineEmits(['update:modelValue', 'left-click', 'right-click', 'focus', 'blur', 'input', 'clear', 'keydown', 'keyup'])

//输入框或者文本域是否获取焦点
const focus = ref(false)
//文本域的元素
const textareaRef = ref<HTMLElement | null>(null)
//输入框元素
const inputRef = ref<HTMLElement | null>(null)

//输入框样式类
const inputClass = computed<string[]>(() => {
    let cls = [props.size]
    if (props.border) {
        cls.push('border')
    }
    if (props.showWordLimit && props.maxlength > 0) {
        cls.push('words')
    }
    if (props.required) {
        cls.push('required')
    }
    return cls
})
//输入框的值
const realValue = computed<string>({
    set: value => {
        if (props.modelValue !== value) {
            emits('update:modelValue', value)
        }
    },
    get: () => {
        let value = props.modelValue === null ? '' : props.modelValue.toString()
        //数字类型会过滤非数字字符
        if (props.type == 'number') {
            value = value.replace(/\D/g, '')
        }
        //如果设置了maxlength，则进行字符串截取
        if (props.maxlength > 0 && value.length > props.maxlength) {
            value = value.substring(0, props.maxlength)
        }
        if (props.modelValue !== value) {
            emits('update:modelValue', value)
        }
        return value
    }
})
//是否显示清除图标
const showClear = computed<boolean>(() => {
    if (props.disabled || props.readonly) {
        return false
    }
    if (realValue && focus.value) {
        return true
    }
    return false
})
//图标转换
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
//输入框的type值
const cmpType = computed<string>(() => {
    if (props.type == 'number') {
        return 'text'
    }
    return props.type
})
//文本域的rows
const rowsFilter = computed<number>(() => {
    let rows = props.rows
    if (Dap.common.isObject(props.autosize)) {
        if (Dap.number.isNumber((<any>props.autosize).minRows)) {
            if (props.rows < (<any>props.autosize).minRows) {
                rows = (<any>props.autosize).minRows
            }
        }
        if (Dap.number.isNumber((<any>props.autosize).maxRows)) {
            if (props.rows > (<any>props.autosize).maxRows) {
                rows = (<any>props.autosize).maxRows
            }
        }
    }
    return rows
})
//label的样式
const labelStyle = computed<any>(() => {
    let style: any = {}
    if (props.labelWidth) {
        style.width = props.labelWidth
    }
    if (props.labelAlign) {
        if (props.labelAlign == 'left') {
            style.justifyContent = 'flex-start'
        } else if (props.labelAlign == 'right') {
            style.justifyContent = 'flex-end'
        } else {
            style.justifyContent = props.labelAlign
        }
    }
    if (props.labelOffset) {
        style.marginRight = props.labelOffset
    }
    return style
})
//输入框样式
const inputStyle = computed<any>(() => {
    return {
        textAlign: props.align ? props.align : ''
    }
})
//显示左侧图标
const showLeft = computed<boolean>(() => {
    return useSlots().left || parseIcon.value(props.left).type || parseIcon.value(props.left).url
})
//显示右侧图标
const showRight = computed<boolean>(() => {
    return useSlots().right || parseIcon.value(props.right).type || parseIcon.value(props.right).url
})

//高度自适应方法
const autosizeSet = () => {
    textareaRef.value!.style.height = 'auto'
    textareaRef.value!.scrollTop = 0
    textareaRef.value!.style.height = Dap.element.getScrollHeight(textareaRef.value!) + 'px'
}
//行数转为高度
const rows2Height = (rows: number) => {
    let lineHeight = Math.floor(parseFloat(Dap.element.getCssStyle(textareaRef.value!, 'line-height')))
    return rows * lineHeight
}
//设置最大高度和最小高度
const setMaxMinHeight = () => {
    if (Dap.common.isObject(props.autosize)) {
        if (Dap.number.isNumber((<any>props.autosize).maxRows)) {
            let maxHeight = rows2Height((<any>props.autosize).maxRows)
            textareaRef.value!.style.maxHeight = maxHeight + 'px'
        }
        if (Dap.number.isNumber((<any>props.autosize).minRows)) {
            let minHeight = rows2Height((<any>props.autosize).minRows)
            textareaRef.value!.style.minHeight = minHeight + 'px'
        }
    } else {
        textareaRef.value!.style.maxHeight = ''
        textareaRef.value!.style.minHeight = ''
    }
}
//输入框键盘按下
const keydown = (e: Event) => {
    if (props.disabled) {
        return
    }
    emits('keydown', e, realValue.value)
}
//输入框键盘松开
const keyup = (e: Event) => {
    if (props.disabled) {
        return
    }
    emits('keyup', e, realValue.value)
}
//输入框获取焦点
const inputFocus = () => {
    if (props.disabled) {
        return
    }
    focus.value = true
    emits('focus', realValue.value)
}
//输入框失去焦点
const inputBlur = () => {
    if (props.disabled) {
        return
    }
    setTimeout(() => {
        focus.value = false
        emits('blur', realValue.value)
    }, 200)
}
//输入框监听
const input = () => {
    if (props.disabled) {
        return
    }
    emits('input', realValue.value)
}
//左侧图标点击
const leftClick = () => {
    if (props.disabled) {
        return
    }
    emits('left-click', realValue.value)
}
//右侧图标点击
const rightClick = () => {
    if (props.disabled) {
        return
    }
    emits('right-click', realValue.value)
}
//清除输入框
const doClear = () => {
    if (props.disabled) {
        return
    }
    if (!props.clearable) {
        return
    }
    setTimeout(() => {
        realValue.value = ''
        let el = inputRef.value || textareaRef.value
        el!.focus()
        emits('clear', realValue.value)
    }, 210)
}

onMounted(() => {
    if (textareaRef.value) {
        setMaxMinHeight()
        if (props.autosize == true || Dap.common.isObject(props.autosize)) {
            autosizeSet()
        }
    }
})

watch(
    () => realValue.value,
    () => {
        if (textareaRef.value && (props.autosize == true || Dap.common.isObject(props.autosize))) {
            autosizeSet()
        }
    }
)
watch(
    () => [props.autosize, props.rows],
    () => {
        if (textareaRef.value) {
            setMaxMinHeight()
        }
    }
)
watch(
    () => showClear.value,
    () => {
        nextTick(() => {
            if (textareaRef.value && (props.autosize == true || Dap.common.isObject(props.autosize))) {
                autosizeSet()
            }
        })
    }
)
</script>

<template>
    <div :disabled="disabled || null" class="mvi-input-container" :class="inputClass" :data-type="type">
        <!-- 左侧图标 -->
        <div @click="leftClick" class="mvi-input-left" v-if="showLeft">
            <slot name="left" v-if="$slots.left"></slot>
            <Icon v-else :type="parseIcon(left).type" :url="parseIcon(left).url" :spin="parseIcon(left).spin"
                :size="parseIcon(left).size" :color="parseIcon(left).color" />
        </div>
        <!-- 左侧文本 -->
        <div class="mvi-input-label" v-if="label" :style="labelStyle"><span v-text="label"></span></div>
        <!-- 文本域 -->
        <textarea v-if="type == 'textarea'" :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled"
            :readonly="readonly" :autofocus="autofocus" class="mvi-textarea" v-model="realValue" @input="input"
            ref="textareaRef" :rows="rowsFilter" :name="name" :style="inputStyle" @focus="inputFocus" @blur="inputBlur"
            autocomplete="off" @keydown="keydown" @keyup="keyup"></textarea>
        <!-- 输入框 -->
        <input v-else :type="cmpType"
            :inputmode="<'text' | 'tel' | 'none' | 'decimal' | 'numeric' | 'search' | 'email' | 'url' | undefined>inputMode"
            :placeholder="placeholder" :maxlength="maxlength" :disabled="disabled" :readonly="readonly"
            :autofocus="autofocus" class="mvi-input" v-model="realValue" @input="input" ref="inputRef" :name="name"
            :style="inputStyle" @focus="inputFocus" @blur="inputBlur" autocomplete="off" @keydown="keydown"
            @keyup="keyup" />
        <!-- 清除图标 -->
        <div @click="doClear" class="mvi-input-clear" v-if="clearable" v-show="showClear">
            <Icon type="times-o" />
        </div>
        <!-- 右侧图标 -->
        <div @click="rightClick" class="mvi-input-right" v-if="showRight">
            <slot name="right" v-if="$slots.right"></slot>
            <Icon v-else :type="parseIcon(right).type" :url="parseIcon(right).url" :spin="parseIcon(right).spin"
                :size="parseIcon(right).size" :color="parseIcon(right).color" />
        </div>
        <!-- 显示文字长度限制 -->
        <div v-if="showWordLimit && maxlength > 0" class="mvi-input-words">{{ realValue.length }}/{{ maxlength }}</div>
    </div>
</template>

<style scoped src="./input.less"></style>
