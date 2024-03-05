"use strict";
var LeviSatori = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require3() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __export = (target, all) => {
    for (var name2 in all)
      __defProp(target, name2, { get: all[name2], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var __publicField = (obj, key, value) => {
    __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
    return value;
  };

  // ../../node_modules/cosmokit/lib/index.cjs
  var require_lib = __commonJS({
    "../../node_modules/cosmokit/lib/index.cjs"(exports, module) {
      "use strict";
      var __defProp11 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
      var __export2 = (target, all) => {
        for (var name2 in all)
          __defProp11(target, name2, { get: all[name2], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp11({}, "__esModule", { value: true }), mod);
      var src_exports2 = {};
      __export2(src_exports2, {
        Time: () => Time2,
        arrayBufferToBase64: () => arrayBufferToBase642,
        base64ToArrayBuffer: () => base64ToArrayBuffer,
        camelCase: () => camelCase,
        camelize: () => camelize2,
        capitalize: () => capitalize,
        clone: () => clone2,
        contain: () => contain,
        deduplicate: () => deduplicate,
        deepEqual: () => deepEqual2,
        defineProperty: () => defineProperty11,
        difference: () => difference,
        filterKeys: () => filterKeys,
        hyphenate: () => hyphenate2,
        intersection: () => intersection,
        is: () => is2,
        isNullable: () => isNullable6,
        isPlainObject: () => isPlainObject,
        makeArray: () => makeArray2,
        mapValues: () => mapValues,
        noop: () => noop,
        omit: () => omit,
        paramCase: () => paramCase,
        pick: () => pick2,
        remove: () => remove5,
        sanitize: () => sanitize,
        snakeCase: () => snakeCase,
        trimSlash: () => trimSlash4,
        uncapitalize: () => uncapitalize,
        union: () => union,
        valueMap: () => mapValues
      });
      module.exports = __toCommonJS2(src_exports2);
      function noop() {
      }
      __name10(noop, "noop");
      function isNullable6(value) {
        return value === null || value === void 0;
      }
      __name10(isNullable6, "isNullable");
      function isPlainObject(data) {
        return data && typeof data === "object" && !Array.isArray(data);
      }
      __name10(isPlainObject, "isPlainObject");
      function filterKeys(object, filter) {
        return Object.fromEntries(Object.entries(object).filter(([key, value]) => filter(key, value)));
      }
      __name10(filterKeys, "filterKeys");
      function mapValues(object, transform) {
        return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
      }
      __name10(mapValues, "mapValues");
      function is2(type2, value) {
        if (arguments.length === 1)
          return (value2) => is2(type2, value2);
        return type2 in globalThis && value instanceof globalThis[type2] || Object.prototype.toString.call(value).slice(8, -1) === type2;
      }
      __name10(is2, "is");
      function clone2(source) {
        if (!source || typeof source !== "object")
          return source;
        if (Array.isArray(source))
          return source.map(clone2);
        if (is2("Date", source))
          return new Date(source.valueOf());
        if (is2("RegExp", source))
          return new RegExp(source.source, source.flags);
        return mapValues(source, clone2);
      }
      __name10(clone2, "clone");
      function deepEqual2(a, b, strict) {
        var _a25, _b5, _c2;
        if (a === b)
          return true;
        if (!strict && isNullable6(a) && isNullable6(b))
          return true;
        if (typeof a !== typeof b)
          return false;
        if (typeof a !== "object")
          return false;
        if (!a || !b)
          return false;
        function check(test, then) {
          return test(a) ? test(b) ? then(a, b) : false : test(b) ? false : void 0;
        }
        __name10(check, "check");
        return (_c2 = (_b5 = (_a25 = check(Array.isArray, (a2, b2) => a2.length === b2.length && a2.every((item, index) => deepEqual2(item, b2[index])))) != null ? _a25 : check(is2("Date"), (a2, b2) => a2.valueOf() === b2.valueOf())) != null ? _b5 : check(is2("RegExp"), (a2, b2) => a2.source === b2.source && a2.flags === b2.flags)) != null ? _c2 : Object.keys({ ...a, ...b }).every((key) => deepEqual2(a[key], b[key], strict));
      }
      __name10(deepEqual2, "deepEqual");
      function pick2(source, keys, forced) {
        if (!keys)
          return { ...source };
        const result = {};
        for (const key of keys) {
          if (forced || source[key] !== void 0)
            result[key] = source[key];
        }
        return result;
      }
      __name10(pick2, "pick");
      function omit(source, keys) {
        if (!keys)
          return { ...source };
        const result = { ...source };
        for (const key of keys) {
          Reflect.deleteProperty(result, key);
        }
        return result;
      }
      __name10(omit, "omit");
      function defineProperty11(object, key, value) {
        return Object.defineProperty(object, key, { writable: true, value, enumerable: false });
      }
      __name10(defineProperty11, "defineProperty");
      function contain(array1, array2) {
        return array2.every((item) => array1.includes(item));
      }
      __name10(contain, "contain");
      function intersection(array1, array2) {
        return array1.filter((item) => array2.includes(item));
      }
      __name10(intersection, "intersection");
      function difference(array1, array2) {
        return array1.filter((item) => !array2.includes(item));
      }
      __name10(difference, "difference");
      function union(array1, array2) {
        return Array.from(/* @__PURE__ */ new Set([...array1, ...array2]));
      }
      __name10(union, "union");
      function deduplicate(array) {
        return [...new Set(array)];
      }
      __name10(deduplicate, "deduplicate");
      function remove5(list, item) {
        const index = list.indexOf(item);
        if (index >= 0) {
          list.splice(index, 1);
          return true;
        } else {
          return false;
        }
      }
      __name10(remove5, "remove");
      function makeArray2(source) {
        return Array.isArray(source) ? source : isNullable6(source) ? [] : [source];
      }
      __name10(makeArray2, "makeArray");
      function arrayBufferToBase642(buffer) {
        if (typeof Buffer !== "undefined") {
          return Buffer.from(buffer).toString("base64");
        }
        let binary2 = "";
        const bytes = new Uint8Array(buffer);
        for (let i = 0; i < bytes.byteLength; i++) {
          binary2 += String.fromCharCode(bytes[i]);
        }
        return btoa(binary2);
      }
      __name10(arrayBufferToBase642, "arrayBufferToBase64");
      function base64ToArrayBuffer(base64) {
        if (typeof Buffer !== "undefined") {
          const buf = Buffer.from(base64, "base64");
          return new Uint8Array(buf.buffer, buf.byteOffset, buf.length);
        }
        const binary2 = atob(base64.replace(/\s/g, ""));
        const buffer = new Uint8Array(binary2.length);
        for (let i = 0; i < binary2.length; i++) {
          buffer[i] = binary2.charCodeAt(i);
        }
        return buffer;
      }
      __name10(base64ToArrayBuffer, "base64ToArrayBuffer");
      function capitalize(source) {
        return source.charAt(0).toUpperCase() + source.slice(1);
      }
      __name10(capitalize, "capitalize");
      function uncapitalize(source) {
        return source.charAt(0).toLowerCase() + source.slice(1);
      }
      __name10(uncapitalize, "uncapitalize");
      function camelCase(source) {
        return source.replace(/[_-][a-z]/g, (str2) => str2.slice(1).toUpperCase());
      }
      __name10(camelCase, "camelCase");
      function paramCase(source) {
        return uncapitalize(source).replace(/_/g, "-").replace(/.[A-Z]+/g, (str2) => str2[0] + "-" + str2.slice(1).toLowerCase());
      }
      __name10(paramCase, "paramCase");
      function snakeCase(source) {
        return uncapitalize(source).replace(/-/g, "_").replace(/.[A-Z]+/g, (str2) => str2[0] + "_" + str2.slice(1).toLowerCase());
      }
      __name10(snakeCase, "snakeCase");
      var camelize2 = camelCase;
      var hyphenate2 = paramCase;
      function trimSlash4(source) {
        return source.replace(/\/$/, "");
      }
      __name10(trimSlash4, "trimSlash");
      function sanitize(source) {
        if (!source.startsWith("/"))
          source = "/" + source;
        return trimSlash4(source);
      }
      __name10(sanitize, "sanitize");
      var Time2;
      ((Time22) => {
        Time22.millisecond = 1;
        Time22.second = 1e3;
        Time22.minute = Time22.second * 60;
        Time22.hour = Time22.minute * 60;
        Time22.day = Time22.hour * 24;
        Time22.week = Time22.day * 7;
        let timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
        function setTimezoneOffset(offset) {
          timezoneOffset = offset;
        }
        Time22.setTimezoneOffset = setTimezoneOffset;
        __name10(setTimezoneOffset, "setTimezoneOffset");
        function getTimezoneOffset() {
          return timezoneOffset;
        }
        Time22.getTimezoneOffset = getTimezoneOffset;
        __name10(getTimezoneOffset, "getTimezoneOffset");
        function getDateNumber(date = /* @__PURE__ */ new Date(), offset) {
          if (typeof date === "number")
            date = new Date(date);
          if (offset === void 0)
            offset = timezoneOffset;
          return Math.floor((date.valueOf() / Time22.minute - offset) / 1440);
        }
        Time22.getDateNumber = getDateNumber;
        __name10(getDateNumber, "getDateNumber");
        function fromDateNumber(value, offset) {
          const date = new Date(value * Time22.day);
          if (offset === void 0)
            offset = timezoneOffset;
          return new Date(+date + offset * Time22.minute);
        }
        Time22.fromDateNumber = fromDateNumber;
        __name10(fromDateNumber, "fromDateNumber");
        const numeric = /\d+(?:\.\d+)?/.source;
        const timeRegExp = new RegExp(`^${[
          "w(?:eek(?:s)?)?",
          "d(?:ay(?:s)?)?",
          "h(?:our(?:s)?)?",
          "m(?:in(?:ute)?(?:s)?)?",
          "s(?:ec(?:ond)?(?:s)?)?"
        ].map((unit) => `(${numeric}${unit})?`).join("")}$`);
        function parseTime(source) {
          const capture = timeRegExp.exec(source);
          if (!capture)
            return 0;
          return (parseFloat(capture[1]) * Time22.week || 0) + (parseFloat(capture[2]) * Time22.day || 0) + (parseFloat(capture[3]) * Time22.hour || 0) + (parseFloat(capture[4]) * Time22.minute || 0) + (parseFloat(capture[5]) * Time22.second || 0);
        }
        Time22.parseTime = parseTime;
        __name10(parseTime, "parseTime");
        function parseDate(date) {
          const parsed = parseTime(date);
          if (parsed) {
            date = Date.now() + parsed;
          } else if (/^\d{1,2}(:\d{1,2}){1,2}$/.test(date)) {
            date = `${(/* @__PURE__ */ new Date()).toLocaleDateString()}-${date}`;
          } else if (/^\d{1,2}-\d{1,2}-\d{1,2}(:\d{1,2}){1,2}$/.test(date)) {
            date = `${(/* @__PURE__ */ new Date()).getFullYear()}-${date}`;
          }
          return date ? new Date(date) : /* @__PURE__ */ new Date();
        }
        Time22.parseDate = parseDate;
        __name10(parseDate, "parseDate");
        function format(ms) {
          const abs = Math.abs(ms);
          if (abs >= Time22.day - Time22.hour / 2) {
            return Math.round(ms / Time22.day) + "d";
          } else if (abs >= Time22.hour - Time22.minute / 2) {
            return Math.round(ms / Time22.hour) + "h";
          } else if (abs >= Time22.minute - Time22.second / 2) {
            return Math.round(ms / Time22.minute) + "m";
          } else if (abs >= Time22.second) {
            return Math.round(ms / Time22.second) + "s";
          }
          return ms + "ms";
        }
        Time22.format = format;
        __name10(format, "format");
        function toDigits(source, length = 2) {
          return source.toString().padStart(length, "0");
        }
        Time22.toDigits = toDigits;
        __name10(toDigits, "toDigits");
        function template(template2, time = /* @__PURE__ */ new Date()) {
          return template2.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
        }
        Time22.template = template;
        __name10(template, "template");
      })(Time2 || (Time2 = {}));
    }
  });

  // ../reggol/lib/index.cjs
  var require_lib2 = __commonJS({
    "../reggol/lib/index.cjs"(exports, module) {
      "use strict";
      var __create2 = Object.create;
      var __defProp11 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __getProtoOf2 = Object.getPrototypeOf;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __defNormalProp2 = (obj, key, value) => key in obj ? __defProp11(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
      var __esm = (fn, res) => function __init() {
        return fn && (res = (0, fn[__getOwnPropNames3(fn)[0]])(fn = 0)), res;
      };
      var __commonJS3 = (cb, mod) => function __require3() {
        return mod || (0, cb[__getOwnPropNames3(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp11(target, "default", { value: mod, enumerable: true }) : target,
        mod
      ));
      var __publicField2 = (obj, key, value) => {
        __defNormalProp2(obj, typeof key !== "symbol" ? key + "" : key, value);
        return value;
      };
      function objectToString(o) {
        return Object.prototype.toString.call(o);
      }
      function isArray(ar) {
        return Array.isArray(ar);
      }
      function isBoolean2(arg) {
        return typeof arg === "boolean";
      }
      function isNull2(arg) {
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
        return isObject2(re) && objectToString(re) === "[object RegExp]";
      }
      function isObject2(arg) {
        return typeof arg === "object" && arg !== null;
      }
      function isDate(d) {
        return isObject2(d) && objectToString(d) === "[object Date]";
      }
      function isError(e) {
        return isObject2(e) && (objectToString(e) === "[object Error]" || e instanceof Error);
      }
      function isFunction(arg) {
        return typeof arg === "function";
      }
      function hasOwnProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
      }
      function _extend(origin, add) {
        if (!add || !isObject2(add))
          return origin;
        var keys = Object.keys(add);
        var i = keys.length;
        while (i--) {
          origin[keys[i]] = add[keys[i]];
        }
        return origin;
      }
      function stylizeWithColor(str2, styleType) {
        var style = inspect.styles[styleType];
        if (style) {
          return "\x1B[" + inspect.colors[style][0] + "m" + str2 + "\x1B[" + inspect.colors[style][1] + "m";
        } else {
          return str2;
        }
      }
      function stylizeNoColor(str2, styleType) {
        return str2;
      }
      function formatPrimitive(ctx, value) {
        if (isUndefined(value))
          return ctx.stylize("undefined", "undefined");
        if (isString(value)) {
          var simple = "'" + JSON.stringify(value).replace(/^"|"$/g, "").replace(/'/g, "\\'").replace(/\\"/g, '"') + "'";
          return ctx.stylize(simple, "string");
        }
        if (isNumber(value))
          return ctx.stylize("" + value, "number");
        if (isBoolean2(value))
          return ctx.stylize("" + value, "boolean");
        if (isNull2(value))
          return ctx.stylize("null", "null");
      }
      function formatError2(value) {
        return "[" + Error.prototype.toString.call(value) + "]";
      }
      function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
        var output = [];
        for (var i = 0, l = value.length; i < l; ++i) {
          if (hasOwnProperty(value, String(i))) {
            output.push(
              formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true)
            );
          } else {
            output.push("");
          }
        }
        keys.forEach(function(key) {
          if (!key.match(/^\d+$/)) {
            output.push(
              formatProperty(ctx, value, recurseTimes, visibleKeys, key, true)
            );
          }
        });
        return output;
      }
      function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
        var name2, str2, desc;
        desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
        if (desc.get) {
          if (desc.set) {
            str2 = ctx.stylize("[Getter/Setter]", "special");
          } else {
            str2 = ctx.stylize("[Getter]", "special");
          }
        } else {
          if (desc.set) {
            str2 = ctx.stylize("[Setter]", "special");
          }
        }
        if (!hasOwnProperty(visibleKeys, key)) {
          name2 = "[" + key + "]";
        }
        if (!str2) {
          if (ctx.seen.indexOf(desc.value) < 0) {
            if (isNull2(recurseTimes)) {
              str2 = formatValue(ctx, desc.value, null);
            } else {
              str2 = formatValue(ctx, desc.value, recurseTimes - 1);
            }
            if (str2.indexOf("\n") > -1) {
              if (array) {
                str2 = str2.split("\n").map(function(line) {
                  return "  " + line;
                }).join("\n").substr(2);
              } else {
                str2 = "\n" + str2.split("\n").map(function(line) {
                  return "   " + line;
                }).join("\n");
              }
            }
          } else {
            str2 = ctx.stylize("[Circular]", "special");
          }
        }
        if (isUndefined(name2)) {
          if (array && key.match(/^\d+$/)) {
            return str2;
          }
          name2 = JSON.stringify("" + key);
          if (name2.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
            name2 = name2.substr(1, name2.length - 2);
            name2 = ctx.stylize(name2, "name");
          } else {
            name2 = name2.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
            name2 = ctx.stylize(name2, "string");
          }
        }
        return name2 + ": " + str2;
      }
      function arrayToHash(array) {
        var hash = {};
        array.forEach(function(val, idx) {
          hash[val] = true;
        });
        return hash;
      }
      function reduceToSingleString(output, base, braces) {
        var numLinesEst = 0;
        var length = output.reduce(function(prev, cur) {
          numLinesEst++;
          if (cur.indexOf("\n") >= 0)
            numLinesEst++;
          return prev + cur.replace(/\u001b\[\d\d?m/g, "").length + 1;
        }, 0);
        if (length > 60) {
          return braces[0] + (base === "" ? "" : base + "\n ") + " " + output.join(",\n  ") + " " + braces[1];
        }
        return braces[0] + base + " " + output.join(", ") + " " + braces[1];
      }
      function formatValue(ctx, value, recurseTimes) {
        if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
        value.inspect !== inspect && // Also filter out any prototype objects using the circular check.
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
          return formatError2(value);
        }
        if (keys.length === 0) {
          if (isFunction(value)) {
            var name2 = value.name ? ": " + value.name : "";
            return ctx.stylize("[Function" + name2 + "]", "special");
          }
          if (isRegExp(value)) {
            return ctx.stylize(RegExp.prototype.toString.call(value), "regexp");
          }
          if (isDate(value)) {
            return ctx.stylize(Date.prototype.toString.call(value), "date");
          }
          if (isError(value)) {
            return formatError2(value);
          }
        }
        var base = "", array = false, braces = ["{", "}"];
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
          base = " " + formatError2(value);
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
          output = keys.map(function(key) {
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
        if (arguments.length >= 3)
          ctx.depth = arguments[2];
        if (arguments.length >= 4)
          ctx.colors = arguments[3];
        if (isBoolean2(opts)) {
          ctx.showHidden = opts;
        } else if (opts) {
          _extend(ctx, opts);
        }
        if (isUndefined(ctx.showHidden))
          ctx.showHidden = false;
        if (isUndefined(ctx.depth))
          ctx.depth = 2;
        if (isUndefined(ctx.colors))
          ctx.colors = false;
        if (isUndefined(ctx.customInspect))
          ctx.customInspect = true;
        if (ctx.colors)
          ctx.stylize = stylizeWithColor;
        return formatValue(ctx, obj, ctx.depth);
      }
      var init_util = __esm({
        "src/util.ts"() {
          "use strict";
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
      var require_shared = __commonJS3({
        "src/shared.ts"(exports2, module2) {
          "use strict";
          var import_cosmokit16 = require_lib();
          var c16 = [6, 2, 3, 4, 5, 1];
          var c256 = [
            20,
            21,
            26,
            27,
            32,
            33,
            38,
            39,
            40,
            41,
            42,
            43,
            44,
            45,
            56,
            57,
            62,
            63,
            68,
            69,
            74,
            75,
            76,
            77,
            78,
            79,
            80,
            81,
            92,
            93,
            98,
            99,
            112,
            113,
            129,
            134,
            135,
            148,
            149,
            160,
            161,
            162,
            163,
            164,
            165,
            166,
            167,
            168,
            169,
            170,
            171,
            172,
            173,
            178,
            179,
            184,
            185,
            196,
            197,
            198,
            199,
            200,
            201,
            202,
            203,
            204,
            205,
            206,
            207,
            208,
            209,
            214,
            215,
            220,
            221
          ];
          function isAggregateError(error) {
            return error instanceof Error && Array.isArray(error["errors"]);
          }
          var _Logger = class _Logger2 {
            constructor(name2, meta) {
              this.name = name2;
              this.meta = meta;
              __publicField2(this, "extend", (namespace) => {
                return new _Logger2(`${this.name}:${namespace}`);
              });
              __publicField2(this, "warning", (format, ...args) => {
                this.warn(format, ...args);
              });
              this.createMethod("success", _Logger2.SUCCESS);
              this.createMethod("error", _Logger2.ERROR);
              this.createMethod("info", _Logger2.INFO);
              this.createMethod("warn", _Logger2.WARN);
              this.createMethod("debug", _Logger2.DEBUG);
            }
            static format(name2, formatter) {
              this.formatters[name2] = formatter;
            }
            static color(target, code, value, decoration = "") {
              if (!target.colors)
                return "" + value;
              return `\x1B[3${code < 8 ? code : "8;5;" + code}${target.colors >= 2 ? decoration : ""}m${value}\x1B[0m`;
            }
            static code(name2, target) {
              let hash = 0;
              for (let i = 0; i < name2.length; i++) {
                hash = (hash << 3) - hash + name2.charCodeAt(i) + 13;
                hash |= 0;
              }
              const colors = !target.colors ? [] : target.colors >= 2 ? c256 : c16;
              return colors[Math.abs(hash) % colors.length];
            }
            static render(target, record) {
              var _a25, _b5, _c2, _d, _e, _f;
              const prefix = `[${record.type[0].toUpperCase()}]`;
              const space = " ".repeat((_b5 = (_a25 = target.label) == null ? void 0 : _a25.margin) != null ? _b5 : 1);
              let indent = 3 + space.length, output = "";
              if (target.showTime) {
                indent += target.showTime.length + space.length;
                output += _Logger2.color(target, 8, import_cosmokit16.Time.template(target.showTime)) + space;
              }
              const code = _Logger2.code(record.name, target);
              const label = _Logger2.color(target, code, record.name, ";1");
              const padLength = ((_d = (_c2 = target.label) == null ? void 0 : _c2.width) != null ? _d : 0) + label.length - record.name.length;
              if (((_e = target.label) == null ? void 0 : _e.align) === "right") {
                output += label.padStart(padLength) + space + prefix + space;
                indent += ((_f = target.label.width) != null ? _f : 0) + space.length;
              } else {
                output += prefix + space + label.padEnd(padLength) + space;
              }
              output += record.content.replace(/\n/g, "\n" + " ".repeat(indent));
              if (target.showDiff && target.timestamp) {
                const diff = record.timestamp - target.timestamp;
                output += _Logger2.color(target, code, " +" + import_cosmokit16.Time.format(diff));
              }
              return output;
            }
            createMethod(type2, level) {
              this[type2] = (...args) => {
                if (args.length === 1 && args[0] instanceof Error) {
                  if (args[0].cause) {
                    this[type2](args[0].cause);
                  } else if (isAggregateError(args[0])) {
                    args[0].errors.forEach((error) => this[type2](error));
                    return;
                  }
                }
                const id = ++_Logger2.id;
                const timestamp2 = Date.now();
                for (const target of _Logger2.targets) {
                  if (this.getLevel(target) < level)
                    continue;
                  const content = this.format(target, ...args);
                  const record = { id, type: type2, level, name: this.name, meta: this.meta, content, timestamp: timestamp2 };
                  if (target.record) {
                    target.record(record);
                  } else {
                    const { print = console.log } = target;
                    print(_Logger2.render(target, record));
                  }
                  target.timestamp = timestamp2;
                }
              };
            }
            format(target, ...args) {
              if (args[0] instanceof Error) {
                args[0] = `${args[0].message}
${args[0].stack}`;
                args.unshift("%s");
              } else if (typeof args[0] !== "string") {
                args.unshift("%o");
              }
              let format = args.shift();
              format = format.replace(/%([a-zA-Z%])/g, (match, char) => {
                if (match === "%%")
                  return "%";
                const formatter = _Logger2.formatters[char];
                if (typeof formatter === "function") {
                  const value = args.shift();
                  return formatter(value, target, this);
                }
                return match;
              });
              for (let arg of args) {
                if (typeof arg === "object" && arg) {
                  arg = _Logger2.formatters["o"](arg, target, this);
                }
                format += " " + arg;
              }
              const { maxLength = 10240 } = target;
              return format.split(/\r?\n/g).map((line) => {
                return line.slice(0, maxLength) + (line.length > maxLength ? "..." : "");
              }).join("\n");
            }
            getLevel(target) {
              var _a25;
              const paths = this.name.split(":");
              let config = (target == null ? void 0 : target.levels) || _Logger2.levels;
              do {
                config = (_a25 = config[paths.shift()]) != null ? _a25 : config["base"];
              } while (paths.length && typeof config === "object");
              return config;
            }
            get level() {
              return this.getLevel();
            }
            set level(value) {
              const paths = this.name.split(":");
              let config = _Logger2.levels;
              while (paths.length > 1) {
                const name2 = paths.shift();
                const value2 = config[name2];
                if (typeof value2 === "object") {
                  config = value2;
                } else {
                  config = config[name2] = { base: value2 != null ? value2 : config.base };
                }
              }
              config[paths[0]] = value;
            }
          };
          __publicField2(_Logger, "SILENT", 0);
          __publicField2(_Logger, "SUCCESS", 1);
          __publicField2(_Logger, "ERROR", 1);
          __publicField2(_Logger, "INFO", 2);
          __publicField2(_Logger, "WARN", 2);
          __publicField2(_Logger, "DEBUG", 3);
          __publicField2(_Logger, "id", 0);
          __publicField2(_Logger, "targets", [{
            colors: 3,
            print(text) {
              logger.info(text);
            }
          }]);
          __publicField2(_Logger, "formatters", /* @__PURE__ */ Object.create(null));
          __publicField2(_Logger, "levels", {
            base: 2
          });
          var Logger22 = _Logger;
          Logger22.format("s", (value) => value);
          Logger22.format("d", (value) => +value);
          Logger22.format("j", (value) => JSON.stringify(value));
          Logger22.format("c", (value, target, logger2) => {
            return Logger22.color(target, Logger22.code(logger2.name, target), value);
          });
          Logger22.format("C", (value, target) => {
            return Logger22.color(target, 15, value, ";1");
          });
          module2.exports = Logger22;
        }
      });
      var require_node = __commonJS3({
        "src/node.ts"(exports2, module2) {
          "use strict";
          init_util();
          var import_shared = __toESM2(require_shared());
          import_shared.default.format("o", (value, target) => {
            return inspect(value, { colors: !!target.colors, depth: Infinity }).replace(/\s*\n\s*/g, " ");
          });
          module2.exports = import_shared.default;
        }
      });
      var import_node = __toESM2(require_node());
      module.exports = import_node.default;
    }
  });

  // ../../node_modules/schemastery/lib/index.cjs
  var require_lib3 = __commonJS({
    "../../node_modules/schemastery/lib/index.cjs"(exports, module) {
      "use strict";
      var __defProp11 = Object.defineProperty;
      var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
      var import_cosmokit16 = require_lib();
      var kSchema = Symbol.for("schemastery");
      var _a25;
      (_a25 = globalThis.__schemastery_index__) != null ? _a25 : globalThis.__schemastery_index__ = 0;
      var Schema2 = /* @__PURE__ */ __name10(function(options) {
        const schema2 = /* @__PURE__ */ __name10(function(data, options2) {
          return Schema2.resolve(data, schema2, options2)[0];
        }, "schema");
        if (options.refs) {
          const refs2 = (0, import_cosmokit16.valueMap)(options.refs, (options2) => new Schema2(options2));
          const getRef = /* @__PURE__ */ __name10((uid) => refs2[uid], "getRef");
          for (const key in refs2) {
            const options2 = refs2[key];
            options2.sKey = getRef(options2.sKey);
            options2.inner = getRef(options2.inner);
            options2.list = options2.list && options2.list.map(getRef);
            options2.dict = options2.dict && (0, import_cosmokit16.valueMap)(options2.dict, getRef);
          }
          return refs2[options.uid];
        }
        Object.assign(schema2, options);
        if (typeof schema2.callback === "string") {
          try {
            schema2.callback = new Function("return " + schema2.callback)();
          } catch {
          }
        }
        Object.defineProperty(schema2, "uid", { value: globalThis.__schemastery_index__++ });
        Object.setPrototypeOf(schema2, Schema2.prototype);
        schema2.meta || (schema2.meta = {});
        schema2.toString = schema2.toString.bind(schema2);
        return schema2;
      }, "Schema");
      Schema2.prototype = Object.create(Function.prototype);
      Schema2.prototype[kSchema] = true;
      var refs;
      Schema2.prototype.toJSON = /* @__PURE__ */ __name10(function toJSON() {
        var _a26, _b5;
        if (refs) {
          (_b5 = refs[_a26 = this.uid]) != null ? _b5 : refs[_a26] = JSON.parse(JSON.stringify({ ...this }));
          return this.uid;
        }
        refs = { [this.uid]: { ...this } };
        refs[this.uid] = JSON.parse(JSON.stringify({ ...this }));
        const result = { uid: this.uid, refs };
        refs = void 0;
        return result;
      }, "toJSON");
      Schema2.prototype.set = /* @__PURE__ */ __name10(function set2(key, value) {
        this.dict[key] = value;
        return this;
      }, "set");
      Schema2.prototype.push = /* @__PURE__ */ __name10(function push(value) {
        this.list.push(value);
        return this;
      }, "push");
      function mergeDesc(original, messages) {
        const result = typeof original === "string" ? { "": original } : { ...original };
        for (const locale in messages) {
          const value = messages[locale];
          if ((value == null ? void 0 : value.$description) || (value == null ? void 0 : value.$desc)) {
            result[locale] = value.$description || value.$desc;
          } else if (typeof value === "string") {
            result[locale] = value;
          }
        }
        return result;
      }
      __name10(mergeDesc, "mergeDesc");
      function getInner(value) {
        var _a26;
        return (_a26 = value == null ? void 0 : value.$value) != null ? _a26 : value == null ? void 0 : value.$inner;
      }
      __name10(getInner, "getInner");
      function extractKeys(data) {
        return Object.fromEntries(Object.entries(data != null ? data : {}).filter(([key]) => !key.startsWith("$")));
      }
      __name10(extractKeys, "extractKeys");
      Schema2.prototype.i18n = /* @__PURE__ */ __name10(function i18n(messages) {
        const schema2 = Schema2(this);
        schema2.meta.description = mergeDesc(schema2.meta.description, messages);
        if (schema2.dict) {
          schema2.dict = (0, import_cosmokit16.valueMap)(schema2.dict, (inner, key) => {
            return inner.i18n((0, import_cosmokit16.valueMap)(messages, (data) => {
              var _a26, _b5;
              return (_b5 = (_a26 = getInner(data)) == null ? void 0 : _a26[key]) != null ? _b5 : data == null ? void 0 : data[key];
            }));
          });
        }
        if (schema2.list) {
          schema2.list = schema2.list.map((inner, index) => {
            return inner.i18n((0, import_cosmokit16.valueMap)(messages, (data = {}) => {
              if (Array.isArray(getInner(data)))
                return getInner(data)[index];
              if (Array.isArray(data))
                return data[index];
              return extractKeys(data);
            }));
          });
        }
        if (schema2.inner) {
          schema2.inner = schema2.inner.i18n((0, import_cosmokit16.valueMap)(messages, (data) => {
            if (getInner(data))
              return getInner(data);
            return extractKeys(data);
          }));
        }
        if (schema2.sKey) {
          schema2.sKey = schema2.sKey.i18n((0, import_cosmokit16.valueMap)(messages, (data) => data == null ? void 0 : data.$key));
        }
        return schema2;
      }, "i18n");
      Schema2.prototype.extra = /* @__PURE__ */ __name10(function extra(key, value) {
        const schema2 = Schema2(this);
        schema2.meta = { ...schema2.meta, [key]: value };
        return schema2;
      }, "extra");
      for (const key of ["required", "disabled", "collapse", "hidden", "loose"]) {
        Object.assign(Schema2.prototype, {
          [key](value = true) {
            const schema2 = Schema2(this);
            schema2.meta = { ...schema2.meta, [key]: value };
            return schema2;
          }
        });
      }
      Schema2.prototype.deprecated = /* @__PURE__ */ __name10(function deprecated() {
        var _a26;
        const schema2 = Schema2(this);
        (_a26 = schema2.meta).badges || (_a26.badges = []);
        schema2.meta.badges.push({ text: "deprecated", type: "danger" });
        return schema2;
      }, "deprecated");
      Schema2.prototype.experimental = /* @__PURE__ */ __name10(function experimental() {
        var _a26;
        const schema2 = Schema2(this);
        (_a26 = schema2.meta).badges || (_a26.badges = []);
        schema2.meta.badges.push({ text: "experimental", type: "warning" });
        return schema2;
      }, "experimental");
      Schema2.prototype.pattern = /* @__PURE__ */ __name10(function pattern(regexp) {
        const schema2 = Schema2(this);
        const pattern2 = (0, import_cosmokit16.pick)(regexp, ["source", "flags"]);
        schema2.meta = { ...schema2.meta, pattern: pattern2 };
        return schema2;
      }, "pattern");
      Schema2.prototype.simplify = /* @__PURE__ */ __name10(function simplify(value) {
        if ((0, import_cosmokit16.deepEqual)(value, this.meta.default))
          return null;
        if ((0, import_cosmokit16.isNullable)(value))
          return value;
        if (this.type === "object" || this.type === "dict") {
          const result = {};
          for (const key in value) {
            const schema2 = this.type === "object" ? this.dict[key] : this.inner;
            const item = schema2 == null ? void 0 : schema2.simplify(value[key]);
            if (!(0, import_cosmokit16.isNullable)(item))
              result[key] = item;
          }
          return result;
        } else if (this.type === "array" || this.type === "tuple") {
          const result = [];
          value.forEach((value2, index) => {
            const schema2 = this.type === "array" ? this.inner : this.list[index];
            const item = schema2 ? schema2.simplify(value2) : value2;
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
          for (const schema2 of this.list) {
            try {
              Schema2.resolve(value, schema2);
              return schema2.simplify(value);
            } catch {
            }
          }
        }
        return value;
      }, "simplify");
      Schema2.prototype.toString = /* @__PURE__ */ __name10(function toString2(inline) {
        var _a26, _b5;
        return (_b5 = (_a26 = formatters[this.type]) == null ? void 0 : _a26.call(formatters, this, inline)) != null ? _b5 : `Schema<${this.type}>`;
      }, "toString");
      Schema2.prototype.role = /* @__PURE__ */ __name10(function role(role, extra2) {
        const schema2 = Schema2(this);
        schema2.meta = { ...schema2.meta, role, extra: extra2 };
        return schema2;
      }, "role");
      for (const key of ["default", "link", "comment", "description", "max", "min", "step"]) {
        Object.assign(Schema2.prototype, {
          [key](value) {
            const schema2 = Schema2(this);
            schema2.meta = { ...schema2.meta, [key]: value };
            return schema2;
          }
        });
      }
      var resolvers = {};
      Schema2.extend = /* @__PURE__ */ __name10(function extend3(type2, resolve2) {
        resolvers[type2] = resolve2;
      }, "extend");
      Schema2.resolve = /* @__PURE__ */ __name10(function resolve(data, schema2, options = {}, strict = false) {
        if (!schema2)
          return [data];
        if ((0, import_cosmokit16.isNullable)(data)) {
          if (schema2.meta.required)
            throw new TypeError(`missing required value`);
          let current = schema2;
          let fallback = schema2.meta.default;
          while ((current == null ? void 0 : current.type) === "intersect" && (0, import_cosmokit16.isNullable)(fallback)) {
            current = current.list[0];
            fallback = current == null ? void 0 : current.meta.default;
          }
          if ((0, import_cosmokit16.isNullable)(fallback))
            return [data];
          data = (0, import_cosmokit16.clone)(fallback);
        }
        const callback = resolvers[schema2.type];
        if (!callback)
          throw new TypeError(`unsupported type "${schema2.type}"`);
        try {
          return callback(data, schema2, options, strict);
        } catch (error) {
          if (!schema2.meta.loose)
            throw error;
          return [schema2.meta.default];
        }
      }, "resolve");
      Schema2.from = /* @__PURE__ */ __name10(function from(source) {
        if ((0, import_cosmokit16.isNullable)(source)) {
          return Schema2.any();
        } else if (["string", "number", "boolean"].includes(typeof source)) {
          return Schema2.const(source).required();
        } else if (source[kSchema]) {
          return source;
        } else if (typeof source === "function") {
          switch (source) {
            case String:
              return Schema2.string().required();
            case Number:
              return Schema2.number().required();
            case Boolean:
              return Schema2.boolean().required();
            case Function:
              return Schema2.function().required();
            default:
              return Schema2.is(source).required();
          }
        } else {
          throw new TypeError(`cannot infer schema from ${source}`);
        }
      }, "from");
      Schema2.natural = /* @__PURE__ */ __name10(function natural() {
        return Schema2.number().step(1).min(0);
      }, "natural");
      Schema2.percent = /* @__PURE__ */ __name10(function percent() {
        return Schema2.number().step(0.01).min(0).max(1).role("slider");
      }, "percent");
      Schema2.date = /* @__PURE__ */ __name10(function date() {
        return Schema2.union([
          Schema2.is(Date),
          Schema2.transform(Schema2.string().role("datetime"), (value) => {
            const date2 = new Date(value);
            if (isNaN(+date2))
              throw new TypeError(`invalid date "${value}"`);
            return date2;
          }, true)
        ]);
      }, "date");
      Schema2.extend("any", (data) => {
        return [data];
      });
      Schema2.extend("never", (data) => {
        throw new TypeError(`expected nullable but got ${data}`);
      });
      Schema2.extend("const", (data, { value }) => {
        if (data === value)
          return [value];
        throw new TypeError(`expected ${value} but got ${data}`);
      });
      function checkWithinRange(data, meta, description) {
        const { max = Infinity, min = -Infinity } = meta;
        if (data > max)
          throw new TypeError(`expected ${description} <= ${max} but got ${data}`);
        if (data < min)
          throw new TypeError(`expected ${description} >= ${min} but got ${data}`);
      }
      __name10(checkWithinRange, "checkWithinRange");
      Schema2.extend("string", (data, { meta }) => {
        if (typeof data !== "string")
          throw new TypeError(`expected string but got ${data}`);
        if (meta.pattern) {
          const regexp = new RegExp(meta.pattern.source, meta.pattern.flags);
          if (!regexp.test(data))
            throw new TypeError(`expect string to match regexp ${regexp}`);
        }
        checkWithinRange(data.length, meta, "string length");
        return [data];
      });
      function decimalShift(data, digits) {
        const str2 = data.toString();
        if (str2.includes("e"))
          return data * Math.pow(10, digits);
        const index = str2.indexOf(".");
        if (index === -1)
          return data * Math.pow(10, digits);
        const frac = str2.slice(index + 1);
        const integer = str2.slice(0, index);
        if (frac.length <= digits)
          return +(integer + frac.padEnd(digits, "0"));
        return +(integer + frac.slice(0, digits) + "." + frac.slice(digits));
      }
      __name10(decimalShift, "decimalShift");
      function isMultipleOf(data, min, step) {
        step = Math.abs(step);
        if (!/^\d+\.\d+$/.test(step.toString())) {
          return (data - min) % step === 0;
        }
        const index = step.toString().indexOf(".");
        const digits = step.toString().slice(index + 1).length;
        return Math.abs(decimalShift(data, digits) - decimalShift(min, digits)) % decimalShift(step, digits) === 0;
      }
      __name10(isMultipleOf, "isMultipleOf");
      Schema2.extend("number", (data, { meta }) => {
        var _a26;
        if (typeof data !== "number")
          throw new TypeError(`expected number but got ${data}`);
        checkWithinRange(data, meta, "number");
        const { step } = meta;
        if (step && !isMultipleOf(data, (_a26 = meta.min) != null ? _a26 : 0, step)) {
          throw new TypeError(`expected number multiple of ${step} but got ${data}`);
        }
        return [data];
      });
      Schema2.extend("boolean", (data) => {
        if (typeof data === "boolean")
          return [data];
        throw new TypeError(`expected boolean but got ${data}`);
      });
      Schema2.extend("bitset", (data, { bits, meta }) => {
        let value = 0, keys = [];
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
            if (typeof key !== "string")
              throw new TypeError(`expected string but got ${key}`);
            if (key in bits)
              value |= bits[key];
          }
        } else {
          throw new TypeError(`expected number or array but got ${data}`);
        }
        if (value === meta.default)
          return [value];
        return [value, keys];
      });
      Schema2.extend("function", (data) => {
        if (typeof data === "function")
          return [data];
        throw new TypeError(`expected function but got ${data}`);
      });
      Schema2.extend("is", (data, { callback }) => {
        if (data instanceof callback)
          return [data];
        throw new TypeError(`expected ${callback.name} but got ${data}`);
      });
      function property(data, key, schema2, options) {
        try {
          const [value, adapted] = Schema2.resolve(data[key], schema2, options);
          if (adapted !== void 0)
            data[key] = adapted;
          return value;
        } catch (e) {
          if (!(options == null ? void 0 : options.autofix))
            throw e;
          delete data[key];
          return schema2.meta.default;
        }
      }
      __name10(property, "property");
      Schema2.extend("array", (data, { inner, meta }, options) => {
        if (!Array.isArray(data))
          throw new TypeError(`expected array but got ${data}`);
        checkWithinRange(data.length, meta, "array length");
        return [data.map((_, index) => property(data, index, inner, options))];
      });
      Schema2.extend("dict", (data, { inner, sKey }, options, strict) => {
        if (!(0, import_cosmokit16.isPlainObject)(data))
          throw new TypeError(`expected object but got ${data}`);
        const result = {};
        for (const key in data) {
          let rKey;
          try {
            rKey = Schema2.resolve(key, sKey)[0];
          } catch (error) {
            if (strict)
              continue;
            throw error;
          }
          result[rKey] = property(data, key, inner, options);
          data[rKey] = data[key];
          if (key !== rKey)
            delete data[key];
        }
        return [result];
      });
      Schema2.extend("tuple", (data, { list }, options, strict) => {
        if (!Array.isArray(data))
          throw new TypeError(`expected array but got ${data}`);
        const result = list.map((inner, index) => property(data, index, inner, options));
        if (strict)
          return [result];
        result.push(...data.slice(list.length));
        return [result];
      });
      function merge2(result, data) {
        for (const key in data) {
          if (key in result)
            continue;
          result[key] = data[key];
        }
      }
      __name10(merge2, "merge");
      Schema2.extend("object", (data, { dict }, options, strict) => {
        if (!(0, import_cosmokit16.isPlainObject)(data))
          throw new TypeError(`expected object but got ${data}`);
        const result = {};
        for (const key in dict) {
          const value = property(data, key, dict[key], options);
          if (!(0, import_cosmokit16.isNullable)(value) || key in data) {
            result[key] = value;
          }
        }
        if (!strict)
          merge2(result, data);
        return [result];
      });
      Schema2.extend("union", (data, { list, toString: toString2 }, options, strict) => {
        const messages = [];
        for (const inner of list) {
          try {
            return Schema2.resolve(data, inner, options, strict);
          } catch (error) {
            messages.push(error);
          }
        }
        throw new TypeError(`expected ${toString2()} but got ${JSON.stringify(data)}`);
      });
      Schema2.extend("intersect", (data, { list, toString: toString2 }, options, strict) => {
        let result;
        for (const inner of list) {
          const value = Schema2.resolve(data, inner, options, true)[0];
          if ((0, import_cosmokit16.isNullable)(value))
            continue;
          if ((0, import_cosmokit16.isNullable)(result)) {
            result = value;
          } else if (typeof result !== typeof value) {
            throw new TypeError(`expected ${toString2()} but got ${JSON.stringify(data)}`);
          } else if (typeof value === "object") {
            merge2(result != null ? result : result = {}, value);
          } else if (result !== value) {
            throw new TypeError(`expected ${toString2()} but got ${JSON.stringify(data)}`);
          }
        }
        if (!strict && (0, import_cosmokit16.isPlainObject)(data))
          merge2(result, data);
        return [result];
      });
      Schema2.extend("transform", (data, { inner, callback, preserve }, options) => {
        const [result, adapted = data] = Schema2.resolve(data, inner, options, true);
        if (preserve) {
          return [callback(result)];
        } else {
          return [callback(result), callback(adapted)];
        }
      });
      var formatters = {};
      function defineMethod(name2, keys, format) {
        formatters[name2] = format;
        Object.assign(Schema2, {
          [name2](...args) {
            const schema2 = new Schema2({ type: name2 });
            keys.forEach((key, index) => {
              var _a26, _b5;
              switch (key) {
                case "sKey":
                  schema2.sKey = (_a26 = args[index]) != null ? _a26 : Schema2.string();
                  break;
                case "inner":
                  schema2.inner = Schema2.from(args[index]);
                  break;
                case "list":
                  schema2.list = args[index].map(Schema2.from);
                  break;
                case "dict":
                  schema2.dict = (0, import_cosmokit16.valueMap)(args[index], Schema2.from);
                  break;
                case "bits": {
                  schema2.bits = {};
                  for (const key2 in args[index]) {
                    if (typeof args[index][key2] !== "number")
                      continue;
                    schema2.bits[key2] = args[index][key2];
                  }
                  break;
                }
                case "callback": {
                  schema2.callback = args[index];
                  (_b5 = schema2.callback)["toJSON"] || (_b5["toJSON"] = () => schema2.callback.toString());
                  break;
                }
                default:
                  schema2[key] = args[index];
              }
            });
            if (name2 === "object" || name2 === "dict") {
              schema2.meta.default = {};
            } else if (name2 === "array" || name2 === "tuple") {
              schema2.meta.default = [];
            } else if (name2 === "bitset") {
              schema2.meta.default = 0;
            }
            return schema2;
          }
        });
      }
      __name10(defineMethod, "defineMethod");
      defineMethod("is", ["callback"], ({ callback }) => callback.name);
      defineMethod("any", [], () => "any");
      defineMethod("never", [], () => "never");
      defineMethod("const", ["value"], ({ value }) => typeof value === "string" ? JSON.stringify(value) : value);
      defineMethod("string", [], () => "string");
      defineMethod("number", [], () => "number");
      defineMethod("boolean", [], () => "boolean");
      defineMethod("bitset", ["bits"], () => "bitset");
      defineMethod("function", [], () => "function");
      defineMethod("array", ["inner"], ({ inner }) => `${inner.toString(true)}[]`);
      defineMethod("dict", ["inner", "sKey"], ({ inner, sKey }) => `{ [key: ${sKey.toString()}]: ${inner.toString()} }`);
      defineMethod("tuple", ["list"], ({ list }) => `[${list.map((inner) => inner.toString()).join(", ")}]`);
      defineMethod("object", ["dict"], ({ dict }) => {
        if (Object.keys(dict).length === 0)
          return "{}";
        return `{ ${Object.entries(dict).map(([key, inner]) => {
          return `${key}${inner.meta.required ? "" : "?"}: ${inner.toString()}`;
        }).join(", ")} }`;
      });
      defineMethod("union", ["list"], ({ list }, inline) => {
        const result = list.map(({ toString: format }) => format()).join(" | ");
        return inline ? `(${result})` : result;
      });
      defineMethod("intersect", ["list"], ({ list }) => {
        return `${list.map((inner) => inner.toString(true)).join(" & ")}`;
      });
      defineMethod("transform", ["inner", "callback", "preserve"], ({ inner }, isInner) => inner.toString(isInner));
      module.exports = Schema2;
    }
  });

  // ../cordis/packages/core/lib/index.cjs
  var require_lib4 = __commonJS({
    "../cordis/packages/core/lib/index.cjs"(exports, module) {
      "use strict";
      var __defProp11 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
      var __export2 = (target, all) => {
        for (var name2 in all)
          __defProp11(target, name2, { get: all[name2], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp11({}, "__esModule", { value: true }), mod);
      var src_exports2 = {};
      __export2(src_exports2, {
        Context: () => Context4,
        CordisError: () => CordisError2,
        EffectScope: () => EffectScope2,
        ForkScope: () => ForkScope2,
        Lifecycle: () => Lifecycle2,
        MainScope: () => MainScope2,
        Registry: () => Registry2,
        ScopeStatus: () => ScopeStatus2,
        Service: () => Service3,
        applyTraceable: () => applyTraceable2,
        createCallable: () => createCallable2,
        createTraceable: () => createTraceable2,
        isApplicable: () => isApplicable2,
        isBailed: () => isBailed2,
        isConstructor: () => isConstructor2,
        isUnproxyable: () => isUnproxyable2,
        joinPrototype: () => joinPrototype2,
        resolveConfig: () => resolveConfig2,
        symbols: () => symbols2
      });
      module.exports = __toCommonJS2(src_exports2);
      var import_cosmokit52 = require_lib();
      var import_cosmokit16 = require_lib();
      function isBailed2(value) {
        return value !== null && value !== false && value !== void 0;
      }
      __name10(isBailed2, "isBailed");
      var _a25;
      var Lifecycle2 = (_a25 = class {
        constructor(root2) {
          __publicField(this, "isActive", false);
          __publicField(this, "_tasks", /* @__PURE__ */ new Set());
          __publicField(this, "_hooks", {});
          this.root = root2;
          (0, import_cosmokit16.defineProperty)(this, Context4.origin, root2);
          (0, import_cosmokit16.defineProperty)(this.on("internal/listener", function(name2, listener, prepend) {
            const method = prepend ? "unshift" : "push";
            if (name2 === "ready") {
              if (!this.lifecycle.isActive)
                return;
              this.scope.ensure(async () => listener());
              return () => false;
            } else if (name2 === "dispose") {
              this.scope.disposables[method](listener);
              (0, import_cosmokit16.defineProperty)(listener, "name", "event <dispose>");
              return () => (0, import_cosmokit16.remove)(this.scope.disposables, listener);
            } else if (name2 === "fork") {
              this.scope.runtime.forkables[method](listener);
              return this.scope.collect("event <fork>", () => (0, import_cosmokit16.remove)(this.scope.runtime.forkables, listener));
            }
          }), Context4.static, root2.scope);
          for (const level of ["info", "error", "warning"]) {
            (0, import_cosmokit16.defineProperty)(this.on(`internal/${level}`, (format, ...param) => {
              if (this._hooks[`internal/${level}`].length > 1)
                return;
              console.info(format, ...param);
            }), Context4.static, root2.scope);
          }
        }
        async flush() {
          while (this._tasks.size) {
            await Promise.all(Array.from(this._tasks));
          }
        }
        getHooks(name2, thisArg) {
          const hooks = this._hooks[name2] || [];
          return hooks.slice().filter(([context]) => {
            const filter = thisArg?.[Context4.filter];
            return !filter || filter.call(thisArg, context);
          }).map(([, callback]) => callback);
        }
        prepareEvent(type2, args) {
          const thisArg = typeof args[0] === "object" ? args.shift() : null;
          const name2 = args.shift();
          if (name2 !== "internal/event") {
            this.emit("internal/event", type2, name2, args, thisArg);
          }
          return [this.getHooks(name2, thisArg), thisArg ?? this[Context4.origin]];
        }
        async parallel(...args) {
          const [hooks, thisArg] = this.prepareEvent("parallel", args);
          await Promise.all(hooks.map(async (callback) => {
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
            if (isBailed2(result))
              return result;
          }
        }
        bail(...args) {
          const [hooks, thisArg] = this.prepareEvent("bail", args);
          for (const callback of hooks) {
            const result = callback.apply(thisArg, args);
            if (isBailed2(result))
              return result;
          }
        }
        register(label, hooks, listener, prepend) {
          const caller = this[Context4.origin];
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
        on(name2, listener, prepend = false) {
          var _a33;
          const caller = this[Context4.origin];
          caller.scope.assertActive();
          const result = this.bail(caller, "internal/listener", name2, listener, prepend);
          if (result)
            return result;
          const hooks = (_a33 = this._hooks)[name2] || (_a33[name2] = []);
          const label = typeof name2 === "string" ? `event <${name2}>` : "event (Symbol)";
          return this.register(label, hooks, listener, prepend);
        }
        once(name2, listener, prepend = false) {
          const dispose = this.on(name2, function(...args) {
            dispose();
            return listener.apply(this, args);
          }, prepend);
          return dispose;
        }
        off(name2, listener) {
          return this.unregister(this._hooks[name2] || [], listener);
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
      }, __name10(_a25, "Lifecycle"), _a25);
      var import_cosmokit42 = require_lib();
      var import_cosmokit32 = require_lib();
      var import_cosmokit22 = require_lib();
      var symbols2 = {
        // context symbols
        origin: Symbol.for("cordis.origin"),
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
      function isConstructor2(func) {
        if (!func.prototype)
          return false;
        if (func.prototype.constructor !== func)
          return false;
        return true;
      }
      __name10(isConstructor2, "isConstructor");
      function resolveConfig2(plugin, config) {
        const schema2 = plugin["Config"] || plugin["schema"];
        if (schema2 && plugin["schema"] !== false)
          config = schema2(config);
        return config ?? {};
      }
      __name10(resolveConfig2, "resolveConfig");
      function isUnproxyable2(value) {
        return [Map, Set, Date, Promise].some((constructor) => value instanceof constructor);
      }
      __name10(isUnproxyable2, "isUnproxyable");
      function joinPrototype2(proto1, proto2) {
        if (proto1 === Object.prototype)
          return proto2;
        const result = Object.create(joinPrototype2(Object.getPrototypeOf(proto1), proto2));
        for (const key of Reflect.ownKeys(proto1)) {
          Object.defineProperty(result, key, Object.getOwnPropertyDescriptor(proto1, key));
        }
        return result;
      }
      __name10(joinPrototype2, "joinPrototype");
      function createTraceable2(ctx, value) {
        const proxy = new Proxy(value, {
          get: (target, name2, receiver) => {
            if (name2 === symbols2.origin || name2 === "caller")
              return ctx;
            return Reflect.get(target, name2, receiver);
          },
          apply: (target, thisArg, args) => {
            return applyTraceable2(proxy, target, thisArg, args);
          }
        });
        return proxy;
      }
      __name10(createTraceable2, "createTraceable");
      function applyTraceable2(proxy, value, thisArg, args) {
        if (!value[symbols2.invoke])
          return Reflect.apply(value, thisArg, args);
        return value[symbols2.invoke].apply(proxy, args);
      }
      __name10(applyTraceable2, "applyTraceable");
      function createCallable2(name2, proto) {
        const self2 = /* @__PURE__ */ __name10(function(...args) {
          const proxy = createTraceable2(self2[symbols2.origin], self2);
          return applyTraceable2(proxy, self2, this, args);
        }, "self");
        (0, import_cosmokit22.defineProperty)(self2, "name", name2);
        return Object.setPrototypeOf(self2, proto);
      }
      __name10(createCallable2, "createCallable");
      var ScopeStatus2 = /* @__PURE__ */ ((ScopeStatus22) => {
        ScopeStatus22[ScopeStatus22["PENDING"] = 0] = "PENDING";
        ScopeStatus22[ScopeStatus22["LOADING"] = 1] = "LOADING";
        ScopeStatus22[ScopeStatus22["ACTIVE"] = 2] = "ACTIVE";
        ScopeStatus22[ScopeStatus22["FAILED"] = 3] = "FAILED";
        ScopeStatus22[ScopeStatus22["DISPOSED"] = 4] = "DISPOSED";
        return ScopeStatus22;
      })(ScopeStatus2 || {});
      var _a26;
      var CordisError2 = (_a26 = class extends Error {
        constructor(code, message) {
          super(message ?? _a26.Code[code]);
          this.code = code;
        }
      }, __name10(_a26, "CordisError"), _a26);
      ((CordisError22) => {
        CordisError22.Code = {
          INACTIVE_EFFECT: "cannot create effect on inactive context"
        };
      })(CordisError2 || (CordisError2 = {}));
      var _a27;
      var EffectScope2 = (_a27 = class {
        constructor(parent, config) {
          __publicField(this, "uid");
          __publicField(this, "ctx");
          __publicField(this, "disposables", []);
          __publicField(this, "error");
          __publicField(this, "status", 0);
          __publicField(this, "isActive", false);
          // Same as `this.ctx`, but with a more specific type.
          __publicField(this, "context");
          __publicField(this, "proxy");
          __publicField(this, "acceptors", []);
          __publicField(this, "tasks", /* @__PURE__ */ new Set());
          __publicField(this, "hasError", false);
          this.parent = parent;
          this.config = config;
          this.uid = parent.registry ? parent.registry.counter : 0;
          this.ctx = this.context = parent.extend({ scope: this });
          this.proxy = new Proxy({}, {
            get: (target, key) => Reflect.get(this.config, key)
          });
        }
        get _config() {
          return this.runtime.isReactive ? this.proxy : this.config;
        }
        assertActive() {
          if (this.uid !== null || this.isActive)
            return;
          throw new CordisError2("INACTIVE_EFFECT");
        }
        effect(callback, config) {
          this.assertActive();
          const result = isConstructor2(callback) ? new callback(this.ctx, config) : callback(this.ctx, config);
          let disposed = false;
          const original = typeof result === "function" ? result : result.dispose.bind(result);
          const wrapped = /* @__PURE__ */ __name10(() => {
            if (disposed)
              return;
            disposed = true;
            (0, import_cosmokit32.remove)(this.disposables, wrapped);
            return original();
          }, "wrapped");
          this.disposables.push(wrapped);
          if (typeof result === "function")
            return wrapped;
          result.dispose = wrapped;
          return result;
        }
        collect(label, callback) {
          const dispose = (0, import_cosmokit32.defineProperty)(() => {
            (0, import_cosmokit32.remove)(this.disposables, dispose);
            return callback();
          }, "name", label);
          this.disposables.push(dispose);
          return dispose;
        }
        restart() {
          this.reset();
          this.error = null;
          this.hasError = false;
          this.status = 0;
          this.start();
        }
        _getStatus() {
          if (this.uid === null)
            return 4;
          if (this.hasError)
            return 3;
          if (this.tasks.size)
            return 1;
          if (this.ready)
            return 2;
          return 0;
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
          const task = callback().catch((reason) => {
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
          if (!this.runtime.using.length)
            return;
          (0, import_cosmokit32.defineProperty)(this.context.on("internal/before-service", (name2) => {
            if (!this.runtime.using.includes(name2))
              return;
            this._updateStatus();
            this.reset();
          }), Context4.static, this);
          (0, import_cosmokit32.defineProperty)(this.context.on("internal/service", (name2) => {
            if (!this.runtime.using.includes(name2))
              return;
            this.start();
          }), Context4.static, this);
        }
        get ready() {
          return this.runtime.using.every((name2) => !(0, import_cosmokit32.isNullable)(this.ctx[name2]));
        }
        reset() {
          this.isActive = false;
          this.disposables = this.disposables.splice(0).filter((dispose) => {
            if (this.uid !== null && dispose[Context4.static] === this)
              return true;
            (async () => dispose())().catch((reason) => {
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
          if (!this.ready || this.isActive || this.uid === null)
            return true;
          this.isActive = true;
          this._updateStatus(() => this.hasError = false);
        }
        accept(...args) {
          const keys = Array.isArray(args[0]) ? args.shift() : null;
          const acceptor = { keys, callback: args[0], ...args[1] };
          return this.effect(() => {
            this.acceptors.push(acceptor);
            if (acceptor.immediate)
              acceptor.callback?.(this.config);
            return () => (0, import_cosmokit32.remove)(this.acceptors, acceptor);
          });
        }
        decline(keys) {
          return this.accept(keys, () => true);
        }
        checkUpdate(resolved, forced) {
          if (forced || !this.config)
            return [true, true];
          if (forced === false)
            return [false, false];
          const modified = /* @__PURE__ */ Object.create(null);
          const checkPropertyUpdate = /* @__PURE__ */ __name10((key) => {
            const result = modified[key] ?? (modified[key] = !(0, import_cosmokit32.deepEqual)(this.config[key], resolved[key]));
            hasUpdate || (hasUpdate = result);
            return result;
          }, "checkPropertyUpdate");
          const ignored = /* @__PURE__ */ new Set();
          let hasUpdate = false, shouldRestart = false;
          let fallback = this.runtime.isReactive || null;
          for (const { keys, callback, passive } of this.acceptors) {
            if (!keys) {
              fallback || (fallback = !passive);
            } else if (passive) {
              keys?.forEach((key) => ignored.add(key));
            } else {
              let hasUpdate2 = false;
              for (const key of keys) {
                hasUpdate2 || (hasUpdate2 = checkPropertyUpdate(key));
              }
              if (!hasUpdate2)
                continue;
            }
            const result = callback?.(resolved);
            if (result)
              shouldRestart = true;
          }
          for (const key in { ...this.config, ...resolved }) {
            if (fallback === false)
              continue;
            if (!(key in modified) && !ignored.has(key)) {
              const hasUpdate2 = checkPropertyUpdate(key);
              if (fallback === null)
                shouldRestart || (shouldRestart = hasUpdate2);
            }
          }
          return [hasUpdate, shouldRestart];
        }
      }, __name10(_a27, "EffectScope"), _a27);
      var _a28;
      var ForkScope2 = (_a28 = class extends EffectScope2 {
        constructor(parent, runtime, config, error) {
          super(parent, config);
          __publicField(this, "dispose");
          this.runtime = runtime;
          this.dispose = (0, import_cosmokit32.defineProperty)(parent.scope.collect(`fork <${parent.runtime.name}>`, () => {
            this.uid = null;
            this.reset();
            this.context.emit("internal/fork", this);
            const result = (0, import_cosmokit32.remove)(runtime.disposables, this.dispose);
            if ((0, import_cosmokit32.remove)(runtime.children, this) && !runtime.children.length) {
              parent.registry.delete(runtime.plugin);
            }
            return result;
          }), Context4.static, runtime);
          runtime.children.push(this);
          runtime.disposables.push(this.dispose);
          this.context.emit("internal/fork", this);
          if (runtime.isReusable) {
            this.setupInject();
          }
          this.init(error);
        }
        start() {
          if (super.start())
            return true;
          for (const fork of this.runtime.forkables) {
            this.ensure(async () => fork(this.context, this._config));
          }
        }
        update(config, forced) {
          const oldConfig = this.config;
          const state = this.runtime.isForkable ? this : this.runtime;
          if (state.config !== oldConfig)
            return;
          const resolved = resolveConfig2(this.runtime.plugin, config);
          const [hasUpdate, shouldRestart] = state.checkUpdate(resolved, forced);
          this.context.emit("internal/before-update", this, config);
          this.config = resolved;
          state.config = resolved;
          if (hasUpdate) {
            this.context.emit("internal/update", this, oldConfig);
          }
          if (shouldRestart)
            state.restart();
        }
      }, __name10(_a28, "ForkScope"), _a28);
      var _a29;
      var MainScope2 = (_a29 = class extends EffectScope2 {
        constructor(registry, plugin, config, error) {
          super(registry[Context4.origin], config);
          __publicField(this, "value");
          __publicField(this, "runtime", this);
          __publicField(this, "schema");
          __publicField(this, "name");
          __publicField(this, "using", []);
          __publicField(this, "inject", /* @__PURE__ */ new Set());
          __publicField(this, "forkables", []);
          __publicField(this, "children", []);
          __publicField(this, "isReusable", false);
          __publicField(this, "isReactive", false);
          __publicField(this, "apply", (context, config) => {
            if (typeof this.plugin !== "function") {
              return this.plugin.apply(context, config);
            } else if (isConstructor2(this.plugin)) {
              const instance = new this.plugin(context, config);
              const name2 = instance[Context4.expose];
              if (name2) {
                context[name2] = instance;
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
          return new ForkScope2(parent, this, config, error);
        }
        dispose() {
          this.uid = null;
          this.reset();
          this.context.emit("internal/runtime", this);
          return true;
        }
        setup() {
          const { name: name2 } = this.plugin;
          if (name2 && name2 !== "apply")
            this.name = name2;
          this.schema = this.plugin["Config"] || this.plugin["schema"];
          const inject2 = this.plugin["using"] || this.plugin["inject"] || [];
          if (Array.isArray(inject2)) {
            this.using = inject2;
            this.inject = new Set(inject2);
          } else {
            this.using = inject2.required || [];
            this.inject = /* @__PURE__ */ new Set([...this.using, ...inject2.optional || []]);
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
          if (super.start())
            return true;
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
          const resolved = resolveConfig2(this.runtime.plugin || this.context.constructor, config);
          const [hasUpdate, shouldRestart] = this.checkUpdate(resolved, forced);
          const state = this.children.find((fork) => fork.config === oldConfig);
          this.config = resolved;
          if (state) {
            this.context.emit("internal/before-update", state, config);
            state.config = resolved;
            if (hasUpdate) {
              this.context.emit("internal/update", state, oldConfig);
            }
          }
          if (shouldRestart)
            this.restart();
        }
      }, __name10(_a29, "MainScope"), _a29);
      function isApplicable2(object) {
        return object && typeof object === "object" && typeof object.apply === "function";
      }
      __name10(isApplicable2, "isApplicable");
      var _a30;
      var Registry2 = (_a30 = class {
        constructor(root2, config) {
          __publicField(this, "_counter", 0);
          __publicField(this, "_internal", /* @__PURE__ */ new Map());
          this.root = root2;
          (0, import_cosmokit42.defineProperty)(this, Context4.origin, root2);
          root2.scope = new MainScope2(this, null, config);
          root2.scope.runtime.isReactive = true;
        }
        get counter() {
          return ++this._counter;
        }
        get size() {
          return this._internal.size;
        }
        resolve(plugin) {
          if (plugin === null)
            return plugin;
          if (typeof plugin === "function")
            return plugin;
          if (isApplicable2(plugin))
            return plugin.apply;
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
          if (!runtime)
            return;
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
        using(inject2, callback) {
          return this.inject(inject2, callback);
        }
        inject(inject2, callback) {
          return this.plugin({ inject: inject2, apply: callback, name: callback.name });
        }
        plugin(plugin, config) {
          this.resolve(plugin);
          const context = this[Context4.origin];
          context.scope.assertActive();
          let error;
          try {
            config = resolveConfig2(plugin, config);
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
          runtime = new MainScope2(this, plugin, config, error);
          return runtime.fork(context, config, error);
        }
      }, __name10(_a30, "Registry"), _a30);
      var _a31;
      var Context4 = (_a31 = class {
        static is(value) {
          return !!value?.[_a31.is];
        }
        static ensureInternal() {
          const ctx = this.prototype || this;
          if (Object.prototype.hasOwnProperty.call(ctx, symbols2.internal)) {
            return ctx[symbols2.internal];
          }
          const parent = _a31.ensureInternal.call(Object.getPrototypeOf(this));
          return ctx[symbols2.internal] = Object.create(parent);
        }
        static resolveInject(ctx, name2) {
          let internal = ctx[symbols2.internal][name2];
          while (internal?.type === "alias") {
            name2 = internal.name;
            internal = ctx[symbols2.internal][name2];
          }
          return [name2, internal];
        }
        static associate(object, name2) {
          return new Proxy(object, {
            get(target, key, receiver) {
              if (typeof key === "symbol" || key in target)
                return Reflect.get(target, key, receiver);
              const caller = receiver[symbols2.origin];
              if (!caller?.[symbols2.internal][`${name2}.${key}`])
                return Reflect.get(target, key, receiver);
              return caller.get(`${name2}.${key}`);
            },
            set(target, key, value, receiver) {
              if (typeof key === "symbol" || key in target)
                return Reflect.set(target, key, value, receiver);
              const caller = receiver[symbols2.origin];
              if (!caller?.[symbols2.internal][`${name2}.${key}`])
                return Reflect.set(target, key, value, receiver);
              caller[`${name2}.${key}`] = value;
              return true;
            }
          });
        }
        constructor(config) {
          const self2 = new Proxy(this, _a31.handler);
          config = resolveConfig2(this.constructor, config);
          self2[symbols2.isolate] = /* @__PURE__ */ Object.create(null);
          self2[symbols2.intercept] = /* @__PURE__ */ Object.create(null);
          self2.root = self2;
          self2.mixin("scope", ["config", "runtime", "effect", "collect", "accept", "decline"]);
          self2.mixin("registry", ["using", "inject", "plugin", "dispose"]);
          self2.mixin("lifecycle", ["on", "once", "off", "after", "parallel", "emit", "serial", "bail", "start", "stop"]);
          self2.provide("registry", new Registry2(self2, config), true);
          self2.provide("lifecycle", new Lifecycle2(self2), true);
          const attach = /* @__PURE__ */ __name10((internal) => {
            if (!internal)
              return;
            attach(Object.getPrototypeOf(internal));
            for (const key of Object.getOwnPropertyNames(internal)) {
              const constructor = internal[key]["prototype"]?.constructor;
              if (!constructor)
                continue;
              self2[internal[key]["key"]] = new constructor(self2, config);
              (0, import_cosmokit52.defineProperty)(self2[internal[key]["key"]], symbols2.origin, self2);
            }
          }, "attach");
          attach(this[symbols2.internal]);
          return self2;
        }
        [Symbol.for("nodejs.util.inspect.custom")]() {
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
        get(name2) {
          const internal = this[symbols2.internal][name2];
          if (internal?.type !== "service")
            return;
          const value = this.root[this[symbols2.isolate][name2]];
          if (!value || typeof value !== "object" && typeof value !== "function")
            return value;
          if (isUnproxyable2(value)) {
            (0, import_cosmokit52.defineProperty)(value, symbols2.origin, this);
            return value;
          }
          return createTraceable2(this, value);
        }
        provide(name2, value, builtin) {
          const internal = _a31.ensureInternal.call(this.root);
          if (name2 in internal)
            return;
          const key = Symbol(name2);
          internal[name2] = { type: "service", builtin };
          this.root[key] = value;
          this.root[_a31.isolate][name2] = key;
        }
        accessor(name2, options) {
          const internal = _a31.ensureInternal.call(this.root);
          internal[name2] || (internal[name2] = { type: "accessor", ...options });
        }
        alias(name2, aliases) {
          const internal = _a31.ensureInternal.call(this.root);
          for (const key of aliases) {
            internal[key] || (internal[key] = { type: "alias", name: name2 });
          }
        }
        mixin(name2, mixins) {
          for (const key of mixins) {
            this.accessor(key, {
              get() {
                const service = this[name2];
                if ((0, import_cosmokit52.isNullable)(service))
                  return service;
                const value = Reflect.get(service, key);
                if (typeof value !== "function")
                  return value;
                return value.bind(service);
              },
              set(value) {
                return Reflect.set(this[name2], key, value);
              }
            });
          }
        }
        extend(meta = {}) {
          return Object.assign(Object.create(this), meta);
        }
        isolate(name2, label) {
          const shadow = Object.create(this[symbols2.isolate]);
          shadow[name2] = label ?? Symbol(name2);
          return this.extend({ [symbols2.isolate]: shadow });
        }
        intercept(name2, config) {
          const intercept = Object.create(this[symbols2.intercept]);
          intercept[name2] = config;
          return this.extend({ [symbols2.intercept]: intercept });
        }
      }, __name10(_a31, "Context"), __publicField(_a31, "origin", symbols2.origin), __publicField(_a31, "events", symbols2.events), __publicField(_a31, "static", symbols2.static), __publicField(_a31, "filter", symbols2.filter), __publicField(_a31, "expose", symbols2.expose), __publicField(_a31, "isolate", symbols2.isolate), __publicField(_a31, "internal", symbols2.internal), __publicField(_a31, "intercept", symbols2.intercept), /** @deprecated use `Context.trace` instead */
      __publicField(_a31, "current", _a31.origin), _a31.is[Symbol.toPrimitive] = () => Symbol.for("cordis.is"), _a31.prototype[_a31.is] = true, __publicField(_a31, "handler", {
        get(target, prop, ctx) {
          if (typeof prop !== "string")
            return Reflect.get(target, prop, ctx);
          const checkInject = /* @__PURE__ */ __name10((name22) => {
            if (Reflect.has(target, name22))
              return;
            if (["prototype", "then", "registry", "lifecycle"].includes(name22))
              return;
            if (name22[0] === "$" || name22[0] === "_")
              return;
            if (!ctx.runtime.plugin)
              return;
            let parent = ctx;
            while (parent.runtime.plugin) {
              for (const key of parent.runtime.inject) {
                if (name22 === _a31.resolveInject(parent, key)[0])
                  return;
              }
              parent = parent.scope.parent;
            }
            ctx.emit("internal/warning", new Error(`property ${name22} is not registered, declare it as \`inject\` to suppress this warning`));
          }, "checkInject");
          const [name2, internal] = _a31.resolveInject(ctx, prop);
          if (!internal) {
            checkInject(name2);
            return Reflect.get(target, name2, ctx);
          }
          if (internal.type === "accessor") {
            return internal.get.call(ctx);
          } else if (internal.type === "service") {
            if (!internal.builtin)
              checkInject(name2);
            return ctx.get(name2);
          }
        },
        set(target, prop, value, ctx) {
          if (typeof prop !== "string")
            return Reflect.set(target, prop, value, ctx);
          const [name2, internal] = _a31.resolveInject(ctx, prop);
          if (!internal)
            return Reflect.set(target, name2, value, ctx);
          if (internal.type === "accessor") {
            if (!internal.set)
              return false;
            return internal.set.call(ctx, value);
          }
          const key = ctx[symbols2.isolate][name2];
          const oldValue = ctx.root[key];
          if (oldValue === value)
            return true;
          if (value && oldValue) {
            throw new Error(`service ${name2} has been registered`);
          }
          if (value) {
            ctx.on("dispose", () => ctx[name2] = void 0);
          }
          if (isUnproxyable2(value)) {
            ctx.emit("internal/warning", new Error(`service ${name2} is an unproxyable object, which may lead to unexpected behavior`));
          }
          const self2 = /* @__PURE__ */ Object.create(null);
          self2[symbols2.filter] = (ctx2) => {
            return ctx[symbols2.isolate][name2] === ctx2[symbols2.isolate][name2];
          };
          ctx.root.emit(self2, "internal/before-service", name2, value);
          ctx.root[key] = value;
          if (value instanceof Object) {
            (0, import_cosmokit52.defineProperty)(value, symbols2.origin, ctx);
          }
          ctx.root.emit(self2, "internal/service", name2, oldValue);
          return true;
        }
      }), _a31);
      Context4.prototype[Context4.internal] = /* @__PURE__ */ Object.create(null);
      var import_cosmokit62 = require_lib();
      var _a32, _b5;
      var Service3 = (_a32 = class {
        constructor(...args) {
          __publicField(this, "ctx");
          __publicField(this, _b5);
          __publicField(this, "name");
          __publicField(this, "config");
          let _ctx, name2, immediate, config;
          if (Context4.is(args[0])) {
            _ctx = args[0];
            if (typeof args[1] === "string") {
              name2 = args[1];
              immediate = args[2];
            } else {
              config = args[1];
            }
          } else {
            config = args[0];
          }
          name2 ?? (name2 = this.constructor[symbols2.provide]);
          immediate ?? (immediate = this.constructor[symbols2.immediate]);
          let self2 = this;
          if (self2[symbols2.invoke]) {
            self2 = createCallable2(name2, joinPrototype2(Object.getPrototypeOf(this), Function.prototype));
          }
          if (_ctx) {
            self2.ctx = _ctx;
          } else {
            self2[symbols2.setup]();
          }
          self2.name = name2;
          self2.config = config;
          (0, import_cosmokit62.defineProperty)(self2, symbols2.origin, self2.ctx);
          self2.ctx.provide(name2);
          self2.ctx.runtime.name = name2;
          if (immediate) {
            if (_ctx)
              self2[symbols2.expose] = name2;
            else
              self2.ctx[name2] = self2;
          }
          self2.ctx.on("ready", async () => {
            await Promise.resolve();
            await self2.start();
            if (!immediate)
              self2.ctx[name2] = self2;
          });
          self2.ctx.on("dispose", () => self2.stop());
          return Context4.associate(self2, name2);
        }
        start() {
        }
        stop() {
        }
        [(_b5 = symbols2.origin, symbols2.filter)](ctx) {
          return ctx[symbols2.isolate][this.name] === this.ctx[symbols2.isolate][this.name];
        }
        [symbols2.setup]() {
          this.ctx = new Context4();
        }
        [symbols2.extend](props) {
          const caller = this[symbols2.origin];
          let self2;
          if (this[_a32.invoke]) {
            self2 = createCallable2(this.name, this);
          } else {
            self2 = Object.create(this);
          }
          (0, import_cosmokit62.defineProperty)(self2, symbols2.origin, caller);
          return Context4.associate(Object.assign(self2, props), this.name);
        }
        static [Symbol.hasInstance](instance) {
          let constructor = instance.constructor;
          while (constructor) {
            if (constructor === this)
              return true;
            constructor = Object.getPrototypeOf(constructor);
          }
          return false;
        }
      }, __name10(_a32, "Service"), __publicField(_a32, "setup", symbols2.setup), __publicField(_a32, "invoke", symbols2.invoke), __publicField(_a32, "extend", symbols2.extend), __publicField(_a32, "provide", symbols2.provide), __publicField(_a32, "immediate", symbols2.immediate), _a32);
    }
  });

  // ../cordis/packages/logger/lib/index.cjs
  var require_lib5 = __commonJS({
    "../cordis/packages/logger/lib/index.cjs"(exports, module) {
      "use strict";
      var __create2 = Object.create;
      var __defProp11 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __getProtoOf2 = Object.getPrototypeOf;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
      var __export2 = (target, all) => {
        for (var name2 in all)
          __defProp11(target, name2, { get: all[name2], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp11(target, "default", { value: mod, enumerable: true }) : target,
        mod
      ));
      var __toCommonJS2 = (mod) => __copyProps2(__defProp11({}, "__esModule", { value: true }), mod);
      var src_exports2 = {};
      __export2(src_exports2, {
        Logger: () => import_levi_reggol3.default,
        LoggerService: () => LoggerService2,
        default: () => src_default2
      });
      module.exports = __toCommonJS2(src_exports2);
      var import_core4 = require_lib4();
      var import_levi_reggol3 = __toESM2(require_lib2(), 1);
      var _a25, _b5;
      var LoggerService2 = (_b5 = class extends import_core4.Service {
        constructor(ctx) {
          super(ctx, "logger", true);
          ctx.on("internal/info", function(format, ...args) {
            this.logger("app").info(format, ...args);
          });
          ctx.on("internal/error", function(format, ...args) {
            this.logger("app").error(format, ...args);
          });
          ctx.on("internal/warning", function(format, ...args) {
            this.logger("app").warn(format, ...args);
          });
        }
        [(_a25 = import_core4.Service.provide, import_core4.Service.invoke)](name2) {
          return new import_levi_reggol3.default(name2, { [import_core4.Context.origin]: this });
        }
      }, __name10(_b5, "LoggerService"), __publicField(_b5, _a25, "logger"), (() => {
        for (const type2 of [
          "success",
          "error",
          "info",
          "warn",
          "debug",
          "extend"
        ]) {
          _b5.prototype[type2] = function(...args) {
            const caller = this[import_core4.Context.origin];
            return this(caller.name)[type2](...args);
          };
        }
      })(), _b5);
      var src_default2 = LoggerService2;
    }
  });

  // ../cordis/packages/timer/lib/index.cjs
  var require_lib6 = __commonJS({
    "../cordis/packages/timer/lib/index.cjs"(exports, module) {
      "use strict";
      var __defProp11 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
      var __export2 = (target, all) => {
        for (var name2 in all)
          __defProp11(target, name2, { get: all[name2], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp11({}, "__esModule", { value: true }), mod);
      var src_exports2 = {};
      __export2(src_exports2, {
        TimerService: () => TimerService3,
        default: () => src_default2
      });
      module.exports = __toCommonJS2(src_exports2);
      var import_core4 = require_lib4();
      var import_cosmokit16 = require_lib();
      var _a25;
      var TimerService3 = (_a25 = class extends import_core4.Service {
        constructor(ctx) {
          super(ctx, "timer", true);
          ctx.mixin("timer", ["setTimeout", "setInterval", "sleep", "throttle", "debounce"]);
        }
        setTimeout(callback, delay) {
          const dispose = this[import_core4.Context.origin].effect(() => {
            const timer = setTimeout(() => {
              dispose();
              callback();
            }, delay);
            return () => clearTimeout(timer);
          });
          return dispose;
        }
        setInterval(callback, delay) {
          return this[import_core4.Context.origin].effect(() => {
            const timer = setInterval(callback, delay);
            return () => clearInterval(timer);
          });
        }
        sleep(delay) {
          const caller = this[import_core4.Context.origin];
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
          const caller = this[import_core4.Context.origin];
          caller.scope.assertActive();
          let timer;
          const dispose = /* @__PURE__ */ __name10(() => {
            isDisposed = true;
            (0, import_cosmokit16.remove)(caller.scope.disposables, dispose);
            clearTimeout(timer);
          }, "dispose");
          const wrapper = /* @__PURE__ */ __name10((...args) => {
            clearTimeout(timer);
            timer = callback(args, () => !isDisposed && caller.scope.isActive);
          }, "wrapper");
          wrapper.dispose = dispose;
          caller.scope.disposables.push(dispose);
          return wrapper;
        }
        throttle(callback, delay, noTrailing) {
          let lastCall = -Infinity;
          const execute = /* @__PURE__ */ __name10((...args) => {
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
            if (!isActive())
              return;
            return setTimeout(callback, delay, ...args);
          });
        }
      }, __name10(_a25, "TimerService"), _a25);
      var src_default2 = TimerService3;
    }
  });

  // ../cordis/packages/cordis/lib/index.cjs
  var require_lib7 = __commonJS({
    "../cordis/packages/cordis/lib/index.cjs"(exports, module) {
      "use strict";
      var __create2 = Object.create;
      var __defProp11 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __getProtoOf2 = Object.getPrototypeOf;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
      var __export2 = (target, all) => {
        for (var name2 in all)
          __defProp11(target, name2, { get: all[name2], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __reExport2 = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
      var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp11(target, "default", { value: mod, enumerable: true }) : target,
        mod
      ));
      var __toCommonJS2 = (mod) => __copyProps2(__defProp11({}, "__esModule", { value: true }), mod);
      var src_exports2 = {};
      __export2(src_exports2, {
        Context: () => Context23,
        Logger: () => import_logger22.Logger,
        Schema: () => import_schemastery2.default,
        Service: () => Service24,
        TimerService: () => import_timer22.TimerService,
        default: () => src_default2,
        z: () => import_schemastery2.default
      });
      module.exports = __toCommonJS2(src_exports2);
      var import_schemastery2 = __toESM2(require_lib3(), 1);
      __reExport2(src_exports2, require_lib4(), module.exports);
      var import_logger22 = require_lib5();
      var import_timer22 = require_lib6();
      var core2 = __toESM2(require_lib4(), 1);
      var import_logger4 = require_lib5();
      var import_timer3 = require_lib6();
      var _a25;
      var Context23 = (_a25 = class extends core2.Context {
        constructor(config) {
          super(config);
          __publicField(this, "baseDir");
          this.baseDir = globalThis.process?.cwd() || "";
          this.provide("logger", void 0, true);
          this.provide("timer", void 0, true);
          this.plugin(import_logger4.LoggerService);
          this.plugin(import_timer3.TimerService);
        }
      }, __name10(_a25, "Context"), _a25);
      var _a26;
      var Service24 = (_a26 = class extends core2.Service {
        constructor(...args) {
          super(...args);
          /** @deprecated use `this.ctx.logger` instead */
          __publicField(this, "logger");
          this.logger = this.ctx.logger(this.name);
        }
        [core2.Service.setup]() {
          this.ctx = new Context23();
        }
      }, __name10(_a26, "Service"), _a26);
      function src_default2() {
      }
      __name10(src_default2, "default");
    }
  });

  // ../satori/packages/protocol/lib/index.cjs
  var require_lib8 = __commonJS({
    "../satori/packages/protocol/lib/index.cjs"(exports, module) {
      "use strict";
      var __defProp11 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
      var __export2 = (target, all) => {
        for (var name2 in all)
          __defProp11(target, name2, { get: all[name2], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp11({}, "__esModule", { value: true }), mod);
      var src_exports2 = {};
      __export2(src_exports2, {
        Channel: () => Channel2,
        Methods: () => Methods2,
        Opcode: () => Opcode2,
        Status: () => Status2,
        WebSocket: () => WebSocket3
      });
      module.exports = __toCommonJS2(src_exports2);
      function Field2(name2) {
        return { name: name2 };
      }
      __name10(Field2, "Field");
      function Method2(name2, fields) {
        return { name: name2, fields: fields.map(Field2) };
      }
      __name10(Method2, "Method");
      var Methods2 = {
        "channel.get": Method2("getChannel", ["channel_id", "guild_id"]),
        "channel.list": Method2("getChannelList", ["guild_id", "next"]),
        "channel.create": Method2("createChannel", ["guild_id", "data"]),
        "channel.update": Method2("updateChannel", ["channel_id", "data"]),
        "channel.delete": Method2("deleteChannel", ["channel_id"]),
        "channel.mute": Method2("muteChannel", ["channel_id", "guild_id", "enable"]),
        "message.create": Method2("createMessage", ["channel_id", "content"]),
        "message.update": Method2("editMessage", ["channel_id", "message_id", "content"]),
        "message.delete": Method2("deleteMessage", ["channel_id", "message_id"]),
        "message.get": Method2("getMessage", ["channel_id", "message_id"]),
        "message.list": Method2("getMessageList", ["channel_id", "next"]),
        "reaction.create": Method2("createReaction", ["channel_id", "message_id", "emoji"]),
        "reaction.delete": Method2("deleteReaction", ["channel_id", "message_id", "emoji", "user_id"]),
        "reaction.clear": Method2("clearReaction", ["channel_id", "message_id", "emoji"]),
        "reaction.list": Method2("getReactionList", ["channel_id", "message_id", "emoji", "next"]),
        "guild.get": Method2("getGuild", ["guild_id"]),
        "guild.list": Method2("getGuildList", ["next"]),
        "guild.member.get": Method2("getGuildMember", ["guild_id", "user_id"]),
        "guild.member.list": Method2("getGuildMemberList", ["guild_id", "next"]),
        "guild.member.kick": Method2("kickGuildMember", ["guild_id", "user_id", "permanent"]),
        "guild.member.mute": Method2("muteGuildMember", ["guild_id", "user_id", "duration", "reason"]),
        "guild.member.role.set": Method2("setGuildMemberRole", ["guild_id", "user_id", "role_id"]),
        "guild.member.role.unset": Method2("unsetGuildMemberRole", ["guild_id", "user_id", "role_id"]),
        "guild.role.list": Method2("getGuildRoleList", ["guild_id", "next"]),
        "guild.role.create": Method2("createGuildRole", ["guild_id", "data"]),
        "guild.role.update": Method2("updateGuildRole", ["guild_id", "role_id", "data"]),
        "guild.role.delete": Method2("deleteGuildRole", ["guild_id", "role_id"]),
        "login.get": Method2("getLogin", []),
        "user.get": Method2("getUser", ["user_id"]),
        "user.channel.create": Method2("createDirectChannel", ["user_id", "guild_id"]),
        "friend.list": Method2("getFriendList", ["next"]),
        "friend.delete": Method2("deleteFriend", ["user_id"]),
        "friend.approve": Method2("handleFriendRequest", ["message_id", "approve", "comment"]),
        "guild.approve": Method2("handleGuildRequest", ["message_id", "approve", "comment"]),
        "guild.member.approve": Method2("handleGuildMemberRequest", ["message_id", "approve", "comment"])
      };
      var Channel2;
      ((Channel22) => {
        let Type;
        ((Type2) => {
          Type2[Type2["TEXT"] = 0] = "TEXT";
          Type2[Type2["DIRECT"] = 1] = "DIRECT";
          Type2[Type2["VOICE"] = 2] = "VOICE";
          Type2[Type2["CATEGORY"] = 3] = "CATEGORY";
        })(Type = Channel22.Type || (Channel22.Type = {}));
      })(Channel2 || (Channel2 = {}));
      var Status2 = /* @__PURE__ */ ((Status22) => {
        Status22[Status22["OFFLINE"] = 0] = "OFFLINE";
        Status22[Status22["ONLINE"] = 1] = "ONLINE";
        Status22[Status22["CONNECT"] = 2] = "CONNECT";
        Status22[Status22["DISCONNECT"] = 3] = "DISCONNECT";
        Status22[Status22["RECONNECT"] = 4] = "RECONNECT";
        return Status22;
      })(Status2 || {});
      var Opcode2 = /* @__PURE__ */ ((Opcode22) => {
        Opcode22[Opcode22["EVENT"] = 0] = "EVENT";
        Opcode22[Opcode22["PING"] = 1] = "PING";
        Opcode22[Opcode22["PONG"] = 2] = "PONG";
        Opcode22[Opcode22["IDENTIFY"] = 3] = "IDENTIFY";
        Opcode22[Opcode22["READY"] = 4] = "READY";
        return Opcode22;
      })(Opcode2 || {});
      var WebSocket3;
      ((WebSocket22) => {
        WebSocket22.CONNECTING = 0;
        WebSocket22.OPEN = 1;
        WebSocket22.CLOSING = 2;
        WebSocket22.CLOSED = 3;
      })(WebSocket3 || (WebSocket3 = {}));
    }
  });

  // ../satori/packages/element/lib/index.cjs
  var require_lib9 = __commonJS({
    "../satori/packages/element/lib/index.cjs"(exports, module) {
      var __defProp11 = Object.defineProperty;
      var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
      var import_cosmokit16 = require_lib();
      var kElement = Symbol.for("satori.element");
      var _a25;
      var ElementConstructor = (_a25 = class {
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
            if ((0, import_cosmokit16.isNullable)(value))
              return "";
            key = (0, import_cosmokit16.hyphenate)(key);
            if (value === true)
              return ` ${key}`;
            if (value === false)
              return ` no-${key}`;
            return ` ${key}="${Element2.escape("" + value, true)}"`;
          }).join("");
        }
        toString(strip = false) {
          if (this.type === "text" && "content" in this.attrs) {
            return strip ? this.attrs.content : Element2.escape(this.attrs.content);
          }
          const inner = this.children.map((child) => child.toString(strip)).join("");
          if (strip)
            return inner;
          const attrs = this.toAttrString();
          const tag = this.getTagName();
          if (!this.children.length)
            return `<${tag}${attrs}/>`;
          return `<${tag}${attrs}>${inner}</${tag}>`;
        }
      }, __name10(_a25, "ElementConstructor"), _a25);
      (0, import_cosmokit16.defineProperty)(ElementConstructor, "name", "Element");
      (0, import_cosmokit16.defineProperty)(ElementConstructor.prototype, kElement, true);
      function Element2(type2, ...args) {
        const el = Object.create(ElementConstructor.prototype);
        const attrs = {}, children = [];
        if (args[0] && typeof args[0] === "object" && !Element2.isElement(args[0]) && !Array.isArray(args[0])) {
          const props = args.shift();
          for (const [key, value] of Object.entries(props)) {
            if ((0, import_cosmokit16.isNullable)(value))
              continue;
            if (key === "children") {
              args.push(...(0, import_cosmokit16.makeArray)(value));
            } else {
              attrs[(0, import_cosmokit16.camelize)(key)] = value;
            }
          }
        }
        for (const child of args) {
          children.push(...Element2.toElementArray(child));
        }
        if (typeof type2 === "function") {
          attrs.is = type2;
          type2 = "component";
        }
        return Object.assign(el, { type: type2, attrs, children });
      }
      __name10(Element2, "Element");
      var evaluate2 = new Function("expr", "context", `
  try {
    with (context) {
      return eval(expr)
    }
  } catch {}
`);
      ((Element22) => {
        Element22.jsx = Element22;
        Element22.jsxs = Element22;
        Element22.jsxDEV = Element22;
        Element22.Fragment = "template";
        function isElement(source) {
          return source && typeof source === "object" && source[kElement];
        }
        Element22.isElement = isElement;
        __name10(isElement, "isElement");
        function toElement(content) {
          if (typeof content === "string" || typeof content === "number" || typeof content === "boolean") {
            content = "" + content;
            if (content)
              return Element22("text", { content });
          } else if (isElement(content)) {
            return content;
          } else if (!(0, import_cosmokit16.isNullable)(content)) {
            throw new TypeError(`Invalid content: ${content}`);
          }
        }
        Element22.toElement = toElement;
        __name10(toElement, "toElement");
        function toElementArray(content) {
          if (Array.isArray(content)) {
            return content.map(toElement).filter((x) => x);
          } else {
            return [toElement(content)].filter((x) => x);
          }
        }
        Element22.toElementArray = toElementArray;
        __name10(toElementArray, "toElementArray");
        function normalize(source, context) {
          return typeof source === "string" ? parse(source, context) : toElementArray(source);
        }
        Element22.normalize = normalize;
        __name10(normalize, "normalize");
        function escape(source, inline = false) {
          const result = source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return inline ? result.replace(/"/g, "&quot;") : result;
        }
        Element22.escape = escape;
        __name10(escape, "escape");
        function unescape(source) {
          return source.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, code) => code === "38" ? _ : String.fromCharCode(+code)).replace(/&#x([0-9a-f]+);/gi, (_, code) => code === "26" ? _ : String.fromCharCode(parseInt(code, 16))).replace(/&(amp|#38|#x26);/g, "&");
        }
        Element22.unescape = unescape;
        __name10(unescape, "unescape");
        function from(source, options = {}) {
          const elements = parse(source);
          if (options.caret) {
            if (options.type && elements[0]?.type !== options.type)
              return;
            return elements[0];
          }
          return select(elements, options.type || "*")[0];
        }
        Element22.from = from;
        __name10(from, "from");
        const combRegExp = / *([ >+~]) */g;
        function parseSelector(input) {
          return input.split(",").map((query) => {
            const selectors = [];
            query = query.trim();
            let combCap, combinator = " ";
            while (combCap = combRegExp.exec(query)) {
              selectors.push({ type: query.slice(0, combCap.index), combinator });
              combinator = combCap[1];
              query = query.slice(combCap.index + combCap[0].length);
            }
            selectors.push({ type: query, combinator });
            return selectors;
          });
        }
        Element22.parseSelector = parseSelector;
        __name10(parseSelector, "parseSelector");
        function select(source, query) {
          if (!source || !query)
            return [];
          if (typeof source === "string")
            source = parse(source);
          if (typeof query === "string")
            query = parseSelector(query);
          if (!query.length)
            return [];
          let adjacent = [];
          const results = [];
          for (const [index, element] of source.entries()) {
            const inner = [];
            const local = [...query, ...adjacent];
            adjacent = [];
            let matched = false;
            for (const group2 of local) {
              const { type: type2, combinator } = group2[0];
              if (type2 === element.type || type2 === "*") {
                if (group2.length === 1) {
                  matched = true;
                } else if ([" ", ">"].includes(group2[1].combinator)) {
                  inner.push(group2.slice(1));
                } else if (group2[1].combinator === "+") {
                  adjacent.push(group2.slice(1));
                } else {
                  query.push(group2.slice(1));
                }
              }
              if (combinator === " ") {
                inner.push(group2);
              }
            }
            if (matched)
              results.push(source[index]);
            results.push(...select(element.children, inner));
          }
          return results;
        }
        Element22.select = select;
        __name10(select, "select");
        function interpolate2(expr, context) {
          expr = expr.trim();
          if (!/^[\w.]+$/.test(expr)) {
            return evaluate2(expr, context) ?? "";
          }
          let value = context;
          for (const part of expr.split(".")) {
            value = value[part];
            if ((0, import_cosmokit16.isNullable)(value))
              return "";
          }
          return value ?? "";
        }
        Element22.interpolate = interpolate2;
        __name10(interpolate2, "interpolate");
        const tagRegExp1 = /(?<comment><!--[\s\S]*?-->)|(?<tag><(\/?)([^!\s>/]*)([^>]*?)\s*(\/?)>)/;
        const tagRegExp2 = /(?<comment><!--[\s\S]*?-->)|(?<tag><(\/?)([^!\s>/]*)([^>]*?)\s*(\/?)>)|(?<curly>\{(?<derivative>[@:/#][^\s}]*)?[\s\S]*?\})/;
        const attrRegExp1 = /([^\s=]+)(?:="(?<value1>[^"]*)"|='(?<value2>[^']*)')?/g;
        const attrRegExp2 = /([^\s=]+)(?:="(?<value1>[^"]*)"|='(?<value2>[^']*)'|=(?<curly>\{([^}]+)\}))?/g;
        let Position;
        ((Position2) => {
          Position2[Position2["OPEN"] = 0] = "OPEN";
          Position2[Position2["CLOSE"] = 1] = "CLOSE";
          Position2[Position2["EMPTY"] = 2] = "EMPTY";
          Position2[Position2["CONTINUE"] = 3] = "CONTINUE";
        })(Position || (Position = {}));
        function parse(source, context) {
          const tokens = [];
          function pushText(content) {
            if (content)
              tokens.push(content);
          }
          __name10(pushText, "pushText");
          const tagRegExp = context ? tagRegExp2 : tagRegExp1;
          let tagCap;
          let trimStart = true;
          while (tagCap = tagRegExp.exec(source)) {
            const trimEnd = !tagCap.groups.curly;
            parseContent(source.slice(0, tagCap.index), trimStart, trimEnd);
            trimStart = trimEnd;
            source = source.slice(tagCap.index + tagCap[0].length);
            const [_, , , close, type2, extra, empty] = tagCap;
            if (tagCap.groups.comment)
              continue;
            if (tagCap.groups.curly) {
              let name2 = "", position = 2;
              if (tagCap.groups.derivative) {
                name2 = tagCap.groups.derivative.slice(1);
                position = {
                  "@": 2,
                  "#": 0,
                  "/": 1,
                  ":": 3
                  /* CONTINUE */
                }[tagCap.groups.derivative[0]];
              }
              tokens.push({
                type: "curly",
                name: name2,
                position,
                source: tagCap.groups.curly,
                extra: tagCap.groups.curly.slice(1 + (tagCap.groups.derivative ?? "").length, -1)
              });
              continue;
            }
            tokens.push({
              type: "angle",
              source: _,
              name: type2 || Element22.Fragment,
              position: close ? 1 : empty ? 2 : 0,
              extra
            });
          }
          parseContent(source, trimStart, true);
          function parseContent(source2, trimStart2, trimEnd) {
            source2 = unescape(source2);
            if (trimStart2)
              source2 = source2.replace(/^\s*\n\s*/, "");
            if (trimEnd)
              source2 = source2.replace(/\s*\n\s*$/, "");
            pushText(source2);
          }
          __name10(parseContent, "parseContent");
          return parseTokens(foldTokens(tokens), context);
        }
        Element22.parse = parse;
        __name10(parse, "parse");
        function foldTokens(tokens) {
          const stack = [[{
            type: "angle",
            name: Element22.Fragment,
            position: 0,
            source: "",
            extra: "",
            children: { default: [] }
          }, "default"]];
          function pushToken(...tokens2) {
            const [token, slot] = stack[0];
            token.children[slot].push(...tokens2);
          }
          __name10(pushToken, "pushToken");
          for (const token of tokens) {
            if (typeof token === "string") {
              pushToken(token);
              continue;
            }
            const { name: name2, position } = token;
            if (position === 1) {
              if (stack[0][0].name === name2) {
                stack.shift();
              }
            } else if (position === 3) {
              stack[0][0].children[name2] = [];
              stack[0][1] = name2;
            } else if (position === 0) {
              pushToken(token);
              token.children = { default: [] };
              stack.unshift([token, "default"]);
            } else {
              pushToken(token);
            }
          }
          return stack[stack.length - 1][0].children.default;
        }
        __name10(foldTokens, "foldTokens");
        function parseTokens(tokens, context) {
          const result = [];
          for (const token of tokens) {
            if (typeof token === "string") {
              result.push(Element22("text", { content: token }));
            } else if (token.type === "angle") {
              const attrs = {};
              const attrRegExp = context ? attrRegExp2 : attrRegExp1;
              let attrCap;
              while (attrCap = attrRegExp.exec(token.extra)) {
                const [, key, v1, v2 = v1, v3] = attrCap;
                if (v3) {
                  attrs[key] = interpolate2(v3, context);
                } else if (!(0, import_cosmokit16.isNullable)(v2)) {
                  attrs[key] = unescape(v2);
                } else if (key.startsWith("no-")) {
                  attrs[key.slice(3)] = false;
                } else {
                  attrs[key] = true;
                }
              }
              result.push(Element22(token.name, attrs, token.children && parseTokens(token.children.default, context)));
            } else if (!token.name) {
              result.push(...toElementArray(interpolate2(token.extra, context)));
            } else if (token.name === "if") {
              if (evaluate2(token.extra, context)) {
                result.push(...parseTokens(token.children.default, context));
              } else {
                result.push(...parseTokens(token.children.else || [], context));
              }
            } else if (token.name === "each") {
              const [expr, ident] = token.extra.split(/\s+as\s+/);
              const items = interpolate2(expr, context);
              if (!items || !items[Symbol.iterator])
                continue;
              for (const item of items) {
                result.push(...parseTokens(token.children.default, { ...context, [ident]: item }));
              }
            }
          }
          return result;
        }
        __name10(parseTokens, "parseTokens");
        function visit(element, rules, session) {
          const { type: type2, attrs, children } = element;
          if (typeof rules === "function") {
            return rules(element, session);
          } else {
            let result = rules[typeof type2 === "string" ? type2 : ""] ?? rules.default ?? true;
            if (typeof result === "function") {
              result = result(attrs, children, session);
            }
            return result;
          }
        }
        __name10(visit, "visit");
        function transform(source, rules, session) {
          const elements = typeof source === "string" ? parse(source) : source;
          const output = [];
          elements.forEach((element) => {
            const { type: type2, attrs, children } = element;
            const result = visit(element, rules, session);
            if (result === true) {
              output.push(Element22(type2, attrs, transform(children, rules, session)));
            } else if (result !== false) {
              output.push(...toElementArray(result));
            }
          });
          return typeof source === "string" ? output.join("") : output;
        }
        Element22.transform = transform;
        __name10(transform, "transform");
        async function transformAsync(source, rules, session) {
          const elements = typeof source === "string" ? parse(source) : source;
          const children = (await Promise.all(elements.map(async (element) => {
            const { type: type2, attrs, children: children2 } = element;
            const result = await visit(element, rules, session);
            if (result === true) {
              return [Element22(type2, attrs, await transformAsync(children2, rules, session))];
            } else if (result !== false) {
              return toElementArray(result);
            } else {
              return [];
            }
          }))).flat(1);
          return typeof source === "string" ? children.join("") : children;
        }
        Element22.transformAsync = transformAsync;
        __name10(transformAsync, "transformAsync");
        function createFactory(type2, ...keys) {
          return (...args) => {
            const element = Element22(type2);
            keys.forEach((key, index) => {
              if (!(0, import_cosmokit16.isNullable)(args[index])) {
                element.attrs[key] = args[index];
              }
            });
            if (args[keys.length]) {
              Object.assign(element.attrs, args[keys.length]);
            }
            return element;
          };
        }
        __name10(createFactory, "createFactory");
        Element22.warn = /* @__PURE__ */ __name10(() => {
        }, "warn");
        function createAssetFactory(type2) {
          return (src, ...args) => {
            let prefix = "base64://";
            if (typeof args[0] === "string") {
              prefix = `data:${args.shift()};base64,`;
            }
            if ((0, import_cosmokit16.is)("ArrayBuffer", src)) {
              src = prefix + (0, import_cosmokit16.arrayBufferToBase64)(src);
            } else if (ArrayBuffer.isView(src)) {
              src = prefix + (0, import_cosmokit16.arrayBufferToBase64)(src.buffer);
            }
            if (src.startsWith("base64://")) {
              (0, Element22.warn)(`protocol "base64:" is deprecated and will be removed in the future, please use "data:" instead`);
            }
            return Element22(type2, { ...args[0], src });
          };
        }
        __name10(createAssetFactory, "createAssetFactory");
        Element22.text = createFactory("text", "content");
        Element22.at = createFactory("at", "id");
        Element22.sharp = createFactory("sharp", "id");
        Element22.quote = createFactory("quote", "id");
        Element22.image = createAssetFactory("img");
        Element22.img = createAssetFactory("img");
        Element22.video = createAssetFactory("video");
        Element22.audio = createAssetFactory("audio");
        Element22.file = createAssetFactory("file");
        function i18n(path, children) {
          return Element22("i18n", typeof path === "string" ? { path } : path, children);
        }
        Element22.i18n = i18n;
        __name10(i18n, "i18n");
      })(Element2 || (Element2 = {}));
      module.exports = Element2;
    }
  });

  // ../undios/packages/core/lib/index.cjs
  var require_lib10 = __commonJS({
    "../undios/packages/core/lib/index.cjs"(exports, module) {
      "use strict";
      var __defProp11 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
      var __export2 = (target, all) => {
        for (var name2 in all)
          __defProp11(target, name2, { get: all[name2], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp11({}, "__esModule", { value: true }), mod);
      var src_exports2 = {};
      __export2(src_exports2, {
        HTTP: () => HTTP2,
        WebSocket: () => WebSocket3,
        default: () => src_default2
      });
      module.exports = __toCommonJS2(src_exports2);
      var import_levi_cordis4 = require_lib7();
      var import_cosmokit16 = require_lib();
      var _a25;
      var WebSocket3 = (_a25 = class extends EventTarget {
        constructor(url, config) {
          super();
          __publicField(this, "ws");
          __publicField(this, "_connected", false);
          __publicField(this, "_closed", true);
          __publicField(this, "closeFunction");
          __publicField(this, "timeout");
          this.url = url;
          this.timeout = config?.timeout ?? 3e3;
          this.connect().catch((e) => {
            this.closeAndReset();
            this.dispatchClose(1006, e.message);
          });
        }
        get protocol() {
          return this.url.split("://")[0];
        }
        get readyState() {
          if (this._closed)
            return this._connected ? 2 : 3;
          return this._connected ? 1 : 0;
        }
        dispatchEvent(event) {
          return super.dispatchEvent(event);
        }
        dispatchOpen() {
          this.dispatchEvent(new Event("open"));
        }
        dispatchError(message) {
          const ev = new Event("error");
          ev.message = message;
          this.dispatchEvent(ev);
        }
        dispatchClose(code, reason) {
          const ev = new Event("close");
          ev.code = code;
          ev.reason = reason;
          this.dispatchEvent(ev);
        }
        dispatchMessage(data) {
          const ev = new Event("message");
          ev.data = data;
          this.dispatchEvent(ev);
        }
        // @ts-ignore
        addEventListener(type2, listener) {
          super.addEventListener(type2, listener);
        }
        // @ts-ignore
        removeEventListener(type2, listener) {
          super.removeEventListener(type2, listener);
        }
        async connect() {
          if (this.ws) {
            this.ws.shutdown();
            this.ws.close();
          }
          this._closed = false;
          this.ws = new WSClient();
          await new Promise((resolve, reject) => {
            const timeoutFunc = /* @__PURE__ */ __name10(() => reject(new Error("Connection timeout")), "timeoutFunc");
            const timer = setTimeout(timeoutFunc, this.timeout);
            const connected = /* @__PURE__ */ __name10(() => {
              if (timer)
                clearInterval(timer);
              resolve(true);
            }, "connected");
            const fail = /* @__PURE__ */ __name10(() => {
              if (timer)
                clearInterval(timer);
              reject(new Error("Failed to connect"));
            }, "fail");
            const okPre = this.ws.connectAsync(this.url, (ok) => {
              if (ok)
                connected();
              else
                fail();
            });
            if (!okPre)
              fail();
          });
          this._connected = true;
          this.dispatchOpen();
          this.ws.listen("onTextReceived", (data) => this.dispatchMessage(data));
          this.ws.listen(
            "onBinaryReceived",
            () => this.dispatchError(`Unexpected binary data received from ${this.url}`)
          );
          this.ws.listen("onError", (msg) => this.dispatchError(msg));
          this.ws.listen("onLostConnection", (code) => {
            this.closeAndReset();
            this.dispatchClose(code, "Lost connection");
          });
        }
        closeAndReset() {
          if (this.ws) {
            this.ws.close();
            this.ws.shutdown();
            this.ws = void 0;
          }
          this._connected = false;
          this._closed = true;
        }
        close(code, reason) {
          this.closeAndReset();
          this.dispatchClose(code ?? 1e3, reason ?? "Connection closed");
        }
        send(data) {
          this.ws?.send(data);
        }
      }, __name10(_a25, "WebSocket"), _a25);
      var kHTTPError2 = Symbol.for("undios.error");
      var _a26, _b5;
      var HTTPError2 = (_b5 = class extends Error {
        constructor() {
          super(...arguments);
          __publicField(this, _a26, true);
          __publicField(this, "response");
        }
        static fromResp(response) {
          const error = new this(`Request failed with status code ${response.status}`);
          error.response = response;
          return error;
        }
        static is(error) {
          return !!error?.[kHTTPError2];
        }
      }, _a26 = kHTTPError2, __name10(_b5, "HTTPError"), _b5);
      var _a27, _b6, _c2;
      var HTTP2 = (_a27 = class extends import_levi_cordis4.Service {
        constructor(...args) {
          super(args[0], args[1]);
          __publicField(this, "_decoders", /* @__PURE__ */ Object.create(null));
          this.decoder("json", (raw) => JSON.parse(raw));
          this.decoder("text", (raw) => raw);
        }
        decoder(type2, decoder) {
          return this[import_levi_cordis4.Context.current].effect(() => {
            this._decoders[type2] = decoder;
            return () => delete this._decoders[type2];
          });
        }
        extend(config = {}) {
          return this[import_levi_cordis4.Service.extend]({
            config: _a27.mergeConfig(this.config, config)
          });
        }
        resolveConfig(init) {
          const caller = this[import_levi_cordis4.Context.current];
          let result = { headers: {}, ...this.config };
          caller.emit("http/config", result);
          let intercept = caller[import_levi_cordis4.Context.intercept];
          while (intercept) {
            result = _a27.mergeConfig(result, intercept.http);
            intercept = Object.getPrototypeOf(intercept);
          }
          result = _a27.mergeConfig(result, init);
          return result;
        }
        resolveURL(url, config) {
          if (config.baseURL) {
            url = `${(0, import_cosmokit16.trimSlash)(config.baseURL)}/${url.replace(/^\/+/g, "")}`;
          }
          if (config.params) {
            const params = Object.entries(config.params).map(
              ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
            ).join("&");
            url = `${url}${url.includes("?") ? "&" : "?"}${params}`;
          }
          return url;
        }
        async [(_b6 = import_levi_cordis4.Service.provide, _c2 = import_levi_cordis4.Service.immediate, import_levi_cordis4.Service.invoke)](...args) {
          const caller = this[import_levi_cordis4.Context.current];
          let method;
          if (typeof args[1] === "string") {
            method = args.shift();
          }
          const config = this.resolveConfig(args[1]);
          const url = this.resolveURL(args[0], config);
          method ?? (method = config.method ?? "GET");
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
            caller.emit("http/fetch-init", init.url, init, config);
            const rawResp = await this.fetch(init);
            const validateStatus = config.validateStatus ?? ((status) => Math.floor(status / 100) === 2);
            if (!validateStatus(rawResp.status)) {
              const error = _a27.Error.fromResp(rawResp);
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
            case "GET": {
              return new Promise((resolve) => {
                network.httpGet(init.url, init.headers, (status, result) => {
                  resolve({ url: init.url, status, data: result });
                });
              });
            }
            case "post":
            case "POST": {
              return new Promise((resolve) => {
                network.httpPost(
                  init.url,
                  init.headers,
                  init.data,
                  init.headers["Content-Type"] ?? "text/plain",
                  (status, result) => {
                    resolve({ url: init.url, status, data: result });
                  }
                );
              });
            }
          }
        }
        ws(url, init) {
          if (init?.headers)
            this.ctx.logger.warn("headers is not supported in ws");
          const caller = this[import_levi_cordis4.Context.current];
          const config = this.resolveConfig(init);
          url = this.resolveURL(url, config);
          init = {
            timeout: config.timeout
          };
          caller.emit("http/websocket-init", url, init, config);
          const socket = new WebSocket3(url, init);
          const dispose = caller.on("dispose", () => {
            socket.close(1001, "context disposed");
          });
          socket.addEventListener("close", () => {
            dispose();
          });
          return socket;
        }
      }, __name10(_a27, "HTTP"), __publicField(_a27, "Error", HTTPError2), __publicField(_a27, _b6, "http"), __publicField(_a27, _c2, true), (() => {
        for (const method of ["get"]) {
          (0, import_cosmokit16.defineProperty)(
            _a27.prototype,
            method,
            async function(url, config) {
              const response = await this(url, { method, ...config });
              return response.data;
            }
          );
        }
        for (const method of ["post"]) {
          (0, import_cosmokit16.defineProperty)(
            _a27.prototype,
            method,
            async function(url, data, config) {
              const response = await this(url, { method, data, ...config });
              return response.data;
            }
          );
        }
      })(), __publicField(_a27, "mergeConfig", (target, source) => ({
        ...target,
        ...source,
        headers: {
          ...target?.headers,
          ...source?.headers
        }
      })), _a27);
      var src_default2 = HTTP2;
    }
  });

  // ../satori/packages/core/lib/index.cjs
  var require_lib11 = __commonJS({
    "../satori/packages/core/lib/index.cjs"(exports, module) {
      var __create2 = Object.create;
      var __defProp11 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __getProtoOf2 = Object.getPrototypeOf;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
      var __export2 = (target, all) => {
        for (var name2 in all)
          __defProp11(target, name2, { get: all[name2], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __reExport2 = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
      var __toESM2 = (mod, isNodeMode, target) => (target = mod != null ? __create2(__getProtoOf2(mod)) : {}, __copyProps2(
        // If the importer is in node compatibility mode or this is not an ESM
        // file that has been converted to a CommonJS file using a Babel-
        // compatible transform (i.e. "__esModule" has not been set), then set
        // "default" to the CommonJS "module.exports" for node compatibility.
        isNodeMode || !mod || !mod.__esModule ? __defProp11(target, "default", { value: mod, enumerable: true }) : target,
        mod
      ));
      var __toCommonJS2 = (mod) => __copyProps2(__defProp11({}, "__esModule", { value: true }), mod);
      var src_exports2 = {};
      __export2(src_exports2, {
        Adapter: () => Adapter2,
        Bot: () => Bot2,
        Context: () => Context4,
        Element: () => import_element32.default,
        MessageEncoder: () => MessageEncoder2,
        Messenger: () => MessageEncoder2,
        Modulator: () => MessageEncoder2,
        Service: () => Service24,
        Session: () => Session2,
        Universal: () => Universal,
        defineAccessor: () => defineAccessor2,
        h: () => import_element32.default,
        segment: () => import_element32.default
      });
      module.exports = __toCommonJS2(src_exports2);
      var cordis = __toESM2(require_lib7(), 1);
      var import_cosmokit42 = require_lib();
      var import_cosmokit16 = require_lib();
      var import_protocol4 = require_lib8();
      var import_element4 = __toESM2(require_lib9(), 1);
      var _a25;
      var Session2 = (_a25 = class {
        constructor(bot, event) {
          __publicField(this, "id");
          __publicField(this, "bot");
          __publicField(this, "app");
          __publicField(this, "event");
          __publicField(this, "locales", []);
          event.selfId ?? (event.selfId = bot.selfId);
          event.platform ?? (event.platform = bot.platform);
          event.timestamp ?? (event.timestamp = Date.now());
          this.event = event;
          this.id = ++_a25.counter;
          (0, import_cosmokit16.defineProperty)(this, "bot", bot);
          (0, import_cosmokit16.defineProperty)(this, "app", bot.ctx.root);
          (0, import_cosmokit16.defineProperty)(this, Context4.current, bot.ctx);
          return Context4.associate(this, "session");
        }
        /** @deprecated */
        get data() {
          return this.event;
        }
        get isDirect() {
          return this.event.channel.type === import_protocol4.Channel.Type.DIRECT;
        }
        set isDirect(value) {
          var _a32;
          ((_a32 = this.event).channel ?? (_a32.channel = {})).type = value ? import_protocol4.Channel.Type.DIRECT : import_protocol4.Channel.Type.TEXT;
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
          var _a32;
          (_a32 = this.event).message ?? (_a32.message = {});
          this.event.message.elements = value;
        }
        get content() {
          return this.event.message?.elements?.join("");
        }
        set content(value) {
          var _a32;
          ((_a32 = this.event).message ?? (_a32.message = {})).elements = (0, import_cosmokit16.isNullable)(value) ? value : import_element4.default.parse(value);
        }
        setInternal(type2, data) {
          this.event._type = type2;
          this.event._data = data;
          const internal = Object.create(this.bot.internal);
          (0, import_cosmokit16.defineProperty)(this, type2, Object.assign(internal, data));
        }
        async transform(elements) {
          return await import_element4.default.transformAsync(elements, ({ type: type2, attrs, children }, session) => {
            const render = type2 === "component" ? attrs.is : this.app.get("component:" + type2);
            return render?.(attrs, children, session) ?? true;
          }, this);
        }
        toJSON() {
          return { ...this.event, id: this.id };
        }
      }, __name10(_a25, "Session"), __publicField(_a25, "counter", 0), _a25);
      function defineAccessor2(prototype, name2, keys) {
        Object.defineProperty(prototype, name2, {
          get() {
            return keys.reduce((data, key) => data?.[key], this);
          },
          set(value) {
            if (value === void 0)
              return;
            const _keys = keys.slice();
            const last = _keys.pop();
            const data = _keys.reduce((data2, key) => data2[key] ?? (data2[key] = {}), this);
            data[last] = value;
          }
        });
      }
      __name10(defineAccessor2, "defineAccessor");
      defineAccessor2(Session2.prototype, "type", ["event", "type"]);
      defineAccessor2(Session2.prototype, "subtype", ["event", "subtype"]);
      defineAccessor2(Session2.prototype, "subsubtype", ["event", "subsubtype"]);
      defineAccessor2(Session2.prototype, "selfId", ["event", "selfId"]);
      defineAccessor2(Session2.prototype, "platform", ["event", "platform"]);
      defineAccessor2(Session2.prototype, "timestamp", ["event", "timestamp"]);
      defineAccessor2(Session2.prototype, "userId", ["event", "user", "id"]);
      defineAccessor2(Session2.prototype, "channelId", ["event", "channel", "id"]);
      defineAccessor2(Session2.prototype, "channelName", ["event", "channel", "name"]);
      defineAccessor2(Session2.prototype, "guildId", ["event", "guild", "id"]);
      defineAccessor2(Session2.prototype, "guildName", ["event", "guild", "name"]);
      defineAccessor2(Session2.prototype, "messageId", ["event", "message", "id"]);
      defineAccessor2(Session2.prototype, "operatorId", ["event", "operator", "id"]);
      defineAccessor2(Session2.prototype, "roleId", ["event", "role", "id"]);
      defineAccessor2(Session2.prototype, "quote", ["event", "message", "quote"]);
      var import_levi_cordis22 = require_lib7();
      var import_levi_undios2 = require_lib10();
      var import_element32 = __toESM2(require_lib9(), 1);
      __reExport2(src_exports2, require_lib7(), module.exports);
      var Universal = __toESM2(require_lib8(), 1);
      var import_cosmokit22 = require_lib();
      var import_protocol22 = require_lib8();
      var eventAliases2 = [
        ["message-created", "message"]
      ];
      var _a26;
      var Bot2 = (_a26 = class {
        constructor(ctx, config, platform) {
          __publicField(this, "user", {});
          __publicField(this, "isBot", true);
          __publicField(this, "hidden", false);
          __publicField(this, "platform");
          __publicField(this, "adapter");
          __publicField(this, "error");
          __publicField(this, "callbacks", {});
          __publicField(this, "logger");
          // Same as `this.ctx`, but with a more specific type.
          __publicField(this, "context");
          __publicField(this, "_status", import_protocol22.Status.OFFLINE);
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
          ctx.on("interaction/button", (session) => {
            const cb = this.callbacks[session.event.button.id];
            if (cb)
              cb(session);
          });
        }
        update(login) {
          const { status, ...rest } = login;
          Object.assign(this, rest);
          this.status = status;
        }
        dispose() {
          (0, import_cosmokit22.remove)(this.ctx.bots, this);
          this.context.emit("bot-removed", this);
          this.dispatchLoginEvent("login-removed");
          return this.stop();
        }
        dispatchLoginEvent(type2) {
          const session = this.session();
          session.type = type2;
          session.event.login = this.toJSON();
          this.dispatch(session);
        }
        get status() {
          return this._status;
        }
        set status(value) {
          if (value === this._status)
            return;
          this._status = value;
          if (this.ctx.bots.includes(this)) {
            this.context.emit("bot-status-updated", this);
            this.dispatchLoginEvent("login-updated");
          }
        }
        get isActive() {
          return this._status !== import_protocol22.Status.OFFLINE && this._status !== import_protocol22.Status.DISCONNECT;
        }
        online() {
          this.status = import_protocol22.Status.ONLINE;
          this.error = null;
        }
        offline(error) {
          this.status = import_protocol22.Status.OFFLINE;
          this.error = error;
        }
        async start() {
          if (this.isActive)
            return;
          this.status = import_protocol22.Status.CONNECT;
          try {
            await this.context.parallel("bot-connect", this);
            await this.adapter?.connect(this);
          } catch (error) {
            this.offline(error);
          }
        }
        async stop() {
          if (!this.isActive)
            return;
          this.status = import_protocol22.Status.DISCONNECT;
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
          const { Session: Session22 } = this.ctx.constructor;
          return new Session22(this, event);
        }
        dispatch(session) {
          if (!this.ctx.lifecycle.isActive)
            return;
          let events = [session.type];
          for (const aliases of eventAliases2) {
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
          const { MessageEncoder: MessageEncoder22 } = this.constructor;
          return new MessageEncoder22(this, channelId, guildId, options).send(content);
        }
        async sendMessage(channelId, content, guildId, options) {
          const messages = await this.createMessage(channelId, content, guildId, options);
          return messages.map((message) => message.id);
        }
        async sendPrivateMessage(userId, content, guildId, options) {
          const { id } = await this.createDirectChannel(userId, guildId ?? options?.session?.guildId);
          return this.sendMessage(id, content, null, options);
        }
        async supports(name2, session = {}) {
          return !!this[import_protocol22.Methods[name2]?.name];
        }
        async checkPermission(name2, session) {
          if (name2.startsWith("bot.")) {
            return this.supports(name2.slice(4), session);
          }
        }
        toJSON() {
          return (0, import_cosmokit22.clone)((0, import_cosmokit22.pick)(this, ["platform", "selfId", "status", "user", "hidden"]));
        }
        async getLogin() {
          return this.toJSON();
        }
        /** @deprecated use `bot.getLogin()` instead */
        async getSelf() {
          const { user } = await this.getLogin();
          return user;
        }
      }, __name10(_a26, "Bot"), __publicField(_a26, "reusable", true), __publicField(_a26, "MessageEncoder"), _a26);
      var iterableMethods2 = [
        "getMessage",
        "getReaction",
        "getFriend",
        "getGuild",
        "getGuildMember",
        "getGuildRole",
        "getChannel"
      ];
      for (const name2 of iterableMethods2) {
        Bot2.prototype[name2 + "Iter"] = function(...args) {
          let list;
          if (!this[name2 + "List"])
            throw new Error(`not implemented: ${name2}List`);
          const getList = /* @__PURE__ */ __name10(async () => {
            list = await this[name2 + "List"](...args, list?.next);
          }, "getList");
          return {
            async next() {
              if (list?.data.length)
                return { done: false, value: list.data.shift() };
              if (list && !list?.next)
                return { done: true, value: void 0 };
              await getList();
              return this.next();
            },
            [Symbol.asyncIterator]() {
              return this;
            }
          };
        };
      }
      defineAccessor2(Bot2.prototype, "selfId", ["user", "id"]);
      defineAccessor2(Bot2.prototype, "userId", ["user", "id"]);
      var import_cosmokit32 = require_lib();
      var import_protocol32 = require_lib8();
      var import_levi_cordis4 = require_lib7();
      var _a27;
      var Adapter2 = (_a27 = class {
        constructor(ctx) {
          __publicField(this, "bots", []);
          this.ctx = ctx;
        }
        async connect(bot) {
        }
        async disconnect(bot) {
        }
        fork(ctx, bot) {
          bot.adapter = this;
          this.bots.push(bot);
          ctx.on("dispose", () => {
            (0, import_cosmokit32.remove)(this.bots, bot);
          });
        }
      }, __name10(_a27, "Adapter"), __publicField(_a27, "schema", false), _a27);
      ((Adapter22) => {
        Adapter22.WsClientConfig = import_levi_cordis4.z.object({
          retryTimes: import_levi_cordis4.z.natural().description("\u521D\u6B21\u8FDE\u63A5\u65F6\u7684\u6700\u5927\u91CD\u8BD5\u6B21\u6570\u3002").default(6),
          retryInterval: import_levi_cordis4.z.natural().role("ms").description("\u521D\u6B21\u8FDE\u63A5\u65F6\u7684\u91CD\u8BD5\u65F6\u95F4\u95F4\u9694\u3002").default(5 * import_cosmokit32.Time.second),
          retryLazy: import_levi_cordis4.z.natural().role("ms").description("\u8FDE\u63A5\u5173\u95ED\u540E\u7684\u91CD\u8BD5\u65F6\u95F4\u95F4\u9694\u3002").default(import_cosmokit32.Time.minute)
        }).description("\u8FDE\u63A5\u8BBE\u7F6E");
        const _WsClientBase = class _WsClientBase extends Adapter22 {
          constructor(ctx, config) {
            super(ctx);
            __publicField(this, "socket");
            this.config = config;
          }
          async start() {
            let _retryCount = 0;
            const logger2 = this.ctx.logger("adapter");
            const { retryTimes, retryInterval, retryLazy } = this.config;
            const reconnect = /* @__PURE__ */ __name10(async (initial = false) => {
              logger2.debug("websocket client opening");
              const socket = await this.prepare();
              const url = socket.url.replace(/\?.+/, "");
              socket.addEventListener("error", (event) => {
                if (event.message)
                  logger2.warn(event.message);
              });
              socket.addEventListener("close", ({ code, reason }) => {
                this.socket = null;
                logger2.debug(`websocket closed with ${code}`);
                if (!this.getActive())
                  return;
                const message = reason.toString() || `failed to connect to ${url}, code: ${code}`;
                let timeout = retryInterval;
                if (_retryCount >= retryTimes) {
                  if (initial) {
                    return this.setStatus(import_protocol32.Status.OFFLINE, new Error(message));
                  } else {
                    timeout = retryLazy;
                  }
                }
                _retryCount++;
                this.setStatus(import_protocol32.Status.RECONNECT);
                logger2.warn(`${message}, will retry in ${import_cosmokit32.Time.format(timeout)}...`);
                setTimeout(() => {
                  if (this.getActive())
                    reconnect();
                }, timeout);
              });
              socket.addEventListener("open", () => {
                _retryCount = 0;
                this.socket = socket;
                logger2.info("connect to server: %c", url);
                this.accept(socket);
              });
            }, "reconnect");
            reconnect(true);
          }
          async stop() {
            this.socket?.close();
          }
        };
        __name10(_WsClientBase, "WsClientBase");
        let WsClientBase = _WsClientBase;
        Adapter22.WsClientBase = WsClientBase;
        const _WsClient = class _WsClient extends WsClientBase {
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
        };
        __name10(_WsClient, "WsClient");
        __publicField(_WsClient, "reusable", true);
        let WsClient = _WsClient;
        Adapter22.WsClient = WsClient;
      })(Adapter2 || (Adapter2 = {}));
      var import_element22 = __toESM2(require_lib9(), 1);
      var _a28;
      var AggregateError2 = (_a28 = class extends Error {
        constructor(errors, message = "") {
          super(message);
          this.errors = errors;
        }
      }, __name10(_a28, "AggregateError"), _a28);
      var _a29;
      var MessageEncoder2 = (_a29 = class {
        constructor(bot, channelId, guildId, options = {}) {
          __publicField(this, "errors", []);
          __publicField(this, "results", []);
          __publicField(this, "session");
          this.bot = bot;
          this.channelId = channelId;
          this.guildId = guildId;
          this.options = options;
        }
        async prepare() {
        }
        async render(elements, flush) {
          for (const element of elements) {
            await this.visit(element);
          }
          if (flush) {
            await this.flush();
          }
        }
        async send(content) {
          var _a32;
          this.session = this.bot.session({
            type: "send",
            channel: { id: this.channelId, ...this.options.session?.event.channel },
            guild: this.options.session?.event.guild
          });
          for (const key in this.options.session || {}) {
            if (key === "id" || key === "event")
              continue;
            this.session[key] = this.options.session[key];
          }
          await this.prepare();
          const session = this.options.session ?? this.session;
          this.session.elements = await session.transform(import_element22.default.normalize(content));
          const btns = import_element22.default.select(this.session.elements, "button").filter((v) => v.attrs.type !== "link" && !v.attrs.id);
          for (const btn of btns) {
            const r = Math.random().toString(36).slice(2);
            (_a32 = btn.attrs).id || (_a32.id = r);
            if (typeof btn.attrs.action === "function")
              this.bot.callbacks[btn.attrs.id] = btn.attrs.action;
          }
          if (await this.session.app.serial(this.session, "before-send", this.session, this.options))
            return;
          await this.render(this.session.elements);
          await this.flush();
          if (this.errors.length) {
            throw new AggregateError2(this.errors);
          } else {
            return this.results;
          }
        }
      }, __name10(_a29, "MessageEncoder"), _a29);
      import_element32.default.warn = new cordis.Logger("element").warn;
      (0, import_cosmokit42.defineProperty)(import_levi_undios2.HTTP, "Config", import_levi_cordis22.z.object({
        timeout: import_levi_cordis22.z.natural().role("ms").description("\u7B49\u5F85\u8FDE\u63A5\u5EFA\u7ACB\u7684\u6700\u957F\u65F6\u95F4\u3002")
      }).description("\u8BF7\u6C42\u8BBE\u7F6E"));
      import_levi_undios2.HTTP.createConfig = /* @__PURE__ */ __name10(function createConfig2(endpoint) {
        return import_levi_cordis22.z.object({
          baseURL: import_levi_cordis22.z.string().role("link").description("\u8981\u8FDE\u63A5\u7684\u670D\u52A1\u5668\u5730\u5740\u3002").default(typeof endpoint === "string" ? endpoint : null).required(typeof endpoint === "boolean" ? endpoint : false),
          headers: import_levi_cordis22.z.dict(String).role("table").description("\u8981\u9644\u52A0\u7684\u989D\u5916\u8BF7\u6C42\u5934\u3002"),
          ...this.Config.dict
        }).description("\u8BF7\u6C42\u8BBE\u7F6E");
      }, "createConfig");
      var _a30;
      var Context4 = (_a30 = class extends cordis.Context {
        constructor(config = {}) {
          super(config);
          __publicField(this, "bots", new Proxy([], {
            get(target, prop) {
              if (prop in target || typeof prop === "symbol") {
                return Reflect.get(target, prop);
              }
              return target.find((bot) => bot.sid === prop);
            },
            deleteProperty(target, prop) {
              if (prop in target || typeof prop === "symbol") {
                return Reflect.deleteProperty(target, prop);
              }
              const bot = target.findIndex((bot2) => bot2.sid === prop);
              if (bot < 0)
                return true;
              target.splice(bot, 1);
              return true;
            }
          }));
          this.provide("http", void 0, true);
          this.plugin(import_levi_undios2.HTTP, config.request);
        }
        component(name2, component, options = {}) {
          const render = /* @__PURE__ */ __name10(async (attrs, children, session) => {
            if (options.session && session.type === "send") {
              throw new Error("interactive components is not available outside sessions");
            }
            const result = await component(attrs, children, session);
            return session.transform(import_element32.default.normalize(result));
          }, "render");
          const service = "component:" + name2;
          this.provide(service);
          return this.effect(() => {
            this[service] = render;
            return () => this[service] = null;
          });
        }
      }, __name10(_a30, "Context"), __publicField(_a30, "session", Symbol("session")), // remove generic type to loosen the constraint
      __publicField(_a30, "Session", Session2), _a30);
      ((Context32) => {
        Context32.Config = import_levi_cordis22.z.intersect([
          import_levi_cordis22.z.object({})
        ]);
      })(Context4 || (Context4 = {}));
      var _a31;
      var Service24 = (_a31 = class extends cordis.Service {
        [cordis.Service.setup]() {
          this.ctx = new Context4();
        }
      }, __name10(_a31, "Service"), _a31);
    }
  });

  // ../satori/packages/satori/lib/index.cjs
  var require_lib12 = __commonJS({
    "../satori/packages/satori/lib/index.cjs"(exports, module) {
      var __defProp11 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __reExport2 = (target, mod, secondTarget) => (__copyProps2(target, mod, "default"), secondTarget && __copyProps2(secondTarget, mod, "default"));
      var __toCommonJS2 = (mod) => __copyProps2(__defProp11({}, "__esModule", { value: true }), mod);
      var src_exports2 = {};
      module.exports = __toCommonJS2(src_exports2);
      __reExport2(src_exports2, require_lib11(), module.exports);
      __reExport2(src_exports2, require_lib(), module.exports);
    }
  });

  // ../satori/adapters/satori/lib/index.js
  var require_lib13 = __commonJS({
    "../satori/adapters/satori/lib/index.js"(exports, module) {
      var __defProp11 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames3 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __name10 = (target, value) => __defProp11(target, "name", { value, configurable: true });
      var __export2 = (target, all) => {
        for (var name2 in all)
          __defProp11(target, name2, { get: all[name2], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames3(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp11(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS2 = (mod) => __copyProps2(__defProp11({}, "__esModule", { value: true }), mod);
      var src_exports2 = {};
      __export2(src_exports2, {
        SatoriAdapter: () => SatoriAdapter,
        SatoriBot: () => SatoriBot,
        default: () => src_default2,
        transformKey: () => transformKey
      });
      module.exports = __toCommonJS2(src_exports2);
      var import_satori2 = require_lib12();
      var import_satori3 = require_lib12();
      function transformKey(source, callback) {
        if (!source || typeof source !== "object")
          return source;
        if (Array.isArray(source))
          return source.map((value) => transformKey(value, callback));
        return Object.fromEntries(Object.entries(source).map(([key, value]) => {
          if (key.startsWith("_"))
            return [key, value];
          return [callback(key), transformKey(value, callback)];
        }));
      }
      __name10(transformKey, "transformKey");
      function createInternal(bot, prefix = "") {
        return new Proxy(() => {
        }, {
          apply(target, thisArg, args) {
            return bot.http.post("/internal/" + (0, import_satori3.snakeCase)(prefix.slice(1)), args);
          },
          get(target, key, receiver) {
            if (typeof key === "symbol" || key in target) {
              return Reflect.get(target, key, receiver);
            }
            return createInternal(bot, prefix + "." + key);
          }
        });
      }
      __name10(createInternal, "createInternal");
      var _a25;
      var SatoriBot = (_a25 = class extends import_satori3.Bot {
        constructor(ctx, config) {
          super(ctx, config, "satori");
          __publicField(this, "http");
          __publicField(this, "internal", createInternal(this));
          Object.assign(this, config);
        }
      }, __name10(_a25, "SatoriBot"), _a25);
      for (const [key, method] of Object.entries(import_satori3.Universal.Methods)) {
        SatoriBot.prototype[method.name] = function(...args) {
          const payload = {};
          for (const { name: name2 } of method.fields) {
            if (name2 === "content") {
              payload[name2] = import_satori3.h.normalize(args.shift()).join("");
            } else {
              payload[name2] = transformKey(args.shift(), import_satori3.snakeCase);
            }
          }
          this.logger.debug("[request]", key, payload);
          return this.http.post("/v1/" + key, payload);
        };
      }
      var _a26;
      var SatoriAdapter = (_a26 = class extends import_satori2.Adapter.WsClientBase {
        // NodeJS.Timeout
        constructor(ctx, config) {
          super(ctx, config);
          __publicField(this, "http");
          __publicField(this, "logger");
          __publicField(this, "pongListener", new EventTarget());
          __publicField(this, "_status", import_satori2.Universal.Status.OFFLINE);
          __publicField(this, "sequence");
          __publicField(this, "timeout");
          this.ctx = ctx;
          this.config = config;
          this.logger = ctx.logger("satori");
          this.http = ctx.http.extend({
            baseURL: config.endpoint,
            headers: {
              "Authorization": `Bearer ${config.token}`
            }
          });
          ctx.on("ready", () => this.start());
          ctx.on("dispose", () => this.stop());
        }
        getActive() {
          return this._status !== import_satori2.Universal.Status.OFFLINE && this._status !== import_satori2.Universal.Status.DISCONNECT;
        }
        setStatus(status, error) {
          this._status = status;
          if (status === import_satori2.Universal.Status.ONLINE)
            return;
          for (const bot of this.bots) {
            bot.status = status;
            bot.error = error;
          }
        }
        async prepare() {
          return this.http.ws("/v1/events");
        }
        getBot(platform, selfId, login) {
          let bot = this.bots.find((bot2) => bot2.selfId === selfId && bot2.platform === platform);
          if (bot) {
            bot.update(login);
            return this.bots.includes(bot) ? bot : void 0;
          }
          if (!login) {
            this.logger.error("cannot find bot for", platform, selfId);
            return;
          }
          bot = new SatoriBot(this.ctx, login);
          bot.adapter = this;
          bot.http = this.http;
          this.bots.push(bot);
        }
        accept() {
          this.socket.send(JSON.stringify({
            op: import_satori2.Universal.Opcode.IDENTIFY,
            body: {
              token: this.config.token,
              sequence: this.sequence
            }
          }));
          this.timeout = setInterval(async () => {
            this.socket.send(JSON.stringify({
              op: import_satori2.Universal.Opcode.PING,
              body: {}
            }));
            await new Promise((resolve) => {
              const timeout = setTimeout(() => {
                cleanup();
                this.logger.warn("waiting for pong timeout: %c", this.socket?.url);
                this.socket.close();
                resolve();
              }, import_satori2.Time.second * 10);
              const pongCallback = /* @__PURE__ */ __name10(() => {
                cleanup();
                resolve();
              }, "pongCallback");
              const cleanup = /* @__PURE__ */ __name10(() => {
                clearInterval(timeout);
                this.pongListener.removeEventListener("pong", pongCallback);
              }, "cleanup");
              this.pongListener.addEventListener("pong", pongCallback);
            });
          }, import_satori2.Time.second * 10);
          this.socket.addEventListener("message", async ({ data }) => {
            let parsed;
            data = data.toString();
            try {
              parsed = transformKey(JSON.parse(data), import_satori2.camelize);
            } catch (error) {
              return this.logger.warn("cannot parse message", data);
            }
            if (parsed.op === import_satori2.Universal.Opcode.PONG) {
              this.pongListener.dispatchEvent(new Event("pong"));
              return;
            }
            if (parsed.op === import_satori2.Universal.Opcode.READY) {
              this.logger.debug("ready");
              for (const login of parsed.body.logins) {
                this.getBot(login.platform, login.selfId, login);
              }
              return;
            }
            if (parsed.op === import_satori2.Universal.Opcode.EVENT) {
              const { id, type: type2, selfId, platform, login } = parsed.body;
              this.sequence = id;
              const bot = this.getBot(platform, selfId, type2 === "login-added" && login);
              if (!bot)
                return;
              if (type2 === "login-updated") {
                return bot.update(login);
              } else if (type2 === "login-removed") {
                return bot.dispose();
              }
              const session = bot.session(parsed.body);
              if (parsed.body.message?.content) {
                session.content = parsed.body.message.content;
              }
              if (parsed.body._type && parsed.body.type !== "internal") {
                session.setInternal(parsed.body._type, parsed.body._data);
              }
              bot.dispatch(session);
            }
          });
          this.socket.addEventListener("close", () => {
            clearInterval(this.timeout);
          });
        }
        async start() {
          this.setStatus(import_satori2.Universal.Status.CONNECT);
          await super.start();
        }
        async stop() {
          this.setStatus(import_satori2.Universal.Status.DISCONNECT);
          await super.stop();
        }
      }, __name10(_a26, "SatoriAdapter"), __publicField(_a26, "schema", true), __publicField(_a26, "reusable", true), __publicField(_a26, "inject", ["http"]), _a26);
      ((SatoriAdapter2) => {
        SatoriAdapter2.Config = import_satori2.Schema.intersect([
          import_satori2.Schema.object({
            endpoint: import_satori2.Schema.string().description("API \u7EC8\u7ED3\u70B9\u3002").required(),
            token: import_satori2.Schema.string().description("API \u8BBF\u95EE\u4EE4\u724C\u3002")
          }),
          import_satori2.Adapter.WsClientConfig
        ]);
      })(SatoriAdapter || (SatoriAdapter = {}));
      var src_default2 = SatoriAdapter;
    }
  });

  // src/index.ts
  var src_exports = {};
  __export(src_exports, {
    Adapter: () => Adapter,
    Bot: () => Bot,
    Context: () => Context3,
    CordisError: () => CordisError,
    EffectScope: () => EffectScope,
    Element: () => lib_default,
    ForkScope: () => ForkScope,
    Lifecycle: () => Lifecycle,
    Logger: () => import_levi_reggol2.default,
    MainScope: () => MainScope,
    MessageEncoder: () => MessageEncoder,
    Messenger: () => MessageEncoder,
    Modulator: () => MessageEncoder,
    Registry: () => Registry,
    Schema: () => import_schemastery.default,
    ScopeStatus: () => ScopeStatus,
    Service: () => Service23,
    Session: () => Session,
    TimerService: () => TimerService2,
    Universal: () => lib_exports2,
    applyTraceable: () => applyTraceable,
    createCallable: () => createCallable,
    createTraceable: () => createTraceable,
    defineAccessor: () => defineAccessor,
    h: () => lib_default,
    isApplicable: () => isApplicable,
    isBailed: () => isBailed,
    isConstructor: () => isConstructor,
    isUnproxyable: () => isUnproxyable,
    joinPrototype: () => joinPrototype,
    resolveConfig: () => resolveConfig,
    segment: () => lib_default,
    symbols: () => symbols,
    z: () => import_schemastery.default
  });

  // ../../node_modules/event-target-polyfill/index.js
  var root = typeof globalThis !== "undefined" && globalThis || typeof self !== "undefined" && self || typeof global !== "undefined" && global;
  var shouldPolyfillEvent = function() {
    try {
      new root.Event("");
    } catch (error) {
      return true;
    }
    return false;
  }();
  var shouldPolyfillEventTarget = function() {
    try {
      new root.EventTarget();
    } catch (error) {
      return true;
    }
    return false;
  }();
  if (shouldPolyfillEvent) {
    root.Event = function() {
      function Event2(type2, options) {
        this.bubbles = !!options && !!options.bubbles;
        this.cancelable = !!options && !!options.cancelable;
        this.composed = !!options && !!options.composed;
        this.type = type2;
      }
      return Event2;
    }();
  }
  if (shouldPolyfillEventTarget) {
    root.EventTarget = function() {
      function EventTarget2() {
        this.__listeners = /* @__PURE__ */ new Map();
      }
      EventTarget2.prototype = Object.create(Object.prototype);
      EventTarget2.prototype.addEventListener = function(type2, listener, options) {
        if (arguments.length < 2) {
          throw new TypeError(
            "TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only " + arguments.length + " present."
          );
        }
        const __listeners = this.__listeners;
        const actualType = type2.toString();
        if (!__listeners.has(actualType)) {
          __listeners.set(actualType, /* @__PURE__ */ new Map());
        }
        const listenersForType = __listeners.get(actualType);
        if (!listenersForType.has(listener)) {
          listenersForType.set(listener, options);
        }
      };
      EventTarget2.prototype.removeEventListener = function(type2, listener, _options) {
        if (arguments.length < 2) {
          throw new TypeError(
            "TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only " + arguments.length + " present."
          );
        }
        const __listeners = this.__listeners;
        const actualType = type2.toString();
        if (__listeners.has(actualType)) {
          const listenersForType = __listeners.get(actualType);
          if (listenersForType.has(listener)) {
            listenersForType.delete(listener);
          }
        }
      };
      EventTarget2.prototype.dispatchEvent = function(event) {
        if (!(event instanceof Event)) {
          throw new TypeError(
            "Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'."
          );
        }
        const type2 = event.type;
        const __listeners = this.__listeners;
        const listenersForType = __listeners.get(type2);
        if (listenersForType) {
          for (var listnerEntry of listenersForType.entries()) {
            const listener = listnerEntry[0];
            const options = listnerEntry[1];
            try {
              if (typeof listener === "function") {
                listener.call(this, event);
              } else if (listener && typeof listener.handleEvent === "function") {
                listener.handleEvent(event);
              }
            } catch (err) {
              setTimeout(() => {
                throw err;
              });
            }
            if (options && options.once) {
              listenersForType.delete(listener);
            }
          }
        }
        return true;
      };
      return EventTarget2;
    }();
  }

  // src/index.ts
  var import_levi_reggol2 = __toESM(require_lib2());
  var import_adapter_satori = __toESM(require_lib13());

  // ../cordis/packages/core/lib/index.mjs
  var import_cosmokit = __toESM(require_lib(), 1);
  var import_cosmokit2 = __toESM(require_lib(), 1);
  var import_cosmokit3 = __toESM(require_lib(), 1);
  var import_cosmokit4 = __toESM(require_lib(), 1);
  var import_cosmokit5 = __toESM(require_lib(), 1);
  var import_cosmokit6 = __toESM(require_lib(), 1);
  var __defProp2 = Object.defineProperty;
  var __name = (target, value) => __defProp2(target, "name", { value, configurable: true });
  function isBailed(value) {
    return value !== null && value !== false && value !== void 0;
  }
  __name(isBailed, "isBailed");
  var _a;
  var Lifecycle = (_a = class {
    constructor(root2) {
      __publicField(this, "isActive", false);
      __publicField(this, "_tasks", /* @__PURE__ */ new Set());
      __publicField(this, "_hooks", {});
      this.root = root2;
      (0, import_cosmokit2.defineProperty)(this, Context2.origin, root2);
      (0, import_cosmokit2.defineProperty)(this.on("internal/listener", function(name2, listener, prepend) {
        const method = prepend ? "unshift" : "push";
        if (name2 === "ready") {
          if (!this.lifecycle.isActive)
            return;
          this.scope.ensure(async () => listener());
          return () => false;
        } else if (name2 === "dispose") {
          this.scope.disposables[method](listener);
          (0, import_cosmokit2.defineProperty)(listener, "name", "event <dispose>");
          return () => (0, import_cosmokit2.remove)(this.scope.disposables, listener);
        } else if (name2 === "fork") {
          this.scope.runtime.forkables[method](listener);
          return this.scope.collect("event <fork>", () => (0, import_cosmokit2.remove)(this.scope.runtime.forkables, listener));
        }
      }), Context2.static, root2.scope);
      for (const level of ["info", "error", "warning"]) {
        (0, import_cosmokit2.defineProperty)(this.on(`internal/${level}`, (format, ...param) => {
          if (this._hooks[`internal/${level}`].length > 1)
            return;
          console.info(format, ...param);
        }), Context2.static, root2.scope);
      }
    }
    async flush() {
      while (this._tasks.size) {
        await Promise.all(Array.from(this._tasks));
      }
    }
    getHooks(name2, thisArg) {
      const hooks = this._hooks[name2] || [];
      return hooks.slice().filter(([context]) => {
        const filter = thisArg?.[Context2.filter];
        return !filter || filter.call(thisArg, context);
      }).map(([, callback]) => callback);
    }
    prepareEvent(type2, args) {
      const thisArg = typeof args[0] === "object" ? args.shift() : null;
      const name2 = args.shift();
      if (name2 !== "internal/event") {
        this.emit("internal/event", type2, name2, args, thisArg);
      }
      return [this.getHooks(name2, thisArg), thisArg ?? this[Context2.origin]];
    }
    async parallel(...args) {
      const [hooks, thisArg] = this.prepareEvent("parallel", args);
      await Promise.all(hooks.map(async (callback) => {
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
        if (isBailed(result))
          return result;
      }
    }
    bail(...args) {
      const [hooks, thisArg] = this.prepareEvent("bail", args);
      for (const callback of hooks) {
        const result = callback.apply(thisArg, args);
        if (isBailed(result))
          return result;
      }
    }
    register(label, hooks, listener, prepend) {
      const caller = this[Context2.origin];
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
    on(name2, listener, prepend = false) {
      var _a25;
      const caller = this[Context2.origin];
      caller.scope.assertActive();
      const result = this.bail(caller, "internal/listener", name2, listener, prepend);
      if (result)
        return result;
      const hooks = (_a25 = this._hooks)[name2] || (_a25[name2] = []);
      const label = typeof name2 === "string" ? `event <${name2}>` : "event (Symbol)";
      return this.register(label, hooks, listener, prepend);
    }
    once(name2, listener, prepend = false) {
      const dispose = this.on(name2, function(...args) {
        dispose();
        return listener.apply(this, args);
      }, prepend);
      return dispose;
    }
    off(name2, listener) {
      return this.unregister(this._hooks[name2] || [], listener);
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
  }, __name(_a, "Lifecycle"), _a);
  var symbols = {
    // context symbols
    origin: Symbol.for("cordis.origin"),
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
    if (!func.prototype)
      return false;
    if (func.prototype.constructor !== func)
      return false;
    return true;
  }
  __name(isConstructor, "isConstructor");
  function resolveConfig(plugin, config) {
    const schema2 = plugin["Config"] || plugin["schema"];
    if (schema2 && plugin["schema"] !== false)
      config = schema2(config);
    return config ?? {};
  }
  __name(resolveConfig, "resolveConfig");
  function isUnproxyable(value) {
    return [Map, Set, Date, Promise].some((constructor) => value instanceof constructor);
  }
  __name(isUnproxyable, "isUnproxyable");
  function joinPrototype(proto1, proto2) {
    if (proto1 === Object.prototype)
      return proto2;
    const result = Object.create(joinPrototype(Object.getPrototypeOf(proto1), proto2));
    for (const key of Reflect.ownKeys(proto1)) {
      Object.defineProperty(result, key, Object.getOwnPropertyDescriptor(proto1, key));
    }
    return result;
  }
  __name(joinPrototype, "joinPrototype");
  function createTraceable(ctx, value) {
    const proxy = new Proxy(value, {
      get: (target, name2, receiver) => {
        if (name2 === symbols.origin || name2 === "caller")
          return ctx;
        return Reflect.get(target, name2, receiver);
      },
      apply: (target, thisArg, args) => {
        return applyTraceable(proxy, target, thisArg, args);
      }
    });
    return proxy;
  }
  __name(createTraceable, "createTraceable");
  function applyTraceable(proxy, value, thisArg, args) {
    if (!value[symbols.invoke])
      return Reflect.apply(value, thisArg, args);
    return value[symbols.invoke].apply(proxy, args);
  }
  __name(applyTraceable, "applyTraceable");
  function createCallable(name2, proto) {
    const self2 = /* @__PURE__ */ __name(function(...args) {
      const proxy = createTraceable(self2[symbols.origin], self2);
      return applyTraceable(proxy, self2, this, args);
    }, "self");
    (0, import_cosmokit5.defineProperty)(self2, "name", name2);
    return Object.setPrototypeOf(self2, proto);
  }
  __name(createCallable, "createCallable");
  var ScopeStatus = /* @__PURE__ */ ((ScopeStatus2) => {
    ScopeStatus2[ScopeStatus2["PENDING"] = 0] = "PENDING";
    ScopeStatus2[ScopeStatus2["LOADING"] = 1] = "LOADING";
    ScopeStatus2[ScopeStatus2["ACTIVE"] = 2] = "ACTIVE";
    ScopeStatus2[ScopeStatus2["FAILED"] = 3] = "FAILED";
    ScopeStatus2[ScopeStatus2["DISPOSED"] = 4] = "DISPOSED";
    return ScopeStatus2;
  })(ScopeStatus || {});
  var _a2;
  var CordisError = (_a2 = class extends Error {
    constructor(code, message) {
      super(message ?? _a2.Code[code]);
      this.code = code;
    }
  }, __name(_a2, "CordisError"), _a2);
  ((CordisError2) => {
    CordisError2.Code = {
      INACTIVE_EFFECT: "cannot create effect on inactive context"
    };
  })(CordisError || (CordisError = {}));
  var _a3;
  var EffectScope = (_a3 = class {
    constructor(parent, config) {
      __publicField(this, "uid");
      __publicField(this, "ctx");
      __publicField(this, "disposables", []);
      __publicField(this, "error");
      __publicField(this, "status", 0);
      __publicField(this, "isActive", false);
      // Same as `this.ctx`, but with a more specific type.
      __publicField(this, "context");
      __publicField(this, "proxy");
      __publicField(this, "acceptors", []);
      __publicField(this, "tasks", /* @__PURE__ */ new Set());
      __publicField(this, "hasError", false);
      this.parent = parent;
      this.config = config;
      this.uid = parent.registry ? parent.registry.counter : 0;
      this.ctx = this.context = parent.extend({ scope: this });
      this.proxy = new Proxy({}, {
        get: (target, key) => Reflect.get(this.config, key)
      });
    }
    get _config() {
      return this.runtime.isReactive ? this.proxy : this.config;
    }
    assertActive() {
      if (this.uid !== null || this.isActive)
        return;
      throw new CordisError("INACTIVE_EFFECT");
    }
    effect(callback, config) {
      this.assertActive();
      const result = isConstructor(callback) ? new callback(this.ctx, config) : callback(this.ctx, config);
      let disposed = false;
      const original = typeof result === "function" ? result : result.dispose.bind(result);
      const wrapped = /* @__PURE__ */ __name(() => {
        if (disposed)
          return;
        disposed = true;
        (0, import_cosmokit4.remove)(this.disposables, wrapped);
        return original();
      }, "wrapped");
      this.disposables.push(wrapped);
      if (typeof result === "function")
        return wrapped;
      result.dispose = wrapped;
      return result;
    }
    collect(label, callback) {
      const dispose = (0, import_cosmokit4.defineProperty)(() => {
        (0, import_cosmokit4.remove)(this.disposables, dispose);
        return callback();
      }, "name", label);
      this.disposables.push(dispose);
      return dispose;
    }
    restart() {
      this.reset();
      this.error = null;
      this.hasError = false;
      this.status = 0;
      this.start();
    }
    _getStatus() {
      if (this.uid === null)
        return 4;
      if (this.hasError)
        return 3;
      if (this.tasks.size)
        return 1;
      if (this.ready)
        return 2;
      return 0;
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
      const task = callback().catch((reason) => {
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
      if (!this.runtime.using.length)
        return;
      (0, import_cosmokit4.defineProperty)(this.context.on("internal/before-service", (name2) => {
        if (!this.runtime.using.includes(name2))
          return;
        this._updateStatus();
        this.reset();
      }), Context2.static, this);
      (0, import_cosmokit4.defineProperty)(this.context.on("internal/service", (name2) => {
        if (!this.runtime.using.includes(name2))
          return;
        this.start();
      }), Context2.static, this);
    }
    get ready() {
      return this.runtime.using.every((name2) => !(0, import_cosmokit4.isNullable)(this.ctx[name2]));
    }
    reset() {
      this.isActive = false;
      this.disposables = this.disposables.splice(0).filter((dispose) => {
        if (this.uid !== null && dispose[Context2.static] === this)
          return true;
        (async () => dispose())().catch((reason) => {
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
      if (!this.ready || this.isActive || this.uid === null)
        return true;
      this.isActive = true;
      this._updateStatus(() => this.hasError = false);
    }
    accept(...args) {
      const keys = Array.isArray(args[0]) ? args.shift() : null;
      const acceptor = { keys, callback: args[0], ...args[1] };
      return this.effect(() => {
        this.acceptors.push(acceptor);
        if (acceptor.immediate)
          acceptor.callback?.(this.config);
        return () => (0, import_cosmokit4.remove)(this.acceptors, acceptor);
      });
    }
    decline(keys) {
      return this.accept(keys, () => true);
    }
    checkUpdate(resolved, forced) {
      if (forced || !this.config)
        return [true, true];
      if (forced === false)
        return [false, false];
      const modified = /* @__PURE__ */ Object.create(null);
      const checkPropertyUpdate = /* @__PURE__ */ __name((key) => {
        const result = modified[key] ?? (modified[key] = !(0, import_cosmokit4.deepEqual)(this.config[key], resolved[key]));
        hasUpdate || (hasUpdate = result);
        return result;
      }, "checkPropertyUpdate");
      const ignored = /* @__PURE__ */ new Set();
      let hasUpdate = false, shouldRestart = false;
      let fallback = this.runtime.isReactive || null;
      for (const { keys, callback, passive } of this.acceptors) {
        if (!keys) {
          fallback || (fallback = !passive);
        } else if (passive) {
          keys?.forEach((key) => ignored.add(key));
        } else {
          let hasUpdate2 = false;
          for (const key of keys) {
            hasUpdate2 || (hasUpdate2 = checkPropertyUpdate(key));
          }
          if (!hasUpdate2)
            continue;
        }
        const result = callback?.(resolved);
        if (result)
          shouldRestart = true;
      }
      for (const key in { ...this.config, ...resolved }) {
        if (fallback === false)
          continue;
        if (!(key in modified) && !ignored.has(key)) {
          const hasUpdate2 = checkPropertyUpdate(key);
          if (fallback === null)
            shouldRestart || (shouldRestart = hasUpdate2);
        }
      }
      return [hasUpdate, shouldRestart];
    }
  }, __name(_a3, "EffectScope"), _a3);
  var _a4;
  var ForkScope = (_a4 = class extends EffectScope {
    constructor(parent, runtime, config, error) {
      super(parent, config);
      __publicField(this, "dispose");
      this.runtime = runtime;
      this.dispose = (0, import_cosmokit4.defineProperty)(parent.scope.collect(`fork <${parent.runtime.name}>`, () => {
        this.uid = null;
        this.reset();
        this.context.emit("internal/fork", this);
        const result = (0, import_cosmokit4.remove)(runtime.disposables, this.dispose);
        if ((0, import_cosmokit4.remove)(runtime.children, this) && !runtime.children.length) {
          parent.registry.delete(runtime.plugin);
        }
        return result;
      }), Context2.static, runtime);
      runtime.children.push(this);
      runtime.disposables.push(this.dispose);
      this.context.emit("internal/fork", this);
      if (runtime.isReusable) {
        this.setupInject();
      }
      this.init(error);
    }
    start() {
      if (super.start())
        return true;
      for (const fork of this.runtime.forkables) {
        this.ensure(async () => fork(this.context, this._config));
      }
    }
    update(config, forced) {
      const oldConfig = this.config;
      const state = this.runtime.isForkable ? this : this.runtime;
      if (state.config !== oldConfig)
        return;
      const resolved = resolveConfig(this.runtime.plugin, config);
      const [hasUpdate, shouldRestart] = state.checkUpdate(resolved, forced);
      this.context.emit("internal/before-update", this, config);
      this.config = resolved;
      state.config = resolved;
      if (hasUpdate) {
        this.context.emit("internal/update", this, oldConfig);
      }
      if (shouldRestart)
        state.restart();
    }
  }, __name(_a4, "ForkScope"), _a4);
  var _a5;
  var MainScope = (_a5 = class extends EffectScope {
    constructor(registry, plugin, config, error) {
      super(registry[Context2.origin], config);
      __publicField(this, "value");
      __publicField(this, "runtime", this);
      __publicField(this, "schema");
      __publicField(this, "name");
      __publicField(this, "using", []);
      __publicField(this, "inject", /* @__PURE__ */ new Set());
      __publicField(this, "forkables", []);
      __publicField(this, "children", []);
      __publicField(this, "isReusable", false);
      __publicField(this, "isReactive", false);
      __publicField(this, "apply", (context, config) => {
        if (typeof this.plugin !== "function") {
          return this.plugin.apply(context, config);
        } else if (isConstructor(this.plugin)) {
          const instance = new this.plugin(context, config);
          const name2 = instance[Context2.expose];
          if (name2) {
            context[name2] = instance;
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
      const { name: name2 } = this.plugin;
      if (name2 && name2 !== "apply")
        this.name = name2;
      this.schema = this.plugin["Config"] || this.plugin["schema"];
      const inject2 = this.plugin["using"] || this.plugin["inject"] || [];
      if (Array.isArray(inject2)) {
        this.using = inject2;
        this.inject = new Set(inject2);
      } else {
        this.using = inject2.required || [];
        this.inject = /* @__PURE__ */ new Set([...this.using, ...inject2.optional || []]);
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
      if (super.start())
        return true;
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
      const state = this.children.find((fork) => fork.config === oldConfig);
      this.config = resolved;
      if (state) {
        this.context.emit("internal/before-update", state, config);
        state.config = resolved;
        if (hasUpdate) {
          this.context.emit("internal/update", state, oldConfig);
        }
      }
      if (shouldRestart)
        this.restart();
    }
  }, __name(_a5, "MainScope"), _a5);
  function isApplicable(object) {
    return object && typeof object === "object" && typeof object.apply === "function";
  }
  __name(isApplicable, "isApplicable");
  var _a6;
  var Registry = (_a6 = class {
    constructor(root2, config) {
      __publicField(this, "_counter", 0);
      __publicField(this, "_internal", /* @__PURE__ */ new Map());
      this.root = root2;
      (0, import_cosmokit3.defineProperty)(this, Context2.origin, root2);
      root2.scope = new MainScope(this, null, config);
      root2.scope.runtime.isReactive = true;
    }
    get counter() {
      return ++this._counter;
    }
    get size() {
      return this._internal.size;
    }
    resolve(plugin) {
      if (plugin === null)
        return plugin;
      if (typeof plugin === "function")
        return plugin;
      if (isApplicable(plugin))
        return plugin.apply;
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
      if (!runtime)
        return;
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
    using(inject2, callback) {
      return this.inject(inject2, callback);
    }
    inject(inject2, callback) {
      return this.plugin({ inject: inject2, apply: callback, name: callback.name });
    }
    plugin(plugin, config) {
      this.resolve(plugin);
      const context = this[Context2.origin];
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
  }, __name(_a6, "Registry"), _a6);
  var _a7;
  var Context2 = (_a7 = class {
    static is(value) {
      return !!value?.[_a7.is];
    }
    static ensureInternal() {
      const ctx = this.prototype || this;
      if (Object.prototype.hasOwnProperty.call(ctx, symbols.internal)) {
        return ctx[symbols.internal];
      }
      const parent = _a7.ensureInternal.call(Object.getPrototypeOf(this));
      return ctx[symbols.internal] = Object.create(parent);
    }
    static resolveInject(ctx, name2) {
      let internal = ctx[symbols.internal][name2];
      while (internal?.type === "alias") {
        name2 = internal.name;
        internal = ctx[symbols.internal][name2];
      }
      return [name2, internal];
    }
    static associate(object, name2) {
      return new Proxy(object, {
        get(target, key, receiver) {
          if (typeof key === "symbol" || key in target)
            return Reflect.get(target, key, receiver);
          const caller = receiver[symbols.origin];
          if (!caller?.[symbols.internal][`${name2}.${key}`])
            return Reflect.get(target, key, receiver);
          return caller.get(`${name2}.${key}`);
        },
        set(target, key, value, receiver) {
          if (typeof key === "symbol" || key in target)
            return Reflect.set(target, key, value, receiver);
          const caller = receiver[symbols.origin];
          if (!caller?.[symbols.internal][`${name2}.${key}`])
            return Reflect.set(target, key, value, receiver);
          caller[`${name2}.${key}`] = value;
          return true;
        }
      });
    }
    constructor(config) {
      const self2 = new Proxy(this, _a7.handler);
      config = resolveConfig(this.constructor, config);
      self2[symbols.isolate] = /* @__PURE__ */ Object.create(null);
      self2[symbols.intercept] = /* @__PURE__ */ Object.create(null);
      self2.root = self2;
      self2.mixin("scope", ["config", "runtime", "effect", "collect", "accept", "decline"]);
      self2.mixin("registry", ["using", "inject", "plugin", "dispose"]);
      self2.mixin("lifecycle", ["on", "once", "off", "after", "parallel", "emit", "serial", "bail", "start", "stop"]);
      self2.provide("registry", new Registry(self2, config), true);
      self2.provide("lifecycle", new Lifecycle(self2), true);
      const attach = /* @__PURE__ */ __name((internal) => {
        if (!internal)
          return;
        attach(Object.getPrototypeOf(internal));
        for (const key of Object.getOwnPropertyNames(internal)) {
          const constructor = internal[key]["prototype"]?.constructor;
          if (!constructor)
            continue;
          self2[internal[key]["key"]] = new constructor(self2, config);
          (0, import_cosmokit.defineProperty)(self2[internal[key]["key"]], symbols.origin, self2);
        }
      }, "attach");
      attach(this[symbols.internal]);
      return self2;
    }
    [Symbol.for("nodejs.util.inspect.custom")]() {
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
    get(name2) {
      const internal = this[symbols.internal][name2];
      if (internal?.type !== "service")
        return;
      const value = this.root[this[symbols.isolate][name2]];
      if (!value || typeof value !== "object" && typeof value !== "function")
        return value;
      if (isUnproxyable(value)) {
        (0, import_cosmokit.defineProperty)(value, symbols.origin, this);
        return value;
      }
      return createTraceable(this, value);
    }
    provide(name2, value, builtin) {
      const internal = _a7.ensureInternal.call(this.root);
      if (name2 in internal)
        return;
      const key = Symbol(name2);
      internal[name2] = { type: "service", builtin };
      this.root[key] = value;
      this.root[_a7.isolate][name2] = key;
    }
    accessor(name2, options) {
      const internal = _a7.ensureInternal.call(this.root);
      internal[name2] || (internal[name2] = { type: "accessor", ...options });
    }
    alias(name2, aliases) {
      const internal = _a7.ensureInternal.call(this.root);
      for (const key of aliases) {
        internal[key] || (internal[key] = { type: "alias", name: name2 });
      }
    }
    mixin(name2, mixins) {
      for (const key of mixins) {
        this.accessor(key, {
          get() {
            const service = this[name2];
            if ((0, import_cosmokit.isNullable)(service))
              return service;
            const value = Reflect.get(service, key);
            if (typeof value !== "function")
              return value;
            return value.bind(service);
          },
          set(value) {
            return Reflect.set(this[name2], key, value);
          }
        });
      }
    }
    extend(meta = {}) {
      return Object.assign(Object.create(this), meta);
    }
    isolate(name2, label) {
      const shadow = Object.create(this[symbols.isolate]);
      shadow[name2] = label ?? Symbol(name2);
      return this.extend({ [symbols.isolate]: shadow });
    }
    intercept(name2, config) {
      const intercept = Object.create(this[symbols.intercept]);
      intercept[name2] = config;
      return this.extend({ [symbols.intercept]: intercept });
    }
  }, __name(_a7, "Context"), __publicField(_a7, "origin", symbols.origin), __publicField(_a7, "events", symbols.events), __publicField(_a7, "static", symbols.static), __publicField(_a7, "filter", symbols.filter), __publicField(_a7, "expose", symbols.expose), __publicField(_a7, "isolate", symbols.isolate), __publicField(_a7, "internal", symbols.internal), __publicField(_a7, "intercept", symbols.intercept), /** @deprecated use `Context.trace` instead */
  __publicField(_a7, "current", _a7.origin), _a7.is[Symbol.toPrimitive] = () => Symbol.for("cordis.is"), _a7.prototype[_a7.is] = true, __publicField(_a7, "handler", {
    get(target, prop, ctx) {
      if (typeof prop !== "string")
        return Reflect.get(target, prop, ctx);
      const checkInject = /* @__PURE__ */ __name((name22) => {
        if (Reflect.has(target, name22))
          return;
        if (["prototype", "then", "registry", "lifecycle"].includes(name22))
          return;
        if (name22[0] === "$" || name22[0] === "_")
          return;
        if (!ctx.runtime.plugin)
          return;
        let parent = ctx;
        while (parent.runtime.plugin) {
          for (const key of parent.runtime.inject) {
            if (name22 === _a7.resolveInject(parent, key)[0])
              return;
          }
          parent = parent.scope.parent;
        }
        ctx.emit("internal/warning", new Error(`property ${name22} is not registered, declare it as \`inject\` to suppress this warning`));
      }, "checkInject");
      const [name2, internal] = _a7.resolveInject(ctx, prop);
      if (!internal) {
        checkInject(name2);
        return Reflect.get(target, name2, ctx);
      }
      if (internal.type === "accessor") {
        return internal.get.call(ctx);
      } else if (internal.type === "service") {
        if (!internal.builtin)
          checkInject(name2);
        return ctx.get(name2);
      }
    },
    set(target, prop, value, ctx) {
      if (typeof prop !== "string")
        return Reflect.set(target, prop, value, ctx);
      const [name2, internal] = _a7.resolveInject(ctx, prop);
      if (!internal)
        return Reflect.set(target, name2, value, ctx);
      if (internal.type === "accessor") {
        if (!internal.set)
          return false;
        return internal.set.call(ctx, value);
      }
      const key = ctx[symbols.isolate][name2];
      const oldValue = ctx.root[key];
      if (oldValue === value)
        return true;
      if (value && oldValue) {
        throw new Error(`service ${name2} has been registered`);
      }
      if (value) {
        ctx.on("dispose", () => ctx[name2] = void 0);
      }
      if (isUnproxyable(value)) {
        ctx.emit("internal/warning", new Error(`service ${name2} is an unproxyable object, which may lead to unexpected behavior`));
      }
      const self2 = /* @__PURE__ */ Object.create(null);
      self2[symbols.filter] = (ctx2) => {
        return ctx[symbols.isolate][name2] === ctx2[symbols.isolate][name2];
      };
      ctx.root.emit(self2, "internal/before-service", name2, value);
      ctx.root[key] = value;
      if (value instanceof Object) {
        (0, import_cosmokit.defineProperty)(value, symbols.origin, ctx);
      }
      ctx.root.emit(self2, "internal/service", name2, oldValue);
      return true;
    }
  }), _a7);
  Context2.prototype[Context2.internal] = /* @__PURE__ */ Object.create(null);
  var _a8, _b;
  var Service2 = (_a8 = class {
    constructor(...args) {
      __publicField(this, "ctx");
      __publicField(this, _b);
      __publicField(this, "name");
      __publicField(this, "config");
      let _ctx, name2, immediate, config;
      if (Context2.is(args[0])) {
        _ctx = args[0];
        if (typeof args[1] === "string") {
          name2 = args[1];
          immediate = args[2];
        } else {
          config = args[1];
        }
      } else {
        config = args[0];
      }
      name2 ?? (name2 = this.constructor[symbols.provide]);
      immediate ?? (immediate = this.constructor[symbols.immediate]);
      let self2 = this;
      if (self2[symbols.invoke]) {
        self2 = createCallable(name2, joinPrototype(Object.getPrototypeOf(this), Function.prototype));
      }
      if (_ctx) {
        self2.ctx = _ctx;
      } else {
        self2[symbols.setup]();
      }
      self2.name = name2;
      self2.config = config;
      (0, import_cosmokit6.defineProperty)(self2, symbols.origin, self2.ctx);
      self2.ctx.provide(name2);
      self2.ctx.runtime.name = name2;
      if (immediate) {
        if (_ctx)
          self2[symbols.expose] = name2;
        else
          self2.ctx[name2] = self2;
      }
      self2.ctx.on("ready", async () => {
        await Promise.resolve();
        await self2.start();
        if (!immediate)
          self2.ctx[name2] = self2;
      });
      self2.ctx.on("dispose", () => self2.stop());
      return Context2.associate(self2, name2);
    }
    start() {
    }
    stop() {
    }
    [(_b = symbols.origin, symbols.filter)](ctx) {
      return ctx[symbols.isolate][this.name] === this.ctx[symbols.isolate][this.name];
    }
    [symbols.setup]() {
      this.ctx = new Context2();
    }
    [symbols.extend](props) {
      const caller = this[symbols.origin];
      let self2;
      if (this[_a8.invoke]) {
        self2 = createCallable(this.name, this);
      } else {
        self2 = Object.create(this);
      }
      (0, import_cosmokit6.defineProperty)(self2, symbols.origin, caller);
      return Context2.associate(Object.assign(self2, props), this.name);
    }
    static [Symbol.hasInstance](instance) {
      let constructor = instance.constructor;
      while (constructor) {
        if (constructor === this)
          return true;
        constructor = Object.getPrototypeOf(constructor);
      }
      return false;
    }
  }, __name(_a8, "Service"), __publicField(_a8, "setup", symbols.setup), __publicField(_a8, "invoke", symbols.invoke), __publicField(_a8, "extend", symbols.extend), __publicField(_a8, "provide", symbols.provide), __publicField(_a8, "immediate", symbols.immediate), _a8);

  // ../cordis/packages/loader/lib/shared.js
  var import_cosmokit7 = __toESM(require_lib(), 1);

  // ../../node_modules/js-yaml/dist/js-yaml.mjs
  function isNothing(subject) {
    return typeof subject === "undefined" || subject === null;
  }
  function isObject(subject) {
    return typeof subject === "object" && subject !== null;
  }
  function toArray(sequence) {
    if (Array.isArray(sequence))
      return sequence;
    else if (isNothing(sequence))
      return [];
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
    var result = "", cycle;
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
  function formatError(exception2, compact) {
    var where = "", message = exception2.reason || "(unknown reason)";
    if (!exception2.mark)
      return message;
    if (exception2.mark.name) {
      where += 'in "' + exception2.mark.name + '" ';
    }
    where += "(" + (exception2.mark.line + 1) + ":" + (exception2.mark.column + 1) + ")";
    if (!compact && exception2.mark.snippet) {
      where += "\n\n" + exception2.mark.snippet;
    }
    return message + " " + where;
  }
  function YAMLException$1(reason, mark) {
    Error.call(this);
    this.name = "YAMLException";
    this.reason = reason;
    this.mark = mark;
    this.message = formatError(this, false);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = new Error().stack || "";
    }
  }
  YAMLException$1.prototype = Object.create(Error.prototype);
  YAMLException$1.prototype.constructor = YAMLException$1;
  YAMLException$1.prototype.toString = function toString(compact) {
    return this.name + ": " + formatError(this, compact);
  };
  var exception = YAMLException$1;
  function getLine(buffer, lineStart, lineEnd, position, maxLineLength) {
    var head = "";
    var tail = "";
    var maxHalfLength = Math.floor(maxLineLength / 2) - 1;
    if (position - lineStart > maxHalfLength) {
      head = " ... ";
      lineStart = position - maxHalfLength + head.length;
    }
    if (lineEnd - position > maxHalfLength) {
      tail = " ...";
      lineEnd = position + maxHalfLength - tail.length;
    }
    return {
      str: head + buffer.slice(lineStart, lineEnd).replace(/\t/g, "\u2192") + tail,
      pos: position - lineStart + head.length
      // relative position
    };
  }
  function padStart(string, max) {
    return common.repeat(" ", max - string.length) + string;
  }
  function makeSnippet(mark, options) {
    options = Object.create(options || null);
    if (!mark.buffer)
      return null;
    if (!options.maxLength)
      options.maxLength = 79;
    if (typeof options.indent !== "number")
      options.indent = 1;
    if (typeof options.linesBefore !== "number")
      options.linesBefore = 3;
    if (typeof options.linesAfter !== "number")
      options.linesAfter = 2;
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
    if (foundLineNo < 0)
      foundLineNo = lineStarts.length - 1;
    var result = "", i, line;
    var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
    var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);
    for (i = 1; i <= options.linesBefore; i++) {
      if (foundLineNo - i < 0)
        break;
      line = getLine(
        mark.buffer,
        lineStarts[foundLineNo - i],
        lineEnds[foundLineNo - i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
        maxLineLength
      );
      result = common.repeat(" ", options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) + " | " + line.str + "\n" + result;
    }
    line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
    result += common.repeat(" ", options.indent) + padStart((mark.line + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    result += common.repeat("-", options.indent + lineNoLength + 3 + line.pos) + "^\n";
    for (i = 1; i <= options.linesAfter; i++) {
      if (foundLineNo + i >= lineEnds.length)
        break;
      line = getLine(
        mark.buffer,
        lineStarts[foundLineNo + i],
        lineEnds[foundLineNo + i],
        mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
        maxLineLength
      );
      result += common.repeat(" ", options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) + " | " + line.str + "\n";
    }
    return result.replace(/\n$/, "");
  }
  var snippet = makeSnippet;
  var TYPE_CONSTRUCTOR_OPTIONS = [
    "kind",
    "multi",
    "resolve",
    "construct",
    "instanceOf",
    "predicate",
    "represent",
    "representName",
    "defaultStyle",
    "styleAliases"
  ];
  var YAML_NODE_KINDS = [
    "scalar",
    "sequence",
    "mapping"
  ];
  function compileStyleAliases(map2) {
    var result = {};
    if (map2 !== null) {
      Object.keys(map2).forEach(function(style) {
        map2[style].forEach(function(alias) {
          result[String(alias)] = style;
        });
      });
    }
    return result;
  }
  function Type$1(tag, options) {
    options = options || {};
    Object.keys(options).forEach(function(name2) {
      if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name2) === -1) {
        throw new exception('Unknown option "' + name2 + '" is met in definition of "' + tag + '" YAML type.');
      }
    });
    this.options = options;
    this.tag = tag;
    this.kind = options["kind"] || null;
    this.resolve = options["resolve"] || function() {
      return true;
    };
    this.construct = options["construct"] || function(data) {
      return data;
    };
    this.instanceOf = options["instanceOf"] || null;
    this.predicate = options["predicate"] || null;
    this.represent = options["represent"] || null;
    this.representName = options["representName"] || null;
    this.defaultStyle = options["defaultStyle"] || null;
    this.multi = options["multi"] || false;
    this.styleAliases = compileStyleAliases(options["styleAliases"] || null);
    if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
      throw new exception('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
    }
  }
  var type = Type$1;
  function compileList(schema2, name2) {
    var result = [];
    schema2[name2].forEach(function(currentType) {
      var newIndex = result.length;
      result.forEach(function(previousType, previousIndex) {
        if (previousType.tag === currentType.tag && previousType.kind === currentType.kind && previousType.multi === currentType.multi) {
          newIndex = previousIndex;
        }
      });
      result[newIndex] = currentType;
    });
    return result;
  }
  function compileMap() {
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
    }, index, length;
    function collectType(type2) {
      if (type2.multi) {
        result.multi[type2.kind].push(type2);
        result.multi["fallback"].push(type2);
      } else {
        result[type2.kind][type2.tag] = result["fallback"][type2.tag] = type2;
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
  Schema$1.prototype.extend = function extend2(definition) {
    var implicit = [];
    var explicit = [];
    if (definition instanceof type) {
      explicit.push(definition);
    } else if (Array.isArray(definition)) {
      explicit = explicit.concat(definition);
    } else if (definition && (Array.isArray(definition.implicit) || Array.isArray(definition.explicit))) {
      if (definition.implicit)
        implicit = implicit.concat(definition.implicit);
      if (definition.explicit)
        explicit = explicit.concat(definition.explicit);
    } else {
      throw new exception("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
    }
    implicit.forEach(function(type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
      if (type$1.loadKind && type$1.loadKind !== "scalar") {
        throw new exception("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
      }
      if (type$1.multi) {
        throw new exception("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
      }
    });
    explicit.forEach(function(type$1) {
      if (!(type$1 instanceof type)) {
        throw new exception("Specified list of YAML types (or a single Type object) contains a non-Type object.");
      }
    });
    var result = Object.create(Schema$1.prototype);
    result.implicit = (this.implicit || []).concat(implicit);
    result.explicit = (this.explicit || []).concat(explicit);
    result.compiledImplicit = compileList(result, "implicit");
    result.compiledExplicit = compileList(result, "explicit");
    result.compiledTypeMap = compileMap(result.compiledImplicit, result.compiledExplicit);
    return result;
  };
  var schema = Schema$1;
  var str = new type("tag:yaml.org,2002:str", {
    kind: "scalar",
    construct: function(data) {
      return data !== null ? data : "";
    }
  });
  var seq = new type("tag:yaml.org,2002:seq", {
    kind: "sequence",
    construct: function(data) {
      return data !== null ? data : [];
    }
  });
  var map = new type("tag:yaml.org,2002:map", {
    kind: "mapping",
    construct: function(data) {
      return data !== null ? data : {};
    }
  });
  var failsafe = new schema({
    explicit: [
      str,
      seq,
      map
    ]
  });
  function resolveYamlNull(data) {
    if (data === null)
      return true;
    var max = data.length;
    return max === 1 && data === "~" || max === 4 && (data === "null" || data === "Null" || data === "NULL");
  }
  function constructYamlNull() {
    return null;
  }
  function isNull(object) {
    return object === null;
  }
  var _null = new type("tag:yaml.org,2002:null", {
    kind: "scalar",
    resolve: resolveYamlNull,
    construct: constructYamlNull,
    predicate: isNull,
    represent: {
      canonical: function() {
        return "~";
      },
      lowercase: function() {
        return "null";
      },
      uppercase: function() {
        return "NULL";
      },
      camelcase: function() {
        return "Null";
      },
      empty: function() {
        return "";
      }
    },
    defaultStyle: "lowercase"
  });
  function resolveYamlBoolean(data) {
    if (data === null)
      return false;
    var max = data.length;
    return max === 4 && (data === "true" || data === "True" || data === "TRUE") || max === 5 && (data === "false" || data === "False" || data === "FALSE");
  }
  function constructYamlBoolean(data) {
    return data === "true" || data === "True" || data === "TRUE";
  }
  function isBoolean(object) {
    return Object.prototype.toString.call(object) === "[object Boolean]";
  }
  var bool = new type("tag:yaml.org,2002:bool", {
    kind: "scalar",
    resolve: resolveYamlBoolean,
    construct: constructYamlBoolean,
    predicate: isBoolean,
    represent: {
      lowercase: function(object) {
        return object ? "true" : "false";
      },
      uppercase: function(object) {
        return object ? "TRUE" : "FALSE";
      },
      camelcase: function(object) {
        return object ? "True" : "False";
      }
    },
    defaultStyle: "lowercase"
  });
  function isHexCode(c) {
    return 48 <= c && c <= 57 || 65 <= c && c <= 70 || 97 <= c && c <= 102;
  }
  function isOctCode(c) {
    return 48 <= c && c <= 55;
  }
  function isDecCode(c) {
    return 48 <= c && c <= 57;
  }
  function resolveYamlInteger(data) {
    if (data === null)
      return false;
    var max = data.length, index = 0, hasDigits = false, ch;
    if (!max)
      return false;
    ch = data[index];
    if (ch === "-" || ch === "+") {
      ch = data[++index];
    }
    if (ch === "0") {
      if (index + 1 === max)
        return true;
      ch = data[++index];
      if (ch === "b") {
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_")
            continue;
          if (ch !== "0" && ch !== "1")
            return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "x") {
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_")
            continue;
          if (!isHexCode(data.charCodeAt(index)))
            return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
      if (ch === "o") {
        index++;
        for (; index < max; index++) {
          ch = data[index];
          if (ch === "_")
            continue;
          if (!isOctCode(data.charCodeAt(index)))
            return false;
          hasDigits = true;
        }
        return hasDigits && ch !== "_";
      }
    }
    if (ch === "_")
      return false;
    for (; index < max; index++) {
      ch = data[index];
      if (ch === "_")
        continue;
      if (!isDecCode(data.charCodeAt(index))) {
        return false;
      }
      hasDigits = true;
    }
    if (!hasDigits || ch === "_")
      return false;
    return true;
  }
  function constructYamlInteger(data) {
    var value = data, sign = 1, ch;
    if (value.indexOf("_") !== -1) {
      value = value.replace(/_/g, "");
    }
    ch = value[0];
    if (ch === "-" || ch === "+") {
      if (ch === "-")
        sign = -1;
      value = value.slice(1);
      ch = value[0];
    }
    if (value === "0")
      return 0;
    if (ch === "0") {
      if (value[1] === "b")
        return sign * parseInt(value.slice(2), 2);
      if (value[1] === "x")
        return sign * parseInt(value.slice(2), 16);
      if (value[1] === "o")
        return sign * parseInt(value.slice(2), 8);
    }
    return sign * parseInt(value, 10);
  }
  function isInteger(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 === 0 && !common.isNegativeZero(object));
  }
  var int = new type("tag:yaml.org,2002:int", {
    kind: "scalar",
    resolve: resolveYamlInteger,
    construct: constructYamlInteger,
    predicate: isInteger,
    represent: {
      binary: function(obj) {
        return obj >= 0 ? "0b" + obj.toString(2) : "-0b" + obj.toString(2).slice(1);
      },
      octal: function(obj) {
        return obj >= 0 ? "0o" + obj.toString(8) : "-0o" + obj.toString(8).slice(1);
      },
      decimal: function(obj) {
        return obj.toString(10);
      },
      /* eslint-disable max-len */
      hexadecimal: function(obj) {
        return obj >= 0 ? "0x" + obj.toString(16).toUpperCase() : "-0x" + obj.toString(16).toUpperCase().slice(1);
      }
    },
    defaultStyle: "decimal",
    styleAliases: {
      binary: [2, "bin"],
      octal: [8, "oct"],
      decimal: [10, "dec"],
      hexadecimal: [16, "hex"]
    }
  });
  var YAML_FLOAT_PATTERN = new RegExp(
    // 2.5e4, 2.5 and integers
    "^(?:[-+]?(?:[0-9][0-9_]*)(?:\\.[0-9_]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9_]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
  );
  function resolveYamlFloat(data) {
    if (data === null)
      return false;
    if (!YAML_FLOAT_PATTERN.test(data) || // Quick hack to not allow integers end with `_`
    // Probably should update regexp & check speed
    data[data.length - 1] === "_") {
      return false;
    }
    return true;
  }
  function constructYamlFloat(data) {
    var value, sign;
    value = data.replace(/_/g, "").toLowerCase();
    sign = value[0] === "-" ? -1 : 1;
    if ("+-".indexOf(value[0]) >= 0) {
      value = value.slice(1);
    }
    if (value === ".inf") {
      return sign === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;
    } else if (value === ".nan") {
      return NaN;
    }
    return sign * parseFloat(value, 10);
  }
  var SCIENTIFIC_WITHOUT_DOT = /^[-+]?[0-9]+e/;
  function representYamlFloat(object, style) {
    var res;
    if (isNaN(object)) {
      switch (style) {
        case "lowercase":
          return ".nan";
        case "uppercase":
          return ".NAN";
        case "camelcase":
          return ".NaN";
      }
    } else if (Number.POSITIVE_INFINITY === object) {
      switch (style) {
        case "lowercase":
          return ".inf";
        case "uppercase":
          return ".INF";
        case "camelcase":
          return ".Inf";
      }
    } else if (Number.NEGATIVE_INFINITY === object) {
      switch (style) {
        case "lowercase":
          return "-.inf";
        case "uppercase":
          return "-.INF";
        case "camelcase":
          return "-.Inf";
      }
    } else if (common.isNegativeZero(object)) {
      return "-0.0";
    }
    res = object.toString(10);
    return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace("e", ".e") : res;
  }
  function isFloat(object) {
    return Object.prototype.toString.call(object) === "[object Number]" && (object % 1 !== 0 || common.isNegativeZero(object));
  }
  var float = new type("tag:yaml.org,2002:float", {
    kind: "scalar",
    resolve: resolveYamlFloat,
    construct: constructYamlFloat,
    predicate: isFloat,
    represent: representYamlFloat,
    defaultStyle: "lowercase"
  });
  var json = failsafe.extend({
    implicit: [
      _null,
      bool,
      int,
      float
    ]
  });
  var core = json;
  var YAML_DATE_REGEXP = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
  );
  var YAML_TIMESTAMP_REGEXP = new RegExp(
    "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
  );
  function resolveYamlTimestamp(data) {
    if (data === null)
      return false;
    if (YAML_DATE_REGEXP.exec(data) !== null)
      return true;
    if (YAML_TIMESTAMP_REGEXP.exec(data) !== null)
      return true;
    return false;
  }
  function constructYamlTimestamp(data) {
    var match, year, month, day, hour, minute, second, fraction = 0, delta = null, tz_hour, tz_minute, date;
    match = YAML_DATE_REGEXP.exec(data);
    if (match === null)
      match = YAML_TIMESTAMP_REGEXP.exec(data);
    if (match === null)
      throw new Error("Date resolve error");
    year = +match[1];
    month = +match[2] - 1;
    day = +match[3];
    if (!match[4]) {
      return new Date(Date.UTC(year, month, day));
    }
    hour = +match[4];
    minute = +match[5];
    second = +match[6];
    if (match[7]) {
      fraction = match[7].slice(0, 3);
      while (fraction.length < 3) {
        fraction += "0";
      }
      fraction = +fraction;
    }
    if (match[9]) {
      tz_hour = +match[10];
      tz_minute = +(match[11] || 0);
      delta = (tz_hour * 60 + tz_minute) * 6e4;
      if (match[9] === "-")
        delta = -delta;
    }
    date = new Date(Date.UTC(year, month, day, hour, minute, second, fraction));
    if (delta)
      date.setTime(date.getTime() - delta);
    return date;
  }
  function representYamlTimestamp(object) {
    return object.toISOString();
  }
  var timestamp = new type("tag:yaml.org,2002:timestamp", {
    kind: "scalar",
    resolve: resolveYamlTimestamp,
    construct: constructYamlTimestamp,
    instanceOf: Date,
    represent: representYamlTimestamp
  });
  function resolveYamlMerge(data) {
    return data === "<<" || data === null;
  }
  var merge = new type("tag:yaml.org,2002:merge", {
    kind: "scalar",
    resolve: resolveYamlMerge
  });
  var BASE64_MAP = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r";
  function resolveYamlBinary(data) {
    if (data === null)
      return false;
    var code, idx, bitlen = 0, max = data.length, map2 = BASE64_MAP;
    for (idx = 0; idx < max; idx++) {
      code = map2.indexOf(data.charAt(idx));
      if (code > 64)
        continue;
      if (code < 0)
        return false;
      bitlen += 6;
    }
    return bitlen % 8 === 0;
  }
  function constructYamlBinary(data) {
    var idx, tailbits, input = data.replace(/[\r\n=]/g, ""), max = input.length, map2 = BASE64_MAP, bits = 0, result = [];
    for (idx = 0; idx < max; idx++) {
      if (idx % 4 === 0 && idx) {
        result.push(bits >> 16 & 255);
        result.push(bits >> 8 & 255);
        result.push(bits & 255);
      }
      bits = bits << 6 | map2.indexOf(input.charAt(idx));
    }
    tailbits = max % 4 * 6;
    if (tailbits === 0) {
      result.push(bits >> 16 & 255);
      result.push(bits >> 8 & 255);
      result.push(bits & 255);
    } else if (tailbits === 18) {
      result.push(bits >> 10 & 255);
      result.push(bits >> 2 & 255);
    } else if (tailbits === 12) {
      result.push(bits >> 4 & 255);
    }
    return new Uint8Array(result);
  }
  function representYamlBinary(object) {
    var result = "", bits = 0, idx, tail, max = object.length, map2 = BASE64_MAP;
    for (idx = 0; idx < max; idx++) {
      if (idx % 3 === 0 && idx) {
        result += map2[bits >> 18 & 63];
        result += map2[bits >> 12 & 63];
        result += map2[bits >> 6 & 63];
        result += map2[bits & 63];
      }
      bits = (bits << 8) + object[idx];
    }
    tail = max % 3;
    if (tail === 0) {
      result += map2[bits >> 18 & 63];
      result += map2[bits >> 12 & 63];
      result += map2[bits >> 6 & 63];
      result += map2[bits & 63];
    } else if (tail === 2) {
      result += map2[bits >> 10 & 63];
      result += map2[bits >> 4 & 63];
      result += map2[bits << 2 & 63];
      result += map2[64];
    } else if (tail === 1) {
      result += map2[bits >> 2 & 63];
      result += map2[bits << 4 & 63];
      result += map2[64];
      result += map2[64];
    }
    return result;
  }
  function isBinary(obj) {
    return Object.prototype.toString.call(obj) === "[object Uint8Array]";
  }
  var binary = new type("tag:yaml.org,2002:binary", {
    kind: "scalar",
    resolve: resolveYamlBinary,
    construct: constructYamlBinary,
    predicate: isBinary,
    represent: representYamlBinary
  });
  var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
  var _toString$2 = Object.prototype.toString;
  function resolveYamlOmap(data) {
    if (data === null)
      return true;
    var objectKeys = [], index, length, pair, pairKey, pairHasKey, object = data;
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      pairHasKey = false;
      if (_toString$2.call(pair) !== "[object Object]")
        return false;
      for (pairKey in pair) {
        if (_hasOwnProperty$3.call(pair, pairKey)) {
          if (!pairHasKey)
            pairHasKey = true;
          else
            return false;
        }
      }
      if (!pairHasKey)
        return false;
      if (objectKeys.indexOf(pairKey) === -1)
        objectKeys.push(pairKey);
      else
        return false;
    }
    return true;
  }
  function constructYamlOmap(data) {
    return data !== null ? data : [];
  }
  var omap = new type("tag:yaml.org,2002:omap", {
    kind: "sequence",
    resolve: resolveYamlOmap,
    construct: constructYamlOmap
  });
  var _toString$1 = Object.prototype.toString;
  function resolveYamlPairs(data) {
    if (data === null)
      return true;
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      if (_toString$1.call(pair) !== "[object Object]")
        return false;
      keys = Object.keys(pair);
      if (keys.length !== 1)
        return false;
      result[index] = [keys[0], pair[keys[0]]];
    }
    return true;
  }
  function constructYamlPairs(data) {
    if (data === null)
      return [];
    var index, length, pair, keys, result, object = data;
    result = new Array(object.length);
    for (index = 0, length = object.length; index < length; index += 1) {
      pair = object[index];
      keys = Object.keys(pair);
      result[index] = [keys[0], pair[keys[0]]];
    }
    return result;
  }
  var pairs = new type("tag:yaml.org,2002:pairs", {
    kind: "sequence",
    resolve: resolveYamlPairs,
    construct: constructYamlPairs
  });
  var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;
  function resolveYamlSet(data) {
    if (data === null)
      return true;
    var key, object = data;
    for (key in object) {
      if (_hasOwnProperty$2.call(object, key)) {
        if (object[key] !== null)
          return false;
      }
    }
    return true;
  }
  function constructYamlSet(data) {
    return data !== null ? data : {};
  }
  var set = new type("tag:yaml.org,2002:set", {
    kind: "mapping",
    resolve: resolveYamlSet,
    construct: constructYamlSet
  });
  var _default = core.extend({
    implicit: [
      timestamp,
      merge
    ],
    explicit: [
      binary,
      omap,
      pairs,
      set
    ]
  });
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
    return c === 10 || c === 13;
  }
  function is_WHITE_SPACE(c) {
    return c === 9 || c === 32;
  }
  function is_WS_OR_EOL(c) {
    return c === 9 || c === 32 || c === 10 || c === 13;
  }
  function is_FLOW_INDICATOR(c) {
    return c === 44 || c === 91 || c === 93 || c === 123 || c === 125;
  }
  function fromHexCode(c) {
    var lc;
    if (48 <= c && c <= 57) {
      return c - 48;
    }
    lc = c | 32;
    if (97 <= lc && lc <= 102) {
      return lc - 97 + 10;
    }
    return -1;
  }
  function escapedHexLen(c) {
    if (c === 120) {
      return 2;
    }
    if (c === 117) {
      return 4;
    }
    if (c === 85) {
      return 8;
    }
    return 0;
  }
  function fromDecimalCode(c) {
    if (48 <= c && c <= 57) {
      return c - 48;
    }
    return -1;
  }
  function simpleEscapeSequence(c) {
    return c === 48 ? "\0" : c === 97 ? "\x07" : c === 98 ? "\b" : c === 116 ? "	" : c === 9 ? "	" : c === 110 ? "\n" : c === 118 ? "\v" : c === 102 ? "\f" : c === 114 ? "\r" : c === 101 ? "\x1B" : c === 32 ? " " : c === 34 ? '"' : c === 47 ? "/" : c === 92 ? "\\" : c === 78 ? "\x85" : c === 95 ? "\xA0" : c === 76 ? "\u2028" : c === 80 ? "\u2029" : "";
  }
  function charFromCodepoint(c) {
    if (c <= 65535) {
      return String.fromCharCode(c);
    }
    return String.fromCharCode(
      (c - 65536 >> 10) + 55296,
      (c - 65536 & 1023) + 56320
    );
  }
  var simpleEscapeCheck = new Array(256);
  var simpleEscapeMap = new Array(256);
  for (i = 0; i < 256; i++) {
    simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
    simpleEscapeMap[i] = simpleEscapeSequence(i);
  }
  var i;
  function State$1(input, options) {
    this.input = input;
    this.filename = options["filename"] || null;
    this.schema = options["schema"] || _default;
    this.onWarning = options["onWarning"] || null;
    this.legacy = options["legacy"] || false;
    this.json = options["json"] || false;
    this.listener = options["listener"] || null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.typeMap = this.schema.compiledTypeMap;
    this.length = input.length;
    this.position = 0;
    this.line = 0;
    this.lineStart = 0;
    this.lineIndent = 0;
    this.firstTabInLine = -1;
    this.documents = [];
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
    YAML: function handleYamlDirective(state, name2, args) {
      var match, major, minor;
      if (state.version !== null) {
        throwError(state, "duplication of %YAML directive");
      }
      if (args.length !== 1) {
        throwError(state, "YAML directive accepts exactly one argument");
      }
      match = /^([0-9]+)\.([0-9]+)$/.exec(args[0]);
      if (match === null) {
        throwError(state, "ill-formed argument of the YAML directive");
      }
      major = parseInt(match[1], 10);
      minor = parseInt(match[2], 10);
      if (major !== 1) {
        throwError(state, "unacceptable YAML version of the document");
      }
      state.version = args[0];
      state.checkLineBreaks = minor < 2;
      if (minor !== 1 && minor !== 2) {
        throwWarning(state, "unsupported YAML version of the document");
      }
    },
    TAG: function handleTagDirective(state, name2, args) {
      var handle, prefix;
      if (args.length !== 2) {
        throwError(state, "TAG directive accepts exactly two arguments");
      }
      handle = args[0];
      prefix = args[1];
      if (!PATTERN_TAG_HANDLE.test(handle)) {
        throwError(state, "ill-formed tag handle (first argument) of the TAG directive");
      }
      if (_hasOwnProperty$1.call(state.tagMap, handle)) {
        throwError(state, 'there is a previously declared suffix for "' + handle + '" tag handle');
      }
      if (!PATTERN_TAG_URI.test(prefix)) {
        throwError(state, "ill-formed tag prefix (second argument) of the TAG directive");
      }
      try {
        prefix = decodeURIComponent(prefix);
      } catch (err) {
        throwError(state, "tag prefix is malformed: " + prefix);
      }
      state.tagMap[handle] = prefix;
    }
  };
  function captureSegment(state, start2, end, checkJson) {
    var _position, _length, _character, _result;
    if (start2 < end) {
      _result = state.input.slice(start2, end);
      if (checkJson) {
        for (_position = 0, _length = _result.length; _position < _length; _position += 1) {
          _character = _result.charCodeAt(_position);
          if (!(_character === 9 || 32 <= _character && _character <= 1114111)) {
            throwError(state, "expected valid JSON character");
          }
        }
      } else if (PATTERN_NON_PRINTABLE.test(_result)) {
        throwError(state, "the stream contains non-printable characters");
      }
      state.result += _result;
    }
  }
  function mergeMappings(state, destination, source, overridableKeys) {
    var sourceKeys, key, index, quantity;
    if (!common.isObject(source)) {
      throwError(state, "cannot merge mappings; the provided source object is unacceptable");
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
    if (Array.isArray(keyNode)) {
      keyNode = Array.prototype.slice.call(keyNode);
      for (index = 0, quantity = keyNode.length; index < quantity; index += 1) {
        if (Array.isArray(keyNode[index])) {
          throwError(state, "nested arrays are not supported inside keys");
        }
        if (typeof keyNode === "object" && _class(keyNode[index]) === "[object Object]") {
          keyNode[index] = "[object Object]";
        }
      }
    }
    if (typeof keyNode === "object" && _class(keyNode) === "[object Object]") {
      keyNode = "[object Object]";
    }
    keyNode = String(keyNode);
    if (_result === null) {
      _result = {};
    }
    if (keyTag === "tag:yaml.org,2002:merge") {
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
        throwError(state, "duplicated mapping key");
      }
      if (keyNode === "__proto__") {
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
    if (ch === 10) {
      state.position++;
    } else if (ch === 13) {
      state.position++;
      if (state.input.charCodeAt(state.position) === 10) {
        state.position++;
      }
    } else {
      throwError(state, "a line break is expected");
    }
    state.line += 1;
    state.lineStart = state.position;
    state.firstTabInLine = -1;
  }
  function skipSeparationSpace(state, allowComments, checkIndent) {
    var lineBreaks = 0, ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      while (is_WHITE_SPACE(ch)) {
        if (ch === 9 && state.firstTabInLine === -1) {
          state.firstTabInLine = state.position;
        }
        ch = state.input.charCodeAt(++state.position);
      }
      if (allowComments && ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (ch !== 10 && ch !== 13 && ch !== 0);
      }
      if (is_EOL(ch)) {
        readLineBreak(state);
        ch = state.input.charCodeAt(state.position);
        lineBreaks++;
        state.lineIndent = 0;
        while (ch === 32) {
          state.lineIndent++;
          ch = state.input.charCodeAt(++state.position);
        }
      } else {
        break;
      }
    }
    if (checkIndent !== -1 && lineBreaks !== 0 && state.lineIndent < checkIndent) {
      throwWarning(state, "deficient indentation");
    }
    return lineBreaks;
  }
  function testDocumentSeparator(state) {
    var _position = state.position, ch;
    ch = state.input.charCodeAt(_position);
    if ((ch === 45 || ch === 46) && ch === state.input.charCodeAt(_position + 1) && ch === state.input.charCodeAt(_position + 2)) {
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
      state.result += " ";
    } else if (count > 1) {
      state.result += common.repeat("\n", count - 1);
    }
  }
  function readPlainScalar(state, nodeIndent, withinFlowCollection) {
    var preceding, following, captureStart, captureEnd, hasPendingContent, _line, _lineStart, _lineIndent, _kind = state.kind, _result = state.result, ch;
    ch = state.input.charCodeAt(state.position);
    if (is_WS_OR_EOL(ch) || is_FLOW_INDICATOR(ch) || ch === 35 || ch === 38 || ch === 42 || ch === 33 || ch === 124 || ch === 62 || ch === 39 || ch === 34 || ch === 37 || ch === 64 || ch === 96) {
      return false;
    }
    if (ch === 63 || ch === 45) {
      following = state.input.charCodeAt(state.position + 1);
      if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
        return false;
      }
    }
    state.kind = "scalar";
    state.result = "";
    captureStart = captureEnd = state.position;
    hasPendingContent = false;
    while (ch !== 0) {
      if (ch === 58) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following) || withinFlowCollection && is_FLOW_INDICATOR(following)) {
          break;
        }
      } else if (ch === 35) {
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
    if (ch !== 39) {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 39) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        if (ch === 39) {
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
        throwError(state, "unexpected end of the document within a single quoted scalar");
      } else {
        state.position++;
        captureEnd = state.position;
      }
    }
    throwError(state, "unexpected end of the stream within a single quoted scalar");
  }
  function readDoubleQuotedScalar(state, nodeIndent) {
    var captureStart, captureEnd, hexLength, hexResult, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 34) {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    state.position++;
    captureStart = captureEnd = state.position;
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      if (ch === 34) {
        captureSegment(state, captureStart, state.position, true);
        state.position++;
        return true;
      } else if (ch === 92) {
        captureSegment(state, captureStart, state.position, true);
        ch = state.input.charCodeAt(++state.position);
        if (is_EOL(ch)) {
          skipSeparationSpace(state, false, nodeIndent);
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
              throwError(state, "expected hexadecimal character");
            }
          }
          state.result += charFromCodepoint(hexResult);
          state.position++;
        } else {
          throwError(state, "unknown escape sequence");
        }
        captureStart = captureEnd = state.position;
      } else if (is_EOL(ch)) {
        captureSegment(state, captureStart, captureEnd, true);
        writeFoldedLines(state, skipSeparationSpace(state, false, nodeIndent));
        captureStart = captureEnd = state.position;
      } else if (state.position === state.lineStart && testDocumentSeparator(state)) {
        throwError(state, "unexpected end of the document within a double quoted scalar");
      } else {
        state.position++;
        captureEnd = state.position;
      }
    }
    throwError(state, "unexpected end of the stream within a double quoted scalar");
  }
  function readFlowCollection(state, nodeIndent) {
    var readNext = true, _line, _lineStart, _pos, _tag = state.tag, _result, _anchor = state.anchor, following, terminator, isPair, isExplicitPair, isMapping, overridableKeys = /* @__PURE__ */ Object.create(null), keyNode, keyTag, valueNode, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 91) {
      terminator = 93;
      isMapping = false;
      _result = [];
    } else if (ch === 123) {
      terminator = 125;
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
        state.kind = isMapping ? "mapping" : "sequence";
        state.result = _result;
        return true;
      } else if (!readNext) {
        throwError(state, "missed comma between flow collection entries");
      } else if (ch === 44) {
        throwError(state, "expected the node content, but found ','");
      }
      keyTag = keyNode = valueNode = null;
      isPair = isExplicitPair = false;
      if (ch === 63) {
        following = state.input.charCodeAt(state.position + 1);
        if (is_WS_OR_EOL(following)) {
          isPair = isExplicitPair = true;
          state.position++;
          skipSeparationSpace(state, true, nodeIndent);
        }
      }
      _line = state.line;
      _lineStart = state.lineStart;
      _pos = state.position;
      composeNode(state, nodeIndent, CONTEXT_FLOW_IN, false, true);
      keyTag = state.tag;
      keyNode = state.result;
      skipSeparationSpace(state, true, nodeIndent);
      ch = state.input.charCodeAt(state.position);
      if ((isExplicitPair || state.line === _line) && ch === 58) {
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
      if (ch === 44) {
        readNext = true;
        ch = state.input.charCodeAt(++state.position);
      } else {
        readNext = false;
      }
    }
    throwError(state, "unexpected end of the stream within a flow collection");
  }
  function readBlockScalar(state, nodeIndent) {
    var captureStart, folding, chomping = CHOMPING_CLIP, didReadContent = false, detectedIndent = false, textIndent = nodeIndent, emptyLines = 0, atMoreIndented = false, tmp, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch === 124) {
      folding = false;
    } else if (ch === 62) {
      folding = true;
    } else {
      return false;
    }
    state.kind = "scalar";
    state.result = "";
    while (ch !== 0) {
      ch = state.input.charCodeAt(++state.position);
      if (ch === 43 || ch === 45) {
        if (CHOMPING_CLIP === chomping) {
          chomping = ch === 43 ? CHOMPING_KEEP : CHOMPING_STRIP;
        } else {
          throwError(state, "repeat of a chomping mode identifier");
        }
      } else if ((tmp = fromDecimalCode(ch)) >= 0) {
        if (tmp === 0) {
          throwError(state, "bad explicit indentation width of a block scalar; it cannot be less than one");
        } else if (!detectedIndent) {
          textIndent = nodeIndent + tmp - 1;
          detectedIndent = true;
        } else {
          throwError(state, "repeat of an indentation width identifier");
        }
      } else {
        break;
      }
    }
    if (is_WHITE_SPACE(ch)) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (is_WHITE_SPACE(ch));
      if (ch === 35) {
        do {
          ch = state.input.charCodeAt(++state.position);
        } while (!is_EOL(ch) && ch !== 0);
      }
    }
    while (ch !== 0) {
      readLineBreak(state);
      state.lineIndent = 0;
      ch = state.input.charCodeAt(state.position);
      while ((!detectedIndent || state.lineIndent < textIndent) && ch === 32) {
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
      if (state.lineIndent < textIndent) {
        if (chomping === CHOMPING_KEEP) {
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        } else if (chomping === CHOMPING_CLIP) {
          if (didReadContent) {
            state.result += "\n";
          }
        }
        break;
      }
      if (folding) {
        if (is_WHITE_SPACE(ch)) {
          atMoreIndented = true;
          state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
        } else if (atMoreIndented) {
          atMoreIndented = false;
          state.result += common.repeat("\n", emptyLines + 1);
        } else if (emptyLines === 0) {
          if (didReadContent) {
            state.result += " ";
          }
        } else {
          state.result += common.repeat("\n", emptyLines);
        }
      } else {
        state.result += common.repeat("\n", didReadContent ? 1 + emptyLines : emptyLines);
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
    var _line, _tag = state.tag, _anchor = state.anchor, _result = [], following, detected = false, ch;
    if (state.firstTabInLine !== -1)
      return false;
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      if (state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, "tab characters must not be used in indentation");
      }
      if (ch !== 45) {
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
        throwError(state, "bad indentation of a sequence entry");
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = "sequence";
      state.result = _result;
      return true;
    }
    return false;
  }
  function readBlockMapping(state, nodeIndent, flowIndent) {
    var following, allowCompact, _line, _keyLine, _keyLineStart, _keyPos, _tag = state.tag, _anchor = state.anchor, _result = {}, overridableKeys = /* @__PURE__ */ Object.create(null), keyTag = null, keyNode = null, valueNode = null, atExplicitKey = false, detected = false, ch;
    if (state.firstTabInLine !== -1)
      return false;
    if (state.anchor !== null) {
      state.anchorMap[state.anchor] = _result;
    }
    ch = state.input.charCodeAt(state.position);
    while (ch !== 0) {
      if (!atExplicitKey && state.firstTabInLine !== -1) {
        state.position = state.firstTabInLine;
        throwError(state, "tab characters must not be used in indentation");
      }
      following = state.input.charCodeAt(state.position + 1);
      _line = state.line;
      if ((ch === 63 || ch === 58) && is_WS_OR_EOL(following)) {
        if (ch === 63) {
          if (atExplicitKey) {
            storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
            keyTag = keyNode = valueNode = null;
          }
          detected = true;
          atExplicitKey = true;
          allowCompact = true;
        } else if (atExplicitKey) {
          atExplicitKey = false;
          allowCompact = true;
        } else {
          throwError(state, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line");
        }
        state.position += 1;
        ch = following;
      } else {
        _keyLine = state.line;
        _keyLineStart = state.lineStart;
        _keyPos = state.position;
        if (!composeNode(state, flowIndent, CONTEXT_FLOW_OUT, false, true)) {
          break;
        }
        if (state.line === _line) {
          ch = state.input.charCodeAt(state.position);
          while (is_WHITE_SPACE(ch)) {
            ch = state.input.charCodeAt(++state.position);
          }
          if (ch === 58) {
            ch = state.input.charCodeAt(++state.position);
            if (!is_WS_OR_EOL(ch)) {
              throwError(state, "a whitespace character is expected after the key-value separator within a block mapping");
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
            throwError(state, "can not read an implicit mapping pair; a colon is missed");
          } else {
            state.tag = _tag;
            state.anchor = _anchor;
            return true;
          }
        } else if (detected) {
          throwError(state, "can not read a block mapping entry; a multiline key may not be an implicit key");
        } else {
          state.tag = _tag;
          state.anchor = _anchor;
          return true;
        }
      }
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
        throwError(state, "bad indentation of a mapping entry");
      } else if (state.lineIndent < nodeIndent) {
        break;
      }
    }
    if (atExplicitKey) {
      storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, null, _keyLine, _keyLineStart, _keyPos);
    }
    if (detected) {
      state.tag = _tag;
      state.anchor = _anchor;
      state.kind = "mapping";
      state.result = _result;
    }
    return detected;
  }
  function readTagProperty(state) {
    var _position, isVerbatim = false, isNamed = false, tagHandle, tagName, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 33)
      return false;
    if (state.tag !== null) {
      throwError(state, "duplication of a tag property");
    }
    ch = state.input.charCodeAt(++state.position);
    if (ch === 60) {
      isVerbatim = true;
      ch = state.input.charCodeAt(++state.position);
    } else if (ch === 33) {
      isNamed = true;
      tagHandle = "!!";
      ch = state.input.charCodeAt(++state.position);
    } else {
      tagHandle = "!";
    }
    _position = state.position;
    if (isVerbatim) {
      do {
        ch = state.input.charCodeAt(++state.position);
      } while (ch !== 0 && ch !== 62);
      if (state.position < state.length) {
        tagName = state.input.slice(_position, state.position);
        ch = state.input.charCodeAt(++state.position);
      } else {
        throwError(state, "unexpected end of the stream within a verbatim tag");
      }
    } else {
      while (ch !== 0 && !is_WS_OR_EOL(ch)) {
        if (ch === 33) {
          if (!isNamed) {
            tagHandle = state.input.slice(_position - 1, state.position + 1);
            if (!PATTERN_TAG_HANDLE.test(tagHandle)) {
              throwError(state, "named tag handle cannot contain such characters");
            }
            isNamed = true;
            _position = state.position + 1;
          } else {
            throwError(state, "tag suffix cannot contain exclamation marks");
          }
        }
        ch = state.input.charCodeAt(++state.position);
      }
      tagName = state.input.slice(_position, state.position);
      if (PATTERN_FLOW_INDICATORS.test(tagName)) {
        throwError(state, "tag suffix cannot contain flow indicator characters");
      }
    }
    if (tagName && !PATTERN_TAG_URI.test(tagName)) {
      throwError(state, "tag name cannot contain such characters: " + tagName);
    }
    try {
      tagName = decodeURIComponent(tagName);
    } catch (err) {
      throwError(state, "tag name is malformed: " + tagName);
    }
    if (isVerbatim) {
      state.tag = tagName;
    } else if (_hasOwnProperty$1.call(state.tagMap, tagHandle)) {
      state.tag = state.tagMap[tagHandle] + tagName;
    } else if (tagHandle === "!") {
      state.tag = "!" + tagName;
    } else if (tagHandle === "!!") {
      state.tag = "tag:yaml.org,2002:" + tagName;
    } else {
      throwError(state, 'undeclared tag handle "' + tagHandle + '"');
    }
    return true;
  }
  function readAnchorProperty(state) {
    var _position, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 38)
      return false;
    if (state.anchor !== null) {
      throwError(state, "duplication of an anchor property");
    }
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
      throwError(state, "name of an anchor node must contain at least one character");
    }
    state.anchor = state.input.slice(_position, state.position);
    return true;
  }
  function readAlias(state) {
    var _position, alias, ch;
    ch = state.input.charCodeAt(state.position);
    if (ch !== 42)
      return false;
    ch = state.input.charCodeAt(++state.position);
    _position = state.position;
    while (ch !== 0 && !is_WS_OR_EOL(ch) && !is_FLOW_INDICATOR(ch)) {
      ch = state.input.charCodeAt(++state.position);
    }
    if (state.position === _position) {
      throwError(state, "name of an alias node must contain at least one character");
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
    var allowBlockStyles, allowBlockScalars, allowBlockCollections, indentStatus = 1, atNewLine = false, hasContent = false, typeIndex, typeQuantity, typeList, type2, flowIndent, blockIndent;
    if (state.listener !== null) {
      state.listener("open", state);
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
              throwError(state, "alias node should not have any properties");
            }
          } else if (readPlainScalar(state, flowIndent, CONTEXT_FLOW_IN === nodeContext)) {
            hasContent = true;
            if (state.tag === null) {
              state.tag = "?";
            }
          }
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
        }
      } else if (indentStatus === 0) {
        hasContent = allowBlockCollections && readBlockSequence(state, blockIndent);
      }
    }
    if (state.tag === null) {
      if (state.anchor !== null) {
        state.anchorMap[state.anchor] = state.result;
      }
    } else if (state.tag === "?") {
      if (state.result !== null && state.kind !== "scalar") {
        throwError(state, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + state.kind + '"');
      }
      for (typeIndex = 0, typeQuantity = state.implicitTypes.length; typeIndex < typeQuantity; typeIndex += 1) {
        type2 = state.implicitTypes[typeIndex];
        if (type2.resolve(state.result)) {
          state.result = type2.construct(state.result);
          state.tag = type2.tag;
          if (state.anchor !== null) {
            state.anchorMap[state.anchor] = state.result;
          }
          break;
        }
      }
    } else if (state.tag !== "!") {
      if (_hasOwnProperty$1.call(state.typeMap[state.kind || "fallback"], state.tag)) {
        type2 = state.typeMap[state.kind || "fallback"][state.tag];
      } else {
        type2 = null;
        typeList = state.typeMap.multi[state.kind || "fallback"];
        for (typeIndex = 0, typeQuantity = typeList.length; typeIndex < typeQuantity; typeIndex += 1) {
          if (state.tag.slice(0, typeList[typeIndex].tag.length) === typeList[typeIndex].tag) {
            type2 = typeList[typeIndex];
            break;
          }
        }
      }
      if (!type2) {
        throwError(state, "unknown tag !<" + state.tag + ">");
      }
      if (state.result !== null && type2.kind !== state.kind) {
        throwError(state, "unacceptable node kind for !<" + state.tag + '> tag; it should be "' + type2.kind + '", not "' + state.kind + '"');
      }
      if (!type2.resolve(state.result, state.tag)) {
        throwError(state, "cannot resolve a node with !<" + state.tag + "> explicit tag");
      } else {
        state.result = type2.construct(state.result, state.tag);
        if (state.anchor !== null) {
          state.anchorMap[state.anchor] = state.result;
        }
      }
    }
    if (state.listener !== null) {
      state.listener("close", state);
    }
    return state.tag !== null || state.anchor !== null || hasContent;
  }
  function readDocument(state) {
    var documentStart = state.position, _position, directiveName, directiveArgs, hasDirectives = false, ch;
    state.version = null;
    state.checkLineBreaks = state.legacy;
    state.tagMap = /* @__PURE__ */ Object.create(null);
    state.anchorMap = /* @__PURE__ */ Object.create(null);
    while ((ch = state.input.charCodeAt(state.position)) !== 0) {
      skipSeparationSpace(state, true, -1);
      ch = state.input.charCodeAt(state.position);
      if (state.lineIndent > 0 || ch !== 37) {
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
        throwError(state, "directive name must not be less than one character in length");
      }
      while (ch !== 0) {
        while (is_WHITE_SPACE(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        if (ch === 35) {
          do {
            ch = state.input.charCodeAt(++state.position);
          } while (ch !== 0 && !is_EOL(ch));
          break;
        }
        if (is_EOL(ch))
          break;
        _position = state.position;
        while (ch !== 0 && !is_WS_OR_EOL(ch)) {
          ch = state.input.charCodeAt(++state.position);
        }
        directiveArgs.push(state.input.slice(_position, state.position));
      }
      if (ch !== 0)
        readLineBreak(state);
      if (_hasOwnProperty$1.call(directiveHandlers, directiveName)) {
        directiveHandlers[directiveName](state, directiveName, directiveArgs);
      } else {
        throwWarning(state, 'unknown document directive "' + directiveName + '"');
      }
    }
    skipSeparationSpace(state, true, -1);
    if (state.lineIndent === 0 && state.input.charCodeAt(state.position) === 45 && state.input.charCodeAt(state.position + 1) === 45 && state.input.charCodeAt(state.position + 2) === 45) {
      state.position += 3;
      skipSeparationSpace(state, true, -1);
    } else if (hasDirectives) {
      throwError(state, "directives end mark is expected");
    }
    composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
    skipSeparationSpace(state, true, -1);
    if (state.checkLineBreaks && PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
      throwWarning(state, "non-ASCII line breaks are interpreted as content");
    }
    state.documents.push(state.result);
    if (state.position === state.lineStart && testDocumentSeparator(state)) {
      if (state.input.charCodeAt(state.position) === 46) {
        state.position += 3;
        skipSeparationSpace(state, true, -1);
      }
      return;
    }
    if (state.position < state.length - 1) {
      throwError(state, "end of the stream or a document separator is expected");
    } else {
      return;
    }
  }
  function loadDocuments(input, options) {
    input = String(input);
    options = options || {};
    if (input.length !== 0) {
      if (input.charCodeAt(input.length - 1) !== 10 && input.charCodeAt(input.length - 1) !== 13) {
        input += "\n";
      }
      if (input.charCodeAt(0) === 65279) {
        input = input.slice(1);
      }
    }
    var state = new State$1(input, options);
    var nullpos = input.indexOf("\0");
    if (nullpos !== -1) {
      state.position = nullpos;
      throwError(state, "null byte is not allowed in input");
    }
    state.input += "\0";
    while (state.input.charCodeAt(state.position) === 32) {
      state.lineIndent += 1;
      state.position += 1;
    }
    while (state.position < state.length - 1) {
      readDocument(state);
    }
    return state.documents;
  }
  function loadAll$1(input, iterator, options) {
    if (iterator !== null && typeof iterator === "object" && typeof options === "undefined") {
      options = iterator;
      iterator = null;
    }
    var documents = loadDocuments(input, options);
    if (typeof iterator !== "function") {
      return documents;
    }
    for (var index = 0, length = documents.length; index < length; index += 1) {
      iterator(documents[index]);
    }
  }
  function load$1(input, options) {
    var documents = loadDocuments(input, options);
    if (documents.length === 0) {
      return void 0;
    } else if (documents.length === 1) {
      return documents[0];
    }
    throw new exception("expected a single document in the stream, but found more");
  }
  var loadAll_1 = loadAll$1;
  var load_1 = load$1;
  var loader = {
    loadAll: loadAll_1,
    load: load_1
  };
  var _toString = Object.prototype.toString;
  var _hasOwnProperty = Object.prototype.hasOwnProperty;
  var CHAR_BOM = 65279;
  var CHAR_TAB = 9;
  var CHAR_LINE_FEED = 10;
  var CHAR_CARRIAGE_RETURN = 13;
  var CHAR_SPACE = 32;
  var CHAR_EXCLAMATION = 33;
  var CHAR_DOUBLE_QUOTE = 34;
  var CHAR_SHARP = 35;
  var CHAR_PERCENT = 37;
  var CHAR_AMPERSAND = 38;
  var CHAR_SINGLE_QUOTE = 39;
  var CHAR_ASTERISK = 42;
  var CHAR_COMMA = 44;
  var CHAR_MINUS = 45;
  var CHAR_COLON = 58;
  var CHAR_EQUALS = 61;
  var CHAR_GREATER_THAN = 62;
  var CHAR_QUESTION = 63;
  var CHAR_COMMERCIAL_AT = 64;
  var CHAR_LEFT_SQUARE_BRACKET = 91;
  var CHAR_RIGHT_SQUARE_BRACKET = 93;
  var CHAR_GRAVE_ACCENT = 96;
  var CHAR_LEFT_CURLY_BRACKET = 123;
  var CHAR_VERTICAL_LINE = 124;
  var CHAR_RIGHT_CURLY_BRACKET = 125;
  var ESCAPE_SEQUENCES = {};
  ESCAPE_SEQUENCES[0] = "\\0";
  ESCAPE_SEQUENCES[7] = "\\a";
  ESCAPE_SEQUENCES[8] = "\\b";
  ESCAPE_SEQUENCES[9] = "\\t";
  ESCAPE_SEQUENCES[10] = "\\n";
  ESCAPE_SEQUENCES[11] = "\\v";
  ESCAPE_SEQUENCES[12] = "\\f";
  ESCAPE_SEQUENCES[13] = "\\r";
  ESCAPE_SEQUENCES[27] = "\\e";
  ESCAPE_SEQUENCES[34] = '\\"';
  ESCAPE_SEQUENCES[92] = "\\\\";
  ESCAPE_SEQUENCES[133] = "\\N";
  ESCAPE_SEQUENCES[160] = "\\_";
  ESCAPE_SEQUENCES[8232] = "\\L";
  ESCAPE_SEQUENCES[8233] = "\\P";
  var DEPRECATED_BOOLEANS_SYNTAX = [
    "y",
    "Y",
    "yes",
    "Yes",
    "YES",
    "on",
    "On",
    "ON",
    "n",
    "N",
    "no",
    "No",
    "NO",
    "off",
    "Off",
    "OFF"
  ];
  var DEPRECATED_BASE60_SYNTAX = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
  function compileStyleMap(schema2, map2) {
    var result, keys, index, length, tag, style, type2;
    if (map2 === null)
      return {};
    result = {};
    keys = Object.keys(map2);
    for (index = 0, length = keys.length; index < length; index += 1) {
      tag = keys[index];
      style = String(map2[tag]);
      if (tag.slice(0, 2) === "!!") {
        tag = "tag:yaml.org,2002:" + tag.slice(2);
      }
      type2 = schema2.compiledTypeMap["fallback"][tag];
      if (type2 && _hasOwnProperty.call(type2.styleAliases, style)) {
        style = type2.styleAliases[style];
      }
      result[tag] = style;
    }
    return result;
  }
  function encodeHex(character) {
    var string, handle, length;
    string = character.toString(16).toUpperCase();
    if (character <= 255) {
      handle = "x";
      length = 2;
    } else if (character <= 65535) {
      handle = "u";
      length = 4;
    } else if (character <= 4294967295) {
      handle = "U";
      length = 8;
    } else {
      throw new exception("code point within a string may not be greater than 0xFFFFFFFF");
    }
    return "\\" + handle + common.repeat("0", length - string.length) + string;
  }
  var QUOTING_TYPE_SINGLE = 1;
  var QUOTING_TYPE_DOUBLE = 2;
  function State(options) {
    this.schema = options["schema"] || _default;
    this.indent = Math.max(1, options["indent"] || 2);
    this.noArrayIndent = options["noArrayIndent"] || false;
    this.skipInvalid = options["skipInvalid"] || false;
    this.flowLevel = common.isNothing(options["flowLevel"]) ? -1 : options["flowLevel"];
    this.styleMap = compileStyleMap(this.schema, options["styles"] || null);
    this.sortKeys = options["sortKeys"] || false;
    this.lineWidth = options["lineWidth"] || 80;
    this.noRefs = options["noRefs"] || false;
    this.noCompatMode = options["noCompatMode"] || false;
    this.condenseFlow = options["condenseFlow"] || false;
    this.quotingType = options["quotingType"] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
    this.forceQuotes = options["forceQuotes"] || false;
    this.replacer = typeof options["replacer"] === "function" ? options["replacer"] : null;
    this.implicitTypes = this.schema.compiledImplicit;
    this.explicitTypes = this.schema.compiledExplicit;
    this.tag = null;
    this.result = "";
    this.duplicates = [];
    this.usedDuplicates = null;
  }
  function indentString(string, spaces) {
    var ind = common.repeat(" ", spaces), position = 0, next = -1, result = "", line, length = string.length;
    while (position < length) {
      next = string.indexOf("\n", position);
      if (next === -1) {
        line = string.slice(position);
        position = length;
      } else {
        line = string.slice(position, next + 1);
        position = next + 1;
      }
      if (line.length && line !== "\n")
        result += ind;
      result += line;
    }
    return result;
  }
  function generateNextLine(state, level) {
    return "\n" + common.repeat(" ", state.indent * level);
  }
  function testImplicitResolving(state, str2) {
    var index, length, type2;
    for (index = 0, length = state.implicitTypes.length; index < length; index += 1) {
      type2 = state.implicitTypes[index];
      if (type2.resolve(str2)) {
        return true;
      }
    }
    return false;
  }
  function isWhitespace(c) {
    return c === CHAR_SPACE || c === CHAR_TAB;
  }
  function isPrintable(c) {
    return 32 <= c && c <= 126 || 161 <= c && c <= 55295 && c !== 8232 && c !== 8233 || 57344 <= c && c <= 65533 && c !== CHAR_BOM || 65536 <= c && c <= 1114111;
  }
  function isNsCharOrWhitespace(c) {
    return isPrintable(c) && c !== CHAR_BOM && c !== CHAR_CARRIAGE_RETURN && c !== CHAR_LINE_FEED;
  }
  function isPlainSafe(c, prev, inblock) {
    var cIsNsCharOrWhitespace = isNsCharOrWhitespace(c);
    var cIsNsChar = cIsNsCharOrWhitespace && !isWhitespace(c);
    return (
      // ns-plain-safe
      (inblock ? (
        // c = flow-in
        cIsNsCharOrWhitespace
      ) : cIsNsCharOrWhitespace && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET) && c !== CHAR_SHARP && !(prev === CHAR_COLON && !cIsNsChar) || isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP || prev === CHAR_COLON && cIsNsChar
    );
  }
  function isPlainSafeFirst(c) {
    return isPrintable(c) && c !== CHAR_BOM && !isWhitespace(c) && c !== CHAR_MINUS && c !== CHAR_QUESTION && c !== CHAR_COLON && c !== CHAR_COMMA && c !== CHAR_LEFT_SQUARE_BRACKET && c !== CHAR_RIGHT_SQUARE_BRACKET && c !== CHAR_LEFT_CURLY_BRACKET && c !== CHAR_RIGHT_CURLY_BRACKET && c !== CHAR_SHARP && c !== CHAR_AMPERSAND && c !== CHAR_ASTERISK && c !== CHAR_EXCLAMATION && c !== CHAR_VERTICAL_LINE && c !== CHAR_EQUALS && c !== CHAR_GREATER_THAN && c !== CHAR_SINGLE_QUOTE && c !== CHAR_DOUBLE_QUOTE && c !== CHAR_PERCENT && c !== CHAR_COMMERCIAL_AT && c !== CHAR_GRAVE_ACCENT;
  }
  function isPlainSafeLast(c) {
    return !isWhitespace(c) && c !== CHAR_COLON;
  }
  function codePointAt(string, pos) {
    var first = string.charCodeAt(pos), second;
    if (first >= 55296 && first <= 56319 && pos + 1 < string.length) {
      second = string.charCodeAt(pos + 1);
      if (second >= 56320 && second <= 57343) {
        return (first - 55296) * 1024 + second - 56320 + 65536;
      }
    }
    return first;
  }
  function needIndentIndicator(string) {
    var leadingSpaceRe = /^\n* /;
    return leadingSpaceRe.test(string);
  }
  var STYLE_PLAIN = 1;
  var STYLE_SINGLE = 2;
  var STYLE_LITERAL = 3;
  var STYLE_FOLDED = 4;
  var STYLE_DOUBLE = 5;
  function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth, testAmbiguousType, quotingType, forceQuotes, inblock) {
    var i;
    var char = 0;
    var prevChar = null;
    var hasLineBreak = false;
    var hasFoldableLine = false;
    var shouldTrackWidth = lineWidth !== -1;
    var previousLineBreak = -1;
    var plain = isPlainSafeFirst(codePointAt(string, 0)) && isPlainSafeLast(codePointAt(string, string.length - 1));
    if (singleLineOnly || forceQuotes) {
      for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
    } else {
      for (i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
        char = codePointAt(string, i);
        if (char === CHAR_LINE_FEED) {
          hasLineBreak = true;
          if (shouldTrackWidth) {
            hasFoldableLine = hasFoldableLine || // Foldable line = too long, and not more-indented.
            i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ";
            previousLineBreak = i;
          }
        } else if (!isPrintable(char)) {
          return STYLE_DOUBLE;
        }
        plain = plain && isPlainSafe(char, prevChar, inblock);
        prevChar = char;
      }
      hasFoldableLine = hasFoldableLine || shouldTrackWidth && (i - previousLineBreak - 1 > lineWidth && string[previousLineBreak + 1] !== " ");
    }
    if (!hasLineBreak && !hasFoldableLine) {
      if (plain && !forceQuotes && !testAmbiguousType(string)) {
        return STYLE_PLAIN;
      }
      return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
    }
    if (indentPerLevel > 9 && needIndentIndicator(string)) {
      return STYLE_DOUBLE;
    }
    if (!forceQuotes) {
      return hasFoldableLine ? STYLE_FOLDED : STYLE_LITERAL;
    }
    return quotingType === QUOTING_TYPE_DOUBLE ? STYLE_DOUBLE : STYLE_SINGLE;
  }
  function writeScalar(state, string, level, iskey, inblock) {
    state.dump = function() {
      if (string.length === 0) {
        return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
      }
      if (!state.noCompatMode) {
        if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
          return state.quotingType === QUOTING_TYPE_DOUBLE ? '"' + string + '"' : "'" + string + "'";
        }
      }
      var indent = state.indent * Math.max(1, level);
      var lineWidth = state.lineWidth === -1 ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);
      var singleLineOnly = iskey || state.flowLevel > -1 && level >= state.flowLevel;
      function testAmbiguity(string2) {
        return testImplicitResolving(state, string2);
      }
      switch (chooseScalarStyle(
        string,
        singleLineOnly,
        state.indent,
        lineWidth,
        testAmbiguity,
        state.quotingType,
        state.forceQuotes && !iskey,
        inblock
      )) {
        case STYLE_PLAIN:
          return string;
        case STYLE_SINGLE:
          return "'" + string.replace(/'/g, "''") + "'";
        case STYLE_LITERAL:
          return "|" + blockHeader(string, state.indent) + dropEndingNewline(indentString(string, indent));
        case STYLE_FOLDED:
          return ">" + blockHeader(string, state.indent) + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
        case STYLE_DOUBLE:
          return '"' + escapeString(string) + '"';
        default:
          throw new exception("impossible error: invalid scalar style");
      }
    }();
  }
  function blockHeader(string, indentPerLevel) {
    var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : "";
    var clip = string[string.length - 1] === "\n";
    var keep = clip && (string[string.length - 2] === "\n" || string === "\n");
    var chomp = keep ? "+" : clip ? "" : "-";
    return indentIndicator + chomp + "\n";
  }
  function dropEndingNewline(string) {
    return string[string.length - 1] === "\n" ? string.slice(0, -1) : string;
  }
  function foldString(string, width) {
    var lineRe = /(\n+)([^\n]*)/g;
    var result = function() {
      var nextLF = string.indexOf("\n");
      nextLF = nextLF !== -1 ? nextLF : string.length;
      lineRe.lastIndex = nextLF;
      return foldLine(string.slice(0, nextLF), width);
    }();
    var prevMoreIndented = string[0] === "\n" || string[0] === " ";
    var moreIndented;
    var match;
    while (match = lineRe.exec(string)) {
      var prefix = match[1], line = match[2];
      moreIndented = line[0] === " ";
      result += prefix + (!prevMoreIndented && !moreIndented && line !== "" ? "\n" : "") + foldLine(line, width);
      prevMoreIndented = moreIndented;
    }
    return result;
  }
  function foldLine(line, width) {
    if (line === "" || line[0] === " ")
      return line;
    var breakRe = / [^ ]/g;
    var match;
    var start2 = 0, end, curr = 0, next = 0;
    var result = "";
    while (match = breakRe.exec(line)) {
      next = match.index;
      if (next - start2 > width) {
        end = curr > start2 ? curr : next;
        result += "\n" + line.slice(start2, end);
        start2 = end + 1;
      }
      curr = next;
    }
    result += "\n";
    if (line.length - start2 > width && curr > start2) {
      result += line.slice(start2, curr) + "\n" + line.slice(curr + 1);
    } else {
      result += line.slice(start2);
    }
    return result.slice(1);
  }
  function escapeString(string) {
    var result = "";
    var char = 0;
    var escapeSeq;
    for (var i = 0; i < string.length; char >= 65536 ? i += 2 : i++) {
      char = codePointAt(string, i);
      escapeSeq = ESCAPE_SEQUENCES[char];
      if (!escapeSeq && isPrintable(char)) {
        result += string[i];
        if (char >= 65536)
          result += string[i + 1];
      } else {
        result += escapeSeq || encodeHex(char);
      }
    }
    return result;
  }
  function writeFlowSequence(state, level, object) {
    var _result = "", _tag = state.tag, index, length, value;
    for (index = 0, length = object.length; index < length; index += 1) {
      value = object[index];
      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }
      if (writeNode(state, level, value, false, false) || typeof value === "undefined" && writeNode(state, level, null, false, false)) {
        if (_result !== "")
          _result += "," + (!state.condenseFlow ? " " : "");
        _result += state.dump;
      }
    }
    state.tag = _tag;
    state.dump = "[" + _result + "]";
  }
  function writeBlockSequence(state, level, object, compact) {
    var _result = "", _tag = state.tag, index, length, value;
    for (index = 0, length = object.length; index < length; index += 1) {
      value = object[index];
      if (state.replacer) {
        value = state.replacer.call(object, String(index), value);
      }
      if (writeNode(state, level + 1, value, true, true, false, true) || typeof value === "undefined" && writeNode(state, level + 1, null, true, true, false, true)) {
        if (!compact || _result !== "") {
          _result += generateNextLine(state, level);
        }
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          _result += "-";
        } else {
          _result += "- ";
        }
        _result += state.dump;
      }
    }
    state.tag = _tag;
    state.dump = _result || "[]";
  }
  function writeFlowMapping(state, level, object) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, pairBuffer;
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = "";
      if (_result !== "")
        pairBuffer += ", ";
      if (state.condenseFlow)
        pairBuffer += '"';
      objectKey = objectKeyList[index];
      objectValue = object[objectKey];
      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state, level, objectKey, false, false)) {
        continue;
      }
      if (state.dump.length > 1024)
        pairBuffer += "? ";
      pairBuffer += state.dump + (state.condenseFlow ? '"' : "") + ":" + (state.condenseFlow ? "" : " ");
      if (!writeNode(state, level, objectValue, false, false)) {
        continue;
      }
      pairBuffer += state.dump;
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = "{" + _result + "}";
  }
  function writeBlockMapping(state, level, object, compact) {
    var _result = "", _tag = state.tag, objectKeyList = Object.keys(object), index, length, objectKey, objectValue, explicitPair, pairBuffer;
    if (state.sortKeys === true) {
      objectKeyList.sort();
    } else if (typeof state.sortKeys === "function") {
      objectKeyList.sort(state.sortKeys);
    } else if (state.sortKeys) {
      throw new exception("sortKeys must be a boolean or a function");
    }
    for (index = 0, length = objectKeyList.length; index < length; index += 1) {
      pairBuffer = "";
      if (!compact || _result !== "") {
        pairBuffer += generateNextLine(state, level);
      }
      objectKey = objectKeyList[index];
      objectValue = object[objectKey];
      if (state.replacer) {
        objectValue = state.replacer.call(object, objectKey, objectValue);
      }
      if (!writeNode(state, level + 1, objectKey, true, true, true)) {
        continue;
      }
      explicitPair = state.tag !== null && state.tag !== "?" || state.dump && state.dump.length > 1024;
      if (explicitPair) {
        if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
          pairBuffer += "?";
        } else {
          pairBuffer += "? ";
        }
      }
      pairBuffer += state.dump;
      if (explicitPair) {
        pairBuffer += generateNextLine(state, level);
      }
      if (!writeNode(state, level + 1, objectValue, true, explicitPair)) {
        continue;
      }
      if (state.dump && CHAR_LINE_FEED === state.dump.charCodeAt(0)) {
        pairBuffer += ":";
      } else {
        pairBuffer += ": ";
      }
      pairBuffer += state.dump;
      _result += pairBuffer;
    }
    state.tag = _tag;
    state.dump = _result || "{}";
  }
  function detectType(state, object, explicit) {
    var _result, typeList, index, length, type2, style;
    typeList = explicit ? state.explicitTypes : state.implicitTypes;
    for (index = 0, length = typeList.length; index < length; index += 1) {
      type2 = typeList[index];
      if ((type2.instanceOf || type2.predicate) && (!type2.instanceOf || typeof object === "object" && object instanceof type2.instanceOf) && (!type2.predicate || type2.predicate(object))) {
        if (explicit) {
          if (type2.multi && type2.representName) {
            state.tag = type2.representName(object);
          } else {
            state.tag = type2.tag;
          }
        } else {
          state.tag = "?";
        }
        if (type2.represent) {
          style = state.styleMap[type2.tag] || type2.defaultStyle;
          if (_toString.call(type2.represent) === "[object Function]") {
            _result = type2.represent(object, style);
          } else if (_hasOwnProperty.call(type2.represent, style)) {
            _result = type2.represent[style](object, style);
          } else {
            throw new exception("!<" + type2.tag + '> tag resolver accepts not "' + style + '" style');
          }
          state.dump = _result;
        }
        return true;
      }
    }
    return false;
  }
  function writeNode(state, level, object, block, compact, iskey, isblockseq) {
    state.tag = null;
    state.dump = object;
    if (!detectType(state, object, false)) {
      detectType(state, object, true);
    }
    var type2 = _toString.call(state.dump);
    var inblock = block;
    var tagStr;
    if (block) {
      block = state.flowLevel < 0 || state.flowLevel > level;
    }
    var objectOrArray = type2 === "[object Object]" || type2 === "[object Array]", duplicateIndex, duplicate;
    if (objectOrArray) {
      duplicateIndex = state.duplicates.indexOf(object);
      duplicate = duplicateIndex !== -1;
    }
    if (state.tag !== null && state.tag !== "?" || duplicate || state.indent !== 2 && level > 0) {
      compact = false;
    }
    if (duplicate && state.usedDuplicates[duplicateIndex]) {
      state.dump = "*ref_" + duplicateIndex;
    } else {
      if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
        state.usedDuplicates[duplicateIndex] = true;
      }
      if (type2 === "[object Object]") {
        if (block && Object.keys(state.dump).length !== 0) {
          writeBlockMapping(state, level, state.dump, compact);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + state.dump;
          }
        } else {
          writeFlowMapping(state, level, state.dump);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + " " + state.dump;
          }
        }
      } else if (type2 === "[object Array]") {
        if (block && state.dump.length !== 0) {
          if (state.noArrayIndent && !isblockseq && level > 0) {
            writeBlockSequence(state, level - 1, state.dump, compact);
          } else {
            writeBlockSequence(state, level, state.dump, compact);
          }
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + state.dump;
          }
        } else {
          writeFlowSequence(state, level, state.dump);
          if (duplicate) {
            state.dump = "&ref_" + duplicateIndex + " " + state.dump;
          }
        }
      } else if (type2 === "[object String]") {
        if (state.tag !== "?") {
          writeScalar(state, state.dump, level, iskey, inblock);
        }
      } else if (type2 === "[object Undefined]") {
        return false;
      } else {
        if (state.skipInvalid)
          return false;
        throw new exception("unacceptable kind of an object to dump " + type2);
      }
      if (state.tag !== null && state.tag !== "?") {
        tagStr = encodeURI(
          state.tag[0] === "!" ? state.tag.slice(1) : state.tag
        ).replace(/!/g, "%21");
        if (state.tag[0] === "!") {
          tagStr = "!" + tagStr;
        } else if (tagStr.slice(0, 18) === "tag:yaml.org,2002:") {
          tagStr = "!!" + tagStr.slice(18);
        } else {
          tagStr = "!<" + tagStr + ">";
        }
        state.dump = tagStr + " " + state.dump;
      }
    }
    return true;
  }
  function getDuplicateReferences(object, state) {
    var objects = [], duplicatesIndexes = [], index, length;
    inspectNode(object, objects, duplicatesIndexes);
    for (index = 0, length = duplicatesIndexes.length; index < length; index += 1) {
      state.duplicates.push(objects[duplicatesIndexes[index]]);
    }
    state.usedDuplicates = new Array(length);
  }
  function inspectNode(object, objects, duplicatesIndexes) {
    var objectKeyList, index, length;
    if (object !== null && typeof object === "object") {
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
    if (!state.noRefs)
      getDuplicateReferences(input, state);
    var value = input;
    if (state.replacer) {
      value = state.replacer.call({ "": value }, "", value);
    }
    if (writeNode(state, 0, value, true, true))
      return state.dump + "\n";
    return "";
  }
  var dump_1 = dump$1;
  var dumper = {
    dump: dump_1
  };
  function renamed(from, to) {
    return function() {
      throw new Error("Function yaml." + from + " is removed in js-yaml 4. Use yaml." + to + " instead, which is now safe by default.");
    };
  }
  var load = loader.load;
  var loadAll = loader.loadAll;
  var dump = dumper.dump;
  var safeLoad = renamed("safeLoad", "load");
  var safeLoadAll = renamed("safeLoadAll", "loadAll");
  var safeDump = renamed("safeDump", "dump");

  // ../cordis/packages/loader/lib/shared.js
  var __defProp3 = Object.defineProperty;
  var __name2 = (target, value) => __defProp3(target, "name", { value, configurable: true });
  var __require2 = /* @__PURE__ */ ((x) => typeof __require !== "undefined" ? __require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof __require !== "undefined" ? __require : a)[b]
  }) : x)(function(x) {
    if (typeof __require !== "undefined")
      return __require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var evaluate = new Function("context", "expr", `
  try {
    with (context) {
      return eval(expr)
    }
  } catch {}
`);
  function interpolate(template, context, pattern = /\{\{([\s\S]+?)\}\}/g) {
    let capture;
    let result = "", lastIndex = 0;
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
  __name2(interpolate, "interpolate");
  var writable = {
    ".json": "application/json",
    ".yaml": "application/yaml",
    ".yml": "application/yaml"
  };
  var supported = new Set(Object.keys(writable));
  function swapAssign(target, source) {
    const result = { ...target };
    for (const key in result) {
      delete target[key];
    }
    Object.assign(target, source);
    return result;
  }
  __name2(swapAssign, "swapAssign");
  function randomID() {
    return Math.random().toString(36).slice(2, 8);
  }
  __name2(randomID, "randomID");
  var _a9;
  var Entry = (_a9 = class {
    constructor(loader2, parent, options) {
      __publicField(this, "fork", null);
      __publicField(this, "isUpdate", false);
      this.loader = loader2;
      this.parent = parent;
      this.options = options;
    }
    amend(ctx) {
      var _a25, _b5;
      swapAssign(ctx[Context2.intercept], this.options.intercept);
      const neoMap = Object.create(Object.getPrototypeOf(ctx[Context2.isolate]));
      for (const [key, label] of Object.entries(this.options.isolate ?? {})) {
        if (typeof label === "string") {
          neoMap[key] = (_b5 = (_a25 = this.loader.realms)[label] ?? (_a25[label] = /* @__PURE__ */ Object.create(null)))[key] ?? (_b5[key] = Symbol(key));
        } else if (label) {
          neoMap[key] = Symbol(key);
        }
      }
      for (const key in { ...ctx[Context2.isolate], ...neoMap }) {
        if (neoMap[key] === ctx[Context2.isolate][key])
          continue;
        const self2 = /* @__PURE__ */ Object.create(null);
        self2[Context2.filter] = (ctx2) => {
          return ctx[Context2.isolate][key] === ctx2[Context2.isolate][key];
        };
        ctx.emit(self2, "internal/before-service", key);
      }
      const oldMap = swapAssign(ctx[Context2.isolate], neoMap);
      for (const key in { ...oldMap, ...ctx[Context2.isolate] }) {
        if (oldMap[key] === ctx[Context2.isolate][key])
          continue;
        const self2 = /* @__PURE__ */ Object.create(null);
        self2[Context2.filter] = (ctx2) => {
          return ctx[Context2.isolate][key] === ctx2[Context2.isolate][key];
        };
        ctx.emit(self2, "internal/service", key);
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
        if (!plugin)
          return;
        const ctx = this.parent.extend({
          [Context2.intercept]: Object.create(this.parent[Context2.intercept]),
          [Context2.isolate]: Object.create(this.parent[Context2.isolate])
        });
        this.amend(ctx);
        this.fork = ctx.plugin(plugin, this.loader.interpolate(this.options.config));
        this.fork.entry = this;
      }
    }
    stop() {
      if (!this.fork)
        return;
      this.parent.emit("loader/entry", "unload", this);
      this.fork.dispose();
      this.fork = null;
    }
  }, __name2(_a9, "Entry"), _a9);
  function mapEntry(pluginsConf) {
    if (!pluginsConf)
      return [];
    return Object.entries(pluginsConf).map(([name2, config]) => {
      let [realName, id] = name2.split(":", 2);
      let disabled = false;
      if (realName.startsWith("~")) {
        realName = realName.slice(1);
        disabled = true;
      }
      return { id: id ?? randomID(), name: realName, config, disabled };
    });
  }
  __name2(mapEntry, "mapEntry");
  var _a10;
  var Loader = (_a10 = class extends Service2 {
    constructor(app, options) {
      super(app, "loader", true);
      // process
      __publicField(this, "baseDir", "./");
      // process.cwd()
      __publicField(this, "envData", { startTime: Date.now() });
      // public envData = process.env.CORDIS_SHARED
      //   ? JSON.parse(process.env.CORDIS_SHARED)
      //   : { startTime: Date.now() }
      __publicField(this, "params", {
        env: {}
        // process.env,
      });
      __publicField(this, "entryFork");
      __publicField(this, "suspend", false);
      __publicField(this, "writable", false);
      __publicField(this, "mimeType");
      __publicField(this, "filename");
      __publicField(this, "entries", /* @__PURE__ */ Object.create(null));
      __publicField(this, "realms", /* @__PURE__ */ Object.create(null));
      __publicField(this, "tasks", /* @__PURE__ */ new Set());
      this.app = app;
      this.options = options;
      if (options.baseDir)
        this.baseDir = options.baseDir;
      this.realms.root = app.root[Context2.isolate];
    }
    async import(name2) {
      try {
        return __require2(name2);
      } catch (err) {
        this.app.emit("internal/error", err);
      }
    }
    async init(filename) {
      if (filename) {
        filename = `${(0, import_cosmokit7.trimSlash)(this.baseDir.replaceAll("\\", "/"))}/${filename}`;
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
        } catch {
        }
      }
      this.app.provide("baseDir", this.baseDir, true);
    }
    async findConfig() {
      const files = file.getFilesList(this.baseDir);
      for (const extname of supported) {
        const filename = this.options.name + extname;
        if (files.includes(filename)) {
          this.mimeType = writable[extname];
          this.filename = `${(0, import_cosmokit7.trimSlash)(this.baseDir.replaceAll("\\", "/"))}/${filename}`;
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
      if (!silent)
        this.app.emit("config");
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
        return source.map((item) => this.interpolate(item));
      } else {
        return (0, import_cosmokit7.valueMap)(source, (item) => this.interpolate(item));
      }
    }
    async resolve(name2) {
      const task = this.import(name2);
      this.tasks.add(task);
      task.finally(() => this.tasks.delete(task));
      return this.unwrapExports(await task);
    }
    isTruthyLike(expr) {
      if ((0, import_cosmokit7.isNullable)(expr))
        return true;
      return !!this.interpolate(`\${{ ${expr} }}`);
    }
    async update(parent, options) {
      var _a25, _b5;
      if (!options.id) {
        do {
          options.id = randomID();
        } while (this.entries[options.id]);
      }
      const entry = (_a25 = this.entries)[_b5 = options.id] ?? (_a25[_b5] = new Entry(this, parent, options));
      entry.update(parent, options);
    }
    remove(parent, options) {
      const entry = this.entries[options.id];
      if (!entry)
        return;
      entry.stop();
      delete this.entries[options.id];
    }
    paths(scope) {
      if (scope === scope.parent.scope)
        return [];
      if (scope.runtime === scope) {
        return [].concat(...scope.runtime.children.map((child) => this.paths(child)));
      }
      if (scope.entry)
        return [scope.entry.options.id];
      return this.paths(scope.parent.scope);
    }
    async start() {
      await this.readConfig();
      this.entryFork = this.app.plugin(group, mapEntry(this.config.plugins));
      this.app.on("dispose", () => {
        this.exit();
      });
      this.app.on("internal/update", (fork) => {
        const entry = this.entries[fork.entry?.options.id];
        if (!entry)
          return;
        fork.parent.emit("loader/entry", "reload", entry);
      });
      this.app.on("internal/before-update", (fork, config) => {
        if (!fork.entry)
          return;
        if (fork.entry.isUpdate)
          return fork.entry.isUpdate = false;
        const { schema: schema2 } = fork.runtime;
        fork.entry.options.config = schema2 ? schema2.simplify(config) : config;
        this.writeConfig();
      });
      this.app.on("internal/fork", (fork) => {
        if (fork.uid || !fork.entry)
          return;
        fork.parent.emit("loader/entry", "unload", fork.entry);
        if (!this.app.registry.has(fork.runtime.plugin))
          return;
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
    exit() {
    }
  }, __name2(_a10, "Loader"), _a10);
  function group(ctx, config) {
    for (const entry of config) {
      ctx.loader.update(ctx, entry);
    }
    ctx.accept((neo) => {
      const old = ctx.scope.config;
      const oldMap = Object.fromEntries(old.map((entry) => [entry.id, entry]));
      const neoMap = Object.fromEntries(neo.map((entry) => [entry.id, entry]));
      for (const id in { ...oldMap, ...neoMap }) {
        if (!neoMap[id]) {
          ctx.loader.remove(ctx, oldMap[id]);
        } else {
          ctx.loader.update(ctx, neoMap[id]);
        }
      }
    }, { passive: true });
    ctx.on("dispose", () => {
      for (const entry of ctx.scope.config) {
        ctx.loader.remove(ctx, entry);
      }
    });
  }
  __name2(group, "group");
  (0, import_cosmokit7.defineProperty)(group, "inject", ["loader"]);
  (0, import_cosmokit7.defineProperty)(group, "reusable", true);

  // ../satori/packages/satori/lib/index.mjs
  var lib_exports4 = {};
  __export(lib_exports4, {
    Adapter: () => Adapter,
    Bot: () => Bot,
    Context: () => Context3,
    CordisError: () => CordisError,
    EffectScope: () => EffectScope,
    Element: () => lib_default,
    ForkScope: () => ForkScope,
    Lifecycle: () => Lifecycle,
    Logger: () => import_levi_reggol.default,
    MainScope: () => MainScope,
    MessageEncoder: () => MessageEncoder,
    Messenger: () => MessageEncoder,
    Modulator: () => MessageEncoder,
    Registry: () => Registry,
    Schema: () => import_schemastery.default,
    ScopeStatus: () => ScopeStatus,
    Service: () => Service23,
    Session: () => Session,
    TimerService: () => TimerService2,
    Universal: () => lib_exports2,
    applyTraceable: () => applyTraceable,
    createCallable: () => createCallable,
    createTraceable: () => createTraceable,
    defineAccessor: () => defineAccessor,
    h: () => lib_default,
    isApplicable: () => isApplicable,
    isBailed: () => isBailed,
    isConstructor: () => isConstructor,
    isUnproxyable: () => isUnproxyable,
    joinPrototype: () => joinPrototype,
    resolveConfig: () => resolveConfig,
    segment: () => lib_default,
    symbols: () => symbols,
    z: () => import_schemastery.default
  });

  // ../cordis/packages/cordis/lib/index.mjs
  var import_schemastery = __toESM(require_lib3(), 1);

  // ../cordis/packages/logger/lib/index.mjs
  var import_levi_reggol = __toESM(require_lib2(), 1);
  var __defProp4 = Object.defineProperty;
  var __name3 = (target, value) => __defProp4(target, "name", { value, configurable: true });
  var _a11, _b2;
  var LoggerService = (_b2 = class extends Service2 {
    constructor(ctx) {
      super(ctx, "logger", true);
      ctx.on("internal/info", function(format, ...args) {
        this.logger("app").info(format, ...args);
      });
      ctx.on("internal/error", function(format, ...args) {
        this.logger("app").error(format, ...args);
      });
      ctx.on("internal/warning", function(format, ...args) {
        this.logger("app").warn(format, ...args);
      });
    }
    [(_a11 = Service2.provide, Service2.invoke)](name2) {
      return new import_levi_reggol.default(name2, { [Context2.origin]: this });
    }
  }, __name3(_b2, "LoggerService"), __publicField(_b2, _a11, "logger"), (() => {
    for (const type2 of [
      "success",
      "error",
      "info",
      "warn",
      "debug",
      "extend"
    ]) {
      _b2.prototype[type2] = function(...args) {
        const caller = this[Context2.origin];
        return this(caller.name)[type2](...args);
      };
    }
  })(), _b2);

  // ../cordis/packages/timer/lib/index.mjs
  var import_cosmokit8 = __toESM(require_lib(), 1);
  var __defProp5 = Object.defineProperty;
  var __name4 = (target, value) => __defProp5(target, "name", { value, configurable: true });
  var _a12;
  var TimerService2 = (_a12 = class extends Service2 {
    constructor(ctx) {
      super(ctx, "timer", true);
      ctx.mixin("timer", ["setTimeout", "setInterval", "sleep", "throttle", "debounce"]);
    }
    setTimeout(callback, delay) {
      const dispose = this[Context2.origin].effect(() => {
        const timer = setTimeout(() => {
          dispose();
          callback();
        }, delay);
        return () => clearTimeout(timer);
      });
      return dispose;
    }
    setInterval(callback, delay) {
      return this[Context2.origin].effect(() => {
        const timer = setInterval(callback, delay);
        return () => clearInterval(timer);
      });
    }
    sleep(delay) {
      const caller = this[Context2.origin];
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
      const caller = this[Context2.origin];
      caller.scope.assertActive();
      let timer;
      const dispose = /* @__PURE__ */ __name4(() => {
        isDisposed = true;
        (0, import_cosmokit8.remove)(caller.scope.disposables, dispose);
        clearTimeout(timer);
      }, "dispose");
      const wrapper = /* @__PURE__ */ __name4((...args) => {
        clearTimeout(timer);
        timer = callback(args, () => !isDisposed && caller.scope.isActive);
      }, "wrapper");
      wrapper.dispose = dispose;
      caller.scope.disposables.push(dispose);
      return wrapper;
    }
    throttle(callback, delay, noTrailing) {
      let lastCall = -Infinity;
      const execute = /* @__PURE__ */ __name4((...args) => {
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
        if (!isActive())
          return;
        return setTimeout(callback, delay, ...args);
      });
    }
  }, __name4(_a12, "TimerService"), _a12);

  // ../cordis/packages/cordis/lib/index.mjs
  var __defProp6 = Object.defineProperty;
  var __name5 = (target, value) => __defProp6(target, "name", { value, configurable: true });
  var _a13;
  var Context22 = (_a13 = class extends Context2 {
    constructor(config) {
      super(config);
      __publicField(this, "baseDir");
      this.baseDir = globalThis.process?.cwd() || "";
      this.provide("logger", void 0, true);
      this.provide("timer", void 0, true);
      this.plugin(LoggerService);
      this.plugin(TimerService2);
    }
  }, __name5(_a13, "Context"), _a13);
  var _a14;
  var Service22 = (_a14 = class extends Service2 {
    constructor(...args) {
      super(...args);
      /** @deprecated use `this.ctx.logger` instead */
      __publicField(this, "logger");
      this.logger = this.ctx.logger(this.name);
    }
    [Service2.setup]() {
      this.ctx = new Context22();
    }
  }, __name5(_a14, "Service"), _a14);
  function src_default() {
  }
  __name5(src_default, "default");

  // ../satori/packages/core/lib/index.mjs
  var import_cosmokit11 = __toESM(require_lib(), 1);
  var import_cosmokit12 = __toESM(require_lib(), 1);

  // ../satori/packages/protocol/lib/index.mjs
  var lib_exports2 = {};
  __export(lib_exports2, {
    Channel: () => Channel,
    Methods: () => Methods,
    Opcode: () => Opcode,
    Status: () => Status,
    WebSocket: () => WebSocket
  });
  var __defProp7 = Object.defineProperty;
  var __name6 = (target, value) => __defProp7(target, "name", { value, configurable: true });
  function Field(name2) {
    return { name: name2 };
  }
  __name6(Field, "Field");
  function Method(name2, fields) {
    return { name: name2, fields: fields.map(Field) };
  }
  __name6(Method, "Method");
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
  ((Channel2) => {
    let Type;
    ((Type2) => {
      Type2[Type2["TEXT"] = 0] = "TEXT";
      Type2[Type2["DIRECT"] = 1] = "DIRECT";
      Type2[Type2["VOICE"] = 2] = "VOICE";
      Type2[Type2["CATEGORY"] = 3] = "CATEGORY";
    })(Type = Channel2.Type || (Channel2.Type = {}));
  })(Channel || (Channel = {}));
  var Status = /* @__PURE__ */ ((Status2) => {
    Status2[Status2["OFFLINE"] = 0] = "OFFLINE";
    Status2[Status2["ONLINE"] = 1] = "ONLINE";
    Status2[Status2["CONNECT"] = 2] = "CONNECT";
    Status2[Status2["DISCONNECT"] = 3] = "DISCONNECT";
    Status2[Status2["RECONNECT"] = 4] = "RECONNECT";
    return Status2;
  })(Status || {});
  var Opcode = /* @__PURE__ */ ((Opcode2) => {
    Opcode2[Opcode2["EVENT"] = 0] = "EVENT";
    Opcode2[Opcode2["PING"] = 1] = "PING";
    Opcode2[Opcode2["PONG"] = 2] = "PONG";
    Opcode2[Opcode2["IDENTIFY"] = 3] = "IDENTIFY";
    Opcode2[Opcode2["READY"] = 4] = "READY";
    return Opcode2;
  })(Opcode || {});
  var WebSocket;
  ((WebSocket22) => {
    WebSocket22.CONNECTING = 0;
    WebSocket22.OPEN = 1;
    WebSocket22.CLOSING = 2;
    WebSocket22.CLOSED = 3;
  })(WebSocket || (WebSocket = {}));

  // ../satori/packages/element/lib/index.mjs
  var import_cosmokit9 = __toESM(require_lib(), 1);
  var __defProp8 = Object.defineProperty;
  var __getOwnPropNames2 = Object.getOwnPropertyNames;
  var __name7 = (target, value) => __defProp8(target, "name", { value, configurable: true });
  var __commonJS2 = (cb, mod) => function __require3() {
    return mod || (0, cb[__getOwnPropNames2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var require_src = __commonJS2({
    "src/index.ts"(exports, module) {
      var _a25;
      var kElement = Symbol.for("satori.element");
      var ElementConstructor = (_a25 = class {
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
            if ((0, import_cosmokit9.isNullable)(value))
              return "";
            key = (0, import_cosmokit9.hyphenate)(key);
            if (value === true)
              return ` ${key}`;
            if (value === false)
              return ` no-${key}`;
            return ` ${key}="${Element2.escape("" + value, true)}"`;
          }).join("");
        }
        toString(strip = false) {
          if (this.type === "text" && "content" in this.attrs) {
            return strip ? this.attrs.content : Element2.escape(this.attrs.content);
          }
          const inner = this.children.map((child) => child.toString(strip)).join("");
          if (strip)
            return inner;
          const attrs = this.toAttrString();
          const tag = this.getTagName();
          if (!this.children.length)
            return `<${tag}${attrs}/>`;
          return `<${tag}${attrs}>${inner}</${tag}>`;
        }
      }, __name7(_a25, "ElementConstructor"), _a25);
      (0, import_cosmokit9.defineProperty)(ElementConstructor, "name", "Element");
      (0, import_cosmokit9.defineProperty)(ElementConstructor.prototype, kElement, true);
      function Element2(type2, ...args) {
        const el = Object.create(ElementConstructor.prototype);
        const attrs = {}, children = [];
        if (args[0] && typeof args[0] === "object" && !Element2.isElement(args[0]) && !Array.isArray(args[0])) {
          const props = args.shift();
          for (const [key, value] of Object.entries(props)) {
            if ((0, import_cosmokit9.isNullable)(value))
              continue;
            if (key === "children") {
              args.push(...(0, import_cosmokit9.makeArray)(value));
            } else {
              attrs[(0, import_cosmokit9.camelize)(key)] = value;
            }
          }
        }
        for (const child of args) {
          children.push(...Element2.toElementArray(child));
        }
        if (typeof type2 === "function") {
          attrs.is = type2;
          type2 = "component";
        }
        return Object.assign(el, { type: type2, attrs, children });
      }
      __name7(Element2, "Element");
      var evaluate2 = new Function("expr", "context", `
  try {
    with (context) {
      return eval(expr)
    }
  } catch {}
`);
      ((Element22) => {
        Element22.jsx = Element22;
        Element22.jsxs = Element22;
        Element22.jsxDEV = Element22;
        Element22.Fragment = "template";
        function isElement(source) {
          return source && typeof source === "object" && source[kElement];
        }
        Element22.isElement = isElement;
        __name7(isElement, "isElement");
        function toElement(content) {
          if (typeof content === "string" || typeof content === "number" || typeof content === "boolean") {
            content = "" + content;
            if (content)
              return Element22("text", { content });
          } else if (isElement(content)) {
            return content;
          } else if (!(0, import_cosmokit9.isNullable)(content)) {
            throw new TypeError(`Invalid content: ${content}`);
          }
        }
        Element22.toElement = toElement;
        __name7(toElement, "toElement");
        function toElementArray(content) {
          if (Array.isArray(content)) {
            return content.map(toElement).filter((x) => x);
          } else {
            return [toElement(content)].filter((x) => x);
          }
        }
        Element22.toElementArray = toElementArray;
        __name7(toElementArray, "toElementArray");
        function normalize(source, context) {
          return typeof source === "string" ? parse(source, context) : toElementArray(source);
        }
        Element22.normalize = normalize;
        __name7(normalize, "normalize");
        function escape(source, inline = false) {
          const result = source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return inline ? result.replace(/"/g, "&quot;") : result;
        }
        Element22.escape = escape;
        __name7(escape, "escape");
        function unescape(source) {
          return source.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, code) => code === "38" ? _ : String.fromCharCode(+code)).replace(/&#x([0-9a-f]+);/gi, (_, code) => code === "26" ? _ : String.fromCharCode(parseInt(code, 16))).replace(/&(amp|#38|#x26);/g, "&");
        }
        Element22.unescape = unescape;
        __name7(unescape, "unescape");
        function from(source, options = {}) {
          const elements = parse(source);
          if (options.caret) {
            if (options.type && elements[0]?.type !== options.type)
              return;
            return elements[0];
          }
          return select(elements, options.type || "*")[0];
        }
        Element22.from = from;
        __name7(from, "from");
        const combRegExp = / *([ >+~]) */g;
        function parseSelector(input) {
          return input.split(",").map((query) => {
            const selectors = [];
            query = query.trim();
            let combCap, combinator = " ";
            while (combCap = combRegExp.exec(query)) {
              selectors.push({ type: query.slice(0, combCap.index), combinator });
              combinator = combCap[1];
              query = query.slice(combCap.index + combCap[0].length);
            }
            selectors.push({ type: query, combinator });
            return selectors;
          });
        }
        Element22.parseSelector = parseSelector;
        __name7(parseSelector, "parseSelector");
        function select(source, query) {
          if (!source || !query)
            return [];
          if (typeof source === "string")
            source = parse(source);
          if (typeof query === "string")
            query = parseSelector(query);
          if (!query.length)
            return [];
          let adjacent = [];
          const results = [];
          for (const [index, element] of source.entries()) {
            const inner = [];
            const local = [...query, ...adjacent];
            adjacent = [];
            let matched = false;
            for (const group2 of local) {
              const { type: type2, combinator } = group2[0];
              if (type2 === element.type || type2 === "*") {
                if (group2.length === 1) {
                  matched = true;
                } else if ([" ", ">"].includes(group2[1].combinator)) {
                  inner.push(group2.slice(1));
                } else if (group2[1].combinator === "+") {
                  adjacent.push(group2.slice(1));
                } else {
                  query.push(group2.slice(1));
                }
              }
              if (combinator === " ") {
                inner.push(group2);
              }
            }
            if (matched)
              results.push(source[index]);
            results.push(...select(element.children, inner));
          }
          return results;
        }
        Element22.select = select;
        __name7(select, "select");
        function interpolate2(expr, context) {
          expr = expr.trim();
          if (!/^[\w.]+$/.test(expr)) {
            return evaluate2(expr, context) ?? "";
          }
          let value = context;
          for (const part of expr.split(".")) {
            value = value[part];
            if ((0, import_cosmokit9.isNullable)(value))
              return "";
          }
          return value ?? "";
        }
        Element22.interpolate = interpolate2;
        __name7(interpolate2, "interpolate");
        const tagRegExp1 = /(?<comment><!--[\s\S]*?-->)|(?<tag><(\/?)([^!\s>/]*)([^>]*?)\s*(\/?)>)/;
        const tagRegExp2 = /(?<comment><!--[\s\S]*?-->)|(?<tag><(\/?)([^!\s>/]*)([^>]*?)\s*(\/?)>)|(?<curly>\{(?<derivative>[@:/#][^\s}]*)?[\s\S]*?\})/;
        const attrRegExp1 = /([^\s=]+)(?:="(?<value1>[^"]*)"|='(?<value2>[^']*)')?/g;
        const attrRegExp2 = /([^\s=]+)(?:="(?<value1>[^"]*)"|='(?<value2>[^']*)'|=(?<curly>\{([^}]+)\}))?/g;
        let Position;
        ((Position2) => {
          Position2[Position2["OPEN"] = 0] = "OPEN";
          Position2[Position2["CLOSE"] = 1] = "CLOSE";
          Position2[Position2["EMPTY"] = 2] = "EMPTY";
          Position2[Position2["CONTINUE"] = 3] = "CONTINUE";
        })(Position || (Position = {}));
        function parse(source, context) {
          const tokens = [];
          function pushText(content) {
            if (content)
              tokens.push(content);
          }
          __name7(pushText, "pushText");
          const tagRegExp = context ? tagRegExp2 : tagRegExp1;
          let tagCap;
          let trimStart = true;
          while (tagCap = tagRegExp.exec(source)) {
            const trimEnd = !tagCap.groups.curly;
            parseContent(source.slice(0, tagCap.index), trimStart, trimEnd);
            trimStart = trimEnd;
            source = source.slice(tagCap.index + tagCap[0].length);
            const [_, , , close, type2, extra, empty] = tagCap;
            if (tagCap.groups.comment)
              continue;
            if (tagCap.groups.curly) {
              let name2 = "", position = 2;
              if (tagCap.groups.derivative) {
                name2 = tagCap.groups.derivative.slice(1);
                position = {
                  "@": 2,
                  "#": 0,
                  "/": 1,
                  ":": 3
                  /* CONTINUE */
                }[tagCap.groups.derivative[0]];
              }
              tokens.push({
                type: "curly",
                name: name2,
                position,
                source: tagCap.groups.curly,
                extra: tagCap.groups.curly.slice(1 + (tagCap.groups.derivative ?? "").length, -1)
              });
              continue;
            }
            tokens.push({
              type: "angle",
              source: _,
              name: type2 || Element22.Fragment,
              position: close ? 1 : empty ? 2 : 0,
              extra
            });
          }
          parseContent(source, trimStart, true);
          function parseContent(source2, trimStart2, trimEnd) {
            source2 = unescape(source2);
            if (trimStart2)
              source2 = source2.replace(/^\s*\n\s*/, "");
            if (trimEnd)
              source2 = source2.replace(/\s*\n\s*$/, "");
            pushText(source2);
          }
          __name7(parseContent, "parseContent");
          return parseTokens(foldTokens(tokens), context);
        }
        Element22.parse = parse;
        __name7(parse, "parse");
        function foldTokens(tokens) {
          const stack = [[{
            type: "angle",
            name: Element22.Fragment,
            position: 0,
            source: "",
            extra: "",
            children: { default: [] }
          }, "default"]];
          function pushToken(...tokens2) {
            const [token, slot] = stack[0];
            token.children[slot].push(...tokens2);
          }
          __name7(pushToken, "pushToken");
          for (const token of tokens) {
            if (typeof token === "string") {
              pushToken(token);
              continue;
            }
            const { name: name2, position } = token;
            if (position === 1) {
              if (stack[0][0].name === name2) {
                stack.shift();
              }
            } else if (position === 3) {
              stack[0][0].children[name2] = [];
              stack[0][1] = name2;
            } else if (position === 0) {
              pushToken(token);
              token.children = { default: [] };
              stack.unshift([token, "default"]);
            } else {
              pushToken(token);
            }
          }
          return stack[stack.length - 1][0].children.default;
        }
        __name7(foldTokens, "foldTokens");
        function parseTokens(tokens, context) {
          const result = [];
          for (const token of tokens) {
            if (typeof token === "string") {
              result.push(Element22("text", { content: token }));
            } else if (token.type === "angle") {
              const attrs = {};
              const attrRegExp = context ? attrRegExp2 : attrRegExp1;
              let attrCap;
              while (attrCap = attrRegExp.exec(token.extra)) {
                const [, key, v1, v2 = v1, v3] = attrCap;
                if (v3) {
                  attrs[key] = interpolate2(v3, context);
                } else if (!(0, import_cosmokit9.isNullable)(v2)) {
                  attrs[key] = unescape(v2);
                } else if (key.startsWith("no-")) {
                  attrs[key.slice(3)] = false;
                } else {
                  attrs[key] = true;
                }
              }
              result.push(Element22(token.name, attrs, token.children && parseTokens(token.children.default, context)));
            } else if (!token.name) {
              result.push(...toElementArray(interpolate2(token.extra, context)));
            } else if (token.name === "if") {
              if (evaluate2(token.extra, context)) {
                result.push(...parseTokens(token.children.default, context));
              } else {
                result.push(...parseTokens(token.children.else || [], context));
              }
            } else if (token.name === "each") {
              const [expr, ident] = token.extra.split(/\s+as\s+/);
              const items = interpolate2(expr, context);
              if (!items || !items[Symbol.iterator])
                continue;
              for (const item of items) {
                result.push(...parseTokens(token.children.default, { ...context, [ident]: item }));
              }
            }
          }
          return result;
        }
        __name7(parseTokens, "parseTokens");
        function visit(element, rules, session) {
          const { type: type2, attrs, children } = element;
          if (typeof rules === "function") {
            return rules(element, session);
          } else {
            let result = rules[typeof type2 === "string" ? type2 : ""] ?? rules.default ?? true;
            if (typeof result === "function") {
              result = result(attrs, children, session);
            }
            return result;
          }
        }
        __name7(visit, "visit");
        function transform(source, rules, session) {
          const elements = typeof source === "string" ? parse(source) : source;
          const output = [];
          elements.forEach((element) => {
            const { type: type2, attrs, children } = element;
            const result = visit(element, rules, session);
            if (result === true) {
              output.push(Element22(type2, attrs, transform(children, rules, session)));
            } else if (result !== false) {
              output.push(...toElementArray(result));
            }
          });
          return typeof source === "string" ? output.join("") : output;
        }
        Element22.transform = transform;
        __name7(transform, "transform");
        async function transformAsync(source, rules, session) {
          const elements = typeof source === "string" ? parse(source) : source;
          const children = (await Promise.all(elements.map(async (element) => {
            const { type: type2, attrs, children: children2 } = element;
            const result = await visit(element, rules, session);
            if (result === true) {
              return [Element22(type2, attrs, await transformAsync(children2, rules, session))];
            } else if (result !== false) {
              return toElementArray(result);
            } else {
              return [];
            }
          }))).flat(1);
          return typeof source === "string" ? children.join("") : children;
        }
        Element22.transformAsync = transformAsync;
        __name7(transformAsync, "transformAsync");
        function createFactory(type2, ...keys) {
          return (...args) => {
            const element = Element22(type2);
            keys.forEach((key, index) => {
              if (!(0, import_cosmokit9.isNullable)(args[index])) {
                element.attrs[key] = args[index];
              }
            });
            if (args[keys.length]) {
              Object.assign(element.attrs, args[keys.length]);
            }
            return element;
          };
        }
        __name7(createFactory, "createFactory");
        Element22.warn = /* @__PURE__ */ __name7(() => {
        }, "warn");
        function createAssetFactory(type2) {
          return (src, ...args) => {
            let prefix = "base64://";
            if (typeof args[0] === "string") {
              prefix = `data:${args.shift()};base64,`;
            }
            if ((0, import_cosmokit9.is)("ArrayBuffer", src)) {
              src = prefix + (0, import_cosmokit9.arrayBufferToBase64)(src);
            } else if (ArrayBuffer.isView(src)) {
              src = prefix + (0, import_cosmokit9.arrayBufferToBase64)(src.buffer);
            }
            if (src.startsWith("base64://")) {
              (0, Element22.warn)(`protocol "base64:" is deprecated and will be removed in the future, please use "data:" instead`);
            }
            return Element22(type2, { ...args[0], src });
          };
        }
        __name7(createAssetFactory, "createAssetFactory");
        Element22.text = createFactory("text", "content");
        Element22.at = createFactory("at", "id");
        Element22.sharp = createFactory("sharp", "id");
        Element22.quote = createFactory("quote", "id");
        Element22.image = createAssetFactory("img");
        Element22.img = createAssetFactory("img");
        Element22.video = createAssetFactory("video");
        Element22.audio = createAssetFactory("audio");
        Element22.file = createAssetFactory("file");
        function i18n(path, children) {
          return Element22("i18n", typeof path === "string" ? { path } : path, children);
        }
        Element22.i18n = i18n;
        __name7(i18n, "i18n");
      })(Element2 || (Element2 = {}));
      module.exports = Element2;
    }
  });
  var lib_default = require_src();

  // ../undios/packages/core/lib/index.js
  var import_cosmokit10 = __toESM(require_lib(), 1);
  var __defProp9 = Object.defineProperty;
  var __name8 = (target, value) => __defProp9(target, "name", { value, configurable: true });
  var _a15;
  var WebSocket2 = (_a15 = class extends EventTarget {
    constructor(url, config) {
      super();
      __publicField(this, "ws");
      __publicField(this, "_connected", false);
      __publicField(this, "_closed", true);
      __publicField(this, "closeFunction");
      __publicField(this, "timeout");
      this.url = url;
      this.timeout = config?.timeout ?? 3e3;
      this.connect().catch((e) => {
        this.closeAndReset();
        this.dispatchClose(1006, e.message);
      });
    }
    get protocol() {
      return this.url.split("://")[0];
    }
    get readyState() {
      if (this._closed)
        return this._connected ? 2 : 3;
      return this._connected ? 1 : 0;
    }
    dispatchEvent(event) {
      return super.dispatchEvent(event);
    }
    dispatchOpen() {
      this.dispatchEvent(new Event("open"));
    }
    dispatchError(message) {
      const ev = new Event("error");
      ev.message = message;
      this.dispatchEvent(ev);
    }
    dispatchClose(code, reason) {
      const ev = new Event("close");
      ev.code = code;
      ev.reason = reason;
      this.dispatchEvent(ev);
    }
    dispatchMessage(data) {
      const ev = new Event("message");
      ev.data = data;
      this.dispatchEvent(ev);
    }
    // @ts-ignore
    addEventListener(type2, listener) {
      super.addEventListener(type2, listener);
    }
    // @ts-ignore
    removeEventListener(type2, listener) {
      super.removeEventListener(type2, listener);
    }
    async connect() {
      if (this.ws) {
        this.ws.shutdown();
        this.ws.close();
      }
      this._closed = false;
      this.ws = new WSClient();
      await new Promise((resolve, reject) => {
        const timeoutFunc = /* @__PURE__ */ __name8(() => reject(new Error("Connection timeout")), "timeoutFunc");
        const timer = setTimeout(timeoutFunc, this.timeout);
        const connected = /* @__PURE__ */ __name8(() => {
          if (timer)
            clearInterval(timer);
          resolve(true);
        }, "connected");
        const fail = /* @__PURE__ */ __name8(() => {
          if (timer)
            clearInterval(timer);
          reject(new Error("Failed to connect"));
        }, "fail");
        const okPre = this.ws.connectAsync(this.url, (ok) => {
          if (ok)
            connected();
          else
            fail();
        });
        if (!okPre)
          fail();
      });
      this._connected = true;
      this.dispatchOpen();
      this.ws.listen("onTextReceived", (data) => this.dispatchMessage(data));
      this.ws.listen(
        "onBinaryReceived",
        () => this.dispatchError(`Unexpected binary data received from ${this.url}`)
      );
      this.ws.listen("onError", (msg) => this.dispatchError(msg));
      this.ws.listen("onLostConnection", (code) => {
        this.closeAndReset();
        this.dispatchClose(code, "Lost connection");
      });
    }
    closeAndReset() {
      if (this.ws) {
        this.ws.close();
        this.ws.shutdown();
        this.ws = void 0;
      }
      this._connected = false;
      this._closed = true;
    }
    close(code, reason) {
      this.closeAndReset();
      this.dispatchClose(code ?? 1e3, reason ?? "Connection closed");
    }
    send(data) {
      this.ws?.send(data);
    }
  }, __name8(_a15, "WebSocket"), _a15);
  var kHTTPError = Symbol.for("undios.error");
  var _a16, _b3;
  var HTTPError = (_b3 = class extends Error {
    constructor() {
      super(...arguments);
      __publicField(this, _a16, true);
      __publicField(this, "response");
    }
    static fromResp(response) {
      const error = new this(`Request failed with status code ${response.status}`);
      error.response = response;
      return error;
    }
    static is(error) {
      return !!error?.[kHTTPError];
    }
  }, _a16 = kHTTPError, __name8(_b3, "HTTPError"), _b3);
  var _a17, _b4, _c;
  var HTTP = (_a17 = class extends Service22 {
    constructor(...args) {
      super(args[0], args[1]);
      __publicField(this, "_decoders", /* @__PURE__ */ Object.create(null));
      this.decoder("json", (raw) => JSON.parse(raw));
      this.decoder("text", (raw) => raw);
    }
    decoder(type2, decoder) {
      return this[Context22.current].effect(() => {
        this._decoders[type2] = decoder;
        return () => delete this._decoders[type2];
      });
    }
    extend(config = {}) {
      return this[Service22.extend]({
        config: _a17.mergeConfig(this.config, config)
      });
    }
    resolveConfig(init) {
      const caller = this[Context22.current];
      let result = { headers: {}, ...this.config };
      caller.emit("http/config", result);
      let intercept = caller[Context22.intercept];
      while (intercept) {
        result = _a17.mergeConfig(result, intercept.http);
        intercept = Object.getPrototypeOf(intercept);
      }
      result = _a17.mergeConfig(result, init);
      return result;
    }
    resolveURL(url, config) {
      if (config.baseURL) {
        url = `${(0, import_cosmokit10.trimSlash)(config.baseURL)}/${url.replace(/^\/+/g, "")}`;
      }
      if (config.params) {
        const params = Object.entries(config.params).map(
          ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
        ).join("&");
        url = `${url}${url.includes("?") ? "&" : "?"}${params}`;
      }
      return url;
    }
    async [(_b4 = Service22.provide, _c = Service22.immediate, Service22.invoke)](...args) {
      const caller = this[Context22.current];
      let method;
      if (typeof args[1] === "string") {
        method = args.shift();
      }
      const config = this.resolveConfig(args[1]);
      const url = this.resolveURL(args[0], config);
      method ?? (method = config.method ?? "GET");
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
        caller.emit("http/fetch-init", init.url, init, config);
        const rawResp = await this.fetch(init);
        const validateStatus = config.validateStatus ?? ((status) => Math.floor(status / 100) === 2);
        if (!validateStatus(rawResp.status)) {
          const error = _a17.Error.fromResp(rawResp);
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
        case "GET": {
          return new Promise((resolve) => {
            network.httpGet(init.url, init.headers, (status, result) => {
              resolve({ url: init.url, status, data: result });
            });
          });
        }
        case "post":
        case "POST": {
          return new Promise((resolve) => {
            network.httpPost(
              init.url,
              init.headers,
              init.data,
              init.headers["Content-Type"] ?? "text/plain",
              (status, result) => {
                resolve({ url: init.url, status, data: result });
              }
            );
          });
        }
      }
    }
    ws(url, init) {
      if (init?.headers)
        this.ctx.logger.warn("headers is not supported in ws");
      const caller = this[Context22.current];
      const config = this.resolveConfig(init);
      url = this.resolveURL(url, config);
      init = {
        timeout: config.timeout
      };
      caller.emit("http/websocket-init", url, init, config);
      const socket = new WebSocket2(url, init);
      const dispose = caller.on("dispose", () => {
        socket.close(1001, "context disposed");
      });
      socket.addEventListener("close", () => {
        dispose();
      });
      return socket;
    }
  }, __name8(_a17, "HTTP"), __publicField(_a17, "Error", HTTPError), __publicField(_a17, _b4, "http"), __publicField(_a17, _c, true), (() => {
    for (const method of ["get"]) {
      (0, import_cosmokit10.defineProperty)(
        _a17.prototype,
        method,
        async function(url, config) {
          const response = await this(url, { method, ...config });
          return response.data;
        }
      );
    }
    for (const method of ["post"]) {
      (0, import_cosmokit10.defineProperty)(
        _a17.prototype,
        method,
        async function(url, data, config) {
          const response = await this(url, { method, data, ...config });
          return response.data;
        }
      );
    }
  })(), __publicField(_a17, "mergeConfig", (target, source) => ({
    ...target,
    ...source,
    headers: {
      ...target?.headers,
      ...source?.headers
    }
  })), _a17);

  // ../satori/packages/core/lib/index.mjs
  var import_cosmokit13 = __toESM(require_lib(), 1);
  var import_cosmokit14 = __toESM(require_lib(), 1);
  var __defProp10 = Object.defineProperty;
  var __name9 = (target, value) => __defProp10(target, "name", { value, configurable: true });
  var _a18;
  var Session = (_a18 = class {
    constructor(bot, event) {
      __publicField(this, "id");
      __publicField(this, "bot");
      __publicField(this, "app");
      __publicField(this, "event");
      __publicField(this, "locales", []);
      event.selfId ?? (event.selfId = bot.selfId);
      event.platform ?? (event.platform = bot.platform);
      event.timestamp ?? (event.timestamp = Date.now());
      this.event = event;
      this.id = ++_a18.counter;
      (0, import_cosmokit12.defineProperty)(this, "bot", bot);
      (0, import_cosmokit12.defineProperty)(this, "app", bot.ctx.root);
      (0, import_cosmokit12.defineProperty)(this, Context3.current, bot.ctx);
      return Context3.associate(this, "session");
    }
    /** @deprecated */
    get data() {
      return this.event;
    }
    get isDirect() {
      return this.event.channel.type === Channel.Type.DIRECT;
    }
    set isDirect(value) {
      var _a25;
      ((_a25 = this.event).channel ?? (_a25.channel = {})).type = value ? Channel.Type.DIRECT : Channel.Type.TEXT;
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
      var _a25;
      (_a25 = this.event).message ?? (_a25.message = {});
      this.event.message.elements = value;
    }
    get content() {
      return this.event.message?.elements?.join("");
    }
    set content(value) {
      var _a25;
      ((_a25 = this.event).message ?? (_a25.message = {})).elements = (0, import_cosmokit12.isNullable)(value) ? value : lib_default.parse(value);
    }
    setInternal(type2, data) {
      this.event._type = type2;
      this.event._data = data;
      const internal = Object.create(this.bot.internal);
      (0, import_cosmokit12.defineProperty)(this, type2, Object.assign(internal, data));
    }
    async transform(elements) {
      return await lib_default.transformAsync(elements, ({ type: type2, attrs, children }, session) => {
        const render = type2 === "component" ? attrs.is : this.app.get("component:" + type2);
        return render?.(attrs, children, session) ?? true;
      }, this);
    }
    toJSON() {
      return { ...this.event, id: this.id };
    }
  }, __name9(_a18, "Session"), __publicField(_a18, "counter", 0), _a18);
  function defineAccessor(prototype, name2, keys) {
    Object.defineProperty(prototype, name2, {
      get() {
        return keys.reduce((data, key) => data?.[key], this);
      },
      set(value) {
        if (value === void 0)
          return;
        const _keys = keys.slice();
        const last = _keys.pop();
        const data = _keys.reduce((data2, key) => data2[key] ?? (data2[key] = {}), this);
        data[last] = value;
      }
    });
  }
  __name9(defineAccessor, "defineAccessor");
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
  var eventAliases = [
    ["message-created", "message"]
  ];
  var _a19;
  var Bot = (_a19 = class {
    constructor(ctx, config, platform) {
      __publicField(this, "user", {});
      __publicField(this, "isBot", true);
      __publicField(this, "hidden", false);
      __publicField(this, "platform");
      __publicField(this, "adapter");
      __publicField(this, "error");
      __publicField(this, "callbacks", {});
      __publicField(this, "logger");
      // Same as `this.ctx`, but with a more specific type.
      __publicField(this, "context");
      __publicField(this, "_status", Status.OFFLINE);
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
      ctx.on("interaction/button", (session) => {
        const cb = this.callbacks[session.event.button.id];
        if (cb)
          cb(session);
      });
    }
    update(login) {
      const { status, ...rest } = login;
      Object.assign(this, rest);
      this.status = status;
    }
    dispose() {
      (0, import_cosmokit13.remove)(this.ctx.bots, this);
      this.context.emit("bot-removed", this);
      this.dispatchLoginEvent("login-removed");
      return this.stop();
    }
    dispatchLoginEvent(type2) {
      const session = this.session();
      session.type = type2;
      session.event.login = this.toJSON();
      this.dispatch(session);
    }
    get status() {
      return this._status;
    }
    set status(value) {
      if (value === this._status)
        return;
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
      if (this.isActive)
        return;
      this.status = Status.CONNECT;
      try {
        await this.context.parallel("bot-connect", this);
        await this.adapter?.connect(this);
      } catch (error) {
        this.offline(error);
      }
    }
    async stop() {
      if (!this.isActive)
        return;
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
      const { Session: Session2 } = this.ctx.constructor;
      return new Session2(this, event);
    }
    dispatch(session) {
      if (!this.ctx.lifecycle.isActive)
        return;
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
      const { MessageEncoder: MessageEncoder2 } = this.constructor;
      return new MessageEncoder2(this, channelId, guildId, options).send(content);
    }
    async sendMessage(channelId, content, guildId, options) {
      const messages = await this.createMessage(channelId, content, guildId, options);
      return messages.map((message) => message.id);
    }
    async sendPrivateMessage(userId, content, guildId, options) {
      const { id } = await this.createDirectChannel(userId, guildId ?? options?.session?.guildId);
      return this.sendMessage(id, content, null, options);
    }
    async supports(name2, session = {}) {
      return !!this[Methods[name2]?.name];
    }
    async checkPermission(name2, session) {
      if (name2.startsWith("bot.")) {
        return this.supports(name2.slice(4), session);
      }
    }
    toJSON() {
      return (0, import_cosmokit13.clone)((0, import_cosmokit13.pick)(this, ["platform", "selfId", "status", "user", "hidden"]));
    }
    async getLogin() {
      return this.toJSON();
    }
    /** @deprecated use `bot.getLogin()` instead */
    async getSelf() {
      const { user } = await this.getLogin();
      return user;
    }
  }, __name9(_a19, "Bot"), __publicField(_a19, "reusable", true), __publicField(_a19, "MessageEncoder"), _a19);
  var iterableMethods = [
    "getMessage",
    "getReaction",
    "getFriend",
    "getGuild",
    "getGuildMember",
    "getGuildRole",
    "getChannel"
  ];
  for (const name2 of iterableMethods) {
    Bot.prototype[name2 + "Iter"] = function(...args) {
      let list;
      if (!this[name2 + "List"])
        throw new Error(`not implemented: ${name2}List`);
      const getList = /* @__PURE__ */ __name9(async () => {
        list = await this[name2 + "List"](...args, list?.next);
      }, "getList");
      return {
        async next() {
          if (list?.data.length)
            return { done: false, value: list.data.shift() };
          if (list && !list?.next)
            return { done: true, value: void 0 };
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
  var _a20;
  var Adapter = (_a20 = class {
    constructor(ctx) {
      __publicField(this, "bots", []);
      this.ctx = ctx;
    }
    async connect(bot) {
    }
    async disconnect(bot) {
    }
    fork(ctx, bot) {
      bot.adapter = this;
      this.bots.push(bot);
      ctx.on("dispose", () => {
        (0, import_cosmokit14.remove)(this.bots, bot);
      });
    }
  }, __name9(_a20, "Adapter"), __publicField(_a20, "schema", false), _a20);
  ((Adapter2) => {
    Adapter2.WsClientConfig = import_schemastery.default.object({
      retryTimes: import_schemastery.default.natural().description("\u521D\u6B21\u8FDE\u63A5\u65F6\u7684\u6700\u5927\u91CD\u8BD5\u6B21\u6570\u3002").default(6),
      retryInterval: import_schemastery.default.natural().role("ms").description("\u521D\u6B21\u8FDE\u63A5\u65F6\u7684\u91CD\u8BD5\u65F6\u95F4\u95F4\u9694\u3002").default(5 * import_cosmokit14.Time.second),
      retryLazy: import_schemastery.default.natural().role("ms").description("\u8FDE\u63A5\u5173\u95ED\u540E\u7684\u91CD\u8BD5\u65F6\u95F4\u95F4\u9694\u3002").default(import_cosmokit14.Time.minute)
    }).description("\u8FDE\u63A5\u8BBE\u7F6E");
    const _WsClientBase = class _WsClientBase extends Adapter2 {
      constructor(ctx, config) {
        super(ctx);
        __publicField(this, "socket");
        this.config = config;
      }
      async start() {
        let _retryCount = 0;
        const logger2 = this.ctx.logger("adapter");
        const { retryTimes, retryInterval, retryLazy } = this.config;
        const reconnect = /* @__PURE__ */ __name9(async (initial = false) => {
          logger2.debug("websocket client opening");
          const socket = await this.prepare();
          const url = socket.url.replace(/\?.+/, "");
          socket.addEventListener("error", (event) => {
            if (event.message)
              logger2.warn(event.message);
          });
          socket.addEventListener("close", ({ code, reason }) => {
            this.socket = null;
            logger2.debug(`websocket closed with ${code}`);
            if (!this.getActive())
              return;
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
            logger2.warn(`${message}, will retry in ${import_cosmokit14.Time.format(timeout)}...`);
            setTimeout(() => {
              if (this.getActive())
                reconnect();
            }, timeout);
          });
          socket.addEventListener("open", () => {
            _retryCount = 0;
            this.socket = socket;
            logger2.info("connect to server: %c", url);
            this.accept(socket);
          });
        }, "reconnect");
        reconnect(true);
      }
      async stop() {
        this.socket?.close();
      }
    };
    __name9(_WsClientBase, "WsClientBase");
    let WsClientBase = _WsClientBase;
    Adapter2.WsClientBase = WsClientBase;
    const _WsClient = class _WsClient extends WsClientBase {
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
    };
    __name9(_WsClient, "WsClient");
    __publicField(_WsClient, "reusable", true);
    let WsClient = _WsClient;
    Adapter2.WsClient = WsClient;
  })(Adapter || (Adapter = {}));
  var _a21;
  var AggregateError = (_a21 = class extends Error {
    constructor(errors, message = "") {
      super(message);
      this.errors = errors;
    }
  }, __name9(_a21, "AggregateError"), _a21);
  var _a22;
  var MessageEncoder = (_a22 = class {
    constructor(bot, channelId, guildId, options = {}) {
      __publicField(this, "errors", []);
      __publicField(this, "results", []);
      __publicField(this, "session");
      this.bot = bot;
      this.channelId = channelId;
      this.guildId = guildId;
      this.options = options;
    }
    async prepare() {
    }
    async render(elements, flush) {
      for (const element of elements) {
        await this.visit(element);
      }
      if (flush) {
        await this.flush();
      }
    }
    async send(content) {
      var _a25;
      this.session = this.bot.session({
        type: "send",
        channel: { id: this.channelId, ...this.options.session?.event.channel },
        guild: this.options.session?.event.guild
      });
      for (const key in this.options.session || {}) {
        if (key === "id" || key === "event")
          continue;
        this.session[key] = this.options.session[key];
      }
      await this.prepare();
      const session = this.options.session ?? this.session;
      this.session.elements = await session.transform(lib_default.normalize(content));
      const btns = lib_default.select(this.session.elements, "button").filter((v) => v.attrs.type !== "link" && !v.attrs.id);
      for (const btn of btns) {
        const r = Math.random().toString(36).slice(2);
        (_a25 = btn.attrs).id || (_a25.id = r);
        if (typeof btn.attrs.action === "function")
          this.bot.callbacks[btn.attrs.id] = btn.attrs.action;
      }
      if (await this.session.app.serial(this.session, "before-send", this.session, this.options))
        return;
      await this.render(this.session.elements);
      await this.flush();
      if (this.errors.length) {
        throw new AggregateError(this.errors);
      } else {
        return this.results;
      }
    }
  }, __name9(_a22, "MessageEncoder"), _a22);
  lib_default.warn = new import_levi_reggol.default("element").warn;
  (0, import_cosmokit11.defineProperty)(HTTP, "Config", import_schemastery.default.object({
    timeout: import_schemastery.default.natural().role("ms").description("\u7B49\u5F85\u8FDE\u63A5\u5EFA\u7ACB\u7684\u6700\u957F\u65F6\u95F4\u3002")
  }).description("\u8BF7\u6C42\u8BBE\u7F6E"));
  HTTP.createConfig = /* @__PURE__ */ __name9(function createConfig(endpoint) {
    return import_schemastery.default.object({
      baseURL: import_schemastery.default.string().role("link").description("\u8981\u8FDE\u63A5\u7684\u670D\u52A1\u5668\u5730\u5740\u3002").default(typeof endpoint === "string" ? endpoint : null).required(typeof endpoint === "boolean" ? endpoint : false),
      headers: import_schemastery.default.dict(String).role("table").description("\u8981\u9644\u52A0\u7684\u989D\u5916\u8BF7\u6C42\u5934\u3002"),
      ...this.Config.dict
    }).description("\u8BF7\u6C42\u8BBE\u7F6E");
  }, "createConfig");
  var _a23;
  var Context3 = (_a23 = class extends Context22 {
    constructor(config = {}) {
      super(config);
      __publicField(this, "bots", new Proxy([], {
        get(target, prop) {
          if (prop in target || typeof prop === "symbol") {
            return Reflect.get(target, prop);
          }
          return target.find((bot) => bot.sid === prop);
        },
        deleteProperty(target, prop) {
          if (prop in target || typeof prop === "symbol") {
            return Reflect.deleteProperty(target, prop);
          }
          const bot = target.findIndex((bot2) => bot2.sid === prop);
          if (bot < 0)
            return true;
          target.splice(bot, 1);
          return true;
        }
      }));
      this.provide("http", void 0, true);
      this.plugin(HTTP, config.request);
    }
    component(name2, component, options = {}) {
      const render = /* @__PURE__ */ __name9(async (attrs, children, session) => {
        if (options.session && session.type === "send") {
          throw new Error("interactive components is not available outside sessions");
        }
        const result = await component(attrs, children, session);
        return session.transform(lib_default.normalize(result));
      }, "render");
      const service = "component:" + name2;
      this.provide(service);
      return this.effect(() => {
        this[service] = render;
        return () => this[service] = null;
      });
    }
  }, __name9(_a23, "Context"), __publicField(_a23, "session", Symbol("session")), // remove generic type to loosen the constraint
  __publicField(_a23, "Session", Session), _a23);
  ((Context32) => {
    Context32.Config = import_schemastery.default.intersect([
      import_schemastery.default.object({})
    ]);
  })(Context3 || (Context3 = {}));
  var _a24;
  var Service23 = (_a24 = class extends Service22 {
    [Service22.setup]() {
      this.ctx = new Context3();
    }
  }, __name9(_a24, "Service"), _a24);

  // ../satori/packages/satori/lib/index.mjs
  __reExport(lib_exports4, __toESM(require_lib(), 1));

  // src/loader.ts
  var import_cosmokit15 = __toESM(require_lib());

  // src/logger.ts
  var logger_exports = {};
  __export(logger_exports, {
    apply: () => apply,
    inject: () => inject
  });
  var inject = ["loader"];
  function apply(ctx, config = {}) {
    ctx.on("loader/entry", (type2, entry) => {
      ctx.logger("loader").info("%s plugin %c", type2, entry.options.name);
    });
    ctx.loader.prolog = [];
    import_levi_reggol.default.targets.push({
      colors: 3,
      record: (record) => {
        ctx.loader.prolog.push(record);
        ctx.loader.prolog = ctx.loader.prolog.slice(-1e3);
      }
    });
    const { levels } = config;
    if (typeof levels === "object") {
      import_levi_reggol.default.levels = levels;
    } else if (typeof levels === "number") {
      import_levi_reggol.default.levels.base = levels;
    }
    let { showTime } = config;
    if (showTime === true)
      showTime = "yyyy-MM-dd hh:mm:ss";
    if (showTime)
      import_levi_reggol.default.targets[0].showTime = showTime;
    import_levi_reggol.default.targets[0].showDiff = config.showDiff;
    function ensureBaseLevel(conf, base) {
      conf.base ?? (conf.base = base);
      Object.values(config).forEach((value) => {
        if (typeof value !== "object")
          return;
        ensureBaseLevel(value, conf.base);
      });
    }
    ensureBaseLevel(import_levi_reggol.default.levels, 2);
    import_levi_reggol.default.targets[0].timestamp = Date.now();
  }

  // src/loader.ts
  var Loader2 = class extends Loader {
    async import(name2) {
      if (this.options.importMapping && name2 in this.options.importMapping) {
        return this.options.importMapping[name2];
      }
      const base = (0, import_cosmokit15.trimSlash)(
        this.options.requireBase ?? this.options.baseDir ?? ""
      );
      try {
        return __require(`${base}/${name2}`);
      } catch (err) {
        this.app.emit("internal/error", err);
      }
      return void 0;
    }
  };
  async function start(options) {
    const ctx = new Context3();
    ctx.plugin(Loader2, options);
    await ctx.loader.init();
    const config = await ctx.loader.readConfig();
    ctx.plugin(logger_exports, config.logger ?? {});
    await ctx.start();
  }

  // src/index.ts
  __reExport(src_exports, lib_exports4);
  __reExport(src_exports, __toESM(require_lib13()));
  __reExport(src_exports, __toESM(require_lib()));
  var name = "LeviSatori";
  var baseDir = `./plugins/${name}`;
  var pluginBaseDir = `./plugins/${name}/plugins`;
  var requireBase = `./${name}/plugins`;
  var configPath = `${baseDir}/${name}.yml`;
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
      importMapping: { "adapter-satori": import_adapter_satori.default }
    }).catch((e) => new import_levi_reggol2.default("app").info(e));
  });
  return __toCommonJS(src_exports);
})();
/*! Bundled license information:

js-yaml/dist/js-yaml.mjs:
  (*! js-yaml 4.1.0 https://github.com/nodeca/js-yaml @license MIT *)
*/
;globalThis.LeviSatori = LeviSatori;