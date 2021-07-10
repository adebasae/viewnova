if ($(window).width() < 768) {
  $('input.has-datepicker').attr('type', 'date');
}

if ($(window).width() > 768) {
  $(window).on('load', function () {
    $('.has-datepicker').each(function () {
      $(this).mask('00/00/0000');
    });
    $('input.has-datepicker').datepicker({
      duration: '',
      changeMonth: false,
      changeYear: false,
      yearRange: '2019:2025',
      showTime: false,
      time24h: true,
    });
    $.datepicker.regional['es'] = {
      closeText: 'Cerrar',
      prevText: '&#x3C;',
      nextText: '&#x3E;',
      currentText: 'Hoy',
      monthNames: [
        'enero',
        'febrero',
        'marzo',
        'abril',
        'mayo',
        'junio',
        'julio',
        'agosto',
        'septiembre',
        'octubre',
        'noviembre',
        'diciembre',
      ],
      monthNamesShort: [
        'ene',
        'feb',
        'mar',
        'abr',
        'may',
        'jun',
        'jul',
        'ago',
        'sep',
        'oct',
        'nov',
        'dic',
      ],
      dayNames: [
        'domingo',
        'lunes',
        'martes',
        'miércoles',
        'jueves',
        'viernes',
        'sábado',
      ],
      dayNamesShort: ['dom', 'lun', 'mar', 'mié', 'jue', 'vie', 'sáb'],
      dayNamesMin: ['D', 'L', 'M', 'X', 'J', 'V', 'S'],
      weekHeader: 'Sm',
      dateFormat: 'dd/mm/yy',
      firstDay: 1,
      isRTL: false,
      showMonthAfterYear: false,
      yearSuffix: '',
    };
    $.datepicker.setDefaults($.datepicker.regional['es']);
  });
}

if ($(window).width() > 768) {
  $(window).on('load', function () {
    $('.has-datepicker-month').each(function () {
      $(this).mask('00/0000');
    });

    $(function () {
      $('.has-datepicker-month').datepicker({
        dateFormat: 'mm/yy',
        changeMonth: true,
        changeYear: true,
        showButtonPanel: true,
        closeText: 'Aceptar',
        currentText: 'Mes actual',
        onClose: function (dateText, inst) {
          inst.dpDiv.removeClass('month_year_datepicker');
          function isDonePressed() {
            return (
              $('#ui-datepicker-div')
                .html()
                .indexOf(
                  'ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all ui-state-hover',
                ) > -1
            );
          }
          if (isDonePressed()) {
            var month = $(
              '#ui-datepicker-div .ui-datepicker-month :selected',
            ).val();
            var year = $(
              '#ui-datepicker-div .ui-datepicker-year :selected',
            ).val();
            $(this)
              .datepicker('setDate', new Date(year, month, 1))
              .trigger('change');

            $('.date-picker').focusout(); //Added to remove focus from datepicker input box on selecting date
          }
        },
        beforeShow: function (input, inst) {
          inst.dpDiv.addClass('month_year_datepicker');
          if ((datestr = $(this).val()).length > 0) {
            year = datestr.substring(datestr.length - 4, datestr.length);
            month = datestr.substring(0, 2);
            $(this).datepicker(
              'option',
              'defaultDate',
              new Date(year, month - 1, 1),
            );
            $(this).datepicker('setDate', new Date(year, month - 1, 1));
            $('.ui-datepicker-calendar').hide();
          }
        },
      });
    });
  });
}
