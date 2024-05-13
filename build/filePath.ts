import fs from 'fs'
import path from 'path'

export const getFilesWithExtension = (dir: string, ext: string): string[] => {
  let result: string[] = []
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)
    if (stat.isDirectory()) {
      result = result.concat(getFilesWithExtension(filePath, ext))
    } else if (path.extname(file) === ext) {
      result.push(filePath)
    }
  })
  return result
}
