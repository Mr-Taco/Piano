
#### Pre-requisites
* Node.js 0.10+
* NPM 2+

#### Install
* `npm install -g grunt-cli` (if not present)
* `npm install`

#### Run
* `grunt`
The Grunt task will run a server on port 3000 of your localhost.

#### Notes
* ES6 + Browserify so feel free to use all the ES6 goodies in the JS.
* All the styles are with SASS. Compass is not installed with this build. 
* grunt/browserify.js has the dependency requirements. Currently we have jquery, gsap, async, and underscore. If you want to add more you can do it with `npm install <lib> --save` and add it to the two fields in that file.




