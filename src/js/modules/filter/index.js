/* Filter module */

'use strict';

module.exports = function (Module, App, Backbone) {

  require('./data/filter-data.js')(Module, App, Backbone);
  require('./models/filter-model.js')(Module, App, Backbone);
  require('./views/filter-view.js')(Module, App, Backbone);

  var Router = require('./routers/filter-router.js')(Module, App, Backbone);
  var Controller = require('./controllers/filter-controller.js')(Module, App, Backbone);

  App.addInitializer(function () {
    Module.router = new Router({
      controller: new Controller()
    });
  });

};
