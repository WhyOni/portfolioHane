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
  0.01,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);

camera.position.z = 2;

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
    gltf.scene.position.y = -0.3;
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
    hane.rotation.x = t / 500;
  }
  console.log(t);
  if (t >= -250) {
    hane.rotation.y = 0;
    hane.rotation.z = 0;
    hane.position.x = 0;
    hane.position.z = 0;
    hane.position.y = 0;
  } else if (t >= -400) {
    hane.rotation.y = 2.5;
    hane.rotation.z = 0;
    hane.position.x = 1;
    hane.position.z = 1;
    hane.position.y = 0;
  } else if (t >= -600) {
    hane.rotation.y = -2.5;
    hane.rotation.z = 1;
    hane.position.x = -1;
    hane.position.z = -1;
    hane.position.y = 0;
  } else if (t >= -800) {
    hane.rotation.y = Math.PI;
    hane.rotation.z = Math.PI / 2;
    hane.position.x = 0;
    hane.position.z = 0;
    hane.position.y = 0;
  } else if (t >= -1100) {
    hane.rotation.y = Math.PI;
    hane.rotation.z = 4;
    hane.position.x = 0;
    hane.position.z = -1;
    hane.position.y = 1;
  } else {
    hane.rotation.y = 1.37;
    hane.rotation.z = Math.PI;
    hane.position.x = -0.1;
    hane.position.z = 0.65;
    hane.position.y = 0;
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
