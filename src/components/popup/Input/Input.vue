<template>
  <Popup :index="index">
    <window
      :title="data.title"
      width="55%"
      confirm
      @close="close"
    >
      <div
        class="textarea"
        v-if="data.textarea"
      >
        <textarea
          ref="inputDom"
          v-model="data.text"
          :placeholder="data.placeholder"
          @keydown.enter.stop="onTextareaEnter"
        ></textarea>
      </div>
      <div
        class="input"
        v-else
      >
        <input
          type="text"
          ref="inputDom"
          v-model="data.text"
          :placeholder="data.placeholder"
          @keydown.enter.prevent.stop="onConfirmlClick"
        />
      </div>
      <template
        #bottom
        v-if="data.tip"
      >
        <div class="tip">{{ data.tip }}</div>
      </template>
      <template #footer>
        <Btn
          name="取消"
          type="wrong"
          @click="close"
        />
        <Btn
          name="确认"
          :disable="data.required && (!data.fn || data.text.length < 1)"
          type="check"
          @click="onConfirmlClick"
        />
      </template>
    </window>
  </Popup>
</template>

<script lang="ts" setup>
import Btn from '@/components/common/Btn/Btn.vue'
import Popup from '@/components/common/Popup/Popup.vue'
import Window from '@/components/common/Window/Window.vue'
import { callback, data } from './data'

const inputDom = ref<HTMLInputElement | null>(null)

const props = defineProps<{
  name: string
  index: number
}>()

const emits = defineEmits<{
  (event: 'close', name: string): void
}>()

const close = () => {
  emits('close', props.name)
}

watch(
  () => props.index,
  () => {
    if (props.index !== -1) {
      nextTick(() => {
        inputDom.value?.focus()
      })
    }
  }
)

const onTextareaEnter = (e: KeyboardEvent) => {
  if (data.textarea && e.ctrlKey) onConfirmlClick()
}

const onConfirmlClick = () => {
  if (data.required && data.text.length < 1) return false

  data.fn?.(data.text || data.placeholder || '')
  close()
  return true
}

callback.confirm = onConfirmlClick
</script>

<style lang="stylus" scoped>
.input
  display flex
  flex 1
  justify-content center
  align-items center
  margin 40px 110px

  input
    flex 1
    box-sizing border-box
    padding 5px 60px
    height 90px
    outline none
    border 2px solid #666
    border-radius 45px
    background #c7c7c7
    font-size 50px

.textarea
  display flex
  flex 1
  justify-content center
  align-items center
  margin 40px 0px

  textarea
    box-sizing border-box
    padding 15px 50px
    width 100%
    height 600px
    outline none
    border 2px solid #666
    border-radius 19px
    border-radius 45px
    background #c7c7c7
    font-size 50px
    resize none

.tip
  padding 10px
  background #b4b4b4
  text-align center
  font-size 40px
</style>
