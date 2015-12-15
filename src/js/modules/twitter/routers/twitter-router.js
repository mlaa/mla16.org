/* Twitter router */

'use strict';

module.exports = function (Module, App, Backbone) {
  return Backbone.Marionette.AppRouter.extend({
    initialize: function (options) {
      // Routes added on initializer are in reverse priority order.
      this.route(/^conversation\/?$/, options.controller.showConversation);
    }
  });
};
