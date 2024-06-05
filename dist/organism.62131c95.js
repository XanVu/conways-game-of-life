// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"cell.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _isAlive = /*#__PURE__*/new WeakMap();
var _nextStatus = /*#__PURE__*/new WeakMap();
var Cell = exports.default = /*#__PURE__*/function () {
  function Cell(isAlive) {
    _classCallCheck(this, Cell);
    _classPrivateFieldInitSpec(this, _isAlive, void 0);
    _classPrivateFieldInitSpec(this, _nextStatus, void 0);
    _classPrivateFieldSet(_isAlive, this, isAlive);
    _classPrivateFieldSet(_nextStatus, this, false);
  }
  return _createClass(Cell, [{
    key: "getIsAlive",
    value: function getIsAlive() {
      return _classPrivateFieldGet(_isAlive, this);
    }
  }, {
    key: "setNextStatus",
    value: function setNextStatus(nextStatus) {
      _classPrivateFieldSet(_nextStatus, this, nextStatus);
    }
  }, {
    key: "evolve",
    value: function evolve() {
      _classPrivateFieldSet(_isAlive, this, _classPrivateFieldGet(_nextStatus, this));
    }
  }, {
    key: "getCellValueAsNumber",
    value: function getCellValueAsNumber() {
      return this.getIsAlive() ? 1 : 0;
    }

    //Any live cell with fewer than two live neighbors dies, as if by underpopulation.
  }], [{
    key: "isUnderpopulated",
    value: function isUnderpopulated(livingCells) {
      return livingCells < 2;
    }

    //Any live cell with more than three live neighbors dies, as if by overpopulation.
  }, {
    key: "isOverpopulated",
    value: function isOverpopulated(livingCells) {
      return livingCells < 3;
    }

    //Any live cell with two or three live neighbors lives on to the next generation.
  }, {
    key: "isSurvivingOnToTheNextGen",
    value: function isSurvivingOnToTheNextGen(livingCells) {
      return livingCells == 2 || livingCells == 3;
    }

    //Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
  }, {
    key: "isAliveByReproduction",
    value: function isAliveByReproduction(livingCells) {
      return livingCells == 3;
    }
  }]);
}();
},{}],"organism.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _cell = _interopRequireDefault(require("./cell.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator.return && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, catch: function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _classPrivateMethodInitSpec(obj, privateSet) { _checkPrivateRedeclaration(obj, privateSet); privateSet.add(obj); }
function _classPrivateFieldInitSpec(obj, privateMap, value) { _checkPrivateRedeclaration(obj, privateMap); privateMap.set(obj, value); }
function _checkPrivateRedeclaration(obj, privateCollection) { if (privateCollection.has(obj)) { throw new TypeError("Cannot initialize the same private elements twice on an object"); } }
function _classPrivateFieldGet(s, a) { return s.get(_assertClassBrand(s, a)); }
function _classPrivateFieldSet(s, a, r) { return s.set(_assertClassBrand(s, a), r), r; }
function _assertClassBrand(e, t, n) { if ("function" == typeof e ? e === t : e.has(t)) return arguments.length < 3 ? t : n; throw new TypeError("Private element is not present on this object"); }
var _deadCells = /*#__PURE__*/new WeakMap();
var _livingCells = /*#__PURE__*/new WeakMap();
var _livingCellsPerIteration = /*#__PURE__*/new WeakMap();
var _deadCellsPerIteration = /*#__PURE__*/new WeakMap();
var _iteration = /*#__PURE__*/new WeakMap();
var _org = /*#__PURE__*/new WeakMap();
var _size = /*#__PURE__*/new WeakMap();
var _Organism_brand = /*#__PURE__*/new WeakSet();
var Organism = exports.default = /*#__PURE__*/function () {
  function Organism(size) {
    _classCallCheck(this, Organism);
    _classPrivateMethodInitSpec(this, _Organism_brand);
    _classPrivateFieldInitSpec(this, _deadCells, 0);
    _classPrivateFieldInitSpec(this, _livingCells, 0);
    _classPrivateFieldInitSpec(this, _livingCellsPerIteration, 0);
    _classPrivateFieldInitSpec(this, _deadCellsPerIteration, 0);
    _classPrivateFieldInitSpec(this, _iteration, 0);
    _classPrivateFieldInitSpec(this, _org, void 0);
    _classPrivateFieldInitSpec(this, _size, void 0);
    _classPrivateFieldSet(_size, this, size);
    _classPrivateFieldSet(_org, this, _assertClassBrand(_Organism_brand, this, _startingLive).call(this));
  }
  return _createClass(Organism, [{
    key: "findNumberOfLivingNeighbursCells",
    value: function findNumberOfLivingNeighbursCells(row, col) {
      var _this = this;
      var neighburCellCoordinates = _assertClassBrand(_Organism_brand, this, _getNeighbursCoordinates).call(this, row, col);
      var cellNeighburs = neighburCellCoordinates.map(function (x) {
        return _assertClassBrand(_Organism_brand, _this, _getCellbyCoordinate).call(_this, x);
      });
      return cellNeighburs.reduce(function (acc, cell) {
        return cell.getCellValueAsNumber() + acc;
      }, 0);
    }
  }, {
    key: "validateCurrentGeneneration",
    value: function validateCurrentGeneneration() {
      for (var row = 0; row < _classPrivateFieldGet(_org, this).length; row++) {
        for (var col = 0; col < _classPrivateFieldGet(_org, this).length; col++) {
          var livingNeighboursCells = this.findNumberOfLivingNeighbursCells(row, col);
          var cell = _classPrivateFieldGet(_org, this)[row][col];
          if (cell.getIsAlive()) {
            if (_cell.default.isSurvivingOnToTheNextGen(livingNeighboursCells)) {
              cell.setNextStatus(true);
            } else cell.setNextStatus(false);
          } else {
            if (_cell.default.isAliveByReproduction(livingNeighboursCells)) {
              cell.setNextStatus(true);
            } else {
              cell.setNextStatus(false);
            }
          }
        }
      }
    }
  }, {
    key: "evolveGeneration",
    value: function evolveGeneration() {
      for (var row = 0; row < _classPrivateFieldGet(_org, this).length; row++) {
        for (var col = 0; col < _classPrivateFieldGet(_org, this).length; col++) {
          var _this$livingCellsPerI3, _this$livingCellsPerI4, _this$deadCellsPerIte3, _this$deadCellsPerIte4;
          var cell = _classPrivateFieldGet(_org, this)[row][col];
          cell.evolve();
          var table = document.querySelector("table");
          table.rows[row].cells[col].innerHTML = cell.getCellValueAsNumber();
          if (cell.getIsAlive()) _classPrivateFieldSet(_livingCellsPerIteration, this, (_this$livingCellsPerI3 = _classPrivateFieldGet(_livingCellsPerIteration, this), _this$livingCellsPerI4 = _this$livingCellsPerI3++, _this$livingCellsPerI3)), _this$livingCellsPerI4;else _classPrivateFieldSet(_deadCellsPerIteration, this, (_this$deadCellsPerIte3 = _classPrivateFieldGet(_deadCellsPerIteration, this), _this$deadCellsPerIte4 = _this$deadCellsPerIte3++, _this$deadCellsPerIte3)), _this$deadCellsPerIte4;
        }
      }
      _classPrivateFieldSet(_deadCells, this, _classPrivateFieldGet(_deadCells, this) + _classPrivateFieldGet(_deadCellsPerIteration, this));
      _classPrivateFieldSet(_livingCells, this, _classPrivateFieldGet(_livingCells, this) + _classPrivateFieldGet(_livingCellsPerIteration, this));
    }
  }, {
    key: "cycleOfLife",
    value: function () {
      var _cycleOfLife = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee() {
        var sleep, _this$iteration, _this$iteration2;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1) switch (_context.prev = _context.next) {
            case 0:
              _assertClassBrand(_Organism_brand, this, _resetIterationCounter).call(this);
              sleep = function sleep(delay) {
                return new Promise(function (resolve) {
                  return setTimeout(resolve, delay);
                });
              };
            case 2:
              if (!(_classPrivateFieldGet(_iteration, this) < 101)) {
                _context.next = 11;
                break;
              }
              this.validateCurrentGeneneration();
              this.evolveGeneration();
              _context.next = 7;
              return sleep(1000);
            case 7:
              _assertClassBrand(_Organism_brand, this, _resetIterationCounter).call(this);
              _classPrivateFieldSet(_iteration, this, (_this$iteration = _classPrivateFieldGet(_iteration, this), _this$iteration2 = _this$iteration++, _this$iteration)), _this$iteration2;
              _context.next = 2;
              break;
            case 11:
            case "end":
              return _context.stop();
          }
        }, _callee, this);
      }));
      function cycleOfLife() {
        return _cycleOfLife.apply(this, arguments);
      }
      return cycleOfLife;
    }()
  }]);
}();
function _resetIterationCounter() {
  _classPrivateFieldSet(_deadCellsPerIteration, this, 0);
  _classPrivateFieldSet(_livingCellsPerIteration, this, 0);
}
function _isEqualToIdentityCoordinates(row, col, array) {
  var identity = Array(row, col);
  return array.every(function (element, index) {
    return element === identity[index];
  });
}
function _getNeighbursCoordinates(row, col) {
  var _this2 = this;
  var columns = _assertClassBrand(_Organism_brand, this, _sanitizeArrayIndecies).call(this, Array(col - 1, col, col + 1));
  var rows = _assertClassBrand(_Organism_brand, this, _sanitizeArrayIndecies).call(this, Array(row - 1, row, row + 1));
  var cartesianProduct = rows.flatMap(function (row) {
    return columns.map(function (column) {
      return Array(row, column);
    });
  });
  var cartesianProductWithoutIdentity = cartesianProduct.filter(function (coordinateArray) {
    return !_assertClassBrand(_Organism_brand, _this2, _isEqualToIdentityCoordinates).call(_this2, row, col, coordinateArray);
  });
  return cartesianProductWithoutIdentity;
}
function _getCellbyCoordinate(coordinate) {
  var row = coordinate[0];
  var col = coordinate[1];
  return _classPrivateFieldGet(_org, this)[row][col];
}
function _sanitizeArrayIndecies(array) {
  var _this3 = this;
  return array.map(function (value) {
    return value - Math.floor(value / _classPrivateFieldGet(_size, _this3)) * _classPrivateFieldGet(_size, _this3);
  });
}
function _startingLive() {
  var _this4 = this;
  var array = Array.from(new Array(_classPrivateFieldGet(_size, this)), function () {
    return new Array(_classPrivateFieldGet(_size, _this4));
  });
  var table = document.querySelector("table");
  for (var row = 0; row < array.length; row++) {
    var r = table.insertRow();
    for (var col = 0; col < array.length; col++) {
      var value = _assertClassBrand(_Organism_brand, this, _GeneratingLife).call(this);
      array[row][col] = value;
      var cell = r.insertCell();
      var text = document.createTextNode(value.getCellValueAsNumber());
      cell.appendChild(text);
    }
  }
  _classPrivateFieldSet(_livingCells, this, _classPrivateFieldGet(_livingCellsPerIteration, this));
  _classPrivateFieldSet(_deadCells, this, _classPrivateFieldGet(_deadCellsPerIteration, this));
  return array;
}
function _GeneratingLife() {
  if (Math.random() > 0.5) {
    var _this$livingCellsPerI, _this$livingCellsPerI2;
    _classPrivateFieldSet(_livingCellsPerIteration, this, (_this$livingCellsPerI = _classPrivateFieldGet(_livingCellsPerIteration, this), _this$livingCellsPerI2 = _this$livingCellsPerI++, _this$livingCellsPerI)), _this$livingCellsPerI2;
    return new _cell.default(true);
  } else {
    var _this$deadCellsPerIte, _this$deadCellsPerIte2;
    _classPrivateFieldSet(_deadCellsPerIteration, this, (_this$deadCellsPerIte = _classPrivateFieldGet(_deadCellsPerIteration, this), _this$deadCellsPerIte2 = _this$deadCellsPerIte++, _this$deadCellsPerIte)), _this$deadCellsPerIte2;
    return new _cell.default(false);
  }
}
},{"./cell.js":"cell.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}
module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53306" + '/');
  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);
    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);
          if (didAccept) {
            handled = true;
          }
        }
      });

      // Enable HMR for CSS by default.
      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });
      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }
    if (data.type === 'reload') {
      ws.close();
      ws.onclose = function () {
        location.reload();
      };
    }
    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }
    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}
function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);
  if (overlay) {
    overlay.remove();
  }
}
function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID;

  // html encode message and stack trace
  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}
function getParents(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return [];
  }
  var parents = [];
  var k, d, dep;
  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];
      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }
  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }
  return parents;
}
function hmrApply(bundle, asset) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}
function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;
  if (!modules) {
    return;
  }
  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }
  if (checkedAssets[id]) {
    return;
  }
  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }
  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}
function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};
  if (cached) {
    cached.hot.data = bundle.hotData;
  }
  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }
  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];
  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });
    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","organism.js"], null)
//# sourceMappingURL=/organism.62131c95.js.map