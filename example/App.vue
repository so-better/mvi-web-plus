<template>
	<div class="mvi-p-20">
		<m-button @click="show = !show" id="btn" class="mvi-mr-4">File Select</m-button>
		<m-transition-slide :expand="show">
			<div style="width: 100%; height: 4rem; background-color: #ff3300"></div>
		</m-transition-slide>
	</div>
</template>
<script>
import moment from 'moment'
export default {
	data() {
		return {
			moment: moment,
			date: moment('2023-08').toDate(),
			value: 40,
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
		change(val, list) {}
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
