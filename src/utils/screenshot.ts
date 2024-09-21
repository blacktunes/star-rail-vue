import { getFontEmbedCSS, toPng } from 'html-to-image'
import type { Options } from 'html-to-image/lib/types'

export const screenshot = async (
  dom: HTMLElement,
  config?: {
    name?: string
    width?: number
    height?: number
    download?: boolean
  },
  options: Options = {}
) => {
  try {
    const fontEmbedCSS = await getFontEmbedCSS(dom)
    const title = `${config?.name ? `${config.name} - ` : ''}${new Date().toLocaleString()}`
    const dataUrl = await toPng(dom, {
      width: config?.width,
      height: config?.height,
      pixelRatio: 1,
      fontEmbedCSS,
      ...options
    })
    if (config?.download) {
      const link = document.createElement('a')
      link.download = `${title}.png`
      link.href = dataUrl
      link.click()
    } else {
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
