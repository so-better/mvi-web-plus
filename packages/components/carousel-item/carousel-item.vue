<template>
	<transition v-if="carousel!.props.mode=='fade'" name="carousel-fade">
		<div v-show="carousel!.props.modelValue == itemIndex" class="mvi-carousel-item fade" :style="carouselItemStyle">
			<slot></slot>
		</div>
	</transition>
	<div v-else-if="carousel!.props.mode == 'slide'" class="mvi-carousel-item" :style="carouselItemStyle">
		<slot></slot>
	</div>
</template>
<script setup lang="ts">
import { ComponentInternalInstance, Ref, computed, getCurrentInstance, inject, onBeforeUnmount } from 'vue'
import { parentIsMatch } from '../../utils'

defineOptions({
	name: 'm-carousel-item',
	inheritAttrs: false
})

//获取实例
const instance = getCurrentInstance()!

const carousel = inject<ComponentInternalInstance | null>('carousel', null)
const carouselItemChildren = inject<Ref<ComponentInternalInstance[]> | null>('carouselItemChildren', null)

parentIsMatch(carouselItemChildren, carousel, 'm-carousel', ['Carousel', 'CarouselItem'])

//加入到Carousel的children去
carouselItemChildren!.value.push(instance)

const carouselItemStyle = computed<any>(() => {
	const style: any = {}
	if (carousel!.props.mode == 'fade') {
		style.transition = `opacity ${carousel!.props.speed}ms linear`
	}
	if (carousel!.props.mode == 'slide') {
		if (carousel!.props.vertical) {
			style.height = `calc(100% / ${carouselItemChildren!.value.length})`
		} else {
			style.width = `calc(100% / ${carouselItemChildren!.value.length})`
		}
	}
	return style
})

const itemIndex = computed<number>(() => {
	return carouselItemChildren!.value.findIndex(vm => {
		return vm.uid == instance.uid
	})
})

onBeforeUnmount(() => {
	if (carouselItemChildren && carouselItemChildren.value) {
		carouselItemChildren.value.splice(itemIndex.value, 1)
	}
})
</script>
<style scoped src="./carousel-item.less"></style>
