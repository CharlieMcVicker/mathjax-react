import * as React from "react";
import { SourceProps } from "./MathComponent";
export declare type MathComponentProps = SourceProps & {
    display?: boolean;
    onError?: (error: string) => void;
    onSuccess?: () => void;
    settings: any;
};
export declare function MathComponentV2(props: MathComponentProps): React.ReactElement;
