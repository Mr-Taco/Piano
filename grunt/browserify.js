module.exports = {
    options: {
        transform:['babelify']
        ,external: [
            'jquery'
            ,'gsap'
            ,'async'
            ,'underscore'
           
   
        ]
        
    },
    vendors: {
        src:['.']
        ,dest: 'public/js/vendors.js'
        ,options:{
            debug:false
            ,alias: [
                'jquery'
                ,'gsap'
                ,'async'
                ,'underscore'

             
            ]
            ,external:null
        }
    },
    app: {
        files: {
            'public/js/app.js' : 'src/js/app.js'
        }
        ,options: {
            watch:true,
            browserifyOptions: {
                debug:true
            }
        }
    }
    
  
};
