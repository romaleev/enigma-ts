"use strict";
var config_1 = require("../config");
exports.__esModule = true;
exports["default"] = {
    normalizeCode: function (code) {
        return (code < 0 || code > 25) ? Math.abs(Math.abs(code) - 26) : code;
    },
    getCode: function (letter) {
        if (letter === void 0) { letter = ''; }
        return letter.charCodeAt(0) - 65;
    },
    getLetter: function (code) {
        if (code === void 0) { code = 0; }
        return String.fromCharCode(code + 65);
    },
    log: function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return config_1.debug && console.log.apply(console, args);
    }
};
