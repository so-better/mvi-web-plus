<script setup name="m-swiper-slide" lang="ts">
import { ComponentInternalInstance, computed, getCurrentInstance, inject, onMounted } from 'vue'
import Dap from 'dap-util'

//获取实例
const instance = getCurrentInstance()!

//获取Swiper组件
const swiper = inject<ComponentInternalInstance | null>('swiper', null)

if (!swiper || swiper.type.name != 'm-swiper') {
	throw new Error(`The component 'SwiperSlide' must be used as a subcomponent of the component 'Swiper'`)
}

const slideStyle = computed<any>(() => {
	let style: any = {}
	if (swiper.props.vertical) {
		style.width = '100%'
		style.height = swiper.props.fade ? '100%' : 'calc(100% * ' + 1 / swiper.exposed!.children.value.length + ')'
	} else {
		//横向
		style.height = '100%'
		style.width = swiper.props.fade ? '100%' : 'calc(100% * ' + 1 / swiper.exposed!.children.value.length + ')'
	}
	return style
})
//slide在swiper中的序列值
const slideIndex = computed<number>(() => {
	return swiper.exposed!.children.findIndex((vm: ComponentInternalInstance) => {
		return Dap.common.equal(vm.uid, instance.uid)
	})
})

const addTransition = (el: Element) => {
	if (swiper.exposed!.useOpacity) {
		;(<HTMLElement>el).style.transition = 'opacity ' + swiper.props.speed + 'ms'
	} else {
		;(<HTMLElement>el).style.transition = ''
	}
}
const removeTransition = (el: Element) => {
	if (swiper.exposed!.useOpacity) {
		;(<HTMLElement>el).style.transition = ''
	} else {
		swiper.exposeProxy!.useOpacity = true
	}
}

onMounted(() => {
	//将SwiperSlide加入到Swiper的children数组中
	swiper.exposed!.children.value.push(instance.proxy!.$el)
})
</script>

<template>
	<transition v-if="swiper.props.fade" name="mvi-swiper-slide" @before-enter="addTransition" @after-enter="removeTransition" @before-leave="addTransition" @after-leave="removeTransition">
		<div v-show="swiper.exposed!.fadeActiveIndex == slideIndex" class="mvi-swiper-slide-fade" :style="slideStyle">
			<slot></slot>
		</div>
	</transition>
	<div v-else class="mvi-swiper-slide" :style="slideStyle">
		<slot></slot>
	</div>
</template>

<style scoped src="./swiper-slide.less"></style>
