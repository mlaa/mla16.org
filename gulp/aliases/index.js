/* Gulp task aliases */

module.exports = {
  default: [
    'assets',
    'serve',
    'watch'
  ],
  assets: [
    'js-lint',
    'browserify',
    'scss-lint',
    'sass',
    'manifest'
  ]
};
