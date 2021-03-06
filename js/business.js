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

            // Check if the viewport is set, if the viewport is not set the SVG won't scale.
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

const animateBurger = () => {
    const burger = document.querySelector(".burger")
    const ul = document.querySelector(".top-nav ul")
    burger.classList.toggle("burger-open")
    ul.classList.toggle("show-dropdown")
}

// get a quote form
const toggleForm = () => {
    document.querySelector(".query-form").classList.toggle("showForm")
}

// get a quote submit

const $form = $("form#contact-form"),
    url =
        "https://script.google.com/macros/s/AKfycbzpiGzH3MutiGViWdXYrIwmK0CWNMgyAeVuhuM-qvJvoH4wE7aI/exec"
$("#submit-form").on("click", function(e) {
    e.preventDefault()
    var jqxhr = $.ajax({
        url: url,
        method: "GET",
        dataType: "json",
        data: $form.serializeObject(),
        success: () => {
            toggleForm()
            document.getElementById("contact-form").reset()
        }
    })
})

const expandCard = () => {
    var cascade_cards = document
        .getElementById("cascade")
        .getElementsByClassName("card")
    var i

    for (i = 0; i < cascade_cards.length; i++) {
        cascade_cards[i].addEventListener("click", function() {
            this.classList.toggle("expand-section--4-card")
        })
    }
}

$(document).ready(() => {
    document.getElementById("contact-form").reset()
    expandCard()
})
