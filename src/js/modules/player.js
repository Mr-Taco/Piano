import {EventEmitter} from './EventEmitter.js';
import $ from 'jquery';

export class Player extends EventEmitter {

    constructor (opts) {
        super();
        this.piano = $(opts.$el).last();
        this.textBox = null;
        this.playBtn = null;
        this.clearBtn = null;
        this.recording = [];
    }

    initialize () {
        this.createTextBox = this.createTextBox.bind(this);
        this.createButtons = this.createButtons.bind(this);
        this.animateInTextBox = this.animateInTextBox.bind(this);
        this.animateInButtons = this.animateInButtons.bind(this);
        this.trackKeyClick = this.trackKeyClick.bind(this);
        this.clearNotes = this.clearNotes.bind(this);

        this.on('createdTextBox', this.animateInTextBox);
        this.on('createdButtons', this.animateInButtons);

        this.createTextBox();
        this.createButtons();
        this.addEvents();
    }

    createTextBox () {
        var textBox = $("<textarea placeholder='Ex: a, b, d-sharp'></textarea>");
        this.piano.append(textBox);
        this.textBox = textBox;
        this.emit('createdTextBox');
    }

    createButtons () {
        var btnWrapper = $("<div class='button-wrapper'></div>");
        var playBtn = $("<a href='#' id='playBtn' class='blue-btn'>Play Notes </a>");
        var clearBtn = $("<a href='#' id='clearBtn' class='blue-btn'>Clear Notes </a>");
        btnWrapper.append(playBtn, clearBtn);
        this.piano.append(btnWrapper);
        this.playBtn = playBtn;
        this.clearBtn = clearBtn;
        this.emit('createdButtons');
    }

    addEvents () {
        var that = this;

        this.playBtn.on('click', function(e) {
            e.preventDefault();
            console.log('press play');
           that.emit('pressPlay', that.textBox.val());
        });

        this.clearBtn.on('click', function(e) {
            e.preventDefault();
            that.textBox.val('');
        });
    }

    animateInTextBox () {
        TweenMax.fromTo(this.textBox, 0.35, {
                scale: 0.5,
                alpha: 0
            }, {
                scale: 1,
                alpha: 1,
                ease: Sine.easeOut
            }
        );
    }

    animateInButtons () {
        var buttons = this.piano.find('.blue-btn');
        TweenMax.fromTo(buttons, 1.5, {
                alpha: 0
            }, {
                alpha: 1,
                ease: Sine.easeOut
            }
        );
    }

    trackKeyClick (e) {
        var currentText = this.textBox.val();

        if (currentText === '') {
            this.textBox.val(currentText + e);
        } else {
            this.textBox.val(currentText + ', ' + e);
        }
    }

    clearNotes () {
        this.textBox.val('');
    }


}