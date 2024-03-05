/**
 * 实现监听元素的属性变更
 */
interface Opts {
    attributes?: boolean;
    childList?: boolean;
    subtree?: boolean;
    attributeNames?: Array<string>;
    attributesChange?: (...args: any) => void;
    childNodesChange?: (...args: any) => void;
}
declare class Observe {
    private $el;
    private attributes?;
    private childList?;
    private subtree?;
    private attributeNames?;
    private attributesChange?;
    private childNodesChange?;
    private hasInit;
    static install: (...args: any) => void;
    constructor(el: HTMLElement, options: Opts);
    init(): void;
}
export default Observe;
