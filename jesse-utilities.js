// $ = jQuery. window = this. undefined = undefined.
(function ($, window, undefined) {
  'use strict';

  var nativeForEach = Array.prototype.forEach, Utilities;

  Utilities = {
    addCommas: function (nStr) {
      var rgx = /(\d+)(\d{3})/, x, x1, x2;

      nStr += '';
      x     = nStr.split('.');
      x1    = x[0];
      x2    = x.length > 1 ? '.' + x[1] : '';

      while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
      }

      return x1 + x2;
    },

    truncateStr: function (str, limit) {
      if (str.length > limit) {
        return str.substring(0, limit) + '...';
      }

      return str;
    },

    todayPlusN: function (nDays) {
      var today = new Date();

      today.setDate(today.getDate() + nDays);

      return today;
    },

    toIsoDate: function (date) {
      var pad = function (n) { return n < 10 ? '0' + n : n; };

      return date.getFullYear() + '-' + pad(date.getMonth() + 1) + '-' + pad(date.getDate());
    },

    isLastDayOfMonth: function (date) {
      var date1 = new Date(date.toString()),
          date2 = new Date(date.toString());

      date2.setDate(date2.getDate() + 1);

      return date1.getMonth() !== date2.getMonth();
    },

    lastDayOfMonth: function (date) {
      return new Date(date.getFullYear(), date.getMonth() + 1, 0);
    },

    firstDayOfMonth: function (date) {
      return new Date(date.getFullYear(), date.getMonth(), 1);
    },

    ensureNamespace: function (namespaceString) {
      var tokens  = namespaceString.split('.'),
          ns      = window;

      if (nativeForEach && obj.forEach === nativeForEach) {
        tokens.forEach(function (token) {
          ns[token] = ns[token] || {};
          ns        = ns[token];
        });
      } else {
        for (var i = 0, length = tokens.length; i < length; i++) {
          ns[token] = ns[tokens[i]] || {};
          ns        = ns[tokens[i]];
        }
      }
    },

    deparam: function (queryString) {
      var hash = {}, cleanedQueryString, tokens, key, value, parts;

      if (queryString === '' || typeof queryString === 'undefined') { return; }

      // Trims the '?' from the front of the queryString if it is present.
      queryString.charAt(0) === '?' ? queryString.substring(1) : queryString;

      cleanedQueryString = decodeURIComponent(queryString);
      tokens             = cleanedQueryString.split('&');

      if (nativeForEach && obj.forEach === nativeForEach) {
        tokens.forEach(function (token) {
          parts     = token.split('=');
          key       = parts[0];
          value     = parts[1];
          hash[key] = value;
        });
      } else {
        for (var i = 0, length = tokens.length; i < length; i++) {
          parts     = tokens[i].split('=');
          key       = parts[0];
          value     = parts[1];
          hash[key] = value;
        }
      }

      return hash;
    },

    isValuePresent: function (attr) {
      // String validation.
      if (typeof attr === 'string' && attr === '') {
        return false;
      }

      // Non-string validation.
      if (Number.isNaN(attr) || attr === null || typeof attr === 'undefined') {
        return false;
      }

      return true;
    },

    isIsoDate: function (str) {
      return (/^\d{4}\-\d{2}-\d{2}$/).test(str);
    },

    hideOnClickOffOf: function ($container, $button, clickOffBehavior) {
      var containerOrButton;

      if (!$) { throw new Error('This method requires jQuery'); }

      $button    = $button    instanceof $ ? $button    : $($button);
      $container = $container instanceof $ ? $container : $($container);

      containerOrButton = function (e) {
        return (!$button.is(e.target) && $button.has(e.target).length === 0) &&
            (!$container.is(e.target) && $container.has(e.target).length === 0);
      };

      $(document).on('click', function (e) {
        if (!containerOrButton(e)) { return; }

        switch (clickOffBehavior) {
        case 'opacity':
          $container.animate({ opacity: 0 }, 'fast');

          break;
        case 'fade':
          $container.fadeOut('fast');

          break;
        case 'remove':
          $container.remove();

          break;
        default:
          $container.hide();
        }
      });
    }
  };

  window.Utilities = Utilities || {};

}(jQuery, this));
