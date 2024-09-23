import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'
import banner from './build/banner'

import { getFilesWithExtension } from './build/filePath'

const outDir = 'dist/lib'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      script: {
        defineModel: true
      }
    }),
    vueJsx(),
    AutoImport({
      imports: ['vue']
    }),
    banner(outDir),
    dts({
      rollupTypes: true,
      entryRoot: './src',
      tsconfigPath: './tsconfig.app.json'
    }),
    libInjectCss()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    cssCodeSplit: true,
    outDir,
    lib: {
      entry: [
        ...getFilesWithExtension(
          fileURLToPath(new URL('./src/components', import.meta.url)),
          '.vue'
        ),
        './src/index.ts'
      ],
      formats: ['es']
    },
    rollupOptions: {
      output: {
        chunkFileNames: (assetInfo: { name: string }) => {
          let name =
            assetInfo.name.includes('.vue_vue_type_style_index_0_scoped') ||
            assetInfo.name.includes('.vue_vue_type_style_index_0_lang') ||
            assetInfo.name.includes('.vue_vue_type_script_setup_true_lang') ||
            assetInfo.name.includes('.vue_vue_type_script_setup_true_name') ||
            assetInfo.name.includes('.vue_vue_type_script_name')
              ? assetInfo.name.split('.')[0]
              : assetInfo.name
          name = name.replace('_plugin-vue_export-helper', 'export')
          return `${name}-[hash].js`
        }
      },
      external: ['vue']
    }
  }
})
