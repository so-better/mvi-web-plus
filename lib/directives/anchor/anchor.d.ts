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
export default class Anchor {
    private $el;
    private $target?;
    private $root?;
    private callback?;
    private time?;
    private distance?;
    private hasInit;
    constructor(element: HTMLElement, options: AnchorOptionsType);
    init(): void;
}
