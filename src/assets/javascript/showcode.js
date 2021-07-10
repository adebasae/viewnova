$('.showcode').on('click', function () {
  $(this).toggleClass('js-showing');
  if ($(this).hasClass('js-showing')) {
    $(this).html('Ocultar código');
    $(this).next('.highlight').slideDown();
  } else {
    $(this).html('Mostrar código');
    $(this).next('.highlight').slideUp();
  }
});
