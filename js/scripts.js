function copy_text(elementId) {
    const textArea = document.createElement("textarea");
    textArea.value = document.getElementById(elementId).innerText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
}



document.addEventListener('DOMContentLoaded', function () {
    const navigationLinks = document.querySelectorAll('nav a');

    navigationLinks.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const scrollOffset = -100;
            const targetPosition = targetElement.offsetTop + scrollOffset;
            smooth_scroll(targetPosition);
        });
    });
});



function smooth_scroll(targetPosition) {
    const startPosition = window.scrollY || document.documentElement.scrollTop;
    const distance = targetPosition - startPosition;
    const duration = 1000; 
    let startTime = null;

    function animationScroll(currentTime) {
        if (!startTime) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) {
            requestAnimationFrame(animationScroll);
        }
    }

    function easeOutCubic(t, b, c, d) {
        t /= d;
        t--;
        return c * (t * t * t + 1) + b;
    }

    requestAnimationFrame(animationScroll);
}



const headerElement = document.querySelector('header');
let lastScrollPosition = 0;
const getScrollPosition = () => window.scrollY || document.documentElement.scrollTop;
const isHeaderHidden = () => headerElement.classList.contains("scroll");
window.addEventListener('scroll', () => {
    if (getScrollPosition() > lastScrollPosition && !isHeaderHidden()) {
        headerElement.classList.add('scroll');
    } else if (getScrollPosition() < lastScrollPosition && isHeaderHidden()) {
        headerElement.classList.remove('scroll');
    }
    lastScrollPosition = getScrollPosition();
});