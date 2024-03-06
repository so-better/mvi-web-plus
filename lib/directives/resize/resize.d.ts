type ResizeModeType = {
    left: boolean;
    top: boolean;
    right: boolean;
    bottom: boolean;
};
type ResizeOptionsType = {
    draggableX?: boolean;
    draggableY?: boolean;
    mode?: ResizeModeType;
    beforeResize?: (...args: any) => boolean;
    resize?: (...args: any) => void;
    trigger?: (...args: any) => void;
    end?: (...args: any) => void;
    ready?: (...args: any) => void;
    range?: number;
};
/**
 * 拖拽改变元素大小
 */
declare class Resize {
    private $el;
    private draggableX?;
    private draggableY?;
    private mode?;
    private beforeResize?;
    private resize?;
    private trigger?;
    private end?;
    private ready?;
    private range?;
    private draggable;
    private leftRange;
    private rightRange;
    private topRange;
    private bottomRange;
    private leftTopRange;
    private rightTopRange;
    private leftBottomRange;
    private rightBottomRange;
    private startX;
    private startY;
    private _width;
    private _height;
    private _left;
    private _top;
    private hasInit;
    private cursor;
    private guid;
    static install: (...args: any) => void;
    constructor(element: HTMLElement, options: ResizeOptionsType);
    private getIsInRange;
    private down;
    private move;
    private leave;
    private setOn;
    private createGuid;
    init(): void;
    setRange(): void;
    destroy(): void;
    disabledDragX(): void;
    disabledDragY(): void;
    enabledDragX(): void;
    enabledDragY(): void;
}
export default Resize;
