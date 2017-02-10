"use strict";
var helpers_1 = require("./helpers");
var Rotor = (function () {
    function Rotor(config, position) {
        if (config === void 0) { config = { 'ABCDEFGHIJKLMNOPQRSTUVWXYZ': 'Z' }; }
        if (position === void 0) { position = 'A'; }
        this._cypher = Object.keys(config)[0];
        this._stepLetter = config[this.cypher];
        helpers_1.log('new Rotor', this.cypher, 'step:', this._stepLetter, 'position:', position);
        this._onStep = function () { };
        this._turnForward = false;
        this.position = position;
    }
    Object.defineProperty(Rotor.prototype, "cypher", {
        get: function () {
            return this._cypher;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rotor.prototype, "position", {
        get: function () {
            return helpers_1.getLetter(this.offset);
        },
        set: function (position) {
            this.offset = helpers_1.getCode(position);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rotor.prototype, "autoTurnForward", {
        set: function (turn) {
            this._turnForward = turn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Rotor.prototype, "onStep", {
        set: function (callback) {
            this._onStep = callback;
        },
        enumerable: true,
        configurable: true
    });
    Rotor.prototype.turn = function () {
        if (this.position === this._stepLetter) {
            helpers_1.log('step turned', this.position, '->', helpers_1.getLetter(helpers_1.normalizeCode(this.offset + 1)), this.cypher);
            this._onStep();
        }
        ;
        var oldPosition = this.position;
        this.offset = helpers_1.normalizeCode(this.offset + 1);
        helpers_1.log('position', oldPosition, '->', this.position, this.cypher, '(' + this._stepLetter + ')');
    };
    Rotor.prototype.passForward = function (letter) {
        this._turnForward && this.turn();
        helpers_1.log('fwd', letter, '->', this.cypher[helpers_1.normalizeCode(helpers_1.getCode(letter) + this.offset)], this.cypher);
        return this.cypher[helpers_1.normalizeCode(helpers_1.getCode(letter) + this.offset)];
    };
    Rotor.prototype.passBackward = function (letter) {
        var result = helpers_1.getLetter(helpers_1.normalizeCode(this.cypher.indexOf(letter) - this.offset));
        helpers_1.log('bkw', letter, '->', result, this.cypher);
        return result;
    };
    return Rotor;
}());
exports.__esModule = true;
exports["default"] = Rotor;
