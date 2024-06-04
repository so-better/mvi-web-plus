export type SpyOptionsType = {
    el?: HTMLElement | string;
    beforeEnter?: (...args: any) => void;
    enter?: (...args: any) => void;
    beforeLeave?: (...args: any) => void;
    leave?: (...args: any) => void;
};
/**
 * 滚动侦听
 */
declare class Spy {
    private $el;
    private $root?;
    private beforeEnter?;
    private enter?;
    private beforeLeave?;
    private leave?;
    private hasInit;
    private triggerTag;
    private guid;
    static install: (...args: any) => void;
    constructor(element: HTMLElement, options: SpyOptionsType);
    private scrollHandle;
    private createGuid;
    init(): void;
    destroy(): void;
}
export default Spy;
