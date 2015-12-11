/* Session router */

'use strict';

module.exports = function (Module, App, Backbone) {
  return Backbone.Marionette.AppRouter.extend({
    initialize: function (options) {
      this.route(/^([0-9A-Z]+)$/, options.controller.showSessionByID);
      this.route(/^program\/([a-z,]+)$/, options.controller.showSessionsByCategory);
    }
  });
};
