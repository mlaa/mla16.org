/* Session router */

'use strict';

module.exports = function (Module, App, Backbone) {
  return Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      'program/:category': 'showSessionsByCategory',
      'saved': 'showSavedSessions',
      'search': 'showSessionsBySearch'
    },
    initialize: function (options) {
      // RegEx routes go through Backbone.Router.
      this.route(/^([0-9A-Z]+)$/, options.controller.showSessionByID);
    }
  });
};
