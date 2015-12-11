/* Session module */

module.exports = function (Module, App, Backbone) {

  'use strict';

  require('./data/vcc-maps-data.js')(Module, App, Backbone);
  require('./models/session-model.js')(Module, App, Backbone);
  require('./models/session-detail-model.js')(Module, App, Backbone);
  require('./views/session-view.js')(Module, App, Backbone);
  require('./views/session-detail-view.js')(Module, App, Backbone);

  var Router = require('./routers/session-router.js')(Module, App, Backbone);
  var Controller = require('./controllers/session-controller.js')(Module, App, Backbone);

  App.addInitializer(function () {
    Module.router = new Router({
      controller: new Controller()
    });
  });

};
