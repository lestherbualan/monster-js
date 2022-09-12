const cssTree = require('css-tree');
const sass = require('sass');

const CORE_PACKAGE = '@monster-js/core';
const CREATE_ELEMENT = 'createElement';
const CREATE_TEXT = 'createText';
const ADD_EVENT = 'addEventListener';
const ATTRIBUTE_BINDING = 'attributeBinding';
const TEXT_BINDING = 'textBinding';
const LIST_RENDERING = 'listRendering';
const IF_CONDITION = 'ifCondition';
const VIEW_DIRECTIVE = 'viewDirective';
const RENDER_CHILD = 'renderChild';
const UNKNOWN_ELEMENT_TAG = 'unknownElementTag';
const VIEW_PIPE = 'viewPipe';

let styleType = 'css';
let ProgramPath;
const context = {
  type: 'Identifier',
  name: 'Θc'
};
let componentCounter = 0;
let applyStyleFn;

module.exports = function (babel) {
  const { types: t } = babel;

  return {
    name: "ast-transform", // not required
    visitor: {
      CallExpression(path) {
        if(path.node.callee.name === 'ΘRemoveInProd' && process && process.env && process.env.NODE_ENV === 'production') {
          path.remove();
        }
      },
      FunctionDeclaration(path) {
        const { node } = path;
        const bodyContent = node.body.body;
        if (bodyContent.length > 0 && bodyContent[bodyContent.length - 1].type === 'ReturnStatement') {
          const returnStatement = bodyContent[bodyContent.length - 1];
          if (returnStatement.argument.type === 'JSXElement') {


            componentCounter++;

            
            if (applyStyleFn) {
              addImport('_StyleFn');
              applyStyleFn.arguments.push({
                type: 'Identifier',
                name: node.id.name
              });





              let source = applyStyleFn.arguments[0].value;
              if (styleType === 'sass') {
                source = sass.compileString(source, {style: "compressed"}).css;
              }
              const elKey = 'mn-el-' + componentCounter;
              const ast = cssTree.parse(source);
              cssTree.walk(ast, node => {
                if (node.type === 'Selector') {
                  const children = [];
                  node.children.forEach(item => {
                    children.push(item);
                  });
                  if (children.length > 1) {
                    children.splice(1, 0, {
                      type: 'AttributeSelector',
                      name: {
                        type: 'Identifier',
                        name: elKey
                      },
                      matcher: null,
                      value: null,
                      flags: null
                    });
                  }
                  children.push({
                    type: 'AttributeSelector',
                    name: {
                      type: 'Identifier',
                      name: elKey
                    },
                    matcher: null,
                    value: null,
                    flags: null
                  });
                  node.children = children;
                }
              });

              applyStyleFn.arguments[0].value = cssTree.generate(ast);







            }

            
            path.node.body.body = [
              {
                type: 'VariableDeclaration',
                kind: 'const',
                declarations: [
                  {
                    type: 'VariableDeclarator',
                    id: {
                      type: 'Identifier',
                      name: 'Θc'
                    },
                    init: { type: 'ThisExpression' }
                  }
                ]
              },
              ...path.node.body.body
            ];

            const propsPath = path.get('params[0]');
            const propsNode = path.node.params[0];

            if (propsNode && propsNode.type === 'ObjectPattern') {
              const propName = 'Θprop';
              propsNode.properties.forEach(prop => {
                const propBinding = propsPath.scope.bindings[prop.key.name];
                propBinding.referencePaths.forEach(ref => {
                  ref.node.type = 'MemberExpression';
                  ref.node.object = {
                    type: 'Identifier',
                    name: propName
                  };
                  ref.node.property = {
                    type: 'Identifier',
                    name: ref.node.name
                  };
                });
              });
              
              propsNode.type = 'Identifier';
              propsNode.name = propName;
            }

          }
        }
      },
      Program(path) {
        applyStyleFn = null;
        path.node.body.forEach((item, index) => {
          if (item.type === 'ExpressionStatement' && item.expression.type === 'JSXElement' && item.expression.openingElement.name.name === 'style') {
            const node = path.get('body')[index].node;

            node.expression.openingElement.attributes.forEach(attr => {
              if (attr.name.name === 'style-type') {
                styleType = attr.value.value;
              }
            });

            node.expression.children.forEach(child => {
              if (child.type === 'JSXExpressionContainer') {
                if (child.expression.type === 'TemplateLiteral') {
                  let rawStyle = child.expression.quasis[0].value.raw;
                  node.type = 'CallExpression';
                  node.callee = {
                    type: 'Identifier',
                    name: '_StyleFn'
                  };
                  node.arguments = [
                    {
                      type: 'StringLiteral',
                      value: rawStyle
                    }
                  ];
                  
                  applyStyleFn = node;
                }
              }
            });
          }
        });
        ProgramPath = path;
      },
      JSXText(path) {
        transformJSXText(path.node);
      },
      JSXElement(path) {

        const { node } = path;
        const { openingElement } = node;

        const events = [];
        const props = [];
        const listRendering = {};
        const attributeBindings = [];
        const directives = [];
        const attributes = [];
        let ifCondition = null;
        
        path.traverse({
          JSXExpressionContainer(path2) {
            transformExpressionContainer(path2);
          }
        });

        openingElement.attributes.forEach(attr => {

          // filter events
          if (attr.name.namespace && (attr.name.namespace.name === 'on' || attr.name.namespace.name === 'on-prevent')) {
            events.push(attr);
            
            // filter props
          } else if (attr.name.namespace && attr.name.namespace.name === 'prop') {
            props.push(attr);

            // filter if condition
          } else if (attr.name.namespace && attr.name.namespace.name === 'view' && attr.name.name.name === 'if') {
            ifCondition = attr;

            // filter list rendering
          } else if (attr.name.namespace && attr.name.namespace.name === 'view' && (attr.name.name.name === 'for' || attr.name.name.name === 'for-item' || attr.name.name.name === 'for-index')) {
            listRendering[kebabToCamel(attr.name.name.name)] = attr;

            // filter attribute bindings
          } else if (!attr.name.namespace && attr.value.type === 'JSXExpressionContainer') {
            attributeBindings.push(attr);

            // filter directives
          } else if (attr.name.namespace) {
            directives.push(attr);

            // filter normal attributes
          } else if (attr.value.type === 'StringLiteral') {
            attributes.push(attr);
          }

        });

        transformElement(path, attributes);
        applyProps(node, props);
        fixUndefinedName(node, props);
        addEvent(node, events);
        transformAttributeBindings(node, attributeBindings);
        transformDirective(node, directives);
        transformIfCondition(node, ifCondition);
        transformListRendering(path, listRendering);
      }
    }
  };
}

