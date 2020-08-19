"use strict";

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
