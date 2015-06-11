module.exports = {   
    dist: {
        files: {
            'public/js/main.js' : 'public/js/main.js'
        }
        ,options: {
            mangle:{
                except:['jquery','hammerjs','gsap','packery']
            }
        }
    } 
};
