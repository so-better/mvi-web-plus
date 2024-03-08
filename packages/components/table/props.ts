import { ExtractPublicPropTypes, PropType } from 'vue'

export type TableSortOrderType = 'desc' | 'asc' | ''

export type TableColumnType = {
	type?: 'selection' | 'custom' | 'default'
	label?: string
	prop: string
	width?: string | number
	className?: string
	hidden?: boolean
	sortable?: boolean
	format?: (val: any, row: any, column: TableColumnType) => string
	selectable?: (row: any, rowIndex: number) => boolean
	sortMethod?: (sortOrder: TableSortOrderType, sortBy: string, rows: any, column: TableColumnType) => void
	ellipsis?: boolean
}

export const TableProps = {
	//表格数据
	data: {
		type: Array as PropType<any[]>,
		default: function () {
			return []
		}
	},
	//表格列配置
	columns: {
		type: Array as PropType<TableColumnType[]>,
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
		type: Function as PropType<(row: any, rowIndex: number, column: TableColumnType, columnIndex: number) => string>,
		default: null
	},
	//主题色
	activeColor: {
		type: String,
		default: null
	}
}

export type TablePropsType = ExtractPublicPropTypes<typeof TableProps>
