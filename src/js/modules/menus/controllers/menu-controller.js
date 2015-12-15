/* Menu controller */

'use strict';

module.exports = function (Module, App, Backbone) {

  var sectionNames = {
    'info': 'Information',
    'maps': 'Maps'
  };

  // Generate section-level view.
  var showMenu = function (section) {

    section = section || 'main';

    App.vent.trigger('ui:setPageClasses', section + ' menu');

    // Append the views to the content region.
    App.Content.show(new Module.Views.MenuView({
      model: new Backbone.Model({title: sectionNames[section]}),
      collection: new Module.Models.MenuCollection(Module.Data.Menu[section])
    }));

    App.vent.trigger('ui:setScrollPosition');

  };

  return Backbone.Marionette.Controller.extend({
    showMenu: showMenu
  });

};
