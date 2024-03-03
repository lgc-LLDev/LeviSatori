(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.LeviSatori = {}));
})(this, (function (exports) { 'use strict';

  let _Symbol$for, _symbols$trace, _symbols$filter, _symbols$setup, _symbols$extend, _Symbol$hasInstance, _Service$invoke, _Service$setup, _Service2$1$provide, _Service2$1$immediate, _Service2$1$invoke, _Service2$1$setup;
  var _Class, _CordisError2, _Class2, _Class3, _Class4, _Class5, _Context2, _Service2, _Class6, _Loader, _LoggerService2, _Class7, _Class8, _Service3, _Class10, _Class11, _HTTP2, _Session2, _Class12, _Class13, _Class14, _Class15, _Class16, _Class17;
  function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
  function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == typeof i ? i : String(i); }
  function _toPrimitive(t, r) { if ("object" != typeof t || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != typeof i) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
  var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};
  function getDefaultExportFromCjs(x) {
    return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
  }
  function getAugmentedNamespace(n) {
    if (n.__esModule) return n;
    var f = n.default;
    if (typeof f == "function") {
      var a = function a() {
        if (this instanceof a) {
          return Reflect.construct(f, arguments, this.constructor);
        }
        return f.apply(this, arguments);
      };
      a.prototype = f.prototype;
    } else a = {};
    Object.defineProperty(a, '__esModule', {
      value: true
    });
    Object.keys(n).forEach(function (k) {
      var d = Object.getOwnPropertyDescriptor(n, k);
      Object.defineProperty(a, k, d.get ? d : {
        enumerable: true,
        get: function () {
          return n[k];
        }
      });
    });
    return a;
  }
  const root = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof commonjsGlobal !== "undefined" && commonjsGlobal;
  const shouldPolyfillEvent = function () {
    try {
      new root.Event("");
    } catch (error) {
      return true;
    }
    return false;
  }();
  const shouldPolyfillEventTarget = function () {
    try {
      new root.EventTarget();
    } catch (error) {
      return true;
    }
    return false;
  }();
  if (shouldPolyfillEvent) {
    root.Event = function () {
      function Event(type, options) {
        this.bubbles = !!options && !!options.bubbles;
        this.cancelable = !!options && !!options.cancelable;
        this.composed = !!options && !!options.composed;
        this.type = type;
      }
      return Event;
    }();
  }
  if (shouldPolyfillEventTarget) {
    root.EventTarget = function () {
      function EventTarget() {
        this.__listeners = new Map();
      }
      EventTarget.prototype = Object.create(Object.prototype);
      EventTarget.prototype.addEventListener = function (type, listener, options) {
        if (arguments.length < 2) {
          throw new TypeError("TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only " + arguments.length + " present.");
        }
        const __listeners = this.__listeners;
        const actualType = type.toString();
        if (!__listeners.has(actualType)) {
          __listeners.set(actualType, new Map());
        }
        const listenersForType = __listeners.get(actualType);
        if (!listenersForType.has(listener)) {
          // Any given listener is only registered once
          listenersForType.set(listener, options);
        }
      };
      EventTarget.prototype.removeEventListener = function (type, listener, _options) {
        if (arguments.length < 2) {
          throw new TypeError("TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only " + arguments.length + " present.");
        }
        const __listeners = this.__listeners;
        const actualType = type.toString();
        if (__listeners.has(actualType)) {
          const listenersForType = __listeners.get(actualType);
          if (listenersForType.has(listener)) {
            listenersForType.delete(listener);
          }
        }
      };
      EventTarget.prototype.dispatchEvent = function (event) {
        if (!(event instanceof Event)) {
          throw new TypeError("Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'.");
        }
        const type = event.type;
        const __listeners = this.__listeners;
        const listenersForType = __listeners.get(type);
        if (listenersForType) {
          for (var listnerEntry of listenersForType.entries()) {
            const listener = listnerEntry[0];
            const options = listnerEntry[1];
            try {
              if (typeof listener === "function") {
                // Listener functions must be executed with the EventTarget as the `this` context.
                listener.call(this, event);
              } else if (listener && typeof listener.handleEvent === "function") {
                // Listener objects have their handleEvent method called, if they have one
                listener.handleEvent(event);
              }
            } catch (err) {
              // We need to report the error to the global error handling event,
              // but we do not want to break the loop that is executing the events.
              // Unfortunately, this is the best we can do, which isn't great, because the
              // native EventTarget will actually do this synchronously before moving to the next
              // event in the loop.
              setTimeout(() => {
                throw err;
              });
            }
            if (options && options.once) {
              // If this was registered with { once: true }, we need
              // to remove it now.
              listenersForType.delete(listener);
            }
          }
        }
        // Since there are no cancellable events on a base EventTarget,
        // this should always return true.
        return true;
      };
      return EventTarget;
    }();
  }
  var __defProp$a = Object.defineProperty;
  var __name$9 = (target, value) => __defProp$a(target, "name", {
    value,
    configurable: true
  });

  // packages/cosmokit/src/misc.ts
  function noop() {}
  __name$9(noop, "noop");
  function isNullable(value) {
    return value === null || value === void 0;
  }
  __name$9(isNullable, "isNullable");
  function isPlainObject(data) {
    return data && typeof data === "object" && !Array.isArray(data);
  }
  __name$9(isPlainObject, "isPlainObject");
  function filterKeys(object, filter) {
    return Object.fromEntries(Object.entries(object).filter(([key, value]) => filter(key, value)));
  }
  __name$9(filterKeys, "filterKeys");
  function mapValues(object, transform) {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
  }
  __name$9(mapValues, "mapValues");
  function is(type, value) {
    if (arguments.length === 1) return value2 => is(type, value2);
    return type in globalThis && value instanceof globalThis[type] || Object.prototype.toString.call(value).slice(8, -1) === type;
  }
  __name$9(is, "is");
  function clone(source) {
    if (!source || typeof source !== "object") return source;
    if (Array.isArray(source)) return source.map(clone);
    if (is("Date", source)) return new Date(source.valueOf());
    if (is("RegExp", source)) return new RegExp(source.source, source.flags);
    return mapValues(source, clone);
  }
  __name$9(clone, "clone");
  function deepEqual(a, b, strict) {
    if (a === b) return true;
    if (!strict && isNullable(a) && isNullable(b)) return true;
    if (typeof a !== typeof b) return false;
    if (typeof a !== "object") return false;
    if (!a || !b) return false;
    function check(test, then) {
      return test(a) ? test(b) ? then(a, b) : false : test(b) ? false : void 0;
    }
    __name$9(check, "check");
    return check(Array.isArray, (a2, b2) => a2.length === b2.length && a2.every((item, index) => deepEqual(item, b2[index]))) ?? check(is("Date"), (a2, b2) => a2.valueOf() === b2.valueOf()) ?? check(is("RegExp"), (a2, b2) => a2.source === b2.source && a2.flags === b2.flags) ?? Object.keys({
      ...a,
      ...b
    }).every(key => deepEqual(a[key], b[key], strict));
  }
  __name$9(deepEqual, "deepEqual");
  function pick(source, keys, forced) {
    if (!keys) return {
      ...source
    };
    const result = {};
    for (const key of keys) {
      if (forced || source[key] !== void 0) result[key] = source[key];
    }
    return result;
  }
  __name$9(pick, "pick");
  function omit(source, keys) {
    if (!keys) return {
      ...source
    };
    const result = {
      ...source
    };
    for (const key of keys) {
      Reflect.deleteProperty(result, key);
    }
    return result;
  }
  __name$9(omit, "omit");
  function defineProperty(object, key, value) {
    return Object.defineProperty(object, key, {
      writable: true,
      value,
      enumerable: false
    });
  }
  __name$9(defineProperty, "defineProperty");

  // packages/cosmokit/src/array.ts
  function contain(array1, array2) {
    return array2.every(item => array1.includes(item));
  }
  __name$9(contain, "contain");
  function intersection(array1, array2) {
    return array1.filter(item => array2.includes(item));
  }
  __name$9(intersection, "intersection");
  function difference(array1, array2) {
    return array1.filter(item => !array2.includes(item));
  }
  __name$9(difference, "difference");
  function union(array1, array2) {
    return Array.from( /* @__PURE__ */new Set([...array1, ...array2]));
  }
  __name$9(union, "union");
  function deduplicate(array) {
    return [...new Set(array)];
  }
  __name$9(deduplicate, "deduplicate");
  function remove(list, item) {
    const index = list.indexOf(item);
    if (index >= 0) {
      list.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
  __name$9(remove, "remove");
  function makeArray(source) {
    return Array.isArray(source) ? source : isNullable(source) ? [] : [source];
  }
  __name$9(makeArray, "makeArray");

  // packages/cosmokit/src/binary.ts
  function arrayBufferToBase64(buffer) {
    if (typeof Buffer !== "undefined") {
      return Buffer.from(buffer).toString("base64");
    }
    let binary = "";
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return btoa(binary);
  }
  __name$9(arrayBufferToBase64, "arrayBufferToBase64");
  function base64ToArrayBuffer(base64) {
    if (typeof Buffer !== "undefined") {
      const buf = Buffer.from(base64, "base64");
      return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
    }
    const binary = atob(base64.replace(/\s/g, ""));
    const buffer = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      buffer[i] = binary.charCodeAt(i);
    }
    return buffer;
  }
  __name$9(base64ToArrayBuffer, "base64ToArrayBuffer");

  // packages/cosmokit/src/string.ts
  function capitalize(source) {
    return source.charAt(0).toUpperCase() + source.slice(1);
  }
  __name$9(capitalize, "capitalize");
  function uncapitalize(source) {
    return source.charAt(0).toLowerCase() + source.slice(1);
  }
  __name$9(uncapitalize, "uncapitalize");
  function camelCase(source) {
    return source.replace(/[_-][a-z]/g, str => str.slice(1).toUpperCase());
  }
  __name$9(camelCase, "camelCase");
  function paramCase(source) {
    return uncapitalize(source).replace(/_/g, "-").replace(/.[A-Z]+/g, str => str[0] + "-" + str.slice(1).toLowerCase());
  }
  __name$9(paramCase, "paramCase");
  function snakeCase(source) {
    return uncapitalize(source).replace(/-/g, "_").replace(/.[A-Z]+/g, str => str[0] + "_" + str.slice(1).toLowerCase());
  }
  __name$9(snakeCase, "snakeCase");
  var camelize = camelCase;
  var hyphenate = paramCase;
  function trimSlash(source) {
    return source.replace(/\/$/, "");
  }
  __name$9(trimSlash, "trimSlash");
  function sanitize(source) {
    if (!source.startsWith("/")) source = "/" + source;
    return trimSlash(source);
  }
  __name$9(sanitize, "sanitize");

  // packages/cosmokit/src/time.ts
  exports.Time = void 0;
  (Time2 => {
    Time2.millisecond = 1;
    Time2.second = 1e3;
    Time2.minute = Time2.second * 60;
    Time2.hour = Time2.minute * 60;
    Time2.day = Time2.hour * 24;
    Time2.week = Time2.day * 7;
    let timezoneOffset = ( /* @__PURE__ */new Date()).getTimezoneOffset();
    function setTimezoneOffset(offset) {
      timezoneOffset = offset;
    }
    Time2.setTimezoneOffset = setTimezoneOffset;
    __name$9(setTimezoneOffset, "setTimezoneOffset");
    function getTimezoneOffset() {
      return timezoneOffset;
    }
    Time2.getTimezoneOffset = getTimezoneOffset;
    __name$9(getTimezoneOffset, "getTimezoneOffset");
    function getDateNumber(date = /* @__PURE__ */new Date(), offset) {
      if (typeof date === "number") date = new Date(date);
      if (offset === void 0) offset = timezoneOffset;
      return Math.floor((date.valueOf() / Time2.minute - offset) / 1440);
    }
    Time2.getDateNumber = getDateNumber;
    __name$9(getDateNumber, "getDateNumber");
    function fromDateNumber(value, offset) {
      const date = new Date(value * Time2.day);
      if (offset === void 0) offset = timezoneOffset;
      return new Date(+date + offset * Time2.minute);
    }
    Time2.fromDateNumber = fromDateNumber;
    __name$9(fromDateNumber, "fromDateNumber");
    const numeric = /\d+(?:\.\d+)?/.source;
    const timeRegExp = new RegExp(`^${["w(?:eek(?:s)?)?", "d(?:ay(?:s)?)?", "h(?:our(?:s)?)?", "m(?:in(?:ute)?(?:s)?)?", "s(?:ec(?:ond)?(?:s)?)?"].map(unit => `(${numeric}${unit})?`).join("")}$`);
    function parseTime(source) {
      const capture = timeRegExp.exec(source);
      if (!capture) return 0;
      return (parseFloat(capture[1]) * Time2.week || 0) + (parseFloat(capture[2]) * Time2.day || 0) + (parseFloat(capture[3]) * Time2.hour || 0) + (parseFloat(capture[4]) * Time2.minute || 0) + (parseFloat(capture[5]) * Time2.second || 0);
    }
    Time2.parseTime = parseTime;
    __name$9(parseTime, "parseTime");
    function parseDate(date) {
      const parsed = parseTime(date);
      if (parsed) {
        date = Date.now() + parsed;
      } else if (/^\d{1,2}(:\d{1,2}){1,2}$/.test(date)) {
        date = `${( /* @__PURE__ */new Date()).toLocaleDateString()}-${date}`;
      } else if (/^\d{1,2}-\d{1,2}-\d{1,2}(:\d{1,2}){1,2}$/.test(date)) {
        date = `${( /* @__PURE__ */new Date()).getFullYear()}-${date}`;
      }
      return date ? new Date(date) : /* @__PURE__ */new Date();
    }
    Time2.parseDate = parseDate;
    __name$9(parseDate, "parseDate");
    function format(ms) {
      const abs = Math.abs(ms);
      if (abs >= Time2.day - Time2.hour / 2) {
        return Math.round(ms / Time2.day) + "d";
      } else if (abs >= Time2.hour - Time2.minute / 2) {
        return Math.round(ms / Time2.hour) + "h";
      } else if (abs >= Time2.minute - Time2.second / 2) {
        return Math.round(ms / Time2.minute) + "m";
      } else if (abs >= Time2.second) {
        return Math.round(ms / Time2.second) + "s";
      }
      return ms + "ms";
    }
    Time2.format = format;
    __name$9(format, "format");
    function toDigits(source, length = 2) {
      return source.toString().padStart(length, "0");
    }
    Time2.toDigits = toDigits;
    __name$9(toDigits, "toDigits");
    function template(template2, time = /* @__PURE__ */new Date()) {
      return template2.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
    }
    Time2.template = template;
    __name$9(template, "template");
  })(exports.Time || (exports.Time = {}));
  var lib$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Time() {
      return exports.Time;
    },
    arrayBufferToBase64: arrayBufferToBase64,
    base64ToArrayBuffer: base64ToArrayBuffer,
    camelCase: camelCase,
    camelize: camelize,
    capitalize: capitalize,
    clone: clone,
    contain: contain,
    deduplicate: deduplicate,
    deepEqual: deepEqual,
    defineProperty: defineProperty,
    difference: difference,
    filterKeys: filterKeys,
    hyphenate: hyphenate,
    intersection: intersection,
    is: is,
    isNullable: isNullable,
    isPlainObject: isPlainObject,
    makeArray: makeArray,
    mapValues: mapValues,
    noop: noop,
    omit: omit,
    paramCase: paramCase,
    pick: pick,
    remove: remove,
    sanitize: sanitize,
    snakeCase: snakeCase,
    trimSlash: trimSlash,
    uncapitalize: uncapitalize,
    union: union,
    valueMap: mapValues
  });
  var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib$1);
  var __create = Object.create;
  var __defProp$9 = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames$2 = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp$9(obj, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    value
  }) : obj[key] = value;
  var __esm = (fn, res) => function __init() {
    return fn && (res = (0, fn[__getOwnPropNames$2(fn)[0]])(fn = 0)), res;
  };
  var __commonJS$2 = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames$2(cb)[0]])((mod = {
      exports: {}
    }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames$2(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp$9(to, key, {
        get: () => from[key],
        enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
      });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp$9(target, "default", {
    value: mod,
    enumerable: true
  }) : target, mod));
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // src/util.ts
  function objectToString(o) {
    return Object.prototype.toString.call(o);
  }
  function isArray(ar) {
    return Array.isArray(ar);
  }
  function isBoolean$1(arg) {
    return typeof arg === "boolean";
  }
  function isNull$1(arg) {
    return arg === null;
  }
  function isNumber(arg) {
    return typeof arg === "number";
  }
  function isString(arg) {
    return typeof arg === "string";
  }
  function isUndefined(arg) {
    return arg === void 0;
  }
  function isRegExp(re) {
    return isObject$1(re) && objectToString(re) === "[object RegExp]";
  }
  function isObject$1(arg) {
    return typeof arg === "object" && arg !== null;
  }
  function isDate(d) {
    return isObject$1(d) && objectToString(d) === "[object Date]";
  }
  function isError(e) {
    return isObject$1(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
  }
  function isFunction(arg) {
    return typeof arg === "function";
  }
  function hasOwnProperty(obj, prop) {
    return Object.prototype.hasOwnProperty.call(obj, prop);
  }
  function _extend(origin, add) {
    if (!add || !isObject$1(add)) return origin;
    var keys = Object.keys(add);
    var i = keys.length;
    while (i--) {
      origin[keys[i]] = add[keys[i]];
    }
    return origin;
  }
  function stylizeWithColor(str, styleType) {
    var style = inspect.styles[styleType];
    if (style) {
      return "\x1B[" + inspect.colors[style][0] + "m" + str + "\x1B[" + inspect.colors[style][1] + "m";
    } else {
      return str;
    }
  }
  function stylizeNoColor(str, styleType) {
    return str;
  }
  function formatPrimitive(ctx, value) {
    if (isUndefined(value)) return ctx.stylize("undefined", "undefined");
    if (isString(value)) {
      var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
      return ctx.stylize(simple, "string");
    }
    if (isNumber(value)) return ctx.stylize("" + value, "number");
    if (isBoolean$1(value)) return ctx.stylize("" + value, "boolean");
    if (isNull$1(value)) return ctx.stylize("null", "null");
  }
  function formatError$1(value) {
    return "[" + Error.prototype.toString.call(value) + "]";
  }
  function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
    var output = [];
    for (var i = 0, l = value.length; i < l; ++i) {
      if (hasOwnProperty(value, String(i))) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
      } else {
        output.push("");
      }
    }
    keys.forEach(function (key) {
      if (!key.match(/^\d+$/)) {
        output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
      }
    });
    return output;
  }
  function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
    var name, str, desc;
    desc = Object.getOwnPropertyDescriptor(value, key) || {
      value: value[key]
    };
    if (desc.get) {
      if (desc.set) {
        str = ctx.stylize("[Getter/Setter]", "special");
      } else {
        str = ctx.stylize("[Getter]", "special");
      }
    } else {
      if (desc.set) {
        str = ctx.stylize("[Setter]", "special");
      }
    }
    if (!hasOwnProperty(visibleKeys, key)) {
      name = "[" + key + "]";
    }
    if (!str) {
      if (ctx.seen.indexOf(desc.value) < 0) {
        if (isNull$1(recurseTimes)) {
          str = formatValue(ctx, desc.value, null);
        } else {
          str = formatValue(ctx, desc.value, recurseTimes - 1);
        }
        if (str.indexOf("\n") > -1) {
          if (array) {
            str = str.split("\n").map(function (line) {
              return "  " + line;
            }).join("\n").substr(2);
          } else {
            str = "\n" + str.split("\n").map(function (line) {
              return "   " + line;
            }).join("\n");
          }
        }
      } else {
        str = ctx.stylize("[Circular]", "special");
      }
    }
    if (isUndefined(name)) {
      if (array && key.match(/^\d+$/)) {
        return str;
      }
      name = JSON.stringify("" + key);
      if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
        name = name.substr(1, name.length - 2);
        name = ctx.stylize(name, "name");
      } else {
        name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
        name = ctx.stylize(name, "string");
      }
    }
    return name + ": " + str;
  }
  function arrayToHash(array) {
    var hash = {};
    array.forEach(function (val, idx) {
      hash[val] = true;
    });
    return hash;
  }
  function reduceToSingleString(output, base, braces) {
    var length = output.reduce(function (prev, cur) {
      if (cur.indexOf("\n") >= 0) ;
      return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
    }, 0);
    if (length > 60) {
      return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
    }
    return braces[0] + base + " " + output.join(", ") + " " + braces[1];
  }
  function formatValue(ctx, value, recurseTimes) {
    if (ctx.customInspect && value && isFunction(value.inspect) &&
    // Filter out the util module, it's inspect function is special
    value.inspect !== inspect &&
    // Also filter out any prototype objects using the circular check.
    !(value.constructor && value.constructor.prototype === value)) {
      var ret = value.inspect(recurseTimes, ctx);
      if (!isString(ret)) {
        ret = formatValue(ctx, ret, recurseTimes);
      }
      return ret;
    }
    var primitive = formatPrimitive(ctx, value);
    if (primitive) {
      return primitive;
    }
    var keys = Object.keys(value);
    var visibleKeys = arrayToHash(keys);
    if (ctx.showHidden) {
      keys = Object.getOwnPropertyNames(value);
    }
    if (isError(value) && (keys.indexOf("message") >= 0 || keys.indexOf("description") >= 0)) {
      return formatError$1(value);
    }
    if (keys.length === 0) {
      if (isFunction(value)) {
        var name = value.name ? ": " + value.name : "";
        return ctx.stylize("[Function" + name + "]", "special");
      }
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      }
      if (isDate(value)) {
        return ctx.stylize(Date.prototype.toString.call(value), "date");
      }
      if (isError(value)) {
        return formatError$1(value);
      }
    }
    var base = "",
      array = false,
      braces = ["{", "}"];
    if (isArray(value)) {
      array = true;
      braces = ["[", "]"];
    }
    if (isFunction(value)) {
      var n = value.name ? ": " + value.name : "";
      base = " [Function" + n + "]";
    }
    if (isRegExp(value)) {
      base = " " + RegExp.prototype.toString.call(value);
    }
    if (isDate(value)) {
      base = " " + Date.prototype.toUTCString.call(value);
    }
    if (isError(value)) {
      base = " " + formatError$1(value);
    }
    if (keys.length === 0 && (!array || value.length == 0)) {
      return braces[0] + base + braces[1];
    }
    if (recurseTimes < 0) {
      if (isRegExp(value)) {
        return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
      } else {
        return ctx.stylize("[Object]", "special");
      }
    }
    ctx.seen.push(value);
    var output;
    if (array) {
      output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
    } else {
      output = keys.map(function (key) {
        return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
      });
    }
    ctx.seen.pop();
    return reduceToSingleString(output, base, braces);
  }
  function inspect(obj, opts) {
    const ctx = {
      seen: [],
      stylize: stylizeNoColor
    };
    if (arguments.length >= 3) ctx.depth = arguments[2];
    if (arguments.length >= 4) ctx.colors = arguments[3];
    if (isBoolean$1(opts)) {
      ctx.showHidden = opts;
    } else if (opts) {
      _extend(ctx, opts);
    }
    if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
    if (isUndefined(ctx.depth)) ctx.depth = 2;
    if (isUndefined(ctx.colors)) ctx.colors = false;
    if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
    if (ctx.colors) ctx.stylize = stylizeWithColor;
    return formatValue(ctx, obj, ctx.depth);
  }
  var init_util = __esm({
    "src/util.ts"() {
      inspect.colors = {
        bold: [1, 22],
        italic: [3, 23],
        underline: [4, 24],
        inverse: [7, 27],
        white: [37, 39],
        grey: [90, 39],
        black: [30, 39],
        blue: [34, 39],
        cyan: [36, 39],
        green: [32, 39],
        magenta: [35, 39],
        red: [31, 39],
        yellow: [33, 39]
      };
      inspect.styles = {
        special: "cyan",
        number: "yellow",
        boolean: "yellow",
        undefined: "grey",
        null: "bold",
        string: "green",
        date: "magenta",
        // "name": intentionally not styling
        regexp: "red"
      };
    }
  });

  // src/shared.ts
  var require_shared = __commonJS$2({
    "src/shared.ts"(exports2, module2) {
      var import_cosmokit = require$$0;
      var c16 = [6, 2, 3, 4, 5, 1];
      var c256 = [20, 21, 26, 27, 32, 33, 38, 39, 40, 41, 42, 43, 44, 45, 56, 57, 62, 63, 68, 69, 74, 75, 76, 77, 78, 79, 80, 81, 92, 93, 98, 99, 112, 113, 129, 134, 135, 148, 149, 160, 161, 162, 163, 164, 165, 166, 167, 168, 169, 170, 171, 172, 173, 178, 179, 184, 185, 196, 197, 198, 199, 200, 201, 202, 203, 204, 205, 206, 207, 208, 209, 214, 215, 220, 221];
      function isAggregateError(error) {
        return error instanceof Error && Array.isArray(error["errors"]);
      }
      var _Logger = class _Logger {
        constructor(name, meta) {
          this.name = name;
          this.meta = meta;
          __publicField(this, "extend", namespace => {
            return new _Logger(`${this.name}:${namespace}`);
          });
          __publicField(this, "warning", (format, ...args) => {
            this.warn(format, ...args);
          });
          this.createMethod("success", _Logger.SUCCESS);
          this.createMethod("error", _Logger.ERROR);
          this.createMethod("info", _Logger.INFO);
          this.createMethod("warn", _Logger.WARN);
          this.createMethod("debug", _Logger.DEBUG);
        }
        static format(name, formatter) {
          this.formatters[name] = formatter;
        }
        static color(target, code, value, decoration = "") {
          if (!target.colors) return "" + value;
          return `\x1B[3${code < 8 ? code : "8;5;" + code}${target.colors >= 2 ? decoration : ""}m${value}\x1B[0m`;
        }
        static code(name, target) {
          let hash = 0;
          for (let i = 0; i < name.length; i++) {
            hash = (hash << 3) - hash + name.charCodeAt(i) + 13;
            hash |= 0;
          }
          const colors = !target.colors ? [] : target.colors >= 2 ? c256 : c16;
          return colors[Math.abs(hash) % colors.length];
        }
        static render(target, record) {
          var _a, _b, _c, _d, _e, _f;
          const prefix = `[${record.type[0].toUpperCase()}]`;
          const space = " ".repeat((_b = (_a = target.label) == null ? void 0 : _a.margin) != null ? _b : 1);
          let indent = 3 + space.length,
            output = "";
          if (target.showTime) {
            indent += target.showTime.length + space.length;
            output += _Logger.color(target, 8, import_cosmokit.Time.template(target.showTime)) + space;
          }
          const code = _Logger.code(record.name, target);
          const label = _Logger.color(target, code, record.name, ";1");
          const padLength = ((_d = (_c = target.label) == null ? void 0 : _c.width) != null ? _d : 0) + label.length - record.name.length;
          if (((_e = target.label) == null ? void 0 : _e.align) === "right") {
            output += label.padStart(padLength) + space + prefix + space;
            indent += ((_f = target.label.width) != null ? _f : 0) + space.length;
          } else {
            output += prefix + space + label.padEnd(padLength) + space;
          }
          output += record.content.replace(/\n/g, "\n" + " ".repeat(indent));
          if (target.showDiff && target.timestamp) {
            const diff = record.timestamp - target.timestamp;
            output += _Logger.color(target, code, " +" + import_cosmokit.Time.format(diff));
          }
          return output;
        }
        createMethod(type, level) {
          this[type] = (...args) => {
            if (args.length === 1 && args[0] instanceof Error) {
              if (args[0].cause) {
                this[type](args[0].cause);
              } else if (isAggregateError(args[0])) {
                args[0].errors.forEach(error => this[type](error));
                return;
              }
            }
            const id = ++_Logger.id;
            const timestamp = Date.now();
            for (const target of _Logger.targets) {
              if (this.getLevel(target) < level) continue;
              const content = this.format(target, ...args);
              const record = {
                id,
                type,
                level,
                name: this.name,
                meta: this.meta,
                content,
                timestamp
              };
              if (target.record) {
                target.record(record);
              } else {
                const {
                  print = console.log
                } = target;
                print(_Logger.render(target, record));
              }
              target.timestamp = timestamp;
            }
          };
        }
        format(target, ...args) {
          if (args[0] instanceof Error) {
            args[0] = args[0].stack || args[0].message;
            args.unshift("%s");
          } else if (typeof args[0] !== "string") {
            args.unshift("%o");
          }
          let format = args.shift();
          format = format.replace(/%([a-zA-Z%])/g, (match, char) => {
            if (match === "%%") return "%";
            const formatter = _Logger.formatters[char];
            if (typeof formatter === "function") {
              const value = args.shift();
              return formatter(value, target, this);
            }
            return match;
          });
          for (let arg of args) {
            if (typeof arg === "object" && arg) {
              arg = _Logger.formatters["o"](arg, target, this);
            }
            format += " " + arg;
          }
          const {
            maxLength = 10240
          } = target;
          return format.split(/\r?\n/g).map(line => {
            return line.slice(0, maxLength) + (line.length > maxLength ? "..." : "");
          }).join("\n");
        }
        getLevel(target) {
          var _a;
          const paths = this.name.split(":");
          let config = (target == null ? void 0 : target.levels) || _Logger.levels;
          do {
            config = (_a = config[paths.shift()]) != null ? _a : config["base"];
          } while (paths.length && typeof config === "object");
          return config;
        }
        get level() {
          return this.getLevel();
        }
        set level(value) {
          const paths = this.name.split(":");
          let config = _Logger.levels;
          while (paths.length > 1) {
            const name = paths.shift();
            const value2 = config[name];
            if (typeof value2 === "object") {
              config = value2;
            } else {
              config = config[name] = {
                base: value2 != null ? value2 : config.base
              };
            }
          }
          config[paths[0]] = value;
        }
      };
      // log levels
      __publicField(_Logger, "SILENT", 0);
      __publicField(_Logger, "SUCCESS", 1);
      __publicField(_Logger, "ERROR", 1);
      __publicField(_Logger, "INFO", 2);
      __publicField(_Logger, "WARN", 2);
      __publicField(_Logger, "DEBUG", 3);
      // global config
      __publicField(_Logger, "id", 0);
      __publicField(_Logger, "targets", [{
        colors: 3,
        print(text) {
          logger.info(text);
        }
      }]);
      // global registry
      __publicField(_Logger, "formatters", /* @__PURE__ */Object.create(null));
      __publicField(_Logger, "levels", {
        base: 2
      });
      var Logger2 = _Logger;
      Logger2.format("s", value => value);
      Logger2.format("d", value => +value);
      Logger2.format("j", value => JSON.stringify(value));
      Logger2.format("c", (value, target, logger2) => {
        return Logger2.color(target, Logger2.code(logger2.name, target), value);
      });
      Logger2.format("C", (value, target) => {
        return Logger2.color(target, 15, value, ";1");
      });
      module2.exports = Logger2;
    }
  });

  // src/node.ts
  var require_node = __commonJS$2({
    "src/node.ts"(exports2, module2) {
      init_util();
      var import_shared = __toESM(require_shared());
      import_shared.default.format("o", (value, target) => {
        return inspect(value, {
          colors: !!target.colors,
          depth: Infinity
        }).replace(/\s*\n\s*/g, " ");
      });
      module2.exports = import_shared.default;
    }
  });

  // src/index.ts
  var import_node = __toESM(require_node());
  var lib = import_node.default;
  var Logger$1 = /*@__PURE__*/getDefaultExportFromCjs(lib);
  var __defProp$8 = Object.defineProperty;
  var __name$8 = (target, value) => __defProp$8(target, "name", {
    value,
    configurable: true
  });
  function isBailed(value) {
    return value !== null && value !== false && value !== void 0;
  }
  __name$8(isBailed, "isBailed");
  var Lifecycle = (_Class = class Lifecycle {
    constructor(root) {
      _defineProperty(this, "isActive", false);
      _defineProperty(this, "_tasks", /* @__PURE__ */new Set());
      _defineProperty(this, "_hooks", {});
      this.root = root;
      defineProperty(this, Context$1.trace, root);
      defineProperty(this.on("internal/listener", function (name, listener, prepend) {
        const method = prepend ? "unshift" : "push";
        if (name === "ready") {
          if (!this.lifecycle.isActive) return;
          this.scope.ensure(async () => listener());
          return () => false;
        } else if (name === "dispose") {
          this.scope.disposables[method](listener);
          defineProperty(listener, "name", "event <dispose>");
          return () => remove(this.scope.disposables, listener);
        } else if (name === "fork") {
          this.scope.runtime.forkables[method](listener);
          return this.scope.collect("event <fork>", () => remove(this.scope.runtime.forkables, listener));
        }
      }), Context$1.static, root.scope);
      for (const level of ["info", "error", "warning"]) {
        defineProperty(this.on(`internal/${level}`, (format, ...param) => {
          if (this._hooks[`internal/${level}`].length > 1) return;
          console.info(format, ...param);
        }), Context$1.static, root.scope);
      }
    }
    async flush() {
      while (this._tasks.size) {
        await Promise.all(Array.from(this._tasks));
      }
    }
    getHooks(name, thisArg) {
      const hooks = this._hooks[name] || [];
      return hooks.slice().filter(([context]) => {
        const filter = thisArg?.[Context$1.filter];
        return !filter || filter.call(thisArg, context);
      }).map(([, callback]) => callback);
    }
    prepareEvent(type, args) {
      const thisArg = typeof args[0] === "object" ? args.shift() : null;
      const name = args.shift();
      if (name !== "internal/event") {
        this.emit("internal/event", type, name, args, thisArg);
      }
      return [this.getHooks(name, thisArg), thisArg ?? this[Context$1.trace]];
    }
    async parallel(...args) {
      const [hooks, thisArg] = this.prepareEvent("parallel", args);
      await Promise.all(hooks.map(async callback => {
        await callback.apply(thisArg, args);
      }));
    }
    emit(...args) {
      const [hooks, thisArg] = this.prepareEvent("emit", args);
      for (const callback of hooks) {
        callback.apply(thisArg, args);
      }
    }
    async serial(...args) {
      const [hooks, thisArg] = this.prepareEvent("serial", args);
      for (const callback of hooks) {
        const result = await callback.apply(thisArg, args);
        if (isBailed(result)) return result;
      }
    }
    bail(...args) {
      const [hooks, thisArg] = this.prepareEvent("bail", args);
      for (const callback of hooks) {
        const result = callback.apply(thisArg, args);
        if (isBailed(result)) return result;
      }
    }
    register(label, hooks, listener, prepend) {
      const caller = this[Context$1.trace];
      const method = prepend ? "unshift" : "push";
      hooks[method]([caller, listener]);
      return caller.state.collect(label, () => this.unregister(hooks, listener));
    }
    unregister(hooks, listener) {
      const index = hooks.findIndex(([context, callback]) => callback === listener);
      if (index >= 0) {
        hooks.splice(index, 1);
        return true;
      }
    }
    on(name, listener, prepend = false) {
      const caller = this[Context$1.trace];
      caller.scope.assertActive();
      const result = this.bail(caller, "internal/listener", name, listener, prepend);
      if (result) return result;
      const hooks = this._hooks[name] ||= [];
      const label = typeof name === "string" ? `event <${name}>` : "event (Symbol)";
      return this.register(label, hooks, listener, prepend);
    }
    once(name, listener, prepend = false) {
      const dispose = this.on(name, function (...args) {
        dispose();
        return listener.apply(this, args);
      }, prepend);
      return dispose;
    }
    off(name, listener) {
      return this.unregister(this._hooks[name] || [], listener);
    }
    async start() {
      this.isActive = true;
      const hooks = this._hooks.ready || [];
      while (hooks.length) {
        const [context, callback] = hooks.shift();
        context.scope.ensure(async () => callback());
      }
      await this.flush();
    }
    async stop() {
      this.isActive = false;
      this.root.scope.reset();
    }
  }, __name$8(_Class, "Lifecycle"), _Class);
  var symbols = {
    // context symbols
    trace: Symbol.for("cordis.trace"),
    events: Symbol.for("cordis.events"),
    static: Symbol.for("cordis.static"),
    filter: Symbol.for("cordis.filter"),
    expose: Symbol.for("cordis.expose"),
    isolate: Symbol.for("cordis.isolate"),
    internal: Symbol.for("cordis.internal"),
    intercept: Symbol.for("cordis.intercept"),
    // service symbols
    setup: Symbol.for("cordis.setup"),
    invoke: Symbol.for("cordis.invoke"),
    extend: Symbol.for("cordis.extend"),
    provide: Symbol.for("cordis.provide"),
    immediate: Symbol.for("cordis.immediate")
  };
  function isConstructor(func) {
    if (!func.prototype) return false;
    if (func.prototype.constructor !== func) return false;
    return true;
  }
  __name$8(isConstructor, "isConstructor");
  function resolveConfig(plugin, config) {
    const schema = plugin["Config"] || plugin["schema"];
    if (schema && plugin["schema"] !== false) config = schema(config);
    return config ?? {};
  }
  __name$8(resolveConfig, "resolveConfig");
  function isUnproxyable(value) {
    return [Map, Set, Date, Promise].some(constructor => value instanceof constructor);
  }
  __name$8(isUnproxyable, "isUnproxyable");
  function joinPrototype(proto1, proto2) {
    if (proto1 === Object.prototype) return proto2;
    const result = Object.create(joinPrototype(Object.getPrototypeOf(proto1), proto2));
    for (const key of Reflect.ownKeys(proto1)) {
      Object.defineProperty(result, key, Object.getOwnPropertyDescriptor(proto1, key));
    }
    return result;
  }
  __name$8(joinPrototype, "joinPrototype");
  function createTraceable(ctx, value) {
    const proxy = new Proxy(value, {
      get: (target, name, receiver) => {
        if (name === symbols.trace || name === "caller") return ctx;
        return Reflect.get(target, name, receiver);
      },
      apply: (target, thisArg, args) => {
        return applyTraceable(proxy, target, thisArg, args);
      }
    });
    return proxy;
  }
  __name$8(createTraceable, "createTraceable");
  function applyTraceable(proxy, value, thisArg, args) {
    if (!value[symbols.invoke]) return Reflect.apply(value, thisArg, args);
    return value[symbols.invoke].apply(proxy, args);
  }
  __name$8(applyTraceable, "applyTraceable");
  function createCallable(name, proto) {
    const self = /* @__PURE__ */__name$8(function (...args) {
      const proxy = createTraceable(self[symbols.trace], self);
      return applyTraceable(proxy, self, this, args);
    }, "self");
    defineProperty(self, "name", name);
    return Object.setPrototypeOf(self, proto);
  }
  __name$8(createCallable, "createCallable");

  // src/scope.ts
  var ScopeStatus = /* @__PURE__ */(ScopeStatus2 => {
    ScopeStatus2[ScopeStatus2["PENDING"] = 0] = "PENDING";
    ScopeStatus2[ScopeStatus2["LOADING"] = 1] = "LOADING";
    ScopeStatus2[ScopeStatus2["ACTIVE"] = 2] = "ACTIVE";
    ScopeStatus2[ScopeStatus2["FAILED"] = 3] = "FAILED";
    ScopeStatus2[ScopeStatus2["DISPOSED"] = 4] = "DISPOSED";
    return ScopeStatus2;
  })(ScopeStatus || {});
  exports.CordisError = (_CordisError2 = class _CordisError extends Error {
    constructor(code, message) {
      super(message ?? _CordisError.Code[code]);
      this.code = code;
    }
  }, __name$8(_CordisError2, "CordisError"), _CordisError2);
  (CordisError2 => {
    CordisError2.Code = {
      INACTIVE_EFFECT: "cannot create effect on inactive context"
    };
  })(exports.CordisError || (exports.CordisError = {}));
  var EffectScope = (_Class2 = class EffectScope {
    constructor(parent, config) {
      _defineProperty(this, "uid", void 0);
      _defineProperty(this, "ctx", void 0);
      _defineProperty(this, "disposables", []);
      _defineProperty(this, "error", void 0);
      _defineProperty(this, "status", 0 /* PENDING */);
      _defineProperty(this, "isActive", false);
      // Same as `this.ctx`, but with a more specific type.
      _defineProperty(this, "context", void 0);
      _defineProperty(this, "proxy", void 0);
      _defineProperty(this, "acceptors", []);
      _defineProperty(this, "tasks", /* @__PURE__ */new Set());
      _defineProperty(this, "hasError", false);
      this.parent = parent;
      this.config = config;
      this.uid = parent.registry ? parent.registry.counter : 0;
      this.ctx = this.context = parent.extend({
        scope: this
      });
      this.proxy = new Proxy({}, {
        get: (target, key) => Reflect.get(this.config, key)
      });
    }
    get _config() {
      return this.runtime.isReactive ? this.proxy : this.config;
    }
    assertActive() {
      if (this.uid !== null || this.isActive) return;
      throw new exports.CordisError("INACTIVE_EFFECT");
    }
    effect(callback, config) {
      this.assertActive();
      const result = isConstructor(callback) ? new callback(this.ctx, config) : callback(this.ctx, config);
      let disposed = false;
      const original = typeof result === "function" ? result : result.dispose.bind(result);
      const wrapped = /* @__PURE__ */__name$8(() => {
        if (disposed) return;
        disposed = true;
        remove(this.disposables, wrapped);
        return original();
      }, "wrapped");
      this.disposables.push(wrapped);
      if (typeof result === "function") return wrapped;
      result.dispose = wrapped;
      return result;
    }
    collect(label, callback) {
      const dispose = defineProperty(() => {
        remove(this.disposables, dispose);
        return callback();
      }, "name", label);
      this.disposables.push(dispose);
      return dispose;
    }
    restart() {
      this.reset();
      this.error = null;
      this.hasError = false;
      this.status = 0 /* PENDING */;
      this.start();
    }
    _getStatus() {
      if (this.uid === null) return 4 /* DISPOSED */;
      if (this.hasError) return 3 /* FAILED */;
      if (this.tasks.size) return 1 /* LOADING */;
      if (this.ready) return 2 /* ACTIVE */;
      return 0 /* PENDING */;
    }
    _updateStatus(callback) {
      const oldValue = this.status;
      callback?.();
      this.status = this._getStatus();
      if (oldValue !== this.status) {
        this.context.emit("internal/status", this, oldValue);
      }
    }
    ensure(callback) {
      const task = callback().catch(reason => {
        this.context.emit("internal/error", reason);
        this.cancel(reason);
      }).finally(() => {
        this._updateStatus(() => this.tasks.delete(task));
        this.context.events._tasks.delete(task);
      });
      this._updateStatus(() => this.tasks.add(task));
      this.context.events._tasks.add(task);
    }
    cancel(reason) {
      this.error = reason;
      this._updateStatus(() => this.hasError = true);
      this.reset();
    }
    setupInject() {
      if (!this.runtime.using.length) return;
      defineProperty(this.context.on("internal/before-service", name => {
        if (!this.runtime.using.includes(name)) return;
        this._updateStatus();
        this.reset();
      }), Context$1.static, this);
      defineProperty(this.context.on("internal/service", name => {
        if (!this.runtime.using.includes(name)) return;
        this.start();
      }), Context$1.static, this);
    }
    get ready() {
      return this.runtime.using.every(name => !isNullable(this.ctx[name]));
    }
    reset() {
      this.isActive = false;
      this.disposables = this.disposables.splice(0).filter(dispose => {
        if (this.uid !== null && dispose[Context$1.static] === this) return true;
        (async () => dispose())().catch(reason => {
          this.context.emit("internal/error", reason);
        });
      });
    }
    init(error) {
      if (!this.config) {
        this.cancel(error);
      } else {
        this.start();
      }
    }
    start() {
      if (!this.ready || this.isActive || this.uid === null) return true;
      this.isActive = true;
      this._updateStatus(() => this.hasError = false);
    }
    accept(...args) {
      const keys = Array.isArray(args[0]) ? args.shift() : null;
      const acceptor = {
        keys,
        callback: args[0],
        ...args[1]
      };
      return this.effect(() => {
        this.acceptors.push(acceptor);
        if (acceptor.immediate) acceptor.callback?.(this.config);
        return () => remove(this.acceptors, acceptor);
      });
    }
    decline(keys) {
      return this.accept(keys, () => true);
    }
    checkUpdate(resolved, forced) {
      if (forced || !this.config) return [true, true];
      if (forced === false) return [false, false];
      const modified = /* @__PURE__ */Object.create(null);
      const checkPropertyUpdate = /* @__PURE__ */__name$8(key => {
        const result = modified[key] ??= !deepEqual(this.config[key], resolved[key]);
        hasUpdate ||= result;
        return result;
      }, "checkPropertyUpdate");
      const ignored = /* @__PURE__ */new Set();
      let hasUpdate = false,
        shouldRestart = false;
      let fallback = this.runtime.isReactive || null;
      for (const {
        keys,
        callback,
        passive
      } of this.acceptors) {
        if (!keys) {
          fallback ||= !passive;
        } else if (passive) {
          keys?.forEach(key => ignored.add(key));
        } else {
          let hasUpdate2 = false;
          for (const key of keys) {
            hasUpdate2 ||= checkPropertyUpdate(key);
          }
          if (!hasUpdate2) continue;
        }
        const result = callback?.(resolved);
        if (result) shouldRestart = true;
      }
      for (const key in {
        ...this.config,
        ...resolved
      }) {
        if (fallback === false) continue;
        if (!(key in modified) && !ignored.has(key)) {
          const hasUpdate2 = checkPropertyUpdate(key);
          if (fallback === null) shouldRestart ||= hasUpdate2;
        }
      }
      return [hasUpdate, shouldRestart];
    }
  }, __name$8(_Class2, "EffectScope"), _Class2);
  var ForkScope = (_Class3 = class ForkScope extends EffectScope {
    constructor(parent, runtime, config, error) {
      super(parent, config);
      _defineProperty(this, "dispose", void 0);
      this.runtime = runtime;
      this.dispose = defineProperty(parent.scope.collect(`fork <${parent.runtime.name}>`, () => {
        this.uid = null;
        this.reset();
        this.context.emit("internal/fork", this);
        const result = remove(runtime.disposables, this.dispose);
        if (remove(runtime.children, this) && !runtime.children.length) {
          parent.registry.delete(runtime.plugin);
        }
        return result;
      }), Context$1.static, runtime);
      runtime.children.push(this);
      runtime.disposables.push(this.dispose);
      this.context.emit("internal/fork", this);
      if (runtime.isReusable) {
        this.setupInject();
      }
      this.init(error);
    }
    start() {
      if (super.start()) return true;
      for (const fork of this.runtime.forkables) {
        this.ensure(async () => fork(this.context, this._config));
      }
    }
    update(config, forced) {
      const oldConfig = this.config;
      const state = this.runtime.isForkable ? this : this.runtime;
      if (state.config !== oldConfig) return;
      const resolved = resolveConfig(this.runtime.plugin, config);
      const [hasUpdate, shouldRestart] = state.checkUpdate(resolved, forced);
      this.context.emit("internal/before-update", this, config);
      this.config = resolved;
      state.config = resolved;
      if (hasUpdate) {
        this.context.emit("internal/update", this, oldConfig);
      }
      if (shouldRestart) state.restart();
    }
  }, __name$8(_Class3, "ForkScope"), _Class3);
  var MainScope = (_Class4 = class MainScope extends EffectScope {
    constructor(registry, plugin, _config, error) {
      super(registry[Context$1.trace], _config);
      _defineProperty(this, "value", void 0);
      _defineProperty(this, "runtime", this);
      _defineProperty(this, "schema", void 0);
      _defineProperty(this, "name", void 0);
      _defineProperty(this, "using", []);
      _defineProperty(this, "inject", /* @__PURE__ */new Set());
      _defineProperty(this, "forkables", []);
      _defineProperty(this, "children", []);
      _defineProperty(this, "isReusable", false);
      _defineProperty(this, "isReactive", false);
      _defineProperty(this, "apply", (context, config) => {
        if (typeof this.plugin !== "function") {
          return this.plugin.apply(context, config);
        } else if (isConstructor(this.plugin)) {
          const instance = new this.plugin(context, config);
          const name = instance[Context$1.expose];
          if (name) {
            context[name] = instance;
          }
          if (instance["fork"]) {
            this.forkables.push(instance["fork"].bind(instance));
          }
          return instance;
        } else {
          return this.plugin(context, config);
        }
      });
      this.plugin = plugin;
      registry.set(plugin, this);
      if (!plugin) {
        this.name = "root";
        this.isActive = true;
      } else {
        this.setup();
        this.init(error);
      }
    }
    get isForkable() {
      return this.forkables.length > 0;
    }
    fork(parent, config, error) {
      return new ForkScope(parent, this, config, error);
    }
    dispose() {
      this.uid = null;
      this.reset();
      this.context.emit("internal/runtime", this);
      return true;
    }
    setup() {
      const {
        name
      } = this.plugin;
      if (name && name !== "apply") this.name = name;
      this.schema = this.plugin["Config"] || this.plugin["schema"];
      const inject = this.plugin["using"] || this.plugin["inject"] || [];
      if (Array.isArray(inject)) {
        this.using = inject;
        this.inject = new Set(inject);
      } else {
        this.using = inject.required || [];
        this.inject = /* @__PURE__ */new Set([...this.using, ...(inject.optional || [])]);
      }
      this.isReusable = this.plugin["reusable"];
      this.isReactive = this.plugin["reactive"];
      this.context.emit("internal/runtime", this);
      if (this.isReusable) {
        this.forkables.push(this.apply);
      } else {
        super.setupInject();
      }
    }
    reset() {
      super.reset();
      for (const fork of this.children) {
        fork.reset();
      }
    }
    start() {
      if (super.start()) return true;
      if (!this.isReusable && this.plugin) {
        this.ensure(async () => this.value = this.apply(this.ctx, this._config));
      }
      for (const fork of this.children) {
        fork.start();
      }
    }
    update(config, forced) {
      if (this.isForkable) {
        this.context.emit("internal/warning", new Error(`attempting to update forkable plugin "${this.plugin.name}", which may lead to unexpected behavior`));
      }
      const oldConfig = this.config;
      const resolved = resolveConfig(this.runtime.plugin || this.context.constructor, config);
      const [hasUpdate, shouldRestart] = this.checkUpdate(resolved, forced);
      const state = this.children.find(fork => fork.config === oldConfig);
      this.config = resolved;
      if (state) {
        this.context.emit("internal/before-update", state, config);
        state.config = resolved;
        if (hasUpdate) {
          this.context.emit("internal/update", state, oldConfig);
        }
      }
      if (shouldRestart) this.restart();
    }
  }, __name$8(_Class4, "MainScope"), _Class4);

  // src/registry.ts
  function isApplicable(object) {
    return object && typeof object === "object" && typeof object.apply === "function";
  }
  __name$8(isApplicable, "isApplicable");
  var Registry = (_Class5 = class Registry {
    constructor(root, config) {
      _defineProperty(this, "_counter", 0);
      _defineProperty(this, "_internal", /* @__PURE__ */new Map());
      this.root = root;
      defineProperty(this, Context$1.trace, root);
      root.scope = new MainScope(this, null, config);
      root.scope.runtime.isReactive = true;
    }
    get counter() {
      return ++this._counter;
    }
    get size() {
      return this._internal.size;
    }
    resolve(plugin) {
      if (plugin === null) return plugin;
      if (typeof plugin === "function") return plugin;
      if (isApplicable(plugin)) return plugin.apply;
      throw new Error('invalid plugin, expect function or object with an "apply" method, received ' + typeof plugin);
    }
    get(plugin) {
      return this._internal.get(this.resolve(plugin));
    }
    has(plugin) {
      return this._internal.has(this.resolve(plugin));
    }
    set(plugin, state) {
      const oldValue = this._internal.get(this.resolve(plugin));
      this._internal.set(this.resolve(plugin), state);
      return oldValue;
    }
    delete(plugin) {
      plugin = this.resolve(plugin);
      const runtime = this.get(plugin);
      if (!runtime) return;
      this._internal.delete(plugin);
      runtime.dispose();
      return runtime;
    }
    keys() {
      return this._internal.keys();
    }
    values() {
      return this._internal.values();
    }
    entries() {
      return this._internal.entries();
    }
    forEach(callback) {
      return this._internal.forEach(callback);
    }
    using(inject, callback) {
      return this.inject(inject, callback);
    }
    inject(inject, callback) {
      return this.plugin({
        inject,
        apply: callback,
        name: callback.name
      });
    }
    plugin(plugin, config) {
      this.resolve(plugin);
      const context = this[Context$1.trace];
      context.scope.assertActive();
      let error;
      try {
        config = resolveConfig(plugin, config);
      } catch (reason) {
        context.emit("internal/error", reason);
        error = reason;
        config = null;
      }
      let runtime = this.get(plugin);
      if (runtime) {
        if (!runtime.isForkable) {
          context.emit("internal/warning", new Error(`duplicate plugin detected: ${plugin.name}`));
        }
        return runtime.fork(context, config, error);
      }
      runtime = new MainScope(this, plugin, config, error);
      return runtime.fork(context, config, error);
    }
  }, __name$8(_Class5, "Registry"), _Class5);

  // src/context.ts
  var Context$1 = (_Symbol$for = Symbol.for("nodejs.util.inspect.custom"), (_Context2 = class _Context {
    static is(value) {
      return !!value?.[_Context.is];
    }
    static ensureInternal() {
      const ctx = this.prototype || this;
      if (Object.prototype.hasOwnProperty.call(ctx, symbols.internal)) {
        return ctx[symbols.internal];
      }
      const parent = _Context.ensureInternal.call(Object.getPrototypeOf(this));
      return ctx[symbols.internal] = Object.create(parent);
    }
    static resolveInject(ctx, name) {
      let internal = ctx[symbols.internal][name];
      while (internal?.type === "alias") {
        name = internal.name;
        internal = ctx[symbols.internal][name];
      }
      return [name, internal];
    }
    static associate(object, name) {
      return new Proxy(object, {
        get(target, key, receiver) {
          if (typeof key === "symbol" || key in target) return Reflect.get(target, key, receiver);
          const caller = receiver[symbols.trace];
          if (!caller?.[symbols.internal][`${name}.${key}`]) return Reflect.get(target, key, receiver);
          return caller.get(`${name}.${key}`);
        },
        set(target, key, value, receiver) {
          if (typeof key === "symbol" || key in target) return Reflect.set(target, key, value, receiver);
          const caller = receiver[symbols.trace];
          if (!caller?.[symbols.internal][`${name}.${key}`]) return Reflect.set(target, key, value, receiver);
          caller[`${name}.${key}`] = value;
          return true;
        }
      });
    }
    constructor(config) {
      const self = new Proxy(this, _Context.handler);
      config = resolveConfig(this.constructor, config);
      self[symbols.isolate] = /* @__PURE__ */Object.create(null);
      self[symbols.intercept] = /* @__PURE__ */Object.create(null);
      self.root = self;
      self.mixin("scope", ["config", "runtime", "effect", "collect", "accept", "decline"]);
      self.mixin("registry", ["using", "inject", "plugin", "dispose"]);
      self.mixin("lifecycle", ["on", "once", "off", "after", "parallel", "emit", "serial", "bail", "start", "stop"]);
      self.provide("registry", new Registry(self, config), true);
      self.provide("lifecycle", new Lifecycle(self), true);
      const attach = /* @__PURE__ */__name$8(internal => {
        if (!internal) return;
        attach(Object.getPrototypeOf(internal));
        for (const key of Object.getOwnPropertyNames(internal)) {
          const constructor = internal[key]["prototype"]?.constructor;
          if (!constructor) continue;
          self[internal[key]["key"]] = new constructor(self, config);
          defineProperty(self[internal[key]["key"]], symbols.trace, self);
        }
      }, "attach");
      attach(this[symbols.internal]);
      return self;
    }
    [_Symbol$for]() {
      return `Context <${this.name}>`;
    }
    get name() {
      let runtime = this.runtime;
      while (runtime && !runtime.name) {
        runtime = runtime.parent.runtime;
      }
      return runtime?.name;
    }
    get events() {
      return this.lifecycle;
    }
    /** @deprecated */
    get state() {
      return this.scope;
    }
    get(name) {
      const internal = this[symbols.internal][name];
      if (internal?.type !== "service") return;
      const value = this.root[this[symbols.isolate][name]];
      if (!value || typeof value !== "object" && typeof value !== "function") return value;
      if (isUnproxyable(value)) {
        defineProperty(value, symbols.trace, this);
        return value;
      }
      return createTraceable(this, value);
    }
    provide(name, value, builtin) {
      const internal = _Context.ensureInternal.call(this.root);
      if (name in internal) return;
      const key = Symbol(name);
      internal[name] = {
        type: "service",
        builtin
      };
      this.root[key] = value;
      this.root[_Context.isolate][name] = key;
    }
    accessor(name, options) {
      const internal = _Context.ensureInternal.call(this.root);
      internal[name] ||= {
        type: "accessor",
        ...options
      };
    }
    alias(name, aliases) {
      const internal = _Context.ensureInternal.call(this.root);
      for (const key of aliases) {
        internal[key] ||= {
          type: "alias",
          name
        };
      }
    }
    mixin(name, mixins) {
      for (const key of mixins) {
        this.accessor(key, {
          get() {
            const service = this[name];
            if (isNullable(service)) return service;
            const value = Reflect.get(service, key);
            if (typeof value !== "function") return value;
            return value.bind(service);
          },
          set(value) {
            return Reflect.set(this[name], key, value);
          }
        });
      }
    }
    extend(meta = {}) {
      return Object.assign(Object.create(this), meta);
    }
    isolate(name, label) {
      const shadow = Object.create(this[symbols.isolate]);
      shadow[name] = label ?? Symbol(name);
      return this.extend({
        [symbols.isolate]: shadow
      });
    }
    intercept(name, config) {
      const intercept = Object.create(this[symbols.intercept]);
      intercept[name] = config;
      return this.extend({
        [symbols.intercept]: intercept
      });
    }
  }, __name$8(_Context2, "Context"), _defineProperty(_Context2, "trace", symbols.trace), _defineProperty(_Context2, "events", symbols.events), _defineProperty(_Context2, "static", symbols.static), _defineProperty(_Context2, "filter", symbols.filter), _defineProperty(_Context2, "expose", symbols.expose), _defineProperty(_Context2, "isolate", symbols.isolate), _defineProperty(_Context2, "internal", symbols.internal), _defineProperty(_Context2, "intercept", symbols.intercept), _defineProperty(_Context2, "current", _Context2.trace), (() => {
    _Context2.is[Symbol.toPrimitive] = () => Symbol.for("cordis.is");
    _Context2.prototype[_Context2.is] = true;
  })(), _defineProperty(_Context2, "handler", {
    get(target, prop, ctx) {
      if (typeof prop !== "string") return Reflect.get(target, prop, ctx);
      const checkInject = /* @__PURE__ */__name$8(name2 => {
        if (Reflect.has(target, name2)) return;
        if (["prototype", "then", "registry", "lifecycle"].includes(name2)) return;
        if (name2[0] === "$" || name2[0] === "_") return;
        if (!ctx.runtime.plugin) return;
        let parent = ctx;
        while (parent.runtime.plugin) {
          for (const key of parent.runtime.inject) {
            if (name2 === _Context2.resolveInject(parent, key)[0]) return;
          }
          parent = parent.scope.parent;
        }
        ctx.emit("internal/warning", new Error(`property ${name2} is not registered, declare it as \`inject\` to suppress this warning`));
      }, "checkInject");
      const [name, internal] = _Context2.resolveInject(ctx, prop);
      if (!internal) {
        checkInject(name);
        return Reflect.get(target, name, ctx);
      }
      if (internal.type === "accessor") {
        return internal.get.call(ctx);
      } else if (internal.type === "service") {
        if (!internal.builtin) checkInject(name);
        return ctx.get(name);
      }
    },
    set(target, prop, value, ctx) {
      if (typeof prop !== "string") return Reflect.set(target, prop, value, ctx);
      const [name, internal] = _Context2.resolveInject(ctx, prop);
      if (!internal) return Reflect.set(target, name, value, ctx);
      if (internal.type === "accessor") {
        if (!internal.set) return false;
        return internal.set.call(ctx, value);
      }
      const key = ctx[symbols.isolate][name];
      const oldValue = ctx.root[key];
      if (oldValue === value) return true;
      if (value && oldValue) {
        throw new Error(`service ${name} has been registered`);
      }
      if (value) {
        ctx.on("dispose", () => ctx[name] = void 0);
      }
      if (isUnproxyable(value)) {
        ctx.emit("internal/warning", new Error(`service ${name} is an unproxyable object, which may lead to unexpected behavior`));
      }
      const self = /* @__PURE__ */Object.create(null);
      self[symbols.filter] = ctx2 => {
        return ctx[symbols.isolate][name] === ctx2[symbols.isolate][name];
      };
      ctx.root.emit(self, "internal/before-service", name, value);
      ctx.root[key] = value;
      if (value instanceof Object) {
        defineProperty(value, symbols.trace, ctx);
      }
      ctx.root.emit(self, "internal/service", name, oldValue);
      return true;
    }
  }), _Context2));
  Context$1.prototype[Context$1.internal] = /* @__PURE__ */Object.create(null);
  var Service = (_symbols$trace = symbols.trace, _symbols$filter = symbols.filter, _symbols$setup = symbols.setup, _symbols$extend = symbols.extend, _Symbol$hasInstance = Symbol.hasInstance, (_Service2 = class _Service {
    start() {}
    stop() {}
    constructor(...args) {
      _defineProperty(this, "ctx", void 0);
      _defineProperty(this, _symbols$trace, void 0);
      _defineProperty(this, "name", void 0);
      _defineProperty(this, "config", void 0);
      let _ctx, name, immediate, config;
      if (Context$1.is(args[0])) {
        _ctx = args[0];
        if (typeof args[1] === "string") {
          name = args[1];
          immediate = args[2];
        } else {
          config = args[1];
        }
      } else {
        config = args[0];
      }
      name ??= this.constructor[symbols.provide];
      immediate ??= this.constructor[symbols.immediate];
      let self = this;
      if (self[symbols.invoke]) {
        self = createCallable(name, joinPrototype(Object.getPrototypeOf(this), Function.prototype));
      }
      if (_ctx) {
        self.ctx = _ctx;
      } else {
        self[symbols.setup]();
      }
      self.name = name;
      self.config = config;
      defineProperty(self, symbols.trace, self.ctx);
      self.ctx.provide(name);
      self.ctx.runtime.name = name;
      if (immediate) {
        if (_ctx) self[symbols.expose] = name;else self.ctx[name] = self;
      }
      self.ctx.on("ready", async () => {
        await Promise.resolve();
        await self.start();
        if (!immediate) self.ctx[name] = self;
      });
      self.ctx.on("dispose", () => self.stop());
      return Context$1.associate(self, name);
    }
    [_symbols$filter](ctx) {
      return ctx[symbols.isolate][this.name] === this.ctx[symbols.isolate][this.name];
    }
    [_symbols$setup]() {
      this.ctx = new Context$1();
    }
    [_symbols$extend](props) {
      const caller = this[symbols.trace];
      let self;
      if (this[_Service.invoke]) {
        self = createCallable(this.name, this);
      } else {
        self = Object.create(this);
      }
      defineProperty(self, symbols.trace, caller);
      return Context$1.associate(Object.assign(self, props), this.name);
    }
    static [_Symbol$hasInstance](instance) {
      let constructor = instance.constructor;
      while (constructor) {
        if (constructor === this) return true;
        constructor = Object.getPrototypeOf(constructor);
      }
      return false;
    }
  }, __name$8(_Service2, "Service"), _defineProperty(_Service2, "setup", symbols.setup), _defineProperty(_Service2, "invoke", symbols.invoke), _defineProperty(_Service2, "extend", symbols.extend), _defineProperty(_Service2, "provide", symbols.provide), _defineProperty(_Service2, "immediate", symbols.immediate), _Service2));

  /*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT */
  function isNothing(subject) {
    return typeof subject === 'undefined' || subject === null;
  }
  function isObject(subject) {
    return typeof subject === 'object' && subject !== null;
  }
  function toArray(sequence) {
    if (Array.isArray(sequence)) return sequence;else if (isNothing(sequence)) return [];
    return [sequence];
  }
  function extend(target, source) {
    var index, length, key, sourceKeys;
    if (source) {
      sourceKeys = Object.keys(source);
      for (index = 0, length = sourceKeys.length; index < length; index += 1) {
        key = sourceKeys[index];
        target[key] = source[key];
      }
    }
    return target;
  }
  function repeat(string, count) {
    var result = '',
      cycle;
    for (cycle = 0; cycle < count; cycle += 1) {
      result += string;
    }
    return result;
  }
  function isNegativeZero(number) {
    return number === 0 && Number.NEGATIVE_INFINITY === 1 / number;
  }
  var isNothing_1 = isNothing;
  var isObject_1 = isObject;
  var toArray_1 = toArray;
  var repeat_1 = repeat;
  var isNegativeZero_1 = isNegativeZero;
  var extend_1 = extend;
  var common = {
    isNothing: isNothing_1,
    isObject: isObject_1,
    toArray: toArray_1,
    repeat: repeat_1,
    isNegativeZero: isNegativeZero_1,
    extend: extend_1
  };

  // YAML error class. http://stackoverflow.com/questions/8458984

  function formatError(exception, compact) {
    var where = '',
      message = exception.reason || '(unknown reason)';
    if (!exception.mark) return message;
    if (exception.mark.name) {
      where += 'in "' + exception.mark.name + '" ';
    }
    where += '(' + (exception.mark.line + 1) + ':' + (exception.mark.column + 1) + ')';
    if (!compact && exception.mark.snippet) {
      where += '\n\n' + exception.mark.snippet;
    }
    return message + ' ' + where;
  }
  function YAMLException$1(reason, mark) {
    // Super constructor
    Error.call(this);
    this.name = 'YAMLException';
    this.reason = reason;
    this.mark = mark;
    this.message = formatError(this, false);

    // Include stack trace in error object
    if (Error.captureStackTrace) {
      // Chrome and NodeJS
      Error.captureStackTrace(this, this.constructor);
    } else {
      // FF, IE 10+ and Safari 6+. Fallback for others
      this.stack = new Error().stack || '';
    }
  }

  // Inherit from Error
  YAMLException$1.prototype = Object.create(Error.prototype);
  YAMLException$1.prototype.constructor = YAMLException$1;
  YAMLException$1.prototype.toString = function toString(compact) {
    return this.name + ': ' + formatError(this, compact);
  };
  var exception = YAMLException$1;

  // get snippet for a single line, respecting maxLength
  function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
    var head = '';
    var tail = '';
    var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
    if (position - lineStart > maxHalfLength) {
      head = ' ... ';
      lineStart = position - maxHalfLength + head.length;
    }
    if (lineEnd - position > maxHalfLength) {
      tail = ' ...';
      lineEnd = position + maxHalfLength - tail.length;
    }
    return {
      str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, '→') + tail,
      pos: position - lineStart + head.length // relative position
    };
  }
  function padStart(string, max) {
    return common.repeat(' ', max - string.length) + string;
  }
  function makeSnippet(mark, options) {
    options = Object.create(options || null);
    if (!mark.buffer) return null;
    if (!options.maxLength) options.maxLength = 79;
    if (typeof options.indent !== 'number') options.indent = 1;
    if (typeof options.linesBefore !== 'number') options.linesBefore = 3;
    if (typeof options.linesAfter !== 'number') options.linesAfter = 2;
    var re = /\r?\n|\r|\0/g;
    var lineStarts = [0];
    var lineEnds = [];
    var match;
    var foundLineNo = -1;
    while (match = re.exec(mark.buffer)) {
      lineEnds.push(match.index);
      lineStarts.push(match.index + match[0].length);
      if (mark.position <= match.index && foundLineNo < 0) {
        foundLineNo = lineStarts.length - 2;
      }
    }
    if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;
    var result = '',
      i,
      line;
    var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
    var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
    for (i = 1; i <= options.linesBefore; i++) {
      if (foundLineNo - i < 0) break;
      line = getLine(mark.buffer, lineStarts[foundLineNo - i], lineEnds[foundLineNo - i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]), maxLineLength);
      result = common.repeat(' ', options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + ' | ' + line.str + '\n' + result;
    }
    line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
    result += common.repeat(' ', options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + ' | ' + line.str + '\n';
    result += common.repeat('-', options.indent + lineNoLength + 3 + line.pos) + '^' + '\n';
    for (i = 1; i <= options.linesAfter; i++) {
      if (foundLineNo + i >= lineEnds.length) break;
      line = getLine(mark.buffer, lineStarts[foundLineNo + i], lineEnds[foundLineNo + i], mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]), maxLineLength);
      result += common.repeat(' ', options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + ' | ' + line.str + '\n';
    }
    return result.replace(/\n$/, '');
  }
  var snippet = makeSnippet;
  var TYPE_CONSTRUCTOR_OPTIONS = ['kind', 'multi', 'resolve', 'construct', 'instanceOf', 'predicate', 'represent', 'representName', 'defaultStyle', 'styleAliases'];
  var YAML_NODE_KINDS = ['scalar', 'sequence', 'mapping'];
  function compileStyleAliases(map) {
    var result = {};
    if (map !== null) {
      Object.keys(map).forEach(function (style) {
        map[style].forEach(function (alias) {
          result[String(alias)] = style;
        });
      });
    }
    return result;
  }
  function Type$1(tag, options) {
    options = options || {};
    Object.keys(options).forEach(function (name) {
      if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
        throw new exception('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
      }
    });

    // TODO: Add tag format check.
    this.options = options; // keep original options in case user wants to extend this type later
    this.tag = tag;
    this.kind = options['kind'] || null;
    this.resolve = options['resolve'] || function () {
      return true;
    };
    this.construct = options['construct'] || function (data) {
      return data;
    };
    this.instanceOf = options['instanceOf'] || null;
    this.predicate = options['predicate'] || null;
    this.represent = options['represent'] || null;
    this.representName = options['representName'] || null;
    this.defaultStyle = options['defaultStyle'] || null;
    this.multi = options['multi'] || false;
    this.styleAliases = compileStyleAliases(options['styleAliases'] || null);
    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
      throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
  }
  var type = Type$1;

  /*eslint-disable max-len*/

  function compileList(schema, name) {
    var result = [];
    schema[name].forEach(function (currentType) {
      var newIndex = result.length;
      result.forEach(function (previousType, previousIndex) {
        if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
          newIndex = previousIndex;
        }
      });
      result[newIndex] = currentType;
    });
    return result;
  }
  function compileMap( /* lists... */
  ) {
    var result = {
        scalar: {},
        sequence: {},
        mapping: {},
        fallback: {},
        multi: {
          scalar: [],
          sequence: [],
          mapping: [],
          fallback: []
        }
      },
      index,
      length;
    function collectType(type) {
      if (type.multi) {
        result.multi[type.kind].push(type);
        result.multi['fallback'].push(type);
      } else {
        result[type.kind][type.tag] = result['fallback'][type.tag] = type;
      }
    }
    for (index = 0, length = arguments.length; index < length; index += 1) {
      arguments[index].forEach(collectType);
    }
    return result;
  }
  function Schema$1(definition) {
    return this.extend(definition);
  }
  Schema$1.prototype.extend = function extend(definition) {
    var implicit = [];
    var explicit = [];
    if (definition instanceof type) {
      // Schema.extend(type)
      explicit.push(definition);
    } else if (Array.isArray(definition)) {
      // Schema.extend([ type1, type2, ... ])
      explicit = explicit.concat(definition);
    } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
      // Schema.extend({ explicit: [ type1, type2, ... ], implicit: [ type1, type2, ... ] })
      if (definition.implicit) implicit = implicit.concat(definition.implicit);
      if (definition.explicit) explicit = explicit.concat(definition.explicit);
    } else {
      throw new exception('Schema.extend argument should be a Type, [ Type ], ' + 'or a schema definition ({ implicit: [...], explicit: [...] })');
    }
    implicit.forEach(function (type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
      }
      if (type$1.loadKind && type$1.loadKind !== 'scalar') {
        throw new exception('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
      }
      if (type$1.multi) {
        throw new exception('There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.');
      }
    });
    explicit.forEach(function (type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception('Specified list of YAML types (or a single Type object) contains a non-Type object.');
      }
    });
    var result = Object.create(Schema$1.prototype);
    result.implicit = (this.implicit || []).concat(implicit);
    result.explicit = (this.explicit || []).concat(explicit);
    result.compiledImplicit = compileList(result, 'implicit');
    result.compiledExplicit = compileList(result, 'explicit');
    result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
    return result;
  };
  var schema = Schema$1;
  var str = new type('tag:yaml.org,2002:str', {
    kind: 'scalar',
    construct: function (data) {
      return data !== null ? data : '';
    }
  });
  var seq = new type('tag:yaml.org,2002:seq', {
    kind: 'sequence',
    construct: function (data) {
      return data !== null ? data : [];
    }
  });
  var map = new type('tag:yaml.org,2002:map', {
    kind: 'mapping',
    construct: function (data) {
      return data !== null ? data : {};
    }
  });
  var failsafe = new schema({
    explicit: [str, seq, map]
  });
  function resolveYamlNull(data) {
    if (data === null) return true;
    var max = data.length;
    return max === 1 && data === '~' || max === 4 && (data === 'null' || data === 'Null' || data === 'NULL');
  }
  function constructYamlNull() {
    return null;
  }
  function isNull(object) {
    return object === null;
  }
  var _null = new type('tag:yaml.org,2002:null', {
    kind: 'scalar',
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
      canonical: function () {
        return '~';
      },
      lowercase: function () {
        return 'null';
      },
      uppercase: function () {
        return 'NULL';
      },
      camelcase: function () {
        return 'Null';
      },
      empty: function () {
        return '';
      }
    },
    defaultStyle: 'lowercase'
  });
  function resolveYamlBoolean(data) {
    if (data === null) return false;
    var max = data.length;
    return max === 4 && (data === 'true' || data === 'True' || data === 'TRUE') || max === 5 && (data === 'false' || data === 'False' || data === 'FALSE');
  }
  function constructYamlBoolean(data) {
    return data === 'true' || data === 'True' || data === 'TRUE';
  }
  function isBoolean(object) {
    return Object.prototype.toString.call(object) === '[object Boolean]';
  }
  var bool = new type('tag:yaml.org,2002:bool', {
    kind: 'scalar',
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
      lowercase: function (object) {
        return object ? 'true' : 'false';
      },
      uppercase: function (object) {
        return object ? 'TRUE' : 'FALSE';
      },
      camelcase: function (object) {
        return object ? 'True' : 'False';
      }
    },
    defaultStyle: 'lowercase'
  });
  function isHexCode(c) {
    return 0x30 /* 0 */ <= c && c <= 0x39 /* 9 */ || 0x41 /* A */ <= c && c <= 0x46 /* F */ || 0x61 /* a */ <= c && c <= 0x66 /* f */;
  }
  function isOctCode(c) {
    return 0x30 /* 0 */ <= c && c <= 0x37 /* 7 */;
  }
  function isDecCode(c) {
    return 0x30 /* 0 */ <= c && c <= 0x39 /* 9 */;
  }
  function resolveYamlInteger(data) {
    if (data === null) return false;
    var max = data.length,
      index = 0,
      hasDigits = false,
      ch;
    if (!max) return false;
    ch = data[index];

    // sign
    if (ch === '-' || ch === '+') {
      ch = data[++index];
    }
    if (ch === '0') {
      // 0
      if (index + 1 === max) return true;
      ch = data[++index];

      // base 2, base 8, base 16

      if (ch === 'b') {
        // base 2
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === '_') continue;
          if (ch !== '0' && ch !== '1') return false;
          hasDigits = true;
        }
        return hasDigits && ch !== '_';
      }
      if (ch === 'x') {
        // base 16
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === '_') continue;
          if (!isHexCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== '_';
      }
      if (ch === 'o') {
        // base 8
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === '_') continue;
          if (!isOctCode(data.charCodeAt(index))) return false;
          hasDigits = true;
        }
        return hasDigits && ch !== '_';
      }
    }

    // base 10 (except 0)

    // value should not start with `_`;
    if (ch === '_') return false;
    for (; index < max; index++) {
      ch = data[index];
      if (ch === '_') continue;
      if (!isDecCode(data.charCodeAt(index))) {
        return false;
      }
      hasDigits = true;
    }

    // Should have digits and should not end with `_`
    if (!hasDigits || ch === '_') return false;
    return true;
  }
  function constructYamlInteger(data) {
    var value = data,
      sign = 1,
      ch;
    if (value.indexOf('_') !== -1) {
      value = value.replace(/_/g, '');
    }
    ch = value[0];
    if (ch === '-' || ch === '+') {
      if (ch === '-') sign = -1;
      value = value.slice(1);
      ch = value[0];
    }
    if (value === '0') return 0;
    if (ch === '0') {
      if (value[1] === 'b') return sign * parseInt(value.slice(2), 2);
      if (value[1] === 'x') return sign * parseInt(value.slice(2), 16);
      if (value[1] === 'o') return sign * parseInt(value.slice(2), 8);
    }
    return sign * parseInt(value, 10);
  }
  function isInteger(object) {
    return Object.prototype.toString.call(object) === '[object Number]' && object % 1 === 0 && !common.isNegativeZero(object);
  }
  var int = new type('tag:yaml.org,2002:int', {
    kind: 'scalar',
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
      binary: function (obj) {
        return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1);
      },
      octal: function (obj) {
        return obj >= 0 ? '0o' + obj.toString(8) : '-0o' + obj.toString(8).slice(1);
      },
      decimal: function (obj) {
        return obj.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function (obj) {
        return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() : '-0x' + obj.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: 'decimal',
    styleAliases: {
      binary: [2, 'bin'],
      octal: [8, 'oct'],
      decimal: [10, 'dec'],
      hexadecimal: [16, 'hex']
    }
  });
  var YAML_FLOAT_PATTERN = new RegExp(
  // 2.5e4, 2.5 and integers
  '^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?' +
  // .2e4, .2
  // special case, seems not from spec
  '|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?' +
  // .inf
  '|[-+]?\\.(?:inf|Inf|INF)' +
  // .nan
  '|\\.(?:nan|NaN|NAN))$');
  function resolveYamlFloat(data) {
    if (data === null) return false;
    if (!YAML_FLOAT_PATTERN.test(data) ||
    // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    data[data.length - 1] === '_') {
      return false;
    }
    return true;
  }
  function constructYamlFloat(data) {
    var value, sign;
    value = data.replace(/_/g, '').toLowerCase();
    sign = value[0] === '-' ? -1 : 1;
    if ('+-'.indexOf(value[0]) >= 0) {
      value = value.slice(1);
    }
    if (value === '.inf') {
      return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    } else if (value === '.nan') {
      return NaN;
    }
    return sign * parseFloat(value, 10);
  }
  var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
  function representYamlFloat(object, style) {
    var res;
    if (isNaN(object)) {
      switch (style) {
        case 'lowercase':
          return '.nan';
        case 'uppercase':
          return '.NAN';
        case 'camelcase':
          return '.NaN';
      }
    } else if (Number.POSITIVE_INFINITY === object) {
      switch (style) {
        case 'lowercase':
          return '.inf';
        case 'uppercase':
          return '.INF';
        case 'camelcase':
          return '.Inf';
      }
    } else if (Number.NEGATIVE_INFINITY === object) {
      switch (style) {
        case 'lowercase':
          return '-.inf';
        case 'uppercase':
          return '-.INF';
        case 'camelcase':
          return '-.Inf';
      }
    } else if (common.isNegativeZero(object)) {
      return '-0.0';
    }
    res = object.toString(10);

    // JS stringifier can build scientific format without dots: 5e-100,
    // while YAML requres dot: 5.e-100. Fix it with simple hack

    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
  }
  function isFloat(object) {
    return Object.prototype.toString.call(object) === '[object Number]' && (object % 1 !== 0 || common.isNegativeZero(object));
  }
  var float = new type('tag:yaml.org,2002:float', {
    kind: 'scalar',
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: 'lowercase'
  });
  var json = failsafe.extend({
    implicit: [_null, bool, int, float]
  });
  var core = json;
  var YAML_DATE_REGEXP = new RegExp('^([0-9][0-9][0-9][0-9])' +
  // [1] year
  '-([0-9][0-9])' +
  // [2] month
  '-([0-9][0-9])$'); // [3] day

  var YAML_TIMESTAMP_REGEXP = new RegExp('^([0-9][0-9][0-9][0-9])' +
  // [1] year
  '-([0-9][0-9]?)' +
  // [2] month
  '-([0-9][0-9]?)' +
  // [3] day
  '(?:[Tt]|[ \\t]+)' +
  // ...
  '([0-9][0-9]?)' +
  // [4] hour
  ':([0-9][0-9])' +
  // [5] minute
  ':([0-9][0-9])' +
  // [6] second
  '(?:\\.([0-9]*))?' +
  // [7] fraction
  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' +
  // [8] tz [9] tz_sign [10] tz_hour
  '(?::([0-9][0-9]))?))?$'); // [11] tz_minute

  function resolveYamlTimestamp(data) {
    if (data === null) return false;
    if (YAML_DATE_REGEXP.exec(data) !== null) return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
    return false;
  }
  function constructYamlTimestamp(data) {
    var match,
      year,
      month,
      day,
      hour,
      minute,
      second,
      fraction = 0,
      delta = null,
      tz_hour,
      tz_minute,
      date;
    match = YAML_DATE_REGEXP.exec(data);
    if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (match === null) throw new Error('Date resolve error');

    // match: [1] year [2] month [3] day

    year = +match[1];
    month = +match[2] - 1; // JS month starts with 0
    day = +match[3];
    if (!match[4]) {
      // no hour
      return new Date(Date.UTC(year, month, day));
    }

    // match: [4] hour [5] minute [6] second [7] fraction

    hour = +match[4];
    minute = +match[5];
    second = +match[6];
    if (match[7]) {
      fraction = match[7].slice(0, 3);
      while (fraction.length < 3) {
        // milli-seconds
        fraction += '0';
      }
      fraction = +fraction;
    }

    // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

    if (match[9]) {
      tz_hour = +match[10];
      tz_minute = +(match[11] || 0);
      delta = (tz_hour * 60 + tz_minute) * 60000; // delta in mili-seconds
      if (match[9] === '-') delta = -delta;
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta) date.setTime(date.getTime() - delta);
    return date;
  }
  function representYamlTimestamp(object /*, style*/) {
    return object.toISOString();
  }
  var timestamp = new type('tag:yaml.org,2002:timestamp', {
    kind: 'scalar',
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
  });
  function resolveYamlMerge(data) {
    return data === '<<' || data === null;
  }
  var merge = new type('tag:yaml.org,2002:merge', {
    kind: 'scalar',
    resolve: resolveYamlMerge
  });

  /*eslint-disable no-bitwise*/

  // [ 64, 65, 66 ] -> [ padding, CR, LF ]
  var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';
  function resolveYamlBinary(data) {
    if (data === null) return false;
    var code,
      idx,
      bitlen = 0,
      max = data.length,
      map = BASE64_MAP;

    // Convert one by one.
    for (idx = 0; idx < max; idx++) {
      code = map.indexOf(data.charAt(idx));

      // Skip CR/LF
      if (code > 64) continue;

      // Fail on illegal characters
      if (code < 0) return false;
      bitlen += 6;
    }

    // If there are any bits left, source was corrupted
    return bitlen % 8 === 0;
  }
  function constructYamlBinary(data) {
    var idx,
      tailbits,
      input = data.replace(/[\r\n=]/g, ''),
      // remove CR/LF & padding to simplify scan
      max = input.length,
      map = BASE64_MAP,
      bits = 0,
      result = [];

    // Collect by 6*4 bits (3 bytes)

    for (idx = 0; idx < max; idx++) {
      if (idx % 4 === 0 && idx) {
        result.push(bits >> 16 & 0xFF);
        result.push(bits >> 8 & 0xFF);
        result.push(bits & 0xFF);
      }
      bits = bits << 6 | map.indexOf(input.charAt(idx));
    }

    // Dump tail

    tailbits = max % 4 * 6;
    if (tailbits === 0) {
      result.push(bits >> 16 & 0xFF);
      result.push(bits >> 8 & 0xFF);
      result.push(bits & 0xFF);
    } else if (tailbits === 18) {
      result.push(bits >> 10 & 0xFF);
      result.push(bits >> 2 & 0xFF);
    } else if (tailbits === 12) {
      result.push(bits >> 4 & 0xFF);
    }
    return new Uint8Array(result);
  }
  function representYamlBinary(object /*, style*/) {
    var result = '',
      bits = 0,
      idx,
      tail,
      max = object.length,
      map = BASE64_MAP;

    // Convert every three bytes to 4 ASCII characters.

    for (idx = 0; idx < max; idx++) {
      if (idx % 3 === 0 && idx) {
        result += map[bits >> 18 & 0x3F];
        result += map[bits >> 12 & 0x3F];
        result += map[bits >> 6 & 0x3F];
        result += map[bits & 0x3F];
      }
      bits = (bits << 8) + object[idx];
    }

    // Dump tail

    tail = max % 3;
    if (tail === 0) {
      result += map[bits >> 18 & 0x3F];
      result += map[bits >> 12 & 0x3F];
      result += map[bits >> 6 & 0x3F];
      result += map[bits & 0x3F];
    } else if (tail === 2) {
      result += map[bits >> 10 & 0x3F];
      result += map[bits >> 4 & 0x3F];
      result += map[bits << 2 & 0x3F];
      result += map[64];
    } else if (tail === 1) {
      result += map[bits >> 2 & 0x3F];
      result += map[bits << 4 & 0x3F];
      result += map[64];
      result += map[64];
    }
    return result;
  }
  function isBinary(obj) {
    return Object.prototype.toString.call(obj) === '[object Uint8Array]';
  }
  var binary = new type('tag:yaml.org,2002:binary', {
    kind: 'scalar',
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
  });
  var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
  var _toString$2 = Object.prototype.toString;
  function resolveYamlOmap(data) {
    if (data === null) return true;
    var objectKeys = [],
      index,
      length,
      pair,
      pairKey,
      pairHasKey,
      object = data;
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      pairHasKey = false;
      if (_toString$2.call(pair) !== '[object Object]') return false;
      for (pairKey in pair) {
        if (_hasOwnProperty$3.call(pair, pairKey)) {
          if (!pairHasKey) pairHasKey = true;else return false;
        }
      }
      if (!pairHasKey) return false;
      if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);else return false;
    }
    return true;
  }
  function constructYamlOmap(data) {
    return data !== null ? data : [];
  }
  var omap = new type('tag:yaml.org,2002:omap', {
    kind: 'sequence',
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
  });
  var _toString$1 = Object.prototype.toString;
  function resolveYamlPairs(data) {
    if (data === null) return true;
    var index,
      length,
      pair,
      keys,
      result,
      object = data;
    result = new Array(object.length);
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      if (_toString$1.call(pair) !== '[object Object]') return false;
      keys = Object.keys(pair);
      if (keys.length !== 1) return false;
      result[index] = [keys[0], pair[keys[0]]];
    }
    return true;
  }
  function constructYamlPairs(data) {
    if (data === null) return [];
    var index,
      length,
      pair,
      keys,
      result,
      object = data;
    result = new Array(object.length);
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      keys = Object.keys(pair);
      result[index] = [keys[0], pair[keys[0]]];
    }
    return result;
  }
  var pairs = new type('tag:yaml.org,2002:pairs', {
    kind: 'sequence',
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
  });
  var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  function resolveYamlSet(data) {
    if (data === null) return true;
    var key,
      object = data;
    for (key in object) {
      if (_hasOwnProperty$2.call(object, key)) {
        if (object[key] !== null) return false;
      }
    }
    return true;
  }
  function constructYamlSet(data) {
    return data !== null ? data : {};
  }
  var set = new type('tag:yaml.org,2002:set', {
    kind: 'mapping',
    resolve: resolveYamlSet,
    construct: constructYamlSet
  });
  var _default = core.extend({
    implicit: [timestamp, merge],
    explicit: [binary, omap, pairs, set]
  });

  /*eslint-disable max-len,no-use-before-define*/

  var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;
  var CONTEXT_FLOW_IN = 1;
  var CONTEXT_FLOW_OUT = 2;
  var CONTEXT_BLOCK_IN = 3;
  var CONTEXT_BLOCK_OUT = 4;
  var CHOMPING_CLIP = 1;
  var CHOMPING_STRIP = 2;
  var CHOMPING_KEEP = 3;
  var PATTERN_NON_PRINTABLE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
  var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
  var PATTERN_FLOW_INDICATORS = /[,\[\]\{\}]/;
  var PATTERN_TAG_HANDLE = /^(?:!|!!|![a-z\-]+!)$/i;
  var PATTERN_TAG_URI = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;
  function _class(obj) {
    return Object.prototype.toString.call(obj);
  }
  function is_EOL(c) {
    return c === 0x0A /* LF */ || c === 0x0D /* CR */;
  }
  function is_WHITE_SPACE(c) {
    return c === 0x09 /* Tab */ || c === 0x20 /* Space */;
  }
  function is_WS_OR_EOL(c) {
    return c === 0x09 /* Tab */ || c === 0x20 /* Space */ || c === 0x0A /* LF */ || c === 0x0D /* CR */;
  }
  function is_FLOW_INDICATOR(c) {
    return c === 0x2C /* , */ || c === 0x5B /* [ */ || c === 0x5D /* ] */ || c === 0x7B /* { */ || c === 0x7D /* } */;
  }
  function fromHexCode(c) {
    var lc;
    if (0x30 /* 0 */ <= c && c <= 0x39 /* 9 */) {
      return c - 0x30;
    }

    /*eslint-disable no-bitwise*/
    lc = c | 0x20;
    if (0x61 /* a */ <= lc && lc <= 0x66 /* f */) {
      return lc - 0x61 + 10;
    }
    return -1;
  }
  function escapedHexLen(c) {
    if (c === 0x78 /* x */) {
      return 2;
    }
    if (c === 0x75 /* u */) {
      return 4;
    }
    if (c === 0x55 /* U */) {
      return 8;
    }
    return 0;
  }
  function fromDecimalCode(c) {
    if (0x30 /* 0 */ <= c && c <= 0x39 /* 9 */) {
      return c - 0x30;
    }
    return -1;
  }
  function simpleEscapeSequence(c) {
    /* eslint-disable indent */
    return c === 0x30 /* 0 */ ? '\x00' : c === 0x61 /* a */ ? '\x07' : c === 0x62 /* b */ ? '\x08' : c === 0x74 /* t */ ? '\x09' : c === 0x09 /* Tab */ ? '\x09' : c === 0x6E /* n */ ? '\x0A' : c === 0x76 /* v */ ? '\x0B' : c === 0x66 /* f */ ? '\x0C' : c === 0x72 /* r */ ? '\x0D' : c === 0x65 /* e */ ? '\x1B' : c === 0x20 /* Space */ ? ' ' : c === 0x22 /* " */ ? '\x22' : c === 0x2F /* / */ ? '/' : c === 0x5C /* \ */ ? '\x5C' : c === 0x4E /* N */ ? '\x85' : c === 0x5F /* _ */ ? '\xA0' : c === 0x4C /* L */ ? '\u2028' : c === 0x50 /* P */ ? '\u2029' : '';
  }
  function charFromCodepoint(c) {
    if (c <= 0xFFFF) {
      return String.fromCharCode(c);
    }
    // Encode UTF-16 surrogate pair
    // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
    return String.fromCharCode((c - 0x010000 >> 10) + 0xD800, (c - 0x010000 & 0x03FF) + 0xDC00);
  }
  var simpleEscapeCheck = new Array(256); // integer, for fast access
  var simpleEscapeMap = new Array(256);
  for (var i = 0; i < 256; i++) {
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
  }
  function State$1(input, options) {
    this.input = input;
    this.filename = options['filename'] || null;
    this.schema = options['schema'] || _default;
    this.onWarning = options['onWarning'] || null;
    // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
    // if such documents have no explicit %YAML directive
    this.legacy = options['legacy'] || false;
    this.json = options['json'] || false;
    this.listener = options['listener'] || null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
    this.position = 0;
    this.line = 0;
    this.lineStart = 0;
    this.lineIndent = 0;

    // position of first leading tab in the current line,
    // used to make sure there are no tabs in the indentation
    this.firstTabInLine = -1;
    this.documents = [];

    /*
    this.version;
    this.checkLineBreaks;
    this.tagMap;
    this.anchorMap;
    this.tag;
    this.anchor;
    this.kind;
    this.result;*/
  }
  function generateError(state, message) {
    var mark = {
      name: state.filename,
      buffer: state.input.slice(0, -1),
      // omit trailing \0
      position: state.position,
      line: state.line,
      column: state.position - state.lineStart
    };
    mark.snippet = snippet(mark);
    return new exception(message, mark);
  }
  function throwError(state, message) {
    throw generateError(state, message);
  }
  function throwWarning(state, message) {
    if (state.onWarning) {
      state.onWarning.call(null, generateError(state, message));
    }
  }
  var directiveHandlers = {
    YAML: function handleYamlDirective(state, name, args) {
      var match, major, minor;
      if (state.version !== null) {
        throwError(state, 'duplication of %YAML directive');
      }
      if (args.length !== 1) {
        throwError(state, 'YAML directive accepts exactly one argument');
      }
      match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
      if (match === null) {
        throwError(state, 'ill-formed argument of the YAML directive');
      }
      major = parseInt(match[1], 10);
      minor = parseInt(match[2], 10);
      if (major !== 1) {
        throwError(state, 'unacceptable YAML version of the document');
      }
      state.version = args[0];
      state.checkLineBreaks = minor < 2;
      if (minor !== 1 && minor !== 2) {
        throwWarning(state, 'unsupported YAML version of the document');
      }
    },
    TAG: function handleTagDirective(state, name, args) {
      var handle, prefix;
      if (args.length !== 2) {
        throwError(state, 'TAG directive accepts exactly two arguments');
      }
      handle = args[0];
      prefix = args[1];
      if (!PATTERN_TAG_HANDLE.test(handle)) {
        throwError(state, 'ill-formed tag handle (first argument) of the TAG directive');
      }
      if (_hasOwnProperty$1.call(state.tagMap, handle)) {
        throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
      }
      if (!PATTERN_TAG_URI.test(prefix)) {
        throwError(state, 'ill-formed tag prefix (second argument) of the TAG directive');
      }
      try {
        prefix = decodeURIComponent(prefix);
      } catch (err) {
        throwError(state, 'tag prefix is malformed: ' + prefix);
      }
      state.tagMap[handle] = prefix;
    }
  };
  function captureSegment(state, start, end, checkJson) {
    var _position, _length, _character, _result;
    if (start < end) {
      _result = state.input.slice(start, end);
      if (checkJson) {
        for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
          _character = _result.charCodeAt(_position);
          if (!(_character === 0x09 || 0x20 <= _character && _character <= 0x10FFFF)) {
            throwError(state, 'expected valid JSON character');
          }
        }
      } else if (PATTERN_NON_PRINTABLE.test(_result)) {
        throwError(state, 'the stream contains non-printable characters');
      }
      state.result += _result;
    }
  }
  function mergeMappings(state, destination, source, overridableKeys) {
    var sourceKeys, key, index, quantity;
    if (!common.isObject(source)) {
      throwError(state, 'cannot merge mappings; the provided source object is unacceptable');
    }
    sourceKeys = Object.keys(source);
    for (index = 0, quantity = sourceKeys.length; index < quantity; index += 1) {
      key = sourceKeys[index];
      if (!_hasOwnProperty$1.call(destination, key)) {
        destination[key] = source[key];
        overridableKeys[key] = true;
      }
    }
  }
  function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, startLine, startLineStart, startPos) {
    var index, quantity;

    // The output is a plain object here, so keys can only be strings.
    // We need to convert keyNode to a string, but doing so can hang the process
    // (deeply nested arrays that explode exponentially using aliases).
    if (Array.isArray(keyNode)) {
      keyNode = Array.prototype.slice.call(keyNode);
      for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
        if (Array.isArray(keyNode[index])) {
          throwError(state, 'nested arrays are not supported inside keys');
        }
        if (typeof keyNode === 'object' && _class(keyNode[index]) === '[object Object]') {
          keyNode[index] = '[object Object]';
        }
      }
    }

    // Avoid code execution in load() via toString property
    // (still use its own toString for arrays, timestamps,
    // and whatever user schema extensions happen to have @@toStringTag)
    if (typeof keyNode === 'object' && _class(keyNode) === '[object Object]') {
      keyNode = '[object Object]';
    }
    keyNode = String(keyNode);
    if (_result === null) {
      _result = {};
    }
    if (keyTag === 'tag:yaml.org,2002:merge') {
      if (Array.isArray(valueNode)) {
        for (index = 0, quantity = valueNode.length; index < quantity; index += 1) {
          mergeMappings(state, _result, valueNode[index], overridableKeys);
        }
      } else {
        mergeMappings(state, _result, valueNode, overridableKeys);
      }
    } else {
      if (!state.json && !_hasOwnProperty$1.call(overridableKeys, keyNode) && _hasOwnProperty$1.call(_result, keyNode)) {
        state.line = startLine || state.line;
        state.lineStart = startLineStart || state.lineStart;
        state.position = startPos || state.position;
        throwError(state, 'duplicated mapping key');
      }

      // used for this specific key only because Object.defineProperty is slow
      if (keyNode === '__proto__') {
        Object.defineProperty(_result, keyNode, {
          configurable: true,
          enumerable: true,
          writable: true,
          value: valueNode
        });
      } else {
        _result[keyNode] = valueNode;
      }
      delete overridableKeys[keyNode];
    }
    return _result;
  }
  function readLineBreak(state) {
    var ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x0A /* LF */) {
      state.position++;
    } else if (ch === 0x0D /* CR */) {
      state.position++;
      if (state.input.charCodeAt(state.position) === 0x0A /* LF */) {
        state.position++;
      }
    } else {
      throwError(state, 'a line break is expected');
    }
    state.line += 1;
    state.lineStart = state.position;
    state.firstTabInLine = -1;
  }
  function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0,
      ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        if (ch === 0x09 /* Tab */ && state.firstTabInLine === -1) {
          state.firstTabInLine = state.position;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      if (allowComments && ch === 0x23 /* # */) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 0x0A /* LF */ && ch !== 0x0D /* CR */ && ch !== 0);
      }
      if (is_EOL(ch)) {
        readLineBreak(state);
        ch = state.input.charCodeAt(state.position);
        lineBreaks++;
        state.lineIndent = 0;
        while (ch === 0x20 /* Space */) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
      } else {
        break;
      }
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
      throwWarning(state, 'deficient indentation');
    }
    return lineBreaks;
  }
  function testDocumentSeparator(state) {
    var _position = state.position,
      ch;
    ch = state.input.charCodeAt(_position);

    // Condition state.position === state.lineStart is tested
    // in parent on each call, for efficiency. No needs to test here again.
    if ((ch === 0x2D /* - */ || ch === 0x2E /* . */) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
      _position += 3;
      ch = state.input.charCodeAt(_position);
      if (ch === 0 || is_WS_OR_EOL(ch)) {
        return true;
      }
    }
    return false;
  }
  function writeFoldedLines(state, count) {
    if (count === 1) {
      state.result += ' ';
    } else if (count > 1) {
      state.result += common.repeat('\n', count - 1);
    }
  }
  function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding,
      following,
      captureStart,
      captureEnd,
      hasPendingContent,
      _line,
      _lineStart,
      _lineIndent,
      _kind = state.kind,
      _result = state.result,
      ch;
    ch = state.input.charCodeAt(state.position);
    if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 0x23 /* # */ || ch === 0x26 /* & */ || ch === 0x2A /* * */ || ch === 0x21 /* ! */ || ch === 0x7C /* | */ || ch === 0x3E /* > */ || ch === 0x27 /* ' */ || ch === 0x22 /* " */ || ch === 0x25 /* % */ || ch === 0x40 /* @ */ || ch === 0x60 /* ` */) {
      return false;
    }
    if (ch === 0x3F /* ? */ || ch === 0x2D /* - */) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        return false;
      }
    }
    state.kind = 'scalar';
    state.result = '';
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while (ch !== 0) {
      if (ch === 0x3A /* : */) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          break;
        }
      } else if (ch === 0x23 /* # */) {
        preceding = state.input.charCodeAt(state.position - 1);
        if (is_WS_OR_EOL(preceding)) {
          break;
        }
      } else if (state.position === state.lineStart && testDocumentSeparator(state) || withinFlowCollection && is_FLOW_INDICATOR(ch)) {
        break;
      } else if (is_EOL(ch)) {
        _line = state.line;
        _lineStart = state.lineStart;
        _lineIndent = state.lineIndent;
        skipSeparationSpace(state, false, -1);
        if (state.lineIndent >= nodeIndent) {
          hasPendingContent = true;
          ch = state.input.charCodeAt(state.position);
          continue;
        } else {
          state.position = captureEnd;
          state.line = _line;
          state.lineStart = _lineStart;
          state.lineIndent = _lineIndent;
          break;
        }
      }
      if (hasPendingContent) {
        captureSegment(state, captureStart, captureEnd, false);
        writeFoldedLines(state, state.line - _line);
        captureStart = captureEnd = state.position;
        hasPendingContent = false;
      }
      if (!is_WHITE_SPACE(ch)) {
        captureEnd = state.position + 1;
      }
      ch = state.input.charCodeAt(++state.position);
    }
    captureSegment(state, captureStart, captureEnd, false);
    if (state.result) {
      return true;
    }
    state.kind = _kind;
    state.result = _result;
    return false;
  }
  function readSingleQuotedScalar(state, nodeIndent) {
    var ch, captureStart, captureEnd;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x27 /* ' */) {
      return false;
    }
    state.kind = 'scalar';
    state.result = '';
    state.position++;
    captureStart = captureEnd = state.position;
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 0x27 /* ' */) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        if (ch === 0x27 /* ' */) {
          captureStart = state.position;
          state.position++;
          captureEnd = state.position;
        } else {
          return true;
        }
      } else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;
      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, 'unexpected end of the document within a single quoted scalar');
      } else {
        state.position++;
        captureEnd = state.position;
      }
    }
    throwError(state, 'unexpected end of the stream within a single quoted scalar');
  }
  function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x22 /* " */) {
      return false;
    }
    state.kind = 'scalar';
    state.result = '';
    state.position++;
    captureStart = captureEnd = state.position;
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 0x22 /* " */) {
        captureSegment(state, captureStart, state.position, true);
        state.position++;
        return true;
      } else if (ch === 0x5C /* \ */) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        if (is_EOL(ch)) {
          skipSeparationSpace(state, false, nodeIndent);

          // TODO: rework to inline fn with no type cast?
        } else if (ch < 256 && simpleEscapeCheck[ch]) {
          state.result += simpleEscapeMap[ch];
          state.position++;
        } else if ((tmp = escapedHexLen(ch)) > 0) {
          hexLength = tmp;
          hexResult = 0;
          for (; hexLength > 0; hexLength--) {
            ch = state.input.charCodeAt(++state.position);
            if ((tmp = fromHexCode(ch)) >= 0) {
              hexResult = (hexResult << 4) + tmp;
            } else {
              throwError(state, 'expected hexadecimal character');
            }
          }
          state.result += charFromCodepoint(hexResult);
          state.position++;
        } else {
          throwError(state, 'unknown escape sequence');
        }
        captureStart = captureEnd = state.position;
      } else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;
      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, 'unexpected end of the document within a double quoted scalar');
      } else {
        state.position++;
        captureEnd = state.position;
      }
    }
    throwError(state, 'unexpected end of the stream within a double quoted scalar');
  }
  function readFlowCollection(state, nodeIndent) {
    var readNext = true,
      _line,
      _lineStart,
      _pos,
      _tag = state.tag,
      _result,
      _anchor = state.anchor,
      following,
      terminator,
      isPair,
      isExplicitPair,
      isMapping,
      overridableKeys = Object.create(null),
      keyNode,
      keyTag,
      valueNode,
      ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x5B /* [ */) {
      terminator = 0x5D; /* ] */
      isMapping = false;
      _result = [];
    } else if (ch === 0x7B /* { */) {
      terminator = 0x7D; /* } */
      isMapping = true;
      _result = {};
    } else {
      return false;
    }
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(++state.position);
    while (ch !== 0) {
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if (ch === terminator) {
        state.position++;
        state.tag = _tag;
        state.anchor = _anchor;
        state.kind = isMapping ? 'mapping' : 'sequence';
        state.result = _result;
        return true;
      } else if (!readNext) {
        throwError(state, 'missed comma between flow collection entries');
      } else if (ch === 0x2C /* , */) {
        // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
        throwError(state, "expected the node content, but found ','");
      }
      keyTag = keyNode = valueNode = null;
      isPair = isExplicitPair = false;
      if (ch === 0x3F /* ? */) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following)) {
          isPair = isExplicitPair = true;
          state.position++;
          skipSeparationSpace(state, true, nodeIndent);
        }
      }
      _line = state.line; // Save the current line.
      _lineStart = state.lineStart;
      _pos = state.position;
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      keyTag = state.tag;
      keyNode = state.result;
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if ((isExplicitPair || state.line === _line) && ch === 0x3A /* : */) {
        isPair = true;
        ch = state.input.charCodeAt(++state.position);
        skipSeparationSpace(state, true, nodeIndent);
        composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
        valueNode = state.result;
      }
      if (isMapping) {
        storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos);
      } else if (isPair) {
        _result.push(storeMappingPair(state, null, overridableKeys, keyTag, keyNode, valueNode, _line, _lineStart, _pos));
      } else {
        _result.push(keyNode);
      }
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if (ch === 0x2C /* , */) {
        readNext = true;
        ch = state.input.charCodeAt(++state.position);
      } else {
        readNext = false;
      }
    }
    throwError(state, 'unexpected end of the stream within a flow collection');
  }
  function readBlockScalar(state, nodeIndent) {
    var captureStart,
      folding,
      chomping = CHOMPING_CLIP,
      didReadContent = false,
      detectedIndent = false,
      textIndent = nodeIndent,
      emptyLines = 0,
      atMoreIndented = false,
      tmp,
      ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 0x7C /* | */) {
      folding = false;
    } else if (ch === 0x3E /* > */) {
      folding = true;
    } else {
      return false;
    }
    state.kind = 'scalar';
    state.result = '';
    while (ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
      if (ch === 0x2B /* + */ || ch === 0x2D /* - */) {
        if (CHOMPING_CLIP === chomping) {
          chomping = ch === 0x2B /* + */ ? CHOMPING_KEEP : CHOMPING_STRIP;
        } else {
          throwError(state, 'repeat of a chomping mode identifier');
        }
      } else if ((tmp = fromDecimalCode(ch)) >= 0) {
        if (tmp === 0) {
          throwError(state, 'bad explicit indentation width of a block scalar; it cannot be less than one');
        } else if (!detectedIndent) {
          textIndent = nodeIndent + tmp - 1;
          detectedIndent = true;
        } else {
          throwError(state, 'repeat of an indentation width identifier');
        }
      } else {
        break;
      }
    }
    if (is_WHITE_SPACE(ch)) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (is_WHITE_SPACE(ch));
      if (ch === 0x23 /* # */) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (!is_EOL(ch) && ch !== 0);
      }
    }
    while (ch !== 0) {
      readLineBreak(state);
      state.lineIndent = 0;
      ch = state.input.charCodeAt(state.position);
      while ((!detectedIndent || state.lineIndent < textIndent) && ch === 0x20 /* Space */) {
        state.lineIndent++;
        ch = state.input.charCodeAt(++state.position);
      }
      if (!detectedIndent && state.lineIndent > textIndent) {
        textIndent = state.lineIndent;
      }
      if (is_EOL(ch)) {
        emptyLines++;
        continue;
      }

      // End of the scalar.
      if (state.lineIndent < textIndent) {
        // Perform the chomping.
        if (chomping === CHOMPING_KEEP) {
          state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
        } else if (chomping === CHOMPING_CLIP) {
          if (didReadContent) {
            // i.e. only if the scalar is not empty.
            state.result += '\n';
          }
        }

        // Break this `while` cycle and go to the funciton's epilogue.
        break;
      }

      // Folded style: use fancy rules to handle line breaks.
      if (folding) {
        // Lines starting with white space characters (more-indented lines) are not folded.
        if (is_WHITE_SPACE(ch)) {
          atMoreIndented = true;
          // except for the first content line (cf. Example 8.1)
          state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

          // End of more-indented block.
        } else if (atMoreIndented) {
          atMoreIndented = false;
          state.result += common.repeat('\n', emptyLines + 1);

          // Just one line break - perceive as the same line.
        } else if (emptyLines === 0) {
          if (didReadContent) {
            // i.e. only if we have already read some scalar content.
            state.result += ' ';
          }

          // Several line breaks - perceive as different lines.
        } else {
          state.result += common.repeat('\n', emptyLines);
        }

        // Literal style: just add exact number of line breaks between content lines.
      } else {
        // Keep all line breaks except the header line break.
        state.result += common.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
      }
      didReadContent = true;
      detectedIndent = true;
      emptyLines = 0;
      captureStart = state.position;
      while (!is_EOL(ch) && ch !== 0) {
        ch = state.input.charCodeAt(++state.position);
      }
      captureSegment(state, captureStart, state.position, false);
    }
    return true;
  }
  function readBlockSequence(state, nodeIndent) {
    var _line,
      _tag = state.tag,
      _anchor = state.anchor,
      _result = [],
      following,
      detected = false,
      ch;

    // there is a leading tab before this token, so it can't be a block sequence/mapping;
    // it can still be flow sequence/mapping or a scalar
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      if (state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, 'tab characters must not be used in indentation');
      }
      if (ch !== 0x2D /* - */) {
        break;
      }
      following = state.input.charCodeAt(state.position + 1);
      if (!is_WS_OR_EOL(following)) {
        break;
      }
      detected = true;
      state.position++;
      if (skipSeparationSpace(state, true, -1)) {
        if (state.lineIndent <= nodeIndent) {
          _result.push(null);
          ch = state.input.charCodeAt(state.position);
          continue;
        }
      }
      _line = state.line;
      composeNode(state, nodeIndent, CONTEXT_BLOCK_IN, false, true);
      _result.push(state.result);
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
      if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
        throwError(state, 'bad indentation of a sequence entry');
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = 'sequence';
      state.result = _result;
      return true;
    }
    return false;
  }
  function readBlockMapping(state, nodeIndent, flowIndent) {
    var following,
      allowCompact,
      _line,
      _keyLine,
      _keyLineStart,
      _keyPos,
      _tag = state.tag,
      _anchor = state.anchor,
      _result = {},
      overridableKeys = Object.create(null),
      keyTag = null,
      keyNode = null,
      valueNode = null,
      atExplicitKey = false,
      detected = false,
      ch;

    // there is a leading tab before this token, so it can't be a block sequence/mapping;
    // it can still be flow sequence/mapping or a scalar
    if (state.firstTabInLine !== -1) return false;
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      if (!atExplicitKey && state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, 'tab characters must not be used in indentation');
      }
      following = state.input.charCodeAt(state.position + 1);
      _line = state.line; // Save the current line.

      //
      // Explicit notation case. There are two separate blocks:
      // first for the key (denoted by "?") and second for the value (denoted by ":")
      //
      if ((ch === 0x3F /* ? */ || ch === 0x3A /* : */) && is_WS_OR_EOL(following)) {
        if (ch === 0x3F /* ? */) {
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = true;
          allowCompact = true;
        } else if (atExplicitKey) {
          // i.e. 0x3A/* : */ === character after the explicit key.
          atExplicitKey = false;
          allowCompact = true;
        } else {
          throwError(state, 'incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line');
        }
        state.position += 1;
        ch = following;

        //
        // Implicit notation case. Flow-style node as the key first, then ":", and the value.
        //
      } else {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
        if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          // Neither implicit nor explicit notation.
          // Reading is done. Go to the epilogue.
          break;
        }
        if (state.line === _line) {
          ch = state.input.charCodeAt(state.position);
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 0x3A /* : */) {
            ch = state.input.charCodeAt(++state.position);
            if (!is_WS_OR_EOL(ch)) {
              throwError(state, 'a whitespace character is expected after the key-value separator within a block mapping');
            }
            if (atExplicitKey) {
              storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
              keyTag = keyNode = valueNode = null;
            }
            detected = true;
            atExplicitKey = false;
            allowCompact = false;
            keyTag = state.tag;
            keyNode = state.result;
          } else if (detected) {
            throwError(state, 'can not read an implicit mapping pair; a colon is missed');
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true; // Keep the result of `composeNode`.
          }
        } else if (detected) {
          throwError(state, 'can not read a block mapping entry; a multiline key may not be an implicit key');
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true; // Keep the result of `composeNode`.
        }
      }

      //
      // Common reading code for both explicit and implicit notations.
      //
      if (state.line === _line || state.lineIndent > nodeIndent) {
        if (atExplicitKey) {
          _keyLine = state.line;
          _keyLineStart = state.lineStart;
          _keyPos = state.position;
        }
        if (composeNode(state, nodeIndent, CONTEXT_BLOCK_OUT, true, allowCompact)) {
          if (atExplicitKey) {
            keyNode = state.result;
          } else {
            valueNode = state.result;
          }
        }
        if (!atExplicitKey) {
          storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode, _keyLine, _keyLineStart, _keyPos);
          keyTag = keyNode = valueNode = null;
        }
        skipSeparationSpace(state, true, -1);
        ch = state.input.charCodeAt(state.position);
      }
      if ((state.line === _line || state.lineIndent > nodeIndent) && ch !== 0) {
        throwError(state, 'bad indentation of a mapping entry');
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }

    //
    // Epilogue.
    //

    // Special case: last mapping's node contains only the key in explicit notation.
    if (atExplicitKey) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    }

    // Expose the resulting mapping.
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = 'mapping';
      state.result = _result;
    }
    return detected;
  }
  function readTagProperty(state) {
    var _position,
      isVerbatim = false,
      isNamed = false,
      tagHandle,
      tagName,
      ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x21 /* ! */) return false;
    if (state.tag !== null) {
      throwError(state, 'duplication of a tag property');
    }
    ch = state.input.charCodeAt(++state.position);
    if (ch === 0x3C /* < */) {
      isVerbatim = true;
      ch = state.input.charCodeAt(++state.position);
    } else if (ch === 0x21 /* ! */) {
      isNamed = true;
      tagHandle = '!!';
      ch = state.input.charCodeAt(++state.position);
    } else {
      tagHandle = '!';
    }
    _position = state.position;
    if (isVerbatim) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0 && ch !== 0x3E /* > */);
      if (state.position < state.length) {
        tagName = state.input.slice(_position, state.position);
        ch = state.input.charCodeAt(++state.position);
      } else {
        throwError(state, 'unexpected end of the stream within a verbatim tag');
      }
    } else {
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        if (ch === 0x21 /* ! */) {
          if (!isNamed) {
            tagHandle = state.input.slice(_position - 1, state.position + 1);
            if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
              throwError(state, 'named tag handle cannot contain such characters');
            }
            isNamed = true;
            _position = state.position + 1;
          } else {
            throwError(state, 'tag suffix cannot contain exclamation marks');
          }
        }
        ch = state.input.charCodeAt(++state.position);
      }
      tagName = state.input.slice(_position, state.position);
      if (PATTERN_FLOW_INDICATORS.test(tagName)) {
        throwError(state, 'tag suffix cannot contain flow indicator characters');
      }
    }
    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
      throwError(state, 'tag name cannot contain such characters: ' + tagName);
    }
    try {
      tagName = decodeURIComponent(tagName);
    } catch (err) {
      throwError(state, 'tag name is malformed: ' + tagName);
    }
    if (isVerbatim) {
      state.tag = tagName;
    } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
      state.tag = state.tagMap[tagHandle] + tagName;
    } else if (tagHandle === '!') {
      state.tag = '!' + tagName;
    } else if (tagHandle === '!!') {
      state.tag = 'tag:yaml.org,2002:' + tagName;
    } else {
      throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }
    return true;
  }
  function readAnchorProperty(state) {
    var _position, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x26 /* & */) return false;
    if (state.anchor !== null) {
      throwError(state, 'duplication of an anchor property');
    }
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
      throwError(state, 'name of an anchor node must contain at least one character');
    }
    state.anchor = state.input.slice(_position, state.position);
    return true;
  }
  function readAlias(state) {
    var _position, alias, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 0x2A /* * */) return false;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
      throwError(state, 'name of an alias node must contain at least one character');
    }
    alias = state.input.slice(_position, state.position);
    if (!_hasOwnProperty$1.call(state.anchorMap, alias)) {
      throwError(state, 'unidentified alias "' + alias + '"');
    }
    state.result = state.anchorMap[alias];
    skipSeparationSpace(state, true, -1);
    return true;
  }
  function composeNode(state, parentIndent, nodeContext, allowToSeek, allowCompact) {
    var allowBlockStyles,
      allowBlockScalars,
      allowBlockCollections,
      indentStatus = 1,
      // 1: this>parent, 0: this=parent, -1: this<parent
      atNewLine = false,
      hasContent = false,
      typeIndex,
      typeQuantity,
      typeList,
      type,
      flowIndent,
      blockIndent;
    if (state.listener !== null) {
      state.listener('open', state);
    }
    state.tag = null;
    state.anchor = null;
    state.kind = null;
    state.result = null;
    allowBlockStyles = allowBlockScalars = allowBlockCollections = CONTEXT_BLOCK_OUT === nodeContext || CONTEXT_BLOCK_IN === nodeContext;
    if (allowToSeek) {
      if (skipSeparationSpace(state, true, -1)) {
        atNewLine = true;
        if (state.lineIndent > parentIndent) {
          indentStatus = 1;
        } else if (state.lineIndent === parentIndent) {
          indentStatus = 0;
        } else if (state.lineIndent < parentIndent) {
          indentStatus = -1;
        }
      }
    }
    if (indentStatus === 1) {
      while (readTagProperty(state) || readAnchorProperty(state)) {
        if (skipSeparationSpace(state, true, -1)) {
          atNewLine = true;
          allowBlockCollections = allowBlockStyles;
          if (state.lineIndent > parentIndent) {
            indentStatus = 1;
          } else if (state.lineIndent === parentIndent) {
            indentStatus = 0;
          } else if (state.lineIndent < parentIndent) {
            indentStatus = -1;
          }
        } else {
          allowBlockCollections = false;
        }
      }
    }
    if (allowBlockCollections) {
      allowBlockCollections = atNewLine || allowCompact;
    }
    if (indentStatus === 1 || CONTEXT_BLOCK_OUT === nodeContext) {
      if (CONTEXT_FLOW_IN === nodeContext || CONTEXT_FLOW_OUT === nodeContext) {
        flowIndent = parentIndent;
      } else {
        flowIndent = parentIndent + 1;
      }
      blockIndent = state.position - state.lineStart;
      if (indentStatus === 1) {
        if (allowBlockCollections && (readBlockSequence(state, blockIndent) || readBlockMapping(state, blockIndent, flowIndent)) || readFlowCollection(state, flowIndent)) {
          hasContent = true;
        } else {
          if (allowBlockScalars && readBlockScalar(state, flowIndent) || readSingleQuotedScalar(state, flowIndent) || readDoubleQuotedScalar(state, flowIndent)) {
            hasContent = true;
          } else if (readAlias(state)) {
            hasContent = true;
            if (state.tag !== null || state.anchor !== null) {
              throwError(state, 'alias node should not have any properties');
            }
          } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
            hasContent = true;
            if (state.tag === null) {
              state.tag = '?';
            }
          }
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
        }
      } else if (indentStatus === 0) {
        // Special case: block sequences are allowed to have same indentation level as the parent.
        // http://www.yaml.org/spec/1.2/spec.html#id2799784
        hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
      }
    }
    if (state.tag === null) {
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    } else if (state.tag === '?') {
      // Implicit resolving is not allowed for non-scalar types, and '?'
      // non-specific tag is only automatically assigned to plain scalars.
      //
      // We only need to check kind conformity in case user explicitly assigns '?'
      // tag, for example like this: "!<?> [0]"
      //
      if (state.result !== null && state.kind !== 'scalar') {
        throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
      }
      for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type = state.implicitTypes[typeIndex];
        if (type.resolve(state.result)) {
          // `state.result` updated in resolver if matched
          state.result = type.construct(state.result);
          state.tag = type.tag;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
          break;
        }
      }
    } else if (state.tag !== '!') {
      if (_hasOwnProperty$1.call(state.typeMap[state.kind || 'fallback'], state.tag)) {
        type = state.typeMap[state.kind || 'fallback'][state.tag];
      } else {
        // looking for multi type
        type = null;
        typeList = state.typeMap.multi[state.kind || 'fallback'];
        for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
          if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
            type = typeList[typeIndex];
            break;
          }
        }
      }
      if (!type) {
        throwError(state, 'unknown tag !<' + state.tag + '>');
      }
      if (state.result !== null && type.kind !== state.kind) {
        throwError(state, 'unacceptable node kind for !<' + state.tag + '> tag; it should be "' + type.kind + '", not "' + state.kind + '"');
      }
      if (!type.resolve(state.result, state.tag)) {
        // `state.result` updated in resolver if matched
        throwError(state, 'cannot resolve a node with !<' + state.tag + '> explicit tag');
      } else {
        state.result = type.construct(state.result, state.tag);
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    }
    if (state.listener !== null) {
      state.listener('close', state);
    }
    return state.tag !== null || state.anchor !== null || hasContent;
  }
  function readDocument(state) {
    var documentStart = state.position,
      _position,
      directiveName,
      directiveArgs,
      hasDirectives = false,
      ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = Object.create(null);
    state.anchorMap = Object.create(null);
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
      if (state.lineIndent > 0 || ch !== 0x25 /* % */) {
        break;
      }
      hasDirectives = true;
      ch = state.input.charCodeAt(++state.position);
      _position = state.position;
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        ch = state.input.charCodeAt(++state.position);
      }
      directiveName = state.input.slice(_position, state.position);
      directiveArgs = [];
      if (directiveName.length < 1) {
        throwError(state, 'directive name must not be less than one character in length');
      }
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 0x23 /* # */) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 0 && !is_EOL(ch));
          break;
        }
        if (is_EOL(ch)) break;
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveArgs.push(state.input.slice(_position, state.position));
      }
      if (ch !== 0) readLineBreak(state);
      if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
        directiveHandlers[directiveName](state, directiveName, directiveArgs);
      } else {
        throwWarning(state, 'unknown document directive "' + directiveName + '"');
      }
    }
    skipSeparationSpace(state, true, -1);
    if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 0x2D /* - */ && state.input.charCodeAt(state.position + 1) === 0x2D /* - */ && state.input.charCodeAt(state.position + 2) === 0x2D /* - */) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    } else if (hasDirectives) {
      throwError(state, 'directives end mark is expected');
    }
    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
      throwWarning(state, 'non-ASCII line breaks are interpreted as content');
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
      if (state.input.charCodeAt(state.position) === 0x2E /* . */) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      }
      return;
    }
    if (state.position < state.length - 1) {
      throwError(state, 'end of the stream or a document separator is expected');
    } else {
      return;
    }
  }
  function loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    if (input.length !== 0) {
      // Add tailing `\n` if not exists
      if (input.charCodeAt(input.length - 1) !== 0x0A /* LF */ && input.charCodeAt(input.length - 1) !== 0x0D /* CR */) {
        input += '\n';
      }

      // Strip BOM
      if (input.charCodeAt(0) === 0xFEFF) {
        input = input.slice(1);
      }
    }
    var state = new State$1(input, options);
    var nullpos = input.indexOf('\0');
    if (nullpos !== -1) {
      state.position = nullpos;
      throwError(state, 'null byte is not allowed in input');
    }

    // Use 0 as string terminator. That significantly simplifies bounds check.
    state.input += '\0';
    while (state.input.charCodeAt(state.position) === 0x20 /* Space */) {
      state.lineIndent += 1;
      state.position += 1;
    }
    while (state.position < state.length - 1) {
      readDocument(state);
    }
    return state.documents;
  }
  function loadAll$1(input, iterator, options) {
    if (iterator !== null && typeof iterator === 'object' && typeof options === 'undefined') {
      options = iterator;
      iterator = null;
    }
    var documents = loadDocuments(input, options);
    if (typeof iterator !== 'function') {
      return documents;
    }
    for (var index = 0, length = documents.length; index < length; index += 1) {
      iterator(documents[index]);
    }
  }
  function load$1(input, options) {
    var documents = loadDocuments(input, options);
    if (documents.length === 0) {
      /*eslint-disable no-undefined*/
      return undefined;
    } else if (documents.length === 1) {
      return documents[0];
    }
    throw new exception('expected a single document in the stream, but found more');
  }
  var loadAll_1 = loadAll$1;
  var load_1 = load$1;
  var loader = {
    loadAll: loadAll_1,
    load: load_1
  };

  /*eslint-disable no-use-before-define*/

  var _toString = Object.prototype.toString;
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  var CHAR_BOM = 0xFEFF;
  var CHAR_TAB = 0x09; /* Tab */
  var CHAR_LINE_FEED = 0x0A; /* LF */
  var CHAR_CARRIAGE_RETURN = 0x0D; /* CR */
  var CHAR_SPACE = 0x20; /* Space */
  var CHAR_EXCLAMATION = 0x21; /* ! */
  var CHAR_DOUBLE_QUOTE = 0x22; /* " */
  var CHAR_SHARP = 0x23; /* # */
  var CHAR_PERCENT = 0x25; /* % */
  var CHAR_AMPERSAND = 0x26; /* & */
  var CHAR_SINGLE_QUOTE = 0x27; /* ' */
  var CHAR_ASTERISK = 0x2A; /* * */
  var CHAR_COMMA = 0x2C; /* , */
  var CHAR_MINUS = 0x2D; /* - */
  var CHAR_COLON = 0x3A; /* : */
  var CHAR_EQUALS = 0x3D; /* = */
  var CHAR_GREATER_THAN = 0x3E; /* > */
  var CHAR_QUESTION = 0x3F; /* ? */
  var CHAR_COMMERCIAL_AT = 0x40; /* @ */
  var CHAR_LEFT_SQUARE_BRACKET = 0x5B; /* [ */
  var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
  var CHAR_GRAVE_ACCENT = 0x60; /* ` */
  var CHAR_LEFT_CURLY_BRACKET = 0x7B; /* { */
  var CHAR_VERTICAL_LINE = 0x7C; /* | */
  var CHAR_RIGHT_CURLY_BRACKET = 0x7D; /* } */

  var ESCAPE_SEQUENCES = {};
  ESCAPE_SEQUENCES[0x00] = '\\0';
  ESCAPE_SEQUENCES[0x07] = '\\a';
  ESCAPE_SEQUENCES[0x08] = '\\b';
  ESCAPE_SEQUENCES[0x09] = '\\t';
  ESCAPE_SEQUENCES[0x0A] = '\\n';
  ESCAPE_SEQUENCES[0x0B] = '\\v';
  ESCAPE_SEQUENCES[0x0C] = '\\f';
  ESCAPE_SEQUENCES[0x0D] = '\\r';
  ESCAPE_SEQUENCES[0x1B] = '\\e';
  ESCAPE_SEQUENCES[0x22] = '\\"';
  ESCAPE_SEQUENCES[0x5C] = '\\\\';
  ESCAPE_SEQUENCES[0x85] = '\\N';
  ESCAPE_SEQUENCES[0xA0] = '\\_';
  ESCAPE_SEQUENCES[0x2028] = '\\L';
  ESCAPE_SEQUENCES[0x2029] = '\\P';
  var DEPRECATED_BOOLEANS_SYNTAX = ['y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON', 'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'];
  var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function compileStyleMap(schema, map) {
    var result, keys, index, length, tag, style, type;
    if (map === null) return {};
    result = {};
    keys = Object.keys(map);
    for (index = 0, length = keys.length; index < length; index += 1) {
      tag = keys[index];
      style = String(map[tag]);
      if (tag.slice(0, 2) === '!!') {
        tag = 'tag:yaml.org,2002:' + tag.slice(2);
      }
      type = schema.compiledTypeMap['fallback'][tag];
      if (type && _hasOwnProperty.call(type.styleAliases, style)) {
        style = type.styleAliases[style];
      }
      result[tag] = style;
    }
    return result;
  }
  function encodeHex(character) {
    var string, handle, length;
    string = character.toString(16).toUpperCase();
    if (character <= 0xFF) {
      handle = 'x';
      length = 2;
    } else if (character <= 0xFFFF) {
      handle = 'u';
      length = 4;
    } else if (character <= 0xFFFFFFFF) {
      handle = 'U';
      length = 8;
    } else {
      throw new exception('code point within a string may not be greater than 0xFFFFFFFF');
    }
    return '\\' + handle + common.repeat('0', length - string.length) + string;
  }
  var QUOTING_TYPE_SINGLE = 1,
    QUOTING_TYPE_DOUBLE = 2;
  function State(options) {
    this.schema = options['schema'] || _default;
    this.indent = Math.max(1, options['indent'] || 2);
    this.noArrayIndent = options['noArrayIndent'] || false;
    this.skipInvalid = options['skipInvalid'] || false;
    this.flowLevel = common.isNothing(options['flowLevel']) ? -1 : options['flowLevel'];
    this.styleMap = compileStyleMap(this.schema, options['styles'] || null);
    this.sortKeys = options['sortKeys'] || false;
    this.lineWidth = options['lineWidth'] || 80;
    this.noRefs = options['noRefs'] || false;
    this.noCompatMode = options['noCompatMode'] || false;
    this.condenseFlow = options['condenseFlow'] || false;
    this.quotingType = options['quotingType'] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
    this.forceQuotes = options['forceQuotes'] || false;
    this.replacer = typeof options['replacer'] === 'function' ? options['replacer'] : null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = '';
    this.duplicates = [];
    this.usedDuplicates = null;
  }

  // Indents every line in a string. Empty lines (\n only) are not indented.
  function indentString(string, spaces) {
    var ind = common.repeat(' ', spaces),
      position = 0,
      next = -1,
      result = '',
      line,
      length = string.length;
    while (position < length) {
      next = string.indexOf('\n', position);
      if (next === -1) {
        line = string.slice(position);
        position = length;
      } else {
        line = string.slice(position, next + 1);
        position = next + 1;
      }
      if (line.length && line !== '\n') result += ind;
      result += line;
    }
    return result;
  }
  function generateNextLine(state, level) {
    return '\n' + common.repeat(' ', state.indent * level);
  }
  function testImplicitResolving(state, str) {
    var index, length, type;
    for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
      type = state.implicitTypes[index];
      if (type.resolve(str)) {
        return true;
      }
    }
    return false;
  }

  // [33] s-white ::= s-space | s-tab
  function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
  }

  // Returns true if the character can be printed without escaping.
  // From YAML 1.2: "any allowed characters known to be non-printable
  // should also be escaped. [However,] This isn’t mandatory"
  // Derived from nb-char - \t - #x85 - #xA0 - #x2028 - #x2029.
  function isPrintable(c) {
    return 0x00020 <= c && c <= 0x00007E || 0x000A1 <= c && c <= 0x00D7FF && c !== 0x2028 && c !== 0x2029 || 0x0E000 <= c && c <= 0x00FFFD && c !== CHAR_BOM || 0x10000 <= c && c <= 0x10FFFF;
  }

  // [34] ns-char ::= nb-char - s-white
  // [27] nb-char ::= c-printable - b-char - c-byte-order-mark
  // [26] b-char  ::= b-line-feed | b-carriage-return
  // Including s-white (for some reason, examples doesn't match specs in this aspect)
  // ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
  function isNsCharOrWhitespace(c) {
    return isPrintable(c) && c !== CHAR_BOM
    // - b-char
    && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
  }

  // [127]  ns-plain-safe(c) ::= c = flow-out  ⇒ ns-plain-safe-out
  //                             c = flow-in   ⇒ ns-plain-safe-in
  //                             c = block-key ⇒ ns-plain-safe-out
  //                             c = flow-key  ⇒ ns-plain-safe-in
  // [128] ns-plain-safe-out ::= ns-char
  // [129]  ns-plain-safe-in ::= ns-char - c-flow-indicator
  // [130]  ns-plain-char(c) ::=  ( ns-plain-safe(c) - “:” - “#” )
  //                            | ( /* An ns-char preceding */ “#” )
  //                            | ( “:” /* Followed by an ns-plain-safe(c) */ )
  function isPlainSafe(c, prev, inblock) {
    var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
    var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
    return (
    // ns-plain-safe
    inblock ?
    // c = flow-in
    cIsNsCharOrWhitespace : cIsNsCharOrWhitespace
    // - c-flow-indicator
    && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET

    // ns-plain-char
    ) && c !== CHAR_SHARP // false on '#'
    && !(prev === CHAR_COLON && !cIsNsChar) // false on ': '
    || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP // change to true on '[^ ]#'
    || prev === CHAR_COLON && cIsNsChar; // change to true on ':[^ ]'
  }

  // Simplified test for values allowed as the first character in plain style.
  function isPlainSafeFirst(c) {
    // Uses a subset of ns-char - c-indicator
    // where ns-char = nb-char - s-white.
    // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
    return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) // - s-white
    // - (c-indicator ::=
    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
    && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET
    // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
    && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE
    // | “%” | “@” | “`”)
    && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
  }

  // Simplified test for values allowed as the last character in plain style.
  function isPlainSafeLast(c) {
    // just not whitespace or colon, it will be checked to be plain character later
    return !isWhitespace(c) && c !== CHAR_COLON;
  }

  // Same as 'string'.codePointAt(pos), but works in older browsers.
  function codePointAt(string, pos) {
    var first = string.charCodeAt(pos),
      second;
    if (first >= 0xD800 && first <= 0xDBFF && pos + 1 < string.length) {
      second = string.charCodeAt(pos + 1);
      if (second >= 0xDC00 && second <= 0xDFFF) {
        // https://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
        return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
      }
    }
    return first;
  }

  // Determines whether block indentation indicator is required.
  function needIndentIndicator(string) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
  }
  var STYLE_PLAIN = 1,
    STYLE_SINGLE = 2,
    STYLE_LITERAL = 3,
    STYLE_FOLDED = 4,
    STYLE_DOUBLE = 5;

  // Determines which scalar styles are possible and returns the preferred style.
  // lineWidth = -1 => no limit.
  // Pre-conditions: str.length > 0.
  // Post-conditions:
  //    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
  //    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
  //    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
  function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
    var i;
    var char = 0;
    var prevChar = null;
    var hasLineBreak = false;
    var hasFoldableLine = false; // only checked if shouldTrackWidth
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1; // count the first line correctly
    var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
    if (singleLineOnly || forceQuotes) {
      // Case: no block styles.
      // Check for disallowed characters to rule out plain and single.
      for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
    } else {
      // Case: block styles permitted.
      for (i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (char === CHAR_LINE_FEED) {
          hasLineBreak = true;
          // Check if any line can be folded.
          if (shouldTrackWidth) {
            hasFoldableLine = hasFoldableLine ||
            // Foldable line = too long, and not more-indented.
            i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== ' ';
            previousLineBreak = i;
          }
        } else if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
      // in case the end is missing a \n
      hasFoldableLine = hasFoldableLine || shouldTrackWidth && i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== ' ';
    }
    // Although every style can represent \n without escaping, prefer block styles
    // for multiline, since they're more readable and they don't add empty lines.
    // Also prefer folding a super-long line.
    if (!hasLineBreak && !hasFoldableLine) {
      // Strings interpretable as another type have to be quoted;
      // e.g. the string 'true' vs. the boolean true.
      if (plain && !forceQuotes && !testAmbiguousType(string)) {
        return STYLE_PLAIN;
      }
      return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
    // Edge case: block indentation indicator can only have one digit.
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
      return STYLE_DOUBLE;
    }
    // At this point we know block styles are valid.
    // Prefer literal style unless we want to fold.
    if (!forceQuotes) {
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }

  // Note: line breaking/folding is implemented for only the folded style.
  // NB. We drop the last trailing newline (if any) of a returned block scalar
  //  since the dumper adds its own newline. This always works:
  //    • No ending newline => unaffected; already using strip "-" chomping.
  //    • Ending newline    => removed then restored.
  //  Importantly, this keeps the "+" chomp indicator from gaining an extra line.
  function writeScalar(state, string, level, iskey, inblock) {
    state.dump = function () {
      if (string.length === 0) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
      }
      if (!state.noCompatMode) {
        if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
          return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
        }
      }
      var indent = state.indent * Math.max(1, level); // no 0-indent scalars
      // As indentation gets deeper, let the width decrease monotonically
      // to the lower bound min(state.lineWidth, 40).
      // Note that this implies
      //  state.lineWidth ≤ 40 + state.indent: width is fixed at the lower bound.
      //  state.lineWidth > 40 + state.indent: width decreases until the lower bound.
      // This behaves better than a constant minimum width which disallows narrower options,
      // or an indent threshold which causes the width to suddenly increase.
      var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

      // Without knowing if keys are implicit/explicit, assume implicit for safety.
      var singleLineOnly = iskey
      // No block styles in flow mode.
      || state.flowLevel > -1 && level >= state.flowLevel;
      function testAmbiguity(string) {
        return testImplicitResolving(state, string);
      }
      switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth, testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {
        case STYLE_PLAIN:
          return string;
        case STYLE_SINGLE:
          return "'" + string.replace(/'/g, "''") + "'";
        case STYLE_LITERAL:
          return '|' + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
        case STYLE_FOLDED:
          return '>' + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
        case STYLE_DOUBLE:
          return '"' + escapeString(string) + '"';
        default:
          throw new exception('impossible error: invalid scalar style');
      }
    }();
  }

  // Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
  function blockHeader(string, indentPerLevel) {
    var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

    // note the special case: the string '\n' counts as a "trailing" empty line.
    var clip = string[string.length - 1] === '\n';
    var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
    var chomp = keep ? '+' : clip ? '' : '-';
    return indentIndicator + chomp + '\n';
  }

  // (See the note for writeScalar.)
  function dropEndingNewline(string) {
    return string[string.length - 1] === '\n' ? string.slice(0, -1) : string;
  }

  // Note: a long line without a suitable break point will exceed the width limit.
  // Pre-conditions: every char in str isPrintable, str.length > 0, width > 0.
  function foldString(string, width) {
    // In folded style, $k$ consecutive newlines output as $k+1$ newlines—
    // unless they're before or after a more-indented line, or at the very
    // beginning or end, in which case $k$ maps to $k$.
    // Therefore, parse each chunk as newline(s) followed by a content line.
    var lineRe = /(\n+)([^\n]*)/g;

    // first line (possibly an empty line)
    var result = function () {
      var nextLF = string.indexOf('\n');
      nextLF = nextLF !== -1 ? nextLF : string.length;
      lineRe.lastIndex = nextLF;
      return foldLine(string.slice(0, nextLF), width);
    }();
    // If we haven't reached the first content line yet, don't add an extra \n.
    var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
    var moreIndented;

    // rest of the lines
    var match;
    while (match = lineRe.exec(string)) {
      var prefix = match[1],
        line = match[2];
      moreIndented = line[0] === ' ';
      result += prefix + (!prevMoreIndented && !moreIndented && line !== '' ? '\n' : '') + foldLine(line, width);
      prevMoreIndented = moreIndented;
    }
    return result;
  }

  // Greedy line breaking.
  // Picks the longest line under the limit each time,
  // otherwise settles for the shortest line over the limit.
  // NB. More-indented lines *cannot* be folded, as that would add an extra \n.
  function foldLine(line, width) {
    if (line === '' || line[0] === ' ') return line;

    // Since a more-indented line adds a \n, breaks can't be followed by a space.
    var breakRe = / [^ ]/g; // note: the match index will always be <= length-2.
    var match;
    // start is an inclusive index. end, curr, and next are exclusive.
    var start = 0,
      end,
      curr = 0,
      next = 0;
    var result = '';

    // Invariants: 0 <= start <= length-1.
    //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
    // Inside the loop:
    //   A match implies length >= 2, so curr and next are <= length-2.
    while (match = breakRe.exec(line)) {
      next = match.index;
      // maintain invariant: curr - start <= width
      if (next - start > width) {
        end = curr > start ? curr : next; // derive end <= length-2
        result += '\n' + line.slice(start, end);
        // skip the space that was output as \n
        start = end + 1; // derive start <= length-1
      }
      curr = next;
    }

    // By the invariants, start <= length-1, so there is something left over.
    // It is either the whole string or a part starting from non-whitespace.
    result += '\n';
    // Insert a break if the remainder is too long and there is a break available.
    if (line.length - start > width && curr > start) {
      result += line.slice(start, curr) + '\n' + line.slice(curr + 1);
    } else {
      result += line.slice(start);
    }
    return result.slice(1); // drop extra \n joiner
  }

  // Escapes a double-quoted string.
  function escapeString(string) {
    var result = '';
    var char = 0;
    var escapeSeq;
    for (var i = 0; i < string.length; char >= 0x10000 ? i += 2 : i++) {
      char = codePointAt(string, i);
      escapeSeq = ESCAPE_SEQUENCES[char];
      if (!escapeSeq && isPrintable(char)) {
        result += string[i];
        if (char >= 0x10000) result += string[i + 1];
      } else {
        result += escapeSeq || encodeHex(char);
      }
    }
    return result;
  }
  function writeFlowSequence(state, level, object) {
    var _result = '',
      _tag = state.tag,
      index,
      length,
      value;
    for (index = 0, length = object.length; index < length; index += 1) {
      value = object[index];
      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }

      // Write only valid elements, put null instead of invalid elements.
      if (writeNode(state, level, value, false, false) || typeof value === 'undefined' && writeNode(state, level, null, false, false)) {
        if (_result !== '') _result += ',' + (!state.condenseFlow ? ' ' : '');
        _result += state.dump;
      }
    }
    state.tag = _tag;
    state.dump = '[' + _result + ']';
  }
  function writeBlockSequence(state, level, object, compact) {
    var _result = '',
      _tag = state.tag,
      index,
      length,
      value;
    for (index = 0, length = object.length; index < length; index += 1) {
      value = object[index];
      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }

      // Write only valid elements, put null instead of invalid elements.
      if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === 'undefined' && writeNode(state, level + 1, null, true, true, false, true)) {
        if (!compact || _result !== '') {
          _result += generateNextLine(state, level);
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          _result += '-';
        } else {
          _result += '- ';
        }
        _result += state.dump;
      }
    }
    state.tag = _tag;
    state.dump = _result || '[]'; // Empty sequence if no valid values.
  }
  function writeFlowMapping(state, level, object) {
    var _result = '',
      _tag = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      pairBuffer;
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = '';
      if (_result !== '') pairBuffer += ', ';
      if (state.condenseFlow) pairBuffer += '"';
      objectKey = objectKeyList[index];
      objectValue = object[objectKey];
      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state, level, objectKey, false, false)) {
        continue; // Skip this pair because of invalid key;
      }
      if (state.dump.length > 1024) pairBuffer += '? ';
      pairBuffer += state.dump + (state.condenseFlow ? '"' : '') + ':' + (state.condenseFlow ? '' : ' ');
      if (!writeNode(state, level, objectValue, false, false)) {
        continue; // Skip this pair because of invalid value.
      }
      pairBuffer += state.dump;

      // Both key and value are valid.
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = '{' + _result + '}';
  }
  function writeBlockMapping(state, level, object, compact) {
    var _result = '',
      _tag = state.tag,
      objectKeyList = Object.keys(object),
      index,
      length,
      objectKey,
      objectValue,
      explicitPair,
      pairBuffer;

    // Allow sorting keys so that the output file is deterministic
    if (state.sortKeys === true) {
      // Default sorting
      objectKeyList.sort();
    } else if (typeof state.sortKeys === 'function') {
      // Custom sort function
      objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
      // Something is wrong
      throw new exception('sortKeys must be a boolean or a function');
    }
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = '';
      if (!compact || _result !== '') {
        pairBuffer += generateNextLine(state, level);
      }
      objectKey = objectKeyList[index];
      objectValue = object[objectKey];
      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state, level + 1, objectKey, true, true, true)) {
        continue; // Skip this pair because of invalid key.
      }
      explicitPair = state.tag !== null && state.tag !== '?' || state.dump && state.dump.length > 1024;
      if (explicitPair) {
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += '?';
        } else {
          pairBuffer += '? ';
        }
      }
      pairBuffer += state.dump;
      if (explicitPair) {
        pairBuffer += generateNextLine(state, level);
      }
      if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
        continue; // Skip this pair because of invalid value.
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += ':';
      } else {
        pairBuffer += ': ';
      }
      pairBuffer += state.dump;

      // Both key and value are valid.
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || '{}'; // Empty mapping if no valid pairs.
  }
  function detectType(state, object, explicit) {
    var _result, typeList, index, length, type, style;
    typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for (index = 0, length = typeList.length; index < length; index += 1) {
      type = typeList[index];
      if ((type.instanceOf || type.predicate) && (!type.instanceOf || typeof object === 'object' && object instanceof type.instanceOf) && (!type.predicate || type.predicate(object))) {
        if (explicit) {
          if (type.multi && type.representName) {
            state.tag = type.representName(object);
          } else {
            state.tag = type.tag;
          }
        } else {
          state.tag = '?';
        }
        if (type.represent) {
          style = state.styleMap[type.tag] || type.defaultStyle;
          if (_toString.call(type.represent) === '[object Function]') {
            _result = type.represent(object, style);
          } else if (_hasOwnProperty.call(type.represent, style)) {
            _result = type.represent[style](object, style);
          } else {
            throw new exception('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
          }
          state.dump = _result;
        }
        return true;
      }
    }
    return false;
  }

  // Serializes `object` and writes it to global `result`.
  // Returns true on success, or false on invalid object.
  //
  function writeNode(state, level, object, block, compact, iskey, isblockseq) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
      detectType(state, object, true);
    }
    var type = _toString.call(state.dump);
    var inblock = block;
    var tagStr;
    if (block) {
      block = state.flowLevel < 0 || state.flowLevel > level;
    }
    var objectOrArray = type === '[object Object]' || type === '[object Array]',
      duplicateIndex,
      duplicate;
    if (objectOrArray) {
      duplicateIndex = state.duplicates.indexOf(object);
      duplicate = duplicateIndex !== -1;
    }
    if (state.tag !== null && state.tag !== '?' || duplicate || state.indent !== 2 && level > 0) {
      compact = false;
    }
    if (duplicate && state.usedDuplicates[duplicateIndex]) {
      state.dump = '*ref_' + duplicateIndex;
    } else {
      if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
        state.usedDuplicates[duplicateIndex] = true;
      }
      if (type === '[object Object]') {
        if (block && Object.keys(state.dump).length !== 0) {
          writeBlockMapping(state, level, state.dump, compact);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + state.dump;
          }
        } else {
          writeFlowMapping(state, level, state.dump);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
          }
        }
      } else if (type === '[object Array]') {
        if (block && state.dump.length !== 0) {
          if (state.noArrayIndent && !isblockseq && level > 0) {
            writeBlockSequence(state, level - 1, state.dump, compact);
          } else {
            writeBlockSequence(state, level, state.dump, compact);
          }
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + state.dump;
          }
        } else {
          writeFlowSequence(state, level, state.dump);
          if (duplicate) {
            state.dump = '&ref_' + duplicateIndex + ' ' + state.dump;
          }
        }
      } else if (type === '[object String]') {
        if (state.tag !== '?') {
          writeScalar(state, state.dump, level, iskey, inblock);
        }
      } else if (type === '[object Undefined]') {
        return false;
      } else {
        if (state.skipInvalid) return false;
        throw new exception('unacceptable kind of an object to dump ' + type);
      }
      if (state.tag !== null && state.tag !== '?') {
        // Need to encode all characters except those allowed by the spec:
        //
        // [35] ns-dec-digit    ::=  [#x30-#x39] /* 0-9 */
        // [36] ns-hex-digit    ::=  ns-dec-digit
        //                         | [#x41-#x46] /* A-F */ | [#x61-#x66] /* a-f */
        // [37] ns-ascii-letter ::=  [#x41-#x5A] /* A-Z */ | [#x61-#x7A] /* a-z */
        // [38] ns-word-char    ::=  ns-dec-digit | ns-ascii-letter | “-”
        // [39] ns-uri-char     ::=  “%” ns-hex-digit ns-hex-digit | ns-word-char | “#”
        //                         | “;” | “/” | “?” | “:” | “@” | “&” | “=” | “+” | “$” | “,”
        //                         | “_” | “.” | “!” | “~” | “*” | “'” | “(” | “)” | “[” | “]”
        //
        // Also need to encode '!' because it has special meaning (end of tag prefix).
        //
        tagStr = encodeURI(state.tag[0] === '!' ? state.tag.slice(1) : state.tag).replace(/!/g, '%21');
        if (state.tag[0] === '!') {
          tagStr = '!' + tagStr;
        } else if (tagStr.slice(0, 18) === 'tag:yaml.org,2002:') {
          tagStr = '!!' + tagStr.slice(18);
        } else {
          tagStr = '!<' + tagStr + '>';
        }
        state.dump = tagStr + ' ' + state.dump;
      }
    }
    return true;
  }
  function getDuplicateReferences(object, state) {
    var objects = [],
      duplicatesIndexes = [],
      index,
      length;
    inspectNode(object, objects, duplicatesIndexes);
    for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
      state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
  }
  function inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList, index, length;
    if (object !== null && typeof object === 'object') {
      index = objects.indexOf(object);
      if (index !== -1) {
        if (duplicatesIndexes.indexOf(index) === -1) {
          duplicatesIndexes.push(index);
        }
      } else {
        objects.push(object);
        if (Array.isArray(object)) {
          for (index = 0, length = object.length; index < length; index += 1) {
            inspectNode(object[index], objects, duplicatesIndexes);
          }
        } else {
          objectKeyList = Object.keys(object);
          for (index = 0, length = objectKeyList.length; index < length; index += 1) {
            inspectNode(object[objectKeyList[index]], objects, duplicatesIndexes);
          }
        }
      }
    }
  }
  function dump$1(input, options) {
    options = options || {};
    var state = new State(options);
    if (!state.noRefs) getDuplicateReferences(input, state);
    var value = input;
    if (state.replacer) {
      value = state.replacer.call({
        '': value
      }, '', value);
    }
    if (writeNode(state, 0, value, true, true)) return state.dump + '\n';
    return '';
  }
  var dump_1 = dump$1;
  var dumper = {
    dump: dump_1
  };
  var load = loader.load;
  var dump = dumper.dump;
  var __defProp$7 = Object.defineProperty;
  var __name$7 = (target, value) => __defProp$7(target, "name", {
    value,
    configurable: true
  });
  var __require = /* @__PURE__ */(x => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function (x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });

  // src/utils.ts
  var evaluate = new Function("context", "expr", `
  try {
    with (context) {
      return eval(expr)
    }
  } catch {}
`);
  function interpolate(template, context, pattern = /\{\{([\s\S]+?)\}\}/g) {
    let capture;
    let result = "",
      lastIndex = 0;
    while (capture = pattern.exec(template)) {
      if (capture[0] === template) {
        return evaluate(context, capture[1]);
      }
      result += template.slice(lastIndex, capture.index);
      result += evaluate(context, capture[1]) ?? "";
      lastIndex = capture.index + capture[0].length;
    }
    return result + template.slice(lastIndex);
  }
  __name$7(interpolate, "interpolate");

  // src/shared.ts
  var writable = {
    ".json": "application/json",
    ".yaml": "application/yaml",
    ".yml": "application/yaml"
  };
  var supported = new Set(Object.keys(writable));
  function swapAssign(target, source) {
    const result = {
      ...target
    };
    for (const key in result) {
      delete target[key];
    }
    Object.assign(target, source);
    return result;
  }
  __name$7(swapAssign, "swapAssign");
  function randomID() {
    return Math.random().toString(36).slice(2, 8);
  }
  __name$7(randomID, "randomID");
  var Entry = (_Class6 = class Entry {
    constructor(loader, parent, options) {
      _defineProperty(this, "fork", null);
      _defineProperty(this, "isUpdate", false);
      this.loader = loader;
      this.parent = parent;
      this.options = options;
    }
    amend(ctx) {
      swapAssign(ctx[Context$1.intercept], this.options.intercept);
      const neoMap = Object.create(Object.getPrototypeOf(ctx[Context$1.isolate]));
      for (const [key, label] of Object.entries(this.options.isolate ?? {})) {
        if (typeof label === "string") {
          neoMap[key] = (this.loader.realms[label] ??= /* @__PURE__ */Object.create(null))[key] ??= Symbol(key);
        } else if (label) {
          neoMap[key] = Symbol(key);
        }
      }
      for (const key in {
        ...ctx[Context$1.isolate],
        ...neoMap
      }) {
        if (neoMap[key] === ctx[Context$1.isolate][key]) continue;
        const self = /* @__PURE__ */Object.create(null);
        self[Context$1.filter] = ctx2 => {
          return ctx[Context$1.isolate][key] === ctx2[Context$1.isolate][key];
        };
        ctx.emit(self, "internal/before-service", key);
      }
      const oldMap = swapAssign(ctx[Context$1.isolate], neoMap);
      for (const key in {
        ...oldMap,
        ...ctx[Context$1.isolate]
      }) {
        if (oldMap[key] === ctx[Context$1.isolate][key]) continue;
        const self = /* @__PURE__ */Object.create(null);
        self[Context$1.filter] = ctx2 => {
          return ctx[Context$1.isolate][key] === ctx2[Context$1.isolate][key];
        };
        ctx.emit(self, "internal/service", key);
      }
    }
    // TODO: handle parent change
    update(parent, options) {
      this.options = options;
      if (!this.loader.isTruthyLike(options.when) || options.disabled) {
        this.stop();
      } else {
        this.start();
      }
    }
    async start() {
      if (this.fork) {
        this.isUpdate = true;
        this.amend(this.fork.parent);
        this.fork.update(this.options.config);
      } else {
        this.parent.emit("loader/entry", "apply", this);
        const plugin = await this.loader.resolve(this.options.name);
        if (!plugin) return;
        const ctx = this.parent.extend({
          [Context$1.intercept]: Object.create(this.parent[Context$1.intercept]),
          [Context$1.isolate]: Object.create(this.parent[Context$1.isolate])
        });
        this.amend(ctx);
        this.fork = ctx.plugin(plugin, this.loader.interpolate(this.options.config));
        this.fork.entry = this;
      }
    }
    stop() {
      if (!this.fork) return;
      this.parent.emit("loader/entry", "unload", this);
      this.fork.dispose();
      this.fork = null;
    }
  }, __name$7(_Class6, "Entry"), _Class6);
  function mapEntry(pluginsConf) {
    if (!pluginsConf) return [];
    return Object.entries(pluginsConf).map(([name, config]) => {
      let [realName, id] = name.split(":", 2);
      let disabled = false;
      if (realName.startsWith("~")) {
        realName = realName.slice(1);
        disabled = true;
      }
      return {
        id: id ?? randomID(),
        name: realName,
        config,
        disabled
      };
    });
  }
  __name$7(mapEntry, "mapEntry");
  var Loader$1 = (_Loader = class Loader extends Service {
    constructor(app, options) {
      super(app, "loader", true);
      // process
      _defineProperty(this, "baseDir", "./");
      // process.cwd()
      _defineProperty(this, "envData", {
        startTime: Date.now()
      });
      // public envData = process.env.CORDIS_SHARED
      //   ? JSON.parse(process.env.CORDIS_SHARED)
      //   : { startTime: Date.now() }
      _defineProperty(this, "params", {
        env: {}
        // process.env,
      });
      _defineProperty(this, "entryFork", void 0);
      _defineProperty(this, "suspend", false);
      _defineProperty(this, "writable", false);
      _defineProperty(this, "mimeType", void 0);
      _defineProperty(this, "filename", void 0);
      _defineProperty(this, "entries", /* @__PURE__ */Object.create(null));
      _defineProperty(this, "realms", /* @__PURE__ */Object.create(null));
      _defineProperty(this, "tasks", /* @__PURE__ */new Set());
      this.app = app;
      this.options = options;
      if (options.baseDir) this.baseDir = options.baseDir;
      this.realms.root = app.root[Context$1.isolate];
    }
    async import(name) {
      try {
        return __require(name);
      } catch (err) {
        this.app.emit("internal/error", err);
      }
    }
    async init(filename) {
      if (filename) {
        filename = `${trimSlash(this.baseDir.replaceAll("\\", "/"))}/${filename}`;
        if (!file.checkIsDir(filename)) {
          this.filename = filename;
          this.baseDir = filename.slice(0, filename.lastIndexOf("/"));
          const extname = filename.slice(filename.lastIndexOf("."));
          this.mimeType = writable[extname];
          if (!supported.has(extname)) {
            throw new Error(`extension "${extname}" not supported`);
          }
        } else {
          this.baseDir = filename;
          await this.findConfig();
        }
      } else {
        await this.findConfig();
      }
      if (this.mimeType && !this.options.immutable) {
        try {
          this.writable = true;
        } catch {}
      }
      this.app.provide("baseDir", this.baseDir, true);
    }
    async findConfig() {
      const files = file.getFilesList(this.baseDir);
      for (const extname of supported) {
        const filename = this.options.name + extname;
        if (files.includes(filename)) {
          this.mimeType = writable[extname];
          this.filename = `${trimSlash(this.baseDir.replaceAll("\\", "/"))}/${filename}`;
          return;
        }
      }
      throw new Error("config file not found");
    }
    async readConfig() {
      if (this.mimeType === "application/yaml") {
        this.config = load(file.readFrom(this.filename));
      } else if (this.mimeType === "application/json") {
        this.config = JSON.parse(file.readFrom(this.filename));
      }
      return this.config;
    }
    async writeConfig(silent = false) {
      this.suspend = true;
      if (!this.writable) {
        throw new Error(`cannot overwrite readonly config`);
      }
      if (this.mimeType === "application/yaml") {
        file.writeTo(this.filename, dump(this.config));
      } else if (this.mimeType === "application/json") {
        file.writeTo(this.filename, JSON.stringify(this.config, null, 2));
      }
      if (!silent) this.app.emit("config");
    }
    async reload() {
      const config = await this.readConfig();
      this.entryFork.update(mapEntry(config.plugins));
      this.app.emit("config");
    }
    interpolate(source) {
      if (typeof source === "string") {
        return interpolate(source, this.params, /\$\{\{(.+?)\}\}/g);
      } else if (!source || typeof source !== "object") {
        return source;
      } else if (Array.isArray(source)) {
        return source.map(item => this.interpolate(item));
      } else {
        return mapValues(source, item => this.interpolate(item));
      }
    }
    async resolve(name) {
      const task = this.import(name);
      this.tasks.add(task);
      task.finally(() => this.tasks.delete(task));
      return this.unwrapExports(await task);
    }
    isTruthyLike(expr) {
      if (isNullable(expr)) return true;
      return !!this.interpolate(`\${{ ${expr} }}`);
    }
    async update(parent, options) {
      if (!options.id) {
        do {
          options.id = randomID();
        } while (this.entries[options.id]);
      }
      const entry = this.entries[options.id] ??= new Entry(this, parent, options);
      entry.update(parent, options);
    }
    remove(parent, options) {
      const entry = this.entries[options.id];
      if (!entry) return;
      entry.stop();
      delete this.entries[options.id];
    }
    paths(scope) {
      if (scope === scope.parent.scope) return [];
      if (scope.runtime === scope) {
        return [].concat(...scope.runtime.children.map(child => this.paths(child)));
      }
      if (scope.entry) return [scope.entry.options.id];
      return this.paths(scope.parent.scope);
    }
    async start() {
      await this.readConfig();
      this.entryFork = this.app.plugin(group, mapEntry(this.config.plugins));
      this.app.on("dispose", () => {
        this.exit();
      });
      this.app.on("internal/update", fork => {
        const entry = this.entries[fork.entry?.options.id];
        if (!entry) return;
        fork.parent.emit("loader/entry", "reload", entry);
      });
      this.app.on("internal/before-update", (fork, config) => {
        if (!fork.entry) return;
        if (fork.entry.isUpdate) return fork.entry.isUpdate = false;
        const {
          schema
        } = fork.runtime;
        fork.entry.options.config = schema ? schema.simplify(config) : config;
        this.writeConfig();
      });
      this.app.on("internal/fork", fork => {
        if (fork.uid || !fork.entry) return;
        fork.parent.emit("loader/entry", "unload", fork.entry);
        if (!this.app.registry.has(fork.runtime.plugin)) return;
        fork.entry.options.disabled = true;
        this.writeConfig();
      });
      while (this.tasks.size) {
        await Promise.all(this.tasks);
      }
    }
    unwrapExports(module) {
      return module?.default || module;
    }
    exit() {}
  }, __name$7(_Loader, "Loader"), _Loader);
  function group(ctx, config) {
    for (const entry of config) {
      ctx.loader.update(ctx, entry);
    }
    ctx.accept(neo => {
      const old = ctx.scope.config;
      const oldMap = Object.fromEntries(old.map(entry => [entry.id, entry]));
      const neoMap = Object.fromEntries(neo.map(entry => [entry.id, entry]));
      for (const id in {
        ...oldMap,
        ...neoMap
      }) {
        if (!neoMap[id]) {
          ctx.loader.remove(ctx, oldMap[id]);
        } else {
          ctx.loader.update(ctx, neoMap[id]);
        }
      }
    }, {
      passive: true
    });
    ctx.on("dispose", () => {
      for (const entry of ctx.scope.config) {
        ctx.loader.remove(ctx, entry);
      }
    });
  }
  __name$7(group, "group");
  defineProperty(group, "inject", ["loader"]);
  defineProperty(group, "reusable", true);

  // src/index.ts
  var LoggerService = (_Service$invoke = Service.invoke, (_LoggerService2 = class _LoggerService extends Service {
    constructor(ctx) {
      super(ctx, "logger", true);
      ctx.on("internal/info", function (format, ...args) {
        this.logger("app").info(format, ...args);
      });
      ctx.on("internal/error", function (format, ...args) {
        this.logger("app").error(format, ...args);
      });
      ctx.on("internal/warning", function (format, ...args) {
        this.logger("app").warn(format, ...args);
      });
    }
    [_Service$invoke](name) {
      return new Logger$1(name, {
        [Context$1.trace]: this
      });
    }
  }, _defineProperty(_LoggerService2, "name", "logger"), (() => {
    for (const type of ["success", "error", "info", "warn", "debug", "extend"]) {
      _LoggerService2.prototype[type] = function (...args) {
        const caller = this[Context$1.trace];
        return this(caller.name)[type](...args);
      };
    }
  })(), _LoggerService2));
  var __defProp$6 = Object.defineProperty;
  var __name$6 = (target, value) => __defProp$6(target, "name", {
    value,
    configurable: true
  });
  var TimerService = (_Class7 = class TimerService extends Service {
    constructor(ctx) {
      super(ctx, "timer", true);
      ctx.mixin("timer", ["setTimeout", "setInterval", "sleep", "throttle", "debounce"]);
    }
    setTimeout(callback, delay) {
      const dispose = this[Context$1.trace].effect(() => {
        const timer = setTimeout(() => {
          dispose();
          callback();
        }, delay);
        return () => clearTimeout(timer);
      });
      return dispose;
    }
    setInterval(callback, delay) {
      return this[Context$1.trace].effect(() => {
        const timer = setInterval(callback, delay);
        return () => clearInterval(timer);
      });
    }
    sleep(delay) {
      const caller = this[Context$1.trace];
      return new Promise((resolve, reject) => {
        const dispose1 = this.setTimeout(() => {
          dispose1();
          dispose2();
          resolve();
        }, delay);
        const dispose2 = caller.on("dispose", () => {
          dispose1();
          dispose2();
          reject(new Error("Context has been disposed"));
        });
      });
    }
    createWrapper(callback, isDisposed = false) {
      const caller = this[Context$1.trace];
      caller.scope.assertActive();
      let timer;
      const dispose = /* @__PURE__ */__name$6(() => {
        isDisposed = true;
        remove(caller.scope.disposables, dispose);
        clearTimeout(timer);
      }, "dispose");
      const wrapper = /* @__PURE__ */__name$6((...args) => {
        clearTimeout(timer);
        timer = callback(args, () => !isDisposed && caller.scope.isActive);
      }, "wrapper");
      wrapper.dispose = dispose;
      caller.scope.disposables.push(dispose);
      return wrapper;
    }
    throttle(callback, delay, noTrailing) {
      let lastCall = -Infinity;
      const execute = /* @__PURE__ */__name$6((...args) => {
        lastCall = Date.now();
        callback(...args);
      }, "execute");
      return this.createWrapper((args, isActive) => {
        const now = Date.now();
        const remaining = delay - (now - lastCall);
        if (remaining <= 0) {
          execute(...args);
        } else if (isActive()) {
          return setTimeout(execute, remaining, ...args);
        }
      }, noTrailing);
    }
    debounce(callback, delay) {
      return this.createWrapper((args, isActive) => {
        if (!isActive()) return;
        return setTimeout(callback, delay, ...args);
      });
    }
  }, __name$6(_Class7, "TimerService"), _Class7);
  var __defProp$5 = Object.defineProperty;
  var __getOwnPropNames$1 = Object.getOwnPropertyNames;
  var __name$5 = (target, value) => __defProp$5(target, "name", {
    value,
    configurable: true
  });
  var __commonJS$1 = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = {
      exports: {}
    }).exports, mod), mod.exports;
  };
  var require_src$1 = __commonJS$1({
    "packages/schemastery/packages/core/src/index.ts"(exports, module) {
      var kSchema = Symbol.for("schemastery");
      globalThis.__schemastery_index__ ??= 0;
      var Schema = /* @__PURE__ */__name$5(function (options) {
        const schema = /* @__PURE__ */__name$5(function (data, options2) {
          return Schema.resolve(data, schema, options2)[0];
        }, "schema");
        if (options.refs) {
          const refs2 = mapValues(options.refs, options2 => new Schema(options2));
          const getRef = /* @__PURE__ */__name$5(uid => refs2[uid], "getRef");
          for (const key in refs2) {
            const options2 = refs2[key];
            options2.sKey = getRef(options2.sKey);
            options2.inner = getRef(options2.inner);
            options2.list = options2.list && options2.list.map(getRef);
            options2.dict = options2.dict && mapValues(options2.dict, getRef);
          }
          return refs2[options.uid];
        }
        Object.assign(schema, options);
        if (typeof schema.callback === "string") {
          try {
            schema.callback = new Function("return " + schema.callback)();
          } catch {}
        }
        Object.defineProperty(schema, "uid", {
          value: globalThis.__schemastery_index__++
        });
        Object.setPrototypeOf(schema, Schema.prototype);
        schema.meta ||= {};
        schema.toString = schema.toString.bind(schema);
        return schema;
      }, "Schema");
      Schema.prototype = Object.create(Function.prototype);
      Schema.prototype[kSchema] = true;
      var refs;
      Schema.prototype.toJSON = /* @__PURE__ */__name$5(function toJSON() {
        if (refs) {
          refs[this.uid] ??= JSON.parse(JSON.stringify({
            ...this
          }));
          return this.uid;
        }
        refs = {
          [this.uid]: {
            ...this
          }
        };
        refs[this.uid] = JSON.parse(JSON.stringify({
          ...this
        }));
        const result = {
          uid: this.uid,
          refs
        };
        refs = void 0;
        return result;
      }, "toJSON");
      Schema.prototype.set = /* @__PURE__ */__name$5(function set(key, value) {
        this.dict[key] = value;
        return this;
      }, "set");
      Schema.prototype.push = /* @__PURE__ */__name$5(function push(value) {
        this.list.push(value);
        return this;
      }, "push");
      function mergeDesc(original, messages) {
        const result = typeof original === "string" ? {
          "": original
        } : {
          ...original
        };
        for (const locale in messages) {
          const value = messages[locale];
          if (value?.$description || value?.$desc) {
            result[locale] = value.$description || value.$desc;
          } else if (typeof value === "string") {
            result[locale] = value;
          }
        }
        return result;
      }
      __name$5(mergeDesc, "mergeDesc");
      function getInner(value) {
        return value?.$value ?? value?.$inner;
      }
      __name$5(getInner, "getInner");
      function extractKeys(data) {
        return Object.fromEntries(Object.entries(data ?? {}).filter(([key]) => !key.startsWith("$")));
      }
      __name$5(extractKeys, "extractKeys");
      Schema.prototype.i18n = /* @__PURE__ */__name$5(function i18n(messages) {
        const schema = Schema(this);
        schema.meta.description = mergeDesc(schema.meta.description, messages);
        if (schema.dict) {
          schema.dict = mapValues(schema.dict, (inner, key) => {
            return inner.i18n(mapValues(messages, data => getInner(data)?.[key] ?? data?.[key]));
          });
        }
        if (schema.list) {
          schema.list = schema.list.map((inner, index) => {
            return inner.i18n(mapValues(messages, (data = {}) => {
              if (Array.isArray(getInner(data))) return getInner(data)[index];
              if (Array.isArray(data)) return data[index];
              return extractKeys(data);
            }));
          });
        }
        if (schema.inner) {
          schema.inner = schema.inner.i18n(mapValues(messages, data => {
            if (getInner(data)) return getInner(data);
            return extractKeys(data);
          }));
        }
        if (schema.sKey) {
          schema.sKey = schema.sKey.i18n(mapValues(messages, data => data?.$key));
        }
        return schema;
      }, "i18n");
      Schema.prototype.extra = /* @__PURE__ */__name$5(function extra(key, value) {
        const schema = Schema(this);
        schema.meta = {
          ...schema.meta,
          [key]: value
        };
        return schema;
      }, "extra");
      for (const key of ["required", "disabled", "collapse", "hidden", "loose"]) {
        Object.assign(Schema.prototype, {
          [key](value = true) {
            const schema = Schema(this);
            schema.meta = {
              ...schema.meta,
              [key]: value
            };
            return schema;
          }
        });
      }
      Schema.prototype.deprecated = /* @__PURE__ */__name$5(function deprecated() {
        const schema = Schema(this);
        schema.meta.badges ||= [];
        schema.meta.badges.push({
          text: "deprecated",
          type: "danger"
        });
        return schema;
      }, "deprecated");
      Schema.prototype.experimental = /* @__PURE__ */__name$5(function experimental() {
        const schema = Schema(this);
        schema.meta.badges ||= [];
        schema.meta.badges.push({
          text: "experimental",
          type: "warning"
        });
        return schema;
      }, "experimental");
      Schema.prototype.pattern = /* @__PURE__ */__name$5(function pattern(regexp) {
        const schema = Schema(this);
        const pattern2 = pick(regexp, ["source", "flags"]);
        schema.meta = {
          ...schema.meta,
          pattern: pattern2
        };
        return schema;
      }, "pattern");
      Schema.prototype.simplify = /* @__PURE__ */__name$5(function simplify(value) {
        if (deepEqual(value, this.meta.default)) return null;
        if (isNullable(value)) return value;
        if (this.type === "object" || this.type === "dict") {
          const result = {};
          for (const key in value) {
            const schema = this.type === "object" ? this.dict[key] : this.inner;
            const item = schema?.simplify(value[key]);
            if (!isNullable(item)) result[key] = item;
          }
          return result;
        } else if (this.type === "array" || this.type === "tuple") {
          const result = [];
          value.forEach((value2, index) => {
            const schema = this.type === "array" ? this.inner : this.list[index];
            const item = schema ? schema.simplify(value2) : value2;
            result.push(item);
          });
          return result;
        } else if (this.type === "intersect") {
          const result = {};
          for (const item of this.list) {
            Object.assign(result, item.simplify(value));
          }
          return result;
        } else if (this.type === "union") {
          for (const schema of this.list) {
            try {
              Schema.resolve(value, schema);
              return schema.simplify(value);
            } catch {}
          }
        }
        return value;
      }, "simplify");
      Schema.prototype.toString = /* @__PURE__ */__name$5(function toString(inline) {
        return formatters[this.type]?.(this, inline) ?? `Schema<${this.type}>`;
      }, "toString");
      Schema.prototype.role = /* @__PURE__ */__name$5(function role(role, extra) {
        const schema = Schema(this);
        schema.meta = {
          ...schema.meta,
          role,
          extra
        };
        return schema;
      }, "role");
      for (const key of ["default", "link", "comment", "description", "max", "min", "step"]) {
        Object.assign(Schema.prototype, {
          [key](value) {
            const schema = Schema(this);
            schema.meta = {
              ...schema.meta,
              [key]: value
            };
            return schema;
          }
        });
      }
      var resolvers = {};
      Schema.extend = /* @__PURE__ */__name$5(function extend(type, resolve) {
        resolvers[type] = resolve;
      }, "extend");
      Schema.resolve = /* @__PURE__ */__name$5(function resolve(data, schema, options = {}, strict = false) {
        if (!schema) return [data];
        if (isNullable(data)) {
          if (schema.meta.required) throw new TypeError(`missing required value`);
          let current = schema;
          let fallback = schema.meta.default;
          while (current?.type === "intersect" && isNullable(fallback)) {
            current = current.list[0];
            fallback = current?.meta.default;
          }
          if (isNullable(fallback)) return [data];
          data = clone(fallback);
        }
        const callback = resolvers[schema.type];
        if (!callback) throw new TypeError(`unsupported type "${schema.type}"`);
        try {
          return callback(data, schema, options, strict);
        } catch (error) {
          if (!schema.meta.loose) throw error;
          return [schema.meta.default];
        }
      }, "resolve");
      Schema.from = /* @__PURE__ */__name$5(function from(source) {
        if (isNullable(source)) {
          return Schema.any();
        } else if (["string", "number", "boolean"].includes(typeof source)) {
          return Schema.const(source).required();
        } else if (source[kSchema]) {
          return source;
        } else if (typeof source === "function") {
          switch (source) {
            case String:
              return Schema.string().required();
            case Number:
              return Schema.number().required();
            case Boolean:
              return Schema.boolean().required();
            case Function:
              return Schema.function().required();
            default:
              return Schema.is(source).required();
          }
        } else {
          throw new TypeError(`cannot infer schema from ${source}`);
        }
      }, "from");
      Schema.natural = /* @__PURE__ */__name$5(function natural() {
        return Schema.number().step(1).min(0);
      }, "natural");
      Schema.percent = /* @__PURE__ */__name$5(function percent() {
        return Schema.number().step(0.01).min(0).max(1).role("slider");
      }, "percent");
      Schema.date = /* @__PURE__ */__name$5(function date() {
        return Schema.union([Schema.is(Date), Schema.transform(Schema.string().role("datetime"), value => {
          const date2 = new Date(value);
          if (isNaN(+date2)) throw new TypeError(`invalid date "${value}"`);
          return date2;
        }, true)]);
      }, "date");
      Schema.extend("any", data => {
        return [data];
      });
      Schema.extend("never", data => {
        throw new TypeError(`expected nullable but got ${data}`);
      });
      Schema.extend("const", (data, {
        value
      }) => {
        if (data === value) return [value];
        throw new TypeError(`expected ${value} but got ${data}`);
      });
      function checkWithinRange(data, meta, description) {
        const {
          max = Infinity,
          min = -Infinity
        } = meta;
        if (data > max) throw new TypeError(`expected ${description} <= ${max} but got ${data}`);
        if (data < min) throw new TypeError(`expected ${description} >= ${min} but got ${data}`);
      }
      __name$5(checkWithinRange, "checkWithinRange");
      Schema.extend("string", (data, {
        meta
      }) => {
        if (typeof data !== "string") throw new TypeError(`expected string but got ${data}`);
        if (meta.pattern) {
          const regexp = new RegExp(meta.pattern.source, meta.pattern.flags);
          if (!regexp.test(data)) throw new TypeError(`expect string to match regexp ${regexp}`);
        }
        checkWithinRange(data.length, meta, "string length");
        return [data];
      });
      function decimalShift(data, digits) {
        const str = data.toString();
        if (str.includes("e")) return data * Math.pow(10, digits);
        const index = str.indexOf(".");
        if (index === -1) return data * Math.pow(10, digits);
        const frac = str.slice(index + 1);
        const integer = str.slice(0, index);
        if (frac.length <= digits) return +(integer + frac.padEnd(digits, "0"));
        return +(integer + frac.slice(0, digits) + "." + frac.slice(digits));
      }
      __name$5(decimalShift, "decimalShift");
      function isMultipleOf(data, min, step) {
        step = Math.abs(step);
        if (!/^\d+\.\d+$/.test(step.toString())) {
          return (data - min) % step === 0;
        }
        const index = step.toString().indexOf(".");
        const digits = step.toString().slice(index + 1).length;
        return Math.abs(decimalShift(data, digits) - decimalShift(min, digits)) % decimalShift(step, digits) === 0;
      }
      __name$5(isMultipleOf, "isMultipleOf");
      Schema.extend("number", (data, {
        meta
      }) => {
        if (typeof data !== "number") throw new TypeError(`expected number but got ${data}`);
        checkWithinRange(data, meta, "number");
        const {
          step
        } = meta;
        if (step && !isMultipleOf(data, meta.min ?? 0, step)) {
          throw new TypeError(`expected number multiple of ${step} but got ${data}`);
        }
        return [data];
      });
      Schema.extend("boolean", data => {
        if (typeof data === "boolean") return [data];
        throw new TypeError(`expected boolean but got ${data}`);
      });
      Schema.extend("bitset", (data, {
        bits,
        meta
      }) => {
        let value = 0,
          keys = [];
        if (typeof data === "number") {
          value = data;
          for (const key in bits) {
            if (data & bits[key]) {
              keys.push(key);
            }
          }
        } else if (Array.isArray(data)) {
          keys = data;
          for (const key of keys) {
            if (typeof key !== "string") throw new TypeError(`expected string but got ${key}`);
            if (key in bits) value |= bits[key];
          }
        } else {
          throw new TypeError(`expected number or array but got ${data}`);
        }
        if (value === meta.default) return [value];
        return [value, keys];
      });
      Schema.extend("function", data => {
        if (typeof data === "function") return [data];
        throw new TypeError(`expected function but got ${data}`);
      });
      Schema.extend("is", (data, {
        callback
      }) => {
        if (data instanceof callback) return [data];
        throw new TypeError(`expected ${callback.name} but got ${data}`);
      });
      function property(data, key, schema, options) {
        try {
          const [value, adapted] = Schema.resolve(data[key], schema, options);
          if (adapted !== void 0) data[key] = adapted;
          return value;
        } catch (e) {
          if (!options?.autofix) throw e;
          delete data[key];
          return schema.meta.default;
        }
      }
      __name$5(property, "property");
      Schema.extend("array", (data, {
        inner,
        meta
      }, options) => {
        if (!Array.isArray(data)) throw new TypeError(`expected array but got ${data}`);
        checkWithinRange(data.length, meta, "array length");
        return [data.map((_, index) => property(data, index, inner, options))];
      });
      Schema.extend("dict", (data, {
        inner,
        sKey
      }, options, strict) => {
        if (!isPlainObject(data)) throw new TypeError(`expected object but got ${data}`);
        const result = {};
        for (const key in data) {
          let rKey;
          try {
            rKey = Schema.resolve(key, sKey)[0];
          } catch (error) {
            if (strict) continue;
            throw error;
          }
          result[rKey] = property(data, key, inner, options);
          data[rKey] = data[key];
          if (key !== rKey) delete data[key];
        }
        return [result];
      });
      Schema.extend("tuple", (data, {
        list
      }, options, strict) => {
        if (!Array.isArray(data)) throw new TypeError(`expected array but got ${data}`);
        const result = list.map((inner, index) => property(data, index, inner, options));
        if (strict) return [result];
        result.push(...data.slice(list.length));
        return [result];
      });
      function merge(result, data) {
        for (const key in data) {
          if (key in result) continue;
          result[key] = data[key];
        }
      }
      __name$5(merge, "merge");
      Schema.extend("object", (data, {
        dict
      }, options, strict) => {
        if (!isPlainObject(data)) throw new TypeError(`expected object but got ${data}`);
        const result = {};
        for (const key in dict) {
          const value = property(data, key, dict[key], options);
          if (!isNullable(value) || key in data) {
            result[key] = value;
          }
        }
        if (!strict) merge(result, data);
        return [result];
      });
      Schema.extend("union", (data, {
        list,
        toString
      }, options, strict) => {
        for (const inner of list) {
          try {
            return Schema.resolve(data, inner, options, strict);
          } catch (error) {}
        }
        throw new TypeError(`expected ${toString()} but got ${JSON.stringify(data)}`);
      });
      Schema.extend("intersect", (data, {
        list,
        toString
      }, options, strict) => {
        let result;
        for (const inner of list) {
          const value = Schema.resolve(data, inner, options, true)[0];
          if (isNullable(value)) continue;
          if (isNullable(result)) {
            result = value;
          } else if (typeof result !== typeof value) {
            throw new TypeError(`expected ${toString()} but got ${JSON.stringify(data)}`);
          } else if (typeof value === "object") {
            merge(result ??= {}, value);
          } else if (result !== value) {
            throw new TypeError(`expected ${toString()} but got ${JSON.stringify(data)}`);
          }
        }
        if (!strict && isPlainObject(data)) merge(result, data);
        return [result];
      });
      Schema.extend("transform", (data, {
        inner,
        callback,
        preserve
      }, options) => {
        const [result, adapted = data] = Schema.resolve(data, inner, options, true);
        if (preserve) {
          return [callback(result)];
        } else {
          return [callback(result), callback(adapted)];
        }
      });
      var formatters = {};
      function defineMethod(name, keys, format) {
        formatters[name] = format;
        Object.assign(Schema, {
          [name](...args) {
            const schema = new Schema({
              type: name
            });
            keys.forEach((key, index) => {
              switch (key) {
                case "sKey":
                  schema.sKey = args[index] ?? Schema.string();
                  break;
                case "inner":
                  schema.inner = Schema.from(args[index]);
                  break;
                case "list":
                  schema.list = args[index].map(Schema.from);
                  break;
                case "dict":
                  schema.dict = mapValues(args[index], Schema.from);
                  break;
                case "bits":
                  {
                    schema.bits = {};
                    for (const key2 in args[index]) {
                      if (typeof args[index][key2] !== "number") continue;
                      schema.bits[key2] = args[index][key2];
                    }
                    break;
                  }
                case "callback":
                  {
                    schema.callback = args[index];
                    schema.callback["toJSON"] ||= () => schema.callback.toString();
                    break;
                  }
                default:
                  schema[key] = args[index];
              }
            });
            if (name === "object" || name === "dict") {
              schema.meta.default = {};
            } else if (name === "array" || name === "tuple") {
              schema.meta.default = [];
            } else if (name === "bitset") {
              schema.meta.default = 0;
            }
            return schema;
          }
        });
      }
      __name$5(defineMethod, "defineMethod");
      defineMethod("is", ["callback"], ({
        callback
      }) => callback.name);
      defineMethod("any", [], () => "any");
      defineMethod("never", [], () => "never");
      defineMethod("const", ["value"], ({
        value
      }) => typeof value === "string" ? JSON.stringify(value) : value);
      defineMethod("string", [], () => "string");
      defineMethod("number", [], () => "number");
      defineMethod("boolean", [], () => "boolean");
      defineMethod("bitset", ["bits"], () => "bitset");
      defineMethod("function", [], () => "function");
      defineMethod("array", ["inner"], ({
        inner
      }) => `${inner.toString(true)}[]`);
      defineMethod("dict", ["inner", "sKey"], ({
        inner,
        sKey
      }) => `{ [key: ${sKey.toString()}]: ${inner.toString()} }`);
      defineMethod("tuple", ["list"], ({
        list
      }) => `[${list.map(inner => inner.toString()).join(", ")}]`);
      defineMethod("object", ["dict"], ({
        dict
      }) => {
        if (Object.keys(dict).length === 0) return "{}";
        return `{ ${Object.entries(dict).map(([key, inner]) => {
        return `${key}${inner.meta.required ? "" : "?"}: ${inner.toString()}`;
      }).join(", ")} }`;
      });
      defineMethod("union", ["list"], ({
        list
      }, inline) => {
        const result = list.map(({
          toString: format
        }) => format()).join(" | ");
        return inline ? `(${result})` : result;
      });
      defineMethod("intersect", ["list"], ({
        list
      }) => {
        return `${list.map(inner => inner.toString(true)).join(" & ")}`;
      });
      defineMethod("transform", ["inner", "callback", "preserve"], ({
        inner
      }, isInner) => inner.toString(isInner));
      module.exports = Schema;
    }
  });
  var z2 = require_src$1();
  var __defProp$4 = Object.defineProperty;
  var __name$4 = (target, value) => __defProp$4(target, "name", {
    value,
    configurable: true
  });
  var Context2 = (_Class8 = class Context2 extends Context$1 {
    constructor(config) {
      super(config);
      _defineProperty(this, "baseDir", void 0);
      this.baseDir = globalThis.process?.cwd() || "";
      this.provide("logger", void 0, true);
      this.provide("timer", void 0, true);
      this.plugin(LoggerService);
      this.plugin(TimerService);
    }
  }, __name$4(_Class8, "Context"), _Class8);
  var Service2$1 = (_Service$setup = Service.setup, (_Service3 = class Service2 extends Service {
    constructor(...args) {
      super(...args);
      /** @deprecated use `this.ctx.logger` instead */
      _defineProperty(this, "logger", void 0);
      this.logger = this.ctx.logger(this.name);
    }
    [_Service$setup]() {
      this.ctx = new Context2();
    }
  }, __name$4(_Service3, "Service"), _Service3));

  // src/index.ts
  function src_default() {}
  __name$4(src_default, "default");
  const inject = ["loader"];
  function apply(ctx, config = {}) {
    ctx.on("loader/entry", (type, entry) => {
      ctx.logger("loader").info("%s plugin %c", type, entry.options.name);
    });
    ctx.loader.prolog = [];
    Logger$1.targets.push({
      colors: 3,
      record: record => {
        ctx.loader.prolog.push(record);
        ctx.loader.prolog = ctx.loader.prolog.slice(-1000);
      }
    });
    const {
      levels
    } = config;
    if (typeof levels === "object") {
      Logger$1.levels = levels;
    } else if (typeof levels === "number") {
      Logger$1.levels.base = levels;
    }
    let {
      showTime
    } = config;
    if (showTime === true) showTime = "yyyy-MM-dd hh:mm:ss";
    if (showTime) Logger$1.targets[0].showTime = showTime;
    Logger$1.targets[0].showDiff = config.showDiff;
    function ensureBaseLevel(conf, base) {
      conf.base ?? (conf.base = base);
      Object.values(config).forEach(value => {
        if (typeof value !== "object") return;
        ensureBaseLevel(value, conf.base);
      });
    }
    ensureBaseLevel(Logger$1.levels, 2);
    Logger$1.targets[0].timestamp = Date.now();
  }
  var Logger = /*#__PURE__*/Object.freeze({
    __proto__: null,
    apply: apply,
    inject: inject
  });
  class Loader extends Loader$1 {
    async import(name) {
      const base = trimSlash(this.options.requireBase ?? this.options.baseDir ?? "");
      try {
        return require(`${base}/${name}`);
      } catch (err) {
        this.app.emit("internal/error", err);
      }
      return undefined;
    }
    async reload() {
      const config = await this.readConfig();
      this.entryFork.update(config);
      this.app.emit("config");
    }
  }
  async function start(options) {
    const ctx = new Context2();
    ctx.plugin(Loader, options);
    await ctx.loader.init();
    if (options.logger) ctx.plugin(Logger, options.logger);
    await ctx.start();
  }
  var __defProp$3 = Object.defineProperty;
  var __name$3 = (target, value) => __defProp$3(target, "name", {
    value,
    configurable: true
  });

  // src/index.ts
  function Field(name) {
    return {
      name
    };
  }
  __name$3(Field, "Field");
  function Method(name, fields) {
    return {
      name,
      fields: fields.map(Field)
    };
  }
  __name$3(Method, "Method");
  var Methods = {
    "channel.get": Method("getChannel", ["channel_id", "guild_id"]),
    "channel.list": Method("getChannelList", ["guild_id", "next"]),
    "channel.create": Method("createChannel", ["guild_id", "data"]),
    "channel.update": Method("updateChannel", ["channel_id", "data"]),
    "channel.delete": Method("deleteChannel", ["channel_id"]),
    "channel.mute": Method("muteChannel", ["channel_id", "guild_id", "enable"]),
    "message.create": Method("createMessage", ["channel_id", "content"]),
    "message.update": Method("editMessage", ["channel_id", "message_id", "content"]),
    "message.delete": Method("deleteMessage", ["channel_id", "message_id"]),
    "message.get": Method("getMessage", ["channel_id", "message_id"]),
    "message.list": Method("getMessageList", ["channel_id", "next"]),
    "reaction.create": Method("createReaction", ["channel_id", "message_id", "emoji"]),
    "reaction.delete": Method("deleteReaction", ["channel_id", "message_id", "emoji", "user_id"]),
    "reaction.clear": Method("clearReaction", ["channel_id", "message_id", "emoji"]),
    "reaction.list": Method("getReactionList", ["channel_id", "message_id", "emoji", "next"]),
    "guild.get": Method("getGuild", ["guild_id"]),
    "guild.list": Method("getGuildList", ["next"]),
    "guild.member.get": Method("getGuildMember", ["guild_id", "user_id"]),
    "guild.member.list": Method("getGuildMemberList", ["guild_id", "next"]),
    "guild.member.kick": Method("kickGuildMember", ["guild_id", "user_id", "permanent"]),
    "guild.member.mute": Method("muteGuildMember", ["guild_id", "user_id", "duration", "reason"]),
    "guild.member.role.set": Method("setGuildMemberRole", ["guild_id", "user_id", "role_id"]),
    "guild.member.role.unset": Method("unsetGuildMemberRole", ["guild_id", "user_id", "role_id"]),
    "guild.role.list": Method("getGuildRoleList", ["guild_id", "next"]),
    "guild.role.create": Method("createGuildRole", ["guild_id", "data"]),
    "guild.role.update": Method("updateGuildRole", ["guild_id", "role_id", "data"]),
    "guild.role.delete": Method("deleteGuildRole", ["guild_id", "role_id"]),
    "login.get": Method("getLogin", []),
    "user.get": Method("getUser", ["user_id"]),
    "user.channel.create": Method("createDirectChannel", ["user_id", "guild_id"]),
    "friend.list": Method("getFriendList", ["next"]),
    "friend.delete": Method("deleteFriend", ["user_id"]),
    "friend.approve": Method("handleFriendRequest", ["message_id", "approve", "comment"]),
    "guild.approve": Method("handleGuildRequest", ["message_id", "approve", "comment"]),
    "guild.member.approve": Method("handleGuildMemberRequest", ["message_id", "approve", "comment"])
  };
  var Channel;
  (Channel2 => {
    (Type2 => {
      Type2[Type2["TEXT"] = 0] = "TEXT";
      Type2[Type2["DIRECT"] = 1] = "DIRECT";
      Type2[Type2["VOICE"] = 2] = "VOICE";
      Type2[Type2["CATEGORY"] = 3] = "CATEGORY";
    })(Channel2.Type || (Channel2.Type = {}));
  })(Channel || (Channel = {}));
  var Status = /* @__PURE__ */(Status2 => {
    Status2[Status2["OFFLINE"] = 0] = "OFFLINE";
    Status2[Status2["ONLINE"] = 1] = "ONLINE";
    Status2[Status2["CONNECT"] = 2] = "CONNECT";
    Status2[Status2["DISCONNECT"] = 3] = "DISCONNECT";
    Status2[Status2["RECONNECT"] = 4] = "RECONNECT";
    return Status2;
  })(Status || {});
  var Opcode = /* @__PURE__ */(Opcode2 => {
    Opcode2[Opcode2["EVENT"] = 0] = "EVENT";
    Opcode2[Opcode2["PING"] = 1] = "PING";
    Opcode2[Opcode2["PONG"] = 2] = "PONG";
    Opcode2[Opcode2["IDENTIFY"] = 3] = "IDENTIFY";
    Opcode2[Opcode2["READY"] = 4] = "READY";
    return Opcode2;
  })(Opcode || {});
  var WebSocket$1;
  (WebSocket2 => {
    WebSocket2.CONNECTING = 0;
    WebSocket2.OPEN = 1;
    WebSocket2.CLOSING = 2;
    WebSocket2.CLOSED = 3;
  })(WebSocket$1 || (WebSocket$1 = {}));
  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Channel() {
      return Channel;
    },
    Methods: Methods,
    Opcode: Opcode,
    Status: Status,
    get WebSocket() {
      return WebSocket$1;
    }
  });
  var __defProp$2 = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __name$2 = (target, value) => __defProp$2(target, "name", {
    value,
    configurable: true
  });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = {
      exports: {}
    }).exports, mod), mod.exports;
  };
  var require_src = __commonJS({
    "src/index.ts"(exports, module) {
      var _Class9;
      var kElement = Symbol.for("satori.element");
      var ElementConstructor = (_Class9 = class ElementConstructor {
        get data() {
          return this.attrs;
        }
        getTagName() {
          if (this.type === "component") {
            return this.attrs.is?.name ?? "component";
          } else {
            return this.type;
          }
        }
        toAttrString() {
          return Object.entries(this.attrs).map(([key, value]) => {
            if (isNullable(value)) return "";
            key = hyphenate(key);
            if (value === true) return ` ${key}`;
            if (value === false) return ` no-${key}`;
            return ` ${key}="${Element.escape("" + value, true)}"`;
          }).join("");
        }
        toString(strip = false) {
          if (this.type === "text" && "content" in this.attrs) {
            return strip ? this.attrs.content : Element.escape(this.attrs.content);
          }
          const inner = this.children.map(child => child.toString(strip)).join("");
          if (strip) return inner;
          const attrs = this.toAttrString();
          const tag = this.getTagName();
          if (!this.children.length) return `<${tag}${attrs}/>`;
          return `<${tag}${attrs}>${inner}</${tag}>`;
        }
      }, __name$2(_Class9, "ElementConstructor"), _Class9);
      defineProperty(ElementConstructor, "name", "Element");
      defineProperty(ElementConstructor.prototype, kElement, true);
      function Element(type, ...args) {
        const el = Object.create(ElementConstructor.prototype);
        const attrs = {},
          children = [];
        if (args[0] && typeof args[0] === "object" && !Element.isElement(args[0]) && !Array.isArray(args[0])) {
          const props = args.shift();
          for (const [key, value] of Object.entries(props)) {
            if (isNullable(value)) continue;
            if (key === "children") {
              args.push(...makeArray(value));
            } else {
              attrs[camelize(key)] = value;
            }
          }
        }
        for (const child of args) {
          children.push(...Element.toElementArray(child));
        }
        if (typeof type === "function") {
          attrs.is = type;
          type = "component";
        }
        return Object.assign(el, {
          type,
          attrs,
          children
        });
      }
      __name$2(Element, "Element");
      var evaluate = new Function("expr", "context", `
  try {
    with (context) {
      return eval(expr)
    }
  } catch {}
`);
      (Element2 => {
        Element2.jsx = Element2;
        Element2.jsxs = Element2;
        Element2.jsxDEV = Element2;
        Element2.Fragment = "template";
        function isElement(source) {
          return source && typeof source === "object" && source[kElement];
        }
        Element2.isElement = isElement;
        __name$2(isElement, "isElement");
        function toElement(content) {
          if (typeof content === "string" || typeof content === "number" || typeof content === "boolean") {
            content = "" + content;
            if (content) return Element2("text", {
              content
            });
          } else if (isElement(content)) {
            return content;
          } else if (!isNullable(content)) {
            throw new TypeError(`Invalid content: ${content}`);
          }
        }
        Element2.toElement = toElement;
        __name$2(toElement, "toElement");
        function toElementArray(content) {
          if (Array.isArray(content)) {
            return content.map(toElement).filter(x => x);
          } else {
            return [toElement(content)].filter(x => x);
          }
        }
        Element2.toElementArray = toElementArray;
        __name$2(toElementArray, "toElementArray");
        function normalize(source, context) {
          return typeof source === "string" ? parse(source, context) : toElementArray(source);
        }
        Element2.normalize = normalize;
        __name$2(normalize, "normalize");
        function escape(source, inline = false) {
          const result = source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return inline ? result.replace(/"/g, "&quot;") : result;
        }
        Element2.escape = escape;
        __name$2(escape, "escape");
        function unescape(source) {
          return source.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, code) => code === "38" ? _ : String.fromCharCode(+code)).replace(/&#x([0-9a-f]+);/gi, (_, code) => code === "26" ? _ : String.fromCharCode(parseInt(code, 16))).replace(/&(amp|#38|#x26);/g, "&");
        }
        Element2.unescape = unescape;
        __name$2(unescape, "unescape");
        function from(source, options = {}) {
          const elements = parse(source);
          if (options.caret) {
            if (options.type && elements[0]?.type !== options.type) return;
            return elements[0];
          }
          return select(elements, options.type || "*")[0];
        }
        Element2.from = from;
        __name$2(from, "from");
        const combRegExp = / *([ >+~]) */g;
        function parseSelector(input) {
          return input.split(",").map(query => {
            const selectors = [];
            query = query.trim();
            let combCap,
              combinator = " ";
            while (combCap = combRegExp.exec(query)) {
              selectors.push({
                type: query.slice(0, combCap.index),
                combinator
              });
              combinator = combCap[1];
              query = query.slice(combCap.index + combCap[0].length);
            }
            selectors.push({
              type: query,
              combinator
            });
            return selectors;
          });
        }
        Element2.parseSelector = parseSelector;
        __name$2(parseSelector, "parseSelector");
        function select(source, query) {
          if (!source || !query) return [];
          if (typeof source === "string") source = parse(source);
          if (typeof query === "string") query = parseSelector(query);
          if (!query.length) return [];
          let adjacent = [];
          const results = [];
          for (const [index, element] of source.entries()) {
            const inner = [];
            const local = [...query, ...adjacent];
            adjacent = [];
            let matched = false;
            for (const group of local) {
              const {
                type,
                combinator
              } = group[0];
              if (type === element.type || type === "*") {
                if (group.length === 1) {
                  matched = true;
                } else if ([" ", ">"].includes(group[1].combinator)) {
                  inner.push(group.slice(1));
                } else if (group[1].combinator === "+") {
                  adjacent.push(group.slice(1));
                } else {
                  query.push(group.slice(1));
                }
              }
              if (combinator === " ") {
                inner.push(group);
              }
            }
            if (matched) results.push(source[index]);
            results.push(...select(element.children, inner));
          }
          return results;
        }
        Element2.select = select;
        __name$2(select, "select");
        function interpolate(expr, context) {
          expr = expr.trim();
          if (!/^[\w.]+$/.test(expr)) {
            return evaluate(expr, context) ?? "";
          }
          let value = context;
          for (const part of expr.split(".")) {
            value = value[part];
            if (isNullable(value)) return "";
          }
          return value ?? "";
        }
        Element2.interpolate = interpolate;
        __name$2(interpolate, "interpolate");
        const tagRegExp1 = /(?<comment><!--[\s\S]*?-->)|(?<tag><(\/?)([^!\s>/]*)([^>]*?)\s*(\/?)>)/;
        const tagRegExp2 = /(?<comment><!--[\s\S]*?-->)|(?<tag><(\/?)([^!\s>/]*)([^>]*?)\s*(\/?)>)|(?<curly>\{(?<derivative>[@:/#][^\s}]*)?[\s\S]*?\})/;
        const attrRegExp1 = /([^\s=]+)(?:="(?<value1>[^"]*)"|='(?<value2>[^']*)')?/g;
        const attrRegExp2 = /([^\s=]+)(?:="(?<value1>[^"]*)"|='(?<value2>[^']*)'|=(?<curly>\{([^}]+)\}))?/g;
        let Position;
        (Position2 => {
          Position2[Position2["OPEN"] = 0] = "OPEN";
          Position2[Position2["CLOSE"] = 1] = "CLOSE";
          Position2[Position2["EMPTY"] = 2] = "EMPTY";
          Position2[Position2["CONTINUE"] = 3] = "CONTINUE";
        })(Position || (Position = {}));
        function parse(source, context) {
          const tokens = [];
          function pushText(content) {
            if (content) tokens.push(content);
          }
          __name$2(pushText, "pushText");
          const tagRegExp = context ? tagRegExp2 : tagRegExp1;
          let tagCap;
          let trimStart = true;
          while (tagCap = tagRegExp.exec(source)) {
            const trimEnd = !tagCap.groups.curly;
            parseContent(source.slice(0, tagCap.index), trimStart, trimEnd);
            trimStart = trimEnd;
            source = source.slice(tagCap.index + tagCap[0].length);
            const [_,,, close, type, extra, empty] = tagCap;
            if (tagCap.groups.comment) continue;
            if (tagCap.groups.curly) {
              let name = "",
                position = 2 /* EMPTY */;
              if (tagCap.groups.derivative) {
                name = tagCap.groups.derivative.slice(1);
                position = {
                  "@": 2 /* EMPTY */,
                  "#": 0 /* OPEN */,
                  "/": 1 /* CLOSE */,
                  ":": 3 /* CONTINUE */
                }[tagCap.groups.derivative[0]];
              }
              tokens.push({
                type: "curly",
                name,
                position,
                source: tagCap.groups.curly,
                extra: tagCap.groups.curly.slice(1 + (tagCap.groups.derivative ?? "").length, -1)
              });
              continue;
            }
            tokens.push({
              type: "angle",
              source: _,
              name: type || Element2.Fragment,
              position: close ? 1 /* CLOSE */ : empty ? 2 /* EMPTY */ : 0 /* OPEN */,
              extra
            });
          }
          parseContent(source, trimStart, true);
          function parseContent(source2, trimStart2, trimEnd) {
            source2 = unescape(source2);
            if (trimStart2) source2 = source2.replace(/^\s*\n\s*/, "");
            if (trimEnd) source2 = source2.replace(/\s*\n\s*$/, "");
            pushText(source2);
          }
          __name$2(parseContent, "parseContent");
          return parseTokens(foldTokens(tokens), context);
        }
        Element2.parse = parse;
        __name$2(parse, "parse");
        function foldTokens(tokens) {
          const stack = [[{
            type: "angle",
            name: Element2.Fragment,
            position: 0 /* OPEN */,
            source: "",
            extra: "",
            children: {
              default: []
            }
          }, "default"]];
          function pushToken(...tokens2) {
            const [token, slot] = stack[0];
            token.children[slot].push(...tokens2);
          }
          __name$2(pushToken, "pushToken");
          for (const token of tokens) {
            if (typeof token === "string") {
              pushToken(token);
              continue;
            }
            const {
              name,
              position
            } = token;
            if (position === 1 /* CLOSE */) {
              if (stack[0][0].name === name) {
                stack.shift();
              }
            } else if (position === 3 /* CONTINUE */) {
              stack[0][0].children[name] = [];
              stack[0][1] = name;
            } else if (position === 0 /* OPEN */) {
              pushToken(token);
              token.children = {
                default: []
              };
              stack.unshift([token, "default"]);
            } else {
              pushToken(token);
            }
          }
          return stack[stack.length - 1][0].children.default;
        }
        __name$2(foldTokens, "foldTokens");
        function parseTokens(tokens, context) {
          const result = [];
          for (const token of tokens) {
            if (typeof token === "string") {
              result.push(Element2("text", {
                content: token
              }));
            } else if (token.type === "angle") {
              const attrs = {};
              const attrRegExp = context ? attrRegExp2 : attrRegExp1;
              let attrCap;
              while (attrCap = attrRegExp.exec(token.extra)) {
                const [, key, v1, v2 = v1, v3] = attrCap;
                if (v3) {
                  attrs[key] = interpolate(v3, context);
                } else if (!isNullable(v2)) {
                  attrs[key] = unescape(v2);
                } else if (key.startsWith("no-")) {
                  attrs[key.slice(3)] = false;
                } else {
                  attrs[key] = true;
                }
              }
              result.push(Element2(token.name, attrs, token.children && parseTokens(token.children.default, context)));
            } else if (!token.name) {
              result.push(...toElementArray(interpolate(token.extra, context)));
            } else if (token.name === "if") {
              if (evaluate(token.extra, context)) {
                result.push(...parseTokens(token.children.default, context));
              } else {
                result.push(...parseTokens(token.children.else || [], context));
              }
            } else if (token.name === "each") {
              const [expr, ident] = token.extra.split(/\s+as\s+/);
              const items = interpolate(expr, context);
              if (!items || !items[Symbol.iterator]) continue;
              for (const item of items) {
                result.push(...parseTokens(token.children.default, {
                  ...context,
                  [ident]: item
                }));
              }
            }
          }
          return result;
        }
        __name$2(parseTokens, "parseTokens");
        function visit(element, rules, session) {
          const {
            type,
            attrs,
            children
          } = element;
          if (typeof rules === "function") {
            return rules(element, session);
          } else {
            let result = rules[typeof type === "string" ? type : ""] ?? rules.default ?? true;
            if (typeof result === "function") {
              result = result(attrs, children, session);
            }
            return result;
          }
        }
        __name$2(visit, "visit");
        function transform(source, rules, session) {
          const elements = typeof source === "string" ? parse(source) : source;
          const output = [];
          elements.forEach(element => {
            const {
              type,
              attrs,
              children
            } = element;
            const result = visit(element, rules, session);
            if (result === true) {
              output.push(Element2(type, attrs, transform(children, rules, session)));
            } else if (result !== false) {
              output.push(...toElementArray(result));
            }
          });
          return typeof source === "string" ? output.join("") : output;
        }
        Element2.transform = transform;
        __name$2(transform, "transform");
        async function transformAsync(source, rules, session) {
          const elements = typeof source === "string" ? parse(source) : source;
          const children = (await Promise.all(elements.map(async element => {
            const {
              type,
              attrs,
              children: children2
            } = element;
            const result = await visit(element, rules, session);
            if (result === true) {
              return [Element2(type, attrs, await transformAsync(children2, rules, session))];
            } else if (result !== false) {
              return toElementArray(result);
            } else {
              return [];
            }
          }))).flat(1);
          return typeof source === "string" ? children.join("") : children;
        }
        Element2.transformAsync = transformAsync;
        __name$2(transformAsync, "transformAsync");
        function createFactory(type, ...keys) {
          return (...args) => {
            const element = Element2(type);
            keys.forEach((key, index) => {
              if (!isNullable(args[index])) {
                element.attrs[key] = args[index];
              }
            });
            if (args[keys.length]) {
              Object.assign(element.attrs, args[keys.length]);
            }
            return element;
          };
        }
        __name$2(createFactory, "createFactory");
        Element2.warn = /* @__PURE__ */__name$2(() => {}, "warn");
        function createAssetFactory(type) {
          return (src, ...args) => {
            let prefix = "base64://";
            if (typeof args[0] === "string") {
              prefix = `data:${args.shift()};base64,`;
            }
            if (is("ArrayBuffer", src)) {
              src = prefix + arrayBufferToBase64(src);
            } else if (ArrayBuffer.isView(src)) {
              src = prefix + arrayBufferToBase64(src.buffer);
            }
            if (src.startsWith("base64://")) {
              (0, Element2.warn)(`protocol "base64:" is deprecated and will be removed in the future, please use "data:" instead`);
            }
            return Element2(type, {
              ...args[0],
              src
            });
          };
        }
        __name$2(createAssetFactory, "createAssetFactory");
        Element2.text = createFactory("text", "content");
        Element2.at = createFactory("at", "id");
        Element2.sharp = createFactory("sharp", "id");
        Element2.quote = createFactory("quote", "id");
        Element2.image = createAssetFactory("img");
        Element2.img = createAssetFactory("img");
        Element2.video = createAssetFactory("video");
        Element2.audio = createAssetFactory("audio");
        Element2.file = createAssetFactory("file");
        function i18n(path, children) {
          return Element2("i18n", typeof path === "string" ? {
            path
          } : path, children);
        }
        Element2.i18n = i18n;
        __name$2(i18n, "i18n");
      })(Element || (Element = {}));
      module.exports = Element;
    }
  });
  var h3 = require_src();
  var __defProp$1 = Object.defineProperty;
  var __name$1 = (target, value) => __defProp$1(target, "name", {
    value,
    configurable: true
  });

  // src/ws.ts
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  __name$1(sleep, "sleep");
  var WebSocket = (_Class10 = class WebSocket extends EventTarget {
    constructor(url, config) {
      super();
      _defineProperty(this, "ws", void 0);
      _defineProperty(this, "_connected", false);
      _defineProperty(this, "_closed", true);
      _defineProperty(this, "timeout", void 0);
      this.url = url;
      this.timeout = config?.timeout ?? 3e3;
    }
    get protocol() {
      return this.url.split("://")[0];
    }
    get readyState() {
      if (this._closed) return this._connected ? 2 /* CLOSING */ : 3 /* CLOSED */;
      return this._connected ? 1 /* OPEN */ : 0 /* CONNECTING */;
    }
    dispatchEvent(event) {
      return super.dispatchEvent(event);
    }
    // @ts-ignore
    addEventListener(type, listener) {
      super.addEventListener(type, listener);
    }
    // @ts-ignore
    removeEventListener(type, listener) {
      super.removeEventListener(type, listener);
    }
    async connect() {
      if (this.ws) {
        this.ws.shutdown();
        this.ws.close();
      }
      this._closed = false;
      this.ws = new WSClient();
      try {
        await new Promise((resolve, reject) => {
          const fail = /* @__PURE__ */__name$1(() => reject(new Error("Failed to connect")), "fail");
          const okPre = this.ws.connectAsync(this.url, ok => {
            if (ok) resolve(ok);else fail();
          });
          if (!okPre) fail();
        });
      } finally {
        this._closed = true;
      }
      this._connected = true;
      this.dispatchEvent(new Event("open"));
      this.ws.listen("onTextReceived", data => {
        const ev = new Event("message");
        ev.data = data;
        this.dispatchEvent(ev);
      });
      this.ws.listen("onBinaryReceived", () => {
        const ev = new Event("error");
        ev.message = `Unexpected binary data received from ${this.url}`;
        this.dispatchEvent(ev);
      });
      this.ws.listen("onError", msg => {
        const ev = new Event("error");
        ev.message = msg;
        this.dispatchEvent(ev);
      });
      this.ws.listen("onLostConnection", code => {
        this.ws = void 0;
        this._closed = true;
        this._connected = false;
        const ev = new Event("close");
        ev.code = code;
        ev.reason = "";
        this.dispatchEvent(ev);
      });
      (async () => {
        for (;;) {
          if (this._closed) break;
          await sleep(1);
        }
        const {
          ws
        } = this;
        if (!ws) return;
        this.ws = void 0;
        this._connected = false;
        ws?.shutdown();
        ws?.close();
      })();
    }
    close(code, reason) {
      this._closed = true;
    }
    send(data) {
      if (!this.ws) throw new Error("Connection Closed");
      this.ws.send(data);
    }
  }, __name$1(_Class10, "WebSocket"), _Class10);

  // src/index.ts
  var kHTTPError = Symbol.for("undios.error");
  var HTTPError = (_Class11 = class HTTPError extends Error {
    constructor(...args) {
      super(...args);
      _defineProperty(this, kHTTPError, true);
      _defineProperty(this, "response", void 0);
    }
    static fromResp(response) {
      const error = new this(`Request failed with status code ${response.status}`);
      error.response = response;
      return error;
    }
    static is(error) {
      return !!error?.[kHTTPError];
    }
  }, __name$1(_Class11, "HTTPError"), _Class11);
  var HTTP = (_Service2$1$provide = Service2$1.provide, _Service2$1$immediate = Service2$1.immediate, _Service2$1$invoke = Service2$1.invoke, (_HTTP2 = class _HTTP extends Service2$1 {
    constructor(...args) {
      super(args[0], args[1]);
      _defineProperty(this, "_decoders", /* @__PURE__ */Object.create(null));
      this.decoder("json", raw => JSON.parse(raw));
      this.decoder("text", raw => raw);
    }
    decoder(type, decoder) {
      return this[Context2.current].effect(() => {
        this._decoders[type] = decoder;
        return () => delete this._decoders[type];
      });
    }
    extend(config = {}) {
      return this[Service2$1.extend]({
        config: _HTTP.mergeConfig(this.config, config)
      });
    }
    resolveConfig(init) {
      const caller = this[Context2.current];
      let result = {
        headers: {},
        ...this.config
      };
      caller.emit("http/config", result);
      let intercept = caller[Context2.intercept];
      while (intercept) {
        result = _HTTP.mergeConfig(result, intercept.http);
        intercept = Object.getPrototypeOf(intercept);
      }
      result = _HTTP.mergeConfig(result, init);
      return result;
    }
    resolveURL(url, config) {
      if (config.baseURL) {
        url = `${trimSlash(config.baseURL)}/${url}`;
      }
      if (config.params) {
        const params = Object.entries(config.params).map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`).join("&");
        url = `${url}${url.includes("?") ? "&" : "?"}${params}`;
      }
      return url;
    }
    async [_Service2$1$invoke](...args) {
      const caller = this[Context2.current];
      let method;
      if (typeof args[1] === "string") {
        method = args.shift();
      }
      const config = this.resolveConfig(args[1]);
      const url = this.resolveURL(args[0], config);
      method ??= config.method ?? "GET";
      const controller = new AbortController();
      let timer;
      const dispose = caller.on("dispose", () => {
        clearTimeout(timer);
        controller.abort(new Error("context disposed"));
      });
      if (config.timeout) {
        timer = setTimeout(() => {
          controller.abort(new Error("timeout"));
        }, config.timeout);
      }
      try {
        const init = {
          method,
          url,
          headers: config.headers ?? {},
          data: config.data
        };
        if (config.data && typeof config.data === "object") {
          ;
          init.data = JSON.stringify(config.data);
        }
        caller.emit("http/fetch-init", init, config);
        const rawResp = await this.fetch(init);
        const validateStatus = config.validateStatus ?? (status => Math.floor(status / 100) === 2);
        if (!validateStatus(rawResp.status)) {
          const error = _HTTP.Error.fromResp(rawResp);
          throw error;
        }
        if (config.responseType) {
          if (!(config.responseType in this._decoders)) {
            throw new TypeError(`Unknown responseType: ${config.responseType}`);
          }
          const decoder = this._decoders[config.responseType];
          const response = {
            url,
            status: rawResp.status,
            data: await decoder(rawResp.data)
          };
          return response;
        }
        return rawResp;
      } finally {
        dispose();
      }
    }
    fetch(init) {
      switch (init.method) {
        case "get":
        case "GET":
          {
            return new Promise(resolve => {
              network.httpGet(init.url, init.headers, (status, result) => {
                resolve({
                  url: init.url,
                  status,
                  data: result
                });
              });
            });
          }
        case "post":
        case "POST":
          {
            return new Promise(resolve => {
              network.httpPost(init.url, init.headers, init.data, init.headers["Content-Type"] ?? "text/plain", (status, result) => {
                resolve({
                  url: init.url,
                  status,
                  data: result
                });
              });
            });
          }
      }
    }
    ws(url, init) {
      const caller = this[Context2.current];
      const config = this.resolveConfig(init);
      url = this.resolveURL(url, config);
      init = {
        timeout: config.timeout
      };
      caller.emit("http/websocket-init", init, config);
      const socket = new WebSocket(url, init);
      const dispose = caller.on("dispose", () => {
        socket.close(1001, "context disposed");
      });
      socket.addEventListener("close", () => {
        dispose();
      });
      return socket;
    }
  }, __name$1(_HTTP2, "HTTP"), _defineProperty(_HTTP2, "Error", HTTPError), _defineProperty(_HTTP2, _Service2$1$provide, "http"), _defineProperty(_HTTP2, _Service2$1$immediate, true), (() => {
    for (const method of ["get"]) {
      defineProperty(_HTTP2.prototype, method, async function (url, config) {
        const response = await this(url, {
          method,
          ...config
        });
        return response.data;
      });
    }
    for (const method of ["post"]) {
      defineProperty(_HTTP2.prototype, method, async function (url, data, config) {
        const response = await this(url, {
          method,
          data,
          ...config
        });
        return response.data;
      });
    }
  })(), _defineProperty(_HTTP2, "mergeConfig", (target, source) => ({
    ...target,
    ...source,
    headers: {
      ...target?.headers,
      ...source?.headers
    }
  })), _HTTP2));
  var __defProp = Object.defineProperty;
  var __name = (target, value) => __defProp(target, "name", {
    value,
    configurable: true
  });
  var Session = (_Session2 = class _Session {
    constructor(bot, event) {
      _defineProperty(this, "id", void 0);
      _defineProperty(this, "bot", void 0);
      _defineProperty(this, "app", void 0);
      _defineProperty(this, "event", void 0);
      _defineProperty(this, "locales", []);
      event.selfId ??= bot.selfId;
      event.platform ??= bot.platform;
      event.timestamp ??= Date.now();
      this.event = event;
      this.id = ++_Session.counter;
      defineProperty(this, "bot", bot);
      defineProperty(this, "app", bot.ctx.root);
      defineProperty(this, exports.Context.current, bot.ctx);
      return exports.Context.associate(this, "session");
    }
    /** @deprecated */
    get data() {
      return this.event;
    }
    get isDirect() {
      return this.event.channel.type === Channel.Type.DIRECT;
    }
    set isDirect(value) {
      (this.event.channel ??= {}).type = value ? Channel.Type.DIRECT : Channel.Type.TEXT;
    }
    get author() {
      return {
        ...this.event.user,
        ...this.event.member,
        userId: this.event.user?.id,
        username: this.event.user?.name,
        nickname: this.event.member?.name
      };
    }
    get uid() {
      return `${this.platform}:${this.userId}`;
    }
    get gid() {
      return `${this.platform}:${this.guildId}`;
    }
    get cid() {
      return `${this.platform}:${this.channelId}`;
    }
    get fid() {
      return `${this.platform}:${this.channelId}:${this.userId}`;
    }
    get sid() {
      return `${this.platform}:${this.selfId}`;
    }
    get elements() {
      return this.event.message?.elements;
    }
    set elements(value) {
      this.event.message ??= {};
      this.event.message.elements = value;
    }
    get content() {
      return this.event.message?.elements?.join("");
    }
    set content(value) {
      (this.event.message ??= {}).elements = isNullable(value) ? value : h3.parse(value);
    }
    setInternal(type, data) {
      this.event._type = type;
      this.event._data = data;
      const internal = Object.create(this.bot.internal);
      defineProperty(this, type, Object.assign(internal, data));
    }
    async transform(elements) {
      return await h3.transformAsync(elements, ({
        type,
        attrs,
        children
      }, session) => {
        const render = type === "component" ? attrs.is : this.app.get("component:" + type);
        return render?.(attrs, children, session) ?? true;
      }, this);
    }
    toJSON() {
      return {
        ...this.event,
        id: this.id
      };
    }
  }, __name(_Session2, "Session"), _defineProperty(_Session2, "counter", 0), _Session2);
  function defineAccessor(prototype, name, keys) {
    Object.defineProperty(prototype, name, {
      get() {
        return keys.reduce((data, key) => data?.[key], this);
      },
      set(value) {
        if (value === void 0) return;
        const _keys = keys.slice();
        const last = _keys.pop();
        const data = _keys.reduce((data2, key) => data2[key] ??= {}, this);
        data[last] = value;
      }
    });
  }
  __name(defineAccessor, "defineAccessor");
  defineAccessor(Session.prototype, "type", ["event", "type"]);
  defineAccessor(Session.prototype, "subtype", ["event", "subtype"]);
  defineAccessor(Session.prototype, "subsubtype", ["event", "subsubtype"]);
  defineAccessor(Session.prototype, "selfId", ["event", "selfId"]);
  defineAccessor(Session.prototype, "platform", ["event", "platform"]);
  defineAccessor(Session.prototype, "timestamp", ["event", "timestamp"]);
  defineAccessor(Session.prototype, "userId", ["event", "user", "id"]);
  defineAccessor(Session.prototype, "channelId", ["event", "channel", "id"]);
  defineAccessor(Session.prototype, "channelName", ["event", "channel", "name"]);
  defineAccessor(Session.prototype, "guildId", ["event", "guild", "id"]);
  defineAccessor(Session.prototype, "guildName", ["event", "guild", "name"]);
  defineAccessor(Session.prototype, "messageId", ["event", "message", "id"]);
  defineAccessor(Session.prototype, "operatorId", ["event", "operator", "id"]);
  defineAccessor(Session.prototype, "roleId", ["event", "role", "id"]);
  defineAccessor(Session.prototype, "quote", ["event", "message", "quote"]);
  var eventAliases = [["message-created", "message"]];
  var Bot = (_Class12 = class Bot {
    constructor(ctx, config, platform) {
      _defineProperty(this, "user", {});
      _defineProperty(this, "isBot", true);
      _defineProperty(this, "hidden", false);
      _defineProperty(this, "platform", void 0);
      _defineProperty(this, "adapter", void 0);
      _defineProperty(this, "error", void 0);
      _defineProperty(this, "callbacks", {});
      _defineProperty(this, "logger", void 0);
      // Same as `this.ctx`, but with a more specific type.
      _defineProperty(this, "context", void 0);
      _defineProperty(this, "_status", Status.OFFLINE);
      this.ctx = ctx;
      this.config = config;
      this.internal = null;
      this.context = ctx;
      ctx.bots.push(this);
      this.context.emit("bot-added", this);
      if (platform) {
        this.logger = ctx.logger(platform);
        this.platform = platform;
      }
      ctx.on("ready", async () => {
        await Promise.resolve();
        this.dispatchLoginEvent("login-added");
        return this.start();
      });
      ctx.on("dispose", () => this.dispose());
      ctx.on("interaction/button", session => {
        const cb = this.callbacks[session.event.button.id];
        if (cb) cb(session);
      });
    }
    update(login) {
      const {
        status,
        ...rest
      } = login;
      Object.assign(this, rest);
      this.status = status;
    }
    dispose() {
      remove(this.ctx.bots, this);
      this.context.emit("bot-removed", this);
      this.dispatchLoginEvent("login-removed");
      return this.stop();
    }
    dispatchLoginEvent(type) {
      const session = this.session();
      session.type = type;
      session.event.login = this.toJSON();
      this.dispatch(session);
    }
    get status() {
      return this._status;
    }
    set status(value) {
      if (value === this._status) return;
      this._status = value;
      if (this.ctx.bots.includes(this)) {
        this.context.emit("bot-status-updated", this);
        this.dispatchLoginEvent("login-updated");
      }
    }
    get isActive() {
      return this._status !== Status.OFFLINE && this._status !== Status.DISCONNECT;
    }
    online() {
      this.status = Status.ONLINE;
      this.error = null;
    }
    offline(error) {
      this.status = Status.OFFLINE;
      this.error = error;
    }
    async start() {
      if (this.isActive) return;
      this.status = Status.CONNECT;
      try {
        await this.context.parallel("bot-connect", this);
        await this.adapter?.connect(this);
      } catch (error) {
        this.offline(error);
      }
    }
    async stop() {
      if (!this.isActive) return;
      this.status = Status.DISCONNECT;
      try {
        await this.context.parallel("bot-disconnect", this);
        await this.adapter?.disconnect(this);
      } catch (error) {
        this.context.emit("internal/error", error);
      } finally {
        this.offline();
      }
    }
    get sid() {
      return `${this.platform}:${this.selfId}`;
    }
    session(event = {}) {
      const {
        Session: Session2
      } = this.ctx.constructor;
      return new Session2(this, event);
    }
    dispatch(session) {
      if (!this.ctx.lifecycle.isActive) return;
      let events = [session.type];
      for (const aliases of eventAliases) {
        if (aliases.includes(session.type)) {
          events = aliases;
          session.type = aliases[0];
          break;
        }
      }
      this.context.emit("internal/session", session);
      if (session.type === "internal") {
        this.context.emit(session.event._type, session.event._data, session.bot);
        return;
      }
      for (const event of events) {
        this.context.emit(session, event, session);
      }
    }
    async createMessage(channelId, content, guildId, options) {
      const {
        MessageEncoder: MessageEncoder2
      } = this.constructor;
      return new MessageEncoder2(this, channelId, guildId, options).send(content);
    }
    async sendMessage(channelId, content, guildId, options) {
      const messages = await this.createMessage(channelId, content, guildId, options);
      return messages.map(message => message.id);
    }
    async sendPrivateMessage(userId, content, guildId, options) {
      const {
        id
      } = await this.createDirectChannel(userId, guildId ?? options?.session?.guildId);
      return this.sendMessage(id, content, null, options);
    }
    async supports(name, session = {}) {
      return !!this[Methods[name]?.name];
    }
    async checkPermission(name, session) {
      if (name.startsWith("bot.")) {
        return this.supports(name.slice(4), session);
      }
    }
    toJSON() {
      return clone(pick(this, ["platform", "selfId", "status", "user", "hidden"]));
    }
    async getLogin() {
      return this.toJSON();
    }
    /** @deprecated use `bot.getLogin()` instead */
    async getSelf() {
      const {
        user
      } = await this.getLogin();
      return user;
    }
  }, __name(_Class12, "Bot"), _defineProperty(_Class12, "reusable", true), _defineProperty(_Class12, "MessageEncoder", void 0), _Class12);
  var iterableMethods = ["getMessage", "getReaction", "getFriend", "getGuild", "getGuildMember", "getGuildRole", "getChannel"];
  for (const name of iterableMethods) {
    Bot.prototype[name + "Iter"] = function (...args) {
      let list;
      if (!this[name + "List"]) throw new Error(`not implemented: ${name}List`);
      const getList = /* @__PURE__ */__name(async () => {
        list = await this[name + "List"](...args, list?.next);
      }, "getList");
      return {
        async next() {
          if (list?.data.length) return {
            done: false,
            value: list.data.shift()
          };
          if (list && !list?.next) return {
            done: true,
            value: void 0
          };
          await getList();
          return this.next();
        },
        [Symbol.asyncIterator]() {
          return this;
        }
      };
    };
  }
  defineAccessor(Bot.prototype, "selfId", ["user", "id"]);
  defineAccessor(Bot.prototype, "userId", ["user", "id"]);
  exports.Adapter = (_Class13 = class Adapter {
    constructor(ctx) {
      _defineProperty(this, "bots", []);
      this.ctx = ctx;
    }
    async connect(bot) {}
    async disconnect(bot) {}
    fork(ctx, bot) {
      bot.adapter = this;
      this.bots.push(bot);
      ctx.on("dispose", () => {
        remove(this.bots, bot);
      });
    }
  }, __name(_Class13, "Adapter"), _defineProperty(_Class13, "schema", false), _Class13);
  ((Adapter2, _WsClientBase, _WsClient) => {
    Adapter2.WsClientConfig = z2.object({
      retryTimes: z2.natural().description("初次连接时的最大重试次数。").default(6),
      retryInterval: z2.natural().role("ms").description("初次连接时的重试时间间隔。").default(5 * exports.Time.second),
      retryLazy: z2.natural().role("ms").description("连接关闭后的重试时间间隔。").default(exports.Time.minute)
    }).description("连接设置");
    class WsClientBase extends Adapter2 {
      constructor(ctx, config) {
        super(ctx);
        _defineProperty(this, "socket", void 0);
        this.config = config;
      }
      async start() {
        let _retryCount = 0;
        const logger = this.ctx.logger("adapter");
        const {
          retryTimes,
          retryInterval,
          retryLazy
        } = this.config;
        const reconnect = /* @__PURE__ */__name(async (initial = false) => {
          logger.debug("websocket client opening");
          const socket = await this.prepare();
          const url = socket.url.replace(/\?.+/, "");
          socket.addEventListener("error", event => {
            if (event.message) logger.warn(event.message);
          });
          socket.addEventListener("close", ({
            code,
            reason
          }) => {
            this.socket = null;
            logger.debug(`websocket closed with ${code}`);
            if (!this.getActive()) return;
            const message = reason.toString() || `failed to connect to ${url}, code: ${code}`;
            let timeout = retryInterval;
            if (_retryCount >= retryTimes) {
              if (initial) {
                return this.setStatus(Status.OFFLINE, new Error(message));
              } else {
                timeout = retryLazy;
              }
            }
            _retryCount++;
            this.setStatus(Status.RECONNECT);
            logger.warn(`${message}, will retry in ${exports.Time.format(timeout)}...`);
            setTimeout(() => {
              if (this.getActive()) reconnect();
            }, timeout);
          });
          socket.addEventListener("open", () => {
            _retryCount = 0;
            this.socket = socket;
            logger.info("connect to server: %c", url);
            this.accept(socket);
          });
        }, "reconnect");
        reconnect(true);
      }
      async stop() {
        this.socket?.close();
      }
    }
    _WsClientBase = WsClientBase;
    __name(_WsClientBase, "WsClientBase");
    Adapter2.WsClientBase = WsClientBase;
    class WsClient extends WsClientBase {
      constructor(ctx, bot) {
        super(ctx, bot.config);
        this.bot = bot;
        bot.adapter = this;
      }
      getActive() {
        return this.bot.isActive;
      }
      setStatus(status, error = null) {
        this.bot.status = status;
        this.bot.error = error;
      }
      async connect(bot) {
        this.start();
      }
      async disconnect(bot) {
        this.stop();
      }
    }
    _WsClient = WsClient;
    __name(_WsClient, "WsClient");
    _defineProperty(WsClient, "reusable", true);
    Adapter2.WsClient = WsClient;
  })(exports.Adapter || (exports.Adapter = {}));
  var AggregateError = (_Class14 = class AggregateError extends Error {
    constructor(errors, message = "") {
      super(message);
      this.errors = errors;
    }
  }, __name(_Class14, "AggregateError"), _Class14);
  var MessageEncoder = (_Class15 = class MessageEncoder {
    constructor(bot, channelId, guildId, options = {}) {
      _defineProperty(this, "errors", []);
      _defineProperty(this, "results", []);
      _defineProperty(this, "session", void 0);
      this.bot = bot;
      this.channelId = channelId;
      this.guildId = guildId;
      this.options = options;
    }
    async prepare() {}
    async render(elements, flush) {
      for (const element of elements) {
        await this.visit(element);
      }
      if (flush) {
        await this.flush();
      }
    }
    async send(content) {
      this.session = this.bot.session({
        type: "send",
        channel: {
          id: this.channelId,
          ...this.options.session?.event.channel
        },
        guild: this.options.session?.event.guild
      });
      for (const key in this.options.session || {}) {
        if (key === "id" || key === "event") continue;
        this.session[key] = this.options.session[key];
      }
      await this.prepare();
      const session = this.options.session ?? this.session;
      this.session.elements = await session.transform(h3.normalize(content));
      const btns = h3.select(this.session.elements, "button").filter(v => v.attrs.type !== "link" && !v.attrs.id);
      for (const btn of btns) {
        const r = Math.random().toString(36).slice(2);
        btn.attrs.id ||= r;
        if (typeof btn.attrs.action === "function") this.bot.callbacks[btn.attrs.id] = btn.attrs.action;
      }
      if (await this.session.app.serial(this.session, "before-send", this.session, this.options)) return;
      await this.render(this.session.elements);
      await this.flush();
      if (this.errors.length) {
        throw new AggregateError(this.errors);
      } else {
        return this.results;
      }
    }
  }, __name(_Class15, "MessageEncoder"), _Class15);

  // src/index.ts
  h3.warn = new Logger$1("element").warn;
  defineProperty(HTTP, "Config", z2.object({
    timeout: z2.natural().role("ms").description("等待连接建立的最长时间。")
  }).description("请求设置"));
  HTTP.createConfig = /* @__PURE__ */__name(function createConfig(endpoint) {
    return z2.object({
      baseURL: z2.string().role("link").description("要连接的服务器地址。").default(typeof endpoint === "string" ? endpoint : null).required(typeof endpoint === "boolean" ? endpoint : false),
      headers: z2.dict(String).role("table").description("要附加的额外请求头。"),
      ...this.Config.dict
    }).description("请求设置");
  }, "createConfig");
  exports.Context = (_Class16 = class Context extends Context2 {
    constructor(config = {}) {
      super(config);
      _defineProperty(this, "bots", new Proxy([], {
        get(target, prop) {
          if (prop in target || typeof prop === "symbol") {
            return Reflect.get(target, prop);
          }
          return target.find(bot => bot.sid === prop);
        },
        deleteProperty(target, prop) {
          if (prop in target || typeof prop === "symbol") {
            return Reflect.deleteProperty(target, prop);
          }
          const bot = target.findIndex(bot2 => bot2.sid === prop);
          if (bot < 0) return true;
          target.splice(bot, 1);
          return true;
        }
      }));
      this.provide("http", void 0, true);
      this.plugin(HTTP, config.request);
    }
    component(name, component, options = {}) {
      const render = /* @__PURE__ */__name(async (attrs, children, session) => {
        if (options.session && session.type === "send") {
          throw new Error("interactive components is not available outside sessions");
        }
        const result = await component(attrs, children, session);
        return session.transform(h3.normalize(result));
      }, "render");
      const service = "component:" + name;
      this.provide(service);
      return this.effect(() => {
        this[service] = render;
        return () => this[service] = null;
      });
    }
  }, __name(_Class16, "Context"), _defineProperty(_Class16, "session", Symbol("session")), _defineProperty(_Class16, "Session", Session), _Class16);
  (Context3 => {
    Context3.Config = z2.intersect([z2.object({})]);
  })(exports.Context || (exports.Context = {}));
  var Service2 = (_Service2$1$setup = Service2$1.setup, (_Class17 = class Service2 extends Service2$1 {
    [_Service2$1$setup]() {
      this.ctx = new exports.Context();
    }
  }, __name(_Class17, "Service"), _Class17));
  const name = "LeviSatori";
  const baseDir = `./plugins/${name}`;
  const pluginBaseDir = `./plugins/${name}/plugins`;
  const requireBase = `./${name}/plugins`;
  const configPath = `${baseDir}/${name}.yml`;
  mc.listen("onServerStarted", () => {
    if (!file.exists(configPath)) {
      file.writeTo(configPath, "plugins: []");
    }
    if (!file.exists(pluginBaseDir)) {
      file.mkdir(pluginBaseDir);
    }
    start({
      name,
      baseDir,
      requireBase,
      logger: {
        levels: 2
      }
    }).catch(e => logger.error(`${e}`));
  });

  exports.Bot = Bot;
  exports.EffectScope = EffectScope;
  exports.Element = h3;
  exports.ForkScope = ForkScope;
  exports.Lifecycle = Lifecycle;
  exports.Logger = Logger$1;
  exports.MainScope = MainScope;
  exports.MessageEncoder = MessageEncoder;
  exports.Messenger = MessageEncoder;
  exports.Modulator = MessageEncoder;
  exports.Registry = Registry;
  exports.Schema = z2;
  exports.ScopeStatus = ScopeStatus;
  exports.Service = Service2;
  exports.Session = Session;
  exports.TimerService = TimerService;
  exports.Universal = index;
  exports.applyTraceable = applyTraceable;
  exports.arrayBufferToBase64 = arrayBufferToBase64;
  exports.base64ToArrayBuffer = base64ToArrayBuffer;
  exports.camelCase = camelCase;
  exports.camelize = camelize;
  exports.capitalize = capitalize;
  exports.clone = clone;
  exports.contain = contain;
  exports.createCallable = createCallable;
  exports.createTraceable = createTraceable;
  exports.deduplicate = deduplicate;
  exports.deepEqual = deepEqual;
  exports.defineAccessor = defineAccessor;
  exports.defineProperty = defineProperty;
  exports.difference = difference;
  exports.filterKeys = filterKeys;
  exports.h = h3;
  exports.hyphenate = hyphenate;
  exports.intersection = intersection;
  exports.is = is;
  exports.isApplicable = isApplicable;
  exports.isBailed = isBailed;
  exports.isConstructor = isConstructor;
  exports.isNullable = isNullable;
  exports.isPlainObject = isPlainObject;
  exports.isUnproxyable = isUnproxyable;
  exports.joinPrototype = joinPrototype;
  exports.makeArray = makeArray;
  exports.mapValues = mapValues;
  exports.noop = noop;
  exports.omit = omit;
  exports.paramCase = paramCase;
  exports.pick = pick;
  exports.remove = remove;
  exports.resolveConfig = resolveConfig;
  exports.sanitize = sanitize;
  exports.segment = h3;
  exports.snakeCase = snakeCase;
  exports.symbols = symbols;
  exports.trimSlash = trimSlash;
  exports.uncapitalize = uncapitalize;
  exports.union = union;
  exports.valueMap = mapValues;
  exports.z = z2;

}));
