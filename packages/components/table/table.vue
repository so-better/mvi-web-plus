<template>
	<div :class="['mvi-table', border ? 'border' : '']">
		<div class="mvi-table-header">
			<!-- 表头 -->
			<table cellpadding="0" cellspacing="0">
				<tr>
					<th v-for="(column, index) in columnData" :ref="el => (headerColumnEls[index] = el)" :class="headerColumnClass" :style="headerColumnStyle(column)">
						<div :class="['mvi-table-column', center ? 'center' : '']">
							<!-- 复选框 -->
							<Checkbox v-model="selectAll" v-if="column.type == 'selection'" size="0.24rem" @change="allSelect(column)" :color="activeColor"></Checkbox>
							<!-- 其他 -->
							<template v-else>
								<!-- 列标题 -->
								<span>{{ column.label }}</span>
								<!-- 排序 -->
								<span class="mvi-table-sortable" v-if="column.sortable">
									<Icon type="caret-up" :class="sortBy == column.prop && sortMethod == 'asc' ? 'active' : ''" @click="sortAsc(column)" :style="sortIconStyle('asc', column)" />
									<Icon type="caret-down" :class="sortBy == column.prop && sortMethod == 'desc' ? 'active' : ''" @click="sortDesc(column)" :style="sortIconStyle('desc', column)" />
								</span>
							</template>
						</div>
					</th>
					<th class="placeholder" v-if="scrollWidth" :style="{ width: scrollWidth + 'px' }"></th>
				</tr>
			</table>
		</div>
		<div ref="body" :class="['mvi-table-body', height ? 'overflow' : '']" :style="{ maxHeight: height }">
			<!-- 加载状态 -->
			<div class="mvi-table-loading" v-if="loading">
				<Loading color="#bbb" size="0.3rem" />
				<span>{{ loadText }}</span>
			</div>
			<template v-else>
				<!-- 表体 -->
				<table v-if="rowData.length" cellpadding="0" cellspacing="0">
					<tr v-for="(row, rowIndex) in rowData" :class="stripe ? 'stripe' : ''">
						<td v-for="(column, columnIndex) in columnData" :class="bodyColumnClass(row, rowIndex, column, columnIndex)" :style="bodyColumnStyle(columnIndex)">
							<Tooltip :disabled="!column.ellipsis" block :title="dataFormat(row, column) + ''" trigger="hover">
								<div :class="['mvi-table-column', center ? 'center' : '']">
									<!-- 复选框 -->
									<Checkbox v-if="column.type == 'selection'" v-model="checkedRows" :value="rowIndex" size="0.24rem" @change="doCheck(rowIndex, column)" :color="activeColor" :disabled="!cmpSelectable(row, rowIndex, column)"></Checkbox>
									<!-- 其他 -->
									<div v-else :class="[column.ellipsis ? 'ellipsis' : '']">
										<!-- 自定义单元格 -->
										<slot v-if="column.type == 'custom' && $slots.custom" name="custom" :row="row" :row-index="rowIndex" :column="column" :column-index="columnIndex"></slot>
										<!-- 默认内容 -->
										<span v-else>{{ dataFormat(row, column) }}</span>
									</div>
								</div>
							</Tooltip>
						</td>
					</tr>
				</table>
				<!-- 无数据提示 -->
				<div v-else class="mvi-table-nodata">{{ noDataMsg }}</div>
			</template>
		</div>
	</div>
