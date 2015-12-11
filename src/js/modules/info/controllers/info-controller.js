/* Info controller */

'use strict';

module.exports = function (Module, App, Backbone) {

  return Backbone.Marionette.Controller.extend({

    // Generate section-level view.
    showInfo: function (resource) {

      // Activate menu tab.
      App.vent.trigger('menu:tab', 'info');

      // Append the view to the main region.
      App.Data.Promises.info.done(function (info) {

        if (info[resource]) {
          // Add view to content pane.
          App.Content.show(
            new Module.Views.Info({
              model: new Module.Models.Info(info[resource])
            })
          );
        } else {
          App.vent.trigger('error:notfound');
        }

      });

    }

  });

};
