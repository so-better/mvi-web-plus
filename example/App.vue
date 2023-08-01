<template>
	<div class="mvi-p-4">
		<m-button>File Select</m-button>
		<m-image width="3rem" height="3rem" :error-icon="{ type: 'image-error', size: '1rem' }" src="https://www.mvi-web.cn/mvi-resources/images/mvi_image_3_1652322363025.jpeg"></m-image>
	</div>
</template>
<script>
import moment from 'moment'
export default {
	data() {
		return {
			moment: moment,
			date: moment('2023-08').toDate(),
			value: 'x',
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
