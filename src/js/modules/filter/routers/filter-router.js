/* Filter router */

'use strict';

module.exports = function (Module, App, Backbone) {
  return Backbone.Marionette.AppRouter.extend({
    initialize: function (options) {
      this.route(/^filter$/, options.controller.showFilters);
      this.route(/^filter\/([a-z,]+)$/, options.controller.showFilters);
    }
  });
};
