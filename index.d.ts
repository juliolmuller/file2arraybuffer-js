
interface ArrayBufferMaker {
  (target: string|HTMLInputElement|FileList|File|ArrayBuffer|Blob): Promise<ArrayBuffer>
}

export const toArrayBuffer: ArrayBufferMaker

export default toArrayBuffer
