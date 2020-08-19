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
})({"Focm":[function(require,module,exports) {
/**
 * Generate the Array Buffer object for target reference provided as parameter.
 *
 * @param {String|HTMLInputElement|FileList|File|ArrayBuffer|Blob} target
 * @return {Promise<ArrayBuffer>}
 */
var toArrayBuffer = function toArrayBuffer(target) {
  if (typeof Promise === 'undefined') {
    throw new ReferenceError('Your environment does not support Promises.');
  } else if (typeof ArrayBuffer === 'undefined') {
    throw new ReferenceError('Your environment does not support ArrayBuffer.');
  }

  if (!target) {
    return Promise.reject(new Error("Parameter to convert to ArrayBuffer is empty (value: '".concat(target, "').")));
  }

  if (target.constructor === ArrayBuffer) {
    return Promise.resolve(target);
  }

  if (typeof Blob !== 'undefined' && target.constructor === Blob) {
    return target.toArrayBuffer();
  }

  if (target.constructor === String) {
    var el = document.querySelector(target);

    if (!el) {
      return Promise.reject(new Error("No HTML found with selector \"".concat(target, "\".")));
    }

    target = el;
  }

  if (typeof HTMLInputElement !== 'undefined' && target.constructor === HTMLInputElement) {
    if (!target.files) {
      return Promise.reject(new Error('HTML input element reference is not of type "file".'));
    }

    target = target.files;
  }

  if (typeof FileList !== 'undefined' && target.constructor === FileList) {
    if (target.length === 0) {
      return Promise.reject(new Error('Object FileList is empty.'));
    }

    target = target[0];
  }

  if (typeof File !== 'undefined' && target.constructor === File) {
    if (typeof FileReader === 'undefined') {
      throw new TypeError('Your environment does not support FileReader.');
    }

    var reader = new FileReader();
    return new Promise(function (resolve, reject) {
      reader.onloadend = function (ev) {
        return resolve(ev.target.result);
      };

      reader.onerror = function (ev) {
        return reject(ev.target.error);
      };

      reader.readAsArrayBuffer(target);
    });
  }

  return Promise.reject(new Error('Parameter type must be an instance of HTMLInputElement, FileList, File, String (input selector), Blob or ArrayBuffer'));
};

module.exports = toArrayBuffer;
},{}],"UeJd":[function(require,module,exports) {
window.toArrayBuffer = require('./index');
},{"./index":"Focm"}]},{},["UeJd"], null)
//# sourceMappingURL=/to-arraybuffer.js.map