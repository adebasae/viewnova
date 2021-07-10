function openModal(modalId, modalSize) {
  var $html = $('html');
  var $modal = $(modalId);
  var $background = $modal.find('.modal__background');
  var $closeButton = $modal.find('.modal__card-close');
  var $closeFormButton = $modal.find('[proto-modal-cerrar]');

  // Añadimos clase variante de tamaño al modal
  $modal.addClass(modalSize);

  // Añadimos las clases necesarias para mostrar el modal
  $html.addClass('modal-is-open');
  $modal.addClass('is-active');

  // Nos asociamos a los eventos de cierre del modal
  //$background.bind('click', closeModal);
  $closeButton.bind('click', closeModal);
  $closeFormButton.bind('click', closeModal);
  $(document).bind('keyup', closeModalOnEsc);

  function closeModal() {
    $html.removeClass('modal-is-open');
    $modal.removeClass('is-active');

    $background.unbind('click', closeModal);
    $closeButton.unbind('click', closeModal);
    $(document).unbind('keyup', closeModalOnEsc);
  }

  function closeModalOnEsc(event) {
    if (event.keyCode == 27) {
      // escape key maps to keycode `27`
      closeModal();
    }
  }

  return false;
}

function closeModal(modalID) {
  var $html = $('html');
  var $modal = $(modalID);
  var $background = $modal.find('.modal__background');
  var $closeButton = $modal.find('.modal__close');
  var $closeFormButton = $modal.find('[modal-cerrar]');
  $html.removeClass('modal-is-open');
  $modal.removeClass('is-active');
}

$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});
