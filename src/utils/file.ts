import JSZip from 'jszip'
import { compressToUint8Array, decompress, decompressFromUint8Array } from 'lz-string'

export const loadZip = async (file: File) => {
  const zip = new JSZip()
  return await zip.loadAsync(file)
}

export const decompressFromZip = async <T>(file: File, name: string) => {
  const zip = new JSZip()
  const zipContent = await zip.loadAsync(file)
  const raw = zipContent.files[name]
  if (!raw) {
    throw Error()
  }
  return JSON.parse(decompress(await raw.async('text'))) as T
}

export const decompressFromArrayBuffer = <T>(arrayBuffer: ArrayBuffer) => {
  return JSON.parse(decompressFromUint8Array(new Uint8Array(arrayBuffer))) as T
}

export const createDownloadFile = (data: any) => {
  const str = JSON.stringify(toRaw(data), null, 2)
  return new Blob([compressToUint8Array(str)], { type: 'application/octet-stream' })
}
