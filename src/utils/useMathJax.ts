import { useEffect, useState } from "react";
import { convertPromise, SourceSpecification } from "./convert";

export interface UseMathJaxProps extends SourceSpecification {
  display: boolean;
  settings: any;
}

export interface UseMathJaxReturn {
  error: string | null;
  renderedHTML: string | null;

  getProps: () => {
    ref: (node: HTMLElement | null) => void;
    dangerouslySetInnerHTML: { __html: string } | undefined;
  };
}

/**
 * A low-level hook to use MathJax in your application.
 *
 * Before reading further, make sure `MathComponent` doesn't cover your use case.
 *
 * To use, provide inputs to this hook (eg. source, source language,
 * display/inline), then spread `getProps()` onto the child you would like to
 * render the math in.
 */
export function useMathJax({
  src,
  lang,
  display,
  settings,
}: UseMathJaxProps): UseMathJaxReturn {
  const [renderedHTML, setRenderedHTML] = useState<string | null>(null);
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!node) return () => {};

    const { promise, cancel } = convertPromise(
      { src, lang },
      node,
      display,
      settings
    );

    promise.then(setRenderedHTML, setError);

    return () => {
      setError(null);
      cancel();
    };
  }, [node, src, lang, display, settings]);

  return {
    renderedHTML,
    error,
    getProps: () => ({
      ref: setNode,
      dangerouslySetInnerHTML:
        renderedHTML !== null ? { __html: renderedHTML } : undefined,
    }),
  };
}
