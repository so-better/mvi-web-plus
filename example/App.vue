<template>
	<div class="mvi-p-10">
		<m-button id="btn" @click="onClick">Button</m-button>
		<m-carousel style="width: 400px; height: 200px" v-model="active" :optons="carouselOpt">333</m-carousel>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 1,
			date: new Date(),
			show: true,
			value: '',
			carouselOpt: [{}]
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
