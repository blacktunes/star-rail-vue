import { getFontEmbedCSS, toBlob } from 'html-to-image'
import type { Options } from 'html-to-image/lib/types'
import JSzip from 'jszip'
import { compress } from 'lz-string'

const blobToBase64 = (blob: Blob) => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => {
      resolve(reader.result as string)
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsDataURL(blob)
  })
}

export const screenshot = async (
  dom: HTMLElement,
  config?: {
    name?: string
    width?: number
    height?: number
    download?: boolean
    data?: {
      raw: string
      filename: string
    }
  },
  options: Options = {}
) => {
  try {
    const fontEmbedCSS = await getFontEmbedCSS(dom)
    const title = `${config?.name ? `${config.name} - ` : ''}${new Date().toLocaleString()}`
    const imageBlob = await toBlob(dom, {
      width: config?.width,
      height: config?.height,
      pixelRatio: 1,
      fontEmbedCSS,
      ...options
    })

    if (!imageBlob) return Promise.reject(new Error('截图失败'))

    const zip = new JSzip()
    if (config?.data) {
      const str = compress(config.data.raw)
      zip.file(config.data.filename, str)
    }
    zip.file('blacktunes', 'https://github.com/blacktunes')
    const zipBlob = await zip.generateAsync({ type: 'blob' })
    const mergedBlob = new Blob([imageBlob, zipBlob], { type: 'image/png' })

    if (config?.download) {
      const url = URL.createObjectURL(mergedBlob)
      const link = document.createElement('a')
      link.download = `${title}.png`
      link.href = url
      link.click()
      URL.revokeObjectURL(url)
    } else {
      const dataUrl = await blobToBase64(mergedBlob)
      const img = new Image()
      img.src = dataUrl
      img.alt = title
      img.style.width = '100%'
      const win = window.open('', '_blank')
      if (win) {
        win.document.body.style.display = 'flex'
        win.document.body.style.justifyContent = 'center'
        win.document.body.style.alignItems = 'center'
        win.document.title = title
        win.document.body.appendChild(img)
      } else {
        return Promise.reject(new Error('无法打开窗口'))
      }
    }
  } catch (error) {
    console.error('截图保存错误', error)
  }
}
