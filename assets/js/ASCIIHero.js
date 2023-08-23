import * as THREE from "https://unpkg.com/three@0.136.0/build/three.module.js";
import { AsciiEffect } from 'https://threejs.org/examples/jsm/effects/AsciiEffect.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(5, 100, 100);
const material = new THREE.MeshLambertMaterial({ 
    color: "#00ff83",
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//sizes
const sizes = {
    width: window.innerHeight * 0.5,
    height: window.innerHeight * 0.5
}

//light
const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
light.position.set(0, 10, 10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

//Renderer
const canvas = document.getElementById("heroCanvas");
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height);

const effect = new AsciiEffect( renderer, ' .:-+*=%@#', { invert: true } );
effect.setSize(sizes.width, sizes.height);
effect.domElement.style.color = 'white';
canvas.appendChild(effect.domElement);
effect.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, effect.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.enablePan = false;
controls.enableZoom = false;

//Resize
window.addEventListener('resize', () => {
    //Update sizes
    sizes.width = window.innerHeight * 0.5;
    sizes.height = window.innerHeight * 0.5;

    //Update camera
    camera.aspect = sizes.width/sizes.height;
    camera.updateProjectionMatrix();

    //Update renderer
    renderer.setSize(sizes.width, sizes.height);
    effect.setSize(sizes.width, sizes.height);
});

const tick = () => {
    controls.update();
    effect.render(scene, camera);
    window.requestAnimationFrame(tick);
}
tick();