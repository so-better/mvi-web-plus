<template>
	<div class="mvi-p-4">
		<div class="mvi-mb-4">
			<m-badge content="99">
				<m-button>按钮</m-button>
			</m-badge>
			<m-button plain class="mvi-ml-4" type="success">按钮</m-button>
			<m-button plain class="mvi-ml-4" type="info">按钮</m-button>
			<m-button plain class="mvi-ml-4" type="warn">按钮</m-button>
			<m-button plain class="mvi-ml-4" type="primary">按钮</m-button>
		</div>
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
