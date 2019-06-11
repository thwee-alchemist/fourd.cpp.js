build/FourDType.o: src/FourDType.cpp
	clang++ -c -std=c++11   src/FourDType.cpp -o build/FourDType.o

build/Settings.o: src/Settings.cpp src/Settings.h 
	clang++ -c -I  ./src/gmtl -std=c++11 src/Settings.cpp -o build/Settings.o

build/Vertex.o: src/Vertex.cpp src/Vertex.h
	clang++ -c -I ./src/gmtl -std=c++11  src/Vertex.cpp -o build/Vertex.o

build/Edge.o: src/Edge.cpp src/Edge.h
	clang++ -c -I  ./src/gmtl -std=c++11 src/Edge.cpp -o build/Edge.o

build/DMVertex.o: src/DMVertex.cpp src/DMVertex.h 
	clang++ -c -I  ./src/gmtl -std=c++11  src/DMVertex.cpp -o build/DMVertex.o

build/DMEdge.o: src/DMEdge.cpp src/DMEdge.h 
	clang++ -c -I  ./src/gmtl -std=c++11  src/DMEdge.cpp -o build/DMEdge.o

build/BarnesHutNode3.o: src/BarnesHutNode3.cpp src/BarnesHutNode3.h
	clang++ -c -I ./src/gmtl -std=c++11 src/BarnesHutNode3.cpp -o build/BarnesHutNode3.o

build/DynamicMatching.o: src/DynamicMatching.cpp src/DynamicMatching.h  
	clang++ -c -I  ./src/gmtl -std=c++11  src/DynamicMatching.cpp -o build/DynamicMatching.o

test: build/Settings.o build/FourDType.o build/Vertex.o build/Edge.o build/DMVertex.o build/DMEdge.o build/BarnesHutNode3.o build/DynamicMatching.o src/fourd.cpp
	clang++ -I  ./src/gmtl -std=c++11 build/Settings.o build/Vertex.o build/Edge.o build/DMVertex.o build/DMEdge.o build/BarnesHutNode3.o build/DynamicMatching.o build/FourDType.o src/test.cpp -o build/bin/test;

activate: 
	./emsdk/emsdk activate clang-incoming-64bit 
	./emsdk/emsdk_env.sh 

build/wasm/FourDType.o: src/FourDType.cpp
	clang++ -std=c++11  src/FourDType.cpp -o build/FourDType.o

build/wasm/Settings.o: src/Settings.cpp src/Settings.h 
	clang++ -I  ./src/gmtl -std=c++11 -s MODULARIZE=1 -s WASM=1  -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/Settings.cpp -s LINKABLE=1 -o build/Settings.o

build/wasm/Vertex.o: src/Vertex.cpp src/Vertex.h
	clang++ -I ./src/gmtl -std=c++11 -s MODULARIZE=1 -s WASM=1  -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/Vertex.cpp -s LINKABLE=1 -o build/Vertex.o

build/wasm/Edge.o: src/Edge.cpp src/Edge.h
	clang++ -I  ./src/gmtl -std=c++11 -s MODULARIZE=1 -s WASM=1  -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/Edge.cpp -s LINKABLE=1 -o build/Edge.o

build/wasm/DMVertex.o: src/DMVertex.cpp src/DMVertex.h 
	clang++ -I  ./src/gmtl -std=c++11 -s MODULARIZE=1 -s WASM=1  -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/DMVertex.cpp -s LINKABLE=1 -o build/DMVertex.o

build/wasm/DMEdge.o: src/DMEdge.cpp src/DMEdge.h 
	clang++ -I  ./src/gmtl -std=c++11 -s MODULARIZE=1 -s WASM=1  -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/DMEdge.cpp -s LINKABLE=1 -o build/DMEdge.o

build/wasm/BarnesHutNode3.o: src/BarnesHutNode3.cpp src/BarnesHutNode3.h 
	clang++ -I  ./src/gmtl -std=c++11 -s MODULARIZE=1 -s WASM=1  -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -s LINKABLE=1 src/BarnesHutNode3.cpp -o build/BarnesHutNode3.o

build/wasm/DynamicMatching.o: src/DynamicMatching.cpp src/DynamicMatching.h  
	clang++ -I  ./src/gmtl -std=c++11 -s MODULARIZE=1 -s WASM=1  -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/DynamicMatching.cpp -s LINKABLE=1 -o build/DynamicMatching.o

build: build/wasm/Settings.o build/wasm/FourDType.o build/wasm/Vertex.o build/wasm/Edge.o build/wasm/DMVertex.o build/wasm/DMEdge.o build/wasm/BarnesHutNode3.o build/wasm/DynamicMatching.o src/fourd.cpp
	clang++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ASSERTIONS=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 build/wasm/Settings.o build/wasm/Vertex.o build/wasm/Edge.o build/wasm/DMVertex.o build/wasm/DMEdge.o build/wasm/BarnesHutNode3.o build/wasm/DynamicMatching.o build/wasm/FourDType.o src/fourd.cpp -s LINKABLE=1 -o fourd.js ;
