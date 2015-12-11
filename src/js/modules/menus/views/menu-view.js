/* Menu views */

'use strict';

module.exports = function (Module, App, Backbone) {

  var menuTemplate = require('../templates/menu-item.tpl');
  var menuHeadTemplate = require('../templates/menu-head.tpl');
  var menuExternalTemplate = require('../templates/menu-item-external.tpl');
  var menuIconTemplate = require('../templates/menu-item-icon.tpl');

  var ItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',
    template: menuTemplate,

    className: function () {
      return this.model.attributes.type || this.model.attributes.style || null;
    },

    serializeData: function () {
      return this.model.toJSON();
    },

    initialize: function () {

      // Swap in alternate template when needed.
      if (this.model.attributes.type) {
        this.template = menuHeadTemplate;
      }

      if (this.model.attributes.href) {
        this.template = menuExternalTemplate;
      }

      if (this.model.attributes.childClass) {
        this.template = menuIconTemplate;
      }

    }

  });

  var CollectionView = Backbone.Marionette.CollectionView.extend({

    childView: ItemView,
    tagName: 'ul',
    className: 'list',

    events: {
      'click a': 'saveMenuState'
    },

    // When user leaves, save scroll position.
    saveMenuState: function () {
      App.vent.trigger('menu:saveMenuState');
    }

  });

  Module.Views = Module.Views || {};
  Module.Views.Menu = {
    ItemView: ItemView,
    CollectionView: CollectionView
  };

};
