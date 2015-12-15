/* Menu */

'use strict';

module.exports = function (Module, App, Backbone) {

  var Model = Backbone.Model.extend({

    // Set defaults.
    defaults: {
      title: '',
      href: null,
      icon: null
    },

    getLinkAttributes: function () {

      var href = this.get('href');
      var icon = this.get('icon');

      return {
        childClass: (icon) ? 'icon icon-' + icon : '',
        href: (href) ? href : '/' + this.get('id'),
        target: (href) ? 'blank' : ''
      };

    }

  });

  var Collection = Backbone.Collection.extend({
    model: Model
  });

  Module.Models = Module.Models || {};
  Module.Models.MenuCollection = Collection;

};
