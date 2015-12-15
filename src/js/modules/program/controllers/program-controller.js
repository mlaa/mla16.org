/* Session controller */

'use strict';

module.exports = function (Module, App, Backbone) {

  var _ = Backbone._;

  var findById = function (items, item) {
    return _.contains(items, item.id);
  };

  var findByCategory = function (items, item) {
    // Loop through categories and count the number that are missing.
    return !_.reduce(items, function (memo, category) {
      return (_.contains(item.cat, category)) ? memo : 1;
    }, 0);
  };

  // Apply a comparator function to each item in a set.
  var filterSessions = function (items, filter) {

    var lastSeenSubhead;
    var filteredSessions = [];

    // Filter data to find sessions that match passed IDs.
    _.each(items, function (item) {

      // Keep track of last-seen subhead.
      if (item.type && item.type === 'subhead') {
        lastSeenSubhead = item;
        return;
      }

      if (filter.comparator(filter.items, item)) {

        // Add last-seen subhead (or a copy) if it hasn't already been added.
        if (lastSeenSubhead) {
          if (filter.copySubhead) {
            var subheadCopy = _.extend({}, lastSeenSubhead, {type: 'menu-head'});
            filteredSessions.push(subheadCopy);
          } else {
            filteredSessions.push(lastSeenSubhead);
          }
          lastSeenSubhead = false;
        }

        filteredSessions.push(item);

      }

    });

    return filteredSessions;

  };

  // Get description of the current filters.
  var getFilterDescription = function (currentFilters) {

    if (currentFilters.length) {
      return _.map(currentFilters, function (filter) {
        return App.Filter.Data.categories[filter];
      }).join(', ');
    }

    return 'Program';

  };

  // Creates program view to be populated with sessions.
  var createProgramView = function (program) {

    var view = new Module.Views.ProgramView({
      model: new Module.Models.Program(program),
      collection: new Module.Models.ProgramCollection()
    });

    App.Content.show(view);

    return view;

  };

  // Run filter add append results to view.
  var runFilter = function (view, filter) {

    // Chain off promise from data module.
    App.Data.Promises.program.done(function (sessions) {

      var filteredSessions = filterSessions(sessions, filter);

      if (filteredSessions.length > 0) {
        view.collection.add(filteredSessions);
        App.vent.trigger('ui:setScrollPosition');
      } else {
        App.vent.trigger('ui:showMessage', filter.type);
      }

      view.trigger('app:rendered');

    });

  };

  // Generate view for the user's saved sessions.
  var showSavedSessions = function () {

    var savedSessions = App.Storage.local.getItem('mla16-saved-sessions') || '';

    var programView = createProgramView({
      type: 'saved',
      title: 'Saved sessions'
    });

    var filter = {
      type: 'saved',
      comparator: findById,
      copySubhead: true,
      items: savedSessions.split(',')
    };

    App.vent.trigger('ui:setPageClasses', 'program menu saved');
    App.vent.trigger('ui:showLoading');
    runFilter(programView, filter);

  };

  // Generate view for a session search results.
  var showSessionsBySearch = function (terms) {

    var historyState = App.Links.getHistoryState();

    // Load terms if we are accessing via history navigation.
    if (!terms && historyState.terms) {
      terms = historyState.terms;
    }

    var programView = createProgramView({
      type: 'search',
      title: 'Search the Program',
      terms: terms || ''
    });

    var filter = {
      type: 'search',
      comparator: findById,
      copySubhead: true
    };

    App.vent.trigger('ui:setPageClasses', 'program menu search');
    App.vent.trigger('typeahead:attach', '#terms');

    if (terms && terms !== '') {
      App.vent.trigger('ui:showLoading', true);
      App.Links.updateHistoryState({terms: terms});
      App.Search.fetchResults(terms).then(function (searchResults) {
        App.vent.trigger('ui:hideLoading');
        filter.items = searchResults.sessions;
        runFilter(programView, filter);
      });
    } else {
      programView.trigger('app:rendered');
    }

  };

  var showSessionsByCategory = function (categories) {

    categories = (categories) ? categories.split(',') : [];

    var url = (categories.length === 1) ? '/program/' + categories[0] : '/filter';
    App.Links.updateHistoryState({categories: categories}, url);

    var programView = createProgramView({
      title: getFilterDescription(categories),
      categories: categories
    });

    var filter = {
      type: 'category',
      items: categories,
      categories: categories,
      comparator: findByCategory
    };

    App.vent.trigger('ui:setPageClasses', 'program menu');
    App.vent.trigger('ui:showLoading');
    runFilter(programView, filter);

  };

  var showSessionByID = function (id) {

    App.vent.trigger('ui:setPageClasses', 'program');
    App.vent.trigger('ui:showLoading');

    // Chain off promise from data module.
    App.Data.Promises.program.done(function (sessions) {

      var session = _.findWhere(sessions, {id: id});

      if (session) {
        App.Content.show(
          new Module.Views.Session({
            model: new Module.Models.Session(session)
          })
        );
      } else {
        // Not found
        App.vent.trigger('error');
      }

    });

  };

  // Bind to custom events.
  App.vent.bind('program:showSessionsBySearch', showSessionsBySearch);
  App.vent.bind('program:showSessionsByCategory', showSessionsByCategory);

  return Backbone.Marionette.Controller.extend({
    showSavedSessions: showSavedSessions,
    showSessionsByCategory: showSessionsByCategory,
    showSessionsBySearch: showSessionsBySearch,
    showSessionByID: showSessionByID
  });

};
