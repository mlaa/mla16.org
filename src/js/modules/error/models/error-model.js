/* Error */

'use strict';

module.exports = function (Module, App, Backbone) {

  var Model = Backbone.Model.extend({

    defaults: {
      title: 'Not Found',
      type: 'not-found',
      message: ''
    },

    initialize: function (){
      this.setMessage();
      this.on('change', this.setMessage, this);
    },

    setMessage: function () {

      var messages = {
        'data': 'There was a problem downloading Program data. Please try again later.',
        'not-found': 'The resource you requested could not be found. Please try again or <a href="/search">conduct a search</a>.'
      };

      var type = this.get('type');

      if (messages[type]) {
        this.set('message', messages[type]);
      }

    }

  });

  Module.Models = Module.Models || {};
  Module.Models.ErrorModel = Model;

};
