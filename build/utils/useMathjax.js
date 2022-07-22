import { useEffect, useMemo, useState } from "react";
import { convertPromise } from "./convert";
export function useMathJax(_a) {
    var src = _a.src, lang = _a.lang, node = _a.node, display = _a.display, settings = _a.settings;
    var _b = useState(), renderedHTML = _b[0], setRenderedHTML = _b[1];
    console.log({ node: node });
    var render = useMemo(function () {
        if (node) {
            return convertPromise({ src: src, lang: lang }, node, display, settings);
        }
        else {
            return {
                promise: new Promise(function () { }),
                cancel: function () { },
            };
        }
    }, [src, lang, node, display, settings]);
    useEffect(function () {
        render.promise.then(function (html) {
            setRenderedHTML(html);
        });
        return render.cancel;
    }, [render]);
    return { renderedHTML: renderedHTML };
}
//# sourceMappingURL=useMathJax.js.map