fourd.cpp

This is the C++ implementation of the dynamic layout engine. It features a Barnes Hut Tree, a data structures used in astrophysics simulations to calculate many to many relationships, according to wikipedia, and a Dynamic Matching, which is responsible for updating the graph layout as vertices and edges are added and removed. 

It still is missing a proper Multilevel Graph, which, once implemented should allow for display up to about 10,000 vertices. 

Once I've done that, I will have exhausted the paper this is based on, and be able to work on my own to come up with improvements to the algorithm, but those are abstract dreams for retirement. 

The Dynamic Matching Vertex inherits from the Vertex, since they both shared basic graph properties. This is the heart of fourd.cpp.js, which is compiled to web assembly, so it can be included in javascript. 

Apart from the implementation in this folder, I am not proud of fourd.cpp.js, from a technical standpoint, because I don't yet understand the compilation and inclusion process for web assembly and javascript. It's currently a pain, but I don't have anything faster. 

