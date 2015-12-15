/* Filter views */

'use strict';

module.exports = function (Module, App, Backbone) {

  var filterTemplate = require('../templates/filter.tpl');
  var filterItemTemplate = require('../templates/filter-item.tpl');

  var ItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',
    template: filterItemTemplate,

    className: function () {
      if (this.model.get('active')) {
        return 'active';
      }
      return this.model.get('style');
    },

    initialize: function () {
      // Rerender the model when it changes.
      this.listenTo(this.model, 'change', this.render);
    },

    events: {
      'click': 'setFilter'
    },

    onRender: function () {
      this.$el.attr('class', this.className());
    },

    // Set filters on click.
    setFilter: function (e) {

      // Disable link.
      e.preventDefault();

      if (this.model.get('href')) {

        // Toggle the active attribute.
        this.model.set('active', !this.model.get('active'));

        // Pass the buck up to the parent view.
        this.trigger('setFilters');

      }

    }

  });

  var CompositeView = Backbone.Marionette.CompositeView.extend({

    childView: ItemView,
    childViewContainer: '.list',

    template: filterTemplate,

    events: {
      'click .button': 'applyFilters'
    },

    initialize: function () {
      this.listenTo(this, 'childview:setFilters', this.setFilters);
    },

    getFilters: function () {

      var currentFilters = [];

      // Find the currently active filters.
      this.collection.each(function (model) {
        if (model.get('active')) {
          currentFilters.push(model.get('href'));
        }
      });

      return currentFilters;

    },

    setFilters: function (childView) {

      // Loop through all the filters.
      this.collection.each(function (model) {

        // Check if the filter is in the current group.
        if (model !== childView.model && model.get('type') === childView.model.get('type')) {
          model.set('active', false);
        }

      });

    },

    applyFilters: function () {
      var categories = this.getFilters();
      if (categories.length) {
        App.vent.trigger('program:showSessionsByCategory', categories.join(','));
      }
    }

  });

  Module.Views = Module.Views || {};
  Module.Views.FilterView = CompositeView;

};
