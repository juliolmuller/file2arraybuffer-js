
function fileToArrayBuffer(target: ArrayBuffer): Promise<ArrayBuffer>
function fileToArrayBuffer(target: Blob): Promise<ArrayBuffer>
function fileToArrayBuffer(target: string): Promise<ArrayBuffer>
function fileToArrayBuffer(target: HTMLInputElement): Promise<ArrayBuffer>
function fileToArrayBuffer(target: FileList): Promise<ArrayBuffer>
function fileToArrayBuffer(target: File): Promise<ArrayBuffer>

function fileToArrayBuffer(target: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
  if (typeof Promise === 'undefined') {
    throw new ReferenceError('This environment does not support Promises.')
  } else if (typeof ArrayBuffer === 'undefined') {
    throw new ReferenceError('This environment does not support ArrayBuffer.')
  }

  if (!target) {
    return Promise.reject(new Error(`Empty parameter to convert to ArrayBuffer (value: '${target}').`))
  }

  if (target.constructor === ArrayBuffer) {
    return Promise.resolve(target)
  }

  if (typeof Blob !== 'undefined' && target instanceof Blob) {
    if (typeof target.arrayBuffer === 'function') {
      return target.arrayBuffer()
    }
    if (typeof FileReader === 'undefined') {
      throw new TypeError('This environment does not support FileReader.')
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onloadend = (ev) => resolve(ev.target?.result)
      reader.onerror = (ev) => reject(ev.target?.error)
      reader.readAsArrayBuffer(target)
    })
  }

  let fileInputRelated = target as string | HTMLInputElement | FileList | File

  if (typeof fileInputRelated === 'string') {
    fileInputRelated = document.querySelector(fileInputRelated) as HTMLInputElement

    if (!fileInputRelated) {
      return Promise.reject(new Error(`No HTML found with selector "${target}".`))
    }
  }

  if (typeof HTMLInputElement !== 'undefined' && fileInputRelated.constructor === HTMLInputElement) {
    fileInputRelated = fileInputRelated.files as FileList

    if (!fileInputRelated) {
      return Promise.reject(new Error('HTML input element reference is not of type "file".'))
    }
  }

  if (typeof FileList !== 'undefined' && fileInputRelated.constructor === FileList) {
    fileInputRelated = fileInputRelated[0] as File

    if (!fileInputRelated) {
      return Promise.reject(new Error('Object FileList is empty.'))
    }
  }

  if (typeof File !== 'undefined' && fileInputRelated.constructor === File) {
    return fileToArrayBuffer(fileInputRelated) // will be treated as a Blob
  }

  return Promise.reject(new Error('Parameter type must be an instance of HTMLInputElement, FileList, File, String (input selector), Blob or ArrayBuffer'))
}

export default fileToArrayBuffer
