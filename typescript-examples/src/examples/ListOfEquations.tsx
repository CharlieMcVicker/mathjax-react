import React from 'react';
import { MathComponent } from 'mathjax-react';

import Example from './Example';

export default class ListOfEquations extends React.Component {
  static exampleConfig = {
    title: "List of Equations",
    caption: `Here we render a list of static equations and display the results.`,
    relSrc: "examples/ListOfEquations.tsx"
  };
  render(){
    // TeX equations using JavaScript template literals
    const equations = [String.raw`ax^2+bx+c=0`, String.raw`x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}`, String.raw`(x-h)^2+k=0`];
    // Make a MathComponent for each equation
    const typesetEquations = equations.map((e, i) => <MathComponent tex={e} key={i} />);
    return (
      <Example {...ListOfEquations.exampleConfig}>
        { typesetEquations }
      </Example>
    );
  }
}
