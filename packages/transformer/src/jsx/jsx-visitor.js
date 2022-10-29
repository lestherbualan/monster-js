const CORE_PACKAGE = '@monster-js/core';
const CREATE_ELEMENT = 'createElement';
const CREATE_TEXT = 'createText';
const ADD_EVENT = 'addEvent';
const RENDER_CHILD = 'renderChild';
const TEXT_BINDING = 'textBinding';
const ATTRIBUTE_BINDING = 'attributeBinding';
const VIEW_DIRECTIVE = 'viewDirective';
const VIEW_PIPE = 'viewPipe';
const IF_CONDITION = 'ifCondition';
const LIST_RENDERING = 'listRendering';
const VIEW_PROPS = 'viewProps';
const ADD_ATTRIBUTES = 'addAttributes';
const APPEND_CHILDREN = 'appendChildren';

let programPathGetter;
const CONTEXT = {
  type: 'ThisExpression'
};

module.exports = function (babel, elementKeyGetter = () => null, importedProgramPathGetter = () => null) {
  const { types: t } = babel;
  
  if (importedProgramPathGetter) {
    programPathGetter = importedProgramPathGetter;
  }
  
  return {
    name: "ast-transform", // not required
    visitor: {
      Program(path) {
        programPathGetter = () => path;
      },
      JSXText(path) {
        transformJSXText(path.node);
      },
      JSXElement(path) {
        
        const events = [];
        const props = [];
        const listRendering = {};
        const attributeBindings = [];
        const directives = [];
        const attributes = [];
        let ifCondition = null;
        let isAttribute = null;
        
        path.traverse({
          JSXExpressionContainer(path2) {
            transformExpressionContainer(path2);
          }
        });
        
        path.node.openingElement.attributes.forEach(attr => {
          
          if (!attr.value) {
            attr.value = {
              type: 'StringLiteral',
              value: ''
            };
          }
          
          if (attr.name.name === 'is') {
            isAttribute = attr.value.value;
          }
          
          if (attr.name.namespace && (attr.name.namespace.name === 'on' || attr.name.namespace.name === 'on-prevent')) {
            
            events.push(attr);
            
          } else if (attr.name.namespace && attr.name.namespace.name === 'prop') {
            
            props.push(attr);
            
          } else if (attr.name.namespace && attr.name.namespace.name === 'v' && attr.name.name.name === 'if') {
            
            ifCondition = attr;
            
          } else if (
            attr.name.namespace
            && attr.name.namespace.name === 'v'
            && (attr.name.name.name === 'for' || attr.name.name.name === 'for-item' || attr.name.name.name === 'for-index' || attr.name.name.name === 'for-update')
          ) {
            
            listRendering[kebabToCamel(attr.name.name.name)] = attr;
            
          } else if (!attr.name.namespace && attr.value.type === 'JSXExpressionContainer') {
            
            attributeBindings.push(attr);
            
          } else if (attr.name.namespace) {
            
            directives.push(attr);
            
          } else if (attr.value.type === 'StringLiteral') {
            
            attributes.push(attr);
            
          }
        });
        
        if (path.node.openingElement.name.name.indexOf('-') > -1) {
          renderChild(path);
        } else {
          transformElement(path, isAttribute);
        }
        
        addAttributes(path, attributes, elementKeyGetter());
        addChildren(path, path.node.children);
        
        applyProps(path, props);
        addEvent(path, events);
        transformAttributeBindings(path, attributeBindings);
        transformDirective(path, directives);
        transformIfCondition(path, ifCondition);
        transformListRendering(path, listRendering);
      }
    }
  };
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
      CONTEXT,
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
    
    if (listRendering.forUpdate) {
      node.arguments.push(listRendering.forUpdate.value.expression);
    }

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

function transformIfCondition({node}, ifCondition) {
  if (ifCondition) {
    addImport(IF_CONDITION);

    const originalNode = { ...node };

    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: IF_CONDITION
    };
    node.arguments = [
      CONTEXT,
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

function transformDirective({node}, directives) {
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
      CONTEXT,
      originalNode,
      arr
    ];
  }
}

function renderChild({node}, props) {
  const { openingElement } = node;
  let name = openingElement.name.name;
  
  if (name && name.indexOf('-') > 0) {
    addImport(RENDER_CHILD);

    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: RENDER_CHILD
    };
    node.arguments = [
      {
        type: 'StringLiteral',
        value: name
      },
      CONTEXT
    ];
  }
}

