if (globalThis.location.href.includes("cheeserinc.com") && !globalThis.location.href.includes("debug")) {
    globalThis.location.href = "maintenance.html";
}

if (globalThis.location.href.includes("skip")) {
    document.getElementById("welcome-modal").style.display = "none";
}

const menuLogo = document.getElementById("menu-logo");
menuLogo.addEventListener("click", () => {
    document.documentElement.style.setProperty('--primary-color', getRandomColor(100, 255));
    document.documentElement.style.setProperty('--secondary-color', getRandomColor(0, 100));
    document.documentElement.style.setProperty('--shadow-color', getRandomColor(0, 255));
});

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

        // cubic ease-out for smooth finish
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        const currentLength = Math.max(1, Math.floor(easeProgress * length));

        const currentShadowStyle = shadowArray.slice(0, currentLength).join(', ');

        shadowClones.forEach(clone => {
            clone.style.textShadow = currentShadowStyle;
            clone.style.transition = "text-shadow 0.3s ease";
        });

        if (progress < 1) {
            requestAnimationFrame(animateShadow);
        }
    }

    requestAnimationFrame(animateShadow);
}

setTimeout(() => {
    applyExtrusionShadow('#title', 'var(--shadow-color)', 1500, 30, 500);
}, 2250);