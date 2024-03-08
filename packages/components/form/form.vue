<script setup name="m-form" lang="ts">
import { getCurrentInstance, provide } from 'vue'
import { FormProps } from './props'

//实例
const instance = getCurrentInstance()!

provide('form', instance)

defineProps(FormProps)
</script>

<template>
	<div class="mvi-form" :class="{ block: block }" :style="{ width: block && width ? width : '' }">
		<slot></slot>
	</div>
</template>

<style scoped src="./form.less"></style>
