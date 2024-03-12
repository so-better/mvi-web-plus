<template>
	<div class="mvi-p-10">
		<div style="position: relative; width: 200px; height: 200px"></div>
		<m-button id="btn" @click="onClick">Button</m-button>
		<m-image-preview loop useTools controls v-model="show" :images="images">
			<!-- <template #page="data">
				{{ data }}
			</template> -->
		</m-image-preview>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 1,
			date: new Date(),
			show: false,
			value: '',
			images: ['https://www.ling0523.cn/images/image_2_1701871044734.jpg', 'https://www.ling0523.cn/images/image_1_1701871044699.jpg', 'https://www.ling0523.cn/images/image_0_1701871044625.jpg', 'https://www.ling0523.cn/images/image_0_1701164609409.jpg'],
			desc: ['图片1', '图片2', '图片3图片3图片3图片3图片3图片3图片3图片3图片3图片3图片3', '图片4']
		}
	},
	methods: {
		onClick() {
			this.show = !this.show
		}
	}
}
</script>

<style lang="less">
html {
	font-size: 50px;
}

#app {
	height: 100%;
	overflow: auto;
}
</style>
