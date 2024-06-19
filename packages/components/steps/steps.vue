<template>
	<div class="mvi-steps" :class="{ vertical: vertical }">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { ComponentInternalInstance, getCurrentInstance, provide, ref } from 'vue'
import { componentIsMatch } from '@/utils'
import { StepsProps } from './props'

defineOptions({
	name: 'm-steps'
})

//实例
const instance = getCurrentInstance()!

//插槽内容是否匹配判定
componentIsMatch(instance, 'm-step', ['Steps', 'Step'])

//属性
defineProps(StepsProps)

//存放step组件的数组
const children = ref<ComponentInternalInstance[]>([])

provide('steps', instance)
provide('stepChildren', children)
</script>
<style scoped src="./steps.less"></style>
