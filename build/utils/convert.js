var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { mathjax } from "mathjax-full/js/mathjax";
import { TeX } from "mathjax-full/js/input/tex";
import { MathML } from "mathjax-full/js/input/mathml";
import { SVG } from "mathjax-full/js/output/svg";
// const { liteAdaptor } = require('mathjax-full/js/adaptors/liteAdaptor.js');
import { browserAdaptor } from "mathjax-full/js/adaptors/browserAdaptor";
import { RegisterHTMLHandler } from "mathjax-full/js/handlers/html";
import { STATE } from "mathjax-full/js/core/MathItem";
// create and register adaptor bound to the real DOM
var adaptor = browserAdaptor();
RegisterHTMLHandler(adaptor);
//  Create input and output jax and a document using them on the content from
//  the HTML file (see:
//  https://github.com/mathjax/MathJax-demos-node/blob/master/direct/tex2svg)
var tex = new TeX({ packages: ["base", "ams"] });
var mathml = new MathML({});
var svg = new SVG({ fontCache: "none" });
var markErrors = [STATE.TYPESET + 1, null, onError];
var tex_html = mathjax.document("", {
    InputJax: tex,
    OutputJax: svg,
    renderActions: {
        markErrors: markErrors,
    },
});
var mathml_html = mathjax.document("", {
    InputJax: mathml,
    OutputJax: svg,
    renderActions: {
        markErrors: markErrors,
    },
});
function onError(math) {
    var root = math.root, typesetRoot = math.typesetRoot;
    if (root.toString().substr(0, 14) === "math([merror([") {
        var merror = root.childNodes[0].childNodes[0];
        var text = merror.attributes.get("data-mjx-error") ||
            merror.childNodes[0].childNodes[0].getText();
        adaptor.setAttribute(typesetRoot, "data-mjx-error", text);
    }
}
function updateCSS(nodeID, text) {
    var styleNode = document.getElementById(nodeID);
    if (styleNode === null) {
        styleNode = document.createElement("style");
        styleNode.setAttribute("id", nodeID);
        document.head.appendChild(styleNode);
    }
    styleNode.innerHTML = text;
}
/**
 * Does a single convert call to MathJax. Tex from inputText is converted and
 * options are the MathJax options
 */
export function convert(srcSpec, node, display) {
    var src = srcSpec.src, lang = srcSpec.lang;
    var html = tex_html;
    if (lang == "MathML")
        html = mathml_html;
    var math = src.trim();
    var metrics = svg.getMetricsFor(node, display);
    var outerHTML = adaptor.outerHTML(html.convert(math, __assign({ display: display }, metrics)));
    html.updateDocument();
    updateCSS("MATHJAX-SVG-STYLESHEET", svg.cssStyles.cssText);
    return outerHTML;
}
var CancelationException = /** @class */ (function () {
    function CancelationException() {
    }
    return CancelationException;
}());
export function convertPromise(srcSpec, node, display, settings) {
    var src = srcSpec.src, lang = srcSpec.lang;
    if (!node)
        throw new Error();
    var html = tex_html;
    if (lang == "MathML")
        html = mathml_html;
    var math = src.trim();
    // const metrics = svg.getMetricsFor(node, display);
    var canceled = false;
    var cancel = function () { return (canceled = true); };
    var res = mathjax
        .handleRetriesFor(function () {
        if (canceled) {
            throw new CancelationException();
        }
        var dom = html.convert(math, __assign({ display: display }, settings));
        return dom;
    })
        .then(function (dom) {
        // do stuff with dom
        html.updateDocument();
        updateCSS("MATHJAX-SVG-STYLESHEET", svg.cssStyles.cssText);
        var err = adaptor.getAttribute(dom, "data-mjx-error");
        if (err) {
            throw err;
        }
        return adaptor.outerHTML(dom);
    })
        .catch(function (err) {
        if (!(err instanceof CancelationException)) {
            throw err;
        }
        else {
            console.log("cancelled render!");
        }
    });
    return { promise: res.then(function (v) { return (v ? v : ""); }), cancel: cancel };
}
//# sourceMappingURL=convert.js.map