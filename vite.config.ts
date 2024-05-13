import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import banner from 'vite-plugin-banner'
import dts from 'vite-plugin-dts'
import { libInjectCss } from 'vite-plugin-lib-inject-css'

import { getFilesWithExtension } from './build/filePath'

import pkg from './package.json'

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
    banner(
      `/**\n * name: ${pkg.name}\n * version: v${pkg.version}\n * description: ${pkg.description}\n * author: ${pkg.author}\n * homepage: ${pkg.homepage}\n */`
    ),
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
