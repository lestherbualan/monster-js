const { fileReader } = require("./file-reader");
const sass = require('sass');
const nodePath = require('path');
const cssTransformer = require("./css-transformer");
const { generateElementKey } = require("./jsx/generate-element-key");
const jsxVisitor = require("./jsx/jsx-visitor");

module.exports = function (babel) {

  const { types: t } = babel;

  let addElKey = false;
  let elKey = '';

  let ProgramPath;

  return {
    name: "ast-transform", // not required
    visitor: {
      ...jsxVisitor(babel, () => elKey, () => ProgramPath).visitor,
      Program(path) {

        ProgramPath = path;


        /**
         * Generates an element key that will be used for styling the component's elements
         */
        const elKeyData = generateElementKey(path);
        addElKey = elKeyData.addElKey;
        elKey = elKeyData.elKey;


      },
      ExportDeclaration(path) {
        const { node } = path;
        if (
          node.declaration &&
          node.declaration.type === "CallExpression" &&
          node.declaration.callee &&
          node.declaration.callee.name === "fnComponent"
        ) {
          const parent = path.parentPath.node.type === "Program" ? path.parentPath : path.parentPath.parentPath;
          parent.traverse({
            ImportDeclaration(path2) {
              const config = node.declaration.arguments[2];
              let isShadowComponent = false;
              if (config) {
                config.properties.forEach(item => {
                  if (item.key.name === 'shadowMode') {
                    isShadowComponent = true;
                  }
                });
              }
              if (isShadowComponent) {
                if (path2.node.specifiers.length === 0) {
                  const source = path2.node.source.value;
                  if (source.endsWith(".scss")) {
                    const filePath = path.hub.file.opts.filename;
                    const text = fileReader(nodePath.resolve(filePath, "../", source));
                    if (node.declaration.arguments.length === 2) {
                      node.declaration.arguments.push({
                        type: 'ObjectExpression',
                        properties: []
                      });
                    }
                    const compiledSass = sass.compileString(text);
                    config.properties.push({
                      type: 'ObjectProperty',
                      key: {
                        type: 'Identifier',
                        name: 'shadowStyle'
                      },
                      value: {
                        type: 'StringLiteral',
                        value: addElKey ? cssTransformer(compiledSass.css, elKey) : compiledSass.css
                      }
                    });
                    path2.remove();
                  }
                }
              }
            }
          });
        }
      },
      ClassDeclaration(path) {
        const { node } = path;


        let hasShadowComponentDecorator = false;
        (node.decorators || []).forEach(item => {
          if (item.expression && item.expression.type === 'CallExpression' && item.expression.callee.name === 'ShadowComponent') {
            hasShadowComponentDecorator = true;
          }
        });


        if (hasShadowComponentDecorator) {
          const parent = path.parentPath.node.type === 'Program' ? path.parentPath : path.parentPath.parentPath;
          parent.traverse({
            ImportDeclaration(path2) {
              if (path2.node.specifiers.length === 0) {
                const source = path2.node.source.value;
                if (source.endsWith('.scss')) {
                  const filePath = path.hub.file.opts.filename;
                  const text = fileReader(nodePath.resolve(filePath, '../', source));
                  const compiledSass = sass.compileString(text);
                  const decorator = {
                    type: 'Decorator',
                    expression: {
                      type: 'CallExpression',
                      callee: {
                        type: 'Identifier',
                        name: 'ShadowStyle'
                      },
                      arguments: [
                        {
                          type: 'StringLiteral',
                          value: addElKey ? cssTransformer(compiledSass.css, elKey) : compiledSass.css
                        }
                      ]
                    }
                  }
                  path.node.decorators.push(decorator);
                  parent.node.body = [
                    {
                      type: 'ImportDeclaration',
                      specifiers: [
                        {
                          type: 'ImportSpecifier',
                          imported: {
                            type: 'Identifier',
                            name: 'ShadowStyle'
                          }
                        }
                      ],
                      source: {
                        type: 'StringLiteral',
                        value: '@monster-js/core'
                      }
                    },
                    ...parent.node.body
                  ];
                  path2.remove();
                }
              }
            }
          });
        }
      }
    }
  };
}
