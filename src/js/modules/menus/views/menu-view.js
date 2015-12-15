/* Menu views */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;

  var HeadView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',
    template: require('../templates/menu-head.tpl'),

    className: function () {
      return this.model.get('type') || null;
    }

  });

  var ItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'li',
    template: require('../templates/menu-item.tpl'),

    serializeData: function () {
      return $.extend(
        this.model.toJSON(),
        this.model.getLinkAttributes()
      );
    }

  });

  var CompositeView = Backbone.Marionette.CompositeView.extend({

    getChildView: function (model) {
      return (model.get('type')) ? HeadView : ItemView;
    },

    childViewContainer: '.list',

    template: require('../templates/menu.tpl'),

    initialize: function () {
      App.vent.trigger('ui:setPageTitle', this.model.get('title'));
    }

  });

  Module.Views = Module.Views || {};
  Module.Views.MenuView = CompositeView;

};
