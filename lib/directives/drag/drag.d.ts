type DragOptionsType = {
    container?: HTMLElement | string;
    mode?: string;
    draggableX?: boolean;
    draggableY?: boolean;
    cursor?: boolean;
    beforeDrag?: (...args: any) => void;
    drag?: (...args: any) => void;
    dragged?: (...args: any) => void;
    ready?: (...args: any) => void;
};
/**
 * Drag拖拽插件
 */
declare class Drag {
    private $el;
    private $container?;
    draggableX?: boolean;
    draggableY?: boolean;
    private mode?;
    private cursor?;
    private beforeDrag?;
    private drag?;
    private dragged?;
    private ready?;
    private draggable;
    private hasInit;
    private pageX;
    private pageY;
    private guid;
    static install: (...args: any) => void;
    constructor(element: HTMLElement, options: DragOptionsType);
    private setOn;
    private resize;
    private createGuid;
    init(): void;
    destroy(): void;
}
export default Drag;
