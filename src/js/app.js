import 'gsap';
//GSAP is global regardless of what you do here. Just need to import it so its referenced in the require.

import $ from 'jquery';
//Expose Jquery (for debugging)
//window.$ = window.jQuery = $;

import {PianoController} from './modules/pianoController.js';


var pianos = new PianoController ({
    $el: '.pianos-wrapper'
});

pianos.initialize();


console.log("WILDLIFE.LA QUICK BUILD");

