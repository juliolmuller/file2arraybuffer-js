
/**
 * Generate the Array Buffer object for target reference provided as parameter.
 *
 * @param {String|HTMLElement|FileList|File|ArrayBuffer|Blob} target
 * @return {Promise<ArrayBuffer>}
 */
const toArrayBuffer = (target) => {

  if (typeof Promise === 'undefined') {
    throw new ReferenceError('Your environment does not support Promises.')
  } else if (typeof ArrayBuffer === 'undefined') {
    throw new ReferenceError('Your environment does not support ArrayBuffer.')
  }

  if (!target) {
    // eslint-disable-next-line max-len
    return Promise.reject(new Error(`Parameter to convert to ArrayBuffer is empty (value: '${target}').`))
  }

  if (target.constructor === ArrayBuffer) {
    return Promise.resolve(target)
  }

  if (typeof Blob !== 'undefined' && target.constructor === Blob) {
    return target.toArrayBuffer()
  }

  if (target.constructor === String) {
    const el = document.querySelector(target)
    if (!el) {
      // eslint-disable-next-line max-len
      return Promise.reject(new Error(`No HTML found with selector "${target}".`))
    }
    target = el
  }

  if (typeof HTMLInputElement !== 'undefined' && target.constructor === HTMLInputElement) {
    if (!target.files) {
      // eslint-disable-next-line max-len
      return Promise.reject(new Error('HTML input element reference is not of type "file".'))
    }
    target = target.files
  }

  if (typeof FileList !== 'undefined' && target.constructor === FileList) {
    if (target.length === 0) {
      // eslint-disable-next-line max-len
      return Promise.reject(new Error('Object FileList is empty.'))
    }
    target = target[0]
  }

  if (typeof File !== 'undefined' && target.constructor === File) {
    if (typeof FileReader === 'undefined') {
      throw new TypeError('Your environment does not support FileReader.')
    }
    const reader = new FileReader()
    return new Promise((resolve, reject) => {
      reader.onloadend = (ev) => resolve(ev.target.result)
      reader.onerror = (ev) => reject(ev.target.error)
      reader.readAsArrayBuffer(target)
    })
  }

  // eslint-disable-next-line max-len
  return Promise.reject(new Error('Parameter type must be an instance of HTMLInputElement, FileList, File, String (input selector), Blob or ArrayBuffer'))
}

module.exports = toArrayBuffer
