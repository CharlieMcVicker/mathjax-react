import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MathComponent } from 'react-mathjax';

export default class App extends React.Component {
  constructor(props: {}) {
    super(props);
  }
  render(){
    const example = String.raw`\int_{-\infty}^{\infty}e^{-x^2}\ dx`;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <MathComponent tex={example} />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}
