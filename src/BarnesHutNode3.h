

#include "gmtl/Vec.h"
#include "gmtl/VecOps.h"
#include "gmtl/gmtl.h"
#include <vector>
#include <map>
#include "Vertex.h"
#include "Edge.h"
#include "DMVertex.h"
#include "DMEdge.h"
#include "Settings.h"

#ifndef BARNESHUTNODE3
#define BARNESHUTNODE3



using namespace std;
using namespace gmtl;

/*
  Barnes Hut Node 3

  This is a 3 dimensional Barnes Hut Tree. One node segments the space
  around it into inner and outer, one vector for everything closer than 
  settings->inner_distance, and up to 2^3 directions/octants in the outer 
  map.  
*/
class BarnesHutNode3 {
  public:
    vector<Vertex*> inners; // should probably be a pointer
    map<string, BarnesHutNode3*> outers;
    gmtl::Vec3f center_sum;
    int count;
    Settings* settings;

    BarnesHutNode3(Settings* _settings);
    ~BarnesHutNode3();
    gmtl::Vec3f center();
    void place_inner(Vertex* vertex);
    void place_outer(Vertex* vertex);
    void insert(Vertex* vertex);
    string get_octant(gmtl::Vec3f& position);
    void estimate(
        Vertex* vertex, 
        gmtl::Vec3f& force, 
        gmtl::Vec3f (*force_fn)(const gmtl::Vec3f& p1, const gmtl::Vec3f& p2, Settings* settings), 
        Settings* settings);
    string toString();
    unsigned int size();
};


#endif