!function(){"use strict";window.addEventListener("load",function(){var t=document.getElementsByClassName("needs-validation");Array.prototype.filter.call(t,function(e){e.addEventListener("submit",function(t){!1===e.checkValidity()&&(t.preventDefault(),t.stopPropagation()),e.classList.add("was-validated")},!1)});document.getElementById("resetFormButtonId").addEventListener("click",function(){document.getElementsByClassName("needs-validation")[0].classList.remove("was-validated")},!1),document.getElementById("scrollUpButtonId").addEventListener("click",function(){window.scroll({behavior:"smooth",left:0,top:0})},!1)},!1);var d=$("[in-view-animation]");function r(){d.each(function(t,e){if(i=$(this),a=100,o=$(window).scrollTop(),s=o+$(window).height(),(l=$(i).offset().top)+$(i).height()<=s&&o<=l+a){var n=$(this).attr("in-view-animation");$(this).addClass(n),0===(d=d.not(e)).length&&$(window).off("scroll resize",r)}var i,a,o,s,l})}r(),$(window).on("scroll resize",r),$("#v-pills-tab").on("shown.bs.tab",function(t){t.target,t.relatedTarget,$("#aboutMeHeaderId").removeClass("pills_header_animation_in").toggleClass("pills_header_animation_out")})}();