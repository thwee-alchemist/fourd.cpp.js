#include <ctime>
#include <chrono>
#include <iostream>

#include "../src/Settings.h"
#include "../src/FourDType.cpp"
#include "../src/Vertex.h"
#include "../src/Edge.h"
#include "../src/BarnesHutNode3.h"
#include "../src/DMVertex.h"
#include "../src/DMEdge.h"
#include "../src/DynamicMatching.h"

using namespace std;

std::chrono::milliseconds timeit(void (*fn)(), int times, string title){
  auto start = std::chrono::high_resolution_clock::now();
  for(int i=0; i<times; i++){
    (*fn)();
  }
  auto stop = std::chrono::high_resolution_clock::now();
  std::chrono::milliseconds dur = std::chrono::duration_cast<std::chrono::milliseconds>(stop - start);
  cout << dur.count() << "ms for " << times << title << endl;
  return dur;
}

int main(int argc, char** argv){
  cout << "Welcome to the graph layout tests" << endl;
  Settings* settings = default_settings();
  LayoutGraph* g = new LayoutGraph(settings);
  DynamicMatching* dm1 = new DynamicMatching(settings, g, 3);
  const int NUM_V = 100;
  int vertices[NUM_V];
  for(int i=0; i<NUM_V; i++){
    vertices[i] = g->add_vertex();
  }

  cout << "added " << g->V.size() << " vertices" << endl;

  Vec3f kinetic_energy = Vec3f();
  Vec3f possum = Vec3f();
  for(int i=0; i<NUM_V; i++){
    Vec3f pos = g->get_v(vertices[i])->position;
    kinetic_energy += g->get_v(vertices[i])->acceleration;
    possum += g->get_v(vertices[i])->position;
  }

  possum = possum / static_cast<float>(NUM_V);
  cout << "kinetic energy: " << kinetic_energy << endl;
  cout << "average_position" << possum << endl;

  const int NUM_E = NUM_V * 2;

  for(int i=0; i<NUM_E; i++){
    g->add_edge(rand() % g->V.size(), rand() % g->V.size());
  }

  cout << "added " << NUM_E << " edges" << endl;

  int times = 100;
  string title = "dm1->layout";

  auto start = std::chrono::high_resolution_clock::now();
  Vec3f possum3 = Vec3f();
  Vec3f possum4 = Vec3f();
  for(int i=0; i<times; i++){
    for(int j=0; j<NUM_V; j++){
      possum3 += g->get_v(vertices[j])->position;
    }

    possum3 /= NUM_V;

    dm1->layout();

    possum4 = Vec3f();
    for(int j=0; j<NUM_V; j++){
      possum4 += g->get_v(vertices[j])->position;
    }

    cout << "delta for this layout: " << possum4 - possum3 << endl;
  }
  auto stop = std::chrono::high_resolution_clock::now();
  std::chrono::milliseconds dur = std::chrono::duration_cast<std::chrono::milliseconds>(stop - start);
  cout << dur.count() << "ms for " << times << " " << title << endl;

  for(int i=0; i<g->V.size(); i++){
    Vec3f pos = g->get_v(vertices[i])->position;
  }

  Vec3f kinetic_energy2 = Vec3f();
  Vec3f possum2 = Vec3f();
  for(int i=0; i<NUM_V; i++){
    Vec3f pos = g->get_v(vertices[i])->position;
    kinetic_energy2 += g->get_v(vertices[i])->acceleration;
    possum2 += g->get_v(vertices[i])->position;
  }

  cout << "deltas" << endl;
  cout << "movement: " << possum2 - possum << endl;
  cout << "kinetic energy: " << kinetic_energy2 - kinetic_energy << endl;

  for(int i=0; i<g->V.size(); g->remove_vertex(vertices[i++])){
    // cout << g->V.size() << endl;
  }

  cout << "vertices removed" << endl;

  cout << "done." << endl;
  return 0;
}
