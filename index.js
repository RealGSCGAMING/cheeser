if (globalThis.location.href.includes("skip")) {
    document.getElementById("welcome-modal").style.display = "none";
}

function changeAdjective() {
    const adjectives = ["Premier", "Leading", "Top", "Favorite", "Finest", "Only"];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    document.getElementById("title-adjective").textContent = randomAdjective;
}

const colorSchemes = [
    { primary: '#9d9d9d', secondary: '#000000', shadow: '#ffffff' },
    { primary: '#ffffff', secondary: '#9d9d9d', shadow: '#000000' },
    { primary: '#7f5bba', secondary: '#0ae7b2', shadow: '#063640' },
    { primary: '#100c0e', secondary: '#cdf2bd', shadow: '#442283' },
    { primary: '#5f2b1c', secondary: '#b26e81', shadow: '#755366' },
    { primary: '#03484f', secondary: '#ad964a', shadow: '#d5c695' },
    { primary: '#e6427d', secondary: '#c2ddc4', shadow: '#20b890' },
    { primary: '#595c43', secondary: '#e0a1d0', shadow: '#8d2a69' },
    { primary: '#434dbd', secondary: '#97a1ff', shadow: '#292055' },
    { primary: '#924563', secondary: '#cdefbf', shadow: '#786a67' },
    { primary: '#154c28', secondary: '#ac9245', shadow: '#402c3b' },
    { primary: '#74a68b', secondary: '#22fd9e', shadow: '#2bac6e' },
    { primary: '#91b6ff', secondary: '#483cca', shadow: '#fba677' },
    { primary: '#3fb67c', secondary: '#714812', shadow: '#77d1d2' },
    { primary: '#c3dce7', secondary: '#795308', shadow: '#fdcd95' },
]

const getColorVarAsHex = (varName) => {
    const rgb = getComputedStyle(document.documentElement).getPropertyValue(varName).match(/\d+/g).map(Number);
    return `#${rgb.map(x => x.toString(16).padStart(2, '0')).join('')}`;
}

document.addEventListener("keypress", (event) => {
    if (event.key == "s") {
        alert("The current scheme is: Primary: " + getColorVarAsHex('--primary-color') + ", Secondary: " + getColorVarAsHex('--secondary-color') + ", Shadow: " + getColorVarAsHex('--shadow-color'));
    }
});

const RANDOM = false;

const menuLogo = document.getElementById("menu-logo");
menuLogo.addEventListener("click", () => {

    if (RANDOM) {
        document.documentElement.style.setProperty('--primary-color', getRandomColor(0, 255));
        document.documentElement.style.setProperty('--secondary-color', getRandomColor(0, 255));
        document.documentElement.style.setProperty('--shadow-color', getRandomColor(0, 255));
    } else {
        const randomColorScheme = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];
        document.documentElement.style.setProperty('--primary-color', randomColorScheme.primary);
        document.documentElement.style.setProperty('--secondary-color', randomColorScheme.secondary);
        document.documentElement.style.setProperty('--shadow-color', randomColorScheme.shadow);
    }

    changeAdjective();
});

const aboutOption = document.getElementById("about-option");
aboutOption.addEventListener("click", () => {
    const aboutModal = document.getElementById("about-modal");
    openModal(aboutModal);
});

const closeAbout = document.getElementById("close-about");
closeAbout.addEventListener("click", () => {
    const aboutModal = document.getElementById("about-modal");
    closeModal(aboutModal);
});

const productsOption = document.getElementById("products-option");
productsOption.addEventListener("click", () => {
    const productsModal = document.getElementById("products-modal");
    openModal(productsModal);
});

const closeProducts = document.getElementById("close-products");
closeProducts.addEventListener("click", () => {
    const productsModal = document.getElementById("products-modal");
    closeModal(productsModal);
});

const teamOption = document.getElementById("team-option");
teamOption.addEventListener("click", () => {
    const teamModal = document.getElementById("team-modal");
    openModal(teamModal);
});

const closeTeam = document.getElementById("close-team");
closeTeam.addEventListener("click", () => {
    const teamModal = document.getElementById("team-modal");
    closeModal(teamModal);
});

