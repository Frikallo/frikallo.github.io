import {
    createOBJScene,
    createGLTFScene,
    createLight,
    createCamera,
    createRenderer,
    createASCIIRenderer,
    setupControls,
    onEffectWindowResize,
    tick,
    effectTick
} from "./ASCIIHero.js";
import { addProject, addBlogLink, loadPdf, get_time, scrollTo, updateLanguage } from "./Utils.js";
import { Item } from './interactiveItemModule.js';

// Set up timezone updater and start it for about section
setInterval(get_time, 1000);

// Set up hero
const sceneSize = {
    width: 0.5,
    height: 0.5
};
const scene = createGLTFScene('assets/misc/gltfs/moon.gltf');
const light = createLight(0, 15, 15);
const camera = createCamera(sceneSize['width'], sceneSize['height'], 13);
const { renderer, effect } = createASCIIRenderer(sceneSize['width'], sceneSize['height'], 'heroCanvas');
const controls = setupControls(camera, effect.domElement, 3);
window.addEventListener('resize', () => onEffectWindowResize(sceneSize['width'], sceneSize['height'], camera, renderer, effect));
scene.add(light);
scene.add(camera);

effectTick(controls, effect, scene, camera);

/*const aboutScene = createGLTFScene('assets/misc/gltfs/desktop_pc/scene.gltf');
aboutScene.background = null;
const aboutLight = createLight(0, 0, 0);
const aboutCamera = createCamera(1, 0.5, 15);
const aboutRenderer = createRenderer(1, 0.5, 'aboutCanvas');
const aboutControls = setupControls(aboutCamera, document.getElementById('aboutCanvas'), 5);

aboutScene.add(aboutLight);
aboutScene.add(aboutCamera);

tick(aboutControls, aboutRenderer.renderer, aboutScene, aboutCamera);*/

// Create stars for hero background with particles.js
particlesJS.load("particles-js", 'assets/misc/particles.json');


// Add projects to grid
addProject('YAKbot',
    '<img src="assets/img/YAKbot.png" alt="" loading="lazy"/>',
    'YAKbot is a collection of AI models based on image generation, analysis, and processing; all wrapped into one Discord Bot. YAKbot\'s out-of-the-box commands range from image generation with VQGAN+CLIP or guided diffusion to image analysis and captioning with personality.',
    'YAKbot est une collection de modèles d\'IA basés sur la génération, l\'analyse et le traitement d\'images; le tout enveloppé dans un seul bot Discord. Les commandes prêtes à l\'emploi de YAKbot vont de la génération d\'images avec VQGAN+CLIP ou la diffusion guidée à l\'analyse et à la légende d\'images avec personnalité.',
    'Discord Bot',
    'https://github.com/Frikallo/YAKbot'
);
addProject('SonicSynth',
    '<img src="assets/img/SonicSynth.png" alt="" loading="lazy"/>',
    'SonicSynth is an audio synthesis library that provides a high-level interface for generating and manipulating various types of sounds. It allows users to create custom sound waves, apply digital signal processing (DSP) effects, and export the synthesized audio data to various audio file formats.',
    'SonicSynth est une bibliothèque de synthèse audio qui fournit une interface de haut niveau pour générer et manipuler divers types de sons. Il permet aux utilisateurs de créer des ondes sonores personnalisées, d\'appliquer des effets de traitement numérique du signal (DSP) et d\'exporter les données audio synthétisées vers différents formats de fichiers audio.',
    'Audio Synthesis',
    'https://github.com/Frikallo/SonicSynth'
);
addProject('footprint',
    '<img src="assets/img/footprint.png" alt="" loading="lazy"/>',
    'A python OSINT tool to discover and analyze the digital footprint of a targets email or username across millions of sites.',
    'Un outil OSINT python pour découvrir et analyser l\'empreinte sur ligne d\'un e-mail ou d\'un nom d\'utilisateur cible sur des millions de sites.',
    'OSINT',
    'https://github.com/Frikallo/footprint'
);
addProject('stargazerz',
    '<img src="assets/img/stargazerz.png" alt="" loading="lazy"/>',
    'Instantly Retrieve Email Addresses and Usernames of Stargazers from Designated Repositories, Achieving Unparalleled Speed and Efficiency - All Without the Need for an API Key.',
    'Récupérez instantanément les adresses e-mail et les noms d\'utilisateur des Stargazers des dépôts désignés, atteignant une vitesse et une efficacité inégalées - le tout sans avoir besoin d\'une clé API.',
    'Webscraping',
    'https://github.com/Frikallo/stargazerz'
);
addProject('frikallo.io',
    '<img src="assets/img/frikallo-io.png" alt="" loading="lazy"/>',
    'A personal portfolio website for myself build on HTML, CSS, JS paired with three.js, particles.js and gsap.js',
    'Un site web de portfolio personnel pour moi-même construit sur HTML, CSS, JS associé à three.js, particles.js et gsap.js',
    'Web',
    'https://github.com/Frikallo/frikallo.github.io'
);
addProject('MISST',
    '<img src="assets/img/MISST.png" alt="" loading="lazy"/>',
    'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player',
    'Un outil de séparation des sources musicales à interface graphique locale construit sur Tkinter et demucs servant de joueur Stem gratuit et open source.',
    'Audio',
    'https://github.com/Frikallo/MISST'
);

