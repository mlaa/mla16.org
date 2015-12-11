/* Person views */

'use strict';

module.exports = function (Module, App, Backbone) {

  var personTemplate = require('../templates/person.tpl');
  var personHeadTemplate = require('../templates/person-head.tpl');

  var ItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',
    template: personTemplate,

    className: function () {
      return this.model.attributes.type || null;
    },

    initialize: function () {
      // Swap in alternate template when needed.
      if (this.model.attributes.type) {
        this.template = personHeadTemplate;
      }
    }

  });

  var CollectionView = Backbone.Marionette.CollectionView.extend({

    childView: ItemView,
    tagName: 'ul',
    className: 'list people',

    events: {
      'click .head': 'loadParentMenu',
      'click a': 'saveScrollPosition'
    },

    loadParentMenu: function (e) {
      e.preventDefault();
      App.vent.trigger('menu:showParent', 'people');
    },

    // When user leaves, save scroll position.
    saveScrollPosition: function () {
      App.vent.trigger('menu:saveMenuState');
    }

  });

  Module.Views = Module.Views || {};
  Module.Views.Person = {
    ItemView: ItemView,
    CollectionView: CollectionView
  };

};
