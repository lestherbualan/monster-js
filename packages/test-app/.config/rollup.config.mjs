import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import { babel } from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy';
import { terser } from "rollup-plugin-terser";
import alias from '@rollup/plugin-alias';
import { cssTransformer, jsxTransformer } from '@monster-js/transformer';

const isDevServer = () => !!process.argv.find(item => item === '--config-dev-server')
const isProd = () => !!process.argv.find(item => item === '--config-prod')

const dist = 'dist';
const port = 4000;
const resolveExtensions = ['.ts', '.tsx', '.js', '.jsx'];

export default {
  input: 'src/index.ts',
  output: {
    file: dist + '/index.js',
    format: 'esm'
  },
  plugins: [
    cssTransformer({ include: ['**/*.scss'] }),
    jsxTransformer({ include: ['**/*.tsx'] }),
    alias({
      entries: [
        // { find: '@monster-js/core', replacement: 'src/core/public-apis.ts' },
      ]
    }),
    copy({ targets: [ { src: './src/index.html', dest: dist } ] }),
    resolve({ extensions: resolveExtensions }),
    babel({
      extensions: resolveExtensions,
      babelHelpers: 'bundled',
      plugins: [
        'babel-plugin-transform-typescript-metadata',
        ["@babel/plugin-proposal-decorators", {"legacy": true}]
      ],
      presets: ['@babel/preset-typescript']
    }),
    scss({ output: dist + '/index.css', verbose: false, outputStyle: "compressed" }),
    isProd() && terser(),
    isDevServer() && serve({ contentBase: dist, port }),
    isDevServer() && livereload()
  ]
};
