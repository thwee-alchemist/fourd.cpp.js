#include "Vertex.h"
#include "Edge.h"

using namespace std;


Edge::Edge(int edge_id, Vertex* _source_vertex, Vertex* _target_vertex, bool _directed=false, float _strength=1.0f){
  directed = _directed;
  strength = _strength;
  id = edge_id;
  source = _source_vertex;
  target = _target_vertex;
  T = EdgeType;
  coarser = NULL;
  order = random();
};

string Edge::toString(){
  stringstream ss;
  ss << "Edge " << id;
  return ss.str();
}

bool Edge::operator==(const Edge& other){
  return id == other.id;
}

Edge::~Edge(){
  source->edges->erase(this);
  target->edges->erase(this);

  source = NULL;
  target = NULL;
}
