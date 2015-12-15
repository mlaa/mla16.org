/* Session model */

'use strict';

module.exports = function (Module, App, Backbone) {

  var _ = Backbone._;

  var linkifyHtml = require('linkifyjs/html');

  var Model = Backbone.Model.extend({

    initialize: function () {

      // Determine if session has been saved by user.
      var savedSessions = this.getSavedSessions();
      this.set('saved', _.contains(savedSessions, this.get('id')));

      // Update local storage when session is saved by user.
      this.listenTo(this, 'change:saved', this.updateSavedSessions);

    },

    getSessionProperties: function () {

      var sequence = this.get('id');
      var isRegular = /^\d+A?$/.test(sequence);
      var hashtags = (isRegular) ? ['s' + sequence, 'mla16'] : ['mla16'];
      var header = (isRegular) ? 'Session ' + sequence : 'Session';

      var linkedText = _.map(this.get('text') || [], linkifyHtml);

      return {
        header: header,
        hashtag: hashtags[0],
        tweetLink: 'https://twitter.com/intent/tweet?text=http://mla16.org/' + sequence +
          '&hashtags=' + hashtags.join(','),
        shareLink: 'https://www.facebook.com/sharer.php?s=100&p[url]=http://mla16.org/' + sequence,
        text: linkedText
      };

    },

    getSavedSessions: function () {
      var savedSessions = App.Storage.local.getItem('mla16-saved-sessions') || '';
      return savedSessions.split(',');
    },

    // Update "saved" sessions in local storage.
    updateSavedSessions: function () {

      var id = this.get('id');
      var savedSessions = this.getSavedSessions();

      if (_.contains(savedSessions, id)) {
        savedSessions = _.without(savedSessions, id);
      } else {
        savedSessions.push(id);
      }

      App.Storage.local.setItem('mla16-saved-sessions', savedSessions.join(','));

    }

  });

  Module.Models = Module.Models || {};
  Module.Models.Session = Model;

};
