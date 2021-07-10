$(window).on('load', function () {
  $('#form-datos').validate({
    rules: {
      nif: { nif: true },
      nie: { nie: true },
    },
  });

  $('#form-datos-list').validate();
  $('#form-datos-movil').validate();
  $('#form-datos-movil-verificar').validate();

  $('#form-direccion').validate();
  $('#form-direccion-entrega').validate();
  $('#form-direccion-entrega-new').validate();

  $('#form-particular').validate();

  $('#form-empresa').validate({
    rules: {
      cif: { cif: true },
    },
  });

  $('#form-particular-new').validate();
  $('#form-empresa-new').validate();

  $('#form-datos-usuario').validate({
    rules: {
      'psw-actual': { pwd: true },
      psw: { pwd: true },
      'psw-repeat': { pwd: true },
    },
  });

  $('#form-iban').validate({
    rules: {
      iban: { iban: true },
    },
  });

  $('#form-gasto').validate();

  $("input[type='phone']").keydown(function (e) {
    var oldvalue = $(this).val();
    var field = this;
    var selectValue = $(this).parent().find('select').val();
    setTimeout(function () {
      if (field.value.indexOf(selectValue) !== 0) {
        $(field).val(oldvalue);
      }
    }, 1);
  });

  $('select.pais-telefono').on('change', function () {
    $(this).parent().next().val($(this).val());
  });

  $('select.select-dni').on('change', function () {
    var tipo = $(this).val();
    $(this).parent().next().attr('name', tipo);
  });

  $('.switch .familia-numerosa').change(function () {
    var required = $(this).is(':checked') ? true : false;
    $('#carnet-familia-list').attr('data-rule-required', required);
    $('#caducidad-list').attr('data-rule-required', required);

    $('.bloque-datos__datos .familia-numerosa-true').toggleClass('visible');
    if (window.innerWidth < 800) {
      $('html,body').animate(
        {
          scrollTop: $('.familia-numerosa-true').offset().top - 200,
        },
        500,
      );
    }
  });

  $('.form-control.familia-numerosa').change(function () {
    var required = $(this).is(':checked') ? true : false;
    $('#carnet-familia').attr('data-rule-required', required);
    $('#caducidad').attr('data-rule-required', required);

    $('.form-datos .familia-numerosa-true').toggleClass('visible');
    $('.form-datos').animate(
      {
        scrollTop: $('.form-datos .familia-numerosa-true').offset().top + 550,
      },
      500,
    );
  });

  $('#cuenta').mask('SS00 0000 0000 0000 0000 00');

  $('#form-gasto .tabs-block__selector a').click(function () {
    if (!$(this).hasClass('active')) {
      $('#form-gasto .tabs-block__cuota.active')
        .removeClass('active')
        .siblings()
        .addClass('active');
      $(this).addClass('active').siblings().removeClass('active');
    }
  });

  //
  // Validadores custom
  //
  $.validator.addMethod(
    'nif',
    function (value, element) {
      'use strict';
      value = value.toUpperCase();
      // Basic format test
      if (
        !value.match(
          '((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)',
        )
      ) {
        return false;
      }
      // Test NIF
      if (/^[0-9]{8}[A-Z]{1}$/.test(value)) {
        return (
          'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(value.substring(8, 0) % 23) ===
          value.charAt(8)
        );
      }
      // Test specials NIF (starts with K, L or M)
      if (/^[KLM]{1}/.test(value)) {
        return value[8] === String.fromCharCode(64);
      }
      return false;
    },
    'Por favor introduce un NIF valido.',
  );

  $.validator.addMethod(
    'nie',
    function (value, element) {
      'use strict';
      value = value.toUpperCase();
      // Basic format test
      if (
        !value.match(
          '((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)',
        )
      ) {
        return false;
      }
      // Test NIE
      //T
      if (/^[T]{1}/.test(value)) {
        return value[8] === /^[T]{1}[A-Z0-9]{8}$/.test(value);
      }
      //XYZ
      if (/^[XYZ]{1}/.test(value)) {
        return (
          value[8] ===
          'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(
            value
              .replace('X', '0')
              .replace('Y', '1')
              .replace('Z', '2')
              .substring(0, 8) % 23,
          )
        );
      }
      return false;
    },
    'Por favor introduce un NIE valido.',
  );

  $.validator.addMethod(
    'cif',
    function (value, element) {
      'use strict';
      var sum,
        num = [],
        controlDigit;

      value = value.toUpperCase();
      // Basic format test
      if (
        !value.match(
          '((^[A-Z]{1}[0-9]{7}[A-Z0-9]{1}$|^[T]{1}[A-Z0-9]{8}$)|^[0-9]{8}[A-Z]{1}$)',
        )
      ) {
        return false;
      }
      for (var i = 0; i < 9; i++) {
        num[i] = parseInt(value.charAt(i), 10);
      }
      // Algorithm for checking CIF codes
      sum = num[2] + num[4] + num[6];
      for (var count = 1; count < 8; count += 2) {
        var tmp = (2 * num[count]).toString(),
          secondDigit = tmp.charAt(1);

        sum +=
          parseInt(tmp.charAt(0), 10) +
          (secondDigit === '' ? 0 : parseInt(secondDigit, 10));
      }
      // CIF test
      if (/^[ABCDEFGHJNPQRSUVW]{1}/.test(value)) {
        sum += '';
        controlDigit = 10 - parseInt(sum.charAt(sum.length - 1), 10);
        value += controlDigit;
        return (
          num[8].toString() === String.fromCharCode(64 + controlDigit) ||
          num[8].toString() === value.charAt(value.length - 1)
        );
      }
      return false;
    },
    'Por favor introduce un CIF valido.',
  );

  $.validator.addMethod(
    'pwd',
    function (value) {
      return (
        value.length >= 8 && //proper length
        /^[A-Za-z0-9\d=!\-@._*]*$/.test(value) && // consists of only these
        /[a-z]/.test(value) && // has a lowercase letter
        /\d/.test(value)
      ); // has a digit
    },
    'Por favor introduce una contraseña valida.',
  );

  $.validator.addMethod(
    'iban',
    function (value, element) {
      // Some quick simple tests to prevent needless work
      if (this.optional(element)) {
        return true;
      }

      // Remove spaces and to upper case
      var iban = value.replace(/ /g, '').toUpperCase(),
        ibancheckdigits = '',
        leadingZeroes = true,
        cRest = '',
        cOperator = '',
        countrycode,
        ibancheck,
        charAt,
        cChar,
        bbanpattern,
        bbancountrypatterns,
        ibanregexp,
        i,
        p;

      // Check for IBAN code length.
      // It contains:
      // country code ISO 3166-1 - two letters,
      // two check digits,
      // Basic Bank Account Number (BBAN) - up to 30 chars
      var minimalIBANlength = 5;
      if (iban.length < minimalIBANlength) {
        return false;
      }

      // Check the country code and find the country specific format
      countrycode = iban.substring(0, 2);
      bbancountrypatterns = {
        AL: '\\d{8}[\\dA-Z]{16}',
        AD: '\\d{8}[\\dA-Z]{12}',
        AT: '\\d{16}',
        AZ: '[\\dA-Z]{4}\\d{20}',
        BE: '\\d{12}',
        BH: '[A-Z]{4}[\\dA-Z]{14}',
        BA: '\\d{16}',
        BR: '\\d{23}[A-Z][\\dA-Z]',
        BG: '[A-Z]{4}\\d{6}[\\dA-Z]{8}',
        CR: '\\d{17}',
        HR: '\\d{17}',
        CY: '\\d{8}[\\dA-Z]{16}',
        CZ: '\\d{20}',
        DK: '\\d{14}',
        DO: '[A-Z]{4}\\d{20}',
        EE: '\\d{16}',
        FO: '\\d{14}',
        FI: '\\d{14}',
        FR: '\\d{10}[\\dA-Z]{11}\\d{2}',
        GE: '[\\dA-Z]{2}\\d{16}',
        DE: '\\d{18}',
        GI: '[A-Z]{4}[\\dA-Z]{15}',
        GR: '\\d{7}[\\dA-Z]{16}',
        GL: '\\d{14}',
        GT: '[\\dA-Z]{4}[\\dA-Z]{20}',
        HU: '\\d{24}',
        IS: '\\d{22}',
        IE: '[\\dA-Z]{4}\\d{14}',
        IL: '\\d{19}',
        IT: '[A-Z]\\d{10}[\\dA-Z]{12}',
        KZ: '\\d{3}[\\dA-Z]{13}',
        KW: '[A-Z]{4}[\\dA-Z]{22}',
        LV: '[A-Z]{4}[\\dA-Z]{13}',
        LB: '\\d{4}[\\dA-Z]{20}',
        LI: '\\d{5}[\\dA-Z]{12}',
        LT: '\\d{16}',
        LU: '\\d{3}[\\dA-Z]{13}',
        MK: '\\d{3}[\\dA-Z]{10}\\d{2}',
        MT: '[A-Z]{4}\\d{5}[\\dA-Z]{18}',
        MR: '\\d{23}',
        MU: '[A-Z]{4}\\d{19}[A-Z]{3}',
        MC: '\\d{10}[\\dA-Z]{11}\\d{2}',
        MD: '[\\dA-Z]{2}\\d{18}',
        ME: '\\d{18}',
        NL: '[A-Z]{4}\\d{10}',
        NO: '\\d{11}',
        PK: '[\\dA-Z]{4}\\d{16}',
        PS: '[\\dA-Z]{4}\\d{21}',
        PL: '\\d{24}',
        PT: '\\d{21}',
        RO: '[A-Z]{4}[\\dA-Z]{16}',
        SM: '[A-Z]\\d{10}[\\dA-Z]{12}',
        SA: '\\d{2}[\\dA-Z]{18}',
        RS: '\\d{18}',
        SK: '\\d{20}',
        SI: '\\d{15}',
        ES: '\\d{20}',
        SE: '\\d{20}',
        CH: '\\d{5}[\\dA-Z]{12}',
        TN: '\\d{20}',
        TR: '\\d{5}[\\dA-Z]{17}',
        AE: '\\d{3}\\d{16}',
        GB: '[A-Z]{4}\\d{14}',
        VG: '[\\dA-Z]{4}\\d{16}',
      };

      bbanpattern = bbancountrypatterns[countrycode];

      // As new countries will start using IBAN in the
      // future, we only check if the countrycode is known.
      // This prevents false negatives, while almost all
      // false positives introduced by this, will be caught
      // by the checksum validation below anyway.
      // Strict checking should return FALSE for unknown
      // countries.
      if (typeof bbanpattern !== 'undefined') {
        ibanregexp = new RegExp('^[A-Z]{2}\\d{2}' + bbanpattern + '$', '');
        if (!ibanregexp.test(iban)) {
          return false; // Invalid country specific format
        }
      }

      // Now check the checksum, first convert to digits
      ibancheck = iban.substring(4, iban.length) + iban.substring(0, 4);
      for (i = 0; i < ibancheck.length; i++) {
        charAt = ibancheck.charAt(i);
        if (charAt !== '0') {
          leadingZeroes = false;
        }
        if (!leadingZeroes) {
          ibancheckdigits += '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(
            charAt,
          );
        }
      }

      // Calculate the result of: ibancheckdigits % 97
      for (p = 0; p < ibancheckdigits.length; p++) {
        cChar = ibancheckdigits.charAt(p);
        cOperator = '' + cRest + '' + cChar;
        cRest = cOperator % 97;
      }
      return cRest === 1;
    },
    'Por favor introduce un IBAN valido',
  );
});
