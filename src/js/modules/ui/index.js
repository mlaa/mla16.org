/* UI module */

'use strict';

module.exports = function (Module, App, Backbone) {

  require('./views/message-view.js')(Module, App, Backbone);

  var $ = Backbone.$;

  // Element cache
  var $els = {
    body: $('body'),
    top: $('#top'),
    content: $('#content')
  };

  var messages = {
    'loading': 'Loading',
    'saved': 'Click the “Save” button on session pages to save them for later reference. ' +
      'Sessions are saved only on this browser and device.',
    'search': 'No sessions were found matching your search terms. Please try again.',
    'category': 'No sessions matched your selected categories. Please try again.'
  };

  // Restore the saved scroll position.
  var setScrollPosition = function () {
    var historyState = App.Links.getHistoryState();
    var position = (historyState.scrollPos) ? historyState.scrollPos : 0;
    document.body.scrollTop = document.documentElement.scrollTop = position;
  };

  var showMessage = function (type) {
    App.Message.show(
      new Module.Views.MessageView({
        model: new Backbone.Model({
          message: messages[type] || messages.loading,
          className: type
        })
      })
    );
    $els.body.addClass('message');
  };

  var clearMessage = function () {
    $els.body.removeClass('message');
    App.Message.reset();
  };

  var showLoading = function (override) {
    if (override || App.Data.Waiting) {
      showMessage('loading');
    }
  };

  // Set page classes.
  var setPageClasses = function (classes) {

    // Test for home page.
    classes += (Backbone.history.fragment === '') ? ' home' : '';

    // Scroll to top of the window.
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    // Remove all classes from body and content.
    $els.body.removeClass();
    $els.content.removeClass();
    clearMessage();

    // Add page classes.
    $els.body.addClass(classes);

  };

  // Set page title.
  var setPageTitle = function (title) {
    // Make sure tags are stripped.
    document.title = (title) ? $('<div/>').html(title + ' | MLA 2016').text() : 'MLA 2016';
  };

  // Scroll to top when site header is clicked.
  $els.top.on('click', function () {
    $els.body.animate({scrollTop: 0}, 'slow');
  });

  // Bind to custom events.
  App.vent.bind('ui:setPageClasses', setPageClasses);
  App.vent.bind('ui:setPageTitle', setPageTitle);
  App.vent.bind('ui:setScrollPosition', setScrollPosition);
  App.vent.bind('ui:showMessage', showMessage);
  App.vent.bind('ui:clearMessage', clearMessage);
  App.vent.bind('ui:showLoading', showLoading);
  App.vent.bind('ui:hideLoading', clearMessage);

};
