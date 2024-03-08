<template>
	<div class="mvi-form" :class="{ block: block }" :style="{ width: block && width ? width : '' }">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { getCurrentInstance, provide } from 'vue'
import { FormProps } from './props'

defineOptions({
	name: 'm-form'
})

//实例
const instance = getCurrentInstance()!

provide('form', instance)

defineProps(FormProps)
</script>
<style scoped src="./form.less"></style>
