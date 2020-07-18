# LacusSoft :: to-arraybuffer

[![npm version](https://img.shields.io/npm/v/@lacussoft/to-arraybuffer.svg?style=flat-square)](https://www.npmjs.org/package/@lacussoft/to-arraybuffer)
[![install size](https://packagephobia.now.sh/badge?p=@lacussoft/to-arraybuffer)](https://packagephobia.now.sh/result?p=@lacussoft/to-arraybuffer)
[![npm downloads](https://img.shields.io/npm/dm/@lacussoft/to-arraybuffer.svg?style=flat-square)](http://npm-stat.com/charts.html?package=@lacussoft/to-arraybuffer)
<!-- [![build status](https://img.shields.io/travis/lacussoft/to-arraybuffer/master.svg?style=flat-square)](https://travis-ci.org/lacussoft/to-arraybuffer) -->

Straight forward function to generate **ArrayBuffer** objects for files - commonly required web web services when uploading files e.g.: SharePoint REST API).

### Installation:

```bash
$ npm install @lacussoft/to-arraybuffer
```

### Import:

```js
// ES6+ notation
import toArrayBuffer from '@lacussoft/to-arraybuffer'

// Common JS
const toArrayBuffer = require('@lacussoft/to-arraybuffer')
```

or import it through your HTML file, using CDN:

```html
<script src="https://cdn.jsdelivr.net/npm/@lacussoft/to-arraybuffer@latest/dist/to-arraybuffer.min.js"></script>
```

### Usage:

You can use various parameter types to reference your HTML input element holding the file, as well as **Blob** instances you may generate on the fly. As the process of generating **ArrayBuffer** is computationally expense, the result is not the ArrayBuffer itself, but a promise to it, so consider asynchronous approach to work with that.

```html
<input id="attachment" type="file"  />
<script type="text/javascript">

    const inputEl = document.getElementById("attachment")
    inputEl.addEventListener('change', async (ev) => {

        // Use a query selector directly
        const arrBuffer = await toArrayBuffer('#attachment')

        // Use the HTML element directly (must be of type "file")
        const arrBuffer = await toArrayBuffer(ev.target)

        // Use the HTML element directly (must be of type "file")
        const arrBuffer = await toArrayBuffer(ev.target)

        // Use the element attribute that stores the FileList (only the first one will be converted)
        const arrBuffer = await toArrayBuffer(ev.target.files)

        /* do stuff */
    })

    // or if you got a Blob object
    const myBlob = new Blob(['Hello, world'], { type: 'text/plain' })
    toArrayBuffer(myBlob).then((arrBuffer) => /* do stuff */)

</script>
```

However, keep in mind that the function handles one single file, so by referencing an **HTMLInputElement** or its **FileList** attribute will only generate the **ArrayBuffer** for the `el.files[0]`. If you are working with multi-file input, you must iterate over the **FileList** object.

```html
<input id="attachments" type="file" multiple="true" />
<script type="text/javascript">

    const input = document.getElementById("attachments")
    const promises = []

    for (const file of input.files) {
      promises.push(toArrayBuffer(file))
    }

    Promise.all(promises).then((arrBuffers) => {
        /* do stuff */
    })

</script>
```
