<script setup name="m-cell-group" lang="ts">
import { getCurrentInstance, provide } from 'vue'
import { CellGroupProps } from './props'

//实例
const instance = getCurrentInstance()!

defineProps(CellGroupProps)

provide('cellGroup', instance)
</script>

<template>
	<div :class="['mvi-cell-group', border ? 'border' : '']">
		<div class="mvi-cell-group-title" v-text="title" v-if="title"></div>
		<slot></slot>
	</div>
</template>

<style scoped src="./cell-group.less"></style>
