
#include "gmtl/Vec.h"
#include "gmtl/VecOps.h"
#include "gmtl/gmtl.h"
#include <vector>
#include <map>
#include <set>
#include <sstream>
#include <chrono>
#include <ctime>
#include "Vertex.h"
#include "Edge.h"
#include "Settings.h"

using namespace std;

float _length(gmtl::Vec3f v){
  return sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
}

Randomator::Randomator(){
  srand(time(NULL));
}

float Randomator::get(){
  return static_cast <float> (rand()) / static_cast <float> (RAND_MAX);
}

Vertex::Vertex(int vertex_id){

  position = gmtl::Vec3f(ra->get(), ra->get(), ra->get());
  
  id = vertex_id;
  T = VertexType;
  attraction_forces = gmtl::Vec3f(0.0f, 0.0f, 0.0f);
  repulsion_forces = gmtl::Vec3f(0.0f, 0.0f, 0.0f);
  velocity = Vec3f(0.0f, 0.0f, 0.0f);
  acceleration = Vec3f(0.0f, 0.0f, 0.0f);
  coarser = NULL;
  edges = new std::set<Edge*>();
}
Randomator* Vertex::ra = new Randomator();

Vertex::~Vertex(){
  edges->clear();
  delete edges;
}

gmtl::Vec3f Vertex::pairwise_repulsion(const gmtl::Vec3f& one, const gmtl::Vec3f& other, Settings* settings){
  gmtl::Vec3f diff = one - other;
  float abs_diff = _length(diff);
  return  (settings->repulsion / 
          ((settings->epsilon + abs_diff)*(settings->epsilon + abs_diff))) * 
          (diff / abs_diff);
}

float Vertex::get_x(){
  return position[0];
}

float Vertex::get_y(){
  return position[1];
}

float Vertex::get_z(){
  return position[2];
}

bool Vertex::operator==(const Vertex& other){
  return other.id == id;
}

string Vertex::toString(){
  stringstream ss;
  ss << "Vertex " << id;
  return ss.str();
}
