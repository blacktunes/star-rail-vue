import type { Reactive } from 'vue'

export const setLocalStorage = <T extends Reactive<Object>>(
  data: T,
  name: string,
  watcher = true
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
    if (watcher) {
      watch(data, () => {
        localStorage.setItem(name, JSON.stringify(toRaw(data)))
      })
    }
  }
}