function applyProps({node}, props) {
  if (props.length === 0) {
    return;
  }
  const { openingElement } = node;
  let name = openingElement.name.name;
  
  addImport(VIEW_PROPS);
    
  const originalNode = {...node};
    
  node.type = 'CallExpression';
  node.callee = {
    type: 'Identifier',
    name: VIEW_PROPS
  };
  node.arguments = [
    CONTEXT,
    originalNode
  ];
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

function transformTextBinding(text) {
  addImport(TEXT_BINDING);
  return {
    type: 'CallExpression',
    callee: {
      type: 'Identifier',
      name: TEXT_BINDING
    },
    arguments: [
      CONTEXT,
      {
        type: 'ArrowFunctionExpression',
        params: [],
        body: text.expression
      }
    ]
  }
}

function addEvent({node}, events) {
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
        {
          type: 'ArrowFunctionExpression',
          params: [{ type: 'Identifier', name: '$event' }],
          body: event.value.expression,
        },
        CONTEXT
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

function kebabToCamel(str) {
  return str.replace(/-./g, x => x[1].toUpperCase());
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


function transformElement(path, isAttribute) {
  addImport(CREATE_ELEMENT);
  const openingElement = path.node.openingElement;
  path.node.type = 'CallExpression';
  path.node.callee = {
    type: 'Identifier',
    name: CREATE_ELEMENT
  };
  path.node.arguments = [
    { type: 'StringLiteral', value: openingElement.name.name }
  ];
  if (isAttribute) {
    path.node.arguments.push({
      type: 'StringLiteral',
      value: isAttribute
    });
  }
}

function addChildren(path, children) {
  if (children.length > 0) {
    addImport(APPEND_CHILDREN);
    
    const originalNode = {...path.node};
    path.node.type = 'CallExpression';
    path.node.callee = {
      type: 'Identifier',
      name: APPEND_CHILDREN
    };
    path.node.arguments = [
      originalNode,
      {
        type: 'ArrayExpression',
        elements: children.map(child => {
          if (child.type === 'JSXExpressionContainer') {
            return transformTextBinding(child);
          }
          return child;
        })
      }
    ];
  }
}

function formatObjectKey(name) {
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

function addAttributes(path, attributes, elementKey) {
  addImport(ADD_ATTRIBUTES);
  const originalNode = {...path.node};
  path.node.type = 'CallExpression';
  path.node.callee = {
    type: 'Identifier',
    name: ADD_ATTRIBUTES
  };
  path.node.arguments = [
    originalNode,
    {
      type: 'ObjectExpression',
      properties: attributes.map(attr => {
        return {
          type: 'ObjectProperty',
          key: formatObjectKey(attr.name.name),
          value: attr.value
        }
      })
    }
  ];
  if (elementKey) {
    path.node.arguments[1].properties.push({
      type: 'ObjectProperty',
      key: formatObjectKey(elementKey),
      value: {
        type: 'StringLiteral',
        value: ''
      }
    });
  }
}

function addImport(name) {
  let coreImports = [];
  programPathGetter().node.body.forEach(item => {
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
    programPathGetter().node.body = [
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
      ...programPathGetter().node.body
    ];
  }
}

function transformAttributeBindings({node}, attributeBindings) {
  if (attributeBindings.length > 0) {
    addImport(ATTRIBUTE_BINDING);
    const originalNode = { ...node };
    node.type = 'CallExpression';
    node.callee = {
      type: 'Identifier',
      name: ATTRIBUTE_BINDING
    };
    node.arguments = [
      CONTEXT,
      originalNode,
      {
        type: 'ObjectExpression',
        properties: attributeBindings.map(binding => {
          return {
            type: 'ObjectProperty',
            key: formatObjectKey(binding.name.name),
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
      CONTEXT,
      {
        type: 'StringLiteral',
        value: node.right.name
      },
      node.left
    ];
  }
  if (node.right.type === 'CallExpression') {
    node.arguments = [
      CONTEXT,
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
