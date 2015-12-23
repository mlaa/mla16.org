'use strict';

var jQuery = require('jquery');
var underscore = require('underscore');
var Backbone = require('backbone');
var attachFastClick = require('fastclick');

// Side-shim jQuery and Underscore before requiring Marionette.
Backbone.$ = jQuery;
Backbone._ = underscore;
require('backbone.marionette');

// jquery.panzoom
require('jquery.panzoom');

// Attach FastClick.
attachFastClick(document.body);

// Create the application.
var App = new Backbone.Marionette.Application();

// Add regions.
App.addRegions({
  Content: '#content',
  Message: '#message',
  Notice: '#notice'
});

// Adjust behavior if we are server-side.
App.isPhantom = typeof window.callPhantom === 'function';

// Load modules.
App.module('Appcache', require('./modules/appcache'));
App.module('Data', require('./modules/data'));
App.module('Error', require('./modules/error'));
App.module('Filter', require('./modules/filter'));
App.module('Info', require('./modules/info'));
App.module('Links', require('./modules/links'));
App.module('Maps', require('./modules/maps'));
App.module('Menus', require('./modules/menus'));
App.module('Program', require('./modules/program'));
App.module('Render', require('./modules/render'));
App.module('Search', require('./modules/search'));
App.module('Storage', require('./modules/storage'));
App.module('Twitter', require('./modules/twitter'));
App.module('Typeahead', require('./modules/typeahead'));
App.module('UI', require('./modules/ui'));
App.module('Updated', require('./modules/updated'));

// Start the history listener.
App.on('start', function () {
  Backbone.history.start({pushState: true});
});

// Start the application.
App.start();
