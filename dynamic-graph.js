import $ from 'jquery';
import FourDCtrl from './build/FourDCtrl.js';
import Module from 'build/fourd.js';

class Dynamic3DGraph extends HTMLElement {
  constructor(){
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    var container = document.createElement('div');
    
    container.id = 'display';
    shadowRoot.appendChild(container)
    
    this._vertex_options = {cube: {size: 10, color: 0x000000}};
    this._edge_options = {color: 0x000000};

    var that = this;
    var Module = {
      onRuntimeInitialized: _ => {
    // Module.onRuntimeInitialized = _ => {
    // fourd({...imports}).then(({instance}) => {

        that._fourd = new FourDCtrl(
          shadowRoot,
          {
            border: 'none',
            width: this.width,
            height: this.height,
            background: this.background
          }, 
          Module.default_settings,
          Module.LayoutGraph
        );
        that._graph = that._fourd.graph;
        // resolve(fourd.graph);
      
        that._graph.settings.repulsion = 9e1;
        that._graph.settings.attraction = 3e-3;
        that._graph.settings.epsilon = 1e-4;
        that._graph.settings.friction = 3e-1;
        that._graph.settings.inner_distance = 9e6;
        that._settings = that.graph.settings;
      }
    }
  }

  get graph(){
    return this._graph;
  }

  get settings(){
    return this._settings;
  }

  get vertex_options(){
    return this._vertex_options;
  }

  set vertex_options(val){
    this._vertex_options = val;
  }

  get edge_options(){
    return this._edge_options;
  }

  set edge_options(val){
    this._edge_options = val;
  }

  get width(){
    return this.getAttribute('width');
  }

  set width(w) {
    return this.setAttribute('width', w);
  }

  get height(){
    return this.getAttribute('height');
  }

  set height(h){
    return this.setAttribute('height', h);
  }

  get background(){
    return this.getAttribute('background');
  }

  set background(b){
    return this.setAttribute('background', b);
  }

  clear(){
    return this._fourd.graph.clear();
  }

  add_vertex(options=this.vertex_options){
    return this._fourd.graph.add_vertex(options);
  }

  add_edge(source, target, options=this.edge_options){
    return this._fourd.graph.add_edge(source, target, options);
  }

  remove_vertex(id){
    return this._fourd.graph.remove_vertex(id);
  }

  remove_edge(id){
    return this._fourd.graph.remove_edge(id);
  }
}

window.customElements.define('dynamic-graph', Dynamic3DGraph);
