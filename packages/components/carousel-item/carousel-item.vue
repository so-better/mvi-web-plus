<template>
	<div class="mvi-carousel-item">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { ComponentInternalInstance, getCurrentInstance, inject, ref } from 'vue'
import { parentIsMatch } from '../../utils'

defineOptions({
	name: 'm-carousel-item',
	inheritAttrs: false
})

//获取实例
const instance = getCurrentInstance()!

const carousel = inject<ComponentInternalInstance | null>('carousel', null)

parentIsMatch(ref([]), carousel, 'm-carousel', ['Carousel', 'CarouselItem'])

//属性
const props = defineProps()
</script>
<style scoped src="./carousel-item.less"></style>
