#ifndef EDGE
#define EDGE

#include <vector>
#include <sstream>
#include <random>

#include "Vertex.h"
#include "FourDType.cpp"


using namespace std;

class Vertex;

class Edge {
  public:
    Edge(int, Vertex*, Vertex*, bool, float);

    int id;
    FourDType T;
    Vertex* source;
    Vertex* target;
    bool directed;
    float strength;
    Edge* coarser;
    float order;

    string toString();
    bool operator==(const Edge& other);
    ~Edge();
};

#endif