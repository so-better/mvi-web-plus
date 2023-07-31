<template>
	<div class="mvi-p-4">
		<m-button v-resize="resizeOpt">按钮</m-button>
	</div>
</template>
<script>
import moment from 'moment'
export default {
	data() {
		return {
			height: 1,
			type: 'success',
			moment: moment,
			date: moment('2023-08').toDate(),
			value: '',
			show: true,
			options: [
				{
					label: '分享到朋友圈'
				},
				{
					label: '分享到QQ空间'
				}
			],
			list: ['佛罗里达州', '加利福利亚州', '北京', '伦敦', 'aaa', 'bbb', 'AAAA'],
			dragOpt: {
				beforedrag: (el, container, placement, event) => {
					console.log('beforedrag', el, container, placement, event)
				},
				drag: (el, container, placement, event) => {
					console.log('drag', el, container, placement, event)
				},
				dragged: (el, container, placement, event) => {
					console.log('dragged', el, container, placement, event)
				}
			},
			observeOpt: {
				attributes: true,
				attributeNames: ['class'],
				attributesChange: (attributeName, newValue, oldValue) => {
					console.log(attributeName, newValue, 'and', oldValue)
				}
			},
			resizeOpt: {
				beforeResize: data => {
					console.log(data)
				},
				resize: data => {
					console.log('resize', data)
				}
			}
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
