/* Session detail model */

'use strict';

module.exports = function (Module, App, Backbone) {

  Module.Models = Module.Models || {};

  Module.Models.SessionDetail = Backbone.Model.extend({

    getSessionProperties: function () {

      var sequence = this.get('id');
      var isRegular = /^\d+A?$/.test(sequence);
      var room = this.get('room');

      return {
        header: (isRegular) ? 'Session ' + sequence : '',
        hashtag: (isRegular) ? 's' + sequence : '',
        room: (room && Module.Data.VCCMaps[room]) ? room : false
      };

    }

  });

};
