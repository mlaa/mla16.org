/* Session views */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;

  var ItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',
    template: require('../templates/program-item.tpl'),

    serializeData: function () {
      return $.extend(
        this.model.toJSON(),
        this.model.formatTitle()
      );
    }

  });

  var HeadView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',
    template: require('../templates/program-head.tpl'),

    className: function () {
      return this.model.attributes.type || null;
    }

  });

  var CompositeView = Backbone.Marionette.CompositeView.extend({

    getChildView: function (model) {
      return (model.get('type')) ? HeadView : ItemView;
    },

    childViewContainer: '.list',

    template: require('../templates/program.tpl'),

    initialize: function () {
      App.vent.trigger('ui:setPageTitle', this.model.get('title'));
    },

    ui: {
      body: 'body',
      terms: '#terms'
    },

    events: {
      'click .subhead': 'toggleSessions',
      'click .button-filter': 'showFilters',
      'submit #search': 'submitForm',
      'focus #terms': 'onFocus',
      'blur #terms': 'onBlur'
    },

    toggleSessions: function (e) {

      // Prevent default link action (select-y).
      e.preventDefault();

      // Toggle sessions.
      if (App.Content.$el.hasClass('collapsed')) {

        // Get current scroll position.
        var offsetHeight = document.body.scrollTop || document.documentElement.scrollTop || 0;
        var headerHeight = 122;
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

    // Modify current category selection with filter widget.
    showFilters: function () {
      App.vent.trigger('filter:editFilters', this.model.get('categories').join(','));
    },

    // Send search in response to user request.
    submitForm: function (e) {

      this.ui.terms.trigger('blur');
      App.vent.trigger('program:showSessionsBySearch', this.ui.terms.val());

      e.preventDefault();
      return false;

    }

  });

  Module.Views = Module.Views || {};
  Module.Views.ProgramView = CompositeView;

};
