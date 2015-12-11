/* Data module */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;
  var _ = Backbone._;
  var $html = $('html');

  // Return a promise for the data via jQuery.
  var _getData = function (url) {
    return $.getJSON(url).done(_checkPromises).fail(_handleFetchError);
  };

  var _handleFetchError = function () {
    App.vent.trigger('error:unknown');
  };

  // Lift loading indicator when data has loaded.
  var _checkPromises = function () {

    // Check if we are still waiting on a promise to be resolved.
    var waiting = _.reduce(Module.Promises, function (memo, promise) {
      return (promise.state() === 'resolved') ? memo : 1;
    }, 0);

    if (!waiting) {
      $html.removeClass('loading');
    }

  };

  // Show loading indicator.
  $html.addClass('loading');

  // Create promises for the site data.
  Module.Promises = {
    program: _getData('/data/program.json'),
    people: _getData('/data/people.json'),
    info: _getData('/data/info.json'),
    updated: _getData('/data/updated.json')
  };

};
