import * as React from 'react';
import { typesetNode } from '../utils/convert';

type State = {
  renderPromise: null | Promise<void>, // promise that will set renderResult in state on return
  cancel: () => void, // cancel the current render
  typesetNode: null | HTMLElement
};

function replaceMathInString(content: string) {
  return content;
}

function replaceAllMath(children: any) {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      console.log('not valid', child);
      if (typeof child === 'string') {
        return replaceMathInString(child);
      } else {
        return child;
      }
    }
    child = child as React.ReactElement;
    if (child.props.children) {
      child = React.cloneElement(child, {
        children: replaceAllMath(child.props.children)
      });
    }
    return child;
  });
}

export class MathWrapper extends React.Component {
  private rootRef = React.createRef<HTMLDivElement>(); // setup root reference
  getRootRef() {
    return this.rootRef;
  }
  state: State = {
    renderPromise: null,
    cancel: () => null,
    typesetNode: null
  };
  render() {
    let node = this.rootRef.current;
    /*
    let src = this.parseProps();
    if (node) {
      renderedSVG = convert(src, node, this.props.display!);
    } else {
      console.log('Didn\'t work!', this.rootRef);
    }
    */
    let typeset: null | string = null;
    console.log('NODE:', node);
    if (node) {
      typeset = typesetNode(node);
    }
    let children = replaceAllMath(this.props.children);

    console.log(children);
    return (
      <div>
        <div ref={this.rootRef}>{ children }</div>
        { typeset ? (<div dangerouslySetInnerHTML={{ __html: typeset}} />) : null }
      </div>
    );
  }
}

