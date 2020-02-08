import * as React from 'react';
import { convert }  from '../utils';
import { SourceSpecification } from '../utils/convert';
import { XOR } from 'ts-xor';

interface TeXProps {
  tex: string
};

interface MathMLProps {
  mathml: string
};

// source props can be only one of mathml or tex props
type SourceProps = XOR<MathMLProps, TeXProps>;

// TODO import config props from mathjax-full
const defaultProps = {
  display: true
};

type DefaultProps = typeof defaultProps;

export type MathComponentProps = SourceProps & Partial<DefaultProps>;

export class MathComponent extends React.Component<MathComponentProps> {
  static defaultProps: DefaultProps = defaultProps;
  private rootRef = React.createRef<HTMLDivElement>();
  componentDidMount() {
    this.setState({});
  }
  parseProps(): SourceSpecification {
    // if the prop is present, then it is the ONLY source specified
    // due to XOR type def
    if ("mathml" in this.props){
      return {
        src: this.props.mathml || "", // required for typescript
        lang: 'MathML'
      };
    } else if ("tex" in this.props) {
      return {
        src: this.props.tex || "", // required for typescript 
        lang: 'TeX'
      };
    }
    // UNREACHABLE
    return { src: '', lang: 'TeX' };
  }
  render() {
    let node = this.rootRef.current;
    let src = this.parseProps();
    let renderedSVG = "";
    if (node) {
      renderedSVG = convert(src, node, this.props.display!);
    } else {
      console.log('Didn\'t work!', this.rootRef);
    }
    return (
      <div ref={this.rootRef} style={{display: this.props.display!? 'block':'inline-block'}}>
        <div dangerouslySetInnerHTML={{__html: renderedSVG}}/>
      </div>
    )
  }
}
