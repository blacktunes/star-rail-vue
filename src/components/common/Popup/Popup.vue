<template>
  <Transition :name="transition">
    <template v-if="props.show">
      <div
        class="popup"
        v-show="props.index !== -1"
        :style="{ zIndex: baseIndex + index }"
      >
        <slot></slot>
      </div>
    </template>
    <template v-else>
      <div
        class="popup"
        v-if="props.index !== -1"
        :style="{ zIndex: baseIndex + index }"
      >
        <slot></slot>
      </div>
    </template>
  </Transition>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    index: number
    baseIndex?: number
    show?: boolean
    transition?: string
  }>(),
  {
    baseIndex: 20,
    transition: 'window'
  }
)
</script>

<style lang="stylus" scoped>
.popup
  position absolute
  top 0
  right 0
  bottom 0
  left 0

.window-enter-active
  transition all 0.3s

.window-leave-active
  transition all 0.25s

.window-enter-from
.window-leave-to
  opacity 0

.window-enter-active :deep(.box)
.window-leave-active :deep(.box)
  transition all 0.2s ease-out

.window-enter-from :deep(.box)
.window-leave-to :deep(.box)
  transform translateY(10%)

.window-enter-active :deep(.bg)
.window-leave-active :deep(.bg)
  transition all 0.25s
  transition-delay 0.05s
  transform-origin bottom

.window-enter-from :deep(.bg)
  opacity 0
  transform scaleY(0)

.window-leave-to :deep(.bg)
  opacity 0
  transform scaleY(0) translateY(30%)

.window-enter-active :deep(.btn-list)
  transition all 0.35s
  transition-delay 0.15s

.window-enter-from :deep(.btn-list)
  opacity 0

.window-leave-active :deep(.btn-list)
  transition all 0.2s

.window-leave-to :deep(.btn-list)
  opacity 0

@keyframes backdrop-filter
  from
    backdrop-filter blur(0px)

  to
    backdrop-filter blur(10px)
</style>
