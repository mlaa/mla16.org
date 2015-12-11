/* Updated module */

module.exports = function (Module, App, Backbone) {

  'use strict';

  require('./views/updated-view.js')(Module, App, Backbone);

  // Add update information to the updated region.
  App.Data.Promises.updated.done(function (update) {
    App.Notice.show(
      new Module.Views.Updated({
        model: new Backbone.Model(update)
      })
    );
  });

};
