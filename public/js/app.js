(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/philbrady/Sites/piano/src/js/app.js":[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

require('gsap');

//GSAP is global regardless of what you do here. Just need to import it so its referenced in the require.

var _jquery = require('jquery');

//Expose Jquery (for debugging)
//window.$ = window.jQuery = $;

var _jquery2 = _interopRequireDefault(_jquery);

var _modulesPianoControllerJs = require('./modules/pianoController.js');

var pianos = new _modulesPianoControllerJs.PianoController({
    $el: '.pianos-wrapper'
});

pianos.initialize();

console.log("WILDLIFE.LA QUICK BUILD");

},{"./modules/pianoController.js":"/Users/philbrady/Sites/piano/src/js/modules/pianoController.js","gsap":"gsap","jquery":"jquery"}],"/Users/philbrady/Sites/piano/src/js/modules/EventEmitter.js":[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DEFAULT_MAX_LISTENERS = 32;

function error(message) {
	for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
		args[_key - 1] = arguments[_key];
	}

	console.error.apply(console, [message].concat(args));
	console.trace();
}

var EventEmitter = (function () {
	function EventEmitter() {
		_classCallCheck(this, EventEmitter);

		this._maxListeners = DEFAULT_MAX_LISTENERS;
		this._events = {};
	}

	_createClass(EventEmitter, [{
		key: "on",
		value: function on(type, listener) {
			if (typeof listener != "function") {
				throw new TypeError();
			}
			var listeners = this._events[type] || (this._events[type] = []);
			if (listeners.indexOf(listener) != -1) {
				return this;
			}
			listeners.push(listener);
			if (listeners.length > this._maxListeners) {
				error("possible memory leak, added %i %s listeners, " + "use EventEmitter#setMaxListeners(number) if you " + "want to increase the limit (%i now)", listeners.length, type, this._maxListeners);
			}
			return this;
		}
	}, {
		key: "once",
		value: function once(type, listener) {
			var eventsInstance = this;
			function onceCallback() {
				eventsInstance.off(type, onceCallback);
				listener.apply(null, arguments);
			}
			return this.on(type, onceCallback);
		}
	}, {
		key: "off",
		value: function off(type) {
			for (var _len2 = arguments.length, args = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
				args[_key2 - 1] = arguments[_key2];
			}

			if (args.length === 0) {
				this._events[type] = null;
			}
			var listener = args[0];
			if (typeof listener != "function") {
				throw new TypeError();
			}
			var listeners = this._events[type];
			if (!listeners || !listeners.length) {
				return this;
			}
			var indexOfListener = listeners.indexOf(listener);
			if (indexOfListener == -1) {
				return this;
			}
			listeners.splice(indexOfListener, 1);
			return this;
		}
	}, {
		key: "emit",
		value: function emit(type) {
			for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
				args[_key3 - 1] = arguments[_key3];
			}

			var listeners = this._events[type];
			if (!listeners || !listeners.length) {
				return false;
			}
			listeners.forEach(function (fn) {
				return fn.apply(null, args);
			});
			return true;
		}
	}, {
		key: "setMaxListeners",
		value: function setMaxListeners(newMaxListeners) {
			if (parseInt(newMaxListeners) !== newMaxListeners) {
				throw new TypeError();
			}
			this._maxListeners = newMaxListeners;
		}
	}]);

	return EventEmitter;
})();

exports.EventEmitter = EventEmitter;

},{}],"/Users/philbrady/Sites/piano/src/js/modules/keyboard.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _EventEmitterJs = require('./EventEmitter.js');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var Keyboard = (function (_EventEmitter) {
    _inherits(Keyboard, _EventEmitter);

    function Keyboard(opts) {
        _classCallCheck(this, Keyboard);

        _get(Object.getPrototypeOf(Keyboard.prototype), 'constructor', this).call(this);
        this.piano = (0, _jquery2['default'])(opts.$el).last();
        this.keys = null;
        this.notes = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
        this.sharps = ['c-sharp', 'd-sharp', 'f-sharp', 'g-sharp', 'a-sharp'];
        this.playList = [];
    }

    _createClass(Keyboard, [{
        key: 'initialize',
        value: function initialize() {
            this.addKeys = this.addKeys.bind(this);
            this.addEvents = this.addEvents.bind(this);
            this.animateInKeys = this.animateInKeys.bind(this);
            this.activateKeys = this.activateKeys.bind(this);
            this.playKeys = this.playKeys.bind(this);

            this.on('keysAdded', this.animateInKeys);

            this.addKeys();
            this.addEvents();
        }
    }, {
        key: 'addEvents',
        value: function addEvents() {
            var that = this;
            var ks = this.piano.find('.key').get(0);

            this.keys.on('click', function (e) {
                var target = (0, _jquery2['default'])(e.target);
                that.emit('clickedKey', target.data('note'));
                that.activateKeys(target);
            });
        }
    }, {
        key: 'addKeys',
        value: function addKeys() {
            var i = 0,
                j = 0;
            var keyWrapper = (0, _jquery2['default'])("<div class='key-wrapper'></div>");

            while (i < this.notes.length) {
                var key = (0, _jquery2['default'])("<div class='key' data-note='" + this.notes[i] + "'><span>" + this.notes[i] + "</span></span></div>");
                keyWrapper.append(key);
                i++;
            }

            while (j < this.sharps.length) {
                var sharp = (0, _jquery2['default'])("<div class='sharp " + this.sharps[j] + "' data-note='" + this.sharps[j] + "'></div>");
                keyWrapper.append(sharp);
                j++;
            }

            this.piano.append(keyWrapper);
            this.keys = keyWrapper.children();
            this.notes = keyWrapper.children('.key');
            this.sharps = keyWrapper.children('.sharp');
            this.emit('keysAdded');
        }
    }, {
        key: 'animateInKeys',
        value: function animateInKeys() {
            TweenMax.staggerFromTo(this.notes, 0.5, {
                x: -50,
                alpha: 0
            }, {
                x: 0,
                alpha: 1,
                ease: Sine.easeOut,
                onComplete: function onComplete() {
                    //TweenMax.killAll();
                }
            }, 0.05);

            TweenMax.staggerFromTo(this.sharps, 0.5, {
                y: -50,
                alpha: 0
            }, {
                y: 0,
                alpha: 1,
                ease: Sine.easeOut,
                onComplete: function onComplete() {
                    //TweenMax.killAll();
                }
            }, 0.05);
        }
    }, {
        key: 'activateKeys',
        value: function activateKeys(target) {
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
                    });
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
                });
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
    }, {
        key: 'playKeys',
        value: function playKeys(e) {
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
    }]);

    return Keyboard;
})(_EventEmitterJs.EventEmitter);

