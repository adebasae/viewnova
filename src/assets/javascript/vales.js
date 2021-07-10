$('.listado-vales .bloque-vale-content').on('click', function () {
  $('.listado-vales').find('.detalle-container.visible').remove();

  const $items = $('.bloque-vale__total');
  $items.removeClass('active');

  const $padre = $(this).closest('.bloque-vale__total');
  $padre.addClass('active');

  const index = $items.index($padre) + 1;

  const $divDetalle = $padre.find('.detalle-container');
  const $divTemp = $divDetalle.clone(true);
  $divTemp.addClass('visible').removeClass('no-active');

  if ($(window).outerWidth() < 992) {
    let index2 = index - 1;
    $items.eq(index2).after($divTemp.get(0).outerHTML);
  }

  if ($(window).outerWidth() > 992 && $(window).outerWidth() < 1200) {
    let index2 = index - 1;
    if (index % 2) {
      $items.eq(index2 + 1).after($divTemp.get(0).outerHTML);
    } else {
      $items.eq(index2).after($divTemp.get(0).outerHTML);
    }
  }

  if ($(window).outerWidth() > 1199) {
    let last = 0;
    if (index > 0) {
      last = Math.ceil(index / 3.0) * 3;
    } else if (index < 0) {
      last = Math.floor(index / 3.0) * 3;
    } else {
      last = 3;
    }
    $items.eq(last - 1).after($divTemp.get(0).outerHTML);
  }

  const $altura = $padre.offset().top + $padre.outerHeight(true);
  $('html,body').animate(
    {
      scrollTop: $altura - 60,
    },
    'slow',
  );
});

$(document).on('click', '.bloque-vale__close', function () {
  $('.listado-vales').find('.detalle-container.visible').remove();
  $('.listado-vales .bloque-vale__total.active').removeClass('active');
});

//Evento con el teclado
$(document).on('keydown', '.bloque-vale__close', function () {
  $('.listado-vales').find('.detalle-container.visible').remove();
  $('.listado-vales .bloque-vale__total.active').removeClass('active');
});

$(document).on(
  'click',
  '.listado-vales__activos .bloque-vale__total .activar-vale',
  function () {
    const padre = $(this).closest('.bloque-vale__total');
    padre.next('.detalle-container').hide();
    padre.hide();
  },
);

$(document).on(
  'click',
  '.listado-vales__activos .detalle-container .activar-vale',
  function () {
    const padre = $(this).closest('.detalle-container');
    padre.prev('.bloque-vale__total').hide();
    padre.hide();
  },
);
