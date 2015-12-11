/* grunt-browserify */

'use strict';

module.exports = {
  dist: {
    files: {
      'app/build/app.bundle.js': [
        'app/js/main.js'
      ]
    }
  }
};
