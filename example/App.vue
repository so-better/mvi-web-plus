<template>
	<div class="mvi-p-10">
		<m-button id="btn" @click="onClick">Button</m-button>
		<m-rich-image style="width: 100%; height: 300px; background: #000" src="https://www.ling0523.cn/images/image_0_1701164609409.jpg"></m-rich-image>
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
