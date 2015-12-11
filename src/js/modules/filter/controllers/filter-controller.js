/* Filter controller */

'use strict';

module.exports = function (Module, App, Backbone) {

  return Backbone.Marionette.Controller.extend({

    showFilters: function (filters) {

      var selectedFilters = (filters) ? filters.split(',') : [];
      var myActiveFilters = Module.GetActiveFilters(selectedFilters);

      // Activate menu tab.
      App.vent.trigger('menu:tab', 'program');

      // Show filters menu.
      App.Content.show(
        new Module.Views.Filter.CollectionView({
          collection: new Module.Models.Filter.Collection(myActiveFilters)
        })
      );

    }

  });

};
