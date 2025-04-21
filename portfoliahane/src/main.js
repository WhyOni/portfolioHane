import "./style.css";
import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPixelatedPass } from "three/addons/postprocessing/RenderPixelatedPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";

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

const loader = new GLTFLoader();
let hane = null;

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

loader.load(
  "HANE.gltf",
  function (han) {
    hane = han;
    scene.add(han.scene);
    han.scene.position.y = -0.7;
    han.scene.rotation.y = (3 * Math.PI) / 4;
    han.scene.position.x = 1;
    han.scene.position.z = 1;

    const clock = new THREE.Clock();
    const mixer = new THREE.AnimationMixer(han.scene);
    var wave = mixer.clipAction(han.animations[0]);
    wave.setLoop(THREE.LoopOnce);
    wave.clampWhenFinished = true;
    wave.play();

    scene.add(han.scene);

    function animate() {
      const delta = clock.getDelta();
      if (mixer) mixer.update(delta);
      renderer.render(scene, camera);
      composer.render();
      requestAnimationFrame(animate);
    }
    animate();

    document.getElementById("wavebutton").onclick = () => {
      wave.stop();
      wave.play();
    };

    function moveCamera() {
      const t = document.body.getBoundingClientRect().top;
    }

    document.body.onscroll = moveCamera;
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// function animate() {
//   //   if (hane !== null) {
//   //     hane.scene.rotation.y += 0.01;
//   //   }
//   renderer.render(scene, camera);
//   composer.render();
// }

// renderer.setAnimationLoop(animate);
