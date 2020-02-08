import React from 'react';
import { MathComponent } from 'react-mathjax';

export default class BasicTypesetting extends React.Component {
  render(){
    const example = String.raw`\int_{-\infty}^{\infty}e^{-x^2}\ dx`;
    // const captions = [`<MathComponent tex={String.raw\`${example}\`} display={true} />`,
    //                  `<p>Here is the same equation inline:`,
    //                  `\t<MathComponent tex={String.raw\`${example}\`} display={false} />.`,
    //                  `</p>`];
    // const caption = captions.join('\n');
    return (
      <div className="example">
        <h2 className="title">Basic Typesetting</h2>
        <div className="caption">
          <p>Here is a basic example using react-mathjax to typeset some static equations.</p>
        </div>
        <div className="result">
          <MathComponent tex={example} display={true} />
          <p style={{'textAlign': 'center'}}> It is hard to compute
            &nbsp;<MathComponent tex={example} display={false} />&nbsp;
            if you don't know much math.
          </p>
        </div>
      </div>
    );
  }
}
