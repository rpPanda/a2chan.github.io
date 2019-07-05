// $(document).ready(function() {
//     $(".owl-carousel").owlCarousel({
//         items: 1
//         // loop: true
//     });
// });

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

        navLinks.forEach(function(link, index) {
            time = index / 5 + 0.3;
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation =
                    "navLinkFade 0.5s ease forwards " + time + "s";
            }
        });
        langLinks.forEach(function(link, index) {
            time = index / 5 + 0.3;
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation =
                    "langLinkFade 0.5s ease forwards " + time + "s";
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

var mq = window.matchMedia("(max-width: 570px)");
if (mq.matches) {
    $(document).ready(function() {
        $("#pagepiling").pagepiling({
            menu: null,
            direction: "vertical",
            verticalCentered: true,
            sectionsColor: ["#ffffff", "#b2ff59", "#03a9f4", "#ffeb3b"],
            anchors: [],
            scrollingSpeed: 500,
            easing: "swing",
            loopBottom: false,
            loopTop: false,
            css3: true,
            navigation: {
                textColor: "#000",
                bulletsColor: "#000",
                position: "bottom",
                tooltips: ["section1", "section2", "section3", "section4"]
            },
            normalScrollElements: null,
            normalScrollElementTouchThreshold: 5,
            touchSensitivity: 5,
            keyboardScrolling: true,
            sectionSelector: ".section",
            animateAnchor: false,

            //events
            onLeave: function(index, nextIndex, direction) {},
            afterLoad: function(anchorLink, index) {},
            afterRender: function() {}
        });
    });
} else {
    $(document).ready(function() {
        $("#pagepiling").pagepiling({
            menu: null,
            direction: "vertical",
            verticalCentered: true,
            sectionsColor: ["#ffffff", "#b2ff59", "#03a9f4", "#ffeb3b"],
            anchors: [],
            scrollingSpeed: 500,
            easing: "swing",
            loopBottom: false,
            loopTop: false,
            css3: true,
            navigation: {
                textColor: "#000",
                bulletsColor: "#000",
                position: "right",
                tooltips: ["section1", "section2", "section3", "section4"]
            },
            normalScrollElements: null,
            normalScrollElementTouchThreshold: 5,
            touchSensitivity: 5,
            keyboardScrolling: true,
            sectionSelector: ".section",
            animateAnchor: false,

            //events
            onLeave: function(index, nextIndex, direction) {},
            afterLoad: function(anchorLink, index) {},
            afterRender: function() {}
        });
    });
}
