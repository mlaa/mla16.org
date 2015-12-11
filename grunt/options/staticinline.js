/* grunt-static-inline */

'use strict';

var grunt = require('grunt');

module.exports = {
  main: {
    options: {
      prefix: '<%= ',
      suffix: ' %>',
      vars: {
        'head/meta.html': grunt.file.read('app/html/head/meta.html'),
        'head/icons.html': grunt.file.read('app/html/head/icons.html'),
        'head/typekit.html': grunt.file.read('app/html/head/typekit.html'),
        'etc/banner.html': grunt.file.read('app/html/etc/banner.html'),
        'etc/search.html': grunt.file.read('app/html/etc/search.html'),
        'etc/tabs.html': grunt.file.read('app/html/etc/tabs.html'),
        'etc/noscript.html': grunt.file.read('app/html/etc/noscript.html'),
        'etc/actions.html': grunt.file.read('app/html/etc/actions.html')
      },
      basepath: 'app/build/'
    },
    files: {
      'app/index.html': 'app/html/index.html'
    }
  }
};
