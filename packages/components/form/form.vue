<template>
	<div class="mvi-form" :class="{ block: block }" :style="{ width: block && width ? width : '' }">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { getCurrentInstance, provide } from 'vue'
import { componentIsMatch } from '@/utils'
import { FormProps } from './props'

defineOptions({
	name: 'm-form'
})

//实例
const instance = getCurrentInstance()!
//插槽内容是否匹配判定
componentIsMatch(instance, 'm-form-el', ['Form', 'FormEl'])

provide('form', instance)

defineProps(FormProps)
</script>
<style scoped src="./form.less"></style>
