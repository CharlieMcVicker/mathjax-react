import { mathjax } from 'mathjax-full/js/mathjax';
import { TeX } from 'mathjax-full/js/input/tex';
import { MathML } from 'mathjax-full/js/input/mathml';
import { SVG } from 'mathjax-full/js/output/svg';
// const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
import { browserAdaptor } from 'mathjax-full/js/adaptors/browserAdaptor';
import { RegisterHTMLHandler } from 'mathjax-full/js/handlers/html';

// TODO import from mathjax-full
export type SourceSpecification = {
  src: string,
  lang: 'MathML' | 'TeX'
}

// create and register adaptor bound to the real DOM
const adaptor = browserAdaptor();
RegisterHTMLHandler(adaptor);

//  Create input and output jax and a document using them on the content from the HTML file (see: https://github.com/mathjax/MathJax-demos-node/blob/master/direct/tex2svg)
const tex = new TeX({packages: ['base', 'ams']});
const mathml = new MathML({});
const svg = new SVG({fontCache: 'none'});
const tex_html = mathjax.document('', {InputJax: tex, OutputJax: svg});
const mathml_html = mathjax.document('', {InputJax: mathml, OutputJax: svg});

function updateCSS(nodeID: string, text: string) {
	let styleNode = document.getElementById(nodeID);
	if (styleNode === null) {
		styleNode = document.createElement('style');
		styleNode.setAttribute('id', nodeID);
		document.head.appendChild(styleNode);
	}
	styleNode.innerHTML = text;
}

/**
 * Does a single convert call to MathJax. Tex from inputText is converted and options are the MathJax options
 */
export function convert(srcSpec: SourceSpecification, node: HTMLElement, display: boolean): string {
  const { src, lang } = srcSpec;
  let html = tex_html;
  if(lang == 'MathML') html = mathml_html;
	const math: string = src.trim();
	const metrics = svg.getMetricsFor(node, display);
        const outerHTML =  adaptor.outerHTML(html.convert(math, {
            display,
	... metrics
        })); 
	html.updateDocument();
	updateCSS('MATHJAX-SVG-STYLESHEET', svg.cssStyles.cssText);
	return outerHTML;
}

class CancelationException {}

export function convertPromise(srcSpec: SourceSpecification, node: HTMLElement, display: boolean): { promise: Promise<string>, cancel: () => void } {
  const { src, lang } = srcSpec;
  let html = tex_html;
  if(lang == 'MathML') html = mathml_html;
	const math: string = src.trim();
	const metrics = svg.getMetricsFor(node, display);
  let canceled = false;
  const cancel = () => canceled = true;
  const res: Promise<string | void> = mathjax.handleRetriesFor(function () {
    if (canceled) {
      throw new CancelationException();
    }
    const dom = html.convert(math, {
      display,
	    ...metrics
    }); 
    return dom;
  }).then(dom => {
    // do stuff with dom
	  html.updateDocument();
	  updateCSS('MATHJAX-SVG-STYLESHEET', svg.cssStyles.cssText);
    return adaptor.outerHTML(dom);
  }).catch(err => {
    if (!(err instanceof CancelationException)) {
      throw err;
    } else {
      console.log('cancelled render!');
    }
  });
  return { promise: res.then(v => v ? v : "").catch(() => ''), cancel };
}