const contactOption = document.getElementById("contact-option");
contactOption.addEventListener("click", () => {
    const contactModal = document.getElementById("contact-modal");
    openModal(contactModal);
});

const closeContact = document.getElementById("close-contact");
closeContact.addEventListener("click", () => {
    const contactModal = document.getElementById("contact-modal");
    closeModal(contactModal);
});

function openModal(modal) {
    modal.style.opacity = "1";
    modal.style.pointerEvents = "auto";
    document.getElementById("menu-modal").style.pointerEvents = "none";
    modal.style.overflow = "auto";
}

function closeModal(modal) {
    modal.style.opacity = "0";
    modal.style.pointerEvents = "none";
    document.getElementById("menu-modal").style.pointerEvents = "auto";
    modal.style.overflow = "hidden";
}

if (globalThis.location.hash === "#team") {
    openModal(document.getElementById("team-modal"));
}

if (globalThis.location.hash === "#products") {
    openModal(document.getElementById("products-modal"));
}

if (globalThis.location.hash === "#contact") {
    openModal(document.getElementById("contact-modal"));
}

if (globalThis.location.hash === "#about") {
    openModal(document.getElementById("about-modal"));
}

function getRandomColor(min = 0, max = 255) {
    const r = Math.floor(Math.random() * (max - min + 1) + min);
    const g = Math.floor(Math.random() * (max - min + 1) + min);
    const b = Math.floor(Math.random() * (max - min + 1) + min);
    return `rgb(${r}, ${g}, ${b})`;
}

/**
* Applies an animated, descending 3D shadow extrusion effect to elements.
* @param {string} selector - CSS selector for target elements
* @param {string} color - The shadow color
* @param {number} length - Maximum length/depth of the shadow in pixels
* @param {number} angle - Angle in degrees
* @param {number} duration - Animation duration in ms
*/
function applyExtrusionShadow(selector, color = '#00c882', length = 1500, angle = 150, duration = 1500) {
    // Generate the full frame-by-frame shadow configuration 
    let shadowArray = [];
    let rad = angle * Math.PI / 180;
    for (let i = 1; i <= length; i++) {
        let x = (i * Math.cos(rad)).toFixed(2);
        let y = (i * Math.sin(rad)).toFixed(2);
        shadowArray.push(`${x}px ${y}px 0 ${color}`);
    }

    const shadowClones = [];

    // Set up DOM duplicates to sit beneath the main text
    document.querySelectorAll(selector).forEach(el => {
        el.style.position = 'relative';
        el.style.textShadow = 'none';

        const content = el.innerHTML;
        el.innerHTML = '';

        const mainText = document.createElement('span');
        mainText.innerHTML = content;
        mainText.style.position = 'relative';
        mainText.style.zIndex = '2';

        const shadowClone = document.createElement('span');
        shadowClone.innerHTML = content;
        shadowClone.style.position = 'absolute';
        shadowClone.style.left = '0';
        shadowClone.style.top = '0';
        shadowClone.style.color = 'transparent';
        shadowClone.style.textShadow = 'none';
        shadowClone.style.pointerEvents = 'none';
        shadowClone.style.zIndex = '1';
        shadowClone.setAttribute('aria-hidden', 'true');

        el.appendChild(mainText);
        el.appendChild(shadowClone);

        shadowClones.push(shadowClone);
    });

    // Animation logic
    let startTimestamp = null;
    function animateShadow(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);

        const currentLength = Math.max(1, Math.floor(progress * length));

        const currentShadowStyle = shadowArray.slice(0, currentLength).join(', ');

        shadowClones.forEach(clone => {
            clone.style.textShadow = currentShadowStyle;
            setTimeout(() => {
                clone.style.transition = "text-shadow 0.3s ease";
            }, duration + 100);
        });

        if (progress < 1) {
            requestAnimationFrame(animateShadow);
        }
    }

    requestAnimationFrame(animateShadow);
}

setTimeout(() => {
    applyExtrusionShadow('#title', 'var(--shadow-color)', 2000, 30, 500);
}, 2250);

changeAdjective();