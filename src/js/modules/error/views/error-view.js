/* Error view */

'use strict';

module.exports = function (Module, App, Backbone) {

  var ItemView = Backbone.Marionette.ItemView.extend({
    template: require('../templates/error.tpl')
  });

  Module.Views = Module.Views || {};
  Module.Views.Error = ItemView;

};
