export const data = reactive<{
  title: string
  list: string[] | readonly string[]
  select?: string
  fn?: () => void
}>({
  title: '',
  list: [],
  select: undefined,
  fn: undefined
})

let confirm = () => {}
export const callback = {
  open: <T extends string[] | readonly string[]>(title: string, list: T, defaultText?: string) => {
    return new Promise<T[number] | undefined>((resolve) => {
      data.title = title
      data.list = list
      data.select = defaultText
      data.fn = () => {
        resolve(data.select)
      }
    })
  },
  close: () => {
    data.title = ''
    data.list = []
    data.select = undefined
    data.fn = undefined
  },
  set confirm(fn: () => any) {
    confirm = fn
  },
  get confirm() {
    return () => {
      confirm()
    }
  }
}