exports.Keyboard = Keyboard;

},{"./EventEmitter.js":"/Users/philbrady/Sites/piano/src/js/modules/EventEmitter.js","jquery":"jquery"}],"/Users/philbrady/Sites/piano/src/js/modules/piano.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _EventEmitterJs = require('./EventEmitter.js');

var _keyboardJs = require('./keyboard.js');

var _playerJs = require('./player.js');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var Piano = (function (_EventEmitter) {
    _inherits(Piano, _EventEmitter);

    function Piano() {
        _classCallCheck(this, Piano);

        _get(Object.getPrototypeOf(Piano.prototype), 'constructor', this).call(this);
        this.$el = null;
        this.container = (0, _jquery2['default'])('.pianos-wrapper');
        this.keyboard = null;
        this.player = null;
        this.initialize();
    }

    _createClass(Piano, [{
        key: 'initialize',
        value: function initialize() {
            this.createParts = this.createParts.bind(this);
            this.createKeyboard = this.createKeyboard.bind(this);
            this.createPlayer = this.createPlayer.bind(this);
            this.startListening = this.startListening.bind(this);

            this.createParts();
            this.startListening();
        }
    }, {
        key: 'createParts',
        value: function createParts() {
            var piano = (0, _jquery2['default'])("<div class='piano'></div>");
            this.container.append(piano);
            this.createKeyboard();
            this.createPlayer();
        }
    }, {
        key: 'createKeyboard',
        value: function createKeyboard() {
            this.keyboard = new _keyboardJs.Keyboard({
                $el: '.piano'
            });

            this.keyboard.initialize();
        }
    }, {
        key: 'createPlayer',
        value: function createPlayer() {
            this.player = new _playerJs.Player({
                $el: '.piano'
            });

            this.player.initialize();
        }
    }, {
        key: 'startListening',
        value: function startListening() {
            this.keyboard.on('clickedKey', this.player.trackKeyClick);
            this.keyboard.on('donePlaying', this.player.clearNotes);
            this.player.on('pressPlay', this.keyboard.playKeys);
        }
    }]);

    return Piano;
})(_EventEmitterJs.EventEmitter);

exports.Piano = Piano;

},{"./EventEmitter.js":"/Users/philbrady/Sites/piano/src/js/modules/EventEmitter.js","./keyboard.js":"/Users/philbrady/Sites/piano/src/js/modules/keyboard.js","./player.js":"/Users/philbrady/Sites/piano/src/js/modules/player.js","jquery":"jquery"}],"/Users/philbrady/Sites/piano/src/js/modules/pianoController.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _EventEmitterJs = require('./EventEmitter.js');

var _pianoJs = require('./piano.js');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var PianoController = (function (_EventEmitter) {
    _inherits(PianoController, _EventEmitter);

    function PianoController(opts) {
        _classCallCheck(this, PianoController);

        _get(Object.getPrototypeOf(PianoController.prototype), 'constructor', this).call(this);
        this.$el = (0, _jquery2['default'])(opts.el);
        this.createBtn = (0, _jquery2['default'])('#create-piano');
        this.deleteBtn = (0, _jquery2['default'])('#delete-piano');
        this.pianos = [];
    }

    _createClass(PianoController, [{
        key: 'initialize',
        value: function initialize() {
            this.addEvents = this.addEvents.bind(this);
            this.createPiano = this.createPiano.bind(this);
            this.deletePiano = this.deletePiano.bind(this);

            this.addEvents();
        }
    }, {
        key: 'addEvents',
        value: function addEvents() {
            this.createBtn.on('click', this.createPiano);
            this.deleteBtn.on('click', this.deletePiano);
        }
    }, {
        key: 'createPiano',
        value: function createPiano(e) {
            e.preventDefault();
            var piano = new _pianoJs.Piano();
            this.pianos.push(piano);
        }
    }, {
        key: 'deletePiano',
        value: function deletePiano(e) {
            e.preventDefault();
            this.pianos.splice(this.pianos.length - 1, 1);

            TweenMax.to((0, _jquery2['default'])('.piano').last(), 0.35, {
                alpha: 0,
                ease: Sine.easeOut,
                onComplete: function onComplete() {
                    this.target.remove();
                }
            });
        }
    }]);

    return PianoController;
})(_EventEmitterJs.EventEmitter);

