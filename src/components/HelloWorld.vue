<script setup lang="ts">
import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onBeforeUnmount, onMounted } from "vue";

// Scene
const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);

const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
});

const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

const light = new THREE.PointLight(0xffffff, 100, 100);
light.position.set(0, 10, 10);
scene.add(light);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  45,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 0, 20);

let canvas: HTMLCanvasElement | null = null;
let renderer: THREE.WebGLRenderer | null = null;
let controls: OrbitControls | null = null;

onMounted(() => {
  canvas = document.getElementById("sphere") as HTMLCanvasElement;
  if (canvas) {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(sizes.width, sizes.height);
    renderer.render(scene, camera);

    controls = new OrbitControls(camera, canvas);
    controls.enableDamping = true;
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 5;
    loop();

    const t1 = gsap.timeline({ defaults: { duration: 1 } });
    t1.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
    t1.fromTo("h1", { y: "-250%" }, { y: "0%" });
    t1.fromTo(".title", { opacity: 0 }, { opacity: 1 });

    window.addEventListener("resize", updateSize);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", updateSize);
});

function updateSize() {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateMatrixWorld();
  renderer?.render(scene, camera);
}

const loop = () => {
  controls.update();
  renderer?.render(scene, camera);
  window.requestAnimationFrame(loop);
};
</script>

<template>
  <h1 class="heading">Explore</h1>
  <canvas id="sphere"></canvas>
  <h2 class="title">Give it a spin</h2>
</template>

<style scoped>
.heading {
  position: absolute;
  left: 50%;
  top: 5%;
  transform: translate(-50%, -5%);
  color: white;
  z-index: 1;
}

#sphere {
  position: absolute;
  left: 50%;
  top: 25%;
  transform: translate(-50%, -25%);
}

.title {
  position: absolute;
  left: 50%;
  top: 80%;
  transform: translate(-50%, -80%);
  font-size: medium;
}
</style>
