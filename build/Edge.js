
var arrow = function(source, target, options){
  let direction = source.clone().sub(target);
  let length = direction.length() * 0.80;
  var arrow = new THREE.ArrowHelper(direction.normalize().negate(), source.clone(), length, options.color);
      
  arrow.line.frustumCulled = false;
  arrow.line.geometry.verticesNeedUpdate = true;

  arrow.destroy = function(){
    arrow.line.geometry.dispose();
    arrow.line.material.dispose();
  }

  return arrow
}


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

  line.destroy = function(){
    geometry.dispose();
    material.dispose();
  }

  return line;
};

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
  graph.g.remove_edge(this.id);
  graph.scene.remove(this.object);
  // this.object.edge = undefined;

  // remove edge from listings
  /*
  var source_edge_list = graph.E_by_V.get(this.source.id);
  source_edge_list.splice(source_edge_list.indexOf(this.id), 1);

  var target_edge_list = graph.E_by_V.get(this.target.id);
  target_edge_list.splice(target_edge_list.indexOf(this.id), 1);
  */

  this.source.edges.delete(this.id);
  this.target.edges.delete(this.id);
  
  graph.E.delete(this.id);
  this.object.destroy();
  delete this.object;
};

