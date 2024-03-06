<script setup name="m-collapse" lang="ts">
import { DefineComponent, reactive } from 'vue'
import { CollapseProps } from './props'

//属性
const props = defineProps(CollapseProps)

//事件
const emits = defineEmits(['update:modelValue', 'before-slide-down', 'slide-down', 'before-slide-up', 'slide-up'])

//存放collapse-item组件的数组
const children = reactive<DefineComponent[]>([])

defineExpose({
    children,
    props,
    emits
})

</script>

<template>
    <div class="mvi-collapse">
        <slot></slot>
    </div>
</template>

<style scoped src="./collapse.less"></style>
