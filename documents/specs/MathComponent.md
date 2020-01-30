# MathComponent Specification
## Summary
The MathComponent can be used for rending display and inline TeX or MathML using MathJax. 
## Props
The MathComponent gets its source (untypeset) content and configuration via properties. The TeX (`tex`) property can be used to send LaTeX code to be typeset to the component. The MathML `mathml` property can be used to send MathML code to be typeset in the component. There is a `config` property which is passed directly along to MathJax, when typesetting is done.
