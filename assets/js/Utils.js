export function addProject(name, img, descEN, descFR, tag, link) {
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

export function addBlogLink(imgLink, titleEG, titleFR, descEN, descFR, date, tag1, tag2, tag3) {
    const template = `<div class="blog-item">
    <a class="blog-maximize" href="assets/pdf/resume.pdf" target="_blank">
        <img class="blog-thumbnail" src="IMG" alt=""/>
    </a>
    <p class="blog-title">
        <span id="EN">TITLE-EG</span>
        <span id="FR">TITLE-FR</span>
        <span class="blog-date">DATE</span>
    </p>
    <p class="blog-description">
        <span id="EN">DESC-EN</span>
        <span id="FR">DESC-FR</span>
    </p>
    <p class="blog-tags">
        <span class="tag">TAG1</span>
        <span class="tag">TAG2</span>
        <span class="tag">TAG3</span>
    </p>
    </div>`
    let result = template.replace(/IMG/g, imgLink).replace(/TITLE-EG/g, titleEG).replace(/TITLE-FR/g, titleFR).replace(/DESC-EN/g, descEN).replace(/DESC-FR/g, descFR).replace(/DATE/g, date).replace(/TAG1/g, tag1).replace(/TAG2/g, tag2).replace(/TAG3/g, tag3);
    const carrossel = document.querySelector('.blog-carrossel');
    carrossel.innerHTML = result + carrossel.innerHTML;
}

export function loadPdf(pdfUrl, pdfContainer) {
    var pdfjsLib = window['pdfjs-dist/build/pdf'];
    pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.9.179/pdf.worker.min.js';
    var loadingTask = pdfjsLib.getDocument(pdfUrl);
    loadingTask.promise.then(function (pdf) {
        var pageNumber = 1;
        pdf.getPage(pageNumber).then(function (page) {
            var scale = 1.5;
            var viewport = page.getViewport({ scale: scale, });
            var canvas = document.createElement('canvas');
            var context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            var renderContext = {
                canvasContext: context,
                viewport: viewport,
            };
            var renderTask = page.render(renderContext);
            renderTask.promise.then(function () {
                pdfContainer.appendChild(canvas);
            });
        });
    });
}

export function get_time() {
    let options = {
        timeZone: 'America/Vancouver',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    },
    formatter = new Intl.DateTimeFormat([], options);

    let dom_time = document.querySelector('.time');
    dom_time.textContent = formatter.format(new Date());
}


export function scrollTo(element) {
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: element.offsetTop
    });
}

export function updateLanguage(newLanguage) {
    let elements = document.querySelectorAll('span');
    elements.forEach(element => {
        if ((element.id === 'FR' && newLanguage === '🇺🇸') || (element.id === 'EN' && newLanguage === '🇫🇷')) {
            element.classList.add('hidden');
        } else {
            element.classList.remove('hidden');
        }
    });
}