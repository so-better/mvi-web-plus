import { TableColumnType, TableSortOrderType } from './props';

declare const _default: __VLS_WithTemplateSlots<import('vue').DefineComponent<{
    data: {
        type: import('vue').PropType<any[]>;
        default: () => never[];
    };
    columns: {
        type: import('vue').PropType<TableColumnType[]>;
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
        type: import('vue').PropType<(row: any, rowIndex: number, column: TableColumnType, columnIndex: number) => string>;
        default: null;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
}, {
    doLayout: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    check: (...args: any[]) => void;
    "sort-cancel": (...args: any[]) => void;
    "sort-asc": (...args: any[]) => void;
    "sort-desc": (...args: any[]) => void;
}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    data: {
        type: import('vue').PropType<any[]>;
        default: () => never[];
    };
    columns: {
        type: import('vue').PropType<TableColumnType[]>;
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
        type: import('vue').PropType<(row: any, rowIndex: number, column: TableColumnType, columnIndex: number) => string>;
        default: null;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
}>> & {
    onCheck?: ((...args: any[]) => any) | undefined;
    "onSort-cancel"?: ((...args: any[]) => any) | undefined;
    "onSort-asc"?: ((...args: any[]) => any) | undefined;
    "onSort-desc"?: ((...args: any[]) => any) | undefined;
}, {
    data: any[];
    border: boolean;
    height: string;
    loading: boolean;
    center: boolean;
    activeColor: string;
    loadText: string;
    columns: TableColumnType[];
    columnBorder: boolean;
    stripe: boolean;
    noDataMsg: string;
    cellClass: (row: any, rowIndex: number, column: TableColumnType, columnIndex: number) => string;
}, {}>, {
    custom?(_: {
        row: any;
        rowIndex: number;
        column: {
            type?: "default" | "custom" | "selection" | undefined;
            label?: string | undefined;
            prop: string;
            width?: string | number | undefined;
            className?: string | undefined;
            hidden?: boolean | undefined;
            sortable?: boolean | undefined;
            format?: ((val: any, row: any, column: TableColumnType) => string) | undefined;
            selectable?: ((row: any, rowIndex: number) => boolean) | undefined;
            sortMethod?: ((sortOrder: TableSortOrderType, sortBy: string, rows: any, column: TableColumnType) => void) | undefined;
            ellipsis?: boolean | undefined;
        };
        columnIndex: number;
    }): any;
}>;
export default _default;
type __VLS_WithTemplateSlots<T, S> = T & {
    new (): {
        $slots: S;
    };
};
