FourD = function(shadowRoot, options, default_settings, LayoutGraph){
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
    
    if(!this.options.hasOwnProperty('label')){
      this.options.label = {
        text: '',
        direction: 'x',
        distance: '10'
      };
    };
  };

  var Label = function(options){
    options = Object.assign({offset: 25}, options);
    
    // thanks, https://codepen.io/dxinteractive/pen/reNpOR
    var _createTextLabel = function() {
      var div = shadowRoot.createElement('div');
      element.appendChild(div);
      div.className = 'text-label';
      div.style.position = 'absolute';
      div.style.width = 100;
      div.style.height = 100;
      div.innerHTML = options.text;
      div.style.top = -1000;
      div.style.left = -1000;
      
      /*
        div.on click:
          place text of div into value of textbox
          turn div into textbox
          on blur:
            turn textbox into div
            place value of textbox into text of div and name of selected entity
        turn div into link.
      */

      // div on click
      /*
      $(div).on('dblclick', () => {
        var name = $('div').html();
        var input = $(`<textarea id="edit-input" value="${name}" draggable="draggable" resizeable="resizeable" />`).appendTo('html > body').get(0);
        input
        input.style.position = 'absolute';
        input.style.left = div.style.left;
        input.style.top = div.style.top;
        
        $(input).on('blur', function(){
          var value = JSON.parse($(input).val());
          $(options.vertex.label.element).clear();

          if(value){

          }
        })

        console.log('input', input)
      });
      */

      var _this = this;
 
      var label = {
        element: div,
        parent: options.object,
        position: new THREE.Vector3(),
        updatePosition: function(camera) {
          if(parent) {
            this.position.copy(this.parent.position);
          }
          
          var coords2d = this.get2DCoords(this.position, camera);
          this.element.style.left = coords2d.x + 'px';
          this.element.style.top = coords2d.y + 'px';
        },
        get2DCoords: function(position, camera) {
          var vector = position.project(camera);
          vector.x = (vector.x + 1)/2 * window.innerWidth;
          vector.y = -(vector.y - 1)/2 * window.innerHeight + options.offset;
          return vector;
        },
        remove: () => {
          element.removeChild(div);
        }
      };

      options.vertex.label = label;
      return label;
    };

    var label = _createTextLabel();
    if(Label.all){
      Label.all.push(label);
    }else{
      Label.all = [label];
    }
    return label;

		//var sprite = makeTextSprite(options.text, options);
    // return sprite;
  };

  Label.all = [];
  
  Vertex.prototype.paint = function(scene){
    var object = this.object = new THREE.Group();
    this.object.position.set(
      Math.random()*10,
      Math.random()*10,
      Math.random()*10
    );
    
    if(!this.options){
      this.options = {
        cube: {
          size: 10, 
          color: 0xffffff,
          wireframe: false
        }
      };
    }

    if(this.options.cube.size){
      this.options.cube.width = this.options.cube.size;
      this.options.cube.height = this.options.cube.size;
      this.options.cube.depth = this.options.cube.size;
    }

    if(this.options.cube){
      var cube = new Cube(this.options.cube);
			cube.geometry.computeFaceNormals();
      this.object.add(cube);
      cube.position.set(0, 0, 0);
			cube.vertex = this;
    }
    if(this.options.label && this.options.label.text){
      this.options.label.object = this.object;
      this.options.label.vertex = this;
      var label = new Label(this.options.label);
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
  
  var CameraVertex = function(id, camera){
      Vertex.call(this, id);
      this.object = camera;
      this.id = id;
  };
  CameraVertex.prototype = Object.create(Vertex.prototype);
  CameraVertex.prototype.constructor = CameraVertex;
	
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
    options = options || {
      color: 0xffffff
    };
    this.object = line(scene, this.source.object.position, this.target.object.position, options);
    this.object.edge = this;
  };

  Edge.prototype.toString = function(){
    return this.source.toString() + '-->' + this.target.toString(); 
  };

  Edge.prototype.destroy = function(scene){
    console.assert(scene);
    scene.remove(this.object);
    this.object.edge = undefined;
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

    return this.add_edge(src, tgt, false, 1.0);
  };


  // api
  Graph.prototype.clear = function(){

    for(var e in this.E.values()){
      e.destroy(this.scene);
    }

    for(var v in this.V.values()){
      // this.scene.remove...
      scene.remove(v.object);
      // this.V[v].destroy();
    }
    
    this.V = new Map();
    this.E = new Map();
    this.E_by_V = new Map();
    this.edge_counts = {};
    this.edge_id_spawn = 0;
    this.vertex_id_spawn = 0;
  };

  Graph.prototype._make_key = function(source, target){
    return '_' + source.toString() + '_' + target.toString();
  };

  // api
  Graph.prototype.add_vertex = function(options){
    options = options || {};
    
    var v = new Vertex(this.g.add_vertex(), options);
    v.paint(this.scene);
    this.V.set(v.id, v);
    v.object.vertex = v;
    
    return v.id;
  };

  Graph.prototype.add_camera_vertex = function(camera){
    var v = new CameraVertex(this.vertex_id_spawn++, camera);
    v.position = v.object.position;
    this.V.set(v.id, v);
    return v;
  };

  // api
  Graph.prototype.add_edge = function(source_id, target_id, options){
    console.assert(source_id !== undefined, "target must not be undefined");
    console.assert(target_id !== undefined, "target must not be undefined");

    options = Object.assign({
      directed: false,
      strength: 1.0
    }, options);

    var source = this.V.get(source_id);
    var target = this.V.get(target_id);
    var edge = new Edge(this.g.add_edge(source_id, target_id, options.directed, options.strength), source, target, options);
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
    
    edge.paint(this.scene);
    return edge.id;
  };
	
	Graph.prototype.add_invisible_edge = function(source, targe, optionst){
		return this.add_edge(source, target, Object.assign(options, {opacity: 0.0}));
	}

  Graph.prototype.remove_edge = function(edge_id){

    // remove from fourd.cpp
    this.g.remove_edge(edge_id);

    // lookup edge
    var edge = this.E.get(edge_id);
    
    // remove edge from listings
    var edges = this.E_by_V.get(edge.source.id);
    if(edges){
      this.E_by_V.set(edge.source.id, edges.splice(edges.indexOf(edge.id), 1));
    }
    edges = this.E_by_V.get(edge.target.id);
    if(edges){
      this.E_by_V.set(edge.target.id, edges.splice(edges.indexOf(edge.id), 1));
    }

    // destroy edge
    edge.destroy(this.scene);
    this.E.delete(edge_id);
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
      var edges = this.E_by_V.get(vertex_id);
      for(var i=edges.length-1; i>=0; i--){
        this.remove_edge(edges[i]);
      }

      // remove
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
    if(options.color === undefined){
      options.color = 0xffffff;
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

  // apiish this will change
  // todo: make line options like cube options
  var line = function(scene, source, target, options){
    // var geometry = new THREE.BufferGeometry();
    // geometry.setDrawRange(0, 2);
    var geometry = new THREE.Geometry();
    geometry.vertices.push(source);
    geometry.vertices.push(target);

    // geometry.addAttribute('position', new THREE.BufferAttribute(positions, 6));
    
		options = options || {};
		options.color = options.color !== undefined ? options.color : 0xffffff;
		// options.transparent = options.transparent ? options.transparent : false;
		// options.opacity = options.opacity ? options.opacity : 1.0;
    options.linewidth = options.linewidth || 1; 
    var material = new THREE.LineBasicMaterial({color: options.color});

    var line = new THREE.Line( geometry, material );
    line.frustumCulled = false;
      
    scene.add(line);
    line.geometry.verticesNeedUpdate = true;
    return line;
  };
  
  var edges = false;
  Graph.prototype.layout = function(){
    var pos_str = this.g.layout();
    console.log(pos_str);
    var positions = JSON.parse(pos_str);

    for(var v of this.V.values()){
      v.object.position.x = positions[v.id].x;
      v.object.position.y = positions[v.id].y;
      v.object.position.z = positions[v.id].z;
    }

    for(var e of this.E.values()){
      var edge = e;
      var source = edge.source.object.position;
      var target = edge.target.object.position;

      edge.object.geometry.vertices[0].x = source.x;
      edge.object.geometry.vertices[0].y = source.y;
      edge.object.geometry.vertices[0].z = source.z;

      edge.object.geometry.vertices[1].x = target.x;
      edge.object.geometry.vertices[1].y = target.y;
      edge.object.geometry.vertices[1].z = target.z;

      edge.object.geometry.verticesNeedUpdate = true;
      //edge.object.geometry.computeBoundingSphere();
    }
  };

  FourD.prototype.select = function(vertex){
		if(!vertex) return;
		
		if(that.selected){
			that.graph.remove_edge(that.camera_edge.id);
			delete that.camera_edge;
			that.graph.remove_vertex(that.camera_vertex);
			delete that.camera_vertex;
		}
		
		var camera = that._internals.camera;
		that.camera_vertex = that.graph.add_camera_vertex(camera);
		that.camera_edge = that.graph.add_invisible_edge(vertex, that.camera_vertex);
		that.selected = vertex;
	};
	
	FourD.prototype.deselect = function(){
		that.selected = null;
		that.graph.remove_edge(that.camera_edge.id);
		delete that.camera_edge;
		that.graph.remove_vertex(that.camera_vertex);
		delete that.camera_vertex;
		
		that.selected = null;
	}
  
  FourD._internals = {};
      
  var render = function(){
    requestAnimationFrame(render);

    graph.layout();
    /*
    camera.position.x = graph.g.center_x();
    camera.position.y = graph.g.center_y();
    camera.position.z = graph.g.center_z() - 500;
    */
    controls.update(clock.getDelta());

    for(var i=0; i<Label.all.length; i++){
      Label.all[i].updatePosition(camera);
    }
    
    renderer.render(scene, camera);
  };

  var clear = function clear(){
    graph.clear();
  };
  
  var camera;
  // api
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
      console.log(object.vertex);
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
    FourD.graph = graph;
    FourD.render = render;
    FourD.clear = clear;
    FourD.variables = CONSTANTS;

    this.clear = clear;
    this.variables = CONSTANTS;

    render();
  };

  FourD.setCubeFn = function(fn){
    cube = fn;
  };

  FourD.setLineFn = function(fn){
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

