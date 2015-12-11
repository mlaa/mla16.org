/* grunt-contrib-uglify */

'use strict';

module.exports = {
  app: {
    options: {
      banner: '<%= pkg.banner %>',
      wrap: true
    },
    files: {
      'app/build/app.min.js': [
        'app/build/app.bundle.js'
      ]
    }
  }
};
