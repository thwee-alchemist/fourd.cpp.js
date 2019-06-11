#include "Vertex.h"
#include "Edge.h"

using namespace std;


Edge::Edge(int edge_id, Vertex* _source, Vertex* _target, bool _directed=false, float _strength=1.0f){
  directed = _directed;
  strength = _strength;
  id = edge_id;
  source = _source;
  target = _target;
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
}
