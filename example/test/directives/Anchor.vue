<template>
	<div>
		<m-button type="info" block v-anchor="anchorOpt">点我进行锚点定位</m-button>
		<div style="margin: 1000px 0">
			<m-button id="target" type="warn" block>我是被定位的锚点元素</m-button>
		</div>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const anchorOpt = ref({
	target: '#target',
	root: '.body',
	time: 1000,
	distance: 0,
	callback: (top: number) => {
		console.log(`锚点定位完成，距离顶部${top}px`)
	}
})
</script>
<style lang="less" scoped></style>
