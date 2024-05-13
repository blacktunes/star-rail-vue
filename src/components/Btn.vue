<template>
  <div
    class="button"
    :class="{ disable }"
  >
    <div
      class="icon"
      v-if="$slots.icon || type"
    >
      <slot
        name="icon"
        v-if="$slots.icon"
      ></slot>
      <svg
        v-else-if="type === 'wrong'"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="currentColor"
      >
        <path
          d="M392.533333 806.4L85.333333 503.466667l59.733334-59.733334 247.466666 247.466667L866.133333 213.333333l59.733334 59.733334L392.533333 806.4z"
        ></path>
      </svg>
      <svg
        v-else-if="type === 'check'"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
        fill="currentColor"
      >
        <path
          d="M801.62816 222.37184a30.72 30.72 0 0 1 0 43.43808L555.43808 512l246.19008 246.21056a30.72 30.72 0 1 1-43.43808 43.43808L512 555.43808 265.8304 801.62816a30.72 30.72 0 1 1-43.45856-43.43808L468.54144 512l-246.1696-246.1696a30.72 30.72 0 1 1 43.43808-43.45856L512 468.54144l246.21056-246.1696a30.72 30.72 0 0 1 43.43808 0z"
        ></path>
      </svg>
    </div>
    <span>
      <slot v-if="$slots.default"></slot>
      <template v-else>
        {{ name }}
      </template>
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  name: string
  type?: 'check' | 'wrong'
  disable?: boolean
}>()
</script>

<style lang="stylus" scoped>
.disable
  border 3px solid #afafaf !important
  background transparent !important
  color #afafaf !important

  &:before
    display none

.button
  position relative
  display flex
  justify-content center
  align-items center
  box-sizing border-box
  margin 0 40px
  padding 10px 120px
  width 600px
  height 90px
  border 5px solid #e0e0e0
  border-radius 50px
  background rgba(240, 240, 240, 0.8)
  color #161616
  font-size 40px
  user-select none

  span
    margin-bottom 5px

  &:before
    position absolute
    top 50%
    left 50%
    box-sizing border-box
    width 98%
    height 90%
    border 5px solid rgba(180, 180, 180, 0.5)
    border-radius 50px
    content ''
    transform translate(-50%, -50%)
    pointer-events none

  &:hover
    background #ffffff

  &:active
    background rgba(255, 255, 255, 0.8)

  .icon
    display flex
    justify-content center
    align-items center
    margin-right 20px
    width 45px
    height 45px
    border 5px solid #b4a177
    border-radius 50%
    background #0c0b07
    color #d2c2a0
</style>
