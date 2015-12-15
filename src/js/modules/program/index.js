/* Session module */

module.exports = function (Module, App, Backbone) {

  'use strict';

  require('./models/program-model.js')(Module, App, Backbone);
  require('./models/session-model.js')(Module, App, Backbone);
  require('./views/program-view.js')(Module, App, Backbone);
  require('./views/session-view.js')(Module, App, Backbone);

  var Router = require('./routers/program-router.js')(Module, App, Backbone);
  var Controller = require('./controllers/program-controller.js')(Module, App, Backbone);

  App.addInitializer(function () {
    Module.router = new Router({
      controller: new Controller()
    });
  });

};
