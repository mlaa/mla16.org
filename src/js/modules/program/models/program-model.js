/* Program model */

'use strict';

module.exports = function (Module, App, Backbone) {

  var ProgramModel = Backbone.Model.extend({
    defaults: {
      title: '',
      categories: [],
      type: 'category',
      terms: ''
    }
  });

  var Model = Backbone.Model.extend({

    defaults: {
      href: '',
      title: ''
    },

    formatTitle: function () {

      var title = this.get('title');
      var sequence = this.get('id');
      var isRegular = /^\d+A?$/.test(sequence);

      return {
        title: (isRegular) ? sequence + '. ' + title : title
      };

    }

  });

  var Collection = Backbone.Collection.extend({
    model: Model
  });

  Module.Models = Module.Models || {};
  Module.Models.Program = ProgramModel;
  Module.Models.ProgramCollection = Collection;

};
