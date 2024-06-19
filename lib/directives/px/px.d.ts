/**
 * 1px适配实现
 */
export type PxOptionsType = {
    attr?: string;
    after?: boolean;
    before?: boolean;
};
declare class Px {
    private $el;
    private attr?;
    private isAfter?;
    private isBefore?;
    private hasInit;
    constructor(element: HTMLElement, options: PxOptionsType);
    private handle;
    private createGuid;
    init(): void;
}
export default Px;
