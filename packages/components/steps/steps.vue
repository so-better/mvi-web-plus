<template>
	<div class="mvi-steps" :class="{ vertical: vertical }">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { ComponentInternalInstance, getCurrentInstance, provide, ref } from 'vue'
import { StepsProps } from './props'

defineOptions({
	name: 'm-steps'
})

//实例
const instance = getCurrentInstance()!

provide('steps', instance)

//属性
defineProps(StepsProps)

//存放step组件的数组
const children = ref<ComponentInternalInstance[]>([])

defineExpose({
	children
})
</script>
<style scoped src="./steps.less"></style>
