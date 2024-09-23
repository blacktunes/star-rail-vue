import { fileURLToPath } from 'node:url'

import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import banner from './build/banner'

import { getFilesWithExtension } from './build/filePath'

const outDir = 'dist/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    banner(outDir),
    dts({
      rollupTypes: true,
      entryRoot: './plugin',
      tsconfigPath: './tsconfig.plugin.json'
    })
  ],
  build: {
    outDir,
    lib: {
      entry: [...getFilesWithExtension(fileURLToPath(new URL('./plugin', import.meta.url)), '.ts')],
      formats: ['es']
    }
  }
})
