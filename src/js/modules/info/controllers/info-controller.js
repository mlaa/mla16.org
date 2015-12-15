/* Info controller */

'use strict';

module.exports = function (Module, App, Backbone) {

  return Backbone.Marionette.Controller.extend({

    // Generate section-level view.
    showInfo: function (resource) {

      App.vent.trigger('ui:setPageClasses', 'info');
      App.vent.trigger('ui:showLoading');

      // Append the view to the main region.
      App.Data.Promises.info.done(function (info) {

        if (info[resource]) {
          // Add view to content pane.
          App.Content.show(
            new Module.Views.InfoView({
              model: new Backbone.Model(info[resource])
            })
          );
        } else {
          App.vent.trigger('error');
        }

      });

    }

  });

};
