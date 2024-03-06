<template>
	<div class="mvi-p-10">
		<m-button @click="onClick">Button</m-button>
		<m-slider v-model="value"></m-slider>
	</div>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			value: 0,
			date: new Date(),
			options: {
				values: ['mvi', 'elementUI', 'iView', 'vant'], //设置选项
				defaultIndex: 0 //设置默认选项序列
			}
		}
	},
	mounted() {},
	methods: {
		onClick() {}
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
