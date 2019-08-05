#ifndef LAYOUTGRAPH
#define LAYOUTGRAPH

#include "gmtl/Vec.h"
#include "gmtl/VecOps.h"
#include "gmtl/gmtl.h"
#include <vector>
#include <map>
#include <queue>
#include <sstream>

#include "FourDType.cpp"
#include "Settings.h"
#include "Vertex.h"
#include "Edge.h"
#include "BarnesHutNode3.h"


Settings* default_settings();

/*
  The LayoutGraph has five main methods to worry about:

  * add_vertex
  * remove_vertex
  * add_edge
  * remove_edge
  * 
*/
class LayoutGraph {
  public:
    LayoutGraph();
    LayoutGraph(Settings* _settings);
    ~LayoutGraph();
    int add_vertex();
    int add_edge(int source, int target, bool directed=false, float strength=1.0);
    void remove_vertex(int);
    void remove_edge(int edge_id);
    string layout();
    Vertex* get_v(int i) const;
    Edge* get_e(int i) const;
    long vertex_count() const;

    int vertex_id;
    int edge_id;
    vector<Vertex*> V;
    vector<Edge*> E;
    Settings* settings;
    gmtl::Vec3f center;
    FourDType T;
    std::map<int, bool> m;

    float center_x();
    float center_y();
    float center_z();

    Vec3f* positions;

    void clear();
};

#endif