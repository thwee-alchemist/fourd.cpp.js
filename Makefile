

build/wasm/FourDType.o: src/FourDType.cpp
	em++ -std=c++11  src/FourDType.cpp -Oz -g4 -o build/FourDType.o

build/wasm/Settings.o: src/Settings.cpp src/Settings.h 
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/Settings.cpp -s LINKABLE=1 -Oz -g4 -o build/wasm/Settings.o

build/wasm/Vertex.o: src/Vertex.cpp src/Vertex.h
	em++ -I ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/Vertex.cpp -s LINKABLE=1 build/wasm/FourDType.o build/wasm/Settings.o -Oz -g4 -o build/wasm/Vertex.o

build/wasm/Edge.o: src/Edge.cpp src/Edge.h
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 build/wasm/Vertex.o src/Edge.cpp -s LINKABLE=1 -Oz -g4 -o build/wasm/Edge.o

build/wasm/DMVertex.o: src/DMVertex.cpp src/DMVertex.h 
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/DMVertex.cpp -s LINKABLE=1 build/wasm/Edge.o -Oz -g4 -o build/wasm/DMVertex.o

build/wasm/DMEdge.o: src/DMEdge.cpp src/DMEdge.h 
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/DMEdge.cpp -s LINKABLE=1 build/wasm/DMVertex.o -Oz -g4 -o build/wasm/DMEdge.o

build/wasm/BarnesHutNode3.o: src/BarnesHutNode3.cpp src/BarnesHutNode3.h 
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -s LINKABLE=1 src/BarnesHutNode3.cpp build/wasm/DMEdge.o -Oz -g4 -o build/wasm/BarnesHutNode3.o

build/wasm/DynamicMatching.o: src/DynamicMatching.cpp src/DynamicMatching.h  
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/DynamicMatching.cpp -s LINKABLE=1 build/wasm/BarnesHutNode3.o -Oz -g4 -o build/wasm/DynamicMatching.o

build: build/wasm/DynamicMatching.o src/fourd.cpp
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1  src/fourd.cpp -s LINKABLE=1 build/wasm/DynamicMatching.o -Oz -g4 -o build/fourd.js ;

all: src/FourDType.cpp src/Settings.cpp src/Settings.h src/Vertex.cpp src/Vertex.h src/Edge.cpp src/Edge.h src/DMEdge.cpp src/DMEdge.h src/BarnesHutNode3.cpp src/BarnesHutNode3.h src/LayoutGraph.cpp src/LayoutGraph.h src/fourd.cpp
	em++ -I ./src/gmtl -std=c++11 -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/FourDType.cpp src/Settings.cpp src/Vertex.cpp src/Edge.cpp src/BarnesHutNode3.cpp src/LayoutGraph.cpp src/fourd.cpp --bind -O0 -o build/fourd.js

js: dynamic-graph.js build/FourDCtrl.js
	rollup -c --file=dist/dynamic-graph.min.js --format=iife

bundle: build/jquery-3.4.0.min.js build/r105.three.min.js build/OrbitControls.js build/fourd.js build/FourDCtrl.js dynamic-graph.js
	minify build/jquery-3.4.0.min.js build/r105.three.min.js build/OrbitControls.js build/fourd.js build/FourDCtrl.js dynamic-graph.js > build/all.bundle.min.js