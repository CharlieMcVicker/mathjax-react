import React from 'react';
import { MathComponent } from 'mathjax-react';

import Example from './Example';

export default class BasicTypesetting extends React.Component {
  static exampleConfig = {
    title: "Basic Typesetting",
    caption: "Here is a basic example using react-mathjax to typeset some static equations.",
    relSrc: "examples/BasicTypesetting.tsx"
  };
  render(){
    // our tex equation, using String.raw so we don't have to escape backslashes
    const example = String.raw`\int_{-\infty}^{\infty}e^{-x^2}\ dx`;
    return (
      <Example {...BasicTypesetting.exampleConfig}>
        <MathComponent tex={example} display={true} />
        <p style={{'textAlign': 'center'}}> It is hard to compute <MathComponent tex={example} display={false} /> if you don't know much math.
        </p>
      </Example>
    );
  }
}
