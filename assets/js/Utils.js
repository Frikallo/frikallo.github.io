//load and render pdf
function loadPdf(pdfUrl, pdfContainer) {
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

//loadPdf('assets/pdf/resume.pdf', document.querySelector('.resume-container'));