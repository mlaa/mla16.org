/* Create an app cache manifest. */

'use strict';

var config = require('../config/manifest.json');
var gulp = require('gulp');
var manifest = require('gulp-manifest');

module.exports = function () {
  gulp.src(config.source, { base: config.baseDir })
    .pipe(manifest(config.options))
    .pipe(gulp.dest(config.target));
};
