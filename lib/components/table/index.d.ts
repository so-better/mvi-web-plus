export type * from './props';
declare const Table: import('../../utils').SFCWithInstall<{
    new (...args: any[]): import('vue').CreateComponentPublicInstance<Readonly<import('vue').ExtractPropTypes<{
        data: {
            type: import('vue').PropType<any[]>;
            default: () => never[];
        };
        columns: {
            type: import('vue').PropType<import('./props').TableColumnType[]>;
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
            type: import('vue').PropType<(row: any, rowIndex: number, column: import('./props').TableColumnType, columnIndex: number) => string>;
            default: null;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
        };
        tooltip: {
            type: import('vue').PropType<import('../tooltip').TooltipPropsType>;
            default: null;
        };
    }>> & {
        onCheck?: ((...args: any[]) => any) | undefined;
        "onSort-cancel"?: ((...args: any[]) => any) | undefined;
        "onSort-asc"?: ((...args: any[]) => any) | undefined;
        "onSort-desc"?: ((...args: any[]) => any) | undefined;
    }, {
        doLayout: () => void;
    }, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
        check: (...args: any[]) => void;
        "sort-cancel": (...args: any[]) => void;
        "sort-asc": (...args: any[]) => void;
        "sort-desc": (...args: any[]) => void;
    }, import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & Readonly<import('vue').ExtractPropTypes<{
        data: {
            type: import('vue').PropType<any[]>;
            default: () => never[];
        };
        columns: {
            type: import('vue').PropType<import('./props').TableColumnType[]>;
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
            type: import('vue').PropType<(row: any, rowIndex: number, column: import('./props').TableColumnType, columnIndex: number) => string>;
            default: null;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
        };
        tooltip: {
            type: import('vue').PropType<import('../tooltip').TooltipPropsType>;
            default: null;
        };
    }>> & {
        onCheck?: ((...args: any[]) => any) | undefined;
        "onSort-cancel"?: ((...args: any[]) => any) | undefined;
        "onSort-asc"?: ((...args: any[]) => any) | undefined;
        "onSort-desc"?: ((...args: any[]) => any) | undefined;
    }, {
        data: any[];
        loading: boolean;
        height: string;
        border: boolean;
        center: boolean;
        activeColor: string;
        loadText: string;
        tooltip: {
            title?: string | undefined;
            zIndex?: number | undefined;
            color?: string | undefined;
            timeout?: number | undefined;
            placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
            width?: string | undefined;
            offset?: string | undefined;
            disabled?: boolean | undefined;
            borderColor?: string | undefined;
            showTriangle?: boolean | undefined;
            animation?: string | undefined;
            block?: boolean | undefined;
            trigger?: "click" | "hover" | "custom" | undefined;
            textColor?: string | undefined;
        };
        columns: import('./props').TableColumnType[];
        columnBorder: boolean;
        stripe: boolean;
        noDataMsg: string;
        cellClass: (row: any, rowIndex: number, column: import('./props').TableColumnType, columnIndex: number) => string;
    }, true, {}, {}, {
        P: {};
        B: {};
        D: {};
        C: {};
        M: {};
        Defaults: {};
    }, Readonly<import('vue').ExtractPropTypes<{
        data: {
            type: import('vue').PropType<any[]>;
            default: () => never[];
        };
        columns: {
            type: import('vue').PropType<import('./props').TableColumnType[]>;
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
            type: import('vue').PropType<(row: any, rowIndex: number, column: import('./props').TableColumnType, columnIndex: number) => string>;
            default: null;
        };
        activeColor: {
            type: StringConstructor;
            default: null;
        };
        tooltip: {
            type: import('vue').PropType<import('../tooltip').TooltipPropsType>;
            default: null;
        };
    }>> & {
        onCheck?: ((...args: any[]) => any) | undefined;
        "onSort-cancel"?: ((...args: any[]) => any) | undefined;
        "onSort-asc"?: ((...args: any[]) => any) | undefined;
        "onSort-desc"?: ((...args: any[]) => any) | undefined;
    }, {
        doLayout: () => void;
    }, {}, {}, {}, {
        data: any[];
        loading: boolean;
        height: string;
        border: boolean;
        center: boolean;
        activeColor: string;
        loadText: string;
        tooltip: {
            title?: string | undefined;
            zIndex?: number | undefined;
            color?: string | undefined;
            timeout?: number | undefined;
            placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
            width?: string | undefined;
            offset?: string | undefined;
            disabled?: boolean | undefined;
            borderColor?: string | undefined;
            showTriangle?: boolean | undefined;
            animation?: string | undefined;
            block?: boolean | undefined;
            trigger?: "click" | "hover" | "custom" | undefined;
            textColor?: string | undefined;
        };
        columns: import('./props').TableColumnType[];
        columnBorder: boolean;
        stripe: boolean;
        noDataMsg: string;
        cellClass: (row: any, rowIndex: number, column: import('./props').TableColumnType, columnIndex: number) => string;
    }>;
    __isFragment?: never;
    __isTeleport?: never;
    __isSuspense?: never;
} & import('vue').ComponentOptionsBase<Readonly<import('vue').ExtractPropTypes<{
    data: {
        type: import('vue').PropType<any[]>;
        default: () => never[];
    };
    columns: {
        type: import('vue').PropType<import('./props').TableColumnType[]>;
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
        type: import('vue').PropType<(row: any, rowIndex: number, column: import('./props').TableColumnType, columnIndex: number) => string>;
        default: null;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
    tooltip: {
        type: import('vue').PropType<import('../tooltip').TooltipPropsType>;
        default: null;
    };
}>> & {
    onCheck?: ((...args: any[]) => any) | undefined;
    "onSort-cancel"?: ((...args: any[]) => any) | undefined;
    "onSort-asc"?: ((...args: any[]) => any) | undefined;
    "onSort-desc"?: ((...args: any[]) => any) | undefined;
}, {
    doLayout: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {
    check: (...args: any[]) => void;
    "sort-cancel": (...args: any[]) => void;
    "sort-asc": (...args: any[]) => void;
    "sort-desc": (...args: any[]) => void;
}, string, {
    data: any[];
    loading: boolean;
    height: string;
    border: boolean;
    center: boolean;
    activeColor: string;
    loadText: string;
    tooltip: {
        title?: string | undefined;
        zIndex?: number | undefined;
        color?: string | undefined;
        timeout?: number | undefined;
        placement?: "left" | "top" | "bottom" | "right" | "top-start" | "top-end" | "left-start" | "left-end" | "right-start" | "right-end" | "bottom-start" | "bottom-end" | undefined;
        width?: string | undefined;
        offset?: string | undefined;
        disabled?: boolean | undefined;
        borderColor?: string | undefined;
        showTriangle?: boolean | undefined;
        animation?: string | undefined;
        block?: boolean | undefined;
        trigger?: "click" | "hover" | "custom" | undefined;
        textColor?: string | undefined;
    };
    columns: import('./props').TableColumnType[];
    columnBorder: boolean;
    stripe: boolean;
    noDataMsg: string;
    cellClass: (row: any, rowIndex: number, column: import('./props').TableColumnType, columnIndex: number) => string;
}, {}, string, {}> & import('vue').VNodeProps & import('vue').AllowedComponentProps & import('vue').ComponentCustomProps & (new () => {
    $slots: {
        custom?(_: {
            row: any;
            rowIndex: number;
            column: {
                type?: "selection" | "custom" | "default";
                label?: string;
                prop: string;
                width?: string | number;
                className?: string;
                hidden?: boolean;
                sortable?: boolean;
                format?: (val: any, row: any, column: import('./props').TableColumnType) => string;
                selectable?: (row: any, rowIndex: number) => boolean;
                sortMethod?: (sortOrder: import('./props').TableSortOrderType, sortBy: string, rows: any, column: import('./props').TableColumnType) => void;
                ellipsis?: boolean;
            };
            columnIndex: number;
        }): any;
    };
})>;
export { Table, Table as default };
