import check from '../dist/check.js';
import assert from 'assert';
let log = console.log.bind(console);

describe('Check', () => {

    describe('empty', () => {

        it('should pass for undefined', () => {
            assert.ok(check.empty(undefined));
        });

        it('should pass for null', () => {
            assert.ok(check.empty(null));
        });

        it('should pass for empty strings', () => {
            assert.ok(check.empty(''));
        });

        it('should pass for zero and NaN', () => {
            assert.ok(check.empty(+0));
            assert.ok(check.empty(-0));
            assert.ok(check.empty(NaN));
        });

        it('should pass for empty objects', () => {
            assert.ok(check.empty({}));
            let o1 = {a: 1};
            delete o1.a;
            assert.ok(check.empty(o1));
        });

        it('should pass for empty arrays', () => {
            assert.ok(check.empty([]));
            let a1 = [];
            a1.push(1);
            a1.pop();
            assert.ok(check.empty(a1));
        });

        it('should pass for empty sets', () => {
            assert.ok(check.empty(new Set()));
            assert.ok(check.empty(new Set([])));
            let s1 = new Set([1]);
            s1.delete(1);
            assert.ok(check.empty(s1));
        });

        it('should pass for empty maps', () => {
            assert.ok(check.empty(new Map()));
            assert.ok(check.empty(new Map([])));
            let m1 = new Map([['a', 1]]);
            m1.delete('a');
            assert.ok(check.empty(m1));
        });

        it('should pass for any item with a length of 0', () => {
            class A {
                constructor(...args) {
                    this.arr = args;
                }
                get length() {
                    return this.arr.length;
                }
            };
            assert.ok(check.empty(new A()));
            let a1 = new A(1, 2);
            a1.arr.pop();
            a1.arr.pop();
            assert.ok(check.empty(a1));
        });

        it('should fail for non empty strings', () => {
            assert.equal(false, check.empty('a'));
            assert.equal(false, check.empty(' '));
        });

        it('should fail for non empty numbers', () => {
            assert.equal(false, check.empty(1));
            assert.equal(false, check.empty(0.001));
            assert.equal(false, check.empty(Infinity));
            assert.equal(false, check.empty(-Infinity));
        });

        it('should fail for non empty objects', () => {
            assert.equal(false, check.empty({a: 1}));
        });

        it('should fail for non empty arrays', () => {
            assert.equal(false, check.empty([1, 2, 3]));
            assert.equal(false, check.empty([0]));
            assert.equal(false, check.empty([undefined]));
            assert.equal(false, check.empty([null]));
        });

        it('should fail for non empty sets', () => {
            assert.equal(false, check.empty(new Set([1])));
            let s1 = new Set();
            s1.add(undefined);
            assert.equal(false, check.empty(s1));
            let s2 = new Set();
            s2.add(null);
            assert.equal(false, check.empty(s2));
        });

        it('should fail for non empty maps', () => {
            assert.equal(false, check.empty(new Map([['a', 1]])));
            let m1 = new Map();
            m1.set(undefined, undefined);
            assert.equal(false, check.empty(m1));
            let m2 = new Map();
            m2.set(null, null);
            assert.equal(false, check.empty(m2));
        });

        it('should fail for any item with a length greater than 0', () => {
            class A {
                constructor(...args) {
                    this.arr = args;
                }
                get length() {
                    return this.arr.length;
                }
            };
            assert.equal(false, check.empty(new A(1)));
            assert.equal(false, check.empty(new A(null)));
            assert.equal(false, check.empty(new A(undefined)));
        });

    });

    describe('exists', () => {

        it('should pass for any string', () => {
            assert.ok(check.exists('string'));
            assert.ok(check.exists(''));
            assert.ok(check.exists('false'));
            assert.ok(check.exists('0'));
        });

        it('should pass for any number', () => {
            assert.ok(check.exists(0));
            assert.ok(check.exists(+0));
            assert.ok(check.exists(-0));
            assert.ok(check.exists(Infinity));
            assert.ok(check.exists(-Infinity));
            assert.ok(check.exists(NaN));
        });

        it('should pass for any object', () => {
            assert.ok(check.exists({a: 1}));
            assert.ok(check.exists({}));
            assert.ok(check.exists({valueOf: null})); // necessary?
        });

        it('should pass for any array', () => {
            assert.ok(check.exists([]));
            assert.ok(check.exists([false]));
            assert.ok(check.exists([0]));
            assert.ok(check.exists([undefined]));
            assert.ok(check.exists([null]));
        });

        it('should pass for any set', () => {
            assert.ok(check.exists(new Set()));
            assert.ok(check.exists(new Set([])));
            assert.ok(check.exists(new Set([false])));
            assert.ok(check.exists(new Set([0])));
            assert.ok(check.exists(new Set([undefined])));
            assert.ok(check.exists(new Set([null])));
        });

        it('should pass for any map', () => {
            assert.ok(check.exists(new Map()));
            assert.ok(check.exists(new Map([[]])));
            assert.ok(check.exists(new Map([[false, false]])));
            assert.ok(check.exists(new Map([[undefined, undefined]])));
            assert.ok(check.exists(new Map([[null, null]])));
            assert.ok(check.exists(new Map([[0, 0]])));
        });

        it('should pass for any date', () => {
            assert.ok(check.exists(new Date()));
        });

        it('should pass for any regular expression', () => {
            assert.ok(check.exists(/./));
            assert.ok(check.exists(new RegExp()));
        });

        it('should fail for undefined', () => {
            assert.equal(false, check.exists(null));
        });

        it('should fail for null', () => {
            assert.equal(false, check.exists(undefined));
        });

    });

    describe('instance', () => {

        it('should pass for booleans from constructor', () => {
            assert.ok(check.instance(new Boolean(), Boolean));
        });

        it('should fail for literal booleans', () => {
            assert.equal(false, check.instance(true, Boolean));
            assert.equal(false, check.instance(false, Boolean));
        });

        it('should pass for classes', () => {
            class A {};
            class B extends A {};
            assert.ok(check.instance(new A(), A));
            assert.ok(check.instance(new B(), B));
            assert.ok(check.instance(new B(), A));
        });

        it('should pass for dates', () => {
            assert.ok(check.instance(new Date(), Date));
        });

        it('should pass for maps', () => {
            assert.ok(check.instance(new Map(), Map));
        });

        it('should pass for numbers from constructor', () => {
            assert.ok(check.instance(new Number(1), Number));
            assert.ok(check.instance(new Number(), Number));
        });

        it('should fail for literal numbers', () => {
            assert.equal(false, check.instance(0, Number));
            assert.equal(false, check.instance(-0, Number));
            assert.equal(false, check.instance(-0, Number));
            assert.equal(false, check.instance(NaN, Number));
            assert.equal(false, check.instance(Infinity, Number));
            assert.equal(false, check.instance(-Infinity, Number));
        });

        it('should pass for objects', () => {
            assert.ok(check.instance({}, Object));
        });

        it('should pass for regular expressions', () => {
            assert.ok(check.instance(/.*/, RegExp));
        });

        it('should pass for sets', () => {
            assert.ok(check.instance(new Set(), Set));
        });

        it('should pass for strings from constructor', () => {
            assert.ok(check.instance(new String('stuff'), String));
            assert.ok(check.instance(new String(), String));
        });

        it('should fail for literal strings', () => {
            assert.equal(false, check.instance('string', String));
        });
    });

    describe('is', () => {

        it('should pass for two strings', () => {
            assert.ok(check.is('', ''));
            assert.ok(check.is('', 'string'));
            assert.ok(check.is('', new String()));
            assert.ok(check.is('', String()));
            assert.ok(check.is('', String));
        });

        it('should pass for two numbers', () => {
            assert.ok(check.is(0, 0));
            assert.ok(check.is(0, NaN));
            assert.ok(check.is(0, new Number()));
            assert.ok(check.is(0, Number()));
            assert.ok(check.is(0, Number));
        });
        
        it('should pass for two objects', () => {
            assert.ok(check.is({}, {}));
            assert.ok(check.is({}, new Object()));
            assert.ok(check.is({}, Object()));
            assert.ok(check.is({}, Object));
        });
        
        it('should pass for two arrays', () => {
            assert.ok(check.is([], []));
            assert.ok(check.is([], new Array()));
            assert.ok(check.is([], Array()));
            assert.ok(check.is([], Array));
        });

        it('should pass for two sets', () => {
            assert.ok(check.is(new Set(), new Set()));
            assert.ok(check.is(new Set(), Set));
        });
        
        it('should pass for two maps', () => {
            assert.ok(check.is(new Map(), new Map()));
            assert.ok(check.is(new Map(), Map));
        });
        
        it('should pass for two dates', () => {
            assert.ok(check.is(new Date(), new Date()));
            // note that `Date()` without `new` actually returns a string
            assert.ok(check.is(Date(), String)); // javascript oddity?
            assert.ok(check.is(new Date(), Date));
        });
        
        it('should pass for two regular expressions', () => {
            assert.ok(check.is(/.*/, /.*/));
            assert.ok(check.is(/.*/, new RegExp()));
            assert.ok(check.is(/.*/, RegExp()));
            assert.ok(check.is(/.*/, RegExp));
        });

        it('should pass for errors', () => {
            assert.ok(check.is(new Error(), new Error()));
            assert.ok(check.is(new Error(), Error()));
            assert.ok(check.is(new Error(), Error));
        });
        
        it('should pass for two of the same class', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.ok(check.is(new A(), new A()));
            assert.ok(check.is(new A(), A));
        });

        it('should fail for a string and any other type', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.is('', 0));
            assert.equal(false, check.is('', []));
            assert.equal(false, check.is('', {}));
            assert.equal(false, check.is('', new Set()));
            assert.equal(false, check.is('', new Map()));
            assert.equal(false, check.is('', new RegExp()));
            assert.equal(false, check.is('', new Date()));
            assert.equal(false, check.is('', new Error()));
            assert.equal(false, check.is('', new A()));
            assert.equal(false, check.is('', Symbol()));
        });

        it('should fail for a number and any other type', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.is(0, ''));
            assert.equal(false, check.is(0, []));
            assert.equal(false, check.is(0, {}));
            assert.equal(false, check.is(0, new Set()));
            assert.equal(false, check.is(0, new Map()));
            assert.equal(false, check.is(0, new RegExp()));
            assert.equal(false, check.is(0, new Date()));
            assert.equal(false, check.is(0, new Error()));
            assert.equal(false, check.is(0, new A()));
            assert.equal(false, check.is(0, Symbol()));
        });

        it('should fail for an array and any other type', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.is([], 0));
            assert.equal(false, check.is([], ''));
            assert.equal(false, check.is([], {}));
            assert.equal(false, check.is([], new Set()));
            assert.equal(false, check.is([], new Map()));
            assert.equal(false, check.is([], new RegExp()));
            assert.equal(false, check.is([], new Date()));
            assert.equal(false, check.is([], new Error()));
            assert.equal(false, check.is([], new A()));
            assert.equal(false, check.is([], Symbol()));
        });

        it('should fail for an object and any other type', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.is({}, 0));
            assert.equal(false, check.is({}, ''));
            assert.equal(false, check.is({}, []));
            assert.equal(false, check.is({}, new Set()));
            assert.equal(false, check.is({}, new Map()));
            assert.equal(false, check.is({}, new RegExp()));
            assert.equal(false, check.is({}, new Date()));
            assert.equal(false, check.is({}, new Error()));
            assert.equal(false, check.is({}, new A()));
            assert.equal(false, check.is({}, Symbol()));
        });

        it('should fail for a set and any other type', () => {
            class A {};
            assert.equal(false, check.is(new Set(), 0));
            assert.equal(false, check.is(new Set(), ''));
            assert.equal(false, check.is(new Set(), []));
            assert.equal(false, check.is(new Set(), {}));
            assert.equal(false, check.is(new Set(), new Map()));
            assert.equal(false, check.is(new Set(), new RegExp()));
            assert.equal(false, check.is(new Set(), new Date()));
            assert.equal(false, check.is(new Set(), new Error()));
            assert.equal(false, check.is(new Set(), new A()));
            assert.equal(false, check.is(new Set(), Symbol()));
        });

        it('should fail for a map and any other type', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.is(new Map(), 0));
            assert.equal(false, check.is(new Map(), ''));
            assert.equal(false, check.is(new Map(), []));
            assert.equal(false, check.is(new Map(), {}));
            assert.equal(false, check.is(new Map(), new Set()));
            assert.equal(false, check.is(new Map(), new RegExp()));
            assert.equal(false, check.is(new Map(), new Date()));
            assert.equal(false, check.is(new Map(), new Error()));
            assert.equal(false, check.is(new Map(), new A()));
            assert.equal(false, check.is(new Map(), Symbol()));
        });

        it('should fail for a regexp and any other type', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.is(/.*/, 0));
            assert.equal(false, check.is(/.*/, ''));
            assert.equal(false, check.is(/.*/, []));
            assert.equal(false, check.is(/.*/, {}));
            assert.equal(false, check.is(/.*/, new Set()));
            assert.equal(false, check.is(/.*/, new Map()));
            assert.equal(false, check.is(/.*/, new Date()));
            assert.equal(false, check.is(/.*/, new Error()));
            assert.equal(false, check.is(/.*/, new A()));
            assert.equal(false, check.is(/.*/, Symbol()));
        });

        it('should fail for a date and any other type', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.is(new Date(), 0));
            assert.equal(false, check.is(new Date(), ''));
            assert.equal(false, check.is(new Date(), []));
            assert.equal(false, check.is(new Date(), {}));
            assert.equal(false, check.is(new Date(), new Set()));
            assert.equal(false, check.is(new Date(), new Map()));
            assert.equal(false, check.is(new Date(), new RegExp()));
            assert.equal(false, check.is(new Date(), new Error()));
            assert.equal(false, check.is(new Date(), new A()));
            assert.equal(false, check.is(new Date(), Symbol()));
        });

        it('should fail for a error and any other type', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.is(new Error(), 0));
            assert.equal(false, check.is(new Error(), ''));
            assert.equal(false, check.is(new Error(), []));
            assert.equal(false, check.is(new Error(), {}));
            assert.equal(false, check.is(new Error(), new Set()));
            assert.equal(false, check.is(new Error(), new Map()));
            assert.equal(false, check.is(new Error(), new RegExp()));
            assert.equal(false, check.is(new Error(), new Date()));
            assert.equal(false, check.is(new Error(), new A()));
            assert.equal(false, check.is(new Error(), Symbol()));
        });

        it('should fail for classes and any other type', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.is(new A(), 0));
            assert.equal(false, check.is(new A(), ''));
            assert.equal(false, check.is(new A(), []));
            assert.equal(false, check.is(new A(), {}));
            assert.equal(false, check.is(new A(), new Set()));
            assert.equal(false, check.is(new A(), new Map()));
            assert.equal(false, check.is(new A(), new RegExp()));
            assert.equal(false, check.is(new A(), new Date()));
            assert.equal(false, check.is(new A(), new Error()));
            assert.equal(false, check.is(new A(), Symbol()));
        });

        it('should fail for a symbols and any other type', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.is(Symbol(), 0));
            assert.equal(false, check.is(Symbol(), ''));
            assert.equal(false, check.is(Symbol(), []));
            assert.equal(false, check.is(Symbol(), {}));
            assert.equal(false, check.is(Symbol(), new Set()));
            assert.equal(false, check.is(Symbol(), new Map()));
            assert.equal(false, check.is(Symbol(), new RegExp()));
            assert.equal(false, check.is(Symbol(), new Date()));
            assert.equal(false, check.is(Symbol(), new Error()));
            assert.equal(false, check.is(Symbol(), new A()));
        });

    });

    describe('isArray', () => {

        it('should pass for arrays', () => {
            assert.ok(check.isArray([]));
            assert.ok(check.isArray(new Array()));
            assert.ok(check.isArray(Array()));
            assert.ok(check.isArray(Array.prototype));
        });

        it('should fail for non arrays', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.isArray(true));
            assert.equal(false, check.isArray(0));
            assert.equal(false, check.isArray(''));
            assert.equal(false, check.isArray({}));
            assert.equal(false, check.isArray(() => {}));
            assert.equal(false, check.isArray(new Set()));
            assert.equal(false, check.isArray(new Map()));
            assert.equal(false, check.isArray(new RegExp()));
            assert.equal(false, check.isArray(new Date()));
            assert.equal(false, check.isArray(new Error()));
            assert.equal(false, check.isArray(new A()));
            assert.equal(false, check.isArray(Symbol()));
        });

    });

    describe('isBoolean', () => {

        it('should pass for booleans', () => {
            assert.ok(check.isBoolean(true));
            assert.ok(check.isBoolean(false));
        });

        it('should fail for non booleans', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.isBoolean(0));
            assert.equal(false, check.isBoolean(''));
            assert.equal(false, check.isBoolean([]));
            assert.equal(false, check.isBoolean({}));
            assert.equal(false, check.isBoolean(() => {}));
            assert.equal(false, check.isBoolean(new Set()));
            assert.equal(false, check.isBoolean(new Map()));
            assert.equal(false, check.isBoolean(new RegExp()));
            assert.equal(false, check.isBoolean(new Date()));
            assert.equal(false, check.isBoolean(new Error()));
            assert.equal(false, check.isBoolean(new A()));
            assert.equal(false, check.isBoolean(Symbol()));
        });

    });

    describe('isDate', () => {
        
        it('should pass for dates', () => {
            assert.ok(check.isDate(new Date()));
            assert.ok(check.isDate(Date.prototype));
        });

        it('should fail for non dates', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.isDate(true));
            assert.equal(false, check.isDate(0));
            assert.equal(false, check.isDate(''));
            assert.equal(false, check.isDate([]));
            assert.equal(false, check.isDate({}));
            assert.equal(false, check.isDate(() => {}));
            assert.equal(false, check.isDate(new Set()));
            assert.equal(false, check.isDate(new Map()));
            assert.equal(false, check.isDate(new RegExp()));
            assert.equal(false, check.isDate(new Error()));
            assert.equal(false, check.isDate(new A()));
            assert.equal(false, check.isDate(Symbol()));
        });
        
    });

    describe('isFunction', () => {
        it('should pass for functions', () => {
            assert.ok(check.isFunction(() => {}));
            assert.ok(check.isFunction(new Function()));
            assert.ok(check.isFunction(Function()));
            assert.ok(check.isFunction(Function));
            assert.ok(check.isFunction(Function.prototype));
        });

        it('should fail for non functions', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.isFunction(true));
            assert.equal(false, check.isFunction(0));
            assert.equal(false, check.isFunction(''));
            assert.equal(false, check.isFunction([]));
            assert.equal(false, check.isFunction({}));
            assert.equal(false, check.isFunction(new Set()));
            assert.equal(false, check.isFunction(new Map()));
            assert.equal(false, check.isFunction(new RegExp()));
            assert.equal(false, check.isFunction(new Date()));
            assert.equal(false, check.isFunction(new Error()));
            assert.equal(false, check.isFunction(new A()));
            assert.equal(false, check.isFunction(Symbol()));
        });

    });

    describe('isIterable', () => {

        it('should pass for anything with Symbol.iterator', () => {
            assert.ok(check.isIterable([]));
            assert.ok(check.isIterable(new Set()));
            assert.ok(check.isIterable(new Map()));
            let obj = {
                *[Symbol.iterator]() {
                    yield 1; yield 2; yield 3;
                }
            };
            assert.ok(check.isIterable(obj));
            class A {
                *[Symbol.iterator]() {
                    yield 1; yield 2; yield 3;
                }
            };
            assert.ok(check.isIterable(new A()));
        });

        it('should fail for anything without Symbol.iterator', () => {
            assert.equal(false, check.isIterable({}));
            assert.equal(false, check.isIterable(new WeakMap()));
            assert.equal(false, check.isIterable(new WeakSet()));
            class A {};
            assert.equal(false, check.isIterable(new A()));
        });

    });

    describe('isMap', () => {

        it('should pass for maps', () => {
            assert.ok(check.isMap(new Map()));
            assert.ok(check.isMap(Map.prototype));
        });

        it('should fail for non sets', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.isMap(true));
            assert.equal(false, check.isMap(''));
            assert.equal(false, check.isMap(0));
            assert.equal(false, check.isMap([]));
            assert.equal(false, check.isMap({}));
            assert.equal(false, check.isMap(() => {}));
            assert.equal(false, check.isMap(new Set()));
            assert.equal(false, check.isMap(new RegExp()));
            assert.equal(false, check.isMap(new Date()));
            assert.equal(false, check.isMap(new Error()));
            assert.equal(false, check.isMap(new A()));
            assert.equal(false, check.isMap(Symbol()));
        });
    });

    describe('isNumber', () => {

        it('should pass for numbers', () => {
            assert.ok(check.isNumber(0));
            assert.ok(check.isNumber(+0));
            assert.ok(check.isNumber(-0));
            assert.ok(check.isNumber(NaN)); // do we want NaN to fail?
            assert.ok(check.isNumber(Infinity));
            assert.ok(check.isNumber(-Infinity));
            assert.ok(check.isNumber(new Number()));
            assert.ok(check.isNumber(Number()));
            assert.ok(check.isNumber(Number.prototype));
        });

        it('should fail for non numbers', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.isNumber(true));
            assert.equal(false, check.isNumber(''));
            assert.equal(false, check.isNumber([]));
            assert.equal(false, check.isNumber({}));
            assert.equal(false, check.isNumber(() => {}));
            assert.equal(false, check.isNumber(new Set()));
            assert.equal(false, check.isNumber(new Map()));
            assert.equal(false, check.isNumber(new RegExp()));
            assert.equal(false, check.isNumber(new Date()));
            assert.equal(false, check.isNumber(new Error()));
            assert.equal(false, check.isNumber(new A()));
            assert.equal(false, check.isNumber(Symbol()));
        });

    });

    describe('isObject', () => {

        it('should pass for objects', () => {
            assert.ok(check.isObject({}));
            assert.ok(check.isObject(new Object()));
            assert.ok(check.isObject(Object.prototype));
        });

        it('should fail for non objects', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.isObject(true));
            assert.equal(false, check.isObject(0));
            assert.equal(false, check.isObject(''));
            assert.equal(false, check.isObject([]));
            assert.equal(false, check.isObject(() => {}));
            assert.equal(false, check.isObject(new Set()));
            assert.equal(false, check.isObject(new Map()));
            assert.equal(false, check.isObject(new RegExp()));
            assert.equal(false, check.isObject(new Date()));
            assert.equal(false, check.isObject(new Error()));
            assert.equal(false, check.isObject(new A()));
            assert.equal(false, check.isObject(Symbol()));
        });

    });

    describe('isRegExp', () => {

        it('should pass for regular expressions', () => {
            assert.ok(check.isRegExp(/.*/));
            assert.ok(check.isRegExp(new RegExp('.*')));
            assert.ok(check.isRegExp(RegExp('.*')));
            assert.ok(check.isRegExp(RegExp.prototype));
        });

        it('should fail for non regular expressions', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.isRegExp(true));
            assert.equal(false, check.isRegExp(0));
            assert.equal(false, check.isRegExp(''));
            assert.equal(false, check.isRegExp([]));
            assert.equal(false, check.isRegExp({}));
            assert.equal(false, check.isRegExp(() => {}));
            assert.equal(false, check.isRegExp(new Set()));
            assert.equal(false, check.isRegExp(new Map()));
            assert.equal(false, check.isRegExp(new Date()));
            assert.equal(false, check.isRegExp(new Error()));
            assert.equal(false, check.isRegExp(new A()));
            assert.equal(false, check.isRegExp(Symbol()));
        });

    });

    describe('isRegex', () => {

        it('should be a reference to isRegExp', () => {
            assert.strictEqual(check.isRegex, check.isRegExp);
        });

    });

    describe('isSet', () => {

        it('should pass for sets', () => {
            assert.ok(check.isSet(new Set()));
            assert.ok(check.isSet(Set.prototype));
        });

        it('should fail for non sets', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.isSet(true));
            assert.equal(false, check.isSet(''));
            assert.equal(false, check.isSet(0));
            assert.equal(false, check.isSet([]));
            assert.equal(false, check.isSet({}));
            assert.equal(false, check.isSet(() => {}));
            assert.equal(false, check.isSet(new Map()));
            assert.equal(false, check.isSet(new RegExp()));
            assert.equal(false, check.isSet(new Date()));
            assert.equal(false, check.isSet(new Error()));
            assert.equal(false, check.isSet(new A()));
            assert.equal(false, check.isSet(Symbol()));
        });
    });

    describe('isString', () => {

        it('should pass for strings', () => {
            assert.ok(check.isString(''));
            assert.ok(check.isString(new String()));
            assert.ok(check.isString(String()));
            assert.ok(check.isString(String.prototype));
        });

        it('should fail for non strings', () => {
            class A { get [Symbol.toStringTag]() { return 'A'; }};
            assert.equal(false, check.isString(true));
            assert.equal(false, check.isString(0));
            assert.equal(false, check.isString([]));
            assert.equal(false, check.isString({}));
            assert.equal(false, check.isString(() => {}));
            assert.equal(false, check.isString(new Set()));
            assert.equal(false, check.isString(new Map()));
            assert.equal(false, check.isString(new RegExp()));
            assert.equal(false, check.isString(new Date()));
            assert.equal(false, check.isString(new Error()));
            assert.equal(false, check.isString(new A()));
            assert.equal(false, check.isString(Symbol()));
        });
    });

});
