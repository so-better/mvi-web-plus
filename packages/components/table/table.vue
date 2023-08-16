<template>
	<div class="mvi-table">
		<!-- 表头 -->
		<div class="mvi-table-header">
			<table cellpadding="0" cellspacing="0">
				<colgroup>
					<col v-for="column in columnData" :width="columnWidth(column)" />
				</colgroup>
				<thead>
					<tr>
						<th v-for="column in columnData">
							<div>{{ column.label }}</div>
						</th>
					</tr>
				</thead>
			</table>
		</div>
		<!-- 表主体 -->
		<div class="mvi-table-content">
			<table cellpadding="0" cellspacing="0">
				<colgroup>
					<col v-for="column in columnData" :width="columnWidth(column)" />
				</colgroup>
				<tbody>
					<tr v-for="row in rowData">
						<td v-for="column in columnData">{{ row[column.prop] }}</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<script>
export default {
	name: 'm-table',
	props: {
		//表格数据
		data: {
			type: Array,
			default: function () {
				return []
			}
		},
		//表格列配置
		columns: {
			type: Array,
			default: function () {
				return []
			}
		}
	},
	data() {
		return {
			//表格数据
			rowData: [],
			//列数据
			columnData: []
		}
	},
	computed: {
		columnWidth() {
			return column => {
				return column.width || 'auto'
			}
		}
	},
	watch: {
		//监听data更新rowData
		data: {
			immediate: true,
			handler: function (newVal) {
				this.rowData = this.deepClone(newVal)
			}
		},
		//监听columns更新columnData
		columns: {
			immediate: true,
			handler: function (newVal) {
				this.columnData = this.deepClone(newVal)
			}
		}
	},
	methods: {
		//深拷贝数据
		deepClone(data) {
			return JSON.parse(JSON.stringify(data))
		}
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-table {
	display: block;
	width: 100%;
	padding: 0;
	margin: 0;
	background-color: #fff;
	font-size: @font-size-default;
	color: @font-color-default;

	.mvi-table-header {
		display: block;
		width: 100%;
		overflow: hidden;

		table {
			width: 100%;
			border-collapse: collapse;

			thead {
				width: 100%;

				tr {
					width: 100%;

					th {
						font-weight: bold;
						padding: @mp-sm;
						text-align: left;

						& > div {
							display: block;
							width: 100%;
						}
					}
				}
			}
		}
	}
	.mvi-table-content {
		display: block;
		width: 100%;
		overflow: hidden;

		table {
			width: 100%;
			border-collapse: collapse;

			tbody {
				width: 100%;

				tr {
					width: 100%;

					td {
						padding: @mp-sm;
						text-align: left;
						border-bottom: 1px solid @border-color;

						& > div {
							display: block;
							width: 100%;
						}
					}

					&:last-child > td {
						border-bottom: none;
					}
				}
			}
		}
	}
}
</style>
