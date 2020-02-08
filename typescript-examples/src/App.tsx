import React from 'react';
import './App.css';
import BasicTypesetting from './examples/BasicTypesetting';
import ListOfEquations from './examples/ListOfEquations';
import Counter from './examples/Counter';

export default class App extends React.Component {
  render(){
    return (
      <div className="container">
        <header className="App-header">
          <h1>Examples for react-mathjax</h1>
        </header>
        <div className="exampleList">
          <BasicTypesetting />
          <ListOfEquations />
          <Counter />
        </div>
      </div>
    );
  }
}
