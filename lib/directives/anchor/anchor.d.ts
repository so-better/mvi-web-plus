export type AnchorOptionsType = {
    target?: HTMLElement | string;
    root?: HTMLElement | string;
    time?: number;
    distance?: number;
    callback?: (top: number) => void;
};
/**
 * 锚点定位
 */
declare class Anchor {
    private $el;
    private $target?;
    private $root?;
    private callback?;
    private time?;
    private distance?;
    private hasInit;
    static install: (...args: any) => void;
    constructor(element: HTMLElement, options: AnchorOptionsType);
    init(): void;
}
export default Anchor;
