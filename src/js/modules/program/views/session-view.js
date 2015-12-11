/* Session views */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;
  var sessionTemplate = require('../templates/session.tpl');
  var sessionHeadTemplate = require('../templates/session-head.tpl');

  var ItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',
    template: sessionTemplate,

    className: function () {
      return this.model.attributes.type || null;
    },

    serializeData: function () {
      return $.extend(
        this.model.toJSON(),
        this.model.formatTitle()
      );
    },

    initialize: function () {
      // Swap in alternate template when needed.
      if (this.model.attributes.type) {
        this.template = sessionHeadTemplate;
      }
    }

  });

  var CollectionView = Backbone.Marionette.CollectionView.extend({

    childView: ItemView,
    tagName: 'ul',
    className: 'list',

    events: {
      'click .head': 'loadParentMenu',
      'click .filter-head': 'editFilters',
      'click .subhead': 'toggleSessions',
      'click a': 'saveMenuState'
    },

    loadParentMenu: function (e) {
      e.preventDefault();
      App.vent.trigger('menu:showParent', '');
    },

    editFilters: function (e) {
      e.preventDefault();
      App.vent.trigger('program:editFilters', this.collection.models[0].get('cat'));
    },

    toggleSessions: function (e) {

      // Prevent default link action (select-y).
      e.preventDefault();

      // Toggle sessions.
      if (App.Content.$el.hasClass('collapsed')) {

        // Get current scroll position.
        var offsetHeight = document.body.scrollTop || document.documentElement.scrollTop || 0;
        var headerHeight = 91;
        var targetOffset;

        App.Content.$el.removeClass('collapsed');

        // Get offset of clicked subhead.
        targetOffset = e.target.getBoundingClientRect();

        // Scroll to the clicked subhead.
        document.body.scrollTop = document.documentElement.scrollTop = Math.max(targetOffset.top + offsetHeight - headerHeight, 0);

      } else {
        App.Content.$el.addClass('collapsed');
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      }

    },

    // When user leaves, save scroll position.
    saveMenuState: function () {
      App.vent.trigger('menu:saveMenuState');
    }

  });

  Module.Views = Module.Views || {};

  Module.Views.Session = {
    ItemView: ItemView,
    CollectionView: CollectionView
  };

};
