<template>
  <div
    class="menu-btn"
    :class="{ transition }"
  >
    <svg
      class="ring"
      xmlns="http://www.w3.org/2000/svg"
      width="88%"
      height="88%"
      viewBox="0 0 200 200"
    >
      <path
        d="M29.262,50.474C6.449,85.684,10.791,130.8,37.629,158.808,69.2,191.76,125.7,194.69,160.333,160.2c34.682-34.546,31.555-90.821-1.4-122.223C131.125,11.467,86.318,6.852,50.875,28.946a2.706,2.706,0,0,1-3.486-.695,2.625,2.625,0,0,1-.013-2.885C78.242,4.594,129.11,2.379,162.385,34.293c34.864,33.438,38.2,92.872,1.494,129.436-35.966,35.826-95.278,34.678-129.946-1.487-32.617-34.027-28.4-85.1-8.215-115.3A2.663,2.663,0,0,1,28.565,47,2.7,2.7,0,0,1,29.262,50.474Z"
        fill="#777"
      />
    </svg>
    <div class="icon">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    size?: number
    transition?: boolean
  }>(),
  {
    size: 90
  }
)

const btnSize = computed(() => `${props.size}px`)
</script>

<style lang="stylus" scoped>
.menu-btn
  position relative
  display flex
  justify-content center
  align-items center
  width v-bind(btnSize)
  height v-bind(btnSize)
  border-radius 50%
  background #f2f2f4

  &:hover
    box-shadow 0 0 0px 5px rgba(255, 255, 255, 0.5)

  .ring
    position absolute
    z-index 1
    color #000

  .icon
    z-index 2

.hover
  transition 0.2s
</style>
