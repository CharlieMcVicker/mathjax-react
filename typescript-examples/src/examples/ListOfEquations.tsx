import React from 'react';
import { MathComponent } from 'react-mathjax';

export default class ListOfEquations extends React.Component {
  render(){
    const equations = [String.raw`ax^2+bx+c=0`, String.raw`x=\frac{-b\pm \sqrt{b^2-4ac}}{2a}`, String.raw`(x-h)^2+k=0`];
    const typesetEquations = equations.map((e, i) => <MathComponent tex={e} key={i} />);
    return (
      <div className="example">
        <h2 className="title">List of Equations</h2>
        <div className="caption">
          <p>Here we render a list of static equations and display the results.</p>
        </div>
        <div className="result">
          { typesetEquations }
        </div>
      </div>
    );
  }
}
