import pkg from '../package.json'
import plugin from 'vite-plugin-banner'

const banner = (outDir?: string) =>
  plugin({
    content: `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n * build: ${new Date().toLocaleString()}\n */`,
    outDir
  })

export default banner
