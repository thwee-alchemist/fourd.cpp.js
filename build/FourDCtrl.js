var FourDCtrl = function(shadowRoot, options, default_settings, LayoutGraph){
  var that = this;
  var CONSTANTS = {
    width: 1000,
    attraction: 0.05,
    far: 100000,
    optimal_distance: 10.0,
    minimum_velocity: 0.001,
    friction: 0.60,
    zoom: -25,
    gravity: 10, 
    BHN3: {
      inner_distance: 0.36,
      repulsion: 25.0,
      epsilon: 0.1
    }
  };

  /* 
    Vertex
    
    Creates a vertex which can be passed to Graph. 
    setting a label property in the options parameter can allow
    for a label to be drawn above or below a vertex. 
    
    Options:
    - invisible
    - see cube
    - see label
    
  */
  var Vertex = function(id, options){
    this.options = options || {};
    this.id = id;
    
    this.position = new THREE.Vector3(
      Math.random(),
      Math.random(),
      Math.random()
    );
    
    this.toString = function(){
      return this.id.toString();
    };
    
    if(!this.options.label){
      this.options.label = {
        text: '',
        direction: 'x',
        distance: '10',
        color: 'white'
      };
    };
  };

  class Label {
    constructor(parent, options){
      
      this.options = Object.assign({
        text: '',
        offset: 0,
        color: 0x000000
      }, options);

      this.display = shadowRoot.querySelector('#display');
      this.parent = parent;

      this.element = document.createElement('div');
      this.element.className = 'text-label';
      this.element.style.position = 'absolute';
      this.element.innerHTML = options.text;

      this.element.style.left = '0px'
      this.element.style.top = '0px'
      this.element.style.color = this.options.color;

      this.display.appendChild(this.element);

      this.options.vertex.label = this;

      if(Label.all){
        Label.all.push(this);
      }else{
        Label.all = [this];
      }

      this.updatePosition(camera);
    }

    between(min, val, max){
      if(val < min)
        return min;
      if(val > max)
        return max;
      return val;
    }

    get2DCoords(position, camera) {
      var vector = position.project(camera);
      vector.x = (vector.x + 1)/2 * this.display.clientWidth;
      vector.y = (-(vector.y - 1)/2 * this.display.clientHeight) + this.options.offset;

      vector.x = this.between(0, vector.x, this.display.clientWidth);
      vector.y = this.between(0, vector.y, this.display.clientHeight);

      return vector;
    }

    updatePosition(camera) {
      var coords2d = this.get2DCoords(this.parent.position.clone(), camera);

      this.element.style.left = coords2d.x + 'px';
      this.element.style.top = coords2d.y + 'px';
    }

    remove() {
      this.display.removeChild(this.element);
    }
  }

  Label.all = [];
  
  Vertex.prototype.paint = function(scene, options){
    var object = this.object = new THREE.Group();
    
    this.object.position.set(
      Math.random()*10,
      Math.random()*10,
      Math.random()*10
    );
    
    this.options = Object.assign({
      cube: {
        size: 10, 
        color: 0x000000,
        wireframe: false
      }
    }, options);

    

    if(this.options.cube){
      if(this.options.cube.size){
        this.options.cube.width = this.options.cube.size;
        this.options.cube.height = this.options.cube.size;
        this.options.cube.depth = this.options.cube.size;
      }

      var cube = new Cube(this.options.cube);
      cube.geometry.computeFaceNormals();
      this.object.add(cube);
      cube.position.set(0, 0, 0);
      cube.vertex = this;
    }
    if(this.options.label && this.options.label.text){
      this.options.label.object = this.object;
      this.options.label.vertex = this;
      var label = new Label(cube.vertex, this.options.label);
    }
    
    scene.add(object);
  };
  
  /* 
    Vertex.remove(...) 
    removes either a label: Vertex.remove('label'),
    or the vertex's cube: Vertex.remove('cube').
  */ 
  Vertex.prototype.remove = function(name){
    if(this.label){
      this.label.remove();
    }
    this.object.remove(name);
  }
  
  class CameraVertex extends Vertex {
    constructor(id, camera){
      let options = {cube: null, label: null}
      super(id, options)
      this.camera = camera;
    }
  }
	
  // Edge
  var Edge = function(id, source, target, options){
    this.options = Object.assign({}, {directed: false, strength: 1.0}, options);
    
    if(arguments.length < 3){
      throw new Error('Edge without sufficent arguments');
    }

    this.id = id;

    this.source = source;
    this.target = target;

    this.order = Math.random();
  };

  Edge.prototype.paint = function(scene, options){
    if(!options.arrow){
      this.object_type = 'line';
      this.object = line(scene, this.source.object.position, this.target.object.position, options);
    }else{
      this.object_type = 'arrow'
      this.object = arrow(this.source.object.position.clone(), this.target.object.position.clone(), options);
    }
    this.object.edge = this;
    scene.add(this.object)
  };

  Edge.prototype.toString = function(){
    return this.source.toString() + '-->' + this.target.toString(); 
  };

  Edge.prototype.destroy = function(graph){
    graph.scene.remove(this.object);
    // this.object.edge = undefined;

    // remove edge from listings
    try{
      let neighbors = graph.E_by_V.get(this.source.id)
      graph.E_by_V.get(this.source.id).splice(neighbors.findIndex(e => e.id == this.id), 1)
    }catch(e){

    }

    try{
      let neighbors = graph.E_by_V.get(this.target.id)
      graph.E_by_V.get(this.target.id).splice(neighbors.findIndex(e => e.id == this.id), 1)
    }catch(e){

    }

    graph.g.remove_edge(this.id);
    graph.E.delete(this.id);
    delete this.object;
  };

  // Graph
  var Graph = function(scene){
    this.scene = scene;
    this.type = 'Graph';
    this.vertex_id_spawn = 0;
    this.V = new Map();

    this.edge_id_spawn = 0;
    this.E = new Map();

    this.E_by_V = new Map();

    this.settings = default_settings();
    const graph = new LayoutGraph(this.settings);
    this.g = graph;
  };

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
    this.E_by_V = new Map(); // vertex_id -> [edges]
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

  CAMERA_VERTEX = null;
  CAMERA_EDGE = null;
  CAMERA_TARGET = null
  CAMERA_LOCK = false

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
    }, options);

    var source = this.V.get(source_id);
    var target = this.V.get(target_id);
    var edge = new Edge(this.g.add_edge(source_id, target_id, false, options.opacity), source, target, options);
    this.E.set(edge.id, edge);

    if(this.E_by_V.has(source_id)){
      this.E_by_V.get(source_id).push(edge.id);
    }else{
      this.E_by_V.set(source_id, [edge.id]);
    }

    if(this.E_by_V.has(target_id)){
      this.E_by_V.get(target_id).push(edge.id);
    }else{
      this.E_by_V.set(target_id, [edge.id]);
    }
    
    edge.paint(this.scene, options);
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

      // remove edges
      let edges = this.E_by_V.get(vertex_id);
      if(edges){
        edges.forEach(e => this.E.get(e).destroy(this))
      }

      // remove
      this.E_by_V.set(vertex_id, []);
      this.scene.remove(vertex.object);
      this.V.delete(vertex.id);
    }
  };

  var is_graph = function(potential){
    return potential.type === 'Graph';
  };

  // apiish
  var Cube = function(options){
    if(options === undefined){
      options = {};
    }
    
    if(options.width === undefined){
      options.width = 3;
    }
    if(options.height === undefined){
      options.height = 3;
    }
    if(options.depth === undefined){
      options.depth = 3;
    }
    
    if(options.wireframe === undefined){
      options.wireframe = false;
    }
    
    var geometry, material, material_args;
    geometry = new THREE.BoxGeometry(
      options.width,
      options.height,
      options.depth
    );
    geometry.dynamic = true;
    
    if(options.texture !== undefined){
      material_args = { 
        map: new THREE.TextureLoader().load( options.texture )
      };
    }else{
      material_args = { 
        color: options.color,
        wireframe: options.wireframe
      };
    }

    material = new THREE.MeshBasicMaterial( material_args );
    
    var cube = new THREE.Mesh( geometry, material );
    var scale = 2;
    cube.position.set(
      Math.random() * scale, 
      Math.random() * scale,
      Math.random() * scale
    );
    cube.matrixAutoUpdate = true;
    
    return cube;
  };

  // todo: make line options like cube options
  var line = function(scene, source, target, options){
    // var geometry = new THREE.BufferGeometry();
    // geometry.setDrawRange(0, 2);
    var geometry = new THREE.Geometry();
    geometry.vertices.push(source);
    geometry.vertices.push(target);

    // geometry.addAttribute('position', new THREE.BufferAttribute(positions, 6));
    
		// options.transparent = options.transparent ? options.transparent : false;
		// options.opacity = options.opacity ? options.opacity : 1.0;; 
    var material = new THREE.LineBasicMaterial({color: options.color, opacity: options.opacity, transparent: options.transparent});

    var line = new THREE.Line( geometry, material ); 
    line.frustumCulled = false; 
    line.geometry.verticesNeedUpdate = true;
    return line;
  };

  var arrow = function(source, target, options){
    let direction = source.clone().sub(target);
    let length = direction.length() * 0.80;
    var arrow = new THREE.ArrowHelper(direction.normalize().negate(), source.clone(), length, options.color);
        
    arrow.line.frustumCulled = false;
    arrow.line.geometry.verticesNeedUpdate = true;
    return arrow
  }
  
  var edges = false;
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



  FourDCtrl.prototype.camera_vertex = function(){
    this.deselect();

    options = Object.assign({
      lock: true
    }, options)

    if(vertex_id !== null){
      CAMERA_VERTEX = this.graph.add_camera_vertex();

      return CAMERA_VERTEX.id;
    }
	};
	
	FourDCtrl.prototype.deselect = function(){
    if(CAMERA_TARGET){
      CAMERA_TARGET = null;
    }else{

    }
  }
  
  FourDCtrl.prototype.look_at = function(id){
    CAMERA_TARGET = this.graph.E.get(id);
  }
  
  FourDCtrl._internals = {};
      
  var render = function(){
    requestAnimationFrame(render);

    graph.layout();

    /*
    camera.position.x = graph.g.center_x();
    camera.position.y = graph.g.center_y();
    camera.position.z = graph.g.center_z() - 500;
    */

    if(CAMERA_TARGET !== null && CAMERA_VERTEX !== null){
      // CAMERA_VERTEX.object.position.set(CAMERA_TARGET.position);
      // controls.update(clock.getDelta());
      if(CAMERA_LOCK){
        CAMERA_VERTEX.camera.lookAt(CAMERA_TARGET.position.clone().normalize());
      }
    }
    controls.update(clock.getDelta());


    Label.all.forEach(label => {
      label.updatePosition(camera);
    })
    
    renderer.render(scene, camera);
  };

  var clear = function clear(){
    graph.clear();
  };
  
  var camera;
  this.init = function(shadowRoot, options){
    var settings = Object.assign({}, {
      border: 'none',
      width: 500,
      height: 250,
      background: 0x004477,
    }, options);
    this.settings = settings;
    
    scene = new THREE.Scene();
    this.scene = scene;
    
    var selector = '#display';
    if(typeof selector === "string"){
      element = shadowRoot.querySelector(selector);
    }else{
      element = selector;
    }
    if(!element){
      throw "element " + selector + " wasn't found on the page.";
    }
    this.element = element;
    
    $(element).css(options);
    $(element).width(settings.width);
    $(element).height(settings.height);
    
    camera = new THREE.PerspectiveCamera(
      75,
      settings.width / settings.height,
      0.1,
      CONSTANTS.far
    );
    this.camera = camera;
    
    light = new THREE.PointLight( 0xf0f0f0 ); // soft white light
    this.light = light;

    CONSTANTS.scene = scene;
    scene.add( camera );
    scene.add( light );
    
    renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer = renderer;
    renderer.setClearColor(settings.background);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize( settings.width, settings.height );
    
    shadowRoot.querySelector(selector).appendChild(renderer.domElement);
    $(renderer.domElement).css({
      margin: 0,
      padding: 0,
      border: settings.border
    })
    
    graph = new Graph(scene);
    this.graph = graph;
    
    camera.position.z = -250;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    
    // THREEx.WindowResize(renderer, camera);

    clock = new THREE.Clock();
    this.clock = clock;
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    this.controls = controls;

    controls.update(clock.getDelta()); 
    controls.movementSpeed = 250;
    controls.domElement = renderer.domElement;
    controls.rollSpeed = Math.PI / 12;
    controls.autoForward = false;
    controls.dragToLook = true;
    
    this.intersect_callback = function(object){
      // console.log(object.vertex);
    };

    this.resolve_click = function(event){
      if(event.target === renderer.domElement){
        var raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(scene.children, true);

        if(intersects.length > 0){
          return intersects[0].object.vertex;
        }else{
          return null;
        }
      }
    };
    
    var onMouseDown = function(event){
      if(event.target === renderer.domElement){
        var raycaster = new THREE.Raycaster();
        mouse = new THREE.Vector2();
        mouse.x = ( event.clientX / renderer.domElement.width ) * 2 - 1;
        mouse.y = - ( event.clientY / renderer.domElement.height ) * 2 + 1;
        raycaster.setFromCamera(mouse, camera);
        intersects = raycaster.intersectObjects(scene.children, true);

        if(typeof that.on_mouse_down == 'function'){
          if(intersects.length > 0){
            that.on_mouse_down(intersects[0].object.vertex);
          }else{
            that.on_mouse_down(null);
          }
        }
        
        if(intersects.length > 0){
          that.selected = intersects[0].vertex;
        }
        
        if(intersects.length > 0 && typeof that.intersect_callback == 'function'){
          that.intersect_callback(intersects[0].object, event);
        }
      }
    }
    // $(element).on('mousedown', onMouseDown);


    // api
    FourDCtrl.graph = graph;
    FourDCtrl.render = render;
    FourDCtrl.clear = clear;
    FourDCtrl.variables = CONSTANTS;

    this.clear = clear;
    this.variables = CONSTANTS;

    

    render();
  };

  FourDCtrl.setCubeFn = function(fn){
    cube = fn;
  };

  FourDCtrl.setLineFn = function(fn){
    line = fn;
  };

  this.init(shadowRoot, options);

  // var v = this.graph.add_vertex({cube: {}});
  /*
  this.graph.remove_vertex(v);
  this.clear();
  */
  return this;
};
