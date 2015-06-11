module.exports = {
    compile: {
        options: {
            pretty: true
        },
        files: [{
            cwd: "src/jade",
            src: ["**/*.jade",  "!_*.jade"],
            dest : "public/",
            expand:true,
            ext:".html"

        }]
    }
};
