import React from 'react';
import './App.css';
import examples from './examples';

export default class App extends React.Component {
  render(){
    return (
      <div className="container">
        <header className="App-header">
          <h1>Examples for react-mathjax</h1>
        </header>
        <div className="exampleList">
          { examples }
        </div>
      </div>
    );
  }
}
