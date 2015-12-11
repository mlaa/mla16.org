/* Use BrowserSync to serve our site locally with autoreload. */

'use strict';

var config = require('../config/serve.json');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');

// Add middleware.
config.browserSync.server.middleware = [historyApiFallback()];

module.exports = function () {
  browserSync(config.browserSync);
};
