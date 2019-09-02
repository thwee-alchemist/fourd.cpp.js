class Dynamic3DGraph extends HTMLElement {
  constructor(){

    super();
    this.shadow = this.attachShadow({mode: 'open'});
    // this.connectedCallback()
    console.info('dynamic-graph instantiated')
  }

  connectedCallback(){
    this.ready = new Promise((res, rej) => {
      this.resolve = res;
      var container = document.createElement('div');
      container.style.position = 'relative';
      container.style.width = this.width;
      container.style.height = this.height;
      
      container.id = 'display';
      this.shadow.appendChild(container)
      
      this._vertex_options = {cube: {size: 10, color: 0x000000}};
      this._edge_options = {color: 0x000000};

      var that = this;

      this.fd = new Promise((resolve, reject) => {
        Module.onRuntimeInitialized = () => {
          that._fourd = new FourDController(
            that.shadow,
            {
              border: 'none',
              width: that.width,
              height: that.height,
              background: that.background
            }, 
            Module.default_settings,
            Module.LayoutGraph,
            this.resolve
          );
          that._fourd.connect();
          that._fourd.graph.connect();
          that._graph = that._fourd.graph;
        
          that._graph.settings.repulsion = 9e1;
          that._graph.settings.attraction = 3e-3;
          that._graph.settings.epsilon = 1e-4;
          that._graph.settings.friction = 3e-1;
          that._graph.settings.inner_distance = 1e6;
          that._settings = that.graph.settings;

          resolve(that._fourd)
        }
      });
    })

    this.ready.then(() => this.running = true);
  }

  attributeChangedCallback(attr, oldVal, newVal){
    console.info(...arguments)

  }

  adoptedCallback(){
    console.info('dynamic-graph adopted')
    this.connectedCallback();
  }

  disconnectedCallback(){
    this.running = false;
    this.fd.then(fd => {
      fd.disconnect();
    });
  }
  
  adoptedCallback() {
    console.log('Custom element moved to new page.');
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
