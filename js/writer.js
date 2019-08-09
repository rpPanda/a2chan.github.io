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

function addingImages() {
    for (var i = 1; i <= 15; i++) {
        var image = document.createElement("img")
        var slide = document.createElement("div")
        slide.classList.add("slide", "item")
        image.setAttribute("src", "../assets/logos/" + i + ".webp")
        slide.appendChild(image)
        document.querySelector(".slide-track").appendChild(slide)
    }
}

addingImages()

$(".owl-carousel").owlCarousel({
    loop: true,
    margin: 10,
    nav: false,
    dots: false,
    autoplay: true,
    slideTransition: "linear",
    autoplayTimeout: 5000,
    autoplaySpeed: 5000,

    responsive: {
        0: {
            items: 2
        },
        600: {
            items: 3
        },
        1000: {
            items: 7
        }
    }
})

const animateBurger = () => {
    const burger = document.querySelector(".burger")
    const ul = document.querySelector(".top-nav ul")
    burger.classList.toggle("burger-open")
    ul.classList.toggle("show-dropdown")
}
