module.exports = {
    options: {
        reporter: require('jshint-stylish'),
        force: false,
        laxcomma:true,
        esnext:true,
        browser: true
        
    },
    frontend: [
        'src/js/**/*.js'
    ]
   
};
