(function ($, window, document, undefined) {

   'use strict';

   $('.callout').each(function(i) {
     $(this).addClass("callout-"+(i+1));
    });

})(jQuery, window, document);
