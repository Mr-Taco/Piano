## WILDLIFE.LA INTERACTIVE COMPOSITION TASK

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
* We are using ES6 + Browserify so feel free to use all the ES6 goodies in the JS.
* All the styles are with SASS. Compass is not installed with this build. 
* grunt/browserify.js has the dependency requirements. Currently we have jquery, gsap, async, and underscore. If you want to add more you can do it with `npm install <lib> --save` and add it to the two fields in that file.




### Instructions

The object of this task is to take the assets and composition provided and create an interactive demo. Users should be able to interact in one or more ways with the elements provided to create a dynamic and engaging experience.

The candidate should have some knowledge of photoshope and illustrator to pull assets from the provided comp.

##### Required Tools

* GSAP - Greensock Animation Platform - [Getting Started](http://greensock.com/get-started-js) [Animating SVG with GSAP](http://greensock.com/svg-tips)


##### Things we are looking for

* Animation sensibility. Including but not limited to variety, easing, and timing. 
* Ability think compositionally when creating animation code. This can intepretted as nesting and sequencing timelines.
* Readability of animation code
* Ability to create animations procedurally [iteratively]
* Bonus Points - Use of math to generate animations (trig,algebra,etc)
* Bonus Points - Use of SplitText animations [SplitText Plugin](http://greensock.com/SplitText)
* Bonus Points - Use of SVG animations [DrawSVG Plugin](http://greensock.com/drawSVG)





