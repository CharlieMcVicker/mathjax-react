# mathjax-react

> React Component Library for MathJax

[![NPM](https://img.shields.io/npm/v/mathjax-react.svg)](https://www.npmjs.com/package/mathjax-react)

For a lightweight, build-your-own alternative, check out this [gist](https://gist.github.com/GiacoCorsiglia/1619828473f4b34d3d914a16fcbf10f3).

## Install

Install the mathjax-react package:

```bash
npm install --save mathjax-react
```

Install MathJax-full as a sibling dependency. This lets your bundler shake the mathjax-full tree and reduce bundle size.

```bash
npm install --save mathjax-full
```

## Usage

Take a look at the [typescript-examples](./typescript-examples) on our [GitHub Pages](https://charliemcvicker.github.io/mathjax-react/)

```tsx
import * as React from "react";

import { MathComponent } from "mathjax-react";

class Example extends React.Component {
  render() {
    return <MathComponent tex={String.raw`\int_0^1 x^2\ dx`} />;
  }
}
```

## Reference

Currently, this library contains one component, called the `MathComponent`. This is how you can interact with MathJax.

### MathComponent

#### Props

- `tex: string`: Use this prop when you want to typeset a TeX/LaTeX equation. Leave it empty if you are using MathML. If you are using TeX, place the source code for your TeX in this property.
- `mathml: string`: Use this prop when you want to typeset a MathML equation. Leave it empty if you are using TeX. If you are using MathML, place the source code for your MathML in this property.
- `display: boolean`: This controls the inline vs. block styling of the result. The default value is true, meaning block. If you would like an inline equation, set this property to false. See the [basic typesetting example](./typescript-examples/src/examples/BasicTypesetting.tsx).
- `settings: any`: This property allows you to send your own render settings to MathJax. It should be an object with string keys. To learn more, consult the MathJax documentation.

### useMathJax Hook

This hook provides lower-level access to MathJax for more complicated typesetting needs. For an example, see the [live typesetting example](./typescript-examples/src/examples/LiveTyping.tsx).

#### Props

- `src: string`: The source code for the equation you want to typeset.
- `lang: "MathML" | "TeX"`: The language of the `src` prop.
- `display: boolean`: This controls the inline vs. block styling of the result. If you would like an inline equation, set this property to false. Since no DOM node is replaced, you have to use a `span` or another inline container if you want an inline equation.
- `settings: any`: This property allows you to send your own render settings to MathJax. It should be an object with string keys. To learn more, consult the MathJax documentation.

#### Returns

- `getProps()`: A function that returns props that should be placed on the node where the actual math should be rendered. Since the DOM node is not replaced, you have to use a `span` or another inline container if you want an inline equation, in addition to using the `display` prop.
- `renderedHTML: string | undefined`: The most recently rendered HTML from MathJax.
- `error: string | null`: Any errors from MathJax;

## Migrating from 1.0.6 to 2.0.0 (React 18 support)

To support React 18, we did a full rewrite. Now, instead of providing `onError` and `onSuccess` callbacks on `MathComponent` we provide a `useMathJax` hook, which returns three things:

1. Any errors from MathJax
2. The most recently rendered HTML from MathJax
3. A `getProps` function that should be attached to a node somewhere in the tree. This node will be filled (not replaced) with the HTML from MathJax.

Below is a simple component that replicates the old `onError` and `onSuccess` behavior.

```tsx
function MyComponent({onError, onSuccess, ...props}) {
  { error, renderedHTML, getProps } = useMathJax(props);

  useMemo(() => {
    if(error) onError(error)
  }, [error]);

  useMemo(() => {
    if(renderedHTML) onSuccess();
  }, [renderedHTML]);

  return <div {...getProps()} />
}
```

## Developer Setup

### Install

Make sure everything is installed in the main directory:

```bash
npm i -D
```

Build the main directory so that we can link:

```bash
npm run build
```

Run npm link in the main directory to create a global symlink:

```bash
npm link
```

Run install and npm link in the `typescript-examples` directory to connect the library to the examples.

```bash
cd typescript-examples/
npm i -D
npm link mathjax-react
```

### Usage

When working on examples, it is only required to run the following (in `typescript-examples/`):

```bash
npm start
```

When also working on the library itself, one must also run (in the main directory):

```bash
npm start
```

If rollup is not catching updates to files, the following may work:

```bash
npx rollup -w -c
```

## Manifest

### src/

Library Source

### typescript-examples

Examples using `mathjax-react` and `TypeScript`.

## License

MIT © [charliemcvicker](https://github.com/charliemcvicker)
