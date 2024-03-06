<script setup name="m-switch" lang="ts">
import { computed } from 'vue';
import { Icon } from '../icon'
import { SwitchProps } from "./props"

//属性
const props = defineProps(SwitchProps)

//事件
const emits = defineEmits(['update:modelValue', 'change'])

const switchStyle = computed<any>(() => {
    let style: any = {}
    if (props.inactiveColor && !props.modelValue) {
        style.backgroundColor = props.inactiveColor
    }
    if (props.activeColor && props.modelValue) {
        style.backgroundColor = props.activeColor
    }
    if (props.size) {
        style.width = `calc(${props.size} * 2)`
    }
    return style
})
const elStyle = computed<any>(() => {
    let style: any = {}
    if (props.activeColor) {
        style.color = props.activeColor
    }
    if (props.size) {
        style.width = props.size
        style.height = props.size
        style.fontSize = props.size
    }
    return style
})

//更改状态
const change = (event: Event) => {
    let check = (<HTMLInputElement>(event.target)).checked
    emits('update:modelValue', check)
    emits('change', check)
}


</script>

<template>
    <label class="mvi-switch" :class="{ checked: modelValue }" :style="switchStyle" :disabled="disabled || null">
        <span class="mvi-switch-el" :class="{ checked: modelValue }" :style="elStyle">
            <Icon v-if="loading && !disabled" type="load-e" spin size="0.8em" />
        </span>
        <input @change="change" type="checkbox" :checked="modelValue" :disabled="disabled || loading" />
    </label>
</template>

<style scoped src="./switch.less"></style>
