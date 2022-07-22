import React from "react";
import "./App.css";
import { allComponents } from "./examples";

export function App() {
  return (
    <div className="container">
      <header className="App-header">
        <h1>Examples for mathjax-react</h1>
      </header>
      <div className="exampleList">
        {allComponents.map((Cmp, i) => (
          <Cmp key={i} />
        ))}
      </div>
      <div className="credits">
        <span>Copyright (c) 2020 Charles McVicker</span>
        <br />
        <br />
        <span>Special thanks to Davide Cervone</span>
      </div>
    </div>
  );
}
