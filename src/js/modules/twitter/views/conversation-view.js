/* Twitter conversation view */

'use strict';

module.exports = function (Module, App, Backbone) {

  var ItemView = Backbone.Marionette.ItemView.extend({
    tagName: 'div',
    className: 'conversation-container',
    template: require('../templates/conversation.tpl')
  });

  Module.Views = Module.Views || {};
  Module.Views.ConversationView = ItemView;

};
