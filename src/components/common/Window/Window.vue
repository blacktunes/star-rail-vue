<template>
  <div
    v-if="show"
    class="window"
  >
    <div
      class="box"
      :style="{
        width,
        height,
        minWidth,
        minHeight
      }"
      @click.stop
    >
      <div
        class="outside"
        v-if="slot.outside"
      >
        <slot name="outside"></slot>
      </div>
      <div class="wrapper">
        <div
          class="left"
          v-if="slot.left"
        >
          <slot name="left"></slot>
        </div>
        <div class="right">
          <div
            class="title"
            :style="{ justifyContent: confirm ? 'center' : undefined }"
          >
            <span>
              {{ title }}
            </span>

            <Close
              v-if="!!onClose && !confirm"
              class="close"
              @click="close"
            />
          </div>
          <div class="content">
            <slot></slot>
          </div>
          <slot name="bottom"></slot>
        </div>
      </div>
      <div
        class="footer"
        v-if="slot.footer"
      >
        <div class="bg"></div>
        <div class="btn-list">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Close from '@/components/common/Close/Close.vue'

withDefaults(
  defineProps<{
    show?: boolean
    confirm?: boolean
    title: string
    width?: string
    minWidth?: string
    height?: string
    minHeight?: string
    onClose?: () => void
  }>(),
  {
    show: true
  }
)

const slot = defineSlots()

const emit = defineEmits<{
  (event: 'close'): void
}>()

const close = () => {
  emit('close')
}
</script>

<style lang="stylus" scoped>
message()
  border-radius 0 50px 0 0
  box-shadow 0 0 20px 5px rgba(0, 0, 0, 0.3)

  &:after
    position absolute
    bottom -15px
    left -15px
    box-sizing border-box
    width 100%
    height 100%
    border 5px solid rgba(180, 180, 180, 0.5)
    content ''
    pointer-events none
    clip-path polygon(0 0, 10px 0, 100% calc(100% - 10px), 100% 100%, 0 100%)

.window
  position absolute
  top 0
  left 0
  z-index 99
  display flex
  justify-content center
  align-items center
  width 100%
  height 100%
  background rgba(0, 0, 0, 0.2)
  animation backdrop-filter 1s ease-in forwards

  .box
    position relative
    display flex
    flex-direction column
    max-width 90%
    max-height 90%
    width fit-content
    width -moz-fit-content
    height fit-content
    height -moz-fit-content
    background #d8d8d8
    message()

    .outside
      position absolute
      top 0
      left -150px

    .wrapper
      display flex
      flex 1
      align-items center
      overflow hidden
      width 100%
      border-radius 0 50px 0 0

      .left
        padding 20px

      .right
        display flex
        flex 1
        flex-direction column
        height 100%

        .title
          display flex
          justify-content space-between
          align-items flex-end
          margin 0 80px
          padding 30px 0 20px
          height 85px
          border-bottom 5px solid rgba(150, 150, 150, 0.5)
          font-weight bold
          font-size 56px
          user-select none

          .close
            margin-left 20px

        .content
          display flex
          flex 1
          flex-direction column
          overflow auto
          margin 0 80px
          height 100%
          mask-image linear-gradient(to bottom, transparent, #000 60px, #000, #000 calc(100% - 60px), transparent), linear-gradient(to left, black, transparent 50px)
          mask-size 100% 100%
          mask-position 0 0, 100% 0
          mask-repeat no-repeat, no-repeat

          ::-webkit-scrollbar
            width 8px
            height 8px

          ::-webkit-scrollbar-track
            margin 30px 0

    .footer
      position relative
      display flex
      justify-content center
      align-content center
      padding 30px 80px
      background #d8d8d8

      .bg
        position absolute
        top 0
        right 0
        bottom 0
        left 0
        display flex
        justify-content center
        align-content center
        background #262626
        background-image url('./菜单背景.webp')
        background-position center
        background-size auto 100%
        background-repeat no-repeat

      .btn-list
        display flex
        justify-content center
        align-content center

@keyframes backdrop-filter
  from
    backdrop-filter blur(0px)

  to
    backdrop-filter blur(10px)
</style>
