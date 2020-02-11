import React from 'react';
import { MathComponent } from 'react-mathjax';

import Example from './Example';

type State = {
  counter: number
}

export default class Counter extends React.Component<{}, State> {
  static exampleConfig = {
    title: "Counter",
    caption: `Hit the button that says "Increment" to increase the value of x.`,
    relSrc: "examples/Counter.tsx"
  };
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
      <Example {...Counter.exampleConfig}>
          <button onClick={() => this.increment()}>Increment</button>
          { typesetEquations }
      </Example>
    );
  }
}
