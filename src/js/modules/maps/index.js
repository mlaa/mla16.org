/* Map module */

module.exports = function (Module, App, Backbone) {

  'use strict';

  require('./data/map-data.js')(Module, App, Backbone);
  require('./models/map-model.js')(Module, App, Backbone);
  require('./views/map-view.js')(Module, App, Backbone);

  var Router = require('./routers/map-router.js')(Module, App, Backbone);
  var Controller = require('./controllers/map-controller.js')(Module, App, Backbone);

  App.addInitializer(function () {
    Module.router = new Router({
      controller: new Controller()
    });
  });

};
