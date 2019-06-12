#ifndef VERTEX
#define VERTEX

#include "gmtl/Vec3f.h"
#include "gmtl/VecOps.h"
#include "gmtl/gmtl.h"
#include <vector>
#include <map>
#include <set>
#include <sstream>

#include "Edge.h"
#include "FourDType.cpp"
#include "Settings.h"

using namespace std;
using namespace gmtl;

class Edge;
float _length(gmtl::Vec3f);

class Randomator {
  public:
  Randomator();
  float get();
};

class Vertex {
  public:
  Vec3f position;
  Vec3f velocity;
  Vec3f acceleration;
  Vertex* coarser;
  std::set<Edge*>* edges;
  int id;
  FourDType T;
  Vec3f attraction_forces;
  Vec3f repulsion_forces;
  static Randomator* ra;

  Vertex(int);
  static Vec3f pairwise_repulsion(const Vec3f&, const Vec3f&, Settings*);
  float get_x();
  float get_y();
  float get_z();
  bool operator==(const Vertex&);
  string toString();
};


#endif
