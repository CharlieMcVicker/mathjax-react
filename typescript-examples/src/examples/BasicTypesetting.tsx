import React from 'react';
import { MathComponent } from 'react-mathjax';

import Example from './Example';

export default class BasicTypesetting extends React.Component {
  static exampleConfig = {
    title: "Basic Typesetting",
    caption: "Here is a basic example using react-mathjax to typeset some static equations.",
    relSrc: "examples/BasicTypesetting.tsx"
  };
  render(){
    const example = String.raw`\int_{-\infty}^{\infty}e^{-x^2}\ dx`;
    return (
      <Example {...BasicTypesetting.exampleConfig}>
        <MathComponent tex={example} display={true} />
        <p style={{'textAlign': 'center'}}> It is hard to compute
          &nbsp;<MathComponent tex={example} display={false} />&nbsp;
          if you don't know much math.
        </p>
      </Example>
    );
  }
}
