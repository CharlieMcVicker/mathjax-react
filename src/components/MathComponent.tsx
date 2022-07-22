import * as React from "react";
import { SourceSpecification } from "../utils";
import { useMathJax } from "../utils/useMathJax";

interface MathMLProps {
  mathml: string;
  tex?: never;
}
interface TexProps {
  tex: string;
  mathml?: never;
}

export type SourceProps = MathMLProps | TexProps;

export type MathComponentProps = SourceProps & {
  display?: boolean;
  settings?: any;
};

function parseSource(props: SourceProps): SourceSpecification {
  if (props.mathml !== undefined)
    return {
      lang: "MathML",
      src: props.mathml,
    };
  else
    return {
      lang: "TeX",
      src: props.tex,
    };
}

export function MathComponent(props: MathComponentProps): React.ReactElement {
  const { display = true, settings } = props;
  const { getProps } = useMathJax({
    display,
    settings,
    ...parseSource(props),
  });
  return display ? <div {...getProps()} /> : <span {...getProps()} />;
}
