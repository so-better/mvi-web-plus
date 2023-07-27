<template>
	<div class="mvi-p-4">
		<m-button v-anchor="{ target: '#btn', time: 300 }">按钮</m-button>
		<div style="margin: 20rem 0">
			<m-button id="btn">锚点元素</m-button>
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
			]
		}
	},
	mounted() {},
	methods: {
		error(code, message) {
			console.log(code, message)
		},
		selectDate() {
			this.$refs.date.trigger()
		},
		change(item, index) {
			console.log(item, index)
		}
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
