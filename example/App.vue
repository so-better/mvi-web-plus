<template>
	<div class="mvi-p-4">
		<div>
			{{ value }}
			<m-button @click="show = !show">打开图片预览</m-button>
		</div>
		<div style="position: relative; width: 400px; height: 400px">
			<m-number-keyboard showX random title="安全键盘" border closable v-model:show="show" v-model="value"></m-number-keyboard>
		</div>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			value: 0,
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
</style>
