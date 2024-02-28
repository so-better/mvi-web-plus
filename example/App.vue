<template>
	<div style="padding: 20px">
		<m-button @click="show = !show">按钮</m-button>
		<m-picker :options="options"></m-picker>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			value: '',
			show: false,
			date: new Date(),
			options: [
				{
					values: ['iPhone15', 'iPhone14 Pro Max', 'HUAWEI Mate60 Pro', 'Samsung Galaxy S23 FE'],
					defaultIndex: 0
				},
				{
					values: ['Apple', 'Samsung', 'HUAWEI'],
					defaultIndex: 1
				}
			]
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
