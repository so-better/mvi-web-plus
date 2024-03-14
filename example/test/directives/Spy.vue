<template>
	<div>
		<m-divider>请滚动页面</m-divider>
		<div style="height: 1000px"></div>
		<m-button v-spy="spyOpt" block type="primary" size="large" square>我是被侦听的元素</m-button>
		<div style="height: 1000px"></div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const spyOpt = ref({
	el: '.body',
	beforeEnter: (el: HTMLElement) => {
		console.log('元素开始进入视图', el)
	},
	enter: (el: HTMLElement) => {
		console.log('元素完全进入视图', el)
	},
	beforeLeave: (el: HTMLElement) => {
		console.log('元素开始离开视图', el)
	},
	leave: (el: HTMLElement) => {
		console.log('元素完全离开视图', el)
	}
})
</script>
<style lang="less" scoped></style>
