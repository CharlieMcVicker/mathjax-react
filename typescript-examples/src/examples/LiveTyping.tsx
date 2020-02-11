import React from 'react';
import { MathComponent } from 'react-mathjax';

type State = {
  text: string,
  lang: string
}

export default class LiveTyping extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      text: ' ',
      lang: 'tex'
    }
  }
  handleChange = (e: React.FormEvent<HTMLInputElement>) =>{ 
    e.persist()
    this.setState({text: e.currentTarget.value as string});
  }
  render(){
    let { text, lang } = this.state;

    if (lang !== 'tex' && lang !== 'mathml') {
      lang = 'tex';
    }
    let mcProps = null;
    if (lang === 'tex') {
      mcProps = { tex: text };
    } else {
      mcProps = { mathml: text };
    }
    return (
      <div className="example">
        <h2 className="title">Live Typing</h2>
        <div className="caption">
          <p>Type in the text box below and see the rendered result.</p>
        </div>
        <div className="result">
          <input style={inputStyles} type="text" onChange={this.handleChange} />
          <MathComponent {...mcProps} />
        </div>
      </div>
    );
  }
}

const inputStyles = {
  display: 'block',
  margin: 'auto'
}
