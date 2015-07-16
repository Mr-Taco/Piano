import {EventEmitter} from './EventEmitter.js';
import {Piano} from './piano.js';
import $ from 'jquery';

export class PianoController extends EventEmitter {

    constructor (opts) {
        super();
        this.$el = $(opts.el);
        this.createBtn = $('#create-piano');
        this.deleteBtn = $('#delete-piano');
        this.pianos = [];
    }

    initialize () {
        this.addEvents = this.addEvents.bind(this);
        this.createPiano = this.createPiano.bind(this);
        this.deletePiano = this.deletePiano.bind(this);

        this.addEvents();
    }

    addEvents () {
        this.createBtn.on('click', this.createPiano);
        this.deleteBtn.on('click', this.deletePiano);
    }

    createPiano (e) {
        e.preventDefault();
        var piano = new Piano();
        this.pianos.push(piano);
    }

    deletePiano (e) {
        e.preventDefault();
        this.pianos.splice(this.pianos.length - 1, 1);

        TweenMax.to($('.piano').last(), 0.35, {
            alpha: 0,
            ease: Sine.easeOut,
            onComplete: function () {
                this.target.remove();
            }
        });
    }

}