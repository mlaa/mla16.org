/* Session view */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;

  var ItemView = Backbone.Marionette.ItemView.extend({

    className: 'session',
    template: require('../templates/session.tpl'),

    initialize: function () {
      this.listenTo(this.model, 'change', this.render);
      App.vent.trigger('ui:setPageTitle', this.model.get('title'));
    },

    serializeData: function () {
      return $.extend(
        this.model.toJSON(),
        this.model.getSessionProperties()
      );
    },

    events: {
      'click .button-save': 'toggleSavedSession'
    },

    toggleSavedSession: function (e) {

      var $target = $(e.target);

      if ($target.hasClass('active')) {
        this.model.set('saved', false);
        $target.removeClass('active').text('Save');
      } else {
        this.model.set('saved', true);
        $(e.target).addClass('active').text('Save');
      }

    }

  });

  Module.Views = Module.Views || {};
  Module.Views.Session = ItemView;

};
