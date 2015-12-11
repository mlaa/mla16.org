/* grunt-manifest */

'use strict';

module.exports = {
  generate: {
    options: {
      basePath: 'app',
      network: ['*'],
      fallback: ['/ /'],
      verbose: true,
      timestamp: true
    },
    src: [
      'index.html',
      'build/app.min.*',
      'data/*.json',
      'img/ui/**/*.png',
      'img/maps/**/*.png'
    ],
    dest: 'app/cache.manifest'
  }
};