function fixUndefinedName(node, props) {
  if (node.openingElement.name.type === 'JSXMemberExpression') {
    addImport(UNKNOWN_ELEMENT_TAG);
    
    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: UNKNOWN_ELEMENT_TAG
    };
    
    node.arguments[0] = {
      ...node.openingElement.name,
      type: 'MemberExpression'
    };

    if (!node.arguments[1]) {
      node.arguments[1] = {
        type: 'ObjectExpression',
        properties: []
      };
    }
    if (!node.arguments[2]) {
      node.arguments[2] = {
        type: 'ArrayExpression',
        elements: []
      }
    }
    node.arguments.push(context);
    node.arguments.push({
      type: 'ObjectExpression',
      properties: props.map(prop => {
        return {
          type: 'ObjectProperty',
          key: formatObjectKey(prop.name.name.name),
          value: {
            type: 'ArrowFunctionExpression',
            params: [],
            body: prop.value.expression || prop.value
          }
        };
      })
    });
  }
}

function formatObjectKeyToString(name) {
  if (name.indexOf('-') > 0) {
    return {
      type: 'StringLiteral',
      value: name
    }
  }
  return {
    type: 'Identifier',
    name: name
  }
}

function formatObjectKey(name) {
  return {
    type: 'Identifier',
    name: name.indexOf('-') > 0 ? kebabToCamel(name) : name
  }
}

function applyProps(node, props) {
  const { openingElement } = node;
  let name = openingElement.name.name;
  
  if (name && name.indexOf('-') > 0) {
    addImport(RENDER_CHILD);

    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: RENDER_CHILD
    };
    node.arguments[0] = {
      type: 'StringLiteral',
      value: name
    };

    if (!node.arguments[1]) {
      node.arguments[1] = {
        type: 'ObjectExpression',
        properties: []
      };
    }
    if (!node.arguments[2]) {
      node.arguments[2] = {
        type: 'ArrayExpression',
        elements: []
      }
    }
    node.arguments.push(context);
    node.arguments.push({
      type: 'ObjectExpression',
      properties: props.map(prop => {
        return {
          type: 'ObjectProperty',
          key: formatObjectKey(prop.name.name.name),
          value: {
            type: 'ArrowFunctionExpression',
            params: [],
            body: prop.value.expression || prop.value
          }
        };
      })
    });
  }
}

