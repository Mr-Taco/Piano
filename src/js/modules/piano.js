import {EventEmitter} from './EventEmitter.js';
import {Keyboard} from './keyboard.js';
import {Player} from './player.js';
import $ from 'jquery';

export class Piano extends EventEmitter {

    constructor () {
        super();
        this.$el = null;
        this.container = $('.pianos-wrapper');
        this.keyboard = null;
        this.player = null;
        this.initialize();
    }

    initialize () {
        this.createParts = this.createParts.bind(this);
        this.createKeyboard = this.createKeyboard.bind(this);
        this.createPlayer = this.createPlayer.bind(this);
        this.startListening = this.startListening.bind(this);

        this.createParts();
        this.startListening();
    }

    createParts () {
        var piano = $("<div class='piano'></div>");
        this.container.append(piano);
        this.createKeyboard();
        this.createPlayer();
    }

    createKeyboard () {
        this.keyboard = new Keyboard({
            $el: '.piano'
        });

        this.keyboard.initialize();
    }

    createPlayer () {
        this.player = new Player({
            $el: '.piano'
        });

        this.player.initialize();
    }

    startListening () {
        this.keyboard.on('clickedKey', this.player.trackKeyClick);
        this.keyboard.on('donePlaying', this.player.clearNotes);
        this.player.on('pressPlay', this.keyboard.playKeys);
    }

}