function scrollProgressBar() {
	var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
	var height =
		document.documentElement.scrollHeight -
		document.documentElement.clientHeight;
	var scrolled = (winScroll / height) * 100;
	console.log(scrolled) + "%";
	document.getElementById("scroll-progress-bar").style.width = scrolled + "%";
}

// falling letters begin
// playGame();
// polyfillKey();

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
	];
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
	};
	var gameOn = true;
	var timeOffset = 500; //interval between letters starting, will be faster over time
	var DURATION = 10000;
	var main = document.getElementById("main");
	var rate = 1;
	var RATE_INTERVAL = 0; //playbackRate will increase by .05 for each letter... so after 20 letters, the rate of falling will be 2x what it was at the start
	var misses = 0;

	//To generate random colors for letters
	function randomColor() {
		let colorGen = "0123456789ABCDEF";
		let len = colorGen.length;
		let color = "#";
		for (let i = 0; i < 6; i++) {
			color += colorGen[Math.floor(Math.random() * len)];
		}
		color = "black";
		return color;
	}

	//Create a letter element and setup its falling animation, add the animation to the active animation array, and setup an onfinish handler that will represent a miss.
	function create() {
		var idx = Math.floor(Math.random() * LETTERS.length);
		var x = Math.random() * 85 + "vw";
		var container = document.createElement("div");
		var letter = document.createElement("span");
		var letterText = document.createElement("b");
		letterText.textContent = LETTERS[idx];
		letterText.style.color = randomColor();
		letter.appendChild(letterText);
		container.appendChild(letter);
		main.appendChild(container);
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
		);

		animations[LETTERS[idx]].splice(0, 0, {
			animation: animation,
			element: container
		});
		rate = rate + RATE_INTERVAL;
		animation.playbackRate = rate;

		//If an animation finishes, we will consider that as a miss, so we will remove it from the active animations array and increment our miss count
		animation.onfinish = function(e) {
			var target = container;
			var char = target.textContent;
		};
	}

	//Periodically remove missed elements, and lower the interval between falling elements
	var cleanupInterval = setInterval(function() {
		// timeOffset = timeOffset * 4 / 5;
		cleanup();
	}, 20000);
	function cleanup() {
		[].slice.call(main.querySelectorAll(".missed")).forEach(function(missed) {
			main.removeChild(missed);
		});
	}

	//Firefox 48 supports document.getAnimations as per latest spec, Chrome 52 and polyfill use older spec
	function getAllAnimations() {
		if (document.getAnimations) {
			return document.getAnimations();
		} else if (document.timeline && document.timeline.getAnimations) {
			return document.timeline.getAnimations();
		}
		return [];
	}

	//On key press, see if it matches an active animating (falling) letter. If so, pop it from active array, pause it (to keep it from triggering "finish" logic), and add an animation on inner element with random 3d rotations that look like the letter is being kicked away to the distance. Also update score.
	function onPress(e) {
		var char = e.key;
		if (char.length === 1) {
			char = char.toLowerCase();
			if (animations[char] && animations[char].length) {
				var popped = animations[char].pop();
				popped.animation.pause();
				var target = popped.element.querySelector("b");
				var degs = [
					Math.random() * 1000 - 500,
					Math.random() * 1000 - 500,
					Math.random() * 2000 - 1000
				];
				target.animate(
					[
						{
							transform: "scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
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
				);
				addScore();
				// header.textContent += char;
			}
		}
	}
	function addScore() {
		// score++;
		// scoreElement.textContent = score;
	}

	document.body.addEventListener("keypress", onPress);

	//start the letters falling... create the element+animation, and setup timeout for next letter to start
	function setupNextLetter() {
		if (gameOn) {
			create();
			setTimeout(function() {
				setupNextLetter();
			}, timeOffset);
		}
	}
	setupNextLetter();
}

function polyfillKey() {
	if (!("KeyboardEvent" in window) || "key" in KeyboardEvent.prototype) {
		return false;
	}

	console.log("polyfilling KeyboardEvent.prototype.key");
	var keys = {};
	var letter = "";
	for (var i = 65; i < 91; ++i) {
		letter = String.fromCharCode(i);
		keys[i] = letter.toUpperCase();
	}
	for (var i = 97; i < 123; ++i) {
		letter = String.fromCharCode(i);
		keys[i] = letter.toLowerCase();
	}
	var proto = {
		get: function(x) {
			var key = keys[this.which || this.keyCode];
			console.log(key);
			return key;
		}
	};
	Object.defineProperty(KeyboardEvent.prototype, "key", proto);
}
// falling letters end

// top nav bar begins
const navSlide = () => {
	const burger = document.querySelector(".topnav__burger");
	const nav = document.querySelector(".topnav__nav-links");
	const resmenu = document.querySelector(".res-menu");
	const navLinks = document.querySelectorAll(".res-menu__red li");
	const langLinks = document.querySelectorAll(".res-menu__lang li");
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
				link.style.animation = "navLinkFade 0.5s ease forwards " + time + "s";
			}
		});
		langLinks.forEach(function(link, index) {
			time = index / 5 + 0.3;
			if (link.style.animation) {
				link.style.animation = "";
			} else {
				link.style.animation = "langLinkFade 0.5s ease forwards " + time + "s";
			}
		});
	});
};

navSlide();

// carousel
var timer = 4000;

var i = 0;
var max = $("#carousel > li").length;

$("#carousel > li")
	.eq(i)
	.addClass("active")
	.css("left", "0");
$("#carousel > li")
	.eq(i + 1)
	.addClass("active")
	.css("left", "25%");
$("#carousel > li")
	.eq(i + 2)
	.addClass("active")
	.css("left", "50%");
$("#carousel > li")
	.eq(i + 3)
	.addClass("active")
	.css("left", "75%");

setInterval(function() {
	$("#carousel > li").removeClass("active");

	$("#carousel > li")
		.eq(i)
		.css("transition-delay", "0.25s");
	$("#carousel > li")
		.eq(i + 1)
		.css("transition-delay", "0.5s");
	$("#carousel > li")
		.eq(i + 2)
		.css("transition-delay", "0.75s");
	$("#carousel > li")
		.eq(i + 3)
		.css("transition-delay", "1s");

	if (i < max - 4) {
		i = i + 4;
	} else {
		i = 0;
	}

	$("#carousel > li")
		.eq(i)
		.css("left", "0")
		.addClass("active")
		.css("transition-delay", "1.25s");
	$("#carousel > li")
		.eq(i + 1)
		.css("left", "25%")
		.addClass("active")
		.css("transition-delay", "1.5s");
	$("#carousel > li")
		.eq(i + 2)
		.css("left", "50%")
		.addClass("active")
		.css("transition-delay", "1.75s");
	$("#carousel > li")
		.eq(i + 3)
		.css("left", "75%")
		.addClass("active")
		.css("transition-delay", "2s");
}, timer);

// window.onscroll = function() {
// 	scrollProgressBar();
// };
