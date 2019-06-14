// https://stackoverflow.com/questions/722668/traverse-all-the-nodes-of-a-json-object-tree-with-javascript

var json = `{"path":".","name":".","children":[{"path":"BarnesHutNode3.cpp","name":"BarnesHutNode3.cpp","size":2681,"extension":".cpp","type":"file"},{"path":"BarnesHutNode3.h","name":"BarnesHutNode3.h","size":1318,"extension":".h","type":"file"},{"path":"DMEdge.cpp","name":"DMEdge.cpp","size":807,"extension":".cpp","type":"file"},{"path":"DMEdge.h","name":"DMEdge.h","size":569,"extension":".h","type":"file"},{"path":"DMVertex.cpp","name":"DMVertex.cpp","size":1167,"extension":".cpp","type":"file"},{"path":"DMVertex.h","name":"DMVertex.h","size":1003,"extension":".h","type":"file"},{"path":"DynamicMatching.cpp","name":"DynamicMatching.cpp","size":12478,"extension":".cpp","type":"file"},{"path":"DynamicMatching.h","name":"DynamicMatching.h","size":2049,"extension":".h","type":"file"},{"path":"Edge.cpp","name":"Edge.cpp","size":622,"extension":".cpp","type":"file"},{"path":"Edge.h","name":"Edge.h","size":501,"extension":".h","type":"file"},{"path":"FourDType.cpp","name":"FourDType.cpp","size":173,"extension":".cpp","type":"file"},{"path":"LayoutGraph.cpp","name":"LayoutGraph.cpp","size":4195,"extension":".cpp","type":"file"},{"path":"LayoutGraph.h","name":"LayoutGraph.h","size":1100,"extension":".h","type":"file"},{"path":"Settings.cpp","name":"Settings.cpp","size":1370,"extension":".cpp","type":"file"},{"path":"Settings.h","name":"Settings.h","size":970,"extension":".h","type":"file"},{"path":"Vertex.cpp","name":"Vertex.cpp","size":1605,"extension":".cpp","type":"file"},{"path":"Vertex.h","name":"Vertex.h","size":874,"extension":".h","type":"file"},{"path":"fourd.cpp","name":"fourd.cpp","size":2006,"extension":".cpp","type":"file"},{"path":"gmtl","name":"gmtl","children":[{"path":"gmtl/.git","name":".git","size":36,"extension":"","type":"file"},{"path":"gmtl/.gitattributes","name":".gitattributes","size":134,"extension":"","type":"file"},{"path":"gmtl/.gitignore","name":".gitignore","size":117,"extension":"","type":"file"},{"path":"gmtl/.sconsign.dblite","name":".sconsign.dblite","size":33398,"extension":".dblite","type":"file"},{"path":"gmtl/AUTHORS","name":"AUTHORS","size":127,"extension":"","type":"file"},{"path":"gmtl/COPYING","name":"COPYING","size":25255,"extension":"","type":"file"},{"path":"gmtl/ChangeLog","name":"ChangeLog","size":17140,"extension":"","type":"file"},{"path":"gmtl/LICENSE","name":"LICENSE","size":25255,"extension":"","type":"file"},{"path":"gmtl/LICENSE.addendum","name":"LICENSE.addendum","size":2116,"extension":".addendum","type":"file"},{"path":"gmtl/README","name":"README","size":3850,"extension":"","type":"file"},{"path":"gmtl/README-PyGMTL","name":"README-PyGMTL","size":4625,"extension":"","type":"file"},{"path":"gmtl/SConstruct","name":"SConstruct","size":26824,"extension":"","type":"file"},{"path":"gmtl/Test","name":"Test","children":[{"path":"gmtl/Test/SConscript","name":"SConscript","size":265,"extension":"","type":"file"},{"path":"gmtl/Test/TestSuite","name":"TestSuite","children":[{"path":"gmtl/Test/TestSuite/SConscript","name":"SConscript","size":956,"extension":"","type":"file"},{"path":"gmtl/Test/TestSuite/Suites.h","name":"Suites.h","size":631,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases","name":"TestCases","children":[{"path":"gmtl/Test/TestSuite/TestCases/AABoxContainTest.cpp","name":"AABoxContainTest.cpp","size":6824,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/AABoxContainTest.h","name":"AABoxContainTest.h","size":1648,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/AABoxOpsTest.cpp","name":"AABoxOpsTest.cpp","size":3549,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/AABoxOpsTest.h","name":"AABoxOpsTest.h","size":1078,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/AABoxTest.cpp","name":"AABoxTest.cpp","size":6244,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/AABoxTest.h","name":"AABoxTest.h","size":2100,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/AxisAngleClassTest.cpp","name":"AxisAngleClassTest.cpp","size":5244,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/AxisAngleClassTest.h","name":"AxisAngleClassTest.h","size":1586,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/AxisAngleCompareTest.cpp","name":"AxisAngleCompareTest.cpp","size":7482,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/AxisAngleCompareTest.h","name":"AxisAngleCompareTest.h","size":1325,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/ContainmentTest.h","name":"ContainmentTest.h","size":8413,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/ConvertTest.cpp","name":"ConvertTest.cpp","size":8598,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/ConvertTest.h","name":"ConvertTest.h","size":781,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/CoordClassTest.cpp","name":"CoordClassTest.cpp","size":8393,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/CoordClassTest.h","name":"CoordClassTest.h","size":1484,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/CoordCompareTest.cpp","name":"CoordCompareTest.cpp","size":10289,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/CoordCompareTest.h","name":"CoordCompareTest.h","size":1271,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/CoordGenTest.cpp","name":"CoordGenTest.cpp","size":6733,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/CoordGenTest.h","name":"CoordGenTest.h","size":1306,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/EulerAngleClassTest.cpp","name":"EulerAngleClassTest.cpp","size":4927,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/EulerAngleClassTest.h","name":"EulerAngleClassTest.h","size":1622,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/EulerAngleCompareTest.cpp","name":"EulerAngleCompareTest.cpp","size":7779,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/EulerAngleCompareTest.h","name":"EulerAngleCompareTest.h","size":1357,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/InfoTests","name":"InfoTests","children":[{"path":"gmtl/Test/TestSuite/TestCases/InfoTests/OptTest.cpp","name":"OptTest.cpp","size":27202,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/InfoTests/OptTest.h","name":"OptTest.h","size":6361,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/InfoTests/SConscript","name":"SConscript","size":101,"extension":"","type":"file"}],"size":33664,"type":"directory"},{"path":"gmtl/Test/TestSuite/TestCases/IntersectionTest.cpp","name":"IntersectionTest.cpp","size":39774,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/IntersectionTest.h","name":"IntersectionTest.h","size":1935,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/LineSegTest.cpp","name":"LineSegTest.cpp","size":22971,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/LineSegTest.h","name":"LineSegTest.h","size":3758,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MathTest.cpp","name":"MathTest.cpp","size":5530,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MathTest.h","name":"MathTest.h","size":1224,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MatrixClassTest.cpp","name":"MatrixClassTest.cpp","size":29994,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MatrixClassTest.h","name":"MatrixClassTest.h","size":2375,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MatrixCompareTest.cpp","name":"MatrixCompareTest.cpp","size":8960,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MatrixCompareTest.h","name":"MatrixCompareTest.h","size":1342,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MatrixGenTest.cpp","name":"MatrixGenTest.cpp","size":64973,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MatrixGenTest.h","name":"MatrixGenTest.h","size":2768,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MatrixOpsTest.cpp","name":"MatrixOpsTest.cpp","size":40237,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MatrixOpsTest.h","name":"MatrixOpsTest.h","size":2431,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MatrixStateTrackingTest.h","name":"MatrixStateTrackingTest.h","size":679,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MatrixTest.h","name":"MatrixTest.h","size":8442,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/MetaTest.h","name":"MetaTest.h","size":2301,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/OOBoxTest.h","name":"OOBoxTest.h","size":2965,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/OutputTest.cpp","name":"OutputTest.cpp","size":3596,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/OutputTest.h","name":"OutputTest.h","size":1014,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/ParametricCurveTest.cpp","name":"ParametricCurveTest.cpp","size":1202,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/ParametricCurveTest.h","name":"ParametricCurveTest.h","size":600,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/PlaneTest.cpp","name":"PlaneTest.cpp","size":11274,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/PlaneTest.h","name":"PlaneTest.h","size":1985,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/PointTest.cpp","name":"PointTest.cpp","size":17967,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/PointTest.h","name":"PointTest.h","size":3145,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/QuatClassTest.cpp","name":"QuatClassTest.cpp","size":6768,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/QuatClassTest.h","name":"QuatClassTest.h","size":1485,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/QuatCompareTest.cpp","name":"QuatCompareTest.cpp","size":9134,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/QuatCompareTest.h","name":"QuatCompareTest.h","size":1391,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/QuatGenTest.cpp","name":"QuatGenTest.cpp","size":18630,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/QuatGenTest.h","name":"QuatGenTest.h","size":1827,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/QuatOpsTest.cpp","name":"QuatOpsTest.cpp","size":21170,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/QuatOpsTest.h","name":"QuatOpsTest.h","size":2978,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/QuatStuffTest.cpp","name":"QuatStuffTest.cpp","size":10764,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/QuatStuffTest.h","name":"QuatStuffTest.h","size":2142,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/QuatTest.h","name":"QuatTest.h","size":3142,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/SConscript","name":"SConscript","size":850,"extension":"","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/SphereTest.cpp","name":"SphereTest.cpp","size":44642,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/SphereTest.h","name":"SphereTest.h","size":3649,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/TriTest.cpp","name":"TriTest.cpp","size":10476,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/TriTest.h","name":"TriTest.h","size":2382,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/VecBaseTest.cpp","name":"VecBaseTest.cpp","size":8532,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/VecBaseTest.h","name":"VecBaseTest.h","size":1618,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/VecGenTest.cpp","name":"VecGenTest.cpp","size":7248,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/VecGenTest.h","name":"VecGenTest.h","size":1561,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/VecTest.cpp","name":"VecTest.cpp","size":40133,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/VecTest.h","name":"VecTest.h","size":4489,"extension":".h","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/XformTest.cpp","name":"XformTest.cpp","size":37804,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/TestCases/XformTest.h","name":"XformTest.h","size":1701,"extension":".h","type":"file"}],"size":661655,"type":"directory"},{"path":"gmtl/Test/TestSuite/gmtl_metrics.txt","name":"gmtl_metrics.txt","size":173108,"extension":".txt","type":"file"},{"path":"gmtl/Test/TestSuite/runner.cpp","name":"runner.cpp","size":3575,"extension":".cpp","type":"file"},{"path":"gmtl/Test/TestSuite/vc7","name":"vc7","children":[{"path":"gmtl/Test/TestSuite/vc7/TestSuite.sln","name":"TestSuite.sln","size":1489,"extension":".sln","type":"file"},{"path":"gmtl/Test/TestSuite/vc7/TestSuite.vcproj","name":"TestSuite.vcproj","size":11169,"extension":".vcproj","type":"file"},{"path":"gmtl/Test/TestSuite/vc7/cppunit.vcproj","name":"cppunit.vcproj","size":5139,"extension":".vcproj","type":"file"}],"size":17797,"type":"directory"}],"size":857722,"type":"directory"}],"size":857987,"type":"directory"},{"path":"gmtl/docs","name":"docs","children":[{"path":"gmtl/docs/Makefile","name":"Makefile","size":2359,"extension":"","type":"file"},{"path":"gmtl/docs/docbook.mk","name":"docbook.mk","size":10919,"extension":".mk","type":"file"},{"path":"gmtl/docs/ex_builder.py","name":"ex_builder.py","size":3823,"extension":".py","type":"file"},{"path":"gmtl/docs/ex_builder.wpr","name":"ex_builder.wpr","size":6672,"extension":".wpr","type":"file"},{"path":"gmtl/docs/faq","name":"faq","children":[{"path":"gmtl/docs/faq/gmtlfaq.doxygen","name":"gmtlfaq.doxygen","size":44402,"extension":".doxygen","type":"file"}],"size":44402,"type":"directory"},{"path":"gmtl/docs/gmtl.doxy","name":"gmtl.doxy","size":31945,"extension":".doxy","type":"file"},{"path":"gmtl/docs/gmtl.latex.doxy","name":"gmtl.latex.doxy","size":31900,"extension":".doxy","type":"file"},{"path":"gmtl/docs/gmtl.man.doxy","name":"gmtl.man.doxy","size":31903,"extension":".doxy","type":"file"},{"path":"gmtl/docs/programmer.guide","name":"programmer.guide","children":[{"path":"gmtl/docs/programmer.guide/Makefile","name":"Makefile","size":977,"extension":"","type":"file"},{"path":"gmtl/docs/programmer.guide/guide.xml","name":"guide.xml","size":28333,"extension":".xml","type":"file"}],"size":29310,"type":"directory"},{"path":"gmtl/docs/sourceforge.site","name":"sourceforge.site","children":[{"path":"gmtl/docs/sourceforge.site/README.txt","name":"README.txt","size":122,"extension":".txt","type":"file"},{"path":"gmtl/docs/sourceforge.site/index.html","name":"index.html","size":3044,"extension":".html","type":"file"}],"size":3166,"type":"directory"},{"path":"gmtl/docs/version.mk.doxy","name":"version.mk.doxy","size":161,"extension":".doxy","type":"file"}],"size":196560,"type":"directory"},{"path":"gmtl/examples","name":"examples","children":[{"path":"gmtl/examples/faqexample.cpp","name":"faqexample.cpp","size":1062,"extension":".cpp","type":"file"},{"path":"gmtl/examples/gmtlexamples.doxy.in","name":"gmtlexamples.doxy.in","size":1143,"extension":".in","type":"file"}],"size":2205,"type":"directory"},{"path":"gmtl/gmtl","name":"gmtl","children":[{"path":"gmtl/gmtl/AABox.h","name":"AABox.h","size":3609,"extension":".h","type":"file"},{"path":"gmtl/gmtl/AABoxOps.h","name":"AABoxOps.h","size":2075,"extension":".h","type":"file"},{"path":"gmtl/gmtl/AxisAngle.cpp","name":"AxisAngle.cpp","size":180,"extension":".cpp","type":"file"},{"path":"gmtl/gmtl/AxisAngle.h","name":"AxisAngle.h","size":4161,"extension":".h","type":"file"},{"path":"gmtl/gmtl/AxisAngleOps.h","name":"AxisAngleOps.h","size":2250,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Comparitors.h","name":"Comparitors.h","size":1103,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Config.h","name":"Config.h","size":498,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Containment.h","name":"Containment.h","size":23194,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Coord.h","name":"Coord.h","size":6155,"extension":".h","type":"file"},{"path":"gmtl/gmtl/CoordOps.h","name":"CoordOps.h","size":2053,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Defines.h","name":"Defines.h","size":2462,"extension":".h","type":"file"},{"path":"gmtl/gmtl/EulerAngle.cpp","name":"EulerAngle.cpp","size":517,"extension":".cpp","type":"file"},{"path":"gmtl/gmtl/EulerAngle.h","name":"EulerAngle.h","size":4001,"extension":".h","type":"file"},{"path":"gmtl/gmtl/EulerAngleOps.h","name":"EulerAngleOps.h","size":2349,"extension":".h","type":"file"},{"path":"gmtl/gmtl/External","name":"External","children":[{"path":"gmtl/gmtl/External/OpenSGConvert.h","name":"OpenSGConvert.h","size":1237,"extension":".h","type":"file"}],"size":1237,"type":"directory"},{"path":"gmtl/gmtl/Fit","name":"Fit","children":[{"path":"gmtl/gmtl/Fit/GaussPointsFit.h","name":"GaussPointsFit.h","size":8305,"extension":".h","type":"file"}],"size":8305,"type":"directory"},{"path":"gmtl/gmtl/Frustum.h","name":"Frustum.h","size":5412,"extension":".h","type":"file"},{"path":"gmtl/gmtl/FrustumOps.h","name":"FrustumOps.h","size":925,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Generate.h","name":"Generate.h","size":59865,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Helpers.h","name":"Helpers.h","size":863,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Intersection.h","name":"Intersection.h","size":31309,"extension":".h","type":"file"},{"path":"gmtl/gmtl/LineSeg.h","name":"LineSeg.h","size":2218,"extension":".h","type":"file"},{"path":"gmtl/gmtl/LineSegOps.h","name":"LineSegOps.h","size":2083,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Math.h","name":"Math.h","size":16556,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Matrix.cpp","name":"Matrix.cpp","size":555,"extension":".cpp","type":"file"},{"path":"gmtl/gmtl/Matrix.h","name":"Matrix.h","size":14406,"extension":".h","type":"file"},{"path":"gmtl/gmtl/MatrixOps.h","name":"MatrixOps.h","size":26509,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Misc","name":"Misc","children":[{"path":"gmtl/gmtl/Misc/MatrixConvert.h","name":"MatrixConvert.h","size":1870,"extension":".h","type":"file"}],"size":1870,"type":"directory"},{"path":"gmtl/gmtl/Numerics","name":"Numerics","children":[{"path":"gmtl/gmtl/Numerics/Eigen.h","name":"Eigen.h","size":24265,"extension":".h","type":"file"}],"size":24265,"type":"directory"},{"path":"gmtl/gmtl/OOBox.h","name":"OOBox.h","size":4146,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Output.h","name":"Output.h","size":8709,"extension":".h","type":"file"},{"path":"gmtl/gmtl/ParametricCurve.h","name":"ParametricCurve.h","size":10966,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Plane.h","name":"Plane.h","size":5082,"extension":".h","type":"file"},{"path":"gmtl/gmtl/PlaneOps.h","name":"PlaneOps.h","size":5082,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Point.h","name":"Point.h","size":3464,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Quat.cpp","name":"Quat.cpp","size":397,"extension":".cpp","type":"file"},{"path":"gmtl/gmtl/Quat.h","name":"Quat.h","size":4879,"extension":".h","type":"file"},{"path":"gmtl/gmtl/QuatOps.h","name":"QuatOps.h","size":21354,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Ray.h","name":"Ray.h","size":2452,"extension":".h","type":"file"},{"path":"gmtl/gmtl/RayOps.h","name":"RayOps.h","size":1837,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Sphere.h","name":"Sphere.h","size":2313,"extension":".h","type":"file"},{"path":"gmtl/gmtl/SphereOps.h","name":"SphereOps.h","size":1897,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Tri.h","name":"Tri.h","size":6180,"extension":".h","type":"file"},{"path":"gmtl/gmtl/TriOps.h","name":"TriOps.h","size":5053,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Util","name":"Util","children":[{"path":"gmtl/gmtl/Util/Assert.h","name":"Assert.h","size":482,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Util/Meta.h","name":"Meta.h","size":2469,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Util/StaticAssert.h","name":"StaticAssert.h","size":3779,"extension":".h","type":"file"}],"size":6730,"type":"directory"},{"path":"gmtl/gmtl/Vec.h","name":"Vec.h","size":3448,"extension":".h","type":"file"},{"path":"gmtl/gmtl/VecBase.h","name":"VecBase.h","size":6499,"extension":".h","type":"file"},{"path":"gmtl/gmtl/VecExprMeta.h","name":"VecExprMeta.h","size":4773,"extension":".h","type":"file"},{"path":"gmtl/gmtl/VecOps.h","name":"VecOps.h","size":19480,"extension":".h","type":"file"},{"path":"gmtl/gmtl/VecOpsMeta.h","name":"VecOpsMeta.h","size":1807,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Version.h","name":"Version.h","size":5070,"extension":".h","type":"file"},{"path":"gmtl/gmtl/Xforms.h","name":"Xforms.h","size":22748,"extension":".h","type":"file"},{"path":"gmtl/gmtl/gmtl.doxygen","name":"gmtl.doxygen","size":6531,"extension":".doxygen","type":"file"},{"path":"gmtl/gmtl/gmtl.h","name":"gmtl.h","size":1174,"extension":".h","type":"file"}],"size":413056,"type":"directory"},{"path":"gmtl/gmtl-config","name":"gmtl-config","size":1640,"extension":"","type":"file"},{"path":"gmtl/gmtl-config-version.cmake.in","name":"gmtl-config-version.cmake.in","size":505,"extension":".in","type":"file"},{"path":"gmtl/gmtl-config.cmake.in","name":"gmtl-config.cmake.in","size":397,"extension":".in","type":"file"},{"path":"gmtl/gmtl.fpc.in","name":"gmtl.fpc.in","size":281,"extension":".in","type":"file"},{"path":"gmtl/gmtl.spec","name":"gmtl.spec","size":3903,"extension":".spec","type":"file"},{"path":"gmtl/macros","name":"macros","children":[{"path":"gmtl/macros/gmtl.m4","name":"gmtl.m4","size":1779,"extension":".m4","type":"file"}],"size":1779,"type":"directory"},{"path":"gmtl/options.cache.linux-x86_64","name":"options.cache.linux-x86_64","size":0,"extension":".linux-x86_64","type":"file"},{"path":"gmtl/pygmtl.spec","name":"pygmtl.spec","size":2162,"extension":".spec","type":"file"},{"path":"gmtl/python","name":"python","children":[{"path":"gmtl/python/SConscript","name":"SConscript","size":1248,"extension":"","type":"file"},{"path":"gmtl/python/pyste","name":"pyste","children":[{"path":"gmtl/python/pyste/SConscript","name":"SConscript","size":261,"extension":"","type":"file"},{"path":"gmtl/python/pyste/gmtl.pyste","name":"gmtl.pyste","size":21901,"extension":".pyste","type":"file"}],"size":22162,"type":"directory"},{"path":"gmtl/python/src","name":"src","children":[{"path":"gmtl/python/src/SConscript","name":"SConscript","size":198,"extension":"","type":"file"},{"path":"gmtl/python/src/gmtl","name":"gmtl","children":[{"path":"gmtl/python/src/gmtl/SConscript","name":"SConscript","size":127,"extension":"","type":"file"},{"path":"gmtl/python/src/gmtl/_AABox_double.cpp","name":"_AABox_double.cpp","size":2078,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_AABox_float.cpp","name":"_AABox_float.cpp","size":2059,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_AxisAngle_double.cpp","name":"_AxisAngle_double.cpp","size":2380,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_AxisAngle_float.cpp","name":"_AxisAngle_float.cpp","size":2346,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_double_3_gmtl_AxisAngle_double.cpp","name":"_Coord_gmtl_Vec_double_3_gmtl_AxisAngle_double.cpp","size":2688,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_double_3_gmtl_EulerAngle_double_gmtl_XYZ.cpp","name":"_Coord_gmtl_Vec_double_3_gmtl_EulerAngle_double_gmtl_XYZ.cpp","size":2923,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_double_3_gmtl_EulerAngle_double_gmtl_ZXY.cpp","name":"_Coord_gmtl_Vec_double_3_gmtl_EulerAngle_double_gmtl_ZXY.cpp","size":2923,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_double_3_gmtl_EulerAngle_double_gmtl_ZYX.cpp","name":"_Coord_gmtl_Vec_double_3_gmtl_EulerAngle_double_gmtl_ZYX.cpp","size":2815,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_double_3_gmtl_Quat_double.cpp","name":"_Coord_gmtl_Vec_double_3_gmtl_Quat_double.cpp","size":2619,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_double_4_gmtl_AxisAngle_double.cpp","name":"_Coord_gmtl_Vec_double_4_gmtl_AxisAngle_double.cpp","size":2688,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_double_4_gmtl_EulerAngle_double_gmtl_XYZ.cpp","name":"_Coord_gmtl_Vec_double_4_gmtl_EulerAngle_double_gmtl_XYZ.cpp","size":2923,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_double_4_gmtl_EulerAngle_double_gmtl_ZXY.cpp","name":"_Coord_gmtl_Vec_double_4_gmtl_EulerAngle_double_gmtl_ZXY.cpp","size":2923,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_double_4_gmtl_EulerAngle_double_gmtl_ZYX.cpp","name":"_Coord_gmtl_Vec_double_4_gmtl_EulerAngle_double_gmtl_ZYX.cpp","size":2923,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_double_4_gmtl_Quat_double.cpp","name":"_Coord_gmtl_Vec_double_4_gmtl_Quat_double.cpp","size":2619,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_float_3_gmtl_AxisAngle_float.cpp","name":"_Coord_gmtl_Vec_float_3_gmtl_AxisAngle_float.cpp","size":2660,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_float_3_gmtl_EulerAngle_float_gmtl_XYZ.cpp","name":"_Coord_gmtl_Vec_float_3_gmtl_EulerAngle_float_gmtl_XYZ.cpp","size":2887,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_float_3_gmtl_EulerAngle_float_gmtl_ZXY.cpp","name":"_Coord_gmtl_Vec_float_3_gmtl_EulerAngle_float_gmtl_ZXY.cpp","size":2887,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_float_3_gmtl_EulerAngle_float_gmtl_ZYX.cpp","name":"_Coord_gmtl_Vec_float_3_gmtl_EulerAngle_float_gmtl_ZYX.cpp","size":2887,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_float_3_gmtl_Quat_float.cpp","name":"_Coord_gmtl_Vec_float_3_gmtl_Quat_float.cpp","size":2634,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_float_4_gmtl_AxisAngle_float.cpp","name":"_Coord_gmtl_Vec_float_4_gmtl_AxisAngle_float.cpp","size":2440,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_float_4_gmtl_EulerAngle_float_gmtl_XYZ.cpp","name":"_Coord_gmtl_Vec_float_4_gmtl_EulerAngle_float_gmtl_XYZ.cpp","size":2887,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_float_4_gmtl_EulerAngle_float_gmtl_ZXY.cpp","name":"_Coord_gmtl_Vec_float_4_gmtl_EulerAngle_float_gmtl_ZXY.cpp","size":2887,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_float_4_gmtl_EulerAngle_float_gmtl_ZYX.cpp","name":"_Coord_gmtl_Vec_float_4_gmtl_EulerAngle_float_gmtl_ZYX.cpp","size":2887,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Coord_gmtl_Vec_float_4_gmtl_Quat_float.cpp","name":"_Coord_gmtl_Vec_float_4_gmtl_Quat_float.cpp","size":2583,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_EulerAngle_float_gmtl_XYZ.cpp","name":"_EulerAngle_float_gmtl_XYZ.cpp","size":2552,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_EulerAngle_float_gmtl_ZXY.cpp","name":"_EulerAngle_float_gmtl_ZXY.cpp","size":2552,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_EulerAngle_float_gmtl_ZYX.cpp","name":"_EulerAngle_float_gmtl_ZYX.cpp","size":2552,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Frustum_double.cpp","name":"_Frustum_double.cpp","size":1917,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Frustum_float.cpp","name":"_Frustum_float.cpp","size":1899,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_LineSeg_double.cpp","name":"_LineSeg_double.cpp","size":1800,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_LineSeg_float.cpp","name":"_LineSeg_float.cpp","size":1784,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Matrix_float_3_3.cpp","name":"_Matrix_float_3_3.cpp","size":3989,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Matrix_float_4_4.cpp","name":"_Matrix_float_4_4.cpp","size":4038,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Plane_double.cpp","name":"_Plane_double.cpp","size":2118,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Plane_float.cpp","name":"_Plane_float.cpp","size":2097,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Point_double_2.cpp","name":"_Point_double_2.cpp","size":1426,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Point_double_3.cpp","name":"_Point_double_3.cpp","size":1442,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Point_float_2.cpp","name":"_Point_float_2.cpp","size":1414,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Point_float_3.cpp","name":"_Point_float_3.cpp","size":1429,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Point_int_2.cpp","name":"_Point_int_2.cpp","size":1390,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Point_int_3.cpp","name":"_Point_int_3.cpp","size":1403,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Quat_double.cpp","name":"_Quat_double.cpp","size":2620,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Quat_float.cpp","name":"_Quat_float.cpp","size":2592,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Ray_double.cpp","name":"_Ray_double.cpp","size":2009,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Ray_float.cpp","name":"_Ray_float.cpp","size":1992,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Sphere_double.cpp","name":"_Sphere_double.cpp","size":1942,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Sphere_float.cpp","name":"_Sphere_float.cpp","size":1926,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Tri_double.cpp","name":"_Tri_double.cpp","size":2072,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Tri_float.cpp","name":"_Tri_float.cpp","size":2049,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Tri_int.cpp","name":"_Tri_int.cpp","size":2003,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_VecBase_double_2.cpp","name":"_VecBase_double_2.cpp","size":2747,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_VecBase_double_3.cpp","name":"_VecBase_double_3.cpp","size":2779,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_VecBase_double_4.cpp","name":"_VecBase_double_4.cpp","size":2811,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_VecBase_float_2.cpp","name":"_VecBase_float_2.cpp","size":2716,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_VecBase_float_3.cpp","name":"_VecBase_float_3.cpp","size":2742,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_VecBase_float_4.cpp","name":"_VecBase_float_4.cpp","size":2776,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_VecBase_int_2.cpp","name":"_VecBase_int_2.cpp","size":2654,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_VecBase_int_3.cpp","name":"_VecBase_int_3.cpp","size":2680,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_VecBase_int_4.cpp","name":"_VecBase_int_4.cpp","size":2706,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Vec_double_2.cpp","name":"_Vec_double_2.cpp","size":1151,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Vec_double_3.cpp","name":"_Vec_double_3.cpp","size":1423,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Vec_double_4.cpp","name":"_Vec_double_4.cpp","size":1439,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Vec_float_2.cpp","name":"_Vec_float_2.cpp","size":1138,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Vec_float_3.cpp","name":"_Vec_float_3.cpp","size":1409,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Vec_float_4.cpp","name":"_Vec_float_4.cpp","size":1424,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Vec_int_2.cpp","name":"_Vec_int_2.cpp","size":1115,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Vec_int_3.cpp","name":"_Vec_int_3.cpp","size":1384,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_Vec_int_4.cpp","name":"_Vec_int_4.cpp","size":1396,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_AABoxOps_h.cpp","name":"_gmtl_AABoxOps_h.cpp","size":862,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_AxisAngleOps_h.cpp","name":"_gmtl_AxisAngleOps_h.cpp","size":1122,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_Containment_h.cpp","name":"_gmtl_Containment_h.cpp","size":5214,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_CoordOps_h.cpp","name":"_gmtl_CoordOps_h.cpp","size":5313,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_Defines_h.cpp","name":"_gmtl_Defines_h.cpp","size":1250,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_EulerAngleOps_h.cpp","name":"_gmtl_EulerAngleOps_h.cpp","size":1854,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_FrustumOps_h.cpp","name":"_gmtl_FrustumOps_h.cpp","size":778,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_Generate_h.cpp","name":"_gmtl_Generate_h.cpp","size":33643,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_LineSegOps_h.cpp","name":"_gmtl_LineSegOps_h.cpp","size":1370,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_Math_h.cpp","name":"_gmtl_Math_h.cpp","size":3483,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_MatrixOps_h.cpp","name":"_gmtl_MatrixOps_h.cpp","size":6929,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_PlaneOps_h.cpp","name":"_gmtl_PlaneOps_h.cpp","size":2135,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_QuatOps_h.cpp","name":"_gmtl_QuatOps_h.cpp","size":6901,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_RayOps_h.cpp","name":"_gmtl_RayOps_h.cpp","size":850,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_SphereOps_h.cpp","name":"_gmtl_SphereOps_h.cpp","size":868,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_TriOps_h.cpp","name":"_gmtl_TriOps_h.cpp","size":1356,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_VecOps_h.cpp","name":"_gmtl_VecOps_h.cpp","size":10000,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_Xforms_h.cpp","name":"_gmtl_Xforms_h.cpp","size":5295,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_containment_wrappers_h.cpp","name":"_gmtl_containment_wrappers_h.cpp","size":895,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_intersect_wrappers_h.cpp","name":"_gmtl_intersect_wrappers_h.cpp","size":5784,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/_gmtl_wrappers_h.cpp","name":"_gmtl_wrappers_h.cpp","size":9642,"extension":".cpp","type":"file"},{"path":"gmtl/python/src/gmtl/gmtl.cpp","name":"gmtl.cpp","size":7759,"extension":".cpp","type":"file"}],"size":269473,"type":"directory"},{"path":"gmtl/python/src/gmtl-AABoxOps.h","name":"gmtl-AABoxOps.h","size":791,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-AxisAngleOps.h","name":"gmtl-AxisAngleOps.h","size":754,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-Containment.h","name":"gmtl-Containment.h","size":2895,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-CoordOps.h","name":"gmtl-CoordOps.h","size":3086,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-EulerAngleOps.h","name":"gmtl-EulerAngleOps.h","size":934,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-FrustumOps.h","name":"gmtl-FrustumOps.h","size":664,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-Generate.h","name":"gmtl-Generate.h","size":15624,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-LineSegOps.h","name":"gmtl-LineSegOps.h","size":1151,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-MatrixOps.h","name":"gmtl-MatrixOps.h","size":4441,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-PlaneOps.h","name":"gmtl-PlaneOps.h","size":1967,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-QuatOps.h","name":"gmtl-QuatOps.h","size":3784,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-RayOps.h","name":"gmtl-RayOps.h","size":778,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-SphereOps.h","name":"gmtl-SphereOps.h","size":800,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-TriOps.h","name":"gmtl-TriOps.h","size":1037,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-VecOps.h","name":"gmtl-VecOps.h","size":3817,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-Xforms.h","name":"gmtl-Xforms.h","size":3713,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-array-wrappers.h","name":"gmtl-array-wrappers.h","size":2693,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-callable-wrappers.h","name":"gmtl-callable-wrappers.h","size":1069,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-containment-wrappers.h","name":"gmtl-containment-wrappers.h","size":1268,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-getData-wrappers.h","name":"gmtl-getData-wrappers.h","size":4169,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-intersect-wrappers.h","name":"gmtl-intersect-wrappers.h","size":8562,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-pickle.h","name":"gmtl-pickle.h","size":13341,"extension":".h","type":"file"},{"path":"gmtl/python/src/gmtl-wrappers.h","name":"gmtl-wrappers.h","size":17490,"extension":".h","type":"file"}],"size":364499,"type":"directory"},{"path":"gmtl/python/test","name":"test","children":[{"path":"gmtl/python/test/SConscript","name":"SConscript","size":225,"extension":"","type":"file"},{"path":"gmtl/python/test/gmtl-test.py","name":"gmtl-test.py","size":5822,"extension":".py","type":"file"},{"path":"gmtl/python/test/testsuite.py","name":"testsuite.py","size":299534,"extension":".py","type":"file"}],"size":305581,"type":"directory"}],"size":693490,"type":"directory"},{"path":"gmtl/tools","name":"tools","children":[{"path":"gmtl/tools/build","name":"build","children":[{"path":"gmtl/tools/build/AutoDist.py","name":"AutoDist.py","size":14480,"extension":".py","type":"file"},{"path":"gmtl/tools/build/AutoDist.pyc","name":"AutoDist.pyc","size":14929,"extension":".pyc","type":"file"}],"size":29409,"type":"directory"}],"size":29409,"type":"directory"}],"size":2342251,"type":"directory"},{"path":"test.cpp","name":"test.cpp","size":3266,"extension":".cpp","type":"file"}],"size":2381005,"type":"directory"}`;




