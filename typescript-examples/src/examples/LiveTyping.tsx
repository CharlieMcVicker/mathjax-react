import React, { useState } from "react";
import { SourceSpecification, useMathJax } from "mathjax-react";

import Example from "./Example";

const exampleConfig = {
  title: "Live Typing",
  caption: `Type in the text box below and see the rendered result.`,
  relSrc: "examples/LiveTyping.tsx",
};

const inputStyles = {
  display: "block",
  margin: "auto",
};

export default function LiveTyping() {
  const [sourceSpec, setSourceSpec] = useState<SourceSpecification>({
    lang: "TeX",
    src: "",
  });
  const { getProps, error } = useMathJax({
    ...sourceSpec,
    display: true,
    settings: {},
  });
  return (
    <Example {...exampleConfig}>
      <select
        onChange={(evt) => {
          evt.preventDefault();
          const lang = evt.target.value;
          if (lang === "TeX" || lang === "MathML")
            setSourceSpec({ ...sourceSpec, lang });
        }}
      >
        <option value="TeX">TeX</option>
        <option value="MathML">MathML</option>
      </select>
      <input
        style={inputStyles}
        type="text"
        onChange={(evt) => {
          evt.preventDefault();
          setSourceSpec({ ...sourceSpec, src: evt.target.value });
        }}
      />
      <p style={{ textAlign: "center" }}>{error ?? "No Errors"}</p>
      <div {...getProps()} />
    </Example>
  );
}
