import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPixelatedPass } from "three/addons/postprocessing/RenderPixelatedPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

camera.position.z = 2;
camera.position.y = 0.3;

const ambientLight = new THREE.AmbientLight(0xffffff);
ambientLight.intensity = 0.5;
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff);
directionalLight.intensity = 1;
directionalLight.position.set(0, 3, 6);
scene.add(directionalLight);

const lightHelper = new THREE.DirectionalLightHelper(directionalLight);
scene.add(lightHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const loader = new GLTFLoader();
let hane = null;

loader.load(
  "HANE.gltf",
  function (gltf) {
    hane = gltf.scene;
    scene.add(gltf.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

const composer = new EffectComposer(renderer);

const renderPixelatedPass = new RenderPixelatedPass(6, scene, camera);
composer.addPass(renderPixelatedPass);

const outputPass = new OutputPass();
composer.addPass(outputPass);

renderPixelatedPass.setPixelSize(8);
renderPixelatedPass.depthEdgeStrength = 0;
renderPixelatedPass.normalEdgeStrength = 0;
composer.setSize(window.innerWidth, window.innerHeight);

scene.background = new THREE.Color(0xbdbdbd);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  if (hane !== null) {
    hane.rotation.y = t / 500 + Math.PI;
  }
}

document.body.onscroll = moveCamera;

function animate() {
  //   if (hane !== null) {
  //     hane.rotation.y += 0.01;
  //   }
  controls.update();
  renderer.render(scene, camera);
  composer.render();
}

renderer.setAnimationLoop(animate);
