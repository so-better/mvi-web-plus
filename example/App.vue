<template>
	<div class="mvi-p-4">
		<div class="mvi-mb-4">
			<m-button @click="change">打开图片预览</m-button>
		</div>
		<div>
			{{ value }}
		</div>
		<div>
			<m-sign background="#000" color="#fff" ref="sign"></m-sign>
		</div>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			page: 0,
			value: [],
			show: true,
			options: [
				{
					label: '分享到朋友圈',
					value: 0
				},
				{
					label: '分享给QQ好友',
					value: 1
				},
				{
					label: '分享到QQ空间',
					value: 2
				}
			]
		}
	},
	methods: {
		change(e) {
			console.log(this.$refs.sign.getImage())
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
	overflow-x: hidden;
	overflow-y: auto;
}

.a {
	.mvi-stepper-plus {
		background-color: #f30 !important;
		color: #fff !important;
	}
}
</style>
