import { createFilter } from '@rollup/pluginutils';
import { parse } from '@babel/parser';
import * as generate from "@babel/generator";
import jsxAstVisitors from './jsx-ast-visitors.js';
import * as traverse from '@babel/traverse';
import { getElementKey } from './get-element-key.js';

export function jsxTransformer(options: any = {}) {
    const filter = createFilter(options.include, options.exclude);

    return {
        name: 'monster-jsx-transformer',
        transform(code, id) {
            if (!filter(id)) return;

            const key = getElementKey(id.slice(0, -4));

            const ast = parse(code, { sourceType: 'module', plugins: ['jsx', 'typescript']});
            traverse.default.default(ast, jsxAstVisitors({}, key).visitor);
            const output = generate.default.default(ast, code);

            return {
                code: output.code,
                map: output.map
            };
        }
    };
}

