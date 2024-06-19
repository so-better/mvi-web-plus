/**
 * 高度比例系数
 */
declare class Prop {
    private $el;
    private ratio;
    private width;
    private height;
    private hasInit;
    private guid;
    constructor(element: HTMLElement, ratio: number);
    private createGuid;
    set(number?: number): void;
    init(): void;
    destroy(): void;
}
export default Prop;
