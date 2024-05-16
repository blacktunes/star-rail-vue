interface LogData {
  time: string
  text: {
    text: string
    info?: string | string[]
    author?: string
    url?: string
    highlight?: boolean
  }[]
}
