# webassembly
CC=em++
CFLAGS=-std=c++11 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -O2 -s ASSERTIONS=1 -s ENVIRONMENT="web" -s DISABLE_EXCEPTION_CATCHING=2
DEPS=-I gmtl
LINK=-s LINKABLE=1 
UNUSED=-O0 -g4


build/wasm/FourDType.o: src/FourDType.cpp
	$(CC) $(DEPS) $(CFLAGS) -o build/FourDType.o

build/wasm/Settings.o: src/Settings.cpp src/Settings.h 
	$(CC) $(DEPS) $(CFLAGS) src/Settings.cpp -s $(CFLAGS) -o build/wasm/Settings.o

build/wasm/Vertex.o: src/Vertex.cpp src/Vertex.h
	$(CC) $(DEPS) $(CFLAGS) build/wasm/FourDType.o build/wasm/Settings.o -Oz -g4 -o build/wasm/Vertex.o

build/wasm/Edge.o: src/Edge.cpp src/Edge.h
	$(CC) $(DEPS) $(CFLAGS) build/wasm/Vertex.o src/Edge.cpp -s LINKABLE=1 -Oz -g4 -o build/wasm/Edge.o

build/wasm/DMVertex.o: src/DMVertex.cpp src/DMVertex.h 
	$(CC) $(DEPS) $(CFLAGS) src/DMVertex.cpp -s LINKABLE=1 build/wasm/Edge.o -Oz -g4 -o build/wasm/DMVertex.o

build/wasm/DMEdge.o: src/DMEdge.cpp src/DMEdge.h 
	$(CC) $(DEPS) $(CFLAGS) src/DMEdge.cpp -s LINKABLE=1 build/wasm/DMVertex.o -Oz -g4 -o build/wasm/DMEdge.o

build/wasm/BarnesHutNode3.o: src/BarnesHutNode3.cpp src/BarnesHutNode3.h 
	$(CC) $(DEPS) $(CFLAGS) src/BarnesHutNode3.cpp build/wasm/DMEdge.o -Oz -g4 -o build/wasm/BarnesHutNode3.o

build/wasm/DynamicMatching.o: src/DynamicMatching.cpp src/DynamicMatching.h  
	$(CC) $(DEPS) $(CFLAGS) src/DynamicMatching.cpp -s LINKABLE=1 build/wasm/BarnesHutNode3.o -Oz -g4 -o build/wasm/DynamicMatching.o

build: build/wasm/DynamicMatching.o src/fourd.cpp
	$(CC) $(DEPS) $(CFLAGS) src/fourd.cpp -s LINKABLE=1 build/wasm/DynamicMatching.o -Oz -g4 -o build/fourd.js ;

all: src/FourDType.cpp src/Settings.cpp src/Settings.h src/Vertex.cpp src/Vertex.h src/Edge.cpp src/Edge.h src/DMEdge.cpp src/DMEdge.h src/BarnesHutNode3.cpp src/BarnesHutNode3.h src/LayoutGraph.cpp src/LayoutGraph.h src/fourd.cpp
	$(CC) $(DEPS) $(CFLAGS) src/FourDType.cpp src/Settings.cpp src/Vertex.cpp src/Edge.cpp src/BarnesHutNode3.cpp src/LayoutGraph.cpp src/fourd.cpp --bind -O0 -o build/fourd.js

bundle: build/jquery-3.4.0.min.js build/r105.three.min.js build/OrbitControls.js build/fourd.js build/FourDCtrl.js build/dynamic-graph.js
	make all
	cp build/fourd.wasm dist/fourd.wasm
	minify build/jquery-3.4.0.min.js build/r105.three.min.js build/OrbitControls.js build/fourd.js build/FourDCtrl.js build/dynamic-graph.js > dist/dynamic-graph.bundle.min.js

optimized: src/FourDType.cpp src/Settings.cpp src/Settings.h src/Vertex.cpp src/Vertex.h src/Edge.cpp src/Edge.h src/BarnesHutNode3.cpp src/BarnesHutNode3.h src/LayoutGraph.cpp src/LayoutGraph.h src/fourd.cpp
	$(CC) $(DEPS) $(CFLAGS) src/FourDType.cpp -o dist/pure/FourDType.o
	$(CC) $(DEPS) $(CFLAGS) src/Settings.cpp -o dist/pure/Settings.o
	$(CC) $(DEPS) $(CFLAGS) src/Vertex.cpp -o dist/pure/Vertex.o
	$(CC) $(DEPS) $(CFLAGS) src/Edge.cpp -o dist/pure/Edge.o
	$(CC) $(DEPS) $(CFLAGS) src/BarnesHutNode3.cpp -o dist/pure/BarnesHutNode3.o
	$(CC) $(DEPS) $(CFLAGS) src/LayoutGraph.cpp -o dist/pure/LayoutGraph.o
	$(CC) $(DEPS) $(CFLAGS) dist/pure/FourDType.o dist/pure/Settings.o dist/pure/Vertex.o dist/pure/Edge.o dist/pure/BarnesHutNode3.o dist/pure/LayoutGraph.o src/fourd.cpp --bind -o dist/pure/fourd.js

	rm dist/dynamic-graph.bundle.min.js
	cat build/r105.three.min.js >> dist/dynamic-graph.bundle.min.js
	cat build/OrbitControls.js >> dist/dynamic-graph.bundle.min.js
	cat dist/pure/fourd.js >> dist/dynamic-graph.bundle.min.js

	cat build/Vertex.js >> dist/dynamic-graph.bundle.min.js
	cat build/Edge.js >> dist/dynamic-graph.bundle.min.js
	cat build/Graph.js >> dist/dynamic-graph.bundle.min.js
	cat build/FourDCtrl.js >> dist/dynamic-graph.bundle.min.js
	cat build/dynamic-graph.js >> dist/dynamic-graph.bundle.min.js

	# minify build/r105.three.min.js build/OrbitControls.js dist/pure/fourd.js build/Vertex.js build/Edge.js build/Graph.js build/FourDCtrl.js build/dynamic-graph.js > dist/dynamic-graph.bundle.min.js
	cp dist/pure/fourd.wasm ../portfolio/.
	cp dist/dynamic-graph.bundle.min.js ../portfolio/.


debug: build/jquery-3.4.0.min.js build/r105.three.min.js build/OrbitControls.js build/fourd.js build/Vertex.js build/Edge.js build/Graph.js build/FourDCtrl.js build/dynamic-graph.js
	make all
	cp build/fourd.wasm dist/fourd.wasm

	rm dist/dynamic-graph.bundle.min.js
	cat build/r105.three.min.js >> dist/dynamic-graph.bundle.min.js
	cat build/OrbitControls.js >> dist/dynamic-graph.bundle.min.js
	cat build/fourd.js >> dist/dynamic-graph.bundle.min.js

	cat build/Vertex.js >> dist/dynamic-graph.bundle.min.js
	cat build/Edge.js >> dist/dynamic-graph.bundle.min.js
	cat build/Graph.js >> dist/dynamic-graph.bundle.min.js
	cat build/FourDCtrl.js >> dist/dynamic-graph.bundle.min.js
	cat build/dynamic-graph.js >> dist/dynamic-graph.bundle.min.js

	cp dist/fourd.wasm ../portfolio/.
	cp dist/dynamic-graph.bundle.min.js ../portfolio/.
	