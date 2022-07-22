export declare type SourceSpecification = {
    src: string;
    lang: "MathML" | "TeX";
};
/**
 * Does a single convert call to MathJax. Tex from inputText is converted and
 * options are the MathJax options
 */
export declare function convert(srcSpec: SourceSpecification, node: HTMLElement, display: boolean): string;
export declare function convertPromise(srcSpec: SourceSpecification, node: HTMLElement, display: boolean, settings: any): {
    promise: Promise<string>;
    cancel: () => void;
};
