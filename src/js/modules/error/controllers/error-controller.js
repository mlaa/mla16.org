/* Error controller */

'use strict';

module.exports = function (Module, App, Backbone) {

  var showError = function (error) {

    error = error || {};

    App.vent.trigger('ui:setPageClasses', 'error');
    App.vent.trigger('ui:setPageTitle', 'Error');

    App.Content.show(
      new Module.Views.Error({
        model: new Module.Models.ErrorModel(error)
      })
    );
  };

  App.vent.bind('error', showError);

  return Backbone.Marionette.Controller.extend({
    showError: showError
  });

};
