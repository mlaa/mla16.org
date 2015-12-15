/* Twitter module */

module.exports = function (Module, App, Backbone) {

  'use strict';

  require('./views/conversation-view.js')(Module, App, Backbone);

  var Router = require('./routers/twitter-router.js')(Module, App, Backbone);
  var Controller = require('./controllers/twitter-controller.js')(Module, App, Backbone);

  App.addInitializer(function () {
    Module.router = new Router({
      controller: new Controller()
    });
  });

};
