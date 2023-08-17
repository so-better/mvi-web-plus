<template>
	<div class="mvi-p-4">
		<m-table :data="data" :columns="columns" :cell-class="cellClass"> </m-table>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			dayjs: dayjs,
			data: [
				{
					name: '张三',
					age: 14,
					score: 80
				},
				{
					name: '李四',
					age: 16,
					score: 55
				},
				{
					name: '小王',
					age: 15,
					score: 77
				}
			],
			columns: [
				{
					type: 'selection'
				},
				{
					prop: 'name',
					label: '姓名'
				},
				{
					prop: 'age',
					label: '年龄',
					ellipsis: true
				},
				{
					prop: 'score',
					label: '分数'
				}
			]
		}
	},
	methods: {
		cellClass(row, rowIndex, column, columnIndex) {
			if (rowIndex == 0) {
				return 'mvi-bg-success'
			}
			return ''
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
