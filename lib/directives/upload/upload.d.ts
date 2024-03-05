interface Opts {
    accept?: string;
    capture?: boolean;
    allowedFileType?: Array<string>;
    multiple?: boolean;
    minSize?: number;
    maxSize?: number;
    minLength?: number;
    maxLength?: number;
    append?: boolean;
    disabled?: boolean;
    error?: (...args: any) => void;
    select?: (...args: any) => void;
    ready?: (...args: any) => void;
    extraData?: object;
}
/**
 * 文件上传
 */
declare class Upload {
    private $el;
    private accept?;
    private capture?;
    private allowedFileType?;
    private minSize?;
    private maxSize?;
    private maxLength?;
    private minLength?;
    private multiple?;
    private append?;
    private disabled?;
    private error?;
    private select?;
    private ready?;
    private extraData?;
    private $selectInput;
    private files;
    private hasInit;
    static install: (...args: any) => void;
    constructor(element: HTMLElement, options: Opts);
    private judgeSuffix;
    init(): void;
    getFiles(): {
        files: File[];
        extraData: any;
    };
    clear(): void;
    setDisabled(): void;
    setEnabled(): void;
}
export default Upload;
