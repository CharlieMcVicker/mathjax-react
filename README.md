# react-mathjax

> React Component Library for MathJax

[![NPM](https://img.shields.io/npm/v/react-mathjax.svg)](https://www.npmjs.com/package/react-mathjax) 
## Install

Install the react-mathjax package:
```bash
npm install --save react-mathjax
```
Install MathJax-full as a sibling dependency. This lets your bundler shake the mathjax-full tree and reduce bundle size.
```bash
npm install --save mathjax-full
```
## Usage

Take a look at the [typescript-examples](./typescript-examples) on our [GitHub Pages](https://charliemcvicker.github.io/react-mathjax/)

```tsx
import * as React from 'react'

import { MathComponent } from 'react-mathjax'

class Example extends React.Component {
  render () {
    return (
      <MathComponent tex={String.raw`\int_0^1 x^2\ dx`} />
    )
  }
}
```

## Developer Setup
### Install
Make sure everything is installed in the main directory:
```bash
yarn
```
Build the main directory so that we can link:
```bash
npx rollup -c
```
Run npm link in the main directory to create a global symlink:
```bash
yarn link
```
Run install and npm link in the `typescript-examples` directory to connect the library to the examples.
```bash
cd typescript-examples/
yarn link react-mathjax
yarn
```
### Usage
When working on examples, it is only required to run the following (in `typescript-examples/`):
```bash
yarn start
```
When also working on the library itself, one must also run (in the main directory):
```bash
yarn start
```
If rollup is not catching updates to files, the following may work:
```bash
npx rollup -w -c
```
## Manifest
### src/
Library Source
### typescript-examples
Examples using `react-mathjax` and `TypeScript`.

## License

MIT © [charliemcvicker](https://github.com/charliemcvicker)
