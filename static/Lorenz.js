import *as THREE from "three"
import {OrbitControls} from "three/addons/controls/OrbitControls.js"

var example = (function () {

  "use strict";

  var scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer(),
    ambient_light = new THREE.AmbientLight(0xffffff), // White ambient light
    point_light = new THREE.PointLight(0xffffff, 10000, 0),
    camera,
    starMesh,
    rk4material,
    rk4path,
    lorenz_points = [],
    lorenz_object,
    curve,
    geometry,
    rk4pos,
    rk4newpos,
    step,
    rate = 1;

  document.getElementById("webgl-container").addEventListener("click", toggleTime);
  function toggleTime() { rate = (rate+1)%3; }

  function initScene() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("webgl-container").appendChild(renderer.domElement);

    scene.add(ambient_light);

    camera = new THREE.PerspectiveCamera(
      40,                                     // Field of View
      window.innerWidth / window.innerHeight, // Aspect Ratio
      .1,                                     // Near Clipping Plane
      2000                                    // Far Clipping Plane
    );

    const controls = new OrbitControls( camera, renderer.domElement );

    camera.position.z = 600;

    //controls.update() must be called after any manual changes to the camera's transform
    controls.update();

    point_light.position.set(0, 0, 25);
    scene.add(point_light);

    const sphereSize = 1;
    const pointLightHelper = new THREE.PointLightHelper( point_light, sphereSize );
    scene.add( pointLightHelper );

    var loader = new THREE.TextureLoader();
    var starTexture = loader.load('static/textures/starfield.png');

    starMesh = new THREE.Mesh(
      new THREE.SphereGeometry(500, 8, 8),
      new THREE.MeshPhongMaterial({
        map: starTexture,
        side: THREE.BackSide,
        depthWrite: false,
      }));
    scene.add(starMesh)

    step = .001;
    rk4path = new THREE.CurvePath();
    rk4pos = new THREE.Vector3(-150, 150, -150);
    rk4newpos = RK4Lorenz(rk4pos, step);

    for (var i = 0; i < 10000; i++) {
      rk4path.add(new THREE.LineCurve(rk4pos, rk4newpos));
      rk4pos = rk4newpos;
      rk4newpos = RK4Lorenz(rk4pos, step);
      lorenz_points.push(rk4newpos)
    }

    rk4material = new THREE.MeshPhongMaterial({
      color: 0x558800,
      wireframe: false,
      emissive: 0x115511,
      reflectivity: 10
    });

    var material = new THREE.LineBasicMaterial({
      color: 0x00ff00,
      linewidth: 100,
    });

    //rk4lorenzMesh = new THREE.Mesh(
    //  new THREE.TubeGeometry(lorenz_points, 5000, .4, 50, false),
    //  rk4material);
    //scene.add(rk4lorenzMesh);

    // Use CatmullRomCurve3 so we can edit the points later
    curve = new THREE.CatmullRomCurve3(lorenz_points);
    const points = curve.getPoints( 10000 );
    //geometry = new THREE.BufferGeometry().setFromPoints( points );
    //lorenz_object = new THREE.Line( geometry, material );
    geometry = new THREE.TubeGeometry(curve, 10000, .4, 8, false)
    lorenz_object = new THREE.Mesh( geometry, rk4material );
    scene.add(lorenz_object);

    const directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
    directionalLight.target = lorenz_object
    scene.add( directionalLight );

    render();
  }

  function Lorenz(pos) {
    var SIGMA = 10;
    var RHO = 28;
    var BETA = 8/3;

    return new THREE.Vector3(SIGMA * (pos.y - pos.x),
                             pos.x * (RHO - pos.z) - pos.y,
                             pos.x * pos.y - BETA * pos.z);
  }

  function Euler(pos, slope, dt) {
    return new THREE.Vector3(pos.x + slope.x * dt, 
                             pos.y + slope.y * dt, 
                             pos.z + slope.z * dt);
  }

  function RK4Lorenz(start, dt) {
    // Obtain and store slopes at starting point
    var f1 = Lorenz(start);

    // Obtain and store second set of slopes with first set of slopes and half time step
    var f2 = Lorenz(Euler(start, f1, dt / 2));

    // Obtain and store third set of slopes with second set of slopes and half time step
    var f3 = Lorenz(Euler(start, f2, dt / 2));

    // Obtain and store fourth set of slopes with third set of slopes and full time step
    var f4 = Lorenz(Euler(start, f3, dt));

    // Compute weighted average of slopes according to Runge-Kutta fourth order algorithm
    var rkSlope = new THREE.Vector3(f1.x / 6 + f2.x / 3 + f3.x / 3 + f4.x / 6,
                                    f1.y / 6 + f2.y / 3 + f3.y / 3 + f4.y / 6,
                                    f1.z / 6 + f2.z / 3 + f3.z / 3 + f4.z / 6);

    // Return next position using Euler, Runge-Kutta slope and full time step
    return Euler(start, rkSlope, dt);
  }
 
  // Recursively draw scene
  function render() {

    starMesh.rotation.y -= 0.0005;
    starMesh.rotation.x -= 0.00025;

    lorenz_object.rotation.x += 0.00125 * rate;
    lorenz_object.rotation.y += 0.005 * rate;

    //curve.points[0].x += 1
    //geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(10000));

    //lorenz_object.geometry.dispose();
    //lorenz_object.geometry = geometry;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  window.onload = initScene;
  window.addEventListener('resize', resize, false);

  // For debugging
  return {
    scene: scene
  }

})();
