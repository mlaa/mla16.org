/* Error controller */

'use strict';

module.exports = function (Module, App, Backbone) {

  var _emptyError = function (header) {

    var error = {
      message: 'Nothing matched your request. Please try again.'
    };

    // Show error.
    App.Content.show(
      new Module.Views.Error.CollectionView({
        collection: new Module.Models.Error.Collection(header.concat([error]))
      })
    );

  };

  var _notFoundError = function (type) {

    var error = {
      message: 'The ' + type + ' you requested was not found.'
    };

    // Show error.
    App.Content.show(
      new Module.Views.Error.CollectionView({
        collection: new Module.Models.Error.Collection([error])
      })
    );

  };

  var _unknownError = function () {

    var error = {
      message: 'An unexpected error occurred. Please try again later.'
    };

    // Show error.
    App.Content.show(
      new Module.Views.Error.CollectionView({
        collection: new Module.Models.Error.Collection([error])
      })
    );

  };

  App.vent.bind('error:empty', _emptyError);
  App.vent.bind('error:notfound', _notFoundError);
  App.vent.bind('error:unknown', _unknownError);

  return Backbone.Marionette.Controller.extend({
    handleError: function () {
      _notFoundError('resource');
    }
  });

};
