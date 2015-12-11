/* Map view */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;
  var mapTemplate = require('../templates/map.tpl');

  Module.Views = Module.Views || {};

  Module.Views.Info = Backbone.Marionette.ItemView.extend({

    tagName: 'div',
    className: 'map',
    template: mapTemplate,

    events: {
      'click .text-head': 'loadParentMenu'
    },

    onShow: function () {
      $('.panzoom').panzoom({
        contain: 'invert',
        minScale: 1
      });
    },

    onBeforeDestroy: function () {
      $('.panzoom').panzoom('destroy');
    },

    loadParentMenu: function() {
      App.vent.trigger('menu:showParent', 'maps');
    }

  });

};
