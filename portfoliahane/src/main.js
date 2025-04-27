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

let hane = null,
  clock,
  mixer,
  wave,
  think,
  lebron;

loader.load(
  "HANE.gltf",
  function (han) {
    hane = han;
    clock = new THREE.Clock();
    mixer = new THREE.AnimationMixer(hane.scene);
    wave = mixer.clipAction(hane.animations[0]);
    wave.setLoop(THREE.LoopOnce);
    wave.clampWhenFinished = true;
    think = mixer.clipAction(hane.animations[1]);
    lebron = mixer.clipAction(hane.animations[2]);
    if (window.innerWidth / window.innerHeight >= 85 / 70) {
      hane.scene.rotation.y = (3 * Math.PI) / 4;
      hane.scene.position.x = 1;
      hane.scene.position.y = -0.7;
      hane.scene.position.z = 1;
    } else {
      hane.scene.rotation.y = (7 * Math.PI) / 8;
      hane.scene.position.x = 0.5;
      hane.scene.position.y = -0.7;
      hane.scene.position.z = 0.7;
    }
    wave.play();

    scene.add(han.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let flower = null;

loader.load(
  "flower.gltf",
  function (han) {
    flower = han;
    han.scene.position.z = 3;
    scene.add(han.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let slot = null,
  mixerslot,
  wheel1 = [],
  wheel2 = [],
  wheel3 = [],
  slotlever;

loader.load(
  "slot.gltf",
  function (han) {
    slot = han;
    mixerslot = new THREE.AnimationMixer(slot.scene);
    wheel1.push(mixerslot.clipAction(slot.animations[0]));
    wheel1.push(mixerslot.clipAction(slot.animations[1]));
    wheel1.push(mixerslot.clipAction(slot.animations[2]));
    wheel1.push(mixerslot.clipAction(slot.animations[3]));
    wheel1.push(mixerslot.clipAction(slot.animations[4]));
    wheel2.push(mixerslot.clipAction(slot.animations[5]));
    wheel2.push(mixerslot.clipAction(slot.animations[6]));
    wheel2.push(mixerslot.clipAction(slot.animations[7]));
    wheel2.push(mixerslot.clipAction(slot.animations[8]));
    wheel2.push(mixerslot.clipAction(slot.animations[9]));
    wheel3.push(mixerslot.clipAction(slot.animations[10]));
    wheel3.push(mixerslot.clipAction(slot.animations[11]));
    wheel3.push(mixerslot.clipAction(slot.animations[12]));
    wheel3.push(mixerslot.clipAction(slot.animations[13]));
    wheel3.push(mixerslot.clipAction(slot.animations[14]));
    slotlever = mixerslot.clipAction(slot.animations[15]);
    slotlever.setLoop(THREE.LoopOnce);
    slotlever.clampWhenFinished = true;
    wheel1.map((a) => {
      a.setLoop(THREE.LoopOnce);
      a.clampWhenFinished = true;
    });
    wheel2.map((a) => {
      a.setLoop(THREE.LoopOnce);
      a.clampWhenFinished = true;
    });
    wheel3.map((a) => {
      a.setLoop(THREE.LoopOnce);
      a.clampWhenFinished = true;
    });
    han.scene.position.z = 3;
    scene.add(han.scene);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

let flowerSpin = true;

function animate() {
  if (hane != null) {
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    if (mixerslot) mixerslot.update(delta);
    if (flowerSpin) flower.scene.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
  composer.render();
  requestAnimationFrame(animate);
}
animate();

document.getElementById("wavebutton").onclick = () => {
  wave.stop();
  wave.play();
};

let money = 100;
const mon = document.getElementById("money");
const snd = new Audio("confetti.mp3");
//   const sound = new Audio("fart.mp3");

document.getElementById("gamble").onclick = () => {
  //   sound.play();
  const one = Math.floor(Math.random() * 5),
    two = Math.floor(Math.random() * 5),
    three = Math.floor(Math.random() * 5);
  slotlever.stop();
  wheel1.map((a) => {
    a.stop();
  });
  wheel2.map((a) => {
    a.stop();
  });
  wheel3.map((a) => {
    a.stop();
  });
  wheel1[one].play();
  wheel2[two].play();
  wheel3[three].play();
  slotlever.play();
  setTimeout(function () {
    if (one === two && two === three) {
      snd.play();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: {
          y: 0.6,
        },
        colors: [
          "#ff00ff",
          "#00ff00",
          "#0000ff",
          "#ff0000",
          "#ffff00",
          "#00ffff",
        ],
      });
      money = money + 10;
    } else {
      money = money - 10;
    }
    mon.innerText = `$${money}`;
    if (money > 0) {
      mon.style.color = "rgb(0,255,0)";
    } else {
      mon.style.color = "rgb(255,0,0)";
    }
  }, 3000);
};

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  if (hane != null) {
    if (t >= -window.innerHeight / 2) {
      if (window.innerWidth / window.innerHeight >= 85 / 70) {
        hane.scene.rotation.x = 0;
        hane.scene.rotation.y = (3 * Math.PI) / 4;
        hane.scene.rotation.z = 0;
        hane.scene.position.x = 1;
        hane.scene.position.y = -0.7;
        hane.scene.position.z = 1;
      } else {
        hane.scene.rotation.x = 0;
        hane.scene.rotation.y = (7 * Math.PI) / 8;
        hane.scene.rotation.z = 0;
        hane.scene.position.x = 0.5;
        hane.scene.position.y = -0.7;
        hane.scene.position.z = 0.7;
      }
      think.stop();
      wave.play();
    } else if (t >= (-3 * window.innerHeight) / 2) {
      if (window.innerWidth / window.innerHeight >= 85 / 70) {
        hane.scene.rotation.x = 0;
        hane.scene.rotation.y = (3 * Math.PI) / 4;
        hane.scene.rotation.z = 0;
        hane.scene.position.x = 0.7;
        hane.scene.position.y = -0.7;
        hane.scene.position.z = 1;
      } else {
        hane.scene.rotation.x = 0;
        hane.scene.rotation.y = (7 * Math.PI) / 8;
        hane.scene.rotation.z = 0;
        hane.scene.position.x = 0;
        hane.scene.position.y = -0.7;
        hane.scene.position.z = 1;
      }
      wave.stop();
      think.play();
    } else if (t >= (-9 * window.innerHeight) / 2) {
      hane.scene.rotation.x += 0.03;
      hane.scene.rotation.y += 0.03;
      hane.scene.rotation.z = 0;
      hane.scene.position.x = 0;
      hane.scene.position.y = 0;
      hane.scene.position.z = 0;
      think.stop();
      lebron.stop();
    } else if (t >= (-11 * window.innerHeight) / 2) {
      hane.scene.rotation.x = 0;
      hane.scene.rotation.y = Math.PI;
      hane.scene.rotation.z = 0;
      hane.scene.position.x = 0;
      hane.scene.position.y = -0.5;
      hane.scene.position.z = 0;
      flower.scene.position.z = 3;
      flower.scene.position.y = 0;
      lebron.play();
    } else if (t >= (-13 * window.innerHeight) / 2) {
      hane.scene.rotation.x = 0;
      hane.scene.rotation.y = Math.PI;
      hane.scene.rotation.z = Math.PI / 2;
      hane.scene.position.x = 0;
      hane.scene.position.y = 0.5;
      hane.scene.position.z = -1;
      flower.scene.position.x = 0;
      flower.scene.position.y = -0.8;
      flower.scene.position.z = 0;
      slot.scene.position.z = 3;
      lebron.play();
      flowerSpin = true;
    } else {
      if (window.innerWidth / window.innerHeight >= 85 / 70) {
        hane.scene.rotation.x = 0;
        hane.scene.rotation.y = Math.PI;
        hane.scene.rotation.z = 0;
        hane.scene.position.x = 0;
        hane.scene.position.y = 0.5;
        hane.scene.position.z = -1;
        flower.scene.position.x = 2.7;
        flower.scene.position.y = -1;
        flower.scene.position.z = -2;
        slot.scene.rotation.y = Math.PI;
        slot.scene.position.x = -1;
        slot.scene.position.y = -1;
        slot.scene.position.z = 0;
      } else {
        hane.scene.rotation.x = 0;
        hane.scene.rotation.y = Math.PI;
        hane.scene.rotation.z = 0;
        hane.scene.position.x = 0;
        hane.scene.position.y = 0.5;
        hane.scene.position.z = -1;
        flower.scene.position.x = 0.7;
        flower.scene.position.y = -1;
        flower.scene.position.z = -2;
        slot.scene.rotation.y = Math.PI;
        slot.scene.position.x = 0;
        slot.scene.position.y = -1;
        slot.scene.position.z = 0;
      }
      lebron.stop();
      flowerSpin = false;
    }
  }
}

document.body.onscroll = moveCamera;
