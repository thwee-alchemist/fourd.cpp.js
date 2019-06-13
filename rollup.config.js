import multiEntry from "rollup-plugin-multi-entry";
import wasm from 'rollup-plugin-wasm'
import nodeResolve from 'rollup-plugin-node-resolve';
import amd from 'rollup-plugin-amd';

export default {
  cache: false,
  input: [
    'build/fourd.wasm',
    'build/jquery-3.4.0.min.js',
    'build/fourd.js',
    'dynamic-graph.js'
  ],
  output: {
    name: 'dist/dynamic-graph.min.js',
    globals: {
      'build/jquery-3.4.0.min.js': '$',
      'three': 'THREE',
      'build/FourDCtrl.js': 'FourDCtrl'
    }
  },
  plugins: [
    nodeResolve(), 
    multiEntry(), 
    amd(),
    wasm()
  ]
};