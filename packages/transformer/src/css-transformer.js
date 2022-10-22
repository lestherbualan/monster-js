const cssTree = require('css-tree');

module.exports = function cssTransformer(source, elKey) {
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

    return cssTree.generate(ast);
}