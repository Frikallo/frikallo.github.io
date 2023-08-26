import { switchButton, updateLanguage } from "./LanguageSwitch.js";
import { createScene, createLight, createCamera, createRenderer, setupControls, onWindowResize, tick } from "./ASCIIHero.js";
import { addProject, loadPdf, get_time } from "./Utils.js";
import { Item } from './interactiveItemModule.js';

// Set up timezone updater and start it for about section
setInterval(get_time, 1000);

// Set up hero
const scene = createScene();
const light = createLight();
const camera = createCamera();
const { renderer, effect } = createRenderer();
const controls = setupControls(camera, effect.domElement);
window.addEventListener('resize', () => onWindowResize(camera, renderer, effect));

scene.add(light);
scene.add(camera);

tick(controls, effect, scene, camera);

// Create stars for hero background with particles.js
particlesJS.load("particles-js", 'assets/misc/particles.json');


// Add projects to grid
addProject('YAKbot', 
            '<img src="assets/img/YAKbot.svg" alt=""/>', 
            'YAKbot is a collection of AI models based on image generation, analysis, and processing; all wrapped into one Discord Bot. YAKbot\'s out-of-the-box commands range from image generation with VQGAN+CLIP or guided diffusion to image analysis and captioning with personality.', 
            'YAKbot est une collection de modèles d\'IA basés sur la génération, l\'analyse et le traitement d\'images; le tout enveloppé dans un seul bot Discord. Les commandes prêtes à l\'emploi de YAKbot vont de la génération d\'images avec VQGAN+CLIP ou la diffusion guidée à l\'analyse et à la légende d\'images avec personnalité.',
            'Discord Bot',  
            'https://github.com/Frikallo/YAKbot'
);
addProject('SonicSynth', 
            '<img src="assets/img/SonicSynth.svg" alt=""/>', 
            'SonicSynth is an audio synthesis library that provides a high-level interface for generating and manipulating various types of sounds. It allows users to create custom sound waves, apply digital signal processing (DSP) effects, and export the synthesized audio data to various audio file formats.', 
            'SonicSynth est une bibliothèque de synthèse audio qui fournit une interface de haut niveau pour générer et manipuler divers types de sons. Il permet aux utilisateurs de créer des ondes sonores personnalisées, d\'appliquer des effets de traitement numérique du signal (DSP) et d\'exporter les données audio synthétisées vers différents formats de fichiers audio.',
            'Audio Synthesis', 
            'https://github.com/Frikallo/SonicSynth'
);
addProject('footprint', 
            '<img src="assets/img/footprint.svg" alt=""/>', 
            'A python OSINT tool to discover and analyze the digital footprint of a targets email or username across millions of sites.', 
            'Un outil OSINT python pour découvrir et analyser l\'empreinte sur ligne d\'un e-mail ou d\'un nom d\'utilisateur cible sur des millions de sites.',
            'OSINT', 
            'https://github.com/Frikallo/footprint'
);
addProject('stargazerz', 
            '<img src="assets/img/stargazerz.svg" alt=""/>', 
            'Instantly Retrieve Email Addresses and Usernames of Stargazers from Designated Repositories, Achieving Unparalleled Speed and Efficiency - All Without the Need for an API Key.', 
            'Récupérez instantanément les adresses e-mail et les noms d\'utilisateur des Stargazers des dépôts désignés, atteignant une vitesse et une efficacité inégalées - le tout sans avoir besoin d\'une clé API.',
            'Webscraping', 
            'https://github.com/Frikallo/stargazerz'
);
addProject('frikallo.io', 
            '<img src="assets/img/frikallo-io.svg" alt=""/>', 
            'A personal portfolio website for myself build on HTML, CSS, JS paired with three.js, particles.js and gsap.js', 
            'Un site web de portfolio personnel pour moi-même construit sur HTML, CSS, JS associé à three.js, particles.js et gsap.js',
            'Web', 
            'https://github.com/Frikallo/frikallo.github.io'
);
addProject('MISST', 
            '<img src="assets/img/MISST.svg" alt=""/>', 
            'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 
            'Un outil de séparation des sources musicales à interface graphique locale construit sur Tkinter et demucs servant de joueur Stem gratuit et open source.',
            'Audio', 
            'https://github.com/Frikallo/MISST'
);

// Get a NodeList of elements with class '.grid__item > .grid__item-img'
const matches = document.querySelectorAll('.grid__item > .grid__item-img');

// Loop through each element and create an Item instance
for (const match of matches) {
    new Item(match, match.id);
}

// Load resume pdf
loadPdf('assets/pdf/resume.pdf', document.querySelector('.resume-container'));

// Set up language switcher
switchButton.addEventListener('click', () => {
    let curLanguage = document.querySelector('.language-switch-button').textContent;
    let newLanguage = curLanguage === '🇺🇸' ? '🇫🇷' : '🇺🇸';
    document.querySelector('.language-switch-button').textContent = newLanguage;
    updateLanguage(newLanguage);
});
updateLanguage('🇺🇸');