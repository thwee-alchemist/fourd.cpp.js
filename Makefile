

build/wasm/FourDType.o: src/FourDType.cpp
	em++ -std=c++11  src/FourDType.cpp -o build/FourDType.o

build/wasm/Settings.o: src/Settings.cpp src/Settings.h 
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/Settings.cpp -s LINKABLE=1 -o build/wasm/Settings.o

build/wasm/Vertex.o: src/Vertex.cpp src/Vertex.h
	em++ -I ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/Vertex.cpp -s LINKABLE=1 build/wasm/FourDType.o build/wasm/Settings.o -o build/wasm/Vertex.o

build/wasm/Edge.o: src/Edge.cpp src/Edge.h
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 build/wasm/Vertex.o src/Edge.cpp -s LINKABLE=1 -o build/wasm/Edge.o

build/wasm/DMVertex.o: src/DMVertex.cpp src/DMVertex.h 
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/DMVertex.cpp -s LINKABLE=1 build/wasm/Edge.o -o build/wasm/DMVertex.o

build/wasm/DMEdge.o: src/DMEdge.cpp src/DMEdge.h 
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/DMEdge.cpp -s LINKABLE=1 build/wasm/DMVertex.o -o build/wasm/DMEdge.o

build/wasm/BarnesHutNode3.o: src/BarnesHutNode3.cpp src/BarnesHutNode3.h 
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 -s LINKABLE=1 src/BarnesHutNode3.cpp build/wasm/DMEdge.o -o build/wasm/BarnesHutNode3.o

build/wasm/DynamicMatching.o: src/DynamicMatching.cpp src/DynamicMatching.h  
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1 src/DynamicMatching.cpp -s LINKABLE=1 build/wasm/BarnesHutNode3.o -o build/wasm/DynamicMatching.o

build: build/wasm/DynamicMatching.o src/fourd.cpp
	em++ -I  ./src/gmtl -std=c++11 -s WASM=1  -s ALLOW_MEMORY_GROWTH=1 -s SAFE_HEAP=1  src/fourd.cpp -s LINKABLE=1 build/wasm/DynamicMatching.o -o fourd.js ;
