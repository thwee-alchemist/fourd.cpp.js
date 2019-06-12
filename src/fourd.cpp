#ifndef FOURD
#define FOURD

#ifdef __EMSCRIPTEN__
#include <emscripten/bind.h>

#include "Settings.h"
#include "FourDType.cpp"
#include "Vertex.h"
#include "Edge.h"
#include "BarnesHutNode3.h"
#include "DMVertex.h"
#include "DMEdge.h"
#include "LayoutGraph.h"

using namespace std;
using namespace gmtl;
using namespace emscripten;


EMSCRIPTEN_BINDINGS(fourd){
  emscripten::class_<Settings>("Settings")
    .constructor<float, float, float, float, float, float, float>()
    .property("repulsion", &Settings::get_repulsion, &Settings::set_repulsion)
    .property("epsilon", &Settings::get_epsilon, &Settings::set_epsilon)
    .property("inner_distance", &Settings::get_inner_distance, &Settings::set_inner_distance)
    .property("attraction", &Settings::get_attraction, &Settings::set_attraction)
    .property("friction", &Settings::get_friction, &Settings::set_friction)
    .property("gravity", &Settings::get_gravity, &Settings::set_gravity)
    .property("time_dilation", &Settings::get_time_dilation, &Settings::set_time_dilation);
  emscripten::function("default_settings", &default_settings, allow_raw_pointers());
  emscripten::class_<Vertex>("Vertex")
    .constructor<int>()
    .function("get_x", &Vertex::get_x)
    .function("get_y", &Vertex::get_y)
    .function("get_z", &Vertex::get_z);
  emscripten::class_<LayoutGraph>("LayoutGraph")
    .constructor<Settings*>()
    .function("add_vertex", &LayoutGraph::add_vertex)
    .function("add_edge", &LayoutGraph::add_edge)
    .function("remove_vertex", &LayoutGraph::remove_vertex)
    .function("remove_edge", &LayoutGraph::remove_edge)
    .function("layout", &LayoutGraph::layout)
    .function("get_v", &LayoutGraph::get_v, allow_raw_pointers())
    .function("get_e", &LayoutGraph::get_e, allow_raw_pointers())
    .function("center_x", &LayoutGraph::center_x)
    .function("center_y", &LayoutGraph::center_y)
    .function("center_z", &LayoutGraph::center_z);
}
#endif

#endif
