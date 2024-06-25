<template>
	<div class="mvi-table" ref="elRef" :class="{ border: border }">
		<div class="mvi-table-wrap" :style="{ width: wrapWidth }">
			<div class="mvi-table-header">
				<!-- 表头 -->
				<table cellpadding="0" cellspacing="0">
					<tr>
						<th v-for="(column, index) in columnData" :ref="el => (headerColumnRefs[index] = <HTMLElement>el)" :class="{ border: columnBorder }" :style="headerColumnStyle(column)">
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
			<div ref="bodyRef" class="mvi-table-body" :class="{ overflow: !!height }" :style="{ maxHeight: height }">
				<!-- 加载状态 -->
				<div class="mvi-table-loading" v-if="loading">
					<Loading size="0.32rem" />
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
									<div v-else class="mvi-table-column-item" :class="{ center: center }">
										<Tooltip :disabled="!column.ellipsis" trigger="hover" placement="bottom" :color="tooltip?.color" :text-color="tooltip?.textColor" :border-color="tooltip?.borderColor" :show-triangle="tooltip?.showTriangle" :animation="tooltip?.animation" :z-index="tooltip?.zIndex" :offset="tooltip?.offset" :timeout="tooltip?.timeout">
											<template #title>
												<div v-html="dataFormat(row, column)"></div>
											</template>
											<div v-html="dataFormat(row, column)" :class="{ ellipsis: column.ellipsis }"></div>
										</Tooltip>
									</div>
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
<script setup lang="ts">
import Dap from 'dap-util'
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Loading } from '@/components/loading'
import { Icon } from '@/components/icon'
import { Checkbox } from '@/components/checkbox'
import { Tooltip } from '@/components/tooltip'
import { TableColumnType, TableProps, TableSortOrderType } from './props'

defineOptions({
	name: 'm-table'
})

//实例
const instance = getCurrentInstance()!

//属性
const props = defineProps(TableProps)

//事件
const emits = defineEmits(['check', 'sort-cancel', 'sort-asc', 'sort-desc'])

//刷新表格列对齐的字段
const columnAlignKey = ref<number>(0)
//表格数据
const rowData = ref<any[]>([])
//列数据
const columnData = ref<TableColumnType[]>([])
//表格滚动条宽度
const scrollWidth = ref<number>(0)
//排序的字段，即依据此字段排序
const sortBy = ref<string>('')
//排序方式，asc还是desc
const sortOrder = ref<TableSortOrderType>('')
//复选框勾选的行
const checkedRows = ref<any[]>([])
//是否全选
const selectAll = ref<boolean>(false)
//表头列元素数组
const headerColumnRefs = ref<HTMLElement[]>([])

const elRef = ref<HTMLElement | null>(null)
const bodyRef = ref<HTMLElement | null>(null)

//表格整体宽度
const wrapWidth = computed<string>(() => {
	//columnAlignKey只是为了刷新计算属性
	columnAlignKey.value
	if (headerColumnRefs.value.length) {
		//获取列宽总和，没有设置列宽的按照最小宽度算
		let width = headerColumnRefs.value.reduce((total, _item, index) => {
			const width = columnData.value[index].width ? parseWidth(columnData.value[index].width!) : Dap.element.rem2px(2)
			return (total += width)
		}, 0)
		if (scrollWidth.value) {
			width += scrollWidth.value
		}
		//获取表格组件总宽度
		const tableWidth = Dap.element.width(elRef.value!)
		//如果列宽总和还没有达到表格组件总宽度，则没有设置列宽的无需按照最小宽度算
		return width > tableWidth ? width + 'px' : tableWidth + 'px'
	}
	return ''
})
//表头列样式
const headerColumnStyle = computed<(column: TableColumnType) => any>(() => {
	return (column: TableColumnType) => {
		return {
			width: column.width ? parseWidth(column.width) + 'px' : 'auto'
		}
	}
})
//表主体列class
const bodyColumnClass = computed<(row: any, rowIndex: number, column: TableColumnType, columnIndex: number) => string[]>(() => {
	return (row: any, rowIndex: number, column: TableColumnType, columnIndex: number) => {
		let cls: string[] = []
		if (props.columnBorder) {
			cls.push('border')
		}
		if (column.className) {
			cls.push(column.className)
		}
		if (typeof props.cellClass == 'function') {
			cls.push(props.cellClass.apply(instance.proxy, [row, rowIndex, column, columnIndex]) || '')
		}
		return cls
	}
})
//表主体列的宽度设置
const bodyColumnStyle = computed<(_column: TableColumnType, index: number) => any>(() => {
	return (_column: TableColumnType, index: number) => {
		//columnAlignKey只是为了刷新计算属性
		columnAlignKey.value
		return {
			width: headerColumnRefs.value[index] ? Dap.element.getCssStyle(headerColumnRefs.value[index], 'width') : ''
		}
	}
})
//排序图标激活时设置主题色
const sortIconStyle = computed<(_sortOrder: TableSortOrderType, column: TableColumnType) => any>(() => {
	return (_sortOrder: TableSortOrderType, column: TableColumnType) => {
		let style: any = {}
		if (sortBy.value == column.prop && sortOrder.value == _sortOrder) {
			style.color = props.activeColor || ''
		}
		return style
	}
})
//格式化单元格显示的数据
const dataFormat = computed<(row: any, column: TableColumnType) => string>(() => {
	return (row: any, column: TableColumnType) => {
		if (typeof column.format == 'function') {
			return column.format.apply(instance.proxy, [row[column.prop], row, column]) || ''
		}
		return row[column.prop] ? row[column.prop] + '' : ''
	}
})
//判断某一行复选框是否可以使用
const cmpSelectable = computed<(row: any, rowIndex: number, column: TableColumnType) => boolean>(() => {
	return (row: any, rowIndex: number, column: TableColumnType) => {
		if (typeof column.selectable == 'function') {
			return column.selectable.apply(instance.proxy, [row, rowIndex])
		}
		return true
	}
})

