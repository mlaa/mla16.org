/* Info view */

'use strict';

module.exports = function (Module, App, Backbone) {

  Module.Views = Module.Views || {};

  Module.Views.InfoView = Backbone.Marionette.ItemView.extend({

    className: 'info',
    template: require('../templates/info.tpl'),

    initialize: function () {
      App.vent.trigger('ui:setPageTitle', this.model.get('title'));
    }

  });

};
