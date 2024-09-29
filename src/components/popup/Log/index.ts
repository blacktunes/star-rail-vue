import Log from './Log.vue'
import { data } from './data'
import type { LogData } from './types'

export const setLog = (log: LogData[]) => {
  data.log = log
}

export const log = {
  component: Log
}
