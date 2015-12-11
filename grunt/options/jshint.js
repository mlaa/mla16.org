/* grunt-contrib-jshint */

module.exports = {
  options: {
    bitwise: true,
    camelcase: true,
    curly: true,
    devel: true,
    eqeqeq: true,
    es3: true,
    forin: true,
    immed: true,
    indent: 2,
    latedef: true,
    maxdepth: 3,
    maxparams: 3,
    newcap: true,
    noarg: true,
    noempty: true,
    nonew: true,
    plusplus: true,
    quotmark: true,
    strict: true,
    trailing: true,
    undef: true,
    unused: true
  },
  app: {
    options: {
      browser: true,
      node: true
    },
    files: {
      src: [
        'grunt/**/*.js',
        'app/js/**/*.js'
      ]
    }
  }
};
