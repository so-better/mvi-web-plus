<template>
	<div>
		<div v-drag="dragOpt" class="drag mvi-bg-primary"></div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const dragOpt = ref({
	container: '.body',
	mode: 'in',
	draggableX: true,
	draggableY: true,
	cursor: true,
	beforeDrag: (el: HTMLElement, root: HTMLElement, placement: any) => {
		console.log('开始拖拽')
		console.log('拖拽的元素', el)
		console.log('容器元素', root)
		console.log('元素在容器内的位置', placement)
		console.log('--------------------------')
	},
	drag: (el: HTMLElement, root: HTMLElement, placement: any) => {
		console.log('正在拖拽')
		console.log('拖拽的元素', el)
		console.log('容器元素', root)
		console.log('元素在容器内的位置', placement)
		console.log('--------------------------')
	},
	dragged: (el: HTMLElement, root: HTMLElement, placement: any) => {
		console.log('拖拽完成')
		console.log('拖拽的元素', el)
		console.log('容器元素', root)
		console.log('元素在容器内的位置', placement)
		console.log('--------------------------')
	},
	ready: (instance: any) => {
		console.log('准备完成')
		console.log('拖拽实例对象', instance)
		console.log('--------------------------')
	}
})
</script>
<style lang="less" scoped>
.drag {
	display: block;
	position: absolute;
	left: 10%;
	top: 10%;
	width: 2rem;
	height: 2rem;
	border: 1px solid #0d6b9a;
	border-radius: 0.04rem;
}
</style>
