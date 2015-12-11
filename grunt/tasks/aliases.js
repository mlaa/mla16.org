/* Grunt task aliases */

'use strict';

module.exports = function(grunt) {

  grunt.registerTask(
    'default',
    [
      'jshint',
      'template-module',
      'browserify',
      'uglify',
      'clean',
      'cssmin',
      'staticinline',
      'manifest'
    ]
  );

  grunt.registerTask('dev', ['default', 'connect', 'watch']);
  grunt.registerTask('deploy', ['default', 's3:staging', 'invalidate_cloudfront:staging']);
  grunt.registerTask('deploy-live', ['s3:live', 'invalidate_cloudfront:live']);

};
