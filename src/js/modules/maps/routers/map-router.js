/* Map router */

'use strict';

module.exports = function (Module, App, Backbone) {
  return Backbone.Marionette.AppRouter.extend({
    initialize: function (options) {
      this.route(/^maps\/(.+)$/, options.controller.showMap);
    }
  });
};
