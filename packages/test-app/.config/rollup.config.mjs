import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';
import { babel } from '@rollup/plugin-babel';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';
import copy from 'rollup-plugin-copy';
import { terser } from "rollup-plugin-terser";
import { cssTransformer, jsxTransformer } from '@monster-js/transformer';
import replace from '@rollup/plugin-replace';
import { readFileSync } from 'fs';
import path from 'path';

const getConfig = config => process.argv.find(item => item === config)
const isDevServer = () => !!getConfig('--config-dev-server');
const isProd = () => !!getConfig('--config-prod');
const isOpenBrowser = () => !!getConfig('--config-open-browser');
const getPort = () => {
  let port;
  process.argv.forEach(item => {
    if (item.indexOf('--config-port-') === 0) {
      port = item.replace('--config-port-', '');
    }
  });
  return port;
}


/**
 * Environments
 * src/environments/*
 */
let env = (process.argv.find(item => item.indexOf('--config-env-') === 0) || '').replace('--config-env-', '');
env = env ? '.' + env : env;
const devEnvironment = readFileSync(path.resolve(process.cwd(), 'src/environments/environment.ts'), {encoding:'utf8', flag:'r'});
const newEnvironment = readFileSync(path.resolve(process.cwd(), `src/environments/environment${env}.ts`), {encoding:'utf8', flag:'r'});


const OUT_DIR = 'dist';
const PORT = getPort() || 4000;
const RESOLVE_EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx'];

export default {
  input: 'src/index.ts',
  output: {
    file: OUT_DIR + '/index.js',
    format: 'esm'
  },
  plugins: [
    cssTransformer({ include: ['**/*.scss'] }),
    jsxTransformer({ include: ['**/*.tsx'] }),
    replace({
      preventAssignment: true,
      include: ['src/environments/*.ts'],
      delimiters: ['', ''],
      values: {
        [devEnvironment]: newEnvironment
      }
    }),
    copy({ targets: [ { src: './src/index.html', dest: OUT_DIR } ] }),
    resolve({ extensions: RESOLVE_EXTENSIONS }),
    babel({
      extensions: RESOLVE_EXTENSIONS,
      babelHelpers: 'bundled',
      plugins: [
        'babel-plugin-transform-typescript-metadata',
        ["@babel/plugin-proposal-decorators", {"legacy": true}]
      ],
      presets: ['@babel/preset-typescript']
    }),
    scss({ output: OUT_DIR + '/index.css', verbose: false, outputStyle: "compressed" }),
    isProd() && terser(),
    isDevServer() && serve({ contentBase: OUT_DIR, port: PORT, open: isOpenBrowser(), historyApiFallback: false }),
    isDevServer() && livereload()
  ]
};
