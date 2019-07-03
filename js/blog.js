// top nav bar begins
const navSlide = () => {
    const burger = document.querySelector(".topnav__burger");
    const nav = document.querySelector(".topnav__nav-links");
    const resmenu = document.querySelector(".res-menu");
    const navLinks = document.querySelectorAll(".res-menu__red li");
    const langLinks = document.querySelectorAll(".res-menu__lang li");
    const resMenuLogo = document.querySelector(".res-menu__nav-logo");
    // toggle nav
    burger.addEventListener("click", () => {
        nav.classList.toggle("nav-active");
        burger.classList.toggle("open");
        resmenu.classList.toggle("res-menu--active");

        navLinks.forEach(function (link, index) {
            time = index / 5 + 0.3;
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = "navLinkFade 0.5s ease forwards " + time + "s";
            }
        });
        langLinks.forEach(function (link, index) {
            time = index / 5 + 0.3;
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = "langLinkFade 0.5s ease forwards " + time + "s";
            }
        });
        if (resMenuLogo.style.animation) {
            resMenuLogo.style.animation = "";
        } else {
            resMenuLogo.style.animation = "svgLogo 2s ease forwards";
        }
    });
};

navSlide();