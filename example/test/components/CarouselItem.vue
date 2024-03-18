<template>
	<div>
		<m-carousel v-model="active" autoplay :interval="1000" loop indicators controls style="width: 100%; height: 5rem" vertical>
			<m-carousel-item v-for="item in images">
				<m-image :src="item" width="100%" height="100%" />
			</m-carousel-item>
		</m-carousel>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
let images = ref(['https://www.ling0523.cn/images/image_2_1701871044734.jpg', 'https://www.ling0523.cn/images/image_1_1701871044699.jpg', 'https://www.ling0523.cn/images/image_0_1701871044625.jpg', 'https://www.ling0523.cn/images/image_0_1701164609409.jpg'])
</script>
<style lang="less"></style>
