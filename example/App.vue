<template>
	<div class="mvi-p-4">
		<div>
			{{ value }}
			<m-button @click="page++">打开图片预览</m-button>
			<m-steps :active="page" vertical :activeIcon="{ type: 'success', color: '#7819a3' }" inactive-icon="times">
				<m-step>买家下单</m-step>
				<m-step>商家接单</m-step>
				<m-step>买家提货</m-step>
				<m-step>交易完成</m-step>
			</m-steps>
		</div>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			page: 0,
			value: '',
			show: false,
			options: [
				{
					label: '分享到朋友圈'
				},
				{
					label: '分享给QQ好友'
				},
				{
					label: '分享到QQ空间'
				}
			]
		}
	},
	methods: {
		change() {
			this.$showNotify({
				message: '支付成功',
				type: 'success',
				icon: 'success-o'
			})
		},
		loadMore() {
			setTimeout(() => {
				this.loading = false
				this.error = false
				this.list = [...this.list, ...new Array(30)]
				if (this.list.length > 100) {
					this.finished = true
				}
			}, 2000)
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
