import React from 'react';
import './App.css';
import { MathComponent, MathWrapper } from 'mathjax-react';

export default class Profiler extends React.Component {
  state = {
    renderMode: "atoms",
    equations: ["\\int_0^1\\sin x\\ dx", "f(x)=x^2", "\\sin^2\\theta+\\cos^2\\theta = 1"]
  };
  changeExamples() {
    let { equations } = this.state;
    // rotate through equations
    this.setState({
      equations: [equations.pop(), ...equations]
    });
  }
  toggleMode() {
    let { renderMode } = this.state;
    renderMode = renderMode === "atoms" ? "list" : "atoms";
    this.setState({ renderMode });
  }
  render(){
    let { renderMode, equations } = this.state;
    let renderedMath = null;
    if (renderMode === "list") {
      renderedMath = (<MathComponent tex={"\\begin{multline}"+equations.join("\\\\")+"\\end{multline}"} />);
    } else {
      renderedMath = equations.map((e, i) => <MathComponent tex={e} key={i} />);
    }
    
    return (
      <div className="container">
        <header className="App-header">
          <h1>Profiling Site for mathjax-react</h1>
        </header>
        <div className="demo">
          <button onClick={() => this.changeExamples()}>Change equations</button>
          <button onClick={() => this.toggleMode()}>Toggle Mode</button>
          <span>Current mode {renderMode}</span>
          <div>{ renderedMath }</div>
        </div>
        <div className="credits">
          <span>Copyright (c) 2020 Charles McVicker</span>
          <br/>
          <br/>
          <span>Special thanks to Davide Cervone</span>
        </div>
        <MathWrapper>
          <p>
          { equations.map(s => "\\["+s+"\\]").join('') }
          </p>
          { "\\["+equations.join('\\\\')+"\\]" }
        </MathWrapper>
      </div>
    );
  }
}
