/**
 * 水波纹效果
 */
export type RippleOptionsType = {
    color?: string;
    duration?: number;
    finalOpacity?: number;
    initialOpacity?: number;
    delay?: number;
    disabled?: boolean;
};
declare class Ripple {
    private $el;
    private color?;
    private duration?;
    private finalOpacity?;
    private initialOpacity?;
    private delay?;
    private disabled?;
    private hasInit;
    private isSupportTouch;
    private guid;
    private rippleContainers;
    static install: (...args: any) => void;
    constructor(element: HTMLElement, options: RippleOptionsType);
    private endDeal;
    private createRippleElement;
    private createRippleContainer;
    private getRadius;
    private createGuid;
    init(): void;
    destroy(): void;
}
export default Ripple;
