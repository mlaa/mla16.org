/* Typeahead module */

'use strict';

module.exports = function (Module, App, Backbone) {

  var $ = Backbone.$;

  require('typeahead.js');

  var typeaheadOptions = {
    hint: true,
    highlight: true,
    minLength: 3
  };

  // http://twitter.github.io/typeahead.js/examples/
  var substringMatcher = function (strs) {

    return function (q, cb) {

      var matches, substringRegex;

      // an array that will be populated with substring matches
      matches = [];

      // regex used to determine if a string contains the substring `q`
      substringRegex = new RegExp('\\b' + q, 'i');

      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function (i, str) {
        if (substringRegex.test(str)) {
          matches.push(str);
        }
      });

      cb(matches);

    };

  };

  var attachTypeahead = function (selector) {

    // Chain off promise from data module.
    App.Data.Promises.people.done(function (people) {

      var peopleMatcher = {
        name: 'people',
        source: substringMatcher(people)
      };

      // Attach to search form input.
      $(selector)
        .typeahead(typeaheadOptions, peopleMatcher)
        .on('typeahead:autocomplete', function (e) {
          $(e.target).typeahead('close');
        })
        .on('typeahead:select', function (e) {
          $(e.target).trigger('submit');
        });

    });

  };

  App.vent.bind('typeahead:attach', attachTypeahead);

};
