<template>
  <div
    id="main"
    :style="{
      width: `${size.width * size.scale}px`,
      height: `${(size.height + size.bottom) * size.scale}px`
    }"
  >
    <div
      id="home"
      :style="{
        transform: `scale(${size.scale})`,
        width: `${size.width}px`,
        height: `${size.height}px`
      }"
    >
      <slot></slot>
      <template v-if="popup">
        <Component
          v-for="(item, key) in popup.components"
          :index="item.index"
          :name="key"
          :is="item.compontnt"
          :key="key"
          @close="popup?.close"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PopupManager } from '@/utils/popup'
import { setViewport } from './viewport'

const props = defineProps<{
  viewport: { width: number; height?: number; bottom?: number }
  popup?: PopupManager<any, any, any, any>
}>()

const size = setViewport(props.viewport)

provide(
  'scale',
  computed(() => size.scale)
)
</script>

<style lang="stylus">
#app
  display flex
  justify-content center
  align-items center
  overflow hidden
  width 100vw
  width var(--window-w)
  height 100vh
  height var(--window-h)

#main
  #home
    position relative
    width 100%
    height 100%
    transform-origin left top

.show
  opacity 1 !important

.hide
  opacity 0

.hidden
  overflow hidden !important

.fade-enter-active
.fade-leave-active
  transition all 0.2s

.fade-enter-from
.fade-leave-to
  opacity 0

.fade-enter-to
.fade-leave-from
  opacity 1
</style>
