import { ExtractPublicPropTypes, PropType } from 'vue';
import { TooltipPropsType } from '../tooltip';

export type TableSortOrderType = 'desc' | 'asc' | '';
export type TableColumnType = {
    type?: 'selection' | 'custom' | 'default';
    label?: string;
    prop: string;
    width?: string | number;
    className?: string;
    hidden?: boolean;
    sortable?: boolean;
    format?: (val: any, row: any, column: TableColumnType) => string;
    selectable?: (row: any, rowIndex: number) => boolean;
    sortMethod?: (sortOrder: TableSortOrderType, sortBy: string, rows: any, column: TableColumnType) => void;
    ellipsis?: boolean;
};
export declare const TableProps: {
    data: {
        type: PropType<any[]>;
        default: () => never[];
    };
    columns: {
        type: PropType<TableColumnType[]>;
        default: () => never[];
    };
    border: {
        type: BooleanConstructor;
        default: boolean;
    };
    columnBorder: {
        type: BooleanConstructor;
        default: boolean;
    };
    stripe: {
        type: BooleanConstructor;
        default: boolean;
    };
    height: {
        type: StringConstructor;
        default: null;
    };
    noDataMsg: {
        type: StringConstructor;
        default: string;
    };
    loading: {
        type: BooleanConstructor;
        default: boolean;
    };
    loadText: {
        type: StringConstructor;
        default: string;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
    cellClass: {
        type: PropType<(row: any, rowIndex: number, column: TableColumnType, columnIndex: number) => string>;
        default: null;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
    tooltip: {
        type: PropType<TooltipPropsType>;
        default: null;
    };
};
export type TablePropsType = ExtractPublicPropTypes<typeof TableProps>;
