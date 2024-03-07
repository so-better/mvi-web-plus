<template>
	<div class="mvi-p-10">
		<m-button @click="onClick">Button</m-button>
		<m-pull-refresh style="height: 400px" v-model="show" @refresh="refresh">
			<!-- 这里面放页面内容 -->
		</m-pull-refresh>
	</div>
</template>

<script>
import { refresh } from 'less'

export default {
	data() {
		return {
			page: 1,
			show: false,
			value: ''
		}
	},
	methods: {
		onClick() {
			this.$showToast({
				type: 'aa',
				message: '{ a: 1 }'
			})
			setTimeout(() => {
				this.$hideToast()
			}, 1000)
		},
		refresh() {
			setTimeout(() => {
				this.show = false //取消刷新状态
				this.$msgbox('数据加载成功')
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
