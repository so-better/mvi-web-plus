<template>
	<div style="padding: 20px">
		<m-button @click="show = !show">按钮</m-button>
		<div>
			<m-loading color="#108af3" />
			<m-loading type="circle" class="mvi-ml-4" color="#108af3" />
			<m-loading type="dots" class="mvi-ml-4" color="#108af3" />
			<m-loading type="spin" class="mvi-ml-4" color="#108af3" />
			<m-loading type="transfer" class="mvi-ml-4" color="#108af3" />
		</div>
	</div>
</template>
<script>
export default {
	data() {
		return {
			value: '',
			show: false,
			date: new Date(),
			options: {
				values: ['mvi', 'elementUI', 'iView', 'vant'], //设置选项
				defaultIndex: 0 //设置默认选项序列
			}
		}
	},
	mounted() {},
	methods: {
		loadMore() {
			setTimeout(() => {
				this.loading = false
				this.error = false
				this.list = [...this.list, ...new Array(30)]
				if (this.list.length > 100) {
					this.finished = true
				}
			}, 1000)
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
	position: relative;
}
</style>
<style lang="less">
.slide-enter-from,
.slide-leave-to {
	transform: rotate(40deg);
	opacity: 0;
}
</style>
