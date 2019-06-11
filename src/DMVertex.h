#ifndef DMVERTEX
#define DMVERTEX

#include <vector>
#include <set>

#include "Settings.h"
#include "FourDType.cpp"
#include "Vertex.h"

using namespace std;

/*
  A Dynamic Matching Vertex. 
*/
class DMVertex : public Vertex {
  public:
  
  /*
    A list of other vertices to collapse into this vertex. 
  */
  vector<Vertex*> others;

  /*
    Reference to the finer vertices.
  */
  std::set<Vertex*> finer;

  /*
    Static vertex id.
  */
  static int new_vertex_id;

  /*
    Type information, either Vertex or DMVertex
  */
  FourDType T;

  /*
    Constructors
  */
  DMVertex(Vertex* _finer);

  /*
    A constructor taking two vertex arguments. 
  */
  DMVertex(Vertex* slot1, Vertex* slot2);

  /*
    Returns a new DMVertex, combining its vertices with those of another one. 
  */
  DMVertex* combine(DMVertex* dmvertex);

  /*
    Returns true, if the vertex is a child of this DMVertex
  */
  bool has(Vertex* vertex);
};

#endif