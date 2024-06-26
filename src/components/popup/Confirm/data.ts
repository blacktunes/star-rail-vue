export const data = reactive<{
  title: string
  tip?: string
  text: string[]
  fn?: () => void
  close?: () => void
}>({
  title: '',
  tip: undefined,
  text: [],
  fn: undefined
})

let confirm = () => {}
export const callback = {
  open: (config: typeof data) => {
    data.title = config.title
    data.tip = config.tip
    data.text = config.text
    data.fn = config.fn
    data.close = config.close
  },
  close: () => {
    data.title = ''
    data.tip = undefined
    data.text = []
    data.fn = undefined
    if (data.close) {
      data.close()
      data.close = undefined
    }
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
