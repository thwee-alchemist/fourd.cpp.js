#ifndef _DMVERTEX
#define _DMVERTEX

#include "DMVertex.h"
using namespace std;

/*
  Constructors
*/
DMVertex::DMVertex(Vertex* _finer) : Vertex(new_vertex_id++){
  T = DMVertexType;
  finer = std::set<Vertex*>();
  finer.insert(_finer);
  _finer->coarser = this;
}

/*
  A constructor taking two vertex arguments. 
*/
DMVertex::DMVertex(Vertex* slot1, Vertex* slot2) : Vertex(new_vertex_id++){
  T = DMVertexType;

  if(slot1->T == DMVertexType){
    position = slot1->position;
    this->id = slot1->id;
    return;
  }
  
  finer = std::set<Vertex*>();
  finer.insert(slot1);
  slot1->coarser = this;
  if(slot2 != NULL){
    finer.insert(slot2);
    slot2->coarser = this;
  }
}

/*
  Returns a new DMVertex, combining its vertices with those of another one. 
*/
DMVertex* DMVertex::combine(DMVertex* dmvertex){
  return new DMVertex(this, dmvertex);
}

/*
  Returns true, if the vertex is a child of this DMVertex
*/
bool DMVertex::has(Vertex* vertex){
  auto search = finer.find(vertex);
  if (search != finer.end()) {
    return true;
  }
  
  return false;
}

int DMVertex::new_vertex_id = 0;

#endif