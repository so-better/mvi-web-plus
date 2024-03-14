<template>
	<div>
		<div v-resize="resizeOpt" class="resize mvi-bg-primary"></div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const resizeOpt = ref({
	draggableX: true,
	draggableY: true,
	mode: {
		left: true,
		top: true,
		right: true,
		bottom: true
	},
	range: 0.1,
	beforeResize: (data: any) => {
		console.log('beforeResize', data)
		console.log('--------------------------')
	},
	resize: (data: any) => {
		console.log('resize', data)
		console.log('--------------------------')
	},
	trigger: (data: any) => {
		console.log('trigger', data)
		console.log('--------------------------')
	},
	end: (data: any) => {
		console.log('end', data)
		console.log('--------------------------')
	},
	ready: (instance: any) => {
		console.log('ready', instance)
		console.log('--------------------------')
	}
})
</script>
<style lang="less" scoped>
.resize {
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
