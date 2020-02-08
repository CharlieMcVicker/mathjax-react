import React from 'react';
import { MathComponent } from 'react-mathjax';

type State = {
  counter: number
}

export default class Counter extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      counter: 0
    }
  }
  increment() {
    this.setState({
      counter: this.state.counter + 1
    });
  }
  render(){
    const { counter } = this.state;
    const equations = [`x=${counter}`, `x^2=${counter*counter}`];
    const typesetEquations = equations.map((e, i) => <MathComponent tex={e} key={i} />);
    return (
      <div className="example">
        <h2 className="title">Counter</h2>
        <div className="caption">
          <p>Hit the button that says "Increment" to increase the value of x.</p>
        </div>
        <div className="result">
          <button onClick={() => this.increment()}>Increment</button>
          { typesetEquations }
        </div>
      </div>
    );
  }
}
