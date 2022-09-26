import { createFilter } from '@rollup/pluginutils';
import { getElementKey } from './get-element-key.js';
import { existsSync } from 'fs';
import path from 'path';
import sass from 'sass';
import * as cssTree from 'css-tree';

function hasComponent(id) {
    const dirname = path.dirname(id);
    const basename = path.basename(id);
    return existsSync(path.resolve(dirname, `${basename.slice(0, -5)}.tsx`));
}

function walkCss(ast, elKey) {
    cssTree.walk(ast, node => {
        if (node.type === 'Selector') {
            const children = [];
            node.children.forEach(item => children.push(item));
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
}

export function cssTransformer(options: any = {}) {
    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'monster-css-transformer',
        transform(code, id): any {
            if (!filter(id)) return;

            if (!hasComponent(id)) {
                return {
                    code,
                    map: null
                };
            }

            const source = sass.compileString(code, { style: "compressed" }).css;
            const ast = cssTree.parse(source);
            walkCss(ast, getElementKey(id.slice(0, -5)));

            return {
                code: cssTree.generate(ast),
                map: null
            };
        }
    };
}
