/* Info router */

'use strict';

module.exports = function (Module, App, Backbone) {
  return Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'info/:resource': 'showInfo'
    }
  });
};
