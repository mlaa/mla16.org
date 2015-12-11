/* Info module */

module.exports = function (Module, App, Backbone) {

  'use strict';

  require('./models/info-model.js')(Module, App, Backbone);
  require('./views/info-view.js')(Module, App, Backbone);
  
  var Router = require('./routers/info-router.js')(Module, App, Backbone);
  var Controller = require('./controllers/info-controller.js')(Module, App, Backbone);

  App.addInitializer(function () {
    Module.router = new Router({
      controller: new Controller()
    });
  });

};
