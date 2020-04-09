import React from 'react';
import { MathComponent } from 'mathjax-react';

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
      counter: 0 // start counter at 0
    }
  }
  increment() {
    this.setState({
      counter: this.state.counter + 1 // increment the count and rerender
    });
  }
  render(){
    const { counter } = this.state; // get counter value for this render
    // TeX equations using JavaScript template literals
    const equations = [`x=${counter}`, `x^2=${counter*counter}`];
    // Make a MathComponent for each equation
    const typesetEquations = equations.map((e, i) => <MathComponent tex={e} key={i} />);
    return (
      <Example {...Counter.exampleConfig}>
          <button onClick={() => this.increment()}>Increment</button>
          { typesetEquations }
      </Example>
    );
  }
}
