/* grunt-contrib-connect */

'use strict';

module.exports = {
  server: {
    options: {
      base: [
        'app/'
      ],
      hostname: '*',
      livereload: true,
      open: true,
      port: 8000
    }
  }
};
