export type * from './props';
declare const Sign: import('../../utils').SFCWithInstall<import('vue').DefineComponent<{
    color: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
}, {
    getImage: () => string;
    clear: () => void;
}, unknown, {}, {}, import('vue').ComponentOptionsMixin, import('vue').ComponentOptionsMixin, {}, string, import('vue').PublicProps, Readonly<import('vue').ExtractPropTypes<{
    color: {
        type: StringConstructor;
        default: null;
    };
    background: {
        type: StringConstructor;
        default: null;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    color: string;
    width: number;
    background: string;
}, {}>>;
export { Sign, Sign as default };
