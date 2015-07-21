import {EventEmitter} from './EventEmitter.js';
import $ from 'jquery';

export class Keyboard extends EventEmitter {

    constructor (opts) {
        super();
        this.piano = $(opts.$el).last();
        this.keys = null;
        this.notes = ['c','d','e','f','g','a','b'];
        this.sharps = ['c-sharp','d-sharp','f-sharp','g-sharp','a-sharp'];
        this.playList = [];
    }

    initialize () {
        this.addKeys = this.addKeys.bind(this);
        this.addEvents = this.addEvents.bind(this);
        this.animateInKeys = this.animateInKeys.bind(this);
        this.activateKeys = this.activateKeys.bind(this);
        this.playKeys= this.playKeys.bind(this);

        this.on('keysAdded', this.animateInKeys);

        this.addKeys();
        this.addEvents();
    }

    addEvents () {
        var that = this;
        var ks = this.piano.find('.key').get(0);

        this.keys.on('click', function (e) {
            let target = $(e.target);
            that.emit('clickedKey', target.data('note'));
            that.activateKeys(target);
        });
    }

    addKeys () {
        var i = 0, j = 0;
        var keyWrapper = $("<div class='key-wrapper'></div>");

        while (i < this.notes.length) {
            var key = $("<div class='key' data-note='" + this.notes[i] + "'><span>" + this.notes[i] + "</span></span></div>");
            keyWrapper.append(key);
            i++;
        }

        while (j < this.sharps.length) {
            var sharp = $("<div class='sharp " + this.sharps[j] + "' data-note='" + this.sharps[j] + "'></div>");
            keyWrapper.append(sharp);
            j++;
        }

        this.piano.append(keyWrapper);
        this.keys = keyWrapper.children();
        this.notes = keyWrapper.children('.key');
        this.sharps = keyWrapper.children('.sharp');
        this.emit('keysAdded');
    }

    animateInKeys () {
        TweenMax.staggerFromTo(this.notes, 0.5, {
                x: -50,
                alpha: 0
            }, {
                x: 0,
                alpha: 1,
                ease: Sine.easeOut,
                onComplete: function() {
                    //TweenMax.killAll();
                }
            }, 0.05
        );

        TweenMax.staggerFromTo(this.sharps, 0.5, {
                y: -50,
                alpha: 0
            }, {
                y: 0,
                alpha: 1,
                ease: Sine.easeOut,
                onComplete: function() {
                    //TweenMax.killAll();
                }
            }, 0.05
        );
    }

    activateKeys (target) {
        var c;

        if (target.length > 1) {
            for (var z in target) {
                var t = target[z];
                if (t.hasClass('sharp')) {
                    c = '#000';
                } else {
                    c = '#fff';
                }

                TweenMax.fromTo(t, 0.2, {
                        backgroundColor: c,
                        rotationX: 0,
                        z: 0
                    }, {
                        backgroundColor: '#1688d1',
                        rotationX: -10,
                        z: -5,
                        repeat: 1,
                        repeatDelay: 0.6,
                        yoyo: true,
                        ease: Power1.easeInOut,
                        delay: z
                    }
                );
            }
        } else {
            if (target.hasClass('sharp')) {
                c = '#000';
            } else {
                c = '#fff';
            }

            TweenMax.fromTo(target, 0.2, {
                    backgroundColor: c,
                    rotationX: 0,
                    z: 0
                }, {
                    backgroundColor: '#1688d1',
                    rotationX: -10,
                    z: -5,
                    repeat: 1,
                    repeatDelay: 0.6,
                    yoyo: true,
                    ease: Power1.easeInOut
                }
            );
        }

        //for (var z in target) {
        //    var t = target[z];
        //    var color;
        //    console.log('i: ', z);
        //
        //    if (target.hasClass('sharp')) {
        //        color: '#000';
        //    } else {
        //        color: '#fff';
        //    }
        //
        //    TweenMax.fromTo(t, 0.2, {
        //            //backgroundColor: color,
        //            rotationX: 0,
        //            z: 0
        //        }, {
        //            backgroundColor: '#1688d1',
        //            rotationX: -10,
        //            z: -5,
        //            repeat: 1,
        //            repeatDelay: 0.6,
        //            yoyo: true,
        //            ease: Power1.easeInOut,
        //            delay: z
        //        }
        //    );
        //}
    }

    playKeys (e) {
        this.playList = e.split(',');
        var play = true;

        for (var i in this.playList) {
            var key = this.playList[i];
            key = key.replace(/\s+/g, '');

            if (this.piano.find('[data-note="' + key + '"]').data('note')) {
                this.playList[i] = this.piano.find('[data-note="' + key + '"]');
            } else {
                alert('You have typed an invalid note. Please try again');
                play = false;
                break;
            }
        }

        if (play) {
            this.activateKeys(this.playList);
            this.emit('donePlaying');
        }
    }
}