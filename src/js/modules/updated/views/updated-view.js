/* Update information view */

'use strict';

module.exports = function (Module, App, Backbone) {

  var ItemView = Backbone.Marionette.ItemView.extend({
    tagName: 'p',
    template: require('../templates/updated.tpl')
  });

  Module.Views = Module.Views || {};
  Module.Views.UpdatedView = ItemView;

};
