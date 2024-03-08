<template>
	<div class="m-carousel"></div>
</template>
<script setup lang="ts">
import { CarouselProps } from './props'

defineOptions({
	name: 'm-carousel'
})

//属性
defineProps(CarouselProps)

//事件
const emits = defineEmits(['update:modelValue'])
</script>
<style scoped src="./carousel.less"></style>
