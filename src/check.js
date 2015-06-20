/*
    @license
    Copyright (C) 2015 Dave Lesage
    License: MIT
    See license.txt for full license text.
*/

/* eslint no-use-before-define:0 */

"use strict";

import util from 'zana-util';
let { getType, types } = util;

/**
    Checks that the provided value is considered to be empty.

    @param {any} value The value to check for emptiness.
    @returns {boolean} True, if the check passes.
*/
export function empty(value) {
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
export function exists(value) {
    return value != null;
}

/**
    Checks that the provided two values are of the same type,
    either by using their prototypes or the values themselves.

    @param {any} val1 The first value for which to check type.
    @param {any} val2 The second value for which to check type.
    @returns {boolean} True, if the values are of the same type.
*/
export function is(val1, val2) {
    let pro1 = (val1 && val1.prototype) ? val1.prototype : val1;
    let pro2 = (val2 && val2.prototype) ? val2.prototype : val2;
    return getType(pro1) === getType(pro2);
}

/**
    Checks that the provided value is an array type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
export function isArray(value) {
    // consider using Array.is()
    return isType(value, types.array);
}

/**
    Checks that the provided value is a boolean type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
export function isBoolean(value) {
    return getType(value) === types.boolean;
}

/**
    Checks that the provided value is a date type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
export function isDate(value) {
    return getType(value) === types.date;
}

/**
    Checks that the provided value is a function type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
export function isFunction(value) {
    return getType(value) === types.function;
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
export function isIterable(value) {
    // tbd if this is sufficient. check with both fns and generator fns
    return exists(value) && getType(value[Symbol.iterator]) === types.function;
}

/**
    Checks that the provided value is a number type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
export function isNumber(value) {
    return getType(value) === types.number;
}

/**
    Checks that the provided value is an object type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
export function isObject(value) {
    return getType(value) === types.object;
}

/**
    Checks that the provided value is a string type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
export function isString(value) {
    return getType(value) === types.string;
}

/**
    Checks that the provided value is a string type.

    @param {any} value The value on which to check.
    @returns {boolean} True if the check passes, false if not.
*/
export function isRegExp(value) {
    return getType(value) === types.regexp;
}

/**
    Checks that the provided value is a provided type.

    @param {any} value The value on which to check.
    @param {string} type The name of the type for which to check.
    @returns {boolean} True if the check passes, false if not.
*/
export function isType(value, type) {
    return getType(value) === type;
}

export default {
    empty,
    exists,
    is,
    isArray,
    isBoolean,
    isDate,
    isFunction,
    isIterable,
    isNumber,
    isObject,
    isRegex: isRegExp,
    isRegExp,
    isString,
    isType
};
