/* LocalStorage module */

'use strict';

module.exports = function (Module, App, Backbone) {

  require('./polyfill.js')(Module);

  if (!App.isPhantom && Backbone.history.fragment === '' && document.referrer === '') {
    // Load the user's last visited page.
    var lastVisited = Module.local.getItem('mla16-last-visited');
    if (lastVisited) {
      Backbone.history.history.replaceState({}, null, '/' + lastVisited);
    }
  }

};
