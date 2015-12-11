/* grunt-contrib-watch */

'use strict';

module.exports = {
  app: {
    options: {
      livereload: true
    },
    tasks: [
      'default'
    ],
    files: [
      'app/html/**/*.html',
      'app/css/*.css',
      'app/js/**/*.js'
    ]
  }
};
