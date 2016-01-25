/* Search module */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;
  var _ = Backbone._;

  // Clean search terms.
  var cleanTerms = function (str) {
    return str.replace(/\+/g, ' ')
              .replace(/\s+/g, ' ')
              .replace(/^\s/, '')
              .replace(/\s$/, '');
  };

  // Retrieve search results via a spit 'n' glue API.
  var fetchResults = function (termsURIFragment) {

    // Fetch search results from MLA Program (via JSON module).
    // Check for a fruitful search. Get the sequence number of
    // each search result. If no results were found or an error
    // occurred, show an error message.

    // Load search terms.
    var cleanedTerms = cleanTerms(decodeURIComponent(termsURIFragment));
    var searchTerms = cleanedTerms
      .replace(/[‘’]/g, '\\\'')
      .replace(/[“”]/g, '"')
      .replace(/\+/g, '%20');

    // Create search object.
    var searchObj = {
      type: 'search',
      terms: cleanedTerms,
      sessions: []
    };

    // Fetch results.
    return $.getJSON('/search/mla16?output=json&keyword=' + searchTerms)

      .fail(function () {
        App.vent.trigger('ui:showMessage', 'proxy');
      })

      // Use then instead of done for better promise behavior. But, of course,
      // rejection is very squirrely.
      .then(function (data) {

        if (data.hasOwnProperty('results')) {

          if (data.results.length) {

            // Extract sequence numbers from search results.
            searchObj.sessions = _.map(data.results, function (result) {
              /* jshint camelcase: false */
              return result.sequence_number;
            });

          }

        }

        return searchObj;

      });

  };

  Module.fetchResults = fetchResults;

};
