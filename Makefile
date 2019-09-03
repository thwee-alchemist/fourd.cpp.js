

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
	../emsdk/emscripten/incoming/em++ -I ./src/gmtl -std=c++11 -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/FourDType.cpp src/Settings.cpp src/Vertex.cpp src/Edge.cpp src/BarnesHutNode3.cpp src/LayoutGraph.cpp src/fourd.cpp --bind -O0 -o build/fourd.js

bundle: build/jquery-3.4.0.min.js build/r105.three.min.js build/OrbitControls.js build/fourd.js build/FourDCtrl.js build/dynamic-graph.js
	make all
	cp build/fourd.wasm dist/fourd.wasm
	minify build/jquery-3.4.0.min.js build/r105.three.min.js build/OrbitControls.js build/fourd.js build/FourDCtrl.js build/dynamic-graph.js > dist/dynamic-graph.bundle.min.js

optimized: src/FourDType.cpp src/Settings.cpp src/Settings.h src/Vertex.cpp src/Vertex.h src/Edge.cpp src/Edge.h src/BarnesHutNode3.cpp src/BarnesHutNode3.h src/LayoutGraph.cpp src/LayoutGraph.h src/fourd.cpp
	../emsdk/emscripten/incoming/em++ -I ./src/gmtl -std=c++11 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -O3 -s LINKABLE=1 src/FourDType.cpp -o dist/pure/FourDType.o
	../emsdk/emscripten/incoming/em++ -I ./src/gmtl -std=c++11 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -O3 -s LINKABLE=1 src/Settings.cpp -o dist/pure/Settings.o
	../emsdk/emscripten/incoming/em++ -I ./src/gmtl -std=c++11 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -O3 -s LINKABLE=1 src/Vertex.cpp -o dist/pure/Vertex.o
	../emsdk/emscripten/incoming/em++ -I ./src/gmtl -std=c++11 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -O3 -s LINKABLE=1 src/Edge.cpp -o dist/pure/Edge.o
	../emsdk/emscripten/incoming/em++ -I ./src/gmtl -std=c++11 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -O3 -s LINKABLE=1 src/BarnesHutNode3.cpp -o dist/pure/BarnesHutNode3.o
	../emsdk/emscripten/incoming/em++ -I ./src/gmtl -std=c++11 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -O3 -s LINKABLE=1 src/LayoutGraph.cpp -o dist/pure/LayoutGraph.o
	../emsdk/emscripten/incoming/em++ -I ./src/gmtl -std=c++11 -s WASM=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -O3 dist/pure/FourDType.o dist/pure/Settings.o dist/pure/Vertex.o dist/pure/Edge.o dist/pure/BarnesHutNode3.o dist/pure/LayoutGraph.o src/fourd.cpp --bind -o dist/pure/fourd.js

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
	