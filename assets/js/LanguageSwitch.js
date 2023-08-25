const switchButton = document.querySelector('.language-switch-button');

switchButton.addEventListener('click', () => {
    let curLanguage = document.querySelector('.language-switch-button').textContent;
    let newLanguage = curLanguage === '🇨🇦' ? '🇫🇷' : '🇨🇦';
    document.querySelector('.language-switch-button').textContent = newLanguage;
    updateLanguage(newLanguage);
});

function updateLanguage(newLanguage) {
    let elements = document.querySelectorAll('span');
    elements.forEach(element => {
        if ((element.id === 'FR' && newLanguage === '🇨🇦') || (element.id === 'EN' && newLanguage === '🇫🇷')) {
            element.classList.add('hidden');
        }
        else {
            element.classList.remove('hidden');
        }
    });
}

updateLanguage('🇨🇦');