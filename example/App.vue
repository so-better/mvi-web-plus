<template>
	<div class="mvi-p-10">
		<m-button @click="onClick">Button</m-button>
		<m-steps :active="2">
			<m-step>买家下单</m-step>
			<m-step>商家接单</m-step>
			<m-step>买家提货</m-step>
			<m-step v-if="show">交易完成</m-step>
		</m-steps>
		<m-carousel style="width: 400px; height: 200px" v-model="active" :optons="carouselOpt"></m-carousel>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 1,
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
