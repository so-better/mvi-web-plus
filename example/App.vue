<template>
	<div class="mvi-p-4">
		<div>{{ date }}</div>
		<m-button @click="show = !show">按钮</m-button>
		<m-calendar v-model="date" type="success"></m-calendar>
	</div>
</template>
<script>
import moment from 'moment'
export default {
	data() {
		return {
			moment: moment,
			date: moment('2023-08-02').toDate(),
			value: 2,
			show: true,
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
		change(data) {
			console.log(data)
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
