function addGridItem(name, img, descEN, descFR, tag, link) {
    const template = `<div class="grid__item" id="NAME">
    <a href="LINK" class="grid__item-img" id="NAME">
        <div class="grid__item-img-deco"></div>
        IMG
    </a>
    <p class="grid__item-label">                    
        <span id="EN">DESC_EN</span>
        <span id="FR">DESC_FR</span></p>
    <span class="grid__item-tag">TAG</span>
    </div>`;
    let result = template.replace(/NAME/g, name).replace(/IMG/g, img).replace(/DESC_EN/g, descEN).replace(/DESC_FR/g, descFR).replace(/TAG/g, tag).replace(/LINK/g, link);
    const grid = document.querySelector('.projects-grid');
    grid.innerHTML = result + grid.innerHTML;
}

addGridItem('MISST', 
            '', 
            'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 
            'Un outil de séparation des sources musicales à interface graphique locale construit sur Tkinter et demucs servant de joueur Stem gratuit et open source.',
            'Python', 
            'projects/MISST'
            );
addGridItem('MISST', 
            '', 
            'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 
            'Un outil de séparation des sources musicales à interface graphique locale construit sur Tkinter et demucs servant de joueur Stem gratuit et open source.',
            'Python', 
            'projects/MISST'
);
addGridItem('MISST', 
            '', 
            'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 
            'Un outil de séparation des sources musicales à interface graphique locale construit sur Tkinter et demucs servant de joueur Stem gratuit et open source.',
            'Python', 
            'projects/MISST'
);
addGridItem('MISST', 
            '', 
            'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 
            'Un outil de séparation des sources musicales à interface graphique locale construit sur Tkinter et demucs servant de joueur Stem gratuit et open source.',
            'Python', 
            'projects/MISST'
);
addGridItem('MISST', 
            '', 
            'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 
            'Un outil de séparation des sources musicales à interface graphique locale construit sur Tkinter et demucs servant de joueur Stem gratuit et open source.',
            'Python', 
            'projects/MISST'
);
addGridItem('MISST', 
            '', 
            'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 
            'Un outil de séparation des sources musicales à interface graphique locale construit sur Tkinter et demucs servant de joueur Stem gratuit et open source.',
            'Python', 
            'projects/MISST'
);