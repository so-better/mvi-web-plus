<script setup name="m-steps" lang="ts">
import { DefineComponent, getCurrentInstance, provide, ref } from 'vue'
import { StepsProps } from './props'

//实例
const instance = getCurrentInstance()!

provide('steps', instance)

//属性
defineProps(StepsProps)

//存放step组件的数组
const children = ref<DefineComponent[]>([])

defineExpose({
	children
})
</script>

<template>
	<div class="mvi-steps" :class="{ vertical: vertical }">
		<slot></slot>
	</div>
</template>

<style scoped src="./steps.less"></style>
