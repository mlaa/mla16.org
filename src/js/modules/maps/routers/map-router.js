/* Map router */

'use strict';

module.exports = function (Module, App, Backbone) {
  return Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'maps/:resource': 'showMap'
    }
  });
};
