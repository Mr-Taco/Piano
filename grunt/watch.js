module.exports = {
    options: {
        nospawn:true
    },
    vendors: {
        files: [
            'grunt/browserify.js'
        ],
        tasks: [
            ,'browserify:vendors'
        ]
    },
    jade: {
        files: [
            'src/jade/*.jade'
        ],
        tasks:['jade']
    },
    images : {
        files: [
            'src/images/**/*.{jpg,gif,png,svg}'
        ],
        tasks:['imagemin']

    },
    sass: {
        files: ['src/scss/**/*.scss'],
        tasks: ['sass:dev','autoprefixer']
    }

};

