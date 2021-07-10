$(window).on('load', function () {
  $('.highlight').not('#icon-page .highlight').css('display', 'none');

  // Start the caroussel after the entire page including all graphics have
  // finished loading.

  $('.menu-buttom').on('click', function (e) {
    e.preventDefault();
    $('.main-menu').toggleClass('visible');
    $('body').toggleClass('fix');
    $(this).children().toggleClass('u-display-none');
  });

  $('.menu-buttom__close').on('click', function (e) {
    e.preventDefault();
    $('.main-menu').removeClass('visible');
  });

  $('.m-mobile__item .dropdown-link').on('click', function (e) {
    e.preventDefault();
    $('.dropdown-menu--mobile').addClass('visible');
  });

  $('.m-mobile__item .dropdown-menu--mobile .dropdown-menu--item-cerrar').on(
    'click',
    function (e) {
      e.preventDefault();
      $('.dropdown-menu--mobile').removeClass('visible');
    },
  );

  $('.link-notificaciones').on('click', function (e) {
    e.preventDefault();
    $('.block-link--dropdown').toggleClass('visible');
    $('.block-link--dropdown .block-link__item')
      .removeClass('hidden')
      .addClass('visible');
  });

  $('.block-link--dropdown .block-link__item .icon').on('click', function (e) {
    $(this).parent().addClass('hidden');
    $(this).parent().removeClass('visible');
    const $blocks = $(this)
      .closest('header')
      .find('.block-link--dropdown div.block-link__item.visible');
    if ($blocks.length === 0) {
      $('.block-link--dropdown').toggleClass('visible');
    }
  });

  const $menu = $('.main-menu__item--dropdown .dropdown-link');
  $menu.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).next().toggleClass('visible');
  });
  $(document).mouseup((e) => {
    if (!$menu.is(e.target) && $menu.has(e.target).length === 0) {
      $menu.next().removeClass('visible');
    }
  });

  $('.edit-iban').on('click', function (e) {
    e.preventDefault();
    $('.form-iban').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.edit-datos').on('click', function (e) {
    e.preventDefault();
    $('.form-datos').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.edit-acceso').on('click', function (e) {
    e.preventDefault();
    $('.form-acceso').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.edit-habitual').on('click', function (e) {
    e.preventDefault();
    $('.form-habitual').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.edit-entrega').on('click', function (e) {
    e.preventDefault();
    $('.form-entrega').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.edit-facturacion').on('click', function (e) {
    e.preventDefault();
    $('.form-facturacion').toggleClass('visible');
    $('body').toggleClass('fix');
  });
  $('.edit-anadir').on('click', function (e) {
    e.preventDefault();
    $('.form-anadir').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.edit-anadir-facturacion').on('click', function (e) {
    e.preventDefault();
    $('.form-anadir-facturacion').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.edit-baja').on('click', function (e) {
    e.preventDefault();
    $('.form-baja').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.open-cancelacion').on('click', function (e) {
    e.preventDefault();
    $('.form-cancelacion').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.open-motivos').on('click', function (e) {
    e.preventDefault();
    $('.form-motivos').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.open-gracias').on('click', function (e) {
    e.preventDefault();
    $('.form-gracias').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  //tarjeta oro
  $('.solicitar-oro').on('click', function (e) {
    e.preventDefault();
    $('.form-oro').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.calcular').on('click', function (e) {
    e.preventDefault();
    $('.form-calculadora').toggleClass('visible');
    $('body').toggleClass('fix');
  });

  $('.link-prev').on('click', function (e) {
    e.preventDefault();
    $('.bloque-form').removeClass('visible');
    $('body').removeClass('fix');
  });

  $('.has-datepicker').on('click', function () {
    $('#ui-datepicker-div').css('display', 'block');
  });

  $('.fila-compras').click(function () {
    $(this).toggleClass('activa');
    $(this).next('.detalle-fila').toggleClass('u-display-none');
  });

  //evento teclado
  $('.fila-compras').keydown(function () {
    $(this).toggleClass('activa');
    $(this).next('.detalle-fila').toggleClass('u-display-none');
  });

  //abrir formularios
  $('#particular').click(function () {
    $('#form-particular').addClass('visible');
    $('#form-empresa').removeClass('visible');
  });

  $('#empresa').click(function () {
    $('#form-empresa').addClass('visible');
    $('#form-particular').removeClass('visible');
  });

  $('#particular-new').click(function () {
    $('#form-particular-new').addClass('visible');
    $('#form-empresa-new').removeClass('visible');
  });

  $('#empresa-new').click(function () {
    $('#form-empresa-new').addClass('visible');
    $('#form-particular-new').removeClass('visible');
  });

  $('.open').change(function () {
    const padre = $(this).parent().parent();
    if ($(this).prop('checked')) {
      padre.addClass('u-margin-bottom-none');
      padre.next().removeClass('u-display-none');
      return;
    }
    padre.removeClass('u-margin-bottom-none');
    padre.next().addClass('u-display-none');
  });
});
