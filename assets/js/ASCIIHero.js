import * as THREE from "https://unpkg.com/three@0.136.0/build/three.module.js";
import { AsciiEffect } from 'https://threejs.org/examples/jsm/effects/AsciiEffect.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three-object-mtl-loader@1.0.2/loaders/OBJLoader.js';

const scene = new THREE.Scene();

const objLoader = new OBJLoader(THREE);
objLoader.load(
    'assets/misc/objs/Moon.obj',
    obj => scene.add(obj),
    xhr => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
    }
);

//sizes
const sizes = {
    width: window.innerHeight * 0.5,
    height: window.innerHeight * 0.5
}

//light
const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
light.position.set(0, 15, 15);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
scene.add(camera);

//Renderer
const canvas = document.getElementById("heroCanvas");
const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setSize(sizes.width, sizes.height);

const effect = new AsciiEffect(renderer, ' .:-+*=%@#', { invert: true });
effect.setSize(sizes.width, sizes.height);
effect.domElement.style.color = 'white';
canvas.appendChild(effect.domElement);
effect.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, effect.domElement);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 20;
controls.enablePan = false;
controls.enableZoom = false;

//Resize
window.addEventListener('resize', () => {
    //Update sizes
    sizes.width = window.innerHeight * 0.5;
    sizes.height = window.innerHeight * 0.5;

    //Update camera
    camera.aspect = sizes.width / sizes.height;
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