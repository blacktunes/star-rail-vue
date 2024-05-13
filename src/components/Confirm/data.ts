export const data = reactive<{
  title: string
  tip?: string
  text: string[]
  fn?: () => void
}>({
  title: '',
  tip: undefined,
  text: [],
  fn: undefined
})

let confirm = () => {}
export const callback = {
  open: (config: { title: string; tip?: string; text: string[]; fn?: () => void }) => {
    data.title = config.title
    data.tip = config.tip
    data.text = config.text
    data.fn = config.fn
  },
  close: () => {
    data.title = ''
    data.tip = undefined
    data.text = []
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
