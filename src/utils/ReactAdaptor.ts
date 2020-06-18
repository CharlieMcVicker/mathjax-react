import { DOMAdaptor } from 'mathjax-full/js/core/DOMAdaptor';
import { OptionList } from 'mathjax-full/js/util/Options';


import * as React from 'react';

interface EmbeddedElement {
  reactElement: React.ReactElement,
  parent: EmbeddedElement | null
}

class ReactElementArgs {
  kind: React.Component | React.ReactElement | string;
  props: any;
  children: (DelayedReactElement | StringNode)[];
  constructor(kind: React.Component | React.ReactElement | string, props: any, children: (DelayedReactElement | StringNode)[]) {
    this.kind = kind;
    this.props = props;
    this.children = children;
  }
  fromElement(e: React.ReactElement) {
    let {children, ...props} = e.props;
    return new ReactElementArgs(e, props, children);
  }
  asElement(): React.ReactElement {
    if (this.kind instanceof React.Component || this.kind instanceof string) {
      return React.createElement(this.kind, this.props, ...this.children);
    } else {
      let elm = this.kind as React.ReactElement;
      return React.cloneElement(elm, this.props, ...this.children);
    }
  }
}

class DelayedReactElement {
  node: React.ReactElement | ReactElementArgs;
  parent: DelayedReactElement | null;
  constructor(node: React.ReactElement | ReactElementArgs, parent: DelayedReactElement | null) {
    this.node = node;
    this.parent = parent;
  }
  collect(): React.ReactElement {
    if (this.node instanceof React.ReactElement) {
      return this.node;
    } else {
      let node = this.node as ReactElementArgs;
      return node.asElement();
    }
  }
  appendChild(child: DelayedReactElement | StringNode) : DelayedReactElement | StringNode {
    if (this.node instanceof React.ReactElement) {
      this.node = new ReactElementArgs(this.node, this.node.props, this.node.props.children.map(e => {
        if (e instanceof React.ReactElement) {
          return DelayedReactElement(e, )
        }
      }));
    }
    let node = this.node as ReactElementArgs;
    node.children.append(child);
    child.parent = node;
    return child;
  }
  replaceChild(nnode: DelayedReactElement | StringNode, onode: DelayedReactElement | StringNode) {
    if (this.node instanceof React.ReactElement) {
      this.node = ReactElementArgs.fromElement(this.node);
    }
    let node = this.node as ReactElementArgs,
        idx = node.children.indexOf(onode);
    if (idx < 0) {
      console.log("Bad replace child, ", onode, " is not a child of ", node);
      return onode;
    } else {
      node.children[idx] = nnode;
      nnode.parent = node;
    }
  },
  clone() : DelayedReactElement {
    if (this.node instanceof React.ReactElement) {
      return new DelayedReactElement(
        ReactElementArgs.fromElement(this.node),
        null);
    } else {
      return new DelayedReactElement(
        new ReactElementArgs(this.node.kind, this.node.props, this.node.children),
        null);
    }
  }
  textContent(): string {
    if (this.node instanceof ReactElementArgs) {
      return this.node.children.reduce((a, child) => a+child.textContent(), "");
    } else {
      let node = this.node as React.ReactElement;
      return node.props.children.reduce((a, child) => a+child.textContent(), "");
    }
  }
}

interface StringNode {
  text: string,
  parent: DelayedReactElement
}

class ReactAdaptor extends DOMAdaptor<DelayedReactElement, StringNode, DelayedReactElement> {
  node(kind: string, def?: OptionList, children?: (DelayedReactElement | string)[], ns?:string) {
    return {
      reactElement: React.createElement(kind, def, ...children),
      parent: null
    };
  }
  text(text: string) { return { text, parent: null }; }
  //TODO GET ELEMENTS
  parent(node: DelayedReactElement | StringNode) {
    return node.parent!;
  }
  // accomplished by mutating links in tree
  append(node: DelayedReactElement, child: DelayedReactElement | StringNode) {
    return node.appendChild(child);
  }
  insert(nnode: DelayedReactElement | StringNode, onode: DelayedReactElement | StringNode) {
    
  }
  clone(node: DelayedReactElement) : DelayedReactElement {
    return node.clone();
  }
  split(node: StringNode, n: number) : StringNode {
    // split the node
    let new_text = node.text.slice(n);
    let new_node = {
      text: new_text,
      parent: null
    };

    node.text = node.text.slice(0, n);

    // put in tree
    let next = this.next(node);
    if(next) {
      this.insert(new_node, next);
    } else {
      let parent = this.parent(node);
      this.append(parent, new_node);
    }

    // return new_node (which is now in tree)
    return new_node;
  }
  next(node: DelayedReactElement | StringNode): DelayedReactElement | StringNode {
    return node.parent!.next(node);
  }
  previous(node: DelayedReactElement | StringNode): DelayedReactElement | StringNode {
    return node.parent!.previous(node);
  }
  firstChild(node: DelayedReactElement): DelayedReactElement | StringNode | null {
    return node.children.length > 0 : node.children[0] ? null;
  }
  lastChild(node: DelayedReactElement): DelayedReactElement | StringNode | null {
    return node.children.length > 0 : node.children[node.children.length-1] ? null;
  }
  childNodes(node: DelayedReactElement): (DelayedReactElement | StringNode)[] {
    return [...node.children];
  }
  childNode(node: DelayedReactElement, i: number): DelayedReactElement | StringNode | null {
    if (node.children.length > i) {
      return node.children[i];
    } else {
      return null;
    }
  }
  kind(node: DelayedReactElement | StringNode): string {
    if (node instanceof StringNode) {
      return '#text';
    } else {
      let node = node as DelayedReactElement;
      if (typeof node.kind === 'string') {
        return node.kind.toUpperCase();
      } else if (node.kind instanceof React.ReactElement) {
        typeof node.kind.type === 'string' ? node.kind.type.toUpperCase() : 'DIV'; // pretend react components are divs?
      } else {
        return 'DIV'; // pretend react components are divs
      }
    }
  }
  value(node: DelayedReactElement | StringNode): string {
    if (node instanceof StringNode) return node.text;
    return "";
  }
  textContent(node: DelayedReactElement | StringNode): string {
    if (node instanceof StringNode) return node.text;
    return (node as DelayedReactElement).textContent();
  }

}