//列宽数值转换
const parseWidth = (val: number | string): number => {
	if (Dap.number.isNumber(val)) {
		return <number>val
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
//深拷贝数据
const deepClone = (data: any): any => {
	//数组
	if (Array.isArray(data)) {
		return data.map(item => {
			return deepClone(item)
		})
	}
	//对象
	if (Dap.common.isObject(data)) {
		let cloneData: any = {}
		for (let key in data) {
			cloneData[key] = deepClone(data[key])
		}
		return cloneData
	}
	return data
}
//获取表格主体滚动条宽度
const getScrollWidth = () => {
	return bodyRef.value!.offsetWidth - bodyRef.value!.clientWidth
}
//升序排序
const sortAsc = (column: TableColumnType) => {
	//取消排序
	if (sortBy.value == column.prop && sortOrder.value == 'asc') {
		sortBy.value = ''
		sortOrder.value = ''
		if (typeof column.sortMethod == 'function') {
			column.sortMethod.apply(instance.proxy, [sortOrder.value, sortBy.value, rowData.value, column])
		} else {
			rowData.value = deepClone(props.data)
			emits('sort-cancel', rowData.value)
		}
	}
	//升序排序
	else {
		sortBy.value = column.prop
		sortOrder.value = 'asc'
		if (typeof column.sortMethod == 'function') {
			column.sortMethod.apply(instance.proxy, [sortOrder.value, sortBy.value, rowData.value, column])
		} else {
			rowData.value = rowData.value.sort(function (rowA, rowB) {
				if (Dap.number.isNumber(rowA[column.prop]) && Dap.number.isNumber(rowB[column.prop])) {
					return rowA[column.prop] - rowB[column.prop]
				}
				return rowA[column.prop].toString().localeCompare(rowB[column.prop].toString(), 'zh-CN')
			})
			emits('sort-asc', rowData.value)
		}
	}
}
//降序排序
const sortDesc = (column: TableColumnType) => {
	//取消排序
	if (sortBy.value == column.prop && sortOrder.value == 'desc') {
		sortBy.value = ''
		sortOrder.value = ''
		if (typeof column.sortMethod == 'function') {
			column.sortMethod.apply(instance.proxy, [sortOrder.value, sortBy.value, rowData.value, column])
		} else {
			rowData.value = deepClone(props.data)
			emits('sort-cancel', rowData.value)
		}
	}
	//降序排序
	else {
		sortBy.value = column.prop
		sortOrder.value = 'desc'
		if (typeof column.sortMethod == 'function') {
			column.sortMethod.apply(instance.proxy, [sortOrder.value, sortBy.value, rowData.value, column])
		} else {
			rowData.value = rowData.value.sort(function (rowA, rowB) {
				if (Dap.number.isNumber(rowA[column.prop]) && Dap.number.isNumber(rowB[column.prop])) {
					return rowB[column.prop] - rowA[column.prop]
				}
				return -rowA[column.prop].toString().localeCompare(rowB[column.prop].toString(), 'zh-CN')
			})
			emits('sort-desc', rowData.value)
		}
	}
}
//复选框全选
const allSelect = (column: TableColumnType) => {
	//全选
	if (selectAll.value) {
		checkedRows.value = []
		for (let i = 0; i < rowData.value.length; i++) {
			if (cmpSelectable.value(rowData.value[i], i, column)) {
				checkedRows.value.push(i)
			}
		}
	}
	//取消全选
	else {
		checkedRows.value = []
	}
	emits('check', checkedRows.value)
}
//单个复选框勾选
const doCheck = (rowIndex: number, column: TableColumnType) => {
	if (
		checkedRows.value.length ==
		rowData.value.filter((item, index) => {
			return cmpSelectable.value(item, index, column)
		}).length
	) {
		selectAll.value = true
	} else {
		selectAll.value = false
	}
	emits('check', checkedRows.value, rowIndex)
}
//设置表格列对齐
const doLayout = () => {
	//设置滚动条宽度
	scrollWidth.value = getScrollWidth()
	//滚动条宽度获取后等待渲染完成重新对齐列
	nextTick(() => {
		columnAlignKey.value++
	})
}

//监听data更新rowData
watch(
	() => props.data,
	newVal => {
		rowData.value = deepClone(newVal)
		checkedRows.value = []
		selectAll.value = false
		nextTick(() => {
			doLayout()
		})
	},
	{
		immediate: true
	}
)
//监听columns更新columnData
watch(
	() => props.columns,
	newVal => {
		columnData.value = deepClone(newVal).filter((column: TableColumnType) => {
			//隐藏的列不获取
			return !column.hidden
		})
	},
	{
		immediate: true
	}
)
//监听height属性
watch(
	() => props.height,
	() => {
		//在高度设置后
		nextTick(() => {
			doLayout()
		})
	},
	{
		immediate: true
	}
)

onMounted(() => {
	//设置表格列对齐
	doLayout()
	//屏幕大小变化
	Dap.event.on(window, `resize.table_${instance.uid}`, () => {
		doLayout()
	})
})
onBeforeUnmount(() => {
	Dap.event.off(window, `resize.table_${instance.uid}`)
})

defineExpose({
	doLayout
})
</script>
<style scoped src="./table.less"></style>
