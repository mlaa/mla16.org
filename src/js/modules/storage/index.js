/* LocalStorage module */

'use strict';

module.exports = function (Module, App, Backbone) {

  require('./polyfill.js')(Module);

  if (!App.isPhantom) {

    // If the user is loading the home page, load the user's last visited page.
    if (window.location.pathname === '/' && document.referrer === '') {
      var lastVisited = Module.local.getItem('mla16-last-visited');
      if (lastVisited) {
        Backbone.history.history.replaceState({}, null, '/' + lastVisited);
      }
    }

    // Save the current page as last-visited.
    App.Content.on('show', function () {
      App.Storage.local.setItem('mla16-last-visited', Backbone.history.fragment);
    });

  }

};
