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