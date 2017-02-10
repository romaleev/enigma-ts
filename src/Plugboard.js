"use strict";
var helpers_1 = require("./helpers");
var Plugboard = (function () {
    function Plugboard(config) {
        if (config === void 0) { config = []; }
        var _this = this;
        this.data = {};
        config.forEach(function (pair) {
            _this.data[pair[0]] = pair[1];
            _this.data[pair[1]] = pair[0];
        });
    }
    Plugboard.prototype.process = function (letter, comment) {
        if (comment === void 0) { comment = ''; }
        var result = this.data[letter];
        helpers_1.log('plugboard ' + comment, letter, '->', result);
        return result;
    };
    return Plugboard;
}());
exports.__esModule = true;
exports["default"] = Plugboard;
