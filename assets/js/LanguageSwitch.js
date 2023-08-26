export const switchButton = document.querySelector('.language-switch-button');

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