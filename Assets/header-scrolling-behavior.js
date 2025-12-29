// Header Verschwinden lassen bei Scroll nach unten und wieder erscheinen lassen bei Scroll nach oben

const header = document.querySelector("header");

let headerTopPosition = 0;
let startScroll = 0;
const headerHeight = -header.offsetHeight

document.addEventListener("scroll",()=> {
    let endScroll = window.pageYOffset;
    if (startScroll <= endScroll) {
        if (!(headerHeight > headerTopPosition)) {
            headerTopPosition = headerTopPosition - 10;
            header.style.top = headerTopPosition + "px";
        }
    } else {
        if (!(headerTopPosition >= 0)) {
            headerTopPosition = headerTopPosition + 10;
            header.style.top = headerTopPosition + "px";
        }
    }
    if (window.pageYOffset === 0) {
        header.style.top = 0 + "px";
    }
    startScroll = endScroll;
});