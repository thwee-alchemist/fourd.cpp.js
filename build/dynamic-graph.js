class Dynamic3DGraph extends HTMLElement {
  constructor(){
    super();
    this.shadow = this.attachShadow({mode: 'open'});
    // this.connectedCallback();

    console.info('dynamic-graph instantiated')
  }

  async connectedCallback(){

    Module.onRuntimeInitialized = () => {
      this.module = Module;
    };
    Module.instantiateWasm();

    console.info('connectedCallback')

    var container = document.createElement('div');
    container.style.position = 'relative';
    container.style.width = this.width;
    container.style.height = this.height;
    
    container.id = 'display';
    this.shadow.appendChild(container);
    
    this._vertex_options = {cube: {size: 10, color: 0x000000}};
    this._edge_options = {color: 0x000000};

    this.second_module = new Promise((resolve, reject) => {
      if(this.module){
        resolve(this.module);
      }
    });

    this.setupWasm(this.module)

    console.info('connectedCallback done')
  }

  setupWasm(Module){
    console.info('setupWasm')
    this._fourd = new FourDController(
      this.shadow,
      {
        border: 'none',
        width: this.width,
        height: this.height,
        background: this.background
      }, 
      Module.default_settings,
      Module.LayoutGraph,
      this
    );
    this._fourd.connect();
    this._graph = this._fourd.graph;
  
    this._graph.settings.repulsion = 9e1;
    this._graph.settings.attraction = 3e-3;
    this._graph.settings.epsilon = 1e-4;
    this._graph.settings.friction = 3e-1;
    this._graph.settings.inner_distance = 1e6;
    this._settings = this.graph.settings;
    console.info('wasm setup');
  }

  attributeChangedCallback(attr, oldVal, newVal){
    console.info(...arguments)

  }

  adoptedCallback(){
    console.info('dynamic-graph adopted')
    this.connectedCallback();
  }

  disconnectedCallback(){
    this.dispatchEvent(new CustomEvent('stop', {
      bubbles: true,
      detail: null
    }))
    this.running = false;
    // this.clear();

    this._fourd.disconnect();
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

  add_vertex(options=Object.assign({}, this._vertex_options)){
    if(this.running){
      return this._fourd.graph.add_vertex(options);
    }else{
      return this.running;
    }
  }

  get V(){
    return this.graph.V;
  }

  add_edge(source, target, options=Object.assign({}, this._edge_options)){
    if(this.running){
      return this._fourd.graph.add_edge(source, target, options);
    }else{
      return this.running;
    }
  }

  get E(){
    return this.graph.E;
  }

  remove_vertex(id){
    if(this.running){
      return this._fourd.graph.remove_vertex(id);
    }else{
      return this.running;
    }
  }

  remove_edge(id){
    if(this.running){
      return this._fourd.graph.remove_edge(id);
    }else{
      return this.running;
    }
  }

  look_at(id){
    return this._fourd.graph.look_at(id);
  }
};

window.customElements.define('dynamic-graph', Dynamic3DGraph);
