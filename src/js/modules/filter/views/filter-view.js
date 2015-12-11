/* Filter views */

'use strict';

module.exports = function (Module, App, Backbone) {

  var filterTemplate = require('../templates/filter.tpl');
  var filterHeadTemplate = require('../templates/filter-head.tpl');

  var ItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',
    template: filterTemplate,

    className: function () {
      return this.model.attributes.style || null;
    },

    initialize: function () {

      // Rerender the model when it changes.
      this.listenTo(this.model, 'change', this.render);

      // Swap in alternate template when needed.
      if(this.model.attributes.style) {
        this.template = filterHeadTemplate;
      }

    },

    events: {
      'click': 'setFilter'
    },

    // Set filters on click.
    setFilter: function (e) {

      // Disable link.
      e.preventDefault();

      if (this.model.get('href')) {

        // Toggle the active attribute.
        var active = (this.model.get('active')) ? '' : 'active';
        this.model.set('active', active);

        // Pass the buck up to the parent view.
        this.trigger('setFilters');

      }

    }

  });

  var CollectionView = Backbone.Marionette.CollectionView.extend({

    childView: ItemView,
    tagName: 'ul',
    className: 'list filters',

    events: {
      'click .button, .filter-head': 'applyFilters'
    },

    initialize: function () {
      this.listenTo(this, 'childview:setFilters', this.setFilters);
      this.describeFilters();
    },

    getFilters: function () {

      var currentFilters = [];

      // Find the currently active filters.
      this.collection.each(function (model) {
        if(model.get('active')) {
          currentFilters.push(model.get('href'));
        }
      });

      return currentFilters;

    },

    describeFilters: function() {

      var currentFilters = this.getFilters();
      var filterDescription = Module.GetFilterDescription(currentFilters);

      this.collection.models[0].set('title', filterDescription);

    },

    setFilters: function(childView) {

      // Loop through all the filters.
      this.collection.each(function (model) {

        // Check if the filter is in the current group.
        if(model !== childView.model && model.get('type') === childView.model.get('type')) {
          model.set('active', '');
        }

      });

      // Set filter description.
      this.describeFilters();

    },

    applyFilters: function (e) {

      // Prevent default action.
      e.preventDefault();

      // Get currently selected filters.
      var currentFilters = this.getFilters().join(',');
      var filterRoute = (currentFilters) ? '/program/' + currentFilters : '';

      // Navigate to selected filters, if any.
      Backbone.history.navigate(filterRoute, true);

    }

  });

  Module.Views = Module.Views || {};
  Module.Views.Filter = {
    ItemView: ItemView,
    CollectionView: CollectionView
  };

};
