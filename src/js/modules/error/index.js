/* Error module */

'use strict';

module.exports = function (Module, App, Backbone) {

  require('./models/error-model.js')(Module, App, Backbone);
  require('./views/error-view.js')(Module, App, Backbone);

  var Router = require('./routers/error-router.js')(Module, App, Backbone);
  var Controller = require('./controllers/error-controller.js')(Module, App, Backbone);

  App.addInitializer(function () {
    Module.router = new Router({
      controller: new Controller()
    });
  });

};
