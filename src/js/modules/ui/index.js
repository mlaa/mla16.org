/* UI module */

'use strict';

module.exports = function (Module, App, Backbone) {

  require('./views/message-view.js')(Module, App, Backbone);

  var $ = Backbone.$;

  var $body = $('body');
  var $top = $('#top');
  var $content = $('#content');

  var messages = {
    'loading': 'Loading',
    'saved': 'Click the Save button on session pages to save them for later reference. ' +
      'Sessions are saved only on this browser and device.',
    'search': 'No sessions were found matching your search terms. Please try again.',
    'category': 'No sessions matched your selected categories. Please try again.'
  };

  // Restore the saved scroll position.
  var setScrollPosition = function () {
    var historyState = App.Links.getHistoryState();
    var position = (historyState.scrollPos) ? historyState.scrollPos : 0;
    window.scrollTo(0, position);
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
    $body.addClass('message');
  };

  var clearMessage = function () {
    $body.removeClass('message');
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
    window.scrollTo(0, 0);

    // Remove all classes from body and content.
    $body.removeClass();
    $content.removeClass();
    clearMessage();

    // Add page classes.
    $body.addClass(classes);

  };

  // Set page title.
  var setPageTitle = function (title) {
    // Make sure tags are stripped.
    document.title = (title) ? $('<div/>').html(title + ' | MLA 2016').text() : 'MLA 2016';
  };

  // Scroll to top or navigate home when site header is clicked.
  $top.on('click', function () {
    if ($body.scrollTop() === 0) {
      Backbone.history.navigate('', true);
    } else {
      $body.animate({scrollTop: 0}, 'slow');
    }
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
