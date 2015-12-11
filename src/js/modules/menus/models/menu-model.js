/* Menu */

'use strict';

module.exports = function (Module, App, Backbone) {

  var Model = Backbone.Model.extend({

    // Set defaults.
    defaults: {
      href: '',
      title: ''
    },

    formatTitle: function () {

      var title = this.get('title');
      var sequence = this.get('seq');
      var isRegular = /^\d+$/.test(sequence);

      return {
        title: (isRegular) ? sequence + '. ' + title : title
      };

    }

  });

  var Collection = Backbone.Collection.extend({
    model: Model
  });

  Module.Models = Module.Models || {};
  Module.Models.Menu = {
    Model: Model,
    Collection: Collection
  };

};
