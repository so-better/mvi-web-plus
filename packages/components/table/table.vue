<template>
	<div class="mvi-table" :class="{ border: border }">
		<div class="mvi-table-wrap" :style="{ width: wrapWidth }">
			<div class="mvi-table-header">
				<!-- 表头 -->
				<table cellpadding="0" cellspacing="0">
					<tr>
						<th v-for="(column, index) in columnData" :ref="el => (headerColumnRefs[index] = el)" :class="headerColumnClass" :style="headerColumnStyle(column)">
							<div class="mvi-table-column" :class="{ center: center }">
								<!-- 复选框 -->
								<Checkbox v-model="selectAll" v-if="column.type == 'selection'" size="0.24rem" @change="allSelect(column)" :color="activeColor"></Checkbox>
								<!-- 其他 -->
								<template v-else>
									<!-- 列标题 -->
									<span>{{ column.label }}</span>
									<!-- 排序 -->
									<span class="mvi-table-sortable" v-if="column.sortable">
										<Icon type="caret-up" :class="{ active: sortBy == column.prop && sortOrder == 'asc' }" @click="sortAsc(column)" :style="sortIconStyle('asc', column)" />
										<Icon type="caret-down" :class="{ active: sortBy == column.prop && sortOrder == 'desc' }" @click="sortDesc(column)" :style="sortIconStyle('desc', column)" />
									</span>
								</template>
							</div>
						</th>
						<th class="placeholder" v-if="scrollWidth" :style="{ width: scrollWidth + 'px' }"></th>
					</tr>
				</table>
			</div>
			<div ref="body" class="mvi-table-body" :class="{ overflow: !!height }" :style="{ maxHeight: height }">
				<!-- 加载状态 -->
				<div class="mvi-table-loading" v-if="loading">
					<Loading color="#bbb" size="0.3rem" />
					<span>{{ loadText }}</span>
				</div>
				<template v-else>
					<!-- 表体 -->
					<table v-if="rowData.length" cellpadding="0" cellspacing="0">
						<tr v-for="(row, rowIndex) in rowData" :class="{ stripe: stripe }">
							<td v-for="(column, columnIndex) in columnData" :class="bodyColumnClass(row, rowIndex, column, columnIndex)" :style="bodyColumnStyle(column, columnIndex)">
								<div class="mvi-table-column">
									<!-- 复选框 -->
									<div v-if="column.type == 'selection'" class="mvi-table-column-item" :class="{ center: center }">
										<Checkbox v-model="checkedRows" :value="rowIndex" size="0.24rem" @change="doCheck(rowIndex, column)" :color="activeColor" :disabled="!cmpSelectable(row, rowIndex, column)"></Checkbox>
									</div>
									<!-- 自定义单元格 -->
									<div v-else-if="column.type == 'custom' && $slots.custom" class="mvi-table-column-item" :class="{ center: center }">
										<slot name="custom" :row="row" :row-index="rowIndex" :column="column" :column-index="columnIndex"></slot>
									</div>
									<!-- 其他 -->
									<Tooltip v-else class="mvi-table-column-tooltip" :disabled="!column.ellipsis || !tooltipTitle(row, column)" block :title="tooltipTitle(row, column)" trigger="hover" :placement="center ? 'bottom' : 'bottom-start'">
										<div class="mvi-table-column-item" :class="{ center: center }">
											<div v-html="dataFormat(row, column)" :class="{ ellipsis: column.ellipsis }"></div>
										</div>
									</Tooltip>
								</div>
							</td>
						</tr>
					</table>
					<!-- 无数据提示 -->
					<div v-else class="mvi-table-nodata">{{ noDataMsg }}</div>
				</template>
			</div>
		</div>
	</div>
