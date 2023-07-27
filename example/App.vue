<template>
	<div class="mvi-p-4">
		<m-autocomplete class="mvi-mb-4" size="small" placeholder="请输入内容" v-model="value" :list="list"></m-autocomplete>
		<m-autocomplete filterMethod class="mvi-mb-4" size="medium" placeholder="请输入内容" v-model="value" :list="list" clearable></m-autocomplete>
		<m-autocomplete size="large" active-color="#f30" placeholder="请输入内容" v-model="value" :list="list" clearable></m-autocomplete>
	</div>
</template>
<script>
import moment from 'moment'
export default {
	data() {
		return {
			moment: moment,
			date: moment('2023-08').toDate(),
			value: '',
			show: false,
			options: [
				{
					label: '分享到朋友圈'
				},
				{
					label: '分享到QQ空间'
				}
			],
			list: ['佛罗里达州', '加利福利亚州', '北京', '伦敦', 'aaa', 'bbb', 'AAAA']
		}
	},
	mounted() {},
	methods: {
		change(val, list) {}
	}
}
</script>
<style lang="less">
html {
	font-size: 50px;
}

body {
	height: 100% !important;
	overflow: auto !important;
}
</style>
