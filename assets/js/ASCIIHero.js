import * as THREE from "https://unpkg.com/three@0.136.0/build/three.module.js";
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.136.0/examples/jsm/loaders/GLTFLoader.js';
import { AsciiEffect } from 'https://threejs.org/examples/jsm/effects/AsciiEffect.js';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'https://cdn.jsdelivr.net/npm/three-object-mtl-loader@1.0.2/loaders/OBJLoader.js';

// Create and export the scene
export const createOBJScene = (asset) => {
    const scene = new THREE.Scene();

    const objLoader = new OBJLoader(THREE);
    objLoader.load(
        asset,
        obj => processOBJ(scene, obj),
        xhr => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        }
    );

    return scene;
};

function processOBJ( scene, obj ) {
    const box = new THREE.Box3( ).setFromObject( obj );
    const c = box.getCenter( new THREE.Vector3( ) );
    const size = box.getSize( new THREE.Vector3( ) );
    obj.position.set( -c.x, 0, -c.z ); // center the scene
    scene.add( obj );
}

function processGLTF( scene, gltf ) {
	const box = new THREE.Box3( ).setFromObject( gltf.scene );
	const c = box.getCenter( new THREE.Vector3( ) );
	const size = box.getSize( new THREE.Vector3( ) );

    gltf.scene.position.set( -c.x, 0, -c.z ); // center the scene
	scene.add( gltf.scene );
}

export const createGLTFScene = (asset) => {
    const scene = new THREE.Scene();

    const gltfLoader = new GLTFLoader();
    gltfLoader.load(
        asset,
        gltf => processGLTF(scene, gltf),
        xhr => {
            console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        }
    );

    return scene;
};    

// Create and export the light
export const createLight = (x, y, z) => {
    const light = new THREE.HemisphereLight(0xffffff, 0x000000, 1);
    light.position.set(x, y, z);
    return light;
};

// Create and export the camera
export const createCamera = (widthRatio, heightRatio, camera_zOffset) => {
    const sizes = {
        width: window.innerHeight * widthRatio,
        height: window.innerHeight * heightRatio
    };
    
    const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
    camera.setViewOffset( sizes.width, sizes.height, 25, -175, sizes.width, sizes.height ); // Set camera offset for ASCII effect (very specific)
    camera.position.z = camera_zOffset;
    return camera;
};

// Create and export the renderer and effect
export const createASCIIRenderer = (widthRatio, heightRatio, canvasDOM) => {
    const sizes = {
        width: window.innerHeight * widthRatio,
        height: window.innerHeight * heightRatio
    };

    const canvas = document.getElementById(canvasDOM);
    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height);

    const effect = new AsciiEffect(renderer, ' .:-=+*#%@', { scale: 1.05, resolution: 0.35, invert: true });
    effect.setSize(sizes.width, sizes.height);
    effect.domElement.style.color = 'white';
    canvas.appendChild(effect.domElement);
    
    return { renderer, effect };
};

export const createRenderer = (widthRatio, heightRatio, canvasDOM) => {
    const sizes = {
        width: window.innerHeight * widthRatio,
        height: window.innerHeight * heightRatio
    };

    const canvas = document.getElementById(canvasDOM);
    const renderer = new THREE.WebGLRenderer( {alpha: true } );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(sizes.width, sizes.height);
    canvas.appendChild(renderer.domElement);

    return { renderer };
};


// Setup and export the controls
export const setupControls = (camera, domElement, autoRotateSpeed) => {
    const controls = new OrbitControls(camera, domElement);
    controls.enableDamping = true;
    controls.autoRotate = true;
    controls.minPolarAngle = Math.PI / 2; // disable looking below horizon
    controls.maxPolarAngle = Math.PI / 2; // disable looking above horizon
    controls.autoRotateSpeed = autoRotateSpeed;
    controls.enablePan = false;
    controls.enableZoom = false;
    return controls;
};

// Handle window resize and export the function
export const onEffectWindowResize = (widthRatio, heightRatio, camera, renderer, effect) => {
    const sizes = {
        width: window.innerHeight * widthRatio,
        height: window.innerHeight * heightRatio
    };

    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    renderer.setSize(sizes.width, sizes.height);
    effect.setSize(sizes.width, sizes.height);
};

// Export the main rendering loop function
export const effectTick = (controls, effect, scene, camera) => {
    controls.update();
    effect.render(scene, camera);
    window.requestAnimationFrame(() => effectTick(controls, effect, scene, camera));
};

export const tick = (controls, renderer, scene, camera) => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(() => tick(controls, renderer, scene, camera));
};