function transformDirective(node, directives) {
  if (directives.length > 0) {
    addImport(VIEW_DIRECTIVE);

    const originalNode = { ...node };
    const directiveObject = {};

    directives.forEach(directive => {
      const namespace = directive.name.namespace.name;
      if (!directiveObject[namespace]) {
        directiveObject[namespace] = [];
      }
      directiveObject[namespace].push(directive);
    });

    const arr = {
      type: 'ArrayExpression',
      elements: []
    };
    for (const [key, value] of Object.entries(directiveObject)) {
      arr.elements.push({
        type: 'ObjectExpression',
        properties: [
          {
            type: 'ObjectProperty',
            key: {
              type: 'Identifier',
              name: 'namespace',
            },
            value: {
              type: 'StringLiteral',
              value: key
            }
          },
          {
            type: 'ObjectProperty',
            key: {
              type: 'Identifier',
              name: 'directives',
            },
            value: {
              type: 'ObjectExpression',
              properties: value.map(item => {
                
                if (!item.value) {
                  item.value = {
                    type: 'StringLiteral',
                    value: ''
                  };
                }
                
                const properties = [
                  {
                    type: 'ObjectProperty',
                    key: {
                      type: 'Identifier',
                      name: 'get'
                    },
                    value: {
                      type: 'ArrowFunctionExpression',
                      params: [],
                      body: item.value.expression || item.value
                    }
                  }
                ];

                if (
                  !!item.value.expression
                  && (
                    item.value.expression.type === 'MemberExpression'
                    || item.value.expression.type === 'ThisExpression'
                    || item.value.expression.type === 'Identifier'
                  )
                ) {
                  properties.push({
                    type: 'ObjectProperty',
                    key: {
                      type: 'Identifier',
                      name: 'set'
                    },
                    value: {
                      type: 'ArrowFunctionExpression',
                      params: [
                        {
                          type: 'Identifier',
                          name: 'θdr'
                        }
                      ],
                      body: {
                        type: 'AssignmentExpression',
                        operator: '=',
                        left: item.value.expression,
                        right: {
                          type: 'Identifier',
                          name: 'θdr'
                        }
                      }
                    }
                  });
                }

                return {
                  type: 'ObjectProperty',
                  key: {
                    type: 'Identifier',
                    name: kebabToCamel(item.name.name.name)
                  },
                  value: {
                    type: 'ObjectExpression',
                    properties
                  }
                }
              })
            }
          },
        ]
      });
    }

    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: VIEW_DIRECTIVE
    };
    node.arguments = [
      context,
      originalNode,
      arr
    ];
  }
}

function transformIfCondition(node, ifCondition) {
  if (ifCondition) {
    addImport(IF_CONDITION);

    const originalNode = { ...node };

    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: IF_CONDITION
    };
    node.arguments = [
      context,
      {
        type: 'ArrowFunctionExpression',
        params: [],
        body: originalNode
      },
      {
        type: 'ArrowFunctionExpression',
        params: [],
        body: ifCondition.value.expression
      }
    ];

  }
}

function kebabToCamel(str) {
  return str.replace(/-./g, x => x[1].toUpperCase());
}

function transformListRendering(path, listRendering) {
  const { node } = path;
  if (listRendering.for) {
    addImport(LIST_RENDERING);

    const originalNode = { ...node };
    const forItemValue = listRendering.forItem ? listRendering.forItem.value.value : '$item';
    const forIndexValue = listRendering.forIndex ? listRendering.forIndex.value.value : '$index';

    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: LIST_RENDERING
    };
    node.arguments = [
      context,
      {
        type: 'ArrowFunctionExpression',
        params: [
          {
            type: 'Identifier',
            name: forIndexValue
          }
        ],
        body: {
          type: 'BlockStatement',
          body: [
            {
              type: 'VariableDeclaration',
              kind: 'const',
              declarations: [
                {
                  type: 'VariableDeclarator',
                  id: {
                    type: 'Identifier',
                    name: forItemValue
                  },
                  init: {
                    type: 'StringLiteral',
                    value: ''
                  }
                }
              ]
            },
            {
              type: 'ReturnStatement',
              argument: originalNode
            }
          ]
        }
      },
      {
        type: 'ArrowFunctionExpression',
        params: [],
        body: listRendering.for.value.expression
      }
    ];

    path.traverse({
      VariableDeclaration(path2) {
        if (path2.scope.bindings[forItemValue]) {
          path2.scope.bindings[forItemValue].referencePaths.forEach(item => {
            item.node.type = 'MemberExpression';
            item.node.object = listRendering.for.value.expression;
            item.node.computed = true;
            item.node.property = {
              type: 'Identifier',
              name: forIndexValue
            }
          });
          path2.remove();
        }
      }
    });

  }
}

function transformAttributeBindings(node, attributeBindings) {
  if (attributeBindings.length > 0) {
    addImport(ATTRIBUTE_BINDING);
    const originalNode = { ...node };
    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: ATTRIBUTE_BINDING
    };
    node.arguments = [
      context,
      originalNode,
      {
        type: 'ObjectExpression',
        properties: attributeBindings.map(binding => {
          return {
            type: 'ObjectProperty',
            key: formatObjectKeyToString(binding.name.name),
            value: {
              type: 'ArrowFunctionExpression',
              params: [],
              body: binding.value.expression
            }
          }
        })
      }
    ];
  }
}

