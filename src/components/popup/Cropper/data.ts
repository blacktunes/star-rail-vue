import { imageCompress } from '@/utils/images'
import { SuperImageCropper } from 'super-image-cropper'

export const imageCropper = new SuperImageCropper()

export const data = reactive<{
  img: string
  aspectRatio?: number
  fn?: (img: string) => void
}>({
  img: ''
})

const cropperOpen = (img: string, aspectRatio?: number, maxWidth?: number) => {
  return new Promise<string>((resolve) => {
    data.img = img
    data.aspectRatio = aspectRatio
    data.fn = (str) => resolve(imageCompress(str, maxWidth))
  })
}

let confirm = () => {}
export const callback = {
  open: (config?: { aspectRatio?: number; maxWidth?: number }) => {
    return new Promise<{ base64: string; raw: File }>((resolve) => {
      const el = document.createElement('input')
      el.type = 'file'
      el.accept = 'image/*'
      el.onchange = async () => {
        if (el.files?.[0]) {
          resolve({
            base64: await cropperOpen(
              URL.createObjectURL(el.files[0]),
              config?.aspectRatio,
              config?.maxWidth
            ),
            raw: el.files[0]
          })
        }
      }
      el.click()
    })
  },
  close: () => {
    URL.revokeObjectURL(data.img)
    data.img = ''
    data.aspectRatio = undefined
    data.fn = undefined
  },
  set confirm(fn: () => any) {
    confirm = fn
  },
  get confirm() {
    return () => {
      URL.revokeObjectURL(data.img)
      confirm()
    }
  }
}
