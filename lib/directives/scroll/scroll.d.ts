/**
 * 监听元素滚动条到达顶部或者底部
 */
export type ScrollOptionsType = {
    top?: (...args: any) => void;
    bottom?: (...args: any) => void;
};
declare class Scroll {
    private $el;
    private top?;
    private bottom?;
    private hasInit;
    constructor(element: HTMLElement, options: ScrollOptionsType);
    init(): void;
}
export default Scroll;
