<template>
	<div :class="['mvi-cell-group', border ? 'border' : '']">
		<div class="mvi-cell-group-title" v-text="title" v-if="title"></div>
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { getCurrentInstance, provide } from 'vue'
import { CellGroupProps } from './props'

defineOptions({
	name: 'm-cell-group'
})

//实例
const instance = getCurrentInstance()!

//提供给cell组件
provide('cellGroup', instance)

defineProps(CellGroupProps)
</script>
<style scoped src="./cell-group.less"></style>
