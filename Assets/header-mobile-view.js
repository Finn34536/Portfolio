// Funktionen zum Header in minimierter Bildschirmansicht

const header = document.querySelector("header");
const headerFullHeight = header.offsetHeight;
const headerDragArea = header.querySelector(".header-drag-area");
const menuIcon = header.querySelector(".menü-icon");
const body = document.querySelector("body");
const headerStyles = window.getComputedStyle(header);
const headerPaddingBottom = headerStyles.paddingBottom.split("px");
const transitionSpeed = 0.5;
const state = {
    headerHeightclosed: (headerDragArea.offsetHeight) + (headerPaddingBottom[0] * 2),
    touchAktiv: false,
    menuIsOpen: false,
    touchY: 0
}


//Platziert den Header oben in eingefahrenen Zustand beim Laden
document.addEventListener("DOMContentLoaded", ()=> {
    if (windowIsBelow750px()) {
        retractHeader()
    }
});

//Platziert den Header oben in eingefahrenen Zustand bei Resize
window.addEventListener("resize", ()=> {
    if (windowIsBelow750px()) {
        state.headerHeightclosed = (headerDragArea.offsetHeight) + (headerPaddingBottom[0] * 2);
        retractHeader()
    } else {
        header.style.top = 0 + "px";
    }
});

//Entfernt CSS Hidden und Transition vom Header und Aktiviert Touchaktiv
header.addEventListener("touchstart", ()=> {
    if (windowIsBelow750px()) {
        header.style.removeProperty("transition");
        body.style.overflow= "hidden";
        state.touchAktiv = true;
    }
});

//Bewegt den header an die aktuelle Touchposition und speichert diese zum abgleich
header.addEventListener("touchmove", (event)=> {
    if (state.touchAktiv) {
        state.touchY = event.touches[0].clientY - headerDragArea.offsetHeight / 2;
        const currentTouchPositionY = state.touchY + headerHeightFullyRetracted();
        if (currentHeaderPositionWithinLimits(currentTouchPositionY)) {
            header.style.top = currentTouchPositionY + "px";
        }
    } 
}, { passive: true });

//Header nach Touch entweder voll ein oder ausgefahren. Dom wieder scrollbar gemacht.
header.addEventListener("touchend", ()=> {
    if (state.touchAktiv) {
        startTransition(transitionSpeed);
        if (headerPositionIsLessThanHalf()) {
            retractHeader();
        } else {
            extendHeader();
        }
    }
    state.touchAktiv = false;
    body.style.overflow= "visible";
});

//Fährt das Menü bei Mausklick auf das Icon ein und aus
menuIcon.addEventListener("mousedown", ()=> {
    if (!state.menuIsOpen) {
        startTransition(transitionSpeed);
        extendHeader();
    } else {
        startTransition(transitionSpeed);
        retractHeader();
    }
});

//Fährt das Menü wieder ein beim Scrollen auf der Seite
document.addEventListener("scroll", ()=> {
    if (state.menuIsOpen) {
        startTransition(transitionSpeed);
        retractHeader();
    }
});

//Funktion zum prüfen der Window größe
function windowIsBelow750px() {
    return window.innerWidth <= 750;
}

//Prüft ob sich höhe des Headers in den Festgelegten grenzen befindet
function currentHeaderPositionWithinLimits(currentTouchPositionY) {
    let currentPositionIsToLow = false;
    if (currentTouchPositionY > 0) {
        currentPositionIsToLow = true;
    }
    let currentPositionIsToHigh = false;
    if (headerFullHeight < Math.abs(currentTouchPositionY - state.headerHeightclosed)) {
        currentPositionIsToHigh = true;
    }
    if (!(currentPositionIsToLow || currentPositionIsToHigh)) {
        return true;
    } else {
        return false;
    }
}

//Prüft wie weit der Header Ausgefahren ist
function headerPositionIsLessThanHalf() {
    if (headerFullHeight / 2 >= state.touchY) {
      return true;  
    } else {
        return false;
    }
}

//Header einfahren
function retractHeader() {
    header.style.top = headerHeightFullyRetracted() + "px";
    state.menuIsOpen = false;
}

//Header ausfahren
function extendHeader() {
    header.style.top = 0 + "px";
    state.menuIsOpen = true;   
}

//Aktiviert Transition für bestimmten Zeitraum
function startTransition(seconds) {
    header.style.transition = `top ${seconds}s`;
    setTimeout(() => header.style.removeProperty("transition"), seconds * 1000);
}

function headerHeightFullyRetracted() {
    return -(headerFullHeight - state.headerHeightclosed);
}