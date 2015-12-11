/* Session controller */

'use strict';

module.exports = function (Module, App, Backbone) {

  var _ = Backbone._;

  // Generate view for a session group (person or search).
  var _showSessionsByGroup = function (group) {

    // Chain off promise from data module.
    App.Data.Promises.program.done(function (sessions) {

      // Placeholders, including head for person's name.
      var lastSubhead;
      var filteredSessions = [{type: 'head', title: group.name}];

      // Filter data to find sessions that match passed IDs.
      _.each(sessions, function (session) {

        // Keep track of last-seen subhead.
        if (session.type && session.type === 'subhead') {
          lastSubhead = session;
        }

        if (_.contains(group.sessions, session.id)) {

          // Add last-seen subhead if it hasn't already been added.
          if (lastSubhead) {
            var subheadCopy = _.extend({}, lastSubhead, {type: 'group-subhead'});
            filteredSessions.push(subheadCopy);
            lastSubhead = false;
          }

          filteredSessions.push(session);

        }

      });

      // Check for results.
      if (filteredSessions.length > 1) {
        // Create the session listing view.
        App.Content.show(
          new Module.Views.Session.CollectionView({
            collection: new Module.Models.Session.Collection(filteredSessions)
          })
        );
      } else {
        App.vent.trigger('error:empty', filteredSessions);
      }

    });

  };

  var _showFilters = function (filters) {
    Backbone.history.navigate('filter/' + filters, true);
  };

  // Bind to custom events.
  App.vent.bind('program:showGroup', _showSessionsByGroup);
  App.vent.bind('program:editFilters', _showFilters);

  return Backbone.Marionette.Controller.extend({

    // Generate session category view.
    showSessionsByCategory: function (categories) {

      // Activate menu tab.
      App.vent.trigger('menu:tab', 'program');

      // Parse passed categories.
      categories = categories.split(',');

      // Chain off promise from data module.
      App.Data.Promises.program.done(function (sessions) {

        // Placeholders, including head for category description.
        var lastSubhead;
        var filteredSessions = [
          {
            type: 'filter-head',
            title: App.Filter.GetFilterDescription(categories),
            cat: categories.join(',')
          }
        ];

        // Filter data to find sessions that match passed categories.
        _.each(sessions, function (session) {

          // Keep track of last-seen subhead.
          if (session.type && session.type === 'subhead') {
            lastSubhead = session;
          } else {

            // Determine the number of missing categories (1 is enough).
            var nonMatch = _.reduce(categories, function (memo, category) {
              return (_.contains(session.cat, category)) ? memo : 1;
            }, 0);

            if (!nonMatch) {

              // Add last-seen subhead if it hasn't already been added.
              if (lastSubhead) {
                filteredSessions.push(lastSubhead);
                lastSubhead = false;
              }

              filteredSessions.push(session);

            }

          }

        });

        if (filteredSessions.length > 1) {
          // Create the session listing view.
          App.Content.show(
            new Module.Views.Session.CollectionView({
              collection: new Module.Models.Session.Collection(filteredSessions)
            })
          );
        } else {
          App.vent.trigger('error:empty', filteredSessions);
        }

      });

    },

    // Generate session view.
    showSessionByID: function (id) {

      // Activate menu tab.
      App.vent.trigger('menu:tab', 'program');

      // Chain off promise from data module.
      App.Data.Promises.program.done(function (sessions) {

        // Filter data to find the session that matches the passed ID.
        var sessionIndex;

        var theSession = _.find(sessions, function (session, index) {
          sessionIndex = index;
          return session.id === id;
        });

        if (theSession) {

          // Get previous and next session.
          var sessionThread = {
            previousSessionId: '',
            nextSessionId: ''
          };

          for (var prev = sessionIndex - 1; prev >= 0; prev = prev - 1) {
            if (sessions[prev].id) {
              sessionThread.previousSessionId = sessions[prev].id;
              break;
            }
          }

          for (var next = sessionIndex + 1; next < sessions.length; next = next + 1) {
            if (sessions[next].id) {
              sessionThread.nextSessionId = sessions[next].id;
              break;
            }
          }

          // Create the session listing view.
          App.Content.show(
            new Module.Views.SessionDetail({
              model: new Module.Models.SessionDetail(_.extend(theSession, sessionThread))
            })
          );

        } else {
          App.vent.trigger('error:notfound', 'session');
        }

      });

    }

  });

};
