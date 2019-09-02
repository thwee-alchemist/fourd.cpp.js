
  // Graph
  var Graph = function(scene, default_settings, LayoutGraph, resolve){
    console.info('Graph instantiated');
    this.resolve = resolve;
    this.LayoutGraph = LayoutGraph;
    this.scene = scene;
    this.type = 'Graph';
    this.vertex_id_spawn = 0;
    this.V = new Map();

    this.edge_id_spawn = 0;
    this.E = new Map();

    this.E_by_V = new Map();

    this.settings = default_settings();
    this.g = new LayoutGraph(this.settings);
  };

  Graph.prototype.connect = function(){
    console.info("Graph.connect")
    var LayoutGraph = this.LayoutGraph;
    this.g = new LayoutGraph(this.settings);
    this.resolve(this.g);
  }

  Graph.prototype.disconnect = function(){
    console.info('Graph disconnect')
    this.clear();
    this.g.delete();
    this.settings.delete();
  }

  Graph.prototype.random_edge = function(){
    var src = this.V.get(Math.floor(Math.random() * this.V.length));
    var tgt = this.V.get(Math.floor(Math.random() * this.V.length));
    console.assert(src, "src must not be undefined");
    console.assert(tgt, "tgt must not be undefined");
    console.assert(src !== tgt, "src and tgt should not be equal");

    return this.add_edge(src, tgt, {opacity: 1.0});
  };

  Graph.prototype.clear = function(){

    this.g.clear();

    [...this.E.values()].forEach(e => {
      this.remove_edge(e.id);
    });

    [...this.V.values()].forEach(v => {
      this.remove_vertex(v.id);
    })

    this.V = new Map(); // vertex.id -> edge
    this.E = new Map(); // edge.id -> edge
    // this.E_by_V = new Map(); // vertex_id -> [edges]
    this.edge_counts = {};
    this.edge_id_spawn = 0;
    this.vertex_id_spawn = 0;
  };

  Graph.prototype._make_key = function(source, target){
    return '_' + source.toString() + '_' + target.toString();
  };

  Graph.prototype.add_vertex = function(options){
    options = Object.assign({
      cube: {},
      label: {}
    }, options);

    var v = new Vertex(this.g.add_vertex(), options);
    v.paint(this.scene, options);
    this.V.set(v.id, v);
    v.object.vertex = v;
    
    return v.id;
  };

  Graph.prototype.add_camera_vertex = function(id, options){
    CAMERA_TARGET = this.V.get(id);
    CAMERA_LOCK = options.lock;

    console.assert(camera);
    console.assert(CAMERA_TARGET);

    if(CAMERA_VERTEX !== null){
      this.remove_edge(CAMERA_EDGE.id);
      this.remove_vertex(CAMERA_VERTEX.id);
    }
    CAMERA_VERTEX = new CameraVertex(this.g.add_vertex(), camera);
    CAMERA_VERTEX.paint(this.scene, CAMERA_VERTEX.options)
    
    CAMERA_VERTEX.camera.lookAt(CAMERA_TARGET.position.clone().normalize());
    controls.update(clock.getDelta());
    
    this.V.set(CAMERA_VERTEX.id, CAMERA_VERTEX);
    return CAMERA_VERTEX;
  };

  Graph.prototype.add_edge = function(source_id, target_id, options){
    console.assert(source_id !== undefined, "target must not be undefined");
    console.assert(target_id !== undefined, "target must not be undefined");

    options = Object.assign({
      directed: false,
      strength: 1.0,
      color: 0x000000,
      opacity: 1.0,
      transparent: false,
      arrow: false
    }, options);

    var source = this.V.get(source_id);
    var target = this.V.get(target_id);

    var edge = new Edge(this.g.add_edge(source_id, target_id, options.directed, options.strength), source, target, options);
    this.E.set(edge.id, edge);

    edge.paint(this.scene, options);

    source.edges.add(edge.id);
    target.edges.add(edge.id);

    return edge.id;
  };

Graph.prototype.add_invisible_edge = function(source_id, target_id, options){
  return this.add_edge(source_id, target_id, Object.assign(options, {opacity: 0.0}));
}

Graph.prototype.remove_edge = function(edge_id){
  // lookup edge
  var edge = this.E.get(edge_id);

  // destroy edge
  if(edge){
    edge.destroy(this);
  }

  this.g.remove_edge(edge_id);
  // remove from fourd.cpp
};

Graph.prototype.toString = function(){
  var edges = this.size;
  var nodes = this.V.size;

  return '|V|: ' + nodes.toString() + ', |E|: ' + edges.toString();
};

Graph.prototype.remove_vertex = function(vertex_id){
  console.assert(vertex_id !== undefined);

  // lookup vertex
  if(this.V.has(vertex_id)){
    var vertex = this.V.get(vertex_id);
    console.assert(vertex !== undefined);
    
    // remove label, if applicable
    if(vertex.hasOwnProperty('label')){
      vertex.label.remove();
    }

    vertex.edges.forEach(edge => {
      console.log(edge);
      this.remove_edge(edge)
    });

    // remove
    // this.E_by_V.delete(vertex_id, []);
    this.scene.remove(vertex.object);
    this.V.delete(vertex.id);
  }
};

Graph.prototype.layout = function(){
  var pos_str = this.g.layout();
  var positions = JSON.parse(pos_str);

  for(var v of this.V.values()){
    v.object.position.x = positions[v.id].x;
    v.object.position.y = positions[v.id].y;
    v.object.position.z = positions[v.id].z;
    v.position = v.object.position.clone();
  }

  for(var e of this.E.values()){
    var edge = e;
    var source = edge.source.object.position;
    var target = edge.target.object.position;

    if(edge.object_type == 'line'){
      edge.object.geometry.vertices[0].x = source.x;
      edge.object.geometry.vertices[0].y = source.y;
      edge.object.geometry.vertices[0].z = source.z;

      edge.object.geometry.vertices[1].x = target.x;
      edge.object.geometry.vertices[1].y = target.y;
      edge.object.geometry.vertices[1].z = target.z;

      edge.object.geometry.verticesNeedUpdate = true;
      //edge.object.geometry.computeBoundingSphere();
    }else if(edge.object_type == 'arrow'){
      this.scene.remove(edge.object);
      delete edge.object;
      edge.object = new arrow(source, target, edge.options);
      this.scene.add(edge.object);
    }
  }
};