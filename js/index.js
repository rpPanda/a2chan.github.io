// falling letters begin
function fallingLetters() {
    playGame()
    polyfillKey()

    function playGame(replay) {
        var LETTERS = [
            "क",
            "அ",
            "c",
            "తు",
            "e",
            "എ",
            "ಮಾ",
            "ਹੈ",
            "ভা",
            "ਵੇਂ",
            "గ",
            "झे",
            "றி",
            "n",
            "o",
            "p",
            "ব",
            "r",
            "আ",
            "t",
            "ਹੈ",
            "ನ್",
            "ഷം",
            "ఏ",
            "வு",
            "ज्ञा",
            "இ"
        ]
        var animations = {
            क: [],
            அ: [],
            c: [],
            తు: [],
            e: [],
            എ: [],
            ಮಾ: [],
            ਹੈ: [],
            ভা: [],
            ਵੇਂ: [],
            గ: [],
            झे: [],
            றி: [],
            n: [],
            o: [],
            p: [],
            ব: [],
            r: [],
            আ: [],
            t: [],
            ਹੈ: [],
            ನ್: [],
            ഷം: [],
            ఏ: [],
            வு: [],
            ज्ञा: [],
            இ: []
        }
        var gameOn = true
        var timeOffset = 500 //interval between letters starting, will be faster over time
        var DURATION = 10000
        var main = document.getElementById("main")
        var rate = 1
        var RATE_INTERVAL = 0 //playbackRate will increase by .05 for each letter... so after 20 letters, the rate of falling will be 2x what it was at the start
        var misses = 0

        //To generate random colors for letters
        function randomColor() {
            let colorGen = "0123456789ABCDEF"
            let len = colorGen.length
            let color = "#"
            for (let i = 0; i < 6; i++) {
                color += colorGen[Math.floor(Math.random() * len)]
            }
            color = "#16264f"
            return color
        }

        //Create a letter element and setup its falling animation, add the animation to the active animation array, and setup an onfinish handler that will represent a miss.
        function create() {
            var idx = Math.floor(Math.random() * LETTERS.length)
            var x = Math.random() * 85 + "vw"
            var container = document.createElement("div")
            var letter = document.createElement("span")
            var letterText = document.createElement("b")
            letterText.textContent = LETTERS[idx]
            letterText.style.color = randomColor()
            letter.appendChild(letterText)
            container.appendChild(letter)
            main.appendChild(container)
            var animation = container.animate(
                [
                    { transform: "translate3d(" + x + ",-5vh,0)" },
                    { transform: "translate3d(" + x + ",120vh,0)" }
                ],
                {
                    duration: DURATION,
                    easing: "linear",
                    fill: "both"
                }
            )

            animations[LETTERS[idx]].splice(0, 0, {
                animation: animation,
                element: container
            })
            rate = rate + RATE_INTERVAL
            animation.playbackRate = rate

            //If an animation finishes, we will consider that as a miss, so we will remove it from the active animations array and increment our miss count
            animation.onfinish = function(e) {
                var target = container
                var char = target.textContent
            }
        }

        //Periodically remove missed elements, and lower the interval between falling elements
        var cleanupInterval = setInterval(function() {
            // timeOffset = timeOffset * 4 / 5;
            cleanup()
        }, 20000)
        function cleanup() {
            ;[].slice
                .call(main.querySelectorAll(".missed"))
                .forEach(function(missed) {
                    main.removeChild(missed)
                })
        }

        //Firefox 48 supports document.getAnimations as per latest spec, Chrome 52 and polyfill use older spec
        function getAllAnimations() {
            if (document.getAnimations) {
                return document.getAnimations()
            } else if (document.timeline && document.timeline.getAnimations) {
                return document.timeline.getAnimations()
            }
            return []
        }

        //On key press, see if it matches an active animating (falling) letter. If so, pop it from active array, pause it (to keep it from triggering "finish" logic), and add an animation on inner element with random 3d rotations that look like the letter is being kicked away to the distance. Also update score.
        function onPress(e) {
            var char = e.key
            if (char.length === 1) {
                char = char.toLowerCase()
                if (animations[char] && animations[char].length) {
                    var popped = animations[char].pop()
                    popped.animation.pause()
                    var target = popped.element.querySelector("b")
                    var degs = [
                        Math.random() * 1000 - 500,
                        Math.random() * 1000 - 500,
                        Math.random() * 2000 - 1000
                    ]
                    target.animate(
                        [
                            {
                                transform:
                                    "scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
                                opacity: 1
                            },
                            {
                                transform:
                                    "scale(0) rotateX(" +
                                    degs[0] +
                                    "deg) rotateY(" +
                                    degs[1] +
                                    "deg) rotateZ(" +
                                    degs[2] +
                                    "deg)",
                                opacity: 0
                            }
                        ],
                        {
                            duration: Math.random() * 500 + 850,
                            easing: "ease-out",
                            fill: "both"
                        }
                    )
                    addScore()
                    // header.textContent += char;
                }
            }
        }
        function addScore() {
            // score++;
            // scoreElement.textContent = score;
        }

        document.body.addEventListener("keypress", onPress)

        //start the letters falling... create the element+animation, and setup timeout for next letter to start
        function setupNextLetter() {
            if (gameOn) {
                create()
                setTimeout(function() {
                    setupNextLetter()
                }, timeOffset)
            }
        }
        setupNextLetter()
    }

    function polyfillKey() {
        if (!("KeyboardEvent" in window) || "key" in KeyboardEvent.prototype) {
            return false
        }

        console.log("polyfilling KeyboardEvent.prototype.key")
        var keys = {}
        var letter = ""
        for (var i = 65; i < 91; ++i) {
            letter = String.fromCharCode(i)
            keys[i] = letter.toUpperCase()
        }
        for (var i = 97; i < 123; ++i) {
            letter = String.fromCharCode(i)
            keys[i] = letter.toLowerCase()
        }
        var proto = {
            get: function(x) {
                var key = keys[this.which || this.keyCode]
                console.log(key)
                return key
            }
        }
        Object.defineProperty(KeyboardEvent.prototype, "key", proto)
    }
}
// falling letters end

