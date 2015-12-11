/* Error view */

'use strict';

module.exports = function (Module, App, Backbone) {

  var errorTemplate = require('../templates/error.tpl');
  var errorHeadTemplate = require('../templates/error.tpl');

  var ItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',
    template: errorTemplate,

    className: function () {
      return this.model.attributes.type || this.model.attributes.style || null;
    },

    initialize: function () {
      // Swap in alternate template when needed.
      if (this.model.attributes.type) {
        this.template = errorHeadTemplate;
      }
    }

  });

  var CollectionView = Backbone.Marionette.CollectionView.extend({

    childView: ItemView,
    tagName: 'ul',
    className: 'error list',

    events: {
      'click .head': 'loadParentMenu',
      'click .filter-head': 'editFilters'
    },

    loadParentMenu: function (e) {
      e.preventDefault();
      App.vent.trigger('menu:showParent', '');
    },

    editFilters: function (e) {
      e.preventDefault();
      Backbone.history.navigate('filter', true);
    }


  });

  Module.Views = Module.Views || {};
  Module.Views.Error = {
    ItemView: ItemView,
    CollectionView: CollectionView
  };

};
