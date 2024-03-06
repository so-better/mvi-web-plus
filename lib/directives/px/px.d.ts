/**
 * 1px适配实现
 */
type PxOptionsType = {
    attrName?: string;
    after?: boolean;
    before?: boolean;
};
declare class Px {
    private $el;
    private attrName?;
    private isAfter?;
    private isBefore?;
    private hasInit;
    static install: (...args: any) => void;
    constructor(element: HTMLElement, options: PxOptionsType);
    private handle;
    private createGuid;
    init(): void;
}
export default Px;
