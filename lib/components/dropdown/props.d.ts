import { PropType } from 'vue';
import { OptionsItem } from './OptionsItem';
declare const _default: {
    modelValue: {
        type: (StringConstructor | ObjectConstructor | ArrayConstructor | NumberConstructor)[];
        default: null;
    };
    activeColor: {
        type: StringConstructor;
        default: null;
    };
    options: {
        type: PropType<OptionsItem[]>;
        default: () => never[];
    };
    selectedClose: {
        type: BooleanConstructor;
        default: boolean;
    };
    selectedIcon: {
        type: (StringConstructor | ObjectConstructor)[];
        default: string;
    };
    show: {
        type: BooleanConstructor;
        default: boolean;
    };
    overlayColor: {
        type: StringConstructor;
        default: null;
    };
    zIndex: {
        type: NumberConstructor;
        default: number;
    };
    timeout: {
        type: NumberConstructor;
        default: number;
    };
    round: {
        type: BooleanConstructor;
        default: boolean;
    };
    placement: {
        type: StringConstructor;
        default: string;
    };
    closable: {
        type: BooleanConstructor;
        default: boolean;
    };
    mountEl: {
        type: StringConstructor;
        default: null;
    };
    active: {
        type: BooleanConstructor;
        default: boolean;
    };
    usePadding: {
        type: BooleanConstructor;
        default: boolean;
    };
};
export default _default;
