<template>
	<div class="mvi-p-4">
		<div>{{ value }}</div>
		<m-button @click="change">按钮</m-button>
		<div id="local" style="position: relative; width: 500px; height: 500px"></div>
	</div>
</template>
<script>
import moment from 'moment'
export default {
	data() {
		return {
			moment: moment,
			date: moment('2023-02-02').toDate(),
			value: 'rgba(0,100,200,0.5)',
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
		change() {
			this.$alert({
				title: '温馨提示',
				message: '欢迎进入游戏',
				showTimes: true,
				mountEl: '#local',
				timeout: 1000
			}).then((res, val) => {
				console.log(res, val)
			})
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
