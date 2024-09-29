import type { Reactive } from 'vue'

export const setLocalStorage = <T extends Reactive<Object>>(
  data: T,
  name: string,
  is_watch = true
) => {
  try {
    const _setting = JSON.parse(localStorage.getItem(name) || '{}')
    for (const _key in _setting) {
      const key = _key as keyof typeof data
      if (
        _setting[_key] !== undefined &&
        data[key] !== undefined &&
        _setting[_key] !== data[key] &&
        typeof _setting[_key] === typeof data[key]
      ) {
        ;(data[key] as any) = _setting[_key]
      }
    }
  } finally {
    if (is_watch) {
      watch(data, () => {
        localStorage.setItem(name, JSON.stringify(toRaw(data)))
      })
    }
  }
}

export const timeComparison = (key: string, time?: string | number) => {
  return new Promise<void>((resolve) => {
    if (!time) return
    const lastTime = new Date(time).getTime()
    const localLastTime = localStorage.getItem(key)
    if (localLastTime === null) {
      localStorage.setItem(key, JSON.stringify(lastTime))
      return
    }
    if (lastTime) {
      if (lastTime > Number(localLastTime)) {
        resolve()
        localStorage.setItem(key, JSON.stringify(lastTime))
      }
    }
  })
}
