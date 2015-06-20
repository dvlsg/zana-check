import check from '../dist/check.js';

describe('Check', () => {

    describe('empty', () => {

        it('should pass for undefined');
        it('should pass for null');
        it('should pass for empty strings');
        it('should pass for empty numbers');
        it('should pass for empty objects');
        it('should pass for empty arrays');
        it('should pass for empty sets');
        it('should pass for empty maps');
        it('should pass for any item with a length of 0');

        it('should fail for non empty strings');
        it('should fail for non empty numbers');
        it('should fail for non empty objects');
        it('should fail for non empty arrays');
        it('should fail for non empty sets');
        it('should fail for non empty maps');
        it('should fail for any item with a length greater than 0');
    });

    describe('exists', () => {
        it('should pass for any string');
        it('should pass for any number');
        it('should pass for any object');
        it('should pass for any array');
        it('should pass for any set');
        it('should pass for any map');
        it('should pass for any date');
        it('should pass for any regular expression');

        it('should fail for undefined');
        it('should fail for null');
    });

    describe('is', () => {
        it('should pass for two strings');
        it('should pass for two numbers');
        it('should pass for two objects');
        it('should pass for two arrays');
        it('should pass for two sets');
        it('should pass for two maps');
        it('should pass for two dates');
        it('should pass for two regular expressions');
        it('should pass for two of the same class');

        it('should fail for any two different types');
    });

    describe('isArray', () => {
        it('should pass for arrays');
        it('should fail for non arrays');
    });

    describe('isBoolean', () => {
        it('should pass for booleans');
        it('should fail for non booleans');
    });

    describe('isDate', () => {
        it('should pass for dates');
        it('should fail for non dates');
    });

    describe('isFunction', () => {
        it('should pass for functions');
        it('should fail for non functions');
    });

    describe('isIterable', () => {
        it('should pass for anything with Symbol.iterator');
        it('should fail for anything without Symbol.iterator');
    });

    describe('isNumber', () => {
        it('should pass for numbers');
        it('should fail for non numbers');
    });

    describe('isObject', () => {
        it('should pass for objects');
        it('should fail for non objects');
    });

    describe('isRegExp', () => {
        it('should pass for regular expressions');
        it('should fail for non regular expressions');
    });

    describe('isRegex', () => {
        it('should be a reference to isRegExp');
    });

    describe('isString', () => {
        it('should pass for strings');
        it('should fail for non numbers');
    });
});
