declare const _default: {
    interval: {
        type: NumberConstructor;
        default: number;
    };
    direction: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    autoplay: {
        type: BooleanConstructor;
        default: boolean;
    };
    loop: {
        type: BooleanConstructor;
        default: boolean;
    };
    animation: {
        type: StringConstructor;
        default: string;
        validator(value: any): boolean;
    };
    clickStop: {
        type: BooleanConstructor;
        default: boolean;
    };
    hoverStop: {
        type: BooleanConstructor;
        default: boolean;
    };
    center: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export default _default;
