/* Twitter controller */

'use strict';

/*global twttr*/

module.exports = function (Module, App, Backbone) {

  return Backbone.Marionette.Controller.extend({

    // Generate section-level view.
    showConversation: function () {

      App.vent.trigger('ui:setPageClasses', 'conversation');
      App.vent.trigger('ui:setPageTitle', '#mla16');

      // Add view to content pane.
      var view = new Module.Views.ConversationView();
      App.Content.show(view);

      // Initialize Twitter widget using global.
      if (typeof twttr === 'object' && twttr.widgets) {
        twttr.widgets.load(view.el);
      }

    }

  });

};
