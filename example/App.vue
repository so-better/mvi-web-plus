<template>
	<div style="padding: 200px">
		<m-tooltip trigger="hover" title="这是一个工具提示组件" ref="tooltip">
			<m-button type="primary">工具提示</m-button>
		</m-tooltip>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			show: false,
			value: '',
			list: ['佛罗里达州', '加利福利亚州', '北京', '伦敦'],
			date: new Date(),
			options: [
				{
					label: '选项1',
					value: 0
				},
				{
					label: '选项2',
					value: 1
				},
				{
					label: '选项3',
					value: 2
				},
				{
					label: '选项4',
					value: 3
				},
				{
					label: '选项5',
					value: 4
				}
			]
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
<style lang="less">
.slide-enter-from,
.slide-leave-to {
	transform: rotate(40deg);
	opacity: 0;
}
</style>
