<script setup lang="ts">
import * as THREE from "three";
import { ref, onMounted } from "vue";

const width = ref(0);
const height = ref(0);

onMounted(() => {
  const myElement = document.getElementById("container");
  if (myElement !== null) {
    width.value = myElement.offsetWidth;
    height.value = myElement.offsetHeight;
  }

  init();
  animate();
});

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer();

function init() {
  renderer.setSize(width.value, height.value);
  document.body.appendChild(renderer.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

onMounted(() => {
  const container = ref<HTMLElement | null>(null);
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);
  camera.position.z = 5;
  if (container.value !== null) {
    container.value.appendChild(renderer.domElement);
  }
});
</script>

<template>
  <div ref="container" id="container"></div>
</template>

<style>
#container {
  height: 100vh;
}
</style>
