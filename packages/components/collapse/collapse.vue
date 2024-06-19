<template>
	<div class="mvi-collapse">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { componentIsMatch } from '@/utils'
import { ComponentInternalInstance, getCurrentInstance, provide, ref } from 'vue'
import { CollapseProps } from './props'

defineOptions({
	name: 'm-collapse'
})

//实例
const instance = getCurrentInstance()!

//插槽内容是否匹配判定
componentIsMatch(instance, 'm-collapse-item', ['Collapse', 'CollapseItem'])

//属性
defineProps(CollapseProps)

//事件
defineEmits(['update:modelValue', 'change', 'before-slide-down', 'slide-down', 'before-slide-up', 'slide-up'])

//存放CollapseItem组件的数组
const children = ref<ComponentInternalInstance[]>([])

//提供给CollapseItem组件使用
provide('collapse', instance)
//提供children属性给CollapseItem组件
provide('collapseItemChildren', children)
</script>

<style scoped src="./collapse.less"></style>
