import multiEntry from "rollup-plugin-multi-entry";
import wasm from 'rollup-plugin-wasm'

export default {
  cache: false,
  input: [
    'build/jquery-3.4.0.min.js', 
    'build/jquery-ui.1.12.1.min.js', 
    'build/r103.three.min.js',
    'build/OrbitControls.js',
    'build/fourd.wasm',
    'build/fourd.js',
    'build/animation.js',
    'dynamic-graph.js'
  ],
  plugins: [multiEntry(), wasm({sync: ['build/fourd.wasm']})]
};