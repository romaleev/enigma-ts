"use strict";
var Rotor_1 = require("./Rotor");
var Reflector_1 = require("./Reflector");
var Plugboard_1 = require("./Plugboard");
var Enigma = (function () {
    function Enigma(config, positions) {
        if (positions === void 0) { positions = 'AAA'; }
        var _this = this;
        var _a = config.rotors, rotors = _a === void 0 ? [] : _a, _b = config.reflector, reflector = _b === void 0 ? '' : _b, plugboard = config.plugboard;
        //Reflector init
        this.reflector = new Reflector_1["default"](reflector);
        //Plugboard init
        if (plugboard) {
            this.plugboard = new Plugboard_1["default"](plugboard);
        }
        //Rotors init
        this.rotors = rotors.map(function (cypher, i, arr) {
            return new Rotor_1["default"](cypher, positions[i]);
        });
        //Rotors step dependencies
        this.rotors[0].autoTurnForward = true;
        var _loop_1 = function (i) {
            this_1.rotors[i].onStep = function () { return _this.rotors[i + 1].turn(); };
        };
        var this_1 = this;
        for (var i = 0; i < rotors.length - 1; i++) {
            _loop_1(i);
        }
        //this.rotors[rotors.length - 1].autoTurnForward = true;
        //for(let i = this.rotors.length - 1; i > 0; i--)
        //this.rotors[i].onStep = ()=>this.rotors[i - 1].turn();
    }
    Object.defineProperty(Enigma.prototype, "positions", {
        get: function () {
            return this.rotors.reduce(function (prev, rotor) {
                return prev + rotor.position;
            }, '');
        },
        set: function (positions) {
            var _this = this;
            positions.split('').forEach(function (position, i) {
                return _this.rotors[i].position = position;
            });
        },
        enumerable: true,
        configurable: true
    });
    Enigma.prototype.processLetter = function (letter) {
        if (letter === ' ')
            return ' ';
        var forwardLetter = this.rotors.reduce(function (prev, rotor, i) {
            return rotor.passForward(prev);
        }, this.plugboard ? this.plugboard.process(letter, 'start') : letter);
        var reflectedLetter = this.reflector.process(forwardLetter);
        var backwardLetter = this.rotors.reduceRight(function (prev, rotor, i) {
            return rotor.passBackward(prev);
        }, reflectedLetter);
        return this.plugboard ? this.plugboard.process(backwardLetter, 'end') : backwardLetter;
    };
    /*processLetterReversed(letter){
        if(letter === ' ') return ' ';
        const tempLetter = this.rotors.reduceRight((prev, rotor, i)=>
            rotor.passBackward(prev), letter);

        const reflectedLetter = this.reflect(tempLetter);

        return this.rotors.reduce((prev, rotor, i)=>
            rotor.passForward(prev), reflectedLetter);
    }*/
    Enigma.prototype.process = function (word, positions) {
        var _this = this;
        if (positions === void 0) { positions = ''; }
        this.positions = positions;
        return word.split('').reduce(function (prev, letter) {
            return prev + _this.processLetter(letter);
        }, '');
    };
    return Enigma;
}());
exports.__esModule = true;
exports["default"] = Enigma;
