/* Map view */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;

  Module.Views = Module.Views || {};

  Module.Views.MapView = Backbone.Marionette.ItemView.extend({

    className: 'map',
    template: require('../templates/map.tpl'),

    initialize: function () {
      App.vent.trigger('ui:setPageTitle', this.model.get('title'));
    },

    onShow: function () {
      $('.panzoom').panzoom({
        minScale: 1
      });
    },

    onBeforeDestroy: function () {
      $('.panzoom').panzoom('destroy');
    }

  });

};
