<template>
	<div class="mvi-p-4">
		<div>
			{{ value }}
			<m-button @click="show = !show">打开图片预览</m-button>
			<div class="mvi-mb-2">
				<m-stepper v-model="page" size="small" inputAlign="left" :digit="2" :step="0.55"></m-stepper>
			</div>
			<div class="mvi-mb-2">
				<m-stepper v-model="page" inputAlign="left" :digit="2" :step="0.55"></m-stepper>
			</div>
			<div class="mvi-mb-2">
				<m-stepper v-model="page" border size="large" inputAlign="left" :digit="2" :step="0.55"></m-stepper>
			</div>
		</div>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			page: 1,
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
	overflow: auto;
}

.a {
	.mvi-stepper-plus {
		background-color: #f30 !important;
		color: #fff !important;
	}
}
</style>
