// Linear interpolation function
const lerp = (a, b, n) => (1 - n) * a + n * b;

// Gets the mouse position
const getMousePos = e => {
    return {
        x: e.clientX,
        y: e.clientY
    };
};

let mousepos = { x: 0, y: 0 };

// Listen for mousemove events and update 
// 'mousepos' with the current mouse position
window.addEventListener('mousemove', ev => {
    // Save the mouse position
    mousepos = getMousePos(ev);
});

// Generates a random string of given length from characters
function getRandomString(length, characters) {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
}

class Item {
    constructor(DOM_el, characters) {
        this.DOM = {
            el: DOM_el,
            deco: DOM_el.querySelector('.grid__item-img-deco')
        };
        this.characters = characters;
        this.renderedStyles = {
            x: { previous: 0, current: 0, amt: 0.1 },
            y: { previous: 0, current: 0, amt: 0.1 }
        };
        this.randomString = null;
        this.scrollVal;
        this.rect;
        this.calculateSizePosition();
        this.initEvents();
    }

    calculateSizePosition() {
        this.scrollVal = { x: window.scrollX, y: window.scrollY };
        this.rect = this.DOM.el.getBoundingClientRect();
    }

    initEvents() {
        window.addEventListener('resize', () => this.calculateSizePosition());
        this.DOM.el.addEventListener('mousemove', () => {
            this.randomString = getRandomString(2000, this.characters);
        });
        this.DOM.el.addEventListener('mouseenter', () => {
            gsap.to(this.DOM.deco, {
                duration: 0.5,
                ease: 'power3',
                opacity: 1
            });
            const isFirstTick = true;
            this.loopRender(isFirstTick);
        });
        this.DOM.el.addEventListener('mouseleave', () => {
            this.stopRendering();
            gsap.to(this.DOM.deco, {
                duration: 0.5,
                ease: 'power3',
                opacity: 0
            });
        });
    }

    loopRender(isFirstTick = false) {
        if (!this.requestId) {
            this.requestId = requestAnimationFrame(() => this.render(isFirstTick));
        }
    }

    stopRendering() {
        if (this.requestId) {
            window.cancelAnimationFrame(this.requestId);
            this.requestId = undefined;
        }
    }

    render(isFirstTick) {
        // Initialize mouse position object
        this.requestId = undefined;
        const scrollDiff = {
            x: this.scrollVal.x - window.scrollX,
            y: this.scrollVal.y - window.scrollY
        };
        this.renderedStyles['x'].current = (mousepos.x - (scrollDiff.x + this.rect.left));
        this.renderedStyles['y'].current = (mousepos.y - (scrollDiff.y + this.rect.top));
        if (isFirstTick) {
            this.renderedStyles['x'].previous = this.renderedStyles['x'].current;
            this.renderedStyles['y'].previous = this.renderedStyles['y'].current;
        }
        for (const key in this.renderedStyles) {
            this.renderedStyles[key].previous = lerp(this.renderedStyles[key].previous, this.renderedStyles[key].current, this.renderedStyles[key].amt);
        }
        gsap.set(this.DOM.el, {
            '--x': this.renderedStyles['x'].previous,
            '--y': this.renderedStyles['y'].previous
        });
        this.DOM.deco.innerHTML = this.randomString;
        this.loopRender();
    }
}

// Export the module
export { Item, getMousePos };