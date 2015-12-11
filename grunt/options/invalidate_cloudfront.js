/* grunt-invalidate-cloudfront */

'use strict';

module.exports = {
  options: {
    key: process.env.AWS_ACCESS_KEY_ID,
    secret: process.env.AWS_SECRET_ACCESS_KEY
  },
  staging: {
    options: {
      distribution: 'E30TABZRCX2VMD'
    },
    files: [
      {
        expand: true,
        cwd: 'app/',
        src: [
          'index.html',
          'cache.manifest',
          'build/app.min.css',
          'build/app.min.js',
          'data/*.json'
        ],
        filter: 'isFile',
        dest: ''
      }
    ]
  },
  live: {
    options: {
      distribution: 'E37FIPBQ4NEDL2'
    },
    files: [
      {
        expand: true,
        cwd: 'app/',
        src: [
          'index.html',
          'cache.manifest',
          'build/app.min.css',
          'build/app.min.js',
          'data/*.json'
        ],
        filter: 'isFile',
        dest: ''
      }
    ]
  }
};
