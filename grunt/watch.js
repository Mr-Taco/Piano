module.exports = {
    options: {
        nospawn:true
    },
    browserify: {
        files: [
            'src/js/**/*.js'
        ],
        tasks: [
            'jshint:frontend'
            ,'browserify:app'
        ]
    },
    vendors: {
        files: [
            'grunt/browserify.js'
        ],
        tasks: [
            ,'browserify:vendors'
        ]
    },
    images : {
        files: [
            'src/images/**/*.{jpg,gif,png,svg}'
        ],
        tasks:['imagemin']

    },
    sass: {
        files: ['src/css/**/*.scss'],
        tasks: ['sass:dev','autoprefixer']
    }

};

