<template>
	<div class="mvi-p-10">
		<m-button id="btn" @click="onClick">Button</m-button>
		<m-carousel mode="slide" loop autoplay :interval="1000" indicators controls style="width: 400px; height: 200px" v-model="active">
			<m-carousel-item>
				<div class="mvi-bg-success mvi-flex-center mvi-font-h1" style="width: 100%; height: 100%">1</div>
			</m-carousel-item>
			<m-carousel-item>
				<div class="mvi-bg-error mvi-flex-center mvi-font-h1" style="width: 100%; height: 100%">2</div>
			</m-carousel-item>
			<m-carousel-item>
				<div class="mvi-bg-info mvi-flex-center mvi-font-h1" style="width: 100%; height: 100%">3</div>
			</m-carousel-item>
		</m-carousel>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 1,
			date: new Date(),
			show: false,
			value: ''
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
