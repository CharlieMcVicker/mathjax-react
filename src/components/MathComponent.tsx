import * as React from 'react';
// import { convert }  from '../utils';
import { SourceSpecification, convertPromise } from '../utils/convert';
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
  display: true,
  onError: null as (((error: string) => void) | null),
  onSuccess: null as ((() => void) | null),
  settings: {} as any
};

type DefaultProps = typeof defaultProps;

type State = {
  renderPromise: null | Promise<void>, // promise that will set renderResult in state on return
  renderResult: string, // the result of the most recent RESOLVED render
  renderSrc: SourceSpecification, // the most recent src spec sent to rendering
  src: SourceSpecification, // the current source spec
  cancel: () => void // cancel the current render
};

// Sets up default props nicely
export type MathComponentProps = SourceProps & Partial<DefaultProps>;

export class MathComponent extends React.Component<MathComponentProps, State> {
  static defaultProps: DefaultProps = defaultProps; // bind default props
  private rootDivRef = React.createRef<HTMLDivElement>(); // setup root references
  private rootSpanRef = React.createRef<HTMLSpanElement>();
  getRootRef() {
    return this.props.display ? this.rootDivRef : this.rootSpanRef;
  }
  state: State = {
    renderSrc: { src: "", lang: "TeX" },
    renderPromise: null,
    renderResult: "",
    src: {
      src: "",
      lang: "TeX"
    },
    cancel: () => null
  };
  static parseProps(props: MathComponentProps): SourceSpecification {
    // if the prop is present, then it is the ONLY source specified
    // due to XOR type def
    if ("mathml" in props){
      return {
        src: props.mathml!, // ! required for typescript
        lang: 'MathML'
      };
    } else if ("tex" in props) {
      return {
        src: props.tex!, // ! required for typescript 
        lang: 'TeX'
      };
    }
    // UNREACHABLE
    return { src: '', lang: 'TeX' };
  }
  static getDerivedStateFromProps(props: MathComponentProps, state: State): State {
    const src = MathComponent.parseProps(props);
    return { ...state, src };
  }
  componentDidMount() {
    this._sendRender();
  }
  componentDidUpdate() {
    this._sendRender();
  }
  _sendRender() {
    const node = this.getRootRef().current;
    const { src, renderSrc } = this.state;
    if (node && !(src.src == renderSrc.src && src.lang == renderSrc.lang)) {
      this.state.cancel();
      const { promise, cancel } = convertPromise(
        src,
        node,
        this.props.display!,
        this.props.settings!);
      let renderPromise = promise.then(htmlStr => {
          // check if promise is correct (ie. most recent)
          if (renderPromise == this.state.renderPromise) {
            this.setState({ renderResult: htmlStr });
          } else {
            console.log('promise expired...');
          }
        });
      if (this.props.onSuccess) {
        renderPromise = renderPromise.then(this.props.onSuccess);
      }
      if (this.props.onError) {
        renderPromise = renderPromise.catch(this.props.onError);
      }
      this.setState({ renderPromise, renderSrc: src, cancel });
    }
  }
  render() {
    let renderedSVG = this.state.renderResult;
    /*
    let node = this.rootRef.current;
    let src = this.parseProps();
    if (node) {
      renderedSVG = convert(src, node, this.props.display!);
    } else {
      console.log('Didn\'t work!', this.rootRef);
    }
    */
    return this.props.display ? (
      <div ref={this.rootDivRef} dangerouslySetInnerHTML={{__html: renderedSVG}}>
      </div>
    ) : (
      <span ref={this.rootSpanRef} dangerouslySetInnerHTML={{__html: renderedSVG}}>
      </span>
    )
  }
}
