/* Update information view */

'use strict';

module.exports = function (Module, App, Backbone) {

  var updatedTemplate = require('../templates/updated.tpl');

  Module.Views = Module.Views || {};

  Module.Views.Updated = Backbone.Marionette.ItemView.extend({
    tagName: 'p',
    template: updatedTemplate
  });

};
