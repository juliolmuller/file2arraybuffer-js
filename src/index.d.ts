
declare const toArrayBuffer: (
  target: string
    | HTMLInputElement
    | FileList
    | File
    | ArrayBuffer
    | Blob
) => Promise<ArrayBuffer>;

export default toArrayBuffer;
