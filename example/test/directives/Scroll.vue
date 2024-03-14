<template>
	<div v-scroll="scrollOpt" class="mvi-p-2" style="height: 100%; overflow: auto">
		<m-divider>请下滑页面到底部</m-divider>
		<div style="height: 2000px"></div>
		<m-divider>请上滑页面到顶部</m-divider>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const scrollOpt = ref({
	top: (el: HTMLElement) => {
		console.log('已经到达顶部', el)
	},
	bottom: (el: HTMLElement) => {
		console.log('已经到达底部', el)
	}
})
</script>
<style lang="less" scoped></style>
