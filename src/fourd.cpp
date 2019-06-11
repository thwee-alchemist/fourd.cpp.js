#ifndef FOURD
#define FOURD

#ifdef __EMSCRIPTEN__
#include <emscripten/bind.h>

#include "Settings.h"
#include "FourDType.h"
#include "Vertex.h"
#include "Edge.h"
#include "BarnesHutNode3.h"
#include "DMVertex.h"
#include "DMEdge.h"
#include "DynamicMatching.h"

using namespace std;
using namespace gmtl;
using namespace emscripten;


Settings* default_settings(){
  float _repulsion = 1e3;
  float _epsilon = 1e-4;
  float _inner_distance = 9e6;
  float _attraction = 4e-2;
  float _friction = 8e-1;
  float _gravity = 1e1;

  return new Settings(
    _repulsion, 
    _epsilon, 
    _inner_distance,
    _attraction,
    _friction,
    _gravity
  );
}

EMSCRIPTEN_BINDINGS(fourd){
  emscripten::class_<Settings>("Settings")
    .constructor<float, float, float, float, float, float>()
    .property("repulsion", &Settings::get_repulsion, &Settings::set_repulsion)
    .property("epsilon", &Settings::get_epsilon, &Settings::set_epsilon)
    .property("inner_distance", &Settings::get_inner_distance, &Settings::set_inner_distance)
    .property("attraction", &Settings::get_attraction, &Settings::set_attraction)
    .property("friction", &Settings::get_friction, &Settings::set_friction)
    .property("gravity", &Settings::get_gravity, &Settings::set_gravity);
  emscripten::function("default_settings", &default_settings, allow_raw_pointers());
  emscripten::class_<Vertex>("Vertex")
    .constructor<int>()
    .property("x", &Vertex::get_x)
    .property("y", &Vertex::get_y)
    .property("z", &Vertex::get_z);
  emscripten::class_<LayoutGraph>("LayoutGraph")
    .constructor<Settings*>()
    .function("add_vertex", &LayoutGraph::add_vertex)
    .function("add_edge", &LayoutGraph::add_edge)
    .function("remove_vertex", &LayoutGraph::remove_vertex)
    .function("remove_edge", &LayoutGraph::remove_edge)
    .function("layout", &LayoutGraph::layout)
    .property("vertex_count", &LayoutGraph::vertex_count)
    .function("get_v", &LayoutGraph::get_v, allow_raw_pointers())
    .function("get_e", &LayoutGraph::get_e, allow_raw_pointers())
    .function("center_x", &LayoutGraph::center_x)
    .function("center_y", &LayoutGraph::center_y)
    .function("center_z", &LayoutGraph::center_z);
}
#endif

#endif