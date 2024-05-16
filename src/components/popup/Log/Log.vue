<template>
  <Popup :index="props.index">
    <window
      title="更新记录"
      width="40%"
      height="90%"
      @close="close"
    >
      <div
        class="item"
        :class="{
          highlight: index === 0
        }"
        v-for="(item, index) in data.log"
        :key="`time-${index}`"
      >
        <div class="time">{{ item.time }}</div>
        <ul>
          <li
            class="text"
            :class="{ 'text-highlight': text.highlight }"
            v-for="(text, key) in item.text"
            :key="`text-${index}-${key}`"
          >
            <span class="title">
              {{ text.text }}
            </span>
            <template v-if="text.author">
              <a
                target="_blank"
                :href="text.url"
              >
                @{{ text.author }}
              </a>
            </template>
            <template v-if="text.info">
              <template v-if="Array.isArray(text.info)">
                <div
                  v-for="(info, infoKey) in text.info"
                  :key="infoKey"
                  class="info"
                >
                  <span v-html="info"></span>
                </div>
              </template>
              <template v-else>
                <div class="info">
                  <span v-html="text.info"></span>
                </div>
              </template>
            </template>
          </li>
        </ul>
      </div>
    </window>
  </Popup>
</template>

<script lang="ts" setup>
import Popup from '@/components/common/Popup/Popup.vue'
import Window from '@/components/common/Window/Window.vue'
import { data } from './data'

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
</script>

<style lang="stylus" scoped>
ul
  margin 5px auto

.item
  margin 20px 20px 20px 0
  padding 10px 20px 20px

  .time
    font-weight bold
    font-size 50px

  .text
    margin-top 5px

    .title
      font-size 38px

    .info
      color #666
      font-size 34px

:deep(a)
  color #1F2328
  text-decoration none
  font-weight bold

  &:hover
    text-decoration underline

.highlight
  border-radius 5px
  background #ccc

.text-highlight
  .title
    font-weight bold

  .info
    color #333 !important

  span
  a
    background #e4c680
</style>
