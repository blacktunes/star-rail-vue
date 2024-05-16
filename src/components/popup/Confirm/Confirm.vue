<template>
  <Popup :index="index">
    <window
      :title="data.title"
      width="50%"
      confirm
      @close="close"
    >
      <div class="text">
        <div
          v-for="(text, index) in data.text"
          :key="index"
          v-html="text"
        ></div>
      </div>
      <template
        #bottom
        v-if="data.tip"
      >
        <div class="tip">{{ data.tip }}</div>
      </template>
      <template #footer>
        <Btn
          v-if="!data.fn"
          name="知道了"
          @click="close"
        />
        <template v-else>
          <Btn
            name="取消"
            type="wrong"
            @click="close"
          />

          <Btn
            name="确认"
            type="check"
            @click="onConfirml"
          />
        </template>
      </template>
    </window>
  </Popup>
</template>

<script lang="ts" setup>
import Btn from '@/components/common/Btn/Btn.vue'
import Popup from '@/components/common/Popup/Popup.vue'
import Window from '@/components/common/Window/Window.vue'
import { callback, data } from './data'

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

const onConfirml = async () => {
  data.fn?.()
  close()
  return true
}

callback.confirm = onConfirml
</script>

<style lang="stylus" scoped>
.text
  margin 50px auto 80px
  text-align center
  font-size 50px

.tip
  padding 10px
  background #e4c680
  text-align center
  font-size 40px
</style>
