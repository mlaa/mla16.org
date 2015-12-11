/* Map controller */

'use strict';

module.exports = function (Module, App, Backbone) {

  return Backbone.Marionette.Controller.extend({

    // Generate map view.
    showMap: function (resource) {

      // Activate menu tab.
      App.vent.trigger('menu:tab', 'maps');

      // Append the view to the main region.
      if (Module.Data.Maps[resource]) {
        // Add view to content pane.
        App.Content.show(
          new Module.Views.Info({
            model: new Module.Models.Map(Module.Data.Maps[resource])
          })
        );
      } else {
        App.vent.trigger('error:notfound');
      }

    }

  });

};
