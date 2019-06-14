import multiEntry from "rollup-plugin-multi-entry";
import wasm from 'rollup-plugin-wasm'
import nodeResolve from 'rollup-plugin-node-resolve';
import amd from 'rollup-plugin-amd';

export default {
  cache: false,
  input: [
    'build/fourd.wasm',
    'build/dynamic-graph.bundle.min.js'
  ],
  output: {
    name: 'dist/dynamic-graph.bundle.with-wasm.min.js'
  },
  plugins: [
    nodeResolve(), 
    multiEntry(), 
    amd(),
    wasm()
  ]
};