/* Filter */

'use strict';

module.exports = function (Module, App, Backbone) {

  var Model = Backbone.Model.extend({
    defaults: {
      active: ''
    }
  });

  var Collection = Backbone.Collection.extend({
    model: Model
  });

  Module.Models = Module.Models || {};
  Module.Models.Filter = {
    Model: Model,
    Collection: Collection
  };

};