// top nav bar begins
const navSlide = () => {
    const burger = document.querySelector(".topnav__burger")
    const resmenu = document.querySelector(".res-menu")
    const navLinks = document.querySelectorAll(".res-menu__red li")
    const langLinks = document.querySelectorAll(".res-menu__lang li")
    const resMenuLogo = document.querySelector(".res-menu__nav-logo")

    burger.classList.toggle("open")
    resmenu.classList.toggle("res-menu--active")

    navLinks.forEach(function(link, index) {
        time = index / 5 + 0.3
        if (link.style.animation) {
            link.style.animation = ""
        } else {
            link.style.animation =
                "navLinkFade 0.5s ease forwards " + time + "s"
        }
    })
    langLinks.forEach(function(link, index) {
        time = index / 5 + 0.3
        if (link.style.animation) {
            link.style.animation = ""
        } else {
            link.style.animation =
                "langLinkFade 0.5s ease forwards " + time + "s"
        }
    })
    if (resMenuLogo.style.animation) {
        resMenuLogo.style.animation = ""
    } else {
        resMenuLogo.style.animation = "svgLogo 2s ease forwards"
    }
}

const toggleForm = () => {
    document.querySelector(".query-form").classList.toggle("showForm")
}

$(".owl-carousel.carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    items: 1,
    dots: false,
    nav: false,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 600,
    animateOut: "fadeOut",
    animateIn: "zoomIn"
    // animateOut: "fadeOut"
})

$(".owl-carousel.testimonial-slide").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    items: 1,
    dots: false,
    nav: true,
    autoplay: true,
    autoplayTimeout: 4000,
    autoplayHoverPause: true,
    smartSpeed: 600,
    animateOut: "fadeOut",
    animateIn: "slideInRight"
    // animateOut: "fadeOut"
})

// Intersection observers

//exhibit cards
const desc_card = document.querySelectorAll(".desc-container > div")
const writer_bg = document.querySelector(".writer-container")
const client_bg = document.querySelector(".client-container")

const options = {
    root: null,
    threshold: 0,
    rootMargin: "-100px"
}

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        }
        if (entry.target.className == "writer animated") {
            entry.target.classList.toggle("fadeInLeft")
        } else {
            entry.target.classList.toggle("fadeInRight")
        }
        observer.unobserve(entry.target)
    })
}, options)

// footer intersection observer
let footer_count = 0
const footer = document.querySelector("footer")
const footer_children = document.querySelectorAll(".footer-bg > div")
const footer_observer = new IntersectionObserver((entries, footer_observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        }

        footer_children.forEach(element => {
            element.style.animation = "fadeInUp_20px 1s ease-out 1s forwards"
        })
        footer.style.animation = "moveUp 500ms ease-out 500ms forwards"
        // footer_observer.unobserve(entry.target)
    })
}, options)

// topnav
const topnav_options = {
    root: null,
    threshold: 0,
    rootMargin: "0px 0px -800px 0px"
}
const bg_card = document.querySelector(".bg-card--card1")
const topnav = document.querySelector(".topnav")

const topnav_observer = new IntersectionObserver((entries, topnav_observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && topnav.className === "topnav burger-show") {
            topnav.classList.remove("burger-show")
            topnav.classList.add("burger-hide")
        } else if (
            !entry.isIntersecting &&
            topnav.className === "topnav burger-hide"
        ) {
            topnav.classList.remove("burger-hide")
            topnav.classList.add("burger-show")
        }
    })
}, topnav_options)

function addingImages() {
    for (var i = 1; i <= 52; i++) {
        var image = document.createElement("img")
        image.setAttribute("src", "../assets/logos/" + i + ".webp")
        document.querySelector(".portfolio").appendChild(image)
    }
}

function observe_topnav(x) {
    if (x.matches) {
        topnav_observer.observe(bg_card)
    }
}

// If the screen size is >1200px then add observer else the default is burger anyway
var x = window.matchMedia("(min-width: 1200px)")
x.addListener(observe_topnav)

//inlining svg
jQuery("img.svg").each(function() {
    var $img = jQuery(this)
    var imgID = $img.attr("id")
    var imgClass = $img.attr("class")
    var imgURL = $img.attr("src")

    jQuery.get(
        imgURL,
        function(data) {
            // Get the SVG tag, ignore the rest
            var $svg = jQuery(data).find("svg")

            // Add replaced image's ID to the new SVG
            if (typeof imgID !== "undefined") {
                $svg = $svg.attr("id", imgID)
            }
            // Add replaced image's classes to the new SVG
            if (typeof imgClass !== "undefined") {
                $svg = $svg.attr("class", imgClass + " replaced-svg")
            }

            // Remove any invalid XML tags as per http://validator.w3.org
            $svg = $svg.removeAttr("xmlns:a")

            // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
            if (
                !$svg.attr("viewBox") &&
                $svg.attr("height") &&
                $svg.attr("width")
            ) {
                $svg.attr(
                    "viewBox",
                    "0 0 " + $svg.attr("height") + " " + $svg.attr("width")
                )
            }

            // Replace image with new SVG
            $img.replaceWith($svg)
        },
        "xml"
    )
})

$(document).ready(() => {
    // fallingLetters()
    // footer_observer.observe(footer)
    observe_topnav(x)
    // })

    desc_card.forEach(card => {
        observer.observe(card)
    })
    addingImages()
})
