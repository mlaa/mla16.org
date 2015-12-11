/* grunt-contrib-cssmin */

'use strict';

module.exports = {
  app: {
    options: {
      banner: '<%= pkg.banner %>'
    },
    files: {
      'app/build/app.min.css': [
        'app/css/*.css'
      ]
    }
  }
};
