/* Menu module */

'use strict';

module.exports = function (Module, App, Backbone) {

  require('./data/menu-data.js')(Module, App, Backbone);
  require('./models/menu-model.js')(Module, App, Backbone);
  require('./views/menu-view.js')(Module, App, Backbone);

  var Router = require('./routers/menu-router.js')(Module, App, Backbone);
  var Controller = require('./controllers/menu-controller.js')(Module, App, Backbone);

  App.addInitializer(function() {
    Module.router = new Router({
      controller: new Controller()
    });
  });

};
