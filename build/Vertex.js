  
  
  
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
  
  var geometry, material, material_args, texture;
  geometry = new THREE.BoxGeometry(
    options.width,
    options.height,
    options.depth
  );
  geometry.dynamic = true;
  
  if(options.texture !== undefined){
    texture = new THREE.TextureLoader().load( options.texture );

    material_args = { 
      map: texture
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

  cube.destroy = function(){
    geometry.dispose();
    material.dispose();
    if(texture){
      texture.dispose();
    }
  }
  
  return cube;
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

  this.edges = new Set();
  
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

  
  var cube;
  if(this.options.cube){
    if(this.options.cube.size){
      this.options.cube.width = this.options.cube.size;
      this.options.cube.height = this.options.cube.size;
      this.options.cube.depth = this.options.cube.size;
    }

    cube = new Cube(this.options.cube);
    cube.geometry.computeFaceNormals();
    this.object.add(cube);
    cube.position.set(0, 0, 0);
    cube.vertex = this;

    this.cube = cube;
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



