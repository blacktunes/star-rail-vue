export const logCheck = (key: string, time: Date) => {
  return new Promise<void>((resolve) => {
    const lastUpdate = time.getTime()
    const localLastUpdate = Number(localStorage.getItem(key))
    if (lastUpdate) {
      if (lastUpdate > localLastUpdate) {
        resolve()
        localStorage.setItem(key, JSON.stringify(lastUpdate))
      }
    }
  })
}
