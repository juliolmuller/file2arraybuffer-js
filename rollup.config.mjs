/* eslint-env node */
import babelPlugin from '@rollup/plugin-babel'
import commonJsPlugin from '@rollup/plugin-commonjs'
import nodeResolvePlugin from '@rollup/plugin-node-resolve'
import terserPlugin from '@rollup/plugin-terser'
import typeScriptPlugin from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import deletePlugin from 'rollup-plugin-delete'
import declarationsPlugin from 'rollup-plugin-dts'
import esBuildPlugin from 'rollup-plugin-esbuild'

import packageMeta from './package.json' with { type: 'json' }

const inputFileName = 'src/index.ts'
const bundleBanner = `/**
 * file-to-arraybuffer v${packageMeta.version}
 *
 * @author ${packageMeta.author}.
 * @license ${packageMeta.license} - 2020-${new Date().getFullYear()}
 */
`

export default defineConfig([
  // UMD for legacy browsers
  {
    input: inputFileName,
    output: [
      {
        name: 'fileToArrayBuffer',
        file: 'dist/file-to-arraybuffer.js',
        format: 'umd',
        sourcemap: 'inline',
        banner: bundleBanner,
      },
      {
        name: 'fileToArrayBuffer',
        file: 'dist/file-to-arraybuffer.min.js',
        format: 'umd',
        sourcemap: 'inline',
        banner: bundleBanner,
        plugins: [
          terserPlugin(),
        ],
      },
    ],
    plugins: [
      deletePlugin({
        targets: [
          'build/*',
          'dist/*',
        ],
      }),
      nodeResolvePlugin(),
      commonJsPlugin(),
      typeScriptPlugin(),
      babelPlugin({
        babelHelpers: 'bundled',
        presets: [['@babel/preset-env', { targets: '> 0.25%, not dead' }]],
        extensions: ['.ts', '.js'],
      }),
    ],
  },

  // CommonJS & ES Module
  {
    input: inputFileName,
    output: [
      {
        file: 'build/index.cjs.js',
        format: 'cjs',
        sourcemap: 'inline',
        banner: bundleBanner,
      },
      {
        file: 'build/index.esm.js',
        format: 'es',
        sourcemap: 'inline',
        banner: bundleBanner,
      },
    ],
    plugins: [
      nodeResolvePlugin(),
      commonJsPlugin(),
      esBuildPlugin({
        target: 'esnext',
      }),
    ],
    external: Object.keys(packageMeta.dependencies || {}),
  },

  // Types declarations files
  {
    input: inputFileName,
    output: {
      file: 'build/index.d.ts',
      format: 'es',
    },
    plugins: [
      declarationsPlugin(),
    ],
  },
])
