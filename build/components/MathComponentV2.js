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
import * as React from "react";
import { useMathJax } from "../utils/useMathjax";
function parseSource(props) {
    if (props.mathml)
        return {
            lang: "MathML",
            src: props.mathml,
        };
    else
        return {
            lang: "TeX",
            src: props.tex,
        };
}
export function MathComponentV2(props) {
    var _a = props.display, display = _a === void 0 ? false : _a, settings = props.settings;
    var ref = React.useRef(null);
    var renderedHTML = useMathJax(__assign({ display: display,
        settings: settings, node: ref.current }, parseSource(props))).renderedHTML;
    return (React.createElement("div", { ref: ref, style: { display: display ? "block" : "inline" }, dangerouslySetInnerHTML: { __html: renderedHTML !== null && renderedHTML !== void 0 ? renderedHTML : "" } }));
}
//# sourceMappingURL=MathComponentV2.js.map