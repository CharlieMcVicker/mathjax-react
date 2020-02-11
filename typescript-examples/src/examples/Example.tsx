import * as React from 'react';
import './Example.css';

type Props = {
  title: string,
  relSrc: string,
  caption: string
}

type State = {
  absSrc: string
}

export default class Example extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State): State {
    const absSrc = 'https://github.com/charliemcvicker/react-mathjax/blob/master/typescript-examples/src/'+props.relSrc;
    return {
      absSrc
    };
  }
  render() {
    return (
      <div className="example">
        <div className="title"><h2>{this.props.title}</h2><a className="src-link" href={this.state.absSrc} target="blank">view source</a></div>
        <div className="caption">
          <p> {this.props.caption} </p>
        </div>
        <div className="result">
          {this.props.children}
        </div>
      </div>
    )
  }
}
