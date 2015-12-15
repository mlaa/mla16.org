/* Use BrowserSync to serve our site locally with autoreload. */

'use strict';

var config = require('../config/serve.json');
var url = require('url');
var proxy = require('proxy-middleware');
var browserSync = require('browser-sync');
var historyApiFallback = require('connect-history-api-fallback');

// Proxy options.
var options = url.parse(config.proxy.url);
options.route = config.proxy.route;

// Add middleware.
config.browserSync.server.middleware = [
  proxy(options),
  historyApiFallback()
];

module.exports = function () {
  browserSync(config.browserSync);
};