exports.PianoController = PianoController;

},{"./EventEmitter.js":"/Users/philbrady/Sites/piano/src/js/modules/EventEmitter.js","./piano.js":"/Users/philbrady/Sites/piano/src/js/modules/piano.js","jquery":"jquery"}],"/Users/philbrady/Sites/piano/src/js/modules/player.js":[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

var _EventEmitterJs = require('./EventEmitter.js');

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var Player = (function (_EventEmitter) {
    _inherits(Player, _EventEmitter);

    function Player(opts) {
        _classCallCheck(this, Player);

        _get(Object.getPrototypeOf(Player.prototype), 'constructor', this).call(this);
        this.piano = (0, _jquery2['default'])(opts.$el).last();
        this.textBox = null;
        this.playBtn = null;
        this.clearBtn = null;
        this.recording = [];
    }

    _createClass(Player, [{
        key: 'initialize',
        value: function initialize() {
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
    }, {
        key: 'createTextBox',
        value: function createTextBox() {
            var textBox = (0, _jquery2['default'])("<textarea placeholder='Ex: a, b, d-sharp'></textarea>");
            this.piano.append(textBox);
            this.textBox = textBox;
            this.emit('createdTextBox');
        }
    }, {
        key: 'createButtons',
        value: function createButtons() {
            var btnWrapper = (0, _jquery2['default'])("<div class='button-wrapper'></div>");
            var playBtn = (0, _jquery2['default'])("<a href='#' id='playBtn' class='blue-btn'>Play Notes </a>");
            var clearBtn = (0, _jquery2['default'])("<a href='#' id='clearBtn' class='blue-btn'>Clear Notes </a>");
            btnWrapper.append(playBtn, clearBtn);
            this.piano.append(btnWrapper);
            this.playBtn = playBtn;
            this.clearBtn = clearBtn;
            this.emit('createdButtons');
        }
    }, {
        key: 'addEvents',
        value: function addEvents() {
            var that = this;

            this.playBtn.on('click', function (e) {
                e.preventDefault();
                console.log('press play');
                that.emit('pressPlay', that.textBox.val());
            });

            this.clearBtn.on('click', function (e) {
                e.preventDefault();
                that.textBox.val('');
            });
        }
    }, {
        key: 'animateInTextBox',
        value: function animateInTextBox() {
            TweenMax.fromTo(this.textBox, 0.35, {
                scale: 0.5,
                alpha: 0
            }, {
                scale: 1,
                alpha: 1,
                ease: Sine.easeOut
            });
        }
    }, {
        key: 'animateInButtons',
        value: function animateInButtons() {
            var buttons = this.piano.find('.blue-btn');
            TweenMax.fromTo(buttons, 1.5, {
                alpha: 0
            }, {
                alpha: 1,
                ease: Sine.easeOut
            });
        }
    }, {
        key: 'trackKeyClick',
        value: function trackKeyClick(e) {
            var currentText = this.textBox.val();

            if (currentText === '') {
                this.textBox.val(currentText + e);
            } else {
                this.textBox.val(currentText + ', ' + e);
            }
        }
    }, {
        key: 'clearNotes',
        value: function clearNotes() {
            this.textBox.val('');
        }
    }]);

    return Player;
})(_EventEmitterJs.EventEmitter);

exports.Player = Player;

},{"./EventEmitter.js":"/Users/philbrady/Sites/piano/src/js/modules/EventEmitter.js","jquery":"jquery"}]},{},["/Users/philbrady/Sites/piano/src/js/app.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9ncnVudC1icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvcGhpbGJyYWR5L1NpdGVzL3BpYW5vL3NyYy9qcy9hcHAuanMiLCIvVXNlcnMvcGhpbGJyYWR5L1NpdGVzL3BpYW5vL3NyYy9qcy9tb2R1bGVzL0V2ZW50RW1pdHRlci5qcyIsIi9Vc2Vycy9waGlsYnJhZHkvU2l0ZXMvcGlhbm8vc3JjL2pzL21vZHVsZXMva2V5Ym9hcmQuanMiLCIvVXNlcnMvcGhpbGJyYWR5L1NpdGVzL3BpYW5vL3NyYy9qcy9tb2R1bGVzL3BpYW5vLmpzIiwiL1VzZXJzL3BoaWxicmFkeS9TaXRlcy9waWFuby9zcmMvanMvbW9kdWxlcy9waWFub0NvbnRyb2xsZXIuanMiLCIvVXNlcnMvcGhpbGJyYWR5L1NpdGVzL3BpYW5vL3NyYy9qcy9tb2R1bGVzL3BsYXllci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7UUNBTyxNQUFNOzs7O3NCQUdDLFFBQVE7Ozs7Ozs7d0NBSVEsOEJBQThCOztBQUc1RCxJQUFJLE1BQU0sR0FBRyw4QkFITCxlQUFlLENBR1c7QUFDOUIsT0FBRyxFQUFFLGlCQUFpQjtDQUN6QixDQUFDLENBQUM7O0FBRUgsTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDOztBQUdwQixPQUFPLENBQUMsR0FBRyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Ozs7Ozs7Ozs7Ozs7QUNqQnZDLElBQU0scUJBQXFCLEdBQUcsRUFBRSxDQUFDOztBQUVqQyxTQUFTLEtBQUssQ0FBQyxPQUFPLEVBQVU7bUNBQUwsSUFBSTtBQUFKLE1BQUk7OztBQUM5QixRQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztBQUNyRCxRQUFPLENBQUMs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LENBQUM7QUFDUixxQkFBSyxFQUFFLENBQUM7QUFDUixvQkFBSSxFQUFFLElBQUksQ0FBQyxPQUFPO2FBQ3JCLENBQ0osQ0FBQztTQUNMOzs7ZUFFZ0IsNEJBQUc7QUFDaEIsZ0JBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQzNDLG9CQUFRLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxHQUFHLEVBQUU7QUFDdEIscUJBQUssRUFBRSxDQUFDO2FBQ1gsRUFBRTtBQUNDLHFCQUFLLEVBQUUsQ0FBQztBQUNSLG9CQUFJLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDckIsQ0FDSixDQUFDO1NBQ0w7OztlQUVhLHVCQUFDLENBQUMsRUFBRTtBQUNkLGdCQUFJLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDOztBQUVyQyxnQkFBSSxXQUFXLEtBQUssRUFBRSxFQUFFO0FBQ3BCLG9CQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDckMsTUFBTTtBQUNILG9CQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQzVDO1NBQ0o7OztlQUVVLHNCQUFHO0FBQ1YsZ0JBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3hCOzs7V0EvRlEsTUFBTTttQkFIWCxZQUFZOztRQUdQLE1BQU0sR0FBTixNQUFNIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsImltcG9ydCAnZ3NhcCc7XG4vL0dTQVAgaXMgZ2xvYmFsIHJlZ2FyZGxlc3Mgb2Ygd2hhdCB5b3UgZG8gaGVyZS4gSnVzdCBuZWVkIHRvIGltcG9ydCBpdCBzbyBpdHMgcmVmZXJlbmNlZCBpbiB0aGUgcmVxdWlyZS5cblxuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5Jztcbi8vRXhwb3NlIEpxdWVyeSAoZm9yIGRlYnVnZ2luZylcbi8vd2luZG93LiQgPSB3aW5kb3cualF1ZXJ5ID0gJDtcblxuaW1wb3J0IHtQaWFub0NvbnRyb2xsZXJ9IGZyb20gJy4vbW9kdWxlcy9waWFub0NvbnRyb2xsZXIuanMnO1xuXG5cbnZhciBwaWFub3MgPSBuZXcgUGlhbm9Db250cm9sbGVyICh7XG4gICAgJGVsOiAnLnBpYW5vcy13cmFwcGVyJ1xufSk7XG5cbnBpYW5vcy5pbml0aWFsaXplKCk7XG5cblxuY29uc29sZS5sb2coXCJXSUxETElGRS5MQSBRVUlDSyBCVUlMRFwiKTtcblxuIiwiY29uc3QgREVGQVVMVF9NQVhfTElTVEVORVJTID0gMzI7XG5cbmZ1bmN0aW9uIGVycm9yKG1lc3NhZ2UsIC4uLmFyZ3Mpe1xuXHRjb25zb2xlLmVycm9yLmFwcGx5KGNvbnNvbGUsIFttZXNzYWdlXS5jb25jYXQoYXJncykpO1xuXHRjb25zb2xlLnRyYWNlKCk7XG59XG5cbmV4cG9ydCBjbGFzcyBFdmVudEVtaXR0ZXIge1xuXHRjb25zdHJ1Y3Rvcigpe1xuXHRcdHRoaXMuX21heExpc3RlbmVycyA9IERFRkFVTFRfTUFYX0xJU1RFTkVSUztcblx0XHR0aGlzLl9ldmVudHMgPSB7fTtcblx0fVxuXHRvbih0eXBlLCBsaXN0ZW5lcikge1xuXHRcdGlmKHR5cGVvZiBsaXN0ZW5lciAhPSBcImZ1bmN0aW9uXCIpIHtcblx0XHRcdHRocm93IG5ldyBUeXBlRXJyb3IoKTtcblx0XHR9XG5cdFx0dmFyIGxpc3RlbmVycyA9IHRoaXMuX2V2ZW50c1t0eXBlXSB8fCh0aGlzLl9ldmVudHNbdHlwZV0gPSBbXSk7XG5cdFx0aWYobGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpICE9IC0xKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cdFx0bGlzdGVuZXJzLnB1c2gobGlzdGVuZXIpO1xuXHRcdGlmKGxpc3RlbmVycy5sZW5ndGggPiB0aGlzLl9tYXhMaXN0ZW5lcnMpIHtcblx0XHRcdGVycm9yKFxuXHRcdFx0XHRcInBvc3NpYmxlIG1lbW9yeSBsZWFrLCBhZGRlZCAlaSAlcyBsaXN0ZW5lcnMsIFwiK1xuXHRcdFx0XHRcInVzZSBFdmVudEVtaXR0ZXIjc2V0TWF4TGlzdGVuZXJzKG51bWJlcikgaWYgeW91IFwiICtcblx0XHRcdFx0XCJ3YW50IHRvIGluY3JlYXNlIHRoZSBsaW1pdCAoJWkgbm93KVwiLFxuXHRcdFx0XHRsaXN0ZW5lcnMubGVuZ3RoLFxuXHRcdFx0XHR0eXBlLFxuXHRcdFx0XHR0aGlzLl9tYXhMaXN0ZW5lcnNcblx0XHRcdCk7XG5cdFx0fVxuXHRcdHJldHVybiB0aGlzO1xuXHR9XG5cdG9uY2UodHlwZSwgbGlzdGVuZXIpIHtcblx0XHR2YXIgZXZlbnRzSW5zdGFuY2UgPSB0aGlzO1xuXHRcdGZ1bmN0aW9uIG9uY2VDYWxsYmFjaygpe1xuXHRcdFx0ZXZlbnRzSW5zdGFuY2Uub2ZmKHR5cGUsIG9uY2VDYWxsYmFjayk7XG5cdFx0XHRsaXN0ZW5lci5hcHBseShudWxsLCBhcmd1bWVudHMpO1xuXHRcdH1cblx0XHRyZXR1cm4gdGhpcy5vbih0eXBlLCBvbmNlQ2FsbGJhY2spO1xuXHR9XG5cdG9mZih0eXBlLCAuLi5hcmdzKSB7XG5cdFx0aWYoYXJncy5sZW5ndGggPT09IDApIHtcblx0XHRcdHRoaXMuX2V2ZW50c1t0eXBlXSA9IG51bGw7XG5cdFx0fVxuXHRcdHZhciBsaXN0ZW5lciA9IGFyZ3NbMF07XG5cdFx0aWYodHlwZW9mIGxpc3RlbmVyICE9IFwiZnVuY3Rpb25cIikge1xuXHRcdFx0dGhyb3cgbmV3IFR5cGVFcnJvcigpO1xuXHRcdH1cblx0XHR2YXIgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXHRcdGlmKCFsaXN0ZW5lcnMgfHwgIWxpc3RlbmVycy5sZW5ndGgpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblx0XHR2YXIgaW5kZXhPZkxpc3RlbmVyID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuXHRcdGlmKGluZGV4T2ZMaXN0ZW5lciA9PSAtMSkge1xuXHRcdFx0cmV0dXJuIHRoaXM7XG5cdFx0fVxuXHRcdGxpc3RlbmVycy5zcGxpY2UoaW5kZXhPZkxpc3RlbmVyLCAxKTtcblx0XHRyZXR1cm4gdGhpcztcblx0fVxuXHRlbWl0KHR5cGUsIC4uLmFyZ3Mpe1xuXHRcdHZhciBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cdFx0aWYoIWxpc3RlbmVycyB8fCAhbGlzdGVuZXJzLmxlbmd0aCkge1xuXHRcdFx0cmV0dXJuIGZhbHNlO1xuXHRcdH1cblx0XHRsaXN0ZW5lcnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSk7XG5cdFx0cmV0dXJuIHRydWU7XG5cdH1cblx0c2V0TWF4TGlzdGVuZXJzKG5ld01heExpc3RlbmVycyl7XG5cdFx0aWYocGFyc2VJbnQobmV3TWF4TGlzdGVuZXJzKSAhPT0gbmV3TWF4TGlzdGVuZXJzKSB7XG5cdFx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCk7XG5cdFx0fVxuXHRcdHRoaXMuX21heExpc3RlbmVycyA9IG5ld01heExpc3RlbmVycztcblx0fVxufVxuIiwiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJy4vRXZlbnRFbWl0dGVyLmpzJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjbGFzcyBLZXlib2FyZCBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBjb25zdHJ1Y3RvciAob3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLnBpYW5vID0gJChvcHRzLiRlbCkubGFzdCgpO1xuICAgICAgICB0aGlzLmtleXMgPSBudWxsO1xuICAgICAgICB0aGlzLm5vdGVzID0gWydjJywnZCcsJ2UnLCdmJywnZycsJ2EnLCdiJ107XG4gICAgICAgIHRoaXMuc2hhcnBzID0gWydjLXNoYXJwJywnZC1zaGFycCcsJ2Ytc2hhcnAnLCdnLXNoYXJwJywnYS1zaGFycCddO1xuICAgICAgICB0aGlzLnBsYXlMaXN0ID0gW107XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZSAoKSB7XG4gICAgICAgIHRoaXMuYWRkS2V5cyA9IHRoaXMuYWRkS2V5cy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50cyA9IHRoaXMuYWRkRXZlbnRzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYW5pbWF0ZUluS2V5cyA9IHRoaXMuYW5pbWF0ZUluS2V5cy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmFjdGl2YXRlS2V5cyA9IHRoaXMuYWN0aXZhdGVLZXlzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMucGxheUtleXM9IHRoaXMucGxheUtleXMuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLm9uKCdrZXlzQWRkZWQnLCB0aGlzLmFuaW1hdGVJbktleXMpO1xuXG4gICAgICAgIHRoaXMuYWRkS2V5cygpO1xuICAgICAgICB0aGlzLmFkZEV2ZW50cygpO1xuICAgIH1cblxuICAgIGFkZEV2ZW50cyAoKSB7XG4gICAgICAgIHZhciB0aGF0ID0gdGhpcztcbiAgICAgICAgdmFyIGtzID0gdGhpcy5waWFuby5maW5kKCcua2V5JykuZ2V0KDApO1xuXG4gICAgICAgIHRoaXMua2V5cy5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgbGV0IHRhcmdldCA9ICQoZS50YXJnZXQpO1xuICAgICAgICAgICAgdGhhdC5lbWl0KCdjbGlja2VkS2V5JywgdGFyZ2V0LmRhdGEoJ25vdGUnKSk7XG4gICAgICAgICAgICB0aGF0LmFjdGl2YXRlS2V5cyh0YXJnZXQpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBhZGRLZXlzICgpIHtcbiAgICAgICAgdmFyIGkgPSAwLCBqID0gMDtcbiAgICAgICAgdmFyIGtleVdyYXBwZXIgPSAkKFwiPGRpdiBjbGFzcz0na2V5LXdyYXBwZXInPjwvZGl2PlwiKTtcblxuICAgICAgICB3aGlsZSAoaSA8IHRoaXMubm90ZXMubGVuZ3RoKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gJChcIjxkaXYgY2xhc3M9J2tleScgZGF0YS1ub3RlPSdcIiArIHRoaXMubm90ZXNbaV0gKyBcIic+PHNwYW4+XCIgKyB0aGlzLm5vdGVzW2ldICsgXCI8L3NwYW4+PC9zcGFuPjwvZGl2PlwiKTtcbiAgICAgICAgICAgIGtleVdyYXBwZXIuYXBwZW5kKGtleSk7XG4gICAgICAgICAgICBpKys7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAoaiA8IHRoaXMuc2hhcnBzLmxlbmd0aCkge1xuICAgICAgICAgICAgdmFyIHNoYXJwID0gJChcIjxkaXYgY2xhc3M9J3NoYXJwIFwiICsgdGhpcy5zaGFycHNbal0gKyBcIicgZGF0YS1ub3RlPSdcIiArIHRoaXMuc2hhcnBzW2pdICsgXCInPjwvZGl2PlwiKTtcbiAgICAgICAgICAgIGtleVdyYXBwZXIuYXBwZW5kKHNoYXJwKTtcbiAgICAgICAgICAgIGorKztcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGlhbm8uYXBwZW5kKGtleVdyYXBwZXIpO1xuICAgICAgICB0aGlzLmtleXMgPSBrZXlXcmFwcGVyLmNoaWxkcmVuKCk7XG4gICAgICAgIHRoaXMubm90ZXMgPSBrZXlXcmFwcGVyLmNoaWxkcmVuKCcua2V5Jyk7XG4gICAgICAgIHRoaXMuc2hhcnBzID0ga2V5V3JhcHBlci5jaGlsZHJlbignLnNoYXJwJyk7XG4gICAgICAgIHRoaXMuZW1pdCgna2V5c0FkZGVkJyk7XG4gICAgfVxuXG4gICAgYW5pbWF0ZUluS2V5cyAoKSB7XG4gICAgICAgIFR3ZWVuTWF4LnN0YWdnZXJGcm9tVG8odGhpcy5ub3RlcywgMC41LCB7XG4gICAgICAgICAgICAgICAgeDogLTUwLFxuICAgICAgICAgICAgICAgIGFscGhhOiAwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgeDogMCxcbiAgICAgICAgICAgICAgICBhbHBoYTogMSxcbiAgICAgICAgICAgICAgICBlYXNlOiBTaW5lLmVhc2VPdXQsXG4gICAgICAgICAgICAgICAgb25Db21wbGV0ZTogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vVHdlZW5NYXgua2lsbEFsbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIDAuMDVcbiAgICAgICAgKTtcblxuICAgICAgICBUd2Vlbk1heC5zdGFnZ2VyRnJvbVRvKHRoaXMuc2hhcnBzLCAwLjUsIHtcbiAgICAgICAgICAgICAgICB5OiAtNTAsXG4gICAgICAgICAgICAgICAgYWxwaGE6IDBcbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICB5OiAwLFxuICAgICAgICAgICAgICAgIGFscGhhOiAxLFxuICAgICAgICAgICAgICAgIGVhc2U6IFNpbmUuZWFzZU91dCxcbiAgICAgICAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICAgLy9Ud2Vlbk1heC5raWxsQWxsKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwgMC4wNVxuICAgICAgICApO1xuICAgIH1cblxuICAgIGFjdGl2YXRlS2V5cyAodGFyZ2V0KSB7XG4gICAgICAgIHZhciBjO1xuXG4gICAgICAgIGlmICh0YXJnZXQubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgZm9yICh2YXIgeiBpbiB0YXJnZXQpIHtcbiAgICAgICAgICAgICAgICB2YXIgdCA9IHRhcmdldFt6XTtcbiAgICAgICAgICAgICAgICBpZiAodC5oYXNDbGFzcygnc2hhcnAnKSkge1xuICAgICAgICAgICAgICAgICAgICBjID0gJyMwMDAnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGMgPSAnI2ZmZic7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgVHdlZW5NYXguZnJvbVRvKHQsIDAuMiwge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjLFxuICAgICAgICAgICAgICAgICAgICAgICAgcm90YXRpb25YOiAwLFxuICAgICAgICAgICAgICAgICAgICAgICAgejogMFxuICAgICAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjMTY4OGQxJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHJvdGF0aW9uWDogLTEwLFxuICAgICAgICAgICAgICAgICAgICAgICAgejogLTUsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBlYXQ6IDEsXG4gICAgICAgICAgICAgICAgICAgICAgICByZXBlYXREZWxheTogMC42LFxuICAgICAgICAgICAgICAgICAgICAgICAgeW95bzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVhc2U6IFBvd2VyMS5lYXNlSW5PdXQsXG4gICAgICAgICAgICAgICAgICAgICAgICBkZWxheTogelxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGlmICh0YXJnZXQuaGFzQ2xhc3MoJ3NoYXJwJykpIHtcbiAgICAgICAgICAgICAgICBjID0gJyMwMDAnO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjID0gJyNmZmYnO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBUd2Vlbk1heC5mcm9tVG8odGFyZ2V0LCAwLjIsIHtcbiAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBjLFxuICAgICAgICAgICAgICAgICAgICByb3RhdGlvblg6IDAsXG4gICAgICAgICAgICAgICAgICAgIHo6IDBcbiAgICAgICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMxNjg4ZDEnLFxuICAgICAgICAgICAgICAgICAgICByb3RhdGlvblg6IC0xMCxcbiAgICAgICAgICAgICAgICAgICAgejogLTUsXG4gICAgICAgICAgICAgICAgICAgIHJlcGVhdDogMSxcbiAgICAgICAgICAgICAgICAgICAgcmVwZWF0RGVsYXk6IDAuNixcbiAgICAgICAgICAgICAgICAgICAgeW95bzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgZWFzZTogUG93ZXIxLmVhc2VJbk91dFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvL2ZvciAodmFyIHogaW4gdGFyZ2V0KSB7XG4gICAgICAgIC8vICAgIHZhciB0ID0gdGFyZ2V0W3pdO1xuICAgICAgICAvLyAgICB2YXIgY29sb3I7XG4gICAgICAgIC8vICAgIGNvbnNvbGUubG9nKCdpOiAnLCB6KTtcbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgaWYgKHRhcmdldC5oYXNDbGFzcygnc2hhcnAnKSkge1xuICAgICAgICAvLyAgICAgICAgY29sb3I6ICcjMDAwJztcbiAgICAgICAgLy8gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gICAgICAgIGNvbG9yOiAnI2ZmZic7XG4gICAgICAgIC8vICAgIH1cbiAgICAgICAgLy9cbiAgICAgICAgLy8gICAgVHdlZW5NYXguZnJvbVRvKHQsIDAuMiwge1xuICAgICAgICAvLyAgICAgICAgICAgIC8vYmFja2dyb3VuZENvbG9yOiBjb2xvcixcbiAgICAgICAgLy8gICAgICAgICAgICByb3RhdGlvblg6IDAsXG4gICAgICAgIC8vICAgICAgICAgICAgejogMFxuICAgICAgICAvLyAgICAgICAgfSwge1xuICAgICAgICAvLyAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMxNjg4ZDEnLFxuICAgICAgICAvLyAgICAgICAgICAgIHJvdGF0aW9uWDogLTEwLFxuICAgICAgICAvLyAgICAgICAgICAgIHo6IC01LFxuICAgICAgICAvLyAgICAgICAgICAgIHJlcGVhdDogMSxcbiAgICAgICAgLy8gICAgICAgICAgICByZXBlYXREZWxheTogMC42LFxuICAgICAgICAvLyAgICAgICAgICAgIHlveW86IHRydWUsXG4gICAgICAgIC8vICAgICAgICAgICAgZWFzZTogUG93ZXIxLmVhc2VJbk91dCxcbiAgICAgICAgLy8gICAgICAgICAgICBkZWxheTogelxuICAgICAgICAvLyAgICAgICAgfVxuICAgICAgICAvLyAgICApO1xuICAgICAgICAvL31cbiAgICB9XG5cbiAgICBwbGF5S2V5cyAoZSkge1xuICAgICAgICB0aGlzLnBsYXlMaXN0ID0gZS5zcGxpdCgnLCcpO1xuICAgICAgICB2YXIgcGxheSA9IHRydWU7XG5cbiAgICAgICAgZm9yICh2YXIgaSBpbiB0aGlzLnBsYXlMaXN0KSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5wbGF5TGlzdFtpXTtcbiAgICAgICAgICAgIGtleSA9IGtleS5yZXBsYWNlKC9cXHMrL2csICcnKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMucGlhbm8uZmluZCgnW2RhdGEtbm90ZT1cIicgKyBrZXkgKyAnXCJdJykuZGF0YSgnbm90ZScpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5TGlzdFtpXSA9IHRoaXMucGlhbm8uZmluZCgnW2RhdGEtbm90ZT1cIicgKyBrZXkgKyAnXCJdJyk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGFsZXJ0KCdZb3UgaGF2ZSB0eXBlZCBhbiBpbnZhbGlkIG5vdGUuIFBsZWFzZSB0cnkgYWdhaW4nKTtcbiAgICAgICAgICAgICAgICBwbGF5ID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGxheSkge1xuICAgICAgICAgICAgdGhpcy5hY3RpdmF0ZUtleXModGhpcy5wbGF5TGlzdCk7XG4gICAgICAgICAgICB0aGlzLmVtaXQoJ2RvbmVQbGF5aW5nJyk7XG4gICAgICAgIH1cbiAgICB9XG59IiwiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJy4vRXZlbnRFbWl0dGVyLmpzJztcbmltcG9ydCB7S2V5Ym9hcmR9IGZyb20gJy4va2V5Ym9hcmQuanMnO1xuaW1wb3J0IHtQbGF5ZXJ9IGZyb20gJy4vcGxheWVyLmpzJztcbmltcG9ydCAkIGZyb20gJ2pxdWVyeSc7XG5cbmV4cG9ydCBjbGFzcyBQaWFubyBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBjb25zdHJ1Y3RvciAoKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMuJGVsID0gbnVsbDtcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSAkKCcucGlhbm9zLXdyYXBwZXInKTtcbiAgICAgICAgdGhpcy5rZXlib2FyZCA9IG51bGw7XG4gICAgICAgIHRoaXMucGxheWVyID0gbnVsbDtcbiAgICAgICAgdGhpcy5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgaW5pdGlhbGl6ZSAoKSB7XG4gICAgICAgIHRoaXMuY3JlYXRlUGFydHMgPSB0aGlzLmNyZWF0ZVBhcnRzLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY3JlYXRlS2V5Ym9hcmQgPSB0aGlzLmNyZWF0ZUtleWJvYXJkLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyID0gdGhpcy5jcmVhdGVQbGF5ZXIuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5zdGFydExpc3RlbmluZyA9IHRoaXMuc3RhcnRMaXN0ZW5pbmcuYmluZCh0aGlzKTtcblxuICAgICAgICB0aGlzLmNyZWF0ZVBhcnRzKCk7XG4gICAgICAgIHRoaXMuc3RhcnRMaXN0ZW5pbmcoKTtcbiAgICB9XG5cbiAgICBjcmVhdGVQYXJ0cyAoKSB7XG4gICAgICAgIHZhciBwaWFubyA9ICQoXCI8ZGl2IGNsYXNzPSdwaWFubyc+PC9kaXY+XCIpO1xuICAgICAgICB0aGlzLmNvbnRhaW5lci5hcHBlbmQocGlhbm8pO1xuICAgICAgICB0aGlzLmNyZWF0ZUtleWJvYXJkKCk7XG4gICAgICAgIHRoaXMuY3JlYXRlUGxheWVyKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlS2V5Ym9hcmQgKCkge1xuICAgICAgICB0aGlzLmtleWJvYXJkID0gbmV3IEtleWJvYXJkKHtcbiAgICAgICAgICAgICRlbDogJy5waWFubydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5rZXlib2FyZC5pbml0aWFsaXplKCk7XG4gICAgfVxuXG4gICAgY3JlYXRlUGxheWVyICgpIHtcbiAgICAgICAgdGhpcy5wbGF5ZXIgPSBuZXcgUGxheWVyKHtcbiAgICAgICAgICAgICRlbDogJy5waWFubydcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5wbGF5ZXIuaW5pdGlhbGl6ZSgpO1xuICAgIH1cblxuICAgIHN0YXJ0TGlzdGVuaW5nICgpIHtcbiAgICAgICAgdGhpcy5rZXlib2FyZC5vbignY2xpY2tlZEtleScsIHRoaXMucGxheWVyLnRyYWNrS2V5Q2xpY2spO1xuICAgICAgICB0aGlzLmtleWJvYXJkLm9uKCdkb25lUGxheWluZycsIHRoaXMucGxheWVyLmNsZWFyTm90ZXMpO1xuICAgICAgICB0aGlzLnBsYXllci5vbigncHJlc3NQbGF5JywgdGhpcy5rZXlib2FyZC5wbGF5S2V5cyk7XG4gICAgfVxuXG59IiwiaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJy4vRXZlbnRFbWl0dGVyLmpzJztcbmltcG9ydCB7UGlhbm99IGZyb20gJy4vcGlhbm8uanMnO1xuaW1wb3J0ICQgZnJvbSAnanF1ZXJ5JztcblxuZXhwb3J0IGNsYXNzIFBpYW5vQ29udHJvbGxlciBleHRlbmRzIEV2ZW50RW1pdHRlciB7XG5cbiAgICBjb25zdHJ1Y3RvciAob3B0cykge1xuICAgICAgICBzdXBlcigpO1xuICAgICAgICB0aGlzLiRlbCA9ICQob3B0cy5lbCk7XG4gICAgICAgIHRoaXMuY3JlYXRlQnRuID0gJCgnI2NyZWF0ZS1waWFubycpO1xuICAgICAgICB0aGlzLmRlbGV0ZUJ0biA9ICQoJyNkZWxldGUtcGlhbm8nKTtcbiAgICAgICAgdGhpcy5waWFub3MgPSBbXTtcbiAgICB9XG5cbiAgICBpbml0aWFsaXplICgpIHtcbiAgICAgICAgdGhpcy5hZGRFdmVudHMgPSB0aGlzLmFkZEV2ZW50cy5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmNyZWF0ZVBpYW5vID0gdGhpcy5jcmVhdGVQaWFuby5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmRlbGV0ZVBpYW5vID0gdGhpcy5kZWxldGVQaWFuby5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMuYWRkRXZlbnRzKCk7XG4gICAgfVxuXG4gICAgYWRkRXZlbnRzICgpIHtcbiAgICAgICAgdGhpcy5jcmVhdGVCdG4ub24oJ2NsaWNrJywgdGhpcy5jcmVhdGVQaWFubyk7XG4gICAgICAgIHRoaXMuZGVsZXRlQnRuLm9uKCdjbGljaycsIHRoaXMuZGVsZXRlUGlhbm8pO1xuICAgIH1cblxuICAgIGNyZWF0ZVBpYW5vIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdmFyIHBpYW5vID0gbmV3IFBpYW5vKCk7XG4gICAgICAgIHRoaXMucGlhbm9zLnB1c2gocGlhbm8pO1xuICAgIH1cblxuICAgIGRlbGV0ZVBpYW5vIChlKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgdGhpcy5waWFub3Muc3BsaWNlKHRoaXMucGlhbm9zLmxlbmd0aCAtIDEsIDEpO1xuXG4gICAgICAgIFR3ZWVuTWF4LnRvKCQoJy5waWFubycpLmxhc3QoKSwgMC4zNSwge1xuICAgICAgICAgICAgYWxwaGE6IDAsXG4gICAgICAgICAgICBlYXNlOiBTaW5lLmVhc2VPdXQsXG4gICAgICAgICAgICBvbkNvbXBsZXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy50YXJnZXQucmVtb3ZlKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxufSIsImltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICcuL0V2ZW50RW1pdHRlci5qcyc7XG5pbXBvcnQgJCBmcm9tICdqcXVlcnknO1xuXG5leHBvcnQgY2xhc3MgUGxheWVyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcblxuICAgIGNvbnN0cnVjdG9yIChvcHRzKSB7XG4gICAgICAgIHN1cGVyKCk7XG4gICAgICAgIHRoaXMucGlhbm8gPSAkKG9wdHMuJGVsKS5sYXN0KCk7XG4gICAgICAgIHRoaXMudGV4dEJveCA9IG51bGw7XG4gICAgICAgIHRoaXMucGxheUJ0biA9IG51bGw7XG4gICAgICAgIHRoaXMuY2xlYXJCdG4gPSBudWxsO1xuICAgICAgICB0aGlzLnJlY29yZGluZyA9IFtdO1xuICAgIH1cblxuICAgIGluaXRpYWxpemUgKCkge1xuICAgICAgICB0aGlzLmNyZWF0ZVRleHRCb3ggPSB0aGlzLmNyZWF0ZVRleHRCb3guYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy5jcmVhdGVCdXR0b25zID0gdGhpcy5jcmVhdGVCdXR0b25zLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuYW5pbWF0ZUluVGV4dEJveCA9IHRoaXMuYW5pbWF0ZUluVGV4dEJveC5iaW5kKHRoaXMpO1xuICAgICAgICB0aGlzLmFuaW1hdGVJbkJ1dHRvbnMgPSB0aGlzLmFuaW1hdGVJbkJ1dHRvbnMuYmluZCh0aGlzKTtcbiAgICAgICAgdGhpcy50cmFja0tleUNsaWNrID0gdGhpcy50cmFja0tleUNsaWNrLmJpbmQodGhpcyk7XG4gICAgICAgIHRoaXMuY2xlYXJOb3RlcyA9IHRoaXMuY2xlYXJOb3Rlcy5iaW5kKHRoaXMpO1xuXG4gICAgICAgIHRoaXMub24oJ2NyZWF0ZWRUZXh0Qm94JywgdGhpcy5hbmltYXRlSW5UZXh0Qm94KTtcbiAgICAgICAgdGhpcy5vbignY3JlYXRlZEJ1dHRvbnMnLCB0aGlzLmFuaW1hdGVJbkJ1dHRvbnMpO1xuXG4gICAgICAgIHRoaXMuY3JlYXRlVGV4dEJveCgpO1xuICAgICAgICB0aGlzLmNyZWF0ZUJ1dHRvbnMoKTtcbiAgICAgICAgdGhpcy5hZGRFdmVudHMoKTtcbiAgICB9XG5cbiAgICBjcmVhdGVUZXh0Qm94ICgpIHtcbiAgICAgICAgdmFyIHRleHRCb3ggPSAkKFwiPHRleHRhcmVhIHBsYWNlaG9sZGVyPSdFeDogYSwgYiwgZC1zaGFycCc+PC90ZXh0YXJlYT5cIik7XG4gICAgICAgIHRoaXMucGlhbm8uYXBwZW5kKHRleHRCb3gpO1xuICAgICAgICB0aGlzLnRleHRCb3ggPSB0ZXh0Qm94O1xuICAgICAgICB0aGlzLmVtaXQoJ2NyZWF0ZWRUZXh0Qm94Jyk7XG4gICAgfVxuXG4gICAgY3JlYXRlQnV0dG9ucyAoKSB7XG4gICAgICAgIHZhciBidG5XcmFwcGVyID0gJChcIjxkaXYgY2xhc3M9J2J1dHRvbi13cmFwcGVyJz48L2Rpdj5cIik7XG4gICAgICAgIHZhciBwbGF5QnRuID0gJChcIjxhIGhyZWY9JyMnIGlkPSdwbGF5QnRuJyBjbGFzcz0nYmx1ZS1idG4nPlBsYXkgTm90ZXMgPC9hPlwiKTtcbiAgICAgICAgdmFyIGNsZWFyQnRuID0gJChcIjxhIGhyZWY9JyMnIGlkPSdjbGVhckJ0bicgY2xhc3M9J2JsdWUtYnRuJz5DbGVhciBOb3RlcyA8L2E+XCIpO1xuICAgICAgICBidG5XcmFwcGVyLmFwcGVuZChwbGF5QnRuLCBjbGVhckJ0bik7XG4gICAgICAgIHRoaXMucGlhbm8uYXBwZW5kKGJ0bldyYXBwZXIpO1xuICAgICAgICB0aGlzLnBsYXlCdG4gPSBwbGF5QnRuO1xuICAgICAgICB0aGlzLmNsZWFyQnRuID0gY2xlYXJCdG47XG4gICAgICAgIHRoaXMuZW1pdCgnY3JlYXRlZEJ1dHRvbnMnKTtcbiAgICB9XG5cbiAgICBhZGRFdmVudHMgKCkge1xuICAgICAgICB2YXIgdGhhdCA9IHRoaXM7XG5cbiAgICAgICAgdGhpcy5wbGF5QnRuLm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdwcmVzcyBwbGF5Jyk7XG4gICAgICAgICAgIHRoYXQuZW1pdCgncHJlc3NQbGF5JywgdGhhdC50ZXh0Qm94LnZhbCgpKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgdGhpcy5jbGVhckJ0bi5vbignY2xpY2snLCBmdW5jdGlvbihlKSB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICB0aGF0LnRleHRCb3gudmFsKCcnKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgYW5pbWF0ZUluVGV4dEJveCAoKSB7XG4gICAgICAgIFR3ZWVuTWF4LmZyb21Ubyh0aGlzLnRleHRCb3gsIDAuMzUsIHtcbiAgICAgICAgICAgICAgICBzY2FsZTogMC41LFxuICAgICAgICAgICAgICAgIGFscGhhOiAwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgc2NhbGU6IDEsXG4gICAgICAgICAgICAgICAgYWxwaGE6IDEsXG4gICAgICAgICAgICAgICAgZWFzZTogU2luZS5lYXNlT3V0XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgYW5pbWF0ZUluQnV0dG9ucyAoKSB7XG4gICAgICAgIHZhciBidXR0b25zID0gdGhpcy5waWFuby5maW5kKCcuYmx1ZS1idG4nKTtcbiAgICAgICAgVHdlZW5NYXguZnJvbVRvKGJ1dHRvbnMsIDEuNSwge1xuICAgICAgICAgICAgICAgIGFscGhhOiAwXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgYWxwaGE6IDEsXG4gICAgICAgICAgICAgICAgZWFzZTogU2luZS5lYXNlT3V0XG4gICAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgfVxuXG4gICAgdHJhY2tLZXlDbGljayAoZSkge1xuICAgICAgICB2YXIgY3VycmVudFRleHQgPSB0aGlzLnRleHRCb3gudmFsKCk7XG5cbiAgICAgICAgaWYgKGN1cnJlbnRUZXh0ID09PSAnJykge1xuICAgICAgICAgICAgdGhpcy50ZXh0Qm94LnZhbChjdXJyZW50VGV4dCArIGUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50ZXh0Qm94LnZhbChjdXJyZW50VGV4dCArICcsICcgKyBlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNsZWFyTm90ZXMgKCkge1xuICAgICAgICB0aGlzLnRleHRCb3gudmFsKCcnKTtcbiAgICB9XG5cblxufSJdfQ==
