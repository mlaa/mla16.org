/* grunt-template-module */

'use strict';

module.exports = {
  compile: {
    options: {
      module: true,
      provider: 'underscore'
    },
    files: {
      'app/build/compiled-templates.js': [
        'app/js/**/*.tmpl'
      ]
    }
  }
};
