/* Info view */

'use strict';

module.exports = function (Module, App, Backbone) {

  var infoTemplate = require('../templates/info.tpl');

  Module.Views = Module.Views || {};

  Module.Views.Info = Backbone.Marionette.ItemView.extend({

    tagName: 'div',
    className: 'info',
    template: infoTemplate,

    events: {
      'click .text-head': 'loadParentMenu'
    },

    loadParentMenu: function() {
      App.vent.trigger('menu:showParent', 'info');
    }

  });

};
