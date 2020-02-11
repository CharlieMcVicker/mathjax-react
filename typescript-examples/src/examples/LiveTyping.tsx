import React from 'react';
import { MathComponent } from 'react-mathjax';

import Example from './Example';

type State = {
  text: string,
  lang: string
}

export default class LiveTyping extends React.Component<{}, State> {
  static exampleConfig = {
    title: "Live Typing",
    caption: `Type in the text box below and see the rendered result.`,
    relSrc: "examples/LiveTyping.tsx"
  };
  constructor(props: any) {
    super(props);
    this.state = {
      text: ' ',
      lang: 'tex'
    }
  }
  handleLangChange = (e: React.FormEvent<HTMLSelectElement>) =>{ 
    e.persist()
    this.setState({lang: e.currentTarget.value as string});
  }
  handleSrcChange = (e: React.FormEvent<HTMLInputElement>) =>{ 
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
      <Example {...LiveTyping.exampleConfig}>
        <select onChange={this.handleLangChange}>
          <option>tex</option>
          <option>mathml</option>
        </select>
        <input style={inputStyles} type="text" onChange={this.handleSrcChange} />
        <MathComponent {...mcProps} />
      </Example>
    );
  }
}

const inputStyles = {
  display: 'block',
  margin: 'auto'
}
