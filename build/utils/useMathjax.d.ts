import { SourceSpecification } from "./convert";
export interface UseMathJaxProps extends SourceSpecification {
    node: HTMLElement | null;
    display: boolean;
    settings: any;
}
export interface UseMathJaxReturn {
    renderedHTML: string | undefined;
}
export declare function useMathJax({ src, lang, node, display, settings, }: UseMathJaxProps): UseMathJaxReturn;
