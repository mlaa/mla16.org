/* Data module */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;
  var _ = Backbone._;

  var handleFetchError = function () {
    App.vent.trigger('error', {
      title: 'Error',
      type: 'data'
    });
  };

  // Check if we are still waiting on a promise to be resolved.
  var checkPromises = function () {

    var waiting = _.reduce(Module.Promises, function (memo, promise) {
      return (promise.state() === 'resolved') ? memo : 1;
    }, 0);

    if (!waiting) {
      Module.Waiting = false;
      App.vent.trigger('ui:hideLoading');
    }

  };

  // Return a promise for the data via jQuery.
  var getData = function (url) {
    return $.getJSON(url).done(checkPromises).fail(handleFetchError);
  };

  // Create promises for the site data.
  Module.Promises = {
    program: getData('/data/program.json'),
    people: getData('/data/people.json'),
    info: getData('/data/info.json'),
    updated: getData('/data/updated.json')
  };

  // Indicator for unresolved promises.
  Module.Waiting = true;

};
