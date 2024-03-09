<template>
	<div class="m-carousel"></div>
</template>
<script setup lang="ts">
import { getCurrentInstance, h } from 'vue'
import { CarouselProps } from './props'

defineOptions({
	name: 'm-carousel'
})

//获取实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(CarouselProps)

//事件
const emits = defineEmits(['update:modelValue'])
</script>
<style scoped src="./carousel.less"></style>
