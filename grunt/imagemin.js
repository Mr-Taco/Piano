module.exports = {
    dist:{
        options: {
            svgoPlugins: [{ removeViewBox: false }]
        }
        ,files:[{
            expand:true
            ,cwd:'src/images/'
            ,src:['**/*.{png,jpg,gif,svg}']
            ,dest:'public/images/'
        }]
    }
};
