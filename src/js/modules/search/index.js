/* Search module */

'use strict';

module.exports = function (Module, App, Backbone) {

  var Router = require('./routers/search-router.js')(Module, App, Backbone);
  var Controller = require('./controllers/search-controller.js')(Module, App, Backbone);

  App.addInitializer(function() {
    Module.router = new Router({
      controller: new Controller()
    });
  });

};
