(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.LeviSatori = {}));
})(this, (function (exports) { 'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function getAugmentedNamespace(n) {
	  if (n.__esModule) return n;
	  var f = n.default;
		if (typeof f == "function") {
			var a = function a () {
				if (this instanceof a) {
	        return Reflect.construct(f, arguments, this.constructor);
				}
				return f.apply(this, arguments);
			};
			a.prototype = f.prototype;
	  } else a = {};
	  Object.defineProperty(a, '__esModule', {value: true});
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

	const root =
	  (typeof globalThis !== "undefined" && globalThis) ||
	  (typeof self !== "undefined" && self) ||
	  (typeof commonjsGlobal !== "undefined" && commonjsGlobal);

	const shouldPolyfillEvent = (function() {
	  try {
	    new root.Event("");
	  } catch (error) {
	    return true;
	  }
	  return false;
	})();

	const shouldPolyfillEventTarget = (function() {
	  try {
	    new root.EventTarget();
	  } catch (error) {
	    return true;
	  }
	  return false;
	})();

	if (shouldPolyfillEvent) {
	  root.Event = (function () {
	    function Event(type, options) {
	        this.bubbles = !!options && !!options.bubbles;
	        this.cancelable = !!options && !!options.cancelable;
	        this.composed = !!options && !!options.composed;
	      this.type = type;
	    }

	    return Event;
	  })();
	}

	if (shouldPolyfillEventTarget) {
	  root.EventTarget = (function () {
	    function EventTarget() {
	      this.__listeners = new Map();
	    }

	    EventTarget.prototype = Object.create(Object.prototype);

	    EventTarget.prototype.addEventListener = function (
	      type,
	      listener,
	      options
	    ) {
	      if (arguments.length < 2) {
	        throw new TypeError(
	          "TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only " + arguments.length + " present."
	        );
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

	    EventTarget.prototype.removeEventListener = function (
	      type,
	      listener,
	      _options
	    ) {
	      if (arguments.length < 2) {
	        throw new TypeError(
	          "TypeError: Failed to execute 'addEventListener' on 'EventTarget': 2 arguments required, but only " + arguments.length + " present."
	        );
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
	        throw new TypeError(
	          "Failed to execute 'dispatchEvent' on 'EventTarget': parameter 1 is not of type 'Event'."
	        );
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
	  })();
	}

	var __defProp$b = Object.defineProperty;
	var __name$a = (target, value) => __defProp$b(target, "name", { value, configurable: true });

	// packages/cosmokit/src/misc.ts
	function noop() {
	}
	__name$a(noop, "noop");
	function isNullable(value) {
	  return value === null || value === void 0;
	}
	__name$a(isNullable, "isNullable");
	function isPlainObject(data) {
	  return data && typeof data === "object" && !Array.isArray(data);
	}
	__name$a(isPlainObject, "isPlainObject");
	function filterKeys(object, filter) {
	  return Object.fromEntries(Object.entries(object).filter(([key, value]) => filter(key, value)));
	}
	__name$a(filterKeys, "filterKeys");
	function mapValues(object, transform) {
	  return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
	}
	__name$a(mapValues, "mapValues");
	function is(type, value) {
	  if (arguments.length === 1)
	    return (value2) => is(type, value2);
	  return type in globalThis && value instanceof globalThis[type] || Object.prototype.toString.call(value).slice(8, -1) === type;
	}
	__name$a(is, "is");
	function clone(source) {
	  if (!source || typeof source !== "object")
	    return source;
	  if (Array.isArray(source))
	    return source.map(clone);
	  if (is("Date", source))
	    return new Date(source.valueOf());
	  if (is("RegExp", source))
	    return new RegExp(source.source, source.flags);
	  return mapValues(source, clone);
	}
	__name$a(clone, "clone");
	function deepEqual(a, b, strict) {
	  if (a === b)
	    return true;
	  if (!strict && isNullable(a) && isNullable(b))
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
	  __name$a(check, "check");
	  return check(Array.isArray, (a2, b2) => a2.length === b2.length && a2.every((item, index) => deepEqual(item, b2[index]))) ?? check(is("Date"), (a2, b2) => a2.valueOf() === b2.valueOf()) ?? check(is("RegExp"), (a2, b2) => a2.source === b2.source && a2.flags === b2.flags) ?? Object.keys({ ...a, ...b }).every((key) => deepEqual(a[key], b[key], strict));
	}
	__name$a(deepEqual, "deepEqual");
	function pick(source, keys, forced) {
	  if (!keys)
	    return { ...source };
	  const result = {};
	  for (const key of keys) {
	    if (forced || source[key] !== void 0)
	      result[key] = source[key];
	  }
	  return result;
	}
	__name$a(pick, "pick");
	function omit(source, keys) {
	  if (!keys)
	    return { ...source };
	  const result = { ...source };
	  for (const key of keys) {
	    Reflect.deleteProperty(result, key);
	  }
	  return result;
	}
	__name$a(omit, "omit");
	function defineProperty(object, key, value) {
	  return Object.defineProperty(object, key, { writable: true, value, enumerable: false });
	}
	__name$a(defineProperty, "defineProperty");

	// packages/cosmokit/src/array.ts
	function contain(array1, array2) {
	  return array2.every((item) => array1.includes(item));
	}
	__name$a(contain, "contain");
	function intersection(array1, array2) {
	  return array1.filter((item) => array2.includes(item));
	}
	__name$a(intersection, "intersection");
	function difference(array1, array2) {
	  return array1.filter((item) => !array2.includes(item));
	}
	__name$a(difference, "difference");
	function union(array1, array2) {
	  return Array.from(/* @__PURE__ */ new Set([...array1, ...array2]));
	}
	__name$a(union, "union");
	function deduplicate(array) {
	  return [...new Set(array)];
	}
	__name$a(deduplicate, "deduplicate");
	function remove(list, item) {
	  const index = list.indexOf(item);
	  if (index >= 0) {
	    list.splice(index, 1);
	    return true;
	  } else {
	    return false;
	  }
	}
	__name$a(remove, "remove");
	function makeArray(source) {
	  return Array.isArray(source) ? source : isNullable(source) ? [] : [source];
	}
	__name$a(makeArray, "makeArray");

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
	__name$a(arrayBufferToBase64, "arrayBufferToBase64");
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
	__name$a(base64ToArrayBuffer, "base64ToArrayBuffer");

	// packages/cosmokit/src/string.ts
	function capitalize(source) {
	  return source.charAt(0).toUpperCase() + source.slice(1);
	}
	__name$a(capitalize, "capitalize");
	function uncapitalize(source) {
	  return source.charAt(0).toLowerCase() + source.slice(1);
	}
	__name$a(uncapitalize, "uncapitalize");
	function camelCase(source) {
	  return source.replace(/[_-][a-z]/g, (str) => str.slice(1).toUpperCase());
	}
	__name$a(camelCase, "camelCase");
	function paramCase(source) {
	  return uncapitalize(source).replace(/_/g, "-").replace(/.[A-Z]+/g, (str) => str[0] + "-" + str.slice(1).toLowerCase());
	}
	__name$a(paramCase, "paramCase");
	function snakeCase(source) {
	  return uncapitalize(source).replace(/-/g, "_").replace(/.[A-Z]+/g, (str) => str[0] + "_" + str.slice(1).toLowerCase());
	}
	__name$a(snakeCase, "snakeCase");
	var camelize = camelCase;
	var hyphenate = paramCase;
	function trimSlash(source) {
	  return source.replace(/\/$/, "");
	}
	__name$a(trimSlash, "trimSlash");
	function sanitize(source) {
	  if (!source.startsWith("/"))
	    source = "/" + source;
	  return trimSlash(source);
	}
	__name$a(sanitize, "sanitize");

	// packages/cosmokit/src/time.ts
	exports.Time = void 0;
	((Time2) => {
	  Time2.millisecond = 1;
	  Time2.second = 1e3;
	  Time2.minute = Time2.second * 60;
	  Time2.hour = Time2.minute * 60;
	  Time2.day = Time2.hour * 24;
	  Time2.week = Time2.day * 7;
	  let timezoneOffset = (/* @__PURE__ */ new Date()).getTimezoneOffset();
	  function setTimezoneOffset(offset) {
	    timezoneOffset = offset;
	  }
	  Time2.setTimezoneOffset = setTimezoneOffset;
	  __name$a(setTimezoneOffset, "setTimezoneOffset");
	  function getTimezoneOffset() {
	    return timezoneOffset;
	  }
	  Time2.getTimezoneOffset = getTimezoneOffset;
	  __name$a(getTimezoneOffset, "getTimezoneOffset");
	  function getDateNumber(date = /* @__PURE__ */ new Date(), offset) {
	    if (typeof date === "number")
	      date = new Date(date);
	    if (offset === void 0)
	      offset = timezoneOffset;
	    return Math.floor((date.valueOf() / Time2.minute - offset) / 1440);
	  }
	  Time2.getDateNumber = getDateNumber;
	  __name$a(getDateNumber, "getDateNumber");
	  function fromDateNumber(value, offset) {
	    const date = new Date(value * Time2.day);
	    if (offset === void 0)
	      offset = timezoneOffset;
	    return new Date(+date + offset * Time2.minute);
	  }
	  Time2.fromDateNumber = fromDateNumber;
	  __name$a(fromDateNumber, "fromDateNumber");
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
	    return (parseFloat(capture[1]) * Time2.week || 0) + (parseFloat(capture[2]) * Time2.day || 0) + (parseFloat(capture[3]) * Time2.hour || 0) + (parseFloat(capture[4]) * Time2.minute || 0) + (parseFloat(capture[5]) * Time2.second || 0);
	  }
	  Time2.parseTime = parseTime;
	  __name$a(parseTime, "parseTime");
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
	  Time2.parseDate = parseDate;
	  __name$a(parseDate, "parseDate");
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
	  __name$a(format, "format");
	  function toDigits(source, length = 2) {
	    return source.toString().padStart(length, "0");
	  }
	  Time2.toDigits = toDigits;
	  __name$a(toDigits, "toDigits");
	  function template(template2, time = /* @__PURE__ */ new Date()) {
	    return template2.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
	  }
	  Time2.template = template;
	  __name$a(template, "template");
	})(exports.Time || (exports.Time = {}));

	var lib$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		get Time () { return exports.Time; },
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

	var __defProp$a = Object.defineProperty;
	var __name$9 = (target, value) => __defProp$a(target, "name", { value, configurable: true });
	function isBailed(value) {
	  return value !== null && value !== false && value !== void 0;
	}
	__name$9(isBailed, "isBailed");
	var Lifecycle = class {
	  constructor(root) {
	    this.root = root;
	    defineProperty(this, Context.trace, root);
	    defineProperty(this.on("internal/listener", function(name, listener, prepend) {
	      const method = prepend ? "unshift" : "push";
	      if (name === "ready") {
	        if (!this.lifecycle.isActive)
	          return;
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
	    }), Context.static, root.scope);
	    for (const level of ["info", "error", "warning"]) {
	      defineProperty(this.on(`internal/${level}`, (format, ...param) => {
	        if (this._hooks[`internal/${level}`].length > 1)
	          return;
	        console.info(format, ...param);
	      }), Context.static, root.scope);
	    }
	  }
	  static {
	    __name$9(this, "Lifecycle");
	  }
	  isActive = false;
	  _tasks = /* @__PURE__ */ new Set();
	  _hooks = {};
	  async flush() {
	    while (this._tasks.size) {
	      await Promise.all(Array.from(this._tasks));
	    }
	  }
	  getHooks(name, thisArg) {
	    const hooks = this._hooks[name] || [];
	    return hooks.slice().filter(([context]) => {
	      const filter = thisArg?.[Context.filter];
	      return !filter || filter.call(thisArg, context);
	    }).map(([, callback]) => callback);
	  }
	  prepareEvent(type, args) {
	    const thisArg = typeof args[0] === "object" ? args.shift() : null;
	    const name = args.shift();
	    if (name !== "internal/event") {
	      this.emit("internal/event", type, name, args, thisArg);
	    }
	    return [this.getHooks(name, thisArg), thisArg ?? this[Context.trace]];
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
	    const caller = this[Context.trace];
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
	    const caller = this[Context.trace];
	    caller.scope.assertActive();
	    const result = this.bail(caller, "internal/listener", name, listener, prepend);
	    if (result)
	      return result;
	    const hooks = this._hooks[name] ||= [];
	    const label = typeof name === "string" ? `event <${name}>` : "event (Symbol)";
	    return this.register(label, hooks, listener, prepend);
	  }
	  once(name, listener, prepend = false) {
	    const dispose = this.on(name, function(...args) {
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
	};
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
	  if (!func.prototype)
	    return false;
	  if (func.prototype.constructor !== func)
	    return false;
	  return true;
	}
	__name$9(isConstructor, "isConstructor");
	function resolveConfig(plugin, config) {
	  const schema = plugin["Config"] || plugin["schema"];
	  if (schema && plugin["schema"] !== false)
	    config = schema(config);
	  return config ?? {};
	}
	__name$9(resolveConfig, "resolveConfig");
	function isUnproxyable(value) {
	  return [Map, Set, Date, Promise].some((constructor) => value instanceof constructor);
	}
	__name$9(isUnproxyable, "isUnproxyable");
	function joinPrototype(proto1, proto2) {
	  if (proto1 === Object.prototype)
	    return proto2;
	  const result = Object.create(joinPrototype(Object.getPrototypeOf(proto1), proto2));
	  for (const key of Reflect.ownKeys(proto1)) {
	    Object.defineProperty(result, key, Object.getOwnPropertyDescriptor(proto1, key));
	  }
	  return result;
	}
	__name$9(joinPrototype, "joinPrototype");
	function createTraceable(ctx, value) {
	  const proxy = new Proxy(value, {
	    get: (target, name, receiver) => {
	      if (name === symbols.trace || name === "caller")
	        return ctx;
	      return Reflect.get(target, name, receiver);
	    },
	    apply: (target, thisArg, args) => {
	      return applyTraceable(proxy, target, thisArg, args);
	    }
	  });
	  return proxy;
	}
	__name$9(createTraceable, "createTraceable");
	function applyTraceable(proxy, value, thisArg, args) {
	  if (!value[symbols.invoke])
	    return Reflect.apply(value, thisArg, args);
	  return value[symbols.invoke].apply(proxy, args);
	}
	__name$9(applyTraceable, "applyTraceable");
	function createCallable(name, proto) {
	  const self = /* @__PURE__ */ __name$9(function(...args) {
	    const proxy = createTraceable(self[symbols.trace], self);
	    return applyTraceable(proxy, self, this, args);
	  }, "self");
	  defineProperty(self, "name", name);
	  return Object.setPrototypeOf(self, proto);
	}
	__name$9(createCallable, "createCallable");

	// src/scope.ts
	var ScopeStatus = /* @__PURE__ */ ((ScopeStatus2) => {
	  ScopeStatus2[ScopeStatus2["PENDING"] = 0] = "PENDING";
	  ScopeStatus2[ScopeStatus2["LOADING"] = 1] = "LOADING";
	  ScopeStatus2[ScopeStatus2["ACTIVE"] = 2] = "ACTIVE";
	  ScopeStatus2[ScopeStatus2["FAILED"] = 3] = "FAILED";
	  ScopeStatus2[ScopeStatus2["DISPOSED"] = 4] = "DISPOSED";
	  return ScopeStatus2;
	})(ScopeStatus || {});
	exports.CordisError = class _CordisError extends Error {
	  constructor(code, message) {
	    super(message ?? _CordisError.Code[code]);
	    this.code = code;
	  }
	  static {
	    __name$9(this, "CordisError");
	  }
	};
	((CordisError2) => {
	  CordisError2.Code = {
	    INACTIVE_EFFECT: "cannot create effect on inactive context"
	  };
	})(exports.CordisError || (exports.CordisError = {}));
	var EffectScope = class {
	  constructor(parent, config) {
	    this.parent = parent;
	    this.config = config;
	    this.uid = parent.registry ? parent.registry.counter : 0;
	    this.ctx = this.context = parent.extend({ scope: this });
	    this.proxy = new Proxy({}, {
	      get: (target, key) => Reflect.get(this.config, key)
	    });
	  }
	  static {
	    __name$9(this, "EffectScope");
	  }
	  uid;
	  ctx;
	  disposables = [];
	  error;
	  status = 0 /* PENDING */;
	  isActive = false;
	  // Same as `this.ctx`, but with a more specific type.
	  context;
	  proxy;
	  acceptors = [];
	  tasks = /* @__PURE__ */ new Set();
	  hasError = false;
	  get _config() {
	    return this.runtime.isReactive ? this.proxy : this.config;
	  }
	  assertActive() {
	    if (this.uid !== null || this.isActive)
	      return;
	    throw new exports.CordisError("INACTIVE_EFFECT");
	  }
	  effect(callback, config) {
	    this.assertActive();
	    const result = isConstructor(callback) ? new callback(this.ctx, config) : callback(this.ctx, config);
	    let disposed = false;
	    const original = typeof result === "function" ? result : result.dispose.bind(result);
	    const wrapped = /* @__PURE__ */ __name$9(() => {
	      if (disposed)
	        return;
	      disposed = true;
	      remove(this.disposables, wrapped);
	      return original();
	    }, "wrapped");
	    this.disposables.push(wrapped);
	    if (typeof result === "function")
	      return wrapped;
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
	    if (this.uid === null)
	      return 4 /* DISPOSED */;
	    if (this.hasError)
	      return 3 /* FAILED */;
	    if (this.tasks.size)
	      return 1 /* LOADING */;
	    if (this.ready)
	      return 2 /* ACTIVE */;
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
	    defineProperty(this.context.on("internal/before-service", (name) => {
	      if (!this.runtime.using.includes(name))
	        return;
	      this._updateStatus();
	      this.reset();
	    }), Context.static, this);
	    defineProperty(this.context.on("internal/service", (name) => {
	      if (!this.runtime.using.includes(name))
	        return;
	      this.start();
	    }), Context.static, this);
	  }
	  get ready() {
	    return this.runtime.using.every((name) => !isNullable(this.ctx[name]));
	  }
	  reset() {
	    this.isActive = false;
	    this.disposables = this.disposables.splice(0).filter((dispose) => {
	      if (this.uid !== null && dispose[Context.static] === this)
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
	      return () => remove(this.acceptors, acceptor);
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
	    const checkPropertyUpdate = /* @__PURE__ */ __name$9((key) => {
	      const result = modified[key] ??= !deepEqual(this.config[key], resolved[key]);
	      hasUpdate ||= result;
	      return result;
	    }, "checkPropertyUpdate");
	    const ignored = /* @__PURE__ */ new Set();
	    let hasUpdate = false, shouldRestart = false;
	    let fallback = this.runtime.isReactive || null;
	    for (const { keys, callback, passive } of this.acceptors) {
	      if (!keys) {
	        fallback ||= !passive;
	      } else if (passive) {
	        keys?.forEach((key) => ignored.add(key));
	      } else {
	        let hasUpdate2 = false;
	        for (const key of keys) {
	          hasUpdate2 ||= checkPropertyUpdate(key);
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
	          shouldRestart ||= hasUpdate2;
	      }
	    }
	    return [hasUpdate, shouldRestart];
	  }
	};
	var ForkScope = class extends EffectScope {
	  constructor(parent, runtime, config, error) {
	    super(parent, config);
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
	    }), Context.static, runtime);
	    runtime.children.push(this);
	    runtime.disposables.push(this.dispose);
	    this.context.emit("internal/fork", this);
	    if (runtime.isReusable) {
	      this.setupInject();
	    }
	    this.init(error);
	  }
	  static {
	    __name$9(this, "ForkScope");
	  }
	  dispose;
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
	};
	var MainScope = class extends EffectScope {
	  constructor(registry, plugin, config, error) {
	    super(registry[Context.trace], config);
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
	  static {
	    __name$9(this, "MainScope");
	  }
	  value;
	  runtime = this;
	  schema;
	  name;
	  using = [];
	  inject = /* @__PURE__ */ new Set();
	  forkables = [];
	  children = [];
	  isReusable = false;
	  isReactive = false;
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
	    const { name } = this.plugin;
	    if (name && name !== "apply")
	      this.name = name;
	    this.schema = this.plugin["Config"] || this.plugin["schema"];
	    const inject = this.plugin["using"] || this.plugin["inject"] || [];
	    if (Array.isArray(inject)) {
	      this.using = inject;
	      this.inject = new Set(inject);
	    } else {
	      this.using = inject.required || [];
	      this.inject = /* @__PURE__ */ new Set([...this.using, ...inject.optional || []]);
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
	  apply = (context, config) => {
	    if (typeof this.plugin !== "function") {
	      return this.plugin.apply(context, config);
	    } else if (isConstructor(this.plugin)) {
	      const instance = new this.plugin(context, config);
	      const name = instance[Context.expose];
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
	  };
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
	};

	// src/registry.ts
	function isApplicable(object) {
	  return object && typeof object === "object" && typeof object.apply === "function";
	}
	__name$9(isApplicable, "isApplicable");
	var Registry = class {
	  constructor(root, config) {
	    this.root = root;
	    defineProperty(this, Context.trace, root);
	    root.scope = new MainScope(this, null, config);
	    root.scope.runtime.isReactive = true;
	  }
	  static {
	    __name$9(this, "Registry");
	  }
	  _counter = 0;
	  _internal = /* @__PURE__ */ new Map();
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
	  using(inject, callback) {
	    return this.inject(inject, callback);
	  }
	  inject(inject, callback) {
	    return this.plugin({ inject, apply: callback, name: callback.name });
	  }
	  plugin(plugin, config) {
	    this.resolve(plugin);
	    const context = this[Context.trace];
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
	};

	// src/context.ts
	var Context = class _Context {
	  static {
	    __name$9(this, "Context");
	  }
	  static trace = symbols.trace;
	  static events = symbols.events;
	  static static = symbols.static;
	  static filter = symbols.filter;
	  static expose = symbols.expose;
	  static isolate = symbols.isolate;
	  static internal = symbols.internal;
	  static intercept = symbols.intercept;
	  /** @deprecated use `Context.trace` instead */
	  static current = _Context.trace;
	  static is(value) {
	    return !!value?.[_Context.is];
	  }
	  static {
	    _Context.is[Symbol.toPrimitive] = () => Symbol.for("cordis.is");
	    _Context.prototype[_Context.is] = true;
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
	  static handler = {
	    get(target, prop, ctx) {
	      if (typeof prop !== "string")
	        return Reflect.get(target, prop, ctx);
	      const checkInject = /* @__PURE__ */ __name$9((name2) => {
	        if (Reflect.has(target, name2))
	          return;
	        if (["prototype", "then", "registry", "lifecycle"].includes(name2))
	          return;
	        if (name2[0] === "$" || name2[0] === "_")
	          return;
	        if (!ctx.runtime.plugin)
	          return;
	        let parent = ctx;
	        while (parent.runtime.plugin) {
	          for (const key of parent.runtime.inject) {
	            if (name2 === _Context.resolveInject(parent, key)[0])
	              return;
	          }
	          parent = parent.scope.parent;
	        }
	        ctx.emit("internal/warning", new Error(`property ${name2} is not registered, declare it as \`inject\` to suppress this warning`));
	      }, "checkInject");
	      const [name, internal] = _Context.resolveInject(ctx, prop);
	      if (!internal) {
	        checkInject(name);
	        return Reflect.get(target, name, ctx);
	      }
	      if (internal.type === "accessor") {
	        return internal.get.call(ctx);
	      } else if (internal.type === "service") {
	        if (!internal.builtin)
	          checkInject(name);
	        return ctx.get(name);
	      }
	    },
	    set(target, prop, value, ctx) {
	      if (typeof prop !== "string")
	        return Reflect.set(target, prop, value, ctx);
	      const [name, internal] = _Context.resolveInject(ctx, prop);
	      if (!internal)
	        return Reflect.set(target, name, value, ctx);
	      if (internal.type === "accessor") {
	        if (!internal.set)
	          return false;
	        return internal.set.call(ctx, value);
	      }
	      const key = ctx[symbols.isolate][name];
	      const oldValue = ctx.root[key];
	      if (oldValue === value)
	        return true;
	      if (value && oldValue) {
	        throw new Error(`service ${name} has been registered`);
	      }
	      if (value) {
	        ctx.on("dispose", () => ctx[name] = void 0);
	      }
	      if (isUnproxyable(value)) {
	        ctx.emit("internal/warning", new Error(`service ${name} is an unproxyable object, which may lead to unexpected behavior`));
	      }
	      const self = /* @__PURE__ */ Object.create(null);
	      self[symbols.filter] = (ctx2) => {
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
	  };
	  static associate(object, name) {
	    return new Proxy(object, {
	      get(target, key, receiver) {
	        if (typeof key === "symbol" || key in target)
	          return Reflect.get(target, key, receiver);
	        const caller = receiver[symbols.trace];
	        if (!caller?.[symbols.internal][`${name}.${key}`])
	          return Reflect.get(target, key, receiver);
	        return caller.get(`${name}.${key}`);
	      },
	      set(target, key, value, receiver) {
	        if (typeof key === "symbol" || key in target)
	          return Reflect.set(target, key, value, receiver);
	        const caller = receiver[symbols.trace];
	        if (!caller?.[symbols.internal][`${name}.${key}`])
	          return Reflect.set(target, key, value, receiver);
	        caller[`${name}.${key}`] = value;
	        return true;
	      }
	    });
	  }
	  constructor(config) {
	    const self = new Proxy(this, _Context.handler);
	    config = resolveConfig(this.constructor, config);
	    self[symbols.isolate] = /* @__PURE__ */ Object.create(null);
	    self[symbols.intercept] = /* @__PURE__ */ Object.create(null);
	    self.root = self;
	    self.mixin("scope", ["config", "runtime", "effect", "collect", "accept", "decline"]);
	    self.mixin("registry", ["using", "inject", "plugin", "dispose"]);
	    self.mixin("lifecycle", ["on", "once", "off", "after", "parallel", "emit", "serial", "bail", "start", "stop"]);
	    self.provide("registry", new Registry(self, config), true);
	    self.provide("lifecycle", new Lifecycle(self), true);
	    const attach = /* @__PURE__ */ __name$9((internal) => {
	      if (!internal)
	        return;
	      attach(Object.getPrototypeOf(internal));
	      for (const key of Object.getOwnPropertyNames(internal)) {
	        const constructor = internal[key]["prototype"]?.constructor;
	        if (!constructor)
	          continue;
	        self[internal[key]["key"]] = new constructor(self, config);
	        defineProperty(self[internal[key]["key"]], symbols.trace, self);
	      }
	    }, "attach");
	    attach(this[symbols.internal]);
	    return self;
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
	  get(name) {
	    const internal = this[symbols.internal][name];
	    if (internal?.type !== "service")
	      return;
	    const value = this.root[this[symbols.isolate][name]];
	    if (!value || typeof value !== "object" && typeof value !== "function")
	      return value;
	    if (isUnproxyable(value)) {
	      defineProperty(value, symbols.trace, this);
	      return value;
	    }
	    return createTraceable(this, value);
	  }
	  provide(name, value, builtin) {
	    const internal = _Context.ensureInternal.call(this.root);
	    if (name in internal)
	      return;
	    const key = Symbol(name);
	    internal[name] = { type: "service", builtin };
	    this.root[key] = value;
	    this.root[_Context.isolate][name] = key;
	  }
	  accessor(name, options) {
	    const internal = _Context.ensureInternal.call(this.root);
	    internal[name] ||= { type: "accessor", ...options };
	  }
	  alias(name, aliases) {
	    const internal = _Context.ensureInternal.call(this.root);
	    for (const key of aliases) {
	      internal[key] ||= { type: "alias", name };
	    }
	  }
	  mixin(name, mixins) {
	    for (const key of mixins) {
	      this.accessor(key, {
	        get() {
	          const service = this[name];
	          if (isNullable(service))
	            return service;
	          const value = Reflect.get(service, key);
	          if (typeof value !== "function")
	            return value;
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
	    return this.extend({ [symbols.isolate]: shadow });
	  }
	  intercept(name, config) {
	    const intercept = Object.create(this[symbols.intercept]);
	    intercept[name] = config;
	    return this.extend({ [symbols.intercept]: intercept });
	  }
	};
	Context.prototype[Context.internal] = /* @__PURE__ */ Object.create(null);
	var Service = class _Service {
	  static {
	    __name$9(this, "Service");
	  }
	  static setup = symbols.setup;
	  static invoke = symbols.invoke;
	  static extend = symbols.extend;
	  static provide = symbols.provide;
	  static immediate = symbols.immediate;
	  start() {
	  }
	  stop() {
	  }
	  ctx;
	  [symbols.trace];
	  name;
	  config;
	  constructor(...args) {
	    let _ctx, name, immediate, config;
	    if (Context.is(args[0])) {
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
	      if (_ctx)
	        self[symbols.expose] = name;
	      else
	        self.ctx[name] = self;
	    }
	    self.ctx.on("ready", async () => {
	      await Promise.resolve();
	      await self.start();
	      if (!immediate)
	        self.ctx[name] = self;
	    });
	    self.ctx.on("dispose", () => self.stop());
	    return Context.associate(self, name);
	  }
	  [symbols.filter](ctx) {
	    return ctx[symbols.isolate][this.name] === this.ctx[symbols.isolate][this.name];
	  }
	  [symbols.setup]() {
	    this.ctx = new Context();
	  }
	  [symbols.extend](props) {
	    const caller = this[symbols.trace];
	    let self;
	    if (this[_Service.invoke]) {
	      self = createCallable(this.name, this);
	    } else {
	      self = Object.create(this);
	    }
	    defineProperty(self, symbols.trace, caller);
	    return Context.associate(Object.assign(self, props), this.name);
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
	};

	var require$$0 = /*@__PURE__*/getAugmentedNamespace(lib$1);

	var __create = Object.create;
	var __defProp$9 = Object.defineProperty;
	var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
	var __getOwnPropNames$2 = Object.getOwnPropertyNames;
	var __getProtoOf = Object.getPrototypeOf;
	var __hasOwnProp = Object.prototype.hasOwnProperty;
	var __defNormalProp = (obj, key, value) => key in obj ? __defProp$9(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
	var __esm = (fn, res) => function __init() {
	  return fn && (res = (0, fn[__getOwnPropNames$2(fn)[0]])(fn = 0)), res;
	};
	var __commonJS$2 = (cb, mod) => function __require() {
	  return mod || (0, cb[__getOwnPropNames$2(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
	};
	var __copyProps = (to, from, except, desc) => {
	  if (from && typeof from === "object" || typeof from === "function") {
	    for (let key of __getOwnPropNames$2(from))
	      if (!__hasOwnProp.call(to, key) && key !== except)
	        __defProp$9(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
	  }
	  return to;
	};
	var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
	  // If the importer is in node compatibility mode or this is not an ESM
	  // file that has been converted to a CommonJS file using a Babel-
	  // compatible transform (i.e. "__esModule" has not been set), then set
	  // "default" to the CommonJS "module.exports" for node compatibility.
	  isNodeMode || !mod || !mod.__esModule ? __defProp$9(target, "default", { value: mod, enumerable: true }) : target,
	  mod
	));
	var __publicField = (obj, key, value) => {
	  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
	  return value;
	};

	// ../../node_modules/node-inspect-extracted/dist/inspect.js
	var require_inspect = __commonJS$2({
	  "../../node_modules/node-inspect-extracted/dist/inspect.js"(exports2, module2) {
	    !function(t, e) {
	      "object" == typeof exports2 && "object" == typeof module2 ? module2.exports = e() : "object" == typeof exports2 ? exports2.util = e() : t.util = e();
	    }(exports2, () => (() => {
	      var t = { 627: (t2, e2) => {
	        function r2(t3) {
	          return r2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
	            return typeof t4;
	          } : function(t4) {
	            return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
	          }, r2(t3);
	        }
	        function n(t3, e3) {
	          for (var r3 = 0; r3 < e3.length; r3++) {
	            var n2 = e3[r3];
	            n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t3, o(n2.key), n2);
	          }
	        }
	        function o(t3) {
	          var e3 = function(t4, e4) {
	            if ("object" != r2(t4) || !t4)
	              return t4;
	            var n2 = t4[Symbol.toPrimitive];
	            if (void 0 !== n2) {
	              var o2 = n2.call(t4, "string");
	              if ("object" != r2(o2))
	                return o2;
	              throw new TypeError("@@toPrimitive must return a primitive value.");
	            }
	            return String(t4);
	          }(t3);
	          return "symbol" == r2(e3) ? e3 : String(e3);
	        }
	        var i = function() {
	          function t3() {
	            !function(t4, e4) {
	              if (!(t4 instanceof e4))
	                throw new TypeError("Cannot call a class as a function");
	            }(this, t3);
	          }
	          var e3, r3;
	          return e3 = t3, r3 = [{ key: "hexSlice", value: function() {
	            var t4 = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0, e4 = arguments.length > 1 ? arguments[1] : void 0;
	            return Array.prototype.map.call(this.slice(t4, e4), function(t5) {
	              return ("00" + t5.toString(16)).slice(-2);
	            }).join("");
	          } }], r3 && n(e3.prototype, r3), Object.defineProperty(e3, "prototype", { writable: false }), t3;
	        }();
	        e2.l = i;
	      }, 973: (t2, e2, r2) => {
	        function n(t3) {
	          return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
	            return typeof t4;
	          } : function(t4) {
	            return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
	          }, n(t3);
	        }
	        function o(t3, e3) {
	          var r3 = "undefined" != typeof Symbol && t3[Symbol.iterator] || t3["@@iterator"];
	          if (!r3) {
	            if (Array.isArray(t3) || (r3 = function(t4, e4) {
	              if (t4) {
	                if ("string" == typeof t4)
	                  return i(t4, e4);
	                var r4 = Object.prototype.toString.call(t4).slice(8, -1);
	                return "Object" === r4 && t4.constructor && (r4 = t4.constructor.name), "Map" === r4 || "Set" === r4 ? Array.from(t4) : "Arguments" === r4 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r4) ? i(t4, e4) : void 0;
	              }
	            }(t3)) || e3 && t3 && "number" == typeof t3.length) {
	              r3 && (t3 = r3);
	              var n2 = 0, o2 = function() {
	              };
	              return { s: o2, n: function() {
	                return n2 >= t3.length ? { done: true } : { done: false, value: t3[n2++] };
	              }, e: function(t4) {
	                throw t4;
	              }, f: o2 };
	            }
	            throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	          }
	          var a2, c2 = true, l2 = false;
	          return { s: function() {
	            r3 = r3.call(t3);
	          }, n: function() {
	            var t4 = r3.next();
	            return c2 = t4.done, t4;
	          }, e: function(t4) {
	            l2 = true, a2 = t4;
	          }, f: function() {
	            try {
	              c2 || null == r3.return || r3.return();
	            } finally {
	              if (l2)
	                throw a2;
	            }
	          } };
	        }
	        function i(t3, e3) {
	          (null == e3 || e3 > t3.length) && (e3 = t3.length);
	          for (var r3 = 0, n2 = new Array(e3); r3 < e3; r3++)
	            n2[r3] = t3[r3];
	          return n2;
	        }
	        function a(t3, e3) {
	          var r3 = Object.keys(t3);
	          if (Object.getOwnPropertySymbols) {
	            var n2 = Object.getOwnPropertySymbols(t3);
	            e3 && (n2 = n2.filter(function(e4) {
	              return Object.getOwnPropertyDescriptor(t3, e4).enumerable;
	            })), r3.push.apply(r3, n2);
	          }
	          return r3;
	        }
	        function c(t3) {
	          for (var e3 = 1; e3 < arguments.length; e3++) {
	            var r3 = null != arguments[e3] ? arguments[e3] : {};
	            e3 % 2 ? a(Object(r3), true).forEach(function(e4) {
	              l(t3, e4, r3[e4]);
	            }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(t3, Object.getOwnPropertyDescriptors(r3)) : a(Object(r3)).forEach(function(e4) {
	              Object.defineProperty(t3, e4, Object.getOwnPropertyDescriptor(r3, e4));
	            });
	          }
	          return t3;
	        }
	        function l(t3, e3, r3) {
	          var o2;
	          return o2 = function(t4, e4) {
	            if ("object" != n(t4) || !t4)
	              return t4;
	            var r4 = t4[Symbol.toPrimitive];
	            if (void 0 !== r4) {
	              var o3 = r4.call(t4, "string");
	              if ("object" != n(o3))
	                return o3;
	              throw new TypeError("@@toPrimitive must return a primitive value.");
	            }
	            return String(t4);
	          }(e3), (e3 = "symbol" == n(o2) ? o2 : String(o2)) in t3 ? Object.defineProperty(t3, e3, { value: r3, enumerable: true, configurable: true, writable: true }) : t3[e3] = r3, t3;
	        }
	        var u, p, f = r2(315), y = f.internalBinding, s = f.Array, g = f.ArrayIsArray, d = f.ArrayPrototypeFilter, b = f.ArrayPrototypeForEach, h = f.ArrayPrototypeIncludes, v = f.ArrayPrototypeIndexOf, m = f.ArrayPrototypeJoin, S = f.ArrayPrototypeMap, P = f.ArrayPrototypePop, x = f.ArrayPrototypePush, O = f.ArrayPrototypePushApply, w = f.ArrayPrototypeSlice, A = f.ArrayPrototypeSplice, j = f.ArrayPrototypeSort, E = f.ArrayPrototypeUnshift, _ = f.BigIntPrototypeValueOf, F = f.BooleanPrototypeValueOf, L = f.DatePrototypeGetTime, R = f.DatePrototypeToISOString, k = f.DatePrototypeToString, T = f.ErrorPrototypeToString, I = f.FunctionPrototypeBind, z = f.FunctionPrototypeCall, M = f.FunctionPrototypeToString, B = f.JSONStringify, N = f.MapPrototypeGetSize, D = f.MapPrototypeEntries, C = f.MathFloor, H = f.MathMax, G = f.MathMin, W = f.MathRound, V = f.MathSqrt, U = f.MathTrunc, $ = f.Number, Z = f.NumberIsFinite, q = f.NumberIsNaN, K = f.NumberParseFloat, Y = f.NumberParseInt, J = f.NumberPrototypeToString, Q = f.NumberPrototypeValueOf, X = f.Object, tt = f.ObjectAssign, et = f.ObjectDefineProperty, rt = f.ObjectGetOwnPropertyDescriptor, nt = f.ObjectGetOwnPropertyNames, ot = f.ObjectGetOwnPropertySymbols, it = f.ObjectGetPrototypeOf, at = f.ObjectIs, ct = f.ObjectKeys, lt = f.ObjectPrototypeHasOwnProperty, ut = f.ObjectPrototypePropertyIsEnumerable, pt = f.ObjectSeal, ft = f.ObjectSetPrototypeOf, yt = f.ReflectApply, st = f.ReflectOwnKeys, gt = f.RegExp, dt = f.RegExpPrototypeExec, bt = f.RegExpPrototypeSymbolReplace, ht = f.RegExpPrototypeSymbolSplit, vt = f.RegExpPrototypeToString, mt = f.SafeStringIterator, St = f.SafeMap, Pt = f.SafeSet, xt = f.SetPrototypeGetSize, Ot = f.SetPrototypeValues, wt = f.String, At = f.StringPrototypeCharCodeAt, jt = f.StringPrototypeCodePointAt, Et = f.StringPrototypeIncludes, _t = f.StringPrototypeIndexOf, Ft = f.StringPrototypeLastIndexOf, Lt = f.StringPrototypeNormalize, Rt = f.StringPrototypePadEnd, kt = f.StringPrototypePadStart, Tt = f.StringPrototypeRepeat, It = f.StringPrototypeReplaceAll, zt = f.StringPrototypeSlice, Mt = f.StringPrototypeSplit, Bt = f.StringPrototypeEndsWith, Nt = f.StringPrototypeStartsWith, Dt = f.StringPrototypeToLowerCase, Ct = f.StringPrototypeTrim, Ht = f.StringPrototypeValueOf, Gt = f.SymbolPrototypeToString, Wt = f.SymbolPrototypeValueOf, Vt = f.SymbolIterator, Ut = f.SymbolToStringTag, $t = f.TypedArrayPrototypeGetLength, Zt = f.TypedArrayPrototypeGetSymbolToStringTag, qt = f.Uint8Array, Kt = f.globalThis, Yt = f.uncurryThis, Jt = r2(583), Qt = Jt.constants, Xt = Qt.ALL_PROPERTIES, te = Qt.ONLY_ENUMERABLE, ee = Qt.kPending, re = Qt.kRejected, ne = Jt.getOwnNonIndexProperties, oe = Jt.getPromiseDetails, ie = Jt.getProxyDetails, ae = Jt.previewEntries, ce = Jt.getConstructorName, le = Jt.getExternalValue, ue = Jt.Proxy, pe = r2(162), fe = pe.customInspectSymbol, ye = pe.isError, se = pe.join, ge = pe.removeColors, de = r2(488).isStackOverflowError, be = r2(515), he = be.isAsyncFunction, ve = be.isGeneratorFunction, me = be.isAnyArrayBuffer, Se = be.isArrayBuffer, Pe = be.isArgumentsObject, xe = be.isBoxedPrimitive, Oe = be.isDataView, we = be.isExternal, Ae = be.isMap, je = be.isMapIterator, Ee = be.isModuleNamespaceObject, _e = be.isNativeError, Fe = be.isPromise, Le = be.isSet, Re = be.isSetIterator, ke = be.isWeakMap, Te = be.isWeakSet, Ie = be.isRegExp, ze = be.isDate, Me = be.isTypedArray, Be = be.isStringObject, Ne = be.isNumberObject, De = be.isBooleanObject, Ce = be.isBigIntObject, He = r2(829), Ge = r2(991).BuiltinModule, We = r2(217), Ve = We.validateObject, Ue = We.validateString, $e = We.kValidateObjectAllowArray;
	        var Ze, qe, Ke, Ye, Je, Qe = new Pt(d(nt(Kt), function(t3) {
	          return null !== dt(/^[A-Z][a-zA-Z0-9]+$/, t3);
	        })), Xe = function(t3) {
	          return void 0 === t3 && void 0 !== t3;
	        }, tr = pt({ showHidden: false, depth: 2, colors: false, customInspect: true, showProxy: false, maxArrayLength: 100, maxStringLength: 1e4, breakLength: 80, compact: 3, sorted: false, getters: false, numericSeparator: false }), er = 0, rr = 1, nr = 2;
	        try {
	          Ze = new gt("[\\x00-\\x1f\\x27\\x5c\\x7f-\\x9f]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|(?<![\\ud800-\\udbff])[\\udc00-\\udfff]"), qe = new gt("[\0-\\x1f\\x27\\x5c\\x7f-\\x9f]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|(?<![\\ud800-\\udbff])[\\udc00-\\udfff]", "g"), Ke = new gt("[\\x00-\\x1f\\x5c\\x7f-\\x9f]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|(?<![\\ud800-\\udbff])[\\udc00-\\udfff]"), Ye = new gt("[\\x00-\\x1f\\x5c\\x7f-\\x9f]|[\\ud800-\\udbff](?![\\udc00-\\udfff])|(?<![\\ud800-\\udbff])[\\udc00-\\udfff]", "g");
	          var or = new gt("(?<=\\n)");
	          Je = function(t3) {
	            return ht(or, t3);
	          };
	        } catch (t3) {
	          Ze = /[\x00-\x1f\x27\x5c\x7f-\x9f]/, qe = /[\x00-\x1f\x27\x5c\x7f-\x9f]/g, Ke = /[\x00-\x1f\x5c\x7f-\x9f]/, Ye = /[\x00-\x1f\x5c\x7f-\x9f]/g, Je = function(t4) {
	            var e3 = ht(/\n/, t4), r3 = P(e3), n2 = S(e3, function(t5) {
	              return t5 + "\n";
	            });
	            return "" !== r3 && n2.push(r3), n2;
	          };
	        }
	        var ir, ar = /^[a-zA-Z_][a-zA-Z_0-9]*$/, cr = /^(0|[1-9][0-9]*)$/, lr = /^ {4}at (?:[^/\\(]+ \(|)node:(.+):\d+:\d+\)?$/, ur = /[/\\]node_modules[/\\](.+?)(?=[/\\])/g, pr = /^(\s+[^(]*?)\s*{/, fr = /(\/\/.*?\n)|(\/\*(.|\n)*?\*\/)/g, yr = 16, sr = 0, gr = 1, dr = 2, br = ["\\x00", "\\x01", "\\x02", "\\x03", "\\x04", "\\x05", "\\x06", "\\x07", "\\b", "\\t", "\\n", "\\x0B", "\\f", "\\r", "\\x0E", "\\x0F", "\\x10", "\\x11", "\\x12", "\\x13", "\\x14", "\\x15", "\\x16", "\\x17", "\\x18", "\\x19", "\\x1A", "\\x1B", "\\x1C", "\\x1D", "\\x1E", "\\x1F", "", "", "", "", "", "", "", "\\'", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "\\\\", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "\\x7F", "\\x80", "\\x81", "\\x82", "\\x83", "\\x84", "\\x85", "\\x86", "\\x87", "\\x88", "\\x89", "\\x8A", "\\x8B", "\\x8C", "\\x8D", "\\x8E", "\\x8F", "\\x90", "\\x91", "\\x92", "\\x93", "\\x94", "\\x95", "\\x96", "\\x97", "\\x98", "\\x99", "\\x9A", "\\x9B", "\\x9C", "\\x9D", "\\x9E", "\\x9F"], hr = new gt("[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]+)*|[a-zA-Z\\d]+(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))", "g");
	        function vr(t3, e3) {
	          var r3 = { budget: {}, indentationLvl: 0, seen: [], currentDepth: 0, stylize: jr, showHidden: tr.showHidden, depth: tr.depth, colors: tr.colors, customInspect: tr.customInspect, showProxy: tr.showProxy, maxArrayLength: tr.maxArrayLength, maxStringLength: tr.maxStringLength, breakLength: tr.breakLength, compact: tr.compact, sorted: tr.sorted, getters: tr.getters, numericSeparator: tr.numericSeparator };
	          if (arguments.length > 1) {
	            if (arguments.length > 2 && (void 0 !== arguments[2] && (r3.depth = arguments[2]), arguments.length > 3 && void 0 !== arguments[3] && (r3.colors = arguments[3])), "boolean" == typeof e3)
	              r3.showHidden = e3;
	            else if (e3)
	              for (var n2 = ct(e3), o2 = 0; o2 < n2.length; ++o2) {
	                var i2 = n2[o2];
	                lt(tr, i2) || "stylize" === i2 ? r3[i2] = e3[i2] : void 0 === r3.userOptions && (r3.userOptions = e3);
	              }
	          }
	          return r3.colors && (r3.stylize = Ar), null === r3.maxArrayLength && (r3.maxArrayLength = 1 / 0), null === r3.maxStringLength && (r3.maxStringLength = 1 / 0), Ir(r3, t3, 0);
	        }
	        vr.custom = fe, et(vr, "defaultOptions", { __proto__: null, get: function() {
	          return tr;
	        }, set: function(t3) {
	          return Ve(t3, "options"), tt(tr, t3);
	        } });
	        var mr = 39, Sr = 49;
	        function Pr(t3, e3) {
	          et(vr.colors, e3, { __proto__: null, get: function() {
	            return this[t3];
	          }, set: function(e4) {
	            this[t3] = e4;
	          }, configurable: true, enumerable: false });
	        }
	        function xr(t3, e3) {
	          return -1 === e3 ? '"'.concat(t3, '"') : -2 === e3 ? "`".concat(t3, "`") : "'".concat(t3, "'");
	        }
	        function Or(t3) {
	          var e3 = At(t3);
	          return br.length > e3 ? br[e3] : "\\u".concat(J(e3, 16));
	        }
	        function wr(t3) {
	          var e3 = Ze, r3 = qe, n2 = 39;
	          if (Et(t3, "'") && (Et(t3, '"') ? Et(t3, "`") || Et(t3, "${") || (n2 = -2) : n2 = -1, 39 !== n2 && (e3 = Ke, r3 = Ye)), t3.length < 5e3 && null === dt(e3, t3))
	            return xr(t3, n2);
	          if (t3.length > 100)
	            return xr(t3 = bt(r3, t3, Or), n2);
	          for (var o2 = "", i2 = 0, a2 = 0; a2 < t3.length; a2++) {
	            var c2 = At(t3, a2);
	            if (c2 === n2 || 92 === c2 || c2 < 32 || c2 > 126 && c2 < 160)
	              o2 += i2 === a2 ? br[c2] : "".concat(zt(t3, i2, a2)).concat(br[c2]), i2 = a2 + 1;
	            else if (c2 >= 55296 && c2 <= 57343) {
	              if (c2 <= 56319 && a2 + 1 < t3.length) {
	                var l2 = At(t3, a2 + 1);
	                if (l2 >= 56320 && l2 <= 57343) {
	                  a2++;
	                  continue;
	                }
	              }
	              o2 += "".concat(zt(t3, i2, a2), "\\u").concat(J(c2, 16)), i2 = a2 + 1;
	            }
	          }
	          return i2 !== t3.length && (o2 += zt(t3, i2)), xr(o2, n2);
	        }
	        function Ar(t3, e3) {
	          var r3 = vr.styles[e3];
	          if (void 0 !== r3) {
	            var n2 = vr.colors[r3];
	            if (void 0 !== n2)
	              return "\x1B[".concat(n2[0], "m").concat(t3, "\x1B[").concat(n2[1], "m");
	          }
	          return t3;
	        }
	        function jr(t3) {
	          return t3;
	        }
	        function Er() {
	          return [];
	        }
	        function _r(t3, e3) {
	          try {
	            return t3 instanceof e3;
	          } catch (t4) {
	            return false;
	          }
	        }
	        function Fr(t3, e3, r3, n2) {
	          for (var o2, i2 = t3; t3 || Xe(t3); ) {
	            var a2 = rt(t3, "constructor");
	            if (void 0 !== a2 && "function" == typeof a2.value && "" !== a2.value.name && _r(i2, a2.value))
	              return void 0 === n2 || o2 === t3 && Qe.has(a2.value.name) || Lr(e3, i2, o2 || i2, r3, n2), wt(a2.value.name);
	            t3 = it(t3), void 0 === o2 && (o2 = t3);
	          }
	          if (null === o2)
	            return null;
	          var l2 = ce(i2);
	          if (r3 > e3.depth && null !== e3.depth)
	            return "".concat(l2, " <Complex prototype>");
	          var u2 = Fr(o2, e3, r3 + 1, n2);
	          return null === u2 ? "".concat(l2, " <").concat(vr(o2, c(c({}, e3), {}, { customInspect: false, depth: -1 })), ">") : "".concat(l2, " <").concat(u2, ">");
	        }
	        function Lr(t3, e3, r3, n2, i2) {
	          var a2, c2, l2 = 0;
	          do {
	            if (0 !== l2 || e3 === r3) {
	              if (null === (r3 = it(r3)))
	                return;
	              var u2 = rt(r3, "constructor");
	              if (void 0 !== u2 && "function" == typeof u2.value && Qe.has(u2.value.name))
	                return;
	            }
	            0 === l2 ? c2 = new Pt() : b(a2, function(t4) {
	              return c2.add(t4);
	            }), a2 = st(r3), x(t3.seen, e3);
	            var p2, f2 = o(a2);
	            try {
	              for (f2.s(); !(p2 = f2.n()).done; ) {
	                var y2 = p2.value;
	                if (!("constructor" === y2 || lt(e3, y2) || 0 !== l2 && c2.has(y2))) {
	                  var s2 = rt(r3, y2);
	                  if ("function" != typeof s2.value) {
	                    var g2 = an(t3, r3, n2, y2, er, s2, e3);
	                    t3.colors ? x(i2, "\x1B[2m".concat(g2, "\x1B[22m")) : x(i2, g2);
	                  }
	                }
	              }
	            } catch (t4) {
	              f2.e(t4);
	            } finally {
	              f2.f();
	            }
	            P(t3.seen);
	          } while (3 != ++l2);
	        }
	        function Rr(t3, e3, r3) {
	          var n2 = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : "";
	          return null === t3 ? "" !== e3 && r3 !== e3 ? "[".concat(r3).concat(n2, ": null prototype] [").concat(e3, "] ") : "[".concat(r3).concat(n2, ": null prototype] ") : "" !== e3 && t3 !== e3 ? "".concat(t3).concat(n2, " [").concat(e3, "] ") : "".concat(t3).concat(n2, " ");
	        }
	        function kr(t3, e3) {
	          var r3, n2 = ot(t3);
	          if (e3)
	            r3 = nt(t3), 0 !== n2.length && O(r3, n2);
	          else {
	            try {
	              r3 = ct(t3);
	            } catch (e4) {
	              He(_e(e4) && "ReferenceError" === e4.name && Ee(t3)), r3 = nt(t3);
	            }
	            0 !== n2.length && O(r3, d(n2, function(e4) {
	              return ut(t3, e4);
	            }));
	          }
	          return r3;
	        }
	        function Tr(t3, e3, r3) {
	          var n2 = "";
	          return null === e3 && (n2 = ce(t3)) === r3 && (n2 = "Object"), Rr(e3, r3, n2);
	        }
	        function Ir(t3, e3, i2, a2) {
	          if ("object" !== n(e3) && "function" != typeof e3 && !Xe(e3))
	            return Vr(t3.stylize, e3, t3);
	          if (null === e3)
	            return t3.stylize("null", "null");
	          var l2 = e3, u2 = ie(e3, !!t3.showProxy);
	          if (void 0 !== u2) {
	            if (null === u2 || null === u2[0])
	              return t3.stylize("<Revoked Proxy>", "special");
	            if (t3.showProxy)
	              return function(t4, e4, r3) {
	                if (r3 > t4.depth && null !== t4.depth)
	                  return t4.stylize("Proxy [Array]", "special");
	                r3 += 1, t4.indentationLvl += 2;
	                var n2 = [Ir(t4, e4[0], r3), Ir(t4, e4[1], r3)];
	                return t4.indentationLvl -= 2, ln(t4, n2, "", ["Proxy [", "]"], nr, r3);
	              }(t3, u2, i2);
	            e3 = u2;
	          }
	          if (t3.customInspect) {
	            var y2 = e3[fe];
	            if ("function" == typeof y2 && y2 !== vr && (!e3.constructor || e3.constructor.prototype !== e3)) {
	              var s2 = null === t3.depth ? null : t3.depth - i2, d2 = z(y2, l2, s2, function(t4, e4) {
	                var r3 = c({ stylize: t4.stylize, showHidden: t4.showHidden, depth: t4.depth, colors: t4.colors, customInspect: t4.customInspect, showProxy: t4.showProxy, maxArrayLength: t4.maxArrayLength, maxStringLength: t4.maxStringLength, breakLength: t4.breakLength, compact: t4.compact, sorted: t4.sorted, getters: t4.getters, numericSeparator: t4.numericSeparator }, t4.userOptions);
	                if (e4) {
	                  ft(r3, null);
	                  var i3, a3 = o(ct(r3));
	                  try {
	                    for (a3.s(); !(i3 = a3.n()).done; ) {
	                      var l3 = i3.value;
	                      "object" !== n(r3[l3]) && "function" != typeof r3[l3] || null === r3[l3] || delete r3[l3];
	                    }
	                  } catch (t5) {
	                    a3.e(t5);
	                  } finally {
	                    a3.f();
	                  }
	                  r3.stylize = ft(function(e5, r4) {
	                    var n2;
	                    try {
	                      n2 = "".concat(t4.stylize(e5, r4));
	                    } catch (t5) {
	                    }
	                    return "string" != typeof n2 ? e5 : n2;
	                  }, null);
	                }
	                return r3;
	              }(t3, void 0 !== u2 || !(l2 instanceof X)), vr);
	              if (d2 !== l2)
	                return "string" != typeof d2 ? Ir(t3, d2, i2) : It(d2, "\n", "\n".concat(Tt(" ", t3.indentationLvl)));
	            }
	          }
	          if (t3.seen.includes(e3)) {
	            var b2 = 1;
	            return void 0 === t3.circular ? (t3.circular = new St(), t3.circular.set(e3, b2)) : void 0 === (b2 = t3.circular.get(e3)) && (b2 = t3.circular.size + 1, t3.circular.set(e3, b2)), t3.stylize("[Circular *".concat(b2, "]"), "special");
	          }
	          return function(t4, e4, n2, i3) {
	            var a3, c2;
	            t4.showHidden && (n2 <= t4.depth || null === t4.depth) && (c2 = []);
	            var l3 = Fr(e4, t4, n2, c2);
	            void 0 !== c2 && 0 === c2.length && (c2 = void 0);
	            var u3 = e4[Ut];
	            ("string" != typeof u3 || "" !== u3 && (t4.showHidden ? lt : ut)(e4, Ut)) && (u3 = "");
	            var y3, s3, d3 = "", b3 = Er, S2 = true, P2 = 0, T2 = t4.showHidden ? Xt : te, z2 = er;
	            if (Vt in e4 || null === l3)
	              if (S2 = false, g(e4)) {
	                var B2 = "Array" !== l3 || "" !== u3 ? Rr(l3, u3, "Array", "(".concat(e4.length, ")")) : "";
	                if (a3 = ne(e4, T2), y3 = ["".concat(B2, "["), "]"], 0 === e4.length && 0 === a3.length && void 0 === c2)
	                  return "".concat(y3[0], "]");
	                z2 = nr, b3 = qr;
	              } else if (Le(e4)) {
	                var C2 = xt(e4), H2 = Rr(l3, u3, "Set", "(".concat(C2, ")"));
	                if (a3 = kr(e4, t4.showHidden), b3 = I(Yr, null, null !== l3 ? e4 : Ot(e4)), 0 === C2 && 0 === a3.length && void 0 === c2)
	                  return "".concat(H2, "{}");
	                y3 = ["".concat(H2, "{"), "}"];
	              } else if (Ae(e4)) {
	                var G2 = N(e4), W2 = Rr(l3, u3, "Map", "(".concat(G2, ")"));
	                if (a3 = kr(e4, t4.showHidden), b3 = I(Jr, null, null !== l3 ? e4 : D(e4)), 0 === G2 && 0 === a3.length && void 0 === c2)
	                  return "".concat(W2, "{}");
	                y3 = ["".concat(W2, "{"), "}"];
	              } else if (Me(e4)) {
	                a3 = ne(e4, T2);
	                var V2 = e4, U2 = "";
	                null === l3 && (U2 = Zt(e4), V2 = new f[U2](e4));
	                var $2 = $t(e4), Z2 = Rr(l3, u3, U2, "(".concat($2, ")"));
	                if (y3 = ["".concat(Z2, "["), "]"], 0 === e4.length && 0 === a3.length && !t4.showHidden)
	                  return "".concat(y3[0], "]");
	                b3 = I(Kr, null, V2, $2), z2 = nr;
	              } else
	                je(e4) ? (a3 = kr(e4, t4.showHidden), y3 = zr("Map", u3), b3 = I(nn, null, y3)) : Re(e4) ? (a3 = kr(e4, t4.showHidden), y3 = zr("Set", u3), b3 = I(nn, null, y3)) : S2 = true;
	            if (S2)
	              if (a3 = kr(e4, t4.showHidden), y3 = ["{", "}"], "Object" === l3) {
	                if (Pe(e4) ? y3[0] = "[Arguments] {" : "" !== u3 && (y3[0] = "".concat(Rr(l3, u3, "Object"), "{")), 0 === a3.length && void 0 === c2)
	                  return "".concat(y3[0], "}");
	              } else if ("function" == typeof e4) {
	                if (d3 = function(t5, e5, r3) {
	                  var n3 = M(t5);
	                  if (Nt(n3, "class") && Bt(n3, "}")) {
	                    var o2 = zt(n3, 5, -1), i4 = _t(o2, "{");
	                    if (-1 !== i4 && (!Et(zt(o2, 0, i4), "(") || null !== dt(pr, bt(fr, o2))))
	                      return function(t6, e6, r4) {
	                        var n4 = lt(t6, "name") && t6.name || "(anonymous)", o3 = "class ".concat(n4);
	                        if ("Function" !== e6 && null !== e6 && (o3 += " [".concat(e6, "]")), "" !== r4 && e6 !== r4 && (o3 += " [".concat(r4, "]")), null !== e6) {
	                          var i5 = it(t6).name;
	                          i5 && (o3 += " extends ".concat(i5));
	                        } else
	                          o3 += " extends [null prototype]";
	                        return "[".concat(o3, "]");
	                      }(t5, e5, r3);
	                  }
	                  var a4 = "Function";
	                  ve(t5) && (a4 = "Generator".concat(a4)), he(t5) && (a4 = "Async".concat(a4));
	                  var c3 = "[".concat(a4);
	                  return null === e5 && (c3 += " (null prototype)"), "" === t5.name ? c3 += " (anonymous)" : c3 += ": ".concat(t5.name), c3 += "]", e5 !== a4 && null !== e5 && (c3 += " ".concat(e5)), "" !== r3 && e5 !== r3 && (c3 += " [".concat(r3, "]")), c3;
	                }(e4, l3, u3), 0 === a3.length && void 0 === c2)
	                  return t4.stylize(d3, "special");
	              } else if (Ie(e4)) {
	                d3 = vt(null !== l3 ? e4 : new gt(e4));
	                var K2 = Rr(l3, u3, "RegExp");
	                if ("RegExp " !== K2 && (d3 = "".concat(K2).concat(d3)), 0 === a3.length && void 0 === c2 || n2 > t4.depth && null !== t4.depth)
	                  return t4.stylize(d3, "regexp");
	              } else if (ze(e4)) {
	                d3 = q(L(e4)) ? k(e4) : R(e4);
	                var Y2 = Rr(l3, u3, "Date");
	                if ("Date " !== Y2 && (d3 = "".concat(Y2).concat(d3)), 0 === a3.length && void 0 === c2)
	                  return t4.stylize(d3, "date");
	              } else if (ye(e4)) {
	                if (d3 = function(t5, e5, n3, i4, a4) {
	                  var c3 = null != t5.name ? wt(t5.name) : "Error", l4 = Br(t5);
	                  ((function(t6, e6, r3, n4) {
	                    if (!t6.showHidden && 0 !== e6.length)
	                      for (var o2 = 0, i5 = ["name", "message", "stack"]; o2 < i5.length; o2++) {
	                        var a5 = i5[o2], c4 = v(e6, a5);
	                        -1 !== c4 && Et(n4, r3[a5]) && A(e6, c4, 1);
	                      }
	                  }))(i4, a4, t5, l4), !("cause" in t5) || 0 !== a4.length && h(a4, "cause") || x(a4, "cause"), !g(t5.errors) || 0 !== a4.length && h(a4, "errors") || x(a4, "errors"), l4 = function(t6, e6, r3, n4) {
	                    var o2 = r3.length;
	                    if (null === e6 || Bt(r3, "Error") && Nt(t6, r3) && (t6.length === o2 || ":" === t6[o2] || "\n" === t6[o2])) {
	                      var i5 = "Error";
	                      if (null === e6) {
	                        var a5 = dt(/^([A-Z][a-z_ A-Z0-9[\]()-]+)(?::|\n {4}at)/, t6) || dt(/^([a-z_A-Z0-9-]*Error)$/, t6);
	                        o2 = (i5 = a5 && a5[1] || "").length, i5 = i5 || "Error";
	                      }
	                      var c4 = zt(Rr(e6, n4, i5), 0, -1);
	                      r3 !== c4 && (t6 = Et(c4, r3) ? 0 === o2 ? "".concat(c4, ": ").concat(t6) : "".concat(c4).concat(zt(t6, o2)) : "".concat(c4, " [").concat(r3, "]").concat(zt(t6, o2)));
	                    }
	                    return t6;
	                  }(l4, e5, c3, n3);
	                  var u4 = t5.message && _t(l4, t5.message) || -1;
	                  -1 !== u4 && (u4 += t5.message.length);
	                  var f2, y4 = _t(l4, "\n    at", u4);
	                  if (-1 === y4)
	                    l4 = "[".concat(l4, "]");
	                  else {
	                    var s4 = zt(l4, 0, y4), d4 = function(t6, e6, r3) {
	                      var n4, o2 = Mt(r3, "\n");
	                      try {
	                        n4 = e6.cause;
	                      } catch (t7) {
	                      }
	                      if (null != n4 && ye(n4)) {
	                        var i5 = Br(n4), a5 = _t(i5, "\n    at");
	                        if (-1 !== a5) {
	                          var c4 = Mr(o2, Mt(zt(i5, a5 + 1), "\n")), l5 = c4.len, u5 = c4.offset;
	                          if (l5 > 0) {
	                            var p2 = l5 - 2, f3 = "    ... ".concat(p2, " lines matching cause stack trace ...");
	                            o2.splice(u5 + 1, p2, t6.stylize(f3, "undefined"));
	                          }
	                        }
	                      }
	                      return o2;
	                    }(i4, t5, zt(l4, y4 + 1));
	                    if (i4.colors) {
	                      var b4, S3, P3 = function() {
	                        var t6;
	                        try {
	                          t6 = process.cwd();
	                        } catch (t7) {
	                          return;
	                        }
	                        return t6;
	                      }(), O2 = o(d4);
	                      try {
	                        for (O2.s(); !(S3 = O2.n()).done; ) {
	                          var w2 = S3.value, j2 = dt(lr, w2);
	                          if (null !== j2 && Ge.exists(j2[1]))
	                            s4 += "\n".concat(i4.stylize(w2, "undefined"));
	                          else {
	                            if (s4 += "\n", w2 = Nr(i4, w2), void 0 !== P3) {
	                              var E2 = Dr(i4, w2, P3);
	                              E2 === w2 && (E2 = Dr(i4, w2, b4 = null == b4 ? (f2 = P3, (p = null == p ? r2(377) : p).pathToFileURL(f2).href) : b4)), w2 = E2;
	                            }
	                            s4 += w2;
	                          }
	                        }
	                      } catch (t6) {
	                        O2.e(t6);
	                      } finally {
	                        O2.f();
	                      }
	                    } else
	                      s4 += "\n".concat(m(d4, "\n"));
	                    l4 = s4;
	                  }
	                  if (0 !== i4.indentationLvl) {
	                    var _2 = Tt(" ", i4.indentationLvl);
	                    l4 = It(l4, "\n", "\n".concat(_2));
	                  }
	                  return l4;
	                }(e4, l3, u3, t4, a3), 0 === a3.length && void 0 === c2)
	                  return d3;
	              } else if (me(e4)) {
	                var J2 = Rr(l3, u3, Se(e4) ? "ArrayBuffer" : "SharedArrayBuffer");
	                if (void 0 === i3)
	                  b3 = Zr;
	                else if (0 === a3.length && void 0 === c2)
	                  return J2 + "{ byteLength: ".concat(Gr(t4.stylize, e4.byteLength, false), " }");
	                y3[0] = "".concat(J2, "{"), E(a3, "byteLength");
	              } else if (Oe(e4))
	                y3[0] = "".concat(Rr(l3, u3, "DataView"), "{"), E(a3, "byteLength", "byteOffset", "buffer");
	              else if (Fe(e4))
	                y3[0] = "".concat(Rr(l3, u3, "Promise"), "{"), b3 = on;
	              else if (Te(e4))
	                y3[0] = "".concat(Rr(l3, u3, "WeakSet"), "{"), b3 = t4.showHidden ? en : tn;
	              else if (ke(e4))
	                y3[0] = "".concat(Rr(l3, u3, "WeakMap"), "{"), b3 = t4.showHidden ? rn : tn;
	              else if (Ee(e4))
	                y3[0] = "".concat(Rr(l3, u3, "Module"), "{"), b3 = Ur.bind(null, a3);
	              else if (xe(e4)) {
	                if (d3 = function(t5, e5, r3, n3, o2) {
	                  var i4, a4;
	                  Ne(t5) ? (i4 = Q, a4 = "Number") : Be(t5) ? (i4 = Ht, a4 = "String", r3.splice(0, t5.length)) : De(t5) ? (i4 = F, a4 = "Boolean") : Ce(t5) ? (i4 = _, a4 = "BigInt") : (i4 = Wt, a4 = "Symbol");
	                  var c3 = "[".concat(a4);
	                  return a4 !== n3 && (c3 += null === n3 ? " (null prototype)" : " (".concat(n3, ")")), c3 += ": ".concat(Vr(jr, i4(t5), e5), "]"), "" !== o2 && o2 !== n3 && (c3 += " [".concat(o2, "]")), 0 !== r3.length || e5.stylize === jr ? c3 : e5.stylize(c3, Dt(a4));
	                }(e4, t4, a3, l3, u3), 0 === a3.length && void 0 === c2)
	                  return d3;
	              } else {
	                if (0 === a3.length && void 0 === c2) {
	                  if (we(e4)) {
	                    var X2 = le(e4).toString(16);
	                    return t4.stylize("[External: ".concat(X2, "]"), "special");
	                  }
	                  return "".concat(Tr(e4, l3, u3), "{}");
	                }
	                y3[0] = "".concat(Tr(e4, l3, u3), "{");
	              }
	            if (n2 > t4.depth && null !== t4.depth) {
	              var tt2 = zt(Tr(e4, l3, u3), 0, -1);
	              return null !== l3 && (tt2 = "[".concat(tt2, "]")), t4.stylize(tt2, "special");
	            }
	            n2 += 1, t4.seen.push(e4), t4.currentDepth = n2;
	            var et2 = t4.indentationLvl;
	            try {
	              for (s3 = b3(t4, e4, n2), P2 = 0; P2 < a3.length; P2++)
	                x(s3, an(t4, e4, n2, a3[P2], z2));
	              void 0 !== c2 && O(s3, c2);
	            } catch (r3) {
	              return function(t5, e5, r4, n3) {
	                if (de(e5))
	                  return t5.seen.pop(), t5.indentationLvl = n3, t5.stylize("[".concat(r4, ": Inspection interrupted ") + "prematurely. Maximum call stack size exceeded.]", "special");
	                He.fail(e5.stack);
	              }(t4, r3, zt(Tr(e4, l3, u3), 0, -1), et2);
	            }
	            if (void 0 !== t4.circular) {
	              var rt2 = t4.circular.get(e4);
	              if (void 0 !== rt2) {
	                var nt2 = t4.stylize("<ref *".concat(rt2, ">"), "special");
	                true !== t4.compact ? d3 = "" === d3 ? nt2 : "".concat(nt2, " ").concat(d3) : y3[0] = "".concat(nt2, " ").concat(y3[0]);
	              }
	            }
	            if (t4.seen.pop(), t4.sorted) {
	              var ot2 = true === t4.sorted ? void 0 : t4.sorted;
	              if (z2 === er)
	                j(s3, ot2);
	              else if (a3.length > 1) {
	                var at2 = j(w(s3, s3.length - a3.length), ot2);
	                E(at2, s3, s3.length - a3.length, a3.length), yt(A, null, at2);
	              }
	            }
	            var ct2 = ln(t4, s3, d3, y3, z2, n2, e4), pt2 = (t4.budget[t4.indentationLvl] || 0) + ct2.length;
	            return t4.budget[t4.indentationLvl] = pt2, pt2 > Math.pow(2, 27) && (t4.depth = -1), ct2;
	          }(t3, e3, i2, a2);
	        }
	        function zr(t3, e3) {
	          return e3 !== "".concat(t3, " Iterator") && ("" !== e3 && (e3 += "] ["), e3 += "".concat(t3, " Iterator")), ["[".concat(e3, "] {"), "}"];
	        }
	        function Mr(t3, e3) {
	          for (var r3 = 0; r3 < t3.length - 3; r3++) {
	            var n2 = v(e3, t3[r3]);
	            if (-1 !== n2) {
	              var o2 = e3.length - n2;
	              if (o2 > 3) {
	                for (var i2 = 1, a2 = G(t3.length - r3, o2); a2 > i2 && t3[r3 + i2] === e3[n2 + i2]; )
	                  i2++;
	                if (i2 > 3)
	                  return { len: i2, offset: r3 };
	              }
	            }
	          }
	          return { len: 0, offset: 0 };
	        }
	        function Br(t3) {
	          return t3.stack ? wt(t3.stack) : T(t3);
	        }
	        function Nr(t3, e3) {
	          for (var r3, n2 = "", o2 = 0; null !== (r3 = ur.exec(e3)); )
	            n2 += zt(e3, o2, r3.index + 14), n2 += t3.stylize(r3[1], "module"), o2 = r3.index + r3[0].length;
	          return 0 !== o2 && (e3 = n2 + zt(e3, o2)), e3;
	        }
	        function Dr(t3, e3, r3) {
	          var n2 = _t(e3, r3), o2 = "", i2 = r3.length;
	          if (-1 !== n2) {
	            "file://" === zt(e3, n2 - 7, n2) && (i2 += 7, n2 -= 7);
	            var a2 = "(" === e3[n2 - 1] ? n2 - 1 : n2, c2 = a2 !== n2 && Bt(e3, ")") ? -1 : e3.length, l2 = n2 + i2 + 1, u2 = zt(e3, a2, l2);
	            o2 += zt(e3, 0, a2), o2 += t3.stylize(u2, "undefined"), o2 += zt(e3, l2, c2), -1 === c2 && (o2 += t3.stylize(")", "undefined"));
	          } else
	            o2 += e3;
	          return o2;
	        }
	        function Cr(t3) {
	          for (var e3 = "", r3 = t3.length, n2 = Nt(t3, "-") ? 1 : 0; r3 >= n2 + 4; r3 -= 3)
	            e3 = "_".concat(zt(t3, r3 - 3, r3)).concat(e3);
	          return r3 === t3.length ? t3 : "".concat(zt(t3, 0, r3)).concat(e3);
	        }
	        vr.colors = { __proto__: null, reset: [0, 0], bold: [1, 22], dim: [2, 22], italic: [3, 23], underline: [4, 24], blink: [5, 25], inverse: [7, 27], hidden: [8, 28], strikethrough: [9, 29], doubleunderline: [21, 24], black: [30, mr], red: [31, mr], green: [32, mr], yellow: [33, mr], blue: [34, mr], magenta: [35, mr], cyan: [36, mr], white: [37, mr], bgBlack: [40, Sr], bgRed: [41, Sr], bgGreen: [42, Sr], bgYellow: [43, Sr], bgBlue: [44, Sr], bgMagenta: [45, Sr], bgCyan: [46, Sr], bgWhite: [47, Sr], framed: [51, 54], overlined: [53, 55], gray: [90, mr], redBright: [91, mr], greenBright: [92, mr], yellowBright: [93, mr], blueBright: [94, mr], magentaBright: [95, mr], cyanBright: [96, mr], whiteBright: [97, mr], bgGray: [100, Sr], bgRedBright: [101, Sr], bgGreenBright: [102, Sr], bgYellowBright: [103, Sr], bgBlueBright: [104, Sr], bgMagentaBright: [105, Sr], bgCyanBright: [106, Sr], bgWhiteBright: [107, Sr] }, Pr("gray", "grey"), Pr("gray", "blackBright"), Pr("bgGray", "bgGrey"), Pr("bgGray", "bgBlackBright"), Pr("dim", "faint"), Pr("strikethrough", "crossedout"), Pr("strikethrough", "strikeThrough"), Pr("strikethrough", "crossedOut"), Pr("hidden", "conceal"), Pr("inverse", "swapColors"), Pr("inverse", "swapcolors"), Pr("doubleunderline", "doubleUnderline"), vr.styles = tt({ __proto__: null }, { special: "cyan", number: "yellow", bigint: "yellow", boolean: "yellow", undefined: "grey", null: "bold", string: "green", symbol: "green", date: "magenta", regexp: "red", module: "underline" });
	        var Hr = function(t3) {
	          return "... ".concat(t3, " more item").concat(t3 > 1 ? "s" : "");
	        };
	        function Gr(t3, e3, r3) {
	          if (!r3)
	            return at(e3, -0) ? t3("-0", "number") : t3("".concat(e3), "number");
	          var n2 = U(e3), o2 = wt(n2);
	          return n2 === e3 ? !Z(e3) || Et(o2, "e") ? t3(o2, "number") : t3("".concat(Cr(o2)), "number") : q(e3) ? t3(o2, "number") : t3("".concat(Cr(o2), ".").concat(function(t4) {
	            for (var e4 = "", r4 = 0; r4 < t4.length - 3; r4 += 3)
	              e4 += "".concat(zt(t4, r4, r4 + 3), "_");
	            return 0 === r4 ? t4 : "".concat(e4).concat(zt(t4, r4));
	          }(zt(wt(e3), o2.length + 1))), "number");
	        }
	        function Wr(t3, e3, r3) {
	          var n2 = wt(e3);
	          return t3("".concat(r3 ? Cr(n2) : n2, "n"), "bigint");
	        }
	        function Vr(t3, e3, r3) {
	          if ("string" == typeof e3) {
	            var n2 = "";
	            if (e3.length > r3.maxStringLength) {
	              var o2 = e3.length - r3.maxStringLength;
	              e3 = zt(e3, 0, r3.maxStringLength), n2 = "... ".concat(o2, " more character").concat(o2 > 1 ? "s" : "");
	            }
	            return true !== r3.compact && e3.length > yr && e3.length > r3.breakLength - r3.indentationLvl - 4 ? m(S(Je(e3), function(e4) {
	              return t3(wr(e4), "string");
	            }), " +\n".concat(Tt(" ", r3.indentationLvl + 2))) + n2 : t3(wr(e3), "string") + n2;
	          }
	          return "number" == typeof e3 ? Gr(t3, e3, r3.numericSeparator) : "bigint" == typeof e3 ? Wr(t3, e3, r3.numericSeparator) : "boolean" == typeof e3 ? t3("".concat(e3), "boolean") : void 0 === e3 ? t3("undefined", "undefined") : t3(Gt(e3), "symbol");
	        }
	        function Ur(t3, e3, r3, n2) {
	          for (var o2 = new s(t3.length), i2 = 0; i2 < t3.length; i2++)
	            try {
	              o2[i2] = an(e3, r3, n2, t3[i2], er);
	            } catch (r4) {
	              He(_e(r4) && "ReferenceError" === r4.name);
	              var a2 = l({}, t3[i2], "");
	              o2[i2] = an(e3, a2, n2, t3[i2], er);
	              var c2 = Ft(o2[i2], " ");
	              o2[i2] = zt(o2[i2], 0, c2 + 1) + e3.stylize("<uninitialized>", "special");
	            }
	          return t3.length = 0, o2;
	        }
	        function $r(t3, e3, r3, n2, o2, i2) {
	          for (var a2 = ct(e3), c2 = i2; i2 < a2.length && o2.length < n2; i2++) {
	            var l2 = a2[i2], u2 = +l2;
	            if (u2 > Math.pow(2, 32) - 2)
	              break;
	            if ("".concat(c2) !== l2) {
	              if (null === dt(cr, l2))
	                break;
	              var p2 = u2 - c2, f2 = p2 > 1 ? "s" : "", y2 = "<".concat(p2, " empty item").concat(f2, ">");
	              if (x(o2, t3.stylize(y2, "undefined")), c2 = u2, o2.length === n2)
	                break;
	            }
	            x(o2, an(t3, e3, r3, l2, rr)), c2++;
	          }
	          var s2 = e3.length - c2;
	          if (o2.length !== n2) {
	            if (s2 > 0) {
	              var g2 = s2 > 1 ? "s" : "", d2 = "<".concat(s2, " empty item").concat(g2, ">");
	              x(o2, t3.stylize(d2, "undefined"));
	            }
	          } else
	            s2 > 0 && x(o2, Hr(s2));
	          return o2;
	        }
	        function Zr(t3, e3) {
	          var n2;
	          try {
	            n2 = new qt(e3);
	          } catch (e4) {
	            return [t3.stylize("(detached)", "special")];
	          }
	          void 0 === u && (u = Yt(r2(627).l.prototype.hexSlice));
	          var o2 = Ct(bt(/(.{2})/g, u(n2, 0, G(t3.maxArrayLength, n2.length)), "$1 ")), i2 = n2.length - t3.maxArrayLength;
	          return i2 > 0 && (o2 += " ... ".concat(i2, " more byte").concat(i2 > 1 ? "s" : "")), ["".concat(t3.stylize("[Uint8Contents]", "special"), ": <").concat(o2, ">")];
	        }
	        function qr(t3, e3, r3) {
	          for (var n2 = e3.length, o2 = G(H(0, t3.maxArrayLength), n2), i2 = n2 - o2, a2 = [], c2 = 0; c2 < o2; c2++) {
	            if (!lt(e3, c2))
	              return $r(t3, e3, r3, o2, a2, c2);
	            x(a2, an(t3, e3, r3, c2, rr));
	          }
	          return i2 > 0 && x(a2, Hr(i2)), a2;
	        }
	        function Kr(t3, e3, r3, n2, o2) {
	          for (var i2 = G(H(0, r3.maxArrayLength), e3), a2 = t3.length - i2, c2 = new s(i2), l2 = t3.length > 0 && "number" == typeof t3[0] ? Gr : Wr, u2 = 0; u2 < i2; ++u2)
	            c2[u2] = l2(r3.stylize, t3[u2], r3.numericSeparator);
	          if (a2 > 0 && (c2[i2] = Hr(a2)), r3.showHidden) {
	            r3.indentationLvl += 2;
	            for (var p2 = 0, f2 = ["BYTES_PER_ELEMENT", "length", "byteLength", "byteOffset", "buffer"]; p2 < f2.length; p2++) {
	              var y2 = f2[p2], g2 = Ir(r3, t3[y2], o2, true);
	              x(c2, "[".concat(y2, "]: ").concat(g2));
	            }
	            r3.indentationLvl -= 2;
	          }
	          return c2;
	        }
	        function Yr(t3, e3, r3, n2) {
	          var i2 = t3.size, a2 = G(H(0, e3.maxArrayLength), i2), c2 = i2 - a2, l2 = [];
	          e3.indentationLvl += 2;
	          var u2, p2 = 0, f2 = o(t3);
	          try {
	            for (f2.s(); !(u2 = f2.n()).done; ) {
	              var y2 = u2.value;
	              if (p2 >= a2)
	                break;
	              x(l2, Ir(e3, y2, n2)), p2++;
	            }
	          } catch (t4) {
	            f2.e(t4);
	          } finally {
	            f2.f();
	          }
	          return c2 > 0 && x(l2, Hr(c2)), e3.indentationLvl -= 2, l2;
	        }
	        function Jr(t3, e3, r3, n2) {
	          var i2 = t3.size, a2 = G(H(0, e3.maxArrayLength), i2), c2 = i2 - a2, l2 = [];
	          e3.indentationLvl += 2;
	          var u2, p2 = 0, f2 = o(t3);
	          try {
	            for (f2.s(); !(u2 = f2.n()).done; ) {
	              var y2 = u2.value, s2 = y2[0], g2 = y2[1];
	              if (p2 >= a2)
	                break;
	              x(l2, "".concat(Ir(e3, s2, n2), " => ").concat(Ir(e3, g2, n2))), p2++;
	            }
	          } catch (t4) {
	            f2.e(t4);
	          } finally {
	            f2.f();
	          }
	          return c2 > 0 && x(l2, Hr(c2)), e3.indentationLvl -= 2, l2;
	        }
	        function Qr(t3, e3, r3, n2) {
	          var o2 = H(t3.maxArrayLength, 0), i2 = G(o2, r3.length), a2 = new s(i2);
	          t3.indentationLvl += 2;
	          for (var c2 = 0; c2 < i2; c2++)
	            a2[c2] = Ir(t3, r3[c2], e3);
	          t3.indentationLvl -= 2, n2 !== sr || t3.sorted || j(a2);
	          var l2 = r3.length - i2;
	          return l2 > 0 && x(a2, Hr(l2)), a2;
	        }
	        function Xr(t3, e3, r3, n2) {
	          var o2 = H(t3.maxArrayLength, 0), i2 = r3.length / 2, a2 = i2 - o2, c2 = G(o2, i2), l2 = new s(c2), u2 = 0;
	          if (t3.indentationLvl += 2, n2 === sr) {
	            for (; u2 < c2; u2++) {
	              var p2 = 2 * u2;
	              l2[u2] = "".concat(Ir(t3, r3[p2], e3), " => ").concat(Ir(t3, r3[p2 + 1], e3));
	            }
	            t3.sorted || j(l2);
	          } else
	            for (; u2 < c2; u2++) {
	              var f2 = 2 * u2, y2 = [Ir(t3, r3[f2], e3), Ir(t3, r3[f2 + 1], e3)];
	              l2[u2] = ln(t3, y2, "", ["[", "]"], nr, e3);
	            }
	          return t3.indentationLvl -= 2, a2 > 0 && x(l2, Hr(a2)), l2;
	        }
	        function tn(t3) {
	          return [t3.stylize("<items unknown>", "special")];
	        }
	        function en(t3, e3, r3) {
	          return Qr(t3, r3, ae(e3), sr);
	        }
	        function rn(t3, e3, r3) {
	          return Xr(t3, r3, ae(e3), sr);
	        }
	        function nn(t3, e3, r3, n2) {
	          var o2 = ae(r3, true), i2 = o2[0];
	          return o2[1] ? (t3[0] = bt(/ Iterator] {$/, t3[0], " Entries] {"), Xr(e3, n2, i2, dr)) : Qr(e3, n2, i2, gr);
	        }
	        function on(t3, e3, r3) {
	          var n2, o2 = oe(e3), i2 = o2[0], a2 = o2[1];
	          if (i2 === ee)
	            n2 = [t3.stylize("<pending>", "special")];
	          else {
	            t3.indentationLvl += 2;
	            var c2 = Ir(t3, a2, r3);
	            t3.indentationLvl -= 2, n2 = [i2 === re ? "".concat(t3.stylize("<rejected>", "special"), " ").concat(c2) : c2];
	          }
	          return n2;
	        }
	        function an(t3, e3, r3, o2, i2, a2) {
	          var c2, l2, u2 = arguments.length > 6 && void 0 !== arguments[6] ? arguments[6] : e3, p2 = " ";
	          if (void 0 !== (a2 = a2 || rt(e3, o2) || { value: e3[o2], enumerable: true }).value) {
	            var f2 = true !== t3.compact || i2 !== er ? 2 : 3;
	            t3.indentationLvl += f2, l2 = Ir(t3, a2.value, r3), 3 === f2 && t3.breakLength < ir(l2, t3.colors) && (p2 = "\n".concat(Tt(" ", t3.indentationLvl))), t3.indentationLvl -= f2;
	          } else if (void 0 !== a2.get) {
	            var y2 = void 0 !== a2.set ? "Getter/Setter" : "Getter", s2 = t3.stylize, g2 = "special";
	            if (t3.getters && (true === t3.getters || "get" === t3.getters && void 0 === a2.set || "set" === t3.getters && void 0 !== a2.set))
	              try {
	                var d2 = z(a2.get, u2);
	                if (t3.indentationLvl += 2, null === d2)
	                  l2 = "".concat(s2("[".concat(y2, ":"), g2), " ").concat(s2("null", "null")).concat(s2("]", g2));
	                else if ("object" === n(d2))
	                  l2 = "".concat(s2("[".concat(y2, "]"), g2), " ").concat(Ir(t3, d2, r3));
	                else {
	                  var b2 = Vr(s2, d2, t3);
	                  l2 = "".concat(s2("[".concat(y2, ":"), g2), " ").concat(b2).concat(s2("]", g2));
	                }
	                t3.indentationLvl -= 2;
	              } catch (t4) {
	                var h2 = "<Inspection threw (".concat(t4.message, ")>");
	                l2 = "".concat(s2("[".concat(y2, ":"), g2), " ").concat(h2).concat(s2("]", g2));
	              }
	            else
	              l2 = t3.stylize("[".concat(y2, "]"), g2);
	          } else
	            l2 = void 0 !== a2.set ? t3.stylize("[Setter]", "special") : t3.stylize("undefined", "undefined");
	          if (i2 === rr)
	            return l2;
	          if ("symbol" === n(o2)) {
	            var v2 = bt(qe, Gt(o2), Or);
	            c2 = "[".concat(t3.stylize(v2, "symbol"), "]");
	          } else if ("__proto__" === o2)
	            c2 = "['__proto__']";
	          else if (false === a2.enumerable) {
	            var m2 = bt(qe, o2, Or);
	            c2 = "[".concat(m2, "]");
	          } else
	            c2 = null !== dt(ar, o2) ? t3.stylize(o2, "name") : t3.stylize(wr(o2), "string");
	          return "".concat(c2, ":").concat(p2).concat(l2);
	        }
	        function cn(t3, e3, r3, n2) {
	          var o2 = e3.length + r3;
	          if (o2 + e3.length > t3.breakLength)
	            return false;
	          for (var i2 = 0; i2 < e3.length; i2++)
	            if (t3.colors ? o2 += ge(e3[i2]).length : o2 += e3[i2].length, o2 > t3.breakLength)
	              return false;
	          return "" === n2 || !Et(n2, "\n");
	        }
	        function ln(t3, e3, r3, n2, o2, i2, a2) {
	          if (true !== t3.compact) {
	            if ("number" == typeof t3.compact && t3.compact >= 1) {
	              var c2 = e3.length;
	              if (o2 === nr && c2 > 6 && (e3 = function(t4, e4, r4) {
	                var n3 = 0, o3 = 0, i3 = 0, a3 = e4.length;
	                t4.maxArrayLength < e4.length && a3--;
	                for (var c3 = new s(a3); i3 < a3; i3++) {
	                  var l3 = ir(e4[i3], t4.colors);
	                  c3[i3] = l3, n3 += l3 + 2, o3 < l3 && (o3 = l3);
	                }
	                var u3 = o3 + 2;
	                if (3 * u3 + t4.indentationLvl < t4.breakLength && (n3 / u3 > 5 || o3 <= 6)) {
	                  var p3 = V(u3 - n3 / e4.length), f3 = H(u3 - 3 - p3, 1), y2 = G(W(V(2.5 * f3 * a3) / f3), C((t4.breakLength - t4.indentationLvl) / u3), 4 * t4.compact, 15);
	                  if (y2 <= 1)
	                    return e4;
	                  for (var g2 = [], d2 = [], b2 = 0; b2 < y2; b2++) {
	                    for (var h2 = 0, v2 = b2; v2 < e4.length; v2 += y2)
	                      c3[v2] > h2 && (h2 = c3[v2]);
	                    h2 += 2, d2[b2] = h2;
	                  }
	                  var m2 = kt;
	                  if (void 0 !== r4) {
	                    for (var S2 = 0; S2 < e4.length; S2++)
	                      if ("number" != typeof r4[S2] && "bigint" != typeof r4[S2]) {
	                        m2 = Rt;
	                        break;
	                      }
	                  }
	                  for (var P2 = 0; P2 < a3; P2 += y2) {
	                    for (var O2 = G(P2 + y2, a3), w2 = "", A2 = P2; A2 < O2 - 1; A2++) {
	                      var j2 = d2[A2 - P2] + e4[A2].length - c3[A2];
	                      w2 += m2("".concat(e4[A2], ", "), j2, " ");
	                    }
	                    if (m2 === kt) {
	                      var E2 = d2[A2 - P2] + e4[A2].length - c3[A2] - 2;
	                      w2 += kt(e4[A2], E2, " ");
	                    } else
	                      w2 += e4[A2];
	                    x(g2, w2);
	                  }
	                  t4.maxArrayLength < e4.length && x(g2, e4[a3]), e4 = g2;
	                }
	                return e4;
	              }(t3, e3, a2)), t3.currentDepth - i2 < t3.compact && c2 === e3.length && cn(t3, e3, e3.length + t3.indentationLvl + n2[0].length + r3.length + 10, r3)) {
	                var l2 = se(e3, ", ");
	                if (!Et(l2, "\n"))
	                  return "".concat(r3 ? "".concat(r3, " ") : "").concat(n2[0], " ").concat(l2) + " ".concat(n2[1]);
	              }
	            }
	            var u2 = "\n".concat(Tt(" ", t3.indentationLvl));
	            return "".concat(r3 ? "".concat(r3, " ") : "").concat(n2[0]).concat(u2, "  ") + "".concat(se(e3, ",".concat(u2, "  "))).concat(u2).concat(n2[1]);
	          }
	          if (cn(t3, e3, 0, r3))
	            return "".concat(n2[0]).concat(r3 ? " ".concat(r3) : "", " ").concat(se(e3, ", "), " ") + n2[1];
	          var p2 = Tt(" ", t3.indentationLvl), f2 = "" === r3 && 1 === n2[0].length ? " " : "".concat(r3 ? " ".concat(r3) : "", "\n").concat(p2, "  ");
	          return "".concat(n2[0]).concat(f2).concat(se(e3, ",\n".concat(p2, "  ")), " ").concat(n2[1]);
	        }
	        function un(t3) {
	          var e3 = ie(t3, false);
	          if (void 0 !== e3) {
	            if (null === e3)
	              return true;
	            t3 = e3;
	          }
	          if ("function" != typeof t3.toString)
	            return true;
	          if (lt(t3, "toString"))
	            return false;
	          var r3 = t3;
	          do {
	            r3 = it(r3);
	          } while (!lt(r3, "toString"));
	          var n2 = rt(r3, "constructor");
	          return void 0 !== n2 && "function" == typeof n2.value && Qe.has(n2.value.name);
	        }
	        var pn, fn = function(t3) {
	          return Mt(t3.message, "\n", 1)[0];
	        };
	        function yn(t3) {
	          try {
	            return B(t3);
	          } catch (t4) {
	            if (!pn)
	              try {
	                var e3 = {};
	                e3.a = e3, B(e3);
	              } catch (t5) {
	                pn = fn(t5);
	              }
	            if ("TypeError" === t4.name && fn(t4) === pn)
	              return "[Circular]";
	            throw t4;
	          }
	        }
	        function sn(t3, e3) {
	          var r3;
	          return Gr(jr, t3, null !== (r3 = null == e3 ? void 0 : e3.numericSeparator) && void 0 !== r3 ? r3 : tr.numericSeparator);
	        }
	        function gn(t3, e3) {
	          var r3;
	          return Wr(jr, t3, null !== (r3 = null == e3 ? void 0 : e3.numericSeparator) && void 0 !== r3 ? r3 : tr.numericSeparator);
	        }
	        function dn(t3, e3) {
	          var r3 = e3[0], o2 = 0, i2 = "", a2 = "";
	          if ("string" == typeof r3) {
	            if (1 === e3.length)
	              return r3;
	            for (var l2, u2 = 0, p2 = 0; p2 < r3.length - 1; p2++)
	              if (37 === At(r3, p2)) {
	                var f2 = At(r3, ++p2);
	                if (o2 + 1 !== e3.length) {
	                  switch (f2) {
	                    case 115:
	                      var y2 = e3[++o2];
	                      l2 = "number" == typeof y2 ? sn(y2, t3) : "bigint" == typeof y2 ? gn(y2, t3) : "object" === n(y2) && null !== y2 && un(y2) ? vr(y2, c(c({}, t3), {}, { compact: 3, colors: false, depth: 0 })) : wt(y2);
	                      break;
	                    case 106:
	                      l2 = yn(e3[++o2]);
	                      break;
	                    case 100:
	                      var s2 = e3[++o2];
	                      l2 = "bigint" == typeof s2 ? gn(s2, t3) : "symbol" === n(s2) ? "NaN" : sn($(s2), t3);
	                      break;
	                    case 79:
	                      l2 = vr(e3[++o2], t3);
	                      break;
	                    case 111:
	                      l2 = vr(e3[++o2], c(c({}, t3), {}, { showHidden: true, showProxy: true, depth: 4 }));
	                      break;
	                    case 105:
	                      var g2 = e3[++o2];
	                      l2 = "bigint" == typeof g2 ? gn(g2, t3) : "symbol" === n(g2) ? "NaN" : sn(Y(g2), t3);
	                      break;
	                    case 102:
	                      var d2 = e3[++o2];
	                      l2 = "symbol" === n(d2) ? "NaN" : sn(K(d2), t3);
	                      break;
	                    case 99:
	                      o2 += 1, l2 = "";
	                      break;
	                    case 37:
	                      i2 += zt(r3, u2, p2), u2 = p2 + 1;
	                      continue;
	                    default:
	                      continue;
	                  }
	                  u2 !== p2 - 1 && (i2 += zt(r3, u2, p2 - 1)), i2 += l2, u2 = p2 + 1;
	                } else
	                  37 === f2 && (i2 += zt(r3, u2, p2), u2 = p2 + 1);
	              }
	            0 !== u2 && (o2++, a2 = " ", u2 < r3.length && (i2 += zt(r3, u2)));
	          }
	          for (; o2 < e3.length; ) {
	            var b2 = e3[o2];
	            i2 += a2, i2 += "string" != typeof b2 ? vr(b2, t3) : b2, a2 = " ", o2++;
	          }
	          return i2;
	        }
	        function bn(t3) {
	          return t3 <= 31 || t3 >= 127 && t3 <= 159 || t3 >= 768 && t3 <= 879 || t3 >= 8203 && t3 <= 8207 || t3 >= 8400 && t3 <= 8447 || t3 >= 65024 && t3 <= 65039 || t3 >= 65056 && t3 <= 65071 || t3 >= 917760 && t3 <= 917999;
	        }
	        if (y("config").hasIntl)
	          He(false);
	        else {
	          ir = function(t3) {
	            var e3 = 0;
	            (!(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1]) && (t3 = vn(t3)), t3 = Lt(t3, "NFC");
	            var r3, n2 = o(new mt(t3));
	            try {
	              for (n2.s(); !(r3 = n2.n()).done; ) {
	                var i2 = r3.value, a2 = jt(i2, 0);
	                hn(a2) ? e3 += 2 : bn(a2) || e3++;
	              }
	            } catch (t4) {
	              n2.e(t4);
	            } finally {
	              n2.f();
	            }
	            return e3;
	          };
	          var hn = function(t3) {
	            return t3 >= 4352 && (t3 <= 4447 || 9001 === t3 || 9002 === t3 || t3 >= 11904 && t3 <= 12871 && 12351 !== t3 || t3 >= 12880 && t3 <= 19903 || t3 >= 19968 && t3 <= 42182 || t3 >= 43360 && t3 <= 43388 || t3 >= 44032 && t3 <= 55203 || t3 >= 63744 && t3 <= 64255 || t3 >= 65040 && t3 <= 65049 || t3 >= 65072 && t3 <= 65131 || t3 >= 65281 && t3 <= 65376 || t3 >= 65504 && t3 <= 65510 || t3 >= 110592 && t3 <= 110593 || t3 >= 127488 && t3 <= 127569 || t3 >= 127744 && t3 <= 128591 || t3 >= 131072 && t3 <= 262141);
	          };
	        }
	        function vn(t3) {
	          return Ue(t3, "str"), bt(hr, t3, "");
	        }
	        var mn = { 34: "&quot;", 38: "&amp;", 39: "&apos;", 60: "&lt;", 62: "&gt;", 160: "&nbsp;" };
	        function Sn(t3) {
	          return t3.replace(/[\u0000-\u002F\u003A-\u0040\u005B-\u0060\u007B-\u00FF]/g, function(t4) {
	            var e3 = wt(t4.charCodeAt(0));
	            return mn[e3] || "&#" + e3 + ";";
	          });
	        }
	        t2.exports = { identicalSequenceRange: Mr, inspect: vr, inspectDefaultOptions: tr, format: function() {
	          for (var t3 = arguments.length, e3 = new Array(t3), r3 = 0; r3 < t3; r3++)
	            e3[r3] = arguments[r3];
	          return dn(void 0, e3);
	        }, formatWithOptions: function(t3) {
	          Ve(t3, "inspectOptions", $e);
	          for (var e3 = arguments.length, r3 = new Array(e3 > 1 ? e3 - 1 : 0), n2 = 1; n2 < e3; n2++)
	            r3[n2 - 1] = arguments[n2];
	          return dn(t3, r3);
	        }, getStringWidth: ir, stripVTControlCharacters: vn, isZeroWidthCodePoint: bn, stylizeWithColor: Ar, stylizeWithHTML: function(t3, e3) {
	          var r3 = vr.styles[e3];
	          return void 0 !== r3 ? '<span style="color:'.concat(r3, ';">').concat(Sn(t3), "</span>") : Sn(t3);
	        }, Proxy: ue };
	      }, 829: (t2) => {
	        function e2(t3) {
	          if (!t3)
	            throw new Error("Assertion failed");
	        }
	        e2.fail = function(t3) {
	          throw new Error(t3);
	        }, t2.exports = e2;
	      }, 991: (t2, e2) => {
	        var r2 = ["_http_agent", "_http_client", "_http_common", "_http_incoming", "_http_outgoing", "_http_server", "_stream_duplex", "_stream_passthrough", "_stream_readable", "_stream_transform", "_stream_wrap", "_stream_writable", "_tls_common", "_tls_wrap", "assert", "assert/strict", "async_hooks", "buffer", "child_process", "cluster", "console", "constants", "crypto", "dgram", "diagnostics_channel", "dns", "dns/promises", "domain", "events", "fs", "fs/promises", "http", "http2", "https", "inspector", "module", "Module", "net", "os", "path", "path/posix", "path/win32", "perf_hooks", "process", "punycode", "querystring", "readline", "readline/promises", "repl", "stream", "stream/consumers", "stream/promises", "stream/web", "string_decoder", "sys", "timers", "timers/promises", "tls", "trace_events", "tty", "url", "util", "util/types", "v8", "vm", "wasi", "worker_threads", "zlib"];
	        e2.BuiltinModule = { exists: function(t3) {
	          return t3.startsWith("internal/") || -1 !== r2.indexOf(t3);
	        } };
	      }, 160: (t2) => {
	        t2.exports = { CHAR_DOT: 46, CHAR_FORWARD_SLASH: 47, CHAR_BACKWARD_SLASH: 92 };
	      }, 488: (t2, e2, r2) => {
	        function n(t3) {
	          return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
	            return typeof t4;
	          } : function(t4) {
	            return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
	          }, n(t3);
	        }
	        function o(t3, e3) {
	          (null == e3 || e3 > t3.length) && (e3 = t3.length);
	          for (var r3 = 0, n2 = new Array(e3); r3 < e3; r3++)
	            n2[r3] = t3[r3];
	          return n2;
	        }
	        var i, a, c = r2(315), l = c.ArrayIsArray, u = c.ArrayPrototypeIncludes, p = c.ArrayPrototypeIndexOf, f = c.ArrayPrototypeJoin, y = c.ArrayPrototypePop, s = c.ArrayPrototypePush, g = c.ArrayPrototypeSplice, d = c.ErrorCaptureStackTrace, b = c.ObjectDefineProperty, h = c.ReflectApply, v = c.RegExpPrototypeTest, m = c.SafeMap, S = c.StringPrototypeEndsWith, P = c.StringPrototypeIncludes, x = c.StringPrototypeSlice, O = c.StringPrototypeToLowerCase, w = new m(), A = {}, j = /^([A-Z][a-z0-9]*)+$/, E = ["string", "function", "number", "object", "Function", "Object", "boolean", "bigint", "symbol"], _ = null;
	        function F() {
	          return _ || (_ = r2(973)), _;
	        }
	        var L = R(function(t3, e3, r3) {
	          (t3 = D(t3)).name = "".concat(e3, " [").concat(r3, "]"), t3.stack, delete t3.name;
	        });
	        function R(t3) {
	          var e3 = "__node_internal_" + t3.name;
	          return b(t3, "name", { value: e3 }), t3;
	        }
	        var k, T, I, z, M, B, N, D = R(function(t3) {
	          return i = Error.stackTraceLimit, Error.stackTraceLimit = 1 / 0, d(t3), Error.stackTraceLimit = i, t3;
	        });
	        t2.exports = { codes: A, hideStackFrames: R, isStackOverflowError: function(t3) {
	          if (void 0 === T)
	            try {
	              !function t4() {
	                t4();
	              }();
	            } catch (t4) {
	              T = t4.message, k = t4.name;
	            }
	          return t3 && t3.name === k && t3.message === T;
	        } }, I = "ERR_INVALID_ARG_TYPE", z = function(t3, e3, r3) {
	          a("string" == typeof t3, "'name' must be a string"), l(e3) || (e3 = [e3]);
	          var i2 = "The ";
	          if (S(t3, " argument"))
	            i2 += "".concat(t3, " ");
	          else {
	            var c2 = P(t3, ".") ? "property" : "argument";
	            i2 += '"'.concat(t3, '" ').concat(c2, " ");
	          }
	          i2 += "must be ";
	          var d2, b2 = [], h2 = [], m2 = [], w2 = function(t4, e4) {
	            var r4 = "undefined" != typeof Symbol && t4[Symbol.iterator] || t4["@@iterator"];
	            if (!r4) {
	              if (Array.isArray(t4) || (r4 = function(t5, e5) {
	                if (t5) {
	                  if ("string" == typeof t5)
	                    return o(t5, e5);
	                  var r5 = Object.prototype.toString.call(t5).slice(8, -1);
	                  return "Object" === r5 && t5.constructor && (r5 = t5.constructor.name), "Map" === r5 || "Set" === r5 ? Array.from(t5) : "Arguments" === r5 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r5) ? o(t5, e5) : void 0;
	                }
	              }(t4)) || e4 && t4 && "number" == typeof t4.length) {
	                r4 && (t4 = r4);
	                var n2 = 0, i3 = function() {
	                };
	                return { s: i3, n: function() {
	                  return n2 >= t4.length ? { done: true } : { done: false, value: t4[n2++] };
	                }, e: function(t5) {
	                  throw t5;
	                }, f: i3 };
	              }
	              throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	            }
	            var a2, c3 = true, l2 = false;
	            return { s: function() {
	              r4 = r4.call(t4);
	            }, n: function() {
	              var t5 = r4.next();
	              return c3 = t5.done, t5;
	            }, e: function(t5) {
	              l2 = true, a2 = t5;
	            }, f: function() {
	              try {
	                c3 || null == r4.return || r4.return();
	              } finally {
	                if (l2)
	                  throw a2;
	              }
	            } };
	          }(e3);
	          try {
	            for (w2.s(); !(d2 = w2.n()).done; ) {
	              var A2 = d2.value;
	              a("string" == typeof A2, "All expected entries have to be of type string"), u(E, A2) ? s(b2, O(A2)) : v(j, A2) ? s(h2, A2) : (a("object" !== A2, 'The value "object" should be written as "Object"'), s(m2, A2));
	            }
	          } catch (t4) {
	            w2.e(t4);
	          } finally {
	            w2.f();
	          }
	          if (h2.length > 0) {
	            var _2 = p(b2, "object");
	            -1 !== _2 && (g(b2, _2, 1), s(h2, "Object"));
	          }
	          if (b2.length > 0) {
	            if (b2.length > 2) {
	              var L2 = y(b2);
	              i2 += "one of type ".concat(f(b2, ", "), ", or ").concat(L2);
	            } else
	              i2 += 2 === b2.length ? "one of type ".concat(b2[0], " or ").concat(b2[1]) : "of type ".concat(b2[0]);
	            (h2.length > 0 || m2.length > 0) && (i2 += " or ");
	          }
	          if (h2.length > 0) {
	            if (h2.length > 2) {
	              var R2 = y(h2);
	              i2 += "an instance of ".concat(f(h2, ", "), ", or ").concat(R2);
	            } else
	              i2 += "an instance of ".concat(h2[0]), 2 === h2.length && (i2 += " or ".concat(h2[1]));
	            m2.length > 0 && (i2 += " or ");
	          }
	          if (m2.length > 0)
	            if (m2.length > 2) {
	              var k2 = y(m2);
	              i2 += "one of ".concat(f(m2, ", "), ", or ").concat(k2);
	            } else
	              2 === m2.length ? i2 += "one of ".concat(m2[0], " or ").concat(m2[1]) : (O(m2[0]) !== m2[0] && (i2 += "an "), i2 += "".concat(m2[0]));
	          if (null == r3)
	            i2 += ". Received ".concat(r3);
	          else if ("function" == typeof r3 && r3.name)
	            i2 += ". Received function ".concat(r3.name);
	          else if ("object" === n(r3))
	            if (r3.constructor && r3.constructor.name)
	              i2 += ". Received an instance of ".concat(r3.constructor.name);
	            else {
	              var T2 = F().inspect(r3, { depth: -1 });
	              i2 += ". Received ".concat(T2);
	            }
	          else {
	            var I2 = F().inspect(r3, { colors: false });
	            I2.length > 25 && (I2 = "".concat(x(I2, 0, 25), "...")), i2 += ". Received type ".concat(n(r3), " (").concat(I2, ")");
	          }
	          return i2;
	        }, M = TypeError, w.set(I, z), A[I] = (B = M, N = I, function() {
	          var t3 = Error.stackTraceLimit;
	          Error.stackTraceLimit = 0;
	          var e3 = new B();
	          Error.stackTraceLimit = t3;
	          for (var n2 = arguments.length, o2 = new Array(n2), i2 = 0; i2 < n2; i2++)
	            o2[i2] = arguments[i2];
	          var c2 = function(t4, e4, n3) {
	            var o3 = w.get(t4);
	            return void 0 === a && (a = r2(829)), a("function" == typeof o3), a(o3.length <= e4.length, "Code: ".concat(t4, "; The provided arguments length (").concat(e4.length, ") does not ") + "match the required ones (".concat(o3.length, ").")), h(o3, n3, e4);
	          }(N, o2, e3);
	          return b(e3, "message", { value: c2, enumerable: false, writable: true, configurable: true }), b(e3, "toString", { value: function() {
	            return "".concat(this.name, " [").concat(N, "]: ").concat(this.message);
	          }, enumerable: false, writable: true, configurable: true }), L(e3, B.name, N), e3.code = N, e3;
	        });
	      }, 377: (t2, e2, r2) => {
	        var n = r2(315), o = n.StringPrototypeCharCodeAt, i = n.StringPrototypeIncludes, a = n.StringPrototypeReplace, c = r2(160).CHAR_FORWARD_SLASH, l = r2(657), u = /%/g, p = /\\/g, f = /\n/g, y = /\r/g, s = /\t/g;
	        t2.exports = { pathToFileURL: function(t3) {
	          var e3 = new URL("file://"), r3 = l.resolve(t3);
	          return o(t3, t3.length - 1) === c && r3[r3.length - 1] !== l.sep && (r3 += "/"), e3.pathname = function(t4) {
	            return i(t4, "%") && (t4 = a(t4, u, "%25")), i(t4, "\\") && (t4 = a(t4, p, "%5C")), i(t4, "\n") && (t4 = a(t4, f, "%0A")), i(t4, "\r") && (t4 = a(t4, y, "%0D")), i(t4, "	") && (t4 = a(t4, s, "%09")), t4;
	          }(r3), e3;
	        } };
	      }, 162: (t2) => {
	        var e2 = /\u001b\[\d\d?m/g;
	        t2.exports = { customInspectSymbol: Symbol.for("nodejs.util.inspect.custom"), isError: function(t3) {
	          return t3 instanceof Error;
	        }, join: Array.prototype.join.call.bind(Array.prototype.join), removeColors: function(t3) {
	          return String.prototype.replace.call(t3, e2, "");
	        } };
	      }, 515: (t2, e2, r2) => {
	        function n(t3) {
	          return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
	            return typeof t4;
	          } : function(t4) {
	            return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
	          }, n(t3);
	        }
	        var o = r2(583).getConstructorName;
	        function i(t3) {
	          for (var e3 = arguments.length, r3 = new Array(e3 > 1 ? e3 - 1 : 0), i2 = 1; i2 < e3; i2++)
	            r3[i2 - 1] = arguments[i2];
	          for (var a2 = 0, c2 = r3; a2 < c2.length; a2++) {
	            var l2 = c2[a2], u2 = globalThis[l2];
	            if (u2 && t3 instanceof u2)
	              return true;
	          }
	          for (; t3; ) {
	            if ("object" !== n(t3))
	              return false;
	            if (r3.indexOf(o(t3)) >= 0)
	              return true;
	            t3 = Object.getPrototypeOf(t3);
	          }
	          return false;
	        }
	        function a(t3) {
	          return function(e3) {
	            if (!i(e3, t3.name))
	              return false;
	            try {
	              t3.prototype.valueOf.call(e3);
	            } catch (t4) {
	              return false;
	            }
	            return true;
	          };
	        }
	        "object" !== ("undefined" == typeof globalThis ? "undefined" : n(globalThis)) && (Object.defineProperty(Object.prototype, "__magic__", { get: function() {
	          return this;
	        }, configurable: true }), __magic__.globalThis = __magic__, delete Object.prototype.__magic__);
	        var c = a(String), l = a(Number), u = a(Boolean), p = a(BigInt), f = a(Symbol);
	        t2.exports = { isAsyncFunction: function(t3) {
	          return "function" == typeof t3 && Function.prototype.toString.call(t3).startsWith("async");
	        }, isGeneratorFunction: function(t3) {
	          return "function" == typeof t3 && Function.prototype.toString.call(t3).match(/^(async\s+)?function *\*/);
	        }, isAnyArrayBuffer: function(t3) {
	          return i(t3, "ArrayBuffer", "SharedArrayBuffer");
	        }, isArrayBuffer: function(t3) {
	          return i(t3, "ArrayBuffer");
	        }, isArgumentsObject: function(t3) {
	          if (null !== t3 && "object" === n(t3) && !Array.isArray(t3) && "number" == typeof t3.length && t3.length === (0 | t3.length) && t3.length >= 0) {
	            var e3 = Object.getOwnPropertyDescriptor(t3, "callee");
	            return e3 && !e3.enumerable;
	          }
	          return false;
	        }, isBoxedPrimitive: function(t3) {
	          return l(t3) || c(t3) || u(t3) || p(t3) || f(t3);
	        }, isDataView: function(t3) {
	          return i(t3, "DataView");
	        }, isExternal: function(t3) {
	          return "object" === n(t3) && Object.isFrozen(t3) && null == Object.getPrototypeOf(t3);
	        }, isMap: function(t3) {
	          if (!i(t3, "Map"))
	            return false;
	          try {
	            t3.has();
	          } catch (t4) {
	            return false;
	          }
	          return true;
	        }, isMapIterator: function(t3) {
	          return "[object Map Iterator]" === Object.prototype.toString.call(Object.getPrototypeOf(t3));
	        }, isModuleNamespaceObject: function(t3) {
	          return t3 && "object" === n(t3) && "Module" === t3[Symbol.toStringTag];
	        }, isNativeError: function(t3) {
	          return t3 instanceof Error && i(t3, "Error", "EvalError", "RangeError", "ReferenceError", "SyntaxError", "TypeError", "URIError", "AggregateError");
	        }, isPromise: function(t3) {
	          return i(t3, "Promise");
	        }, isSet: function(t3) {
	          if (!i(t3, "Set"))
	            return false;
	          try {
	            t3.has();
	          } catch (t4) {
	            return false;
	          }
	          return true;
	        }, isSetIterator: function(t3) {
	          return "[object Set Iterator]" === Object.prototype.toString.call(Object.getPrototypeOf(t3));
	        }, isWeakMap: function(t3) {
	          return i(t3, "WeakMap");
	        }, isWeakSet: function(t3) {
	          return i(t3, "WeakSet");
	        }, isRegExp: function(t3) {
	          return i(t3, "RegExp");
	        }, isDate: function(t3) {
	          if (i(t3, "Date"))
	            try {
	              return Date.prototype.getTime.call(t3), true;
	            } catch (t4) {
	            }
	          return false;
	        }, isTypedArray: function(t3) {
	          return i(t3, "Int8Array", "Uint8Array", "Uint8ClampedArray", "Int16Array", "Uint16Array", "Int32Array", "Uint32Array", "Float32Array", "Float64Array", "BigInt64Array", "BigUint64Array");
	        }, isStringObject: c, isNumberObject: l, isBooleanObject: u, isBigIntObject: p, isSymbolObject: f };
	      }, 217: (t2, e2, r2) => {
	        function n(t3) {
	          return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
	            return typeof t4;
	          } : function(t4) {
	            return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
	          }, n(t3);
	        }
	        var o = r2(315).ArrayIsArray, i = r2(488), a = i.hideStackFrames, c = i.codes.ERR_INVALID_ARG_TYPE, l = a(function(t3, e3) {
	          var r3 = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 0;
	          if (0 === r3) {
	            if (null === t3 || o(t3))
	              throw new c(e3, "Object", t3);
	            if ("object" !== n(t3))
	              throw new c(e3, "Object", t3);
	          } else {
	            if (0 == (1 & r3) && null === t3)
	              throw new c(e3, "Object", t3);
	            if (0 == (2 & r3) && o(t3))
	              throw new c(e3, "Object", t3);
	            var i2 = 0 == (4 & r3), a2 = n(t3);
	            if ("object" !== a2 && (i2 || "function" !== a2))
	              throw new c(e3, "Object", t3);
	          }
	        });
	        t2.exports = { kValidateObjectNone: 0, kValidateObjectAllowNullable: 1, kValidateObjectAllowArray: 2, kValidateObjectAllowFunction: 4, validateObject: l, validateString: function(t3, e3) {
	          if ("string" != typeof t3)
	            throw new c(e3, "string", t3);
	        } };
	      }, 657: (t2, e2, r2) => {
	        var n = r2(315), o = n.StringPrototypeCharCodeAt, i = n.StringPrototypeLastIndexOf, a = n.StringPrototypeSlice, c = r2(160), l = c.CHAR_DOT, u = c.CHAR_FORWARD_SLASH, p = r2(217).validateString;
	        function f(t3) {
	          return t3 === u;
	        }
	        t2.exports = { resolve: function() {
	          for (var t3 = "", e3 = false, r3 = arguments.length - 1; r3 >= -1 && !e3; r3--) {
	            var n2 = r3 >= 0 ? r3 < 0 || arguments.length <= r3 ? void 0 : arguments[r3] : "/";
	            p(n2, "path"), 0 !== n2.length && (t3 = "".concat(n2, "/").concat(t3), e3 = o(n2, 0) === u);
	          }
	          return t3 = function(t4, e4, r4, n3) {
	            for (var c2 = "", p2 = 0, f2 = -1, y = 0, s = 0, g = 0; g <= t4.length; ++g) {
	              if (g < t4.length)
	                s = o(t4, g);
	              else {
	                if (n3(s))
	                  break;
	                s = u;
	              }
	              if (n3(s)) {
	                if (f2 === g - 1 || 1 === y)
	                  ;
	                else if (2 === y) {
	                  if (c2.length < 2 || 2 !== p2 || o(c2, c2.length - 1) !== l || o(c2, c2.length - 2) !== l) {
	                    if (c2.length > 2) {
	                      var d = i(c2, r4);
	                      -1 === d ? (c2 = "", p2 = 0) : p2 = (c2 = a(c2, 0, d)).length - 1 - i(c2, r4), f2 = g, y = 0;
	                      continue;
	                    }
	                    if (0 !== c2.length) {
	                      c2 = "", p2 = 0, f2 = g, y = 0;
	                      continue;
	                    }
	                  }
	                  e4 && (c2 += c2.length > 0 ? "".concat(r4, "..") : "..", p2 = 2);
	                } else
	                  c2.length > 0 ? c2 += "".concat(r4).concat(a(t4, f2 + 1, g)) : c2 = a(t4, f2 + 1, g), p2 = g - f2 - 1;
	                f2 = g, y = 0;
	              } else
	                s === l && -1 !== y ? ++y : y = -1;
	            }
	            return c2;
	          }(t3, !e3, "/", f), e3 ? "/".concat(t3) : t3.length > 0 ? t3 : ".";
	        } };
	      }, 315: (t2, e2, r2) => {
	        function n(t3) {
	          return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
	            return typeof t4;
	          } : function(t4) {
	            return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
	          }, n(t3);
	        }
	        function o(t3, e3, r3) {
	          return e3 = u(e3), function(t4, e4) {
	            if (e4 && ("object" === n(e4) || "function" == typeof e4))
	              return e4;
	            if (void 0 !== e4)
	              throw new TypeError("Derived constructors may only return object or undefined");
	            return function(t5) {
	              if (void 0 === t5)
	                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	              return t5;
	            }(t4);
	          }(t3, c() ? Reflect.construct(e3, r3 || [], u(t3).constructor) : e3.apply(t3, r3));
	        }
	        function i(t3, e3) {
	          if ("function" != typeof e3 && null !== e3)
	            throw new TypeError("Super expression must either be null or a function");
	          t3.prototype = Object.create(e3 && e3.prototype, { constructor: { value: t3, writable: true, configurable: true } }), Object.defineProperty(t3, "prototype", { writable: false }), e3 && l(t3, e3);
	        }
	        function a(t3) {
	          var e3 = "function" == typeof Map ? /* @__PURE__ */ new Map() : void 0;
	          return a = function(t4) {
	            if (null === t4 || !function(t5) {
	              try {
	                return -1 !== Function.toString.call(t5).indexOf("[native code]");
	              } catch (e4) {
	                return "function" == typeof t5;
	              }
	            }(t4))
	              return t4;
	            if ("function" != typeof t4)
	              throw new TypeError("Super expression must either be null or a function");
	            if (void 0 !== e3) {
	              if (e3.has(t4))
	                return e3.get(t4);
	              e3.set(t4, r3);
	            }
	            function r3() {
	              return function(t5, e4, r4) {
	                if (c())
	                  return Reflect.construct.apply(null, arguments);
	                var n2 = [null];
	                n2.push.apply(n2, e4);
	                var o2 = new (t5.bind.apply(t5, n2))();
	                return r4 && l(o2, r4.prototype), o2;
	              }(t4, arguments, u(this).constructor);
	            }
	            return r3.prototype = Object.create(t4.prototype, { constructor: { value: r3, enumerable: false, writable: true, configurable: true } }), l(r3, t4);
	          }, a(t3);
	        }
	        function c() {
	          try {
	            var t3 = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
	            }));
	          } catch (t4) {
	          }
	          return (c = function() {
	            return !!t3;
	          })();
	        }
	        function l(t3, e3) {
	          return l = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(t4, e4) {
	            return t4.__proto__ = e4, t4;
	          }, l(t3, e3);
	        }
	        function u(t3) {
	          return u = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function(t4) {
	            return t4.__proto__ || Object.getPrototypeOf(t4);
	          }, u(t3);
	        }
	        function p(t3, e3) {
	          if (!(t3 instanceof e3))
	            throw new TypeError("Cannot call a class as a function");
	        }
	        function f(t3, e3) {
	          for (var r3 = 0; r3 < e3.length; r3++) {
	            var n2 = e3[r3];
	            n2.enumerable = n2.enumerable || false, n2.configurable = true, "value" in n2 && (n2.writable = true), Object.defineProperty(t3, s(n2.key), n2);
	          }
	        }
	        function y(t3, e3, r3) {
	          return e3 && f(t3.prototype, e3), r3 && f(t3, r3), Object.defineProperty(t3, "prototype", { writable: false }), t3;
	        }
	        function s(t3) {
	          var e3 = function(t4, e4) {
	            if ("object" != n(t4) || !t4)
	              return t4;
	            var r3 = t4[Symbol.toPrimitive];
	            if (void 0 !== r3) {
	              var o2 = r3.call(t4, "string");
	              if ("object" != n(o2))
	                return o2;
	              throw new TypeError("@@toPrimitive must return a primitive value.");
	            }
	            return String(t4);
	          }(t3);
	          return "symbol" == n(e3) ? e3 : String(e3);
	        }
	        var g = function(t3, e3) {
	          var r3 = function(r4) {
	            function n2(e4) {
	              p(this, n2), this._iterator = t3(e4);
	            }
	            return y(n2, [{ key: "next", value: function() {
	              return e3(this._iterator);
	            } }, { key: Symbol.iterator, value: function() {
	              return this;
	            } }]), n2;
	          }();
	          return Object.setPrototypeOf(r3.prototype, null), Object.freeze(r3.prototype), Object.freeze(r3), r3;
	        };
	        function d(t3, e3) {
	          return Function.prototype.call.bind(t3.prototype.__lookupGetter__(e3));
	        }
	        function b(t3) {
	          return Function.prototype.call.bind(t3);
	        }
	        var h = function(t3, e3) {
	          Array.prototype.forEach.call(Reflect.ownKeys(t3), function(r3) {
	            Reflect.getOwnPropertyDescriptor(e3, r3) || Reflect.defineProperty(e3, r3, Reflect.getOwnPropertyDescriptor(t3, r3));
	          });
	        }, v = function(t3, e3) {
	          if (Symbol.iterator in t3.prototype) {
	            var r3, n2 = new t3();
	            Array.prototype.forEach.call(Reflect.ownKeys(t3.prototype), function(o2) {
	              if (!Reflect.getOwnPropertyDescriptor(e3.prototype, o2)) {
	                var i2 = Reflect.getOwnPropertyDescriptor(t3.prototype, o2);
	                if ("function" == typeof i2.value && 0 === i2.value.length && Symbol.iterator in (Function.prototype.call.call(i2.value, n2) || {})) {
	                  var a2 = b(i2.value);
	                  null == r3 && (r3 = b(a2(n2).next));
	                  var c2 = g(a2, r3);
	                  i2.value = function() {
	                    return new c2(this);
	                  };
	                }
	                Reflect.defineProperty(e3.prototype, o2, i2);
	              }
	            });
	          } else
	            h(t3.prototype, e3.prototype);
	          return h(t3, e3), Object.setPrototypeOf(e3.prototype, null), Object.freeze(e3.prototype), Object.freeze(e3), e3;
	        }, m = Function.prototype.call.bind(String.prototype[Symbol.iterator]), S = Reflect.getPrototypeOf(m(""));
	        if (t2.exports = { makeSafe: v, internalBinding: function(t3) {
	          if ("config" === t3)
	            return { hasIntl: false };
	          throw new Error('unknown module: "'.concat(t3, '"'));
	        }, Array, ArrayIsArray: Array.isArray, ArrayPrototypeFilter: Function.prototype.call.bind(Array.prototype.filter), ArrayPrototypeForEach: Function.prototype.call.bind(Array.prototype.forEach), ArrayPrototypeIncludes: Function.prototype.call.bind(Array.prototype.includes), ArrayPrototypeIndexOf: Function.prototype.call.bind(Array.prototype.indexOf), ArrayPrototypeJoin: Function.prototype.call.bind(Array.prototype.join), ArrayPrototypeMap: Function.prototype.call.bind(Array.prototype.map), ArrayPrototypePop: Function.prototype.call.bind(Array.prototype.pop), ArrayPrototypePush: Function.prototype.call.bind(Array.prototype.push), ArrayPrototypePushApply: Function.apply.bind(Array.prototype.push), ArrayPrototypeSlice: Function.prototype.call.bind(Array.prototype.slice), ArrayPrototypeSort: Function.prototype.call.bind(Array.prototype.sort), ArrayPrototypeSplice: Function.prototype.call.bind(Array.prototype.splice), ArrayPrototypeUnshift: Function.prototype.call.bind(Array.prototype.unshift), BigIntPrototypeValueOf: Function.prototype.call.bind(BigInt.prototype.valueOf), BooleanPrototypeValueOf: Function.prototype.call.bind(Boolean.prototype.valueOf), DatePrototypeGetTime: Function.prototype.call.bind(Date.prototype.getTime), DatePrototypeToISOString: Function.prototype.call.bind(Date.prototype.toISOString), DatePrototypeToString: Function.prototype.call.bind(Date.prototype.toString), ErrorCaptureStackTrace: function(t3) {
	          var e3 = new Error().stack;
	          t3.stack = e3.replace(/.*\n.*/, "$1");
	        }, ErrorPrototypeToString: Function.prototype.call.bind(Error.prototype.toString), FunctionPrototypeBind: Function.prototype.call.bind(Function.prototype.bind), FunctionPrototypeCall: Function.prototype.call.bind(Function.prototype.call), FunctionPrototypeToString: Function.prototype.call.bind(Function.prototype.toString), globalThis: "undefined" == typeof globalThis ? r2.g : globalThis, JSONStringify: JSON.stringify, MapPrototypeGetSize: d(Map, "size"), MapPrototypeEntries: Function.prototype.call.bind(Map.prototype.entries), MathFloor: Math.floor, MathMax: Math.max, MathMin: Math.min, MathRound: Math.round, MathSqrt: Math.sqrt, MathTrunc: Math.trunc, Number, NumberIsFinite: Number.isFinite, NumberIsNaN: Number.isNaN, NumberParseFloat: Number.parseFloat, NumberParseInt: Number.parseInt, NumberPrototypeToString: Function.prototype.call.bind(Number.prototype.toString), NumberPrototypeValueOf: Function.prototype.call.bind(Number.prototype.valueOf), Object, ObjectAssign: Object.assign, ObjectCreate: Object.create, ObjectDefineProperty: Object.defineProperty, ObjectGetOwnPropertyDescriptor: Object.getOwnPropertyDescriptor, ObjectGetOwnPropertyNames: Object.getOwnPropertyNames, ObjectGetOwnPropertySymbols: Object.getOwnPropertySymbols, ObjectGetPrototypeOf: Object.getPrototypeOf, ObjectIs: Object.is, ObjectKeys: Object.keys, ObjectPrototypeHasOwnProperty: Function.prototype.call.bind(Object.prototype.hasOwnProperty), ObjectPrototypePropertyIsEnumerable: Function.prototype.call.bind(Object.prototype.propertyIsEnumerable), ObjectSeal: Object.seal, ObjectSetPrototypeOf: Object.setPrototypeOf, ReflectApply: Reflect.apply, ReflectOwnKeys: Reflect.ownKeys, RegExp, RegExpPrototypeExec: Function.prototype.call.bind(RegExp.prototype.exec), RegExpPrototypeSymbolReplace: Function.prototype.call.bind(RegExp.prototype[Symbol.replace]), RegExpPrototypeSymbolSplit: Function.prototype.call.bind(RegExp.prototype[Symbol.split]), RegExpPrototypeTest: Function.prototype.call.bind(RegExp.prototype.test), RegExpPrototypeToString: Function.prototype.call.bind(RegExp.prototype.toString), SafeStringIterator: g(m, Function.prototype.call.bind(S.next)), SafeMap: v(Map, function(t3) {
	          function e3(t4) {
	            return p(this, e3), o(this, e3, [t4]);
	          }
	          return i(e3, t3), y(e3);
	        }(a(Map))), SafeSet: v(Set, function(t3) {
	          function e3(t4) {
	            return p(this, e3), o(this, e3, [t4]);
	          }
	          return i(e3, t3), y(e3);
	        }(a(Set))), SetPrototypeGetSize: d(Set, "size"), SetPrototypeValues: Function.prototype.call.bind(Set.prototype.values), String, StringPrototypeCharCodeAt: Function.prototype.call.bind(String.prototype.charCodeAt), StringPrototypeCodePointAt: Function.prototype.call.bind(String.prototype.codePointAt), StringPrototypeEndsWith: Function.prototype.call.bind(String.prototype.endsWith), StringPrototypeIncludes: Function.prototype.call.bind(String.prototype.includes), StringPrototypeIndexOf: Function.prototype.call.bind(String.prototype.indexOf), StringPrototypeLastIndexOf: Function.prototype.call.bind(String.prototype.lastIndexOf), StringPrototypeNormalize: Function.prototype.call.bind(String.prototype.normalize), StringPrototypePadEnd: Function.prototype.call.bind(String.prototype.padEnd), StringPrototypePadStart: Function.prototype.call.bind(String.prototype.padStart), StringPrototypeRepeat: Function.prototype.call.bind(String.prototype.repeat), StringPrototypeReplace: Function.prototype.call.bind(String.prototype.replace), StringPrototypeReplaceAll: Function.prototype.call.bind(String.prototype.replaceAll), StringPrototypeSlice: Function.prototype.call.bind(String.prototype.slice), StringPrototypeSplit: Function.prototype.call.bind(String.prototype.split), StringPrototypeStartsWith: Function.prototype.call.bind(String.prototype.startsWith), StringPrototypeToLowerCase: Function.prototype.call.bind(String.prototype.toLowerCase), StringPrototypeTrim: Function.prototype.call.bind(String.prototype.trim), StringPrototypeValueOf: Function.prototype.call.bind(String.prototype.valueOf), SymbolPrototypeToString: Function.prototype.call.bind(Symbol.prototype.toString), SymbolPrototypeValueOf: Function.prototype.call.bind(Symbol.prototype.valueOf), SymbolIterator: Symbol.iterator, SymbolFor: Symbol.for, SymbolToStringTag: Symbol.toStringTag, TypedArrayPrototypeGetLength: (function(t3) {
	          return t3.constructor.prototype.__lookupGetter__("length").call(t3);
	        }), Uint8Array, uncurryThis: b }, !String.prototype.replaceAll) {
	          var P = function(t3) {
	            if (null == t3)
	              throw new TypeError("Can't call method on " + t3);
	            return t3;
	          }, x = function(t3, e3, r3, n2, o2, i2) {
	            var a2 = r3 + t3.length, c2 = n2.length, l2 = /\$([$&'`]|\d{1,2})/;
	            return void 0 !== o2 && (o2 = Object(P(o2)), l2 = /\$([$&'`]|\d{1,2}|<[^>]*>)/g), i2.replace(l2, function(i3, l3) {
	              var u2;
	              switch (l3.charAt(0)) {
	                case "$":
	                  return "$";
	                case "&":
	                  return t3;
	                case "`":
	                  return e3.slice(0, r3);
	                case "'":
	                  return e3.slice(a2);
	                case "<":
	                  u2 = o2[l3.slice(1, -1)];
	                  break;
	                default:
	                  var p2 = +l3;
	                  if (0 === p2)
	                    return i3;
	                  if (p2 > c2) {
	                    var f2 = Math.floor(p2 / 10);
	                    return 0 === f2 ? i3 : f2 <= c2 ? void 0 === n2[f2 - 1] ? l3.charAt(1) : n2[f2 - 1] + l3.charAt(1) : i3;
	                  }
	                  u2 = n2[p2 - 1];
	              }
	              return void 0 === u2 ? "" : u2;
	            });
	          };
	          t2.exports.StringPrototypeReplaceAll = function(t3, e3, r3) {
	            var n2, o2, i2 = P(t3), a2 = 0, c2 = 0, l2 = "";
	            if (null != e3) {
	              if (e3 instanceof RegExp && !~e3.flags.indexOf("g"))
	                throw new TypeError("`.replaceAll` does not allow non-global regexes");
	              if (n2 = e3[Symbol.replace])
	                return n2.call(e3, i2, r3);
	            }
	            var u2 = String(i2), p2 = String(e3), f2 = "function" == typeof r3;
	            f2 || (r3 = String(r3));
	            var y2 = p2.length, s2 = Math.max(1, y2);
	            for (a2 = u2.indexOf(p2, 0); -1 !== a2; )
	              o2 = f2 ? String(r3(p2, a2, u2)) : x(p2, u2, a2, [], void 0, r3), l2 += u2.slice(c2, a2) + o2, c2 = a2 + y2, a2 = u2.indexOf(p2, a2 + s2);
	            return c2 < u2.length && (l2 += u2.slice(c2)), l2;
	          };
	        }
	      }, 266: (t2) => {
	        function e2(t3) {
	          return e2 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
	            return typeof t4;
	          } : function(t4) {
	            return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
	          }, e2(t3);
	        }
	        function r2(t3, e3) {
	          for (var r3 = 0; r3 < e3.length; r3++) {
	            var o2 = e3[r3];
	            o2.enumerable = o2.enumerable || false, o2.configurable = true, "value" in o2 && (o2.writable = true), Object.defineProperty(t3, n(o2.key), o2);
	          }
	        }
	        function n(t3) {
	          var r3 = function(t4, r4) {
	            if ("object" != e2(t4) || !t4)
	              return t4;
	            var n2 = t4[Symbol.toPrimitive];
	            if (void 0 !== n2) {
	              var o2 = n2.call(t4, "string");
	              if ("object" != e2(o2))
	                return o2;
	              throw new TypeError("@@toPrimitive must return a primitive value.");
	            }
	            return String(t4);
	          }(t3);
	          return "symbol" == e2(r3) ? r3 : String(r3);
	        }
	        var o = /* @__PURE__ */ new WeakMap(), i = function() {
	          function t3(e4, r3) {
	            !function(t4, e5) {
	              if (!(t4 instanceof e5))
	                throw new TypeError("Cannot call a class as a function");
	            }(this, t3);
	            var n3 = new Proxy(e4, r3);
	            return o.set(n3, [e4, r3]), n3;
	          }
	          var e3, n2;
	          return e3 = t3, n2 = [{ key: "getProxyDetails", value: function(t4) {
	            var e4 = !(arguments.length > 1 && void 0 !== arguments[1]) || arguments[1], r3 = o.get(t4);
	            if (r3)
	              return e4 ? r3 : r3[0];
	          } }, { key: "revocable", value: function(t4, e4) {
	            var r3 = Proxy.revocable(t4, e4);
	            o.set(r3.proxy, [t4, e4]);
	            var n3 = r3.revoke;
	            return r3.revoke = function() {
	              o.set(r3.proxy, [null, null]), n3();
	            }, r3;
	          } }], n2 && r2(e3, n2), Object.defineProperty(e3, "prototype", { writable: false }), t3;
	        }();
	        t2.exports = { getProxyDetails: i.getProxyDetails.bind(i), Proxy: i };
	      }, 583: (t2, e2, r2) => {
	        function n(t3) {
	          return n = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t4) {
	            return typeof t4;
	          } : function(t4) {
	            return t4 && "function" == typeof Symbol && t4.constructor === Symbol && t4 !== Symbol.prototype ? "symbol" : typeof t4;
	          }, n(t3);
	        }
	        function o(t3, e3) {
	          if (t3) {
	            if ("string" == typeof t3)
	              return i(t3, e3);
	            var r3 = Object.prototype.toString.call(t3).slice(8, -1);
	            return "Object" === r3 && t3.constructor && (r3 = t3.constructor.name), "Map" === r3 || "Set" === r3 ? Array.from(t3) : "Arguments" === r3 || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r3) ? i(t3, e3) : void 0;
	          }
	        }
	        function i(t3, e3) {
	          (null == e3 || e3 > t3.length) && (e3 = t3.length);
	          for (var r3 = 0, n2 = new Array(e3); r3 < e3; r3++)
	            n2[r3] = t3[r3];
	          return n2;
	        }
	        var a = r2(266), c = Symbol("kPending"), l = Symbol("kRejected");
	        t2.exports = { constants: { kPending: c, kRejected: l, ALL_PROPERTIES: 0, ONLY_ENUMERABLE: 2 }, getOwnNonIndexProperties: function(t3) {
	          for (var e3 = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 2, r3 = Object.getOwnPropertyDescriptors(t3), n2 = [], i2 = 0, a2 = Object.entries(r3); i2 < a2.length; i2++) {
	            var c2 = (p = a2[i2], f = 2, function(t4) {
	              if (Array.isArray(t4))
	                return t4;
	            }(p) || function(t4, e4) {
	              var r4 = null == t4 ? null : "undefined" != typeof Symbol && t4[Symbol.iterator] || t4["@@iterator"];
	              if (null != r4) {
	                var n3, o2, i3, a3, c3 = [], l3 = true, u2 = false;
	                try {
	                  if (i3 = (r4 = r4.call(t4)).next, 0 === e4) {
	                    if (Object(r4) !== r4)
	                      return;
	                    l3 = false;
	                  } else
	                    for (; !(l3 = (n3 = i3.call(r4)).done) && (c3.push(n3.value), c3.length !== e4); l3 = true)
	                      ;
	                } catch (t5) {
	                  u2 = true, o2 = t5;
	                } finally {
	                  try {
	                    if (!l3 && null != r4.return && (a3 = r4.return(), Object(a3) !== a3))
	                      return;
	                  } finally {
	                    if (u2)
	                      throw o2;
	                  }
	                }
	                return c3;
	              }
	            }(p, f) || o(p, f) || function() {
	              throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	            }()), l2 = c2[0], u = c2[1];
	            if (!/^(0|[1-9][0-9]*)$/.test(l2) || parseInt(l2, 10) >= Math.pow(2, 32) - 1) {
	              if (2 === e3 && !u.enumerable)
	                continue;
	              n2.push(l2);
	            }
	          }
	          var p, f, y, s = function(t4, e4) {
	            var r4 = "undefined" != typeof Symbol && t4[Symbol.iterator] || t4["@@iterator"];
	            if (!r4) {
	              if (Array.isArray(t4) || (r4 = o(t4))) {
	                r4 && (t4 = r4);
	                var n3 = 0, i3 = function() {
	                };
	                return { s: i3, n: function() {
	                  return n3 >= t4.length ? { done: true } : { done: false, value: t4[n3++] };
	                }, e: function(t5) {
	                  throw t5;
	                }, f: i3 };
	              }
	              throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	            }
	            var a3, c3 = true, l3 = false;
	            return { s: function() {
	              r4 = r4.call(t4);
	            }, n: function() {
	              var t5 = r4.next();
	              return c3 = t5.done, t5;
	            }, e: function(t5) {
	              l3 = true, a3 = t5;
	            }, f: function() {
	              try {
	                c3 || null == r4.return || r4.return();
	              } finally {
	                if (l3)
	                  throw a3;
	              }
	            } };
	          }(Object.getOwnPropertySymbols(t3));
	          try {
	            for (s.s(); !(y = s.n()).done; ) {
	              var g = y.value, d = Object.getOwnPropertyDescriptor(t3, g);
	              (2 !== e3 || d.enumerable) && n2.push(g);
	            }
	          } catch (t4) {
	            s.e(t4);
	          } finally {
	            s.f();
	          }
	          return n2;
	        }, getPromiseDetails: function() {
	          return [c, void 0];
	        }, getProxyDetails: a.getProxyDetails, Proxy: a.Proxy, previewEntries: function(t3) {
	          return [[], false];
	        }, getConstructorName: function(t3) {
	          if (!t3 || "object" !== n(t3))
	            throw new Error("Invalid object");
	          if (t3.constructor && t3.constructor.name)
	            return t3.constructor.name;
	          var e3 = Object.prototype.toString.call(t3).match(/^\[object ([^\]]+)\]/);
	          return e3 ? e3[1] : "Object";
	        }, getExternalValue: function() {
	          return BigInt(0);
	        } };
	      } }, e = {};
	      function r(n) {
	        var o = e[n];
	        if (void 0 !== o)
	          return o.exports;
	        var i = e[n] = { exports: {} };
	        return t[n](i, i.exports, r), i.exports;
	      }
	      return r.g = function() {
	        if ("object" == typeof globalThis)
	          return globalThis;
	        try {
	          return this || new Function("return this")();
	        } catch (t2) {
	          if ("object" == typeof window)
	            return window;
	        }
	      }(), r(973);
	    })());
	  }
	});

	// ../../node_modules/node-inspect-extracted/index.mjs
	var import_inspect, inspect, format, formatWithOptions, stripVTControlCharacters, stylizeWithColor, stylizeWithHTML, Proxy2;
	var init_node_inspect_extracted = __esm({
	  "../../node_modules/node-inspect-extracted/index.mjs"() {
	    import_inspect = __toESM(require_inspect(), 1);
	    ({
	      inspect: (
	        // The commented out things are not visible from normal node's util.
	        // identicalSequenceRange,
	        inspect
	      ),
	      format: (
	        // inspectDefaultOptions,
	        format
	      ),
	      formatWithOptions,
	      stripVTControlCharacters: (
	        // getStringWidth,
	        stripVTControlCharacters
	      ),
	      stylizeWithColor: (
	        // isZeroWidthCodePoint,
	        stylizeWithColor
	      ),
	      stylizeWithHTML,
	      Proxy: Proxy2
	    } = import_inspect.default);
	  }
	});

	// src/shared.ts
	var require_shared = __commonJS$2({
	  "src/shared.ts"(exports2, module2) {
	    var import_cosmokit = require$$0;
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
	    var _Logger = class _Logger {
	      constructor(name, meta) {
	        this.name = name;
	        this.meta = meta;
	        __publicField(this, "extend", (namespace) => {
	          return new _Logger(`${this.name}:${namespace}`);
	        });
	        __publicField(this, "warning", (format2, ...args) => {
	          this.warn(format2, ...args);
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
	        if (!target.colors)
	          return "" + value;
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
	        let indent = 3 + space.length, output = "";
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
	              args[0].errors.forEach((error) => this[type](error));
	              return;
	            }
	          }
	          const id = ++_Logger.id;
	          const timestamp = Date.now();
	          for (const target of _Logger.targets) {
	            if (this.getLevel(target) < level)
	              continue;
	            const content = this.format(target, ...args);
	            const record = { id, type, level, name: this.name, meta: this.meta, content, timestamp };
	            if (target.record) {
	              target.record(record);
	            } else {
	              const { print = console.log } = target;
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
	        let format2 = args.shift();
	        format2 = format2.replace(/%([a-zA-Z%])/g, (match, char) => {
	          if (match === "%%")
	            return "%";
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
	          format2 += " " + arg;
	        }
	        const { maxLength = 10240 } = target;
	        return format2.split(/\r?\n/g).map((line) => {
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
	            config = config[name] = { base: value2 != null ? value2 : config.base };
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
	    __publicField(_Logger, "formatters", /* @__PURE__ */ Object.create(null));
	    __publicField(_Logger, "levels", {
	      base: 2
	    });
	    var Logger2 = _Logger;
	    Logger2.format("s", (value) => value);
	    Logger2.format("d", (value) => +value);
	    Logger2.format("j", (value) => JSON.stringify(value));
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
	    init_node_inspect_extracted();
	    var import_shared = __toESM(require_shared());
	    import_shared.default.format("o", (value, target) => {
	      return inspect(value, { colors: !!target.colors, depth: Infinity }).replace(/\s*\n\s*/g, " ");
	    });
	    module2.exports = import_shared.default;
	  }
	});

	// src/index.ts
	var import_node = __toESM(require_node());
	var lib = import_node.default;


	var Logger = /*@__PURE__*/getDefaultExportFromCjs(lib);

	// src/index.ts
	var LoggerService = class _LoggerService extends Service {
	  static name = "logger";
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
	  [Service.invoke](name) {
	    return new Logger(name, { [Context.trace]: this });
	  }
	  static {
	    for (const type of [
	      "success",
	      "error",
	      "info",
	      "warn",
	      "debug",
	      "extend"
	    ]) {
	      _LoggerService.prototype[type] = function(...args) {
	        const caller = this[Context.trace];
	        return this(caller.name)[type](...args);
	      };
	    }
	  }
	};

	var __defProp$8 = Object.defineProperty;
	var __name$8 = (target, value) => __defProp$8(target, "name", { value, configurable: true });
	var TimerService = class extends Service {
	  static {
	    __name$8(this, "TimerService");
	  }
	  constructor(ctx) {
	    super(ctx, "timer", true);
	    ctx.mixin("timer", ["setTimeout", "setInterval", "sleep", "throttle", "debounce"]);
	  }
	  setTimeout(callback, delay) {
	    const dispose = this[Context.trace].effect(() => {
	      const timer = setTimeout(() => {
	        dispose();
	        callback();
	      }, delay);
	      return () => clearTimeout(timer);
	    });
	    return dispose;
	  }
	  setInterval(callback, delay) {
	    return this[Context.trace].effect(() => {
	      const timer = setInterval(callback, delay);
	      return () => clearInterval(timer);
	    });
	  }
	  sleep(delay) {
	    const caller = this[Context.trace];
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
	    const caller = this[Context.trace];
	    caller.scope.assertActive();
	    let timer;
	    const dispose = /* @__PURE__ */ __name$8(() => {
	      isDisposed = true;
	      remove(caller.scope.disposables, dispose);
	      clearTimeout(timer);
	    }, "dispose");
	    const wrapper = /* @__PURE__ */ __name$8((...args) => {
	      clearTimeout(timer);
	      timer = callback(args, () => !isDisposed && caller.scope.isActive);
	    }, "wrapper");
	    wrapper.dispose = dispose;
	    caller.scope.disposables.push(dispose);
	    return wrapper;
	  }
	  throttle(callback, delay, noTrailing) {
	    let lastCall = -Infinity;
	    const execute = /* @__PURE__ */ __name$8((...args) => {
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
	};

	var __defProp$7 = Object.defineProperty;
	var __getOwnPropNames$1 = Object.getOwnPropertyNames;
	var __name$7 = (target, value) => __defProp$7(target, "name", { value, configurable: true });
	var __commonJS$1 = (cb, mod) => function __require() {
	  return mod || (0, cb[__getOwnPropNames$1(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
	};
	var require_src$1 = __commonJS$1({
	  "packages/schemastery/packages/core/src/index.ts"(exports, module) {
	    var kSchema = Symbol.for("schemastery");
	    globalThis.__schemastery_index__ ??= 0;
	    var Schema = /* @__PURE__ */ __name$7(function(options) {
	      const schema = /* @__PURE__ */ __name$7(function(data, options2) {
	        return Schema.resolve(data, schema, options2)[0];
	      }, "schema");
	      if (options.refs) {
	        const refs2 = mapValues(options.refs, (options2) => new Schema(options2));
	        const getRef = /* @__PURE__ */ __name$7((uid) => refs2[uid], "getRef");
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
	        } catch {
	        }
	      }
	      Object.defineProperty(schema, "uid", { value: globalThis.__schemastery_index__++ });
	      Object.setPrototypeOf(schema, Schema.prototype);
	      schema.meta ||= {};
	      schema.toString = schema.toString.bind(schema);
	      return schema;
	    }, "Schema");
	    Schema.prototype = Object.create(Function.prototype);
	    Schema.prototype[kSchema] = true;
	    var refs;
	    Schema.prototype.toJSON = /* @__PURE__ */ __name$7(function toJSON() {
	      if (refs) {
	        refs[this.uid] ??= JSON.parse(JSON.stringify({ ...this }));
	        return this.uid;
	      }
	      refs = { [this.uid]: { ...this } };
	      refs[this.uid] = JSON.parse(JSON.stringify({ ...this }));
	      const result = { uid: this.uid, refs };
	      refs = void 0;
	      return result;
	    }, "toJSON");
	    Schema.prototype.set = /* @__PURE__ */ __name$7(function set(key, value) {
	      this.dict[key] = value;
	      return this;
	    }, "set");
	    Schema.prototype.push = /* @__PURE__ */ __name$7(function push(value) {
	      this.list.push(value);
	      return this;
	    }, "push");
	    function mergeDesc(original, messages) {
	      const result = typeof original === "string" ? { "": original } : { ...original };
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
	    __name$7(mergeDesc, "mergeDesc");
	    function getInner(value) {
	      return value?.$value ?? value?.$inner;
	    }
	    __name$7(getInner, "getInner");
	    function extractKeys(data) {
	      return Object.fromEntries(Object.entries(data ?? {}).filter(([key]) => !key.startsWith("$")));
	    }
	    __name$7(extractKeys, "extractKeys");
	    Schema.prototype.i18n = /* @__PURE__ */ __name$7(function i18n(messages) {
	      const schema = Schema(this);
	      schema.meta.description = mergeDesc(schema.meta.description, messages);
	      if (schema.dict) {
	        schema.dict = mapValues(schema.dict, (inner, key) => {
	          return inner.i18n(mapValues(messages, (data) => getInner(data)?.[key] ?? data?.[key]));
	        });
	      }
	      if (schema.list) {
	        schema.list = schema.list.map((inner, index) => {
	          return inner.i18n(mapValues(messages, (data = {}) => {
	            if (Array.isArray(getInner(data)))
	              return getInner(data)[index];
	            if (Array.isArray(data))
	              return data[index];
	            return extractKeys(data);
	          }));
	        });
	      }
	      if (schema.inner) {
	        schema.inner = schema.inner.i18n(mapValues(messages, (data) => {
	          if (getInner(data))
	            return getInner(data);
	          return extractKeys(data);
	        }));
	      }
	      if (schema.sKey) {
	        schema.sKey = schema.sKey.i18n(mapValues(messages, (data) => data?.$key));
	      }
	      return schema;
	    }, "i18n");
	    Schema.prototype.extra = /* @__PURE__ */ __name$7(function extra(key, value) {
	      const schema = Schema(this);
	      schema.meta = { ...schema.meta, [key]: value };
	      return schema;
	    }, "extra");
	    for (const key of ["required", "disabled", "collapse", "hidden", "loose"]) {
	      Object.assign(Schema.prototype, {
	        [key](value = true) {
	          const schema = Schema(this);
	          schema.meta = { ...schema.meta, [key]: value };
	          return schema;
	        }
	      });
	    }
	    Schema.prototype.deprecated = /* @__PURE__ */ __name$7(function deprecated() {
	      const schema = Schema(this);
	      schema.meta.badges ||= [];
	      schema.meta.badges.push({ text: "deprecated", type: "danger" });
	      return schema;
	    }, "deprecated");
	    Schema.prototype.experimental = /* @__PURE__ */ __name$7(function experimental() {
	      const schema = Schema(this);
	      schema.meta.badges ||= [];
	      schema.meta.badges.push({ text: "experimental", type: "warning" });
	      return schema;
	    }, "experimental");
	    Schema.prototype.pattern = /* @__PURE__ */ __name$7(function pattern(regexp) {
	      const schema = Schema(this);
	      const pattern2 = pick(regexp, ["source", "flags"]);
	      schema.meta = { ...schema.meta, pattern: pattern2 };
	      return schema;
	    }, "pattern");
	    Schema.prototype.simplify = /* @__PURE__ */ __name$7(function simplify(value) {
	      if (deepEqual(value, this.meta.default))
	        return null;
	      if (isNullable(value))
	        return value;
	      if (this.type === "object" || this.type === "dict") {
	        const result = {};
	        for (const key in value) {
	          const schema = this.type === "object" ? this.dict[key] : this.inner;
	          const item = schema?.simplify(value[key]);
	          if (!isNullable(item))
	            result[key] = item;
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
	          } catch {
	          }
	        }
	      }
	      return value;
	    }, "simplify");
	    Schema.prototype.toString = /* @__PURE__ */ __name$7(function toString(inline) {
	      return formatters[this.type]?.(this, inline) ?? `Schema<${this.type}>`;
	    }, "toString");
	    Schema.prototype.role = /* @__PURE__ */ __name$7(function role(role, extra) {
	      const schema = Schema(this);
	      schema.meta = { ...schema.meta, role, extra };
	      return schema;
	    }, "role");
	    for (const key of ["default", "link", "comment", "description", "max", "min", "step"]) {
	      Object.assign(Schema.prototype, {
	        [key](value) {
	          const schema = Schema(this);
	          schema.meta = { ...schema.meta, [key]: value };
	          return schema;
	        }
	      });
	    }
	    var resolvers = {};
	    Schema.extend = /* @__PURE__ */ __name$7(function extend(type, resolve) {
	      resolvers[type] = resolve;
	    }, "extend");
	    Schema.resolve = /* @__PURE__ */ __name$7(function resolve(data, schema, options = {}, strict = false) {
	      if (!schema)
	        return [data];
	      if (isNullable(data)) {
	        if (schema.meta.required)
	          throw new TypeError(`missing required value`);
	        let current = schema;
	        let fallback = schema.meta.default;
	        while (current?.type === "intersect" && isNullable(fallback)) {
	          current = current.list[0];
	          fallback = current?.meta.default;
	        }
	        if (isNullable(fallback))
	          return [data];
	        data = clone(fallback);
	      }
	      const callback = resolvers[schema.type];
	      if (!callback)
	        throw new TypeError(`unsupported type "${schema.type}"`);
	      try {
	        return callback(data, schema, options, strict);
	      } catch (error) {
	        if (!schema.meta.loose)
	          throw error;
	        return [schema.meta.default];
	      }
	    }, "resolve");
	    Schema.from = /* @__PURE__ */ __name$7(function from(source) {
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
	    Schema.natural = /* @__PURE__ */ __name$7(function natural() {
	      return Schema.number().step(1).min(0);
	    }, "natural");
	    Schema.percent = /* @__PURE__ */ __name$7(function percent() {
	      return Schema.number().step(0.01).min(0).max(1).role("slider");
	    }, "percent");
	    Schema.date = /* @__PURE__ */ __name$7(function date() {
	      return Schema.union([
	        Schema.is(Date),
	        Schema.transform(Schema.string().role("datetime"), (value) => {
	          const date2 = new Date(value);
	          if (isNaN(+date2))
	            throw new TypeError(`invalid date "${value}"`);
	          return date2;
	        }, true)
	      ]);
	    }, "date");
	    Schema.extend("any", (data) => {
	      return [data];
	    });
	    Schema.extend("never", (data) => {
	      throw new TypeError(`expected nullable but got ${data}`);
	    });
	    Schema.extend("const", (data, { value }) => {
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
	    __name$7(checkWithinRange, "checkWithinRange");
	    Schema.extend("string", (data, { meta }) => {
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
	      const str = data.toString();
	      if (str.includes("e"))
	        return data * Math.pow(10, digits);
	      const index = str.indexOf(".");
	      if (index === -1)
	        return data * Math.pow(10, digits);
	      const frac = str.slice(index + 1);
	      const integer = str.slice(0, index);
	      if (frac.length <= digits)
	        return +(integer + frac.padEnd(digits, "0"));
	      return +(integer + frac.slice(0, digits) + "." + frac.slice(digits));
	    }
	    __name$7(decimalShift, "decimalShift");
	    function isMultipleOf(data, min, step) {
	      step = Math.abs(step);
	      if (!/^\d+\.\d+$/.test(step.toString())) {
	        return (data - min) % step === 0;
	      }
	      const index = step.toString().indexOf(".");
	      const digits = step.toString().slice(index + 1).length;
	      return Math.abs(decimalShift(data, digits) - decimalShift(min, digits)) % decimalShift(step, digits) === 0;
	    }
	    __name$7(isMultipleOf, "isMultipleOf");
	    Schema.extend("number", (data, { meta }) => {
	      if (typeof data !== "number")
	        throw new TypeError(`expected number but got ${data}`);
	      checkWithinRange(data, meta, "number");
	      const { step } = meta;
	      if (step && !isMultipleOf(data, meta.min ?? 0, step)) {
	        throw new TypeError(`expected number multiple of ${step} but got ${data}`);
	      }
	      return [data];
	    });
	    Schema.extend("boolean", (data) => {
	      if (typeof data === "boolean")
	        return [data];
	      throw new TypeError(`expected boolean but got ${data}`);
	    });
	    Schema.extend("bitset", (data, { bits, meta }) => {
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
	    Schema.extend("function", (data) => {
	      if (typeof data === "function")
	        return [data];
	      throw new TypeError(`expected function but got ${data}`);
	    });
	    Schema.extend("is", (data, { callback }) => {
	      if (data instanceof callback)
	        return [data];
	      throw new TypeError(`expected ${callback.name} but got ${data}`);
	    });
	    function property(data, key, schema, options) {
	      try {
	        const [value, adapted] = Schema.resolve(data[key], schema, options);
	        if (adapted !== void 0)
	          data[key] = adapted;
	        return value;
	      } catch (e) {
	        if (!options?.autofix)
	          throw e;
	        delete data[key];
	        return schema.meta.default;
	      }
	    }
	    __name$7(property, "property");
	    Schema.extend("array", (data, { inner, meta }, options) => {
	      if (!Array.isArray(data))
	        throw new TypeError(`expected array but got ${data}`);
	      checkWithinRange(data.length, meta, "array length");
	      return [data.map((_, index) => property(data, index, inner, options))];
	    });
	    Schema.extend("dict", (data, { inner, sKey }, options, strict) => {
	      if (!isPlainObject(data))
	        throw new TypeError(`expected object but got ${data}`);
	      const result = {};
	      for (const key in data) {
	        let rKey;
	        try {
	          rKey = Schema.resolve(key, sKey)[0];
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
	    Schema.extend("tuple", (data, { list }, options, strict) => {
	      if (!Array.isArray(data))
	        throw new TypeError(`expected array but got ${data}`);
	      const result = list.map((inner, index) => property(data, index, inner, options));
	      if (strict)
	        return [result];
	      result.push(...data.slice(list.length));
	      return [result];
	    });
	    function merge(result, data) {
	      for (const key in data) {
	        if (key in result)
	          continue;
	        result[key] = data[key];
	      }
	    }
	    __name$7(merge, "merge");
	    Schema.extend("object", (data, { dict }, options, strict) => {
	      if (!isPlainObject(data))
	        throw new TypeError(`expected object but got ${data}`);
	      const result = {};
	      for (const key in dict) {
	        const value = property(data, key, dict[key], options);
	        if (!isNullable(value) || key in data) {
	          result[key] = value;
	        }
	      }
	      if (!strict)
	        merge(result, data);
	      return [result];
	    });
	    Schema.extend("union", (data, { list, toString }, options, strict) => {
	      for (const inner of list) {
	        try {
	          return Schema.resolve(data, inner, options, strict);
	        } catch (error) {
	        }
	      }
	      throw new TypeError(`expected ${toString()} but got ${JSON.stringify(data)}`);
	    });
	    Schema.extend("intersect", (data, { list, toString }, options, strict) => {
	      let result;
	      for (const inner of list) {
	        const value = Schema.resolve(data, inner, options, true)[0];
	        if (isNullable(value))
	          continue;
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
	      if (!strict && isPlainObject(data))
	        merge(result, data);
	      return [result];
	    });
	    Schema.extend("transform", (data, { inner, callback, preserve }, options) => {
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
	          const schema = new Schema({ type: name });
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
	              case "bits": {
	                schema.bits = {};
	                for (const key2 in args[index]) {
	                  if (typeof args[index][key2] !== "number")
	                    continue;
	                  schema.bits[key2] = args[index][key2];
	                }
	                break;
	              }
	              case "callback": {
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
	    __name$7(defineMethod, "defineMethod");
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
	    module.exports = Schema;
	  }
	});
	var z2 = require_src$1();

	var loader$1 = {};

	var common$5 = {};

	function isNothing(subject) {
	  return (typeof subject === 'undefined') || (subject === null);
	}


	function isObject(subject) {
	  return (typeof subject === 'object') && (subject !== null);
	}


	function toArray(sequence) {
	  if (Array.isArray(sequence)) return sequence;
	  else if (isNothing(sequence)) return [];

	  return [ sequence ];
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
	  var result = '', cycle;

	  for (cycle = 0; cycle < count; cycle += 1) {
	    result += string;
	  }

	  return result;
	}


	function isNegativeZero(number) {
	  return (number === 0) && (Number.NEGATIVE_INFINITY === 1 / number);
	}


	common$5.isNothing      = isNothing;
	common$5.isObject       = isObject;
	common$5.toArray        = toArray;
	common$5.repeat         = repeat;
	common$5.isNegativeZero = isNegativeZero;
	common$5.extend         = extend;

	function formatError(exception, compact) {
	  var where = '', message = exception.reason || '(unknown reason)';

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


	function YAMLException$4(reason, mark) {
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
	    this.stack = (new Error()).stack || '';
	  }
	}


	// Inherit from Error
	YAMLException$4.prototype = Object.create(Error.prototype);
	YAMLException$4.prototype.constructor = YAMLException$4;


	YAMLException$4.prototype.toString = function toString(compact) {
	  return this.name + ': ' + formatError(this, compact);
	};


	var exception = YAMLException$4;

	var common$4 = common$5;


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
	  return common$4.repeat(' ', max - string.length) + string;
	}


	function makeSnippet$1(mark, options) {
	  options = Object.create(options || null);

	  if (!mark.buffer) return null;

	  if (!options.maxLength) options.maxLength = 79;
	  if (typeof options.indent      !== 'number') options.indent      = 1;
	  if (typeof options.linesBefore !== 'number') options.linesBefore = 3;
	  if (typeof options.linesAfter  !== 'number') options.linesAfter  = 2;

	  var re = /\r?\n|\r|\0/g;
	  var lineStarts = [ 0 ];
	  var lineEnds = [];
	  var match;
	  var foundLineNo = -1;

	  while ((match = re.exec(mark.buffer))) {
	    lineEnds.push(match.index);
	    lineStarts.push(match.index + match[0].length);

	    if (mark.position <= match.index && foundLineNo < 0) {
	      foundLineNo = lineStarts.length - 2;
	    }
	  }

	  if (foundLineNo < 0) foundLineNo = lineStarts.length - 1;

	  var result = '', i, line;
	  var lineNoLength = Math.min(mark.line + options.linesAfter, lineEnds.length).toString().length;
	  var maxLineLength = options.maxLength - (options.indent + lineNoLength + 3);

	  for (i = 1; i <= options.linesBefore; i++) {
	    if (foundLineNo - i < 0) break;
	    line = getLine(
	      mark.buffer,
	      lineStarts[foundLineNo - i],
	      lineEnds[foundLineNo - i],
	      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo - i]),
	      maxLineLength
	    );
	    result = common$4.repeat(' ', options.indent) + padStart((mark.line - i + 1).toString(), lineNoLength) +
	      ' | ' + line.str + '\n' + result;
	  }

	  line = getLine(mark.buffer, lineStarts[foundLineNo], lineEnds[foundLineNo], mark.position, maxLineLength);
	  result += common$4.repeat(' ', options.indent) + padStart((mark.line + 1).toString(), lineNoLength) +
	    ' | ' + line.str + '\n';
	  result += common$4.repeat('-', options.indent + lineNoLength + 3 + line.pos) + '^' + '\n';

	  for (i = 1; i <= options.linesAfter; i++) {
	    if (foundLineNo + i >= lineEnds.length) break;
	    line = getLine(
	      mark.buffer,
	      lineStarts[foundLineNo + i],
	      lineEnds[foundLineNo + i],
	      mark.position - (lineStarts[foundLineNo] - lineStarts[foundLineNo + i]),
	      maxLineLength
	    );
	    result += common$4.repeat(' ', options.indent) + padStart((mark.line + i + 1).toString(), lineNoLength) +
	      ' | ' + line.str + '\n';
	  }

	  return result.replace(/\n$/, '');
	}


	var snippet = makeSnippet$1;

	var YAMLException$3 = exception;

	var TYPE_CONSTRUCTOR_OPTIONS = [
	  'kind',
	  'multi',
	  'resolve',
	  'construct',
	  'instanceOf',
	  'predicate',
	  'represent',
	  'representName',
	  'defaultStyle',
	  'styleAliases'
	];

	var YAML_NODE_KINDS = [
	  'scalar',
	  'sequence',
	  'mapping'
	];

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

	function Type$e(tag, options) {
	  options = options || {};

	  Object.keys(options).forEach(function (name) {
	    if (TYPE_CONSTRUCTOR_OPTIONS.indexOf(name) === -1) {
	      throw new YAMLException$3('Unknown option "' + name + '" is met in definition of "' + tag + '" YAML type.');
	    }
	  });

	  // TODO: Add tag format check.
	  this.options       = options; // keep original options in case user wants to extend this type later
	  this.tag           = tag;
	  this.kind          = options['kind']          || null;
	  this.resolve       = options['resolve']       || function () { return true; };
	  this.construct     = options['construct']     || function (data) { return data; };
	  this.instanceOf    = options['instanceOf']    || null;
	  this.predicate     = options['predicate']     || null;
	  this.represent     = options['represent']     || null;
	  this.representName = options['representName'] || null;
	  this.defaultStyle  = options['defaultStyle']  || null;
	  this.multi         = options['multi']         || false;
	  this.styleAliases  = compileStyleAliases(options['styleAliases'] || null);

	  if (YAML_NODE_KINDS.indexOf(this.kind) === -1) {
	    throw new YAMLException$3('Unknown kind "' + this.kind + '" is specified for "' + tag + '" YAML type.');
	  }
	}

	var type = Type$e;

	/*eslint-disable max-len*/

	var YAMLException$2 = exception;
	var Type$d          = type;


	function compileList(schema, name) {
	  var result = [];

	  schema[name].forEach(function (currentType) {
	    var newIndex = result.length;

	    result.forEach(function (previousType, previousIndex) {
	      if (previousType.tag === currentType.tag &&
	          previousType.kind === currentType.kind &&
	          previousType.multi === currentType.multi) {

	        newIndex = previousIndex;
	      }
	    });

	    result[newIndex] = currentType;
	  });

	  return result;
	}


	function compileMap(/* lists... */) {
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

	  if (definition instanceof Type$d) {
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
	    throw new YAMLException$2('Schema.extend argument should be a Type, [ Type ], ' +
	      'or a schema definition ({ implicit: [...], explicit: [...] })');
	  }

	  implicit.forEach(function (type) {
	    if (!(type instanceof Type$d)) {
	      throw new YAMLException$2('Specified list of YAML types (or a single Type object) contains a non-Type object.');
	    }

	    if (type.loadKind && type.loadKind !== 'scalar') {
	      throw new YAMLException$2('There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.');
	    }

	    if (type.multi) {
	      throw new YAMLException$2('There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.');
	    }
	  });

	  explicit.forEach(function (type) {
	    if (!(type instanceof Type$d)) {
	      throw new YAMLException$2('Specified list of YAML types (or a single Type object) contains a non-Type object.');
	    }
	  });

	  var result = Object.create(Schema$1.prototype);

	  result.implicit = (this.implicit || []).concat(implicit);
	  result.explicit = (this.explicit || []).concat(explicit);

	  result.compiledImplicit = compileList(result, 'implicit');
	  result.compiledExplicit = compileList(result, 'explicit');
	  result.compiledTypeMap  = compileMap(result.compiledImplicit, result.compiledExplicit);

	  return result;
	};


	var schema = Schema$1;

	var Type$c = type;

	var str = new Type$c('tag:yaml.org,2002:str', {
	  kind: 'scalar',
	  construct: function (data) { return data !== null ? data : ''; }
	});

	var Type$b = type;

	var seq = new Type$b('tag:yaml.org,2002:seq', {
	  kind: 'sequence',
	  construct: function (data) { return data !== null ? data : []; }
	});

	var Type$a = type;

	var map = new Type$a('tag:yaml.org,2002:map', {
	  kind: 'mapping',
	  construct: function (data) { return data !== null ? data : {}; }
	});

	var Schema = schema;


	var failsafe = new Schema({
	  explicit: [
	    str,
	    seq,
	    map
	  ]
	});

	var Type$9 = type;

	function resolveYamlNull(data) {
	  if (data === null) return true;

	  var max = data.length;

	  return (max === 1 && data === '~') ||
	         (max === 4 && (data === 'null' || data === 'Null' || data === 'NULL'));
	}

	function constructYamlNull() {
	  return null;
	}

	function isNull(object) {
	  return object === null;
	}

	var _null = new Type$9('tag:yaml.org,2002:null', {
	  kind: 'scalar',
	  resolve: resolveYamlNull,
	  construct: constructYamlNull,
	  predicate: isNull,
	  represent: {
	    canonical: function () { return '~';    },
	    lowercase: function () { return 'null'; },
	    uppercase: function () { return 'NULL'; },
	    camelcase: function () { return 'Null'; },
	    empty:     function () { return '';     }
	  },
	  defaultStyle: 'lowercase'
	});

	var Type$8 = type;

	function resolveYamlBoolean(data) {
	  if (data === null) return false;

	  var max = data.length;

	  return (max === 4 && (data === 'true' || data === 'True' || data === 'TRUE')) ||
	         (max === 5 && (data === 'false' || data === 'False' || data === 'FALSE'));
	}

	function constructYamlBoolean(data) {
	  return data === 'true' ||
	         data === 'True' ||
	         data === 'TRUE';
	}

	function isBoolean(object) {
	  return Object.prototype.toString.call(object) === '[object Boolean]';
	}

	var bool = new Type$8('tag:yaml.org,2002:bool', {
	  kind: 'scalar',
	  resolve: resolveYamlBoolean,
	  construct: constructYamlBoolean,
	  predicate: isBoolean,
	  represent: {
	    lowercase: function (object) { return object ? 'true' : 'false'; },
	    uppercase: function (object) { return object ? 'TRUE' : 'FALSE'; },
	    camelcase: function (object) { return object ? 'True' : 'False'; }
	  },
	  defaultStyle: 'lowercase'
	});

	var common$3 = common$5;
	var Type$7   = type;

	function isHexCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) ||
	         ((0x41/* A */ <= c) && (c <= 0x46/* F */)) ||
	         ((0x61/* a */ <= c) && (c <= 0x66/* f */));
	}

	function isOctCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x37/* 7 */));
	}

	function isDecCode(c) {
	  return ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */));
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
	  var value = data, sign = 1, ch;

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
	  return (Object.prototype.toString.call(object)) === '[object Number]' &&
	         (object % 1 === 0 && !common$3.isNegativeZero(object));
	}

	var int = new Type$7('tag:yaml.org,2002:int', {
	  kind: 'scalar',
	  resolve: resolveYamlInteger,
	  construct: constructYamlInteger,
	  predicate: isInteger,
	  represent: {
	    binary:      function (obj) { return obj >= 0 ? '0b' + obj.toString(2) : '-0b' + obj.toString(2).slice(1); },
	    octal:       function (obj) { return obj >= 0 ? '0o'  + obj.toString(8) : '-0o'  + obj.toString(8).slice(1); },
	    decimal:     function (obj) { return obj.toString(10); },
	    /* eslint-disable max-len */
	    hexadecimal: function (obj) { return obj >= 0 ? '0x' + obj.toString(16).toUpperCase() :  '-0x' + obj.toString(16).toUpperCase().slice(1); }
	  },
	  defaultStyle: 'decimal',
	  styleAliases: {
	    binary:      [ 2,  'bin' ],
	    octal:       [ 8,  'oct' ],
	    decimal:     [ 10, 'dec' ],
	    hexadecimal: [ 16, 'hex' ]
	  }
	});

	var common$2 = common$5;
	var Type$6   = type;

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

	  value  = data.replace(/_/g, '').toLowerCase();
	  sign   = value[0] === '-' ? -1 : 1;

	  if ('+-'.indexOf(value[0]) >= 0) {
	    value = value.slice(1);
	  }

	  if (value === '.inf') {
	    return (sign === 1) ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY;

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
	      case 'lowercase': return '.nan';
	      case 'uppercase': return '.NAN';
	      case 'camelcase': return '.NaN';
	    }
	  } else if (Number.POSITIVE_INFINITY === object) {
	    switch (style) {
	      case 'lowercase': return '.inf';
	      case 'uppercase': return '.INF';
	      case 'camelcase': return '.Inf';
	    }
	  } else if (Number.NEGATIVE_INFINITY === object) {
	    switch (style) {
	      case 'lowercase': return '-.inf';
	      case 'uppercase': return '-.INF';
	      case 'camelcase': return '-.Inf';
	    }
	  } else if (common$2.isNegativeZero(object)) {
	    return '-0.0';
	  }

	  res = object.toString(10);

	  // JS stringifier can build scientific format without dots: 5e-100,
	  // while YAML requres dot: 5.e-100. Fix it with simple hack

	  return SCIENTIFIC_WITHOUT_DOT.test(res) ? res.replace('e', '.e') : res;
	}

	function isFloat(object) {
	  return (Object.prototype.toString.call(object) === '[object Number]') &&
	         (object % 1 !== 0 || common$2.isNegativeZero(object));
	}

	var float = new Type$6('tag:yaml.org,2002:float', {
	  kind: 'scalar',
	  resolve: resolveYamlFloat,
	  construct: constructYamlFloat,
	  predicate: isFloat,
	  represent: representYamlFloat,
	  defaultStyle: 'lowercase'
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

	var Type$5 = type;

	var YAML_DATE_REGEXP = new RegExp(
	  '^([0-9][0-9][0-9][0-9])'          + // [1] year
	  '-([0-9][0-9])'                    + // [2] month
	  '-([0-9][0-9])$');                   // [3] day

	var YAML_TIMESTAMP_REGEXP = new RegExp(
	  '^([0-9][0-9][0-9][0-9])'          + // [1] year
	  '-([0-9][0-9]?)'                   + // [2] month
	  '-([0-9][0-9]?)'                   + // [3] day
	  '(?:[Tt]|[ \\t]+)'                 + // ...
	  '([0-9][0-9]?)'                    + // [4] hour
	  ':([0-9][0-9])'                    + // [5] minute
	  ':([0-9][0-9])'                    + // [6] second
	  '(?:\\.([0-9]*))?'                 + // [7] fraction
	  '(?:[ \\t]*(Z|([-+])([0-9][0-9]?)' + // [8] tz [9] tz_sign [10] tz_hour
	  '(?::([0-9][0-9]))?))?$');           // [11] tz_minute

	function resolveYamlTimestamp(data) {
	  if (data === null) return false;
	  if (YAML_DATE_REGEXP.exec(data) !== null) return true;
	  if (YAML_TIMESTAMP_REGEXP.exec(data) !== null) return true;
	  return false;
	}

	function constructYamlTimestamp(data) {
	  var match, year, month, day, hour, minute, second, fraction = 0,
	      delta = null, tz_hour, tz_minute, date;

	  match = YAML_DATE_REGEXP.exec(data);
	  if (match === null) match = YAML_TIMESTAMP_REGEXP.exec(data);

	  if (match === null) throw new Error('Date resolve error');

	  // match: [1] year [2] month [3] day

	  year = +(match[1]);
	  month = +(match[2]) - 1; // JS month starts with 0
	  day = +(match[3]);

	  if (!match[4]) { // no hour
	    return new Date(Date.UTC(year, month, day));
	  }

	  // match: [4] hour [5] minute [6] second [7] fraction

	  hour = +(match[4]);
	  minute = +(match[5]);
	  second = +(match[6]);

	  if (match[7]) {
	    fraction = match[7].slice(0, 3);
	    while (fraction.length < 3) { // milli-seconds
	      fraction += '0';
	    }
	    fraction = +fraction;
	  }

	  // match: [8] tz [9] tz_sign [10] tz_hour [11] tz_minute

	  if (match[9]) {
	    tz_hour = +(match[10]);
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

	var timestamp = new Type$5('tag:yaml.org,2002:timestamp', {
	  kind: 'scalar',
	  resolve: resolveYamlTimestamp,
	  construct: constructYamlTimestamp,
	  instanceOf: Date,
	  represent: representYamlTimestamp
	});

	var Type$4 = type;

	function resolveYamlMerge(data) {
	  return data === '<<' || data === null;
	}

	var merge = new Type$4('tag:yaml.org,2002:merge', {
	  kind: 'scalar',
	  resolve: resolveYamlMerge
	});

	/*eslint-disable no-bitwise*/


	var Type$3 = type;


	// [ 64, 65, 66 ] -> [ padding, CR, LF ]
	var BASE64_MAP = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=\n\r';


	function resolveYamlBinary(data) {
	  if (data === null) return false;

	  var code, idx, bitlen = 0, max = data.length, map = BASE64_MAP;

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
	  return (bitlen % 8) === 0;
	}

	function constructYamlBinary(data) {
	  var idx, tailbits,
	      input = data.replace(/[\r\n=]/g, ''), // remove CR/LF & padding to simplify scan
	      max = input.length,
	      map = BASE64_MAP,
	      bits = 0,
	      result = [];

	  // Collect by 6*4 bits (3 bytes)

	  for (idx = 0; idx < max; idx++) {
	    if ((idx % 4 === 0) && idx) {
	      result.push((bits >> 16) & 0xFF);
	      result.push((bits >> 8) & 0xFF);
	      result.push(bits & 0xFF);
	    }

	    bits = (bits << 6) | map.indexOf(input.charAt(idx));
	  }

	  // Dump tail

	  tailbits = (max % 4) * 6;

	  if (tailbits === 0) {
	    result.push((bits >> 16) & 0xFF);
	    result.push((bits >> 8) & 0xFF);
	    result.push(bits & 0xFF);
	  } else if (tailbits === 18) {
	    result.push((bits >> 10) & 0xFF);
	    result.push((bits >> 2) & 0xFF);
	  } else if (tailbits === 12) {
	    result.push((bits >> 4) & 0xFF);
	  }

	  return new Uint8Array(result);
	}

	function representYamlBinary(object /*, style*/) {
	  var result = '', bits = 0, idx, tail,
	      max = object.length,
	      map = BASE64_MAP;

	  // Convert every three bytes to 4 ASCII characters.

	  for (idx = 0; idx < max; idx++) {
	    if ((idx % 3 === 0) && idx) {
	      result += map[(bits >> 18) & 0x3F];
	      result += map[(bits >> 12) & 0x3F];
	      result += map[(bits >> 6) & 0x3F];
	      result += map[bits & 0x3F];
	    }

	    bits = (bits << 8) + object[idx];
	  }

	  // Dump tail

	  tail = max % 3;

	  if (tail === 0) {
	    result += map[(bits >> 18) & 0x3F];
	    result += map[(bits >> 12) & 0x3F];
	    result += map[(bits >> 6) & 0x3F];
	    result += map[bits & 0x3F];
	  } else if (tail === 2) {
	    result += map[(bits >> 10) & 0x3F];
	    result += map[(bits >> 4) & 0x3F];
	    result += map[(bits << 2) & 0x3F];
	    result += map[64];
	  } else if (tail === 1) {
	    result += map[(bits >> 2) & 0x3F];
	    result += map[(bits << 4) & 0x3F];
	    result += map[64];
	    result += map[64];
	  }

	  return result;
	}

	function isBinary(obj) {
	  return Object.prototype.toString.call(obj) ===  '[object Uint8Array]';
	}

	var binary = new Type$3('tag:yaml.org,2002:binary', {
	  kind: 'scalar',
	  resolve: resolveYamlBinary,
	  construct: constructYamlBinary,
	  predicate: isBinary,
	  represent: representYamlBinary
	});

	var Type$2 = type;

	var _hasOwnProperty$3 = Object.prototype.hasOwnProperty;
	var _toString$2       = Object.prototype.toString;

	function resolveYamlOmap(data) {
	  if (data === null) return true;

	  var objectKeys = [], index, length, pair, pairKey, pairHasKey,
	      object = data;

	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];
	    pairHasKey = false;

	    if (_toString$2.call(pair) !== '[object Object]') return false;

	    for (pairKey in pair) {
	      if (_hasOwnProperty$3.call(pair, pairKey)) {
	        if (!pairHasKey) pairHasKey = true;
	        else return false;
	      }
	    }

	    if (!pairHasKey) return false;

	    if (objectKeys.indexOf(pairKey) === -1) objectKeys.push(pairKey);
	    else return false;
	  }

	  return true;
	}

	function constructYamlOmap(data) {
	  return data !== null ? data : [];
	}

	var omap = new Type$2('tag:yaml.org,2002:omap', {
	  kind: 'sequence',
	  resolve: resolveYamlOmap,
	  construct: constructYamlOmap
	});

	var Type$1 = type;

	var _toString$1 = Object.prototype.toString;

	function resolveYamlPairs(data) {
	  if (data === null) return true;

	  var index, length, pair, keys, result,
	      object = data;

	  result = new Array(object.length);

	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];

	    if (_toString$1.call(pair) !== '[object Object]') return false;

	    keys = Object.keys(pair);

	    if (keys.length !== 1) return false;

	    result[index] = [ keys[0], pair[keys[0]] ];
	  }

	  return true;
	}

	function constructYamlPairs(data) {
	  if (data === null) return [];

	  var index, length, pair, keys, result,
	      object = data;

	  result = new Array(object.length);

	  for (index = 0, length = object.length; index < length; index += 1) {
	    pair = object[index];

	    keys = Object.keys(pair);

	    result[index] = [ keys[0], pair[keys[0]] ];
	  }

	  return result;
	}

	var pairs = new Type$1('tag:yaml.org,2002:pairs', {
	  kind: 'sequence',
	  resolve: resolveYamlPairs,
	  construct: constructYamlPairs
	});

	var Type = type;

	var _hasOwnProperty$2 = Object.prototype.hasOwnProperty;

	function resolveYamlSet(data) {
	  if (data === null) return true;

	  var key, object = data;

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

	var set = new Type('tag:yaml.org,2002:set', {
	  kind: 'mapping',
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

	/*eslint-disable max-len,no-use-before-define*/

	var common$1              = common$5;
	var YAMLException$1       = exception;
	var makeSnippet         = snippet;
	var DEFAULT_SCHEMA$1      = _default;


	var _hasOwnProperty$1 = Object.prototype.hasOwnProperty;


	var CONTEXT_FLOW_IN   = 1;
	var CONTEXT_FLOW_OUT  = 2;
	var CONTEXT_BLOCK_IN  = 3;
	var CONTEXT_BLOCK_OUT = 4;


	var CHOMPING_CLIP  = 1;
	var CHOMPING_STRIP = 2;
	var CHOMPING_KEEP  = 3;


	var PATTERN_NON_PRINTABLE         = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/;
	var PATTERN_NON_ASCII_LINE_BREAKS = /[\x85\u2028\u2029]/;
	var PATTERN_FLOW_INDICATORS       = /[,\[\]\{\}]/;
	var PATTERN_TAG_HANDLE            = /^(?:!|!!|![a-z\-]+!)$/i;
	var PATTERN_TAG_URI               = /^(?:!|[^,\[\]\{\}])(?:%[0-9a-f]{2}|[0-9a-z\-#;\/\?:@&=\+\$,_\.!~\*'\(\)\[\]])*$/i;


	function _class(obj) { return Object.prototype.toString.call(obj); }

	function is_EOL(c) {
	  return (c === 0x0A/* LF */) || (c === 0x0D/* CR */);
	}

	function is_WHITE_SPACE(c) {
	  return (c === 0x09/* Tab */) || (c === 0x20/* Space */);
	}

	function is_WS_OR_EOL(c) {
	  return (c === 0x09/* Tab */) ||
	         (c === 0x20/* Space */) ||
	         (c === 0x0A/* LF */) ||
	         (c === 0x0D/* CR */);
	}

	function is_FLOW_INDICATOR(c) {
	  return c === 0x2C/* , */ ||
	         c === 0x5B/* [ */ ||
	         c === 0x5D/* ] */ ||
	         c === 0x7B/* { */ ||
	         c === 0x7D/* } */;
	}

	function fromHexCode(c) {
	  var lc;

	  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
	    return c - 0x30;
	  }

	  /*eslint-disable no-bitwise*/
	  lc = c | 0x20;

	  if ((0x61/* a */ <= lc) && (lc <= 0x66/* f */)) {
	    return lc - 0x61 + 10;
	  }

	  return -1;
	}

	function escapedHexLen(c) {
	  if (c === 0x78/* x */) { return 2; }
	  if (c === 0x75/* u */) { return 4; }
	  if (c === 0x55/* U */) { return 8; }
	  return 0;
	}

	function fromDecimalCode(c) {
	  if ((0x30/* 0 */ <= c) && (c <= 0x39/* 9 */)) {
	    return c - 0x30;
	  }

	  return -1;
	}

	function simpleEscapeSequence(c) {
	  /* eslint-disable indent */
	  return (c === 0x30/* 0 */) ? '\x00' :
	        (c === 0x61/* a */) ? '\x07' :
	        (c === 0x62/* b */) ? '\x08' :
	        (c === 0x74/* t */) ? '\x09' :
	        (c === 0x09/* Tab */) ? '\x09' :
	        (c === 0x6E/* n */) ? '\x0A' :
	        (c === 0x76/* v */) ? '\x0B' :
	        (c === 0x66/* f */) ? '\x0C' :
	        (c === 0x72/* r */) ? '\x0D' :
	        (c === 0x65/* e */) ? '\x1B' :
	        (c === 0x20/* Space */) ? ' ' :
	        (c === 0x22/* " */) ? '\x22' :
	        (c === 0x2F/* / */) ? '/' :
	        (c === 0x5C/* \ */) ? '\x5C' :
	        (c === 0x4E/* N */) ? '\x85' :
	        (c === 0x5F/* _ */) ? '\xA0' :
	        (c === 0x4C/* L */) ? '\u2028' :
	        (c === 0x50/* P */) ? '\u2029' : '';
	}

	function charFromCodepoint(c) {
	  if (c <= 0xFFFF) {
	    return String.fromCharCode(c);
	  }
	  // Encode UTF-16 surrogate pair
	  // https://en.wikipedia.org/wiki/UTF-16#Code_points_U.2B010000_to_U.2B10FFFF
	  return String.fromCharCode(
	    ((c - 0x010000) >> 10) + 0xD800,
	    ((c - 0x010000) & 0x03FF) + 0xDC00
	  );
	}

	var simpleEscapeCheck = new Array(256); // integer, for fast access
	var simpleEscapeMap = new Array(256);
	for (var i = 0; i < 256; i++) {
	  simpleEscapeCheck[i] = simpleEscapeSequence(i) ? 1 : 0;
	  simpleEscapeMap[i] = simpleEscapeSequence(i);
	}


	function State$1(input, options) {
	  this.input = input;

	  this.filename  = options['filename']  || null;
	  this.schema    = options['schema']    || DEFAULT_SCHEMA$1;
	  this.onWarning = options['onWarning'] || null;
	  // (Hidden) Remove? makes the loader to expect YAML 1.1 documents
	  // if such documents have no explicit %YAML directive
	  this.legacy    = options['legacy']    || false;

	  this.json      = options['json']      || false;
	  this.listener  = options['listener']  || null;

	  this.implicitTypes = this.schema.compiledImplicit;
	  this.typeMap       = this.schema.compiledTypeMap;

	  this.length     = input.length;
	  this.position   = 0;
	  this.line       = 0;
	  this.lineStart  = 0;
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
	    name:     state.filename,
	    buffer:   state.input.slice(0, -1), // omit trailing \0
	    position: state.position,
	    line:     state.line,
	    column:   state.position - state.lineStart
	  };

	  mark.snippet = makeSnippet(mark);

	  return new YAMLException$1(message, mark);
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
	    state.checkLineBreaks = (minor < 2);

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
	        if (!(_character === 0x09 ||
	              (0x20 <= _character && _character <= 0x10FFFF))) {
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

	  if (!common$1.isObject(source)) {
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

	function storeMappingPair(state, _result, overridableKeys, keyTag, keyNode, valueNode,
	  startLine, startLineStart, startPos) {

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
	    if (!state.json &&
	        !_hasOwnProperty$1.call(overridableKeys, keyNode) &&
	        _hasOwnProperty$1.call(_result, keyNode)) {
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

	  if (ch === 0x0A/* LF */) {
	    state.position++;
	  } else if (ch === 0x0D/* CR */) {
	    state.position++;
	    if (state.input.charCodeAt(state.position) === 0x0A/* LF */) {
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
	      if (ch === 0x09/* Tab */ && state.firstTabInLine === -1) {
	        state.firstTabInLine = state.position;
	      }
	      ch = state.input.charCodeAt(++state.position);
	    }

	    if (allowComments && ch === 0x23/* # */) {
	      do {
	        ch = state.input.charCodeAt(++state.position);
	      } while (ch !== 0x0A/* LF */ && ch !== 0x0D/* CR */ && ch !== 0);
	    }

	    if (is_EOL(ch)) {
	      readLineBreak(state);

	      ch = state.input.charCodeAt(state.position);
	      lineBreaks++;
	      state.lineIndent = 0;

	      while (ch === 0x20/* Space */) {
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
	  if ((ch === 0x2D/* - */ || ch === 0x2E/* . */) &&
	      ch === state.input.charCodeAt(_position + 1) &&
	      ch === state.input.charCodeAt(_position + 2)) {

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
	    state.result += common$1.repeat('\n', count - 1);
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

	  if (is_WS_OR_EOL(ch)      ||
	      is_FLOW_INDICATOR(ch) ||
	      ch === 0x23/* # */    ||
	      ch === 0x26/* & */    ||
	      ch === 0x2A/* * */    ||
	      ch === 0x21/* ! */    ||
	      ch === 0x7C/* | */    ||
	      ch === 0x3E/* > */    ||
	      ch === 0x27/* ' */    ||
	      ch === 0x22/* " */    ||
	      ch === 0x25/* % */    ||
	      ch === 0x40/* @ */    ||
	      ch === 0x60/* ` */) {
	    return false;
	  }

	  if (ch === 0x3F/* ? */ || ch === 0x2D/* - */) {
	    following = state.input.charCodeAt(state.position + 1);

	    if (is_WS_OR_EOL(following) ||
	        withinFlowCollection && is_FLOW_INDICATOR(following)) {
	      return false;
	    }
	  }

	  state.kind = 'scalar';
	  state.result = '';
	  captureStart = captureEnd = state.position;
	  hasPendingContent = false;

	  while (ch !== 0) {
	    if (ch === 0x3A/* : */) {
	      following = state.input.charCodeAt(state.position + 1);

	      if (is_WS_OR_EOL(following) ||
	          withinFlowCollection && is_FLOW_INDICATOR(following)) {
	        break;
	      }

	    } else if (ch === 0x23/* # */) {
	      preceding = state.input.charCodeAt(state.position - 1);

	      if (is_WS_OR_EOL(preceding)) {
	        break;
	      }

	    } else if ((state.position === state.lineStart && testDocumentSeparator(state)) ||
	               withinFlowCollection && is_FLOW_INDICATOR(ch)) {
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
	  var ch,
	      captureStart, captureEnd;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x27/* ' */) {
	    return false;
	  }

	  state.kind = 'scalar';
	  state.result = '';
	  state.position++;
	  captureStart = captureEnd = state.position;

	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    if (ch === 0x27/* ' */) {
	      captureSegment(state, captureStart, state.position, true);
	      ch = state.input.charCodeAt(++state.position);

	      if (ch === 0x27/* ' */) {
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
	  var captureStart,
	      captureEnd,
	      hexLength,
	      hexResult,
	      tmp,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x22/* " */) {
	    return false;
	  }

	  state.kind = 'scalar';
	  state.result = '';
	  state.position++;
	  captureStart = captureEnd = state.position;

	  while ((ch = state.input.charCodeAt(state.position)) !== 0) {
	    if (ch === 0x22/* " */) {
	      captureSegment(state, captureStart, state.position, true);
	      state.position++;
	      return true;

	    } else if (ch === 0x5C/* \ */) {
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
	      _tag     = state.tag,
	      _result,
	      _anchor  = state.anchor,
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

	  if (ch === 0x5B/* [ */) {
	    terminator = 0x5D;/* ] */
	    isMapping = false;
	    _result = [];
	  } else if (ch === 0x7B/* { */) {
	    terminator = 0x7D;/* } */
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
	    } else if (ch === 0x2C/* , */) {
	      // "flow collection entries can never be completely empty", as per YAML 1.2, section 7.4
	      throwError(state, "expected the node content, but found ','");
	    }

	    keyTag = keyNode = valueNode = null;
	    isPair = isExplicitPair = false;

	    if (ch === 0x3F/* ? */) {
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

	    if ((isExplicitPair || state.line === _line) && ch === 0x3A/* : */) {
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

	    if (ch === 0x2C/* , */) {
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
	      chomping       = CHOMPING_CLIP,
	      didReadContent = false,
	      detectedIndent = false,
	      textIndent     = nodeIndent,
	      emptyLines     = 0,
	      atMoreIndented = false,
	      tmp,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch === 0x7C/* | */) {
	    folding = false;
	  } else if (ch === 0x3E/* > */) {
	    folding = true;
	  } else {
	    return false;
	  }

	  state.kind = 'scalar';
	  state.result = '';

	  while (ch !== 0) {
	    ch = state.input.charCodeAt(++state.position);

	    if (ch === 0x2B/* + */ || ch === 0x2D/* - */) {
	      if (CHOMPING_CLIP === chomping) {
	        chomping = (ch === 0x2B/* + */) ? CHOMPING_KEEP : CHOMPING_STRIP;
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
	    do { ch = state.input.charCodeAt(++state.position); }
	    while (is_WHITE_SPACE(ch));

	    if (ch === 0x23/* # */) {
	      do { ch = state.input.charCodeAt(++state.position); }
	      while (!is_EOL(ch) && (ch !== 0));
	    }
	  }

	  while (ch !== 0) {
	    readLineBreak(state);
	    state.lineIndent = 0;

	    ch = state.input.charCodeAt(state.position);

	    while ((!detectedIndent || state.lineIndent < textIndent) &&
	           (ch === 0x20/* Space */)) {
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
	        state.result += common$1.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	      } else if (chomping === CHOMPING_CLIP) {
	        if (didReadContent) { // i.e. only if the scalar is not empty.
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
	        state.result += common$1.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);

	      // End of more-indented block.
	      } else if (atMoreIndented) {
	        atMoreIndented = false;
	        state.result += common$1.repeat('\n', emptyLines + 1);

	      // Just one line break - perceive as the same line.
	      } else if (emptyLines === 0) {
	        if (didReadContent) { // i.e. only if we have already read some scalar content.
	          state.result += ' ';
	        }

	      // Several line breaks - perceive as different lines.
	      } else {
	        state.result += common$1.repeat('\n', emptyLines);
	      }

	    // Literal style: just add exact number of line breaks between content lines.
	    } else {
	      // Keep all line breaks except the header line break.
	      state.result += common$1.repeat('\n', didReadContent ? 1 + emptyLines : emptyLines);
	    }

	    didReadContent = true;
	    detectedIndent = true;
	    emptyLines = 0;
	    captureStart = state.position;

	    while (!is_EOL(ch) && (ch !== 0)) {
	      ch = state.input.charCodeAt(++state.position);
	    }

	    captureSegment(state, captureStart, state.position, false);
	  }

	  return true;
	}

	function readBlockSequence(state, nodeIndent) {
	  var _line,
	      _tag      = state.tag,
	      _anchor   = state.anchor,
	      _result   = [],
	      following,
	      detected  = false,
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

	    if (ch !== 0x2D/* - */) {
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

	    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
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
	      _tag          = state.tag,
	      _anchor       = state.anchor,
	      _result       = {},
	      overridableKeys = Object.create(null),
	      keyTag        = null,
	      keyNode       = null,
	      valueNode     = null,
	      atExplicitKey = false,
	      detected      = false,
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
	    if ((ch === 0x3F/* ? */ || ch === 0x3A/* : */) && is_WS_OR_EOL(following)) {

	      if (ch === 0x3F/* ? */) {
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

	        if (ch === 0x3A/* : */) {
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

	    if ((state.line === _line || state.lineIndent > nodeIndent) && (ch !== 0)) {
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
	      isNamed    = false,
	      tagHandle,
	      tagName,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x21/* ! */) return false;

	  if (state.tag !== null) {
	    throwError(state, 'duplication of a tag property');
	  }

	  ch = state.input.charCodeAt(++state.position);

	  if (ch === 0x3C/* < */) {
	    isVerbatim = true;
	    ch = state.input.charCodeAt(++state.position);

	  } else if (ch === 0x21/* ! */) {
	    isNamed = true;
	    tagHandle = '!!';
	    ch = state.input.charCodeAt(++state.position);

	  } else {
	    tagHandle = '!';
	  }

	  _position = state.position;

	  if (isVerbatim) {
	    do { ch = state.input.charCodeAt(++state.position); }
	    while (ch !== 0 && ch !== 0x3E/* > */);

	    if (state.position < state.length) {
	      tagName = state.input.slice(_position, state.position);
	      ch = state.input.charCodeAt(++state.position);
	    } else {
	      throwError(state, 'unexpected end of the stream within a verbatim tag');
	    }
	  } else {
	    while (ch !== 0 && !is_WS_OR_EOL(ch)) {

	      if (ch === 0x21/* ! */) {
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
	  var _position,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x26/* & */) return false;

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
	  var _position, alias,
	      ch;

	  ch = state.input.charCodeAt(state.position);

	  if (ch !== 0x2A/* * */) return false;

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
	      indentStatus = 1, // 1: this>parent, 0: this=parent, -1: this<parent
	      atNewLine  = false,
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

	  state.tag    = null;
	  state.anchor = null;
	  state.kind   = null;
	  state.result = null;

	  allowBlockStyles = allowBlockScalars = allowBlockCollections =
	    CONTEXT_BLOCK_OUT === nodeContext ||
	    CONTEXT_BLOCK_IN  === nodeContext;

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
	      if (allowBlockCollections &&
	          (readBlockSequence(state, blockIndent) ||
	           readBlockMapping(state, blockIndent, flowIndent)) ||
	          readFlowCollection(state, flowIndent)) {
	        hasContent = true;
	      } else {
	        if ((allowBlockScalars && readBlockScalar(state, flowIndent)) ||
	            readSingleQuotedScalar(state, flowIndent) ||
	            readDoubleQuotedScalar(state, flowIndent)) {
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

	      if (type.resolve(state.result)) { // `state.result` updated in resolver if matched
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

	    if (!type.resolve(state.result, state.tag)) { // `state.result` updated in resolver if matched
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
	  return state.tag !== null ||  state.anchor !== null || hasContent;
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

	    if (state.lineIndent > 0 || ch !== 0x25/* % */) {
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

	      if (ch === 0x23/* # */) {
	        do { ch = state.input.charCodeAt(++state.position); }
	        while (ch !== 0 && !is_EOL(ch));
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

	  if (state.lineIndent === 0 &&
	      state.input.charCodeAt(state.position)     === 0x2D/* - */ &&
	      state.input.charCodeAt(state.position + 1) === 0x2D/* - */ &&
	      state.input.charCodeAt(state.position + 2) === 0x2D/* - */) {
	    state.position += 3;
	    skipSeparationSpace(state, true, -1);

	  } else if (hasDirectives) {
	    throwError(state, 'directives end mark is expected');
	  }

	  composeNode(state, state.lineIndent - 1, CONTEXT_BLOCK_OUT, false, true);
	  skipSeparationSpace(state, true, -1);

	  if (state.checkLineBreaks &&
	      PATTERN_NON_ASCII_LINE_BREAKS.test(state.input.slice(documentStart, state.position))) {
	    throwWarning(state, 'non-ASCII line breaks are interpreted as content');
	  }

	  state.documents.push(state.result);

	  if (state.position === state.lineStart && testDocumentSeparator(state)) {

	    if (state.input.charCodeAt(state.position) === 0x2E/* . */) {
	      state.position += 3;
	      skipSeparationSpace(state, true, -1);
	    }
	    return;
	  }

	  if (state.position < (state.length - 1)) {
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
	    if (input.charCodeAt(input.length - 1) !== 0x0A/* LF */ &&
	        input.charCodeAt(input.length - 1) !== 0x0D/* CR */) {
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

	  while (state.input.charCodeAt(state.position) === 0x20/* Space */) {
	    state.lineIndent += 1;
	    state.position += 1;
	  }

	  while (state.position < (state.length - 1)) {
	    readDocument(state);
	  }

	  return state.documents;
	}


	function loadAll(input, iterator, options) {
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
	  throw new YAMLException$1('expected a single document in the stream, but found more');
	}


	loader$1.loadAll = loadAll;
	loader$1.load    = load$1;

	var dumper$1 = {};

	/*eslint-disable no-use-before-define*/

	var common              = common$5;
	var YAMLException       = exception;
	var DEFAULT_SCHEMA      = _default;

	var _toString       = Object.prototype.toString;
	var _hasOwnProperty = Object.prototype.hasOwnProperty;

	var CHAR_BOM                  = 0xFEFF;
	var CHAR_TAB                  = 0x09; /* Tab */
	var CHAR_LINE_FEED            = 0x0A; /* LF */
	var CHAR_CARRIAGE_RETURN      = 0x0D; /* CR */
	var CHAR_SPACE                = 0x20; /* Space */
	var CHAR_EXCLAMATION          = 0x21; /* ! */
	var CHAR_DOUBLE_QUOTE         = 0x22; /* " */
	var CHAR_SHARP                = 0x23; /* # */
	var CHAR_PERCENT              = 0x25; /* % */
	var CHAR_AMPERSAND            = 0x26; /* & */
	var CHAR_SINGLE_QUOTE         = 0x27; /* ' */
	var CHAR_ASTERISK             = 0x2A; /* * */
	var CHAR_COMMA                = 0x2C; /* , */
	var CHAR_MINUS                = 0x2D; /* - */
	var CHAR_COLON                = 0x3A; /* : */
	var CHAR_EQUALS               = 0x3D; /* = */
	var CHAR_GREATER_THAN         = 0x3E; /* > */
	var CHAR_QUESTION             = 0x3F; /* ? */
	var CHAR_COMMERCIAL_AT        = 0x40; /* @ */
	var CHAR_LEFT_SQUARE_BRACKET  = 0x5B; /* [ */
	var CHAR_RIGHT_SQUARE_BRACKET = 0x5D; /* ] */
	var CHAR_GRAVE_ACCENT         = 0x60; /* ` */
	var CHAR_LEFT_CURLY_BRACKET   = 0x7B; /* { */
	var CHAR_VERTICAL_LINE        = 0x7C; /* | */
	var CHAR_RIGHT_CURLY_BRACKET  = 0x7D; /* } */

	var ESCAPE_SEQUENCES = {};

	ESCAPE_SEQUENCES[0x00]   = '\\0';
	ESCAPE_SEQUENCES[0x07]   = '\\a';
	ESCAPE_SEQUENCES[0x08]   = '\\b';
	ESCAPE_SEQUENCES[0x09]   = '\\t';
	ESCAPE_SEQUENCES[0x0A]   = '\\n';
	ESCAPE_SEQUENCES[0x0B]   = '\\v';
	ESCAPE_SEQUENCES[0x0C]   = '\\f';
	ESCAPE_SEQUENCES[0x0D]   = '\\r';
	ESCAPE_SEQUENCES[0x1B]   = '\\e';
	ESCAPE_SEQUENCES[0x22]   = '\\"';
	ESCAPE_SEQUENCES[0x5C]   = '\\\\';
	ESCAPE_SEQUENCES[0x85]   = '\\N';
	ESCAPE_SEQUENCES[0xA0]   = '\\_';
	ESCAPE_SEQUENCES[0x2028] = '\\L';
	ESCAPE_SEQUENCES[0x2029] = '\\P';

	var DEPRECATED_BOOLEANS_SYNTAX = [
	  'y', 'Y', 'yes', 'Yes', 'YES', 'on', 'On', 'ON',
	  'n', 'N', 'no', 'No', 'NO', 'off', 'Off', 'OFF'
	];

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
	    throw new YAMLException('code point within a string may not be greater than 0xFFFFFFFF');
	  }

	  return '\\' + handle + common.repeat('0', length - string.length) + string;
	}


	var QUOTING_TYPE_SINGLE = 1,
	    QUOTING_TYPE_DOUBLE = 2;

	function State(options) {
	  this.schema        = options['schema'] || DEFAULT_SCHEMA;
	  this.indent        = Math.max(1, (options['indent'] || 2));
	  this.noArrayIndent = options['noArrayIndent'] || false;
	  this.skipInvalid   = options['skipInvalid'] || false;
	  this.flowLevel     = (common.isNothing(options['flowLevel']) ? -1 : options['flowLevel']);
	  this.styleMap      = compileStyleMap(this.schema, options['styles'] || null);
	  this.sortKeys      = options['sortKeys'] || false;
	  this.lineWidth     = options['lineWidth'] || 80;
	  this.noRefs        = options['noRefs'] || false;
	  this.noCompatMode  = options['noCompatMode'] || false;
	  this.condenseFlow  = options['condenseFlow'] || false;
	  this.quotingType   = options['quotingType'] === '"' ? QUOTING_TYPE_DOUBLE : QUOTING_TYPE_SINGLE;
	  this.forceQuotes   = options['forceQuotes'] || false;
	  this.replacer      = typeof options['replacer'] === 'function' ? options['replacer'] : null;

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
	  return  (0x00020 <= c && c <= 0x00007E)
	      || ((0x000A1 <= c && c <= 0x00D7FF) && c !== 0x2028 && c !== 0x2029)
	      || ((0x0E000 <= c && c <= 0x00FFFD) && c !== CHAR_BOM)
	      ||  (0x10000 <= c && c <= 0x10FFFF);
	}

	// [34] ns-char ::= nb-char - s-white
	// [27] nb-char ::= c-printable - b-char - c-byte-order-mark
	// [26] b-char  ::= b-line-feed | b-carriage-return
	// Including s-white (for some reason, examples doesn't match specs in this aspect)
	// ns-char ::= c-printable - b-line-feed - b-carriage-return - c-byte-order-mark
	function isNsCharOrWhitespace(c) {
	  return isPrintable(c)
	    && c !== CHAR_BOM
	    // - b-char
	    && c !== CHAR_CARRIAGE_RETURN
	    && c !== CHAR_LINE_FEED;
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
	    inblock ? // c = flow-in
	      cIsNsCharOrWhitespace
	      : cIsNsCharOrWhitespace
	        // - c-flow-indicator
	        && c !== CHAR_COMMA
	        && c !== CHAR_LEFT_SQUARE_BRACKET
	        && c !== CHAR_RIGHT_SQUARE_BRACKET
	        && c !== CHAR_LEFT_CURLY_BRACKET
	        && c !== CHAR_RIGHT_CURLY_BRACKET
	  )
	    // ns-plain-char
	    && c !== CHAR_SHARP // false on '#'
	    && !(prev === CHAR_COLON && !cIsNsChar) // false on ': '
	    || (isNsCharOrWhitespace(prev) && !isWhitespace(prev) && c === CHAR_SHARP) // change to true on '[^ ]#'
	    || (prev === CHAR_COLON && cIsNsChar); // change to true on ':[^ ]'
	}

	// Simplified test for values allowed as the first character in plain style.
	function isPlainSafeFirst(c) {
	  // Uses a subset of ns-char - c-indicator
	  // where ns-char = nb-char - s-white.
	  // No support of ( ( “?” | “:” | “-” ) /* Followed by an ns-plain-safe(c)) */ ) part
	  return isPrintable(c) && c !== CHAR_BOM
	    && !isWhitespace(c) // - s-white
	    // - (c-indicator ::=
	    // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
	    && c !== CHAR_MINUS
	    && c !== CHAR_QUESTION
	    && c !== CHAR_COLON
	    && c !== CHAR_COMMA
	    && c !== CHAR_LEFT_SQUARE_BRACKET
	    && c !== CHAR_RIGHT_SQUARE_BRACKET
	    && c !== CHAR_LEFT_CURLY_BRACKET
	    && c !== CHAR_RIGHT_CURLY_BRACKET
	    // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
	    && c !== CHAR_SHARP
	    && c !== CHAR_AMPERSAND
	    && c !== CHAR_ASTERISK
	    && c !== CHAR_EXCLAMATION
	    && c !== CHAR_VERTICAL_LINE
	    && c !== CHAR_EQUALS
	    && c !== CHAR_GREATER_THAN
	    && c !== CHAR_SINGLE_QUOTE
	    && c !== CHAR_DOUBLE_QUOTE
	    // | “%” | “@” | “`”)
	    && c !== CHAR_PERCENT
	    && c !== CHAR_COMMERCIAL_AT
	    && c !== CHAR_GRAVE_ACCENT;
	}

	// Simplified test for values allowed as the last character in plain style.
	function isPlainSafeLast(c) {
	  // just not whitespace or colon, it will be checked to be plain character later
	  return !isWhitespace(c) && c !== CHAR_COLON;
	}

	// Same as 'string'.codePointAt(pos), but works in older browsers.
	function codePointAt(string, pos) {
	  var first = string.charCodeAt(pos), second;
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

	var STYLE_PLAIN   = 1,
	    STYLE_SINGLE  = 2,
	    STYLE_LITERAL = 3,
	    STYLE_FOLDED  = 4,
	    STYLE_DOUBLE  = 5;

	// Determines which scalar styles are possible and returns the preferred style.
	// lineWidth = -1 => no limit.
	// Pre-conditions: str.length > 0.
	// Post-conditions:
	//    STYLE_PLAIN or STYLE_SINGLE => no \n are in the string.
	//    STYLE_LITERAL => no lines are suitable for folding (or lineWidth is -1).
	//    STYLE_FOLDED => a line > lineWidth and can be folded (and lineWidth != -1).
	function chooseScalarStyle(string, singleLineOnly, indentPerLevel, lineWidth,
	  testAmbiguousType, quotingType, forceQuotes, inblock) {

	  var i;
	  var char = 0;
	  var prevChar = null;
	  var hasLineBreak = false;
	  var hasFoldableLine = false; // only checked if shouldTrackWidth
	  var shouldTrackWidth = lineWidth !== -1;
	  var previousLineBreak = -1; // count the first line correctly
	  var plain = isPlainSafeFirst(codePointAt(string, 0))
	          && isPlainSafeLast(codePointAt(string, string.length - 1));

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
	            (i - previousLineBreak - 1 > lineWidth &&
	             string[previousLineBreak + 1] !== ' ');
	          previousLineBreak = i;
	        }
	      } else if (!isPrintable(char)) {
	        return STYLE_DOUBLE;
	      }
	      plain = plain && isPlainSafe(char, prevChar, inblock);
	      prevChar = char;
	    }
	    // in case the end is missing a \n
	    hasFoldableLine = hasFoldableLine || (shouldTrackWidth &&
	      (i - previousLineBreak - 1 > lineWidth &&
	       string[previousLineBreak + 1] !== ' '));
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
	  state.dump = (function () {
	    if (string.length === 0) {
	      return state.quotingType === QUOTING_TYPE_DOUBLE ? '""' : "''";
	    }
	    if (!state.noCompatMode) {
	      if (DEPRECATED_BOOLEANS_SYNTAX.indexOf(string) !== -1 || DEPRECATED_BASE60_SYNTAX.test(string)) {
	        return state.quotingType === QUOTING_TYPE_DOUBLE ? ('"' + string + '"') : ("'" + string + "'");
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
	    var lineWidth = state.lineWidth === -1
	      ? -1 : Math.max(Math.min(state.lineWidth, 40), state.lineWidth - indent);

	    // Without knowing if keys are implicit/explicit, assume implicit for safety.
	    var singleLineOnly = iskey
	      // No block styles in flow mode.
	      || (state.flowLevel > -1 && level >= state.flowLevel);
	    function testAmbiguity(string) {
	      return testImplicitResolving(state, string);
	    }

	    switch (chooseScalarStyle(string, singleLineOnly, state.indent, lineWidth,
	      testAmbiguity, state.quotingType, state.forceQuotes && !iskey, inblock)) {

	      case STYLE_PLAIN:
	        return string;
	      case STYLE_SINGLE:
	        return "'" + string.replace(/'/g, "''") + "'";
	      case STYLE_LITERAL:
	        return '|' + blockHeader(string, state.indent)
	          + dropEndingNewline(indentString(string, indent));
	      case STYLE_FOLDED:
	        return '>' + blockHeader(string, state.indent)
	          + dropEndingNewline(indentString(foldString(string, lineWidth), indent));
	      case STYLE_DOUBLE:
	        return '"' + escapeString(string) + '"';
	      default:
	        throw new YAMLException('impossible error: invalid scalar style');
	    }
	  }());
	}

	// Pre-conditions: string is valid for a block scalar, 1 <= indentPerLevel <= 9.
	function blockHeader(string, indentPerLevel) {
	  var indentIndicator = needIndentIndicator(string) ? String(indentPerLevel) : '';

	  // note the special case: the string '\n' counts as a "trailing" empty line.
	  var clip =          string[string.length - 1] === '\n';
	  var keep = clip && (string[string.length - 2] === '\n' || string === '\n');
	  var chomp = keep ? '+' : (clip ? '' : '-');

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
	  var result = (function () {
	    var nextLF = string.indexOf('\n');
	    nextLF = nextLF !== -1 ? nextLF : string.length;
	    lineRe.lastIndex = nextLF;
	    return foldLine(string.slice(0, nextLF), width);
	  }());
	  // If we haven't reached the first content line yet, don't add an extra \n.
	  var prevMoreIndented = string[0] === '\n' || string[0] === ' ';
	  var moreIndented;

	  // rest of the lines
	  var match;
	  while ((match = lineRe.exec(string))) {
	    var prefix = match[1], line = match[2];
	    moreIndented = (line[0] === ' ');
	    result += prefix
	      + (!prevMoreIndented && !moreIndented && line !== ''
	        ? '\n' : '')
	      + foldLine(line, width);
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
	  var start = 0, end, curr = 0, next = 0;
	  var result = '';

	  // Invariants: 0 <= start <= length-1.
	  //   0 <= curr <= next <= max(0, length-2). curr - start <= width.
	  // Inside the loop:
	  //   A match implies length >= 2, so curr and next are <= length-2.
	  while ((match = breakRe.exec(line))) {
	    next = match.index;
	    // maintain invariant: curr - start <= width
	    if (next - start > width) {
	      end = (curr > start) ? curr : next; // derive end <= length-2
	      result += '\n' + line.slice(start, end);
	      // skip the space that was output as \n
	      start = end + 1;                    // derive start <= length-1
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
	      _tag    = state.tag,
	      index,
	      length,
	      value;

	  for (index = 0, length = object.length; index < length; index += 1) {
	    value = object[index];

	    if (state.replacer) {
	      value = state.replacer.call(object, String(index), value);
	    }

	    // Write only valid elements, put null instead of invalid elements.
	    if (writeNode(state, level, value, false, false) ||
	        (typeof value === 'undefined' &&
	         writeNode(state, level, null, false, false))) {

	      if (_result !== '') _result += ',' + (!state.condenseFlow ? ' ' : '');
	      _result += state.dump;
	    }
	  }

	  state.tag = _tag;
	  state.dump = '[' + _result + ']';
	}

	function writeBlockSequence(state, level, object, compact) {
	  var _result = '',
	      _tag    = state.tag,
	      index,
	      length,
	      value;

	  for (index = 0, length = object.length; index < length; index += 1) {
	    value = object[index];

	    if (state.replacer) {
	      value = state.replacer.call(object, String(index), value);
	    }

	    // Write only valid elements, put null instead of invalid elements.
	    if (writeNode(state, level + 1, value, true, true, false, true) ||
	        (typeof value === 'undefined' &&
	         writeNode(state, level + 1, null, true, true, false, true))) {

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
	  var _result       = '',
	      _tag          = state.tag,
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
	  var _result       = '',
	      _tag          = state.tag,
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
	    throw new YAMLException('sortKeys must be a boolean or a function');
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

	    explicitPair = (state.tag !== null && state.tag !== '?') ||
	                   (state.dump && state.dump.length > 1024);

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

	    if ((type.instanceOf  || type.predicate) &&
	        (!type.instanceOf || ((typeof object === 'object') && (object instanceof type.instanceOf))) &&
	        (!type.predicate  || type.predicate(object))) {

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
	          throw new YAMLException('!<' + type.tag + '> tag resolver accepts not "' + style + '" style');
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
	    block = (state.flowLevel < 0 || state.flowLevel > level);
	  }

	  var objectOrArray = type === '[object Object]' || type === '[object Array]',
	      duplicateIndex,
	      duplicate;

	  if (objectOrArray) {
	    duplicateIndex = state.duplicates.indexOf(object);
	    duplicate = duplicateIndex !== -1;
	  }

	  if ((state.tag !== null && state.tag !== '?') || duplicate || (state.indent !== 2 && level > 0)) {
	    compact = false;
	  }

	  if (duplicate && state.usedDuplicates[duplicateIndex]) {
	    state.dump = '*ref_' + duplicateIndex;
	  } else {
	    if (objectOrArray && duplicate && !state.usedDuplicates[duplicateIndex]) {
	      state.usedDuplicates[duplicateIndex] = true;
	    }
	    if (type === '[object Object]') {
	      if (block && (Object.keys(state.dump).length !== 0)) {
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
	      if (block && (state.dump.length !== 0)) {
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
	      throw new YAMLException('unacceptable kind of an object to dump ' + type);
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
	      tagStr = encodeURI(
	        state.tag[0] === '!' ? state.tag.slice(1) : state.tag
	      ).replace(/!/g, '%21');

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
	  var objectKeyList,
	      index,
	      length;

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
	    value = state.replacer.call({ '': value }, '', value);
	  }

	  if (writeNode(state, 0, value, true, true)) return state.dump + '\n';

	  return '';
	}

	dumper$1.dump = dump$1;

	var loader = loader$1;
	var dumper = dumper$1;
	var load = loader.load;
	var dump = dumper.dump;

	var __defProp$6 = Object.defineProperty;
	var __name$6 = (target, value) => __defProp$6(target, "name", { value, configurable: true });
	var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
	  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
	}) : x)(function(x) {
	  if (typeof require !== "undefined")
	    return require.apply(this, arguments);
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
	__name$6(interpolate, "interpolate");
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
	__name$6(swapAssign, "swapAssign");
	var Entry = class {
	  constructor(loader, parent, options) {
	    this.loader = loader;
	    this.parent = parent;
	    this.options = options;
	  }
	  static {
	    __name$6(this, "Entry");
	  }
	  fork = null;
	  isUpdate = false;
	  amend(ctx) {
	    swapAssign(ctx[Context.intercept], this.options.intercept);
	    const neoMap = Object.create(Object.getPrototypeOf(ctx[Context.isolate]));
	    for (const [key, label] of Object.entries(this.options.isolate ?? {})) {
	      if (typeof label === "string") {
	        neoMap[key] = (this.loader.realms[label] ??= /* @__PURE__ */ Object.create(null))[key] ??= Symbol(key);
	      } else if (label) {
	        neoMap[key] = Symbol(key);
	      }
	    }
	    for (const key in { ...ctx[Context.isolate], ...neoMap }) {
	      if (neoMap[key] === ctx[Context.isolate][key])
	        continue;
	      const self = /* @__PURE__ */ Object.create(null);
	      self[Context.filter] = (ctx2) => {
	        return ctx[Context.isolate][key] === ctx2[Context.isolate][key];
	      };
	      ctx.emit(self, "internal/before-service", key);
	    }
	    const oldMap = swapAssign(ctx[Context.isolate], neoMap);
	    for (const key in { ...oldMap, ...ctx[Context.isolate] }) {
	      if (oldMap[key] === ctx[Context.isolate][key])
	        continue;
	      const self = /* @__PURE__ */ Object.create(null);
	      self[Context.filter] = (ctx2) => {
	        return ctx[Context.isolate][key] === ctx2[Context.isolate][key];
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
	      if (!plugin)
	        return;
	      const ctx = this.parent.extend({
	        [Context.intercept]: Object.create(this.parent[Context.intercept]),
	        [Context.isolate]: Object.create(this.parent[Context.isolate])
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
	};
	var Loader = class extends Service {
	  constructor(app, options) {
	    super(app, "loader", true);
	    this.app = app;
	    this.options = options;
	    if (options.baseDir)
	      this.baseDir = options.baseDir;
	    this.realms.root = app.root[Context.isolate];
	  }
	  static {
	    __name$6(this, "Loader");
	  }
	  // process
	  baseDir = "./";
	  // process.cwd()
	  envData = { startTime: Date.now() };
	  // public envData = process.env.CORDIS_SHARED
	  //   ? JSON.parse(process.env.CORDIS_SHARED)
	  //   : { startTime: Date.now() }
	  params = {
	    env: {}
	    // process.env,
	  };
	  entryFork;
	  suspend = false;
	  writable = false;
	  mimeType;
	  filename;
	  entries = /* @__PURE__ */ Object.create(null);
	  realms = /* @__PURE__ */ Object.create(null);
	  tasks = /* @__PURE__ */ new Set();
	  async import(name) {
	    try {
	      return await __require(name);
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
	    } else {
	      const module = await import(this.filename);
	      this.config = module.default || module;
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
	    this.entryFork.update(config);
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
	      return mapValues(source, (item) => this.interpolate(item));
	    }
	  }
	  async resolve(name) {
	    const task = this.import(name);
	    this.tasks.add(task);
	    task.finally(() => this.tasks.delete(task));
	    return this.unwrapExports(await task);
	  }
	  isTruthyLike(expr) {
	    if (isNullable(expr))
	      return true;
	    return !!this.interpolate(`\${{ ${expr} }}`);
	  }
	  async update(parent, options) {
	    if (!options.id) {
	      do {
	        options.id = Math.random().toString(36).slice(2, 8);
	      } while (this.entries[options.id]);
	    }
	    const entry = this.entries[options.id] ??= new Entry(this, parent, options);
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
	    this.entryFork = this.app.plugin(group, this.config);
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
	      const { schema } = fork.runtime;
	      fork.entry.options.config = schema ? schema.simplify(config) : config;
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
	};
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
	__name$6(group, "group");
	defineProperty(group, "inject", ["loader"]);
	defineProperty(group, "reusable", true);

	var __defProp$5 = Object.defineProperty;
	var __name$5 = (target, value) => __defProp$5(target, "name", { value, configurable: true });
	var __export = (target, all) => {
	  for (var name in all)
	    __defProp$5(target, name, { get: all[name], enumerable: true });
	};

	// src/worker/logger.ts
	var logger_exports = {};
	__export(logger_exports, {
	  apply: () => apply,
	  inject: () => inject
	});
	var inject = ["loader"];
	function apply(ctx, config = {}) {
	  ctx.on("loader/entry", (type, entry) => {
	    ctx.logger("loader").info("%s plugin %c", type, entry.options.name);
	  });
	  ctx.loader.prolog = [];
	  Logger.targets.push({
	    colors: 3,
	    record: (record) => {
	      ctx.loader.prolog.push(record);
	      ctx.loader.prolog = ctx.loader.prolog.slice(-1e3);
	    }
	  });
	  const { levels } = config;
	  if (typeof levels === "object") {
	    Logger.levels = levels;
	  } else if (typeof levels === "number") {
	    Logger.levels.base = levels;
	  }
	  let showTime = config.showTime;
	  if (showTime === true)
	    showTime = "yyyy-MM-dd hh:mm:ss";
	  if (showTime)
	    Logger.targets[0].showTime = showTime;
	  Logger.targets[0].showDiff = config.showDiff;
	  function ensureBaseLevel(config2, base) {
	    config2.base ??= base;
	    Object.values(config2).forEach((value) => {
	      if (typeof value !== "object")
	        return;
	      ensureBaseLevel(value, config2.base);
	    });
	  }
	  __name$5(ensureBaseLevel, "ensureBaseLevel");
	  ensureBaseLevel(Logger.levels, 2);
	  Logger.targets[0].timestamp = Date.now();
	}
	__name$5(apply, "apply");
	var Context2$1 = class Context2 extends Context {
	  static {
	    __name$5(this, "Context");
	  }
	  baseDir;
	  constructor(config) {
	    super(config);
	    this.baseDir = globalThis.process?.cwd() || "";
	    this.provide("logger", void 0, true);
	    this.provide("timer", void 0, true);
	    this.plugin(LoggerService);
	    this.plugin(TimerService);
	  }
	};
	(class extends Service {
	  static {
	    __name$5(this, "Service");
	  }
	  /** @deprecated use `this.ctx.logger` instead */
	  logger;
	  constructor(...args) {
	    super(...args);
	    this.logger = this.ctx.logger(this.name);
	  }
	  [Service.setup]() {
	    this.ctx = new Context2$1();
	  }
	});

	// src/worker/index.ts
	async function start(options) {
	  const ctx = new Context2$1();
	  ctx.plugin(Loader, options);
	  if (options.logger)
	    ctx.plugin(logger_exports, options.logger);
	  await ctx.start();
	}
	__name$5(start, "start");

	var __defProp$4 = Object.defineProperty;
	var __name$4 = (target, value) => __defProp$4(target, "name", { value, configurable: true });
	var Context2 = class extends Context {
	  static {
	    __name$4(this, "Context");
	  }
	  baseDir;
	  constructor(config) {
	    super(config);
	    this.baseDir = globalThis.process?.cwd() || "";
	    this.provide("logger", void 0, true);
	    this.provide("timer", void 0, true);
	    this.plugin(LoggerService);
	    this.plugin(TimerService);
	  }
	};
	var Service2$1 = class Service2 extends Service {
	  static {
	    __name$4(this, "Service");
	  }
	  /** @deprecated use `this.ctx.logger` instead */
	  logger;
	  constructor(...args) {
	    super(...args);
	    this.logger = this.ctx.logger(this.name);
	  }
	  [Service.setup]() {
	    this.ctx = new Context2();
	  }
	};
	function src_default() {
	}
	__name$4(src_default, "default");

	var __defProp$3 = Object.defineProperty;
	var __name$3 = (target, value) => __defProp$3(target, "name", { value, configurable: true });

	// src/index.ts
	function Field(name) {
	  return { name };
	}
	__name$3(Field, "Field");
	function Method(name, fields) {
	  return { name, fields: fields.map(Field) };
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
	((Channel2) => {
	  ((Type2) => {
	    Type2[Type2["TEXT"] = 0] = "TEXT";
	    Type2[Type2["DIRECT"] = 1] = "DIRECT";
	    Type2[Type2["VOICE"] = 2] = "VOICE";
	    Type2[Type2["CATEGORY"] = 3] = "CATEGORY";
	  })(Channel2.Type || (Channel2.Type = {}));
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
	var WebSocket$1;
	((WebSocket2) => {
	  WebSocket2.CONNECTING = 0;
	  WebSocket2.OPEN = 1;
	  WebSocket2.CLOSING = 2;
	  WebSocket2.CLOSED = 3;
	})(WebSocket$1 || (WebSocket$1 = {}));

	var index = /*#__PURE__*/Object.freeze({
		__proto__: null,
		get Channel () { return Channel; },
		Methods: Methods,
		Opcode: Opcode,
		Status: Status,
		get WebSocket () { return WebSocket$1; }
	});

	var __defProp$2 = Object.defineProperty;
	var __getOwnPropNames = Object.getOwnPropertyNames;
	var __name$2 = (target, value) => __defProp$2(target, "name", { value, configurable: true });
	var __commonJS = (cb, mod) => function __require() {
	  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
	};
	var require_src = __commonJS({
	  "src/index.ts"(exports, module) {
	    var kElement = Symbol.for("satori.element");
	    var ElementConstructor = class {
	      static {
	        __name$2(this, "ElementConstructor");
	      }
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
	          if (isNullable(value))
	            return "";
	          key = hyphenate(key);
	          if (value === true)
	            return ` ${key}`;
	          if (value === false)
	            return ` no-${key}`;
	          return ` ${key}="${Element.escape("" + value, true)}"`;
	        }).join("");
	      }
	      toString(strip = false) {
	        if (this.type === "text" && "content" in this.attrs) {
	          return strip ? this.attrs.content : Element.escape(this.attrs.content);
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
	    };
	    defineProperty(ElementConstructor, "name", "Element");
	    defineProperty(ElementConstructor.prototype, kElement, true);
	    function Element(type, ...args) {
	      const el = Object.create(ElementConstructor.prototype);
	      const attrs = {}, children = [];
	      if (args[0] && typeof args[0] === "object" && !Element.isElement(args[0]) && !Array.isArray(args[0])) {
	        const props = args.shift();
	        for (const [key, value] of Object.entries(props)) {
	          if (isNullable(value))
	            continue;
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
	      return Object.assign(el, { type, attrs, children });
	    }
	    __name$2(Element, "Element");
	    var evaluate = new Function("expr", "context", `
  try {
    with (context) {
      return eval(expr)
    }
  } catch {}
`);
	    ((Element2) => {
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
	          if (content)
	            return Element2("text", { content });
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
	          return content.map(toElement).filter((x) => x);
	        } else {
	          return [toElement(content)].filter((x) => x);
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
	          if (options.type && elements[0]?.type !== options.type)
	            return;
	          return elements[0];
	        }
	        return select(elements, options.type || "*")[0];
	      }
	      Element2.from = from;
	      __name$2(from, "from");
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
	      Element2.parseSelector = parseSelector;
	      __name$2(parseSelector, "parseSelector");
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
	          for (const group of local) {
	            const { type, combinator } = group[0];
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
	          if (matched)
	            results.push(source[index]);
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
	          if (isNullable(value))
	            return "";
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
	        __name$2(pushText, "pushText");
	        const tagRegExp = context ? tagRegExp2 : tagRegExp1;
	        let tagCap;
	        let trimStart = true;
	        while (tagCap = tagRegExp.exec(source)) {
	          const trimEnd = !tagCap.groups.curly;
	          parseContent(source.slice(0, tagCap.index), trimStart, trimEnd);
	          trimStart = trimEnd;
	          source = source.slice(tagCap.index + tagCap[0].length);
	          const [_, , , close, type, extra, empty] = tagCap;
	          if (tagCap.groups.comment)
	            continue;
	          if (tagCap.groups.curly) {
	            let name = "", position = 2 /* EMPTY */;
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
	          if (trimStart2)
	            source2 = source2.replace(/^\s*\n\s*/, "");
	          if (trimEnd)
	            source2 = source2.replace(/\s*\n\s*$/, "");
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
	          children: { default: [] }
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
	          const { name, position } = token;
	          if (position === 1 /* CLOSE */) {
	            if (stack[0][0].name === name) {
	              stack.shift();
	            }
	          } else if (position === 3 /* CONTINUE */) {
	            stack[0][0].children[name] = [];
	            stack[0][1] = name;
	          } else if (position === 0 /* OPEN */) {
	            pushToken(token);
	            token.children = { default: [] };
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
	            result.push(Element2("text", { content: token }));
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
	            if (!items || !items[Symbol.iterator])
	              continue;
	            for (const item of items) {
	              result.push(...parseTokens(token.children.default, { ...context, [ident]: item }));
	            }
	          }
	        }
	        return result;
	      }
	      __name$2(parseTokens, "parseTokens");
	      function visit(element, rules, session) {
	        const { type, attrs, children } = element;
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
	        elements.forEach((element) => {
	          const { type, attrs, children } = element;
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
	        const children = (await Promise.all(elements.map(async (element) => {
	          const { type, attrs, children: children2 } = element;
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
	      Element2.warn = /* @__PURE__ */ __name$2(() => {
	      }, "warn");
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
	          return Element2(type, { ...args[0], src });
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
	        return Element2("i18n", typeof path === "string" ? { path } : path, children);
	      }
	      Element2.i18n = i18n;
	      __name$2(i18n, "i18n");
	    })(Element || (Element = {}));
	    module.exports = Element;
	  }
	});
	var h3 = require_src();

	var __defProp$1 = Object.defineProperty;
	var __name$1 = (target, value) => __defProp$1(target, "name", { value, configurable: true });

	// src/ws.ts
	function sleep(ms) {
	  return new Promise((resolve) => setTimeout(resolve, ms));
	}
	__name$1(sleep, "sleep");
	var WebSocket = class extends EventTarget {
	  constructor(url, config) {
	    super();
	    this.url = url;
	    this.timeout = config?.timeout ?? 3e3;
	  }
	  static {
	    __name$1(this, "WebSocket");
	  }
	  ws;
	  _connected = false;
	  _closed = true;
	  timeout;
	  get protocol() {
	    return this.url.split("://")[0];
	  }
	  get readyState() {
	    if (this._closed)
	      return this._connected ? 2 /* CLOSING */ : 3 /* CLOSED */;
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
	        const fail = /* @__PURE__ */ __name$1(() => reject(new Error("Failed to connect")), "fail");
	        const okPre = this.ws.connectAsync(this.url, (ok) => {
	          if (ok)
	            resolve(ok);
	          else
	            fail();
	        });
	        if (!okPre)
	          fail();
	      });
	    } finally {
	      this._closed = true;
	    }
	    this._connected = true;
	    this.dispatchEvent(new Event("open"));
	    this.ws.listen("onTextReceived", (data) => {
	      const ev = new Event("message");
	      ev.data = data;
	      this.dispatchEvent(ev);
	    });
	    this.ws.listen("onBinaryReceived", () => {
	      const ev = new Event("error");
	      ev.message = `Unexpected binary data received from ${this.url}`;
	      this.dispatchEvent(ev);
	    });
	    this.ws.listen("onError", (msg) => {
	      const ev = new Event("error");
	      ev.message = msg;
	      this.dispatchEvent(ev);
	    });
	    this.ws.listen("onLostConnection", (code) => {
	      this.ws = void 0;
	      this._closed = true;
	      this._connected = false;
	      const ev = new Event("close");
	      ev.code = code;
	      ev.reason = "";
	      this.dispatchEvent(ev);
	    });
	    (async () => {
	      for (; ; ) {
	        if (this._closed)
	          break;
	        await sleep(1);
	      }
	      const { ws } = this;
	      if (!ws)
	        return;
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
	    if (!this.ws)
	      throw new Error("Connection Closed");
	    this.ws.send(data);
	  }
	};

	// src/index.ts
	var kHTTPError = Symbol.for("undios.error");
	var HTTPError = class extends Error {
	  static {
	    __name$1(this, "HTTPError");
	  }
	  [kHTTPError] = true;
	  response;
	  static fromResp(response) {
	    const error = new this(`Request failed with status code ${response.status}`);
	    error.response = response;
	    return error;
	  }
	  static is(error) {
	    return !!error?.[kHTTPError];
	  }
	};
	var HTTP = class _HTTP extends Service2$1 {
	  static {
	    __name$1(this, "HTTP");
	  }
	  static Error = HTTPError;
	  static [Service2$1.provide] = "http";
	  static [Service2$1.immediate] = true;
	  static {
	    for (const method of ["get"]) {
	      defineProperty(
	        _HTTP.prototype,
	        method,
	        async function(url, config) {
	          const response = await this(url, { method, ...config });
	          return response.data;
	        }
	      );
	    }
	    for (const method of ["post"]) {
	      defineProperty(
	        _HTTP.prototype,
	        method,
	        async function(url, data, config) {
	          const response = await this(url, { method, data, ...config });
	          return response.data;
	        }
	      );
	    }
	  }
	  _decoders = /* @__PURE__ */ Object.create(null);
	  constructor(...args) {
	    super(args[0], args[1]);
	    this.decoder("json", (raw) => JSON.parse(raw));
	    this.decoder("text", (raw) => raw);
	  }
	  static mergeConfig = (target, source) => ({
	    ...target,
	    ...source,
	    headers: {
	      ...target?.headers,
	      ...source?.headers
	    }
	  });
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
	    let result = { headers: {}, ...this.config };
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
	      const params = Object.entries(config.params).map(
	        ([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
	      ).join("&");
	      url = `${url}${url.includes("?") ? "&" : "?"}${params}`;
	    }
	    return url;
	  }
	  async [Service2$1.invoke](...args) {
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
	      const validateStatus = config.validateStatus ?? ((status) => Math.floor(status / 100) === 2);
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
	};

	var __defProp = Object.defineProperty;
	var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
	var Session = class _Session {
	  static {
	    __name(this, "Session");
	  }
	  static counter = 0;
	  id;
	  bot;
	  app;
	  event;
	  locales = [];
	  constructor(bot, event) {
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
	    return await h3.transformAsync(elements, ({ type, attrs, children }, session) => {
	      const render = type === "component" ? attrs.is : this.app.get("component:" + type);
	      return render?.(attrs, children, session) ?? true;
	    }, this);
	  }
	  toJSON() {
	    return { ...this.event, id: this.id };
	  }
	};
	function defineAccessor(prototype, name, keys) {
	  Object.defineProperty(prototype, name, {
	    get() {
	      return keys.reduce((data, key) => data?.[key], this);
	    },
	    set(value) {
	      if (value === void 0)
	        return;
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
	var eventAliases = [
	  ["message-created", "message"]
	];
	var Bot = class {
	  constructor(ctx, config, platform) {
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
	  static {
	    __name(this, "Bot");
	  }
	  static reusable = true;
	  static MessageEncoder;
	  user = {};
	  isBot = true;
	  hidden = false;
	  platform;
	  adapter;
	  error;
	  callbacks = {};
	  logger;
	  // Same as `this.ctx`, but with a more specific type.
	  context;
	  _status = Status.OFFLINE;
	  update(login) {
	    const { status, ...rest } = login;
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
	    const { user } = await this.getLogin();
	    return user;
	  }
	};
	var iterableMethods = [
	  "getMessage",
	  "getReaction",
	  "getFriend",
	  "getGuild",
	  "getGuildMember",
	  "getGuildRole",
	  "getChannel"
	];
	for (const name of iterableMethods) {
	  Bot.prototype[name + "Iter"] = function(...args) {
	    let list;
	    if (!this[name + "List"])
	      throw new Error(`not implemented: ${name}List`);
	    const getList = /* @__PURE__ */ __name(async () => {
	      list = await this[name + "List"](...args, list?.next);
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
	exports.Adapter = class Adapter {
	  constructor(ctx) {
	    this.ctx = ctx;
	  }
	  static {
	    __name(this, "Adapter");
	  }
	  static schema = false;
	  bots = [];
	  async connect(bot) {
	  }
	  async disconnect(bot) {
	  }
	  fork(ctx, bot) {
	    bot.adapter = this;
	    this.bots.push(bot);
	    ctx.on("dispose", () => {
	      remove(this.bots, bot);
	    });
	  }
	};
	((Adapter2) => {
	  Adapter2.WsClientConfig = z2.object({
	    retryTimes: z2.natural().description("初次连接时的最大重试次数。").default(6),
	    retryInterval: z2.natural().role("ms").description("初次连接时的重试时间间隔。").default(5 * exports.Time.second),
	    retryLazy: z2.natural().role("ms").description("连接关闭后的重试时间间隔。").default(exports.Time.minute)
	  }).description("连接设置");
	  class WsClientBase extends Adapter2 {
	    constructor(ctx, config) {
	      super(ctx);
	      this.config = config;
	    }
	    static {
	      __name(this, "WsClientBase");
	    }
	    socket;
	    async start() {
	      let _retryCount = 0;
	      const logger = this.ctx.logger("adapter");
	      const { retryTimes, retryInterval, retryLazy } = this.config;
	      const reconnect = /* @__PURE__ */ __name(async (initial = false) => {
	        logger.debug("websocket client opening");
	        const socket = await this.prepare();
	        const url = socket.url.replace(/\?.+/, "");
	        socket.addEventListener("error", (event) => {
	          if (event.message)
	            logger.warn(event.message);
	        });
	        socket.addEventListener("close", ({ code, reason }) => {
	          this.socket = null;
	          logger.debug(`websocket closed with ${code}`);
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
	          logger.warn(`${message}, will retry in ${exports.Time.format(timeout)}...`);
	          setTimeout(() => {
	            if (this.getActive())
	              reconnect();
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
	  Adapter2.WsClientBase = WsClientBase;
	  class WsClient extends WsClientBase {
	    constructor(ctx, bot) {
	      super(ctx, bot.config);
	      this.bot = bot;
	      bot.adapter = this;
	    }
	    static {
	      __name(this, "WsClient");
	    }
	    static reusable = true;
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
	  Adapter2.WsClient = WsClient;
	})(exports.Adapter || (exports.Adapter = {}));
	var AggregateError = class extends Error {
	  constructor(errors, message = "") {
	    super(message);
	    this.errors = errors;
	  }
	  static {
	    __name(this, "AggregateError");
	  }
	};
	var MessageEncoder = class {
	  constructor(bot, channelId, guildId, options = {}) {
	    this.bot = bot;
	    this.channelId = channelId;
	    this.guildId = guildId;
	    this.options = options;
	  }
	  static {
	    __name(this, "MessageEncoder");
	  }
	  errors = [];
	  results = [];
	  session;
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
	    this.session.elements = await session.transform(h3.normalize(content));
	    const btns = h3.select(this.session.elements, "button").filter((v) => v.attrs.type !== "link" && !v.attrs.id);
	    for (const btn of btns) {
	      const r = Math.random().toString(36).slice(2);
	      btn.attrs.id ||= r;
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
	};

	// src/index.ts
	h3.warn = new Logger("element").warn;
	defineProperty(HTTP, "Config", z2.object({
	  timeout: z2.natural().role("ms").description("等待连接建立的最长时间。")
	}).description("请求设置"));
	HTTP.createConfig = /* @__PURE__ */ __name(function createConfig(endpoint) {
	  return z2.object({
	    baseURL: z2.string().role("link").description("要连接的服务器地址。").default(typeof endpoint === "string" ? endpoint : null).required(typeof endpoint === "boolean" ? endpoint : false),
	    headers: z2.dict(String).role("table").description("要附加的额外请求头。"),
	    ...this.Config.dict
	  }).description("请求设置");
	}, "createConfig");
	exports.Context = class Context extends Context2 {
	  static {
	    __name(this, "Context");
	  }
	  static session = Symbol("session");
	  // remove generic type to loosen the constraint
	  static Session = Session;
	  bots = new Proxy([], {
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
	  });
	  constructor(config = {}) {
	    super(config);
	    this.provide("http", void 0, true);
	    this.plugin(HTTP, config.request);
	  }
	  component(name, component, options = {}) {
	    const render = /* @__PURE__ */ __name(async (attrs, children, session) => {
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
	};
	((Context3) => {
	  Context3.Config = z2.intersect([
	    z2.object({})
	  ]);
	})(exports.Context || (exports.Context = {}));
	var Service2 = class extends Service2$1 {
	  static {
	    __name(this, "Service");
	  }
	  [Service2$1.setup]() {
	    this.ctx = new exports.Context();
	  }
	};

	const name = "LeviSatori";
	const baseDir = `./plugins/${name}`;
	const configPath = `${baseDir}/${name}.yml`;
	mc.listen("onServerStarted", () => {
	    if (!file.exists(configPath)) {
	        file.writeTo(configPath, "");
	    }
	    start({
	        name,
	        baseDir,
	        logger: { levels: 2 },
	    });
	});

	exports.Bot = Bot;
	exports.EffectScope = EffectScope;
	exports.Element = h3;
	exports.ForkScope = ForkScope;
	exports.Lifecycle = Lifecycle;
	exports.Logger = Logger;
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
	exports.start = start;
	exports.symbols = symbols;
	exports.trimSlash = trimSlash;
	exports.uncapitalize = uncapitalize;
	exports.union = union;
	exports.valueMap = mapValues;
	exports.z = z2;

}));
