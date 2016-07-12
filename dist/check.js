/*
    @license
    Copyright (C) 2015 Dave Lesage
    License: MIT
    See license.txt for full license text.
*/

/* eslint no-use-before-define:0 */

"use strict";

const { getType, types } = require('zana-util');

/**
    Checks that the provided value is considered to be empty.

    @param {any} value The value to check for emptiness.
    @returns {boolean} True, if the check passes.
*/
function empty(value) {
    if (!value)
        return true;
    if (exists(value.length) && value.length === 0) // covers strings, arrays, etc
        return true;
    switch (getType(value)) {
        case types.object:
            for (let prop in value) {
                if (value.hasOwnProperty(prop))
                    return false;
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
    Checks that the first argument is an instance of the second argument.
    A first class function for making us of the instanceof operator.

    @param {any} arg1 The first argument for the instanceof operator.
    @param {any} arg2 The second argument for the instanceof operator.
    @returns {boolean} True, if arg1 is an instance of arg2.
*/
function instance(arg1, arg2) {
    return arg1 instanceof arg2;
}

/**
    Checks that the provided two values are of the same type,
    either by using their prototypes or the values themselves.

    @param {any} val1 The first value for which to check type.
    @param {any} val2 The second value for which to check type.
    @returns {boolean} True, if the values are of the same type.
*/
function is(val1, val2) {
    // if (val1.prototype && val2.prototype && val1.prototype === val2.prototype)
    //     return true;
    // return getType(val1) === getType(val2);
    // note that getType of (new Function()).prototype is [object Object].
    // do we actually want to do this, or suggest using instance Function, not is Function?
    let pro1 = (val1 && val1.prototype && !val1 instanceof Function) ? val1.prototype : val1;
    let pro2 = (val2 && val2.prototype) ? val2.prototype : val2;
    if (
           pro1 && pro1.constructor
        && pro2 && pro2.constructor
        && pro1.constructor === pro2.constructor
    )
        return true;
    return getType(pro1) === getType(pro2);
}

/**
    Checks that the provided value is an array type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
function isArray(value) {
    // consider using Array.is()
    return getType(value) === types.array;
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
    Checks that the provided value is an error type,
    either of the base Error or an extended Error.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
function isError(value) {
    return getType(value) === types.error || value instanceof Error;
}

/**
    Checks that the provided value is a function type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
function isFunction(value) {
    return getType(value) === types.function;
}

/**
    Checks that the provided value is a generator function type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
function isGeneratorFunction(value) {
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
    if (!exists(value))
        return false;
    let iteratorType = getType(value[Symbol.iterator]);
    return iteratorType === types.function || iteratorType === types.generator;
}

/**
    Checks that the provided value is a map type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
function isMap(value) {
    return getType(value) === types.map;
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
    Checks that the provided value is a set type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
function isSet(value) {
    return getType(value) === types.set;
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
function isType(value, T) {
    return getType(value) === T;
}

module.exports = {
    empty,
    exists,
    instance,
    is,
    isArray,
    isBoolean,
    isDate,
    isError,
    isFunction,
    isIterable,
    isMap,
    isNumber,
    isObject,
    isRegex: isRegExp,
    isRegExp,
    isSet,
    isString,
    isType,
    type: isType
};
