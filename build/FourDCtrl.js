class CameraVertex extends Vertex {
  constructor(id, camera){
    let options = {cube: null, label: null}
    super(id, options)
    this.camera = camera;
  }
}



CAMERA_VERTEX = null;
CAMERA_EDGE = null;
CAMERA_TARGET = null
CAMERA_LOCK = false

class FourDController {
  constructor(shadowRoot, options, default_settings, LayoutGraph, resolve_graph){

    this.resolve_graph = resolve_graph;
    this.shadowRoot = shadowRoot;
    console.info("FourDCtrl instantiated");
    this.default_settings = default_settings;
    this.LayoutGraph = LayoutGraph;

    // do i need so many places setting options?
    this.settings = Object.assign({}, {
      border: 'none',
      width: 500,
      height: 250,
      background: 0x004477,
    }, options);

    // var v = this.graph.add_vertex({cube: {}});
    /*
    this.graph.remove_vertex(v);
    this.clear();
    */
  }

  connect(){

    console.info('FourDCtrl.connect')
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
  
    var camera;

    this.scene = new THREE.Scene();
  
    var selector = '#display';
    var element;
    if(typeof selector === "string"){
      element = this.shadowRoot.querySelector(selector);
    }else{
      element = selector;
    }
    if(!element){
      throw "element " + selector + " wasn't found on the page.";
    }
    this.element = element;
  
    $(element).css(this.settings);
    $(element).width(this.settings.width);
    $(element).height(this.settings.height);
  
    camera = new THREE.PerspectiveCamera(
      75,
      this.settings.width / this.settings.height,
      0.1,
      CONSTANTS.far
    );
    this.camera = camera;
  
    this.light = new THREE.PointLight( 0xf0f0f0 ); // soft white light

    this.scene.add( this.camera );
    this.scene.add( this.light );
  
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    this.renderer.setClearColor(this.settings.background);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize( this.settings.width, this.settings.height );
  
    this.shadowRoot.querySelector(selector).appendChild(this.renderer.domElement);
    $(this.renderer.domElement).css({
      margin: 0,
      padding: 0,
      border: this.settings.border
    })
  
    this.graph = new Graph(this.scene, this.default_settings, this.LayoutGraph, this.resolve_graph);
    this.graph.connect();

    camera.position.z = -250;
    camera.lookAt(new THREE.Vector3(0, 0, 0));
  
    // THREEx.WindowResize(renderer, camera);

    this.clock = new THREE.Clock();
    this.controls = new THREE.OrbitControls( camera, this.renderer.domElement );

    this.controls.update(this.clock.getDelta()); 
    this.controls.movementSpeed = 250;
    this.controls.domElement = this.renderer.domElement;
    this.controls.rollSpeed = Math.PI / 12;
    this.controls.autoForward = false;
    this.controls.dragToLook = true;
  
    this.intersect_callback = function(object){
      // console.log(object.vertex);
    };
  
    var scene = this.scene;
    var renderer = this.renderer;
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
    this.variables = CONSTANTS;

    var graph = this.graph;
    var clock = this.clock;
    var controls = this.controls;

    var that = this;
    var render = function(){
      that.requestId = requestAnimationFrame(render);
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

    render();
  }

  disconnect(){
    console.info('FourDCtrl disconnect')
    cancelAnimationFrame(this.requestId);

    this.graph.disconnect();
    console.info('FourDCtrl disconnected')
  }

  camera_vertex(){
    this.deselect();

    options = Object.assign({
      lock: true
    }, options)

    if(vertex_id !== null){
      CAMERA_VERTEX = this.graph.add_camera_vertex();

      return CAMERA_VERTEX.id;
    }
  }

  deselect(){
    if(CAMERA_TARGET){
      CAMERA_TARGET = null;
    }else{

    }
  }
  
  look_at(id){
    CAMERA_TARGET = this.graph.E.get(id);
  }

  resolve_click(event){
    if(event.target === this.renderer.domElement){
      var raycaster = new THREE.Raycaster();
      mouse = new THREE.Vector2();
      mouse.x = ( event.clientX / this.renderer.domElement.width ) * 2 - 1;
      mouse.y = - ( event.clientY / this.renderer.domElement.height ) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      intersects = raycaster.intersectObjects(this.scene.children, true);

      if(intersects.length > 0){
        return intersects[0].object.vertex;
      }else{
        return null;
      }
    }
  }
};

