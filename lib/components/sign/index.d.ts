export type * from './props';
declare const Sign: import('../../utils').SFCWithInstall<import('vue').DefineComponent<{
    color: {
        type: StringConstructor;
        default: string;
    };
    background: {
        type: StringConstructor;
        default: string;
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
        default: string;
    };
    background: {
        type: StringConstructor;
        default: string;
    };
    width: {
        type: NumberConstructor;
        default: number;
    };
}>>, {
    width: number;
    color: string;
    background: string;
}, {}>>;
export { Sign, Sign as default };
