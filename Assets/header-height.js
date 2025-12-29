//Erstellt eine CSS-Variable, die sich Dinamisch an die Headerhöhe anpasst

const header = document.querySelector("header");

document.addEventListener("DOMContentLoaded", ()=> setVariable());

window.addEventListener("resize", ()=> setVariable());

function setVariable() {
    const headerHeight = header.offsetHeight;
    document.documentElement.style.setProperty("--header-full-height", headerHeight + "px");
}