var top=$(window).scrollTop();
var ht = $(window).height();
var coll = document.getElementsByClassName("collapsible");
var i;

for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.maxHeight){
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight+10 + "px";
      content.style.height = content.scrollHeight + 10 + "px";

      var top=$(window).scrollTop();
      console.log(top);
      setTimeout(
        function()
        {
            $("html, body").animate({ scrollTop:  top+ht*0.8}, 600);
            console.log("Jello");
        }, 50);
    }
  });
}

// var scrolling = document.getElementById("featured");
//
// scrolling.addEventListener("click", function() {
//   $("html, body").animate({ scrollTop:  60}, 400);
//
// });
//
// var scrolling1 = document.getElementById("new");
//
// scrolling1.addEventListener("click", function() {
//   $("html, body").animate({ scrollTop:  ht+160}, 800);
//
// });
//
// var scrolling2 = document.getElementById("popular");
//
// scrolling2.addEventListener("click", function() {
//   $("html, body").animate({ scrollTop:  2*ht+260}, 1400);
//
// });
