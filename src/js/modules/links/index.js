/* Link handler module */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;
  var _ = Backbone._;

  var $body = $('body');

  var hasPushState = Backbone.history.history && Backbone.history.history.pushState;

  var updateHistoryState = function (obj, url) {
    if (hasPushState) {
      var newState = _.extend({}, Backbone.history.history.state, obj);
      Backbone.history.history.replaceState(newState, document.title, url);
    }
  };

  var getHistoryState = function () {
    return (hasPushState) ? Backbone.history.history.state || {} : {};
  };

  // Listen for internal links when pushState is enabled.
  $body.on('click', 'a', function (e) {

    if (hasPushState) {

      // Only act on internal links.
      var href = $(this).attr('href');

      if (href && href.charAt(0) === '/') {

        e.preventDefault();

        var scrollPos = document.body.scrollTop || document.documentElement.scrollTop || 0;

        updateHistoryState({scrollPos: scrollPos});
        Backbone.history.navigate(href.substring(1), true);
        App.Storage.local.setItem('mla16-last-visited', href.substring(1));

      }

    }

  });

  // Listen for UI back-button clicks.
  $('body').on('click', '.button-back', function () {
    window.history.back();
  });

  Module.clientSidePages = ['saved'];
  Module.updateHistoryState = updateHistoryState;
  Module.getHistoryState = getHistoryState;

};
