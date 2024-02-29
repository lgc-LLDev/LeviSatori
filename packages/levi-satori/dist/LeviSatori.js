var LeviSatori = (function (exports, Logger) {
  'use strict';

  var __defProp$b = Object.defineProperty;
  var __name$b = (target, value) => __defProp$b(target, "name", { value, configurable: true });

  // packages/cosmokit/src/misc.ts
  function noop() {
  }
  __name$b(noop, "noop");
  function isNullable(value) {
    return value === null || value === void 0;
  }
  __name$b(isNullable, "isNullable");
  function isPlainObject(data) {
    return data && typeof data === "object" && !Array.isArray(data);
  }
  __name$b(isPlainObject, "isPlainObject");
  function filterKeys(object, filter) {
    return Object.fromEntries(Object.entries(object).filter(([key, value]) => filter(key, value)));
  }
  __name$b(filterKeys, "filterKeys");
  function mapValues(object, transform) {
    return Object.fromEntries(Object.entries(object).map(([key, value]) => [key, transform(value, key)]));
  }
  __name$b(mapValues, "mapValues");
  function is(type, value) {
    if (arguments.length === 1)
      return (value2) => is(type, value2);
    return type in globalThis && value instanceof globalThis[type] || Object.prototype.toString.call(value).slice(8, -1) === type;
  }
  __name$b(is, "is");
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
  __name$b(clone, "clone");
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
    __name$b(check, "check");
    return check(Array.isArray, (a2, b2) => a2.length === b2.length && a2.every((item, index) => deepEqual(item, b2[index]))) ?? check(is("Date"), (a2, b2) => a2.valueOf() === b2.valueOf()) ?? check(is("RegExp"), (a2, b2) => a2.source === b2.source && a2.flags === b2.flags) ?? Object.keys({ ...a, ...b }).every((key) => deepEqual(a[key], b[key], strict));
  }
  __name$b(deepEqual, "deepEqual");
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
  __name$b(pick, "pick");
  function omit(source, keys) {
    if (!keys)
      return { ...source };
    const result = { ...source };
    for (const key of keys) {
      Reflect.deleteProperty(result, key);
    }
    return result;
  }
  __name$b(omit, "omit");
  function defineProperty(object, key, value) {
    return Object.defineProperty(object, key, { writable: true, value, enumerable: false });
  }
  __name$b(defineProperty, "defineProperty");

  // packages/cosmokit/src/array.ts
  function contain(array1, array2) {
    return array2.every((item) => array1.includes(item));
  }
  __name$b(contain, "contain");
  function intersection(array1, array2) {
    return array1.filter((item) => array2.includes(item));
  }
  __name$b(intersection, "intersection");
  function difference(array1, array2) {
    return array1.filter((item) => !array2.includes(item));
  }
  __name$b(difference, "difference");
  function union(array1, array2) {
    return Array.from(/* @__PURE__ */ new Set([...array1, ...array2]));
  }
  __name$b(union, "union");
  function deduplicate(array) {
    return [...new Set(array)];
  }
  __name$b(deduplicate, "deduplicate");
  function remove(list, item) {
    const index = list.indexOf(item);
    if (index >= 0) {
      list.splice(index, 1);
      return true;
    } else {
      return false;
    }
  }
  __name$b(remove, "remove");
  function makeArray(source) {
    return Array.isArray(source) ? source : isNullable(source) ? [] : [source];
  }
  __name$b(makeArray, "makeArray");

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
  __name$b(arrayBufferToBase64, "arrayBufferToBase64");
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
  __name$b(base64ToArrayBuffer, "base64ToArrayBuffer");

  // packages/cosmokit/src/string.ts
  function capitalize(source) {
    return source.charAt(0).toUpperCase() + source.slice(1);
  }
  __name$b(capitalize, "capitalize");
  function uncapitalize(source) {
    return source.charAt(0).toLowerCase() + source.slice(1);
  }
  __name$b(uncapitalize, "uncapitalize");
  function camelCase(source) {
    return source.replace(/[_-][a-z]/g, (str) => str.slice(1).toUpperCase());
  }
  __name$b(camelCase, "camelCase");
  function paramCase(source) {
    return uncapitalize(source).replace(/_/g, "-").replace(/.[A-Z]+/g, (str) => str[0] + "-" + str.slice(1).toLowerCase());
  }
  __name$b(paramCase, "paramCase");
  function snakeCase(source) {
    return uncapitalize(source).replace(/-/g, "_").replace(/.[A-Z]+/g, (str) => str[0] + "_" + str.slice(1).toLowerCase());
  }
  __name$b(snakeCase, "snakeCase");
  var camelize = camelCase;
  var hyphenate = paramCase;
  function trimSlash(source) {
    return source.replace(/\/$/, "");
  }
  __name$b(trimSlash, "trimSlash");
  function sanitize(source) {
    if (!source.startsWith("/"))
      source = "/" + source;
    return trimSlash(source);
  }
  __name$b(sanitize, "sanitize");

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
    __name$b(setTimezoneOffset, "setTimezoneOffset");
    function getTimezoneOffset() {
      return timezoneOffset;
    }
    Time2.getTimezoneOffset = getTimezoneOffset;
    __name$b(getTimezoneOffset, "getTimezoneOffset");
    function getDateNumber(date = /* @__PURE__ */ new Date(), offset) {
      if (typeof date === "number")
        date = new Date(date);
      if (offset === void 0)
        offset = timezoneOffset;
      return Math.floor((date.valueOf() / Time2.minute - offset) / 1440);
    }
    Time2.getDateNumber = getDateNumber;
    __name$b(getDateNumber, "getDateNumber");
    function fromDateNumber(value, offset) {
      const date = new Date(value * Time2.day);
      if (offset === void 0)
        offset = timezoneOffset;
      return new Date(+date + offset * Time2.minute);
    }
    Time2.fromDateNumber = fromDateNumber;
    __name$b(fromDateNumber, "fromDateNumber");
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
    __name$b(parseTime, "parseTime");
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
    __name$b(parseDate, "parseDate");
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
    __name$b(format, "format");
    function toDigits(source, length = 2) {
      return source.toString().padStart(length, "0");
    }
    Time2.toDigits = toDigits;
    __name$b(toDigits, "toDigits");
    function template(template2, time = /* @__PURE__ */ new Date()) {
      return template2.replace("yyyy", time.getFullYear().toString()).replace("yy", time.getFullYear().toString().slice(2)).replace("MM", toDigits(time.getMonth() + 1)).replace("dd", toDigits(time.getDate())).replace("hh", toDigits(time.getHours())).replace("mm", toDigits(time.getMinutes())).replace("ss", toDigits(time.getSeconds())).replace("SSS", toDigits(time.getMilliseconds(), 3));
    }
    Time2.template = template;
    __name$b(template, "template");
  })(exports.Time || (exports.Time = {}));

  var __defProp$a = Object.defineProperty;
  var __name$a = (target, value) => __defProp$a(target, "name", { value, configurable: true });
  function isBailed$1(value) {
    return value !== null && value !== false && value !== void 0;
  }
  __name$a(isBailed$1, "isBailed");
  var Lifecycle$1 = class Lifecycle {
    constructor(root) {
      this.root = root;
      defineProperty(this, Context$1.trace, root);
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
      }), Context$1.static, root.scope);
      for (const level of ["info", "error", "warning"]) {
        defineProperty(this.on(`internal/${level}`, (format, ...param) => {
          if (this._hooks[`internal/${level}`].length > 1)
            return;
          console.info(format, ...param);
        }), Context$1.static, root.scope);
      }
    }
    static {
      __name$a(this, "Lifecycle");
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
        if (isBailed$1(result))
          return result;
      }
    }
    bail(...args) {
      const [hooks, thisArg] = this.prepareEvent("bail", args);
      for (const callback of hooks) {
        const result = callback.apply(thisArg, args);
        if (isBailed$1(result))
          return result;
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
  var symbols$1 = {
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
  function isConstructor$1(func) {
    if (!func.prototype)
      return false;
    if (func.prototype.constructor !== func)
      return false;
    return true;
  }
  __name$a(isConstructor$1, "isConstructor");
  function resolveConfig$1(plugin, config) {
    const schema = plugin["Config"] || plugin["schema"];
    if (schema && plugin["schema"] !== false)
      config = schema(config);
    return config ?? {};
  }
  __name$a(resolveConfig$1, "resolveConfig");
  function isUnproxyable$1(value) {
    return [Map, Set, Date, Promise].some((constructor) => value instanceof constructor);
  }
  __name$a(isUnproxyable$1, "isUnproxyable");
  function joinPrototype$1(proto1, proto2) {
    if (proto1 === Object.prototype)
      return proto2;
    const result = Object.create(joinPrototype$1(Object.getPrototypeOf(proto1), proto2));
    for (const key of Reflect.ownKeys(proto1)) {
      Object.defineProperty(result, key, Object.getOwnPropertyDescriptor(proto1, key));
    }
    return result;
  }
  __name$a(joinPrototype$1, "joinPrototype");
  function createTraceable$1(ctx, value) {
    const proxy = new Proxy(value, {
      get: (target, name, receiver) => {
        if (name === symbols$1.trace || name === "caller")
          return ctx;
        return Reflect.get(target, name, receiver);
      },
      apply: (target, thisArg, args) => {
        return applyTraceable$1(proxy, target, thisArg, args);
      }
    });
    return proxy;
  }
  __name$a(createTraceable$1, "createTraceable");
  function applyTraceable$1(proxy, value, thisArg, args) {
    if (!value[symbols$1.invoke])
      return Reflect.apply(value, thisArg, args);
    return value[symbols$1.invoke].apply(proxy, args);
  }
  __name$a(applyTraceable$1, "applyTraceable");
  function createCallable$1(name, proto) {
    const self = /* @__PURE__ */ __name$a(function(...args) {
      const proxy = createTraceable$1(self[symbols$1.trace], self);
      return applyTraceable$1(proxy, self, this, args);
    }, "self");
    defineProperty(self, "name", name);
    return Object.setPrototypeOf(self, proto);
  }
  __name$a(createCallable$1, "createCallable");
  var CordisError = class _CordisError extends Error {
    constructor(code, message) {
      super(message ?? _CordisError.Code[code]);
      this.code = code;
    }
    static {
      __name$a(this, "CordisError");
    }
  };
  ((CordisError2) => {
    CordisError2.Code = {
      INACTIVE_EFFECT: "cannot create effect on inactive context"
    };
  })(CordisError || (CordisError = {}));
  var EffectScope$1 = class EffectScope {
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
      __name$a(this, "EffectScope");
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
      throw new CordisError("INACTIVE_EFFECT");
    }
    effect(callback, config) {
      this.assertActive();
      const result = isConstructor$1(callback) ? new callback(this.ctx, config) : callback(this.ctx, config);
      let disposed = false;
      const original = typeof result === "function" ? result : result.dispose.bind(result);
      const wrapped = /* @__PURE__ */ __name$a(() => {
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
      }), Context$1.static, this);
      defineProperty(this.context.on("internal/service", (name) => {
        if (!this.runtime.using.includes(name))
          return;
        this.start();
      }), Context$1.static, this);
    }
    get ready() {
      return this.runtime.using.every((name) => !isNullable(this.ctx[name]));
    }
    reset() {
      this.isActive = false;
      this.disposables = this.disposables.splice(0).filter((dispose) => {
        if (this.uid !== null && dispose[Context$1.static] === this)
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
      const checkPropertyUpdate = /* @__PURE__ */ __name$a((key) => {
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
  var ForkScope$1 = class ForkScope extends EffectScope$1 {
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
      }), Context$1.static, runtime);
      runtime.children.push(this);
      runtime.disposables.push(this.dispose);
      this.context.emit("internal/fork", this);
      if (runtime.isReusable) {
        this.setupInject();
      }
      this.init(error);
    }
    static {
      __name$a(this, "ForkScope");
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
      const resolved = resolveConfig$1(this.runtime.plugin, config);
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
  var MainScope$1 = class MainScope extends EffectScope$1 {
    constructor(registry, plugin, config, error) {
      super(registry[Context$1.trace], config);
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
      __name$a(this, "MainScope");
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
      return new ForkScope$1(parent, this, config, error);
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
      } else if (isConstructor$1(this.plugin)) {
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
      const resolved = resolveConfig$1(this.runtime.plugin || this.context.constructor, config);
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
  function isApplicable$1(object) {
    return object && typeof object === "object" && typeof object.apply === "function";
  }
  __name$a(isApplicable$1, "isApplicable");
  var Registry$1 = class Registry {
    constructor(root, config) {
      this.root = root;
      defineProperty(this, Context$1.trace, root);
      root.scope = new MainScope$1(this, null, config);
      root.scope.runtime.isReactive = true;
    }
    static {
      __name$a(this, "Registry");
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
      if (isApplicable$1(plugin))
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
      const context = this[Context$1.trace];
      context.scope.assertActive();
      let error;
      try {
        config = resolveConfig$1(plugin, config);
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
      runtime = new MainScope$1(this, plugin, config, error);
      return runtime.fork(context, config, error);
    }
  };

  // src/context.ts
  var Context$1 = class _Context {
    static {
      __name$a(this, "Context");
    }
    static trace = symbols$1.trace;
    static events = symbols$1.events;
    static static = symbols$1.static;
    static filter = symbols$1.filter;
    static expose = symbols$1.expose;
    static isolate = symbols$1.isolate;
    static internal = symbols$1.internal;
    static intercept = symbols$1.intercept;
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
      if (Object.prototype.hasOwnProperty.call(ctx, symbols$1.internal)) {
        return ctx[symbols$1.internal];
      }
      const parent = _Context.ensureInternal.call(Object.getPrototypeOf(this));
      return ctx[symbols$1.internal] = Object.create(parent);
    }
    static resolveInject(ctx, name) {
      let internal = ctx[symbols$1.internal][name];
      while (internal?.type === "alias") {
        name = internal.name;
        internal = ctx[symbols$1.internal][name];
      }
      return [name, internal];
    }
    static handler = {
      get(target, prop, ctx) {
        if (typeof prop !== "string")
          return Reflect.get(target, prop, ctx);
        const checkInject = /* @__PURE__ */ __name$a((name2) => {
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
        const key = ctx[symbols$1.isolate][name];
        const oldValue = ctx.root[key];
        if (oldValue === value)
          return true;
        if (value && oldValue) {
          throw new Error(`service ${name} has been registered`);
        }
        if (value) {
          ctx.on("dispose", () => ctx[name] = void 0);
        }
        if (isUnproxyable$1(value)) {
          ctx.emit("internal/warning", new Error(`service ${name} is an unproxyable object, which may lead to unexpected behavior`));
        }
        const self = /* @__PURE__ */ Object.create(null);
        self[symbols$1.filter] = (ctx2) => {
          return ctx[symbols$1.isolate][name] === ctx2[symbols$1.isolate][name];
        };
        ctx.root.emit(self, "internal/before-service", name, value);
        ctx.root[key] = value;
        if (value instanceof Object) {
          defineProperty(value, symbols$1.trace, ctx);
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
          const caller = receiver[symbols$1.trace];
          if (!caller?.[symbols$1.internal][`${name}.${key}`])
            return Reflect.get(target, key, receiver);
          return caller.get(`${name}.${key}`);
        },
        set(target, key, value, receiver) {
          if (typeof key === "symbol" || key in target)
            return Reflect.set(target, key, value, receiver);
          const caller = receiver[symbols$1.trace];
          if (!caller?.[symbols$1.internal][`${name}.${key}`])
            return Reflect.set(target, key, value, receiver);
          caller[`${name}.${key}`] = value;
          return true;
        }
      });
    }
    constructor(config) {
      const self = new Proxy(this, _Context.handler);
      config = resolveConfig$1(this.constructor, config);
      self[symbols$1.isolate] = /* @__PURE__ */ Object.create(null);
      self[symbols$1.intercept] = /* @__PURE__ */ Object.create(null);
      self.root = self;
      self.mixin("scope", ["config", "runtime", "effect", "collect", "accept", "decline"]);
      self.mixin("registry", ["using", "inject", "plugin", "dispose"]);
      self.mixin("lifecycle", ["on", "once", "off", "after", "parallel", "emit", "serial", "bail", "start", "stop"]);
      self.provide("registry", new Registry$1(self, config), true);
      self.provide("lifecycle", new Lifecycle$1(self), true);
      const attach = /* @__PURE__ */ __name$a((internal) => {
        if (!internal)
          return;
        attach(Object.getPrototypeOf(internal));
        for (const key of Object.getOwnPropertyNames(internal)) {
          const constructor = internal[key]["prototype"]?.constructor;
          if (!constructor)
            continue;
          self[internal[key]["key"]] = new constructor(self, config);
          defineProperty(self[internal[key]["key"]], symbols$1.trace, self);
        }
      }, "attach");
      attach(this[symbols$1.internal]);
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
      const internal = this[symbols$1.internal][name];
      if (internal?.type !== "service")
        return;
      const value = this.root[this[symbols$1.isolate][name]];
      if (!value || typeof value !== "object" && typeof value !== "function")
        return value;
      if (isUnproxyable$1(value)) {
        defineProperty(value, symbols$1.trace, this);
        return value;
      }
      return createTraceable$1(this, value);
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
      const shadow = Object.create(this[symbols$1.isolate]);
      shadow[name] = label ?? Symbol(name);
      return this.extend({ [symbols$1.isolate]: shadow });
    }
    intercept(name, config) {
      const intercept = Object.create(this[symbols$1.intercept]);
      intercept[name] = config;
      return this.extend({ [symbols$1.intercept]: intercept });
    }
  };
  Context$1.prototype[Context$1.internal] = /* @__PURE__ */ Object.create(null);
  var Service$1 = class _Service {
    static {
      __name$a(this, "Service");
    }
    static setup = symbols$1.setup;
    static invoke = symbols$1.invoke;
    static extend = symbols$1.extend;
    static provide = symbols$1.provide;
    static immediate = symbols$1.immediate;
    start() {
    }
    stop() {
    }
    ctx;
    [symbols$1.trace];
    name;
    config;
    constructor(...args) {
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
      name ??= this.constructor[symbols$1.provide];
      immediate ??= this.constructor[symbols$1.immediate];
      let self = this;
      if (self[symbols$1.invoke]) {
        self = createCallable$1(name, joinPrototype$1(Object.getPrototypeOf(this), Function.prototype));
      }
      if (_ctx) {
        self.ctx = _ctx;
      } else {
        self[symbols$1.setup]();
      }
      self.name = name;
      self.config = config;
      defineProperty(self, symbols$1.trace, self.ctx);
      self.ctx.provide(name);
      self.ctx.runtime.name = name;
      if (immediate) {
        if (_ctx)
          self[symbols$1.expose] = name;
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
      return Context$1.associate(self, name);
    }
    [symbols$1.filter](ctx) {
      return ctx[symbols$1.isolate][this.name] === this.ctx[symbols$1.isolate][this.name];
    }
    [symbols$1.setup]() {
      this.ctx = new Context$1();
    }
    [symbols$1.extend](props) {
      const caller = this[symbols$1.trace];
      let self;
      if (this[_Service.invoke]) {
        self = createCallable$1(this.name, this);
      } else {
        self = Object.create(this);
      }
      defineProperty(self, symbols$1.trace, caller);
      return Context$1.associate(Object.assign(self, props), this.name);
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

  var __defProp$9 = Object.defineProperty;
  var __name$9 = (target, value) => __defProp$9(target, "name", { value, configurable: true });
  var LoggerService$1 = class _LoggerService extends Service$1 {
    static {
      __name$9(this, "LoggerService");
    }
    static [Service$1.provide] = "logger";
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
    [Service$1.invoke](name) {
      return new Logger(name, { [Context$1.current]: this });
    }
    static {
      for (const type of ["success", "error", "info", "warn", "debug", "extend"]) {
        _LoggerService.prototype[type] = function(...args) {
          const caller = this[Context$1.current];
          return this(caller.name)[type](...args);
        };
      }
    }
  };

  var __defProp$8 = Object.defineProperty;
  var __name$8 = (target, value) => __defProp$8(target, "name", { value, configurable: true });
  var TimerService$1 = class TimerService extends Service$1 {
    static {
      __name$8(this, "TimerService");
    }
    constructor(ctx) {
      super(ctx, "timer", true);
      ctx.mixin("timer", ["setTimeout", "setInterval", "sleep", "throttle", "debounce"]);
    }
    setTimeout(callback, delay) {
      const dispose = this[Context$1.current].effect(() => {
        const timer = setTimeout(() => {
          dispose();
          callback();
        }, delay);
        return () => clearTimeout(timer);
      });
      return dispose;
    }
    setInterval(callback, delay) {
      return this[Context$1.current].effect(() => {
        const timer = setInterval(callback, delay);
        return () => clearInterval(timer);
      });
    }
    sleep(delay) {
      const caller = this[Context$1.current];
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
      const caller = this[Context$1.current];
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

  var __defProp$6 = Object.defineProperty;
  var __name$6 = (target, value) => __defProp$6(target, "name", { value, configurable: true });
  var Context2$1 = class Context2 extends Context$1 {
    static {
      __name$6(this, "Context");
    }
    baseDir;
    constructor(config) {
      super(config);
      this.baseDir = globalThis.process?.cwd() || "";
      this.provide("logger", void 0, true);
      this.provide("timer", void 0, true);
      this.plugin(LoggerService$1);
      this.plugin(TimerService$1);
    }
  };
  var Service2$1 = class Service2 extends Service$1 {
    static {
      __name$6(this, "Service");
    }
    /** @deprecated use `this.ctx.logger` instead */
    logger;
    constructor(...args) {
      super(...args);
      this.logger = this.ctx.logger(this.name);
    }
    [Service$1.setup]() {
      this.ctx = new Context2$1();
    }
  };
  function src_default$1() {
  }
  __name$6(src_default$1, "default");

  var __defProp$5 = Object.defineProperty;
  var __name$5 = (target, value) => __defProp$5(target, "name", { value, configurable: true });

  // src/index.ts
  function Field(name) {
    return { name };
  }
  __name$5(Field, "Field");
  function Method(name, fields) {
    return { name, fields: fields.map(Field) };
  }
  __name$5(Method, "Method");
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
  var WebSocket;
  ((WebSocket2) => {
    WebSocket2.CONNECTING = 0;
    WebSocket2.OPEN = 1;
    WebSocket2.CLOSING = 2;
    WebSocket2.CLOSED = 3;
  })(WebSocket || (WebSocket = {}));

  var index = /*#__PURE__*/Object.freeze({
    __proto__: null,
    get Channel () { return Channel; },
    Methods: Methods,
    Opcode: Opcode,
    Status: Status,
    get WebSocket () { return WebSocket; }
  });

  var __defProp$4 = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __name$4 = (target, value) => __defProp$4(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var require_src = __commonJS({
    "src/index.ts"(exports, module) {
      var kElement = Symbol.for("satori.element");
      var ElementConstructor = class {
        static {
          __name$4(this, "ElementConstructor");
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
      __name$4(Element, "Element");
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
        __name$4(isElement, "isElement");
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
        __name$4(toElement, "toElement");
        function toElementArray(content) {
          if (Array.isArray(content)) {
            return content.map(toElement).filter((x) => x);
          } else {
            return [toElement(content)].filter((x) => x);
          }
        }
        Element2.toElementArray = toElementArray;
        __name$4(toElementArray, "toElementArray");
        function normalize(source, context) {
          return typeof source === "string" ? parse(source, context) : toElementArray(source);
        }
        Element2.normalize = normalize;
        __name$4(normalize, "normalize");
        function escape(source, inline = false) {
          const result = source.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
          return inline ? result.replace(/"/g, "&quot;") : result;
        }
        Element2.escape = escape;
        __name$4(escape, "escape");
        function unescape(source) {
          return source.replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, '"').replace(/&#(\d+);/g, (_, code) => code === "38" ? _ : String.fromCharCode(+code)).replace(/&#x([0-9a-f]+);/gi, (_, code) => code === "26" ? _ : String.fromCharCode(parseInt(code, 16))).replace(/&(amp|#38|#x26);/g, "&");
        }
        Element2.unescape = unescape;
        __name$4(unescape, "unescape");
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
        __name$4(from, "from");
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
        __name$4(parseSelector, "parseSelector");
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
        __name$4(select, "select");
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
        __name$4(interpolate, "interpolate");
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
          __name$4(pushText, "pushText");
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
          __name$4(parseContent, "parseContent");
          return parseTokens(foldTokens(tokens), context);
        }
        Element2.parse = parse;
        __name$4(parse, "parse");
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
          __name$4(pushToken, "pushToken");
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
        __name$4(foldTokens, "foldTokens");
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
        __name$4(parseTokens, "parseTokens");
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
        __name$4(visit, "visit");
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
        __name$4(transform, "transform");
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
        __name$4(transformAsync, "transformAsync");
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
        __name$4(createFactory, "createFactory");
        Element2.warn = /* @__PURE__ */ __name$4(() => {
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
        __name$4(createAssetFactory, "createAssetFactory");
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
        __name$4(i18n, "i18n");
      })(Element || (Element = {}));
      module.exports = Element;
    }
  });
  var h3 = require_src();

  var __defProp$3 = Object.defineProperty;
  var __name$3 = (target, value) => __defProp$3(target, "name", { value, configurable: true });
  function isBailed(value) {
    return value !== null && value !== false && value !== void 0;
  }
  __name$3(isBailed, "isBailed");
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
      __name$3(this, "Lifecycle");
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
  __name$3(isConstructor, "isConstructor");
  function resolveConfig(plugin, config) {
    const schema = plugin["Config"] || plugin["schema"];
    if (schema && plugin["schema"] !== false)
      config = schema(config);
    return config ?? {};
  }
  __name$3(resolveConfig, "resolveConfig");
  function isUnproxyable(value) {
    return [Map, Set, Date, Promise].some((constructor) => value instanceof constructor);
  }
  __name$3(isUnproxyable, "isUnproxyable");
  function joinPrototype(proto1, proto2) {
    if (proto1 === Object.prototype)
      return proto2;
    const result = Object.create(joinPrototype(Object.getPrototypeOf(proto1), proto2));
    for (const key of Reflect.ownKeys(proto1)) {
      Object.defineProperty(result, key, Object.getOwnPropertyDescriptor(proto1, key));
    }
    return result;
  }
  __name$3(joinPrototype, "joinPrototype");
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
  __name$3(createTraceable, "createTraceable");
  function applyTraceable(proxy, value, thisArg, args) {
    if (!value[symbols.invoke])
      return Reflect.apply(value, thisArg, args);
    return value[symbols.invoke].apply(proxy, args);
  }
  __name$3(applyTraceable, "applyTraceable");
  function createCallable(name, proto) {
    const self = /* @__PURE__ */ __name$3(function(...args) {
      const proxy = createTraceable(self[symbols.trace], self);
      return applyTraceable(proxy, self, this, args);
    }, "self");
    defineProperty(self, "name", name);
    return Object.setPrototypeOf(self, proto);
  }
  __name$3(createCallable, "createCallable");

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
      __name$3(this, "CordisError");
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
      __name$3(this, "EffectScope");
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
      const wrapped = /* @__PURE__ */ __name$3(() => {
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
      const checkPropertyUpdate = /* @__PURE__ */ __name$3((key) => {
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
      __name$3(this, "ForkScope");
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
      __name$3(this, "MainScope");
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
  __name$3(isApplicable, "isApplicable");
  var Registry = class {
    constructor(root, config) {
      this.root = root;
      defineProperty(this, Context.trace, root);
      root.scope = new MainScope(this, null, config);
      root.scope.runtime.isReactive = true;
    }
    static {
      __name$3(this, "Registry");
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
      __name$3(this, "Context");
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
        const checkInject = /* @__PURE__ */ __name$3((name2) => {
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
      const attach = /* @__PURE__ */ __name$3((internal) => {
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
      __name$3(this, "Service");
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

  // src/index.ts
  Logger.targets = [
    {
      colors: 3,
      print(text) {
        logger.info(text);
      }
    }
  ];
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
      for (const type of ["success", "error", "info", "warn", "debug", "extend"]) {
        _LoggerService.prototype[type] = function(...args) {
          const caller = this[Context.trace];
          return this(caller.name)[type](...args);
        };
      }
    }
  };

  var __defProp$2 = Object.defineProperty;
  var __name$2 = (target, value) => __defProp$2(target, "name", { value, configurable: true });
  var TimerService = class extends Service {
    static {
      __name$2(this, "TimerService");
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
      const dispose = /* @__PURE__ */ __name$2(() => {
        isDisposed = true;
        remove(caller.scope.disposables, dispose);
        clearTimeout(timer);
      }, "dispose");
      const wrapper = /* @__PURE__ */ __name$2((...args) => {
        clearTimeout(timer);
        timer = callback(args, () => !isDisposed && caller.scope.isActive);
      }, "wrapper");
      wrapper.dispose = dispose;
      caller.scope.disposables.push(dispose);
      return wrapper;
    }
    throttle(callback, delay, noTrailing) {
      let lastCall = -Infinity;
      const execute = /* @__PURE__ */ __name$2((...args) => {
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

  var __defProp$1 = Object.defineProperty;
  var __name$1 = (target, value) => __defProp$1(target, "name", { value, configurable: true });
  var Context2 = class extends Context {
    static {
      __name$1(this, "Context");
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
      __name$1(this, "Service");
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
  });
  function src_default() {
  }
  __name$1(src_default, "default");

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
  exports.Context = class Context extends Context2$1 {
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

  exports.Logger = Logger;
  exports.Bot = Bot;
  exports.EffectScope = EffectScope;
  exports.Element = h3;
  exports.ForkScope = ForkScope;
  exports.Lifecycle = Lifecycle;
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

  return exports;

})({}, Logger);
