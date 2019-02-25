(function () {
  'use strict';
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
    // Reset the contact form
    document.getElementById('resetFormButtonId').addEventListener('click', function () {
      var contactForms = document.getElementsByClassName('needs-validation');
      contactForms[0].classList.remove('was-validated');
      contactForms[0].reset();
    }, false);
    // Scroll up button
    document.getElementById('scrollUpButtonId').addEventListener('click', function () {
      window.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0
      });
    }, false);
  }, false);

  // Check if element is in view
  function isScrolledIntoView(elem, offSetButton) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
  
    return ((elemBottom <= docViewBottom) && (elemTop + offSetButton>= docViewTop));
  }
  // Get all the element that need to animate when are in view
  var elmentsToAnimate = $('[in-view-animation]');
  // Subscribe to scroll event to detect when element in view
  function checkIfInView() {
    // Check if in view for each element
    elmentsToAnimate.each(function (index, element) {
      if (isScrolledIntoView($(this), 100)) {
        // Get the class that will be added to the element that are in view
        var animateClassToAdd = $(this).attr('in-view-animation');
        $(this).addClass(animateClassToAdd);
        // Remove the element after applying the class from the ovservation
        elmentsToAnimate = elmentsToAnimate.not(element);
        // If no element left to observe Unsbscribe from the scroll event
        if (elmentsToAnimate.length === 0) {
          $(window).off('scroll resize', checkIfInView);
        }
      }
    });
  }
  // First Check
  checkIfInView();
  $(window).on('scroll resize', checkIfInView)

  // Tab animation
  $('#v-pills-tab').on('shown.bs.tab', function (e) {
    e.target // newly activated tab
    e.relatedTarget // previous active tab
    $('#aboutMeHeaderId').removeClass('pills_header_animation_in').toggleClass('pills_header_animation_out');
  })
})();