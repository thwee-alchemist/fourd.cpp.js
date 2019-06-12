
#include "LayoutGraph.h"
using namespace std;

Settings* default_settings(){
  float _repulsion = 1e3;
  float _epsilon = 1e-4;
  float _inner_distance = 9e6;
  float _attraction = 4e-2;
  float _friction = 8e-1;
  float _gravity = 1e1;
  float _time_dilation = 0.1;

  return new Settings(
    _repulsion, 
    _epsilon, 
    _inner_distance,
    _attraction,
    _friction,
    _gravity,
    _time_dilation
  );
}

LayoutGraph::LayoutGraph(){
  vertex_id = -1;
  edge_id = -1;
  settings = default_settings();
  T = LayoutGraphType;
  m = std::map<int, bool>();
}

LayoutGraph::LayoutGraph(Settings* _settings){
  vertex_id = -1;
  edge_id = -1;
  settings = _settings;
  T = LayoutGraphType;
  m = std::map<int, bool>();
};

int LayoutGraph::add_vertex(){
  Vertex* vertex = new Vertex(++vertex_id);
  V.push_back(vertex);

  return vertex_id;
}

int LayoutGraph::add_edge(int source, int target, bool directed, float strength){
  // cout << "LayoutGraph::add_edge" << endl;
  Vertex* src;
  Vertex* tgt;
  
  for(int i=0; i<V.size(); i++){
    if(V[i]->id == source){
      src = V[i];
    }
    if(V[i]->id == target){
      tgt = V[i];
    }
  }
  Edge* edge = new Edge(++edge_id, src, tgt, directed, strength);
  E.push_back(edge);

  src->edges->insert(edge);
  tgt->edges->insert(edge);

  return edge_id;
}

void LayoutGraph::remove_vertex(int vertex_id){
  auto index = V.begin();

  for(Vertex* vertex : V){
    if(vertex->id == vertex_id){
      V.erase(index);
    }

    index++;
  }
}

void LayoutGraph::remove_edge(int edge_id){
  auto index = E.begin();
  for(Edge* edge : E){
    if(edge->id == edge_id){
      E.erase(index);
    }

    index++;
  }
}

/*
  Output:
  - An array of Vec3fs. The caller of the function is responsible for 
    destroying the array.
*/
string LayoutGraph::layout(){
  // calculate repulsions
  BarnesHutNode3 tree(settings);

  for(Vertex* vertex : this->V){
    vertex->acceleration = gmtl::Vec3f(0.0f, 0.0f, 0.0f);
    vertex->repulsion_forces = gmtl::Vec3f(0.0f, 0.0f, 0.0f);
    vertex->attraction_forces = gmtl::Vec3f(0.0f, 0.0f, 0.0f);
    tree.insert(vertex);
  }

  center = tree.center();

  gmtl::Vec3f sp; // source position
  gmtl::Vec3f tp; // target position
  float distance;
  gmtl::Vec3f gravity;

  // calculate repulsion
  for(Vertex* vertex : this->V){
    tree.estimate(
      vertex,
      vertex->repulsion_forces,
      &Vertex::pairwise_repulsion, 
      settings);
  }

  // calculate attraction
  for(Edge* edge : this->E){
    gmtl::Vec3f attraction = (edge->source->position - edge->target->position) * (-1 * settings->attraction);
    
    if(edge->directed){
      float distance = _length(edge->source->position - edge->target->position);

      gmtl::Vec3f gravity(0, settings->gravity, 0);
      attraction += gravity * distance;
    }

    attraction = attraction * edge->strength;
    
    edge->source->attraction_forces -= attraction;
    edge->target->attraction_forces += attraction;
  }
  
  // update vertices
  gmtl::Vec3f friction;
  int i=0;
  
  stringstream ss;

  ss << "[";
  for(Vertex* vertex : V){
    
    friction = vertex->velocity * settings->friction;

    vertex->acceleration = (vertex->repulsion_forces - vertex->attraction_forces) - friction;
    vertex->velocity += vertex->acceleration;
    vertex->position += vertex->velocity;
    
    ss << "{\"id\":" << vertex->id 
    << ",\"x\":" << vertex->position[0] 
    << ",\"y:\":" << vertex->position[1] 
    << ",\"z:\":" << vertex->position[2]
    << "}";

    if(vertex != V.back()){
      ss << ",";
    }
  }

  ss << "]";

  return ss.str();
}


Vertex* LayoutGraph::get_v(int i) const {
  for(Vertex* v : V){
    if(v->id == i){
      return v;
    }
  }

  return NULL;
}

Edge* LayoutGraph::get_e(int i) const {
  for(Edge* e : E){
    if(e->id == i){
      // cout << "get_e: found " << e->id << endl;
      return e;
    }
  }

  // cout << "get_e: found nothing" << endl;

  return NULL;
}

long LayoutGraph::vertex_count() const{
  return (long)V.size();
}

float LayoutGraph::center_x(){
  return center[0];
}

float LayoutGraph::center_y(){
  return center[1];
}

float LayoutGraph::center_z(){
  return center[2];
}