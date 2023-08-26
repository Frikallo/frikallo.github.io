function addGridItem(name, img, descEN, descFR, tag, link) {
    const template = `<div class="grid__item" id="NAME">
    <a href="LINK" target=”_blank” class="grid__item-img" id="NAME">
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
            '<img src="assets/img/MISST.svg" alt=""/>', 
            'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 
            'Un outil de séparation des sources musicales à interface graphique locale construit sur Tkinter et demucs servant de joueur Stem gratuit et open source.',
            'Audio', 
            'https://github.com/Frikallo/MISST'
            );
addGridItem('frikallo.io', 
            '<img src="assets/img/frikallo-io.svg" alt=""/>', 
            'A personal portfolio website for myself build on HTML, CSS, JS paired with three.js, particles.js and gsap.js', 
            'Un site web de portfolio personnel pour moi-même construit sur HTML, CSS, JS associé à three.js, particles.js et gsap.js',
            'Web', 
            'https://github.com/Frikallo/frikallo.github.io'
);
addGridItem('stargazerz', 
            '<img src="assets/img/stargazerz.svg" alt=""/>', 
            'Instantly Retrieve Email Addresses and Usernames of Stargazers from Designated Repositories, Achieving Unparalleled Speed and Efficiency - All Without the Need for an API Key.', 
            'Récupérez instantanément les adresses e-mail et les noms d\'utilisateur des Stargazers des dépôts désignés, atteignant une vitesse et une efficacité inégalées - le tout sans avoir besoin d\'une clé API.',
            'Webscraping', 
            'https://github.com/Frikallo/stargazerz'
);
addGridItem('footprint', 
            '<img src="assets/img/footprint.svg" alt=""/>', 
            'A python OSINT tool to discover and analyze the digital footprint of a targets email or username across millions of sites.', 
            'Un outil OSINT python pour découvrir et analyser l\'empreinte sur ligne d\'un e-mail ou d\'un nom d\'utilisateur cible sur des millions de sites.',
            'OSINT', 
            'https://github.com/Frikallo/footprint'
);
addGridItem('footprint', 
            '<img src="assets/img/footprint.svg" alt=""/>', 
            'A python OSINT tool to discover and analyze the digital footprint of a targets email or username across millions of sites.', 
            'Un outil OSINT python pour découvrir et analyser l\'empreinte sur ligne d\'un e-mail ou d\'un nom d\'utilisateur cible sur des millions de sites.',
            'OSINT', 
            'https://github.com/Frikallo/footprint'
);
addGridItem('footprint', 
            '<img src="assets/img/footprint.svg" alt=""/>', 
            'A python OSINT tool to discover and analyze the digital footprint of a targets email or username across millions of sites.', 
            'Un outil OSINT python pour découvrir et analyser l\'empreinte sur ligne d\'un e-mail ou d\'un nom d\'utilisateur cible sur des millions de sites.',
            'OSINT', 
            'https://github.com/Frikallo/footprint'
);