#include "DMEdge.h"
using namespace std;

DMEdge::DMEdge(Edge* edge) : Edge(*edge){
  T = DMEdgeType;
  edge->coarser = this;
  finer = edge;
  count = 0;
}

bool DMEdge::shares_vertex(DMEdge* e2){
  DMEdge* e1 = this;
  return e1->source->id == e2->source->id
    || e1->source->id == e2->target->id
    || e1->target->id == e2->source->id
    || e2->target->id == e2->target->id;
}

DMEdge::DMEdge(DMVertex* _source_vertex, DMVertex* _target_vertex, bool _directed, float _strength) : Edge(DMEdge::new_edge_id++, (Vertex*) _source_vertex, (Vertex*) _target_vertex, _directed, _strength){
  T = DMEdgeType;
  count = 0;
  finer = NULL;
}

int DMEdge::new_edge_id = 0;

bool EdgeComparison::operator()(const Edge* lhs, const Edge* rhs) const{
  return lhs->order < rhs->order;
};