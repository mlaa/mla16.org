/* Person router */

'use strict';

module.exports = function (Module, App, Backbone) {
  return Backbone.Marionette.AppRouter.extend({
    initialize: function (options) {
      this.route(/^people\/([A-Z])$/, options.controller.showMenu);
      this.route(/^people\/([0-9]+)$/, options.controller.showPerson);
    }
  });
};
