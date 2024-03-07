<script setup name="m-collapse" lang="ts">
import { DefineComponent, ref } from 'vue'
import { CollapseProps } from './props'

//属性
defineProps(CollapseProps)

//事件
defineEmits(['update:modelValue', 'before-slide-down', 'slide-down', 'before-slide-up', 'slide-up'])

//存放collapse-item组件的数组
const children = ref<DefineComponent[]>([])

defineExpose({
	children
})
</script>

<template>
	<div class="mvi-collapse">
		<slot></slot>
	</div>
</template>

<style scoped src="./collapse.less"></style>
