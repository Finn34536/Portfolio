// Funktionen zum Header in minimierter Bildschirmansicht

const header = document.querySelector("header");
const menuIcon = header.querySelector(".menü-icon");
const body = document.querySelector("body");
const headerStyles = window.getComputedStyle(header);
const headerPaddingBottom = headerStyles.paddingBottom.split("px")
let headerHeightclosed = (header.querySelector(".header-drag-area").offsetHeight) + (headerPaddingBottom[0] * 2);
let touchStart = false;
let touchStartPositionY;
let touchCurrentPositionY;
let menuIsOpen = false;

//Platziert den Header oben in eingefahrenen Zustand beim Laden
document.addEventListener("DOMContentLoaded", ()=> {
    if (window.innerWidth < 750) {
        header.style.top = -(header.offsetHeight - headerHeightclosed) + "px";
    }
});

//Platziert den Header oben in eingefahrenen Zustand bei Resize
window.addEventListener("resize", ()=> {
    if (window.innerWidth < 750) {
        headerHeightclosed = (header.querySelector(".header-drag-area").offsetHeight) + (headerPaddingBottom[0] * 2);
        header.style.top = -(header.offsetHeight - headerHeightclosed) + "px";
    } else {
        header.style.top = 0 + "px";
    }
});

//Aktiviert bei touch auf header Touchstart, legt den Startpunkt der Touchbewegung fest und Macht den Hintergrund nicht scrollbar
header.addEventListener("touchstart", (event)=> {
    if (window.innerWidth < 750) {
        header.style.removeProperty("transition");
        body.style.overflow= "hidden";
        touchStart = true;
        touchStartPositionY = event.touches[0].clientY;
    }
});

//Bewegt den header an die aktuelle Touchposition und speichert diese zum abgleich
header.addEventListener("touchmove", (event)=> {
    if (touchStart) {
        touchCurrentPositionY = (event.touches[0].clientY) - (header.offsetHeight - (headerHeightclosed / 2));
        //Begrenzung nach oben und unten durch if
        if (!(touchCurrentPositionY > 0 || header.offsetHeight < Math.abs(touchCurrentPositionY - headerHeightclosed))) {
            header.style.top = touchCurrentPositionY + "px";
        }
    } 
});

//Fährt den Header bei ende der Touchbewegung entweder voll aus oder ein, wenn touchstart Aktiv ist. Setzt touchstart am Ende auf inaktiv und macht den Hintergrund wieder scrollbar
header.addEventListener("touchend", (event)=> {
    if (touchStart) {
        header.style.transition = 'top 1s';
        if (header.offsetHeight / 2 >= event.changedTouches[0].clientY) {
            //Header Voll einfahren
            header.style.top = -(header.offsetHeight - headerHeightclosed) + "px";
        } else {
            //Header Voll ausfahren
            header.style.top = 0 + "px";
        }
    }
    touchStart = false;
    body.style.overflow= "visible";
});

//Fährt das Menü bei Mausklick auf das Icon ein und aus
menuIcon.addEventListener("mousedown", ()=> {
    if (!menuIsOpen) {
        //Header Voll ausfahren
        header.style.transition = 'top 1s';
        header.style.top = 0 + "px";
        menuIsOpen = true;
        setTimeout(() => header.style.removeProperty("transition"), 1000);
    } else {
        //Header Voll einfahren
        header.style.transition = 'top 1s';
        header.style.top = -(header.offsetHeight - headerHeightclosed) + "px";
        menuIsOpen = false;
        setTimeout(() => header.style.removeProperty("transition"), 1000);
    }
});

//Fährt das Menü wieder ein beim Scrollen auf der Seite
document.addEventListener("scroll", ()=> {
    if (menuIsOpen) {
        header.style.transition = 'top 1s';
        header.style.top = -(header.offsetHeight - headerHeightclosed) + "px";
        menuIsOpen = false;
        setTimeout(() => header.style.removeProperty("transition"), 1000);
    }
});