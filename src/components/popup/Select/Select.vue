<template>
  <Popup :index="index">
    <window
      :title="data.title"
      width="65%"
      confirm
      @close="close"
    >
      <div class="select-list">
        <div
          class="select"
          :class="{ highlight: item === data.select }"
          v-for="item in data.list"
          :key="item"
          @click.stop="data.select = item"
        >
          <span>
            {{ item }}
          </span>
          <div class="radio"></div>
        </div>
      </div>
      <template #footer>
        <Btn
          name="取消"
          type="wrong"
          @click="close"
        />
        <Btn
          name="确认"
          type="check"
          :disable="!data.select"
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

const onConfirmlClick = () => {
  data.fn?.()
  close()
  return true
}

callback.confirm = onConfirmlClick
</script>

<style lang="stylus" scoped>
.select-list
  display flex
  flex 1
  flex-wrap wrap
  align-content flex-start
  margin 30px 0 10px

  .select
    display flex
    justify-content space-between
    align-items center
    box-sizing border-box
    margin-bottom 30px
    padding 0 30px 0 20px
    width 32%
    height 90px
    border 2px solid transparent
    background #eee
    box-shadow 0px 0px 5px 0px rgba(0, 0, 0, 0.2)
    font-size 46px
    user-select none

    &:hover
      border-color #aaa

    &:nth-child(3n+2)
      margin-right 2%
      margin-left 2%

    .radio
      box-sizing border-box
      width 45px
      height 45px
      border 2px solid #adadad
      border-radius 50%
      background-color #d6d6d6

.highlight
  .radio
    display flex
    justify-content center
    align-items center
    border 5px solid #ec9a37 !important
    background-color #fff !important

    &:after
      display block
      width 25px
      height 25px
      border-radius 50%
      background-color #ec9a37
      content ''
</style>
