<template>
	<div class="mvi-p-4">
		<div>
			<m-button @click="show = !show">Button</m-button>
		</div>
		<m-actionsheet v-model="show" overlayColor="rgba(0,0,0,0.7)" title="分享" :options="options" size="large" closable round @select="change"></m-actionsheet>
	</div>
</template>
<script>
export default {
	data() {
		return {
			show: false,
			options: [
				{
					label: '分享到朋友圈'
				},
				{
					label: '分享到QQ空间'
				}
			]
		}
	},
	mounted() {},
	methods: {
		change(item, index) {
			console.log(item, index)
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
