/**
 * 监听元素滚动条到达顶部或者底部
 */
interface Opts {
    top?: (...args: any) => void;
    bottom?: (...args: any) => void;
}
declare class Scroll {
    private $el;
    private top?;
    private bottom?;
    private hasInit;
    static install: (...args: any) => void;
    constructor(element: HTMLElement, options: Opts);
    init(): void;
}
export default Scroll;
