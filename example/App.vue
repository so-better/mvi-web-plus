<template>
	<div class="mvi-p-4">
		<div>
			<m-table :data="data" draggable column-border :columns="columns" :cell-class="cellClass">
				<template #custom="data">
					<div v-if="data.column.prop == 'opt'">
						<m-button size="small">修改</m-button>
						<m-button class="mvi-ml-1" size="small" type="error">删除</m-button>
						<m-button class="mvi-ml-1" size="small" type="success">复制</m-button>
					</div>
				</template>
			</m-table>
		</div>
	</div>
</template>
<script>
import dayjs from 'dayjs'
export default {
	data() {
		return {
			value: '',
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
					type: 'selection',
					prop: 'check'
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
				},
				{
					type: 'custom',
					prop: 'opt',
					label: '操作'
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
