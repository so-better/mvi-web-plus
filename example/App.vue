<template>
	<div class="mvi-p-4">
		<div class="mvi-mb-4">
			<m-button @click="change">打开图片预览</m-button>
		</div>
		<m-tooltip title="这是一个工具提示组件" block :showTriangle="false" width="4rem">
			<m-button type="primary" block>工具提示</m-button>
		</m-tooltip>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			data: [
				{
					name: '张三',
					age: 24,
					sex: 1
				},
				{
					name: '李四',
					age: 20,
					sex: 1
				},
				{
					name: '王红',
					age: 22,
					sex: 0
				},
				{
					name: '赵钱',
					age: 30,
					sex: 1
				}
			],
			columns: [
				{
					key: 'checkbox',
					value: '全选'
				},
				{
					key: 'name',
					value: '姓名'
				},
				{
					key: 'age',
					value: '年龄'
				},
				{
					key: 'sex',
					value: '性别'
				}
			]
		}
	},
	methods: {
		change(e) {
			this.page = 2
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
	overflow-x: hidden;
	overflow-y: auto;
}

.a-tabs {
	.mvi-tab-header.active {
		background-color: #053b7e !important;
		font-weight: bold;
	}

	.mvi-tabs-header.card {
		border-color: #053b7e !important;
	}

	.mvi-tabs-header.card .mvi-tab-header {
		border-right-color: #053b7e !important;
	}
}
</style>
