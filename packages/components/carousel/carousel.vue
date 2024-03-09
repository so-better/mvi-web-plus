<template>
	<div class="mvi-carousel">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { getCurrentInstance, provide } from 'vue'
import { CarouselProps } from './props'
import { componentIsMatch } from '../../utils'

defineOptions({
	name: 'm-carousel'
})

//获取实例
const instance = getCurrentInstance()!

//插槽内容是否匹配判定
componentIsMatch(instance, 'm-carousel-item', ['Carousel', 'CarouselItem'])

provide('carousel', instance)

//属性
const props = defineProps(CarouselProps)

//事件
const emits = defineEmits(['update:modelValue'])
</script>
<style scoped src="./carousel.less"></style>