</template>
<script>
import Dap from 'dap-util'
import { Loading } from '../loading'
import { Icon } from '../icon'
import { Checkbox } from '../checkbox'
import { Tooltip } from '../tooltip'
import { getCurrentInstance } from 'vue'
export default {
	name: 'm-table',
	emits: ['check', 'sort-cancel', 'sort-asc', 'sort-desc'],
	props: {
		//表格数据
		data: {
			type: Array,
			default: function () {
				return []
			}
		},
		//表格列配置：包括type(selection/custom/default)/label/prop/width/className/hidden/sortable/format/selectable/sortMethod/ellipsis
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
			//排序的字段，即依据此字段排序
			sortBy: '',
			//排序方式，asc还是desc
			sortOrder: '',
			//复选框勾选的行
			checkedRows: [],
			//是否全选
			selectAll: false,
			//表头列元素数组
			headerColumnRefs: []
		}
	},
	computed: {
		//表格整体宽度
		wrapWidth() {
			//this.columnAlignKey只是为了刷新计算属性
			this.columnAlignKey
			if (this.headerColumnRefs.length) {
				//获取列宽总和，没有设置列宽的按照最小宽度算
				let width = this.headerColumnRefs.reduce((total, item, index) => {
					const width = this.columnData[index].width ? this.parseWidth(this.columnData[index].width) : Dap.element.rem2px(2)
					return (total += width)
				}, 0)
				if (this.scrollWidth) {
					width += this.scrollWidth
				}
				//获取表格组件总宽度
				const tableWidth = Dap.element.width(this.$el)
				//如果列宽总和还没有达到表格组件总宽度，则没有设置列宽的无需按照最小宽度算
				return width > tableWidth ? width + 'px' : tableWidth + 'px'
			}
			return ''
		},
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
					width: column.width ? this.parseWidth(column.width) + 'px' : 'auto'
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
			return (column, index) => {
				//this.columnAlignKey只是为了刷新计算属性
				this.columnAlignKey
				return {
					width: this.headerColumnRefs[index] ? Dap.element.getCssStyle(this.headerColumnRefs[index], 'width') : ''
				}
			}
		},
		//排序图标激活时设置主题色
		sortIconStyle() {
			return (sortOrder, column) => {
				let style = {}
				if (this.sortBy == column.prop && this.sortOrder == sortOrder) {
					style.color = this.activeColor || ''
				}
				return style
			}
		},
		//格式化单元格显示的数据
		dataFormat() {
			return (row, column) => {
				if (typeof column.format == 'function') {
					return column.format.apply(this, [row[column.prop], row, column]) || ''
				}
				return row[column.prop] ? row[column.prop] + '' : ''
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
		},
		//工具提示内容
		tooltipTitle() {
			return (row, column) => {
				const dom = Dap.element.string2dom(`<div>${this.dataFormat(row, column)}</div>`)
				return dom.innerText
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
				this.$nextTick(() => {
					this.doLayout()
				})
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
				//在高度设置后
				this.$nextTick(() => {
					this.doLayout()
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
		//设置表格列对齐
		this.doLayout()
		//屏幕大小变化
		Dap.event.on(window, `resize.table_${this.uid}`, e => {
			this.doLayout()
		})
	},
	methods: {
		//设置表格列对齐
		doLayout() {
			//设置滚动条宽度
			this.scrollWidth = this.getScrollWidth()
			//滚动条宽度获取后等待渲染完成重新对齐列
			this.$nextTick(() => {
				this.columnAlignKey++
			})
		},
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
			if (this.sortBy == column.prop && this.sortOrder == 'asc') {
				this.sortBy = ''
				this.sortOrder = ''
				if (typeof column.sortMethod == 'function') {
					column.sortMethod.apply(this, [this.sortOrder, this.sortBy, this.rowData, column])
				} else {
					this.rowData = this.deepClone(this.data)
					this.$emit('sort-cancel', this.rowData)
				}
			}
			//升序排序
			else {
				this.sortBy = column.prop
				this.sortOrder = 'asc'
				if (typeof column.sortMethod == 'function') {
					column.sortMethod.apply(this, [this.sortOrder, this.sortBy, this.rowData, column])
				} else {
					this.rowData = this.rowData.sort(function (rowA, rowB) {
						if (Dap.number.isNumber(rowA[column.prop]) && Dap.number.isNumber(rowB[column.prop])) {
							return rowA[column.prop] - rowB[column.prop]
						}
						return rowA[column.prop].toString().localeCompare(rowB[column.prop].toString(), 'zh-CN')
					})
					this.$emit('sort-asc', this.rowData)
				}
			}
		},
		//降序排序
		sortDesc(column) {
			//取消排序
			if (this.sortBy == column.prop && this.sortOrder == 'desc') {
				this.sortBy = ''
				this.sortOrder = ''
				if (typeof column.sortMethod == 'function') {
					column.sortMethod.apply(this, [this.sortOrder, this.sortBy, this.rowData, column])
				} else {
					this.rowData = this.deepClone(this.data)
					this.$emit('sort-cancel', this.rowData)
				}
			}
			//降序排序
			else {
				this.sortBy = column.prop
				this.sortOrder = 'desc'
				if (typeof column.sortMethod == 'function') {
					column.sortMethod.apply(this, [this.sortOrder, this.sortBy, this.rowData, column])
				} else {
					this.rowData = this.rowData.sort(function (rowA, rowB) {
						if (Dap.number.isNumber(rowA[column.prop]) && Dap.number.isNumber(rowB[column.prop])) {
							return rowB[column.prop] - rowA[column.prop]
						}
						return -rowA[column.prop].toString().localeCompare(rowB[column.prop].toString(), 'zh-CN')
					})
					this.$emit('sort-desc', this.rowData)
				}
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
		},
		//列宽数值转换
		parseWidth(val) {
			if (Dap.number.isNumber(val)) {
				return val
			}
			if (typeof val == 'string' && val) {
				if (val.endsWith('px')) {
					return parseFloat(val)
				}
				if (val.endsWith('rem')) {
					return Dap.element.rem2px(parseFloat(val))
				}
			}
			return 0
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
	overflow-x: auto;
	overflow-y: hidden;
	background-color: #fff;
	font-size: @font-size-default;
	color: @font-color-default;

	&.border {
		border: 1px solid @border-color;
	}

	.mvi-table-wrap {
		display: block;
		min-width: 100%;

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
						position: relative;

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
							width: 100%;
							white-space: normal;
							word-break: break-all;

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
						position: relative;

						&.border {
							border-right: 1px solid @border-color;

							&:last-child {
								border-right: none;
							}
						}

						.mvi-table-column {
							display: block;
							padding: 0 @mp-sm;
							width: 100%;
							white-space: normal;
							word-break: break-all;

							.mvi-table-column-tooltip {
								width: 100%;

								.ellipsis {
									text-overflow: ellipsis;
									overflow: hidden;
									white-space: nowrap;
								}
							}

							.mvi-table-column-item {
								display: flex;
								justify-content: flex-start;
								align-items: center;
								width: 100%;

								&.center {
									justify-content: center;
								}
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
}
</style>
