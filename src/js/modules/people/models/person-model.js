/* Person */

'use strict';

module.exports = function (Module, App, Backbone) {

  var Model = Backbone.Model.extend({});

  var Collection = Backbone.Collection.extend({
    model: Model
  });

  Module.Models = Module.Models || {};
  Module.Models.Person = {
    Model: Model,
    Collection: Collection
  };

};
