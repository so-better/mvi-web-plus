<template>
	<div>
		<m-button @click="show = !show">图片预览</m-button>
		<m-image-preview v-model="show" loop useTools controls :active="active" :images="images" @change="carouselChange" :descriptions="descriptions"></m-image-preview>
	</div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
const active = ref(0)
const show = ref(false)
let images = ref(['https://www.ling0523.cn/images/image_2_1701871044734.jpg', 'https://www.ling0523.cn/images/image_1_1701871044699.jpg', 'https://www.ling0523.cn/images/image_0_1701871044625.jpg', 'https://www.ling0523.cn/images/image_0_1701164609409.jpg'])
let descriptions = ref(['图片1', '图片2', '图片3图片3图片3图片3图片3图片3图片3图片3图片3图片3图片3', '图片4'])
const carouselChange = val => {
	console.log('change', val)
}
</script>
<style lang="less"></style>