</template>
<script>
import { Dap } from '../dap'
import { Loading } from '../loading'
import { Icon } from '../icon'
import { Checkbox } from '../checkbox'
import { Tooltip } from '../tooltip'
import { getCurrentInstance } from 'vue'
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
		//表格列配置：包括type(selection/custom/default)/label/prop/width/minWidth/className/hidden/sortable/format/selectable/sortMethod/ellipsis
		columns: {
			type: Array,
			default: function () {
				return []
			}
		},
		//是否显示表格外边框
		border: {
			type: Boolean,
			default: false
		},
		//是否显示列边框
		columnBorder: {
			type: Boolean,
			default: false
		},
		//是否显示间隔条纹
		stripe: {
			type: Boolean,
			default: false
		},
		//设置表格最大高度
		height: {
			type: String,
			default: null
		},
		//无数据提示
		noDataMsg: {
			type: String,
			default: '暂无数据'
		},
		//是否显示加载状态
		loading: {
			type: Boolean,
			default: false
		},
		//加载文本
		loadText: {
			type: String,
			default: '正在加载中...'
		},
		//表格列是否居中对齐
		center: {
			type: Boolean,
			default: false
		},
		//单元格样式
		cellClass: {
			type: Function
		},
		//主题色
		activeColor: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			//刷新表格列对齐的字段
			columnAlignKey: 0,
			//表格数据
			rowData: [],
			//列数据
			columnData: [],
			//表格滚动条宽度
			scrollWidth: 0,
			//表头列元素数组
			headerColumnEls: [],
			//排序的字段，即依据此字段排序
			sortBy: '',
			//排序方式，asc还是desc
			sortMethod: '',
			//复选框勾选的行
			checkedRows: [],
			//是否全选
			selectAll: false
		}
	},
	computed: {
		//表头列class
		headerColumnClass() {
			let cls = []
			if (this.columnBorder) {
				cls.push('border')
			}
			return cls
		},
		//表头列样式
		headerColumnStyle() {
			return column => {
				return {
					width: column.width || 'auto',
					minWidth: column.minWidth || ''
				}
			}
		},
		//表主体列class
		bodyColumnClass() {
			return (row, rowIndex, column, columnIndex) => {
				let cls = []
				if (this.columnBorder) {
					cls.push('border')
				}
				if (column.className) {
					cls.push(column.className)
				}
				if (typeof this.cellClass == 'function') {
					cls.push(this.cellClass.apply(this, [row, rowIndex, column, columnIndex]) || '')
				}
				return cls
			}
		},
		//表主体列的宽度设置
		bodyColumnStyle() {
			return index => {
				//this.columnAlignKey只是为了刷新计算属性
				this.columnAlignKey
				return {
					width: this.headerColumnEls[index] ? Dap.element.getCssStyle(this.headerColumnEls[index], 'width') : '0px'
				}
			}
		},
		//排序图标激活时设置主题色
		sortIconStyle() {
			return (sortMethod, column) => {
				let style = {}
				if (this.sortBy == column.prop && this.sortMethod == sortMethod) {
					style.color = this.activeColor || ''
				}
				return style
			}
		},
		//格式化单元格显示的数据
		dataFormat() {
			return (row, column) => {
				if (typeof column.format == 'function') {
					return column.format.apply(this, [row[column.prop], row, column])
				}
				return row[column.prop]
			}
		},
		//判断某一行复选框是否可以使用
		cmpSelectable() {
			return (row, rowIndex, column) => {
				if (typeof column.selectable == 'function') {
					return column.selectable.apply(this, [row, rowIndex])
				}
				return true
			}
		}
	},
	components: {
		Loading,
		Icon,
		Checkbox,
		Tooltip
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
				this.columnData = this.deepClone(newVal).filter(column => {
					//隐藏的列不获取
					return !column.hidden
				})
			}
		},
		//监听height属性
		height: {
			immediate: true,
			handler: function () {
				//在高度设置后获取滚动条宽度
				this.$nextTick(() => {
					this.scrollWidth = this.getScrollWidth()
					//滚动条宽度获取后等待渲染完成重新对齐列
					this.$nextTick(() => {
						this.columnAlignKey++
					})
				})
			}
		}
	},
	setup() {
		const instance = getCurrentInstance()
		return {
			uid: instance.uid
		}
	},
	mounted() {
		this.columnAlignKey++
		Dap.event.on(window, `resize.table_${this.uid}`, e => {
			this.columnAlignKey++
		})
	},
	methods: {
		//单个复选框勾选
		doCheck(rowIndex, column) {
			if (
				this.checkedRows.length ==
				this.rowData.filter((item, index) => {
					return this.cmpSelectable(item, index, column)
				}).length
			) {
				this.selectAll = true
			} else {
				this.selectAll = false
			}
			this.$emit('check', this.checkedRows, rowIndex)
		},
		//复选框全选
		allSelect(column) {
			//全选
			if (this.selectAll) {
				this.checkedRows = []
				for (let i = 0; i < this.rowData.length; i++) {
					if (this.cmpSelectable(this.rowData[i], i, column)) {
						this.checkedRows.push(i)
					}
				}
			}
			//取消全选
			else {
				this.checkedRows = []
			}
			this.$emit('check', this.checkedRows)
		},
		//升序排序
		sortAsc(column) {
			//取消排序
			if (this.sortBy == column.prop && this.sortMethod == 'asc') {
				this.sortBy = ''
				this.sortMethod = ''
				this.rowData = this.deepClone(this.data)
				this.$emit('sort-cancel', this.rowData)
			}
			//升序排序
			else {
				this.sortBy = column.prop
				this.sortMethod = 'asc'
				if (typeof column.sortMethod == 'function') {
					this.rowData = column.sortMethod.apply(this, ['asc', this.rowData])
				} else {
					this.rowData = this.rowData.sort(function (rowA, rowB) {
						if (Dap.number.isNumber(rowA[column.prop]) && Dap.number.isNumber(rowB[column.prop])) {
							return rowA[column.prop] - rowB[column.prop]
						}
						return rowA[column.prop].toString().localeCompare(rowB[column.prop].toString(), 'zh-CN')
					})
				}
				this.$emit('sort-asc', this.rowData)
			}
		},
		//降序排序
		sortDesc(column) {
			//取消排序
			if (this.sortBy == column.prop && this.sortMethod == 'desc') {
				this.sortBy = ''
				this.sortMethod = ''
				this.rowData = this.deepClone(this.data)
				this.$emit('sort-cancel', this.rowData)
			}
			//降序排序
			else {
				this.sortBy = column.prop
				this.sortMethod = 'desc'
				if (typeof column.sortMethod == 'function') {
					this.rowData = column.sortMethod.apply(this, ['desc', this.rowData])
				} else {
					this.rowData = this.rowData.sort(function (rowA, rowB) {
						if (Dap.number.isNumber(rowA[column.prop]) && Dap.number.isNumber(rowB[column.prop])) {
							return rowB[column.prop] - rowA[column.prop]
						}
						return -rowA[column.prop].toString().localeCompare(rowB[column.prop].toString(), 'zh-CN')
					})
				}
				this.$emit('sort-desc', this.rowData)
			}
		},
		//获取表格主体滚动条宽度
		getScrollWidth() {
			return this.$refs.body.offsetWidth - this.$refs.body.clientWidth
		},
		//深拷贝数据
		deepClone(data) {
			//数组
			if (Array.isArray(data)) {
				return data.map(item => {
					return this.deepClone(item)
				})
			}
			//对象
			if (Dap.common.isObject(data)) {
				let cloneData = {}
				for (let key in data) {
					cloneData[key] = this.deepClone(data[key])
				}
				return cloneData
			}
			return data
		}
	},
	beforeUnmount() {
		Dap.event.off(window, `resize.table_${this.uid}`)
	}
}
</script>
<style lang="less" scoped>
@import '../../css/mvi-basic.less';
.mvi-table {
	display: block;
	width: 100%;
	background-color: #fff;
	font-size: @font-size-default;
	color: @font-color-default;

	border-radius: 0.1rem;

	&.border {
		border: 1px solid @border-color;
	}

	.mvi-table-header {
		display: block;
		width: 100%;

		table {
			width: 100%;
			padding: 0;
			margin: 0;
			border-collapse: collapse;
			table-layout: fixed;

			tr {
				width: 100%;
				background: @bg-color-dark;

				th {
					font-weight: bold;
					padding: @mp-sm 0;
					text-align: left;
					border-bottom: 1px solid @border-color;

					&.border {
						border-right: 1px solid @border-color;

						&:last-child {
							border-right: none;
						}
					}

					.mvi-table-column {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						padding: 0 @mp-sm;
						white-space: normal;
						word-break: break-all;
						width: 100%;

						&.center {
							justify-content: center;
						}

						.mvi-table-sortable {
							display: inline-flex;
							justify-content: space-between;
							align-items: center;
							flex-direction: column;
							margin-left: @mp-xs;
							font-size: @font-size-small;
							color: @font-color-mute;
							transform: scale(0.8);

							.mvi-icon {
								cursor: pointer;

								&.active {
									color: @info-normal;
								}
							}
						}
					}

					&.placeholder {
						padding: 0;
					}
				}
			}
		}
	}

	.mvi-table-body {
		display: block;
		width: 100%;

		&.overflow {
			overflow-x: hidden;
			overflow-y: auto;
		}

		table {
			width: 100%;
			padding: 0;
			margin: 0;
			border-collapse: collapse;
			table-layout: fixed;

			tr {
				width: 100%;
				&.stripe:nth-child(2n) {
					background: @bg-color-default;
				}

				td {
					padding: @mp-sm 0;
					text-align: left;
					border-bottom: 1px solid @border-color;

					&.border {
						border-right: 1px solid @border-color;

						&:last-child {
							border-right: none;
						}
					}

					.mvi-table-column {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						white-space: normal;
						word-break: break-all;
						padding: 0 @mp-sm;
						width: 100%;

						&.center {
							justify-content: center;
						}

						.ellipsis {
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
					}
				}

				&:last-child > td {
					border-bottom: none;
				}
			}
		}

		.mvi-table-loading {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 100%;
			padding: @mp-lg 0;
			color: @font-color-mute;
			font-size: @font-size-small;

			& > span {
				margin-left: @mp-xs;
			}
		}

		.mvi-table-nodata {
			display: block;
			width: 100%;
			text-align: center;
			padding: @mp-lg 0;
			color: @font-color-mute;
			font-size: @font-size-small;
		}
	}
}
</style>
