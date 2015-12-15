/* Message view */

'use strict';

module.exports = function (Module, App, Backbone) {

  var ItemView = Backbone.Marionette.ItemView.extend({

    tagName: 'p',
    template: require('../templates/message.tpl'),

    className: function () {
      return this.model.get('className');
    }

  });

  Module.Views = Module.Views || {};
  Module.Views.MessageView = ItemView;

};
