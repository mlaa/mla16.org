/* Cache crawler */

'use strict';

var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var express = require('express');
var fallback = require('express-history-api-fallback');
var phantom = require('phantom');
var snippets = require('./snippets.json');

var server;
var port = 4000;
var host = 'http://localhost:' + port;
var cacheDir = 'server/cache/';

var cached = [];
var queue = [
  '/program/th',
  '/program/fr',
  '/program/sa',
  '/program/su',
  '/program/mor',
  '/program/aft',
  '/program/eve',
  '/program/ln',
  '/program/acc',
  '/program/jwm',
  '/program/eh',
  '/program/off',
  '/program/aca',
  '/program/pub',
  '/program/soc',
  '/program/spe',
  '/program/pre',
  '/not-found'
];

// Create cache directory.
if (!fs.existsSync(cacheDir)){
  fs.mkdirSync(cacheDir);
}

// Serve app.
var app = express();
app.use('/', express.static(__dirname + '/../public', {index: 'index.html'}));
app.use(fallback('index.html', {root: __dirname + '/../public'}));

// Cache app.
var cacheApp = function (ph) {

  ph.createPage(function (page) {

    var processQueue = function () {
      if (queue.length) {
        var path = queue.pop();
        cached.push(path);
        console.log(path);
        page.open(host + path);
      } else {
        // We're done.
        ph.exit();
        server.close();
      }
    };

    page.set('settings.loadImages', false);

    // The app calls the Phantom callback after the main content
    // view is rendered.
    page.set('onCallback', function (data) {

      // Get HTML output and insert snippets.
      page.get('content', function (content) {

        // Replace placeholders with snippets.
        Object.keys(snippets).forEach(function (key) {
          content = content.replace(key, snippets[key].join('\n'));
        });

        // Write to cache directory.
        var filename = (data.path === '') ? 'index.html' : data.path;
        var fsDir = path.dirname(cacheDir + filename);
        if (!fs.existsSync(fsDir)){
          fs.mkdirSync(fsDir);
        }
        fs.writeFile(cacheDir + filename, content, function (err) {
          if (err) {
            console.log(err);
          }
        });

      });

      // Ask page to send us all absolute local links.
      page.evaluate(function (selector) {
        var allLinks = document.querySelectorAll(selector);
        return [].map.call(allLinks, function(el) {
          return el.getAttribute('href');
        }).filter(function (link) {
          return (link && /^\//.test(link));
        });
      },
      function (links) {
        // Find links not already cached and add them to the queue.
        var uncached = _.difference(links, cached);
        queue = queue.concat(uncached);
        processQueue();
      }, 'a');

    });

    processQueue();

  });

};

// Start.
server = app.listen(port, function () {
  phantom.create(cacheApp);
});

