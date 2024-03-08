<template>
	<div class="mvi-p-10">
		<m-button @click="onClick">Button</m-button>
		<m-swiper ref="swiper">
			<m-swiper-slide>1</m-swiper-slide>
			<m-swiper-slide>2</m-swiper-slide>
			<m-swiper-slide>3</m-swiper-slide>
			<m-swiper-slide>4</m-swiper-slide>
		</m-swiper>
	</div>
</template>

<script>
export default {
	data() {
		return {
			active: 1,
			show: false,
			value: '',
			tabs: [
				{
					value: 0,
					name: '首页'
				},
				{
					value: 1,
					name: '附近'
				},
				{
					value: 2,
					name: '关注'
				},
				{
					value: 3,
					name: '我的'
				}
			]
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
