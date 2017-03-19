(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = naming;
function naming() {
    console.log('Saludos');
}

// module.exports = naming;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.data = data;
exports.info = info;
exports.get = get;
function data() {
    return console.log('1');
}

function info() {
    return console.log('2');
}

function get() {
    return console.log('3');
}

},{}],3:[function(require,module,exports){
'use strict';

var _index = require('./date/index.js');

var _index2 = _interopRequireDefault(_index);

var _items = require('./date/items.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

console.log('OK');

},{"./date/index.js":1,"./date/items.js":2}]},{},[3]);
