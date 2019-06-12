
var template = `

<div class="display"></div>`;

class Dynamic3DGraph extends HTMLElement {
  constructor(){
    super();
    const shadowRoot = this.attachShadow({mode: 'open'});
    shadowRoot.innerHTML = template;

    this._vertex_options = {cube: {size: 10, color: 0x000000}};
    this._edge_options = {color: 0x000000};

    const makeStyle = (res) => {
      return new Promise((resolve, reject) => {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        res.text().then(t => {
          link.innerHTML = t;
          resolve(true);
        });
        document.head.appendChild(link);
        return true;
      })
    }

    const makeScript = (res) => {
      return new Promise((resolve, reject) => {
        var script = document.createElement('script');
        script.type = 'text/javascript';
        res.text().then(t => {
          script.innerHTML = t;
          resolve(true)
        });
        document.head.appendChild(script);
      });
    }


    var that = this;


    fetch('/build/fourd.css').then(makeStyle);

    Module.onRuntimeInitialized = _ => {
      const fourd = this._fourd = new FourD(
        shadowRoot.querySelector('.display'), 
        {
          border: '1px solid black',
          width: this.width,
          height: this.height,
          background: this.background
        }, 
        Module.default_settings,
        Module.LayoutGraph
      );
      this._graph = fourd.graph;
    
      fourd.graph.settings.repulsion = 1e3;
      fourd.graph.settings.attraction = 1e-3;
      fourd.graph.settings.epsilon = 1e-4;
      fourd.graph.settings.friction = 6e-1;
      fourd.graph.settings.inner_distance = 9e6;
      this._settings = this.graph.settings;
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

  add_json(json){
    // https://stackoverflow.com/questions/15690706/recursively-looping-through-an-object-to-build-a-property-list
    const isObject = val =>
      typeof val === 'object' && !Array.isArray(val);

    const map = new Map();

    const walk = (parent, obj) => {
      setTimeout(() => {
          
        map.set(obj, this.add_vertex(this.vertex_options));
        if(parent){
          this.add_edge(map.get(parent), map.get(obj), this.edge_options);
        }

        var symbols = Object.getOwnPropertySymbols(obj);
        for(var symbol of symbols){
          if(obj[symbol] instanceof Object){
            walk(obj, obj[symbol]);
          }
        }
      }, 100)
    }

    walk(null, json)
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
