import { Visitor } from 'mathjax-full/ts/core/Tree/Visitor';

class ReactVisitor implements Visitor {

}

/**
 *  Create a react tree under the given node
 *  @param node: node under which to traverse
 *  @param document: the MathJax document containing the node
 */
export function createReactTree(node: any, document: any) {
  visitor.visitTree(node, document);
}

console.log('hello!');
