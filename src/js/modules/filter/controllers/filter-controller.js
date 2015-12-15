/* Filter controller */

'use strict';

module.exports = function (Module, App, Backbone) {

  var _ = Backbone._;

  // Loop through data and "activate" selected filters
  var getActiveFilters = function (selectedFilters) {
    return _.map(Module.Data.filters, function (filter) {
      if (selectedFilters.indexOf(filter.href) !== -1) {
        filter.active = 'active';
      } else {
        filter.active = '';
      }
      return filter;
    });
  };

  // Show filter widget.
  var showFilters = function (filters) {

    var historyState = App.Links.getHistoryState();

    // Load categories if we are accessing via history navigation.
    if (!filters && historyState.categories) {
      App.vent.trigger('program:showSessionsByCategory', historyState.categories.join(','));
      return;
    }

    App.vent.trigger('ui:setPageClasses', 'program menu');
    App.vent.trigger('ui:setPageTitle', 'Filter by category');

    // Show filters menu.
    App.Content.show(
      new Module.Views.FilterView({
        collection: new Module.Models.FilterCollection(getActiveFilters(filters || []))
      })
    );

    App.vent.trigger('ui:setScrollPosition');

  };

  // Edit filters via widget.
  var editFilters = function (filters) {

    // Clear stored filters
    App.Links.updateHistoryState({categories: null, scrollPos: 0}, '/filter');

    // Show filter widget with active filters checked.
    showFilters(filters);

  };

  App.vent.bind('filter:editFilters', editFilters);

  return Backbone.Marionette.Controller.extend({
    showFilters: showFilters
  });

};