function addEvent(node, events) {
  if (events.length > 0) {
    addImport(ADD_EVENT);

    events.forEach(event => {
      const originalNode = { ...node };
      node.type = 'CallExpression';
      node.callee = {
        type: 'Identifier',
        name: ADD_EVENT
      };
      node.arguments = [
        originalNode,
        {
          type: 'StringLiteral',
          value: event.name.name.name
        },
        event.value.expression
      ];
      if (event.name.namespace.name === 'on-prevent') {
        node.arguments.push({
          type: 'BooleanLiteral',
          value: true
        });
      }
    });
  }
}

function transformElement(path, attributes) {
  const node = path.node;
  addImport(CREATE_ELEMENT);

  const { openingElement, children } = node;

  node.type = 'CallExpression';
  node.callee = {
    type: 'Identifier',
    name: CREATE_ELEMENT
  };
  node.arguments = [
    {
      type: 'StringLiteral',
      value: openingElement.name.name
    }
  ];

  /**
   * Apply attributes
   */
  attributes.push({
    name: {
      name: 'mn-el-' + componentCounter
    },
    value: {
      type: 'StringLiteral',
      value: ''
    }
  });
  node.arguments[1] = {
    type: 'ObjectExpression',
    properties: attributes.map(attribute => {
      return {
        type: 'ObjectProperty',
        key: formatObjectKeyToString(attribute.name.name),
        value: attribute.value
      }
    })
  };

  /**
   * Apply children
   */
  if (children.length > 0) {
    if (!node.arguments[1]) {
      node.arguments[1] = {
        type: 'ObjectExpression',
        properties: []
      };
    }

    node.arguments[2] = {
      type: 'ArrayExpression',
      elements: children.map(child => {
        if (child.type === 'JSXExpressionContainer') {
          return transformTextBinding(child);
        }
        return child;
      })
    };
  }
}

function transformTextBinding(text) {
  addImport(TEXT_BINDING);
  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: TEXT_BINDING
    },
    arguments: [
      context,
      {
        type: 'ArrowFunctionExpression',
        params: [],
        body: text.expression
      }
    ]
  }
}
function transformJSXText(node) {
  addImport(CREATE_TEXT);
  node.type = 'CallExpression';
  node.callee = {
    type: 'Identifier',
    name: CREATE_TEXT
  };
  node.arguments = [
    {
      type: 'StringLiteral',
      value: node.value
    }
  ];
}

function addImport(name) {
  let coreImports = [];
  ProgramPath.node.body.forEach(item => {
    if (item.type === 'ImportDeclaration' && item.source.value === CORE_PACKAGE) {
      coreImports.push(item);
    }
  });

  let hasImport = false;
  coreImports.forEach(item => {
    item.specifiers.forEach(item2 => {
      if (item2.imported.name === name) {
        hasImport = true;
      }
    });
  });

  if (!hasImport && coreImports.length > 0) {
    coreImports[0].specifiers.push({
      type: 'ImportSpecifier',
      imported: {
        type: 'Identifier',
        name: name
      }
    });
  }
  if (!hasImport && coreImports.length === 0) {
    ProgramPath.node.body = [
      {
        type: 'ImportDeclaration',
        source: {
          type: 'StringLiteral',
          value: CORE_PACKAGE
        },
        specifiers: [
          {
            type: 'ImportSpecifier',
            imported: {
              type: 'Identifier',
              name: name
            }
          }
        ]
      },
      ...ProgramPath.node.body
    ];
  }
}

function transformExpressionContainer(path) {
  const { node } = path;
  
  if (node.expression.type === 'JSXEmptyExpression') {
    path.remove();
    return;
  }
  
  path.traverse({
    BinaryExpression(path2) {
      transformBinaryExpression(path2);
    }
  });
}

function transformBinaryExpression(path) {
  addImport(VIEW_PIPE);
  if (path.node.operator !== '|') {
    return;
  }
  const { node } = path;
  node.type = 'CallExpression';
  node.callee = {
    type: 'Identifier',
    name: VIEW_PIPE
  };
  
  if (node.right.type === 'Identifier') {
    node.arguments = [
      context,
      {
        type: 'StringLiteral',
        value: node.right.name
      },
      node.left
    ];
  }
  if (node.right.type === 'CallExpression') {
    node.arguments = [
      context,
      {
        type: 'StringLiteral',
        value: node.right.callee.name
      },
      node.left,
      {
        type: 'ArrayExpression',
        elements: node.right.arguments
      }
    ];
  }
}


















