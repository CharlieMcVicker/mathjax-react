import React, { Component } from 'react';

import { MathComponent } from 'react-mathjax';

export default class App extends Component {
  render () {
    const tex = String.raw`\int_{-\infty}^{\infty}`;
    return (
      <div>
        <MathComponent tex={tex} />
      </div>
    )
  }
}
