'use strict()';


module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    //require('time-grunt')(grunt);

    var options = {
        config: {
            src: './grunt/*.js'
        },
        pkg: grunt.file.readJSON('package.json')
    };

    var configs = require('load-grunt-configs')(grunt, options);

    // Project configuration.
    grunt.initConfig(configs);

    // load jshint
    grunt.registerTask('default' , ['dev']);
    grunt.registerTask('dev', [
        'sass',
        'autoprefixer',
        'jshint',
        'browserify:vendors',
        'browserify:app',
        'imagemin',
        'connect',
        'jade',
        'watch'
    ]);




  
};
