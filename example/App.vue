<template>
	<div class="mvi-p-4">
		<m-button @click="show = !show">按钮</m-button>
		<m-search show-cancel v-model="value" placeholder="请输入"></m-search>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			show: false,
			value: '',
			date: new Date()
		}
	},
	mounted() {},
	methods: {}
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
