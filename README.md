# &lt;dynamic-graph&gt;
## ... a web component

fourd.cpp.js is a dynamic graph visualization for the browser. It is written in C++ and javascript. 
To include it in your HTML, place 
* fourd.wasm, and
* dynamic-graph.bundle.min.js
in the same directory on your web server. 

Then include this in your HTML: 
```html
<head>
  ...
  <script type="text/javascript" src="/path/to/your/dynamic-graph.bundle.min.js"></script>
  ...
</head>
<body>
   ...
   <dynamic-graph
     id="graph"
     width="500"
     height="500"
     background="#58A7C6">
   </dynamic-graph>
   
   ...
   
  <script type="text/javascript">
    var graph = document.querySelector('#graph');
    var vid1 = graph.add_vertex();
    var vid2 = graph.add_vertex();
    var eid1 = graph.add_edge(vid1, vid2)
  </script>
</body>
```


## Building
Install [imvu/gmtl](https://github.com/imvu/gmtl)
Install minfiy
`make bundle`