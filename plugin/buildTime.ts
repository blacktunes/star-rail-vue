import type { Plugin } from 'vite'

export const buildTime = (key = 'BUILD_TIME'): Plugin => {
  return {
    name: 'vite-plugin-build-time',
    transformIndexHtml() {
      return [
        {
          tag: 'script',
          children: `window.${key}=${new Date()}`
        }
      ]
    }
  }
}
