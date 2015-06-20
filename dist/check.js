/*
    @license
    Copyright (C) 2015 Dave Lesage
    License: MIT
    See license.txt for full license text.
*/

/* eslint no-use-before-define:0 */

"use strict";

var _Object$defineProperty = require("babel-runtime/core-js/object/define-property")["default"];

var _Symbol$iterator = require("babel-runtime/core-js/symbol/iterator")["default"];

var _interopRequireDefault = require("babel-runtime/helpers/interop-require-default")["default"];

_Object$defineProperty(exports, "__esModule", {
    value: true
});

exports.empty = empty;
exports.exists = exists;
exports.is = is;
exports.isArray = isArray;
exports.isBoolean = isBoolean;
exports.isDate = isDate;
exports.isFunction = isFunction;
exports.isIterable = isIterable;
exports.isNumber = isNumber;
exports.isObject = isObject;
exports.isString = isString;
exports.isRegExp = isRegExp;
exports.isType = isType;

var _zanaUtil = require("zana-util");

var _zanaUtil2 = _interopRequireDefault(_zanaUtil);

var getType = _zanaUtil2["default"].getType;
var types = _zanaUtil2["default"].types;

/**
    Checks that the provided value is considered to be empty.

    @param {any} value The value to check for emptiness.
    @returns {boolean} True, if the check passes.
*/

function empty(value) {
    if (!value) return true;
    if (exists(value.length) && value.length === 0) // covers strings, arrays, etc
        return true;
    switch (getType(value)) {
        case types.object:
            for (var prop in value) {
                if (value.hasOwnProperty(prop)) return false;
            }
            return true;
        case types.set:
        case types.map:
            return value.size === 0;
    }
    // anything else to cover?
    return false;
}

/**
    Checks that the provided value is not equal to null or undefined.

    @param {any} value The value to check for null or undefined values.
    @returns {boolean} True, if the check passes.
*/

function exists(value) {
    return value != null;
}

/**
    Checks that the provided two values are of the same type,
    either by using their prototypes or the values themselves.

    @param {any} val1 The first value for which to check type.
    @param {any} val2 The second value for which to check type.
    @returns {boolean} True, if the values are of the same type.
*/

function is(val1, val2) {
    var pro1 = val1 && val1.prototype ? val1.prototype : val1;
    var pro2 = val2 && val2.prototype ? val2.prototype : val2;
    return getType(pro1) === getType(pro2);
}

/**
    Checks that the provided value is an array type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/

function isArray(value) {
    // consider using Array.is()
    return isType(value, types.array);
}

/**
    Checks that the provided value is a boolean type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/

function isBoolean(value) {
    return getType(value) === types.boolean;
}

/**
    Checks that the provided value is a date type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/

function isDate(value) {
    return getType(value) === types.date;
}

/**
    Checks that the provided value is a function type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/

function isFunction(value) {
    return getType(value) === types["function"];
}

/**
    Checks that the provided value is a generator function type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
export function isGeneratorFunction(value) {
    return getType(value) === types.function && value.isGenerator();
}
*/

/**
    Checks that the provided value is an iterable type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/

function isIterable(value) {
    // tbd if this is sufficient. check with both fns and generator fns
    return exists(value) && getType(value[_Symbol$iterator]) === types["function"];
}

/**
    Checks that the provided value is a number type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/

function isNumber(value) {
    return getType(value) === types.number;
}

/**
    Checks that the provided value is an object type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/

function isObject(value) {
    return getType(value) === types.object;
}

/**
    Checks that the provided value is a string type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/

function isString(value) {
    return getType(value) === types.string;
}

/**
    Checks that the provided value is a string type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/

function isRegExp(value) {
    return getType(value) === types.regexp;
}

/**
    Checks that the provided value is a provided type.

    @param {any} value The value on which to check.
    @param {string} type The name of the type for which to check.
    @returns {boolean} True if the check passes, false if not.
*/

function isType(value, type) {
    return getType(value) === type;
}

exports["default"] = {
    empty: empty,
    exists: exists,
    is: is,
    isArray: isArray,
    isBoolean: isBoolean,
    isDate: isDate,
    isFunction: isFunction,
    isIterable: isIterable,
    isNumber: isNumber,
    isObject: isObject,
    isRegex: isRegExp,
    isRegExp: isRegExp,
    isString: isString,
    isType: isType
};