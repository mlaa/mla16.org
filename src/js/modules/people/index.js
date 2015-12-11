/* Person module */

'use strict';

module.exports = function (Module, App, Backbone) {

  require('./models/person-model.js')(Module, App, Backbone);
  require('./views/person-list-view.js')(Module, App, Backbone);

  var Router = require('./routers/person-router.js')(Module, App, Backbone);
  var Controller = require('./controllers/person-controller.js')(Module, App, Backbone);

  App.addInitializer(function() {
    Module.router = new Router({
      controller: new Controller()
    });
  });

};
