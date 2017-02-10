"use strict";
var helpers_1 = require("./helpers");
var Reflector = (function () {
    function Reflector(config) {
        if (config === void 0) { config = ''; }
        this.data = {};
        for (var i = 0; i < config.length; i++)
            this.data[helpers_1.getLetter(i)] = config[i];
    }
    Reflector.prototype.process = function (letter) {
        var result = this.data[letter];
        helpers_1.log('reflect', letter, '->', result);
        return result;
        //return getLetter(normalizeCode(getCode(letter) + 13));
    };
    return Reflector;
}());
exports.__esModule = true;
exports["default"] = Reflector;