for (let i = 0; i <= 10; i++) {
    addBlogLink(`assets/img/blog/no-image.png`,
        'blog/post1',
        'Title',
        'Title',
        'Description',
        'Description',
        '08/30/2023',
        '#Tag1',
        '#Tag2',
        '#Tag3'
    );
}

// Get a NodeList of elements with class '.grid__item > .grid__item-img'
const matches = document.querySelectorAll('.grid__item > .grid__item-img');

// Loop through each element and create an Item instance
for (const match of matches) {
    new Item(match, match.id);
}

// Load resume pdf
loadPdf('assets/pdf/resume.pdf', document.querySelector('.resume'));

// Add on-scroll animations
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        } else {
            entry.target.classList.remove('animate');
        }
    });
});

const elements = document.querySelectorAll('.animate-on-scroll');
elements.forEach(element => {
    observer.observe(element);
});

// Set up language switcher
const switchButtons = document.querySelectorAll('.language-switch-button');
switchButtons.forEach(switchButton => {
    switchButton.addEventListener('click', () => {
        let curLanguage = switchButton.textContent;
        let newLanguage = curLanguage === '🇬🇧' ? '🇫🇷' : '🇬🇧';
        switchButton.textContent = newLanguage;
        updateLanguage(newLanguage);
    });
});
updateLanguage('🇬🇧');

// Set up scroll to section buttons
document.querySelectorAll('.home-button').forEach(item => {
    item.addEventListener('click', event => {
        scrollTo(document.querySelector('.nav-container'));
    });
});

document.querySelectorAll('.about-button').forEach(item => {
    item.addEventListener('click', event => {
        scrollTo(document.querySelector('.about-container'));
    });
});

document.querySelectorAll('.blog-button').forEach(item => {
    item.addEventListener('click', event => {
        scrollTo(document.querySelector('.blog-container'));
    });
});

document.querySelectorAll('.projects-button').forEach(item => {
    item.addEventListener('click', event => {
        scrollTo(document.querySelector('.projects-container'));
    });
});

document.querySelectorAll('.resume-button').forEach(item => {
    item.addEventListener('click', event => {
        scrollTo(document.querySelector('.resume-container'));
    });
});

document.querySelectorAll('.contact-button').forEach(item => {
    item.addEventListener('click', event => {
        scrollTo(document.querySelector('.contact-info'));
    });
});

// Set up sticky navbar
window.onscroll = function () { stickyNavbar() };
var navbar = document.querySelector('.nav');
var sticky = navbar.offsetTop;
function stickyNavbar() {
    if (window.scrollY >= sticky) {
        navbar.style.setProperty('--nav_opacity', 1);
    } else {
        navbar.style.setProperty('--nav_opacity', 0);
    };
}
stickyNavbar();

