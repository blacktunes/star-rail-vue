const _imageCompress = (src: string, maxWidth?: number) => {
  return new Promise<string>((resolve) => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        resolve('')
        return
      }

      const width = maxWidth ? (img.width < maxWidth ? img.width : maxWidth) : img.width
      console.log(img.width, maxWidth, width)
      canvas.width = width
      canvas.height = width * (img.height / img.width)
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      resolve(canvas.toDataURL('image/webp'))
    }
  })
}

export const imageCompress = (file: File | Blob | string, maxWidth?: number) => {
  return new Promise<string>(async (resolve) => {
    if (typeof file === 'string') {
      resolve(await _imageCompress(file, maxWidth))
    } else if (file.type === 'image/gif') {
      const reader = new FileReader()
      reader.onload = (e) => {
        resolve((e.target?.result as string) || '')
      }
      reader.readAsDataURL(file)
    } else {
      const src = URL.createObjectURL(file)
      resolve(await _imageCompress(src, maxWidth))
      URL.revokeObjectURL(src)
    }
  })
}
