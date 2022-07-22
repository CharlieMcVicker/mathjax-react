import * as React from "react";
interface MathMLProps {
    mathml: string;
    tex?: never;
}
interface TexProps {
    tex: string;
    mathml?: never;
}
export declare type SourceProps = MathMLProps | TexProps;
export declare type MathComponentProps = SourceProps & {
    display?: boolean;
    onError?: (error: string) => void;
    onSuccess?: () => void;
    settings?: any;
};
export declare function MathComponent(props: MathComponentProps): React.ReactElement;
export {};