const hamburger = document.querySelector('.hamburger');
const hamburgerInner = document.querySelector('.hamburger-inner');
hamburger.addEventListener('click', () => {
    if (hamburgerInner.style.opacity == 1) {
        hamburgerInner.style.pointerEvents = 'none';
        hamburgerInner.style.opacity = 0;
    } else {
        hamburgerInner.style.pointerEvents = 'all';
        hamburgerInner.style.opacity = 1;
    }
});

// Set up contact form
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(contactForm);
    const name = encodeURI(formData.get('fname'));
    const email = encodeURI(formData.get('email'));
    const message = encodeURI(formData.get('message'));
    fetch('https://script.google.com/macros/s/AKfycbxnbXGzwoGM30QRAswH0NcKAR6ubpHhKjCIyIL4ZkwW9JU-IcoZMxBAvGKdk7CkEekJvg/exec', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `fname=${name}&email=${email}&message=${message}`,
    }).then((response) => {
        if (response.status == 200) {
            contactForm.reset();
            document.querySelector('.contact-form-success').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.contact-form-success').style.display = 'none';
            }, 5000);
        } else {
            document.querySelector('.contact-form-error').style.display = 'block';
            setTimeout(() => {
                document.querySelector('.contact-form-error').style.display = 'none';
            }, 5000);
        }
    });
});

// Set up blog carrossel
const blogCarrossel = document.querySelector('.blog-carrossel');
const leftArrow = document.querySelector('.scroll-left-button');
const rightArrow = document.querySelector('.scroll-right-button');
const leftSVG = document.querySelector('.scroll-left-button svg');
const rightSVG = document.querySelector('.scroll-right-button svg');

let x = 0;
let mx = 0;

function checkScrollBoundaries() {
    if (blogCarrossel.scrollLeft <= 0) {
        leftSVG.style.fill = '#808080';
        leftArrow.style.pointerEvents = 'none';
    } else {
        leftSVG.style.fill = '#fff';
        leftArrow.style.pointerEvents = 'all';
    }
    if (blogCarrossel.scrollLeft >= blogCarrossel.scrollWidth - blogCarrossel.clientWidth) {
        rightSVG.style.fill = '#808080';
        rightArrow.style.pointerEvents = 'none';
    } else {
        rightSVG.style.fill = '#fff';
        rightArrow.style.pointerEvents = 'all';
    }
}
setInterval(checkScrollBoundaries, 100);

rightArrow.addEventListener('click', function (e) {
    x = blogCarrossel.clientWidth / 2 + blogCarrossel.scrollLeft + 0;
    blogCarrossel.scroll({
        left: x,
        behavior: 'smooth',
    });
});

leftArrow.addEventListener('click', function (e) {
    x = blogCarrossel.clientWidth / 2 - blogCarrossel.scrollLeft + 0;
    blogCarrossel.scroll({
        left: -x,
        behavior: 'smooth',
    });
});

const mousemoveHandler = (e) => {
    const mx2 = e.pageX - blogCarrossel.offsetLeft;
    if (mx > 0) {
        blogCarrossel.scrollLeft = blogCarrossel.sx + mx - mx2;
    }
};

const mousedownHandler = (e) => {
    blogCarrossel.sx = blogCarrossel.scrollLeft;
    mx = e.pageX - blogCarrossel.offsetLeft;
    blogCarrossel.classList.add('dragging');
};

const mouseupHandler = () => {
    mx = 0;
    blogCarrossel.classList.remove('dragging');
};

blogCarrossel.addEventListener('mousemove', mousemoveHandler);
blogCarrossel.addEventListener('mousedown', mousedownHandler);
blogCarrossel.addEventListener('mouseup', mouseupHandler);
blogCarrossel.addEventListener('mouseleave', mouseupHandler);