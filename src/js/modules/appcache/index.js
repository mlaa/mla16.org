/* App cache module */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;
  var appCache = window.applicationCache;

  if (appCache) {

    $(appCache).on('updateready', function () {
      appCache.swapCache();
    });

    try {
      appCache.update();
    } catch (e) {}

  }

};
