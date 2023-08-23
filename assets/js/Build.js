function addGridItem(name, img, desc, tag, link) {
    const template = `<div class="grid__item" id="NAME">
    <a href="LINK" class="grid__item-img" id="NAME">
        <div class="grid__item-img-deco"></div>
        IMG
    </a>
    <p class="grid__item-label">DESC</p>
    <span class="grid__item-tag">TAG</span>
    </div>`;
    let result = template.replace(/NAME/g, name).replace(/IMG/g, img).replace(/DESC/g, desc).replace(/TAG/g, tag).replace(/LINK/g, link);
    const grid = document.querySelector('.projects-grid');
    grid.innerHTML = result + grid.innerHTML;
}

addGridItem('MISST', '', 'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 'Python', 'projects/MISST');
addGridItem('MISST', '', 'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 'Python', 'projects/MISST');
addGridItem('MISST', '', 'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 'Python', 'projects/MISST');
addGridItem('MISST', '', 'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 'Python', 'projects/MISST');
addGridItem('MISST', '', 'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 'Python', 'projects/MISST');
addGridItem('MISST', '', 'A local GUI music source separation tool built on Tkinter and demucs serving as a free and open source Stem Player', 'Python', 'projects/MISST');